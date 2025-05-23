# Carambar & Co - Application de Blagues (Frontend)

Bienvenue sur le projet frontend de l'application web de blagues pour Carambar & Co ! Cette interface utilisateur permet d'afficher des blagues aléatoires à travers une interface web simple et élégante qui reflète l'identité de la marque.

> [!NOTE]
> Projet réalisé dans le cadre d'un test technique pour la formation Concepteur Développeur d'Applications (CDA) chez Simplon.

> [!WARNING]
> - La documentation est en cours de finalisation.  
> - Certaines fonctionnalités peuvent ne pas être encore entièrement décrites.
> - N'hésitez pas à consulter le code source ou ouvrir une issue si besoin d'information urgente.

> [!CAUTION]
> - **Projet fourni par Simplon dans le cadre d'un test technique.**  
> - Ce dépôt a un objectif **pédagogique** uniquement.  
> - Toute utilisation en dehors de ce contexte, notamment à des fins commerciales, devra être préalablement validée par Simplon.

## Description du Projet

Ce frontend est la partie visible de l'application web de blagues Carambar & Co. Il s'agit d'une interface utilisateur développée uniquement avec HTML, CSS et JavaScript vanilla, fonctionnant avec Live Server pour le développement.

### Fonctionnalités

- Affichage d'une landing page aux couleurs de Carambar & Co
- Affichage de blagues aléatoires récupérées depuis l'API backend
- Interface responsive adaptée à tous les appareils
- Design fidèle à l'identité visuelle de la marque

###  Structure du Projet
Le projet consiste à concevoir une application web fullstack composée de deux volets :
- Une API backend permettant la gestion de blagues : [Repository Backend](https://github.com/gastsar/simplon-back.git)
- Une application frontend affichant une landing page interactive : [Repository Frontend](https://github.com/gastsar/simplon-front.git)
```
simplon-front/
├── style.css
├── main.js
├── index.html
├── .gitignore
└── README.md
```

## Technologies Utilisées

Le frontend utilise exclusivement les technologies web standards :
- HTML5
- CSS3
- JavaScript 
- Live Server (pour le développement)

## Communication avec l'API

Le frontend communique avec l'API backend via des requêtes fetch pour récupérer les blagues. Les points d'entrée utilisés sont :
- `GET /api/v1/blagues/random` : Pour obtenir une blague aléatoire
- `GET /api/v1/blagues` : Pour lister toutes les blagues disponibles
- `POST /api/v1/blagues` : Pour ajouté des blagues

## Installation et Lancement (dev)

```bash
# Cloner le repo
git clone https://github.com/gastsar/simplon-front.git
cd simplon-front

# Lancer avec Live Server
# Si vous utilisez VS Code, installez l'extension Live Server
# et cliquez sur "Go Live" dans la barre d'état en bas à droite
```

Ou manuellement :
```bash
# Si vous avez Node.js installé, vous pouvez installer live-server
npm install -g live-server

# Puis lancer le serveur
live-server
```
###  Versionnement de l'API

> [!IMPORTANT]
> L'API est versionnée pour garantir la stabilité et faciliter les évolutions.  
> Actuellement, seule la version `v1` est active.

###  Documentation API

Une documentation Swagger est disponible ici :
- [Lien vers Swagger](https://app.swaggerhub.com/apis-docs/NarsonKevineYVES/carambarco/1.0.0)
###  Déploiement
> [!IMPORTANT]
> **Important :** L'API est déployée via Render.com :
> [Lien vers l'API déployée](https://simplon-back.onrender.com/)

> [!IMPORTANT]
> **Important :** Le frontend est déployé via githup page :
> [Lien vers le site déployé](https://gastsar.github.io/simplon-front/)
## Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Live Server (pour le développement)
- Connexion Internet (pour communiquer avec l'API)

## Auteur

Développé par :
- Yves Narson Kévine
- [github.com/gastsar](https://github.com/gastsar)

## Ressources

- [MDN Web Docs](https://developer.mozilla.org/fr/)
- [JavaScript.info](https://javascript.info/)
- 

## Licence

Ce projet est sous licence ***.
