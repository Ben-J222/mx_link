import React, { useState } from 'react';
import { Trophy, Star, Crown, Gem, Award } from 'lucide-react';

const badges = [
  {
    name: "Bronze",
    icon: Award,
    points: "0-999",
    color: "from-magenta-400 to-magenta-600",
    bgColor: "bg-magenta-50",
    textColor: "text-magenta-800",
    benefits: [
      "3 recherches motos volées gratuites/mois",
      "Badge Bronze visible",
      "Accès forum communautaire",
      "5% de réduction première transaction"
    ]
  },
  {
    name: "Argent",
    icon: Star,
    points: "1000-4999",
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    textColor: "text-gray-800",
    benefits: [
      "Recherches motos volées illimitées",
      "20% de réduction sur commissions",
      "Support prioritaire (48h)",
      "Accès webinaires mensuels"
    ]
  },
  {
    name: "Or",
    icon: Trophy,
    points: "5000-14999",
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    benefits: [
      "40% de réduction sur commissions",
      "API limitée gratuite",
      "Accès features beta",
      "Goodies MX Link exclusifs"
    ]
  },
  {
    name: "Platine",
    icon: Crown,
    points: "15000-29999",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    benefits: [
      "50% de réduction sur commissions",
      "Account manager dédié",
      "Invitations événements physiques",
      "Accès direct fondateur"
    ]
  },
  {
    name: "Diamant",
    icon: Gem,
    points: "30000+",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    benefits: [
      "Commission réduite à vie (1%)",
      "Actions MX Link",
      "Membre conseil consultatif",
      "Statut 'Founding Member' à vie"
    ]
  }
];

const pointsActions = [
  { action: "Tokeniser sa première moto", points: 100 },
  { action: "Ami qui s'inscrit", points: 20 },
  { action: "Vente réussie", points: 40 },
  { action: "Signaler une moto volée", points: 100 },
  { action: "Aider à retrouver une moto", points: 500 },
  { action: "Parrainage réussi", points: 75 }
];

export default function RewardsSystem() {
  const [selectedBadge, setSelectedBadge] = useState(0);

  return (
    <section id="rewards" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Système de Récompenses Communautaire
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transformez chaque utilisateur en ambassadeur actif. Plus vous participez, 
            plus vous gagnez de privilèges et d'avantages exclusifs.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`${badge.bgColor} rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                selectedBadge === index ? 'ring-2 ring-magenta-500' : ''
              }`}
              onClick={() => setSelectedBadge(index)}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${badge.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                <badge.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${badge.textColor} text-center mb-2`}>
                {badge.name}
              </h3>
              <p className={`text-sm ${badge.textColor} text-center opacity-80`}>
                {badge.points} points
              </p>
            </div>
          ))}
        </div>

        {/* Selected Badge Benefits */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-16">
          <div className="flex items-center mb-6">
            <div className={`w-12 h-12 bg-gradient-to-r ${badges[selectedBadge].color} rounded-full flex items-center justify-center mr-4`}>
              {(() => {
                const SelectedIcon = badges[selectedBadge].icon;
                return <SelectedIcon className="h-6 w-6 text-white" />;
              })()}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Badge {badges[selectedBadge].name}
              </h3>
              <p className="text-gray-300">{badges[selectedBadge].points} points</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {badges[selectedBadge].benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-magenta-500 rounded-full mr-3"></div>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        {/* Points Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              Comment Gagner des Points
            </h3>
            <div className="space-y-4">
              {pointsActions.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300">{item.action}</span>
                  <span className="text-magenta-400 font-semibold">+{item.points}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              Progression Type
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-magenta-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Bronze : 3-4 mois</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Argent : 8-12 mois</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Or : 18-24 mois</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Platine : 2-3 ans</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-300">Diamant : 3+ ans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}