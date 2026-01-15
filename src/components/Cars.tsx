import { Fuel, Users, Gauge, Star, Sparkles, Shield, Zap, Calendar, MapPin, ChevronRight, Heart, Play, Eye } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CarsProps {
  onCarSelect?: (carId: number) => void;
}

const cars = [
  {
    id: 1,
    name: 'Tesla Model S Plaid',
    category: 'Électrique',
    price: '289',
    originalPrice: '349',
    image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    specs: { 
      fuel: 'Électrique', 
      seats: '5', 
      speed: '322 km/h', 
      acceleration: '2.1s',
      autonomy: '637 km',
      power: '1,020 ch',
      range: '637 km',
      torque: '1,420 Nm',
      battery: '100 kWh'
    },
    rating: 4.9,
    reviews: 248,
    features: ['Autopilot Full Self-Driving', 'Surcharge rapide 250kW', 'Écran tactile 17"', 'Système audio Premium'],
    availability: 'Disponible',
    popular: true,
    color: '#3E64FF',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'La Tesla Model S Plaid redéfinit les limites des véhicules électriques avec des performances de supercar.',
    included: ['Assurance tous risques', 'Kilométrage illimité', 'Entretien inclus'],
    requirements: ['Permis B valide', 'Carte de crédit', 'Âge minimum: 25 ans']
  },
  {
    id: 2,
    name: 'BMW M5 Competition',
    category: 'Berline Sport',
    price: '189',
    originalPrice: '229',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    specs: { 
      fuel: 'Essence', 
      seats: '5', 
      speed: '305 km/h', 
      acceleration: '3.3s',
      autonomy: '450 km',
      power: '625 ch',
      range: '450 km',
      torque: '750 Nm',
      engine: '4.4L V8 Bi-Turbo'
    },
    rating: 4.8,
    reviews: 189,
    features: ['M xDrive', 'Carbon Roof', 'Ceramic Brakes', 'Bowers & Wilkins'],
    availability: '3 jours',
    popular: true,
    color: '#000000',
    gradient: 'from-gray-800 to-gray-900',
    description: 'La quintessence de la berline sportive allemande, alliant luxe et performances brutales.',
    included: ['Assurance premium', 'Service concierge', 'Nettoyage gratuit'],
    requirements: ['Permis B valide', 'Carte de crédit', 'Âge minimum: 28 ans']
  },
  {
    id: 3,
    name: 'Mercedes-AMG GLE 63 S',
    category: 'SUV Performance',
    price: '245',
    originalPrice: '295',
    image: 'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    specs: { 
      fuel: 'Essence', 
      seats: '5', 
      speed: '280 km/h', 
      acceleration: '3.8s',
      autonomy: '420 km',
      power: '612 ch',
      range: '420 km',
      torque: '850 Nm',
      engine: '4.0L V8 Bi-Turbo'
    },
    rating: 4.9,
    reviews: 156,
    features: ['AMG Dynamic', 'Air Suspension', 'Night Package', 'Burmester'],
    availability: '1 semaine',
    popular: false,
    color: '#C0C0C0',
    gradient: 'from-silver-500 to-gray-400',
    description: 'Un SUV qui n\'a rien à envier aux supercars, avec un confort digne des modèles haut de gamme.',
    included: ['Assurance tous risques', 'Kilométrage illimité', 'Parking VIP'],
    requirements: ['Permis B valide', 'Carte de crédit', 'Âge minimum: 26 ans']
  },
  {
    id: 4,
    name: 'Audi RS7 Sportback',
    category: 'Gran Turismo',
    price: '199',
    originalPrice: '249',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    specs: { 
      fuel: 'Essence', 
      seats: '4', 
      speed: '305 km/h', 
      acceleration: '3.6s',
      autonomy: '480 km',
      power: '600 ch',
      range: '480 km',
      torque: '800 Nm',
      engine: '4.0L V8 Bi-Turbo'
    },
    rating: 4.7,
    reviews: 213,
    features: ['Quattro', 'RS Sport', 'Matrix LED', 'Bang & Olufsen'],
    availability: 'Disponible',
    popular: true,
    color: '#C9082A',
    gradient: 'from-red-600 to-rose-500',
    description: 'L\'élégance italienne alliée à la performance allemande dans un design coupé audacieux.',
    included: ['Assurance premium', 'Service 24/7', 'WiFi intégré'],
    requirements: ['Permis B valide', 'Carte de crédit', 'Âge minimum: 27 ans']
  },
  {
    id: 5,
    name: 'Porsche 911 Turbo S',
    category: 'Supercar',
    price: '399',
    originalPrice: '449',
    image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2127732/pexels-photo-2127732.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    specs: { 
      fuel: 'Essence', 
      seats: '4', 
      speed: '330 km/h', 
      acceleration: '2.7s',
      autonomy: '380 km',
      power: '650 ch',
      range: '380 km',
      torque: '800 Nm',
      engine: '3.8L Flat-6 Bi-Turbo'
    },
    rating: 5.0,
    reviews: 312,
    features: ['PDK', 'PASM', 'Ceramic Brakes', 'Sport Chrono'],
    availability: '2 jours',
    popular: true,
    color: '#FFB20F',
    gradient: 'from-yellow-500 to-orange-500',
    description: 'L\'icône ultime de la sportivité allemande, perfectionnée au fil des générations.',
    included: ['Assurance tous risques', 'Track Day optionnel', 'Concierge Porsche'],
    requirements: ['Permis B valide', 'Carte de crédit', 'Âge minimum: 30 ans']
  },
  {
    id: 6,
    name: 'Range Rover SV Autobiography',
    category: 'SUV Luxe',
    price: '295',
    originalPrice: '345',
    image: 'https://images.pexels.com/photos/3849168/pexels-photo-3849168.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/3849168/pexels-photo-3849168.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/112667/pexels-photo-112667.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    specs: { 
      fuel: 'Hybride', 
      seats: '5', 
      speed: '250 km/h', 
      acceleration: '5.8s',
      autonomy: '520 km',
      power: '565 ch',
      range: '74 km électrique',
      torque: '700 Nm',
      engine: '3.0L PHEV'
    },
    rating: 4.8,
    reviews: 178,
    features: ['SV Bespoke', 'Air Suspension', 'Executive Seats', 'Meridian'],
    availability: 'Disponible',
    popular: false,
    color: '#004225',
    gradient: 'from-green-700 to-emerald-600',
    description: 'Le summum du luxe britannique, combinant capacité tout-terrain et raffinement extrême.',
    included: ['Assurance premium', 'Service chauffeur optionnel', 'Valet parking'],
    requirements: ['Permis B valide', 'Carte de crédit', 'Âge minimum: 35 ans']
  },
  {
    id: 7,
    name: 'Lamborghini Huracán EVO',
    category: 'Hypercar',
    price: '599',
    originalPrice: '699',
    image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    specs: { 
      fuel: 'Essence', 
      seats: '2', 
      speed: '325 km/h', 
      acceleration: '2.9s',
      autonomy: '350 km',
      power: '640 ch',
      range: '350 km',
      torque: '600 Nm',
      engine: '5.2L V10'
    },
    rating: 4.9,
    reviews: 267,
    features: ['LDVI', 'ANIMA', 'Carbon Fiber', 'ALA System'],
    availability: 'Sur demande',
    popular: true,
    color: '#FF2400',
    gradient: 'from-red-500 to-orange-500',
    description: 'L\'expression ultime de la passion automobile italienne, pour une expérience sensorielle totale.',
    included: ['Assurance hypercar', 'Track instruction', 'Concierge Lamborghini'],
    requirements: ['Permis B valide', 'Carte de crédit', 'Âge minimum: 30 ans', 'Expérience supercar']
  },
  {
    id: 8,
    name: 'Rolls-Royce Ghost',
    category: 'Ultra Luxe',
    price: '899',
    originalPrice: '999',
    image: 'https://images.pexels.com/photos/164654/pexels-photo-164654.jpeg?auto=compress&cs=tinysrgb&w=1600',
    images: [
      'https://images.pexels.com/photos/164654/pexels-photo-164654.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    specs: { 
      fuel: 'Essence', 
      seats: '5', 
      speed: '250 km/h', 
      acceleration: '4.8s',
      autonomy: '500 km',
      power: '571 ch',
      range: '500 km',
      torque: '850 Nm',
      engine: '6.75L V12'
    },
    rating: 5.0,
    reviews: 89,
    features: ['Magic Carpet', 'Starlight Headliner', 'Bespoke', 'Coach Doors'],
    availability: 'Sur demande',
    popular: false,
    color: '#000000',
    gradient: 'from-gray-900 to-black',
    description: 'La quintessence du luxe automobile, où chaque détail est une œuvre d\'art.',
    included: ['Assurance tous risques exclusive', 'Service chauffeur', 'Concierge Rolls-Royce'],
    requirements: ['Permis B valide', 'Carte de crédit', 'Âge minimum: 40 ans', 'Sélection clientèle']
  }
];

export const Cars: React.FC<CarsProps> = ({ onCarSelect }) => {
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const itemsPerPage = 6;
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const categories = ['Tous', 'Électrique', 'Berline Sport', 'SUV Performance', 'Gran Turismo', 'Supercar', 'Hypercar', 'Ultra Luxe'];

  const filteredCars = cars
    .filter(car => {
      if (selectedCategory === 'Tous') return true;
      if (selectedCategory === 'Électrique') return car.specs.fuel === 'Électrique';
      return car.category === selectedCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return parseInt(a.price) - parseInt(b.price);
      if (sortBy === 'price-desc') return parseInt(b.price) - parseInt(a.price);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'power') return parseInt(b.specs.power) - parseInt(a.specs.power);
      return b.popular ? 1 : -1;
    });

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-card-enter');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.car-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [paginatedCars]);

  const handleReservation = (carId: number) => {
    console.log('Réservation pour la voiture:', carId);
    // Redirection vers la réservation
  };

  const handleWishlist = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId) 
        : [...prev, carId]
    );
  };

  const handleViewDetails = (carId: number) => {
    if (onCarSelect) {
      onCarSelect(carId);
    } else {
      console.log('Voir détails pour la voiture:', carId);
      // Redirection vers les détails
    }
  };

  const handleQuickView = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Vue rapide pour la voiture:', carId);
    // Afficher un modal de vue rapide
  };

  const handleVideoPreview = (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveVideo(carId);
    // Jouer la vidéo de présentation
  };

  return (
    <section id="cars" className="relative py-28 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-purple-50/10 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]">
          <div className="h-full w-full bg-[linear-gradient(90deg,#888_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center space-x-2 mb-6 animate-fade-in">
            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
            <span className="text-sm font-semibold tracking-wider bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FLEET D'EXCEPTION
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Véhicules
            </span>
            <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text animate-gradient bg-[length:200%_auto]">
              Premium
            </span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
            Explorez notre collection exclusive de véhicules haut de gamme. 
            Chaque modèle est méticuleusement entretenu et prêt à vous offrir une expérience inoubliable.
          </p>

          {/* Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { value: cars.length, label: 'Modèles', icon: <Zap className="w-6 h-6" /> },
              { value: '4.9', label: 'Note moyenne', icon: <Star className="w-6 h-6" /> },
              { value: '24/7', label: 'Assistance', icon: <Shield className="w-6 h-6" /> },
              { value: '100%', label: 'Satisfaction', icon: <Sparkles className="w-6 h-6" /> }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:border-blue-500/30 transition-all duration-500 group hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6 animate-fade-in-up">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg px-4 py-3 rounded-xl border border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="popular">Plus populaires</option>
              <option value="price">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
              <option value="power">Puissance</option>
            </select>
            
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white font-medium hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group">
              <MapPin className="w-5 h-5" />
              <span>Localiser</span>
            </button>
          </div>
        </div>

        {/* Cars Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {paginatedCars.map((car, index) => (
            <div
              key={car.id}
              className="car-card relative group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/5 dark:shadow-blue-900/10 border border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 cursor-pointer"
              onMouseEnter={() => setHoveredCar(car.id)}
              onMouseLeave={() => setHoveredCar(null)}
              onClick={() => handleViewDetails(car.id)}
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                transform: 'translateY(30px)'
              }}
            >
              {/* Popular Badge */}
              {car.popular && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold flex items-center space-x-1 animate-pulse-slow">
                    <Star className="w-3 h-3 fill-white" />
                    <span>POPULAIRE</span>
                  </div>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={(e) => handleWishlist(car.id, e)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(car.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>

              {/* Action Buttons */}
              <div className="absolute top-16 right-4 z-20 flex flex-col gap-2">
                {/* Quick View Button */}
                <button
                  onClick={(e) => handleQuickView(car.id, e)}
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg flex items-center justify-center hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
                  title="Vue rapide"
                >
                  <Eye className="w-5 h-5" />
                </button>

                {/* Video Preview Button */}
                <button
                  onClick={(e) => handleVideoPreview(car.id, e)}
                  className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg flex items-center justify-center hover:bg-purple-500/10 hover:text-purple-500 transition-all duration-300 transform hover:scale-110"
                  title="Voir la vidéo"
                >
                  <Play className="w-5 h-5" />
                </button>
              </div>

              {/* Car Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    hoveredCar === car.id ? 'scale-110 rotate-1' : 'scale-100'
                  }`}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Rating & Reviews */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg px-4 py-2 rounded-full flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(car.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{car.rating}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">({car.reviews})</span>
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300">
                    {car.category}
                  </span>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {car.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: car.color }} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{car.specs.fuel}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {car.price}€
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">{car.originalPrice}€</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">/jour</div>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200/50 dark:border-gray-700/50">
                  {[
                    { icon: <Fuel className="w-5 h-5" />, label: 'Énergie', value: car.specs.fuel },
                    { icon: <Users className="w-5 h-5" />, label: 'Places', value: car.specs.seats },
                    { icon: <Gauge className="w-5 h-5" />, label: 'Vitesse', value: car.specs.speed },
                  ].map((spec, idx) => (
                    <div key={idx} className="text-center group-hover:scale-105 transition-transform">
                      <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
                        {spec.icon}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{spec.label}</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Power & Acceleration Badges */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-3 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Puissance</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{car.specs.power}</div>
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-3 text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">0-100 km/h</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{car.specs.acceleration}</div>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Équipements inclus</div>
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      +{car.features.length - 2} autres
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {car.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{car.availability}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReservation(car.id);
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                    >
                      <span className="flex items-center space-x-2">
                        <span>Réserver</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-3xl transition-all duration-500 pointer-events-none" />
              
              {/* Link to Details Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <div className="px-6 py-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg text-gray-900 dark:text-white text-sm font-semibold flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Voir les détails
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredCars.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-4 mb-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ←
            </button>
            
            {Array.from({ length: Math.ceil(filteredCars.length / itemsPerPage) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentPage === idx + 1
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredCars.length / itemsPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(filteredCars.length / itemsPerPage)}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              →
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Affichage de {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCars.length)} à {Math.min(currentPage * itemsPerPage, filteredCars.length)} sur {filteredCars.length} véhicules
          {selectedCategory !== 'Tous' && ` dans la catégorie "${selectedCategory}"`}
        </div>

        {/* CTA Banner */}
        <div className="mt-24 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-cyan-900/20 rounded-3xl p-8 md:p-12 border border-blue-500/20 dark:border-blue-500/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">SERVICE PREMIUM</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Besoin d'un véhicule spécifique ?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                Notre équipe de conseillers se tient à votre disposition pour vous proposer 
                des véhicules non listés ou des demandes spéciales. Service 24/7 disponible.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => console.log('Contact conseiller')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 group flex items-center justify-center space-x-3"
              >
                <span>Contacter un conseiller</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => console.log('Demander devis')}
                className="px-8 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-500 transform hover:scale-105"
              >
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
            >
              ✕
            </button>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              {/* Placeholder pour la vidéo */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-xl">Présentation vidéo du véhicule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes card-enter {
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(5deg); }
          66% { transform: translate(-10px, 10px) rotate(-5deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, 20px) rotate(-5deg); }
          66% { transform: translate(10px, -10px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
        
        .animate-card-enter {
          animation: card-enter 0.8s ease-out forwards;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 25s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};