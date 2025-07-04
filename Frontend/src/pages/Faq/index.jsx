
import { useState } from "react"
import { Link } from "react-router-dom";
import Header from "../../Component/Header/index.jsx";

const faqData = [
    {
        categoria: "Estudantes",
        perguntas: [
            {
                id: 1,
                pergunta: "Como faço para me cadastrar no DevStage?",
                resposta:
                    "Para se cadastrar no DevStage, basta clicar no botão 'Cadastre-se' no canto superior direito da página inicial. Preencha o formulário com seus dados pessoais e acadêmicos, e você já estará pronto para começar a buscar vagas de estágio.",
                popular: true,
            },
            {
                id: 2,
                pergunta: "O cadastro no DevStage é gratuito?",
                resposta:
                    "Sim, o cadastro no DevStage é totalmente gratuito para estudantes. Não cobramos nenhuma taxa para que você se cadastre, busque vagas ou se candidate a oportunidades de estágio.",
                popular: true,
            },
            {
                id: 3,
                pergunta: "Posso me candidatar a quantas vagas?",
                resposta:
                    "Você pode se candidatar a quantas vagas desejar, não há limite. Recomendamos, no entanto, que você analise bem cada oportunidade e se candidate apenas àquelas que realmente correspondem ao seu perfil e interesses.",
                popular: false,
            },
            {
                id: 4,
                pergunta: "Como saberei se fui selecionado para uma vaga?",
                resposta:
                    "Você receberá notificações por e-mail e dentro da plataforma sempre que houver atualizações sobre suas candidaturas. Além disso, você pode acompanhar o status de todas as suas candidaturas na seção 'Minhas Candidaturas' do seu perfil.",
                popular: false,
            },
            {
                id: 5,
                pergunta: "Posso atualizar meu currículo depois de cadastrado?",
                resposta:
                    "Sim, você pode atualizar seu currículo e informações de perfil a qualquer momento. Basta acessar a seção 'Meu Perfil' e clicar em 'Editar'. Recomendamos manter seu perfil sempre atualizado para aumentar suas chances de ser selecionado.",
                popular: true,
            },
            {
                id: 6,
                pergunta: "Quais documentos preciso para me candidatar a um estágio?",
                resposta:
                    "Para se candidatar a um estágio, você precisará ter seu currículo atualizado e, em alguns casos, uma carta de apresentação. Algumas empresas podem solicitar documentos adicionais como histórico escolar, comprovante de matrícula ou portfólio. Todos esses documentos podem ser anexados ao seu perfil no DevStage.",
                popular: false,
            },
            {
                id: 7,
                pergunta: "Posso receber alertas de novas vagas?",
                resposta:
                    "Sim! Você pode configurar alertas personalizados para receber notificações quando novas vagas que correspondam ao seu perfil forem publicadas. Basta acessar a seção 'Alertas' no seu perfil e definir os critérios de busca que mais te interessam.",
                popular: false,
            },
        ],
    },
    {
        categoria: "Empresas",
        perguntas: [
            {
                id: 8,
                pergunta: "Como posso publicar vagas de estágio no DevStage?",
                resposta:
                    "Para publicar vagas, sua empresa precisa se cadastrar como recrutadora. Após a aprovação do cadastro, você poderá acessar o painel administrativo e clicar em 'Publicar Nova Vaga'. Preencha todas as informações sobre a oportunidade e publique.",
                popular: true,
            },
            {
                id: 9,
                pergunta: "Qual é o custo para publicar vagas?",
                resposta:
                    "Oferecemos diferentes planos para empresas, desde o plano básico gratuito, que permite publicar até 3 vagas por mês, até planos premium com recursos avançados. Você pode conferir todos os detalhes na página de 'Planos para Empresas'.",
                popular: true,
            },
            {
                id: 10,
                pergunta: "Como funciona o processo de seleção de candidatos?",
                resposta:
                    "Após publicar uma vaga, você receberá candidaturas de estudantes interessados. Você pode filtrar os candidatos por habilidades, formação e outros critérios, além de acessar seus currículos e portfólios. Todo o processo de comunicação com os candidatos pode ser feito pela plataforma.",
                popular: false,
            },
            {
                id: 11,
                pergunta: "É possível destacar minhas vagas na plataforma?",
                resposta:
                    "Sim, oferecemos a opção de destacar vagas, o que as coloca em posição privilegiada nos resultados de busca e na página inicial. Vagas destacadas recebem, em média, 3x mais visualizações e candidaturas. Esta é uma funcionalidade disponível nos planos premium.",
                popular: false,
            },
            {
                id: 12,
                pergunta: "Como posso gerenciar múltiplas vagas ao mesmo tempo?",
                resposta:
                    "Nosso painel administrativo para empresas permite gerenciar facilmente múltiplas vagas. Você pode visualizar todas as suas vagas ativas, pausadas ou encerradas, filtrar candidatos em massa, programar entrevistas e manter um histórico completo de todas as interações.",
                popular: false,
            },
            {
                id: 13,
                pergunta: "Posso integrar o DevStage com outros sistemas de RH?",
                resposta:
                    "Sim, oferecemos APIs e integrações com os principais sistemas de RH do mercado. Isso permite que você sincronize vagas, candidaturas e outras informações entre o DevStage e seu sistema atual. Entre em contato com nosso suporte para mais detalhes sobre integrações disponíveis.",
                popular: false,
            },
        ],
    },
    {
        categoria: "Plataforma",
        perguntas: [
            {
                id: 14,
                pergunta: "O DevStage está disponível em quais regiões?",
                resposta:
                    "Atualmente, o DevStage está disponível em todo o Brasil. Temos vagas de estágio em diversas cidades e também oportunidades remotas, que podem ser acessadas de qualquer lugar do país.",
                popular: false,
            },
            {
                id: 15,
                pergunta: "Vocês oferecem suporte para usuários?",
                resposta:
                    "Sim, oferecemos suporte por e-mail e chat para todos os usuários da plataforma. Estudantes e empresas podem entrar em contato através da página de 'Contato' ou diretamente pelo e-mail suporte@devstage.com.br.",
                popular: true,
            },
            {
                id: 16,
                pergunta: "O DevStage tem aplicativo para celular?",
                resposta:
                    "Ainda não temos um aplicativo nativo, mas nosso site é totalmente responsivo e pode ser acessado perfeitamente de qualquer dispositivo móvel. Estamos trabalhando no desenvolvimento de aplicativos para iOS e Android, que serão lançados em breve.",
                popular: false,
            },
            {
                id: 17,
                pergunta: "Como funciona o blog do DevStage?",
                resposta:
                    "O blog do DevStage é atualizado semanalmente com conteúdos relevantes para estudantes de tecnologia e empresas. Publicamos artigos sobre carreira, tecnologia, dicas para entrevistas, tendências do mercado e muito mais. Você pode se inscrever em nossa newsletter para receber as atualizações.",
                popular: false,
            },
            {
                id: 18,
                pergunta: "Posso sugerir melhorias para a plataforma?",
                resposta:
                    "Absolutamente! Valorizamos muito o feedback dos nossos usuários. Você pode enviar sugestões através da página de 'Contato' ou diretamente para o e-mail feedback@devstage.com.br. Analisamos todas as sugestões e trabalhamos constantemente para melhorar a plataforma.",
                popular: false,
            },
        ],
    },
    {
        categoria: "Privacidade e Segurança",
        perguntas: [
            {
                id: 19,
                pergunta: "Como o DevStage protege meus dados pessoais?",
                resposta:
                    "Levamos a segurança e privacidade muito a sério. Todos os dados são armazenados em servidores seguros com criptografia de ponta a ponta. Seguimos rigorosamente a Lei Geral de Proteção de Dados (LGPD) e nunca compartilhamos suas informações com terceiros sem seu consentimento explícito.",
                popular: true,
            },
            {
                id: 20,
                pergunta: "Quem pode ver meu currículo e informações pessoais?",
                resposta:
                    "Apenas empresas com vagas às quais você se candidatou podem ver seu currículo completo e informações de contato. Empresas que estão apenas navegando pela plataforma podem ver um perfil limitado, sem seus dados pessoais. Você tem controle total sobre a visibilidade do seu perfil nas configurações de privacidade.",
                popular: true,
            },
            {
                id: 21,
                pergunta: "Como posso excluir minha conta e dados?",
                resposta:
                    "Você pode solicitar a exclusão da sua conta e de todos os seus dados a qualquer momento. Basta acessar as configurações da sua conta e clicar em 'Excluir Conta'. Todos os seus dados pessoais serão permanentemente removidos dos nossos servidores em até 30 dias, conforme exigido pela LGPD.",
                popular: false,
            },
            {
                id: 22,
                pergunta: "O DevStage utiliza cookies?",
                resposta:
                    "Sim, utilizamos cookies para melhorar sua experiência na plataforma, lembrar suas preferências e fornecer funcionalidades personalizadas. Você pode gerenciar suas preferências de cookies a qualquer momento através do banner de cookies ou nas configurações da sua conta.",
                popular: false,
            },
        ],
    },
    {
        categoria: "Pagamentos",
        perguntas: [
            {
                id: 23,
                pergunta: "Quais formas de pagamento são aceitas para planos premium?",
                resposta:
                    "Aceitamos cartões de crédito (Visa, Mastercard, American Express e Elo), boleto bancário e PIX. Para empresas, também oferecemos a opção de faturamento mensal mediante análise de crédito.",
                popular: false,
            },
            {
                id: 24,
                pergunta: "Como funciona a renovação de assinaturas?",
                resposta:
                    "As assinaturas são renovadas automaticamente ao final de cada período (mensal ou anual). Você receberá um e-mail alguns dias antes da renovação e pode cancelar a qualquer momento através do seu painel administrativo.",
                popular: false,
            },
            {
                id: 25,
                pergunta: "Posso mudar de plano durante a vigência da assinatura?",
                resposta:
                    "Sim, você pode fazer upgrade do seu plano a qualquer momento. O valor será calculado proporcionalmente ao tempo restante da sua assinatura atual. Para fazer downgrade, a mudança será aplicada no próximo ciclo de faturamento.",
                popular: false,
            },
            {
                id: 26,
                pergunta: "Oferecem nota fiscal para os pagamentos?",
                resposta:
                    "Sim, emitimos nota fiscal para todos os pagamentos realizados. As notas fiscais são enviadas automaticamente para o e-mail cadastrado em até 3 dias úteis após a confirmação do pagamento.",
                popular: false,
            },
        ],
    },
]

function FaqItem({ pergunta, resposta, isOpen, toggleOpen, id }) {
    const [feedback, setFeedback] = useState(null)
    const [showFeedbackMessage, setShowFeedbackMessage] = useState(false)

    const handleFeedback = (isHelpful) => {
        setFeedback(isHelpful)
        setShowFeedbackMessage(true)
        // Em um caso real, aqui enviaríamos o feedback para o servidor
        setTimeout(() => {
            setShowFeedbackMessage(false)
        }, 3000)
    }

    return (
        <div className="border-b border-gray-medium">
            <button
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                onClick={toggleOpen}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
            >
                <h3 className="text-lg font-medium text-gray-dark">{pergunta}</h3>
                <svg
                    className={`w-5 h-5 text-primary transition-transform ${isOpen ? "transform rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                id={`faq-answer-${id}`}
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}
            >
                <p className="text-gray-dark mb-4">{resposta}</p>

                {isOpen && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-2">Esta resposta foi útil?</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleFeedback(true)}
                                className={`px-3 py-1 text-xs rounded-full ${feedback === true ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    }`}
                            >
                                Sim
                            </button>
                            <button
                                onClick={() => handleFeedback(false)}
                                className={`px-3 py-1 text-xs rounded-full ${feedback === false ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    }`}
                            >
                                Não
                            </button>
                        </div>
                        {showFeedbackMessage && (
                            <p className="text-xs text-green-600 mt-2">
                                Obrigado pelo seu feedback! Estamos sempre trabalhando para melhorar nossas respostas.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

// Agora vamos modificar o componente principal para incluir a funcionalidade de busca
// Substitua o export default function FAQ() pelo seguinte:

export default function FAQ() {
    const [openItems, setOpenItems] = useState({})
    const [activeCategory, setActiveCategory] = useState("Estudantes")
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    const toggleItem = (id) => {
        setOpenItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleSearch = (e) => {
        const term = e.target.value
        setSearchTerm(term)

        if (term.trim() === "") {
            setIsSearching(false)
            setSearchResults([])
            return
        }

        setIsSearching(true)

        // Filtrar perguntas que contenham o termo de busca
        const results = []
        faqData.forEach((category) => {
            category.perguntas.forEach((item) => {
                if (
                    item.pergunta.toLowerCase().includes(term.toLowerCase()) ||
                    item.resposta.toLowerCase().includes(term.toLowerCase())
                ) {
                    results.push(item)
                }
            })
        })

        setSearchResults(results)
    }

    // Obter perguntas populares de todas as categorias
    const popularQuestions = faqData
        .flatMap((category) => category.perguntas)
        .filter((item) => item.popular)
        .slice(0, 5)

    return (
        <>
            <Header />
            {/* Hero Section */}
            <section className="bg-primary text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Perguntas Frequentes</h1>
                        <p className="text-lg mb-6">
                            Encontre respostas para as dúvidas mais comuns sobre o DevStage e como utilizá-lo
                        </p>
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="Buscar perguntas..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full py-3 px-4 pr-10 rounded-lg text-gray-dark focus:outline-none focus:ring-2 focus:ring-secondary"
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

            {/* Perguntas Populares - Mostrar apenas se não estiver buscando */}
            {!isSearching && (
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-dark mb-6 text-center">Perguntas Mais Frequentes</h2>
                            <div className="bg-gray-light rounded-xl shadow-soft p-6 md:p-8">
                                {popularQuestions.map((item) => (
                                    <FaqItem
                                        key={item.id}
                                        id={item.id}
                                        pergunta={item.pergunta}
                                        resposta={item.resposta}
                                        isOpen={openItems[item.id] || false}
                                        toggleOpen={() => toggleItem(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Content */}
            <section className={`py-12 ${isSearching ? "bg-white" : "bg-gray-light"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {isSearching ? (
                            // Resultados da busca
                            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-gray-dark mb-6">
                                    Resultados da busca: {searchResults.length}{" "}
                                    {searchResults.length === 1 ? "resultado" : "resultados"}
                                </h2>

                                {searchResults.length > 0 ? (
                                    searchResults.map((item) => (
                                        <FaqItem
                                            key={item.id}
                                            id={item.id}
                                            pergunta={item.pergunta}
                                            resposta={item.resposta}
                                            isOpen={openItems[item.id] || false}
                                            toggleOpen={() => toggleItem(item.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8">
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
                                        <h3 className="text-lg font-semibold text-gray-dark mb-2">Nenhum resultado encontrado</h3>
                                        <p className="text-gray-dark mb-4">
                                            Não encontramos perguntas relacionadas ao termo "{searchTerm}".
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSearchTerm("")
                                                setIsSearching(false)
                                            }}
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            Limpar busca
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Categorias e perguntas normais
                            <>
                                {/* Categorias */}
                                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                                    {faqData.map((category) => (
                                        <button
                                            key={category.categoria}
                                            onClick={() => setActiveCategory(category.categoria)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category.categoria
                                                ? "bg-primary text-white"
                                                : "bg-white text-gray-dark hover:bg-gray-100"
                                                }`}
                                        >
                                            {category.categoria}
                                        </button>
                                    ))}
                                </div>

                                {/* Perguntas e Respostas */}
                                <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-gray-dark mb-6">Perguntas sobre {activeCategory}</h2>

                                    {faqData
                                        .find((category) => category.categoria === activeCategory)
                                        ?.perguntas.map((item) => (
                                            <FaqItem
                                                key={item.id}
                                                id={item.id}
                                                pergunta={item.pergunta}
                                                resposta={item.resposta}
                                                isOpen={openItems[item.id] || false}
                                                toggleOpen={() => toggleItem(item.id)}
                                            />
                                        ))}
                                </div>
                            </>
                        )}

                        {/* Não encontrou sua pergunta? */}
                        <div className="mt-12 text-center">
                            <h3 className="text-xl font-bold text-gray-dark mb-4">Não encontrou sua pergunta?</h3>
                            <p className="text-gray-dark mb-6">Entre em contato conosco e responderemos o mais rápido possível.</p>
                            <Link
                                to="/contato"
                                className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
                            >
                                Fale Conosco
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
            </section>

            {/* Recursos Relacionados */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center">Recursos Relacionados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Guia do Estudante</h3>
                                <p className="mb-4">
                                    Aprenda a aproveitar ao máximo a plataforma com nosso guia completo para estudantes.
                                </p>
                                <Link to="/guia-estudante" className="text-white hover:text-secondary inline-flex items-center">
                                    Ler o guia
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

                            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13h-3a2 2 0 01-2-2v-3a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Tutoriais em Vídeo</h3>
                                <p className="mb-4">
                                    Assista aos nossosutoriais em vídeo para aprender a usar todas as funcionalidades da plataforma.
                                </p>
                                <Link to="/tutoriais" className="text-white hover:text-secondary inline-flex items-center">
                                    Ver tutoriais
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

                            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Webinars e Eventos</h3>
                                <p className="mb-4">
                                    Participe dos nossos webinars e eventos online para aprender mais sobre carreira e tecnologia.
                                </p>
                                <Link to="/eventos" className="text-white hover:text-secondary inline-flex items-center">
                                    Ver agenda
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
                </div>
            </section>
        </>
    )
}
