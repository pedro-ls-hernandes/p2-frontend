"use client"

import { useState, useEffect } from "react"
import Header from "../../../Component/Header"
import { Link, useParams } from "react-router-dom"
import api from "../../../utils/api"
import useFlashMessage from "../../../hooks/useFlashMessage"

// Componente para exibir posts relacionados
function RelatedPostCard({ post }) {
    return (
        <div className="bg-white rounded-lg shadow-soft overflow-hidden hover:shadow-medium transition-shadow">
            <div className="relative h-40 w-full">
                <img src={process.env.REACT_APP_API + post?.imagem_capa || "/placeholder.svg"} alt={post.titulo} fill className="object-cover" />
            </div>
            <div className="p-4">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.categoria}</span>
                <h3 className="text-lg font-bold text-gray-dark mt-2 mb-1 line-clamp-2">{post.titulo}</h3>
                <p className="text-sm text-gray-dark mb-2 line-clamp-2">{post.resumo}</p>
                <Link
                    to={`/blog/${post.titulo}`}
                    className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                >
                    Ler mais
                    <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default function BlogPost() {
    const { titulo } = useParams();
    const [post, setPost] = useState(null)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const { setFlashMessage } = useFlashMessage(); // Inicialize o hook

    useEffect(() => {
        const fetchArtigo = async () => {
            try {
                const response = await api.get(`/artigos/${titulo}`); // Endpoint para buscar artigos
                setPost(response.data.artigo || []);
                debugger
            } catch (err) {
                console.error("Erro ao carregar artigos:", err);
                setFlashMessage("Erro ao carregar artigos.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchArtigo();
    }, [titulo])

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow bg-gray-light flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </main>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow bg-gray-light flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-dark mb-4">Post não encontrado</h1>
                        <p className="text-gray-dark mb-6">O artigo que você está procurando não existe ou foi removido.</p>
                        <Link
                            to="/blog"
                            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                            Voltar para o Blog
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-light">
                {/* Hero Section */}
                <section className="bg-primary text-white py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center mb-4">
                                <Link to="/blog" className="text-white/80 hover:text-white flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2"
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
                                    Voltar para o Blog
                                </Link>
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.titulo}</h1>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">
                                        {post.autor
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .substring(0, 2)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">{post.autor}</p>
                                    <p className="text-sm text-white/80">{new Date(post.createdAt).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="relative h-80 w-full mb-8 rounded-xl overflow-hidden">
                                <img src={process.env.REACT_APP_API + post?.imagem_capa || "/placeholder.svg"} alt={post.titulo} fill className="object-cover w-full" />
                            </div>

                            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.conteudo.split("\n").join("<br/>") }}></div>
                                <div className="mt-8 pt-6 border-t border-gray-medium">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="bg-gray-light text-gray-dark text-sm px-3 py-1 rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="pb-16">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-dark mb-6">Artigos Relacionados</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedPosts.map((relatedPost) => (
                                        <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="bg-primary py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Gostou deste conteúdo?</h2>
                            <p className="text-white/80 mb-8">
                                Inscreva-se em nossa newsletter para receber mais artigos como este diretamente no seu e-mail.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                                <input
                                    type="email"
                                    placeholder="Seu melhor e-mail"
                                    className="flex-1 px-4 py-3 rounded-lg text-gray-dark focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                                <button className="bg-secondary hover:bg-secondary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors">
                                    Inscrever-se
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
