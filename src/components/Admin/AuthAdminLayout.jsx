import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const AuthAdminLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        when: 'beforeChildren',
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-xl text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="  flex-col min-h-screen text-white
     bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
      {/* Décoration de fond */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-700 opacity-20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-700 opacity-20 rounded-full blur-3xl" />

      <motion.div
        key={location.pathname}
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="z-10 w-full max-w-md         bg-gradient-to-br from-green-500/10 to-black/40 border border-green-500/20 rounded-3xl p-10 backdrop-blur-sm"

      >
        {/* En-tête */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Espace Administrateur</h1>
          <p className="text-sm text-gray-400">Connexion sécurisée requise</p>
        </div>

        <Outlet />
      </motion.div>

      {/* Pied de page */}
      <footer className="z-10 mt-12 text-center text-sm text-gray-500">
        Sécurisé par AES-256 | Version 1.0.0
      </footer>
    </div>
  );
};

export default AuthAdminLayout;