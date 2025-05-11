import React, { useState } from 'react';
import { Mail, AlertCircle, CheckCircle, Loader, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MDPoublierAdmin() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulation d'envoi d'email (à remplacer par un appel API réel)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Vérifier si l'email existe dans la base de données admin
    // Ceci est une simulation - à remplacer par une vérification réelle
    if (email.includes('@')) {
      setSuccess(true);
      
      // Compte à rebours avant redirection
      let timeLeft = 5;
      const timer = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        
        if (timeLeft <= 0) {
          clearInterval(timer);
          // Utiliser navigate pour la redirection (compatible React Router)
          navigate('/admin/login');
        }
      }, 1000);
    } else {
      setError("L'adresse email n'est pas reconnue comme un compte administrateur");
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="inline-flex items-center text-sm text-green-400 hover:text-green-300 mb-6 cursor-pointer" onClick={() => navigate('/admin/login')}>
        <ArrowLeft size={16} className="mr-1" />
        Retour à la connexion
      </div>
      
      <h2 className="text-xl font-semibold text-white mb-2">Réinitialisation de mot de passe</h2>
      <p className="text-sm text-gray-400 mb-6">
        Entrez votre adresse email administrateur pour recevoir un lien de réinitialisation.
      </p>

      {!success ? (
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-green-400">
              Email administrateur
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pr-10 bg-white/5 text-white border border-green-500/30 rounded-xl focus:outline-none focus:border-green-500"
                placeholder="admin@example.com"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-600/40 rounded-lg">
              <AlertCircle size={18} className="text-red-500" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}

          {/* Bouton de soumission */}
          <div
            onClick={handleSubmit}
            className={`w-full py-3 font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-full shadow-lg ${isSubmitting ? 'opacity-70' : 'hover:from-green-700 hover:to-teal-700 cursor-pointer'} transition flex items-center justify-center`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={18} className="animate-spin" />
                Envoi en cours...
              </span>
            ) : (
              'Envoyer le lien de réinitialisation'
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 p-4 bg-green-900/20 border border-green-600/40 rounded-lg">
            <CheckCircle size={20} className="text-green-500" />
            <div>
              <h3 className="text-green-400 font-medium">Email envoyé !</h3>
              <p className="text-sm text-green-300/80">
                Un lien de réinitialisation a été envoyé à {email}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400">
              Redirection vers la page de connexion dans <span className="text-green-400 font-bold">{countdown}</span> secondes...
            </p>
          </div>
        </div>
      )}
    </>
  );
}