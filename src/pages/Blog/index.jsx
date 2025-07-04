"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Component/Header/index.jsx";
import useFlashMessage from "../../hooks/useFlashMessage.jsx";
import api from "../../utils/api.jsx";

// Componente para exibir um card de post do blog
function BlogPostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow">
      <div className="relative flex h-48 w-full overflow-hidden">
        <img
          src={process.env.REACT_APP_API + post?.imagem_capa || "/placeholder.svg"}
          alt={post?.titulo}
          fill
          className="object-cover w-full"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {post.categoria}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-xs text-gray-dark">{new Date(post.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-dark mb-2 line-clamp-2">
          {post.titulo}
        </h3>
        <p className="text-gray-dark mb-4 line-clamp-3">{post.resumo}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
              <span className="text-primary font-bold text-xs">
                {post.autor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-dark">
                {post.autor}
              </p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>
          <Link
            to={`/blog/${post.titulo}`}
            className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
          >
            Ler mais
            <svg
              className="ml-1 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Componente para exibir um post em destaque
function FeaturedPost({ post }) {
  if (!post) return null; // Não renderiza se não houver post em destaque

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-full w-full max-h-96 overflow-hidden">
          <img
            src={process.env.REACT_APP_API + post?.imagem_capa || "/placeholder.svg"}
            alt={post?.titulo}
            fill
            className="object-cover w-full"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.categoria}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-dark">{new Date(post.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-dark mb-4">
            {post.titulo}
          </h2>
          <p className="text-gray-dark mb-6">{post.resumo}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary font-bold">
                  {post.autor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-dark">{post.autor}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
            <Link
              to={`/blog/${post.titulo}`}
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              Ler artigo
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6); // Você pode ajustar este número

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchArtigos = async () => {
      try {
        setError(null);
        const response = await api.get("/artigos");
        // Ordena os posts pelo createdAt, do mais novo para o mais antigo, ao carregar
        const sortedPosts = response.data.artigos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogPosts(sortedPosts || []);
      } catch (err) {
        console.error("Erro ao carregar artigos:", err);
        setError("Não foi possível carregar os artigos.");
        setFlashMessage("Erro ao carregar artigos.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchArtigos();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao pesquisar
  };

  const handleCategoryFilterChange = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1); // Resetar para a primeira página ao filtrar
  };

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

  // Obter o post em destaque (o mais recente)
  const featuredPost = blogPosts[0];
  // Obter os posts não-destacados para filtragem e paginação
  const nonFeaturedPosts = blogPosts.slice(1);

  // Aplicar filtros de busca e categoria aos posts não-destacados
  const filteredNonFeaturedPosts = nonFeaturedPosts.filter(post => {
    const matchesCategory = categoryFilter ? post.category === categoryFilter : true;
    const matchesSearch = searchTerm
      ? post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.autor.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Lógica de Paginação
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredNonFeaturedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredNonFeaturedPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Obter categorias únicas para o filtro
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  return (
    <div className="flex-grow bg-gray-light">
      <Header />
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog DevStage
            </h1>
            <p className="text-lg mb-6">
              Dicas, tutoriais e insights para impulsionar sua carreira em
              desenvolvimento de software
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar artigos..."
                className="w-full py-3 px-4 pr-10 rounded-lg text-gray-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                value={searchTerm} // Conecta o input ao estado searchTerm
                onChange={handleSearchChange} // Adiciona o manipulador de eventos
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedPost post={featuredPost} />
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}

          {/* Posts Grid */}
          {currentPosts.length === 0 && !loading && (
            <div className="bg-white rounded-xl shadow-soft p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-dark mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-gray-dark mb-4">
                Ajuste sua busca ou filtros.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
          {/* Pagination */}
          {filteredNonFeaturedPosts.length > postsPerPage && (
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-l-md border border-gray-medium bg-white text-sm font-medium text-gray-dark hover:bg-gray-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-2 border-t border-b border-gray-medium text-sm font-medium cursor-pointer ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-gray-dark hover:bg-gray-light'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-r-md border border-gray-medium bg-white text-sm font-medium text-gray-dark hover:bg-gray-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}