import { useState, useEffect } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // New state for scroll detection

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // You can adjust the scroll threshold (50px in this case)
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={` sticky fixed top-0 left-0 w-full z-50 flex items-center justify-between p-6  rounded-b-full shadow-lg mx-auto w-full space-x-9 transition-all duration-300 ${isScrolled ? 'bg-opacity-90 backdrop-blur-md bg-white/10' : 'bg-transparent'}`}
    >
      <div>
        <a href="#">
        <span className="text-green-800 text-3xl md:text-5xl tracking-wider font-bold">Old</span>
        <span className="text-black text-2xl md:text-3xl font-bold">Topic</span>
        </a>
      </div>

      <div className="hidden md:flex space-x-4">
        <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">Accueil</a>
        <a href="#" className="bg-green-800 text-white p-5 font-semibold cursor-pointer ml-9 my-1 mx-1 rounded-full px-5 py-2 text-xl
                        bg-gradient-to-r from-green-300 to-green-900
                        transition-all duration-300
                        hover:from-green-400 hover:to-green-800
                        hover:scale-105">Historique</a>
        <a href="#" className="bg-green-800 text-white p-5 font-semibold cursor-pointer ml-9 my-1 mx-1 rounded-full px-5 py-2 text-xl
                        bg-gradient-to-r from-green-300 to-green-900
                        transition-all duration-300
                        hover:from-green-400 hover:to-green-800
                        hover:scale-105">Profil</a>
      </div>

      <div className="hidden md:flex space-x-4">
        <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
          <i className="fa-solid fa-globe"></i>
        </a>
        <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-xl text-green-800 focus:outline-none">
          <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>


      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white bg-opacity-10 backdrop-blur-sm shadow-lg  rounded-lg m-9 mx-auto space-x-9">
          <a href="#home" className="block mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">Accueil</a>
          <a href="#about" className="block bg-green-800 text-white p-5 font-semibold cursor-pointer ml-9 my-1 mx-1 rounded-full px-5 py-2 text-xl
                        bg-gradient-to-r from-green-300 to-green-900
                        transition-all duration-300
                        hover:from-green-400 hover:to-green-800
                        hover:scale-105">Historique</a>
          <a href="#contact" className="block bg-green-800 text-white p-5 font-semibold cursor-pointer ml-9 my-1 mx-1 rounded-full px-5 py-2 text-xl
                        bg-gradient-to-r from-green-300 to-green-900
                        transition-all duration-300
                        hover:from-green-400 hover:to-green-800
                        hover:scale-105">Profil</a>
          <div className="flex space-x-4 mt-4 pl-4">
            <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
              <i className="fa-solid fa-globe"></i>
            </a>
            <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
