import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/UserContext";

const ProtectedAdminRoute = ({ children }) => {
  const { authenticated, user, loading } = useContext(Context);

  if (loading) return <p>Carregando...</p>;

  if (!authenticated || !user || user.tipo !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
