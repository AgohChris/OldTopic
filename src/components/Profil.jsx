import { useState, useEffect } from 'react';
import { Camera, Lock, User, Mail, GraduationCap, Building, Save, CheckCircle, Pencil, Calendar, X, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Profil() {
  // Données utilisateur (simulées)
  const [userData, setUserData] = useState({
    nom: "Nassere Yacouba",
    email: "Nassere@gmail.com",
    filiere: "IGL",
    niveau: "Licence 3",
    institution: "UTA",
    dateInscription: "12/09/2022",
    photo: null
  });

  // États pour la modification
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({...userData});

  // États pour la modification du mot de passe
  const [passwordSection, setPasswordSection] = useState(false);
  const [ancienMdp, setAncienMdp] = useState("");
  const [nouveauMdp, setNouveauMdp] = useState("");
  const [confirmMdp, setConfirmMdp] = useState("");
  const [mdpError, setMdpError] = useState("");
  const [mdpSuccess, setMdpSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  // État pour le chargement
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  // Simulation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Réinitialiser les données d'édition lorsque le mode édition est désactivé
  useEffect(() => {
    if (!editMode) {
      setEditData({...userData});
    }
  }, [editMode, userData]);

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
        setPasswordSection(false);
      }, 3000);
    }, 1000);
  };

  // Fonction pour sauvegarder les modifications du profil
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulation d'une API call
    setTimeout(() => {
      setUserData({...editData});
      setIsSaving(false);
      setEditMode(false);
    }, 1000);
  };

  // Fonction pour sauvegarder la photo
  const handleSavePhoto = () => {
    setIsSaving(true);
    
    // Simulation d'une API call
    setTimeout(() => {
      setUserData({...userData, photo: photoPreview});
      setIsSaving(false);
      setPhotoPreview(null);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-xl text-white">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-30 px-4 sm:px-6 lg:px-8">
      {/* En-tête avec photo de profil */}
      <div className="max-w-6xl mx-auto
      ">
        <div className="p-8 mb-8 relative overflow-hidden
        bg-gradient-to-br from-green-500/10 to-black/40 border border-green-500/20 rounded-3xl p-10 backdrop-blur-sm">
          {/* Éléments décoratifs */}
          <div className="absolute -top-14 -right-14 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10
          ">
            {/* Photo de profil */}
            <div className="relative group">
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-teal-600 to-blue-600 flex items-center justify-center overflow-hidden border-4 border-white/10 shadow-lg">
                {userData.photo ? (
                  <img src={userData.photo} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold text-white">
                    {userData.nom.split(' ').map(name => name[0]).join('')}
                  </span>
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <span className="bg-white p-2 rounded-full">
                  <Camera size={24} className="text-teal-600" />
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
            
            {/* Informations principales */}
            <div className="text-center md:text-left
            ">
              <h1 className="text-4xl font-black bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                {userData.nom}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-3 text-gray-300">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail size={16} className="mr-2 text-teal-400" />
                  {userData.email}
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <GraduationCap size={16} className="mr-2 text-teal-400" />
                  {userData.filiere} - {userData.niveau}
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Calendar size={16} className="mr-2 text-teal-400" />
                  Inscrit depuis {userData.dateInscription}
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="absolute top-2 right-2 flex gap-2">
              {photoPreview && (
                <button 
                  onClick={handleSavePhoto}
                  className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full transition-colors"
                >
                  {isSaving ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Save size={18} />
                  )}
                </button>
              )}
              {!editMode ? (
                <button 
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                >
                  <Pencil size={18} />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditMode(false)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                  >
                    {isSaving ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <CheckCircle size={18} />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Onglets de navigation */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
          <button 
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeTab === 'info' 
                ? 'bg-teal-500 text-white font-medium shadow-lg' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>Informations</span>
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeTab === 'security' 
                ? 'bg-teal-500 text-white font-medium shadow-lg' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center">
              <Lock size={18} className="mr-2" />
              <span>Sécurité</span>
            </div>
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className="space-y-6">
          {/* Informations personnelles */}
          {activeTab === 'info' && (
            <div className=" bg-gradient-to-br from-green-500/10 to-black/40 border border-green-500/20 rounded-3xl p-10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="mr-3 text-teal-400" />
                Informations personnelles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nom complet */}
                <div>
                  <label className="block text-sm font-medium text-teal-400 mb-2">Nom complet</label>
                  {!editMode ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <User size={20} className="text-gray-400" />
                      <span className="text-white">{userData.nom}</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={editData.nom}
                      onChange={(e) => setEditData({...editData, nom: e.target.value})}
                      className="w-full p-4 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                    />
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-teal-400 mb-2">Email</label>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <Mail size={20} className="text-gray-400" />
                    <span className="text-white">{userData.email}</span>
                  </div>
                </div>
                
                {/* Filière */}
                <div>
                  <label className="block text-sm font-medium text-teal-400 mb-2">Filière</label>
                  {!editMode ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <GraduationCap size={20} className="text-gray-400" />
                      <span className="text-white">{userData.filiere}</span>
                    </div>
                  ) : (
                    <select
                      value={editData.filiere}
                      onChange={(e) => setEditData({...editData, filiere: e.target.value})}
                      className="w-full p-4 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                    >
                      <option value="IGL">IGL</option>
                      <option value="RT">RT</option>
                      <option value="SI">SI</option>
                      <option value="MIAGE">MIAGE</option>
                    </select>
                  )}
                </div>
                
                {/* Niveau */}
                <div>
                  <label className="block text-sm font-medium text-teal-400 mb-2">Niveau</label>
                  {!editMode ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <GraduationCap size={20} className="text-gray-400" />
                      <span className="text-white">{userData.niveau}</span>
                    </div>
                  ) : (
                    <select
                      value={editData.niveau}
                      onChange={(e) => setEditData({...editData, niveau: e.target.value})}
                      className="w-full p-4 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                    >
                      <option value="Licence 1">Licence 1</option>
                      <option value="Licence 2">Licence 2</option>
                      <option value="Licence 3">Licence 3</option>
                      <option value="Master 1">Master 1</option>
                      <option value="Master 2">Master 2</option>
                    </select>
                  )}
                </div>
                
                {/* Institution */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-teal-400 mb-2">Institution</label>
                  {!editMode ? (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                      <Building size={20} className="text-gray-400" />
                      <span className="text-white">{userData.institution}</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={editData.institution}
                      onChange={(e) => setEditData({...editData, institution: e.target.value})}
                      className="w-full p-4 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                    />
                  )}
                </div>
              </div>
              
              {!editMode && (
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setEditMode(true)}
                    className="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors shadow-lg"
                  >
                    <Pencil size={18} className="mr-2" />
                    Modifier mes informations
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Sécurité */}
          {activeTab === 'security' && (
            <div className=" bg-gradient-to-br from-green-500/10 to-black/40 border border-green-500/20 rounded-3xl p-10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Lock className="mr-3 text-teal-400" />
                Sécurité du compte
              </h2>
              
              {!passwordSection ? (
                <div className="text-center py-12">
                  <div className="mb-8">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lock size={40} className="text-teal-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Votre mot de passe</h3>
                    <p className="text-gray-300">Modifiez votre mot de passe pour sécuriser votre compte</p>
                  </div>
                  
                  <button 
                    onClick={() => setPasswordSection(true)}
                    className="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors shadow-lg"
                  >
                    <Lock size={18} className="mr-2" />
                    Modifier mon mot de passe
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  {/* Ancien mot de passe */}
                  <div>
                    <label className="block text-sm font-medium text-teal-400 mb-2">Mot de passe actuel</label>
                    <div className="relative">
                      <input 
                        type={showPassword.old ? "text" : "password"}
                        className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                        value={ancienMdp}
                        onChange={(e) => setAncienMdp(e.target.value)}
                        required
                      />
                      <button 
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword({...showPassword, old: !showPassword.old})}
                      >
                        {showPassword.old ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Nouveau mot de passe */}
                  <div>
                    <label className="block text-sm font-medium text-teal-400 mb-2">Nouveau mot de passe</label>
                    <div className="relative">
                      <input 
                        type={showPassword.new ? "text" : "password"}
                        className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                        value={nouveauMdp}
                        onChange={(e) => setNouveauMdp(e.target.value)}
                        required
                      />
                      <button 
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                      >
                        {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Confirmer mot de passe */}
                  <div>
                    <label className="block text-sm font-medium text-teal-400 mb-2">Confirmer le nouveau mot de passe</label>
                    <div className="relative">
                      <input 
                        type={showPassword.confirm ? "text" : "password"}
                        className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                        value={confirmMdp}
                        onChange={(e) => setConfirmMdp(e.target.value)}
                        required
                      />
                      <button 
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                      >
                        {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Message d'erreur */}
                  {mdpError && (
                    <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3">
                      <AlertCircle size={20} className="text-red-500" />
                      <span className="text-red-400">{mdpError}</span>
                    </div>
                  )}
                  
                  {/* Message de succès */}
                  {mdpSuccess && (
                    <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-xl flex items-center gap-3">
                      <CheckCircle size={20} className="text-green-500" />
                      <span className="text-green-400">Votre mot de passe a été modifié avec succès.</span>
                    </div>
                  )}
                  
                  {/* Boutons d'action */}
                  <div className="flex justify-center gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setPasswordSection(false);
                        setAncienMdp("");
                        setNouveauMdp("");
                        setConfirmMdp("");
                        setMdpError("");
                      }}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                    >
                      Annuler
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors flex items-center"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Modification...
                        </>
                      ) : (
                        <>
                          <Lock size={18} className="mr-2" />
                          Modifier le mot de passe
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
