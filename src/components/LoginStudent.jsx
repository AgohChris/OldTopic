import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function LoginStudent() {
  // États pour la connexion
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // États pour la gestion du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  


  // Fonction pour gérer la soumission du formulaire de connexion
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");
    
    // Simulation d'appel API pour la connexion
    setTimeout(() => {
      // Simulation de validation (à remplacer par votre logique d'authentification)
      if (email === "admin@example.com" && password === "password") {
        setLoginSuccess(true);
        // Redirection après connexion réussie (à remplacer par votre logique)
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setLoginError("Email ou mot de passe incorrect");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
      <div className="max-w-md w-full space-y-8 relative">
        {/* Éléments décoratifs */}
        <div className="absolute -top-14 -right-14 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        
        {/* Conteneur principal */}
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-teal-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogIn size={34} className="text-white" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Connexion
            </h2>
            <p className="mt-2 text-gray-300">
              Accédez à votre espace personnel
            </p>
          </div>
          
          {/* Formulaire de connexion */}
          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
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
            
            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-teal-400 mb-2">Mot de passe</label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                  placeholder="Votre mot de passe"
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
            
            {/* Options supplémentaires */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Se souvenir de moi
                </label>
              </div>
              
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>
            
            {/* Messages d'erreur/succès */}
            {loginError && (
              <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500" />
                <span className="text-red-400">{loginError}</span>
              </div>
            )}
            
            {loginSuccess && (
              <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-xl flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-green-400">Connexion réussie ! Redirection en cours...</span>
              </div>
            )}
            
            {/* Bouton de connexion */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader size={20} className="animate-spin mr-2" />
                    <span>Connexion...</span>
                  </div>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LogIn size={18} className="text-teal-300 group-hover:text-teal-200" />
                    </span>
                    Se connecter
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Lien pour basculer vers inscription */}
          <div className="mt-6 text-center">
            <a
              href="/register"
              className="font-medium text-teal-400 hover:text-teal-300 transition-colors"
            >
              Pas encore de compte ? S'inscrire
            </a>
          </div>

    </div>
  );
}