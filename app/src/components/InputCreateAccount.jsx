import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function InputCreateAccount() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [contaCriada, setContaCriada] = useState(false);

  const handleCadastro = async () => {
    // Limpa mensagens antigas
    setErro("");

    // Validação: campos obrigatórios
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    // Validação: formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro("Por favor, insira um e-mail válido (ex: exemplo@dominio.com).");
      return;
    }

    // Validação: tamanho da senha
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Se passou nas verificações, tenta criar conta
    try {
      await api.post("/user/", {
        name: nome,
        email: email,
        password_hash: senha,
      });

      setContaCriada(true);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("E-mail inserido já está cadastrado.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-black text-white w-[500px] p-8 rounded-2xl flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-[#F58232]">Sistema PIGRA</h1>
        <h2 className="text-white font-semibold">
          {contaCriada ? "Conta criada com sucesso!" : "Cadastre sua conta"}
        </h2>

        {!contaCriada && (
          <>
            <div className="flex flex-col w-full">
              <label className="mb-1 text-sm text-gray-300">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Digite seu nome completo"
                className="p-3 rounded-md text-black w-full"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

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
              onClick={handleCadastro}
              className="bg-[#F58232] p-3 mt-2 w-full rounded-md hover:bg-[#f8924f] transition"
            >
              Cadastrar
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-gray-700 p-3 mt-2 w-full rounded-md hover:bg-gray-600 transition"
            >
              Voltar ao Menu Principal
            </button>
          </>
        )}

        {contaCriada && (
          <button
            onClick={() => navigate("/")}
            className="bg-[#F58232] p-3 mt-2 w-full rounded-md"
          >
            Voltar para Login
          </button>
        )}
      </div>
    </div>
  );
}

export default InputCreateAccount;
