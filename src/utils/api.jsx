import axios from "axios";

// 1. Crie a instância do Axios e atribua-a a uma variável
const api = axios.create({
    baseURL: "http://localhost:5000", // Mantenha sua baseURL
});

// 2. Configure o interceptor NESTA MESMA INSTÂNCIA
api.interceptors.request.use(
    (config) => {
        // Obtém o token do localStorage antes de cada requisição
        const token = localStorage?.getItem("token")?.replace(/\"/g, "");
        if (token) {
            // Adiciona o token ao cabeçalho Authorization no formato Bearer
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Rejeita qualquer erro de requisição
        return Promise.reject(error);
    }
);

// 3. Exporte esta instância configurada
export default api;