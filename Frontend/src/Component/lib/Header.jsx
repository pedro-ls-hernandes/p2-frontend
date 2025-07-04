"use client"

import { useState } from "react"
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 3L4 14H15L11 21L20 10H9L13 3Z" fill="#FFA45B" />
                  </svg>
                </div>
                <span className="text-primary text-2xl font-bold">
                  Dev<span className="text-secondary">Stage</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/vagas"
              className="text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Busca de Vagas
            </Link>
            <Link
              to="/blog"
              className="text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/sobre"
              className="text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sobre
            </Link>
            <Link
              to="/faq"
              className="text-gray-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Entrar
            </Link>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link
            to="/vagas"
            className="text-gray-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Busca de Vagas
          </Link>
          <Link
            to="/blog"
            className="text-gray-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Blog
          </Link>
          <Link
            to="/sobre"
            className="text-gray-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Sobre
          </Link>
          <Link
            to="/faq"
            className="text-gray-dark hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            FAQ
          </Link>
          <Link
            to="/login"
            className="bg-primary hover:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  )
}
