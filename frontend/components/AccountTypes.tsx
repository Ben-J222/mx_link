import React from 'react';
import { User, UserCheck, Briefcase, Crown, Zap } from 'lucide-react';

const accountTypes = [
  {
    name: "Visiteur",
    icon: User,
    price: "Gratuit",
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    textColor: "text-gray-800",
    features: [
      "Consultation des annonces publiques",
      "Lecture du blog et actualités",
      "Accès limité aux fonctionnalités"
    ],
    limitations: ["Pas de recherche anti-vol", "Pas de messagerie", "Pas de création d'annonces"]
  },
  {
    name: "Utilisateur",
    icon: UserCheck,
    price: "Gratuit",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    features: [
      "Toutes les fonctions Visiteur +",
      "Création d'annonces",
      "Messagerie sécurisée",
      "Système de points et récompenses",
      "Alertes personnalisées"
    ],
    popular: false
  },
  {
    name: "Utilisateur Vérifié",
    icon: Zap,
    price: "Gratuit + Vérification",
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    features: [
      "Toutes les fonctions Utilisateur +",
      "Badge 'Vérifié' sur le profil",
      "Priorité support client",
      "Accès features beta"
    ],
    popular: true
  },
  {
    name: "Professionnel",
    icon: Briefcase,
    price: "49€/mois",
    color: "from-magenta-400 to-magenta-600",
    bgColor: "bg-magenta-50",
    textColor: "text-magenta-800",
    features: [
      "Toutes les fonctions Vérifié +",
      "Multi-annonces simultanées",
      "Tableau de bord analytics",
      "Commission réduite (1.5% au lieu de 2.5%)",
      "Page garage dédiée",
      "Certification officielle"
    ],
    popular: false
  },
  {
    name: "Partenaire",
    icon: Crown,
    price: "Sur mesure",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    features: [
      "Accès API complet",
      "Intégration système",
      "Support dédié 24/7",
      "Tarifs négociés",
      "Formation équipe",
      "SLA garanti"
    ],
    popular: false
  }
];

const dashboardFeatures = [
  {
    type: "Vendeur",
    icon: "📈",
    features: [
      "Performance de vos annonces",
      "Messages en attente",
      "Alertes de prix marché",
      "Statistiques de vues"
    ]
  },
  {
    type: "Acheteur",
    icon: "🔍",
    features: [
      "Nouvelles annonces correspondantes",
      "Baisses de prix sur vos favoris",
      "Alertes motos volées",
      "Historique de recherche"
    ]
  },
  {
    type: "Communauté",
    icon: "🏆",
    features: [
      "Progression points/badges",
      "Classement mensuel",
      "Prochaines récompenses",
      "Défis à relever"
    ]
  }
];

export default function AccountTypes() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comptes Adaptés à Chaque Besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Du visiteur occasionnel au professionnel confirmé, 
            choisissez le niveau qui correspond à votre utilisation.
          </p>
        </div>

        {/* Account Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {accountTypes.map((account, index) => (
            <div key={index} className={`${account.bgColor} rounded-xl p-8 relative ${account.popular ? 'ring-2 ring-magenta-500' : ''}`}>
              {account.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-magenta-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommandé
                  </span>
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${account.color} rounded-lg flex items-center justify-center mr-4`}>
                  <account.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${account.textColor}`}>{account.name}</h3>
                  <p className="text-gray-600 font-semibold">{account.price}</p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {account.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {account.limitations && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Limitations :</h4>
                  <ul className="space-y-1">
                    {account.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-600 text-xs">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-colors ${
                account.popular 
                  ? 'bg-magenta-500 hover:bg-magenta-600 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-300'
              }`}>
                {account.name === 'Partenaire' ? 'Nous Contacter' : 'Choisir ce Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Smart Dashboard */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Espace Personnel Intelligent
          </h3>
          <p className="text-gray-600 text-center mb-8">
            Le tableau de bord s'adapte automatiquement selon votre activité
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {dashboardFeatures.map((dashboard, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{dashboard.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Si vous {dashboard.type.toLowerCase()}</h4>
                
                <ul className="space-y-2">
                  {dashboard.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-magenta-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}