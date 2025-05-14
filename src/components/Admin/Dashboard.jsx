import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';
import {
  ChevronDown,
  Plus,
  User,
  Users,
  FileText,
  School,
  PieChart
} from 'lucide-react';

const Dashboard = () => {
  const { isDarkMode } = useOutletContext();

  // Données
  const statsData = [
    { title: 'Utilisateurs', count: '2.8k', icon: Users, percent: '+12%', color: 'from-green-500 to-green-600' },
    { title: 'Documents', count: '3.4k', icon: FileText, percent: '+24%', color: 'from-emerald-500 to-emerald-600' },
    { title: 'Filières', count: '12', icon: School, percent: '+2', color: 'from-teal-500 to-teal-600' },
  ];

  // Données pour le graphique camembert
  const pieData = [
    { label: 'Mathématiques', value: 35, color: 'bg-blue-500' },
    { label: 'Informatique', value: 25, color: 'bg-green-500' },
    { label: 'Physique', value: 20, color: 'bg-purple-500' },
    { label: 'Économie', value: 15, color: 'bg-yellow-500' },
    { label: 'Autres', value: 5, color: 'bg-gray-500' }
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  // Composants
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

  const QuickActions = () => (
    <motion.div
      variants={itemVariants}
      className={`${
        isDarkMode 
          ? ' bg-white/5 border-green-500/20' 
          : 'bg-gray-100 border-green-500/50'
      } backdrop-blur-sm rounded-xl border p-6 shadow-md`}
    >
      <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>Actions rapides</h3>
      <div className="grid  grid-cols-2 md:grid-cols-2 gap-4">
        <Link to="/admin/documents">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 w-full ${
              isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gray-200/50 hover:bg-gray-200'
            } rounded-lg flex flex-col items-center shadow-sm hover:shadow transition-all`}
          >
            <Plus className="h-6 w-6 text-green-400 mb-2" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nouveau document</span>
          </motion.button>
        </Link>
        <Link to="/admin/ajoutmat">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 w-full ${
              isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gray-200/50 hover:bg-gray-200'
            } rounded-lg flex flex-col items-center shadow-sm hover:shadow transition-all`}
          >
            <User className="h-6 w-6 text-blue-400 mb-2" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ajouter utilisateur</span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );

  const StatsChart = () => {
    // Calculer le total pour les pourcentages
    const total = pieData.reduce((sum, item) => sum + item.value, 0);
    
    // Pour suivre la position angulaire de chaque secteur
    let cumulativePercent = 0;
    
    return (
      <motion.div
        variants={itemVariants}
        className={`${
          isDarkMode ? ' bg-gradient-to-br from-gray-900 to-black bg-white/5 border-green-500/20' : 'bg-gray-100 border-green-500/50'
        } rounded-xl border shadow-md p-6`}
      >
        <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-2`}>
          Répartition par matière
        </h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
          Distribution des documents par domaine d'étude
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Graphique camembert */}
          <div className="relative w-64 h-64">
            <div className="w-64 h-64 rounded-full overflow-hidden">
              {pieData.map((item, index) => {
                // Calculer les angles pour chaque secteur
                const startPercent = cumulativePercent;
                const valuePercent = item.value / total;
                cumulativePercent += valuePercent;
                
                return (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full  ${item.color}`}
                    style={{
                      clipPath: `polygon(50% 50%, ${50 + 40 * Math.cos(2 * Math.PI * startPercent)}% ${50 + 40 * Math.sin(2 * Math.PI * startPercent)}%, ${50 + 50 * Math.cos(2 * Math.PI * startPercent + 0.01)}% ${50 + 50 * Math.sin(2 * Math.PI * startPercent + 0.01)}%, ${50 + 50 * Math.cos(2 * Math.PI * cumulativePercent - 0.01)}% ${50 + 50 * Math.sin(2 * Math.PI * cumulativePercent - 0.01)}%, ${50 + 40 * Math.cos(2 * Math.PI * cumulativePercent)}% ${50 + 40 * Math.sin(2 * Math.PI * cumulativePercent)}%)`,
                      transformOrigin: 'center',
                      transform: 'rotate(-90deg)'
                    }}
                  />
                );
              })}
              <div 
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
              />
            </div>
            
            {/* Icône au centre */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <PieChart className={`w-10 h-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
          
          {/* Légende */}
          <div className="flex flex-col gap-3 flex-1">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-sm mr-2 ${item.color}`}></div>
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>{item.value}%</span>
                </div>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t border-dashed border-gray-400">
              <div className="flex justify-between">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Documents totaux</span>
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold`}>3,412</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-7xl mx-auto "
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center ">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Aperçu global des activités de la plateforme
          </p>
        </div>
      </motion.div>

      <QuickActions />

      <StatsChart />

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;