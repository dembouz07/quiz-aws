# 🎮 AWS Genius Quiz - Mode Multi-Machines

Quiz AWS en réseau avec 3 machines : 1 serveur (animateur) + 2 clients (équipes avec buzzers).

## 📋 Prérequis

- Node.js installé sur la machine serveur
- 3 machines connectées au même réseau local

## 🚀 Installation

### 1. Sur la machine SERVEUR (animateur)

```bash
cd aws-genie-herbe/server
npm install
npm start
```

Le serveur démarre sur `http://localhost:3000`

### 2. Trouver l'adresse IP du serveur

**Windows :**
```bash
ipconfig
```
Cherchez "Adresse IPv4" (ex: `192.168.1.10`)

**Mac/Linux :**
```bash
ifconfig
```

## 🎯 Utilisation

### Machine SERVEUR (Animateur)
Ouvrir dans le navigateur :
```
http://localhost:3000/host.html
```

### Machine ÉQUIPE 1 (Buzzer)
Ouvrir dans le navigateur (remplacer `192.168.1.10` par l'IP du serveur) :
```
http://192.168.1.10:3000/client.html?team=1
```

### Machine ÉQUIPE 2 (Buzzer)
Ouvrir dans le navigateur :
```
http://192.168.1.10:3000/client.html?team=2
```

## 🎮 Déroulement du jeu

1. **Animateur** : Configure les noms d'équipes et lance la partie
2. **Équipes** : Voient leur buzzer s'activer
3. **Question affichée** : Les équipes peuvent buzzer
4. **Première équipe à buzzer** : Son buzzer s'illumine
5. **Animateur** : Valide si la réponse est bonne (+2) ou mauvaise (-1)
6. **Animateur** : Passe à la question suivante

## 🔧 Dépannage

**Les clients ne se connectent pas ?**
- Vérifiez que toutes les machines sont sur le même réseau WiFi
- Désactivez temporairement le pare-feu Windows
- Vérifiez l'adresse IP du serveur

**Le serveur ne démarre pas ?**
```bash
cd server
npm install
```

## 📁 Structure

```
aws-genie-herbe/
├── index.html          # Version standalone (1 machine)
├── server/
│   ├── server.js       # Serveur WebSocket
│   ├── package.json
│   └── public/
│       ├── host.html   # Interface animateur
│       ├── client.html # Interface buzzers équipes
│       └── questions.js
└── README.md
```

## 🎨 Fonctionnalités

- ✅ Synchronisation temps réel via WebSocket
- ✅ Buzzers visuels et sonores
- ✅ Gestion automatique des scores
- ✅ Interface gaming avec effets néon
- ✅ Reconnexion automatique
- ✅ 25 questions AWS

## 📝 Notes

- Le serveur doit rester allumé pendant toute la partie
- Les équipes peuvent se reconnecter si elles perdent la connexion
- Le timer est géré côté serveur pour éviter la triche
