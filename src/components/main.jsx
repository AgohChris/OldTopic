import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from "./NavBar"
import Footer from "./Footer"
import { motion } from 'framer-motion';

const Main = () => {
  const location = useLocation();

  // Define animation variants
  const pageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeInOut" } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.4 } }
  };

  return (
    <div>
      <NavBar />
      <motion.div
        key={location.pathname} // Important:  Key with route to re-animate
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          minHeight: 'calc(100vh - 120px)' // Ensure minimum height, adjust 120px as needed for header/footer
        }}
      >
        <Outlet />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Main;
