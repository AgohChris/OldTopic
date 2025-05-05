import { useState, useEffect } from 'react';
import { Mail, Key, Eye, EyeOff, CheckCircle, AlertCircle, Loader, ArrowLeft } from 'lucide-react';

export default function MDPoublier() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);



  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setSuccess(true);
        setCurrentStep(2);
        setTimeout(() => window.location.href = '/login', 5000);
      } else {
        setError("Veuillez entrer une adresse email valide");
      }
      setIsSubmitting(false);
    }, 1000);
  };


  return (
    <div className="space-y-8 relative">
      {/* Effets décoratifs (si besoin à ce niveau) */}
      <div className="absolute -top-14 -right-14 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-teal-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Key size={34} className="text-white" />
          </div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            {currentStep === 1 ? 'Réinitialisation' : 'Email envoyé'}
          </h2>
          <p className="mt-2 text-gray-300">
            {currentStep === 1
              ? 'Entrez votre email pour réinitialiser votre mot de passe'
              : 'Consultez votre boîte mail pour les instructions'}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center 
                  ${currentStep >= step ? 'bg-teal-500' : 'bg-white/10'}`}>
                <span className={`text-sm ${currentStep >= step ? 'text-white' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
              {step < 2 && <div className="h-1 w-8 bg-white/10 mx-1"></div>}
            </div>
          ))}
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-teal-400 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none"
                  placeholder="votre@email.com"
                  autoFocus
                />
                <Mail size={20} className="text-gray-400 absolute right-4 top-4" />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500" />
                <span className="text-red-400">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full py-3 px-4 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-all"
            >
              {isSubmitting ? (
                <Loader size={20} className="animate-spin mx-auto" />
              ) : (
                <>
                  <span className="absolute left-4 inset-y-0 flex items-center">
                    <Key size={18} className="text-teal-300 group-hover:text-teal-200" />
                  </span>
                  Réinitialiser le mot de passe
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-xl flex items-center justify-center gap-3">
              <CheckCircle size={24} className="text-green-500" />
              <span className="text-green-400">Email envoyé avec succès !</span>
            </div>

            <p className="text-gray-400 text-sm">
              Redirection automatique dans 5 secondes...
            </p>

            <button
              onClick={() => window.location.href = '/login'}
              className="text-teal-400 hover:text-teal-300 flex items-center justify-center gap-2 w-full"
            >
              <ArrowLeft size={16} />
              Retour à la connexion
            </button>
          </div>
        )}

        {!success && (
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Vous n'avez pas reçu l'email ?</p>
            <button
              className="text-teal-400 hover:text-teal-300 mt-2"
              onClick={handleSubmit}
            >
              Renvoyer l'email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
