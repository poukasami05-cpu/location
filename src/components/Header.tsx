import { Menu, X, Moon, Sun, Car, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    headerRef.current?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      headerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setIsOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'cars', label: 'Véhicules' },
    { id: 'features', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20 border-b border-white/20 dark:border-gray-800/30'
          : 'bg-transparent'
      }`}
      style={{
        background: scrolled 
          ? theme === 'light'
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05) 0%, transparent 50%), rgba(255, 255, 255, 0.95)`
            : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05) 0%, transparent 50%), rgba(17, 24, 39, 0.95)`
          : 'transparent'
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Animation */}
          <div
            className="flex items-center space-x-2 cursor-pointer group relative"
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            {/* Animated Icon */}
            <div className={`relative transition-all duration-500 ${isHoveringLogo ? 'transform rotate-12 scale-110' : ''}`}>
              <Car className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div className={`absolute -top-1 -right-1 transition-all duration-1000 ${isHoveringLogo ? 'animate-ping' : ''}`}>
                <Sparkles className="w-3 h-3 text-yellow-500" />
              </div>
            </div>

            {/* Animated Text */}
            <div className="relative overflow-hidden">
              <div className={`text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent font-display tracking-tight animate-gradient bg-[length:200%_auto] ${
                isHoveringLogo ? 'animate-shimmer' : ''
              }`}>
                LuxeDrive
              </div>
              
              {/* Animated Underline */}
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-all duration-500 ${
                isHoveringLogo ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`} />
            </div>

            {/* Particle Effects */}
            {isHoveringLogo && (
              <>
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-500/50 dark:bg-blue-400/50 rounded-full animate-float"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1.2s',
                      left: `${Math.cos((i * 60 * Math.PI) / 180) * 30 + 50}%`,
                      top: `${Math.sin((i * 60 * Math.PI) / 180) * 30 + 50}%`,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-6 py-2 overflow-hidden group"
              >
                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-cyan-500/10 transition-transform duration-500 ${
                  hoveredItem === item.id ? 'translate-x-0' : '-translate-x-full'
                }`} />
                
                {/* Text */}
                <span className={`relative font-medium tracking-wide transition-all duration-300 ${
                  hoveredItem === item.id 
                    ? 'text-blue-600 dark:text-blue-400 scale-105' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {item.label}
                </span>
                
                {/* Animated Underline */}
                <div className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 transition-all duration-300 ${
                  hoveredItem === item.id 
                    ? 'w-4/5 -translate-x-1/2 opacity-100' 
                    : 'w-0 -translate-x-1/2 opacity-0'
                }`} />
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2.5 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-300 group relative overflow-hidden hover:scale-110 active:scale-95"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-800 transition-transform duration-300 group-hover:rotate-12" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:rotate-45" />
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="ml-6 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:scale-105 active:scale-95"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Réserver</span>
              
              {/* Pulsing Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 animate-pulse" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-800" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-md hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <div className={`transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                {isOpen ? (
                  <X className="w-6 h-6 text-gray-800 dark:text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 hover:from-blue-50/50 hover:to-cyan-50/50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300 group flex items-center justify-between hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {item.label}
                </span>
                <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
              </button>
            ))}
            
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Réserver</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
        
        .animate-float {
          animation: float 1.2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </header>
  );
};