import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const activites = [
  {
    id: 1,
    type: 'Téléchargement',
    titre: 'Introduction à React',
    description: 'Un guide complet pour démarrer avec React.js.',
    auteur: 'Jean Dupont',
    filiere: 'Informatique',
    matiere: 'Développement Web',
    niveau: 'Licence 2',
    date: '2025-05-01',
    avatar: 'JD'
  },
  {
    id: 2,
    type: 'Vue',
    titre: 'Introduction à React',
    description: 'Un guide complet pour démarrer avec React.js.',
    auteur: 'Jean Dupont',
    filiere: 'Informatique',
    matiere: 'Développement Web',
    niveau: 'Licence 2',
    date: '2025-05-02',
    avatar: 'JD'
  },
  {
    id: 3,
    type: 'Téléchargement',
    titre: 'Sujet Téléchargement',
    description: 'Sujet d\'examen en réseaux informatiques.',
    auteur: 'Mme Koné',
    filiere: 'Réseaux',
    matiere: 'Architecture réseau',
    niveau: 'Master 1',
    date: '2025-05-03',
    avatar: 'MK'
  },
  {
    id: 4,
    type: 'Vue',
    titre: 'Sujet Téléchargement',
    description: 'Sujet d\'examen en réseaux informatiques.',
    auteur: 'Mme Koné',
    filiere: 'Réseaux',
    matiere: 'Architecture réseau',
    niveau: 'Master 1',
    date: '2025-05-04',
    avatar: 'MK'
  },
  {
    id: 5,
    type: 'Vue',
    titre: 'Introduction à JavaScript',
    description: 'Les bases essentielles pour comprendre JS.',
    auteur: 'Ali Dabo',
    filiere: 'Informatique',
    matiere: 'Programmation',
    niveau: 'Licence 1',
    date: '2025-05-05',
    avatar: 'AD'
  }
];

// Extraction des catégories uniques
const filieres = [...new Set(activites.map(a => a.filiere))];
const niveaux = [...new Set(activites.map(a => a.niveau))];

// Icônes SVG
const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconFolder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconGraduationCap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconFilter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

function Historique() {
  const [typeFiltre, setTypeFiltre] = useState('Tous');
  const [filiereFiltre, setFiliereFiltre] = useState('Toutes');
  const [niveauFiltre, setNiveauFiltre] = useState('Tous');
  const [filtreVisible, setFiltreVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Fonction de filtrage
  const activitesFiltrees = activites
    .filter(a => typeFiltre === 'Tous' || a.type === typeFiltre)
    .filter(a => filiereFiltre === 'Toutes' || a.filiere === filiereFiltre)
    .filter(a => niveauFiltre === 'Tous' || a.niveau === niveauFiltre)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Statistiques
  const stats = activites.filter(a => a.titre === 'Sujet Téléchargement');
  const totalDownloads = stats.filter(a => a.type === 'Téléchargement').length;
  const totalViews = stats.filter(a => a.type === 'Vue').length;

  // Formater la date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Pour les animations des cartes
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1, 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    })
  };

  // Animation du titre
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut"
      }
    }
  };

  // Animation de la section de filtres
  const filterVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1, transition: { duration: 0.3 } }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-4 text-xl text-white">Chargement de votre historique...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
          Historique d'activité
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Suivez vos interactions avec les ressources pédagogiques pour optimiser votre apprentissage.
        </p>
      </motion.div>

      {/* Barre de filtres */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconFilter />
            <h2 className="text-lg font-semibold text-white truncate">Filtres</h2>
          </div>
          <button 
            onClick={() => setFiltreVisible(!filtreVisible)}
            className="text-sm font-medium text-teal-600 hover:text-teal-800"
          >
            {filtreVisible ? 'Masquer les filtres' : 'Afficher plus de filtres'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div>
            <label className="text-sm text-white block mb-1">Type</label>
            <select
              value={typeFiltre}
              onChange={(e) => setTypeFiltre(e.target.value)}
              className="p-2 bg-teal-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            >
              <option value="Tous">Tous les types</option>
              <option value="Téléchargement">Téléchargement</option>
              <option value="Vue">Vue</option>
            </select>
          </div>

          <motion.div 
            className="w-full overflow-hidden"
            variants={filterVariants}
            initial="closed"
            animate={filtreVisible ? "open" : "closed"}
          >
            <div className="flex flex-wrap gap-4 pt-4">
              <div>
                <label className="text-sm text-white block mb-1">Filière</label>
                <select
                  value={filiereFiltre}
                  onChange={(e) => setFiliereFiltre(e.target.value)}
                  className="p-2 bg-teal-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                >
                  <option value="Toutes">Toutes les filières</option>
                  {filieres.map(filiere => (
                    <option key={filiere} value={filiere}>{filiere}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-white block mb-1">Niveau</label>
                <select
                  value={niveauFiltre}
                  onChange={(e) => setNiveauFiltre(e.target.value)}
                  className="p-2 bg-teal-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                >
                  <option value="Tous">Tous les niveaux</option>
                  {niveaux.map(niveau => (
                    <option key={niveau} value={niveau}>{niveau}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Résultats de recherche */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Résultats ({activitesFiltrees.length} activités)
        </h2>
        <div className="text-sm text-white">
          Trié par date (plus récent)
        </div>
      </div>

      <div className="space-y-6">
        {activitesFiltrees.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun résultat</h3>
            <p className="mt-2 text-gray-500">Essayez de modifier vos filtres pour voir plus de résultats.</p>
          </div>
        ) : (
          activitesFiltrees.map((activite, index) => (
            <motion.div
              key={activite.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow
              bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300"
            >
              <div className="md:flex ">
                {/* Bande latérale avec informations essentielles */}
                <div className={`w-full md:w-48 p-4 flex flex-col justify-center items-center 
                  ${activite.type === 'Téléchargement' ? '' : ''}`}>
                  <div className="flex flex-col items-center mb-6 text-center">
                    <div className={`h-16 w-16 flex items-center justify-center rounded-full ${activite.type === 'Téléchargement' ? 'bg-emerald-500' : 'bg-blue-500'} text-white mb-3`}>
                      {activite.type === 'Téléchargement' ? <IconDownload /> : <IconEye />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{activite.type}</p>
                      <p className="text-sm text-gray-400">{formatDate(activite.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-400 mb-2">
                      {activite.avatar}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{activite.auteur}</p>
                      <p className="text-xs text-gray-400">Auteur</p>
                    </div>
                  </div>
                </div>
                
                {/* Contenu principal */}
                <div className="p-6 md:flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{activite.titre}</h3>
                  
                  <div className=" border-l-4 border-gray-300 p-4 mb-6 rounded">
                    <p className="text-gray-400 italic">"{activite.description}"</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full">
                      {activite.filiere}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {activite.matiere}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                      {activite.niveau}
                    </span>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-auto">
                    <button className="flex items-center gap-2 px-4 py-2 border border-sky-100 text-teal-600 rounded-lg hover:bg-sky-200 transition">
                      <IconEye />
                      <span>Voir</span>
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 ${activite.type === 'Téléchargement' ? 'bg-teal-600' : 'bg-teal-600'} text-white rounded-lg hover:bg-teal-700 transition`}>
                      <IconDownload />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Tableau de bord analytique */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 bg-white rounded-xl shadow-lg p-6 overflow-hidden
        bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-white
        ">
          Analyse détaillée : <span className="text-teal-500">"Sujet Téléchargement"</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-teal-700 to-green-100 p-6 rounded-xl shadow-inner">
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-900 mb-2">{totalDownloads}</div>
              <div className="flex items-center justify-center">
                <IconDownload className="text-teal-900 mr-2" />
                <p className="text-teal-800">Téléchargements totaux</p>
              </div>
            </div>
            <div className="h-2 w-full bg-white bg-opacity-40 rounded-full mt-4">
              <div className="h-2 bg-teal-900 rounded-full" style={{ width: `${(totalDownloads/5)*100}%` }}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-sky-300 p-6 rounded-xl shadow-inner">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">{totalViews}</div>
              <div className="flex items-center justify-center">
                <IconEye className="text-blue-500 mr-2" />
                <p className="text-blue-800">Vues totales</p>
              </div>
            </div>
            <div className="h-2 w-full bg-white bg-opacity-40 rounded-full mt-4">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(totalViews/5)*100}%` }}></div>
            </div>
          </div>
        </div>
        
       
      </motion.div>
    </div>
  );
}

export default Historique;