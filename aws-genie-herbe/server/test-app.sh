#!/bin/bash

# Script de test automatique pour AWS Genius Quiz
# Usage: ./test-app.sh

echo "═══════════════════════════════════════════════════════════"
echo "  🧪 TEST AUTOMATIQUE - AWS GENIUS QUIZ"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
PASS=0
FAIL=0

# Fonction de test
test_check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1"
        ((FAIL++))
    fi
}

# Test 1: Node.js installé
echo "📦 Test 1: Vérification de Node.js..."
node --version > /dev/null 2>&1
test_check "Node.js installé"

npm --version > /dev/null 2>&1
test_check "npm installé"

# Test 2: Fichiers présents
echo ""
echo "📁 Test 2: Vérification des fichiers..."
[ -f "server.js" ]
test_check "server.js existe"

[ -f "package.json" ]
test_check "package.json existe"

[ -f "public/host.html" ]
test_check "public/host.html existe"

[ -f "public/client.html" ]
test_check "public/client.html existe"

[ -f "public/questions.js" ]
test_check "public/questions.js existe"

# Test 3: Dépendances installées
echo ""
echo "📦 Test 3: Vérification des dépendances..."
[ -d "node_modules" ]
test_check "node_modules existe"

[ -f "node_modules/ws/package.json" ]
test_check "ws (WebSocket) installé"

[ -f "node_modules/express/package.json" ]
test_check "express installé"

# Test 4: Port disponible
echo ""
echo "🔌 Test 4: Vérification du port 3000..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠${NC} Port 3000 déjà utilisé (serveur déjà lancé ?)"
else
    echo -e "${GREEN}✓${NC} Port 3000 disponible"
    ((PASS++))
fi

# Test 5: Démarrage du serveur (test rapide)
echo ""
echo "🚀 Test 5: Test de démarrage du serveur..."
timeout 3 npm start > /tmp/aws-quiz-test.log 2>&1 &
SERVER_PID=$!
sleep 2

if ps -p $SERVER_PID > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Serveur démarre sans erreur"
    ((PASS++))
    kill $SERVER_PID 2>/dev/null
else
    echo -e "${RED}✗${NC} Erreur au démarrage du serveur"
    echo "Logs:"
    cat /tmp/aws-quiz-test.log
    ((FAIL++))
fi

# Test 6: Vérification du contenu HTML
echo ""
echo "📄 Test 6: Vérification du contenu des fichiers..."
if grep -q "WebSocket" public/host.html; then
    echo -e "${GREEN}✓${NC} host.html contient le code WebSocket"
    ((PASS++))
else
    echo -e "${RED}✗${NC} host.html ne contient pas le code WebSocket"
    ((FAIL++))
fi

if grep -q "QUESTIONS" public/questions.js; then
    echo -e "${GREEN}✓${NC} questions.js contient des questions"
    ((PASS++))
else
    echo -e "${RED}✗${NC} questions.js ne contient pas de questions"
    ((FAIL++))
fi

# Test 7: Vérification réseau
echo ""
echo "🌐 Test 7: Configuration réseau..."
IP=$(hostname -I | awk '{print $1}')
if [ -n "$IP" ]; then
    echo -e "${GREEN}✓${NC} Adresse IP trouvée: $IP"
    ((PASS++))
else
    echo -e "${RED}✗${NC} Impossible de trouver l'adresse IP"
    ((FAIL++))
fi

# Résumé
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  📊 RÉSULTATS DES TESTS"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✓ Tests réussis: $PASS${NC}"
echo -e "${RED}✗ Tests échoués: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 TOUS LES TESTS SONT PASSÉS !${NC}"
    echo ""
    echo "🚀 Vous pouvez démarrer le serveur avec:"
    echo "   npm start"
    echo ""
    echo "📺 Puis ouvrir:"
    echo "   Animateur: http://localhost:3000/host.html"
    echo "   Équipe 1:  http://$IP:3000/client.html?team=1"
    echo "   Équipe 2:  http://$IP:3000/client.html?team=2"
    exit 0
else
    echo -e "${RED}❌ CERTAINS TESTS ONT ÉCHOUÉ${NC}"
    echo ""
    echo "📖 Consultez LINUX-SETUP.md pour résoudre les problèmes"
    exit 1
fi
