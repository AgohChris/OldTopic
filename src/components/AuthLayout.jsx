import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  const location = useLocation();

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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white rounded-2xl shadow-xl p-6 sm:p-10"
      >
        {/* Logo centré */}
        <div className="text-center mb-8">
          <div className="inline-block transform hover:scale-105 transition-transform">
            <span className="text-green-800 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">Old</span>
            <span className="text-black text-2xl sm:text-3xl md:text-4xl font-bold">Topic</span>
          </div>
        </div>

        {/* Ici s'affiche le contenu comme login, register, etc. */}
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;
