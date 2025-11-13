import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      const response = await api.get("/user/", { params: { email } });

      if (response.data.length === 0) {
        setErro("Email ou senha incorretos");
        return;
      }

      const usuario = response.data[0];

      if (usuario.password_hash !== senha) {
        setErro("Email ou senha incorretos");
        return;
      }

      // Salva apenas o ID do usuário
      localStorage.setItem("usuarioLogadoId", usuario.id);
      setErro("");
      navigate("/account");
    } catch (err) {
      setErro("Erro ao conectar com o servidor");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-black text-white w-[500px] h-auto rounded-2xl p-8 flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold text-[#F58232]">Sistema PIGRA</h1>
        <h2 className="text-1xl font-semibold text-white">
          Faça login em sua conta
        </h2>

        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm text-gray-300">E-mail</label>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            className="p-3 rounded-md text-black w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm text-gray-300">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="p-3 rounded-md text-black w-full"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && <span className="text-red-500 text-xs mt-1">{erro}</span>}

        <button
          onClick={handleLogin}
          className="bg-[#F58232] p-3 mt-2 w-full rounded-md"
        >
          Entrar
        </button>

        <button
          onClick={() => navigate("/create-account")}
          className="text-gray-400 mt-4"
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}

export default Login;
