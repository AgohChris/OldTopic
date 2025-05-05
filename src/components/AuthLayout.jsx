import React from 'react';
import { useEffect, useState } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap } from 'lucide-react';

const AuthLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        when: "beforeChildren"
      } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[600px] 
        bg-gradient-to-br from-green-500/10 to-black/40 border border-green-500/20 rounded-3xl p-10 backdrop-blur-sm"
      >
        {/* En-tête unifiée */}
        <div className="text-center mb-6 sm:mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 transform hover:scale-[1.02] transition-transform">
            <div className="relative">
                <span className="text-green-700 text-3xl tracking-wider font-bold">Old</span>
                <span className="text-gray-800 dark:text-gray-100 text-2xl font-bold">Topic</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-500 group-hover:w-full`}></span>
              </div>
          </div>
          
          <div className="flex justify-center gap-2 text-sm text-gray-400">
            <BookOpen className="h-5 w-5 text-blue-400/70" />
            <span>Votre portail éducatif premium</span>
          </div>
        </div>

        {/* Contenu dynamique - Modification ici */}
        <div className="mx-auto w-full max-w-md">
          <Outlet />
        </div>

        {/* Footer commun */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-sm text-gray-400">
            Sécurisé par {" "}
            <span className="text-teal-400 font-medium">AES-256 Encryption</span>
          </p>
        </div>
          {/* Version */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-500">
          v2.1.0
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;