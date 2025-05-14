import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/main";
import Hero from "./components/Hero";
import Profil from "./components/Profil";
import Historique from "./components/Historique";
import RegisterStudent from "./components/RegisterStudent";
import LoginStudent from "./components/LoginStudent";
import MDPoublier from "./components/MDPoublier";
import AuthLayout from "./components/AuthLayout";
import DownloadList from "./components/DownloadList";
import AuthAdminLayout from "./components/Admin/AuthAdminLayout";
import GestionStudent from "./components/Admin/GestionStudent";
import GestionSujets from "./components/Admin/GestionSujets";
import Parametre from "./components/Admin/Parametre";
import Dashboard from "./components/Admin/Dashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import LoginAdmin from "./components/Admin/LoginAdmin";
import AjoutMat from "./components/Admin/AjoutMat";
import MDPoublierAdmin from "./components/Admin/MDPoublierAdmin";
import Newsletter from "./components/Admin/Newsletter";
import GestionAdmin from "./components/Admin/GestionAdmin";
function App() {
  return (
    <Routes>
      {/* Routes d'authentification avec AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginStudent />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/forgot-password" element={<MDPoublier />} />
      </Route>

      {/* Routes principales avec Main layout (NavBar + Footer) */}
      <Route path="/" element={<Main />}>
        <Route index element={<Hero />} /> {/* page d'accueil */}
        <Route path="profil" element={<Profil />} />
        <Route path="historique" element={<Historique />} />
        <Route path="download" element={<DownloadList />} />
      </Route>
      
      {/* Routes d'authentification admin avec AuthAdminLayout */}     {/* Routes d'authentification avec AuthLayout */}
      <Route element={<AuthAdminLayout />}>
      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/admin/forgotAdmin-password" element={<MDPoublierAdmin />} />
      </Route>
      
      {/* Route pour le tableau de bord admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="utilisateurs" element={<GestionStudent />} />
        <Route path="documents" element={<GestionSujets />} />
        <Route path="parametres" element={<Parametre />} />
        <Route path="ajoutmat" element={<AjoutMat />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="gestionAdmin" element={<GestionAdmin/>} />
      </Route>  
    
      {/* Redirection par défaut */}
      <Route path="/" element={<Navigate to="/" replace />} />
      {/* Route pour la page 404 */}
      <Route path="/404" element={<div>Page non trouvée</div>} />
      {/* Redirection pour toutes les routes non définies */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    
  );
}

export default App;