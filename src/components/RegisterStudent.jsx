import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Icônes SVG
const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconID = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

function RegisterStudent() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    matricule: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur associée au champ lorsqu'il est modifié
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.matricule.trim()) {
      newErrors.matricule = "Le matricule est requis";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulation d'une soumission de formulaire
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 1500);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  // Animations
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-white rounded-xl shadow-lg p-8 w-full"
        >
          <div className="bg-green-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
            <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Code d'accès envoyé !</h2>
          <p className="text-gray-600 mb-4">
            Un code de validation a été envoyé à l'adresse <span className="font-semibold">{formData.email}</span>
          </p>
          <p className="text-gray-500 mb-6">
            Veuillez consulter votre boîte de réception et utiliser le code reçu pour vous connecter à la plateforme.
          </p>
          
          <button 
            className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
            onClick={navigateToLogin}
          >
            Aller à la page de connexion
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent">
          Inscription étudiant
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Entrez vos informations pour recevoir un code d'accès à la plateforme
        </p>
      </motion.div>

      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse e-mail universitaire
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <IconMail />
              </div>
              <input
                id="register-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="exemple@univ-tlemcen.dz"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="register-matricule" className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de matricule
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <IconID />
              </div>
              <input
                id="register-matricule"
                type="text"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                autoComplete="username"
                className={`pl-10 w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent ${errors.matricule ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="Exemple: 2022012345"
              />
            </div>
            {errors.matricule && <p className="mt-1 text-sm text-red-600">{errors.matricule}</p>}
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0 text-blue-500">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Un code de validation sera envoyé à votre adresse email. Vous pourrez l'utiliser pour vous connecter à la plateforme.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex justify-center items-center p-3 bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement en cours...
                </>
              ) : (
                "Recevoir mon code d'accès"
              )}
            </button>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Vous avez déjà un code ? 
              <button 
                className="font-medium text-teal-600 hover:text-teal-500 ml-1"
                onClick={navigateToLogin}
              >
                Connectez-vous ici
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterStudent;