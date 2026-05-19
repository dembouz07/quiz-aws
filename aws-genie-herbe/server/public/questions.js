// Questions AWS organisées par niveaux de difficulté
const QUESTIONS_BY_LEVEL = {
  // NIVEAU 1 - DÉBUTANT (Services de base)
  1: [
    {c:"Compute",q:"Quel service AWS permet de lancer des serveurs virtuels dans le cloud ?",a:["Amazon EC2","Amazon S3","AWS Lambda","Amazon RDS"],r:0,e:"Amazon EC2 (Elastic Compute Cloud) fournit des serveurs virtuels redimensionnables.",level:1},
    {c:"Compute",q:"Que signifie EC2 dans AWS ?",a:["Elastic Compute Cloud","Extended Cloud Computing","Enterprise Cloud Center","Elastic Container Cloud"],r:0,e:"EC2 = Elastic Compute Cloud.",level:1},
    {c:"Stockage",q:"Quel service AWS offre un stockage d'objets hautement disponible ?",a:["Amazon EBS","Amazon S3","Amazon EFS","AWS Storage Gateway"],r:1,e:"Amazon S3 (Simple Storage Service) est le service de stockage d'objets d'AWS.",level:1},
    {c:"Stockage",q:"Que signifie S3 dans Amazon S3 ?",a:["Simple Storage Service","Secure Server Storage","Scalable Storage System","Standard Storage Solution"],r:0,e:"S3 = Simple Storage Service.",level:1},
    {c:"Base de données",q:"Quel service AWS est une base de données relationnelle managée ?",a:["Amazon DynamoDB","Amazon RDS","Amazon Redshift","Amazon ElastiCache"],r:1,e:"Amazon RDS (Relational Database Service) gère des bases relationnelles.",level:1},
    {c:"Réseau",q:"Quel service AWS permet de créer un réseau privé virtuel isolé dans le cloud ?",a:["AWS Direct Connect","Amazon VPC","Amazon Route 53","AWS Transit Gateway"],r:1,e:"Amazon VPC (Virtual Private Cloud) permet de créer un réseau logiquement isolé.",level:1},
    {c:"Réseau",q:"Quel service AWS est le service DNS managé d'Amazon ?",a:["Amazon CloudFront","AWS Global Accelerator","Amazon Route 53","AWS PrivateLink"],r:2,e:"Amazon Route 53 est le service DNS hautement disponible d'AWS.",level:1},
    {c:"Sécurité",q:"Quel service AWS gère les identités, utilisateurs et permissions d'accès ?",a:["AWS Shield","AWS WAF","AWS IAM","Amazon Cognito"],r:2,e:"AWS IAM (Identity and Access Management) contrôle l'accès aux services AWS.",level:1},
    {c:"Réseau",q:"Quel service AWS est un CDN mondial ?",a:["Amazon Route 53","Amazon CloudFront","AWS Global Accelerator","Amazon API Gateway"],r:1,e:"Amazon CloudFront est le CDN d'AWS.",level:1},
    {c:"Serverless",q:"Quel service AWS permet de déployer des applications sans gérer de serveurs ?",a:["Amazon EC2","AWS Elastic Beanstalk","AWS Lambda","Amazon ECS"],r:2,e:"AWS Lambda est un service serverless.",level:1}
  ],

  // NIVEAU 2 - INTERMÉDIAIRE (Services spécialisés)
  2: [
    {c:"Compute",q:"Durée maximale d'exécution d'une fonction AWS Lambda ?",a:["5 minutes","10 minutes","15 minutes","30 minutes"],r:2,e:"Une fonction Lambda peut s'exécuter au maximum 15 minutes.",level:2},
    {c:"Stockage",q:"Quelle classe S3 est la moins chère pour des données rarement accédées ?",a:["S3 Standard","S3 Intelligent-Tiering","S3 Glacier Deep Archive","S3 Standard-IA"],r:2,e:"S3 Glacier Deep Archive est la classe la moins chère.",level:2},
    {c:"Stockage",q:"Quel service AWS fournit un stockage par blocs pour les instances EC2 ?",a:["Amazon S3","Amazon EFS","Amazon EBS","AWS Storage Gateway"],r:2,e:"Amazon EBS (Elastic Block Store) fournit des volumes de stockage par blocs.",level:2},
    {c:"Base de données",q:"Quel service AWS est une base NoSQL clé-valeur entièrement managée ?",a:["Amazon RDS","Amazon Aurora","Amazon DynamoDB","Amazon DocumentDB"],r:2,e:"Amazon DynamoDB est une base NoSQL serverless.",level:2},
    {c:"Base de données",q:"Quel service AWS est compatible MySQL/PostgreSQL avec des performances 5x supérieures ?",a:["Amazon RDS","Amazon Aurora","Amazon Redshift","Amazon Neptune"],r:1,e:"Amazon Aurora est jusqu'à 5x plus rapide que MySQL standard.",level:2},
    {c:"Sécurité",q:"Quel service AWS protège contre les attaques DDoS ?",a:["AWS WAF","AWS Shield","Amazon GuardDuty","AWS Firewall Manager"],r:1,e:"AWS Shield est un service de protection DDoS managé.",level:2},
    {c:"Sécurité",q:"Quel service AWS est un pare-feu applicatif web ?",a:["AWS Shield","AWS WAF","Amazon Inspector","AWS Network Firewall"],r:1,e:"AWS WAF (Web Application Firewall) protège les applications web.",level:2},
    {c:"Containers",q:"Quel service AWS est le service managé de Kubernetes ?",a:["Amazon ECS","AWS Fargate","Amazon EKS","AWS App Runner"],r:2,e:"Amazon EKS (Elastic Kubernetes Service) est le service Kubernetes managé d'AWS.",level:2},
    {c:"Serverless",q:"Quel service AWS permet de créer et gérer des APIs REST et WebSocket ?",a:["AWS AppSync","Amazon API Gateway","AWS App Runner","Amazon CloudFront"],r:1,e:"Amazon API Gateway permet de créer et gérer des APIs.",level:2},
    {c:"DevOps",q:"Quel service AWS permet de définir l'infrastructure en tant que code (IaC) ?",a:["AWS CodeDeploy","AWS CloudFormation","AWS OpsWorks","AWS Systems Manager"],r:1,e:"AWS CloudFormation permet de modéliser l'infrastructure via des templates.",level:2}
  ],

  // NIVEAU 3 - AVANCÉ (Architecture et optimisation)
  3: [
    {c:"Architecture",q:"Quel principe du Well-Architected Framework se concentre sur l'automatisation ?",a:["Reliability","Performance Efficiency","Operational Excellence","Cost Optimization"],r:2,e:"Operational Excellence met l'accent sur l'automatisation et l'amélioration continue.",level:3},
    {c:"Sécurité",q:"Quel service AWS permet de chiffrer automatiquement les données au repos ?",a:["AWS KMS","AWS CloudHSM","AWS Certificate Manager","AWS Secrets Manager"],r:0,e:"AWS KMS (Key Management Service) gère le chiffrement centralisé.",level:3},
    {c:"Réseau",q:"Quel service AWS permet de connecter plusieurs VPC dans différentes régions ?",a:["VPC Peering","AWS Transit Gateway","AWS Direct Connect","AWS PrivateLink"],r:1,e:"AWS Transit Gateway permet de connecter plusieurs VPC et réseaux on-premises.",level:3},
    {c:"Base de données",q:"Quel service AWS permet de migrer des bases de données avec un temps d'arrêt minimal ?",a:["AWS Database Migration Service","AWS DataSync","AWS Storage Gateway","AWS Backup"],r:0,e:"AWS DMS permet la migration continue avec réplication en temps réel.",level:3},
    {c:"Analytics",q:"Quel service AWS est recommandé pour traiter des téraoctets de données avec Apache Spark ?",a:["Amazon Athena","Amazon EMR","AWS Glue","Amazon Kinesis"],r:1,e:"Amazon EMR (Elastic MapReduce) est optimisé pour les gros volumes avec Spark.",level:3},
    {c:"Containers",q:"Quel service AWS permet d'exécuter des conteneurs sans gérer l'infrastructure ?",a:["Amazon ECS","Amazon EKS","AWS Fargate","AWS Batch"],r:2,e:"AWS Fargate est un moteur de calcul serverless pour conteneurs.",level:3},
    {c:"Machine Learning",q:"Quel service AWS est la plateforme complète de Machine Learning d'AWS ?",a:["Amazon Rekognition","Amazon SageMaker","AWS DeepLens","Amazon Comprehend"],r:1,e:"Amazon SageMaker est la plateforme ML complète d'AWS.",level:3},
    {c:"Sécurité",q:"Quel service AWS fournit une analyse comportementale pour détecter les menaces ?",a:["AWS WAF","AWS Shield","Amazon GuardDuty","AWS Security Hub"],r:2,e:"Amazon GuardDuty utilise l'IA pour détecter les activités malveillantes.",level:3},
    {c:"DevOps",q:"Quel service AWS surveille les métriques, logs et alarmes de vos ressources ?",a:["AWS CloudTrail","AWS Config","Amazon CloudWatch","AWS X-Ray"],r:2,e:"Amazon CloudWatch collecte et surveille les métriques et logs.",level:3},
    {c:"Analytics",q:"Quel service AWS permet d'analyser des données dans S3 avec du SQL sans serveur ?",a:["Amazon Redshift","Amazon EMR","Amazon Athena","AWS Glue"],r:2,e:"Amazon Athena est un service de requêtes SQL serverless sur S3.",level:3}
  ]
};

// Fonction pour obtenir toutes les questions (pour compatibilité)
function getAllQuestions() {
  const allQuestions = [];
  Object.keys(QUESTIONS_BY_LEVEL).forEach(level => {
    allQuestions.push(...QUESTIONS_BY_LEVEL[level]);
  });
  return allQuestions;
}

// Export pour compatibilité avec l'ancien système
const QUESTIONS = getAllQuestions();
