import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function RegisterStudent() {
  // États pour l'inscription
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nom, setNom] = useState("");
  const [matricule, setMatricule] = useState("");
  
  // États pour la gestion du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [formStep, setFormStep] = useState(1); // Pour le formulaire d'inscription en plusieurs étapes



  // Fonction pour gérer la soumission du formulaire d'inscription
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    
    // Validation de base
    if (password !== confirmPassword) {
      setFormError("Les mots de passe ne correspondent pas");
      setIsSubmitting(false);
      return;
    }
    
    if (password.length < 8) {
      setFormError("Le mot de passe doit contenir au moins 8 caractères");
      setIsSubmitting(false);
      return;
    }
    
    // Simulation d'appel API pour l'inscription
    setTimeout(() => {
      setRegisterSuccess(true);
      setIsSubmitting(false);
      
      // Redirection après inscription réussie (à remplacer par votre logique)
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }, 1000);
  };

  // Progression vers l'étape suivante du formulaire d'inscription
  const handleNextStep = () => {
    if (formStep === 1 && nom && email) {
      setFormStep(2);
    }
  };
  
  // Retour à l'étape précédente du formulaire d'inscription
  const handlePrevStep = () => {
    if (formStep === 2) {
      setFormStep(1);
    }
  };

  // Affichage du loader pendant le chargement initial

  return (
    <div className="space-y-8 relative">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Éléments décoratifs */}
        <div className="absolute -top-14 -right-14 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        
        {/* Conteneur principal */}
        <div className="relative z-10">
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-teal-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <UserPlus size={34} className="text-white" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              {formStep === 1 ? "Créer un compte" : "Finaliser l'inscription"}
            </h2>
            <p className="mt-2 text-gray-300">
              Rejoignez notre plateforme éducative
            </p>
          </div>
          
          {/* Formulaire d'inscription */}
          <form onSubmit={handleSignUpSubmit} className="mt-8 space-y-6">
            {formStep === 1 ? (
              // Première étape: informations de base
              <>
                {/* Nom complet */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-teal-400 mb-2">Nom complet</label>
                  <div className="mt-1 relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                      placeholder="Votre nom complet"
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-teal-400 mb-2">Adresse email</label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                      placeholder="votre@email.com"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Mail size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Matricule (optionnel) */}
                <div>
                  <label htmlFor="matricule" className="block text-sm font-medium text-teal-400 mb-2">
                    Matricule
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="matricule"
                      name="matricule"
                      type="text"
                      value={matricule}
                      onChange={(e) => setMatricule(e.target.value)}
                      className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                      placeholder="Votre matricule"
                    />
                  </div>
                </div>
              </>
            ) : (
              // Deuxième étape: mot de passe
              <>
                {/* Mot de passe */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-teal-400 mb-2">Mot de passe</label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                      placeholder="8 caractères minimum"
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} className="text-gray-400" />
                      ) : (
                        <Eye size={20} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Confirmer le mot de passe */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-teal-400 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                      placeholder="Confirmez votre mot de passe"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} className="text-gray-400" />
                      ) : (
                        <Eye size={20} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
            
            {/* Messages d'erreur/succès */}
            {formError && (
              <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500" />
                <span className="text-red-400">{formError}</span>
              </div>
            )}
            
            {registerSuccess && (
              <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-xl flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-green-400">
                  Inscription réussie ! Vous allez être redirigé vers la page de connexion.
                </span>
              </div>
            )}
            
            {/* Boutons d'action */}
            <div className="flex flex-col space-y-4">
              {formStep === 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none transition-colors"
                >
                  Continuer
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 flex justify-center py-3 px-4 border border-teal-400/30 rounded-full shadow-sm text-white bg-transparent hover:bg-white/5 focus:outline-none transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader size={20} className="animate-spin mr-2" />
                        <span>Inscription...</span>
                      </div>
                    ) : (
                      "S'inscrire"
                    )}
                  </button>
                </div>
              )}
            </div>
          </form>
          
          {/* Lien pour basculer vers connexion */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="font-medium text-teal-400 hover:text-teal-300 transition-colors"
            >
              Déjà inscrit ? Se connecter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}