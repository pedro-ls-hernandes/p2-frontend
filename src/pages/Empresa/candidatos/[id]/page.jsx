"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import EmpresaHeader from "../../../../components/EmpresaHeader";
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  GraduationCap,
  Check,
  X,
  Clock,
  Eye,
} from "lucide-react";

export default function DetalhesCandidato() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [candidato, setCandidato] = useState(null);

  useEffect(() => {
    const loadCandidatoData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dados mockados do candidato
        const candidatoData = {
          id: params.id,
          nome: "Ana Silva",
          email: "ana.silva@email.com",
          telefone: "(11) 99999-9999",
          localizacao: "São Paulo, SP",
          foto: "/placeholder.svg?height=120&width=120",
          tipo: "Estudante",
          dataNascimento: "1998-05-15",

          // Dados acadêmicos (para estudantes)
          instituicao: "Universidade de São Paulo (USP)",
          curso: "Ciência da Computação",
          semestre: "6º semestre",
          previsaoFormatura: "2025-12-15",

          // Dados profissionais (para profissionais)
          empresa: null,
          cargo: null,
          experiencia: null,

          // Informações gerais
          resumo:
            "Estudante de Ciência da Computação apaixonada por desenvolvimento frontend. Tenho experiência em projetos acadêmicos e pessoais usando React, JavaScript e Python. Busco uma oportunidade de estágio para aplicar meus conhecimentos e crescer profissionalmente.",

          habilidades: [
            "JavaScript",
            "React.js",
            "HTML5",
            "CSS3",
            "Python",
            "Git",
            "Node.js",
            "SQL",
          ],

          experiencias: [
            {
              titulo: "Projeto Final - Sistema de Gestão Acadêmica",
              empresa: "USP",
              periodo: "Ago 2024 - Dez 2024",
              descricao:
                "Desenvolvimento de um sistema web para gestão acadêmica usando React.js no frontend e Node.js no backend. Responsável pela criação das interfaces de usuário e integração com APIs.",
            },
            {
              titulo: "Monitor de Programação I",
              empresa: "USP",
              periodo: "Mar 2024 - Jul 2024",
              descricao:
                "Auxiliei estudantes iniciantes em programação, tirando dúvidas sobre lógica de programação e Python. Desenvolvi materiais de apoio e exercícios práticos.",
            },
          ],

          educacao: [
            {
              instituicao: "Universidade de São Paulo (USP)",
              curso: "Bacharelado em Ciência da Computação",
              periodo: "2022 - 2025 (em andamento)",
              status: "Em andamento",
            },
          ],

          candidatura: {
            vaga: {
              titulo: "Desenvolvedor Frontend React",
              id: "vaga-001",
            },
            dataCandidatura: "2024-01-15",
            status: "pendente",
            cartaApresentacao:
              "Olá! Sou estudante de Ciência da Computação na USP e tenho grande interesse em desenvolvimento frontend. Durante minha graduação, desenvolvi diversos projetos usando React.js e JavaScript, incluindo um sistema de gestão acadêmica como projeto final. Tenho experiência como monitora de programação, o que me ajudou a desenvolver habilidades de comunicação e trabalho em equipe. Estou muito animada com a oportunidade de fazer parte da equipe e contribuir com meus conhecimentos enquanto aprendo com profissionais experientes.",
            curriculo: "/curriculos/ana-silva.pdf",
          },
        };

        setCandidato(candidatoData);
      } catch (error) {
        console.error("Erro ao carregar dados do candidato:", error);
        alert("Erro ao carregar dados do candidato");
      } finally {
        setLoading(false);
      }
    };

    loadCandidatoData();
  }, [params.id]);

  const handleStatusChange = async (novoStatus) => {
    try {
      console.log(`Alterando status para: ${novoStatus}`);

      setCandidato((prev) => ({
        ...prev,
        candidatura: {
          ...prev.candidatura,
          status: novoStatus,
        },
      }));

      alert(
        `Candidatura ${
          novoStatus === "aprovada" ? "aprovada" : "rejeitada"
        } com sucesso!`
      );
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      alert("Erro ao alterar status. Tente novamente.");
    }
  };

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

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EmpresaHeader />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">
              Carregando dados do candidato...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!candidato) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EmpresaHeader />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Candidato não encontrado
            </h3>
            <p className="text-gray-600">
              O candidato solicitado não foi encontrado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EmpresaHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Perfil do Candidato
              </h1>
              <p className="text-gray-600">
                Informações detalhadas sobre {candidato.nome}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Informações Básicas */}
          <div className="lg:col-span-1 space-y-6">
            {/* Perfil */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <img
                  src={candidato.foto || "/placeholder.svg"}
                  alt={candidato.nome}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-gray-900">
                  {candidato.nome}
                </h2>
                <p className="text-gray-600">{candidato.tipo}</p>

                <div className="mt-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      candidato.candidatura.status
                    )}`}
                  >
                    {getStatusIcon(candidato.candidatura.status)}
                    <span className="ml-1 capitalize">
                      {candidato.candidatura.status}
                    </span>
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">{candidato.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">{candidato.telefone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">{candidato.localizacao}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {calcularIdade(candidato.dataNascimento)} anos
                  </span>
                </div>
              </div>
            </div>

            {/* Informações Acadêmicas/Profissionais */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {candidato.tipo === "Estudante"
                  ? "Informações Acadêmicas"
                  : "Informações Profissionais"}
              </h3>

              {candidato.tipo === "Estudante" ? (
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      Instituição:
                    </span>
                    <p className="text-gray-600">{candidato.instituicao}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Curso:</span>
                    <p className="text-gray-600">{candidato.curso}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Semestre:</span>
                    <p className="text-gray-600">{candidato.semestre}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Previsão de Formatura:
                    </span>
                    <p className="text-gray-600">
                      {new Date(candidato.previsaoFormatura).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      Empresa Atual:
                    </span>
                    <p className="text-gray-600">{candidato.empresa}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Cargo:</span>
                    <p className="text-gray-600">{candidato.cargo}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Experiência:
                    </span>
                    <p className="text-gray-600">{candidato.experiencia}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Candidatura */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Candidatura
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Vaga:</span>
                  <p className="text-gray-600">
                    {candidato.candidatura.vaga.titulo}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Data da Candidatura:
                  </span>
                  <p className="text-gray-600">
                    {new Date(
                      candidato.candidatura.dataCandidatura
                    ).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              {candidato.candidatura.curriculo && (
                <div className="mt-4">
                  <button className="flex items-center w-full px-3 py-2 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Currículo
                  </button>
                </div>
              )}
            </div>

            {/* Ações */}
            {candidato.candidatura.status === "pendente" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ações
                </h3>

                <div className="space-y-3">
                  <button
                    onClick={() => handleStatusChange("aprovada")}
                    className="flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Aprovar Candidatura
                  </button>
                  <button
                    onClick={() => handleStatusChange("rejeitada")}
                    className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Rejeitar Candidatura
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resumo */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Resumo Profissional
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {candidato.resumo}
              </p>
            </div>

            {/* Habilidades */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Habilidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidato.habilidades.map((habilidade, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {habilidade}
                  </span>
                ))}
              </div>
            </div>

            {/* Experiências */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Experiências
              </h3>
              <div className="space-y-6">
                {candidato.experiencias.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-500 pl-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {exp.titulo}
                        </h4>
                        <p className="text-purple-600 font-medium">
                          {exp.empresa}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {exp.periodo}
                      </span>
                    </div>
                    <p className="text-gray-700">{exp.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Educação */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Educação
              </h3>
              <div className="space-y-4">
                {candidato.educacao.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">
                        {edu.curso}
                      </h4>
                      <p className="text-purple-600 font-medium">
                        {edu.instituicao}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-500">
                          {edu.periodo}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            edu.status === "Em andamento"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {edu.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carta de Apresentação */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Carta de Apresentação
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {candidato.candidatura.cartaApresentacao}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
