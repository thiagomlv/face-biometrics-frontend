import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import HistoryAccess from "../components/HistoryAccess";
import AccountButtons from "../components/AccountButtons";
import { api } from "../api";

function Account() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  const usuarioId = localStorage.getItem("usuarioLogadoId");

  useEffect(() => {
    if (!usuarioId) {
      navigate("/", { replace: true });
      return;
    }

    const fetchUsuario = async () => {
      try {
        const response = await api.get("/user/", { params: { id: usuarioId } });

        if (response.data.length === 0) {
          navigate("/", { replace: true });
        } else {
          setUsuario(response.data[0]);
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        navigate("/", { replace: true });
      }
    };

    fetchUsuario();
  }, [usuarioId, navigate]);

  // 🔹 Detecta o clique no botão "Voltar" do navegador
  useEffect(() => {
    const handleBackButton = () => {
      localStorage.removeItem("usuarioLogadoId");
      setUsuario(null);
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div className="w-screen min-h-screen bg-[#F58232] flex flex-col items-center pt-10 gap-8">
      <div className="flex justify-center items-start gap-4">
        <div className="bg-black h-20 w-20 rounded-2xl flex items-center justify-center">
          <User size={52} className="text-white" />
        </div>
        <div className="bg-black w-[600px] h-20 px-6 rounded-2xl flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">{`Sua Conta - ${usuario.name}`}</h1>
        </div>
        <div className="bg-black w-[400px] h-20 px-6 rounded-2xl flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Sistema PIGRA</h1>
        </div>
      </div>

      <div className="flex gap-6">
        <HistoryAccess />
        <AccountButtons />
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("usuarioLogadoId");
          setUsuario(null);
          navigate("/");
        }}
        className="bg-black text-white font-bold p-3 rounded-md"
      >
        Sair
      </button>
    </div>
  );
}

export default Account;
