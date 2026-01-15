import { ArrowRight, MapPin, Calendar, Shield, Sparkles, Star, ChevronRight, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
        
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-600/10 via-transparent to-blue-600/10 rounded-full blur-3xl animate-float"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-shimmer"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full group hover:scale-105 transition-all duration-300 animate-glow">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Collection Exclusive 2026             </span>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Main Title with Stagger Animation */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
                <span className="block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Excellence
                  </span>
                </span>
                <span className="block text-white mt-2">
                  Automobile
                </span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>
                <p className="text-lg text-gray-400">Redéfinir le luxe</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Expérimentez l'ultime en matière de location automobile. 
              Des véhicules d'exception, un service sur mesure et une 
              expérience inégalée à chaque trajet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span>Réserver Maintenant</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-gray-600 hover:scale-105">
                <span className="flex items-center gap-2">
                  Explorer la Collection
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              {[
                { icon: MapPin, label: "Agences Premium", value: "50+", color: "from-blue-500 to-cyan-500" },
                { icon: Calendar, label: "Disponibilité", value: "24/7", color: "from-purple-500 to-pink-500" },
                { icon: Shield, label: "Sécurité", value: "100%", color: "from-green-500 to-emerald-500" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`group p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} w-fit mb-3`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{feature.value}</div>
                  <div className="text-sm text-gray-400">{feature.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-white font-semibold">4.9/5</span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>+10,000 clients satisfaits</span>
              </div>
            </div>
          </div>

          {/* Right Content - Car Showcase */}
          <div className={`relative ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Main Car Image with 3D Effect */}
            <div className="relative z-20">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse"></div>
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-gray-800 group hover:border-blue-500/50 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                
                <img
                  src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Luxury Car"
                  className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-1000"
                  loading="eager"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full backdrop-blur-sm animate-bounce-slow">
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      ÉLECTRIQUE
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 z-30">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative px-8 py-6 bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        99€
                      </div>
                      <div className="text-sm text-gray-400 mt-1">/jour</div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="text-xs text-gray-500">Inclus: Assurance Premium • Kilométrage Illimité</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ambient Light Effect */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin-slow"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-blue-500/20 rounded-full animate-spin-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-purple-500/20 rounded-full animate-spin-slow reverse"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-gray-400">Découvrir</span>
          <div className="w-px h-8 bg-gradient-to-b from-blue-500 to-transparent"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow.reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};