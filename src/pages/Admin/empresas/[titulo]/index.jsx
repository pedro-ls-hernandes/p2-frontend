"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../../../Component/AdminHeader";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import api from "../../../../utils/api";

export default function AdminEmpresaForm({ id }) {
  const { titulo } = useParams();
  const isEditing = titulo !== "nova";
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    nome: "",
    setor: "",
    localizacao: "",
    cnpj: "",
    site: "",
    email_contato: "",
    telefone: "",
    cultura: "",
    descricao: "",
    logo: "",
    status: "Ativa",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // Simulação de dados da vaga
  useEffect(() => {
    const carregarEmpresa = async () => {
      setIsLoading(true);
      // Simulação de API call
      await api.get(`/empresas/${titulo}`).then((response) => {
        //map first item from vaga
        const { empresa } = response.data;

        if (empresa) {
          setFormData(empresa);
        }

        setIsLoading(false);
      });
    };

    if (isEditing) {
      carregarEmpresa();
    } else {
      setIsLoading(false);
    }
  }, [titulo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome da empresa é obrigatório";
    if (!formData.setor.trim()) newErrors.setor = "Setor é obrigatório";
    if (!formData.localizacao.trim())
      newErrors.localizacao = "Localização é obrigatória";
    if (!formData.email_contato.trim())
      newErrors.email_contato = "E-mail de contato é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email_contato))
      newErrors.email_contato = "E-mail inválido";
    if (!formData.cnpj.trim()) newErrors.cnpj = "CNPJ é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");

    let msgText = "Cadastro realizado com sucesso";
    let msgType = "success";

    console.log(formData);
    // Simulação de envio para API
    try {
      console.log(formData);
      api.post(
        `/empresas/${
          isEditing ? "EditarEmpresa/" + formData._id : "CadastrarEmpresa"
        }`,
        formData
      );

      setSuccessMessage(
        isEditing
          ? "Empresa atualizada com sucesso!"
          : "Empresa cadastrada com sucesso!"
      );
      setFlashMessage(msgText, msgType);
      navigate("/admin/empresas");
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
      setErrors({ submit: "Ocorreu um erro ao salvar. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminHeader activeTab="empresas" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center">
            <Link
              to="/admin/empresas"
              className="text-primary hover:text-primary-dark mr-2"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-dark">
              {isEditing ? "Editar Empresa" : "Cadastrar Nova Empresa"}
            </h1>
          </div>
          <p className="text-gray-dark mt-1">
            {isEditing
              ? "Atualize as informações da empresa conforme necessário."
              : "Preencha o formulário abaixo para cadastrar uma nova empresa parceira."}
          </p>
        </div>

        {isLoading && !formData.nome ? (
          <div className="bg-white rounded-xl shadow-soft p-8 flex justify-center">
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-gray-dark">Carregando informações...</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CNPJ */}
                <div className="col-span-1 md:col-span-2">
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
                    className={`block w-full px-3 py-2 border ${
                      errors.cnpj ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: 12.345.678/0001-90"
                  />
                  {errors.cnpj && (
                    <p className="mt-1 text-sm text-red-500">{errors.cnpj}</p>
                  )}
                </div>

                {/* Nome da empresa */}
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Nome da empresa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.nome ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: Acme Brasil"
                  />
                  {errors.nome && (
                    <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
                  )}
                </div>

                {/* Setor */}
                <div>
                  <label
                    htmlFor="setor"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Setor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="setor"
                    name="setor"
                    value={formData.setor}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.setor ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: Tecnologia, Saúde, Educação"
                  />
                  {errors.setor && (
                    <p className="mt-1 text-sm text-red-500">{errors.setor}</p>
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
                    className={`block w-full px-3 py-2 border ${
                      errors.localizacao
                        ? "border-red-500"
                        : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: São Paulo, SP"
                  />
                  {errors.localizacao && (
                    <p className="mt-1 text-sm text-red-500">
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
                    type="text"
                    id="site"
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.site ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: www.empresa.com.br"
                  />
                  {errors.site && (
                    <p className="mt-1 text-sm text-red-500">{errors.site}</p>
                  )}
                </div>

                {/* E-mail de contato */}
                <div>
                  <label
                    htmlFor="contato"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    E-mail de contato <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email_contato"
                    name="email_contato"
                    value={formData.email_contato}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.email_contato
                        ? "border-red-500"
                        : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: contato@empresa.com.br"
                  />
                  {errors.email_contato && (
                    <p className="mt-1 text-sm text-red-500">
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
                    type="text"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.telefone ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: (11) 3456-7890"
                  />
                  {errors.telefone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.telefone}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="Ativa">Ativa</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Inativa">Inativa</option>
                  </select>
                </div>

                {/* Logo */}
                <div>
                  <label
                    htmlFor="logo"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Logo da empresa
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB
                  </p>
                </div>

                {/* Descrição */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="descricao"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Descrição da empresa
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows="4"
                    value={formData.descricao}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Descreva brevemente a empresa, sua área de atuação e diferenciais..."
                  ></textarea>
                </div>

                {/* Cultura */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="descricao"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Cultura da empresa
                  </label>
                  <textarea
                    id="cultura"
                    name="cultura"
                    rows="4"
                    value={formData.cultura}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Descreva brevemente a empresa, sua área de atuação e diferenciais..."
                  ></textarea>
                </div>
              </div>

              {errors.submit && (
                <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p>{errors.submit}</p>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <Link
                  to="/admin/empresas"
                  className="px-4 py-2 border border-gray-medium rounded-lg text-gray-dark hover:bg-gray-light transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {isEditing ? "Atualizar Empresa" : "Cadastrar Empresa"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
