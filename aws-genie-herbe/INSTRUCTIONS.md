# 🎮 AWS Genius Quiz - Mode Multi-Machines

## ⚡ Démarrage Rapide

### 1️⃣ Installer Node.js (machine serveur uniquement)
Télécharger sur https://nodejs.org/ (version LTS)

### 2️⃣ Démarrer le serveur

```bash
cd aws-genie-herbe/server
npm install
npm start
```

### 3️⃣ Ouvrir les interfaces

**📺 Animateur (sur la machine serveur) :**
```
http://localhost:3000/host.html
```

**🔵 Équipe 1 (sur une autre machine) :**
```
http://[IP-DU-SERVEUR]:3000/client.html?team=1
```

**🔴 Équipe 2 (sur une troisième machine) :**
```
http://[IP-DU-SERVEUR]:3000/client.html?team=2
```

### 4️⃣ Trouver l'IP du serveur

**Windows :**
```bash
ipconfig
```
Chercher "Adresse IPv4" (ex: 192.168.1.10)

---

## 📝 Note Importante

Les fichiers `host.html` et `client.html` doivent être créés dans le dossier `server/public/`.

Je vais maintenant les créer pour vous...
