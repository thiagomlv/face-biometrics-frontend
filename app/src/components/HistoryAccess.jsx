import { useEffect, useState } from "react";

function HistoryAccess() {
  const [historico, setHistorico] = useState([]);
  const userId = localStorage.getItem("user_id"); // só usamos isso

  useEffect(() => {
    async function fetchHistorico() {
      try {
        const response = await fetch("http://localhost:8000/access-log/");
        if (!response.ok) throw new Error("Erro ao buscar histórico");
        const data = await response.json();
        console.log(data)
        setHistorico(data);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    }

    fetchHistorico();
  }, [userId]);

  return (
    <div className="bg-black w-[700px] rounded-2xl px-4 pt-6 pb-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold text-white mb-2 text-center -mt-3">
        Histórico de Acessos
      </h2>

      {/* Cabeçalho da tabela */}
      <div className="grid grid-cols-4 text-gray-400 font-semibold border-b border-gray-600 pb-1 text-sm">
        <span>Nome</span>
        <span>Data/Hora</span>
        <span>Sala</span>
        <span>Autorização</span>
      </div>

      {/* Dados */}
      <div className="flex flex-col justify-center">
        {historico.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Nenhum acesso registrado.
          </p>
        ) : (
          historico.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-4 text-white py-1 text-sm border-b border-gray-700 ${
                index % 2 === 0 ? "bg-gray-800/20" : ""
              }`}
            >
              <span>{item.person_name}</span>
              <span>
                {new Date(item.access_time).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              <span>{item.room_name}</span>
              <span
                className={
                  item.authorized
                    ? "text-green-400 font-semibold"
                    : "text-red-400 font-semibold"
                }
              >
                {item.authorized ? "Permitido" : "Negado"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryAccess;
