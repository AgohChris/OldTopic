import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/main";
import Hero from "./components/Hero";
import Profil from "./components/Profil";
import Historique from "./components/Historique";
import RegisterStudent from "./components/RegisterStudent";
import LoginStudent from "./components/LoginStudent";
import MDPoublier from "./components/MDPoublier";
import AuthLayout from "./components/AuthLayout";

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
      </Route>
      
      {/* Redirection pour toutes les routes non définies */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;