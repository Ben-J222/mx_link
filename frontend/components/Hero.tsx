import React from 'react';
import { Shield, Users, TrendingUp, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-20 pb-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-neon-500/20 border border-neon-500/30 mb-6">
              <Shield className="h-4 w-4 text-neon-400 mr-2" />
              <span className="text-sm font-medium text-neon-300">Sécurité Militaire</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              La Première Plateforme de
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-400 to-neon-500"> Certification Numérique</span>
              pour Motocross
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transformez un marché opaque de 450M€ en un écosystème transparent et sécurisé. 
              Certification infalsifiable, transactions 100% sécurisées, protection anti-vol.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-neon-500 hover:bg-neon-400 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                Rejoindre la Beta
              </button>
              <button className="border border-gray-600 hover:border-neon-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                En savoir plus
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-400 mb-2">300K</div>
                <div className="text-sm text-gray-400">Motocross en France</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-400 mb-2">25K</div>
                <div className="text-sm text-gray-400">Transactions/an</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-400 mb-2">2.5K</div>
                <div className="text-sm text-gray-400">Vols/an</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features Preview */}
          <div className="space-y-6">
            <div className="bg-gray-900 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-neon-500/20 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-neon-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Token Unique</h3>
                  <p className="text-gray-400">Certification infalsifiable</p>
                </div>
              </div>
              <p className="text-gray-300">
                Chaque moto obtient un token numérique unique, garantissant son authenticité et son historique.
              </p>
            </div>
            
            <div className="bg-gray-900 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-neon-500/20 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-neon-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Séquestre Automatisé</h3>
                  <p className="text-gray-400">Transactions 100% sécurisées</p>
                </div>
              </div>
              <p className="text-gray-300">
                Protection complète acheteur/vendeur avec validation multi-étapes via Stripe Connect.
              </p>
            </div>
            
            <div className="bg-gray-900 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-neon-500/20 rounded-lg mr-4">
                  <TrendingUp className="h-6 w-6 text-neon-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">IA Anti-Fraude</h3>
                  <p className="text-gray-400">Détection proactive</p>
                </div>
              </div>
              <p className="text-gray-300">
                Intelligence artificielle avancée pour identifier et bloquer les annonces suspectes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}