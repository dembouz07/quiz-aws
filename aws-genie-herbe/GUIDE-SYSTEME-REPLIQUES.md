# 🎯 Guide du Système de Répliques - AWS Genius Quiz

## 📋 Vue d'ensemble

Le système de répliques permet à l'équipe adverse de tenter une réponse lorsque la première équipe donne une mauvaise réponse. Ce système varie selon le niveau de difficulté pour équilibrer le jeu.

## 🎮 Fonctionnement par Niveau

### 🟢 Niveau 1 - Débutant (Services de base)
- **Réplique** : ❌ NON AUTORISÉE
- **Logique** : Questions basiques, pas de seconde chance
- **Sanction première équipe** : -1 point
- **Résultat** : Question terminée après la première réponse

### 🟡 Niveau 2 - Intermédiaire (Services spécialisés)  
- **Réplique** : ✅ AUTORISÉE
- **Logique** : Questions plus complexes, seconde chance possible
- **Sanction première équipe** : -2 points
- **Temps de réplique** : 15 secondes
- **Points réplique réussie** : +2 points (normal)
- **Sanction réplique ratée** : -2 points (même que première équipe)

### 🔴 Niveau 3 - Avancé (Architecture & optimisation)
- **Réplique** : ✅ AUTORISÉE  
- **Logique** : Questions expertes, seconde chance justifiée
- **Sanction première équipe** : -3 points
- **Temps de réplique** : 15 secondes
- **Points réplique réussie** : +2 points (normal)
- **Sanction réplique ratée** : -3 points (même que première équipe)

## ⚖️ Système de Sanctions

### Première Équipe (qui donne une mauvaise réponse)
| Niveau | Sanction | Justification |
|--------|----------|---------------|
| 1 | -1 point | Questions basiques, sanction légère |
| 2 | -2 points | Questions intermédiaires, sanction modérée |
| 3 | -3 points | Questions avancées, sanction sévère |

### Équipe en Réplique
- **Réponse correcte** : +2 points (récompense normale)
- **Réponse incorrecte** : Même sanction que la première équipe selon le niveau

## 🔄 Flux de Jeu

### Scénario 1 : Première réponse correcte
1. Équipe A répond correctement
2. +2 points pour l'équipe A
3. ✅ Question terminée (pas de réplique)

### Scénario 2 : Première réponse incorrecte (Niveau 1)
1. Équipe A répond incorrectement
2. -1 point pour l'équipe A
3. ❌ Pas de réplique autorisée
4. ✅ Question terminée

### Scénario 3 : Première réponse incorrecte (Niveau 2-3)
1. Équipe A répond incorrectement
2. Sanction appliquée (-2 ou -3 points)
3. ⏰ 15 secondes accordées à l'équipe B
4. **Si équipe B répond correctement** : +2 points, question terminée
5. **Si équipe B répond incorrectement** : Même sanction, question terminée
6. **Si temps écoulé** : Pas de points, question terminée

## 🚫 Règles Importantes

### Restrictions
- ❌ L'équipe qui a donné la première mauvaise réponse **NE PEUT PAS** rejouer
- ❌ Une seule tentative de réplique par question
- ❌ Pas de réplique si la première réponse est correcte

### Timer
- **Question normale** : 30 secondes (configurable)
- **Réplique** : 15 secondes fixes
- **Arrêt automatique** : Dès qu'une réponse correcte est donnée

## 🎯 Stratégie de Jeu

### Pour les Équipes
- **Niveau 1** : Soyez prudents, pas de seconde chance
- **Niveau 2-3** : Prenez des risques calculés, la réplique peut sauver l'autre équipe
- **Réplique** : Analysez rapidement, vous avez peu de temps

### Pour l'Animateur
- **Niveau progressif** : Commencez par le niveau 1, montez graduellement
- **Équilibrage** : Le système de sanctions s'intensifie avec la difficulté
- **Timing** : Surveillez le timer de réplique (15s)

## 🔧 Configuration Technique

### Paramètres Serveur
```javascript
// Sanctions par niveau
const PENALTIES = {
  1: -1,  // Niveau débutant
  2: -2,  // Niveau intermédiaire  
  3: -3   // Niveau avancé
};

// Répliques autorisées
const REPLIQUE_ALLOWED = {
  1: false,  // Pas de réplique niveau 1
  2: true,   // Réplique niveau 2
  3: true    // Réplique niveau 3
};
```

### Messages WebSocket
- `wrongAnswerWithReplique` : Mauvaise réponse avec possibilité de réplique
- `answerResult` : Résultat final avec `isReplique: true/false`
- `timerUpdate` : Mise à jour du timer de réplique

## 📊 Exemples de Scoring

### Exemple Niveau 1
- Équipe A : Mauvaise réponse → -1 point
- Pas de réplique → Question terminée
- **Résultat** : Équipe A (-1), Équipe B (0)

### Exemple Niveau 2
- Équipe A : Mauvaise réponse → -2 points
- Équipe B : Réplique correcte → +2 points
- **Résultat** : Équipe A (-2), Équipe B (+2)

### Exemple Niveau 3
- Équipe A : Mauvaise réponse → -3 points
- Équipe B : Réplique incorrecte → -3 points
- **Résultat** : Équipe A (-3), Équipe B (-3)

---

*Ce système garantit un équilibre entre challenge et équité, avec une progression de difficulté cohérente.*