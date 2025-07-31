<?php

namespace App\Entity;

use App\Repository\PiloteRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: PiloteRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'Cette adresse email est déjà utilisée.')]
#[UniqueEntity(fields: ['pseudo'], message: 'Ce pseudo est déjà pris.')]
class Pilote implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50, unique: true)]
    #[Assert\NotBlank(message: 'Le pseudo est obligatoire')]
    #[Assert\Length(
        min: 3, 
        max: 50, 
        minMessage: 'Le pseudo doit faire au moins {{ limit }} caractères',
        maxMessage: 'Le pseudo ne peut pas dépasser {{ limit }} caractères'
    )]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9_-]+$/',
        message: 'Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores'
    )]
    private ?string $pseudo = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank(message: 'L\'email est obligatoire')]
    #[Assert\Email(message: 'L\'email n\'est pas valide')]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Le mot de passe est obligatoire')]
    private ?string $password = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $codeNum = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message: 'Le nom est obligatoire')]
    #[Assert\Length(max: 100, maxMessage: 'Le nom ne peut pas dépasser {{ limit }} caractères')]
    #[Assert\Regex(
        pattern: '/^[a-zA-ZÀ-ÿ\s\'-]+$/u',
        message: 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'
    )]
    private ?string $nom = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message: 'Le prénom est obligatoire')]
    #[Assert\Length(max: 100, maxMessage: 'Le prénom ne peut pas dépasser {{ limit }} caractères')]
    #[Assert\Regex(
        pattern: '/^[a-zA-ZÀ-ÿ\s\'-]+$/u',
        message: 'Le prénom ne peut contenir que des lettres, espaces, apostrophes et tirets'
    )]
    private ?string $prenom = null;

    #[ORM\Column(length: 20)]
    #[Assert\NotBlank(message: 'Le numéro de portable est obligatoire')]
    #[Assert\Regex(
        pattern: '/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/',
        message: 'Le numéro de portable français n\'est pas valide'
    )]
    private ?string $portable = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Assert\NotBlank(message: 'La date de naissance est obligatoire')]
    #[Assert\LessThan(
        value: '-18 years',
        message: 'Vous devez être majeur (18 ans minimum)'
    )]
    #[Assert\GreaterThan(
        value: '-120 years',
        message: 'Date de naissance non valide'
    )]
    private ?\DateTimeImmutable $dateNaissance = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message: 'Le lieu de naissance est obligatoire')]
    #[Assert\Length(max: 100, maxMessage: 'Le lieu de naissance ne peut pas dépasser {{ limit }} caractères')]
    private ?string $lieuNaissance = null;

    #[ORM\Column(length: 1)]
    #[Assert\NotBlank(message: 'Le sexe est obligatoire')]
    #[Assert\Choice(
        choices: ['M', 'F', 'X'],
        message: 'Le sexe doit être M (Masculin), F (Féminin) ou X (Non-binaire)'
    )]
    private ?string $sexe = null;

    #[ORM\Column(length: 10, nullable: true)]
    #[Assert\Regex(
        pattern: '/^[0-9]{1,5}[a-zA-Z]?$/',
        message: 'Le numéro de rue n\'est pas valide'
    )]
    private ?string $numRue = null;

    #[ORM\Column(length: 200)]
    #[Assert\NotBlank(message: 'Le nom de rue est obligatoire')]
    #[Assert\Length(max: 200, maxMessage: 'Le nom de rue ne peut pas dépasser {{ limit }} caractères')]
    private ?string $nomRue = null;

    #[ORM\Column(length: 10)]
    #[Assert\NotBlank(message: 'Le code postal est obligatoire')]
    #[Assert\Regex(
        pattern: '/^[0-9]{5}$/',
        message: 'Le code postal doit contenir exactement 5 chiffres'
    )]
    private ?string $codePostal = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message: 'La ville est obligatoire')]
    #[Assert\Length(max: 100, maxMessage: 'La ville ne peut pas dépasser {{ limit }} caractères')]
    private ?string $ville = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Assert\Length(max: 500, maxMessage: 'Le complément d\'adresse ne peut pas dépasser {{ limit }} caractères')]
    private ?string $complementAdresse = null;

    #[ORM\Column(type: Types::JSON)]
    #[Assert\NotNull]
    private array $roles = [];

    #[ORM\Column]
    #[Assert\NotNull]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $lastLoginAt = null;

    public function __construct()
    {
        $this->roles = ['ROLE_USER'];
        $this->createdAt = new \DateTimeImmutable();
    }

    // ===== INTERFACE UserInterface =====
    
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // Garantit que chaque pilote a au moins ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function eraseCredentials(): void
    {
        // Si tu stockes des données temporaires sensibles, efface-les ici
        // $this->plainPassword = null;
    }

    // ===== MÉTHODES MÉTIER =====

    /**
     * Hash et stocke le code numérique à 6 chiffres
     */
    public function setCodeNumPlain(string $code): static
    {
        if (!preg_match('/^\d{6}$/', $code)) {
            throw new \InvalidArgumentException('Le code doit contenir exactement 6 chiffres');
        }
        
        $this->codeNum = password_hash($code, PASSWORD_ARGON2ID);
        return $this;
    }

    /**
     * Vérifie le code numérique à 6 chiffres
     */
    public function verifyCodeNum(string $code): bool
    {
        if ($this->codeNum === null) {
            return false;
        }
        
        return password_verify($code, $this->codeNum);
    }

    /**
     * Met à jour la date de dernière connexion
     */
    public function updateLastLogin(): static
    {
        $this->lastLoginAt = new \DateTimeImmutable();
        return $this;
    }

    /**
     * Retourne le nom complet du pilote
     */
    public function getFullName(): string
    {
        return trim($this->prenom . ' ' . $this->nom);
    }

    /**
     * Retourne l'adresse complète formatée
     */
    public function getFormattedAddress(): string
    {
        $address = '';
        
        if ($this->numRue) {
            $address .= $this->numRue . ' ';
        }
        
        $address .= $this->nomRue . ', ';
        $address .= $this->codePostal . ' ' . $this->ville;
        
        if ($this->complementAdresse) {
            $address .= ' (' . $this->complementAdresse . ')';
        }
        
        return $address;
    }

    /**
     * Vérifie si le pilote est majeur
     */
    public function isMajor(): bool
    {
        if ($this->dateNaissance === null) {
            return false;
        }
        
        $today = new \DateTimeImmutable();
        $age = $today->diff($this->dateNaissance)->y;
        
        return $age >= 18;
    }

    // ===== GETTERS/SETTERS =====

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setPseudo(string $pseudo): static
    {
        $this->pseudo = $pseudo;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = strtolower(trim($email));
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;
        return $this;
    }

    public function getCodeNum(): ?string
    {
        return $this->codeNum;
    }

    public function setCodeNum(?string $codeNum): static
    {
        $this->codeNum = $codeNum;
        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = ucwords(strtolower(trim($nom)));
        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = ucwords(strtolower(trim($prenom)));
        return $this;
    }

    public function getPortable(): ?string
    {
        return $this->portable;
    }

    public function setPortable(string $portable): static
    {
        // Normalise le format du téléphone
        $this->portable = preg_replace('/[\s.-]/', '', $portable);
        return $this;
    }

    public function getDateNaissance(): ?\DateTimeImmutable
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance(\DateTimeImmutable $dateNaissance): static
    {
        $this->dateNaissance = $dateNaissance;
        return $this;
    }

    public function getLieuNaissance(): ?string
    {
        return $this->lieuNaissance;
    }

    public function setLieuNaissance(string $lieuNaissance): static
    {
        $this->lieuNaissance = ucwords(strtolower(trim($lieuNaissance)));
        return $this;
    }

    public function getSexe(): ?string
    {
        return $this->sexe;
    }

    public function setSexe(string $sexe): static
    {
        $this->sexe = strtoupper($sexe);
        return $this;
    }

    public function getNumRue(): ?string
    {
        return $this->numRue;
    }

    public function setNumRue(?string $numRue): static
    {
        $this->numRue = $numRue ? trim($numRue) : null;
        return $this;
    }

    public function getNomRue(): ?string
    {
        return $this->nomRue;
    }

    public function setNomRue(string $nomRue): static
    {
        $this->nomRue = ucwords(strtolower(trim($nomRue)));
        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->codePostal;
    }

    public function setCodePostal(string $codePostal): static
    {
        $this->codePostal = trim($codePostal);
        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): static
    {
        $this->ville = ucwords(strtolower(trim($ville)));
        return $this;
    }

    public function getComplementAdresse(): ?string
    {
        return $this->complementAdresse;
    }

    public function setComplementAdresse(?string $complementAdresse): static
    {
        $this->complementAdresse = $complementAdresse ? trim($complementAdresse) : null;
        return $this;
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getLastLoginAt(): ?\DateTimeImmutable
    {
        return $this->lastLoginAt;
    }

    public function setLastLoginAt(?\DateTimeImmutable $lastLoginAt): static
    {
        $this->lastLoginAt = $lastLoginAt;
        return $this;
    }
}