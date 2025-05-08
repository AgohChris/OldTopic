import React, { useState } from 'react';
import { Shield, Camera, Save, Eye, EyeOff } from 'lucide-react';

function Parametre() {
  // États pour les données du formulaire
  const [formData, setFormData] = useState({
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'admin@example.com',
    motDePasse: '',
    nouveauMotDePasse: '',
    confirmMotDePasse: ''
  });
  
  // État pour la photo de profil
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  
  // États pour l'affichage des mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // État pour le statut de sauvegarde
  const [saveStatus, setSaveStatus] = useState(null);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestion de la sélection de la photo
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      
      // Prévisualiser l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.nouveauMotDePasse !== formData.confirmMotDePasse) {
      setSaveStatus({ type: 'error', message: 'Les mots de passe ne correspondent pas.' });
      return;
    }
    
    // Simulation d'enregistrement réussi
    setSaveStatus({ type: 'success', message: 'Paramètres enregistrés avec succès!' });
    
    // Réinitialiser le statut après 3 secondes
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
    
    // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Paramètres du Compte</h1>
          <p className="text-sm text-gray-400">Gérez vos informations personnelles</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-black/40 border border-green-500/20 rounded-3xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            {/* Photo de profil */}
            <div className="mb-6 flex flex-col items-center">
              <div className="relative">
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Photo de profil" 
                    className="h-24 w-24 rounded-full object-cover border-2 border-green-500/50"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 border-2 border-green-500/50 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {formData.nom.charAt(0).toUpperCase() + formData.prenom.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 cursor-pointer shadow-lg">
                  <Camera size={16} className="text-white" />
                </label>
                <input 
                  id="photo-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePhotoChange}
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">Cliquez sur l'icône pour changer votre photo</p>
            </div>
            
            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-300 mb-1">Nom</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-300 mb-1">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                  required
                />
              </div>
            </div>
            
            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                required
              />
            </div>
            
            {/* Mot de passe actuel */}
            <div className="mb-6">
              <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-300 mb-1">Mot de passe actuel</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="motDePasse"
                  id="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-green-500 focus:border-green-500 text-white pr-10"
                  placeholder="Entrez votre mot de passe actuel"
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Nouveau mot de passe */}
            <div className="mb-6">
              <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium text-gray-300 mb-1">Nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="nouveauMotDePasse"
                  id="nouveauMotDePasse"
                  value={formData.nouveauMotDePasse}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-green-500 focus:border-green-500 text-white pr-10"
                  placeholder="Laissez vide pour ne pas changer"
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Confirmation du nouveau mot de passe */}
            <div className="mb-6">
              <label htmlFor="confirmMotDePasse" className="block text-sm font-medium text-gray-300 mb-1">Confirmer le nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmMotDePasse"
                  id="confirmMotDePasse"
                  value={formData.confirmMotDePasse}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-green-500 focus:border-green-500 text-white pr-10"
                  placeholder="Confirmer le nouveau mot de passe"
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Message de statut */}
            {saveStatus && (
              <div className={`mb-6 p-3 rounded-lg ${saveStatus.type === 'success' ? 'bg-green-800/50 text-green-200' : 'bg-red-800/50 text-red-200'}`}>
                {saveStatus.message}
              </div>
            )}
            
            {/* Bouton de sauvegarde */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 transition duration-300"
              >
                <Save size={18} className="mr-2" />
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Parametre;