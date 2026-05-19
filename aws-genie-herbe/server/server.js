const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route par défaut vers la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`\n🎮 AWS GENIUS QUIZ - SERVEUR`);
  console.log(`================================`);
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`\n📺 ÉCRAN ANIMATEUR (serveur):`);
  console.log(`   👉 http://localhost:${PORT}/host.html`);
  console.log(`\n🎯 BUZZERS ÉQUIPES (clients):`);
  console.log(`   👉 Équipe 1: http://localhost:${PORT}/client.html?team=1`);
  console.log(`   👉 Équipe 2: http://localhost:${PORT}/client.html?team=2`);
  console.log(`\n💡 Ouvrez ces URLs sur les machines respectives\n`);
});

// WebSocket
const wss = new WebSocket.Server({ server });

const gameState = {
  teams: {
    1: { name: 'Équipe 1', score: 0, connected: false, repliquesUsed: 0 },
    2: { name: 'Équipe 2', score: 0, connected: false, repliquesUsed: 0 }
  },
  currentQuestion: null,
  answeredTeam: null, // Équipe qui a répondu en premier
  gameStarted: false,
  questionIndex: 0,
  totalQuestions: 10,
  currentLevel: 1, // Niveau actuel (1, 2, ou 3)
  questionsPerLevel: 5, // Questions par niveau
  timePerQuestion: 30, // Temps en secondes
  timer: null,
  timeLeft: 0,
  waitingForReplique: false, // En attente d'une réplique
  firstAnswerWrong: false, // La première réponse était fausse
  maxRepliquesPerTeam: 3 // Maximum 3 répliques par équipe dans toute la partie
};

const clients = {
  host: null,
  team1: null,
  team2: null
};

wss.on('connection', (ws, req) => {
  console.log('📡 Nouvelle connexion');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      handleMessage(ws, data);
    } catch (err) {
      console.error('❌ Erreur parsing message:', err);
    }
  });

  ws.on('close', () => {
    // Détecter quel client s'est déconnecté
    if (ws === clients.host) {
      console.log('📺 Animateur déconnecté');
      clients.host = null;
    } else if (ws === clients.team1) {
      console.log('🔵 Équipe 1 déconnectée');
      clients.team1 = null;
      gameState.teams[1].connected = false;
      broadcast({ type: 'teamDisconnected', team: 1 });
    } else if (ws === clients.team2) {
      console.log('🔴 Équipe 2 déconnectée');
      clients.team2 = null;
      gameState.teams[2].connected = false;
      broadcast({ type: 'teamDisconnected', team: 2 });
    }
  });
});

function handleMessage(ws, data) {
  switch (data.type) {
    case 'registerHost':
      clients.host = ws;
      console.log('📺 Animateur enregistré');
      ws.send(JSON.stringify({ type: 'registered', role: 'host', gameState }));
      break;

    case 'registerTeam':
      const teamNum = data.team;
      if (teamNum === 1) {
        clients.team1 = ws;
        gameState.teams[1].connected = true;
        console.log('🔵 Équipe 1 connectée');
      } else if (teamNum === 2) {
        clients.team2 = ws;
        gameState.teams[2].connected = true;
        console.log('🔴 Équipe 2 connectée');
      }
      ws.send(JSON.stringify({ type: 'registered', role: 'team', team: teamNum, gameState }));
      broadcast({ type: 'teamConnected', team: teamNum });
      break;

    case 'startGame':
      gameState.gameStarted = true;
      gameState.teams[1].name = data.team1Name || 'Équipe 1';
      gameState.teams[2].name = data.team2Name || 'Équipe 2';
      gameState.teams[1].score = 0;
      gameState.teams[2].score = 0;
      gameState.teams[1].repliquesUsed = 0;
      gameState.teams[2].repliquesUsed = 0;
      gameState.totalQuestions = data.totalQuestions || 15; // 5 questions par niveau × 3 niveaux
      gameState.questionsPerLevel = 5;
      gameState.questionIndex = 0;
      gameState.currentLevel = 1;
      gameState.timePerQuestion = data.timePerQuestion || 30;
      console.log('🎮 Partie démarrée');
      broadcast({ 
        type: 'gameStarted', 
        teams: gameState.teams,
        totalQuestions: gameState.totalQuestions,
        timePerQuestion: gameState.timePerQuestion,
        currentLevel: gameState.currentLevel
      });
      break;

    case 'loadQuestion':
      loadQuestionWithTimer(data.question, data.index, data.level);
      break;

    case 'selectAnswer':
      handleAnswerSelection(data.team, data.answerIndex);
      break;

    case 'buzz':
      if (!gameState.buzzedTeam) {
        gameState.buzzedTeam = data.team;
        console.log(`🔔 Équipe ${data.team} a buzzé !`);
        broadcast({ type: 'buzzed', team: data.team, teamName: gameState.teams[data.team].name });
      }
      break;

    case 'answer':
      const team = data.team;
      const correct = data.correct;
      if (correct) {
        gameState.teams[team].score += 2;
        console.log(`✅ Équipe ${team} : +2 points (total: ${gameState.teams[team].score})`);
      } else {
        gameState.teams[team].score = Math.max(0, gameState.teams[team].score - 1);
        console.log(`❌ Équipe ${team} : -1 point (total: ${gameState.teams[team].score})`);
      }
      broadcast({ 
        type: 'answerResult', 
        team, 
        correct, 
        scores: { 
          team1: gameState.teams[1].score, 
          team2: gameState.teams[2].score 
        } 
      });
      gameState.buzzedTeam = null;
      break;

    case 'nextQuestion':
      gameState.answeredTeam = null;
      gameState.waitingForReplique = false;
      gameState.firstAnswerWrong = false;
      if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
      }
      broadcast({ type: 'nextQuestion' });
      break;

    case 'nextLevel':
      gameState.currentLevel++;
      gameState.answeredTeam = null;
      gameState.waitingForReplique = false;
      gameState.firstAnswerWrong = false;
      if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
      }
      console.log(`🎯 Passage au niveau ${gameState.currentLevel}`);
      broadcast({ type: 'nextLevel', level: gameState.currentLevel });
      break;

    case 'endGame':
      console.log('🏁 Partie terminée');
      
      // Déterminer le vainqueur
      const score1 = gameState.teams[1].score;
      const score2 = gameState.teams[2].score;
      let winner = null;
      
      if (score1 > score2) {
        winner = { team: 1, name: gameState.teams[1].name, score: score1 };
      } else if (score2 > score1) {
        winner = { team: 2, name: gameState.teams[2].name, score: score2 };
      }
      
      broadcast({ 
        type: 'gameEnded', 
        scores: { 
          team1: score1, 
          team2: score2 
        },
        winner: winner,
        totalQuestions: gameState.totalQuestions || gameState.questionIndex,
        teams: {
          1: { name: gameState.teams[1].name, score: score1 },
          2: { name: gameState.teams[2].name, score: score2 }
        }
      });
      
      console.log(`🏆 Résultat final: ${gameState.teams[1].name} ${score1} - ${score2} ${gameState.teams[2].name}`);
      if (winner) {
        console.log(`👑 Vainqueur: ${winner.name} avec ${winner.score} points !`);
      } else {
        console.log(`🤝 Égalité parfaite avec ${score1} points chacun !`);
      }
      
      gameState.gameStarted = false;
      break;

    case 'resetBuzzer':
      gameState.buzzedTeam = null;
      broadcast({ type: 'buzzerReset' });
      break;
  }
}

function handleAnswerSelection(team, answerIndex) {
  // Si on attend une réplique, seule l'autre équipe peut répondre
  if (gameState.waitingForReplique && team === gameState.answeredTeam) {
    console.log(`❌ Équipe ${team} ne peut pas rejouer - déjà répondu`);
    return; // L'équipe qui a faussé ne peut pas rejouer
  }
  
  // Si quelqu'un a déjà répondu et qu'on n'attend pas de réplique
  if (gameState.answeredTeam && !gameState.waitingForReplique) {
    console.log(`❌ Question déjà répondue par équipe ${gameState.answeredTeam}`);
    return;
  }
  
  const correct = answerIndex === gameState.currentQuestion.r;
  
  console.log(`🎯 Équipe ${team} a sélectionné la réponse ${answerIndex} (${correct ? 'CORRECTE' : 'INCORRECTE'})`);
  
  // Première réponse
  if (!gameState.answeredTeam) {
    gameState.answeredTeam = team;
    
    if (correct) {
      // Bonne réponse du premier coup - FIN DE QUESTION
      gameState.teams[team].score += 2;
      console.log(`✅ Équipe ${team} : +2 points (total: ${gameState.teams[team].score}) - QUESTION TERMINÉE`);
      
      broadcast({
        type: 'answerResult',
        team: team,
        correct: true,
        answerIndex: answerIndex,
        correctIndex: gameState.currentQuestion.r,
        isReplique: false,
        questionFinished: true,
        scores: getScores()
      });
      
      // Arrêter le timer
      if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
      }
    } else {
      // Mauvaise réponse - vérifier si réplique autorisée selon le niveau
      gameState.firstAnswerWrong = true;
      
      // Sanctions selon le niveau pour le premier groupe
      let penalty = 0;
      switch(gameState.currentLevel) {
        case 1: penalty = -1; break;  // Niveau 1: -1 point
        case 2: penalty = -2; break;  // Niveau 2: -2 points  
        case 3: penalty = -3; break;  // Niveau 3: -3 points
        default: penalty = -1; break;
      }
      
      gameState.teams[team].score = Math.max(0, gameState.teams[team].score + penalty);
      console.log(`❌ Équipe ${team} : ${penalty} points (total: ${gameState.teams[team].score}) - Niveau ${gameState.currentLevel}`);
      
      // Vérifier si réplique autorisée selon le niveau avec probabilité
      let allowReplique = false;
      let repliqueChance = 0;
      
      switch(gameState.currentLevel) {
        case 1: 
          repliqueChance = 0;    // Niveau 1: 0% de chance
          break;  
        case 2: 
          repliqueChance = 0.5;  // Niveau 2: 50% de chance
          break;   
        case 3: 
          repliqueChance = 0.7;  // Niveau 3: 70% de chance
          break;   
        default: 
          repliqueChance = 0; 
          break;
      }
      
      // Tirer au sort pour la réplique
      const randomValue = Math.random();
      allowReplique = randomValue < repliqueChance;
      
      // Vérifier si l'équipe adverse a encore des répliques disponibles
      const otherTeam = team === 1 ? 2 : 1;
      const repliquesRestantes = gameState.maxRepliquesPerTeam - gameState.teams[otherTeam].repliquesUsed;
      
      if (allowReplique && repliquesRestantes <= 0) {
        allowReplique = false;
        console.log(`❌ Équipe ${otherTeam} n'a plus de répliques disponibles (${gameState.teams[otherTeam].repliquesUsed}/${gameState.maxRepliquesPerTeam} utilisées)`);
      }
      
      console.log(`🎲 Niveau ${gameState.currentLevel} - Chance de réplique: ${repliqueChance * 100}% - Résultat: ${allowReplique ? 'AUTORISÉE' : 'NON AUTORISÉE'} (tirage: ${randomValue.toFixed(2)}) - Répliques restantes équipe ${otherTeam}: ${repliquesRestantes}`);
      
      if (allowReplique) {
        gameState.waitingForReplique = true;
        
        broadcast({
          type: 'wrongAnswerWithReplique',
          team: team,
          answerIndex: answerIndex,
          correctIndex: gameState.currentQuestion.r,
          otherTeam: team === 1 ? 2 : 1,
          penalty: penalty,
          level: gameState.currentLevel,
          repliqueChance: repliqueChance * 100,
          repliquesRestantes: repliquesRestantes,
          scores: getScores()
        });
        
        // Incrémenter le compteur de répliques utilisées pour l'équipe qui va répondre
        gameState.teams[otherTeam].repliquesUsed++;
        
        // Donner 15 secondes pour la réplique
        gameState.timeLeft = 15;
        startQuestionTimer();
      } else {
        // Pas de réplique - fin de question
        broadcast({
          type: 'answerResult',
          team: team,
          correct: false,
          answerIndex: answerIndex,
          correctIndex: gameState.currentQuestion.r,
          isReplique: false,
          noReplique: true,
          penalty: penalty,
          level: gameState.currentLevel,
          questionFinished: true,
          scores: getScores()
        });
        
        if (gameState.timer) {
          clearInterval(gameState.timer);
          gameState.timer = null;
        }
      }
    }
  } else {
    // Réplique de l'autre équipe
    console.log(`🔄 Réplique de l'équipe ${team}`);
    
    if (correct) {
      gameState.teams[team].score += 2; // Points normaux pour une réplique réussie
      console.log(`✅ Réplique réussie - Équipe ${team} : +2 points (total: ${gameState.teams[team].score})`);
    } else {
      // Réplique ratée - même pénalité que l'équipe qui a faussé en premier
      let penalty = 0;
      switch(gameState.currentLevel) {
        case 1: penalty = -1; break;
        case 2: penalty = -2; break;
        case 3: penalty = -3; break;
        default: penalty = -1; break;
      }
      gameState.teams[team].score = Math.max(0, gameState.teams[team].score + penalty);
      console.log(`❌ Réplique ratée - Équipe ${team} : ${penalty} points (total: ${gameState.teams[team].score})`);
    }
    
    broadcast({
      type: 'answerResult',
      team: team,
      correct: correct,
      answerIndex: answerIndex,
      correctIndex: gameState.currentQuestion.r,
      isReplique: true,
      questionFinished: true,
      scores: getScores()
    });
    
    // Arrêter le timer
    if (gameState.timer) {
      clearInterval(gameState.timer);
      gameState.timer = null;
    }
  }
}

function getRepliqueChance(level) {
  // Chances de réplique selon le niveau
  switch(level) {
    case 1: return 0.2; // 20% de chance au niveau 1
    case 2: return 0.5; // 50% de chance au niveau 2  
    case 3: return 0.8; // 80% de chance au niveau 3
    default: return 0.3; // 30% par défaut
  }
}

function getScores() {
  return {
    team1: gameState.teams[1].score,
    team2: gameState.teams[2].score
  };
}

function loadQuestionWithTimer(question, index, level) {
  gameState.currentQuestion = question;
  gameState.questionIndex = index;
  gameState.currentLevel = level || gameState.currentLevel;
  gameState.answeredTeam = null;
  gameState.waitingForReplique = false;
  gameState.firstAnswerWrong = false;
  gameState.timeLeft = gameState.timePerQuestion;
  
  console.log(`❓ Question ${index + 1} - Niveau ${gameState.currentLevel} - Affichage séquentiel`);
  
  // Démarrer l'affichage séquentiel
  startSequentialDisplay(question, index, level);
}

function startSequentialDisplay(question, index, level) {
  // Étape 1: Afficher la question avec son dramatique
  broadcast({ 
    type: 'showQuestion', 
    question: question.q, 
    index: index,
    level: level || gameState.currentLevel,
    category: question.c
  });
  
  // Étape 2: Afficher les réponses une par une (après 3 secondes)
  setTimeout(() => {
    broadcast({ type: 'showAnswer', answerIndex: 0, answerText: question.a[0] });
    
    setTimeout(() => {
      broadcast({ type: 'showAnswer', answerIndex: 1, answerText: question.a[1] });
      
      setTimeout(() => {
        broadcast({ type: 'showAnswer', answerIndex: 2, answerText: question.a[2] });
        
        setTimeout(() => {
          broadcast({ type: 'showAnswer', answerIndex: 3, answerText: question.a[3] });
          
          // Étape 3: Démarrer le timer après affichage complet (après 2 secondes)
          setTimeout(() => {
            broadcast({ 
              type: 'startTimer', 
              timeLeft: gameState.timeLeft,
              question: question,
              index: index,
              level: level || gameState.currentLevel
            });
            startQuestionTimer();
          }, 2000);
          
        }, 1500); // Augmenté de 800ms à 1500ms
      }, 1500);   // Augmenté de 800ms à 1500ms
    }, 1500);     // Augmenté de 800ms à 1500ms
  }, 3000);       // Augmenté de 2000ms à 3000ms
}

function startQuestionTimer() {
  // Nettoyer le timer précédent s'il existe
  if (gameState.timer) {
    clearInterval(gameState.timer);
  }
  
  gameState.timer = setInterval(() => {
    gameState.timeLeft--;
    
    // Envoyer le temps restant à tous les clients
    broadcast({ type: 'timerUpdate', timeLeft: gameState.timeLeft });
    
    // Temps écoulé
    if (gameState.timeLeft <= 0) {
      clearInterval(gameState.timer);
      gameState.timer = null;
      
      console.log('⏰ Temps écoulé pour la question !');
      
      // Envoyer la bonne réponse quand le temps est écoulé
      broadcast({ 
        type: 'timeUp',
        correctIndex: gameState.currentQuestion ? gameState.currentQuestion.r : null,
        correctAnswer: gameState.currentQuestion ? gameState.currentQuestion.a[gameState.currentQuestion.r] : null,
        explanation: gameState.currentQuestion ? gameState.currentQuestion.e : null,
        question: gameState.currentQuestion
      });
    }
  }, 1000);
}

function broadcast(data) {
  const message = JSON.stringify(data);
  if (clients.host && clients.host.readyState === WebSocket.OPEN) {
    clients.host.send(message);
  }
  if (clients.team1 && clients.team1.readyState === WebSocket.OPEN) {
    clients.team1.send(message);
  }
  if (clients.team2 && clients.team2.readyState === WebSocket.OPEN) {
    clients.team2.send(message);
  }
}
