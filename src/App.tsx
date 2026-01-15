import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Cars } from './components/Cars';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { CarDetails } from './components/CarDetails';
import { ThemeToggle } from './components/ThemeToggle';
import { useEffect, useRef, useState } from 'react';
import { Stars, Sparkles, ChevronDown, Car, Home, Sun, Moon, Monitor } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';

function AppContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, isDark } = useTheme();

  // Écoute du scroll pour les animations
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Animation de l'indicateur de scroll
      if (scrollIndicatorRef.current) {
        const opacity = 1 - (window.scrollY / 300);
        scrollIndicatorRef.current.style.opacity = Math.max(0, opacity).toString();
      }
    };

    // Tracking de la souris pour effets parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Effet parallax sur le background
      if (backgroundRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        backgroundRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    // Simulation de chargement
    const timer = setTimeout(() => setIsLoading(false), 1200);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Animation d'entrée initiale
    document.body.classList.add('loaded');

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation de défilement fluide entre sections
  const scrollToNextSection = () => {
    const sections = document.querySelectorAll('section');
    const currentScroll = window.scrollY + 1;
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (section.offsetTop > currentScroll) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
        break;
      }
    }
  };

  // Effets de particules
  const renderParticles = () => {
    return Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-[1px] h-[1px] bg-blue-500/30 dark:bg-blue-400/20 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.1}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      />
    ));
  };

  // Transition de page
  const handlePageTransition = (path: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 500);
  };

  // Animation variants pour les transitions de page
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center z-50"
      >
        <div className="relative">
          {/* Loading Animation */}
          <div className="w-32 h-32 relative">
            {/* Spinning Rings */}
            <motion.div 
              className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-4 border-4 border-transparent border-t-purple-500 border-r-cyan-500 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-8 border-4 border-transparent border-t-cyan-500 border-r-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Car className="w-12 h-12 text-white" />
              </motion.div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="mt-8 text-center">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LUXEDRIVE
            </motion.div>
            <div className="mt-2 text-gray-400 text-sm">Chargement de l'expérience...</div>
            
            {/* Progress Bar */}
            <div className="mt-4 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
      {/* Transition Overlay */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.87, 0, 0.13, 1] }}
        className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 origin-top z-[100] pointer-events-none"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.87, 0, 0.13, 1] }}
        className="fixed inset-0 bg-gradient-to-tr from-cyan-600 via-blue-600 to-purple-600 origin-bottom z-[99] pointer-events-none"
      />

      {/* Background Animated Layers */}
      <div ref={backgroundRef} className="fixed inset-0 -z-10 transition-transform duration-300 ease-out">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-purple-50/10 dark:from-blue-900/5 dark:via-transparent dark:to-purple-900/5" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="h-full w-full bg-[linear-gradient(90deg,#888_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_30%,transparent_50%)] animate-grid-pan" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
        </div>
        
        {/* Floating Particles */}
        {renderParticles()}
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl animate-float-reverse" />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="absolute top-0 right-0 h-full w-2 bg-cyan-500 animate-pulse" />
      </div>

      {/* Navigation Buttons */}
      {location.pathname !== '/' && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => handlePageTransition('/')}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Retour</span>
        </motion.button>
      )}

      {/* Scroll Indicator - Only on home page */}
      {location.pathname === '/' && (
        <div
          ref={scrollIndicatorRef}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-2 transition-opacity duration-500"
        >
          <div className="text-sm text-gray-600 dark:text-gray-400 animate-bounce-slow">
            Explore
          </div>
          <button
            onClick={scrollToNextSection}
            className="w-10 h-16 rounded-full border-2 border-gray-300/50 dark:border-gray-600/50 flex items-center justify-center group hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-110"
          >
            <div className="relative">
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 animate-bounce" />
              <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
            </div>
          </button>
        </div>
      )}

      {/* Theme Menu */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="relative"
        >
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className={`p-3 rounded-xl backdrop-blur-xl border shadow-2xl transition-all duration-300 hover:scale-110 ${
              isDark 
                ? 'bg-gray-800/80 border-gray-700 text-white' 
                : 'bg-white/80 border-gray-300 text-gray-900'
            }`}
          >
            {theme === 'light' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : theme === 'dark' ? (
              <Moon className="w-5 h-5 text-purple-500" />
            ) : (
              <Monitor className="w-5 h-5 text-blue-500" />
            )}
          </button>

          <AnimatePresence>
            {showThemeMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-48 rounded-xl backdrop-blur-xl border shadow-2xl overflow-hidden"
                style={{
                  background: isDark 
                    ? 'rgba(17, 24, 39, 0.9)' 
                    : 'rgba(255, 255, 255, 0.9)',
                  borderColor: isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(209, 213, 219, 0.5)'
                }}
              >
                <div className="p-2">
                  {[
                    { id: 'light', label: 'Clair', icon: Sun, color: 'text-yellow-500' },
                    { id: 'system', label: 'Système', icon: Monitor, color: 'text-blue-500' },
                    { id: 'dark', label: 'Sombre', icon: Moon, color: 'text-purple-500' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setTheme(option.id as 'light' | 'dark' | 'system');
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        theme === option.id
                          ? isDark
                            ? 'bg-gray-700/50 text-white'
                            : 'bg-blue-50 text-blue-600'
                          : isDark
                          ? 'hover:bg-gray-700/30 text-gray-300'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <option.icon className={`w-5 h-5 ${option.color}`} />
                      <span>{option.label}</span>
                      {theme === option.id && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col space-y-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
        >
          <ChevronDown className="w-5 h-5 rotate-180 group-hover:-translate-y-1 transition-transform" />
        </button>
        
        <button 
          onClick={() => handlePageTransition('/cars')}
          className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
        >
          <Car className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>

      {/* Mouse Tracker Effect */}
      <div 
        className="fixed w-96 h-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="relative z-10"
        >
          <Routes location={location}>
            <Route path="/" element={
              <>
                <Header />
                <section id="hero" className="animate-slide-up">
                  <Hero />
                </section>
                <section id="cars" className="animate-slide-up-delay">
                  <Cars onCarSelect={(carId) => handlePageTransition(`/car/${carId}`)} />
                </section>
                <section id="features" className="animate-slide-up-delay-2">
                  <Features />
                </section>
                <section id="contact" className="animate-slide-up-delay-3">
                  <Footer />
                </section>
              </>
            } />
            <Route path="/cars" element={
              <div className="pt-20">
                <Cars onCarSelect={(carId) => handlePageTransition(`/car/${carId}`)} />
              </div>
            } />
            <Route path="/car/:id" element={
              <div className="pt-20">
                <CarDetails />
              </div>
            } />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* Interactive Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Icons */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-500/10 dark:text-blue-400/5"
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
              x: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 20}%`,
            }}
          >
            <Stars className="w-20 h-20" />
          </motion.div>
        ))}
      </div>

      {/* Theme Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[98] pointer-events-none"
          >
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
                : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
            }`} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              exit={{ scale: 1.2 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Car className={`w-20 h-20 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        @keyframes grid-pan {
          from { background-position: 0 0; }
          to { background-position: 40px 40px; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(0, -20px) rotate(0deg); }
          75% { transform: translate(-10px, -10px) rotate(-5deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, 10px) rotate(-5deg); }
          50% { transform: translate(0, 20px) rotate(0deg); }
          75% { transform: translate(10px, 10px) rotate(5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes theme-switch {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        
        .animate-grid-pan {
          animation: grid-pan 20s linear infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-theme-switch {
          animation: theme-switch 0.3s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-slide-up-delay-2 {
          animation: slide-up 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        .animate-slide-up-delay-3 {
          animation: slide-up 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Loading animation */
        body.loaded * {
          transition: all 0.3s ease !important;
        }

        /* Page transition */
        .page-transition-enter {
          opacity: 0;
          transform: scale(0.9);
        }
        .page-transition-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 300ms, transform 300ms;
        }
        .page-transition-exit {
          opacity: 1;
          transform: scale(1);
        }
        .page-transition-exit-active {
          opacity: 0;
          transform: scale(1.1);
          transition: opacity 300ms, transform 300ms;
        }

        /* Glass effect */
        .glass-effect {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dark .glass-effect {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;