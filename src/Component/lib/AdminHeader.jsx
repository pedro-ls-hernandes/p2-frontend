"use client";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/UserContext";
export default function AdminHeader({ activeTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authenticated, logout } = useContext(Context);

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/admin/dashboard" className="flex items-center">
              <div className="flex items-center">
                <img
                  className="h-10 flex"
                  alt="Logo DevStage"
                  src="/images/logo_devstage.png"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/admin/dashboard"
              className={`text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/vagas"
              className={`text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "vagas"
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              Vagas
            </Link>
            <Link
              to="/admin/empresas"
              className={`text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "empresas"
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              Empresas
            </Link>
            <Link
              to="/admin/usuarios"
              className={`text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "usuarios"
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              Usuários
            </Link>
            <Link
              to="/admin/blog"
              className={`text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "blog"
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                className="flex items-center text-sm font-medium text-gray-dark hover:text-primary focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="mr-2">Admin</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                  <Link
                    to="/admin/perfil"
                    className="block px-4 py-2 text-sm text-gray-dark hover:bg-gray-light"
                  >
                    Perfil
                  </Link>
                  <Link
                    to="/admin/configuracoes"
                    className="block px-4 py-2 text-sm text-gray-dark hover:bg-gray-light"
                  >
                    Configurações
                  </Link>
                  <div className="border-t border-gray-medium my-1"></div>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-dark hover:bg-gray-light"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-dark hover:text-primary hover:bg-gray-light focus:outline-none"
            >
              <span className="sr-only">Abrir menu principal</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link
            to="/admin/dashboard"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activeTab === "dashboard"
                ? "text-primary border-l-4 border-primary"
                : "text-gray-dark hover:text-primary"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/vagas"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activeTab === "vagas"
                ? "text-primary border-l-4 border-primary"
                : "text-gray-dark hover:text-primary"
            }`}
          >
            Vagas
          </Link>
          <Link
            to="/admin/empresas"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activeTab === "empresas"
                ? "text-primary border-l-4 border-primary"
                : "text-gray-dark hover:text-primary"
            }`}
          >
            Empresas
          </Link>
          <Link
            to="/admin/usuarios"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activeTab === "usuarios"
                ? "text-primary border-l-4 border-primary"
                : "text-gray-dark hover:text-primary"
            }`}
          >
            Usuários
          </Link>
          <Link
            to="/admin/blog"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              activeTab === "blog"
                ? "text-primary border-l-4 border-primary"
                : "text-gray-dark hover:text-primary"
            }`}
          >
            Blog
          </Link>
          <div className="border-t border-gray-medium my-1"></div>
          <Link
            to="/admin/perfil"
            className="text-gray-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Perfil
          </Link>
          <Link
            to="/admin/configuracoes"
            className="text-gray-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Configurações
          </Link>
          <button
            onClick={logout}
            className="text-gray-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
