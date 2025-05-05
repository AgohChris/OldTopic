import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    const newState = !isProfileMenuOpen;
    setIsProfileMenuOpen(newState);
    
    // Add or remove overflow-hidden class to block scrolling
    if (newState) {
      document.body.classList.add('overflow-hidden');
      
      // Instead of using inert which might be causing issues, use a more compatible approach
      // Focus management for accessibility
      setTimeout(() => {
        const firstFocusableElement = document.querySelector('#profile-menu button, #profile-menu a, #profile-menu input');
        if (firstFocusableElement instanceof HTMLElement) {
          firstFocusableElement.focus();
        }
      }, 50); // Small timeout to ensure DOM is updated
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup: ensure scrolling is restored and event listener removed
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleLogout = () => {
    // Restore scrolling before navigation
    document.body.classList.remove('overflow-hidden');
    navigate('/login');
  };

  // Function to close menu and restore scrolling during navigation
  const handleMenuItemClick = () => {
    setIsProfileMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'py-2 bg-slate-100 shadow-md' : 'py-4'
        }`}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo with improved contrast */}
          <Link to="#" className="flex items-center group" aria-label="Page d'accueil">
            <div className={`transition-all duration-300 ${isScrolled ? "scale-90" : "scale-100"}`}>   
              <div>
                <span className="text-green-800 text-3xl tracking-wider font-bold">Old</span>
                <span className="text-dark text-2xl font-bold">Topic</span>
              </div>
            </div>
          </Link>

          {/* Buttons / Actions with improved contrast and focus states */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notifications */}
            <button 
              className="p-2 rounded-full text-gray-900 bg-slate-200 hover:bg-green-200 focus:ring-2 focus:ring-green-700 focus:outline-none transition-colors relative"
              aria-label="Notifications"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full" aria-label="3 notifications non lues">3</span>
            </button>

            {/* User Profile */}
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 p-1 rounded-full bg-slate-200 hover:bg-green-200 focus:ring-2 focus:ring-green-700 focus:outline-none transition-colors"
              aria-expanded={isProfileMenuOpen}
              aria-controls="profile-menu"
              aria-label="Menu du profil"
            >
              <img
                src="/uta.png"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-green-700 object-cover"
                alt="Photo de profil"
              />
              <span className="hidden md:inline-block font-medium text-gray-900">Mon Compte</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu with improved contrast and focus states */}
      <div
        id="profile-menu"
        className={`fixed top-0 right-0 w-72 h-screen bg-slate-50 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isProfileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Menu du profil"
        tabIndex={isProfileMenuOpen ? 0 : -1}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-green-100">
          <div className="flex items-center space-x-3">
            <img
              src="/uta.png"
              className="w-12 h-12 rounded-full border-2 border-green-700 object-cover"
              alt="Photo de profil"
            />
            <div>
              <h3 className="font-bold text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-700">john.doe@example.com</p>
            </div>
          </div>
          <button 
            onClick={toggleProfileMenu} 
            className="p-2 hover:bg-green-200 rounded-full focus:ring-2 focus:ring-green-700 focus:outline-none"
            aria-label="Fermer le menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 h-full flex flex-col">
          <nav className="space-y-1 flex-1" aria-label="Menu de navigation">
            <Link
              to="/hero"
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-900 bg-slate-50 hover:bg-green-200 focus:bg-green-200 focus:ring-2 focus:ring-green-700 focus:outline-none transition-colors"
              onClick={handleMenuItemClick}
            >
              <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
</svg>
              <span>Tableau de bord</span>
            </Link>
            
            <Link
              to="/profil"
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-900 bg-slate-50 hover:bg-green-200 focus:bg-green-200 focus:ring-2 focus:ring-green-700 focus:outline-none transition-colors"
              onClick={handleMenuItemClick}
            >
            <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
              <span>Mon profil</span>
            </Link>
            
            <Link
              to="/historique"
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-900 bg-slate-50 hover:bg-green-200 focus:bg-green-200 focus:ring-2 focus:ring-green-700 focus:outline-none transition-colors"
              onClick={handleMenuItemClick}
            >
             <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
              <span>Historique</span>
            </Link>
            
            <div className="pt-2 mt-2 border-t border-gray-300">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                aria-label="Se déconnecter"
              >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
                <span>Déconnexion</span>
              </button>
            </div>
            
          </nav>

          {/* Social Icons - Avec icône site web */}
<div className="border-t py-7 mt-4">
  <div className="flex justify-center space-x-4">
    <div className="flex gap-4">
      <a 
        href="#" 
        className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-700 focus:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none flex items-center justify-center transition-colors"
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>

      <a 
        href="#" 
        className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-700 focus:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none flex items-center justify-center transition-colors"
        aria-label="Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      </a>

      {/* Nouvelle icône Site Web Officiel */}
      <a 
        href="#" 
        className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-700 focus:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none flex items-center justify-center transition-colors"
        aria-label="Site web officiel"
      >
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
        </svg>
      </a>

      <a 
        href="#" 
        className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-700 focus:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none flex items-center justify-center transition-colors"
        aria-label="Visitez notre LinkedIn"
      >
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" cx="4" cy="4" r="2"/>
        </svg>
      </a>
    </div>
  </div>

  <div className="text-center text-sm text-gray-700 mt-6">
    © 2025 OldTopic - Tous droits réservés
  </div>
</div>
        </div>
      </div>

      {/* Overlay */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0   backdrop-blur-sm z-40"
          onClick={toggleProfileMenu}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default NavBar;