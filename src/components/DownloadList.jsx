import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, DownloadCloud, Clock, BookOpen, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

const DownloadList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedTitle, setSelectedTitle] = useState(null); // Pour la modal du titre complet
  const [isLoading, setIsLoading] = useState(true);

  // Données fictives pour la démo
  const downloads = [
    {
      id: 1,
      title: 'Examen Final - Mathématiques Avancées avec des concepts très complexes et des applications poussées',
      subject: 'Mathématiques',
      year: '2023',
      faculty: 'IGL',
      type: 'Examen',
      size: '2.4 MB',
      level: 'Master 2', // Ajout du niveau
    },
    {
      id: 2,
      title: 'TD - Physique Quantique : Introduction aux principes fondamentaux et aux théories relativistes',
      subject: 'Physique',
      year: '2024',
      faculty: 'RIT',
      type: 'Travaux Dirigés',
      size: '1.8 MB',
      level: 'Licence 3', // Ajout du niveau
    },
    {
      id: 3,
      title: 'Correction détaillée de l\'épreuve d\'Algorithmique et Structures de Données',
      subject: 'Informatique',
      year: '2022',
      faculty: 'IGL',
      type: 'Correction',
      size: '3.1 MB',
      level: 'Licence 2', // Ajout du niveau
    },
    {
      id: 4,
      title: 'Examen Partiel - Thermodynamique : Principes, applications et exercices résolus',
      subject: 'Physique',
      year: '2023',
      faculty: 'RIT',
      type: 'Examen',
      size: '2.1 MB',
      level: 'Licence 1', // Ajout du niveau
    },
    {
      id: 5,
      title: 'TD - Électromagnétisme Avancé : Ondes, propagation et interactions avec la matière',
      subject: 'Physique',
      year: '2024',
      faculty: 'RIT',
      type: 'Travaux Dirigés',
      size: '2.9 MB',
      level: 'Master 1', // Ajout du niveau
    },
    {
      id: 6,
      title: 'Correction - Programmation Orientée Objet : Concepts avancés et design patterns',
      subject: 'Informatique',
      year: '2023',
      faculty: 'IGL',
      type: 'Correction',
      size: '3.4 MB',
      level: 'Licence 3', // Ajout du niveau
    },
    {
      id: 7,
      title: 'Examen Final - Chimie Organique : Nomenclature, réactions et mécanismes réactionnels complexes',
      subject: 'Chimie',
      year: '2022',
      faculty: 'FBA',
      type: 'Examen',
      size: '2.7 MB',
      level: 'Master 2', // Ajout du niveau
    },
  ];

  // Calcul des pages
  const totalPages = Math.ceil(downloads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = downloads.slice(startIndex, startIndex + itemsPerPage);

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Animation des éléments
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-4 text-xl text-white">Chargement de votre recherche...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      {/* Fond animé discret */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-green-500/10 to-transparent animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600 mb-4">
            Archives Académiques
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Parcourez et téléchargez les ressources pédagogiques de l'Université
          </p>
        </motion.div>

        {/* Grille des documents avec animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-green-500/10 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FileText className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="min-w-0 cursor-pointer" onClick={() => setSelectedTitle(item.title)}>
                    <h3 className="text-lg font-semibold text-white truncate group-hover:text-green-400 transition-colors duration-300" title={item.title}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">{item.subject}</p>
                  </div>
                </div>

                {/* Métadonnées */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <BookOpen className="w-4 h-4 mr-1 text-green-400" />
                    {item.faculty}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="w-4 h-4 mr-1 text-green-400" />
                    {item.year}
                  </div>
                  {item.level && ( // Afficher le niveau seulement s'il existe
                    <div className="flex items-center text-sm text-gray-300">
                      <GraduationCap className="w-4 h-4 mr-1 text-green-400" />
                      {item.level}
                    </div>
                  )}
                </div>

                {/* Barre de séparation */}
                <div className="border-t border-white/10 my-4"></div>

                {/* Footer du document */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 truncate">{item.size}</span>
                  <button className="flex items-center px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                    <DownloadCloud className="w-5 h-5 mr-2" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination améliorée */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12 space-x-4 items-center"
          >
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    page === currentPage
                      ? 'bg-green-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  } transition-colors`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </motion.div>
        )}

        {/* Modal pour afficher le titre complet */}
        <AnimatePresence>
          {selectedTitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
              onClick={() => setSelectedTitle(null)} // Ferme la modal au clic en dehors
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()} // Empêche la fermeture au clic à l'intérieur
                className="bg-gray-800 rounded-lg p-8 max-w-md"
              >
                <h4 className="text-xl font-semibold text-white mb-4">{selectedTitle}</h4>
                <button onClick={() => setSelectedTitle(null)} className="bg-green-500 text-white rounded-md px-4 py-2 text-sm">Fermer</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DownloadList;