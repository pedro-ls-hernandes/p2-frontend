"use client"

import { useState } from "react"
import { Search, Plus, Edit3, Eye, Trash2, Users, MapPin, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
// import EmpresaHeader from "../../../Component/EmpresaHeader"

export default function EmpresaVagas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [modalidadeFilter, setModalidadeFilter] = useState("")

  const [vagas] = useState([
    {
      id: 1,
      titulo: "Desenvolvedor Frontend Júnior",
      descricao: "Desenvolvimento de interfaces web modernas usando React e TypeScript",
      modalidade: "Remoto",
      localizacao: "São Paulo, SP",
      tipoContrato: "CLT",
      nivel: "Júnior",
      salario: "R$ 4.500 - R$ 6.500",
      vagasDisponiveis: 2,
      candidatos: 24,
      visualizacoes: 156,
      publicadoEm: "2024-01-15",
      ativo: true,
      status: "Ativa",
    },
    {
      id: 2,
      titulo: "Estagiário de Desenvolvimento",
      descricao: "Oportunidade de estágio em desenvolvimento web para estudantes",
      modalidade: "Híbrido",
      localizacao: "São Paulo, SP",
      tipoContrato: "Estágio",
      nivel: "Estagiário",
      salario: "R$ 1.800",
      vagasDisponiveis: 1,
      candidatos: 18,
      visualizacoes: 89,
      publicadoEm: "2024-01-12",
      ativo: true,
      status: "Ativa",
    },
    {
      id: 3,
      titulo: "Desenvolvedor Full Stack",
      descricao: "Desenvolvimento completo de aplicações web e mobile",
      modalidade: "Presencial",
      localizacao: "São Paulo, SP",
      tipoContrato: "CLT",
      nivel: "Pleno",
      salario: "R$ 8.000 - R$ 12.000",
      vagasDisponiveis: 1,
      candidatos: 31,
      visualizacoes: 203,
      publicadoEm: "2024-01-08",
      ativo: false,
      status: "Pausada",
    },
    {
      id: 4,
      titulo: "Desenvolvedor Backend Sênior",
      descricao: "Desenvolvimento de APIs e arquitetura de sistemas",
      modalidade: "Remoto",
      localizacao: "Qualquer lugar",
      tipoContrato: "CLT",
      nivel: "Sênior",
      salario: "R$ 12.000 - R$ 18.000",
      vagasDisponiveis: 1,
      candidatos: 45,
      visualizacoes: 312,
      publicadoEm: "2024-01-05",
      ativo: true,
      status: "Ativa",
    },
    {
      id: 5,
      titulo: "Designer UX/UI",
      descricao: "Criação de interfaces e experiências digitais",
      modalidade: "Híbrido",
      localizacao: "São Paulo, SP",
      tipoContrato: "CLT",
      nivel: "Pleno",
      salario: "R$ 6.000 - R$ 9.000",
      vagasDisponiveis: 1,
      candidatos: 12,
      visualizacoes: 78,
      publicadoEm: "2023-12-28",
      ativo: false,
      status: "Encerrada",
    },
  ])

  const filteredVagas = vagas.filter((vaga) => {
    const matchesSearch =
      vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaga.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || vaga.status === statusFilter
    const matchesModalidade = modalidadeFilter === "" || vaga.modalidade === modalidadeFilter

    return matchesSearch && matchesStatus && matchesModalidade
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Ativa":
        return "bg-green-100 text-green-800"
      case "Pausada":
        return "bg-yellow-100 text-yellow-800"
      case "Encerrada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleToggleStatus = (vagaId) => {
    // Implementar lógica para ativar/pausar vaga
    console.log("Toggle status da vaga:", vagaId)
  }

  const handleDeleteVaga = (vagaId) => {
    if (window.confirm("Tem certeza que deseja excluir esta vaga?")) {
      // Implementar lógica para excluir vaga
      console.log("Excluir vaga:", vagaId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-light">
      {/* <EmpresaHeader activeTab="vagas" /> */}

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-dark">Minhas Vagas</h1>
              <p className="text-gray-dark">Gerencie todas as suas vagas publicadas</p>
            </div>
            <Link
              href="/empresa/vagas/nova"
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Vaga
            </Link>
          </div>
        </div>

        {/* Filtros e busca */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Buscar vagas por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="block w-full sm:w-auto px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="Ativa">Ativa</option>
                <option value="Pausada">Pausada</option>
                <option value="Encerrada">Encerrada</option>
              </select>

              <select
                className="block w-full sm:w-auto px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={modalidadeFilter}
                onChange={(e) => setModalidadeFilter(e.target.value)}
              >
                <option value="">Todas modalidades</option>
                <option value="Remoto">Remoto</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de vagas */}
        <div className="space-y-6">
          {filteredVagas.length > 0 ? (
            filteredVagas.map((vaga) => (
              <div key={vaga.id} className="bg-white rounded-xl shadow-soft p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-dark">{vaga.titulo}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vaga.status)}`}>
                        {vaga.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{vaga.descricao}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {vaga.localizacao} • {vaga.modalidade}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(vaga.publicadoEm).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {vaga.candidatos} candidatos
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {vaga.visualizacoes} visualizações
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/empresa/vagas/${vaga.id}`}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      title="Editar vaga"
                    >
                      <Edit3 className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/empresa/candidaturas?vaga=${vaga.id}`}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      title="Ver candidaturas"
                    >
                      <Users className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/vagas/${vaga.id}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                      title="Visualizar vaga"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteVaga(vaga.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Excluir vaga"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <div className="text-sm">
                      <span className="text-gray-500">Salário:</span>
                      <span className="font-medium text-gray-dark ml-1">{vaga.salario}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Vagas:</span>
                      <span className="font-medium text-gray-dark ml-1">{vaga.vagasDisponiveis}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Nível:</span>
                      <span className="font-medium text-gray-dark ml-1">{vaga.nivel}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(vaga.id)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        vaga.ativo
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                      }`}
                    >
                      {vaga.ativo ? "Pausar" : "Ativar"}
                    </button>
                    <Link
                      href={`/empresa/candidaturas?vaga=${vaga.id}`}
                      className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      Ver Candidatos ({vaga.candidatos})
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-soft p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-dark mb-2">Nenhuma vaga encontrada</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter || modalidadeFilter
                  ? "Tente ajustar os filtros de busca"
                  : "Você ainda não criou nenhuma vaga"}
              </p>
              <Link
                href="/empresa/vagas/nova"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Primeira Vaga
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
