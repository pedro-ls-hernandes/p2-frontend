import { useState, useContext } from "react";
import { Context } from "../../../context/UserContext.jsx";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  User,
  Phone,
  BookOpen,
  Building,
  GitBranch,
  Linkedin,
  FileText,
  Briefcase,
  PinIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

function Register() {
  const { register } = useContext(Context);
  const [user, setUser] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    cpf: "",
    tipo: "estudante",
    status: "Ativo",
    curso: "",
    instituicao_ensino: "",
    github: "",
    linkedin: "",
    portifolio: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields =
      user.tipo === "estudante"
        ? [
          "nome",
          "email",
          "password",
          "tipo",
          "cpf",
          "status",
          "curso",
          "instituicao_ensino",
        ]
        : [
          "razao_social",
          "email",
          "password",
          "tipo",
          "status",
          "cnpj",
          "localizacao",
          "site",
        ];

    requiredFields.forEach((field) => {
      if (!user[field]) newErrors[field] = "Campo obrigatório";
    });

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email inválido";
    }

    if (user.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (user.tipo !== "estudante") user.cpf = user.cnpj
      await register(user);
    } catch (error) {
      setErrors({
        submit: error.message || "Erro ao registrar. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <Link to={"/"}>
              <img src="/images/logo_devstage.png" className="max-w-30 mx-auto my-6" />
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Crie sua conta gratuita
            </h2>
            <p className="text-gray-600">
              Cadastre-se para acessar as melhores oportunidades
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tipo de Usuário */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Conta
                  </label>
                  <div className="relative">
                    <select
                      name="tipo"
                      value={user.tipo}
                      onChange={handleChange}
                      className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="estudante">Estudante</option>
                      <option value="empresa">Empresa</option>
                    </select>
                  </div>
                  {errors.tipo && (
                    <p className="mt-1 text-sm text-red-600">{errors.tipo}</p>
                  )}
                </div>
                {/* Nome */}
                {user.tipo === "estudante" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="nome"
                          value={user.nome}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.nome
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                            }`}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      {errors.nome && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.nome}
                        </p>
                      )}
                    </div>
                    <div>
                      {/* cpf */}
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CPF
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="cpf"
                          value={user.cpf}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu CPF"
                        />
                      </div>
                      {errors.cpf && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.cpf}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* CNPJ */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="cnpj"
                          value={user.cnpj}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu CNPJ"
                        />
                      </div>
                      {errors.cnpj && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.cnpj}
                        </p>
                      )}
                    </div>

                    {/* Razão Social */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razão Social
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="razao_social"
                          value={user.razao_social}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Sua razão social"
                        />
                      </div>
                      {errors.razao_social && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.razao_social}
                        </p>
                      )}
                    </div>

                    {/* Localizacao */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localização
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="localizacao"
                          value={user.localizacao}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Sua localização"
                        />
                      </div>
                      {errors.localizacao && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.localizacao}
                        </p>
                      )}
                    </div>

                    {/* Site */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Linkedin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="site"
                          value={user.site}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu site"
                        />
                      </div>
                      {errors.site && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.site}
                        </p>
                      )}
                    </div>
                  </>
                )}
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                        }`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="telefone"
                      value={user.telefone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  {errors.telefone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.telefone}
                    </p>
                  )}
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.password
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                        }`}
                      placeholder="Crie uma senha segura"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {user.tipo.toLowerCase() === "estudante" && (
                  <>
                    {/* Curso */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Curso
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="curso"
                          value={user.curso}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.curso
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                            }`}
                          placeholder="Seu curso"
                        />
                      </div>
                      {errors.curso && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.curso}
                        </p>
                      )}
                    </div>

                    {/* Instituição de Ensino */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instituição de Ensino
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="instituicao_ensino"
                          value={user.instituicao_ensino}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${errors.instituicao_ensino
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                            }`}
                          placeholder="Sua instituição de ensino"
                        />
                      </div>
                      {errors.instituicao_ensino && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.instituicao_ensino}
                        </p>
                      )}
                    </div>

                    {/* GitHub */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub (Opcional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <GitBranch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="github"
                          value={user.github}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu perfil do GitHub"
                        />
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn (Opcional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Linkedin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="linkedin"
                          value={user.linkedin}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Seu perfil do LinkedIn"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Sobre e Portfólio */}
              <div className="space-y-6">
                {user.tipo.toLowerCase() === "estudante" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfólio (Opcional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="portifolio"
                        value={user.portifolio}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Link do seu portfólio"
                      />
                    </div>
                  </div>
                )}
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Cadastrando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Criar Conta
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary transition-colors"
                >
                  Fazer login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
