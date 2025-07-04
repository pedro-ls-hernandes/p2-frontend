"use client";

import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Brasil");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (location) params.append("location", location);

    window.location.href = `/vagas?${params.toString()}`;
  };

  return (
    <div className="w-full bg-primary py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start md:items-center  justify-between gap-4">
          <div className="text-white">
            <h3 className="text-xl font-bold">Que vaga você procura?</h3>
            <p className="text-sm text-white/80">
              Exemplo: desenvolvedor PHP junior
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row w-full justify-between max-w-6xl gap-4"
          >
            <div className="relative flex-1 w-full">
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

            <div className="relative flex-1 w-full">
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
  );
}
