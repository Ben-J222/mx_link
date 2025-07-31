<?php
require_once 'vendor/autoload.php';

echo "=== TEST ENTITÉ PILOTE ===\n";

try {
    // Test 1: Chargement de la classe
    echo "Test 1: Chargement classe...\n";
    $pilote = new App\Entity\Pilote();
    echo "✅ Classe chargée: " . get_class($pilote) . "\n";
    
    // Test 2: Méthodes de base
    echo "Test 2: Méthodes de base...\n";
    $pilote->setPseudo('TestPilote');
    echo "✅ setPseudo fonctionne: " . $pilote->getPseudo() . "\n";
    
    // Test 3: Interface UserInterface
    echo "Test 3: Interface UserInterface...\n";
    $pilote->setEmail('test@example.com');
    echo "✅ getUserIdentifier: " . $pilote->getUserIdentifier() . "\n";
    
    echo "✅ TOUS LES TESTS PASSENT\n";
    
} catch (Exception $e) {
    echo "❌ ERREUR: " . $e->getMessage() . "\n";
    echo "❌ Fichier: " . $e->getFile() . "\n";
    echo "❌ Ligne: " . $e->getLine() . "\n";
}