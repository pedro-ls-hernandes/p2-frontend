import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Login from "./pages/Auth/Login/index.jsx";
import Register from "./pages/Auth/Register/index.jsx";
import Footer from "./Component/Footer/index.jsx";
import Container from "./Component/Container/index.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Message from "./Component/Message/index.jsx";
import FAQ from "./pages/Faq/index.jsx";
import Sobre from "./pages/Sobre/index.jsx";
import Vagas from "./pages/Vagas/index.jsx";
import Blog from "./pages/Blog/index.jsx";
import BlogPost from "./pages/Blog/[titulo]/index.jsx";
import AdminDashboard from "./pages/Admin/dashboard/index.jsx";
import AdminVagas from "./pages/Admin/vagas/index.jsx";
import AdminVagasForm from "./pages/Admin/vagas/[titulo]/index.jsx";
import AdminEmpresas from "./pages/Admin/empresas/index.jsx";
import AdminEmpresaForm from "./pages/Admin/empresas/[titulo]/index.jsx";
import AdminUsuarios from "./pages/Admin/usuarios/index.jsx";
import AdminUsuarioForm from "./pages/Admin/usuarios/[id]/index.jsx";
import AdminBlog from "./pages/Admin/blog/index.jsx";
import AdminBlogPostForm from "./pages/Admin/blog/[titulo]/index.jsx";
import Perfil from "./pages/Perfil/index.jsx";
import DetalhesVaga from "./pages/Vagas/[titulo]/index.jsx";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import ProtectedEmpresaRoute from "./utils/ProtectedEmpresaRoute.jsx";
import EmpresaDashboard from "./pages/Empresa/dashboard/index.jsx";
import PerfilEmpresa from "./pages/Empresa/perfil/page.jsx";
import CandidaturasEmpresa from "./pages/Empresa/candidaturas/page.jsx";
import NotFound from "./pages/Error404/index.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/vagas" element={<Vagas />} />
            <Route path="/vagas/:titulo" element={<DetalhesVaga />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:titulo" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/vagas"
              element={
                <ProtectedAdminRoute>
                  <AdminVagas />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/vagas/:titulo"
              element={
                <ProtectedAdminRoute>
                  <AdminVagasForm />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/empresas"
              element={
                <ProtectedAdminRoute>
                  <AdminEmpresas />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/empresas/:titulo"
              element={
                <ProtectedAdminRoute>
                  <AdminEmpresaForm />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                <ProtectedAdminRoute>
                  <AdminUsuarios />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/usuarios/novo"
              element={
                <ProtectedAdminRoute>
                  <AdminUsuarioForm />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/usuarios/:id"
              element={
                <ProtectedAdminRoute>
                  <AdminUsuarioForm />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/blog"
              element={
                <ProtectedAdminRoute>
                  <AdminBlog />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/blog/novo"
              element={
                <ProtectedAdminRoute>
                  <AdminBlogPostForm />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/blog/:titulo"
              element={
                <ProtectedAdminRoute>
                  <AdminBlogPostForm />
                </ProtectedAdminRoute>
              }
            />
            {/* rotas para empresa protegida */}
            <Route
              path="/empresa/"
              element={
                <ProtectedEmpresaRoute>
                  <EmpresaDashboard />
                </ProtectedEmpresaRoute>
              }
            />
            <Route
              path="/empresa/vagas"
              element={
                <ProtectedEmpresaRoute>
                  <AdminVagas />
                </ProtectedEmpresaRoute>
              }
            />
            <Route
              path="/empresa/vagas/:titulo"
              element={
                <ProtectedEmpresaRoute>
                  <AdminVagasForm />
                </ProtectedEmpresaRoute>
              }
            />
            <Route
              path="/empresa/perfil/"
              element={
                <ProtectedEmpresaRoute>
                  <PerfilEmpresa />
                </ProtectedEmpresaRoute>
              }
            />
            <Route
              path="/empresa/candidaturas/"
              element={
                <ProtectedEmpresaRoute>
                  <CandidaturasEmpresa />
                </ProtectedEmpresaRoute>
              }
            />


            {/* Rota 404: ESTA DEVE SER A ÚLTIMA ROTA */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}
export default AppRoutes;
