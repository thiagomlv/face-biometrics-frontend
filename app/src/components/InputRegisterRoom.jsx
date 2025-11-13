import { useState, useEffect } from "react";
import { api } from "../api"; // axios configurado
import { useNavigate } from "react-router-dom";

function InputRegisterRoom() {
  const [nomeSala, setNomeSala] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [erro, setErro] = useState("");
  const [salaCadastrada, setSalaCadastrada] = useState(false);
  const [salasCadastradas, setSalasCadastradas] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Obtém o usuário logado pelo ID no localStorage
  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioLogadoId"); // apenas o ID
    if (!usuarioId) {
      navigate("/", { replace: true });
    } else {
      setUserId(parseInt(usuarioId)); // converte para número
    }
  }, [navigate]);

  // Carrega salas do backend para o usuário logado
  useEffect(() => {
    if (!userId) return;

    const fetchSalas = async () => {
      try {
        const response = await api.get("/room/", {
          params: { user_id: userId },
        });
        setSalasCadastradas(response.data);
      } catch (err) {
        console.error("Erro ao carregar salas:", err);
      }
    };

    fetchSalas();
  }, [userId]);

  const handleCadastro = async () => {
    if (!nomeSala || !localizacao) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      // Verifica se a sala já existe localmente para este usuário
      const salaExiste = salasCadastradas.some(
        (sala) =>
          sala.name.toLowerCase() === nomeSala.toLowerCase() &&
          sala.location.toLowerCase() === localizacao.toLowerCase()
      );

      if (salaExiste) {
        setErro("Já existe uma sala cadastrada com este nome e localização!");
        return;
      }

      console.log("POST payload:", {
        name: nomeSala,
        location: localizacao,
        user_id: userId,
      });

      // POST para o backend
      const response = await api.post("/room/", {
        name: nomeSala,
        location: localizacao,
        user_id: userId,
      });

      // Atualiza lista local e limpa campos
      setSalasCadastradas([...salasCadastradas, response.data]);
      setSalaCadastrada(true);
      setErro("");
      setNomeSala("");
      setLocalizacao("");
    } catch (err) {
      console.error("Erro ao cadastrar sala:", err);
      if (err.response?.status === 400) {
        setErro(err.response.data.detail);
      } else {
        setErro("Erro ao cadastrar sala.");
      }
    }
  };

  return (
    <div className="bg-black text-white w-[500px] rounded-2xl p-8 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-[#F58232]">Sistema PIGRA</h1>
        <h2 className="text-base font-semibold text-white text-center">
          {salaCadastrada
            ? "Sala cadastrada com sucesso!"
            : "Digite o nome e a localização da sala que deseja cadastrar"}
        </h2>
      </div>

      {!salaCadastrada && (
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm text-gray-300">Sala</label>
            <input
              type="text"
              placeholder="Digite o nome da sala"
              className="p-3 rounded-md text-black"
              value={nomeSala}
              onChange={(e) => setNomeSala(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm text-gray-300">Localização</label>
            <input
              type="text"
              placeholder="Digite o local da sala"
              className="p-3 rounded-md text-black"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            />
          </div>
          {erro && <span className="text-red-500 text-xs mt-1">{erro}</span>}
        </div>
      )}

      <div className="flex flex-col w-full gap-2">
        {!salaCadastrada && (
          <button
            onClick={handleCadastro}
            className="bg-[#F58232] text-white font-bold p-3 rounded-md mt-2"
          >
            Cadastrar
          </button>
        )}
        {salaCadastrada && (
          <button
            onClick={() => setSalaCadastrada(false)}
            className="bg-[#F58232] text-white font-bold p-3 rounded-md mt-2"
          >
            Cadastrar nova sala
          </button>
        )}
      </div>
    </div>
  );
}

export default InputRegisterRoom;
