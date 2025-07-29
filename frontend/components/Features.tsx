import React from 'react';
import { Shield, DollarSign, Users, Zap, Eye, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Certification Numérique",
    description: "Token unique par moto, document juridiquement cadré, historique inaltérable",
    highlights: ["Vérification instantanée", "Blockchain-free", "Conformité légale"]
  },
  {
    icon: DollarSign,
    title: "Transactions Sécurisées",
    description: "Séquestre automatique, validation multi-étapes, protection acheteur/vendeur",
    highlights: ["Stripe Connect", "Résolution litiges", "Remboursement garanti"]
  },
  {
    icon: Eye,
    title: "Protection Anti-Vol",
    description: "Base collaborative temps réel, alertes géolocalisées, API forces de l'ordre",
    highlights: ["Alertes communautaires", "Signalement instantané", "Géolocalisation"]
  },
  {
    icon: Users,
    title: "Réseau Communautaire",
    description: "Système de récompenses, ambassadeurs, gamification avancée",
    highlights: ["5 niveaux de badges", "Récompenses exclusives", "Effet réseau"]
  },
  {
    icon: Zap,
    title: "IA Anti-Fraude",
    description: "Détection proactive des annonces suspectes, analyse comportementale",
    highlights: ["Machine Learning", "Analyse temps réel", "Prévention fraudes"]
  },
  {
    icon: Award,
    title: "Standards Militaires",
    description: "Sécurité niveau nucléaire, chiffrement AES256, audit trails immutables",
    highlights: ["Zero Trust", "MFA obligatoire", "Penetration testing"]
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Une Solution Complète et Sécurisée
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            MX Link combine expertise militaire et passion motocross pour créer la première plateforme 
            de certification numérique dédiée aux motos non-immatriculées.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-neon-500 to-neon-400 rounded-lg mr-4">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-neon-500 rounded-full mr-3"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-neon-500 to-neon-400 rounded-2xl p-8 text-black">
            <h3 className="text-2xl font-bold mb-4 text-black">
              Prêt à Révolutionner Vos Transactions Motocross ?
            </h3>
            <p className="text-lg mb-6 opacity-80 text-black">
              Rejoignez les early adopters et façonnez l'avenir du marché motocross français.
            </p>
            <button className="bg-black text-neon-500 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors">
              Demander un Accès Beta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}