"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ArrowLeft, Plus, X, Save, Eye, Trash2 } from "lucide-react";

export default function EditarVaga() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [preview, setPreview] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    requisitos: [""],
    diferenciais: [""],
    beneficios: [""],
    modalidade: "",
    localizacao: "",
    tipoContrato: "",
    nivel: "",
    salario: "",
    vagasDisponiveis: 1,
    email_contato: "",
    link_candidatura: "",
    ativo: true,
  });

  const [errors, setErrors] = useState({});

  const modalidades = ["Presencial", "Remoto", "Híbrido"];
  const tiposContrato = ["CLT", "PJ", "Estágio", "Freelance"];
  const niveis = ["Júnior", "Pleno", "Sênior", "Estagiário"];

  // Simular carregamento dos dados da vaga
  useEffect(() => {
    const loadVagaData = async () => {
      try {
        // Simular API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dados mockados da vaga
        const vagaData = {
          titulo: "Desenvolvedor Frontend React",
          descricao:
            "Estamos procurando um desenvolvedor frontend experiente para integrar nossa equipe de desenvolvimento. Você será responsável por criar interfaces modernas e responsivas usando React.js.",
          requisitos: [
            "Experiência com React.js e JavaScript",
            "Conhecimento em HTML5 e CSS3",
            "Familiaridade com Git e controle de versão",
          ],
          diferenciais: [
            "Experiência com TypeScript",
            "Conhecimento em Next.js",
            "Experiência com testes automatizados",
          ],
          beneficios: [
            "Vale refeição R$ 30/dia",
            "Plano de saúde",
            "Home office flexível",
            "Auxílio educação",
          ],
          modalidade: "Híbrido",
          localizacao: "São Paulo, SP",
          tipoContrato: "CLT",
          nivel: "Pleno",
          salario: "R$ 6.000 - R$ 9.000",
          vagasDisponiveis: 2,
          email_contato: "rh@empresa.com",
          link_candidatura: "https://empresa.com/candidatura/frontend-react",
          ativo: true,
        };

        setFormData(vagaData);
      } catch (error) {
        console.error("Erro ao carregar dados da vaga:", error);
        alert("Erro ao carregar dados da vaga");
      } finally {
        setLoadingData(false);
      }
    };

    loadVagaData();
  }, [params.id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) newErrors.titulo = "Título é obrigatório";
    if (!formData.descricao.trim())
      newErrors.descricao = "Descrição é obrigatória";
    if (!formData.modalidade) newErrors.modalidade = "Modalidade é obrigatória";
    if (!formData.localizacao.trim())
      newErrors.localizacao = "Localização é obrigatória";
    if (!formData.tipoContrato)
      newErrors.tipoContrato = "Tipo de contrato é obrigatório";
    if (!formData.nivel) newErrors.nivel = "Nível é obrigatório";
    if (!formData.salario.trim()) newErrors.salario = "Salário é obrigatório";
    if (!formData.email_contato.trim())
      newErrors.email_contato = "Email de contato é obrigatório";
    if (!formData.link_candidatura.trim())
      newErrors.link_candidatura = "Link de candidatura é obrigatório";
    if (formData.vagasDisponiveis < 1)
      newErrors.vagasDisponiveis = "Deve haver pelo menos 1 vaga disponível";

    if (formData.requisitos.every((req) => !req.trim())) {
      newErrors.requisitos = "Pelo menos um requisito é obrigatório";
    }
    if (formData.beneficios.every((ben) => !ben.trim())) {
      newErrors.beneficios = "Pelo menos um benefício é obrigatório";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email_contato && !emailRegex.test(formData.email_contato)) {
      newErrors.email_contato = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Dados atualizados da vaga:", formData);
      alert("Vaga atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar vaga:", error);
      alert("Erro ao atualizar vaga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita."
      )
    ) {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        alert("Vaga excluída com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir vaga:", error);
        alert("Erro ao excluir vaga. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">
              Carregando dados da vaga...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (preview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreview(false)}
                className="flex items-center text-purple-600 hover:text-purple-700"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar para Edição
              </button>
            </div>
            <div className="text-sm text-gray-500">Preview da Vaga</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {formData.titulo}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {formData.modalidade}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  {formData.tipoContrato}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {formData.nivel}
                </span>
              </div>
              <p className="text-gray-600">{formData.descricao}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Requisitos
                  </h3>
                  <ul className="space-y-2">
                    {formData.requisitos
                      .filter((req) => req.trim())
                      .map((requisito, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{requisito}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {formData.diferenciais.some((dif) => dif.trim()) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Diferenciais
                    </h3>
                    <ul className="space-y-2">
                      {formData.diferenciais
                        .filter((dif) => dif.trim())
                        .map((diferencial, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700">{diferencial}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Benefícios
                  </h3>
                  <ul className="space-y-2">
                    {formData.beneficios
                      .filter((ben) => ben.trim())
                      .map((beneficio, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">{beneficio}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informações da Vaga
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">
                        Salário:
                      </span>
                      <p className="text-gray-600">{formData.salario}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Localização:
                      </span>
                      <p className="text-gray-600">{formData.localizacao}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Vagas Disponíveis:
                      </span>
                      <p className="text-gray-600">
                        {formData.vagasDisponiveis}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Contato:
                      </span>
                      <p className="text-gray-600">{formData.email_contato}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Editar Vaga</h1>
              <p className="text-gray-600">Atualize as informações da vaga</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </button>
            <button
              type="button"
              onClick={() => setPreview(true)}
              className="flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Informações Básicas
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da Vaga *
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => handleInputChange("titulo", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.titulo ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Ex: Desenvolvedor Frontend React"
                />
                {errors.titulo && (
                  <p className="mt-1 text-sm text-red-600">{errors.titulo}</p>
                )}
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Vaga *
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) =>
                    handleInputChange("descricao", e.target.value)
                  }
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.descricao ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Descreva a vaga, responsabilidades e o que a empresa oferece..."
                />
                {errors.descricao && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.descricao}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modalidade *
                </label>
                <select
                  value={formData.modalidade}
                  onChange={(e) =>
                    handleInputChange("modalidade", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.modalidade ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Selecione a modalidade</option>
                  {modalidades.map((modalidade) => (
                    <option key={modalidade} value={modalidade}>
                      {modalidade}
                    </option>
                  ))}
                </select>
                {errors.modalidade && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.modalidade}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização *
                </label>
                <input
                  type="text"
                  value={formData.localizacao}
                  onChange={(e) =>
                    handleInputChange("localizacao", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.localizacao ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Ex: São Paulo, SP"
                />
                {errors.localizacao && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.localizacao}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Contrato *
                </label>
                <select
                  value={formData.tipoContrato}
                  onChange={(e) =>
                    handleInputChange("tipoContrato", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.tipoContrato ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Selecione o tipo</option>
                  {tiposContrato.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
                {errors.tipoContrato && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.tipoContrato}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível *
                </label>
                <select
                  value={formData.nivel}
                  onChange={(e) => handleInputChange("nivel", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.nivel ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Selecione o nível</option>
                  {niveis.map((nivel) => (
                    <option key={nivel} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
                {errors.nivel && (
                  <p className="mt-1 text-sm text-red-600">{errors.nivel}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salário *
                </label>
                <input
                  type="text"
                  value={formData.salario}
                  onChange={(e) => handleInputChange("salario", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.salario ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Ex: R$ 5.000 - R$ 8.000 ou A combinar"
                />
                {errors.salario && (
                  <p className="mt-1 text-sm text-red-600">{errors.salario}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vagas Disponíveis *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.vagasDisponiveis}
                  onChange={(e) =>
                    handleInputChange(
                      "vagasDisponiveis",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.vagasDisponiveis
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {errors.vagasDisponiveis && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.vagasDisponiveis}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Requisitos */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Requisitos *
              </h2>
              <button
                type="button"
                onClick={() => addArrayItem("requisitos")}
                className="flex items-center px-3 py-1 text-sm text-purple-600 hover:text-purple-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {formData.requisitos.map((requisito, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={requisito}
                    onChange={(e) =>
                      handleArrayChange("requisitos", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Conhecimento em React.js"
                  />
                  {formData.requisitos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("requisitos", index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.requisitos && (
              <p className="mt-2 text-sm text-red-600">{errors.requisitos}</p>
            )}
          </div>

          {/* Diferenciais */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Diferenciais
              </h2>
              <button
                type="button"
                onClick={() => addArrayItem("diferenciais")}
                className="flex items-center px-3 py-1 text-sm text-purple-600 hover:text-purple-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {formData.diferenciais.map((diferencial, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={diferencial}
                    onChange={(e) =>
                      handleArrayChange("diferenciais", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Experiência com TypeScript"
                  />
                  {formData.diferenciais.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("diferenciais", index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Benefícios *
              </h2>
              <button
                type="button"
                onClick={() => addArrayItem("beneficios")}
                className="flex items-center px-3 py-1 text-sm text-purple-600 hover:text-purple-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {formData.beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={beneficio}
                    onChange={(e) =>
                      handleArrayChange("beneficios", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Vale refeição"
                  />
                  {formData.beneficios.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("beneficios", index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.beneficios && (
              <p className="mt-2 text-sm text-red-600">{errors.beneficios}</p>
            )}
          </div>

          {/* Contato */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Informações de Contato
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de Contato *
                </label>
                <input
                  type="email"
                  value={formData.email_contato}
                  onChange={(e) =>
                    handleInputChange("email_contato", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.email_contato ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="contato@empresa.com"
                />
                {errors.email_contato && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email_contato}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link de Candidatura *
                </label>
                <input
                  type="url"
                  value={formData.link_candidatura}
                  onChange={(e) =>
                    handleInputChange("link_candidatura", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.link_candidatura
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder="https://empresa.com/candidatura"
                />
                {errors.link_candidatura && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.link_candidatura}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Status da Vaga
            </h2>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="ativo"
                checked={formData.ativo}
                onChange={(e) => handleInputChange("ativo", e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="ativo" className="ml-2 text-sm text-gray-700">
                Vaga ativa (visível para candidatos)
              </label>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
