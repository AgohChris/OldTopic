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
  RefreshCw,
  UserCog,
  Fingerprint,
  ShieldAlert
} from 'lucide-react';

export default function MDPoublierAdmin() {
  // États principaux
  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [verificationCode, setVerificationCode] = useState(Array(8).fill(''));
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
    hasSpecial: false,
    hasNoCommonWords: false
  });

  // Références pour la gestion des inputs du code
  const codeInputsRef = useRef(Array(8).fill(null));

  // Simuler l'envoi d'un code à 8 chiffres (plus long pour une sécurité admin)
  const mockCode = "12345678"; // Dans une vraie app, ce serait généré et envoyé par le backend

  // Questions de sécurité (dans une application réelle, ces questions seraient associées à chaque compte admin)
  const securityQuestions = [
    "Quel était le nom de votre premier animal de compagnie ?",
    "Dans quelle ville êtes-vous né(e) ?",
    "Quel était le nom de votre école primaire ?",
    "Quel est votre film préféré de tous les temps ?"
  ];

  // Gestion du décompte pour le renvoi de code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  // Vérification de la force du mot de passe (règles plus strictes pour les administrateurs)
  useEffect(() => {
    // Liste de mots courants à éviter
    const commonWords = ['admin', 'password', 'motdepasse', 'mdp', '123456', 'qwerty', 'azerty', 'administrator'];
    const containsCommonWord = commonWords.some(word =>
      newPassword.toLowerCase().includes(word)
    );

    setPasswordStrength({
      length: newPassword.length >= 12, // Plus long pour un admin
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
      hasNoCommonWords: !containsCommonWord && newPassword.length > 0
    });
  }, [newPassword]);

  // Calculer le score de force du mot de passe
  const getPasswordStrengthScore = () => {
    const { length, hasUpperCase, hasLowerCase, hasNumber, hasSpecial, hasNoCommonWords } = passwordStrength;
    return [length, hasUpperCase, hasLowerCase, hasNumber, hasSpecial, hasNoCommonWords].filter(Boolean).length;
  };

  // Afficher la force du mot de passe
  const getPasswordStrengthText = () => {
    const score = getPasswordStrengthScore();
    if (score === 0 && !newPassword) return { text: "", color: "" };
    if (score <= 2) return { text: "Très Faible", color: "text-red-600" };
    if (score <= 3) return { text: "Faible", color: "text-red-500" };
    if (score <= 4) return { text: "Moyen", color: "text-yellow-500" };
    if (score <= 5) return { text: "Fort", color: "text-green-500" };
    return { text: "Très Fort", color: "text-green-600" };
  };

  const handleSubmitIdentification = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      setIsSubmitting(false);
      return;
    }
    if (!adminId.trim()) {
      setError("Veuillez saisir votre identifiant administrateur.");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un appel API
      // Dans une vraie application, vérifiez si l'email et l'adminId correspondent à un admin existant.
      // Récupérez également la question de sécurité associée à cet adminId ou email.
      // Par exemple, si on récupère la question :
      // setSecurityQuestion(fetchedAdminData.securityQuestion); // Assurez-vous que cette question est dans votre `securityQuestions` array ou adaptez.
      // Pour la démo, on va juste passer à l'étape suivante.
      // On pourrait aussi présélectionner une question si elle est fixe par admin, ou la charger dynamiquement.
      // Pour l'instant, la sélection manuelle est gardée.
      setCurrentStep(2);
    } catch (err) {
      setError("Identifiants administrateur non reconnus ou erreur serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSecurityQuestion = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!securityQuestion) {
        setError("Veuillez sélectionner une question de sécurité.");
        setIsSubmitting(false);
        return;
    }
    if (!securityAnswer.trim()) {
      setError("Veuillez répondre à la question de sécurité.");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un appel API
      // Dans une vraie application, vérifiez la réponse à la question de sécurité pour l'admin identifié.
      // Si la réponse est correcte:
      // Simuler l'envoi du code
      console.log(`Code de vérification simulé (pourrait être envoyé à ${email}): ${mockCode}`);
      setCurrentStep(3);
      setResendDisabled(true); // Désactive le bouton renvoyer initialement
      setCountdown(120); // Démarre le compte à rebours
      setTimeout(() => {
        if (codeInputsRef.current[0]) {
          codeInputsRef.current[0].focus();
        }
      }, 100);
    } catch (err) {
      setError("La réponse à la question de sécurité est incorrecte.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const submittedCode = verificationCode.join('');
    if (submittedCode.length !== 8) {
        setError("Le code de vérification doit comporter 8 chiffres.");
        setIsSubmitting(false);
        return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un appel API
      if (submittedCode === mockCode) {
        setCurrentStep(4);
        // Réinitialiser le mot de passe et la confirmation pour éviter de pré-remplir
        setNewPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setTimeout(() => {
            const firstPasswordInput = document.getElementById('new-password');
            if (firstPasswordInput) {
                firstPasswordInput.focus();
            }
        },100);
      } else {
        setError("Code de vérification incorrect.");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la vérification du code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsSubmitting(false);
      return;
    }
    if (getPasswordStrengthScore() < 6) { // Score maximum pour admin (tous critères remplis)
      setError("Votre mot de passe n'est pas assez sécurisé. Veuillez respecter tous les critères de sécurité administrateur.");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un appel API
      // Ici, l'API réinitialiserait réellement le mot de passe.
      console.log("Mot de passe administrateur réinitialisé avec succès (simulation).");
      setCurrentStep(5); // Étape de confirmation
      // Optionnel: rediriger après quelques secondes
      setTimeout(() => {
        console.log("Redirection vers le tableau de bord administrateur (simulation).");
        // Exemple avec react-router: history.push('/admin/dashboard');
      }, 5000);
    } catch (err) {
      setError("Une erreur est survenue lors de la réinitialisation du mot de passe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setCountdown(120); // 2 minutes pour admin
    setIsSubmitting(true); // Optionnel: montrer un loader sur le bouton renvoyer aussi
    setError(""); // Effacer les erreurs précédentes

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler l'appel API pour renvoyer le code
      console.log(`Nouveau code de vérification simulé (pourrait être envoyé à ${email}): ${mockCode}`); // Le backend générerait un nouveau code
      setVerificationCode(Array(8).fill('')); // Vider les champs
      // Alerter l'utilisateur
      // Pourrait être un toast/notification plus discret qu'une erreur
      setError("Un nouveau code de vérification a été envoyé."); // Utiliser setError pour l'exemple, ou un état de succès.

      setTimeout(() => {
        if (codeInputsRef.current[0]) {
          codeInputsRef.current[0].focus();
        }
      }, 100);
    } catch (err) {
      setError("Une erreur est survenue lors du renvoi du code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeInput = (e, index) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      if (value && index < 7) { // 7 pour un code à 8 chiffres (0-7)
        codeInputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Empêche le comportement par défaut qui pourrait naviguer en arrière dans le navigateur
      const newCode = [...verificationCode];
      if (newCode[index]) { // S'il y a une valeur dans le champ actuel, on l'efface
        newCode[index] = '';
        setVerificationCode(newCode);
      } else if (index > 0) { // Si le champ actuel est déjà vide, on focus le précédent et on l'efface (s'il y a une valeur)
        codeInputsRef.current[index - 1]?.focus();
        // newCode[index-1] = ''; // Optionnel : effacer aussi le précédent
        // setVerificationCode(newCode);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      codeInputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 7) {
      e.preventDefault();
      codeInputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{8}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setVerificationCode(newCode);
      // Focus sur le dernier champ ou le bouton de soumission après le collage
      codeInputsRef.current[7]?.focus();
    } else if (pastedData.length > 0) {
        setError("Le code collé n'est pas valide. Il doit contenir 8 chiffres.")
    }
  };

  const goBack = () => {
    if (isSubmitting) return; // Empêcher de revenir en arrière pendant une soumission
    if (currentStep > 1 && currentStep <= 4) { // Ne pas revenir de l'étape 5 (succès)
      setCurrentStep(currentStep - 1);
      setError(""); // Effacer les erreurs en changeant d'étape
      // Réinitialiser les états spécifiques à l'étape quittée si nécessaire
      if (currentStep === 2) setSecurityAnswer("");
      if (currentStep === 3) setVerificationCode(Array(8).fill(''));
      if (currentStep === 4) { setNewPassword(""); setConfirmPassword(""); }
    }
  };

  const renderStepIndicators = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center
              transition-all duration-300 ${currentStep >= step
                ? 'bg-blue-600 scale-110'
                : currentStep === step -1 
                  ? 'bg-white/20 scale-105'
                  : 'bg-white/10'}`}
            aria-label={`Étape ${step} ${currentStep > step ? 'terminée' : currentStep === step ? 'en cours' : 'à venir'}`}
          >
            <span className={`text-sm ${currentStep >= step ? 'text-white font-medium' : 'text-gray-400'}`}>
              {step === 5 && currentStep >= 5 ? <CheckCircle size={16}/> : step}
            </span>
          </div>
          {step < 5 && (
            <div
              className={`h-1 w-8 transition-colors duration-300
                ${currentStep > step
                  ? 'bg-blue-600/50'
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

  const renderErrorMessage = () => (
    error && (
      <div
        role="alert"
        className="p-4 bg-red-900/30 border border-red-500/60 rounded-xl flex items-center gap-3 mb-6 animate-fadeIn shadow-lg"
      >
        <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
        <span className="text-red-300 text-sm">{error}</span>
      </div>
    )
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Identification admin (email + ID admin)
        return (
          <form onSubmit={handleSubmitIdentification} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-2">
                Adresse email administrateur
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl bg-slate-800/60 border border-blue-500/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white outline-none transition-all shadow-sm"
                  placeholder="admin@exemple.com"
                  autoFocus
                  required
                  aria-required="true"
                />
                <Mail size={20} className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>

            <div>
              <label htmlFor="admin-id" className="block text-sm font-medium text-blue-300 mb-2">
                Identifiant administrateur
              </label>
              <div className="relative">
                <input
                  id="admin-id"
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl bg-slate-800/60 border border-blue-500/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white outline-none transition-all shadow-sm"
                  placeholder="ID administrateur unique"
                  required
                  aria-required="true"
                />
                <UserCog size={20} className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-4 flex gap-3 items-start shadow">
              <ShieldAlert size={24} className="text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-yellow-200/90">
                La réinitialisation d'un mot de passe administrateur est un processus sécurisé en plusieurs étapes. Assurez-vous d'avoir accès à l'email associé et aux informations de récupération.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email.trim() || !adminId.trim()}
              className="group relative w-full py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {isSubmitting ? (
                <Loader size={20} className="animate-spin mx-auto" aria-label="Chargement" />
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                    <Fingerprint size={20} className="text-blue-300 group-hover:text-blue-200 transition-colors" aria-hidden="true" />
                  </span>
                  <span>Vérifier l'Identité</span>
                </>
              )}
            </button>
          </form>
        );

      case 2: // Question de sécurité
        return (
          <form onSubmit={handleSubmitSecurityQuestion} className="space-y-6">
            <div className="bg-slate-800/60 border border-blue-500/30 rounded-xl p-4 mb-6 shadow">
              <h3 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                <Shield size={18} aria-hidden="true" />
                Vérification de Sécurité Supplémentaire
              </h3>
              <p className="text-sm text-gray-300">
                Pour confirmer votre identité, veuillez sélectionner et répondre à votre question de sécurité.
              </p>
            </div>

            <div>
              <label htmlFor="security-question" className="block text-sm font-medium text-blue-300 mb-2">
                Question de sécurité
              </label>
              <select
                id="security-question"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-800/60 border border-blue-500/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white outline-none transition-all shadow-sm appearance-none pr-10 bg-no-repeat bg-right-4"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`}}
                required
                aria-required="true"
              >
                <option value="" disabled className="text-gray-500">Sélectionnez votre question</option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question} className="bg-slate-700 text-white">{question}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="security-answer" className="block text-sm font-medium text-blue-300 mb-2">
                Votre réponse
              </label>
              <div className="relative">
                <input
                  id="security-answer"
                  type="text" // Pourrait être 'password' si la réponse doit être masquée
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl bg-slate-800/60 border border-blue-500/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white outline-none transition-all shadow-sm"
                  placeholder="Répondez ici"
                  required
                  aria-required="true"
                />
                <Lock size={20} className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </div>
              <p className="text-xs text-gray-400 mt-2 px-1">
                Les réponses sont sensibles à la casse. Assurez-vous de la saisir exactement comme lors de sa configuration.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !securityQuestion || !securityAnswer.trim()}
              className="group relative w-full py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {isSubmitting ? (
                <Loader size={20} className="animate-spin mx-auto" aria-label="Chargement" />
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                    <Shield size={20} className="text-blue-300 group-hover:text-blue-200 transition-colors" aria-hidden="true" />
                  </span>
                  <span>Valider la Réponse</span>
                </>
              )}
            </button>
          </form>
        );

      case 3: // Code verification (8 chiffres pour admin)
        return (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-1">
                Code de Vérification Administrateur (8 chiffres)
              </label>
              <p className="text-gray-300 text-sm mb-4">
                Un code a été envoyé à <strong className="text-blue-400">{email}</strong>. Veuillez le saisir ci-dessous.
              </p>

              <div
                className="flex justify-center gap-2 sm:gap-3 flex-wrap"
                onPaste={handlePaste}
              >
                {[...Array(8)].map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => codeInputsRef.current[index] = el}
                    id={`code-${index}`}
                    type="text" // text pour permettre de voir le chiffre, mais inputMode="numeric"
                    inputMode="numeric"
                    pattern="[0-9]*" // Accepte un ou plusieurs chiffres, mais maxLength gère la taille
                    maxLength={1}
                    value={verificationCode[index] || ''}
                    onChange={(e) => handleCodeInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-label={`Chiffre ${index + 1} du code de vérification`}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-lg bg-slate-800/70 border border-blue-500/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-white outline-none transition-all shadow-sm"
                    autoComplete="off"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Vous pouvez entrer les 8 chiffres ou coller le code complet dans le premier champ.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-blue-500/30 rounded-xl p-4 shadow">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-blue-400">Note de sécurité :</span> Ce code de vérification est unique et expire dans 5 minutes. Ne le partagez jamais.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || verificationCode.join('').length !== 8}
              className="group relative w-full py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {isSubmitting ? (
                <Loader size={20} className="animate-spin mx-auto" aria-label="Chargement" />
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                    <CheckSquare size={20} className="text-blue-300 group-hover:text-blue-200 transition-colors" aria-hidden="true" />
                  </span>
                  <span>Vérifier le Code</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center text-sm">
              <p className="text-gray-400">Vous n'avez pas reçu le code ?</p>
              <button
                type="button"
                className={`text-blue-400 hover:text-blue-300 font-medium mt-1 transition-all ${resendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                onClick={handleResendCode}
                disabled={resendDisabled || isSubmitting} // Désactiver aussi si une autre soumission est en cours
                aria-disabled={resendDisabled || isSubmitting}
              >
                {resendDisabled ? (
                  <span>Renvoyer le code (encore {countdown}s)</span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    <RefreshCw size={15} className="inline" aria-hidden="true" />
                    Renvoyer un nouveau code
                  </span>
                )}
              </button>
            </div>
          </form>
        );

      case 4: // New password (règles plus strictes pour admin)
        const strengthScore = getPasswordStrengthScore();
        const strengthText = getPasswordStrengthText();
        return (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-blue-300 mb-2">
                Nouveau mot de passe administrateur
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl bg-slate-800/60 border border-blue-500/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white outline-none transition-all shadow-sm"
                  placeholder="Saisissez votre nouveau mot de passe sécurisé"
                  autoFocus
                  required
                  aria-required="true"
                  aria-describedby="password-strength-criteria"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 focus:outline-none rounded-md focus:bg-blue-500/20 text-gray-400 hover:text-blue-300"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff size={20} aria-hidden="true" />
                  ) : (
                    <Eye size={20} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">Force du mot de passe :</span>
                  <span className={`text-xs font-semibold ${strengthText.color}`}>
                    {strengthText.text}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full transition-all duration-300 ease-out ${
                      strengthScore <= 2 ? 'bg-red-600' :
                      strengthScore <= 3 ? 'bg-red-500' :
                      strengthScore <= 4 ? 'bg-yellow-500' :
                      strengthScore <= 5 ? 'bg-green-500' :
                      'bg-green-600'
                    }`}
                    style={{ width: `${(strengthScore / 6) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={strengthScore}
                    aria-valuemin="0"
                    aria-valuemax="6"
                    aria-label={`Force du mot de passe: ${strengthText.text}`}
                  ></div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-blue-300 mb-2">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-4 pr-12 rounded-xl bg-slate-800/60 border ${
                    newPassword && confirmPassword && newPassword !== confirmPassword ? 'border-red-500/70' : 'border-blue-500/40'
                  } focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-white outline-none transition-all shadow-sm`}
                  placeholder="Confirmez votre mot de passe"
                  required
                  aria-required="true"
                  aria-invalid={newPassword && confirmPassword && newPassword !== confirmPassword}
                />
                <Lock size={20} className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-400 mt-1.5 px-1" role="alert">
                  Les mots de passe ne correspondent pas.
                </p>
              )}
            </div>

            <div id="password-strength-criteria" className="space-y-2.5 bg-slate-800/50 p-4 rounded-xl border border-blue-500/20 shadow">
              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-gray-200 font-medium">Critères de sécurité pour administrateur :</p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pl-2">
                {[
                  { label: "Au moins 12 caractères", valid: passwordStrength.length },
                  { label: "Une lettre majuscule (A-Z)", valid: passwordStrength.hasUpperCase },
                  { label: "Une lettre minuscule (a-z)", valid: passwordStrength.hasLowerCase },
                  { label: "Au moins un chiffre (0-9)", valid: passwordStrength.hasNumber },
                  { label: "Au moins un caractère spécial (!@#...)", valid: passwordStrength.hasSpecial },
                  { label: "N'est pas un mot de passe courant", valid: passwordStrength.hasNoCommonWords },
                ].map(criterion => (
                  <li key={criterion.label} className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full transition-colors ${criterion.valid && newPassword ? 'bg-green-500 animate-pulseOnce' : 'bg-gray-500'}`} aria-hidden="true"></div>
                    <span className={`text-xs ${criterion.valid && newPassword ? 'text-green-300' : 'text-gray-400'}`}>
                      {criterion.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !newPassword || !confirmPassword || newPassword !== confirmPassword || getPasswordStrengthScore() < 6}
              className="group relative w-full py-3 px-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {isSubmitting ? (
                <Loader size={20} className="animate-spin mx-auto" aria-label="Chargement" />
              ) : (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                    <Key size={20} className="text-green-300 group-hover:text-green-200 transition-colors" aria-hidden="true" />
                  </span>
                  <span>Réinitialiser le Mot de Passe</span>
                </>
              )}
            </button>
          </form>
        );

      case 5: // Confirmation
        return (
          <div className="text-center space-y-6 py-8">
            <CheckCircle size={64} className="text-green-500 mx-auto animate-pulseOnce" />
            <h2 className="text-2xl font-semibold text-green-400">Mot de passe réinitialisé avec succès !</h2>
            <p className="text-gray-300">
              Votre mot de passe administrateur a été mis à jour. Vous pouvez maintenant vous connecter avec vos nouvelles informations d'identification.
            </p>
            <p className="text-sm text-gray-400">
              Vous serez redirigé(e) vers la page de connexion ou le tableau de bord dans quelques instants.
            </p>
            {/* Optionnel: Bouton pour rediriger manuellement si la redirection auto échoue ou est trop lente */}
            {/* <button
              onClick={() => console.log("Redirection manuelle (simulation)")}
              className="mt-6 py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Aller au Tableau de Bord
            </button> */}
          </div>
        );
      default:
        return <p className="text-red-500">Erreur : Étape inconnue.</p>;
    }
  };


  return (
      <div className="space-y-6 ">
        {currentStep <= 4 && (
          <button
            onClick={goBack}
            disabled={currentStep === 1 || isSubmitting}
            className={`absolute top-4 left-4 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full hover:bg-blue-500/10 transition-all ${currentStep === 1 ? 'invisible' : ''}`}
            aria-label="Retour à l'étape précédente"
          >
            <ArrowLeft size={22} />
          </button>
        )}

        <div className="text-center mb-6">
          <ShieldAlert size={40} className="mx-auto text-blue-500 mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Récupération de Compte Administrateur
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            {currentStep === 1 && "Veuillez vérifier votre identité."}
            {currentStep === 2 && "Répondez à votre question de sécurité."}
            {currentStep === 3 && "Entrez le code de vérification reçu par email."}
            {currentStep === 4 && "Choisissez un nouveau mot de passe sécurisé."}
            {currentStep === 5 && "Processus terminé avec succès."}
          </p>
        </div>

        {currentStep <= 4 && renderStepIndicators()}
        {renderErrorMessage()}
        
        <div className="animate-fadeIn">
          {renderStep()}
        </div>

        {currentStep <=4 && ( // Ne pas montrer pour l'étape de succès
             <p className="mt-8 text-xs text-gray-500 text-center">
                Besoin d'aide ? Contactez le <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support technique</a>.
             </p>
        )}
      </div>
  
  );
}