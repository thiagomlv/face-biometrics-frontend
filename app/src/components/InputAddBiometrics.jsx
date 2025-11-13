import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { api } from "../api"; // Axios configurado para backend

function InputAddBiometrics() {
  const navigate = useNavigate();
  const [foto, setFoto] = useState(null);
  const [nomePessoa, setNomePessoa] = useState("");
  const [emailPessoa, setEmailPessoa] = useState("");
  const [salaSelecionada, setSalaSelecionada] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [salas, setSalas] = useState([]);

  const usuarioId = localStorage.getItem("usuarioLogadoId"); // só para pegar quem está logado

  // Carrega as salas do backend
  useEffect(() => {
    if (!usuarioId) {
      navigate("/", { replace: true });
      return;
    }

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
  }, [usuarioId, navigate]);

  const handleAdicionar = async () => {
  if (!nomePessoa || !emailPessoa || !salaSelecionada || !foto) {
    setErro("Preencha todos os campos!");
    return;
  }

  const salaObj = salas.find((s) => s.user_id === parseInt(usuarioId));
  if (!salaObj) {
    setErro("Selecione uma sala válida!");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", nomePessoa);
    formData.append("email", emailPessoa);
    formData.append("room_id", salaObj.id);
    formData.append("user_id", salaObj.user_id); // dono da sala
    formData.append("photo", foto);

    console.log("FormData enviado:");
    for (let [k, v] of formData.entries()) console.log(k, v);

    await api.post("/person/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setErro("");
    setSucesso(true);
    setNomePessoa("");
    setEmailPessoa("");
    setFoto(null);
    setSalaSelecionada("");
  } catch (err) {
    console.error(err);
    if (err.response?.status === 400)
      setErro("Essa pessoa já está cadastrada nessa sala.");
    else setErro("Erro ao cadastrar a biometria.");
  }
};

  return (
    <div className="bg-black text-white w-[500px] rounded-2xl p-8 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-[#F58232]">Sistema PIGRA</h1>
      <h2 className="text-base font-semibold text-white text-center">
        Adicione a biometria de uma pessoa
      </h2>

      {!sucesso ? (
        <>
          {/* Upload da Foto */}
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm text-gray-300">Foto da Pessoa</label>
            <label className="bg-[#F58232] text-white p-3 rounded-md text-center cursor-pointer flex items-center justify-center gap-2">
              <Upload size={20} />
              Enviar foto
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && setFoto(e.target.files[0])}
              />
            </label>
            {foto && (
              <span className="text-sm text-gray-300 mt-2">
                Arquivo selecionado: {foto.name}
              </span>
            )}
          </div>

          {/* Nome da Pessoa */}
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm text-gray-300">Nome da Pessoa</label>
            <input
              type="text"
              placeholder="Digite o nome da Pessoa"
              className="p-3 rounded-md text-black w-full"
              value={nomePessoa}
              onChange={(e) => setNomePessoa(e.target.value)}
            />
          </div>

          {/* E-mail da Pessoa */}
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm text-gray-300">E-mail</label>
            <input
              type="email"
              placeholder="Digite o e-mail da Pessoa"
              className="p-3 rounded-md text-black w-full"
              value={emailPessoa}
              onChange={(e) => setEmailPessoa(e.target.value)}
            />
          </div>

          {/* Select de Salas */}
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm text-gray-300">Sala</label>
            <select
              value={salaSelecionada}
              onChange={(e) => setSalaSelecionada(e.target.value)}
              className="p-3 rounded-md text-black w-full"
            >
              <option value="">Selecione a sala</option>
              {salas.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.name} - {sala.location}
                </option>
              ))}
            </select>
          </div>

          {erro && <span className="text-red-500 text-xs mt-1">{erro}</span>}

          <button
            onClick={handleAdicionar}
            className="bg-[#F58232] text-white font-bold p-3 rounded-md w-full"
          >
            Adicionar Biometria
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <span className="text-green-500 font-semibold text-lg">
            Biometria adicionada com sucesso!
          </span>
          <button
            onClick={() => navigate("/account")}
            className="bg-[#F58232] text-white font-bold p-3 rounded-md w-full"
          >
            Voltar à Conta
          </button>
        </div>
      )}
    </div>
  );
}

export default InputAddBiometrics;
