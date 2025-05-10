import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  UserPlus,
  X
} from 'lucide-react';

const NavbarAdmin = ({ activeSidebar, showMobileMenu, setShowMobileMenu, isDarkMode, isMobile }) => {
  // Animations
  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.3 } }
  };

  const navItems = [
    { id: 'dashboard', title: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
    { id: 'users', title: 'Utilisateurs', icon: Users, path: '/admin/utilisateurs' },
    { id: 'Add_Mat', title: 'Ajout de Matricule', icon: UserPlus, path: '/admin/ajoutmat' },
    { id: 'documents', title: 'Documents', icon: FileText, path: '/admin/documents' },
    { id: 'settings', title: 'Paramètres', icon: Settings, path: '/admin/parametres' },
  ];

  return (
    <AnimatePresence>
      {(activeSidebar || showMobileMenu) && (
        <motion.div
          className={`fixed lg:relative w-64 h-full ${
            isDarkMode 
              ? 'bg-gradient-to-br from-black to-gray-900' 
              : 'bg-gradient-to-br from-white to-gray-100'
          } border-r ${
            isDarkMode ? 'border-green-500/20' : 'border-green-500/50'
          } z-30 shadow-lg`}
          variants={sidebarVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className="p-6 h-full flex flex-col">
            {isMobile && (
              <button
                className={`absolute top-4 right-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } hover:text-green-400`}
                onClick={() => setShowMobileMenu(false)}
              >
                <X className="w-6 h-6" />
              </button>
            )}

            <div className="flex items-center gap-3 mb-10 ">
              <h1 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>      
                <span className="text-green-700 text-3xl tracking-wider font-bold">Old</span>
                Topic</h1>
            </div>

            <nav className="space-y-2 flex-1">
              {navItems.map((item) => (
                <NavLink
                  to={item.path}
                  key={item.id}
                  className={({ isActive }) => `
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? `bg-gradient-to-r from-green-500/20 to-green-600/10 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        } font-medium`
                      : `${isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-200'}`
                    }
                  `}
                  end={item.id === 'dashboard'}
                  onClick={() => isMobile && setShowMobileMenu(false)}
                >
                  {({isActive}) => (
                    <motion.div
                      className="w-full flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </nav>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-6 w-full flex items-center gap-3 px-4 py-3 ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } hover:${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} rounded-lg`}
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarAdmin;