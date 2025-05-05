import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    const newState = !isProfileMenuOpen;
    setIsProfileMenuOpen(newState);
    
    // Gestion du scroll
    if (newState) {
      document.body.classList.add('overflow-hidden');
      
      // Gestion de l'accessibilité
      setTimeout(() => {
        const firstFocusableElement = document.querySelector('#profile-menu button, #profile-menu a, #profile-menu input');
        if (firstFocusableElement instanceof HTMLElement) {
          firstFocusableElement.focus();
        }
      }, 50);
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleLogout = () => {
    document.body.classList.remove('overflow-hidden');
    navigate('/login');
  };
  const handleSearch = () => {
    document.body.classList.remove('overflow-hidden');
    navigate('/download');
  };

  const handleMenuItemClick = () => {
    setIsProfileMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      {/* NavBar principale avec effet de glassmorphism */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500  backdrop-blur-md
          ${isScrolled 
            ? 'py-2 bg-white/90 dark:bg-slate-900/20 backdrop-blur-lg shadow-xl transform transition-all duration-500 ease-in-out z-50' 
            : 'py-2 bg-transparent'}`}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo avec animation au scroll */}
          <Link to="#" className="flex items-center group" aria-label="Page d'accueil">
            <div className={`transition-all duration-500 ${isScrolled ? "scale-90" : "scale-100"}`}>
              <div className="relative">
                <span className="text-green-700 text-3xl tracking-wider font-bold">Old</span>
                <span className="text-gray-800 dark:text-gray-100 text-2xl font-bold">Topic</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-500 group-hover:w-full`}></span>
              </div>
            </div>
          </Link>

          {/* Boutons d'action avec effet au survol amélioré */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Bouton de recherche */}
            <button 
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 relative group"
              aria-label="Rechercher"
              onClick={handleSearch}

            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Rechercher</span>
            </button>
            
            {/* Notifications avec badge et animation */}
            <button 
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 relative group"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full animate-pulse" aria-label="3 notifications non lues">3</span>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Notifications</span>
            </button>

            {/* Bouton Profil avec effet de hover */}
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 relative group"
              aria-expanded={isProfileMenuOpen}
              aria-controls="profile-menu"
              aria-label="Menu du profil"
            >
              <div className="relative">
                <img
                  src="/Alson.jpeg"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-green-500 ring-offset-2 ring-offset-transparent transition-all duration-300"
                  alt="Photo de profil"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="hidden md:inline-block font-medium text-gray-800 dark:text-gray-100">Mon Compte</span>
              <svg className={`w-4 h-4 ml-1 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu latéral avec effet de glassmorphism */}
      <div
        id="profile-menu"
        className={`fixed top-0 right-0 w-80 h-screen bg-white/90 dark:bg-slate-900/20 backdrop-blur-lg shadow-xl transform transition-all duration-500 ease-in-out z-50 ${
          isProfileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Menu du profil"
        tabIndex={isProfileMenuOpen ? 0 : -1}
      >
        {/* En-tête du profil */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <button 
            onClick={toggleProfileMenu} 
            className="absolute top-6 right-6 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
            aria-label="Fermer le menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <img
                src="/Alson.jpeg"
                className="w-20 h-20 rounded-full border-4 border-green-500 object-cover shadow-lg"
                alt="Photo de profil"
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white">Ali Dabo</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">alsonDab9@gmail.com</p>
            <span className="mt-2 px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Etudiant</span>
          </div>
        </div>

        {/* Corps du menu */}
        <div className="p-4 h-full flex flex-col overflow-y-auto">
          <nav className="space-y-1 flex-1" aria-label="Menu de navigation">
            <Link
              to="/hero"
              className="group flex items-center justify-between p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-green-100/70 dark:hover:bg-green-900/30 focus:bg-green-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
              onClick={handleMenuItemClick}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Accueil</span>
              </div>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              to="/profil"
              className="group flex items-center justify-between p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-green-100/70 dark:hover:bg-green-900/30 focus:bg-green-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
              onClick={handleMenuItemClick}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Mon profil</span>
              </div>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              to="/historique"
              className="group flex items-center justify-between p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-green-100/70 dark:hover:bg-green-900/30 focus:bg-green-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
              onClick={handleMenuItemClick}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Historique</span>
              </div>
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-3 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors duration-300"
                aria-label="Se déconnecter"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Déconnexion</span>
                </div>
              </button>
            </div>
          </nav>

          {/* Pied de page avec icônes sociales */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-4">
            <div className="flex justify-center space-x-3">
              <a 
                href="#" 
                className="p-2 rounded-full bg-gray-200/70 dark:bg-gray-700/70 hover:bg-green-100 dark:hover:bg-green-900/50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a 
                href="#" 
                className="p-2 rounded-full bg-gray-200/70 dark:bg-gray-700/70 hover:bg-green-100 dark:hover:bg-green-900/50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 group"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>

              <a 
                href="#" 
                className="p-2 rounded-full bg-gray-200/70 dark:bg-gray-700/70 hover:bg-green-100 dark:hover:bg-green-900/50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 group"
                aria-label="Site web officiel"
              >
                <svg className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
              </a>

              <a 
                href="#" 
                className="p-2 rounded-full bg-gray-200/70 dark:bg-gray-700/70 hover:bg-green-100 dark:hover:bg-green-900/50 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 group"
                aria-label="Visitez notre LinkedIn"
              >
                <svg className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4 py-22">
              © 2025 OldTopic - Tous droits réservés
            </div>
          </div>
        </div>
      </div>

      {/* Overlay avec effet de blur */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-500"
          onClick={toggleProfileMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default NavBar;