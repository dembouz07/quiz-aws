# ✅ Guide de Vérification - AWS Genius Quiz

## 🔍 Checklist de Vérification

### 1️⃣ **Vérifier que le serveur fonctionne**

#### Windows (PowerShell) :
```powershell
cd aws-genie-herbe\server
npm start
```

#### Linux/Mac :
```bash
cd aws-genie-herbe/server
npm install
npm start
```

**✅ Résultat attendu :**
```
🎮 AWS GENIUS QUIZ - SERVEUR
================================
✅ Serveur démarré sur http://localhost:3000

📺 ÉCRAN ANIMATEUR (serveur):
   👉 http://localhost:3000/host.html

🎯 BUZZERS ÉQUIPES (clients):
   👉 Équipe 1: http://localhost:3000/client.html?team=1
   👉 Équipe 2: http://localhost:3000/client.html?team=2
```

---

### 2️⃣ **Vérifier la connexion WebSocket**

#### Test 1 : Ouvrir l'animateur
```
http://localhost:3000/host.html
```

**✅ Vérifications :**
- [ ] La page s'affiche
- [ ] En haut à droite : "CONNECTÉ" (vert)
- [ ] Pas d'erreur dans la console (F12)

#### Test 2 : Ouvrir les buzzers
```
http://localhost:3000/client.html?team=1
http://localhost:3000/client.html?team=2
```

**✅ Vérifications :**
- [ ] Équipe 1 : Gros buzzer ORANGE
- [ ] Équipe 2 : Gros buzzer BLEU
- [ ] En haut à droite : "CONNECTÉ" (vert)
- [ ] Texte : "Connecté - En attente du début de partie"

#### Test 3 : Vérifier les logs serveur
Dans le terminal où tourne `npm start`, vous devez voir :
```
📺 Animateur enregistré
🔵 Équipe 1 connectée
🔴 Équipe 2 connectée
```

---

### 3️⃣ **Tester le flux complet du jeu**

#### Étape 1 : Lancer la partie (Animateur)
1. Entrer "Alpha" pour Équipe 1
2. Entrer "Beta" pour Équipe 2
3. Choisir "5 questions"
4. Cliquer "LANCER LE QUIZ"

**✅ Vérifications :**
- [ ] Une question s'affiche
- [ ] Le timer démarre (cercle vert)
- [ ] Les buzzers deviennent LUMINEUX (pas grisés)

#### Étape 2 : Buzzer (Équipe)
1. Cliquer sur le buzzer orange (Équipe 1)

**✅ Vérifications :**
- [ ] Le buzzer s'illumine avec animation
- [ ] Texte change : "VOUS AVEZ BUZZÉ !"
- [ ] L'autre buzzer se grise
- [ ] Son de buzzer joué

#### Étape 3 : Valider (Animateur)
1. Voir "Alpha a buzzé !"
2. Cliquer "✓ Bonne réponse (+2)"

**✅ Vérifications :**
- [ ] Score Équipe 1 passe à 2
- [ ] Explication s'affiche
- [ ] Bouton "SUIVANT →" apparaît

#### Étape 4 : Question suivante
1. Cliquer "SUIVANT →"

**✅ Vérifications :**
- [ ] Nouvelle question s'affiche
- [ ] Buzzers se réactivent
- [ ] Compteur : "Q 2 / 5"

#### Étape 5 : Fin de partie
1. Répondre aux 5 questions
2. Écran de résultats s'affiche

**✅ Vérifications :**
- [ ] Scores finaux corrects
- [ ] Vainqueur affiché
- [ ] Statistiques affichées

---

### 4️⃣ **Tester sur plusieurs machines (réseau local)**

#### Sur la machine SERVEUR :
```bash
# Trouver l'IP
# Windows :
ipconfig

# Linux/Mac :
ifconfig
# ou
ip addr show
```

Chercher l'adresse IPv4 (ex: `192.168.1.10`)

#### Sur les machines CLIENTES :
Ouvrir dans le navigateur (remplacer `192.168.1.10` par votre IP) :
```
http://192.168.1.10:3000/client.html?team=1
http://192.168.1.10:3000/client.html?team=2
```

**✅ Vérifications :**
- [ ] Les clients se connectent
- [ ] "CONNECTÉ" affiché
- [ ] Synchronisation en temps réel

---

### 5️⃣ **Vérifier les fichiers**

```bash
cd aws-genie-herbe/server

# Vérifier la structure
ls -la public/
```

**✅ Fichiers requis :**
```
public/
├── host.html          ✓ Interface animateur
├── client.html        ✓ Interface buzzers
└── questions.js       ✓ Base de questions
```

---

### 6️⃣ **Tests de robustesse**

#### Test de reconnexion
1. Fermer une fenêtre client
2. La rouvrir
**✅ Vérification :** Se reconnecte automatiquement

#### Test de déconnexion serveur
1. Arrêter le serveur (Ctrl+C)
2. Regarder les clients
**✅ Vérification :** "DÉCONNECTÉ" affiché

3. Redémarrer le serveur
**✅ Vérification :** Reconnexion automatique

#### Test de latence
1. Buzzer sur un client
2. Chronométrer le temps avant affichage sur l'animateur
**✅ Vérification :** < 100ms

---

## 🐛 Dépannage

### ❌ "DÉCONNECTÉ" affiché
**Causes possibles :**
- Serveur non démarré
- Mauvaise URL
- Pare-feu bloque le port 3000

**Solutions :**
```bash
# Vérifier que le serveur tourne
netstat -an | grep 3000

# Désactiver temporairement le pare-feu
# Windows :
netsh advfirewall set allprofiles state off

# Linux :
sudo ufw disable
```

### ❌ "Cannot GET /host.html"
**Cause :** Fichier manquant

**Solution :**
```bash
cd aws-genie-herbe/server
node generate-host.js
```

### ❌ Les buzzers ne s'activent pas
**Causes possibles :**
- host.html n'est pas connecté au WebSocket
- Questions non chargées

**Solution :**
1. Ouvrir la console (F12) sur host.html
2. Vérifier les erreurs
3. Rafraîchir la page (F5)

### ❌ "npm: command not found"
**Cause :** Node.js non installé

**Solution :**
```bash
# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Linux (Fedora/RHEL)
sudo dnf install nodejs

# Mac
brew install node
```

---

## 📊 Résumé des Tests

| Test | Statut | Notes |
|------|--------|-------|
| Serveur démarre | ⬜ |  |
| Animateur se connecte | ⬜ |  |
| Équipe 1 se connecte | ⬜ |  |
| Équipe 2 se connecte | ⬜ |  |
| Lancement partie | ⬜ |  |
| Buzzer fonctionne | ⬜ |  |
| Validation réponse | ⬜ |  |
| Scores mis à jour | ⬜ |  |
| Question suivante | ⬜ |  |
| Écran résultats | ⬜ |  |
| Test multi-machines | ⬜ |  |
| Reconnexion auto | ⬜ |  |

---

## ✅ Critères de Validation

L'application est **VALIDÉE** si :
- ✅ Tous les tests passent
- ✅ Aucune erreur dans la console
- ✅ Synchronisation < 100ms
- ✅ Fonctionne sur 3 machines différentes
- ✅ Reconnexion automatique fonctionne

---

## 🚀 Prochaines Étapes

Une fois validé localement :
1. Lire `DEPLOIEMENT-RAPIDE-NGROK.txt` pour tester sur Internet
2. Ou lire `DEPLOIEMENT.md` pour un déploiement permanent
