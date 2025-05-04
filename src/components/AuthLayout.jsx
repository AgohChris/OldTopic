import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  const location = useLocation();

  // Animation variants pour les transitions entre pages d'authentification
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col">
      {/* Header pour les pages d'authentification */}
      <header className="py-5 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
        <Link to="/" className="flex items-center">
          <div className={`transition-all duration-300 `}>
            <span className="text-green-800 text-3xl md:text-5xl tracking-wider font-bold">Old</span>
            <span className="text-black text-2xl md:text-3xl font-bold">Topic</span>
          </div>
        </Link>
      </div>
          
          {/* Navigation entre les pages d'authentification */}
          <nav className="flex items-center space-x-6">
            <Link 
              to="/login" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/login' 
                  ? 'text-teal-600 border-b-2 border-teal-500' 
                  : 'text-gray-600 hover:text-teal-500'
              }`}
            >
              Connexion
            </Link>
            <Link 
              to="/register" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/register' 
                  ? 'text-teal-600 border-b-2 border-teal-500' 
                  : 'text-gray-600 hover:text-teal-500'
              }`}
            >
              Inscription
            </Link>
            <Link 
              to="/forgot-password" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/forgot-password' 
                  ? 'text-teal-600 border-b-2 border-teal-500' 
                  : 'text-gray-600 hover:text-teal-500'
              }`}
            >
              Mot de passe oublié
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenu principal avec animation */}
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-4xl"
        >
          <Outlet />
        </motion.div>
      </div>

      {/* Footer simplifié pour les pages d'authentification */}
      <footer className="py-4 px-6 text-center text-sm text-gray-800 tracking-wider ">
        <p>© {new Date().getFullYear()} <span className="text-green-800 text-3xl md:text-5xl tracking-wider font-bold">Old</span>
            <span className="text-black text-2xl md:text-3xl font-bold">Topic</span>. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;