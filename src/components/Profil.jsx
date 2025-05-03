import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Icônes SVG
const IconCamera = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconEmail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);

const IconGraduationCap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const IconBuilding = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconSave = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const IconSuccess = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function Profil() {
  // Données utilisateur (simulées)
  const [userData, setUserData] = useState({
    nom: "Nassere Yacouba",
    email: "Nassere@gmail.com",
    filiere: "IGL",
    niveau: "Licence 3",
    institution: "UTA",
    photo: null
  });

  // États pour la modification du mot de passe
  const [ancienMdp, setAncienMdp] = useState("");
  const [nouveauMdp, setNouveauMdp] = useState("");
  const [confirmMdp, setConfirmMdp] = useState("");
  const [mdpError, setMdpError] = useState("");
  const [mdpSuccess, setMdpSuccess] = useState(false);

  // État pour le chargement
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Fonction pour gérer le changement de photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour gérer la soumission du formulaire de mot de passe
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMdpError("");
    
    // Validation simple
    if (nouveauMdp !== confirmMdp) {
      setMdpError("Les mots de passe ne correspondent pas");
      setIsSaving(false);
      return;
    }
    
    if (nouveauMdp.length < 8) {
      setMdpError("Le mot de passe doit contenir au moins 8 caractères");
      setIsSaving(false);
      return;
    }

    // Simulation d'une API call
    setTimeout(() => {
      setIsSaving(false);
      setMdpSuccess(true);
      setAncienMdp("");
      setNouveauMdp("");
      setConfirmMdp("");
      
      // Réinitialiser le message de succès après 3 secondes
      setTimeout(() => {
        setMdpSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Animation des sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.2, 
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
          Votre Profil
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Gérez vos informations personnelles et paramètres de sécurité.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section Photo de profil */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <IconCamera className="mr-2 text-teal-500" />
              Photo de profil
            </h2>
            
            <div className="flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center overflow-hidden relative">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-bold text-white">
                      {userData.nom.split(' ').map(name => name[0]).join('')}
                    </span>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <span className="bg-white p-2 rounded-full">
                    <IconCamera className="text-teal-600" />
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>
              
              <p className="mt-4 text-sm text-gray-500 text-center">
                Cliquez sur la photo pour modifier
              </p>
              
              {photoPreview && (
                <button 
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center"
                  onClick={() => {
                    // Simuler la sauvegarde
                    setIsSaving(true);
                    setTimeout(() => {
                      setUserData({...userData, photo: photoPreview});
                      setIsSaving(false);
                    }, 1000);
                  }}
                >
                  {isSaving ? 
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sauvegarde...
                    </span> : 
                    <>
                      <IconSave className="mr-2" />
                      Enregistrer
                    </>
                  }
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Section Informations personnelles */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <IconUser className="mr-2 text-teal-500" />
              Informations personnelles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <IconUser className="text-gray-500 mr-2" />
                  <span>{userData.nom}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <IconEmail className="text-gray-500 mr-2" />
                  <span>{userData.email}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filière</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <IconGraduationCap className="text-gray-500 mr-2" />
                  <span>{userData.filiere}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <IconGraduationCap className="text-gray-500 mr-2" />
                  <span>{userData.niveau}</span>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <IconBuilding className="text-gray-500 mr-2" />
                  <span>{userData.institution}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              Pour modifier ces informations, veuillez contacter l'administration.
            </div>
          </div>
        </motion.div>

        {/* Section Sécurité - Modification du mot de passe */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-3"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <IconLock className="mr-2 text-teal-500" />
              Sécurité - Modification du mot de passe
            </h2>
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                  <input 
                    type="password" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    value={ancienMdp}
                    onChange={(e) => setAncienMdp(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                  <input 
                    type="password" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    value={nouveauMdp}
                    onChange={(e) => setNouveauMdp(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                  <input 
                    type="password" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    value={confirmMdp}
                    onChange={(e) => setConfirmMdp(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {mdpError && (
                <div className="mt-4 text-red-500 bg-red-50 p-3 rounded-lg">
                  {mdpError}
                </div>
              )}
              
              {mdpSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-700 bg-green-50 p-3 rounded-lg flex items-center"
                >
                  <IconSuccess className="mr-2" />
                  Votre mot de passe a été modifié avec succès.
                </motion.div>
              )}
              
              <div className="mt-6 flex justify-center">
                <button 
                  type="submit"
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center"
                  disabled={isSaving}
                >
                  {isSaving ? 
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Modification en cours...
                    </span> : 
                    <>
                      <IconLock className="mr-2" />
                      Modifier le mot de passe
                    </>
                  }
                </button>
              </div>
            </form>
          </div>
        </motion.div>
        
        {/* Section des statistiques d'activité */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-3"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Résumé de votre activité</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-teal-50 to-green-100 p-6 rounded-xl shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">37</div>
                  <p className="text-teal-800">Ressources téléchargées</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-6 rounded-xl shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">124</div>
                  <p className="text-blue-800">Ressources consultées</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <a href="/historique" className="text-teal-600 hover:text-teal-800 font-medium">
                Voir l'historique complet →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profil;