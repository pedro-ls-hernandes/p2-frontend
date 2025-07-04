"use client";

import { Link } from "react-router-dom";
import AdminHeader from "../../../Component/AdminHeader";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import useFlashMessage from "../../../hooks/useFlashMessage";


export default function AdminDashboard() {
  const [vagas, setVagas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 7;
  const [totalVagas, setTotalVagas] = useState(0);
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const { setFlashMessage } = useFlashMessage();
  useEffect(() => {
    const dashboardLoad = async () => {
      try {
        api.get("/empresas/DashboardAdmin/").then((response) => {
          const { estatisticas, vagasRecentes } = response.data;

          setVagas(
            vagasRecentes?.map((vaga) => ({
              id: vaga.id,
              titulo: vaga.titulo,
              tipo: vaga.tipo,
              localizacao: vaga.localizacao,
              data: new Date(vaga.data).toLocaleDateString("pt-BR"),
              empresa: vaga.empresa,
              status: vaga.status,
            }))
          );

          setTotalVagas(estatisticas.totalVagas);
          setTotalEmpresas(estatisticas.totalEmpresas);
          setTotalUsuarios(estatisticas.totalUsuarios);
        });
      } catch (error) {
        console.error("Erro ao carregar dados da empresa:", error);
        setFlashMessage("Erro ao carregar dados da empresa.", "error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    dashboardLoad();
  }, []);

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vagas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vagas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            Bem-vindo ao painel administrativo do DevStage. Gerencie vagas,
            empresas e usuários.
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-dark">Total de Vagas</p>
                <h3 className="text-2xl font-bold text-gray-dark">
                  {totalVagas}
                </h3>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-dark">Empresas Parceiras</p>
                <h3 className="text-2xl font-bold text-gray-dark">{totalEmpresas}</h3>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-dark">Usuários Cadastrados</p>
                <h3 className="text-2xl font-bold text-gray-dark">{totalUsuarios}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de vagas recentes */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-dark">Vagas Recentes</h2>
            <Link
              to="/admin/vagas/nova"
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Cadastrar Nova Vaga
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-medium">
              <thead className="bg-gray-light">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Título da Vaga
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Empresa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Localização
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-dark uppercase tracking-wider"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-medium">
                {vagas?.map((vaga) => (
                  <tr key={vaga.id} className="hover:bg-gray-light">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-dark">
                        {vaga.titulo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-dark">{vaga.tipo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-dark">
                        {vaga.empresa}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-dark">
                        {vaga.localizacao}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-dark">{vaga.data}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-normal rounded-full ${vaga.status === "Ativa"
                          ? "bg-green-100 text-green-800"
                          : vaga.status === "Pausada"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {vaga.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/vagas/${vaga.titulo}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </Link>
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex flex-col lg:flex-row justify-between items-center border-t border-gray-medium">
            <div className="text-sm text-gray-dark">
              Mostrando{" "}
              <span className="font-medium">{indexOfFirstItem + 1}</span>
              {" a "}
              <span className="font-medium">
                {indexOfLastItem > vagas.length
                  ? vagas.length
                  : indexOfLastItem}
              </span>{" "}
              de <span className="font-medium">{vagas.length}</span> resultados
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border border-gray-medium rounded-md text-sm ${currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-dark hover:bg-gray-light cursor-pointer"
                  }`}
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border rounded-md text-sm ${currentPage === i + 1
                    ? "bg-primary text-white border-primary"
                    : "text-gray-dark border-gray-medium hover:bg-gray-light"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border border-gray-medium rounded-md text-sm ${currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-dark hover:bg-gray-light cursor-pointer"
                  }`}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
