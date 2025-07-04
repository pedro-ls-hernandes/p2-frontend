"use client";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../../../Component/AdminHeader/index.jsx";
import api from "../../../../utils/api.jsx";
import useFlashMessage from "../../../../hooks/useFlashMessage.jsx";
import EmpresaAsyncSelect from "../../components/EmpresaAsyncSelect.jsx";
import { Context } from "../../../../context/UserContext.jsx";
import Select from "react-select";
import { opcoesHabilidades } from "../../../../utils/habilidades.jsx";

export default function AdminVagasForm() {
  const { titulo } = useParams();
  const isEditing = titulo !== "nova";
  const [loading, setLoading] = useState(true);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: isEditing ? "Estágio em Desenvolvimento Front-end" : "",
    empresa: isEditing ? "Acme Brasil" : "",
    logoEmpresa: isEditing ? "/placeholder.svg?height=80&width=80" : "",
    localizacao: isEditing ? "São Paulo, SP" : "",
    tipoContrato: isEditing ? "CLT" : "",
    modalidade: isEditing ? "Híbrido" : "",
    salario: isEditing ? "R$ 4.500 - R$ 6.500" : "",
    nivel: isEditing ? "Júnior" : "",
    publicadoEm: isEditing ? new Date().toISOString().split("T")[0] : "",
    vagasDisponiveis: isEditing ? 3 : 1,
    descricao: isEditing
      ? "Estamos buscando um estagiário para atuar no desenvolvimento de interfaces web utilizando React e Tailwind CSS."
      : "",
    responsabilidades: isEditing
      ? [
        "Desenvolver e manter aplicações web",
        "Colaborar com designers",
        "Participar de code reviews",
      ].join("\n")
      : "",
    requisitos: isEditing
      ? [
        "Conhecimento em HTML, CSS e JavaScript",
        "Conhecimento básico em React",
        "Conhecimento básico em Git",
      ].join("\n")
      : "",
    diferenciais: isEditing
      ? [
        "Experiência com TypeScript",
        "Conhecimento em Docker",
        "Experiência com metodologias ágeis",
      ].join("\n")
      : "",
    beneficios: isEditing
      ? [
        "Plano de saúde e odontológico",
        "Vale refeição",
        "Auxílio home office",
      ].join("\n")
      : "",
    email_contato: isEditing ? "rh@acmebrasil.com.br" : "",
    link_candidatura: isEditing
      ? "https://acmebrasil.com.br/vagas/estagio-frontend"
      : "",
  });

  // Acessar o contexto do usuário
  const { user } = useContext(Context); // Adicione esta linha
  // Simulação de dados da vaga
  useEffect(() => {
    const carregarVaga = async () => {
      setLoading(true);
      // Simulação de API call
      await api.get(`/vagas/${titulo}`).then((response) => {
        //map first item from vaga
        const { vaga } = response.data;

        if (vaga) {
          vaga.responsabilidades = vaga.responsabilidades?.join("\n");
          vaga.requisitos = vaga.requisitos?.join("\n");
          vaga.diferenciais = vaga.diferenciais?.join("\n");
          vaga.beneficios = vaga.beneficios?.join("\n");
          vaga.publicadoEm = vaga.publicadoEm?.split("T")[0];
          vaga.empresa = vaga.empresa?._id;
          setFormData(vaga);
        }

        setLoading(false);
      });
    };

    if (isEditing) {
      carregarVaga();
    } else {
      setLoading(false);
    }
  }, [titulo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatFormData = (data) => {
    return {
      ...data,
      responsabilidades: data.responsabilidades
        ?.split("\n")
        .filter((item) => item.trim() !== ""),
      requisitos: data.requisitos
        ?.split("\n")
        .filter((item) => item.trim() !== ""),
      diferenciais: data.diferenciais
        ?.split("\n")
        .filter((item) => item.trim() !== ""),
      beneficios: data.beneficios
        ?.split("\n")
        .filter((item) => item.trim() !== ""),
    };
  };

  const handleSubmit = (e) => {
    let msgText = "Cadastro realizado com sucesso";
    let msgType = "success";
    e.preventDefault();
    const formattedData = formatFormData(formData);
    console.log("Dados formatados:", formattedData);
    //if successs, show card message
    try {
      const response = api.post(
        `/vagas/${isEditing ? "EditarVaga/" + formData._id : "CadastrarVaga"}`,
        formattedData
      );
      return response.data;
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    } finally {
      setFlashMessage(msgText, msgType);
      navigate(
        user && user.tipo === "empresa"
          ? `/empresa/vagas/`
          : `/admin/vagas/`
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-light">
        <AdminHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <AdminHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center">
            <Link
              to="/admin/vagas"
              className="text-primary hover:text-primary-dark mr-2"
            >
              <svg
                className="w-5 h-5"
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
            </Link>
            <h1 className="text-2xl font-bold text-gray-dark">
              {isEditing ? "Editar Vaga" : "Cadastrar Nova Vaga"}
            </h1>
          </div>
          <p className="text-gray-dark mt-1">
            {isEditing
              ? "Atualize as informações da vaga conforme necessário."
              : "Preencha o formulário abaixo para cadastrar uma nova vaga."}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-dark mb-4">
                  Informações Básicas
                </h2>
              </div>

              {/* Título da vaga */}
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="titulo"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Título da vaga <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Ex: Desenvolvedor Full Stack Júnior"
                />
              </div>

              {/* Nome da empresa */}
              {user.tipo !== "empresa" && (
                <div>
                  <label
                    htmlFor="empresa"
                    className="block text-sm font-medium text-gray-dark mb-1"
                  >
                    Nome da empresa <span className="text-red-500">*</span>
                  </label>
                  <EmpresaAsyncSelect
                    value={formData.empresa}
                    defaultValue={formData.empresa}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, empresa: value }))
                    }
                    required
                  />
                </div>
              )}

              {/* Localização */}
              <div>
                <label
                  htmlFor="localizacao"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Localização <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="localizacao"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>

              {/* Tipo de Contrato */}
              <div>
                <label
                  htmlFor="tipoContrato"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Tipo de Vaga <span className="text-red-500">*</span>
                </label>
                <select
                  id="tipoContrato"
                  name="tipoContrato"
                  value={formData.tipoContrato}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Selecione</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Freelance">Trainee</option>
                </select>
              </div>

              {/* Modalidade */}
              <div>
                <label
                  htmlFor="modalidade"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Modalidade <span className="text-red-500">*</span>
                </label>
                <select
                  id="modalidade"
                  name="modalidade"
                  value={formData.modalidade}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Selecione</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>

              {/* Salário */}
              <div>
                <label
                  htmlFor="salario"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Salário <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="salario"
                  name="salario"
                  value={formData.salario}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Ex: R$ 4.500 - R$ 6.500"
                />
              </div>

              {/* Nível */}
              <div>
                <label
                  htmlFor="nivel"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Nível <span className="text-red-500">*</span>
                </label>
                <select
                  id="nivel"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Selecione</option>
                  <option value="Júnior">Júnior</option>
                  <option value="Pleno">Pleno</option>
                  <option value="Sênior">Sênior</option>
                  <option value="Estagiário">Estagiário</option>
                </select>
              </div>

              {/* Vagas Disponíveis */}
              <div>
                <label
                  htmlFor="vagasDisponiveis"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Vagas Disponíveis <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="vagasDisponiveis"
                  name="vagasDisponiveis"
                  value={formData.vagasDisponiveis}
                  onChange={handleChange}
                  required
                  min="1"
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Data de Publicação */}
              <div>
                <label
                  htmlFor="publicadoEm"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Data de Publicação <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="publicadoEm"
                  name="publicadoEm"
                  value={formData.publicadoEm}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Descrição */}
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="descricao"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Descreva as atividades e responsabilidades da vaga"
                ></textarea>
              </div>

              {/* Responsabilidades */}
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="responsabilidades"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Responsabilidades (uma por linha){" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="responsabilidades"
                  name="responsabilidades"
                  value={formData.responsabilidades}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Desenvolver e manter aplicações web..."
                ></textarea>
              </div>

              {/* Requisitos */}
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="requisitos"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Requisitos
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  isMulti
                  options={opcoesHabilidades}
                  value={opcoesHabilidades.filter((opt) =>
                    (formData.requisitos || "").split("\n").includes(opt.value)
                  )}
                  onChange={(selectedOptions) => {
                    const requisitosSelecionados = selectedOptions.map((opt) => opt.value);
                    setFormData((prev) => ({
                      ...prev,
                      requisitos: requisitosSelecionados.join("\n"),
                    }));
                  }}
                  className="w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  classNamePrefix="select"
                />
              </div>

              {/* Diferenciais */}
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="diferenciais"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Diferenciais (uma por linha)
                </label>
                <textarea
                  id="diferenciais"
                  name="diferenciais"
                  value={formData.diferenciais}
                  onChange={handleChange}
                  rows={5}
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Experiência com TypeScript..."
                ></textarea>
              </div>

              {/* Benefícios */}
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="beneficios"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Benefícios (uma por linha)
                </label>
                <textarea
                  id="beneficios"
                  name="beneficios"
                  value={formData.beneficios}
                  onChange={handleChange}
                  rows={5}
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Plano de saúde e odontológico..."
                ></textarea>
              </div>

              {/* Informações de Contato */}
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-dark mb-4">
                  Informações de Contato
                </h2>
              </div>

              {/* E-mail de contato */}
              <div>
                <label
                  htmlFor="email_contato"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  E-mail de contato <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email_contato"
                  name="email_contato"
                  value={formData.email_contato}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Ex: rh@empresa.com.br"
                />
              </div>

              {/* Link para candidatura */}
              <div>
                <label
                  htmlFor="link_candidatura"
                  className="block text-sm font-medium text-gray-dark mb-1"
                >
                  Link para candidatura <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="link_candidatura"
                  name="link_candidatura"
                  value={formData.link_candidatura}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-medium rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Ex: https://empresa.com.br/vagas/estagio-frontend"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Link
                to="/admin/vagas"
                className="px-4 py-2 border border-gray-medium rounded-lg text-gray-dark hover:bg-gray-light transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
              >
                {isEditing ? "Atualizar Vaga" : "Cadastrar Vaga"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
