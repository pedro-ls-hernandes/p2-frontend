"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  Clock,
  User,
  Calendar,
  MapPin,
  Briefcase,
  Paperclip,
} from "lucide-react";
import AdminHeader from "../../../Component/AdminHeader";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import { set } from "lodash";

export default function CandidaturasEmpresa() {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroVaga, setFiltroVaga] = useState("todas");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [vagas, setVagas] = useState(null);
  const [candidaturas, setCandidaturas] = useState(null);
  const [totalCandidaturas, setTotalCandidaturas] = useState(0);
  const [totalVagas, setTotalVagas] = useState(0);

  // Simulação de dados da vaga
  useEffect(() => {
    const carregarVaga = async () => {
      // Simulação de API call
      await api.get(`/vagas/`).then((response) => {
        //map first item from vaga
        const { vagas } = response.data;

        if (vagas) {
          debugger
          setVagas(vagas);
        }
      });
    };

    const carregarCandidaturas = async () => {
      await api.get(`/vagas/CandidatosByEmpresa/`).then((response) => {
        const { candidaturas, totalCandidatos, totalVagas } = response.data;

        if (response.data) {
          setCandidaturas(candidaturas);
          setTotalCandidaturas(totalCandidatos);
          setTotalVagas(totalVagas);
        }
      });
    };

    //promise for two functions
    Promise.all([carregarVaga(), carregarCandidaturas()]).then(() => {

      setLoading(false);
    });
  }, []);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "visualizada":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "aprovada":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejeitada":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-4 h-4" />;
      case "visualizada":
        return <Eye className="w-4 h-4" />;
      case "aprovada":
        return <Check className="w-4 h-4" />;
      case "rejeitada":
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const candidaturasFiltradas = candidaturas.filter((candidatura) => {
    const matchStatus =
      filtroStatus === "todos" || candidatura.status === filtroStatus;
    const matchVaga =
      filtroVaga === "todas" || candidatura.vaga.id === filtroVaga;
    const matchBusca =
      candidatura.candidato.nome.toLowerCase().includes(busca.toLowerCase()) ||
      candidatura.candidato.email.toLowerCase().includes(busca.toLowerCase()) ||
      candidatura.vaga.titulo.toLowerCase().includes(busca.toLowerCase());

    return matchStatus && matchVaga && matchBusca;
  });

  const handleStatusChange = (candidaturaId, vagaId, novoStatus) => {
    if (window.confirm(`tem certeza que deseja altear o status para ${novoStatus}?`)) {
      try {
        api
          .put(`/vagas/AlterarStatusCandidatura/`, {
            status: novoStatus,
            vagaId: vagaId,
            candidaturaId: candidaturaId,
          })
          .then((response) => {
            const { candidatura } = response.data;
            if (candidatura) {
              setCandidaturas(
                candidaturas.map((candidatura) => {
                  if (candidatura.id === candidaturaId) {
                    candidatura.status = novoStatus;
                  }
                  return candidatura;
                })
              );
            }
          });
      } catch (error) { }
      console.log(
        `Alterando status da candidatura ${candidaturaId} para ${novoStatus}`
      );
    }
    // Aqui você implementaria a lógica para atualizar o status
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader activeTab={"Candidaturas"} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-dark">Candidaturas</h1>
          <p className="text-gray-600">
            Gerencie todas as candidaturas recebidas para suas vagas
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vagas</p>
                <p className="text-2xl font-bold text-gray-900">{totalVagas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Candidaturas
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCandidaturas}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por candidato, email ou vaga..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtro por Vaga */}
            <div className="lg:w-64">
              <select
                value={filtroVaga}
                onChange={(e) => setFiltroVaga(e.target.value)}
                className="w-full px-3 py-2 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="todas">Todas as vagas</option>
                {vagas.map((vaga) => (
                  <option key={vaga._id} value={vaga._id}>
                    {vaga.titulo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Candidaturas */}
        <div className="space-y-4">
          {candidaturasFiltradas.map((candidatura) => (
            <div
              key={candidatura.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                {/* Informações do Candidato */}
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <img
                    src={candidatura.candidato.foto ? process.env.REACT_APP_API + candidatura.candidato.foto : "/placeholder.svg"}
                    alt={candidatura.candidato.nome}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {candidatura.candidato.nome}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          candidatura.status
                        )}`}
                      >
                        {getStatusIcon(candidatura.status)}
                        <span className="ml-1 capitalize">
                          {candidatura.status}
                        </span>
                      </span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {candidatura.candidato.email}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {candidatura.candidato.localizacao}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {candidatura.vaga.titulo}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(
                            candidatura.dataCandidatura
                          ).toLocaleDateString("pt-BR")}
                        </span>
                      </div>

                      {candidatura.candidato.tipo === "estudante" ? (
                        <p className="text-purple-600">
                          {candidatura.candidato.curso} -{" "}
                          {candidatura.candidato.instituicao}
                        </p>
                      ) : (
                        <p className="text-purple-600">
                          {candidatura.candidato.cargo} |{" "}
                          {candidatura.candidato.empresa} |{" "}
                          {candidatura.candidato.experiencia}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`${process.env.REACT_APP_API + candidatura.candidato.curriculoUrl}`}
                    target="_blank"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <Paperclip />
                    Ver Curriculo
                  </Link>

                  <>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          candidatura.id,
                          candidatura.vaga.id,
                          "aprovada"
                        )
                      }
                      disabled={candidatura.status === "aprovada"}
                      className={`px-4 py-2 ${candidatura.status === "aprovada" ? "bg-gray-200 cursor-no-drop" : "bg-green-600 hover:bg-green-700 "} text-white rounded-lg transition-colors text-sm font-medium`}
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(
                          candidatura.id,
                          candidatura.vaga.id,
                          "rejeitada"
                        )
                      }
                      disabled={candidatura.status === "rejeitada"}
                      className={`px-4 py-2 ${candidatura.status === "rejeitada" ? "bg-gray-200 cursor-no-drop" : "bg-red-600 hover:bg-red-700 "} text-white rounded-lg transition-colors text-sm font-medium`}
                    >
                      Rejeitar
                    </button>
                  </>
                </div>
              </div>

              {/* Carta de Apresentação */}
              {candidatura.cartaApresentacao && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Carta de Apresentação:
                  </h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {candidatura.cartaApresentacao}
                  </p>
                </div>
              )}
            </div>
          ))}

          {candidaturasFiltradas.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma candidatura encontrada
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou aguarde novas candidaturas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
