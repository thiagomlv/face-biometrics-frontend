import { useEffect, useState } from "react";
import Login from "./components/Login";
import { api } from "./api"; // importando a API configurada

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Requisição GET para o endpoint /user/ do backend
    api
      .get("/user/")
      .then((res) => {
        console.log(res.data); // aqui você vê os dados do banco
        setUsers(res.data);
      })
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div className="w-screen h-screen bg-[#F58232] flex flex-col justify-center items-center">
      <Login />
    </div>
  );
}

export default App;
