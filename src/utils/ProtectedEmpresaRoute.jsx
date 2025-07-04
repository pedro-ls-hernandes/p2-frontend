import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/UserContext";

const ProtectedEmpresaRoute = ({ children }) => {
  const { authenticated, user, loading } = useContext(Context);

  

  if (loading) return <p>Carregando...</p>;

  if (!authenticated || !user || user.tipo !== "empresa") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedEmpresaRoute;
