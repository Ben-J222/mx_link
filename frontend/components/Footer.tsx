import React from 'react';
import { Zap, Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-gradient-to-r from-neon-500 to-neon-400 rounded-lg">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold">MX Link</h3>
                <p className="text-sm text-gray-400">Certification Numérique</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              La première plateforme de certification numérique pour motocross non-immatriculées, 
              développée selon les standards de sécurité militaire.
            </p>
            <div className="flex items-center text-gray-400">
              <Shield className="h-4 w-4 mr-2" />
              <span className="text-sm">Sécurité Militaire</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-neon-400 transition-colors">Fonctionnalités</a></li>
              <li><a href="#security" className="text-gray-400 hover:text-neon-400 transition-colors">Sécurité</a></li>
              <li><a href="#rewards" className="text-gray-400 hover:text-neon-400 transition-colors">Récompenses</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-neon-400 transition-colors">À propos</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Certification Numérique</span></li>
              <li><span className="text-gray-400">Transactions Sécurisées</span></li>
              <li><span className="text-gray-400">Protection Anti-Vol</span></li>
              <li><span className="text-gray-400">Réseau Communautaire</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">contact@mx-link.fr</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+33 (0)X XX XX XX XX</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">France</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 MX Link. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-neon-400 transition-colors text-sm">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-400 transition-colors text-sm">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-400 transition-colors text-sm">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}