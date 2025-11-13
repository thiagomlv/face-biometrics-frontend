import { useState, useEffect } from "react";
import { api } from "../api"; // Axios configurado para backend

function DisplayBiometrics() {
  const [biometrics, setBiometrics] = useState([]);
  const usuarioId = localStorage.getItem("usuarioLogadoId");

  useEffect(() => {
    const fetchBiometrics = async () => {
      if (!usuarioId) return;

      try {
        const response = await api.get("/person/", {
          params: { user_id: usuarioId }, // envia o user_id
        });
        setBiometrics(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBiometrics();
  }, [usuarioId]);


  return (
    <div className="bg-black w-[700px] rounded-2xl p-4 flex flex-col justify-center gap-2">
      {/* Cabeçalho da tabela */}
      <div className="border-b border-gray-600">
        <div className="grid grid-cols-3 max-w-[500px] mx-auto gap-x-16 text-gray-400 py-4 font-semibold text-sm text-center">
          <span>Nome</span>
          <span>E-mail</span>
          <span>Salas Autorizadas</span>
        </div>
      </div>

      {/* Dados */}
      <div className="flex flex-col justify-center">
        {biometrics.length > 0 ? (
          biometrics.map((item, index) => {
            console.log(`${JSON.stringify(item, null, 2)}`);
            return (<div
              key={item.id}
              className={`border-b border-gray-700 ${
                index % 2 === 0 ? "bg-gray-800/20" : ""
              }`}
            >
              <div className="grid grid-cols-3 max-w-[500px] mx-auto gap-x-16 text-white py-2 text-sm text-center">
                <span>{item.name}</span>
                <span>{item.email}</span>
                <span>
                  {item.room_name} ({item.room_location})
                </span>
              </div>
            </div>
          )})
        ) : (
          <div className="text-center text-gray-400 py-4">
            Nenhuma biometria cadastrada.
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayBiometrics;
