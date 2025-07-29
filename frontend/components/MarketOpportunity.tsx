import React from 'react';
import { TrendingUp, Target, Users, DollarSign } from 'lucide-react';

export default function MarketOpportunity() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Un Marché de 450M€ à Transformer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Le marché motocross français reste largement opaque et non-digitalisé. 
            Une opportunité unique de créer un écosystème transparent et sécurisé.
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <div className="p-3 bg-gradient-to-r from-magenta-500 to-pink-500 rounded-lg inline-block mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">300K</div>
            <div className="text-gray-600">Motocross en circulation</div>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg inline-block mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">25K</div>
            <div className="text-gray-600">Transactions par an</div>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg inline-block mb-4">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">6.5K€</div>
            <div className="text-gray-600">Prix moyen occasion</div>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg inline-block mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">25%</div>
            <div className="text-gray-600">Craignent l'arnaque</div>
          </div>
        </div>

        {/* Market Breakdown */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Opportunité de Marché
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-magenta-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Marché Total France</span>
                    <span className="font-semibold text-gray-900">450M€</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-magenta-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Marché Adressable (30%)</span>
                    <span className="font-semibold text-gray-900">135M€</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">Objectif 3 ans (3%)</span>
                    <span className="font-semibold text-gray-900">4M€</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Problèmes Actuels
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">2,500 vols déclarés/an</h4>
                  <p className="text-gray-600 text-sm">Aucun système de traçabilité centralisé</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">25% craignent l'arnaque</h4>
                  <p className="text-gray-600 text-sm">Transactions non-sécurisées, pas de protection</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Marché opaque</h4>
                  <p className="text-gray-600 text-sm">Pas d'historique, pas de certification</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Communauté dispersée</h4>
                  <p className="text-gray-600 text-sm">Pas de plateforme centralisée</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}