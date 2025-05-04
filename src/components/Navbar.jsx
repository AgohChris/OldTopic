import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <div
        className={`sticky fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6 rounded-b-full shadow-lg mx-auto transition-all duration-300 ${
          isScrolled ? 'bg-opacity-80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <div className={`transition-all duration-300 ${isScrolled ? "scale-90" : "scale-100"}`}>
              <span className="text-green-800 text-3xl md:text-5xl tracking-wider font-bold">Old</span>
              <span className="text-black text-2xl md:text-3xl font-bold">Topic</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            className="px-4 py-2 rounded-full text-lg font-medium text-gray-800 hover:bg-green-100 hover:text-green-800 transition-colors"
          >
            Accueil
          </Link>
          <Link
            to="/historique"
            className="ml-2 px-5 py-2 rounded-full text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition-all duration-300 hover:shadow-md"
          >
            Historique
          </Link>
          <Link
            to="/profil"
            className="ml-2 px-5 py-2 rounded-full text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition-all duration-300 hover:shadow-md"
          >
            Profil
          </Link>
          <button
            onClick={handleLogout}
            className="ml-2 px-5 py-2 rounded-full text-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 hover:shadow-md"
          >
            Déconnexion
          </button>
        </div>

        {/* Social Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <a
            href="#"
            className="p-2 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="#"
            className="p-2 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors"
            aria-label="Globe"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="p-2 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.987c4.78-.75 8.437-4.887 8.437-9.878z" />
            </svg>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-full text-green-800 hover:text-green-900 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Menu principal"
          >
            <span className="sr-only">Ouvrir le menu</span>
            {isMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile qui sort du côté droit */}
      <div
        className={`md:hidden fixed top-0 right-0 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* En-tête du menu avec bouton de fermeture */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-green-800 text-xl font-bold">OldTopic</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label="Fermer le menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu du menu */}
        <div className="py-4 px-4 h-full overflow-y-auto">
          {/* Navigation links */}
          <nav className="space-y-4 mb-8">
            <Link
              to="/"
              className="block px-4 py-3 rounded-xl text-lg font-medium text-gray-800 hover:bg-green-100 hover:text-green-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/historique"
              className="block px-4 py-3 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition-all duration-300 hover:shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Historique
            </Link>
            <Link
              to="/profil"
              className="block px-4 py-3 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition-all duration-300 hover:shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Profil
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="block w-full px-4 py-3 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 hover:shadow-md"
            >
              Déconnexion
            </button>
          </nav>

          {/* Séparateur */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Social media icons */}
          <div className="py-3">
            <p className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Nous suivre</p>
            <div className="mt-3 flex justify-start space-x-4 px-4">
              <a
                href="#"
                className="p-2 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors"
                aria-label="Globe"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-full text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.987c4.78-.75 8.437-4.887 8.437-9.878z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay transparent fixe */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default NavBar;