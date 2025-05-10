import { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Loader, 
  ArrowLeft, 
  Lock, 
  CheckSquare,
  Shield,
  RefreshCw
} from 'lucide-react';

export default function MDPoublier() {
  // États principaux
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
  });

  // Références pour la gestion des inputs du code
  const codeInputsRef = useRef(Array(6).fill(null));
  
  // Simuler l'envoi d'un code à 6 chiffres
  const mockCode = "123456";

  // Gestion du décompte pour le renvoi de code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  // Vérification de la force du mot de passe
  useEffect(() => {
    setPasswordStrength({
      length: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[^A-Za-z0-9]/.test(newPassword)
    });
  }, [newPassword]);

  // Calculer le score de force du mot de passe
  const getPasswordStrengthScore = () => {
    const { length, hasUpperCase, hasLowerCase, hasNumber, hasSpecial } = passwordStrength;
    return [length, hasUpperCase, hasLowerCase, hasNumber, hasSpecial].filter(Boolean).length;
  };

  // Afficher la force du mot de passe
  const getPasswordStrengthText = () => {
    const score = getPasswordStrengthScore();
    if (score === 0) return { text: "", color: "" };
    if (score <= 2) return { text: "Faible", color: "text-red-500" };
    if (score <= 4) return { text: "Moyen", color: "text-yellow-500" };
    return { text: "Fort", color: "text-green-500" };
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validation de l'email avec une expression régulière plus robuste
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide");
      setIsSubmitting(false);
      return;
    }

    // Simuler un appel API
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(2);
      
      // Focus sur le premier champ de code
      setTimeout(() => {
        if (codeInputsRef.current[0]) {
          codeInputsRef.current[0].focus();
        }
      }, 100);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const submittedCode = verificationCode.join('');
      if (submittedCode === mockCode) {
        setCurrentStep(3);
      } else {
        setError("Code de vérification incorrect");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la vérification du code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (newPassword.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères");
      } else if (getPasswordStrengthScore() < 3) {
        setError("Votre mot de passe est trop faible. Ajoutez des caractères spéciaux, chiffres ou majuscules.");
      } else if (newPassword !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
      } else {
        setCurrentStep(4);
        setTimeout(() => {
          // Dans une vraie application, utilisez un router comme react-router
          // au lieu de window.location
          // history.push('/dashboard');
          console.log("Redirection vers le tableau de bord");
        }, 3000);
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la réinitialisation du mot de passe");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled) return;
    
    setResendDisabled(true);
    setCountdown(60);
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Notification de succès temporaire
      setError("");
      const originalVerificationCode = [...verificationCode];
      setVerificationCode(Array(6).fill(''));
      
      // Réinitialiser la focus
      setTimeout(() => {
        if (codeInputsRef.current[0]) {
          codeInputsRef.current[0].focus();
        }
      }, 100);
    } catch (err) {
      setError("Une erreur est survenue lors du renvoi du code");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gérer la saisie du code de vérification
  const handleCodeInput = (e, index) => {
    const value = e.target.value;
    
    // Accepter uniquement les chiffres
    if (value === '' || /^[0-9]$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Focus sur l'input suivant s'il y a une valeur
      if (value && index < 5) {
        codeInputsRef.current[index + 1]?.focus();
      }
    }
  };

  // Gérer les touches spéciales (backspace, flèches)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!verificationCode[index] && index > 0) {
        // Si le champ actuel est vide et qu'on appuie sur Backspace, on va au champ précédent
        const newCode = [...verificationCode];
        newCode[index - 1] = '';
        setVerificationCode(newCode);
        codeInputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      codeInputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      codeInputsRef.current[index + 1]?.focus();
    }
  };

  // Gérer le collage d'un code complet
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setVerificationCode(newCode);
      
      // Focus sur le dernier champ
      codeInputsRef.current[5]?.focus();
    }
  };

  // Fonction pour revenir à l'étape précédente
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  // Afficher les indicateurs de progression
  const renderStepIndicators = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div 
            className={`h-8 w-8 rounded-full flex items-center justify-center 
              transition-all duration-300 ${currentStep >= step 
                ? 'bg-teal-500 scale-110' 
                : currentStep === step - 1 
                  ? 'bg-white/20 scale-105' 
                  : 'bg-white/10'}`}
            aria-label={`Étape ${step} ${currentStep >= step ? 'terminée' : currentStep === step ? 'en cours' : 'à venir'}`}
          >
            <span className={`text-sm ${currentStep >= step ? 'text-white font-medium' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
          {step < 4 && (
            <div 
              className={`h-1 w-8 transition-colors duration-300
                ${currentStep > step 
                  ? 'bg-teal-500/50' 
                  : currentStep === step 
                    ? 'bg-white/20' 
                    : 'bg-white/10'} mx-1`}
              aria-hidden="true"
            ></div>
          )}
        </div>
      ))}
    </div>
  );

  // Afficher les messages d'erreur
  const renderErrorMessage = () => (
    error && (
      <div 
        role="alert"
        className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3 mb-6 animate-fadeIn"
      >
        <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
        <span className="text-red-400 text-sm">{error}</span>
      </div>
    )
  );

  // Composant pour les étapes du formulaire
  const renderStep = () => {
    switch (currentStep) {
      case 1: // Email submission
        return (
          <form onSubmit={handleSubmitEmail} className="space-y-6">
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
                  className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none transition-all"
                  placeholder="votre@email.com"
                  autoFocus
                  required
                  aria-required="true"
                  aria-describedby="email-error"
                />
                <Mail size={20} className="text-gray-400 absolute right-4 top-4" aria-hidden="true" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="group relative w-full py-3 px-4 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader size={20} className="animate-spin mx-auto" aria-hidden="true" />
              ) : (
                <>
                  <span className="absolute left-4 inset-y-0 flex items-center">
                    <Mail size={18} className="text-teal-300 group-hover:text-teal-200" aria-hidden="true" />
                  </span>
                  <span>Envoyer le code de vérification</span>
                </>
              )}
            </button>
          </form>
        );

      case 2: // Code verification
        return (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-teal-400 mb-2">
                Code de vérification
              </label>
              <p className="text-gray-400 text-sm mb-4">
                Nous avons envoyé un code à 6 chiffres à {email}
              </p>
              
              <div 
                className="flex justify-between gap-2"
                onPaste={handlePaste}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => codeInputsRef.current[index] = el}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]"
                    maxLength={1}
                    value={verificationCode[index] || ''}
                    onChange={(e) => handleCodeInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-label={`Chiffre ${index + 1} du code`}
                    className="w-12 h-12 text-center text-lg font-bold rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none transition-all"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Entrez les 6 chiffres ou collez le code complet
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || verificationCode.filter(Boolean).length !== 6}
              className="group relative w-full py-3 px-4 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader size={20} className="animate-spin mx-auto" aria-hidden="true" />
              ) : (
                <>
                  <span className="absolute left-4 inset-y-0 flex items-center">
                    <CheckSquare size={18} className="text-teal-300 group-hover:text-teal-200" aria-hidden="true" />
                  </span>
                  <span>Vérifier le code</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-400">
              <p>Vous n'avez pas reçu le code ?</p>
              <button
                type="button"
                className={`text-teal-400 hover:text-teal-300 mt-2 transition-all ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleResendCode}
                disabled={resendDisabled}
                aria-disabled={resendDisabled}
              >
                {resendDisabled ? (
                  <span>Renvoyer le code ({countdown}s)</span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    <RefreshCw size={14} className="inline" aria-hidden="true" />
                    Renvoyer le code
                  </span>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={goBack}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-all mt-2"
            >
              <span className="flex items-center justify-center gap-1">
                <ArrowLeft size={14} className="inline" aria-hidden="true" />
                Retour à l'étape précédente
              </span>
            </button>
          </form>
        );

      case 3: // New password
        return (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-teal-400 mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none transition-all"
                  placeholder="Minimum 8 caractères"
                  autoFocus
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 focus:outline-none"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400" aria-hidden="true" />
                  ) : (
                    <Eye size={20} className="text-gray-400" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {newPassword && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Force du mot de passe:</span>
                  <span className={`text-xs font-medium ${getPasswordStrengthText().color}`}>
                    {getPasswordStrengthText().text}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      getPasswordStrengthScore() <= 2 ? 'bg-red-500' : 
                      getPasswordStrengthScore() <= 4 ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`}
                    style={{ width: `${getPasswordStrengthScore() * 20}%` }}
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-teal-400 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl bg-white/5 border border-teal-400/30 focus:border-teal-400 text-white outline-none transition-all"
                  placeholder="Confirmer le mot de passe"
                  aria-required="true"
                />
                <Lock size={20} className="text-gray-400 absolute right-4 top-4" aria-hidden="true" />
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-400 mt-1">
                  Les mots de passe ne correspondent pas
                </p>
              )}
            </div>

            <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-teal-400/20">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-teal-400" aria-hidden="true" />
                <p className="text-xs text-gray-300 font-medium">Critères de sécurité</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${passwordStrength.length ? 'bg-green-500' : 'bg-gray-500'}`} aria-hidden="true"></div>
                  <span className={`text-xs ${passwordStrength.length ? 'text-green-400' : 'text-gray-400'}`}>
                    Au moins 8 caractères
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${passwordStrength.hasUpperCase ? 'bg-green-500' : 'bg-gray-500'}`} aria-hidden="true"></div>
                  <span className={`text-xs ${passwordStrength.hasUpperCase ? 'text-green-400' : 'text-gray-400'}`}>
                    Une majuscule (A-Z)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${passwordStrength.hasLowerCase ? 'bg-green-500' : 'bg-gray-500'}`} aria-hidden="true"></div>
                  <span className={`text-xs ${passwordStrength.hasLowerCase ? 'text-green-400' : 'text-gray-400'}`}>
                    Une minuscule (a-z)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${passwordStrength.hasNumber ? 'bg-green-500' : 'bg-gray-500'}`} aria-hidden="true"></div>
                  <span className={`text-xs ${passwordStrength.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                    Un chiffre (0-9)
                  </span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <div className={`h-2 w-2 rounded-full ${passwordStrength.hasSpecial ? 'bg-green-500' : 'bg-gray-500'}`} aria-hidden="true"></div>
                  <span className={`text-xs ${passwordStrength.hasSpecial ? 'text-green-400' : 'text-gray-400'}`}>
                    Un caractère spécial (!@#$%^&*)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting || 
                !newPassword || 
                !confirmPassword || 
                newPassword !== confirmPassword ||
                getPasswordStrengthScore() < 3
              }
              className="group relative w-full py-3 px-4 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-describedby="password-requirements"
            >
              {isSubmitting ? (
                <Loader size={20} className="animate-spin mx-auto" aria-hidden="true" />
              ) : (
                <>
                  <span className="absolute left-4 inset-y-0 flex items-center">
                    <Key size={18} className="text-teal-300 group-hover:text-teal-200" aria-hidden="true" />
                  </span>
                  <span>Réinitialiser le mot de passe</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={goBack}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-all"
            >
              <span className="flex items-center justify-center gap-1">
                <ArrowLeft size={14} className="inline" aria-hidden="true" />
                Retour à l'étape précédente
              </span>
            </button>
          </form>
        );

      case 4: // Success
        return (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-br from-green-900/40 to-green-700/10 border border-green-500/50 rounded-xl flex flex-col items-center justify-center gap-4 p-6 animate-fadeIn">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  Mot de passe réinitialisé avec succès !
                </h3>
                <p className="text-gray-300 text-sm">
                  Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm">
                Redirection automatique vers votre tableau de bord dans quelques secondes...
              </p>
              <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-teal-500 w-full animate-progress" aria-hidden="true"></div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/Hero'}
              className="group relative w-full py-3 px-4 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-all"
            >
              <span className="absolute left-4 inset-y-0 flex items-center">
                <ArrowLeft size={18} className="text-teal-300 group-hover:text-teal-200" aria-hidden="true" />
              </span>
              <span>Accéder au tableau de bord</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Effets décoratifs */}
      <div className="absolute -top-14 -right-14 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-teal-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-slow">
            <Key size={34} className="text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            {currentStep === 1 && 'Réinitialisation'}
            {currentStep === 2 && 'Vérification'}
            {currentStep === 3 && 'Nouveau mot de passe'}
            {currentStep === 4 && 'Réinitialisation réussie'}
          </h1>
          <p className="mt-2 text-gray-300">
            {currentStep === 1 && 'Entrez votre email pour réinitialiser votre mot de passe'}
            {currentStep === 2 && 'Saisissez le code à 6 chiffres reçu par email'}
            {currentStep === 3 && 'Créez un nouveau mot de passe sécurisé'}
            {currentStep === 4 && 'Votre mot de passe a été modifié avec succès'}
          </p>
        </div>

        {renderStepIndicators()}
        {renderErrorMessage()}
        {renderStep()}
      </div>
    </div>
  );
}