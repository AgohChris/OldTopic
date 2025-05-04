import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, BookOpen, GraduationCap, Book } from 'lucide-react';

const Hero = () => {
  const [filiere, setFiliere] = useState('');
  const [niveau, setNiveau] = useState('');
  const [matiere, setMatiere] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  // Références séparées pour les déclencheurs et les menus
  const dropdownTriggerRefs = {
    filiere: useRef(null),
    niveau: useRef(null),
    matiere: useRef(null)
  };

  const dropdownMenuRefs = {
    filiere: useRef(null),
    niveau: useRef(null),
    matiere: useRef(null)
  };

  // Options
  const filieres = ['IGL', 'RIT', 'Économie', 'FBA', 'Génie Civil', 'Architecture', 'Médecine', 'Pharmacie', 'Droit', 'Science Politique', 'Sociologie', 'Histoire', 'Géographie'];
  const niveaux = ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat', 'DUT', 'BTS'];
  const matieres = ['Maths', 'Physique', 'Info', 'Statistique', 'Chimie', 'Biologie', 'Économétrie', 'Droit Commercial', 'Comptabilité', 'Marketing', 'Algorithmique', 'Base de Données', 'Réseaux', 'Analyse Numérique', 'Chimie Organique', 'Biochimie', 'Microéconomie', 'Macroéconomie'];

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownOpen) return;

      const trigger = dropdownTriggerRefs[dropdownOpen].current;
      const menu = dropdownMenuRefs[dropdownOpen].current;

      if (!trigger || !menu) return;

      const isClickInside = trigger.contains(event.target) || menu.contains(event.target);

      if (!isClickInside) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!filiere || !niveau || !matiere) {
      alert("Merci de sélectionner tous les champs !");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      console.log({ filiere, niveau, matiere });
      setIsLoading(false);
    }, 1500);
  };

  const handleDropdownClick = (e, dropdown) => {
    e.stopPropagation();
    setDropdownOpen(dropdownOpen === dropdown ? null : dropdown);
  };

  const handleOptionSelect = (option, type) => {
    if (type === 'filiere') setFiliere(option);
    if (type === 'niveau') setNiveau(option);
    if (type === 'matiere') setMatiere(option);
    setDropdownOpen(null);
  };

  return (
    <div className="relative max-h-full w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Overlay vidéo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute object-cover w-full h-full"
        >
          <source src="/video-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-20 py-19">
        {/* ... (contenu inchangé jusqu'au formulaire) ... */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            <span className="inline-block bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              Prépare tes examens
            </span>
            <br />
            en toute sérénité
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Retrouve rapidement les anciens sujets d'examens de l'UTA,
            triés par matière, année ou enseignant.
          </motion.p>
        </motion.div>

         {/* Cards avec icônes */}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center">
            <div className="bg-green-500/20 p-3 rounded-full inline-flex mb-4">
              <BookOpen className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Ressources Centralisées</h3>
            <p className="text-gray-300 text-sm">Tous les sujets d'examens en un seul endroit</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center">
            <div className="bg-green-500/20 p-3 rounded-full inline-flex mb-4">
              <GraduationCap className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Performance Accrue</h3>
            <p className="text-gray-300 text-sm">Améliore tes résultats grâce à une préparation ciblée</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center">
            <div className="bg-green-500/20 p-3 rounded-full inline-flex mb-4">
              <Book className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Révision Intelligente</h3>
            <p className="text-gray-300 text-sm">Adapte ton apprentissage aux formats d'examens</p>
          </div>
        </motion.div>
      
        {/* Formulaire de recherche */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={`max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-1 rounded-2xl border ${searchFocused ? 'border-green-400' : 'border-white/20'} transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row items-center">
            {/* Sélecteur de filière */}
            <div className="relative w-full md:w-1/3 px-2 py-3">
              <div
                ref={dropdownTriggerRefs.filiere}
                onClick={(e) => handleDropdownClick(e, 'filiere')}
                className="flex items-center justify-between cursor-pointer text-gray-200 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className={filiere ? 'text-white' : 'text-gray-400'}>
                  {filiere || 'Filière'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdownOpen === 'filiere' ? 'rotate-180' : ''}`} />
              </div>

              {dropdownOpen === 'filiere' && (
                <div
                  ref={dropdownMenuRefs.filiere}
                  className="absolute left-0 right-0 mt-2 mx-2 bg-gray-800 rounded-lg shadow-lg z-50"
                >
                  <div className="max-h-30 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700 pr-4">
                    {filieres.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 text-gray-200 hover:bg-green-600/30 hover:text-white cursor-pointer transition-colors"
                        onClick={() => handleOptionSelect(option, 'filiere')}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Répéter le même pattern pour niveau et matière */}
            {/* Sélecteur de niveau */}
            <div className="relative w-full md:w-1/3 px-2 py-3">
              <div
                ref={dropdownTriggerRefs.niveau}
                onClick={(e) => handleDropdownClick(e, 'niveau')}
                className="flex items-center justify-between cursor-pointer text-gray-200 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className={niveau ? 'text-white' : 'text-gray-400'}>
                  {niveau || 'Niveau'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdownOpen === 'niveau' ? 'rotate-180' : ''}`} />
              </div>

              {dropdownOpen === 'niveau' && (
                <div
                  ref={dropdownMenuRefs.niveau}
                  className="absolute left-0 right-0 mt-2 mx-2 bg-gray-800 rounded-lg shadow-lg z-50"
                >
                  <div className="max-h-30 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700 pr-4">
                    {niveaux.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 text-gray-200 hover:bg-green-600/30 hover:text-white cursor-pointer transition-colors"
                        onClick={() => handleOptionSelect(option, 'niveau')}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sélecteur de matière */}
            <div className="relative w-full md:w-1/3 px-2 py-3">
              <div
                ref={dropdownTriggerRefs.matiere}
                onClick={(e) => handleDropdownClick(e, 'matiere')}
                className="flex items-center justify-between cursor-pointer text-gray-200 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className={matiere ? 'text-white' : 'text-gray-400'}>
                  {matiere || 'Matière'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdownOpen === 'matiere' ? 'rotate-180' : ''}`} />
              </div>

              {dropdownOpen === 'matiere' && (
                <div
                  ref={dropdownMenuRefs.matiere}
                  className="absolute left-0 right-0 mt-2 mx-2 bg-gray-800 rounded-lg shadow-lg z-50"
                >
                  <div className="max-h-30 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700 pr-4">
                    {matieres.map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 text-gray-200 hover:bg-green-600/30 hover:text-white cursor-pointer transition-colors"
                        onClick={() => handleOptionSelect(option, 'matiere')}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bouton de recherche (inchangé) */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-auto px-8 py-3 mt-4 md:mt-0 mx-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl flex items-center justify-center transition-all ${isLoading ? 'opacity-70' : ''}`}
            >
              {/* ... contenu du bouton inchangé ... */}
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  <span>Rechercher</span>
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* ... (reste du code inchangé) ... */}
        {/* Styles CSS pour les scrollbars personnalisées */}
        <style >{`
          /* Styles pour les scrollbars modernes */
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }

          .scrollbar-thin::-webkit-scrollbar-track {
            background:rgb(41, 70, 116);
            border-radius: 10px;
          }

          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: #10B981;
            border-radius: 10px;
          }

          .scrollbar-thin {
            scrollbar-width: thin;
            scrollbar-color: #10B981 #374151;
          }
        `}</style>

         {/* Badges statistiques */}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">2500+</div>
            <div className="text-sm text-gray-300">Sujets d'examens</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">97%</div>
            <div className="text-sm text-gray-300">Utilisateurs satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">12</div>
            <div className="text-sm text-gray-300">Filières couvertes</div>
          </div>
        </motion.div>

         
      </div>
              {/* Vague décorative en bas */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
          <svg viewBox="0 0 1440 200" className="w-full h-auto">
            <path
              fill="#F9FAFB"
              fillOpacity="0.08"
              d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,170.7C672,181,768,171,864,144C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

    </div>
    
  );
};

export default Hero;