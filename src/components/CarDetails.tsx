import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, Fuel, Users, Gauge, Calendar, Shield, Zap, 
  Settings, Car, MapPin, CreditCard, CheckCircle, X, Battery, 
  Cpu, Wind, Droplets, Wifi, Volume2, Sparkles, Thermometer, 
  GitCompare, BarChart, Clock, Package, Key, ShieldCheck, 
  ChevronRight, ChevronLeft, Maximize2, Heart, Share2, Phone, 
  MessageCircle, AlertCircle, Play, BookOpen, FileText, Globe,
  Navigation, Radio, AirVent, Sun, Snowflake, Droplet, Power,
  BatteryCharging, ZapOff, Percent, Award, Truck, Home,
  UserCheck, ClipboardCheck, Smartphone, CreditCard as Card,
  Euro, Tag, Clock as ClockIcon, TrendingUp, Award as Trophy,
  Shield as ShieldIcon, Cpu as CpuIcon, Wrench, Coins
} from 'lucide-react';

// Base de données complète des voitures
const carDatabase = [
  {
    id: 1,
    name: 'Tesla Model S Plaid',
    category: 'Électrique Premium',
    price: '289',
    dailyPrice: '289',
    weeklyPrice: '1,799',
    monthlyPrice: '6,499',
    discount: '17%',
    image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1920',
    images: [
      'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1920',
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1920',
      'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1920',
      'https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=1920',
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1920',
    ],
    specs: { 
      fuel: 'Électrique 100%', 
      seats: '5', 
      speed: '322 km/h', 
      acceleration: '2.1s 0-100', 
      range: '637 km',
      power: '1,020 ch',
      torque: '1,420 Nm',
      battery: '100 kWh',
      charge: '250 kW Supercharge',
      consumption: '18 kWh/100km',
      weight: '2,162 kg',
      dimensions: '4,979 x 1,964 x 1,445 mm',
      trunk: '793 L',
      warranty: '4 ans / 80,000 km'
    },
    rating: 4.9,
    reviews: 248,
    features: [
      'Autopilot Full Self-Driving',
      'Surcharge rapide 250kW',
      'Écran tactile 17" Ultra HD',
      'Système audio Premium 22 haut-parleurs',
      'Toit en verre panoramique',
      'Système de filtration HEPA',
      'Mode Ludicrous+',
      'Plaque d\'immatriculation Tesla'
    ],
    equipment: [
      { name: 'Système audio Premium', included: true },
      { name: 'Toit panoramique en verre', included: true },
      { name: 'Sièges chauffants/ventilés', included: true },
      { name: 'Volant chauffant', included: true },
      { name: 'Caméras 360°', included: true },
      { name: 'Park Assist', included: true },
      { name: 'WiFi intégré', included: true },
      { name: 'Apple CarPlay/Android Auto', included: true }
    ],
    color: '#3E64FF',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'La Tesla Model S Plaid redéfinit les limites des véhicules électriques avec des performances de supercar dignes des meilleures hypercars, une autonomie exceptionnelle et des technologies de pointe qui anticipent l\'avenir de la mobilité.',
    availability: 'Disponible immédiatement',
    location: 'Paris - Champs-Élysées',
    included: [
      'Assurance tous risques Premium',
      'Kilométrage illimité',
      'Entretien et maintenance inclus',
      'Assistance 24/7 avec service de dépannage',
      'Livraison à domicile gratuite',
      'Nettoyage intérieur/extérieur avant livraison',
      'Contrôle technique à jour',
      'Vignette Crit\'Air incluse'
    ],
    requirements: [
      { requirement: 'Permis B valide', icon: <Key className="w-4 h-4" /> },
      { requirement: 'Carte de crédit', icon: <Card className="w-4 h-4" /> },
      { requirement: 'Âge minimum: 25 ans', icon: <UserCheck className="w-4 h-4" /> },
      { requirement: 'Caution: 3,000€', icon: <ShieldCheck className="w-4 h-4" /> },
      { requirement: 'Permis détenu depuis 3 ans', icon: <ClipboardCheck className="w-4 h-4" /> }
    ],
    reviewsList: [
      { name: 'Alexandre M.', rating: 5, comment: 'Expérience incroyable ! Le Plaid est une véritable fusée.', date: '2024-01-15' },
      { name: 'Sophie L.', rating: 5, comment: 'Service impeccable et voiture exceptionnelle. Je recommande !', date: '2024-01-10' },
      { name: 'Thomas B.', rating: 4, comment: 'Très bonne prestation, juste un peu cher mais ça vaut le coup.', date: '2024-01-05' }
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example',
    popularity: 98,
    reservations: 156
  },
  // Vous pouvez ajouter les autres voitures de la même manière
];

interface CarDetailsProps {
  carId?: number | null;
  onBack?: () => void;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ carId = 1, onBack }) => {
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [bookingDates, setBookingDates] = useState({ start: '', end: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('Paris - Champs-Élysées');
  const [insuranceOption, setInsuranceOption] = useState('premium');
  
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundCar = carDatabase.find(c => c.id === (carId || 1));
      setCar(foundCar || carDatabase[0]);
      setIsLoading(false);
      
      // Animation d'entrée
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.opacity = '1';
          imageRef.current.style.transform = 'translateX(0)';
        }
        if (detailsRef.current) {
          detailsRef.current.style.opacity = '1';
          detailsRef.current.style.transform = 'translateX(0)';
        }
      }, 100);
    }, 800);

    return () => clearTimeout(timer);
  }, [carId]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/cars');
    }
  };

  const handleBook = () => {
    setShowBookingModal(true);
    setBookingStep(1);
  };

  const calculateTotal = () => {
    if (bookingDates.start && bookingDates.end) {
      const start = new Date(bookingDates.start);
      const end = new Date(bookingDates.end);
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      return diffDays * parseInt(car.dailyPrice);
    }
    return parseInt(car.dailyPrice) * 3;
  };

  const calculateInsurance = () => {
    const base = calculateTotal();
    switch (insuranceOption) {
      case 'basic': return base * 0.1;
      case 'premium': return base * 0.15;
      case 'ultimate': return base * 0.2;
      default: return 0;
    }
  };

  const handleNextStep = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
    } else {
      // Simulation de réservation
      alert('Réservation confirmée ! Vous recevrez un email de confirmation.');
      setShowBookingModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin-slow" />
            <div className="absolute inset-8 border-4 border-transparent border-t-purple-500 border-r-cyan-500 rounded-full animate-spin-reverse-slow" />
            <Car className="w-20 h-20 absolute inset-0 m-auto text-blue-500 animate-pulse" />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
            Chargement des détails...
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Car className="w-32 h-32 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Véhicule non trouvé
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
          Désolé, le véhicule que vous recherchez n'est pas disponible.
        </p>
        <button
          onClick={handleBack}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
        >
          Retour à la flotte
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="fixed top-8 left-8 z-50 flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl font-semibold text-gray-800 dark:text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white dark:hover:bg-gray-700 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Retour</span>
        </button>

        {/* Action Buttons */}
        <div className="fixed top-8 right-8 z-50 flex gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-3 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 ${
              isFavorite 
                ? 'bg-red-500/20 border-red-500/30 text-red-500' 
                : 'bg-white/80 dark:bg-gray-800/80 border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300'
            } border shadow-xl`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
          </button>
          <button className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 shadow-xl hover:scale-110 transition-all duration-300">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-12">
            {['Accueil', 'Flotte', car.name].map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                <button
                  onClick={index < 2 ? handleBack : undefined}
                  className={`transition-colors ${
                    index === 2 
                      ? 'text-gray-900 dark:text-white font-semibold' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item}
                </button>
                {index < 2 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Images & Visual */}
            <div 
              ref={imageRef}
              className="space-y-8 opacity-0 transform -translate-x-10 transition-all duration-1000"
            >
              {/* Main Image with Effects */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 dark:border-gray-700/30 shadow-3xl group">
                <img
                  src={car.images[selectedImage]}
                  alt={car.name}
                  className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Image Navigation */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  {car.images.map((_: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        selectedImage === index 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Quick Actions */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-lg text-white text-sm font-semibold">
                    {car.category}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-semibold">{car.rating}</span>
                    <span className="text-white/70">({car.reviews})</span>
                  </div>
                </div>
                
                {/* Fullscreen Button */}
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-black/60 backdrop-blur-lg text-white hover:bg-black/80 transition-all hover:scale-110"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                
                {/* Video Button */}
                <button className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <span>Voir vidéo</span>
                </button>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-5 gap-4">
                {car.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedImage === index
                        ? 'border-blue-500 ring-2 ring-blue-500/30'
                        : 'border-gray-300/50 dark:border-gray-700/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-24 object-cover" />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Specs Card */}
              <div className="bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <BarChart className="w-5 h-5 text-blue-500" />
                  Spécifications clés
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Zap className="w-5 h-5" />, label: 'Puissance', value: car.specs.power },
                    { icon: <Gauge className="w-5 h-5" />, label: '0-100 km/h', value: car.specs.acceleration },
                    { icon: <BatteryCharging className="w-5 h-5" />, label: 'Autonomie', value: car.specs.range },
                    { icon: <Fuel className="w-5 h-5" />, label: 'Énergie', value: car.specs.fuel },
                    { icon: <Thermometer className="w-5 h-5" />, label: 'Consommation', value: car.specs.consumption },
                    { icon: <Users className="w-5 h-5" />, label: 'Places', value: car.specs.seats },
                  ].map((spec, index) => (
                    <div key={index} className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:scale-105 transition-all">
                      <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400">
                        {spec.icon}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{spec.label}</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Details & Booking */}
            <div 
              ref={detailsRef}
              className="space-y-8 opacity-0 transform translate-x-10 transition-all duration-1000 delay-300"
            >
              {/* Header with Title & Price */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
                      {car.name}
                    </h1>
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 font-semibold">
                        {car.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(car.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{car.rating}</span>
                        <span className="text-gray-600 dark:text-gray-400">({car.reviews} avis)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      {car.price}€
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">/jour</div>
                    {car.discount && (
                      <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold mt-2">
                        Économisez {car.discount}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {car.description}
                </p>

                {/* Quick Actions */}
                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3 group">
                    <Calendar className="w-5 h-5" />
                    <span>Réserver maintenant</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-300/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex gap-1 overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Aperçu', icon: <Eye className="w-4 h-4" /> },
                    { id: 'specs', label: 'Spécifications', icon: <Settings className="w-4 h-4" /> },
                    { id: 'features', label: 'Équipements', icon: <Package className="w-4 h-4" /> },
                    { id: 'pricing', label: 'Tarifs', icon: <Euro className="w-4 h-4" /> },
                    { id: 'reviews', label: 'Avis', icon: <Star className="w-4 h-4" /> },
                    { id: 'location', label: 'Localisation', icon: <MapPin className="w-4 h-4" /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-3 font-semibold whitespace-nowrap transition-all duration-300 border-b-2 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { icon: <ClockIcon className="w-6 h-6" />, label: 'Disponibilité', value: car.availability, color: 'text-green-500' },
                        { icon: <Truck className="w-6 h-6" />, label: 'Livraison', value: 'Gratuite', color: 'text-blue-500' },
                        { icon: <ShieldIcon className="w-6 h-6" />, label: 'Assurance', value: 'Premium', color: 'text-purple-500' },
                        { icon: <TrendingUp className="w-6 h-6" />, label: 'Popularité', value: `${car.popularity}%`, color: 'text-yellow-500' },
                        { icon: <Trophy className="w-6 h-6" />, label: 'Réservations', value: car.reservations, color: 'text-cyan-500' },
                        { icon: <CpuIcon className="w-6 h-6" />, label: 'État', value: 'Neuf', color: 'text-emerald-500' },
                      ].map((item, index) => (
                        <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                          <div className={`flex items-center gap-3 mb-2 ${item.color}`}>
                            {item.icon}
                            <div className="font-semibold">{item.label}</div>
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700/30">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                        Ce qui est inclus
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {car.included.map((item: string, index: number) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(car.specs).map(([key, value], index) => (
                        <div key={key} className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {value as string}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {car.equipment.map((item: any, index: number) => (
                        <div key={index} className={`flex items-center gap-3 p-4 rounded-xl ${item.included ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                          {item.included ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400" />
                          )}
                          <span className={item.included ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'pricing' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { period: 'Par jour', price: `${car.dailyPrice}€`, discount: null },
                        { period: 'Par semaine', price: `${car.weeklyPrice}€`, discount: '-15%' },
                        { period: 'Par mois', price: `${car.monthlyPrice}€`, discount: '-30%' },
                      ].map((plan, index) => (
                        <div key={index} className={`text-center p-6 rounded-2xl border-2 ${index === 1 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-gray-700'} hover:scale-105 transition-all`}>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{plan.period}</div>
                          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{plan.price}</div>
                          {plan.discount && (
                            <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold">
                              {plan.discount} économisés
                            </div>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">TVA incluse</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700/30">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <Coins className="w-6 h-6 text-purple-500" />
                        Simulateur de prix
                      </h4>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <input
                            type="number"
                            placeholder="Nombre de jours"
                            className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                            defaultValue="3"
                          />
                          <div className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold">
                            Total: {parseInt(car.dailyPrice) * 3}€
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          * Assurance et services inclus dans le prix
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {car.reviewsList.map((review: any, index: number) => (
                      <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{review.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'location' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-700/30">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-emerald-500" />
                        Points de retrait
                      </h4>
                      <div className="space-y-4">
                        {['Paris - Champs-Élysées', 'Lyon - Part-Dieu', 'Nice - Promenade', 'Bordeaux - Mérignac'].map((location, index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                                <Car className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">{location}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Disponible aujourd'hui</div>
                              </div>
                            </div>
                            <button className={`px-4 py-2 rounded-lg ${index === 0 ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                              {index === 0 ? 'Sélectionné' : 'Sélectionner'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fixed Booking Bar */}
              <div className="sticky bottom-0 bg-gradient-to-r from-white via-white to-white/95 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 p-6 -mx-8 -mb-8 mt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">{car.price}€</span>
                      <span className="text-gray-600 dark:text-gray-400">/jour</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Assurance tous risques incluse</div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate('/cars')}
                      className="px-8 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105"
                    >
                      Comparer
                    </button>
                    <button
                      onClick={handleBook}
                      className="px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold hover:shadow-2xl transition-all hover:scale-105 group flex items-center gap-3"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Réserver maintenant</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={car.images[selectedImage]}
            alt={car.name}
            className="max-w-full max-h-[90vh] rounded-xl"
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {car.images.map((_: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  selectedImage === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-3xl">
            {/* Progress Bar */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
              <div 
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${(bookingStep / 4) * 100}%` }}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="p-8">
              {/* Step 1: Dates */}
              {bookingStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Choisissez vos dates
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Sélectionnez la période de location pour votre {car.name}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Date de début
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={bookingDates.start}
                          onChange={(e) => setBookingDates({...bookingDates, start: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Date de fin
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={bookingDates.end}
                          onChange={(e) => setBookingDates({...bookingDates, end: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {bookingDates.start && bookingDates.end && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700/30">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Durée totale</div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {Math.ceil((new Date(bookingDates.end).getTime() - new Date(bookingDates.start).getTime()) / (1000 * 3600 * 24))} jours
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Coût total</div>
                          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {calculateTotal()}€
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleNextStep}
                    disabled={!bookingDates.start || !bookingDates.end}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              )}

              {/* Step 2: Options */}
              {bookingStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Options additionnelles
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Personnalisez votre location avec nos options premium
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Assurance Basic', price: '10% du total', description: 'Couverture minimale', value: 'basic' },
                      { name: 'Assurance Premium', price: '15% du total', description: 'Couverture complète', value: 'premium' },
                      { name: 'Assurance Ultimate', price: '20% du total', description: 'Tous risques + franchise 0€', value: 'ultimate' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          insuranceOption === option.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="insurance"
                            value={option.value}
                            checked={insuranceOption === option.value}
                            onChange={(e) => setInsuranceOption(e.target.value)}
                            className="w-5 h-5 text-blue-600"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{option.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{option.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">{option.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="flex-1 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:shadow-xl transition-all"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Location */}
              {bookingStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Lieu de retrait
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choisissez où récupérer votre véhicule
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      'Paris - Champs-Élysées',
                      'Lyon - Part-Dieu',
                      'Nice - Promenade des Anglais',
                      'Bordeaux - Mérignac',
                      'Livraison à domicile (+50€)'
                    ].map((location) => (
                      <label
                        key={location}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedLocation === location
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="location"
                            value={location}
                            checked={selectedLocation === location}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="w-5 h-5 text-blue-600"
                          />
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <div className="font-semibold text-gray-900 dark:text-white">{location}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {location.includes('domicile') ? '+50€' : 'Gratuit'}
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setBookingStep(2)}
                      className="flex-1 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:shadow-xl transition-all"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {bookingStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Récapitulatif
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Vérifiez les détails de votre réservation
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Détails de la réservation
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Véhicule</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{car.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Période</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {bookingDates.start} au {bookingDates.end}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Durée</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.ceil((new Date(bookingDates.end).getTime() - new Date(bookingDates.start).getTime()) / (1000 * 3600 * 24))} jours
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Lieu de retrait</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{selectedLocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Détails du paiement
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Location</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{calculateTotal()}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Assurance</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{calculateInsurance()}€</span>
                        </div>
                        {selectedLocation.includes('domicile') && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Livraison à domicile</span>
                            <span className="font-semibold text-gray-900 dark:text-white">50€</span>
                          </div>
                        )}
                        <div className="border-t border-gray-300 dark:border-gray-700 pt-3 mt-3">
                          <div className="flex justify-between">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                              {calculateTotal() + calculateInsurance() + (selectedLocation.includes('domicile') ? 50 : 0)}€
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setBookingStep(3)}
                      className="flex-1 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:shadow-xl transition-all flex items-center justify-center gap-3"
                    >
                      <CreditCard className="w-5 h-5" />
                      Payer et confirmer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 4s linear infinite;
        }
      `}</style>
    </>
  );
};

// Composant Eye manquant
const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);