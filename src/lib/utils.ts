
// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";
// import { Project } from '@/types';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export const projects: Project[] = [
//   // 1 - Recherche TFC avec IA
//   {
//     id: "tfc-search-ai",
//     title: "TFC Search AI",
//     description: `Plateforme d'assistance à la recherche de Travaux de Fin de Cycle (TFC) pour les universités. 
//     Conçue pour exploiter les données internes (bibliothèque, archives, mémoires, publications de l'université), elle propose un moteur de recherche sémantique enrichi par des modèles LLM via OpenRouter. 
//     La plateforme aide les étudiants et encadrants à trouver des sources pertinentes, générer des synthèses, proposer des problématiques et suivre l'état d'avancement d'un TFC.`,
//     shortDescription: "Assistant de recherche universitaire avec IA (indexation interne + LLM)",
//     image: "/case/a.webp",
//     category: "Recherche & IA",
//     technologies: ["Next.js 14", "TypeScript", "Supabase", "OpenRouter (LLM API)", "PostgreSQL", "Redis", "Tailwind CSS", "Vector DB"],
//     year: 2024,
//     incourse: false,
//     featured: true,
//     client: "UDBL University",
//     role: "Lead Developer",
//     demoUrl: "https://recherchetfc.vercel.app",
//     githubUrl: "https://github.com/undeplex/hypersearch",
//     videoUrl: "/case/tfc/tfcvid.mp4",
//     videoThumbnail: "/case/a.webp",
//     gallery: [
//       "/case/tfc/tfc1.png","/case/tfc/tfc2.png","/case/tfc/tfc3.png",
//       "/case/tfc/tfc4.png","/case/tfc/tfc5.png","/case/tfc/tfc6.png",
//       "/case/tfc/tfc7.png","/case/tfc/tfc8.png","/case/tfc/tfc8.png",
      
//     ],
//     mobileGallery: [
//     "/case/tfc/d1.png","/case/tfc/d3.png",
//     "/case/tfc/d4.png","/case/tfc/d2.png",
//     "/case/tfc/d5.png","/case/tfc/d6.png",
//     "/case/tfc/d7.png","/case/tfc/d8.png","/case/tfc/d9.png",
//     ],
//     challenges: [
//       "Indexation et recherche sémantique sur des corpus hétérogènes (PDF, DOC, métadonnées)",
//       "Respect de la confidentialité et des règles universitaires sur les données internes",
//       "Fournir des réponses fiables et traçables issues d'un LLM"
//     ],
//     solutions: [
//       "Utilisation de Supabase pour l'authentification, le stockage des métadonnées et la gestion des droits d'accès",
//       "Pipeline ETL pour extraire/normaliser les documents et construire des embeddings (vector DB)",
//       "Intégration d'OpenRouter pour appels LLM — prompts contrôlés + journalisation des réponses pour audit",
//       "Fonctionnalités : suggestions de sujets, génération d'un plan, suivi des versions, export des bibliographies (BibTeX)"
//     ]
//   },

//   // 2 - Gestion école
//   {
//     id: "gestion-ecole-pro",
//     title: "Gestion École Pro",
//     description: `Système de gestion scolaire complet destiné aux établissements (primaire, secondaire, supérieur). Plateforme modulable couvrant l'administration, les enseignants, les élèves et les parents. Pilote la scolarité, la communication et l'analyse décisionnelle.`,
//     shortDescription: "ERP scolaire : élèves, parents, enseignants, notes, absences, communication",
//     image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&auto=format&fit=crop",
//     category: "Gestion ",
//     technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Tailwind CSS", "React Native (mobile)"],
//     year: 2023,
//     incourse: true,
//     featured: true,
//     client: "Collège / Lycée",
//     role: "Lead Developer",
//     demoUrl: "https://gestionecoleapp.vercel.app",
//     githubUrl: "https://github.com/undeplex/ecole",
//     videoUrl: "/case/ecole/evid.mp4",
//     videoThumbnail: "/show/ecole0.jpeg",
//     gallery: [
//       "/case/ecole/e1.png","/case/ecole/e2.png",
//       "/case/ecole/e8.png","/case/ecole/e3.png",
//       "/case/ecole/e4.png","/case/ecole/e4.png",
    
//     ],
//     mobileGallery: [
//      "/case/ecole/g1.png","/case/ecole/g2.png",
//      "/case/ecole/g3.png","/case/ecole/g4.png",
//      "/case/ecole/g5.png","/case/ecole/g6.png",
//      "/case/ecole/g7.png",
//     ],
//     challenges: [
//       "Centraliser les données et respecter les rôles (admin, enseignant, parent, élève)",
//       "Système d'absences et sanctions avec workflow",
//       "Génération automatique des bulletins et export PDF"
//     ],
//     solutions: [
//       "Modules : gestion des inscriptions, dossiers élèves, emplois du temps, notes, absences, évaluations",
//       "Communication interne : messagerie, notifications push (mobile), envoi de bulletins par email",
//       "Statistiques et tableau de bord pour la direction (présences, performance, fréquentation)",
//       "API REST + JWT pour intégration mobile React Native, et système de permissions fines"
//     ]
//   },

//   // 3 - Prise de rendez-vous en ligne
//   {
//     id: "watuwetu-rendezvous",
//     title: "WatuWetu Online ",
//     description: `Solution complète de prise de rendez-vous pour le secteur médical (cliniques, cabinets). Offre gestion de comptes patients/médecins, calendrier partagé, réservations de créneaux, rappels automatiques et file d'attente intelligente pour optimiser le flux.`,
//     shortDescription: "Plateforme de rendez-vous médical — comptes patient/médecin, rappels, calendrier",
//     image: "https://s3-alpha.figma.com/hub/file/3359497391/resized/800x480/28d1b781-e065-427b-9e91-1cf2b5bc036e-cover.png",
//     category: "Santé",
//     technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Twilio (SMS)", "OAuth2", "Tailwind CSS"],
//     year: 2024,
//     incourse: true,
//     featured: true,
//     client: "Clinique & Hopitaux",
//     role: "Backend Engineer",
//     demoUrl: "https://rendezvousonline.vercel.app",
//     githubUrl: "https://github.com/undeplex/hopital",
//     videoUrl: "/case/hopital/hvid.mp4",
//     videoThumbnail: "/show/watu.jpeg",
//     gallery: [
//       "/case/hopital/h1.png","/case/hopital/h2.png",
//       "/case/hopital/h3.png","/case/hopital/h4.png",
//       "/case/hopital/h7.png","/case/hopital/h5.png",
//       "/case/hopital/h8.png","/case/hopital/h6.png",
//       "/case/hopital/h9.png","/case/hopital/h10.png",
//     ],
//     mobileGallery: [
//       "/case/hopital/f1.png","/case/hopital/f2.png",
//       "/case/hopital/f8.png","/case/hopital/f3.png",
//       "/case/hopital/f5.png","/case/hopital/f4.png",
//       "/case/hopital/f6.png","/case/hopital/f7.png",
//       "/case/hopital/f9.png","/case/hopital/f7.png",
//     ],
//     challenges: [
//       "Coordination des agendas de plusieurs praticiens",
//       "Réduire les rendez-vous manqués (no-shows)",
//       "Respecter la confidentialité des données médicales (HIPAA-like pour contexte)"
//     ],
//     solutions: [
//       "Comptes patients & praticiens avec profils vérifiés et disponibilité en temps réel",
//       "Prise de rendez-vous : sélection du médecin, créneau, motif ; confirmation par email/SMS",
//       "Rappels programmables (SMS/Email) et lien d'annulation/renégociation",
//       "Gestion des files d'attente et KPI pour les administrateurs (taux d'occupation, temps d'attente)"
//     ]
//   },

//   // 4 - Déclaration en ligne IPR & IERE (DGI)
//   {
//     id: "data-bank-dgi",
//     title: "DataBank DGI -IPR & IERE",
//     description: `Système de déclaration en ligne pour la Direction Générale des Impôts (DGI) de la RDC : gestion des déclarations IPR (Impôt sur le Revenu) et IERE (Impôt Éventuel/Écotaxe) avec formulaires dynamiques, suivi, validation et génération d'attestations. Mis en conformité avec les cadres locaux et simplifiant la relation contribuable-administration.`,
//     shortDescription: "Plateforme de déclaration fiscale en ligne adaptée au cadre de la RDC",
//     image: "/case/c.webp",
//     category: "Academic / Gouvernement",
//     technologies: ["Next.js 14", "TypeScript", "Supabase", "PostgreSQL", "Serverless (API)", "Tailwind CSS"],
//     year: 2024,
//     incourse: true,
//     featured: true,
//     client: "DGI Kipushi/Sandrine",
//     role: "Lead Developer",
//     demoUrl: "https://databankdgi.vercel.app",
//     githubUrl: "https://github.com/sandrineedrina/databankdgi",
//     videoUrl: "/case/dgi/dgi.mp4",
//     videoThumbnail: "/show/bank0.jpeg",
//     gallery: [
//       "/show/bank1.png",
//       "/show/bank2.png",
//       "/show/bank3.png",
//       "/show/bank4.png"
//     ],
//     mobileGallery: [
//       "/case/dgi/k1.png", "/case/dgi/k4.png",
//        "/case/dgi/k5.png", "/case/dgi/k2.png",
//         "/case/dgi/k3.png", "/case/dgi/k6.png",
//          "/case/dgi/k8.png", "/case/dgi/k7.png",
//          "/case/dgi/k10.png"
//     ],
//     challenges: [
//       "Concevoir des formulaires adaptatifs selon le statut du contribuable",
//       "Sécurité et traçabilité des déclarations et paiements",
//       "Interopérabilité avec systèmes bancaires et back-office de la DGI"
//     ],
//     solutions: [
//       "Utilisation de Supabase pour authentification, stockage sécurisé et workflows d'approbation",
//       "Formulaires guidés avec validation côté client & serveur, génération PDF des attestations",
//       "Module d'intégration bancaire (webhooks) pour rapprochement des paiements",
//       "Tableaux de bord pour les agents de la DGI : suivi des dossiers, notifications et audits"
//     ]
//   },

//   // 5 - Longrich Store
//   {
//     id: "longrich-store",
//     title: "Longrich Store",
//     description: `Boutique e-commerce complète : catalogue produits, navigation par catégorie, fiches produits détaillées, panier, tunnel de paiement, gestion des stocks et back-office pour commandes et retours. Conçu pour scalabilité et forte conversion.`,
//     shortDescription: "E-commerce complet : catalogue, panier, paiement, gestion stock",
//     image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
//     category: "E-commerce",
//     technologies: ["Next.js 14", "TypeScript", "Stripe", "Tailwind CSS", "PostgreSQL", "Vercel/Netlify"],
//     year: 2024,
//     incourse: true,
//     featured: true,
//     client: "Longrich (revendeur)",
//     role: "Lead Developer",
//     demoUrl: "https://longrichstore.vercel.app",
//     githubUrl: "https://github.com/peternz/longrich",
//     videoUrl: "/case/longrich/lvid.mp4",
//     videoThumbnail: "/show/long0.jpeg",
//     gallery: [
//       "/case/longrich/l1.png","/case/longrich/l2.png",
//       "/case/longrich/l3.png","/case/longrich/l4.png",
//       "/case/longrich/l5.png","/case/longrich/l6.png",
//       "/case/longrich/l7.png"
//     ],
//     mobileGallery: [
//        "/case/longrich/h1.png","/case/longrich/h2.png",
//       "/case/longrich/h3.png","/case/longrich/h4.png",
//       "/case/longrich/h6.png",
//     ],
//     challenges: [
//       "Soutenir un catalogue large et des pics de trafic",
//       "Gestion en temps réel des stocks et synchronisation multi-canaux",
//       "Optimiser le tunnel d'achat pour réduire l'abandon panier"
//     ],
//     solutions: [
//       "Pages produit SEO-friendly (SSR) + images optimisées",
//       "Panier persistant (local + serveur) et segmentation pour promotions",
//       "Intégration Stripe avec webhooks pour états de paiement et gestion des commandes",
//       "Back-office pour gestion des produits, catégories, promotions et export CSV"
//     ]
//   },

//   // 6 - Blog PeterNz (détails complets)
//   {
//     id: "peter-nz-blog",
//     title: "PeterNz - Blog Tech ",
//     description: `Blog personnel / technique axé sur le développement web, la technologie et la réflexion pédagogique. Contenu riche : tutoriels Next.js, articles sur DevOps, retours d'expérience, traductions, et séries techniques (Next.js 14, Tailwind, IA). Intégration SEO, RSS, commentaires et gestion multi-auteurs.`,
//     shortDescription: "Blog technique complet avec tutoriels, articles et ressources",
//     image: "/show/blog0.webp",
//     category: "Publication / Blog",
//     technologies: ["Next.js 14", "TypeScript", "MDX", "Tailwind CSS", "Algolia (recherche)", "Netlify/Vercel"],
//     year: 2023,
//     incourse: false,
//     featured: true,
//     client: "Peter Nzana (auteur)",
//     role: "Auteur & Mainteneur",
//     demoUrl: "https://peternz.vercel.app",
//     githubUrl: "https://github.com/undeplex/peternz",
//     videoUrl: "/case/blog/bvid.mp4",
//     videoThumbnail: "/show/blog0.jpeg",
//     gallery: [
//       "/case/blog/b1.png","/case/blog/b2.png",
//       "/case/blog/b3.png","/case/blog/b4.png",
//       "/case/blog/b5.png","/case/blog/b6.png",
//     ],
//     mobileGallery: [
//       "/case/blog/c1.png","/case/blog/c2.png",
//       "/case/blog/c3.png","/case/blog/c4.png",
//       "/case/blog/c5.png","/case/blog/c6.png",
//       "/case/blog/c7.png","/case/blog/c8.png",
//     ],
//     challenges: [
//       "Organiser beaucoup de contenus (tutoriels, traductions, séries)",
//       "Offrir une bonne recherche et navigation (tags, catégories)",
//       "Optimiser SEO et la performance pour article long"
//     ],
//     solutions: [
//       "Contenu en MDX pour articles interactifs (extraits de code, embeds)",
//       "Indexation Algolia pour recherche instantanée, pagination et tags",
//       "Optimisation des images, lazy-loading et génération de sitemap/RSS"
//     ]
//   },

//   // 7 - Invitation numérique
//   {
//     id: "invitation-numerique",
//     title: "Invitation Numérique",
//     description: `Solution d'invitations digitales pour événements avec application mobile : création et envoi d'invitations, gestion des invités, suivi RSVP, génération de QR codes et application mobile pour scanner les codes à l'entrée. Idéal pour mariages, conférences, et événements privés/professionnels.`,
//     shortDescription: "Créer/Envoyer invitations, gestion invités, QR codes + app mobile",
//     image: "/case/d.jpg",
//     category: "Events / Mobile",
//     technologies: ["Next.js 14", "TypeScript", "Supabase", "React Native (Expo)", "QRCode libraries", "Stripe (paiement billets)"],
//     year: 2023,
//     incourse: true,
//     featured: true,
//     client: "Organisateurs & Particuliers",
//     role: "Full Stack Dev",
//     demoUrl: "https://moninvitation.vercel.app",
//     githubUrl: "https://github.com/undeplex/invitations",
//     videoUrl: "/case/invite/ivid.mp4",
//     videoThumbnail: "/show/ini0.jpeg",
//     gallery: [
//       "/show/ini1.png",
//       "/show/ini2.png",
//       "/show/ini3.png",
//       "/show/ini4.png"
//     ],
//     mobileGallery: [
//        "/case/invite/phone.png",
//       "/show/inip1.png",
//       "/show/inip2.png",
//       "/show/inip3.png",
//       "/show/inip4.png",
//       "/show/inip5.png",
     
//       "/case/invite/phone2.png"
//     ],
//     challenges: [
//       "Gérer RSVP massifs et la validation rapide à l'entrée",
//       "Générer QR codes sécurisés et uniques",
//       "Permettre l'envoi d'invitations personnalisées et le suivi en temps réel"
//     ],
//     solutions: [
//       "Stockage et authentification via Supabase, invitations exportables (CSV/PDF)",
//       "Génération dynamique de QR codes encodant URL unique + token, vérification via app mobile",
//       "Application mobile (Expo) pour scanner et marquer la présence; tableau de bord organisateur"
//     ]
//   },

//   // 8 - Portfolio Undeplex
//   {
//     id: "portfolio-undeplex",
//     title: "Undeplex Portfolio",
//     description: `Le portfolio utilisé pour présenter les projets, le process et les compétences. Composants réutilisables, pages projet détaillées, galerie multimédia, et intégration analytics pour mesurer l'engagement des visiteurs.`,
//     shortDescription: "Portfolio professionnel avec pages projets, galerie et analytics",
//     image: "/show/portfolio.webp",
//     category: "Portfolio",
//     technologies: ["Next.js 14", "TypeScript", "React", "Vercel", "Google Analytics"],
//     year: 2023,
//     featured: true,
//     incourse: true,
//     client: "Undeplex (personnel)",
//     role: "Développeur",
//     demoUrl: "https://nosrealisations.vercel.app",
//     githubUrl: "https://github.com/undeplex/tanzanie",
//     videoUrl: "/case/portfolio/ipor.mp4",
//     videoThumbnail: "/show/portfolio.jpeg",
//     gallery: [
//       "/case/portfolio/i1.png", "/case/portfolio/i2.png",
//        "/case/portfolio/i3.png", "/case/portfolio/i4.png",
//         "/case/portfolio/i5.png",
//     ],
//     mobileGallery: [
//       "/case/portfolio/j1.png", "/case/portfolio/j2.png",
//        "/case/portfolio/j3.png", "/case/portfolio/j4.png",
//         "/case/portfolio/j5.png",  "/case/portfolio/j6.png",
//     ],
//     challenges: [
//       "Présenter beaucoup d'informations de façon claire et performante",
//       "Gestion des médias lourds (images, vidéos) sans dégrader la vitesse",
//       "Facilité d'ajout/modification des projets"
//     ],
//     solutions: [
//       "Composants modulaires, MDX pour contenus riches, et système de filtres",
//       "Optimisation des assets (next/image, lazy loading, CDN)",
//       "Scripts d'import pour ajouter rapidement de nouveaux projets et previews automatiques"
//     ]
//   }
// ];

// // UTILITAIRES
// export function getProjectById(id: string): Project | undefined {
//   return projects.find(project => project.id === id);
// }

// export function getProjectBySlug(slug: string): Project | undefined {
//   // si tu utilises slug, ajoute le champ slug dans chaque projet; ici fallback sur id
//   return projects.find(project => project.id === slug || (project as any).slug === slug);
// }

// export function getFeaturedProjects(): Project[] {
//   return projects.filter(project => project.featured);
// }

// export function getAllProjects(): Project[] {
//   return projects;
// }
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Project } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const projects: Project[] = [
  // 1 - Recherche TFC avec IA
  {
    id: "tfc-search-ai",
    title: "TFC Search AI",
    description: `Plateforme d'assistance à la recherche de Travaux de Fin de Cycle (TFC) pour les universités. 
    Conçue pour exploiter les données internes (bibliothèque, archives, mémoires, publications de l'université), elle propose un moteur de recherche sémantique enrichi par des modèles LLM via OpenRouter. 
    La plateforme aide les étudiants et encadrants à trouver des sources pertinentes, générer des synthèses, proposer des problématiques et suivre l'état d'avancement d'un TFC.`,
    shortDescription: "Assistant de recherche universitaire avec IA (indexation interne + LLM)",
    image: "/case/a.webp",
    imageBrand: "/brand/tfc-brand.webp",
    category: "Recherche & IA",
    year: 2024,
    featured: true,
    client: "UDBL University",
    role: "Lead Developer",
    demoUrl: "https://recherchetfc.vercel.app",
    videoUrl: "/case/tfc/tfcvid.mp4",
    videoThumbnail: "/case/a.webp",
    gallery: [
      "/case/tfc/tfc1.png","/case/tfc/tfc2.png","/case/tfc/tfc3.png",
      "/case/tfc/tfc4.png","/case/tfc/tfc5.png","/case/tfc/tfc6.png",
      "/case/tfc/tfc7.png","/case/tfc/tfc8.png",
    ],
  },

  // 2 - Gestion école
  {
    id: "gestion-ecole-pro",
    title: "Gestion École Pro",
    description: `Système de gestion scolaire complet destiné aux établissements (primaire, secondaire, supérieur). Plateforme modulable couvrant l'administration, les enseignants, les élèves et les parents. Pilote la scolarité, la communication et l'analyse décisionnelle.`,
    shortDescription: "ERP scolaire : élèves, parents, enseignants, notes, absences, communication",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&auto=format&fit=crop",
    imageBrand: "/brand/ecole-brand.webp",
    category: "Gestion",
    year: 2023,
    featured: true,
    client: "Collège / Lycée",
    role: "Lead Developer",
    demoUrl: "https://gestionecoleapp.vercel.app",
    videoUrl: "/case/ecole/evid.mp4",
    videoThumbnail: "/show/ecole0.jpeg",
    gallery: [
      "/case/ecole/e1.png","/case/ecole/e2.png",
      "/case/ecole/e8.png","/case/ecole/e3.png",
      "/case/ecole/e4.png",
    ],
  },

  // 3 - Prise de rendez-vous en ligne
  {
    id: "watuwetu-rendezvous",
    title: "WatuWetu Online",
    description: `Solution complète de prise de rendez-vous pour le secteur médical (cliniques, cabinets). Offre gestion de comptes patients/médecins, calendrier partagé, réservations de créneaux, rappels automatiques et file d'attente intelligente pour optimiser le flux.`,
    shortDescription: "Plateforme de rendez-vous médical — comptes patient/médecin, rappels, calendrier",
    image: "https://s3-alpha.figma.com/hub/file/3359497391/resized/800x480/28d1b781-e065-427b-9e91-1cf2b5bc036e-cover.png",
    imageBrand: "/brand/watu-brand.webp",
    category: "Santé",
    year: 2024,
    featured: true,
    client: "Clinique & Hopitaux",
    role: "Backend Engineer",
    demoUrl: "https://rendezvousonline.vercel.app",
    videoUrl: "/case/hopital/hvid.mp4",
    videoThumbnail: "/show/watu.jpeg",
    gallery: [
      "/case/hopital/h1.png","/case/hopital/h2.png",
      "/case/hopital/h3.png","/case/hopital/h4.png",
      "/case/hopital/h7.png","/case/hopital/h5.png",
      "/case/hopital/h8.png","/case/hopital/h6.png",
      "/case/hopital/h9.png","/case/hopital/h10.png",
    ],
  },

  // 4 - Déclaration en ligne IPR & IERE (DGI)
  {
    id: "data-bank-dgi",
    title: "DataBank DGI -IPR & IERE",
    description: `Système de déclaration en ligne pour la Direction Générale des Impôts (DGI) de la RDC : gestion des déclarations IPR (Impôt sur le Revenu) et IERE (Impôt Éventuel/Écotaxe) avec formulaires dynamiques, suivi, validation et génération d'attestations.`,
    shortDescription: "Plateforme de déclaration fiscale en ligne adaptée au cadre de la RDC",
    image: "/case/c.webp",
    imageBrand: "/brand/dgi-brand.webp",
    category: "Academic / Gouvernement",
    year: 2024,
    featured: true,
    client: "DGI Kipushi/Sandrine",
    role: "Lead Developer",
    demoUrl: "https://databankdgi.vercel.app",
    videoUrl: "/case/dgi/dgi.mp4",
    videoThumbnail: "/show/bank0.jpeg",
    gallery: [
      "/show/bank1.png",
      "/show/bank2.png",
      "/show/bank3.png",
      "/show/bank4.png"
    ],
  },

  // 5 - Longrich Store
  {
    id: "longrich-store",
    title: "Longrich Store",
    description: `Boutique e-commerce complète : catalogue produits, navigation par catégorie, fiches produits détaillées, panier, tunnel de paiement, gestion des stocks et back-office pour commandes et retours. Conçu pour scalabilité et forte conversion.`,
    shortDescription: "E-commerce complet : catalogue, panier, paiement, gestion stock",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
    imageBrand: "/brand/longrich-brand.webp",
    category: "E-commerce",
    year: 2024,
    featured: true,
    client: "Longrich (revendeur)",
    role: "Lead Developer",
    demoUrl: "https://longrichstore.vercel.app",
    videoUrl: "/case/longrich/lvid.mp4",
    videoThumbnail: "/show/long0.jpeg",
    gallery: [
      "/case/longrich/l1.png","/case/longrich/l2.png",
      "/case/longrich/l3.png","/case/longrich/l4.png",
      "/case/longrich/l5.png","/case/longrich/l6.png",
      "/case/longrich/l7.png"
    ],
  },

  // 6 - Blog PeterNz
  {
    id: "peter-nz-blog",
    title: "PeterNz - Blog Tech",
    description: `Blog personnel / technique axé sur le développement web, la technologie et la réflexion pédagogique. Contenu riche : tutoriels Next.js, articles sur DevOps, retours d'expérience, traductions, et séries techniques.`,
    shortDescription: "Blog technique complet avec tutoriels, articles et ressources",
    image: "/show/blog0.webp",
    imageBrand: "/brand/blog-brand.webp",
    category: "Publication / Blog",
    year: 2023,
    featured: true,
    client: "Peter Nzana (auteur)",
    role: "Auteur & Mainteneur",
    demoUrl: "https://peternz.vercel.app",
    videoUrl: "/case/blog/bvid.mp4",
    videoThumbnail: "/show/blog0.jpeg",
    gallery: [
      "/case/blog/b1.png","/case/blog/b2.png",
      "/case/blog/b3.png","/case/blog/b4.png",
      "/case/blog/b5.png","/case/blog/b6.png",
    ],
  },

  // 7 - Invitation numérique
  {
    id: "invitation-numerique",
    title: "Invitation Numérique",
    description: `Solution d'invitations digitales pour événements avec application mobile : création et envoi d'invitations, gestion des invités, suivi RSVP, génération de QR codes et application mobile pour scanner les codes à l'entrée.`,
    shortDescription: "Créer/Envoyer invitations, gestion invités, QR codes + app mobile",
    image: "/case/d.jpg",
    imageBrand: "/brand/invitation-brand.webp",
    category: "Events / Mobile",
    year: 2023,
    featured: true,
    client: "Organisateurs & Particuliers",
    role: "Full Stack Dev",
    demoUrl: "https://moninvitation.vercel.app",
    videoUrl: "/case/invite/ivid.mp4",
    videoThumbnail: "/show/ini0.jpeg",
    gallery: [
      "/show/ini1.png",
      "/show/ini2.png",
      "/show/ini3.png",
      "/show/ini4.png"
    ],
  },

  // 8 - Portfolio Undeplex
  {
    id: "portfolio-undeplex",
    title: "Undeplex Portfolio",
    description: `Le portfolio utilisé pour présenter les projets, le process et les compétences. Composants réutilisables, pages projet détaillées, galerie multimédia, et intégration analytics pour mesurer l'engagement des visiteurs.`,
    shortDescription: "Portfolio professionnel avec pages projets, galerie et analytics",
    image: "/show/portfolio.webp",
    imageBrand: "/brand/portfolio-brand.webp",
    category: "Portfolio",
    year: 2023,
    featured: true,
    client: "Undeplex (personnel)",
    role: "Développeur",
    demoUrl: "https://nosrealisations.vercel.app",
    videoUrl: "/case/portfolio/ipor.mp4",
    videoThumbnail: "/show/portfolio.jpeg",
    gallery: [
      "/case/portfolio/i1.png", "/case/portfolio/i2.png",
       "/case/portfolio/i3.png", "/case/portfolio/i4.png",
        "/case/portfolio/i5.png",
    ],
  }
];

// UTILITAIRES
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.id === slug || (project as any).slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}