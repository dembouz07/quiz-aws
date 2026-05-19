# 🚀 DÉMARRAGE RAPIDE - AWS Genius Quiz

## ⚡ Lancement Immédiat (1 minute)

### 1. **Démarrer le Serveur**
```bash
cd aws-genie-herbe/server
npm start
```

### 2. **Ouvrir les Interfaces**

#### 🎯 **Animateur** (sur la machine serveur)
```
http://localhost:3000/host.html
```

#### 👥 **Équipes** (sur les machines clientes)
```
http://localhost:3000/team-login.html
```

#### 🏠 **Page d'Accueil** (navigation complète)
```
http://localhost:3000
```

## 🎮 Utilisation Rapide

### **Étape 1 : Animateur**
1. Ouvrir http://localhost:3000/host.html
2. Configurer les noms d'équipes (optionnel)
3. Cliquer "▶ LANCER LE QUIZ"

### **Étape 2 : Équipes**
1. Ouvrir http://localhost:3000/team-login.html
2. Saisir le nom de l'équipe
3. Sélectionner la position (Équipe 1 ou 2)
4. Cliquer "🎯 REJOINDRE LE QUIZ"

### **Étape 3 : Jouer**
- Les questions s'affichent séquentiellement
- Premier à cliquer = prioritaire
- Système de répliques automatique
- Sons dramatiques inclus

## 🌐 Accès Réseau (Multi-machines)

### **Remplacer `localhost` par l'IP du serveur :**

Si le serveur est sur la machine `192.168.1.100` :

#### 🎯 **Animateur**
```
http://192.168.1.100:3000/host.html
```

#### 👥 **Équipes**
```
http://192.168.1.100:3000/team-login.html
```

### **Trouver l'IP du serveur :**
```bash
# Windows
ipconfig

# Linux/Mac
ifconfig
```

## 🔧 Dépannage Rapide

### **Port 3000 occupé ?**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Linux/Mac
lsof -i :3000
kill -9 [PID]
```

### **Connexion WebSocket échoue ?**
- Vérifier le firewall
- S'assurer que le port 3000 est ouvert
- Utiliser l'IP correcte du serveur

### **Questions ne s'affichent pas ?**
- Vérifier que `questions.js` est présent
- Recharger la page animateur
- Vérifier la console pour les erreurs

## 📱 Interfaces Disponibles

| Interface | URL | Description |
|-----------|-----|-------------|
| 🏠 **Accueil** | `/` | Navigation principale |
| 👥 **Équipes** | `/team-login.html` | Connexion équipes |
| 🎯 **Animateur** | `/host.html` | Contrôle du jeu |
| ⚙️ **DevOps** | `/devops-quiz.html` | Quiz spécialisé |

## 🎯 Fonctionnalités Clés

- ✅ **Répliques** : Système probabiliste par niveau
- ✅ **Sons** : Effets dramatiques style "24h Chrono"
- ✅ **Timing** : Affichage séquentiel des questions
- ✅ **Scores** : +2 correct, -1/-2/-3 incorrect selon niveau
- ✅ **Équipes** : Noms personnalisés et positions
- ✅ **Temps réel** : Synchronisation WebSocket

## 🚀 Déploiement Production

Pour un déploiement en production, voir :
- `GUIDE-DEPLOIEMENT.md` - Guide complet
- Heroku, AWS EC2, Docker supportés
- HTTPS et certificats SSL inclus

---
**🎮 Prêt à jouer en 1 minute !**