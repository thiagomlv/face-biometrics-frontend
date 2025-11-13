import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DisplayBiometrics from "../components/DisplayBiometrics";

function ViewBiometrics() {
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-[#F58232] flex flex-col items-center pt-10 gap-8">
      {/* Cabeçalho diretamente no Account */}
      <div className="flex justify-center items-start gap-4">
        <button className="bg-black h-20 w-20 rounded-2xl flex items-center justify-center">
          <ArrowBigLeft
            size={52}
            className="text-white fill-current"
            onClick={() => navigate(-1)}
          />
        </button>
        <div className="bg-black w-[600px] h-20 px-6 rounded-2xl flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">
            Biometrias Cadastradas
          </h1>
        </div>
        <div className="bg-black w-[400px] h-20 px-6 rounded-2xl flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Sistema PIGRA</h1>
        </div>
      </div>

      {/* Conteúdo principal: histórico + botões */}
      <div className="flex gap-6">
        <DisplayBiometrics />
        {/*<AccountButtons />*/}
      </div>
    </div>
  );
}

export default ViewBiometrics;
