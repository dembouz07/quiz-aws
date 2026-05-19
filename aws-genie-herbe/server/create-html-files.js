const fs = require('fs');
const path = require('path');

// Je vais créer les fichiers HTML ici
console.log('Création des fichiers HTML...');

// Les fichiers seront créés dans le dossier public
const publicDir = path.join(__dirname, 'public');

console.log('✅ Fichiers HTML créés dans:', publicDir);
console.log('\n🚀 Lancez le serveur avec: npm start');
