import { Link } from "react-router-dom";
import Header from "../../Component/Header";
export default function Sobre() {
  return (
    <div className="flex-grow">
      <Header />
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sobre o DevStage
            </h1>
            <p className="text-lg mb-0">
              Conectando estudantes às melhores oportunidades de estágio em
              desenvolvimento de software
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-white text-justify">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-dark mb-6 text-center">
              Nossa História
            </h2>
            <div className="prose prose-lg mx-auto text-gray-dark space-y-2">
              <p className="indent-8">
                O DevStage nasceu em 2022 a partir da percepção de uma lacuna
                significativa no mercado: a dificuldade que estudantes de
                tecnologia enfrentavam para encontrar estágios de qualidade que
                realmente contribuíssem para seu desenvolvimento profissional.
              </p>
              <p className="indent-8">
                Fundado por um grupo de desenvolvedores e educadores apaixonados
                por tecnologia e educação, o DevStage tem como missão criar uma
                ponte eficiente entre estudantes talentosos e empresas
                inovadoras, facilitando o início da carreira de novos
                desenvolvedores.
              </p>
              <p className="indent-8"> 
                Desde o início, nosso foco tem sido não apenas listar vagas, mas
                criar um ecossistema completo de suporte ao desenvolvimento
                profissional, com conteúdos educativos, mentoria e uma
                comunidade ativa de apoio mútuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-dark mb-12 text-center">
            Missão, Visão e Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-3">Missão</h3>
              <p className="text-gray-dark">
                Conectar estudantes de tecnologia às melhores oportunidades de
                estágio, promovendo o desenvolvimento de talentos e contribuindo
                para a formação da próxima geração de desenvolvedores.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-3">Visão</h3>
              <p className="text-gray-dark">
                Ser a plataforma de referência para o início de carreira em
                tecnologia no Brasil, reconhecida pela qualidade das
                oportunidades e pelo impacto positivo na formação profissional
                dos estudantes.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white rounded-xl shadow-soft p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-3">Valores</h3>
              <ul className="text-left text-gray-dark space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>Qualidade:</strong> Comprometimento com a excelência
                    em tudo o que fazemos.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>Inclusão:</strong> Promover oportunidades para
                    todos, independentemente de origem ou formação.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>Inovação:</strong> Buscar constantemente novas
                    formas de conectar talentos e empresas.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>
                    <strong>Transparência:</strong> Comunicação clara e honesta
                    com todos os nossos usuários.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-dark mb-12 text-center">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Membro 1 */}
            <div className="bg-gray-light rounded-xl p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="http://localhost:3000/images/2149328341 - Editado.png"
                  alt="Foto de Carlos Mendes"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-dark">
                Carlos Mendes
              </h3>
              <p className="text-primary font-medium mb-2">CEO & Co-fundador</p>
              <p className="text-sm text-gray-dark mb-4">
                Desenvolvedor full-stack com mais de 10 anos de experiência e
                apaixonado por educação em tecnologia.
              </p>
              <div className="flex justify-center space-x-3">
                <a to="#" className="text-gray-dark hover:text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a to="#" className="text-gray-dark hover:text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Membro 2 */}
            <div className="bg-gray-light rounded-xl p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="http://localhost:3000/images/684684684 - Editado.png"
                  alt="Foto de Ana Rodrigues"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-dark">
                Ana Rodrigues
              </h3>
              <p className="text-primary font-medium mb-2">
                CTO & Co-fundadora
              </p>
              <p className="text-sm text-gray-dark mb-4">
                Especialista em desenvolvimento web e mobile, com experiência em
                grandes empresas de tecnologia.
              </p>
              <div className="flex justify-center space-x-3">
                <a to="#" className="text-gray-dark hover:text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a to="#" className="text-gray-dark hover:text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Membro 3 */}
            <div className="bg-gray-light rounded-xl p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="http://localhost:3000/images/71449925 - Editado.jpg"
                  alt="Foto de Marcos Silva"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-dark">Marcos Silva</h3>
              <p className="text-primary font-medium mb-2">Head de Parcerias</p>
              <p className="text-sm text-gray-dark mb-4">
                Especialista em relações empresariais com vasta experiência em
                negociações e parcerias estratégicas.
              </p>
              <div className="flex justify-center space-x-3">
                <a to="#" className="text-gray-dark hover:text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a to="#" className="text-gray-dark hover:text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Membro 4 */}
            <div className="bg-gray-light rounded-xl p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="http://localhost:3000/images/681681646 - Editado.jpg"
                  alt="Foto de Juliana Costa"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-dark">
                Juliana Costa
              </h3>
              <p className="text-primary font-medium mb-2">Head de Conteúdo</p>
              <p className="text-sm text-gray-dark mb-4">
                Especialista em produção de conteúdo educativo para
                desenvolvedores e estudantes de tecnologia.
              </p>
              <div className="flex justify-center space-x-3">
                <a to="#" className="text-gray-dark hover:text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a to="#" className="text-gray-dark hover:text-primary">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Faça parte dessa história</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes e empresas que já fazem parte da
            comunidade DevStage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/registrar"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Cadastre-se Gratuitamente
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
