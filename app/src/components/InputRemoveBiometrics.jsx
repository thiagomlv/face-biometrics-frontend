import { useState, useEffect } from "react";
import { api } from "../api"; // Axios configurado para backend

function InputRemoveBiometrics() {
  const [emailPessoa, setEmailPessoa] = useState("");
  const [salaSelecionada, setSalaSelecionada] = useState("");
  const [salas, setSalas] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const usuarioId = localStorage.getItem("usuarioLogadoId");

  useEffect(() => {
    if (!usuarioId) return;

    const fetchSalas = async () => {
      try {
        const response = await api.get("/room/", {
          params: { user_id: usuarioId },
        });
        setSalas(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSalas();
  }, [usuarioId]);

  const handleRemover = async () => {
    if (!emailPessoa || !salaSelecionada) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    const salaObj = salas.find((s) => s.id === parseInt(salaSelecionada));
    if (!salaObj) {
      setMensagem("Selecione uma sala válida!");
      return;
    }

    try {
      await api.delete("/person/", {
        data: {
          email: emailPessoa,
          room_id: salaObj.id,
        },
      });

      setMensagem("Biometria removida com sucesso!");
      setEmailPessoa("");
      setSalaSelecionada("");
    } catch (err) {
      console.error(err);
      setMensagem(err.response?.data?.detail || "Erro ao remover biometria.");
    }
  };

  return (
    <div className="bg-black text-white w-[500px] rounded-2xl p-8 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-[#F58232]">Sistema PIGRA</h1>
        <h2 className="text-base font-semibold text-white text-center">
          Escolha a sala e digite o e-mail da pessoa para remover a biometria
        </h2>
      </div>

      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm text-gray-300">E-mail da Pessoa</label>
          <input
            type="email"
            placeholder="Digite o e-mail da pessoa"
            className="p-3 rounded-md text-black"
            value={emailPessoa}
            onChange={(e) => setEmailPessoa(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm text-gray-300">Sala</label>
          <select
            className="p-3 rounded-md text-black"
            value={salaSelecionada}
            onChange={(e) => setSalaSelecionada(e.target.value)}
          >
            <option value="">Selecione a sala</option>
            {salas.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} - {s.location}
              </option>
            ))}
          </select>
        </div>

        {mensagem && <span className="text-yellow-500">{mensagem}</span>}

        <button
          onClick={handleRemover}
          className="bg-[#F58232] text-white font-bold p-3 rounded-md mt-2"
        >
          Remover Biometria
        </button>
      </div>
    </div>
  );
}

export default InputRemoveBiometrics;
