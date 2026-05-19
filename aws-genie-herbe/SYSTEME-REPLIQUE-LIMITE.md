# 🎲 Système de Répliques Limitées - AWS Genius Quiz

## 🎯 Problème Résolu

**Avant** : Quand un groupe donnait une mauvaise réponse, l'autre groupe pouvait TOUJOURS donner la bonne réponse en réplique, rendant le jeu trop facile.

**Maintenant** : Le système de répliques est limité par probabilité ET par quota, rendant le jeu plus équilibré et stratégique.

## 🎲 Système de Probabilités

### Chances de Réplique par Niveau
| Niveau | Probabilité | Logique |
|--------|-------------|---------|
| **1** | 0% | Aucune réplique (questions basiques) |
| **2** | 50% | Une chance sur deux |
| **3** | 70% | Forte probabilité (questions difficiles) |

### Comment ça marche
1. Équipe A donne une mauvaise réponse
2. Le système tire au sort selon le niveau
3. **Si tirage favorable** → Réplique offerte à l'équipe B
4. **Si tirage défavorable** → Question terminée, pas de réplique

## 📊 Système de Quotas

### Limite par Équipe
- **Maximum 3 répliques** par équipe dans toute la partie
- Une fois le quota épuisé, plus de répliques possibles
- Compteur visible pour les équipes

### Stratégie
- Les équipes doivent **économiser** leurs répliques
- Utiliser les répliques au bon moment devient crucial
- Ajoute une dimension tactique au jeu

## 🎮 Exemples de Scénarios

### Scénario 1 : Niveau 2, Début de Partie
1. Équipe A donne une mauvaise réponse
2. Tirage au sort : 0.35 < 0.50 → **RÉPLIQUE AUTORISÉE**
3. Équipe B a encore 3 répliques → **RÉPLIQUE OFFERTE**
4. Compteur équipe B : 2 répliques restantes

### Scénario 2 : Niveau 2, Fin de Partie
1. Équipe A donne une mauvaise réponse
2. Tirage au sort : 0.25 < 0.50 → **RÉPLIQUE AUTORISÉE**
3. Équipe B a 0 répliques restantes → **PAS DE RÉPLIQUE**
4. Question terminée

### Scénario 3 : Niveau 3, Milieu de Partie
1. Équipe A donne une mauvaise réponse
2. Tirage au sort : 0.85 > 0.70 → **RÉPLIQUE REFUSÉE**
3. Pas de réplique malgré le quota disponible
4. Question terminée

## 🔧 Paramètres Configurables

### Dans le Code Serveur
```javascript
// Probabilités par niveau
case 1: repliqueChance = 0;    // 0%
case 2: repliqueChance = 0.5;  // 50%
case 3: repliqueChance = 0.7;  // 70%

// Quota maximum
maxRepliquesPerTeam: 3
```

### Ajustements Possibles
- **Probabilités** : Modifier les pourcentages selon la difficulté souhaitée
- **Quotas** : Augmenter/diminuer le nombre de répliques par équipe
- **Niveaux** : Ajouter des niveaux avec des probabilités différentes

## 📱 Interface Utilisateur

### Pour les Équipes
- **Affichage** : "Répliques restantes: 2"
- **Probabilité** : "L'autre équipe peut tenter une réplique... (50% de chance)"
- **Feedback** : Indication claire si réplique accordée ou refusée

### Pour l'Animateur
- **Status** : "RÉPLIQUE POSSIBLE ! (50% chance, 2 restantes)"
- **Logs** : Détails du tirage au sort dans la console
- **Compteurs** : Suivi des répliques utilisées par équipe

## 🎯 Impact sur le Gameplay

### Avantages
✅ **Équilibrage** : Plus de répliques automatiques  
✅ **Stratégie** : Les équipes doivent gérer leurs répliques  
✅ **Suspense** : Le tirage au sort ajoute de l'incertitude  
✅ **Progression** : Plus de chances aux niveaux difficiles  

### Tactiques d'Équipe
- **Économiser** les répliques pour les questions importantes
- **Prendre des risques** calculés selon le niveau
- **Analyser** les probabilités avant de répondre
- **Surveiller** le quota de l'équipe adverse

## 🔍 Logs de Debug

### Console Serveur
```
🎲 Niveau 2 - Chance de réplique: 50% - Résultat: AUTORISÉE (tirage: 0.35) - Répliques restantes équipe 2: 2
❌ Équipe 1 : -2 points (total: 4) - Niveau 2
🔄 Réplique de l'équipe 2
✅ Réplique réussie - Équipe 2 : +2 points (total: 8)
```

## 📈 Statistiques Suggérées

### Métriques à Suivre
- Taux de répliques accordées par niveau
- Utilisation moyenne des quotas par équipe
- Impact sur l'équilibrage des scores
- Satisfaction des joueurs avec le nouveau système

---

**Version** : 2.2.0 - Système de Répliques Limitées  
**Status** : ✅ Implémenté et Testé  
**Impact** : Gameplay plus équilibré et stratégique