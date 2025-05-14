import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Shield, Camera, Save, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

function Parametre() {
  const { isDarkMode } = useOutletContext();

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
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('informations');

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

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 ">
          <h1 className="text-3xl font-bold">Votre compte</h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Gérez vos informations personnelles et paramètres de sécurité
          </p>
        </div>
        
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          isDarkMode ? 'bg-gray-800 bg-gradient-to-br from-gray-900 to-black border border-gray-700' : 'bg-white'
        }`}>
          {/* En-tête avec photo de profil */}
          <div className={`relative h-32 ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
            <div className="absolute -bottom-16 left-8">
              <div className="relative group">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Photo de profil"
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className={`h-32 w-32 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                  }`}>
                    <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>
                      {formData.prenom.charAt(0).toUpperCase() + formData.nom.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <label htmlFor="photo-upload" className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full p-2 cursor-pointer shadow-lg">
                  <Camera size={18} className="text-white" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>
                <div className="absolute -bottom-2 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">Modifier</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-48">
              <h2 className="text-white text-xl font-semibold">{formData.prenom} {formData.nom}</h2>
              <p className="text-white/80 text-sm">{formData.email}</p>
            </div>
          </div>
          
          {/* Navigation par onglets */}
          <div className="pt-20 px-8">
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button 
                onClick={() => setActiveTab('informations')}
                className={`px-4 py-2 font-medium mr-4 border-b-2 transition-colors ${
                  activeTab === 'informations' 
                    ? (isDarkMode ? 'border-blue-500 text-blue-400' : 'border-blue-600 text-blue-600') 
                    : (isDarkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700')
                }`}
              >
                Informations personnelles
              </button>
              <button 
                onClick={() => setActiveTab('securite')}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'securite' 
                    ? (isDarkMode ? 'border-blue-500 text-blue-400' : 'border-blue-600 text-blue-600') 
                    : (isDarkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700')
                }`}
              >
                Sécurité
              </button>
            </div>

            <form onSubmit={handleSubmit} className="pb-8">
              {activeTab === 'informations' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="prenom" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Prénom
                      </label>
                      <div className={`relative rounded-md shadow-sm`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </div>
                        <input
                          type="text"
                          name="prenom"
                          id="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                              : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nom" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Nom
                      </label>
                      <div className={`relative rounded-md shadow-sm`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </div>
                        <input
                          type="text"
                          name="nom"
                          id="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                              : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Adresse email
                    </label>
                    <div className={`relative rounded-md shadow-sm`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                            : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'securite' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="motDePasse" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mot de passe actuel
                    </label>
                    <div className={`relative rounded-md shadow-sm`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      </div>
                      <input
                        type={passwordVisibility.current ? "text" : "password"}
                        name="motDePasse"
                        id="motDePasse"
                        value={formData.motDePasse}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                            : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {passwordVisibility.current ? 
                          <EyeOff size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} /> : 
                          <Eye size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        }
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="nouveauMotDePasse" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nouveau mot de passe
                    </label>
                    <div className={`relative rounded-md shadow-sm`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      </div>
                      <input
                        type={passwordVisibility.new ? "text" : "password"}
                        name="nouveauMotDePasse"
                        id="nouveauMotDePasse"
                        value={formData.nouveauMotDePasse}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                            : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {passwordVisibility.new ? 
                          <EyeOff size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} /> : 
                          <Eye size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        }
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmMotDePasse" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirmer le nouveau mot de passe
                    </label>
                    <div className={`relative rounded-md shadow-sm`}>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                      </div>
                      <input
                        type={passwordVisibility.confirm ? "text" : "password"}
                        name="confirmMotDePasse"
                        id="confirmMotDePasse"
                        value={formData.confirmMotDePasse}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                            : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {passwordVisibility.confirm ? 
                          <EyeOff size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} /> : 
                          <Eye size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                        }
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bouton de sauvegarde */}
              <div className="mt-10 flex justify-end">
                <button
                  type="submit"
                  className={`inline-flex items-center px-6 py-3 rounded-lg text-white font-medium shadow-md transform transition-all hover:translate-y-px ${
                    isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  <Save size={18} className="mr-2" />
                  Enregistrer les modifications
                </button>
              </div>
              
              {/* Message de statut */}
              {saveStatus && (
                <div className={`mt-4 p-3 rounded-lg ${
                  saveStatus.type === 'success' 
                    ? (isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800') 
                    : (isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800')
                }`}>
                  {saveStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parametre;