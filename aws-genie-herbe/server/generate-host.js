const fs = require('fs');
const path = require('path');

// Lire le CSS du fichier index.html existant
const indexPath = path.join(__dirname, '..', 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Extraire juste le CSS (entre <style> et </style>)
const cssMatch = indexContent.match(/<style>([\s\S]*?)<\/style>/);
const css = cssMatch ? cssMatch[1] : '';

// Créer le host.html avec WebSocket
const hostHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AWS Quiz - Animateur</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600;700;900&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>

<div id="home" class="screen active">
  <div class="home-wrap">
    <div class="game-logo">
      <span class="logo-icon">☁</span>
      <h1>AWS Genius Quiz</h1>
      <div class="subtitle">◆ ANIMATEUR ◆</div>
    </div>
    <div class="game-panel">
      <div class="panel-title">👥 Équipes</div>
      <div class="teams-grid">
        <div class="team-input-group t1">
          <label>▶ Équipe 1</label>
          <input type="text" id="team1Name" value="Équipe 1" maxlength="20">
        </div>
        <div class="team-input-group t2">
          <label>▶ Équipe 2</label>
          <input type="text" id="team2Name" value="Équipe 2" maxlength="20">
        </div>
      </div>
    </div>
    <div class="game-panel">
      <div class="panel-title">⚙ Paramètres</div>
      <div class="settings-grid">
        <div class="setting-group">
          <label>Questions</label>
          <select id="numQuestions">
            <option value="5">5 questions</option>
            <option value="10" selected>10 questions</option>
            <option value="15">15 questions</option>
            <option value="20">20 questions</option>
          </select>
        </div>
        <div class="setting-group">
          <label>Temps / question</label>
          <select id="timePerQ">
            <option value="15">15 secondes</option>
            <option value="20" selected>20 secondes</option>
            <option value="30">30 secondes</option>
            <option value="45">45 secondes</option>
          </select>
        </div>
        <div class="setting-group" style="grid-column:1/-1">
          <label>Catégorie AWS</label>
          <select id="categoryFilter">
            <option value="all">Toutes les catégories</option>
            <option value="Compute">Compute</option>
            <option value="Stockage">Stockage</option>
            <option value="Base de données">Base de données</option>
            <option value="Réseau">Réseau</option>
            <option value="Sécurité">Sécurité</option>
            <option value="Serverless">Serverless</option>
            <option value="Messagerie">Messagerie</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="DevOps">DevOps</option>
            <option value="Analytics">Analytics</option>
          </select>
        </div>
      </div>
    </div>
    <div class="connection-status disconnected" id="connStatus" style="position:fixed;top:1rem;right:1rem;padding:0.5rem 1rem;border-radius:8px;font-size:0.8rem;font-weight:700">DÉCONNECTÉ</div>
    <button class="btn-start" onclick="startGame()">▶ LANCER LE QUIZ</button>
  </div>
</div>

<div id="game" class="screen">
  <div class="game-header">
    <div class="team-hud t1" id="scoreCard1">
      <div class="hud-name" id="displayName1">Équipe 1</div>
      <div class="hud-score" id="score1">0</div>
    </div>
    <div class="timer-hud">
      <div class="q-counter" id="progressLabel">Q 1 / 10</div>
      <div class="timer-ring">
        <svg viewBox="0 0 70 70">
          <circle class="timer-track" cx="35" cy="35" r="30"/>
          <circle class="timer-progress" id="timerCircle" cx="35" cy="35" r="30"/>
        </svg>
        <div class="timer-num" id="timerText">20</div>
      </div>
    </div>
    <div class="team-hud t2" id="scoreCard2">
      <div class="hud-name" id="displayName2">Équipe 2</div>
      <div class="hud-score" id="score2">0</div>
    </div>
  </div>
  <div class="progress-strip"><div class="progress-fill" id="progressBar" style="width:0%"></div></div>
  <div class="game-body">
    <div><span class="cat-tag" id="categoryBadge">Compute</span></div>
    <div class="question-box"><div class="question-text" id="questionText">Chargement...</div></div>
    <div class="answers-grid" id="answersGrid">
      <button class="answer-btn" id="ans0"><span class="answer-letter">A</span><span class="answer-text"></span></button>
      <button class="answer-btn" id="ans1"><span class="answer-letter">B</span><span class="answer-text"></span></button>
      <button class="answer-btn" id="ans2"><span class="answer-letter">C</span><span class="answer-text"></span></button>
      <button class="answer-btn" id="ans3"><span class="answer-letter">D</span><span class="answer-text"></span></button>
    </div>
    <div class="buzzer-zone" id="buzzerZone">
      <div class="buzzer-status" id="buzzerStatus">▶ En attente du buzzer...</div>
      <div class="buzzer-actions" id="buzzerActions" style="display:none">
        <button class="btn btn-danger" onclick="judgeAnswer(false)">✗ Mauvaise (-1)</button>
        <button class="btn btn-primary" onclick="judgeAnswer(true)">✓ Bonne (+2)</button>
      </div>
    </div>
    <div class="explanation-box" id="explanationBox">
      <div class="expl-label">💡 Explication</div>
      <p id="explanationText"></p>
    </div>
    <div class="next-btn-wrap">
      <button class="btn-next" id="nextBtn" onclick="nextQuestion()">SUIVANT →</button>
    </div>
  </div>
</div>

<div id="results" class="screen">
  <div class="results-wrap">
    <div class="trophy-anim">🏆</div>
    <div class="results-title">Fin du Quiz !</div>
    <div class="winner-card" id="winnerBanner">
      <div class="winner-label">★ Vainqueur</div>
      <div class="winner-name" id="winnerName">---</div>
      <div class="winner-score-txt" id="winnerScore">---</div>
    </div>
    <div class="scores-vs">
      <div class="score-card t1" id="resultCard1">
        <div class="sc-name" id="resultName1">Équipe 1</div>
        <div class="sc-pts" id="resultScore1">0</div>
      </div>
      <div class="vs-badge">VS</div>
      <div class="score-card t2" id="resultCard2">
        <div class="sc-name" id="resultName2">Équipe 2</div>
        <div class="sc-pts" id="resultScore2">0</div>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat-box"><div class="sv" id="statTotal">0</div><div class="sl">Questions</div></div>
      <div class="stat-box"><div class="sv" id="statCorrect">0</div><div class="sl">Bonnes rép.</div></div>
      <div class="stat-box"><div class="sv" id="statAccuracy">0%</div><div class="sl">Réussite</div></div>
    </div>
    <div class="results-btns">
      <button class="btn btn-secondary" onclick="showScreen('home')">← Accueil</button>
      <button class="btn btn-primary" onclick="location.reload()">↻ Rejouer</button>
    </div>
  </div>
</div>

<script src="questions.js"></script>
<script>
let ws,gameState={idx:0,total:10,timePerQ:20,questions:[],scores:{team1:0,team2:0}};
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active')}
function connect(){
  const protocol=window.location.protocol==='https:'?'wss:':'ws:';
  const host=window.location.host;
  ws=new WebSocket(protocol+'//'+host);
  ws.onopen=()=>{
    console.log('Connecté');
    document.getElementById('connStatus').textContent='CONNECTÉ';
    document.getElementById('connStatus').className='connection-status connected';
    ws.send(JSON.stringify({type:'registerHost'}));
  };
  ws.onmessage=(e)=>{const data=JSON.parse(e.data);handleMessage(data)};
  ws.onclose=()=>{
    console.log('Déconnecté');
    document.getElementById('connStatus').textContent='DÉCONNECTÉ';
    document.getElementById('connStatus').className='connection-status disconnected';
    setTimeout(connect,2000);
  };
}
function handleMessage(data){
  switch(data.type){
    case 'registered':console.log('Animateur enregistré');break;
    case 'teamConnected':console.log('Équipe '+data.team+' connectée');break;
    case 'buzzed':
      document.getElementById('buzzerZone').classList.add('buzzed-t'+data.team);
      document.getElementById('buzzerStatus').textContent=data.teamName+' a buzzé !';
      document.getElementById('buzzerStatus').className='buzzer-status active'+(data.team===2?'-t2':'');
      document.getElementById('buzzerActions').style.display='flex';
      document.getElementById('scoreCard'+data.team).classList.add('buzzed');
      break;
  }
}
function startGame(){
  const t1=document.getElementById('team1Name').value.trim()||'Équipe 1';
  const t2=document.getElementById('team2Name').value.trim()||'Équipe 2';
  const cat=document.getElementById('categoryFilter').value;
  gameState.total=parseInt(document.getElementById('numQuestions').value);
  gameState.timePerQ=parseInt(document.getElementById('timePerQ').value);
  
  // Filtrer par catégorie
  let pool=cat==='all'?QUESTIONS:QUESTIONS.filter(q=>q.c===cat);
  if(pool.length<gameState.total){
    const extra=shuffle(QUESTIONS.filter(q=>q.c!==cat));
    pool=[...shuffle(pool),...extra];
  }
  gameState.questions=shuffle(pool).slice(0,gameState.total);
  
  gameState.idx=0;
  gameState.scores={team1:0,team2:0};
  document.getElementById('displayName1').textContent=t1;
  document.getElementById('displayName2').textContent=t2;
  ws.send(JSON.stringify({type:'startGame',team1Name:t1,team2Name:t2,totalQuestions:gameState.total}));
  showScreen('game');
  loadQuestion();
}
function loadQuestion(){
  if(gameState.idx>=gameState.questions.length){endGame();return}
  const q=gameState.questions[gameState.idx];
  document.getElementById('categoryBadge').textContent=q.c;
  document.getElementById('questionText').textContent=q.q;
  document.getElementById('progressBar').style.width=((gameState.idx/gameState.total)*100)+'%';
  document.getElementById('progressLabel').textContent='Q '+(gameState.idx+1)+' / '+gameState.total;
  const letters=['A','B','C','D'];
  const order=shuffle([0,1,2,3]);
  for(let i=0;i<4;i++){
    const btn=document.getElementById('ans'+i);
    btn.dataset.orig=order[i];
    btn.querySelector('.answer-letter').textContent=letters[i];
    btn.querySelector('.answer-text').textContent=q.a[order[i]];
    btn.className='answer-btn';
  }
  document.getElementById('buzzerZone').className='buzzer-zone waiting';
  document.getElementById('buzzerStatus').textContent='▶ En attente du buzzer...';
  document.getElementById('buzzerStatus').className='buzzer-status';
  document.getElementById('buzzerActions').style.display='none';
  document.getElementById('explanationBox').className='explanation-box';
  document.getElementById('nextBtn').className='btn-next';
  document.getElementById('scoreCard1').classList.remove('buzzed');
  document.getElementById('scoreCard2').classList.remove('buzzed');
  ws.send(JSON.stringify({type:'loadQuestion',question:q,index:gameState.idx}));
}
function judgeAnswer(correct){
  const q=gameState.questions[gameState.idx];
  document.querySelectorAll('.answer-btn').forEach(b=>{
    b.disabled=true;
    if(parseInt(b.dataset.orig)===q.r)b.classList.add('correct');
  });
  document.getElementById('explanationBox').className='explanation-box show';
  document.getElementById('explanationText').textContent=q.e;
  document.getElementById('nextBtn').className='btn-next show';
  document.getElementById('buzzerActions').style.display='none';
  const buzzedTeam=document.getElementById('buzzerZone').classList.contains('buzzed-t1')?1:2;
  ws.send(JSON.stringify({type:'answer',team:buzzedTeam,correct}));
  if(correct){
    gameState.scores['team'+buzzedTeam]+=2;
  }else{
    gameState.scores['team'+buzzedTeam]=Math.max(0,gameState.scores['team'+buzzedTeam]-1);
  }
  document.getElementById('score1').textContent=gameState.scores.team1;
  document.getElementById('score2').textContent=gameState.scores.team2;
}
function nextQuestion(){
  gameState.idx++;
  ws.send(JSON.stringify({type:'nextQuestion'}));
  loadQuestion();
}
function endGame(){
  ws.send(JSON.stringify({type:'endGame'}));
  document.getElementById('resultName1').textContent=document.getElementById('displayName1').textContent;
  document.getElementById('resultName2').textContent=document.getElementById('displayName2').textContent;
  document.getElementById('resultScore1').textContent=gameState.scores.team1;
  document.getElementById('resultScore2').textContent=gameState.scores.team2;
  if(gameState.scores.team1>gameState.scores.team2){
    document.getElementById('winnerName').textContent=document.getElementById('displayName1').textContent;
    document.getElementById('resultCard1').classList.add('winner-card-sm');
  }else if(gameState.scores.team2>gameState.scores.team1){
    document.getElementById('winnerName').textContent=document.getElementById('displayName2').textContent;
    document.getElementById('resultCard2').classList.add('winner-card-sm');
  }else{
    document.getElementById('winnerName').textContent='Égalité !';
  }
  document.getElementById('winnerScore').textContent=gameState.scores.team1+' pts vs '+gameState.scores.team2+' pts';
  document.getElementById('statTotal').textContent=gameState.idx;
  showScreen('results');
}
connect();
</script>
</body>
</html>`;

// Écrire le fichier
const outputPath = path.join(__dirname, 'public', 'host.html');
fs.writeFileSync(outputPath, hostHtml, 'utf8');
console.log('✅ host.html créé avec succès !');
console.log('📍 Emplacement:', outputPath);
