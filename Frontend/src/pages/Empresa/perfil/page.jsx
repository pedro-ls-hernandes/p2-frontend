// src/pages/Empresa/perfil/page.jsx
"use client";

import { useState, useEffect, useContext } from "react";
import { Save, Upload, Eye, EyeOff, Building, Users } from "lucide-react";
import AdminHeader from "../../../Component/AdminHeader";
import { Context } from "../../../context/UserContext";
import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";

export default function PerfilEmpresa() {
  // Removido: const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email_contato: "",
    telefone: "",
    localizacao: "",
    site: "",
    setor: "",
    descricao: "",
    cultura: "",
    logo: "", // Para armazenar a URL da logo
    senha_atual: "",
    nova_senha: "",
    confirmar_senha: "",
  });
  const [errors, setErrors] = useState({});
  const { setFlashMessage } = useFlashMessage();
  const { user, authenticated } = useContext(Context);
  const [isUploading, setIsUploading] = useState(false);

  const setores = [
    { value: "Tecnologia", label: "Tecnologia" },
    { value: "Saúde", label: "Saúde" },
    { value: "Finanças", label: "Finanças" },
    { value: "Educação", label: "Educação" },
    { value: "Indústria", label: "Indústria" },
    { value: "Comércio", label: "Comércio" },
    { value: "Serviços", label: "Serviços" },
    { value: "Outros", label: "Outros" },
  ];

  useEffect(() => {
    const fetchEmpresaData = async () => {
      if (!authenticated || !user || user.tipo !== "empresa") {
        setLoading(false);
        setFlashMessage(
          "Você não tem permissão para acessar esta página.",
          "error"
        );
        return;
      }
      try {
        const response = await api.get("/empresas/EmpresaPerfil/");
        const empresaData = response.data.empresa;

        setFormData({
          ...formData,
          _id: empresaData._id || "", // Certifique-se de que _id seja incluído aqui, se necessário para a edição
          nome: empresaData.nome || "",
          cnpj: empresaData.cnpj || "",
          email_contato: empresaData.email_contato || "",
          telefone: empresaData.telefone || "",
          localizacao: empresaData.localizacao || "",
          site: empresaData.site || "",
          setor: empresaData.setor || "",
          descricao: empresaData.descricao || "",
          cultura: empresaData.cultura || "",
          logo: empresaData.logo || "",
          senha_atual: empresaData.senha_atual || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados da empresa:", error);
        setFlashMessage("Erro ao carregar dados da empresa.", "error");
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, [authenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificar se é imagem
    if (!file.type.startsWith("image/")) {
      setFlashMessage("Por favor, selecione uma imagem.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);

    try {
      setLoading(true);
      const response = await api.post("/empresas/upload-logo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Atualiza o estado do usuário com a nova foto
      setFormData((prev) => ({
        ...prev,
        logo: response.data.logo,
      }));

      setFlashMessage("Foto enviada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
      setFlashMessage("Erro ao enviar foto. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));
    }
    handleUploadFoto(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const updatedData = new FormData();
    for (const key in formData) {
      if (key.startsWith("senha_") || key === "confirmar_senha") {
        if (formData[key]) {
          // Apenas envia se o campo de senha não estiver vazio
          updatedData.append(key, formData[key]);
        }
      } else if (formData[key] !== null && formData[key] !== undefined) {
        // Incluir outros campos que não são senhas e não são nulos/indefinidos
        updatedData.append(key, formData[key]);
      }
    }

    try {
      const response = await api.post(
        `/empresas/EditarEmpresa/${formData._id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFlashMessage(
        response.data.message || "Perfil atualizado com sucesso!",
        "success"
      );
      // Não há necessidade de setEditMode(false)
    } catch (error) {
      console.error("Erro ao atualizar perfil da empresa:", error);
      const msg = error.response?.data?.message || "Erro ao atualizar perfil.";
      setFlashMessage(msg, "error");
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-light">
        <AdminHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Meu Perfil de Empresa
            </h1>
            {/* O botão de "Editar Perfil" foi removido.
                O formulário agora é sempre editável.
                O botão de salvar é o único necessário no topo,
                ou pode ser movido para o final do formulário.
            */}
          </div>

          <form
            className="p-6 space-y-8"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            {/* Informações Gerais da Empresa */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informações Gerais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo da Empresa */}
                <div className="flex flex-col items-center">
                  <img
                    src={
                      formData.logo
                        ? typeof formData.logo === "string"
                          ? process.env.REACT_APP_API + formData?.logo
                          : URL.createObjectURL(formData.logo)
                        : "https://placehold.co/100x100/EEE/31343C"
                    }
                    alt="Logo da Empresa"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="px-4 py-2 border border-gray-medium rounded-lg text-gray-dark hover:bg-gray-light transition-colors cursor-pointer"
                  >
                    <Upload className="w-5 h-5 inline-block mr-2" /> Alterar
                    Logo
                    <input
                      type="file"
                      id="logo-upload"
                      name="logo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Nome da Empresa */}
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Nome da Empresa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.nome && (
                    <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
                  )}
                </div>

                {/* CNPJ */}
                <div>
                  <label
                    htmlFor="cnpj"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    CNPJ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    disabled={true} // CNPJ geralmente não é editável após cadastro
                  />
                  {errors.cnpj && (
                    <p className="mt-1 text-sm text-red-600">{errors.cnpj}</p>
                  )}
                </div>

                {/* Setor */}
                <div>
                  <label
                    htmlFor="setor"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Setor
                  </label>
                  <select
                    id="setor"
                    name="setor"
                    value={formData.setor}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Selecione um setor</option>
                    {setores.map((setor) => (
                      <option key={setor.value} value={setor.value}>
                        {setor.label}
                      </option>
                    ))}
                  </select>
                  {errors.setor && (
                    <p className="mt-1 text-sm text-red-600">{errors.setor}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informações de Contato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email de Contato */}
                <div>
                  <label
                    htmlFor="email_contato"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    E-mail de Contato <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email_contato"
                    name="email_contato"
                    value={formData.email_contato}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.email_contato && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email_contato}
                    </p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.telefone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.telefone}
                    </p>
                  )}
                </div>

                {/* Localização */}
                <div>
                  <label
                    htmlFor="localizacao"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Localização <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="localizacao"
                    name="localizacao"
                    value={formData.localizacao}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.localizacao && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.localizacao}
                    </p>
                  )}
                </div>

                {/* Site */}
                <div>
                  <label
                    htmlFor="site"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Site
                  </label>
                  <input
                    id="site"
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {errors.site && (
                    <p className="mt-1 text-sm text-red-600">{errors.site}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Descrição e Cultura */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Descrição e Cultura
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {/* Descrição */}
                <div>
                  <label
                    htmlFor="descricao"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Descrição da Empresa
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows="4"
                    value={formData.descricao}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  ></textarea>
                  {errors.descricao && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.descricao}
                    </p>
                  )}
                </div>

                {/* Cultura */}
                <div>
                  <label
                    htmlFor="cultura"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Cultura da Empresa
                  </label>
                  <textarea
                    id="cultura"
                    name="cultura"
                    rows="4"
                    value={formData.cultura}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  ></textarea>
                  {errors.cultura && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cultura}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Alterar Senha */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Alterar Senha
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="senha_atual"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Senha Atual
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="senha_atual"
                      name="senha_atual"
                      value={formData.senha_atual}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={handleTogglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.senha_atual && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.senha_atual}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Botão de Salvar sempre visível no final do formulário */}
            <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                disabled={loading} // Desabilita o botão enquanto está carregando
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
