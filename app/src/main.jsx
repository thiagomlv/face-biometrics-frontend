import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./pages/Account.jsx";
import ViewBiometrics from "./pages/ViewBiometrics.jsx";
import AddBiometrics from "./pages/AddBiometrics.jsx";
import RemoveBiometrics from "./pages/RemoveBiometrics.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import RegisterRoom from "./pages/RegisterRoom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/view-biometrics",
    element: <ViewBiometrics />,
  },
  {
    path: "add-biometrics",
    element: <AddBiometrics />,
  },
  {
    path: "remove-biometrics",
    element: <RemoveBiometrics />,
  },
  {
    path: "create-account",
    element: <CreateAccount />,
  },
  {
    path: "register-room",
    element: <RegisterRoom />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
