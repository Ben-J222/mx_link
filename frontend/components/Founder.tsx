import React from 'react';
import { Shield, Award, Users, Target } from 'lucide-react';

export default function Founder() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-6">
              <Shield className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">Fondateur & Vision</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Benjamin Jelmoni
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 italic">
              "De la sécurité nationale à la sécurité numérique"
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-lg mr-4 mt-1">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    10 ans dans la Sécurité Critique
                  </h3>
                  <p className="text-gray-600">
                    Armée de l'Air, Gendarmerie, Sûreté Nucléaire - Expertise en environnements haute sécurité
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-magenta-100 rounded-lg mr-4 mt-1">
                  <Target className="h-5 w-5 text-magenta-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Formation Développeur 2024
                  </h3>
                  <p className="text-gray-600">
                    Développeur Web & Web Mobile RNCP37674 - CCI Villefontaine
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-red-100 rounded-lg mr-4 mt-1">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    30 ans de Passion Motocross
                  </h3>
                  <p className="text-gray-600">
                    Connaissance intime du marché, des besoins et des problématiques terrain
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-magenta-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pourquoi MX Link ?</h3>
              <p className="text-gray-700 italic">
                "J'ai vu trop d'amis se faire voler leur moto ou acheter des véhicules volés sans le savoir. 
                Mon expertise en sécurité critique combinée à ma passion pour le motocross m'a convaincu 
                qu'une solution technologique pouvait transformer ce marché."
              </p>
            </div>
          </div>

          {/* Right - Profile & Stats */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-magenta-900 rounded-2xl p-8 text-white">
              <div className="w-24 h-24 bg-gradient-to-r from-magenta-400 to-pink-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold">BJ</span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Benjamin Jelmoni</h3>
                <p className="text-magenta-300">Fondateur & CEO</p>
                <p className="text-gray-300 text-sm">35 ans</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Expérience Sécurité</span>
                  <span className="text-magenta-300 font-semibold">10 ans</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Passion Motocross</span>
                  <span className="text-magenta-300 font-semibold">30 ans</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Formation Tech</span>
                  <span className="text-magenta-300 font-semibold">2024</span>
                </div>
              </div>
            </div>
            
            {/* Vision Box */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vision 2027</h3>
              <p className="text-gray-700 mb-4">
                "MX Link deviendra LA référence de confiance pour tous les véhicules de loisir non-immatriculés"
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-magenta-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Leader français motocross</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Expansion quad & jet-ski</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">100,000 utilisateurs actifs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}