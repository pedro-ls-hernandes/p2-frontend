import api from "../../utils/api";
import FeatureCard from "../../Component/lib/FeatureCard.jsx";
import SearchBar from "../../Component/lib/SearchBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Component/Header/index.jsx";
import { VagaCard } from "../../Component/VagaCard.jsx";
import { motion } from "framer-motion";

function Home() {
  const [vagas, setVagas] = useState([]);
  // Função para buscar e combinar as vagas
  const fetchAndCombineVagas = async (searchQuery = "") => {
    try {
      // 1. Buscar vagas internas
      const internalVagasResponse = await api.get(`/vagas?search=${searchQuery}`);
      const internalVagas = internalVagasResponse.data.vagas.map((vaga) => {
        const createdAtDate = new Date(vaga.createdAt); // Manter como Date object para ordenação
        return {
          id: vaga._id,
          titulo: vaga.titulo,
          empresa: vaga.empresa?.nome || "Não informado",
          logo: vaga.empresa?.logo ? process.env.REACT_APP_API + vaga.empresa.logo : "https://placehold.co/80x80?text=NO%20IMAGE",
          localizacao: `${vaga.localizacao} (${vaga.modalidade})`,
          modalidade: vaga.modalidade,
          tipo: vaga.tipoContrato,
          data: createdAtDate.toLocaleDateString("pt-BR", { // Campo 'data' para exibição formatada
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          sortDate: createdAtDate, // Campo 'sortDate' para ordenação
          tags: vaga.requisitos,
          descricao: vaga.descricao,
          origem: 'interna'
        };
      });

      // 2. Buscar vagas externas
      const externalVagasResponse = await api.get(`/vagasExternas?search=${searchQuery}`);
      const externalVagas = externalVagasResponse.data.vagas.map((vaga) => {
        let publishedDate = vaga.publicadoEm;
        if (publishedDate === "Invalid Date" || !publishedDate) {
          publishedDate = new Date();
        } else {
          publishedDate = new Date(vaga.publicadoEm); // Já é um Date object, garantir
        }

        return {
          id: vaga.id_,
          titulo: vaga.titulo,
          empresa: vaga.empresa || "Não informado",
          logo: "https://placehold.co/80x80?text=NO%20IMAGE",
          localizacao: `${vaga.localizacao} (${vaga.modalidade})`,
          modalidade: vaga.modalidade,
          tipo: vaga.tipoContrato,
          data: publishedDate.toLocaleDateString("pt-BR", { // Campo 'data' para exibição formatada
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          sortDate: publishedDate, // Campo 'sortDate' para ordenação
          tags: Array.isArray(vaga.requisitos) ? vaga.requisitos : [vaga.requisitos || "Não informado"],
          descricao: vaga.descricao,
          origem: 'externa',
          link_candidatura: vaga.link_candidatura,
        };
      });

      // 3. Combinar as vagas
      const combinedVagas = [...internalVagas, ...externalVagas];

      // Ordenar as vagas combinadas pela data de publicação (mais recente primeiro)
      // Usar o campo `sortDate` para uma comparação numérica direta de objetos Date
      combinedVagas.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());


      setVagas(combinedVagas);
    } catch (error) {
      console.error("Erro ao buscar e combinar vagas:", error);
      setVagas([]);
    }
  };

  const iconsFloat1 = [
    "csharp.svg",
    "css.svg",
    "git.svg",
    "html5.svg",
    "java.svg",
    "nodejs02.svg",
  ]
  const iconsFloat2 = [
    "html5.svg",
    "java.svg",
  ]
  const iconsFloat3 = [
    "javascript.svg",
    "react.svg",
    "mysql.svg",
  ]
  const iconsFloat4 = [
    "javascript.svg",
    "react.svg",
    "mysql.svg",
    "php.svg",
    "python.svg",
    "csharp.svg",
  ]
  const iconsFloat5 = [
    "nodejs02.svg",
    "csharp.svg",
  ]
  //  const iconsFloat4 = [
  //   "csharp.svg",
  //   "css.svg",
  //   "git.svg",
  //   "html5.svg",
  //   "java.svg",
  //   "javascript.svg",
  //   "react.svg",
  //   "mysql.svg",
  //   "nodejs02.svg",
  //   "php.svg",
  //   "python.svg",
  // ]

  useEffect(() => {
    fetchAndCombineVagas("");
  }, []);

  const vagasRecentes = vagas.slice(0, 3);
  return (
    <div className="flex-grow">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-purple-light overflow-hidden flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: .5 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="container mx-auto absolute z-0 inset-0 pointer-events-none flex flex-col items-center justify-between opacity-70">
          {[iconsFloat1, iconsFloat4].map((images, index) => (
            <div key={index} className="flex flex-row justify-between w-full h-full">
              {/* random number 2 or 3 */}
              {images.map((image, i) => (
                <div key={i} className={`max-w-12`} style={{
                  transform: `translate(${Math.ceil(Math.random() * (16 - 13) + 13)}px, ${Math.ceil(Math.random() * (6 - 3) + 3)}px) rotate(${Math.ceil(Math.random() * (26 - (-26)) + 26)}deg)`
                }}>
                  <img src={`/icons/${image}`} className={`w-12 h-12 animate-float-infinite`}
                    style={{
                      animationDelay: `${Math.random() * 2}s`
                    }}
                    alt="" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        <div className="container flex h-full items-center mx-auto px-4 sm:px-6 lg:px-8 py-12 md:pb-0 md:py-16 relative z-10">
          <div className="flex flex-col justify-between w-full gap-5 md:flex-row items-center z-10">
            <div className="md:w-2/4 mb-10 md:mb-0 max-w-[500px]">
              <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                  <span className="text-primary">Encontre seu</span>
                  <br />
                  <span className="text-secondary">Estágio</span>{" "}
                  <span className="text-primary">ideal!</span>
                </h1>
                <p className="text-lg mb-8 text-primary">
                  Conecte-se com as melhores oportunidades de estágio em
                  desenvolvimento de software
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Link
                  to="/registrar"
                  className="flex justify-center items-center relative text-sm font-light bg-purple-medium hover:text-white hover:bg-primary text-primary py-2 pl-1 px-5 w-full max-w-60 rounded-full transition-colors"
                >
                  Cadastre-se Agora!
                  <span className="border-2 rounded-full text-base animate-bounce-right border-primary bg-primary absolute right-3 p-0.5 h-6 w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/4 flex justify-center  relative overflow-hidden">
              <div className="h-96 bg-primary w-full max-w-80 rounded-xl -bottom-8 relative"></div>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="absolute left-0 right-0 bottom-0"
                >
                  <img
                    src="/images/girl_notebook.png"
                    alt="Garota com Notebook"
                  />
                </motion.div>
              </div>
            </div>
            <div className="md:w-1/4 flex flex-col gap-3 justify-center md:justify-end relative">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <FeatureCard
                    icon={
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                    }
                    title="Encontre vagas relevantes rapidamente com filtros avançados."
                    className="max-w-xs"
                  />
                </motion.div>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FeatureCard
                    icon={
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                      </svg>
                    }
                    title="Aprenda com artigos exclusivos para seu sucesso."
                    className="max-w-xs"
                  />
                </motion.div>
              </div>

              <div className="relative ">
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <FeatureCard
                    icon={
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                      </svg>
                    }
                    title="Receba alertas personalizados de novas oportunidades."
                    className="max-w-xs"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* Search Section */}
        <SearchBar />
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {vagas.length === 0 ? (
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
                Não encontramos vagas no momento, Volte mais tarde
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary">
                  Vagas Recentes
                </h2>
                <p className="mt-4 text-lg text-gray-dark">
                  Confira as últimas oportunidades adicionadas à nossa
                  plataforma
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vagasRecentes.map((vaga) => (
                  <VagaCard key={vaga.id} vaga={vaga} />
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  to="/vagas"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  Ver todas as vagas
                  <svg
                    className="ml-2 h-5 w-5"
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
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para encontrar seu estágio ideal?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes que já encontraram oportunidades
            incríveis através do DevStage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/registrar"
              className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-colors"
            >
              Cadastre-se Gratuitamente
            </Link>
            <Link
              to="/vagas"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Explorar Vagas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;