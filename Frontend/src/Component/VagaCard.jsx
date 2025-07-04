import { Link } from "react-router-dom";

export function VagaCard({ vaga }) {
  
  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6 border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-light rounded-lg flex items-center justify-center mr-4 overflow-hidden">
            <img
              src={vaga.logo || "https://placehold.co/60x60/EEE/31343C"}
              alt={vaga.empresa.nome}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-dark">{vaga.titulo}</h3>
            <p className="text-sm text-gray-dark">{vaga.empresa.nome}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-dark mb-2">
            <svg
              className="w-4 h-4 mr-2 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {vaga.localizacao}
          </div>
          <div className="flex items-center text-sm text-gray-dark">
            <svg
              className="w-4 h-4 mr-2 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Publicada em: {vaga.data}
          </div>
        </div>
        <p className="text-sm text-gray-dark mb-4 line-clamp-2">
          {vaga.descricao}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {vaga.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Link
        to={`/vagas/${vaga.titulo}`}
        className="block text-center bg-primary hover:bg-secondary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Ver Detalhes
      </Link>
    </div>
  );
}
