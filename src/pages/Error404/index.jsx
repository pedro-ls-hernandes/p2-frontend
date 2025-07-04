"use client"

import { Home, Search, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-light via-white to-secondary/10 flex items-center justify-center px-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Número 404 estilizado */}
                <div className="relative mb-8">
                    <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                            <Search className="w-16 h-16 text-primary mx-auto mb-2" />
                            <p className="text-gray-dark font-medium">Página não encontrada</p>
                        </div>
                    </div>
                </div>

                {/* Mensagem principal */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">Oops! Página não encontrada</h2>
                    <p className="text-lg text-gray-600 mb-2">A página que você está procurando não existe ou foi movida.</p>
                    <p className="text-gray-500">Que tal explorar algumas das nossas páginas principais?</p>
                </div>

                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-medium hover:shadow-lg hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                        Voltar ao Início
                    </Link>

                    <Link
                        to="/vagas"
                        className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-medium hover:shadow-lg hover:scale-105"
                    >
                        <Search className="w-5 h-5" />
                        Ver Vagas
                    </Link>
                </div>

                {/* Links úteis */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                    <h3 className="text-lg font-semibold text-gray-dark mb-4">Páginas mais acessadas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link
                            to="/vagas"
                            className="text-primary hover:text-primary-dark font-medium transition-colors duration-200 hover:underline"
                        >
                            Vagas
                        </Link>
                        <Link
                            to="/sobre"
                            className="text-primary hover:text-primary-dark font-medium transition-colors duration-200 hover:underline"
                        >
                            Sobre Nós
                        </Link>
                        <Link
                            to="/blog"
                            className="text-primary hover:text-primary-dark font-medium transition-colors duration-200 hover:underline"
                        >
                            Blog
                        </Link>
                        <Link
                            to="/faq"
                            className="text-primary hover:text-primary-dark font-medium transition-colors duration-200 hover:underline"
                        >
                            FAQ
                        </Link>
                    </div>
                </div>

                {/* Botão voltar */}
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors duration-200 mt-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar à página anterior
                </button>

                {/* Decoração */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-medium/10 rounded-full blur-lg"></div>
            </div>
        </div>
    )
}
