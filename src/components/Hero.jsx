import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { 
  GraduationCap, 
  Target, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Book, 
  Calendar, 
  Star, 
  ArrowRight, 
  ChevronDown
} from 'lucide-react';

const Hero = () => {
  // Contrôle des animations
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const heroRef = useRef(null);
  
  // Pour l'effet de parallaxe au scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Spring pour des animations plus fluides
  const yBg = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    { stiffness: 100, damping: 30 }
  );
  
  // Opacité pour fade-out lors du scroll
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  
  useEffect(() => {
    // Déclencher l'apparition initiale
    setIsVisible(true);
    controls.start("visible");
    
    // Ajouter un effet de parallaxe aux éléments lors du scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Vous pouvez ajouter des traitements spécifiques au scroll ici
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  // Pour l'effet de comptage
  const CountUp = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            let startTime;
            const endValue = typeof end === 'string' ? parseInt(end) : end;
            
            const animate = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
              setCount(Math.floor(progress * endValue));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      
      if (countRef.current) {
        observer.observe(countRef.current);
      }
      
      return () => observer.disconnect();
    }, [end, duration]);
    
    return (
      <span ref={countRef} className="inline-block">
        {count}{suffix}
      </span>
    );
  };

  // Données pour les particules décoratives
  const decorativeItems = [
    { icon: BookOpen, color: 'text-green-400', size: 'w-5 h-5' },
    { icon: GraduationCap, color: 'text-green-500', size: 'w-6 h-6' },
    { icon: CheckCircle, color: 'text-green-300', size: 'w-4 h-4' },
    { icon: Target, color: 'text-green-600', size: 'w-5 h-5' },
    { icon: Book, color: 'text-emerald-400', size: 'w-4 h-4' },
    { icon: Calendar, color: 'text-green-400', size: 'w-5 h-5' },
    { icon: Star, color: 'text-green-200', size: 'w-3 h-3' }
  ];

  // Variantes pour les animations coordonnées
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Pour les cartes avec effet au hover
  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-black" ref={heroRef}>
      {/* Gradient de fond amélioré */}
      <div className="absolute inset-0 bg-gradient-radial from-green-900/20 via-black to-black opacity-60" />
      
      {/* Grille en fond avec luminosité */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-20" />
      
      {/* Éléments décoratifs avec animation de défilement infini */}
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
        {/* Les particules flottantes */}
        {Array(30).fill().map((_, index) => {
          const item = decorativeItems[index % decorativeItems.length];
          const IconComponent = item.icon;
          const size = Math.random() * 20 + 10;
          const delay = Math.random() * 5;
          const duration = Math.random() * 20 + 40;
          
          return (
            <motion.div
              key={`particle-${index}`}
              className={`absolute ${item.color} opacity-10`}
              initial={{ 
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`, 
                scale: 0,
                rotate: 0 
              }}
              animate={{ 
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                scale: [0, 1, 0.8, 1],
                rotate: [0, 180, 360],
                opacity: [0, 0.2, 0.1, 0.2]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut",
                delay: delay,
                times: [0, 0.2, 0.5, 1]
              }}
            >
              <IconComponent size={size} />
            </motion.div>
          );
        })}
        
        {/* Effet de vagues dynamiques en bas */}
        <svg
          className="absolute bottom-0 left-0 w-full text-green-800/10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ d: "M0,320L48,304C96,288,192,256,288,245.3C384,235,480,245,576,240C672,235,768,213,864,208C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
            animate={{ 
              d: [
                "M0,320L48,304C96,288,192,256,288,245.3C384,235,480,245,576,240C672,235,768,213,864,208C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,320L48,288C96,256,192,192,288,176C384,160,480,192,576,213.3C672,235,768,245,864,234.7C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 20,
              ease: "easeInOut"
            }}
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Section Hero principale */}
      <motion.div 
        className="relative w-full min-h-screen flex items-center justify-center"
        style={{ opacity: opacityHero }}
      >
        {/* Video Background avec effet parallaxe */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div style={{ y: yBg }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 z-10" />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute object-cover w-full h-full"
            >
              <source src="/video-background.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Contenu principal avec animations séquentielles */}
        <div className="container mx-auto px-4 relative z-20 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-12"
          >
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            >
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-green-400 via-green-500 to-green-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  Prépare tes examens
                </span>
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-green-500/20 rounded-lg"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    delay: 1,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                />
              </span>
              <br />
              en toute sérénité
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Retrouve rapidement les anciens sujets d'examens de l'UTA,
              triés par matière, année ou enseignant. Une préparation optimale pour une réussite maximale.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors font-medium"
                href="#about"
              >
                En savoir plus
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Cards avantages avec effets au survol améliorés */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto"
          >
            {[
              { 
                icon: BookOpen, 
                title: 'Ressources Centralisées', 
                text: 'Tous les sujets d\'examens en un seul endroit, facilement accessibles et organisés',
                color: 'from-green-500/20 to-emerald-600/20',
                borderColor: 'border-green-500/30'
              },
              { 
                icon: GraduationCap, 
                title: 'Performance Accrue', 
                text: 'Améliore tes résultats grâce à une préparation ciblée basée sur les examens antérieurs',
                color: 'from-teal-500/20 to-green-600/20',
                borderColor: 'border-teal-500/30' 
              },
              { 
                icon: Target, 
                title: 'Révision Intelligente', 
                text: 'Adapte ton apprentissage aux formats d\'examens spécifiques de chaque matière',
                color: 'from-emerald-500/20 to-green-500/20',
                borderColor: 'border-emerald-500/30'
              }
            ].map((card, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover="hover"
                initial="initial"
                className={`bg-white/5 backdrop-blur-lg p-6 rounded-xl border ${card.borderColor} text-center relative overflow-hidden group`}
              >
                <motion.div 
                  variants={cardVariants}
                  className="relative z-10 h-full flex flex-col"
                >
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${card.color} mb-6 inline-flex mx-auto items-center justify-center`}>
                    <card.icon className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-300 text-sm flex-grow">{card.text}</p>
                  
                  <motion.div 
                    className="mt-5 inline-flex items-center justify-center text-green-400 text-sm font-medium"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.div>
                </motion.div>
                
                {/* Effet de lueur au hover */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
                  initial={{ opacity: 0, scaleX: 0.3 }}
                  whileHover={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Effet de fond au hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Section Statistiques animées */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-12 py-10"
          >
            {[
              { value: '2500', suffix: '+', label: 'Sujets d\'examens', icon: Book },
              { value: '97', suffix: '%', label: 'Utilisateurs satisfaits', icon: CheckCircle },
              { value: '12', label: 'Filières couvertes', icon: Target }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="text-center relative"
              >
                <div className="absolute -inset-4 rounded-lg bg-green-500/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-white/5 border border-green-500/20 rounded-xl p-5 backdrop-blur-sm relative">
                  <div className="bg-green-500/10 rounded-full p-2 inline-flex mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-4xl font-bold text-green-400">
                    <CountUp end={parseInt(stat.value)} duration={2} suffix={stat.suffix || ''} />
                  </div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Indicateur de scroll */}
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <span className="text-gray-400 text-sm mb-2">Découvrir plus</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-6 h-6 text-green-400" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section À propos améliorée */}
      <section id="about" className="w-full bg-gradient-to-b from-black to-gray-900 py-32 px-4 relative">
        {/* Effet de profondeur avec des cercles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array(6).fill().map((_, index) => (
            <motion.div
              key={`circle-${index}`}
              className="absolute rounded-full border border-green-500/10"
              style={{
                width: `${(index + 1) * 200}px`,
                height: `${(index + 1) * 200}px`,
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Colonne texte avec animation séquentielle */}
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-green-300 bg-green-900/20 border border-green-500/20 text-sm font-medium">
                  Notre vision
                </span>
                <h2 className="text-4xl font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    À propos de notre plateforme
                  </span>
                </h2>
              </motion.div>
              
              <div className="space-y-8">
                <motion.div 
                  variants={itemVariants}
                  className="flex items-start gap-5 group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-green-700/10 border border-green-500/20 flex-shrink-0 mt-1 group-hover:bg-green-500/30 transition-colors">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      Notre Mission
                      <motion.div 
                        className="h-1 w-12 bg-green-500/50 ml-3 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: 48, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Fournir aux étudiants de l'UTA un accès centralisé et organisé aux ressources académiques,
                      tout en offrant à l'administration des outils modernes de gestion des contenus pédagogiques.
                      Notre ambition est de créer un environnement d'apprentissage optimal qui favorise la réussite.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex items-start gap-5 group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-700/10 border border-teal-500/20 flex-shrink-0 mt-1 group-hover:bg-teal-500/30 transition-colors">
                    <Clock className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      Évolutivité
                      <motion.div 
                        className="h-1 w-12 bg-teal-500/50 ml-3 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: 48, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                      />
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-3">
                      Une plateforme en constante amélioration pour répondre aux besoins changeants des étudiants et de l'université.
                    </p>
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                    >
                      {[
                        { text: "Mises à jour régulières", icon: Calendar },
                        { text: "Nouvelles fonctionnalités", icon: Star },
                        { text: "Support technique dédié", icon: Users }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                          }}
                          className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <item.icon className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{item.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex items-start gap-5 group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-500/20 flex-shrink-0 mt-1 group-hover:bg-emerald-500/30 transition-colors">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                      Pour qui ?
                      <motion.div 
                        className="h-1 w-12 bg-emerald-500/50 ml-3 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: 48, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        className="relative overflow-hidden group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <div className="p-5 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10 hover:border-green-500/30 transition-colors duration-300 h-full">
                          <h4 className="font-medium text-green-400 mb-2 flex items-center">
                            <GraduationCap className="w-5 h-5 mr-2" />
                            Étudiants
                          </h4>
                          <p className="text-sm text-gray-300">
                            Accès 24/7 aux ressources, suivi de progression personnalisé, partage communautaire et apprentissage collaboratif.
                          </p>
                        </div>
                        {/* Effet de brillance au hover */}
                        <motion.div 
                          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                          animate={{ x: ['0%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        />
                      </motion.div>
                      <motion.div 
                        className="relative overflow-hidden group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <div className="p-5 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10 hover:border-teal-500/30 transition-colors duration-300 h-full">
                          <h4 className="font-medium text-teal-400 mb-2 flex items-center">
                            <Target className="w-5 h-5 mr-2" />
                            Administration
                          </h4>
                          <p className="text-sm text-gray-300">
                            Gestion centralisée des ressources, statistiques d'utilisation, tableau de bord analytique et contrôle qualité des contenus.
                          </p>
                        </div>
                        {/* Effet de brillance au hover */}
                        <motion.div 
                          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                          animate={{ x: ['0%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Colonne visuelle avec animation élaborée */}
            <motion.div
              variants={itemVariants}
              className="relative h-full min-h-[500px]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 60, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative h-full z-10 bg-gradient-to-br from-green-500/10 to-black/40 rounded-3xl p-8 border border-green-500/20 backdrop-blur-sm overflow-hidden"
              >
                {/* Effet de fond lumineux */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-green-500/10 blur-[100px] rounded-full" />
                
                {/* Cercles concentriques animés */}
                {Array(4).fill().map((_, index) => (
                  <motion.div
                    key={`animated-circle-${index}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-400/30"
                    style={{
                      width: `${(index + 1) * 80}px`,
                      height: `${(index + 1) * 80}px`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                ))}
                
                {/* Animation de particules autour du cadre */}
                {Array(12).fill().map((_, index) => (
                  <motion.div
                    key={`particle-frame-${index}`}
                    className="absolute rounded-full bg-green-500"
                    style={{
                      width: Math.random() * 6 + 3,
                      height: Math.random() * 6 + 3,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                      left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 15,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: "easeInOut",
                    }}
                  />
                ))}
                
                <div className="relative h-full flex flex-col justify-center items-center space-y-8">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-6 p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg shadow-green-500/10"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotateZ: [0, 2, 0, -2, 0],
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <img 
                        src="/uta.png" 
                        alt="Logo UTA"
                        className="h-24 w-auto object-contain filter brightness-110" 
                      />
                    </motion.div>
                  </motion.div>
                  
                  <div className="text-center space-y-6 relative z-10">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: "easeInOut" 
                      }}
                      className="relative"
                    >
                      <div className="absolute -inset-4 rounded-full bg-green-500/20 blur-lg opacity-50" />
                      <div className="p-4 bg-black/20 backdrop-blur-sm rounded-full border border-green-500/30">
                        <GraduationCap className="w-14 h-14 text-green-400 mx-auto" />
                      </div>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white relative">
                      Chiffres clés
                      <motion.div 
                        className="h-1 w-20 bg-green-500/50 mx-auto mt-2 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: 80, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {[
                        { value: '100%', label: 'Couverture des filières', color: 'from-green-500/20 to-emerald-500/10', icon: CheckCircle },
                        { value: '24h/24', label: 'Disponibilité', color: 'from-teal-500/20 to-green-500/10', icon: Clock }
                      ].map((item, index) => (
                        <motion.div 
                          key={index} 
                          className={`p-4 bg-gradient-to-br ${item.color} rounded-xl border border-white/10 relative overflow-hidden group`}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)"
                          }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + (index * 0.2) }}
                            viewport={{ once: true }}
                          >
                            <div className="flex justify-center mb-2">
                              <item.icon className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="text-2xl font-bold text-green-400">{item.value}</div>
                            <div className="text-xs text-gray-300 mt-1">{item.label}</div>
                          </motion.div>
                          
                          {/* Animation lumineuse au hover */}
                          <motion.div 
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '200%' }}
                            transition={{ duration: 1.5 }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-400 text-sm max-w-xs mx-auto mt-6 relative z-10"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-500">
                      Une plateforme pensée pour la réussite académique de tous
                    </span>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Éléments décoratifs flottants autour du cadre principal */}
              {decorativeItems.slice(0, 4).map((item, index) => {
                const IconComponent = item.icon;
                const positions = [
                  { top: '10%', left: '-10%' },
                  { top: '20%', right: '-5%' },
                  { bottom: '15%', left: '-8%' },
                  { bottom: '25%', right: '-7%' }
                ];
                
                return (
                  <motion.div
                    key={`floating-deco-${index}`}
                    className={`absolute ${item.color} hidden md:block`}
                    style={{
                      ...positions[index],
                      zIndex: 5
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + (index * 0.2) }}
                  >
                    <motion.div
                      className="p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-green-500/20"
                      animate={{ 
                        y: [0, -15, 0], 
                        rotate: [0, 10, 0, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 5 + index, 
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: "easeInOut"
                      }}
                    >
                      <IconComponent className="w-8 h-8" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;