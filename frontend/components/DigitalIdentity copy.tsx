import React from 'react';
import { Shield, Camera, FileText, CheckCircle, Star, Award } from 'lucide-react';

const certificationLevels = [
  {
    name: "Bronze",
    icon: Award,
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    features: [
      "Marque, modèle, année, cylindrée",
      "Numéros de cadre et moteur",
      "3 photos minimum",
      "Coordonnées propriétaire"
    ]
  },
  {
    name: "Argent",
    icon: Star,
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    textColor: "text-gray-800",
    features: [
      "Toutes les infos Bronze +",
      "6-10 photos haute qualité",
      "Historique de propriété",
      "Modifications déclarées",
      "Kilométrage"
    ]
  },
  {
    name: "Or",
    icon: CheckCircle,
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    features: [
      "Toutes les infos Argent +",
      "Vérification garage partenaire",
      "Historique entretien complet",
      "Rapport d'inspection",
      "Garantie authenticité"
    ]
  }
];

export default function DigitalIdentity() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-magenta-100 border border-magenta-200 mb-6">
            <Shield className="h-5 w-5 text-magenta-600 mr-2" />
            <span className="text-sm font-medium text-magenta-800">Identité Numérique</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Chaque Moto a son Jumeau Digital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une identité numérique unique et infalsifiable pour chaque motocross, 
            créant un "passeport digital" complet et vérifiable.
          </p>
        </div>

        {/* Tokenisation Process */}
        <div className="bg-gradient-to-r from-magenta-50 to-pink-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Processus de Tokenisation Intelligente
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-magenta-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Capture</h4>
              <p className="text-sm text-gray-600">Photos et données techniques de la moto</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Vérification</h4>
              <p className="text-sm text-gray-600">IA vérifie cohérence et authenticité</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Génération</h4>
              <p className="text-sm text-gray-600">Token unique et document PDF officiel</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Certification</h4>
              <p className="text-sm text-gray-600">Identité permanente et infalsifiable</p>
            </div>
          </div>
        </div>

        {/* Certification Levels */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Niveaux de Certification
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {certificationLevels.map((level, index) => (
              <div key={index} className={`${level.bgColor} rounded-xl p-8 border-2 border-transparent hover:border-magenta-200 transition-all duration-300`}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${level.color} rounded-full flex items-center justify-center mr-4`}>
                    <level.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className={`text-xl font-bold ${level.textColor}`}>{level.name}</h4>
                </div>
                
                <ul className="space-y-3">
                  {level.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-magenta-500 rounded-full mr-3 mt-2"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Bénéfices pour Tous
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Vendeurs</h4>
              <p className="text-gray-600">Valorisation maximale avec un dossier complet et vérifiable</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Acheteurs</h4>
              <p className="text-gray-600">Transparence totale sur l'historique et l'authenticité</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-magenta-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Communauté</h4>
              <p className="text-gray-600">Base de données fiable et vérifiée pour tous</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}