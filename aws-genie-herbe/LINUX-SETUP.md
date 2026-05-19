# 🐧 AWS Genius Quiz - Installation Linux

## 📋 Prérequis

- Ubuntu 20.04+ / Debian 11+ / Fedora 35+ / CentOS 8+
- Accès sudo
- Connexion Internet

---

## 🚀 Installation Rapide

### 1️⃣ Installer Node.js

#### Ubuntu / Debian :
```bash
# Installer Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

#### Fedora / RHEL / CentOS :
```bash
# Installer Node.js
sudo dnf install nodejs npm

# Ou via NodeSource pour version récente
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install nodejs

# Vérifier
node --version
npm --version
```

#### Arch Linux :
```bash
sudo pacman -S nodejs npm
```

---

### 2️⃣ Transférer les fichiers sur Linux

#### Option A : Via Git (recommandé)
```bash
# Sur Windows, pousser sur GitHub
cd aws-genie-herbe/server
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/aws-quiz.git
git push -u origin main

# Sur Linux, cloner
git clone https://github.com/VOTRE-USERNAME/aws-quiz.git
cd aws-quiz
```

#### Option B : Via SCP (depuis Windows)
```bash
# Sur Windows PowerShell
scp -r aws-genie-herbe/server user@linux-ip:/home/user/

# Sur Linux
cd ~/server
```

#### Option C : Via USB
```bash
# Copier le dossier server sur une clé USB
# Sur Linux, monter la clé et copier
cp -r /media/usb/server ~/aws-quiz-server
cd ~/aws-quiz-server
```

---

### 3️⃣ Installer les dépendances

```bash
cd aws-genie-herbe/server
# ou cd ~/aws-quiz-server

npm install
```

**✅ Résultat attendu :**
```
added 50 packages in 5s
```

---

### 4️⃣ Démarrer le serveur

```bash
npm start
```

**✅ Résultat attendu :**
```
🎮 AWS GENIUS QUIZ - SERVEUR
================================
✅ Serveur démarré sur http://localhost:3000
```

---

### 5️⃣ Trouver l'adresse IP

```bash
# Méthode 1 : ip
ip addr show | grep "inet " | grep -v 127.0.0.1

# Méthode 2 : ifconfig
ifconfig | grep "inet " | grep -v 127.0.0.1

# Méthode 3 : hostname
hostname -I
```

**Exemple de sortie :**
```
192.168.1.50
```

---

### 6️⃣ Ouvrir le pare-feu

#### Ubuntu / Debian (UFW) :
```bash
# Autoriser le port 3000
sudo ufw allow 3000/tcp

# Vérifier
sudo ufw status
```

#### Fedora / RHEL / CentOS (firewalld) :
```bash
# Autoriser le port 3000
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# Vérifier
sudo firewall-cmd --list-ports
```

#### Désactiver temporairement (pour test) :
```bash
# Ubuntu/Debian
sudo ufw disable

# Fedora/RHEL/CentOS
sudo systemctl stop firewalld
```

---

### 7️⃣ Tester l'application

#### Sur la machine Linux (serveur) :
```bash
# Ouvrir dans le navigateur
firefox http://localhost:3000/host.html
# ou
google-chrome http://localhost:3000/host.html
# ou
xdg-open http://localhost:3000/host.html
```

#### Sur d'autres machines (clients) :
Remplacer `192.168.1.50` par votre IP :
```
http://192.168.1.50:3000/client.html?team=1
http://192.168.1.50:3000/client.html?team=2
```

---

## 🔧 Configuration Avancée

### Lancer le serveur en arrière-plan

#### Option 1 : Avec screen
```bash
# Installer screen
sudo apt install screen  # Ubuntu/Debian
sudo dnf install screen  # Fedora/RHEL

# Lancer dans une session screen
screen -S aws-quiz
cd aws-genie-herbe/server
npm start

# Détacher : Ctrl+A puis D
# Réattacher : screen -r aws-quiz
```

#### Option 2 : Avec tmux
```bash
# Installer tmux
sudo apt install tmux  # Ubuntu/Debian
sudo dnf install tmux  # Fedora/RHEL

# Lancer dans une session tmux
tmux new -s aws-quiz
cd aws-genie-herbe/server
npm start

# Détacher : Ctrl+B puis D
# Réattacher : tmux attach -t aws-quiz
```

#### Option 3 : Avec PM2 (production)
```bash
# Installer PM2
sudo npm install -g pm2

# Lancer l'application
cd aws-genie-herbe/server
pm2 start server.js --name aws-quiz

# Commandes utiles
pm2 status          # Voir le statut
pm2 logs aws-quiz   # Voir les logs
pm2 restart aws-quiz # Redémarrer
pm2 stop aws-quiz   # Arrêter
pm2 delete aws-quiz # Supprimer

# Démarrage automatique au boot
pm2 startup
pm2 save
```

---

### Créer un service systemd

```bash
# Créer le fichier service
sudo nano /etc/systemd/system/aws-quiz.service
```

Contenu :
```ini
[Unit]
Description=AWS Genius Quiz Server
After=network.target

[Service]
Type=simple
User=votre-user
WorkingDirectory=/home/votre-user/aws-genie-herbe/server
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Activer le service :
```bash
# Recharger systemd
sudo systemctl daemon-reload

# Démarrer le service
sudo systemctl start aws-quiz

# Activer au démarrage
sudo systemctl enable aws-quiz

# Vérifier le statut
sudo systemctl status aws-quiz

# Voir les logs
sudo journalctl -u aws-quiz -f
```

---

## 🌐 Accès depuis Internet (Linux)

### Option 1 : ngrok
```bash
# Télécharger ngrok
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar xvzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin/

# Configurer le token (depuis https://dashboard.ngrok.com)
ngrok config add-authtoken VOTRE_TOKEN

# Lancer le tunnel
ngrok http 3000
```

### Option 2 : Serveur avec IP publique
Si votre serveur Linux a une IP publique :

```bash
# Modifier server.js pour écouter sur toutes les interfaces
# Ligne : const PORT = 3000;
# Ajouter après :
# server.listen(PORT, '0.0.0.0', () => { ... });

# Ouvrir le port dans le pare-feu
sudo ufw allow 3000/tcp

# Accès via IP publique
http://VOTRE_IP_PUBLIQUE:3000/host.html
```

---

## 🐛 Dépannage Linux

### ❌ "npm: command not found"
```bash
# Vérifier si Node.js est installé
which node
which npm

# Réinstaller si nécessaire
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### ❌ "EACCES: permission denied"
```bash
# Changer les permissions
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ~/aws-genie-herbe
```

### ❌ "Port 3000 already in use"
```bash
# Trouver le processus utilisant le port
sudo lsof -i :3000

# Tuer le processus
sudo kill -9 PID

# Ou changer le port dans server.js
```

### ❌ Les clients ne se connectent pas
```bash
# Vérifier que le serveur écoute
sudo netstat -tulpn | grep 3000

# Vérifier le pare-feu
sudo ufw status
sudo firewall-cmd --list-ports

# Tester la connexion
curl http://localhost:3000/host.html
```

### ❌ "WebSocket connection failed"
```bash
# Vérifier les logs serveur
pm2 logs aws-quiz
# ou
sudo journalctl -u aws-quiz -f

# Vérifier la configuration réseau
ping 192.168.1.50  # Remplacer par votre IP
```

---

## 📊 Commandes Utiles

```bash
# Voir les processus Node.js
ps aux | grep node

# Voir l'utilisation du port 3000
sudo lsof -i :3000

# Voir les connexions actives
sudo netstat -an | grep 3000

# Tester le serveur
curl -I http://localhost:3000/host.html

# Voir les logs en temps réel
tail -f ~/.pm2/logs/aws-quiz-out.log
```

---

## ✅ Checklist Linux

- [ ] Node.js installé (v16+)
- [ ] Dépendances npm installées
- [ ] Serveur démarre sans erreur
- [ ] Port 3000 ouvert dans le pare-feu
- [ ] IP locale trouvée
- [ ] Animateur accessible (localhost)
- [ ] Clients accessibles (IP locale)
- [ ] WebSocket fonctionne
- [ ] Synchronisation temps réel OK

---

## 🚀 Déploiement Production Linux

Pour un déploiement production sur un serveur Linux :

1. **Utiliser PM2** pour la gestion des processus
2. **Configurer Nginx** comme reverse proxy
3. **Obtenir un certificat SSL** avec Let's Encrypt
4. **Configurer un nom de domaine**

Voir `DEPLOIEMENT.md` pour plus de détails.
