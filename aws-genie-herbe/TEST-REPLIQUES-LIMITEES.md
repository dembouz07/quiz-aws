# 🧪 Guide de Test - Système de Répliques Limitées

## 🎯 Objectif
Tester le nouveau système qui limite les répliques par probabilité et quota pour éviter que l'autre équipe puisse toujours donner la bonne réponse.

## 🚀 Démarrage des Tests

### 1. Lancer le Serveur
```bash
cd aws-genie-herbe/server
npm start
```

### 2. Ouvrir les Interfaces
- **Animateur** : http://localhost:3000/host.html
- **Équipe 1** : http://localhost:3000/client.html?team=1
- **Équipe 2** : http://localhost:3000/client.html?team=2

## 🧪 Tests à Effectuer

### Test 1 : Niveau 1 (0% de réplique)
**Objectif** : Vérifier qu'aucune réplique n'est offerte au niveau 1

1. Configurer le jeu en "Niveau 1 - Débutant"
2. Lancer une question
3. Faire donner une **mauvaise réponse** par l'équipe 1
4. **Résultat attendu** : 
   - ❌ Équipe 1 perd 1 point
   - ❌ Aucune réplique offerte à l'équipe 2
   - ✅ Question terminée immédiatement

### Test 2 : Niveau 2 (50% de réplique)
**Objectif** : Vérifier le système probabiliste

1. Configurer le jeu en "Niveau 2 - Intermédiaire"
2. Répéter 10 fois :
   - Faire donner une mauvaise réponse
   - Noter si réplique accordée ou refusée
3. **Résultat attendu** : 
   - Environ 50% de répliques accordées
   - Messages dans la console avec les tirages au sort
   - Compteur de répliques qui diminue

### Test 3 : Épuisement du Quota
**Objectif** : Vérifier la limite de 3 répliques par équipe

1. Configurer le jeu en "Niveau 3 - Avancé" (70% de chance)
2. Faire utiliser 3 répliques à l'équipe 2
3. Faire donner une nouvelle mauvaise réponse par l'équipe 1
4. **Résultat attendu** :
   - Même si tirage favorable, pas de réplique (quota épuisé)
   - Message : "Équipe 2 n'a plus de répliques disponibles"

### Test 4 : Première Réponse Correcte
**Objectif** : Vérifier qu'une bonne réponse termine la question

1. N'importe quel niveau
2. Faire donner une **bonne réponse** par l'équipe 1
3. **Résultat attendu** :
   - ✅ +2 points pour l'équipe 1
   - ✅ Question terminée (pas de réplique)
   - ✅ Passage à la question suivante

## 📊 Vérifications dans la Console

### Messages à Observer
```
🎲 Niveau 2 - Chance de réplique: 50% - Résultat: AUTORISÉE (tirage: 0.35) - Répliques restantes équipe 2: 2
❌ Équipe 1 : -2 points (total: 4) - Niveau 2
🔄 Réplique de l'équipe 2
✅ Réplique réussie - Équipe 2 : +2 points (total: 8)
```

### Cas de Refus
```
🎲 Niveau 2 - Chance de réplique: 50% - Résultat: NON AUTORISÉE (tirage: 0.75) - Répliques restantes équipe 2: 2
❌ Équipe 1 : -2 points (total: 2) - Niveau 2
```

### Quota Épuisé
```
❌ Équipe 2 n'a plus de répliques disponibles (3/3 utilisées)
```

## 🎮 Interface Utilisateur

### Côté Équipes
- **Réplique accordée** : "🎯 RÉPLIQUE POSSIBLE ! Répliques restantes: 2"
- **Probabilité affichée** : "L'autre équipe peut tenter une réplique... (50% de chance)"

### Côté Animateur
- **Status détaillé** : "RÉPLIQUE POSSIBLE ! (50% chance, 2 restantes)"
- **Compteurs visibles** pour chaque équipe

## ✅ Critères de Réussite

### Fonctionnalités Validées
- [ ] Niveau 1 : 0% de répliques
- [ ] Niveau 2 : ~50% de répliques sur plusieurs tests
- [ ] Niveau 3 : ~70% de répliques sur plusieurs tests
- [ ] Quota de 3 répliques par équipe respecté
- [ ] Compteurs mis à jour correctement
- [ ] Interface utilisateur informative
- [ ] Logs de debug complets

### Équilibrage du Jeu
- [ ] Plus de répliques automatiques
- [ ] Stratégie nécessaire pour gérer les quotas
- [ ] Suspense maintenu avec les probabilités
- [ ] Progression logique de difficulté

## 🐛 Problèmes Potentiels

### À Surveiller
1. **Synchronisation** : Compteurs identiques sur toutes les interfaces
2. **Reset** : Quotas remis à zéro au début de chaque partie
3. **Edge cases** : Comportement quand quota = 0 et probabilité = 100%
4. **Performance** : Pas de lag avec les calculs probabilistes

### Solutions de Debug
- Vérifier les logs de la console serveur
- Inspecter les messages WebSocket
- Tester avec différentes configurations
- Valider les calculs mathématiques

---

**Instructions** : Effectuer tous les tests dans l'ordre et noter les résultats. Le système doit être équilibré et prévisible tout en gardant un élément de surprise.