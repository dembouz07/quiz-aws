// Questions DevOps organisées par modules selon le syllabus
const DEVOPS_QUESTIONS_BY_MODULE = {
  // MODULE 1 - DevOps Introductif
  devops: [
    {c:"DevOps",q:"Quelle est la problématique principale que résout DevOps ?",a:["Manque de communication entre Dev et Ops","Coût élevé du cloud","Complexité des langages de programmation","Sécurité des applications"],r:0,e:"DevOps résout le problème de silos entre les équipes de développement et d'exploitation.",module:"devops"},
    {c:"DevOps",q:"Que signifie l'acronyme DevOps ?",a:["Development Operations","Device Optimization","Data Operations","Deploy Optimize"],r:0,e:"DevOps = Development + Operations, fusion des équipes de développement et d'exploitation.",module:"devops"},
    {c:"DevOps",q:"Quel est l'objectif principal de DevOps ?",a:["Réduire les coûts","Accélérer la livraison de logiciels","Améliorer la sécurité","Simplifier le code"],r:1,e:"DevOps vise à accélérer et fiabiliser la livraison de logiciels de qualité.",module:"devops"},
    {c:"DevOps",q:"Quel principe DevOps favorise l'automatisation ?",a:["Culture","Automatisation","Mesure","Partage"],r:1,e:"L'automatisation est un des 4 piliers CAMS (Culture, Automatisation, Mesure, Partage).",module:"devops"},
    {c:"DevOps",q:"Quel avantage DevOps améliore la collaboration ?",a:["Réduction des silos","Augmentation des serveurs","Complexification des processus","Centralisation des décisions"],r:0,e:"DevOps brise les silos organisationnels et améliore la collaboration inter-équipes.",module:"devops"},
    {c:"DevOps",q:"Quelle phase DevOps inclut les tests automatisés ?",a:["Plan","Code","Build","Test"],r:3,e:"La phase Test inclut les tests unitaires, d'intégration et de sécurité automatisés.",module:"devops"},
    {c:"DevOps",q:"Quel outil DevOps est utilisé pour la gestion de versions ?",a:["Docker","Git","Jenkins","Kubernetes"],r:1,e:"Git est l'outil de gestion de versions le plus utilisé dans l'écosystème DevOps.",module:"devops"}
  ],

  // MODULE 2 - Docker Conteneurisation
  docker: [
    {c:"Docker",q:"Quelle problématique Docker résout-il principalement ?",a:["'Ça marche sur ma machine'","Coût du cloud","Sécurité des réseaux","Performance des bases de données"],r:0,e:"Docker résout le problème de compatibilité entre environnements de développement et production.",module:"docker"},
    {c:"Docker",q:"Qu'est-ce que la conteneurisation ?",a:["Virtualisation complète","Isolation d'applications avec partage du kernel","Chiffrement des données","Sauvegarde automatique"],r:1,e:"La conteneurisation isole les applications tout en partageant le kernel de l'OS hôte.",module:"docker"},
    {c:"Docker",q:"Quelle commande Docker télécharge une image ?",a:["docker get","docker pull","docker download","docker fetch"],r:1,e:"'docker pull' télécharge une image depuis un registre Docker.",module:"docker"},
    {c:"Docker",q:"Que fait la commande 'docker run -d' ?",a:["Supprime un conteneur","Lance un conteneur en arrière-plan","Affiche les logs","Arrête un conteneur"],r:1,e:"L'option '-d' (detached) lance le conteneur en arrière-plan.",module:"docker"},
    {c:"Docker",q:"Quel pilote réseau Docker est utilisé par défaut ?",a:["host","none","bridge","overlay"],r:2,e:"Le pilote 'bridge' est le réseau par défaut pour les conteneurs sur un même hôte.",module:"docker"},
    {c:"Docker",q:"Que contient un Dockerfile ?",a:["Images compilées","Instructions pour construire une image","Logs d'exécution","Configuration réseau"],r:1,e:"Un Dockerfile contient les instructions pour construire une image Docker étape par étape.",module:"docker"},
    {c:"Docker",q:"Qu'est-ce que Docker Hub ?",a:["Un IDE pour Docker","Un registre public d'images","Un orchestrateur","Un outil de monitoring"],r:1,e:"Docker Hub est le registre public officiel pour stocker et partager des images Docker.",module:"docker"},
    {c:"Docker",q:"Quel type de stockage Docker persiste après suppression du conteneur ?",a:["Bind mount","Volume","tmpfs","Cache"],r:1,e:"Les volumes Docker persistent indépendamment du cycle de vie des conteneurs.",module:"docker"},
    {c:"Docker",q:"Que définit docker-compose.yaml ?",a:["Une seule image","Une application multi-conteneurs","Les logs système","La configuration réseau"],r:1,e:"docker-compose.yaml définit et orchestre des applications multi-conteneurs.",module:"docker"},
    {c:"Docker",q:"Quelle commande lance tous les services définis dans docker-compose ?",a:["docker-compose start","docker-compose run","docker-compose up","docker-compose build"],r:2,e:"'docker-compose up' construit et lance tous les services définis.",module:"docker"}
  ],

  // MODULE 3 - Jenkins CI/CD
  jenkins: [
    {c:"Jenkins",q:"Quelle problématique Jenkins résout-il ?",a:["Automatisation des déploiements","Gestion des bases de données","Monitoring des serveurs","Chiffrement des données"],r:0,e:"Jenkins automatise les processus de build, test et déploiement (CI/CD).",module:"jenkins"},
    {c:"Jenkins",q:"Qu'est-ce que Jenkins ?",a:["Un conteneur","Un serveur d'automatisation CI/CD","Une base de données","Un orchestrateur"],r:1,e:"Jenkins est un serveur d'automatisation open-source pour l'intégration et livraison continues.",module:"jenkins"},
    {c:"Jenkins",q:"Comment Jenkins étend ses fonctionnalités ?",a:["Scripts personnalisés","Plugins","Images Docker","APIs externes"],r:1,e:"Jenkins utilise un système de plugins pour étendre ses fonctionnalités.",module:"jenkins"},
    {c:"Jenkins",q:"Qu'est-ce qu'un pipeline Jenkins ?",a:["Un conteneur Docker","Une suite d'étapes automatisées","Un fichier de configuration","Un serveur web"],r:1,e:"Un pipeline Jenkins définit une suite d'étapes automatisées pour le CI/CD.",module:"jenkins"},
    {c:"Jenkins",q:"Quel fichier définit un pipeline as code ?",a:["jenkins.yaml","Jenkinsfile","pipeline.json","build.xml"],r:1,e:"Le Jenkinsfile définit le pipeline en tant que code, versionnable avec l'application.",module:"jenkins"},
    {c:"Jenkins",q:"Comment Jenkins peut-il utiliser Docker ?",a:["Comme agent de build","Pour le stockage","Pour la base de données","Pour le monitoring"],r:0,e:"Jenkins peut utiliser des conteneurs Docker comme agents de build dynamiques.",module:"jenkins"},
    {c:"Jenkins",q:"Quelle stratégie de déploiement minimise les interruptions ?",a:["Big Bang","Blue-Green","Rollback","Canary"],r:1,e:"Le déploiement Blue-Green permet de basculer instantanément entre deux environnements.",module:"jenkins"},
    {c:"Jenkins",q:"Quelle différence principale entre Jenkins et GitHub Actions ?",a:["Jenkins est cloud-only","GitHub Actions est intégré à GitHub","Jenkins ne supporte pas Docker","GitHub Actions est payant"],r:1,e:"GitHub Actions est nativement intégré à GitHub, Jenkins est auto-hébergé.",module:"jenkins"}
  ],

  // MODULE 4 - SonarQube Qualité du code
  sonarqube: [
    {c:"SonarQube",q:"Quelle problématique SonarQube résout-il ?",a:["Performance des serveurs","Qualité et sécurité du code","Gestion des conteneurs","Orchestration des services"],r:1,e:"SonarQube analyse la qualité, sécurité et maintenabilité du code source.",module:"sonarqube"},
    {c:"SonarQube",q:"Qu'est-ce qu'un 'bug' dans SonarQube ?",a:["Une erreur de syntaxe","Un problème qui peut causer un dysfonctionnement","Un avertissement de style","Une vulnérabilité de sécurité"],r:1,e:"Un bug SonarQube est un problème de code qui peut causer un comportement incorrect.",module:"sonarqube"},
    {c:"SonarQube",q:"Qu'est-ce qu'un 'code smell' ?",a:["Un bug critique","Un problème de maintenabilité","Une vulnérabilité","Une erreur de compilation"],r:1,e:"Un code smell indique un problème de maintenabilité qui rend le code difficile à comprendre ou modifier.",module:"sonarqube"},
    {c:"SonarQube",q:"Que représente la 'technical debt' ?",a:["Le coût des serveurs","Le temps nécessaire pour corriger les problèmes","Le nombre de développeurs","La taille du code"],r:1,e:"La dette technique représente l'effort estimé pour corriger tous les problèmes de maintenabilité.",module:"sonarqube"},
    {c:"SonarQube",q:"Qu'est-ce qu'un 'quality profile' ?",a:["Un développeur expert","Un ensemble de règles d'analyse","Un rapport de qualité","Un type de projet"],r:1,e:"Un quality profile définit l'ensemble des règles appliquées lors de l'analyse du code.",module:"sonarqube"},
    {c:"SonarQube",q:"Que définit la 'new code definition' ?",a:["Le nouveau code ajouté","Les règles de codage","Les métriques de qualité","Les vulnérabilités"],r:0,e:"La new code definition détermine quel code est considéré comme 'nouveau' pour l'analyse.",module:"sonarqube"},
    {c:"SonarQube",q:"Qu'est-ce qu'une 'vulnerability' SonarQube ?",a:["Un bug de performance","Une faille de sécurité","Un problème de style","Une erreur de logique"],r:1,e:"Une vulnerability est une faille de sécurité qui peut être exploitée par des attaquants.",module:"sonarqube"},
    {c:"SonarQube",q:"Quelle architecture SonarQube utilise-t-il ?",a:["Monolithique","Client-serveur avec base de données","Microservices","Serverless"],r:1,e:"SonarQube utilise une architecture client-serveur avec une base de données pour stocker les analyses.",module:"sonarqube"}
  ],

  // MODULE 5 - Kubernetes Orchestration
  kubernetes: [
    {c:"Kubernetes",q:"Quelle problématique Kubernetes résout-il ?",a:["Création d'images Docker","Orchestration et gestion de conteneurs","Analyse de code","Monitoring des applications"],r:1,e:"Kubernetes orchestre et gère automatiquement des conteneurs à grande échelle.",module:"kubernetes"},
    {c:"Kubernetes",q:"Qu'est-ce qu'un Pod Kubernetes ?",a:["Un conteneur Docker","La plus petite unité déployable","Un nœud du cluster","Un service réseau"],r:1,e:"Un Pod est la plus petite unité déployable, contenant un ou plusieurs conteneurs.",module:"kubernetes"},
    {c:"Kubernetes",q:"Que fait un ReplicaSet ?",a:["Sauvegarde les données","Maintient un nombre spécifié de Pods","Gère les réseaux","Surveille les performances"],r:1,e:"Un ReplicaSet assure qu'un nombre spécifié de répliques de Pods sont toujours en cours d'exécution.",module:"kubernetes"},
    {c:"Kubernetes",q:"Qu'est-ce qu'un Deployment Kubernetes ?",a:["Un Pod unique","Une gestion déclarative des ReplicaSets","Un service réseau","Un volume de stockage"],r:1,e:"Un Deployment gère de manière déclarative les ReplicaSets et les Pods.",module:"kubernetes"},
    {c:"Kubernetes",q:"À quoi sert un Service Kubernetes ?",a:["Créer des Pods","Exposer des Pods via le réseau","Stocker des données","Surveiller les logs"],r:1,e:"Un Service expose un ensemble de Pods via une interface réseau stable.",module:"kubernetes"},
    {c:"Kubernetes",q:"Qu'est-ce qu'un Ingress ?",a:["Un Pod spécial","Un contrôleur de trafic HTTP/HTTPS","Un type de volume","Un nœud master"],r:1,e:"Un Ingress gère l'accès externe aux services via HTTP/HTTPS avec routage et SSL.",module:"kubernetes"},
    {c:"Kubernetes",q:"Que stocke un ConfigMap ?",a:["Images Docker","Données de configuration non-sensibles","Mots de passe","Logs d'application"],r:1,e:"Un ConfigMap stocke des données de configuration non-confidentielles sous forme clé-valeur.",module:"kubernetes"},
    {c:"Kubernetes",q:"Quelle différence entre Secret et ConfigMap ?",a:["Secret pour données sensibles","ConfigMap pour images","Secret pour réseaux","Aucune différence"],r:0,e:"Secret stocke des données sensibles (mots de passe), ConfigMap des données non-sensibles.",module:"kubernetes"},
    {c:"Kubernetes",q:"Qu'est-ce qu'un StatefulSet ?",a:["Un Pod sans état","Un contrôleur pour applications avec état","Un service réseau","Un volume persistant"],r:1,e:"Un StatefulSet gère des applications avec état nécessitant identité et stockage persistants.",module:"kubernetes"},
    {c:"Kubernetes",q:"Quelle commande affiche tous les Pods ?",a:["kubectl get pods","kubectl list pods","kubectl show pods","kubectl view pods"],r:0,e:"'kubectl get pods' affiche la liste de tous les Pods dans le namespace courant.",module:"kubernetes"}
  ],

  // MODULE 6 - Terraform IaC
  terraform: [
    {c:"Terraform",q:"Quelle problématique Terraform résout-il ?",a:["Conteneurisation","Infrastructure as Code (IaC)","Analyse de code","Monitoring"],r:1,e:"Terraform permet de définir et gérer l'infrastructure via du code déclaratif.",module:"terraform"},
    {c:"Terraform",q:"Qu'est-ce qu'un provider Terraform ?",a:["Un développeur","Un plugin pour interagir avec des APIs","Un fichier de configuration","Un serveur"],r:1,e:"Un provider est un plugin qui permet à Terraform d'interagir avec des APIs de cloud providers.",module:"terraform"},
    {c:"Terraform",q:"Que définit une resource Terraform ?",a:["Un fichier de code","Un composant d'infrastructure","Un utilisateur","Un processus"],r:1,e:"Une resource définit un composant d'infrastructure (VM, réseau, base de données, etc.).",module:"terraform"},
    {c:"Terraform",q:"À quoi sert le state Terraform ?",a:["Compiler le code","Suivre l'état de l'infrastructure","Stocker les logs","Gérer les utilisateurs"],r:1,e:"Le state file suit l'état actuel de l'infrastructure gérée par Terraform.",module:"terraform"},
    {c:"Terraform",q:"Qu'est-ce qu'une data source ?",a:["Une base de données","Une ressource en lecture seule","Un fichier de configuration","Un module"],r:1,e:"Une data source permet de récupérer des informations sur des ressources existantes.",module:"terraform"},
    {c:"Terraform",q:"Comment passer des valeurs dynamiques dans Terraform ?",a:["Hardcoder dans le code","Utiliser des variables","Modifier le state","Utiliser des providers"],r:1,e:"Les variables permettent de paramétrer les configurations Terraform de manière dynamique.",module:"terraform"},
    {c:"Terraform",q:"Que fait 'terraform plan' ?",a:["Applique les changements","Affiche les changements prévus","Détruit l'infrastructure","Initialise le projet"],r:1,e:"'terraform plan' affiche un aperçu des changements qui seront appliqués sans les exécuter.",module:"terraform"},
    {c:"Terraform",q:"Quelle commande applique les changements ?",a:["terraform run","terraform apply","terraform execute","terraform deploy"],r:1,e:"'terraform apply' applique les changements définis dans la configuration.",module:"terraform"},
    {c:"Terraform",q:"Qu'est-ce qu'un module Terraform ?",a:["Un provider","Un ensemble réutilisable de configurations","Un state file","Une variable"],r:1,e:"Un module est un ensemble réutilisable de configurations Terraform pour créer des composants standards.",module:"terraform"}
  ],

  // MODULE 7 - Prometheus/Grafana Surveillance
  prometheus: [
    {c:"Prometheus",q:"Quelle problématique Prometheus/Grafana résout-il ?",a:["Déploiement d'applications","Surveillance et monitoring","Gestion de versions","Conteneurisation"],r:1,e:"Prometheus/Grafana fournit une solution complète de monitoring et visualisation des métriques.",module:"prometheus"},
    {c:"Prometheus",q:"Qu'est-ce qu'une métrique Prometheus ?",a:["Un log d'erreur","Une mesure numérique dans le temps","Un fichier de configuration","Un conteneur"],r:1,e:"Une métrique est une mesure numérique horodatée (CPU, mémoire, requêtes, etc.).",module:"prometheus"},
    {c:"Prometheus",q:"Qu'est-ce qu'un target Prometheus ?",a:["Une métrique","Un endpoint à surveiller","Un dashboard","Une alerte"],r:1,e:"Un target est un endpoint (service/application) que Prometheus surveille pour collecter des métriques.",module:"prometheus"},
    {c:"Prometheus",q:"Quel modèle de données Prometheus utilise-t-il ?",a:["Relationnel","Time series","Document","Graphe"],r:1,e:"Prometheus utilise un modèle de données time series avec des labels pour identifier les métriques.",module:"prometheus"},
    {c:"Prometheus",q:"Qu'est-ce qu'un exporter ?",a:["Un outil de sauvegarde","Un agent qui expose des métriques","Un dashboard","Un type d'alerte"],r:1,e:"Un exporter est un agent qui collecte et expose des métriques dans un format que Prometheus peut scraper.",module:"prometheus"},
    {c:"Prometheus",q:"À quoi sert Grafana ?",a:["Collecter des métriques","Visualiser des données","Stocker des logs","Gérer des conteneurs"],r:1,e:"Grafana est un outil de visualisation qui crée des dashboards à partir de sources de données comme Prometheus.",module:"prometheus"},
    {c:"Prometheus",q:"Qu'est-ce qu'une source de données Grafana ?",a:["Un fichier de métriques","Un système backend fournissant des données","Un dashboard","Un utilisateur"],r:1,e:"Une source de données est un système backend (Prometheus, InfluxDB, etc.) que Grafana interroge.",module:"prometheus"},
    {c:"Prometheus",q:"Que permet AlertManager ?",a:["Créer des dashboards","Gérer les notifications d'alertes","Collecter des métriques","Stocker des données"],r:1,e:"AlertManager gère les alertes envoyées par Prometheus et les route vers les bons canaux de notification.",module:"prometheus"}
  ],

  // MODULE 8 - Trivy Scan des ressources
  trivy: [
    {c:"Trivy",q:"Quelle problématique Trivy résout-il ?",a:["Orchestration de conteneurs","Scan de sécurité et vulnérabilités","Déploiement d'applications","Monitoring des performances"],r:1,e:"Trivy scanne les vulnérabilités, misconfigurations et secrets dans diverses ressources.",module:"trivy"},
    {c:"Trivy",q:"Quels types de targets Trivy peut-il scanner ?",a:["Seulement les images Docker","Images, filesystems, repos Git, Kubernetes","Seulement le code source","Seulement les serveurs"],r:1,e:"Trivy peut scanner images conteneurs, filesystems, repos Git, manifestes Kubernetes, Terraform, etc.",module:"trivy"},
    {c:"Trivy",q:"Que peut détecter Trivy comme scanner ?",a:["Seulement les vulnérabilités","Vulnérabilités, misconfigurations, secrets, licences","Seulement les erreurs de code","Seulement les performances"],r:1,e:"Trivy détecte vulnérabilités, misconfigurations, secrets exposés, problèmes de licences.",module:"trivy"},
    {c:"Trivy",q:"Quel format de sortie Trivy supporte-t-il ?",a:["Seulement JSON","JSON, SARIF, Table, Template","Seulement texte","Seulement XML"],r:1,e:"Trivy supporte plusieurs formats : JSON, SARIF, Table, Template pour s'intégrer dans différents workflows.",module:"trivy"},
    {c:"Trivy",q:"Comment Trivy obtient-il les informations de vulnérabilités ?",a:["Analyse statique uniquement","Bases de données de vulnérabilités","Scan réseau","Tests de pénétration"],r:1,e:"Trivy utilise des bases de données de vulnérabilités (NVD, GitHub Advisory, etc.) mises à jour régulièrement.",module:"trivy"},
    {c:"Trivy",q:"Quelle commande scanne une image Docker ?",a:["trivy scan image","trivy image nom-image","trivy docker nom-image","trivy check nom-image"],r:1,e:"'trivy image nom-image' scanne une image Docker pour détecter les vulnérabilités.",module:"trivy"},
    {c:"Trivy",q:"Comment Trivy s'intègre-t-il dans un pipeline CI/CD ?",a:["Seulement manuellement","Via CLI avec codes de retour","Seulement via interface web","Impossible à intégrer"],r:1,e:"Trivy s'intègre via CLI dans les pipelines, retournant des codes d'erreur selon les vulnérabilités trouvées.",module:"trivy"},
    {c:"Trivy",q:"Que fait le workflow de scan Trivy ?",a:["Compile le code","Télécharge, analyse, compare avec bases de données","Déploie l'application","Surveille les performances"],r:1,e:"Le workflow Trivy télécharge les métadonnées, analyse la cible et compare avec les bases de vulnérabilités.",module:"trivy"}
  ],

  // MODULE 9 - IA pour DevOps
  aidevops: [
    {c:"IA DevOps",q:"Quelle problématique l'IA résout-elle en DevOps ?",a:["Remplacer les développeurs","Automatiser et optimiser les tâches répétitives","Éliminer les tests","Supprimer la documentation"],r:1,e:"L'IA en DevOps automatise les tâches répétitives et aide à l'optimisation des processus.",module:"aidevops"},
    {c:"IA DevOps",q:"Qu'est-ce qu'un LLM (Large Language Model) ?",a:["Un petit modèle","Un modèle de langage entraîné sur de grandes données","Un logiciel de monitoring","Un outil de déploiement"],r:1,e:"Un LLM est un modèle d'IA entraîné sur de vastes corpus de texte pour comprendre et générer du langage.",module:"aidevops"},
    {c:"IA DevOps",q:"Quelle différence entre IA générative et agent IA ?",a:["Aucune différence","IA générative crée du contenu, agent IA exécute des tâches","Agent IA est plus rapide","IA générative est plus sûre"],r:1,e:"L'IA générative crée du contenu, l'agent IA peut exécuter des actions et interagir avec des systèmes.",module:"aidevops"},
    {c:"IA DevOps",q:"Qu'est-ce que le Prompt Engineering ?",a:["Programmation de robots","Art de formuler des instructions efficaces pour l'IA","Gestion de serveurs","Analyse de code"],r:1,e:"Le Prompt Engineering consiste à formuler des instructions optimales pour obtenir les meilleurs résultats d'un LLM.",module:"aidevops"},
    {c:"IA DevOps",q:"Comment invoquer un LLM via script ?",a:["Seulement via interface web","APIs REST, SDKs, CLI","Seulement manuellement","Impossible à scripter"],r:1,e:"Les LLMs peuvent être invoqués via APIs REST, SDKs Python/Node.js, ou outils CLI.",module:"aidevops"},
    {c:"IA DevOps",q:"Qu'est-ce que RAG (Retrieval Augmented Generation) ?",a:["Un type de base de données","Technique combinant recherche et génération","Un outil de monitoring","Un framework de test"],r:1,e:"RAG combine recherche d'informations dans une base de connaissances avec génération de réponses par LLM.",module:"aidevops"},
    {c:"IA DevOps",q:"Qu'apporte GitHub Copilot en DevOps ?",a:["Remplace Git","Assistance IA pour le scripting et l'automatisation","Surveille les serveurs","Gère les déploiements"],r:1,e:"GitHub Copilot assiste dans l'écriture de scripts shell, Python, YAML pour l'automatisation DevOps.",module:"aidevops"},
    {c:"IA DevOps",q:"Qu'est-ce qu'AIOps ?",a:["IA pour les opérations","IA pour le développement","IA pour les tests","IA pour la documentation"],r:0,e:"AIOps utilise l'IA pour automatiser et améliorer les opérations IT (monitoring, incident response, etc.).",module:"aidevops"}
  ]
};

// Fonction pour obtenir toutes les questions DevOps
function getAllDevOpsQuestions() {
  const allQuestions = [];
  Object.keys(DEVOPS_QUESTIONS_BY_MODULE).forEach(module => {
    allQuestions.push(...DEVOPS_QUESTIONS_BY_MODULE[module]);
  });
  return allQuestions;
}

// Fonction pour obtenir les questions par module
function getQuestionsByModule(moduleName) {
  return DEVOPS_QUESTIONS_BY_MODULE[moduleName] || [];
}

// Répartition des modules aux groupes selon le syllabus
const GROUP_MODULE_ASSIGNMENT = {
  1: ["docker", "kubernetes", "prometheus"], // gp1: Docker, Kubernetes, Prometheus/Grafana
  2: ["jenkins", "kubernetes", "trivy"],     // gp2: Jenkins, Kubernetes, Trivy  
  3: ["devops", "jenkins", "terraform"],     // gp3: DevOps, Jenkins, Terraform
  4: ["devops", "sonarqube", "terraform", "aidevops"], // gp4: DevOps, SonarQube, Terraform, IA DevOps
  5: ["docker", "sonarqube", "prometheus", "aidevops"] // gp5: Docker, SonarQube, Prometheus/Grafana, IA DevOps
};

// Fonction pour obtenir les modules d'un groupe
function getModulesForGroup(groupNumber) {
  return GROUP_MODULE_ASSIGNMENT[groupNumber] || [];
}

// Fonction pour obtenir les questions d'un groupe
function getQuestionsForGroup(groupNumber) {
  const modules = getModulesForGroup(groupNumber);
  const questions = [];
  modules.forEach(module => {
    questions.push(...getQuestionsByModule(module));
  });
  return questions;
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DEVOPS_QUESTIONS_BY_MODULE,
    getAllDevOpsQuestions,
    getQuestionsByModule,
    getModulesForGroup,
    getQuestionsForGroup,
    GROUP_MODULE_ASSIGNMENT
  };
}