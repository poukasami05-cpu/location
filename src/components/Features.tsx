import { Clock, Shield, Headphones, Award, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Réservation Instantanée',
    description: 'Réservez votre véhicule en quelques clics, disponible 24h/24 et 7j/7',
    color: 'blue'
  },
  {
    icon: Shield,
    title: 'Assurance Complète',
    description: 'Protection totale incluse dans tous nos forfaits sans frais cachés',
    color: 'green'
  },
  {
    icon: Headphones,
    title: 'Support Premium',
    description: 'Une équipe dédiée disponible à tout moment pour vous assister',
    color: 'purple'
  },
  {
    icon: Award,
    title: 'Meilleure Qualité',
    description: 'Véhicules premium entretenus avec soin et vérifiés régulièrement',
    color: 'orange'
  },
  {
    icon: Zap,
    title: 'Livraison Rapide',
    description: 'Service de livraison express directement à votre porte',
    color: 'pink'
  },
  {
    icon: Globe,
    title: 'Réseau National',
    description: 'Plus de 50 agences partout en France pour vous servir',
    color: 'teal'
  }
];

const colorClasses: Record<string, { bg: string; icon: string; hover: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', icon: 'text-blue-600 dark:text-blue-400', hover: 'group-hover:bg-blue-600' },
  green: { bg: 'bg-green-100 dark:bg-green-900/30', icon: 'text-green-600 dark:text-green-400', hover: 'group-hover:bg-green-600' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', icon: 'text-purple-600 dark:text-purple-400', hover: 'group-hover:bg-purple-600' },
  orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', icon: 'text-orange-600 dark:text-orange-400', hover: 'group-hover:bg-orange-600' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-900/30', icon: 'text-pink-600 dark:text-pink-400', hover: 'group-hover:bg-pink-600' },
  teal: { bg: 'bg-teal-100 dark:bg-teal-900/30', icon: 'text-teal-600 dark:text-teal-400', hover: 'group-hover:bg-teal-600' }
};

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Pourquoi Nous Choisir
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 text-gray-900 dark:text-white">
            Services Premium
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Une expérience de location exceptionnelle avec des services haut de gamme
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color];

            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${colors.bg} ${colors.hover} rounded-xl flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className={`w-8 h-8 ${colors.icon} group-hover:text-white transition-colors duration-300`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center animate-fade-in-up">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à Commencer Votre Aventure?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez plus de 10,000 clients satisfaits et découvrez le plaisir de conduire
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Commencer Maintenant
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              En Savoir Plus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
