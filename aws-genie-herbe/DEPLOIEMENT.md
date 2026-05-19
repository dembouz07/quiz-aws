# 🚀 Déploiement AWS Genius Quiz

## 🌐 Option 1 : Render.com (GRATUIT et FACILE)

### Étapes :

1. **Créer un compte sur Render.com**
   - Aller sur https://render.com
   - S'inscrire gratuitement avec GitHub

2. **Pousser le code sur GitHub**
   ```bash
   cd aws-genie-herbe/server
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/VOTRE-USERNAME/aws-quiz.git
   git push -u origin main
   ```

3. **Créer un Web Service sur Render**
   - Cliquer "New +" → "Web Service"
   - Connecter votre repo GitHub
   - Configuration :
     - **Name**: aws-genius-quiz
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free
   - Cliquer "Create Web Service"

4. **Accéder à votre quiz**
   - URL fournie par Render : `https://aws-genius-quiz.onrender.com`
   - Animateur : `https://aws-genius-quiz.onrender.com/host.html`
   - Équipe 1 : `https://aws-genius-quiz.onrender.com/client.html?team=1`
   - Équipe 2 : `https://aws-genius-quiz.onrender.com/client.html?team=2`

⚠️ **Note** : Le plan gratuit de Render met le service en veille après 15 min d'inactivité. Le premier accès peut prendre 30 secondes.

---

## 🔧 Option 2 : Heroku (GRATUIT avec limitations)

### Étapes :

1. **Installer Heroku CLI**
   ```bash
   # Windows (avec Chocolatey)
   choco install heroku-cli
   
   # Ou télécharger : https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Déployer**
   ```bash
   cd aws-genie-herbe/server
   heroku login
   heroku create aws-genius-quiz
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

3. **Accéder**
   - URL : `https://aws-genius-quiz.herokuapp.com`

---

## ☁️ Option 3 : AWS (Elastic Beanstalk)

### Étapes :

1. **Installer AWS CLI et EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialiser et déployer**
   ```bash
   cd aws-genie-herbe/server
   eb init -p node.js aws-quiz
   eb create aws-quiz-env
   eb open
   ```

3. **Configuration**
   - Créer un fichier `.ebextensions/websocket.config` :
   ```yaml
   option_settings:
     aws:elasticbeanstalk:environment:proxy:
       ProxyServer: nginx
     aws:elasticbeanstalk:environment:proxy:staticfiles:
       /: public
   ```

---

## 🏠 Option 4 : Réseau local uniquement (ACTUEL)

**Avantages** : Gratuit, rapide, pas de configuration
**Inconvénients** : Fonctionne uniquement sur le même réseau WiFi

### Configuration actuelle :
- Serveur : `http://192.168.42.1:3000`
- Toutes les machines doivent être sur le même WiFi

---

## 🔒 Option 5 : Tunnel ngrok (Test rapide)

Pour tester rapidement avec des machines sur Internet différent :

1. **Installer ngrok**
   - Télécharger : https://ngrok.com/download
   - Créer un compte gratuit

2. **Lancer le tunnel**
   ```bash
   ngrok http 3000
   ```

3. **Utiliser l'URL fournie**
   - ngrok affiche : `https://abc123.ngrok.io`
   - Animateur : `https://abc123.ngrok.io/host.html`
   - Équipe 1 : `https://abc123.ngrok.io/client.html?team=1`
   - Équipe 2 : `https://abc123.ngrok.io/client.html?team=2`

⚠️ **Note** : L'URL change à chaque redémarrage de ngrok (version gratuite)

---

## 📊 Comparaison

| Option | Coût | Difficulté | Permanent | WebSocket |
|--------|------|------------|-----------|-----------|
| Réseau local | Gratuit | ⭐ Facile | ✅ | ✅ |
| ngrok | Gratuit | ⭐⭐ Moyen | ❌ URL change | ✅ |
| Render.com | Gratuit | ⭐⭐ Moyen | ✅ | ✅ |
| Heroku | Gratuit | ⭐⭐⭐ Avancé | ✅ | ✅ |
| AWS EB | Payant | ⭐⭐⭐⭐ Expert | ✅ | ✅ |

---

## 🎯 Recommandation

**Pour une formation AWS** : Utilisez **Render.com** (gratuit, permanent, facile)

**Pour un test rapide** : Utilisez **ngrok** (5 minutes de setup)

**Pour production** : Utilisez **AWS Elastic Beanstalk** (cohérent avec la formation AWS)
