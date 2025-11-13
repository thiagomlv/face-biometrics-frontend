import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputRegisterRoom from "../components/InputRegisterRoom";

function RegisterRoom() {
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-[#F58232] flex flex-col items-center">
      {/* Cabeçalho fixo no topo */}
      <div className="flex justify-center items-start gap-4 mt-10">
        <button
          className="bg-black h-20 w-20 rounded-2xl flex items-center justify-center"
          onClick={() => navigate(-1)}
        >
          <ArrowBigLeft size={52} className="text-white fill-current" />
        </button>
        <div className="bg-black w-[600px] h-20 px-6 rounded-2xl flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Cadastrar Sala</h1>
        </div>
        <div className="bg-black w-[400px] h-20 px-6 rounded-2xl flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Sistema PIGRA</h1>
        </div>
      </div>

      {/* Conteúdo principal centralizado */}
      <div className="flex flex-col flex-1 items-center justify-center w-full">
        <InputRegisterRoom />
      </div>
    </div>
  );
}

export default RegisterRoom;
