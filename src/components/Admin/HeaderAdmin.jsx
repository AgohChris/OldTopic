import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';

const HeaderAdmin = ({ isMobile, toggleMobileMenu, toggleSidebar, toggleDarkMode, isDarkMode }) => {
  return (
    <header className={`${
      isDarkMode 
        ? 'bg-black/40 border-green-500/20' 
        : 'bg-white/40 border-green-500/50'
    } backdrop-blur-sm border-b p-4 shadow-sm`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isMobile ? (
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${
                isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-200'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-md ${
                isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-200'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-white/10' : 'bg-black/10'
            } hover:opacity-80 transition-opacity`}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center space-x-3 p-2 rounded-md ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'
            } cursor-pointer transition-colors`}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
              <img
                src="/Alson.jpeg"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-green-500 ring-offset-2 ring-offset-transparent transition-all duration-300"
                alt="Photo de profil"
              />
            </div>
            <div className="hidden md:block">
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Mon compte
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Administrateur
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;