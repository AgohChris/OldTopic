import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');

    // Simulation d’authentification (à remplacer par un appel API réel)
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'admin@example.com' && password === 'admin123') {
      setLoginSuccess(true);
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 1500);
    } else {
      setLoginError('Identifiants administrateur invalides');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleLoginSubmit} className="space-y-6
    ">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium text-purple-400">
          Email administrateur
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pr-10 bg-white/5 text-white border border-purple-400/30 rounded-xl focus:outline-none focus:border-purple-500"
            placeholder="admin@example.com"
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="block mb-1 text-sm font-medium text-purple-400">
          Mot de passe
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 bg-white/5 text-white border border-purple-400/30 rounded-xl focus:outline-none focus:border-purple-500"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Se souvenir et Mot de passe oublié */}
      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-gray-300">
          <input
            type="checkbox"
            className="mr-2"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Se souvenir de moi
        </label>
        <a href="/admin/forgot-password" className="text-sm text-purple-400 hover:underline">
          Mot de passe oublié ?
        </a>
      </div>

      {/* Messages d'erreur et de succès */}
      {loginError && (
        <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-600/40 rounded-lg">
          <AlertCircle size={18} className="text-red-500" />
          <span className="text-sm text-red-400">{loginError}</span>
        </div>
      )}

      {loginSuccess && (
        <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-600/40 rounded-lg">
          <CheckCircle size={18} className="text-green-500" />
          <span className="text-sm text-green-400">Connexion réussie ! Redirection...</span>
        </div>
      )}

      {/* Bouton de soumission */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 font-semibold text-white bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader size={18} className="animate-spin" />
            Connexion...
          </span>
        ) : (
          <>
            <Shield size={18} className="inline-block mr-2" />
            Connexion administrateur
          </>
        )}
      </button>

      {/* Note */}
      <p className="mt-4 text-xs text-center text-gray-500">
        Accès strictement réservé aux administrateurs autorisés.
      </p>
    </form>
  );
}