"use client";

import { useState, useEffect, useRef } from "react";
import AdminHeader from "../../../../Component/AdminHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFlashMessage from "../../../../hooks/useFlashMessage";
import api from "../../../../utils/api";

// Categorias disponíveis para o blog
const categorias = [
  "Carreira",
  "Tecnologia",
  "Portfólio",
  "Produtividade",
  "Currículo",
  "Entrevista",
];

export default function AdminBlogPostForm() {
  const { titulo } = useParams();
  const isEditing = titulo && titulo !== "novo";
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    titulo: "",
    slug: "",
    resumo: "",
    conteudo: "",
    categoria: "",
    tags: "",
    autor: "",
    imagem_capa: "",
    status: "Rascunho",
    dataPublicacao: "",
  });

  const [previewImage, setPreviewImage] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Simular carregamento de dados para edição
  useEffect(() => {
    const carregarEmpresa = async () => {
      
      setIsLoading(true);
      // Simulação de API call
      await api.get(`/artigos/${titulo}`).then((response) => {
        //map first item from vaga
        const { artigo } = response.data;

        if (artigo) {
          setFormData(artigo);
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

  // Gerar slug a partir do título
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "titulo") {
      // Gerar slug automaticamente a partir do título
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Criar URL para preview da imagem
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData((prev) => ({ ...prev, imagem_capa: file }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) newErrors.titulo = "Título é obrigatório";
    if (!formData.resumo.trim()) newErrors.resumo = "Resumo é obrigatório";
    if (!formData.conteudo.trim())
      newErrors.conteudo = "Conteúdo é obrigatório";
    if (!formData.categoria) newErrors.categoria = "Categoria é obrigatória";
    if (!formData.autor.trim()) newErrors.autor = "Autor é obrigatório";

    if (formData.status === "Agendado" && !formData.dataPublicacao) {
      newErrors.dataPublicacao =
        "Data de publicação é obrigatória para posts agendados";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");

    try {
      api.post(
        `/artigos/${
          isEditing ? "EditarArtigo/" + formData._id : "CadastrarArtigo/"
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFlashMessage(
        isEditing
          ? "Artigo atualizada com sucesso!"
          : "Artigo cadastrada com sucesso!",
        "success"
      );
      navigate("/admin/blog");
    } catch (error) {
      console.error("Erro ao salvar Artigo:", error);
      setFlashMessage("Erro ao salvar Artigo. Tente novamente.", "error");
      setErrors({ submit: "Ocorreu um erro ao salvar. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminHeader activeTab="blog" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center">
            <Link
              to="/admin/blog"
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
              {isEditing ? "Editar Artigo" : "Criar Novo Artigo"}
            </h1>
          </div>
          <p className="text-gray-dark mt-1">
            {isEditing
              ? "Atualize as informações do artigo conforme necessário."
              : "Preencha o formulário abaixo para criar um novo artigo para o blog."}
          </p>
        </div>

        {isLoading && !formData.titulo ? (
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

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações básicas */}
                <div className="col-span-1 md:col-span-2">
                  <h2 className="text-lg font-semibold text-gray-dark mb-4">
                    Informações Básicas
                  </h2>
                </div>

                {/* Título */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="titulo"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.titulo ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: Como se preparar para entrevistas técnicas de estágio"
                  />
                  {errors.titulo && (
                    <p className="mt-1 text-sm text-red-500">{errors.titulo}</p>
                  )}
                </div>

                {/* Slug */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Slug{" "}
                    <span className="text-xs text-gray-500">
                      (URL amigável)
                    </span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    className="block w-full bg-gray-100 border-0 px-3 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Ex: como-se-preparar-para-entrevistas-tecnicas-de-estagio"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Gerado automaticamente a partir do título. Pode ser editado
                    manualmente.
                  </p>
                </div>

                {/* Resumo */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="resumo"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Resumo <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="resumo"
                    name="resumo"
                    rows="3"
                    value={formData.resumo}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.resumo ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Breve resumo do artigo (será exibido na listagem)"
                  ></textarea>
                  {errors.resumo && (
                    <p className="mt-1 text-sm text-red-500">{errors.resumo}</p>
                  )}
                </div>

                {/* Categoria */}
                <div>
                  <label
                    htmlFor="categoria"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.categoria ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                  {errors.categoria && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.categoria}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Tags{" "}
                    <span className="text-xs text-gray-500">
                      (separadas por vírgula)
                    </span>
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Ex: Entrevista, Estágio, Carreira"
                  />
                </div>

                {/* Autor */}
                <div>
                  <label
                    htmlFor="autor"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Autor <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="autor"
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.autor ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Ex: Ana Rodrigues"
                  />
                  {errors.autor && (
                    <p className="mt-1 text-sm text-red-500">{errors.autor}</p>
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
                    <option value="Rascunho">Rascunho</option>
                    <option value="Publicado">Publicado</option>
                    <option value="Agendado">Agendado</option>
                  </select>
                </div>

                {/* Data de Publicação (apenas para posts agendados) */}
                {formData.status === "Agendado" && (
                  <div>
                    <label
                      htmlFor="dataPublicacao"
                      className="block text-sm font-medium text-gray-dark mb-1"
                    >
                      Data de Publicação <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="dataPublicacao"
                      name="dataPublicacao"
                      value={formData.dataPublicacao}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border ${
                        errors.dataPublicacao
                          ? "border-red-500"
                          : "border-gray-medium"
                      } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    />
                    {errors.dataPublicacao && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.dataPublicacao}
                      </p>
                    )}
                  </div>
                )}

                {/* Imagem de Capa */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="imagem_capa"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Imagem de Capa
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      id="imagem_capa"
                      name="imagem_capa"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  {previewImage && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-dark mb-2">Preview:</p>
                      <div className="relative h-40 w-full md:w-1/2 rounded-lg overflow-hidden">
                        <img
                          mg
                          src={
                            formData.imagem_capa
                              ? typeof formData.imagem_capa === "string"
                                ? process.env.REACT_APP_API +
                                  formData?.imagem_capa
                                : URL.createObjectURL(formData.imagem_capa)
                              : "https://placehold.co/500x200/EEE/31343C"
                          }
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="conteudo"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Conteúdo <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="conteudo"
                    name="conteudo"
                    rows="15"
                    value={formData.conteudo}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${
                      errors.conteudo ? "border-red-500" : "border-gray-medium"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="Conteúdo do artigo (suporta HTML básico)"
                  ></textarea>
                  {errors.conteudo && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.conteudo}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Dica: Você pode usar tags HTML básicas como &lt;h3&gt;,
                    &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;,
                    &lt;li&gt;, etc.
                  </p>
                </div>
              </div>

              {errors.submit && (
                <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p>{errors.submit}</p>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <Link
                  to="/admin/blog"
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
                  {isEditing ? "Atualizar Artigo" : "Publicar Artigo"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
