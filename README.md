# Algorithme de Recommandation de Films

## Description
La croissance rapide de la collection des données utilisateurs a entraîné la création de systèmes de recommandation de plus en plus efficaces et présents. Ces systèmes améliorent la qualité des résultats de recherche en fournissant des éléments plus pertinents par rapport à l’élément recherché et/ou à l’historique de recherche de l’utilisateur. Employés par des grandes entreprises comme Amazon, Youtube et Facebook, ces systèmes prédissent les préférences des utilisateurs et influencent grandement leur perception des produits.

Ce projet vise à concevoir une interface où l'utilisateur peut indiquer ses préférences (genre, acteurs, etc.) et les films déjà visionnés pour recevoir en retour des suggestions de films correspondant à ses goûts. Les données pour les recommandations sont fournies par Jellysmack via la chaîne Binge Society, en partenariat avec des studios comme Sony et Universal.

## Objectif
Développer un prototype end-to-end de recommandation de films qui utilise les données fournies : une liste de 5000 films et les performances de la chaîne Binge Society de Jellysmack. Le prototype doit être fonctionnel, même avec un design simple et minimaliste, et capable de fonctionner en temps réel sur des cas simples.

## Datasets Utilisés
- Liste de 5000 films avec informations détaillées.
- Performances de la chaîne Binge Society de Jellysmack.

## Fonctionnalités
- Saisie des préférences utilisateur (genres, acteurs, etc.).
- Evaluation des films déjà visionnés par l'utilisateur.
- Système de recommandation basé sur les préférences saisies.

## Technologies Utilisées
- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express** : Framework pour applications web Node.js.
- **Next.js** : Framework React pour production.
- **Material-UI** : Bibliothèque de composants React pour un design rapide et facile.
- **MariaDB** : Système de gestion de base de données relationnelle.
- **bcrypt** : Bibliothèque pour le hachage de mots de passe.
- **Axios** : Client HTTP basé sur les promesses pour le navigateur et Node.js.


## Installation

Pour installer les dépendances nécessaires au projet, suivez les étapes ci-dessous :

1. **Installer les dépendances du Backend**
   - Naviguez jusqu'au dossier `BackEnd` de votre projet.
   - Exécutez la commande suivante :
     ```bash
     npm install
     ```
   - Ceci installera toutes les dépendances nécessaires pour le backend.

2. **Installer les dépendances du Frontend**
   - Naviguez jusqu'au dossier `frontend` de votre projet.
   - Exécutez la commande suivante :
     ```bash
     npm install
     ```
   - Ceci installera toutes les dépendances nécessaires pour le frontend.

Assurez-vous d'avoir Node.js installé sur votre système pour exécuter ces commandes.


## Utilisation

Pour démarrer l'application, vous aurez besoin de lancer à la fois le serveur backend et le serveur frontend. Voici les étapes à suivre :

1. **Démarrer le serveur Backend**
   - Ouvrez un terminal.
   - Naviguez jusqu'au dossier `BackEnd` de votre projet.
   - Exécutez la commande suivante :
     ```bash
     npm run dev
     ```
   - Le serveur backend devrait maintenant être en cours d'exécution.

2. **Démarrer le serveur Frontend**
   - Ouvrez un autre terminal.
   - Naviguez jusqu'au dossier `frontend` de votre projet.
   - Exécutez la commande suivante :
     ```bash
     npm run dev
     ```
   - Le serveur frontend devrait maintenant être en cours d'exécution.

Une fois les deux serveurs démarrés, vous pouvez accéder à l'application en ouvrant votre navigateur et en vous rendant à l'adresse suivante : [https://localhost:3000](https://localhost:3000).

Assurez-vous que les ports nécessaires sont libres sur votre machine pour permettre aux serveurs de démarrer sans problème.

## Contribution

Ce projet est le fruit du travail collaboratif d'une équipe de cinq membres. Si vous souhaitez contribuer, veuillez prendre en compte les contributions précédentes de l'équipe et suivre les lignes directrices de contribution établies. Pour toute question ou suggestion, n'hésitez pas à contacter l'un des membres de l'équipe :

- **Helosia** : [Profil GitHub](https://github.com/Heloisabressanin)
- **Arnaud** : [Profil GitHub](https://github.com/St4r4x) - [Linkedin](https://www.linkedin.com/in/arnaud-thery-b6206b83/)
- **Leandro** : [Profil GitHub](https://github.com/lchantoiseau)
- **Bruno** : [Profil GitHub](https://github.com/Palleca)
- **Benjamin** : [Profil GitHub](https://github.com/Blushister)

Nous encourageons les contributions constructives et sommes ouverts aux nouvelles idées qui pourraient améliorer le projet. Merci de respecter le travail de chacun et de contribuer de manière positive à l'écosystème du projet.


## Licence

Ce projet a été réalisé pour l'entreprise [Jellysmack](https://jellysmack.com/fr/) sous la supervision de Serge Guillemart, dans le cadre de nos études au centre de formation [Aflokkat](https://aflokkat.com).

Tous les droits relatifs au code et au contenu de ce projet sont la propriété exclusive de Jellysmack. Aucune utilisation, reproduction, modification ou distribution n'est autorisée sans le consentement explicite de Jellysmack.

Pour toute question concernant les droits d'utilisation, de modification ou de distribution, veuillez contacter Jellysmack directement. Ce projet est le résultat d'un effort collaboratif et est destiné à des fins éducatives dans le cadre des programmes d'étude d'Aflokkat, avec une utilisation spécifiquement accordée à Jellysmack.
