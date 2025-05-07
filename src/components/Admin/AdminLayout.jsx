import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import HeaderAdmin from './HeaderAdmin';

const AdminLayout = () => {
  // États principaux
  const [activeSidebar, setActiveSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Appliquer le thème dark/light
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Détection du mode mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setActiveSidebar(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Actions
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const toggleSidebar = () => setActiveSidebar(!activeSidebar);

  return (
    <div className={`flex h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    } ${isDarkMode ? 'text-white' : 'text-gray-900'} overflow-hidden`}
    >
      <NavbarAdmin 
        activeSidebar={activeSidebar} 
        showMobileMenu={showMobileMenu} 
        setShowMobileMenu={setShowMobileMenu}
        isDarkMode={isDarkMode}
        isMobile={isMobile}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin 
          isMobile={isMobile}
          toggleMobileMenu={toggleMobileMenu}
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={{ isDarkMode }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;