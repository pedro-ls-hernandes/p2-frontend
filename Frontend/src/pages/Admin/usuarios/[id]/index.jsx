"use client";

import { useState, useEffect } from "react";
import AdminHeader from "../../../../Component/AdminHeader";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import {
  BookOpen,
  Briefcase,
  Building,
  Clipboard,
  Eye,
  EyeOff,
  FileText,
  GitBranch,
  Linkedin,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";

export default function AdminUsuarioForm() {  
  const { id } = useParams();
  const isEditing = (id && id !== "novo");
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    tipo: "Estudante",
    curso: "",
    instituicao: "",
    empresa: "",
    cargo: "",
    telefone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    sobre: "",
    status: "Ativo",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Simular carregamento de dados para edição
  useEffect(() => {
    const carregarUsuario = async () => {
      setIsLoading(true);
      // Simulação de API call
      await api.get(`/users/${id}`).then((response) => {
        //map first item from vaga
        const { user } = response.data;

        if (user) {
          setFormData(user);
        }

        setIsLoading(false);
      });
    };

    if (isEditing) {
      carregarUsuario();
    } else {
      setIsLoading(false);
    }
  }, [isEditing]);

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

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "E-mail inválido";

    if (formData.tipo === "Estudante") {
      if (!formData.curso.trim()) newErrors.curso = "Curso é obrigatório";
      if (!formData.instituicao.trim())
        newErrors.instituicao = "Instituição é obrigatória";
    } else if (formData.tipo === "Recrutador") {
      if (!formData.empresa.trim()) newErrors.empresa = "Empresa é obrigatória";
      if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
    }

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
      api.post(
        `/users/${isEditing ? "Update/" + formData._id : "Register/"}`,
        formData
      );

      setSuccessMessage(
        isEditing
          ? "Usuario atualizada com sucesso!"
          : "Usuario cadastrada com sucesso!"
      );
      setFlashMessage(msgText, msgType);
      navigate("/admin/usuarios");
    } catch (error) {
      console.error("Erro ao salvar Usuario:", error);
      setErrors({ submit: "Ocorreu um erro ao salvar. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminHeader activeTab="usuarios" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center">
            <Link
              to="/admin/usuarios"
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
              {isEditing ? "Editar Usuário" : "Cadastrar Novo Usuário"}
            </h1>
          </div>
          <p className="text-gray-dark mt-1">
            {isEditing
              ? "Atualize as informações do usuário conforme necessário."
              : "Preencha o formulário abaixo para cadastrar um novo usuário."}
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
                {/* Tipo de Usuário */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Conta
                  </label>
                  <div className="relative">
                    <select
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      disabled={isEditing ? true : false}
                      className={`${
                        isEditing && "bg-gray-100"
                      } block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    >
                      <option value="estudante">Estudante</option>
                      <option value="empresa">Empresa</option>
                    </select>
                  </div>
                </div>
                {/* Nome */}
                {formData.tipo === "estudante" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                            errors.nome
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      {errors.nome && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.nome}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* CNPJ */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu CNPJ"
                        />
                      </div>
                    </div>

                    {/* Razão Social */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razão Social
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="razao_social"
                          value={formData.razao_social}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Sua razão social"
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                        errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                        errors.password
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Crie uma senha segura"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {formData.tipo.toLowerCase() === "estudante" && (
                  <>
                    {/* Curso */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Curso
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="curso"
                          value={formData.curso}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                            errors.curso
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="Seu curso"
                        />
                      </div>
                      {errors.curso && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.curso}
                        </p>
                      )}
                    </div>

                    {/* Instituição de Ensino */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instituição de Ensino
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="instituicao_ensino"
                          value={formData.instituicao_ensino}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                            errors.instituicao_ensino
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="Sua instituição de ensino"
                        />
                      </div>
                      {errors.instituicao_ensino && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.instituicao_ensino}
                        </p>
                      )}
                    </div>

                    {/* GitHub */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub (Opcional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <GitBranch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="github"
                          value={formData.github}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu perfil do GitHub"
                        />
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn (Opcional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Linkedin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu perfil do LinkedIn"
                        />
                      </div>
                    </div>

                    {/* Curriculo */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Carregar Curriculo (Opcional)
                      </label>
                      <div className="relative">
                        <input
                          name="curriculo"
                          value={formData.curriculo}
                          onChange={handleChange}
                          className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          aria-describedby="file_input_help"
                          type="file"
                        />
                        <p
                          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                          id="file_input_help"
                        >
                          SVG, PNG, JPG or GIF (MAX. 800x400px).
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Sobre e Portfólio */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sobre você (Opcional)
                  </label>
                  <textarea
                    name="sobre"
                    value={formData.sobre}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    rows="3"
                    placeholder="Fale um pouco sobre você..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfólio (Opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="portifolio"
                      value={formData.portifolio}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Link do seu portfólio"
                    />
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p>{errors.submit}</p>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <Link
                  to="/admin/usuarios"
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
                  {isEditing ? "Atualizar Usuário" : "Cadastrar Usuário"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
