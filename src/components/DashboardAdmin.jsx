import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  BookOpen,
  School,
  ChevronDown,
  Plus,
  Trash2,
  Edit2,
  Eye,
  User,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

const DashboardAdmin = () => {
  // États principaux
  const [activeSidebar, setActiveSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Appliquer le thème dark/light
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Détection du mode mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setActiveSidebar(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Données
  const statsData = [
    { title: 'Utilisateurs', count: '2.8k', icon: Users, percent: '+12%', color: 'from-green-500 to-green-600' },
    { title: 'Documents', count: '3.4k', icon: FileText, percent: '+24%', color: 'from-emerald-500 to-emerald-600' },
    { title: 'Filières', count: '12', icon: School, percent: '+2', color: 'from-teal-500 to-teal-600' },
  ];

  const recentDocuments = [
    { id: 1, title: 'Examen Mathématiques 2023', type: 'PDF', date: '04/05/2023', size: '2.4 MB', matiere: 'Mathématiques' },
    { id: 2, title: 'Contrôle Physique S2', type: 'PDF', date: '03/05/2023', size: '1.8 MB', matiere: 'Physique' },
    { id: 3, title: 'Partiel Sciences Eco', type: 'DOCX', date: '01/05/2023', size: '3.2 MB', matiere: 'Économie' },
    { id: 4, title: 'TP Informatique - Base de données', type: 'PDF', date: '30/04/2023', size: '1.5 MB', matiere: 'Informatique' },
  ];

  // Animations
  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.3 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  // Actions
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const toggleSidebar = () => setActiveSidebar(!activeSidebar);

  // Composants
  const Sidebar = () => (
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
              {[
                { id: 'dashboard', title: 'Tableau de bord', icon: LayoutDashboard },
                { id: 'users', title: 'Utilisateurs', icon: Users },
                { id: 'documents', title: 'Documents', icon: FileText },
                { id: 'settings', title: 'Paramètres', icon: Settings },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? `bg-gradient-to-r from-green-500/20 to-green-600/10 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        } font-medium`
                      : `${isDarkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-200'}`
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    isMobile && setShowMobileMenu(false);
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </motion.button>
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

  const StatsCard = ({ title, count, icon: Icon, percent, color }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`${
        isDarkMode ? 'bg-white/5 border-green-500/20' : 'bg-gray-100 border-green-500/50'
      } backdrop-blur-sm rounded-xl border p-5 shadow-md hover:shadow-lg transition-all`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>{title}</p>
          <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>{count}</h3>
          <p className="text-green-400 text-sm mt-2 flex items-center">
            {percent} <ChevronDown className="w-4 h-4 ml-1 rotate-180" />
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color} shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const DocumentsTable = () => (
    <motion.div
      variants={itemVariants}
      className={`${
        isDarkMode ? 'bg-white/5 border-green-500/20' : 'bg-gray-100 border-green-500/50'
      } rounded-xl border shadow-md`}
    >
      <div className={`p-6 border-b ${
        isDarkMode ? 'border-gray-800' : 'border-gray-200'
      } flex justify-between items-center`}
      >
        <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>
          Documents récents
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter</span>
        </motion.button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${
            isDarkMode ? 'bg-black/20 text-gray-400' : 'bg-gray-200/50 text-gray-600'
          } text-sm`}
          >
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Matière</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
            {recentDocuments.map((doc) => (
              <motion.tr
                key={doc.id}
                whileHover={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
                className="transition-colors"
              >
                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {doc.title}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs ${
                    isDarkMode 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-green-100 text-green-600 border-green-500/50'
                  } rounded-full border`}
                  >
                    {doc.matiere}
                  </span>
                </td>
                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {doc.type}
                </td>
                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {doc.date}
                </td>
                <td className="px-6 py-4">
                  <div className={`flex gap-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <motion.button whileHover={{ scale: 1.2 }} className="hover:text-green-500 transition-colors">
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.2 }} className="hover:text-blue-500 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.2 }} className="hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const QuickActions = () => (
    <motion.div
      variants={itemVariants}
      className={`${
        isDarkMode 
          ? 'bg-white/5 border-green-500/20' 
          : 'bg-gray-100 border-green-500/50'
      } backdrop-blur-sm rounded-xl border p-6 shadow-md`}
    >
      <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>Actions rapides</h3>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 ${
            isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-200/50 hover:bg-gray-200'
          } rounded-lg flex flex-col items-center shadow-sm hover:shadow transition-all`}
        >
          <Plus className="h-6 w-6 text-green-400 mb-2" />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nouveau document</span>
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 ${
            isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-200/50 hover:bg-gray-200'
          } rounded-lg flex flex-col items-center shadow-sm hover:shadow transition-all`}
        >
          <User className="h-6 w-6 text-blue-400 mb-2" />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ajouter utilisateur</span>
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className={`flex h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    } ${isDarkMode ? 'text-white' : 'text-gray-900'} overflow-hidden`}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
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
                />                </div>
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

        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 max-w-7xl mx-auto"
          >

            <motion.div variants={itemVariants} className="flex justify-between items-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Tableau de bord</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Aperçu global des activités de la plateforme
                </p>
              </div>
            </motion.div>

            <QuickActions />

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <DocumentsTable />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;