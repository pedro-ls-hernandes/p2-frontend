import api from "../utils/api.jsx";
import useFlashMessage from "./useFlashMessage.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // <- IMPORTANTE
  }, []);

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso";
    let msgType = "success";
    try {
      const response = await api.post("users/Register", user);
      navigate("/login");
      return response.data;
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    } finally {
      setFlashMessage(msgText, msgType);
    }
  }

  //function
  async function login(user) {
    let msgText = "Login com sucesso";
    let msgType = "success";
    
    try {
      const response = await api.post("users/Login", user);
      console.log(response.data);
      await authUser(response.data);
      //wait for data and redirect

      if (response.data.user.tipo === "empresa") {
        await navigate("/empresa")
      } else if (response.data.user.tipo === "admin")
        await navigate("/admin")
      else
        await navigate("/");
      return response.data;
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    } finally {
      setFlashMessage(msgText, msgType);
    }
  }

  async function authUser(data) {
    setAuthenticated(true);
    setUser(data.user); // supondo que seu backend retorne { token, user }
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  async function logout() {
    let msgText = "Logout com sucesso";
    let msgType = "success";
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    api.defaults.headers.Authorization = undefined;
    navigate("/");
    setFlashMessage(msgText, msgType);
  }

  return { register, login, logout, authenticated, user, loading };
} //export
