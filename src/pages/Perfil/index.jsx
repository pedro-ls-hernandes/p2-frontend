"use client";

import { useState, useEffect, useContext, use } from "react";
import {
  User,
  MapPin,
  Calendar,
  GraduationCap,
  FileText,
  Upload,
  Edit3,
  Save,
  X,
  Eye,
  Download,
  Trash2,
  Briefcase,
  ExternalLink,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Header from "../../Component/Header";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../context/UserContext";
import api from "../../utils/api";
import Select from "react-select";
import useFlashMessage from "../../hooks/useFlashMessage";
import { opcoesHabilidades } from "../../utils/habilidades";

export default function Perfil() {
  const { authenticated } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState("perfil");
  const [candidaturas, setCandidaturas] = useState([]);
  const { setFlashMessage } = useFlashMessage();
  const [formUser, setFormUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    const carregarDados = async () => {
      if (authenticated) {
        try {
          api.get("/users/Perfil").then((response) => {
            const { user } = response.data;
            setFormUser(user);
            setLoading(false);
          });
        } catch (error) {
          console.error("Erro ao obter dados do usuário:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    carregarDados();
  }, [authenticated]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const handleSalvar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de envio para API
    try {
      setIsLoading(true);
      const response = await api.post("/users/Update/", formUser);
      setFlashMessage(
        response.data.message || "Perfil atualizado com sucesso!",
        "success"
      );
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      const msg = error.response?.data?.message || "Erro ao atualizar perfil.";
      setFlashMessage(msg, "error");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "aprovada":
        return "bg-green-100 text-green-800";
      case "rejeitada":
        return "bg-red-100 text-red-800";
      case "visualizada":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "aprovada":
        return <CheckCircle className="w-4 h-4" />;
      case "rejeitada":
        return <XCircle className="w-4 h-4" />;
      case "visualizada":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "aprovada":
        return "Aprovada";
      case "rejeitada":
        return "Rejeitada";
      case "visualizada":
        return "Visualizada";
      default:
        return "Pendente";
    }
  };

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleAba = (id) => {
    setAbaSelecionada(id);
    if (id === "candidaturas") {
      api.get("vagas/Candidaturas").then((response) => {
        setCandidaturas(response.data.candidaturas);
      });
    }
  };

  const generatePercentage = () => {
    let count = 0;
    for (let key in formUser) {
      if (formUser[key] && formUser[key] !== "") {
        count++;
      }
    }
    return Math.round((count / Object.keys(formUser).length) * 100);
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
    formData.append("foto", file);

    try {
      setIsUploading(true);
      const response = await api.post("/users/upload-foto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Atualiza o estado do usuário com a nova foto
      setFormUser((prev) => ({
        ...prev,
        foto: response.data.foto,
      }));

      setFlashMessage("Foto enviada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
      setFlashMessage("Erro ao enviar foto. Tente novamente.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Função para enviar o currículo
  const handleUploadCurriculo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificar se é PDF
    if (file.type !== "application/pdf") {
      setFlashMessage("Por favor, selecione um arquivo PDF.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("curriculo", file);

    try {
      setIsUploading(true);
      const response = await api.post("/users/upload-curriculo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Atualiza o estado do usuário com o novo currículo
      setFormUser((prev) => ({
        ...prev,
        curriculo: response.data.curriculo,
      }));

      setFlashMessage("Currículo enviado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao enviar currículo:", error);
      setFlashMessage("Erro ao enviar currículo. Tente novamente.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const formatarTamanhoArquivo = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat(bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i];
  };

  const handleFileChange = (e) => {
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormUser((prev) => ({
        ...prev,
        foto: file,
      }));
    }
    handleUploadFoto(e);
  };

  // Função para remover o currículo
  const handleRemoverCurriculo = async () => {
    try {
      setIsUploading(true);
      await api.delete("/users/remover-curriculo");

      // Atualiza o estado removendo o currículo
      setFormUser((prev) => ({
        ...prev,
        curriculo: null,
      }));

      setFlashMessage("Currículo removido com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao remover currículo:", error);
      setFlashMessage("Erro ao remover currículo.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Navegação por Abas */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "perfil", label: "Perfil", icon: User },
                { id: "candidaturas", label: "Candidaturas", icon: Briefcase },
                { id: "curriculo", label: "Currículo", icon: FileText },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleAba(id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${abaSelecionada === id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Aba Perfil */}
            {abaSelecionada === "perfil" && (
              <form
                encType="multipart/form-data"
                className="space-y-8"
                onSubmit={handleSalvar}
              >
                {/* Informações Pessoais */}

                <div className="flex flex-col items-start">
                  <div className="table">
                    <img
                      src={
                        formUser?.foto
                          ? typeof formUser?.foto === "string"
                            ? process.env.REACT_APP_API + formUser?.foto
                            : URL.createObjectURL(formUser?.foto)
                          : "https://placehold.co/100x100/EEE/31343C"
                      }
                      alt={formUser?.nome}
                      className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
                    />

                    <label
                      htmlFor="foto-upload"
                      className="px-4 py-2 border border-gray-medium rounded-lg text-gray-dark hover:bg-gray-light transition-colors cursor-pointer"
                    >
                      <Upload className="w-5 h-5 inline-block mr-2" /> Alterar
                      Foto
                      <input
                        type="file"
                        id="foto-upload"
                        name="foto"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Informações Pessoais
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome completo
                      </label>

                      <input
                        name="nome"
                        onChange={handleChange}
                        type="text"
                        value={formUser?.nome}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        value={formUser?.email}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        name="telefone"
                        onChange={handleChange}
                        type="tel"
                        value={formUser?.telefone}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Resumo Profissional */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Resumo Profissional
                  </h2>
                  <textarea
                    name="sobre"
                    onChange={handleChange}
                    value={formUser?.sobre}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                {/* Habilidades */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Habilidades
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Select
                      isMulti
                      options={opcoesHabilidades}
                      value={opcoesHabilidades.filter((opt) =>
                        (formUser?.habilidades || []).includes(opt.value)
                      )}
                      onChange={(selectedOptions) => {
                        const habilidadesSelecionadas = selectedOptions.map(
                          (opt) => opt.value
                        );
                        
                        setFormUser((prev) => ({
                          ...prev,
                          habilidades: habilidadesSelecionadas,
                        }));
                      }}
                      className="w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      classNamePrefix="select"
                    />
                  </div>
                </div>

                {/* Experiências */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Experiência Profissional
                  </h2>
                  <div className="space-y-4">
                    {formUser?.experiencias.map((exp) => (
                      <div
                        key={exp.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {exp.cargo}
                            </h3>
                            <p className="text-purple-600 font-medium">
                              {exp.empresa}
                            </p>
                            <p className="text-sm text-gray-500">
                              {exp.periodo}
                            </p>
                          </div>
                          <Briefcase className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-sm">{exp.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Salvar alterações
                  </button>
                </div>
              </form>
            )}

            {/* Aba Candidaturas */}
            {abaSelecionada === "candidaturas" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Minhas Candidaturas
                  </h2>
                  <div className="text-sm text-gray-600">
                    {candidaturas.length} candidatura
                    {candidaturas.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="space-y-4">
                  {candidaturas.map((candidatura) => (
                    <div
                      key={candidatura._id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {candidatura.titulo}
                          </h3>
                          <p className="text-purple-600 font-medium mb-2">
                            {candidatura.empresa.nome}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {candidatura.empresa.localizacao}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Aplicado em{" "}
                              {new Date(
                                candidatura.minhaCandidatura.dataCandidatura
                              ).toLocaleDateString("pt-BR")}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              candidatura.minhaCandidatura.status
                            )}`}
                          >
                            {getStatusIcon(candidatura.minhaCandidatura.status)}
                            {getStatusText(candidatura.minhaCandidatura.status)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm font-medium text-gray-800">
                          {candidatura.salario}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Aba Currículo */}
            {abaSelecionada === "curriculo" && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Gerenciar Currículo
                </h2>

                <form
                  method="post"
                  encType="multipart/form-data"
                  className="h-0"
                >
                  <input
                    type="file"
                    id="curriculo-upload"
                    name="curriculo-upload"
                    accept="application/pdf"
                    onChange={handleUploadCurriculo}
                    className="invisible h-0"
                  />
                </form>

                {formUser?.curriculo ? (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {formUser?.curriculo.nome}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatarTamanhoArquivo(formUser?.curriculo.tamanho)}{" "}
                          • Enviado em{" "}
                          {new Date(
                            formUser?.curriculo.dataUpload
                          ).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={`${process.env.REACT_APP_API}${formUser?.curriculo.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                        <button
                          className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          onClick={handleRemoverCurriculo}
                          disabled={isUploading}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <label
                      htmlFor="curriculo-upload"
                      className={`w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${isUploading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-purple-400 hover:bg-purple-50 cursor-pointer"
                        } transition-colors block`}
                      disabled={isUploading}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">
                        {isUploading ? "Enviando..." : "Atualizar currículo"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Arraste um arquivo ou clique para selecionar (PDF)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Nenhum currículo enviado
                    </h3>
                    <label
                      htmlFor="curriculo-upload"
                      className={`w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${isUploading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-purple-400 hover:bg-purple-50 cursor-pointer"
                        } transition-colors block`}
                      disabled={isUploading}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">
                        {isUploading ? "Enviando..." : "Atualizar currículo"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Arraste um arquivo ou clique para selecionar (PDF)
                      </p>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
