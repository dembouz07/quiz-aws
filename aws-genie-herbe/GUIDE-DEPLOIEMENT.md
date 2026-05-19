# 🚀 Guide de Déploiement - AWS Genius Quiz

## 📋 Vue d'ensemble

Ce guide vous explique comment déployer l'application AWS Genius Quiz sur différentes plateformes pour un usage en production ou en formation.

## 🌐 Nouvelles Interfaces Créées

### 1. **Page d'Accueil** (`/` ou `/index.html`)
- **URL** : http://localhost:3000/
- **Description** : Page d'accueil avec navigation vers toutes les interfaces
- **Utilisateurs** : Tous (point d'entrée principal)

### 2. **Connexion Équipes** (`/team-login.html`)
- **URL** : http://localhost:3000/team-login.html
- **Description** : Interface de connexion pour les équipes
- **Fonctionnalités** :
  - Saisie du nom d'équipe personnalisé
  - Sélection de la position (Équipe 1 ou 2)
  - Vérification de connexion au serveur
  - Redirection automatique vers l'interface de jeu

### 3. **Interface Animateur** (`/host.html`)
- **URL** : http://localhost:3000/host.html
- **Description** : Interface de contrôle pour l'animateur
- **Fonctionnalités** : Gestion complète des parties

### 4. **Quiz DevOps** (`/devops-quiz.html`)
- **URL** : http://localhost:3000/devops-quiz.html
- **Description** : Quiz spécialisé DevOps pour la formation

## 🏠 Déploiement Local (Développement/Test)

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn
- Port 3000 disponible

### Installation
```bash
cd aws-genie-herbe/server
npm install
npm start
```

### Accès
- **Page d'accueil** : http://localhost:3000
- **Toutes les interfaces** accessibles depuis la page d'accueil

## ☁️ Déploiement Cloud

### Option 1 : Heroku (Recommandé pour les formations)

#### Étapes de déploiement
```bash
# 1. Installer Heroku CLI
# Télécharger depuis https://devcenter.heroku.com/articles/heroku-cli

# 2. Se connecter à Heroku
heroku login

# 3. Créer une application
cd aws-genie-herbe/server
heroku create aws-genius-quiz-votre-nom

# 4. Configurer les variables d'environnement
heroku config:set NODE_ENV=production

# 5. Déployer
git init
git add .
git commit -m "Initial deployment"
git push heroku main
```

#### Configuration Heroku
Créer un fichier `Procfile` dans le dossier server :
```
web: node server.js
```

Modifier `package.json` pour inclure :
```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### Option 2 : AWS EC2

#### Étapes de déploiement
```bash
# 1. Créer une instance EC2 (Ubuntu 20.04 LTS)
# 2. Se connecter via SSH
ssh -i votre-cle.pem ubuntu@votre-ip-ec2

# 3. Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Cloner le projet
git clone votre-repo
cd aws-genie-herbe/server

# 5. Installer les dépendances
npm install

# 6. Installer PM2 pour la gestion des processus
sudo npm install -g pm2

# 7. Démarrer l'application
pm2 start server.js --name "aws-quiz"
pm2 startup
pm2 save
```

#### Configuration Nginx (optionnel)
```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 3 : Docker

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  aws-quiz:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Commandes Docker
```bash
# Construire l'image
docker build -t aws-genius-quiz .

# Lancer le conteneur
docker run -d -p 3000:3000 --name aws-quiz aws-genius-quiz

# Ou avec docker-compose
docker-compose up -d
```

## 🌍 Configuration pour Accès Réseau

### Modification du Serveur pour Accès Externe
```javascript
// Dans server.js, modifier :
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Serveur démarré sur http://${HOST}:${PORT}`);
  // ... reste du code
});
```

### Configuration Firewall (EC2)
```bash
# Ouvrir le port 3000
sudo ufw allow 3000
sudo ufw enable
```

### Security Group AWS (EC2)
- **Type** : Custom TCP
- **Port** : 3000
- **Source** : 0.0.0.0/0 (ou votre réseau spécifique)

## 📱 Utilisation en Formation

### Scénario Typique
1. **Formateur** : Accède à l'interface animateur
2. **Apprenants** : Accèdent à la page de connexion équipes
3. **Chaque équipe** :
   - Saisit son nom d'équipe
   - Sélectionne sa position (1 ou 2)
   - Rejoint automatiquement la partie

### URLs à Communiquer
```
🏠 Page d'accueil : http://votre-serveur:3000
👥 Connexion équipes : http://votre-serveur:3000/team-login.html
🎯 Animateur : http://votre-serveur:3000/host.html
⚙️ DevOps Quiz : http://votre-serveur:3000/devops-quiz.html
```

## 🔧 Configuration Avancée

### Variables d'Environnement
```bash
# Port du serveur
PORT=3000

# Host d'écoute
HOST=0.0.0.0

# Environnement
NODE_ENV=production

# Timeout WebSocket (optionnel)
WS_TIMEOUT=30000
```

### Monitoring avec PM2
```bash
# Voir les logs
pm2 logs aws-quiz

# Redémarrer
pm2 restart aws-quiz

# Monitoring en temps réel
pm2 monit
```

## 🛡️ Sécurité

### Recommandations
- **HTTPS** : Utiliser un certificat SSL en production
- **Firewall** : Limiter l'accès aux ports nécessaires
- **Updates** : Maintenir Node.js et les dépendances à jour
- **Logs** : Surveiller les logs d'accès et d'erreur

### Configuration HTTPS (avec Let's Encrypt)
```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir un certificat
sudo certbot --nginx -d votre-domaine.com

# Renouvellement automatique
sudo crontab -e
# Ajouter : 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoring et Logs

### Logs Application
```bash
# Voir les logs en temps réel
pm2 logs aws-quiz --lines 100

# Logs d'erreur uniquement
pm2 logs aws-quiz --err

# Logs dans un fichier
pm2 logs aws-quiz > quiz-logs.txt
```

### Monitoring Système
```bash
# Utilisation des ressources
pm2 monit

# Statut des processus
pm2 status

# Informations détaillées
pm2 show aws-quiz
```

## 🚨 Dépannage

### Problèmes Courants

#### Port déjà utilisé
```bash
# Trouver le processus utilisant le port 3000
sudo lsof -i :3000
# Tuer le processus
sudo kill -9 PID
```

#### WebSocket ne fonctionne pas
- Vérifier que le proxy (Nginx) supporte les WebSockets
- S'assurer que le firewall autorise les connexions WebSocket

#### Application ne démarre pas
```bash
# Vérifier les logs
pm2 logs aws-quiz
# Vérifier la configuration
pm2 show aws-quiz
```

## 📋 Checklist de Déploiement

### Avant le Déploiement
- [ ] Tests locaux réussis
- [ ] Variables d'environnement configurées
- [ ] Certificats SSL obtenus (si HTTPS)
- [ ] Firewall configuré
- [ ] Monitoring configuré

### Après le Déploiement
- [ ] Application accessible depuis l'extérieur
- [ ] WebSockets fonctionnels
- [ ] Toutes les interfaces accessibles
- [ ] Sons et animations fonctionnels
- [ ] Tests avec plusieurs équipes

### Maintenance
- [ ] Sauvegarde régulière
- [ ] Monitoring des performances
- [ ] Mise à jour des dépendances
- [ ] Surveillance des logs

---

**Version** : 2.4.0 - Guide de Déploiement Complet  
**Plateformes** : Local, Heroku, AWS EC2, Docker  
**Interfaces** : 4 interfaces complètes avec connexion équipes