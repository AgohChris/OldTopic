import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Shield, Camera, Save, Eye, EyeOff } from 'lucide-react';

function Parametre() {
  const { isDarkMode } = useOutletContext(); // 👈 Récupère le mode sombre du layout

  const [formData, setFormData] = useState({
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'admin@example.com',
    motDePasse: '',
    nouveauMotDePasse: '',
    confirmMotDePasse: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [saveStatus, setSaveStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.nouveauMotDePasse !== formData.confirmMotDePasse) {
      setSaveStatus({ type: 'error', message: 'Les mots de passe ne correspondent pas.' });
      return;
    }

    setSaveStatus({ type: 'success', message: 'Paramètres enregistrés avec succès!' });

    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
          : 'bg-gradient-to-br from-gray-100 to-white text-gray-900'
      }`}
    >
      <div className="max-w-lg mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">Paramètres du Compte</h1>
          <p className="text-sm text-gray-400">Gérez vos informations personnelles</p>
        </div>

        <div className={`rounded-3xl p-8 backdrop-blur-sm border ${isDarkMode ? 'bg-black/40 border-green-500/20' : 'bg-white border-gray-200 shadow-md'}`}>
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
                <label htmlFor="nom" className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg focus:ring-green-500 focus:border-green-500 ${
                    isDarkMode
                      ? 'bg-gray-800/50 border border-gray-700 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  }`}
                  required
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium mb-1">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg focus:ring-green-500 focus:border-green-500 ${
                    isDarkMode
                      ? 'bg-gray-800/50 border border-gray-700 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg focus:ring-green-500 focus:border-green-500 ${
                  isDarkMode
                    ? 'bg-gray-800/50 border border-gray-700 text-white'
                    : 'bg-white border border-gray-300 text-black'
                }`}
                required
              />
            </div>

            {/* Mot de passe actuel */}
            <div className="mb-6">
              <label htmlFor="motDePasse" className="block text-sm font-medium mb-1">Mot de passe actuel</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="motDePasse"
                  id="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg pr-10 ${
                    isDarkMode
                      ? 'bg-gray-800/50 border border-gray-700 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Nouveau mot de passe */}
            <div className="mb-6">
              <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="nouveauMotDePasse"
                  id="nouveauMotDePasse"
                  value={formData.nouveauMotDePasse}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg pr-10 ${
                    isDarkMode
                      ? 'bg-gray-800/50 border border-gray-700 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirmation du mot de passe */}
            <div className="mb-6">
              <label htmlFor="confirmMotDePasse" className="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmMotDePasse"
                  id="confirmMotDePasse"
                  value={formData.confirmMotDePasse}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg pr-10 ${
                    isDarkMode
                      ? 'bg-gray-800/50 border border-gray-700 text-white'
                      : 'bg-white border border-gray-300 text-black'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all"
              >
                <Save size={16} className="mr-2" />
                Sauvegarder
              </button>
              {saveStatus && (
                <p className={`mt-3 text-sm ${saveStatus.type === 'success' ? 'text-green-400' : 'text-red-500'}`}>
                  {saveStatus.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Parametre;
