import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../../Component/Header";
import api from "../../utils/api";
import { VagaCard } from "../../Component/VagaCard";
import { opcoesHabilidades } from "../../utils/habilidades";

export default function Vagas() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  const [filtroModalidade, setFiltroModalidade] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroRequisito, setFiltroRequisito] = useState(""); // Ajustado para string vazia
  const [currentPage, setCurrentPage] = useState(1);
  const [vagas, setVagas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Brasil");
  const itemsPerPage = 6;

  // Função para buscar e combinar as vagas
  const fetchAndCombineVagas = async (searchQuery = "") => {
    try {
      // 1. Buscar vagas internas
      const internalVagasResponse = await api.get(`/vagas?search=${searchQuery}`);
      const internalVagas = internalVagasResponse.data.vagas.map((vaga) => {
        return {
          id: vaga._id,
          titulo: vaga.titulo,
          empresa: vaga.empresa?.nome || "Não informado", // Usar optional chaining para empresa
          logo: vaga.empresa?.logo ? process.env.REACT_APP_API + vaga.empresa.logo : "https://placehold.co/80x80?text=NO%20IMAGE",
          localizacao: `${vaga.localizacao} (${vaga.modalidade})`,
          modalidade: vaga.modalidade, // Manter o campo modalidade separado para filtros
          tipo: vaga.tipoContrato, // Assumindo que tipoContrato é o "tipo" da vaga interna
          data: new Date(vaga.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          tags: vaga.requisitos,
          descricao: vaga.descricao,
          origem: 'interna' // Adicionar uma flag para identificar a origem
        };
      });

      // 2. Buscar vagas externas
      const externalVagasResponse = await api.get(`/vagasExternas?search=${searchQuery}`);
      const externalVagas = externalVagasResponse.data.vagas.map((vaga) => {
        // Tratar o "Invalid Date" do `publicadoEm`
        let publishedDate = vaga.publicadoEm;
        if (publishedDate === "Invalid Date" || !publishedDate) {
          publishedDate = new Date(); // Usar a data atual se for inválida
        } else {
          publishedDate = new Date(vaga.publicadoEm);
        }

        return {
          id: vaga.id_, // Usar id_ para vagas externas para evitar conflito com _id do MongoDB se necessário, ou use vaga._id se forem únicas
          titulo: vaga.titulo,
          empresa: vaga.empresa || "Não informado", // 'empresa' já é uma string no modelo externo
          logo: "https://placehold.co/80x80?text=NO%20IMAGE", // Empresas externas geralmente não têm logo direto na API JSearch
          localizacao: `${vaga.localizacao} (${vaga.modalidade})`,
          modalidade: vaga.modalidade, // Manter o campo modalidade separado para filtros
          tipo: vaga.tipoContrato, // 'tipoContrato' no modelo externo
          data: publishedDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          tags: Array.isArray(vaga.requisitos) ? vaga.requisitos : [vaga.requisitos || "Não informado"], // Garantir que tags seja array
          descricao: vaga.descricao,
          origem: 'externa', // Adicionar uma flag para identificar a origem
          link_candidatura: vaga.link_candidatura, // Manter o link de candidatura para vagas externas
        };
      });

      // 3. Combinar as vagas
      const combinedVagas = [...internalVagas, ...externalVagas];

      // Opcional: Ordenar as vagas combinadas pela data de publicação (mais recente primeiro)
      combinedVagas.sort((a, b) => new Date(b.data) - new Date(a.data));

      setVagas(combinedVagas);
    } catch (error) {
      console.error("Erro ao buscar e combinar vagas:", error);
      setVagas([]); // Limpar vagas em caso de erro
    }
  };

  useEffect(() => {
    const initialQuery = query || "";
    setSearchTerm(initialQuery);
    fetchAndCombineVagas(initialQuery);
  }, [query]); // Adicionado 'query' como dependência para reagir a mudanças de URL

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    console.log("Buscar por:", searchTerm, "em", location);
    fetchAndCombineVagas(searchTerm);
  };

  const clearFilter = () => {
    setFiltroModalidade("");
    setFiltroTipo("");
    setFiltroRequisito("");
    setSearchTerm("");
    fetchAndCombineVagas(""); // Busca todas as vagas novamente
  };

  // Filtrar vagas com base nos filtros selecionados
  const filteredVagas = vagas?.filter(
    (vaga) =>
      (filtroModalidade === "" || vaga.modalidade === filtroModalidade) && // Usar vaga.modalidade diretamente
      (filtroTipo === "" || vaga.tipo === filtroTipo) &&
      (filtroRequisito === "" || (Array.isArray(vaga.tags) && vaga.tags.includes(filtroRequisito))) // Verificar se tags é um array
  );

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredVagas?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(filteredVagas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex-grow">
      <Header />
      {/* Hero Section com SearchBar */}

      <div className="w-full bg-primary py-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-white">
              <h3 className="text-xl font-bold">Que vaga você procura?</h3>
              <p className="text-sm text-white/80">
                Exemplo: desenvolvedor PHP junior
              </p>
            </div>

            <form
              onSubmit={handleSubmitSearch}
              className="flex flex-col md:flex-row gap-2 w-full md:max-w-3xl"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search-term"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Descrição da Vaga"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="location"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-medium rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Localização"
                  value={location}
                  disabled={true}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-white hover:bg-gray-100 text-primary font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <section className="py-12 bg-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filtros Laterais */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-dark mb-4">
                  Filtros
                </h2>

                {/* Filtro de Modalidade */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-dark mb-2">
                    Modalidade
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="modalidade"
                        value=""
                        checked={filtroModalidade === ""}
                        onChange={() => setFiltroModalidade("")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                      />
                      <span className="ml-2 text-sm text-gray-dark">Todas</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="modalidade"
                        value="Remoto"
                        checked={filtroModalidade === "Remoto"}
                        onChange={() => setFiltroModalidade("Remoto")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                      />
                      <span className="ml-2 text-sm text-gray-dark">
                        Remoto
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="modalidade"
                        value="Presencial"
                        checked={filtroModalidade === "Presencial"}
                        onChange={() => setFiltroModalidade("Presencial")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                      />
                      <span className="ml-2 text-sm text-gray-dark">
                        Presencial
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="modalidade"
                        value="Híbrido"
                        checked={filtroModalidade === "Híbrido"}
                        onChange={() => setFiltroModalidade("Híbrido")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                      />
                      <span className="ml-2 text-sm text-gray-dark">
                        Híbrido
                      </span>
                    </label>
                  </div>
                </div>

                {/* Filtro de Tipo */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-dark mb-2">
                    Tipo
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="tipo"
                        value=""
                        checked={filtroTipo === ""}
                        onChange={() => setFiltroTipo("")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                      />
                      <span className="ml-2 text-sm text-gray-dark">Todos</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="tipo"
                        value="Estágio"
                        checked={filtroTipo === "Estágio"}
                        onChange={() => setFiltroTipo("Estágio")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                      />
                      <span className="ml-2 text-sm text-gray-dark">
                        Estágio
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="tipo"
                        value="Trainee"
                        checked={filtroTipo === "Trainee"}
                        onChange={() => setFiltroTipo("Trainee")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                      />
                      <span className="ml-2 text-sm text-gray-dark">
                        Trainee
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="tipo"
                        value="CLT"
                        checked={filtroTipo === "CLT"}
                        onChange={() => setFiltroTipo("CLT")}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-medium rounded"
                      />
                      <span className="ml-2 text-sm text-gray-dark">CLT</span>
                    </label>
                  </div>
                </div>

                {/* Filtro de Área */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-dark mb-2">
                    Requisitos
                  </h3>
                  <select
                    value={filtroRequisito}
                    onChange={(e) => setFiltroRequisito(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  >
                    <option value="">Todas as áreas</option>
                    {opcoesHabilidades.map((item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>

                {/* Botão para limpar filtros */}
                <button
                  onClick={() => {
                    clearFilter();
                  }}
                  className="w-full py-2 px-4 border border-gray-medium rounded-lg text-gray-dark hover:bg-gray-light transition-colors text-sm"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>

            {/* Lista de Vagas */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-dark">
                  Vagas Disponíveis{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({filteredVagas.length} encontradas)
                  </span>
                </h1>
                <div className="hidden md:block">
                  <select className="px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm">
                    <option value="recentes">Mais recentes</option>
                    <option value="antigas">Mais antigas</option>
                  </select>
                </div>
              </div>

              {filteredVagas.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {currentItems.map((vaga) => (
                      <VagaCard key={vaga.id} vaga={vaga} />
                    ))}
                  </div>

                  {/* Paginação */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <nav className="inline-flex rounded-md shadow-sm">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-2 rounded-l-md border border-gray-medium ${currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-dark hover:bg-gray-light"
                            }`}
                        >
                          Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-2 border-t border-b border-gray-medium ${currentPage === i + 1
                              ? "bg-primary text-white"
                              : "bg-white text-gray-dark hover:bg-gray-light"
                              }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-2 rounded-r-md border border-gray-medium ${currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-dark hover:bg-gray-light"
                            }`}
                        >
                          Próxima
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-soft p-8 text-center">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-dark mb-2">
                    Nenhuma vaga encontrada
                  </h3>
                  <p className="text-gray-dark mb-4">
                    Não encontramos vagas com os filtros selecionados. Tente
                    ajustar seus critérios de busca.
                  </p>
                  <button
                    onClick={() => {
                      clearFilter();
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou a vaga ideal?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Cadastre-se para receber alertas de novas vagas que correspondam ao
            seu perfil e interesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/registrar"
              className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-colors"
            >
              Cadastre-se Gratuitamente
            </Link>
            <Link
              to="/contato"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}