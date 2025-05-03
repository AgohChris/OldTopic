import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, ThumbsUp } from 'lucide-react';
import { MapPin, Mail, Phone, Globe } from "lucide-react";

const Hero = () => {
  const [filiere, setFiliere] = useState('');
  const [niveau, setNiveau] = useState('');
  const [matiere, setMatiere] = useState('');
  

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);



  // Configuration des animations pour les éléments au défilement
  const [heroRef, heroInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: '-100px 0px'
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Animations pour les éléments de transition
  const [transitionRef, transitionInView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!filiere || !niveau || !matiere) {
      alert("Tous les champs doivent être remplis !");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      console.log({ filiere, niveau, matiere });
      setIsLoading(false);
    }, 2000);
  };



  // Define animation variants.  These can be shared or unique per page.
  const pageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeInOut" } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Section Hero avec Video Background */}
      <motion.div
        ref={heroRef}
        className="flex flex-col items-center justify-center py-43 text-gray-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Vidéo en arrière-plan */}
        <div className="absolute top-5 left-0 min-w-screen min-h-screen z-0 overflow-hidden  ">
          <div className=" absolute top-0 left-0 min-w-screen  min-h-screen bg-black opacity-50 z-10"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute object-cover w-full h-full"
          >
            <source src="/video-background.mp4" type="video/mp4" />
            {/* Ajouter des sources alternatives si nécessaire */}
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Contenu du Hero - maintenant sur la vidéo */}

        <div className="relative z-20 w-full" >
          <div className="container mx-auto px-4 flex flex-col items-center">
            <motion.h1
              className="text-5xl font-bold text-center mb-4 
                          bg-gradient-to-r from-green-200 via-green-500 to-green-800 
                          bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              Prépare tes examens en toute sérénité
              <br />
              Gagne du temps, révise malin !
            </motion.h1>

            <motion.p
              className="text-xl text-center text-gray-200 mb-12 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Retrouve rapidement les anciens sujets d’examens de l’UTA triés par matière, année ou enseignant. Centralisé, sécurisé, et conçu pour booster ta réussite.
            </motion.p>

            {/* Section de recherche unifiée */}
            <motion.div
              className="flex w-full max-w-3xl rounded-full bg-white bg-opacity-90 shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >

              {/* Label caché pour la filière */}
              <label htmlFor="filiere" className="sr-only">Filière</label>
              <select
                id="filiere"
                aria-label="Filière"
                value={filiere}
                onChange={(e) => setFiliere(e.target.value)}
                className="w-1/3 p-4 text-gray-700 bg-transparent focus:outline-none mr-2"
              >
                <option value="">Filière</option>
                <option value="IGL">IGL</option>
                <option value="RIT">RIT</option>
                <option value="Économie">Économie</option>
                <option value="FBA">FBA</option>
              </select>

              {/* Label caché pour le niveau */}
              <label htmlFor="niveau" className="sr-only">Niveau</label>
              <select
                id="niveau"
                aria-label="Niveau"
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                className="w-1/3 p-4 text-gray-700 bg-transparent focus:outline-none mr-2"
              >
                <option value="">Niveau</option>
                <option value="Licence 1">Licence 1</option>
                <option value="Licence 2">Licence 2</option>
                <option value="Licence 3">Licence 3</option>
              </select>

              {/* Label caché pour la matière */}
              <label htmlFor="matiere" className="sr-only">Matière</label>
              <select
                id="matiere"
                aria-label="Matière"
                value={matiere}
                onChange={(e) => setMatiere(e.target.value)}
                className="w-1/3 p-4 text-gray-700 bg-transparent focus:outline-none"
              >
                <option value="">Matière</option>
                <option value="Maths">Maths</option>
                <option value="Physique">Physique</option>
                <option value="Info">Info</option>
                <option value="Statistique">Statistique</option>
              </select>

              <button
                onClick={handleSearch}
                disabled={isLoading}
                className={`relative flex items-center justify-center 
                        bg-green-800 text-white font-semibold ml-9 my-1 mx-1 rounded-full px-5 py-2 text-xl
                        bg-gradient-to-r from-green-300 to-green-900
                        transition-all duration-300
                        hover:from-green-400 hover:to-green-800
                        hover:scale-105 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                ) : 'Search'}
              </button>

            </motion.div>
          </div>
        </div>


        {/* Élément de transition décoratif */}
        <div className="w-full absolute bottom-0 left-0 overflow-hidden z-20" style={{ height: '150px' }}>
          <motion.div
            ref={transitionRef}
            className="w-full absolute bottom-0"
            initial={{ y: 150 }}
            animate={transitionInView ? { y: 0 } : { y: 150 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <svg viewBox="0 0 1440 320" className="w-full h-full">
              <motion.path
                fill="#F9FAFB"
                fillOpacity="1"
                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={transitionInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Section À propos */}
      <motion.div
        id="about"
        className="py-24 bg-white-50 relative"
        ref={aboutRef}
        initial={{ opacity: 0 }}
        animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Élément décoratif en haut de la section */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-20 h-20 bg-green-100 rounded-full absolute -top-10 left-1/4"
              initial={{ scale: 0 }}
              animate={aboutInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.div
              className="w-12 h-12 bg-green-200 rounded-full absolute -top-16 left-1/2"
              initial={{ scale: 0 }}
              animate={aboutInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.div
              className="w-16 h-16 bg-green-300 rounded-full absolute -top-8 left-3/4"
              initial={{ scale: 0 }}
              animate={aboutInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-7xl font-bold text-green-800 mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={aboutInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              À propos de nous
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-green-600 mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={aboutInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={aboutInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Nous sommes dédiés à offrir des outils de recherche académique de pointe pour faciliter votre parcours éducatif.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Image à gauche sur les écrans medium et plus grands */}
            <motion.div
              className="md:w-1/2 relative"
              ref={imageRef}
              initial={{ x: -100, opacity: 0 }}
              animate={imageInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/uta.png"
                alt="Université de Technologie Avancée"
                className="rounded-lg shadow-xl object-cover  w-full h-50 "
              />

              {/* Éléments décoratifs autour de l'image */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-100 rounded-full z-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={imageInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 bg-green-200 rounded-full z-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={imageInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
            </motion.div>

            {/* Contenu à droite */}
            <motion.div
              className="md:w-1/2"
              ref={contentRef}
              initial={{ x: 100, opacity: 0 }}
              animate={contentInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-8">
                {/* Section Mission */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={contentInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-4xl font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <Target className="text-green-500 w-6 h-6" />
                    Notre mission
                  </h3>
                  <p className="text-gray-700">
                    Offrir à chaque étudiant un accès fluide et équitable à des ressources pédagogiques de qualité, grâce à des technologies intelligentes et intuitives.
                  </p>
                </motion.div>
                {/* Section Vision */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={contentInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3 className="text-4xl font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <Eye className="text-green-500 w-6 h-6" />
                    Notre vision
                  </h3>
                  <p className="text-gray-700">
                    Transformer l'expérience éducative en créant un écosystème où les connaissances sont
                    facilement accessibles, organisées et personnalisées selon les besoins de chaque étudiant.
                  </p>
                </motion.div>

                {/* Section Avantages */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={contentInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h3 className="text-4xl font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <ThumbsUp className="text-green-500 w-6 h-6" />
                    Nos avantages
                  </h3>
                  <ul className="space-y-2">
                    <motion.li
                      className="flex items-center"
                      initial={{ x: 20, opacity: 0 }}
                      animate={contentInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 }}
                    >
                      <span className="bg-green-100 text-green-800 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>

                      <span><strong>Pour l’administration :</strong> Archivage centralisé, suivi pédagogique et réduction des tâches manuelles.</span>
                    </motion.li>
                    <motion.li
                      className="flex items-center"
                      initial={{ x: 20, opacity: 0 }}
                      animate={contentInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 1.0 }}
                    >
                      <span className="bg-green-100 text-green-800 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span><strong>Pour les étudiants :</strong> Accès rapide aux anciens sujets, gain de temps, meilleure préparation et résultats améliorés.</span>
                    </motion.li>
                    <motion.li
                      className="flex items-center"
                      initial={{ x: 20, opacity: 0 }}
                      animate={contentInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ duration: 0.3, delay: 1.1 }}
                    >
                      <span className="bg-green-100 text-green-800 p-1 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span><strong>Pour l’établissement :</strong> Image moderne, valorisation pédagogique et amélioration du taux de réussite.</span>
                    </motion.li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Section Contactez-nous avec animations et image */}
      <motion.section
        id="contact"
        className="bg-white-100 py-24 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">Entrons en contact</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-md text-gray-500">
              Une question ? Une suggestion ? Écris-nous, nous te répondrons rapidement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* 📥 BOX FORMULAIRE */}
            <motion.form
              className="bg-white p-8 rounded-xl shadow-md space-y-6"
              initial={{ x: -50, opacity: 0}}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              onSubmit={(e) => {
                e.preventDefault();
                if (!firstName || !lastName || !email || !message || !agreed) {
                  alert("Veuillez remplir tous les champs et accepter les conditions.");
                } else {
                  alert("Message envoyé !");
                }
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-green-500 py-2 text-sm"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-green-500 py-2 text-sm"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-green-500 py-2 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  rows="4"
                  className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-green-500 py-2 text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 text-green-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-green-700 underline">Terms and Conditions</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition"
              >
                SEND MESSAGE
              </button>
            </motion.form>

            {/* 🖼️ BOX POUR IMAGE */}
            {/* 🖼️ BOX POUR IMAGE + INFOS */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-between"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Illustration */}
              <img
                src="/Location review-bro.png"
                alt="Localisation illustrative"
                className="rounded-lg shadow-md object-cover w-full h-[250px] mb-6"
              />
              {/* Informations de contact */}
              <div className="w-full space-y-4 text-sm text-gray-700">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-green-700" />
                  <span>Rue de la Technologie, Bloc 2, UTA Ville</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-green-700" />
                  <span>contact@utaresearch.ai</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-green-700" />
                  <span>+221 77 000 1122</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-green-700" />
                  <span>www.utaresearch.ai</span>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </motion.section>

    </motion.div>
  );
};

export default Hero;
