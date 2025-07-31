<?php

namespace App\Controller\Api;

use App\Entity\Pilote;
use App\Repository\PiloteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api', name: 'api_')]
final class PiloteController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ValidatorInterface $validator,
        private UserPasswordHasherInterface $passwordHasher,
        private PiloteRepository $piloteRepository
    ) {}

    /**
     * Inscription d'un nouveau pilote
     * POST /api/pilotes
     */
    #[Route('/pilotes', name: 'pilote_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        // Créer le pilote
        $pilote = new Pilote();
        
        try {
            // Données de base
            $pilote->setPseudo($data['pseudo'] ?? '');
            $pilote->setEmail($data['email'] ?? '');
            $pilote->setNom($data['nom'] ?? '');
            $pilote->setPrenom($data['prenom'] ?? '');
            $pilote->setPortable($data['portable'] ?? '');
            $pilote->setSexe($data['sexe'] ?? '');
            $pilote->setNomRue($data['nomRue'] ?? '');
            $pilote->setCodePostal($data['codePostal'] ?? '');
            $pilote->setVille($data['ville'] ?? '');
            $pilote->setLieuNaissance($data['lieuNaissance'] ?? '');
            
            // Champs optionnels
            if (isset($data['numRue'])) {
                $pilote->setNumRue($data['numRue']);
            }
            if (isset($data['complementAdresse'])) {
                $pilote->setComplementAdresse($data['complementAdresse']);
            }
            
            // Date de naissance
            if (isset($data['dateNaissance'])) {
                $dateNaissance = new \DateTimeImmutable($data['dateNaissance']);
                $pilote->setDateNaissance($dateNaissance);
            }
            
            // Mot de passe hashé
            if (isset($data['password'])) {
                $hashedPassword = $this->passwordHasher->hashPassword($pilote, $data['password']);
                $pilote->setPassword($hashedPassword);
            }
            
            // Code à 6 chiffres (optionnel)
            if (isset($data['codeNum'])) {
                $pilote->setCodeNumPlain($data['codeNum']);
            }
            
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        // Validation
        $errors = $this->validator->validate($pilote);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage()
                ];
            }
            return $this->json(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        // Sauvegarder
        try {
            $this->entityManager->persist($pilote);
            $this->entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => 'Erreur lors de la sauvegarde'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            'message' => 'Pilote créé avec succès',
            'pilote' => [
                'id' => $pilote->getId(),
                'pseudo' => $pilote->getPseudo(),
                'email' => $pilote->getEmail(),
                'fullName' => $pilote->getFullName()
            ]
        ], Response::HTTP_CREATED);
    }

    /**
     * Connexion d'un pilote
     * POST /api/auth/login
     */
    #[Route('/auth/login', name: 'pilote_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email']) || !isset($data['password'])) {
            return $this->json(['error' => 'Email et mot de passe requis'], Response::HTTP_BAD_REQUEST);
        }

        // Chercher le pilote
        $pilote = $this->piloteRepository->findOneBy(['email' => $data['email']]);

        if (!$pilote || !$this->passwordHasher->isPasswordValid($pilote, $data['password'])) {
            return $this->json(['error' => 'Identifiants invalides'], Response::HTTP_UNAUTHORIZED);
        }

        // Mettre à jour la dernière connexion
        $pilote->updateLastLogin();
        $this->entityManager->flush();

        // TODO: Générer un JWT token ici
        $token = 'fake_jwt_token_' . $pilote->getId(); // Temporaire

        return $this->json([
            'token' => $token,
            'pilote' => [
                'id' => $pilote->getId(),
                'pseudo' => $pilote->getPseudo(),
                'email' => $pilote->getEmail(),
                'fullName' => $pilote->getFullName(),
                'lastLogin' => $pilote->getLastLoginAt()?->format('Y-m-d H:i:s')
            ]
        ]);
    }

    /**
     * Récupérer le profil du pilote connecté
     * GET /api/pilotes/profile
     */
    #[Route('/pilotes/profile', name: 'pilote_profile', methods: ['GET'])]
    public function profile(#[CurrentUser] ?Pilote $pilote): JsonResponse
    {
        if (!$pilote) {
            return $this->json(['error' => 'Non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'pilote' => [
                'id' => $pilote->getId(),
                'pseudo' => $pilote->getPseudo(),
                'email' => $pilote->getEmail(),
                'nom' => $pilote->getNom(),
                'prenom' => $pilote->getPrenom(),
                'fullName' => $pilote->getFullName(),
                'portable' => $pilote->getPortable(),
                'dateNaissance' => $pilote->getDateNaissance()?->format('Y-m-d'),
                'lieuNaissance' => $pilote->getLieuNaissance(),
                'sexe' => $pilote->getSexe(),
                'adresse' => $pilote->getFormattedAddress(),
                'createdAt' => $pilote->getCreatedAt()?->format('Y-m-d H:i:s'),
                'lastLoginAt' => $pilote->getLastLoginAt()?->format('Y-m-d H:i:s'),
                'isMajor' => $pilote->isMajor()
            ]
        ]);
    }

    /**
     * Mettre à jour le profil du pilote connecté
     * PUT /api/pilotes/profile
     */
    #[Route('/pilotes/profile', name: 'pilote_update_profile', methods: ['PUT'])]
    public function updateProfile(Request $request, #[CurrentUser] ?Pilote $pilote): JsonResponse
    {
        if (!$pilote) {
            return $this->json(['error' => 'Non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        try {
            // Mettre à jour seulement les champs fournis
            if (isset($data['pseudo'])) {
                $pilote->setPseudo($data['pseudo']);
            }
            if (isset($data['nom'])) {
                $pilote->setNom($data['nom']);
            }
            if (isset($data['prenom'])) {
                $pilote->setPrenom($data['prenom']);
            }
            if (isset($data['portable'])) {
                $pilote->setPortable($data['portable']);
            }
            if (isset($data['numRue'])) {
                $pilote->setNumRue($data['numRue']);
            }
            if (isset($data['nomRue'])) {
                $pilote->setNomRue($data['nomRue']);
            }
            if (isset($data['codePostal'])) {
                $pilote->setCodePostal($data['codePostal']);
            }
            if (isset($data['ville'])) {
                $pilote->setVille($data['ville']);
            }
            if (isset($data['complementAdresse'])) {
                $pilote->setComplementAdresse($data['complementAdresse']);
            }

        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        // Validation
        $errors = $this->validator->validate($pilote);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage()
                ];
            }
            return $this->json(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        // Sauvegarder
        try {
            $this->entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => 'Erreur lors de la sauvegarde'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json([
            'message' => 'Profil mis à jour avec succès',
            'pilote' => [
                'id' => $pilote->getId(),
                'pseudo' => $pilote->getPseudo(),
                'fullName' => $pilote->getFullName(),
                'adresse' => $pilote->getFormattedAddress()
            ]
        ]);
    }

    /**
     * Vérifier le code numérique à 6 chiffres
     * POST /api/pilotes/verify-code
     */
    #[Route('/pilotes/verify-code', name: 'pilote_verify_code', methods: ['POST'])]
    public function verifyCode(Request $request, #[CurrentUser] ?Pilote $pilote): JsonResponse
    {
        if (!$pilote) {
            return $this->json(['error' => 'Non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data['code'])) {
            return $this->json(['error' => 'Code requis'], Response::HTTP_BAD_REQUEST);
        }

        $isValid = $pilote->verifyCodeNum($data['code']);

        if (!$isValid) {
            return $this->json(['error' => 'Code invalide'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'message' => 'Code valide',
            'verified' => true
        ]);
    }

    /**
     * Test endpoint pour vérifier que l'API fonctionne
     * GET /api/pilotes/test
     */
    #[Route('/pilotes/test', name: 'pilote_test', methods: ['GET'])]
    public function test(): JsonResponse
    {
        return $this->json([
            'message' => 'API Pilote MX Link fonctionne !',
            'timestamp' => (new \DateTime())->format('Y-m-d H:i:s'),
            'endpoints' => [
                'POST /api/pilotes' => 'Inscription',
                'POST /api/auth/login' => 'Connexion',
                'GET /api/pilotes/profile' => 'Profil (auth requis)',
                'PUT /api/pilotes/profile' => 'Modifier profil (auth requis)',
                'POST /api/pilotes/verify-code' => 'Vérifier code 6 chiffres (auth requis)'
            ]
        ]);
    }
}