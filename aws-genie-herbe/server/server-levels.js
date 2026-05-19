const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = 3001;

// Questions AWS par niveaux
const QUESTIONS_BY_LEVEL = {
  1: [
    {c:"Compute",q:"Quel service AWS permet de lancer des serveurs virtuels dans le cloud ?",a:["Amazon EC2","Amazon S3","AWS Lambda","Amazon RDS"],r:0,e:"Amazon EC2 (Elastic Compute Cloud) fournit des serveurs virtuels redimensionnables.",level:1},
    {c:"Stockage",q:"Quel service AWS offre un stockage d'objets hautement disponible ?",a:["Amazon EBS","Amazon S3","Amazon EFS","AWS Storage Gateway"],r:1,e:"Amazon S3 (Simple Storage Service) est le service de stockage d'objets d'AWS.",level:1},
    {c:"Base de données",q:"Quel service AWS est une base de données relationnelle managée ?",a:["Amazon DynamoDB","Amazon RDS","Amazon Redshift","Amazon ElastiCache"],r:1,e:"Amazon RDS (Relational Database Service) gère des bases relationnelles.",level:1},
    {c:"Réseau",q:"Quel service AWS permet de créer un réseau privé virtuel isolé dans le cloud ?",a:["AWS Direct Connect","Amazon VPC","Amazon Route 53","AWS Transit Gateway"],r:1,e:"Amazon VPC (Virtual Private Cloud) permet de créer un réseau logiquement isolé.",level:1},
    {c:"Sécurité",q:"Quel service AWS gère les identités, utilisateurs et permissions d'accès ?",a:["AWS Shield","AWS WAF","AWS IAM","Amazon Cognito"],r:2,e:"AWS IAM (Identity and Access Management) contrôle l'accès aux services AWS.",level:1}
  ],
  2: [
    {c:"Compute",q:"Durée maximale d'exécution d'une fonction AWS Lambda ?",a:["5 minutes","10 minutes","15 minutes","30 minutes"],r:2,e:"Une fonction Lambda peut s'exécuter au maximum 15 minutes.",level:2},
    {c:"Stockage",q:"Quelle classe S3 est la moins chère pour des données rarement accédées ?",a:["S3 Standard","S3 Intelligent-Tiering","S3 Glacier Deep Archive","S3 Standard-IA"],r:2,e:"S3 Glacier Deep Archive est la classe la moins chère.",level:2},
    {c:"Base de données",q:"Quel service AWS est compatible MySQL/PostgreSQL avec des performances 5x supérieures ?",a:["Amazon RDS","Amazon Aurora","Amazon Redshift","Amazon Neptune"],r:1,e:"Amazon Aurora est jusqu'à 5x plus rapide que MySQL standard.",level:2},
    {c:"Sécurité",q:"Quel service AWS protège contre les attaques DDoS ?",a:["AWS WAF","AWS Shield","Amazon GuardDuty","AWS Firewall Manager"],r:1,e:"AWS Shield est un service de protection DDoS managé.",level:2},
    {c:"DevOps",q:"Quel service AWS permet de définir l'infrastructure en tant que code (IaC) ?",a:["AWS CodeDeploy","AWS CloudFormation","AWS OpsWorks","AWS Systems Manager"],r:1,e:"AWS CloudFormation permet de modéliser l'infrastructure via des templates.",level:2}
  ],
  3: [
    {c:"Architecture",q:"Quel principe du Well-Architected Framework se concentre sur l'automatisation ?",a:["Reliability","Performance Efficiency","Operational Excellence","Cost Optimization"],r:2,e:"Operational Excellence met l'accent sur l'automatisation et l'amélioration continue.",level:3},
    {c:"Sécurité",q:"Quel service AWS permet de chiffrer automatiquement les données au repos ?",a:["AWS KMS","AWS CloudHSM","AWS Certificate Manager","AWS Secrets Manager"],r:0,e:"AWS KMS (Key Management Service) gère le chiffrement centralisé.",level:3},
    {c:"Réseau",q:"Quel service AWS permet de connecter plusieurs VPC dans différentes régions ?",a:["VPC Peering","AWS Transit Gateway","AWS Direct Connect","AWS PrivateLink"],r:1,e:"AWS Transit Gateway permet de connecter plusieurs VPC et réseaux on-premises.",level:3},
    {c:"Base de données",q:"Quel service AWS permet de migrer des bases de données avec un temps d'arrêt minimal ?",a:["AWS Database Migration Service","AWS DataSync","AWS Storage Gateway","AWS Backup"],r:0,e:"AWS DMS permet la migration continue avec réplication en temps réel.",level:3},
    {c:"Analytics",q:"Quel service AWS est recommandé pour traiter des téraoctets de données avec Apache Spark ?",a:["Amazon Athena","Amazon EMR","AWS Glue","Amazon Kinesis"],r:1,e:"Amazon EMR (Elastic MapReduce) est optimisé pour les gros volumes avec Spark.",level:3}
  ]
};

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public-levels')));

const server = app.listen(PORT, () => {
  console.log(`\n🏆 AWS GENIUS QUIZ - SYSTÈME DE NIVEAUX`);
  console.log(`==========================================`);
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`\n📊 DASHBOARD ADMINISTRATEUR:`);
  console.log(`   👉 http://localhost:${PORT}/admin.html`);
  console.log(`\n🎯 INTERFACES GROUPES:`);
  console.log(`   👉 Groupe 1: http://localhost:${PORT}/group.html?group=1`);
  console.log(`   👉 Groupe 2: http://localhost:${PORT}/group.html?group=2`);
  console.log(`   👉 Groupe 3: http://localhost:${PORT}/group.html?group=3`);
  console.log(`   👉 Groupe 4: http://localhost:${PORT}/group.html?group=4`);
  console.log(`   👉 Groupe 5: http://localhost:${PORT}/group.html?group=5`);
  console.log(`\n🎮 INTERFACE ANIMATEUR:`);
  console.log(`   👉 http://localhost:${PORT}/host-levels.html\n`);
});

// WebSocket
const wss = new WebSocket.Server({ server });

// État du jeu avec système de niveaux
const gameState = {
  phase: 'setup',
  currentLevel: 1,
  groups: {
    1: { name: 'Groupe 1', score: 0, level: 1, connected: false, eliminated: false, answers: [] },
    2: { name: 'Groupe 2', score: 0, level: 1, connected: false, eliminated: false, answers: [] },
    3: { name: 'Groupe 3', score: 0, level: 1, connected: false, eliminated: false, answers: [] },
    4: { name: 'Groupe 4', score: 0, level: 1, connected: false, eliminated: false, answers: [] },
    5: { name: 'Groupe 5', score: 0, level: 1, connected: false, eliminated: false, answers: [] }
  },
  currentQuestion: null,
  questionIndex: 0,
  questionsPerLevel: 5,
  timePerQuestion: 30,
  timer: null,
  timeLeft: 0,
  answeredGroups: new Set(),
  levelResults: {},
  finalists: [],
  gameStarted: false
};

const clients = {
  admin: null,
  host: null,
  groups: {}
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
    if (ws === clients.admin) {
      console.log('📊 Admin déconnecté');
      clients.admin = null;
    } else if (ws === clients.host) {
      console.log('🎮 Animateur déconnecté');
      clients.host = null;
    } else {
      for (let groupId in clients.groups) {
        if (clients.groups[groupId] === ws) {
          console.log(`👥 Groupe ${groupId} déconnecté`);
          clients.groups[groupId] = null;
          gameState.groups[groupId].connected = false;
          broadcast({ type: 'groupDisconnected', group: parseInt(groupId) });
          break;
        }
      }
    }
  });
});

function handleMessage(ws, data) {
  switch (data.type) {
    case 'registerAdmin':
      clients.admin = ws;
      console.log('📊 Admin enregistré');
      ws.send(JSON.stringify({ type: 'registered', role: 'admin', gameState }));
      break;

    case 'registerHost':
      clients.host = ws;
      console.log('🎮 Animateur enregistré');
      ws.send(JSON.stringify({ type: 'registered', role: 'host', gameState }));
      break;

    case 'registerGroup':
      const groupId = data.group;
      clients.groups[groupId] = ws;
      gameState.groups[groupId].connected = true;
      console.log(`👥 Groupe ${groupId} connecté`);
      ws.send(JSON.stringify({ type: 'registered', role: 'group', group: groupId, gameState }));
      broadcast({ type: 'groupConnected', group: groupId });
      break;

    case 'startLevel':
      const level = data.level;
      startLevel(level);
      break;

    case 'loadQuestion':
      loadQuestion(data.level, data.questionIndex);
      break;

    case 'selectAnswer':
      handleAnswerSelection(data.group, data.answerIndex);
      break;

    case 'nextQuestion':
      nextQuestion();
      break;

    case 'endLevel':
      endLevel();
      break;

    case 'resetGame':
      resetGame();
      break;
  }
}

function startLevel(level) {
  gameState.phase = `level${level}`;
  gameState.currentLevel = level;
  gameState.questionIndex = 0;
  gameState.answeredGroups.clear();
  
  Object.keys(gameState.groups).forEach(groupId => {
    if (!gameState.groups[groupId].eliminated) {
      gameState.groups[groupId].answers = [];
    }
  });

  console.log(`🎯 Début du niveau ${level}`);
  broadcast({ type: 'levelStarted', level, gameState });
  
  setTimeout(() => {
    loadQuestion(level, 0);
  }, 2000);
}

function loadQuestion(level, questionIndex) {
  const questions = QUESTIONS_BY_LEVEL[level];
  if (!questions || questionIndex >= questions.length || questionIndex >= gameState.questionsPerLevel) {
    endLevel();
    return;
  }

  const question = questions[questionIndex];
  gameState.currentQuestion = question;
  gameState.questionIndex = questionIndex;
  gameState.answeredGroups.clear();
  gameState.timeLeft = gameState.timePerQuestion;

  console.log(`❓ Question ${questionIndex + 1}/${gameState.questionsPerLevel} - Niveau ${level}`);

  broadcast({ 
    type: 'newQuestion', 
    question, 
    questionIndex, 
    level,
    timeLeft: gameState.timeLeft
  });

  startTimer();
}

function startTimer() {
  if (gameState.timer) {
    clearInterval(gameState.timer);
  }

  gameState.timer = setInterval(() => {
    gameState.timeLeft--;
    
    broadcast({ type: 'timerUpdate', timeLeft: gameState.timeLeft });

    if (gameState.timeLeft <= 0) {
      clearInterval(gameState.timer);
      gameState.timer = null;
      
      console.log('⏰ Temps écoulé !');
      broadcast({ type: 'timeUp' });
      
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  }, 1000);
}

function handleAnswerSelection(groupId, answerIndex) {
  if (gameState.answeredGroups.has(groupId) || gameState.groups[groupId].eliminated) {
    return;
  }

  const correct = answerIndex === gameState.currentQuestion.r;
  gameState.answeredGroups.add(groupId);
  
  gameState.groups[groupId].answers.push({
    questionIndex: gameState.questionIndex,
    answerIndex,
    correct,
    timeUsed: gameState.timePerQuestion - gameState.timeLeft
  });

  let points = 0;
  if (correct) {
    const timeBonus = Math.max(0, gameState.timeLeft / gameState.timePerQuestion);
    points = Math.round(10 + (timeBonus * 5));
  } else {
    points = -2;
  }

  gameState.groups[groupId].score = Math.max(0, gameState.groups[groupId].score + points);

  console.log(`🎯 Groupe ${groupId}: ${correct ? '✅' : '❌'} (${points} pts, total: ${gameState.groups[groupId].score})`);

  broadcast({
    type: 'answerResult',
    group: groupId,
    answerIndex,
    correct,
    points,
    correctIndex: gameState.currentQuestion.r,
    timeUsed: gameState.timePerQuestion - gameState.timeLeft,
    scores: getScores()
  });

  const activeGroups = Object.keys(gameState.groups).filter(id => 
    !gameState.groups[id].eliminated && gameState.groups[id].connected
  );
  
  if (gameState.answeredGroups.size >= activeGroups.length) {
    clearInterval(gameState.timer);
    gameState.timer = null;
    
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  }
}

function nextQuestion() {
  gameState.questionIndex++;
  
  if (gameState.questionIndex >= gameState.questionsPerLevel) {
    endLevel();
  } else {
    loadQuestion(gameState.currentLevel, gameState.questionIndex);
  }
}

function endLevel() {
  console.log(`🏁 Fin du niveau ${gameState.currentLevel}`);
  
  const results = calculateLevelResults();
  gameState.levelResults[gameState.currentLevel] = results;
  
  broadcast({ 
    type: 'levelEnded', 
    level: gameState.currentLevel, 
    results,
    gameState 
  });

  if (gameState.currentLevel < 3) {
    eliminateGroups();
  }
}

function calculateLevelResults() {
  const results = [];
  
  Object.keys(gameState.groups).forEach(groupId => {
    const group = gameState.groups[groupId];
    if (!group.eliminated) {
      const correct = group.answers.filter(a => a.correct).length;
      
      results.push({
        groupId: parseInt(groupId),
        groupName: group.name,
        score: group.score,
        correct,
        total: group.answers.length,
        eliminated: group.eliminated
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
}

function eliminateGroups() {
  const results = gameState.levelResults[gameState.currentLevel];
  
  if (results.length > 1) {
    const lastScore = results[results.length - 1].score;
    const secondLastScore = results[results.length - 2].score;
    
    if (lastScore < secondLastScore) {
      const eliminatedGroupId = results[results.length - 1].groupId;
      gameState.groups[eliminatedGroupId].eliminated = true;
      
      console.log(`❌ Groupe ${eliminatedGroupId} éliminé (score: ${lastScore})`);
      broadcast({ type: 'groupEliminated', group: eliminatedGroupId });
    }
  }
}

function resetGame() {
  gameState.phase = 'setup';
  gameState.currentLevel = 1;
  gameState.questionIndex = 0;
  gameState.answeredGroups.clear();
  gameState.levelResults = {};
  gameState.finalists = [];
  
  Object.keys(gameState.groups).forEach(groupId => {
    gameState.groups[groupId].score = 0;
    gameState.groups[groupId].level = 1;
    gameState.groups[groupId].eliminated = false;
    gameState.groups[groupId].answers = [];
  });

  if (gameState.timer) {
    clearInterval(gameState.timer);
    gameState.timer = null;
  }

  console.log('🔄 Jeu réinitialisé');
  broadcast({ type: 'gameReset', gameState });
}

function getScores() {
  const scores = {};
  Object.keys(gameState.groups).forEach(groupId => {
    scores[`group${groupId}`] = gameState.groups[groupId].score;
  });
  return scores;
}

function broadcast(data) {
  const message = JSON.stringify(data);
  
  if (clients.admin && clients.admin.readyState === WebSocket.OPEN) {
    clients.admin.send(message);
  }
  
  if (clients.host && clients.host.readyState === WebSocket.OPEN) {
    clients.host.send(message);
  }
  
  Object.keys(clients.groups).forEach(groupId => {
    const client = clients.groups[groupId];
    if (client && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

console.log('🚀 Serveur de quiz par niveaux prêt !');