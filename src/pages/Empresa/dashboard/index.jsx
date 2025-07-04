"use client";

import { useState } from "react";
import {
  Briefcase,
  Users,
  Eye,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CheckCheck,
  BanIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminHeader from "../../../Component/AdminHeader";
import { useEffect } from "react";
import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";

export default function EmpresaDashboard() {
  const [loading, setLoading] = useState(true);
  const { setFlashMessage } = useFlashMessage();
  const [vagasRecentes, setVagasRecentes] = useState([]);
  const [candidaturasRecentes, setCandidaturasRecentes] = useState(null);
  const [estatisticas, setEstatisticas] = useState(null);

  useEffect(() => {
    const fetchEmpresaData = async () => {
      try {
        
        api.get("/empresas/DashboardEmpresa/").then((response) => {
          
          const { vagasRecentes, candidaturasRecentes, estatisticas } =
            response.data;

          setVagasRecentes(
            vagasRecentes.map((vaga) => ({
              id: vaga.id,
              titulo: vaga.titulo,
              tipo: vaga.tipo,
              localizacao: vaga.localizacao,
              data: new Date(vaga.data).toLocaleDateString("pt-BR"),
              empresa: vaga.empresa,
              status: vaga.status,
            }))
          );

          setVagasRecentes(vagasRecentes);
          setCandidaturasRecentes(candidaturasRecentes);
          setEstatisticas(estatisticas);
          setLoading(false);
        });
      } catch (error) {
        console.error("Erro ao carregar dados da empresa:", error);
        setFlashMessage("Erro ao carregar dados da empresa.", "error");
        setLoading(false);
      }
    };

    fetchEmpresaData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ativa":
        return "bg-green-100 text-green-800";
      case "Pausada":
        return "bg-yellow-100 text-yellow-800";
      case "Encerrada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCandidaturaStatusColor = (status) => {
    switch (status) {
      case "aprovada":
        return "bg-green-100 text-green-800";
      case "rejeitada":
        return "bg-red-100 text-red-800";
      case "visualizada":
        return "bg-blue-100 text-blue-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCandidaturaStatusIcon = (status) => {
    switch (status) {
      case "aprovada":
        return <CheckCircle className="w-4 h-4" />;
      case "rejeitada":
        return <XCircle className="w-4 h-4" />;
      case "visualizada":
        return <Eye className="w-4 h-4" />;
      case "pendente":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCandidaturaStatusText = (status) => {
    switch (status) {
      case "aprovada":
        return "Aprovada";
      case "rejeitada":
        return "Rejeitada";
      case "visualizada":
        return "Visualizada";
      case "pendente":
        return "Pendente";
      default:
        return "Desconhecido";
    }
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
    <div className="min-h-screen bg-gray-light">
      <AdminHeader activeTab="Dashboard" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-dark">Dashboard</h1>
          <p className="text-gray-dark">
            Bem-vinda ao portal da empresa. Gerencie suas vagas e acompanhe
            candidaturas.
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Vagas */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Briefcase className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-dark">Vagas Ativas</p>
                <h3 className="text-2xl font-bold text-gray-dark">
                  {estatisticas?.vagasAtivas}
                </h3>
              </div>
            </div>
          </div>

          {/* Total de Candidaturas */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-dark">Candidaturas</p>
                <h3 className="text-2xl font-bold text-gray-dark">
                  {estatisticas?.totalCandidaturas}
                </h3>
              </div>
            </div>
          </div>

          {/* Visualizações */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <CheckCheck className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-dark">Vagas Aprovadas</p>
                <h3 className="text-2xl font-bold text-gray-dark">
                  {estatisticas?.statusContagem?.aprovada}
                </h3>
              </div>
            </div>
          </div>

          {/* Taxa de Conversão */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <BanIcon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-dark">Vagas Rejeitadas</p>
                <h3 className="text-2xl font-bold text-gray-dark">
                  {estatisticas?.statusContagem?.aprovada}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vagas Recentes */}
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-gray-medium">
              <h2 className="text-xl font-bold text-gray-dark">Suas Vagas</h2>
              <Link
                to="/empresa/vagas"
                className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
              >
                Ver todas
              </Link>
            </div>

            <div className="divide-y divide-gray-medium">
              {vagasRecentes.map((vaga) => (
                <div
                  key={vaga.id}
                  className="p-6 hover:bg-gray-light transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-dark mb-1">
                        {vaga.titulo}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {vaga.localizacao}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(vaga.dataPublicacao).toLocaleDateString(
                            "pt-BR"
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        vaga.status
                      )}`}
                    >
                      {vaga.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {vaga.candidatos} candidatos
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {vaga.visualizacoes} visualizações
                      </div>
                    </div>
                    <Link
                      to={`/empresa/vagas/${vaga.titulo}`}
                      className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                    >
                      Gerenciar
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-medium">
              <Link
                to="/empresa/vagas/nova"
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Criar Nova Vaga
              </Link>
            </div>
          </div>

          {/* Candidaturas Recentes */}
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-gray-medium">
              <h2 className="text-xl font-bold text-gray-dark">
                Candidaturas Recentes
              </h2>
              <Link
                to="/empresa/candidaturas"
                className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
              >
                Ver todas
              </Link>
            </div>

            <div className="divide-y divide-gray-medium">
              {candidaturasRecentes.map((candidatura) => (
                <div
                  key={candidatura.id}
                  className="p-6 hover:bg-gray-light transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={candidatura.foto ? process.env.REACT_APP_API + candidatura.foto : "/placeholder.svg"}
                      alt={candidatura.candidato}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-dark text-sm">
                        {candidatura.candidato}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {candidatura.vaga}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(candidatura.data).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCandidaturaStatusColor(
                        candidatura.status
                      )}`}
                    >
                      {getCandidaturaStatusIcon(candidatura.status)}
                      {getCandidaturaStatusText(candidatura.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
