// Questions AWS par niveaux de difficulté
const QUESTIONS_BY_LEVEL = {
  // NIVEAU 1 - DÉBUTANT (Fondamentaux AWS)
  1: [
    {c:"Compute",q:"Quel service AWS permet de lancer des serveurs virtuels dans le cloud ?",a:["Amazon EC2","Amazon S3","AWS Lambda","Amazon RDS"],r:0,e:"Amazon EC2 (Elastic Compute Cloud) fournit des serveurs virtuels redimensionnables.",level:1},
    {c:"Stockage",q:"Quel service AWS offre un stockage d'objets hautement disponible ?",a:["Amazon EBS","Amazon S3","Amazon EFS","AWS Storage Gateway"],r:1,e:"Amazon S3 (Simple Storage Service) est le service de stockage d'objets d'AWS.",level:1},
    {c:"Base de données",q:"Quel service AWS est une base de données relationnelle managée ?",a:["Amazon DynamoDB","Amazon RDS","Amazon Redshift","Amazon ElastiCache"],r:1,e:"Amazon RDS (Relational Database Service) gère des bases relationnelles.",level:1},
    {c:"Réseau",q:"Quel service AWS permet de créer un réseau privé virtuel isolé dans le cloud ?",a:["AWS Direct Connect","Amazon VPC","Amazon Route 53","AWS Transit Gateway"],r:1,e:"Amazon VPC (Virtual Private Cloud) permet de créer un réseau logiquement isolé.",level:1},
    {c:"Sécurité",q:"Quel service AWS gère les identités, utilisateurs et permissions d'accès ?",a:["AWS Shield","AWS WAF","AWS IAM","Amazon Cognito"],r:2,e:"AWS IAM (Identity and Access Management) contrôle l'accès aux services AWS.",level:1},
    {c:"Compute",q:"Que signifie EC2 dans AWS ?",a:["Elastic Compute Cloud","Extended Cloud Computing","Enterprise Cloud Center","Elastic Container Cloud"],r:0,e:"EC2 = Elastic Compute Cloud.",level:1},
    {c:"Stockage",q:"Que signifie S3 dans Amazon S3 ?",a:["Simple Storage Service","Secure Server Storage","Scalable Storage System","Standard Storage Solution"],r:0,e:"S3 = Simple Storage Service.",level:1},
    {c:"Réseau",q:"Quel service AWS est le service DNS managé d'Amazon ?",a:["Amazon CloudFront","AWS Global Accelerator","Amazon Route 53","AWS PrivateLink"],r:2,e:"Amazon Route 53 est le service DNS hautement disponible d'AWS.",level:1},
    {c:"Serverless",q:"Quel service AWS permet de déployer des applications sans gérer de serveurs ?",a:["Amazon EC2","AWS Elastic Beanstalk","AWS Lambda","Amazon ECS"],r:2,e:"AWS Lambda est un service serverless.",level:1},
    {c:"Réseau",q:"Quel service AWS est un CDN mondial ?",a:["Amazon Route 53","Amazon CloudFront","AWS Global Accelerator","Amazon API Gateway"],r:1,e:"Amazon CloudFront est le CDN d'AWS.",level:1}
  ],

  // NIVEAU 2 - INTERMÉDIAIRE (Services spécialisés)
  2: [
    {c:"Compute",q:"Durée maximale d'exécution d'une fonction AWS Lambda ?",a:["5 minutes","10 minutes","15 minutes","30 minutes"],r:2,e:"Une fonction Lambda peut s'exécuter au maximum 15 minutes.",level:2},
    {c:"Stockage",q:"Quelle classe S3 est la moins chère pour des données rarement accédées ?",a:["S3 Standard","S3 Intelligent-Tiering","S3 Glacier Deep Archive","S3 Standard-IA"],r:2,e:"S3 Glacier Deep Archive est la classe la moins chère.",level:2},
    {c:"Base de données",q:"Quel service AWS est compatible MySQL/PostgreSQL avec des performances 5x supérieures ?",a:["Amazon RDS","Amazon Aurora","Amazon Redshift","Amazon Neptune"],r:1,e:"Amazon Aurora est jusqu'à 5x plus rapide que MySQL standard.",level:2},
    {c:"Sécurité",q:"Quel service AWS protège contre les attaques DDoS ?",a:["AWS WAF","AWS Shield","Amazon GuardDuty","AWS Firewall Manager"],r:1,e:"AWS Shield est un service de protection DDoS managé.",level:2},
    {c:"DevOps",q:"Quel service AWS permet de définir l'infrastructure en tant que code (IaC) ?",a:["AWS CodeDeploy","AWS CloudFormation","AWS OpsWorks","AWS Systems Manager"],r:1,e:"AWS CloudFormation permet de modéliser l'infrastructure via des templates.",level:2},
    {c:"Analytics",q:"Quel service AWS permet d'analyser des données dans S3 avec du SQL sans serveur ?",a:["Amazon Redshift","Amazon EMR","Amazon Athena","AWS Glue"],r:2,e:"Amazon Athena est un service de requêtes SQL serverless sur S3.",level:2},
    {c:"Machine Learning",q:"Quel service AWS permet d'analyser des images et des vidéos avec l'IA ?",a:["Amazon Comprehend","Amazon Transcribe","Amazon Rekognition","Amazon Textract"],r:2,e:"Amazon Rekognition analyse des images et vidéos.",level:2},
    {c:"Containers",q:"Quel service AWS est le service managé de Kubernetes ?",a:["Amazon ECS","AWS Fargate","Amazon EKS","AWS App Runner"],r:2,e:"Amazon EKS (Elastic Kubernetes Service) est le service Kubernetes managé d'AWS.",level:2},
    {c:"Serverless",q:"Quel service AWS permet de créer et gérer des APIs REST et WebSocket ?",a:["AWS AppSync","Amazon API Gateway","AWS App Runner","Amazon CloudFront"],r:1,e:"Amazon API Gateway permet de créer et gérer des APIs.",level:2},
    {c:"DevOps",q:"Quel service AWS surveille les métriques, logs et alarmes de vos ressources ?",a:["AWS CloudTrail","AWS Config","Amazon CloudWatch","AWS X-Ray"],r:2,e:"Amazon CloudWatch collecte et surveille les métriques et logs.",level:2}
  ],

  // NIVEAU 3 - AVANCÉ (Architecture et optimisation)
  3: [
    {c:"Architecture",q:"Quel principe du Well-Architected Framework se concentre sur l'automatisation et l'élimination des tâches manuelles ?",a:["Reliability","Performance Efficiency","Operational Excellence","Cost Optimization"],r:2,e:"Operational Excellence met l'accent sur l'automatisation et l'amélioration continue.",level:3},
    {c:"Sécurité",q:"Quel service AWS permet de chiffrer automatiquement les données au repos dans tous les services AWS ?",a:["AWS KMS","AWS CloudHSM","AWS Certificate Manager","AWS Secrets Manager"],r:0,e:"AWS KMS (Key Management Service) gère le chiffrement centralisé.",level:3},
    {c:"Réseau",q:"Quel service AWS permet de connecter plusieurs VPC dans différentes régions ?",a:["VPC Peering","AWS Transit Gateway","AWS Direct Connect","AWS PrivateLink"],r:1,e:"AWS Transit Gateway permet de connecter plusieurs VPC et réseaux on-premises.",level:3},
    {c:"Base de données",q:"Quel service AWS permet de migrer des bases de données avec un temps d'arrêt minimal ?",a:["AWS Database Migration Service","AWS DataSync","AWS Storage Gateway","AWS Backup"],r:0,e:"AWS DMS permet la migration continue avec réplication en temps réel.",level:3},
    {c:"Analytics",q:"Quel service AWS est recommandé pour traiter des téraoctets de données avec Apache Spark ?",a:["Amazon Athena","Amazon EMR","AWS Glue","Amazon Kinesis"],r:1,e:"Amazon EMR (Elastic MapReduce) est optimisé pour les gros volumes avec Spark.",level:3},
    {c:"Containers",q:"Quel service AWS permet d'exécuter des conteneurs sans gérer l'infrastructure sous-jacente ?",a:["Amazon ECS","Amazon EKS","AWS Fargate","AWS Batch"],r:2,e:"AWS Fargate est un moteur de calcul serverless pour conteneurs.",level:3},
    {c:"Machine Learning",q:"Quel service AWS est la plateforme complète de Machine Learning d'AWS ?",a:["Amazon Rekognition","Amazon SageMaker","AWS DeepLens","Amazon Comprehend"],r:1,e:"Amazon SageMaker est la plateforme ML complète d'AWS.",level:3},
    {c:"Sécurité",q:"Quel service AWS fournit une analyse comportementale pour détecter les menaces ?",a:["AWS WAF","AWS Shield","Amazon GuardDuty","AWS Security Hub"],r:2,e:"Amazon GuardDuty utilise l'IA pour détecter les activités malveillantes.",level:3},
    {c:"Stockage",q:"Quel service AWS permet de synchroniser automatiquement des données entre on-premises et le cloud ?",a:["AWS DataSync","AWS Storage Gateway","AWS Direct Connect","AWS Backup"],r:0,e:"AWS DataSync automatise le transfert de données vers AWS.",level:3},
    {c:"DevOps",q:"Quel service AWS permet de déployer des applications avec des stratégies blue/green ?",a:["AWS CodeDeploy","AWS CodePipeline","AWS CodeBuild","AWS CodeCommit"],r:0,e:"AWS CodeDeploy supporte les déploiements blue/green et rolling.",level:3}
  ],

  // NIVEAU 4 - EXPERT (Solutions complexes)
  4: [
    {c:"Architecture",q:"Dans une architecture multi-région, quel service AWS assure la cohérence des données avec une latence minimale ?",a:["Amazon RDS Multi-AZ","Amazon Aurora Global Database","DynamoDB Global Tables","Amazon Redshift Cross-Region"],r:2,e:"DynamoDB Global Tables offre une réplication multi-région avec cohérence éventuelle.",level:4},
    {c:"Sécurité",q:"Quel service AWS permet d'implémenter Zero Trust Network Access pour les applications ?",a:["AWS PrivateLink","AWS Client VPN","AWS Verified Access","AWS Direct Connect"],r:2,e:"AWS Verified Access implémente l'accès Zero Trust sans VPN.",level:4},
    {c:"Performance",q:"Pour optimiser les performances d'une base de données Aurora, quelle fonctionnalité permet de distribuer les lectures ?",a:["Read Replicas","Aurora Serverless","Aurora Multi-Master","Aurora Global Database"],r:0,e:"Les Read Replicas d'Aurora distribuent la charge de lecture.",level:4},
    {c:"Cost Optimization",q:"Quel service AWS permet d'analyser et d'optimiser automatiquement les coûts des ressources ?",a:["AWS Cost Explorer","AWS Budgets","AWS Compute Optimizer","AWS Trusted Advisor"],r:2,e:"AWS Compute Optimizer utilise l'IA pour recommander des optimisations.",level:4},
    {c:"Réseau",q:"Pour une latence ultra-faible, quel service AWS place les ressources au plus près des utilisateurs ?",a:["Amazon CloudFront","AWS Global Accelerator","AWS Local Zones","AWS Wavelength"],r:3,e:"AWS Wavelength déploie les services AWS dans les réseaux 5G des opérateurs.",level:4},
    {c:"Analytics",q:"Quel service AWS permet de traiter des flux de données en temps réel avec des fenêtres temporelles ?",a:["Amazon Kinesis Data Streams","Amazon Kinesis Data Analytics","Amazon Kinesis Data Firehose","Amazon MSK"],r:1,e:"Kinesis Data Analytics traite les flux en temps réel avec SQL.",level:4},
    {c:"Machine Learning",q:"Quel service AWS permet de déployer des modèles ML avec mise à l'échelle automatique et A/B testing ?",a:["Amazon SageMaker Endpoints","AWS Lambda","Amazon ECS","AWS Batch"],r:0,e:"SageMaker Endpoints offre l'auto-scaling et les tests A/B pour les modèles.",level:4},
    {c:"Governance",q:"Quel service AWS permet d'appliquer des politiques de conformité à l'échelle de l'organisation ?",a:["AWS Organizations","AWS Config","AWS Control Tower","AWS Security Hub"],r:2,e:"AWS Control Tower automatise la gouvernance multi-comptes.",level:4},
    {c:"Disaster Recovery",q:"Quelle stratégie de DR offre le RTO le plus faible pour une application critique ?",a:["Backup and Restore","Pilot Light","Warm Standby","Multi-Site Active/Active"],r:3,e:"Multi-Site Active/Active offre un RTO quasi-nul avec basculement instantané.",level:4},
    {c:"Hybrid Cloud",q:"Quel service AWS permet d'étendre les services AWS dans votre datacenter on-premises ?",a:["AWS Direct Connect","AWS Storage Gateway","AWS Outposts","AWS Local Zones"],r:2,e:"AWS Outposts apporte l'infrastructure AWS dans vos locaux.",level:4}
  ],

  // NIVEAU 5 - MAÎTRE (Expertise avancée)
  5: [
    {c:"Architecture",q:"Dans une architecture event-driven, quel pattern AWS assure la résilience avec retry et DLQ ?",a:["Amazon SQS + Lambda","Amazon SNS + SQS + Lambda","EventBridge + Step Functions","Kinesis + Lambda"],r:1,e:"SNS + SQS + Lambda avec DLQ assure la résilience et le retry automatique.",level:5},
    {c:"Performance",q:"Pour une application nécessitant une latence sub-milliseconde, quelle solution AWS est optimale ?",a:["ElastiCache Redis","DynamoDB DAX","Aurora Serverless","MemoryDB for Redis"],r:1,e:"DynamoDB DAX offre une latence en microsecondes pour DynamoDB.",level:5},
    {c:"Sécurité",q:"Quel service AWS permet d'implémenter la rotation automatique des secrets avec intégration native ?",a:["AWS Secrets Manager","AWS Systems Manager Parameter Store","AWS KMS","HashiCorp Vault on AWS"],r:0,e:"AWS Secrets Manager automatise la rotation avec intégration RDS, Redshift, etc.",level:5},
    {c:"Cost Optimization",q:"Pour optimiser les coûts d'une workload batch intermittente, quelle stratégie est la plus efficace ?",a:["Reserved Instances","Spot Instances","Savings Plans","On-Demand Instances"],r:1,e:"Spot Instances offrent jusqu'à 90% d'économies pour les workloads flexibles.",level:5},
    {c:"Analytics",q:"Quel service AWS permet de créer des lacs de données avec gouvernance et catalogage automatique ?",a:["Amazon S3 + Glue","AWS Lake Formation","Amazon EMR","Amazon Redshift Spectrum"],r:1,e:"AWS Lake Formation automatise la création et gouvernance des data lakes.",level:5},
    {c:"Machine Learning",q:"Pour entraîner des modèles ML distribués sur plusieurs GPU, quelle approche AWS est recommandée ?",a:["SageMaker Training Jobs","EC2 P4 instances","AWS Batch","SageMaker Distributed Training"],r:3,e:"SageMaker Distributed Training optimise l'entraînement multi-GPU/multi-nœud.",level:5},
    {c:"Réseau",q:"Pour isoler complètement le trafic entre microservices, quelle solution AWS est la plus sécurisée ?",a:["Security Groups","NACLs","AWS App Mesh + Envoy","VPC Endpoints"],r:2,e:"AWS App Mesh avec Envoy proxy assure l'isolation et le chiffrement mTLS.",level:5},
    {c:"DevOps",q:"Quel service AWS permet d'implémenter GitOps avec déploiement automatique basé sur les commits ?",a:["AWS CodePipeline","AWS CodeDeploy","Amazon EKS + Flux","AWS App Runner"],r:2,e:"EKS avec Flux/ArgoCD implémente GitOps avec synchronisation automatique.",level:5},
    {c:"Observability",q:"Pour tracer les requêtes dans une architecture microservices complexe, quelle solution AWS est optimale ?",a:["CloudWatch Logs","AWS X-Ray","CloudWatch Insights","AWS CloudTrail"],r:1,e:"AWS X-Ray trace les requêtes end-to-end dans les architectures distribuées.",level:5},
    {c:"Compliance",q:"Quel service AWS permet d'automatiser la conformité PCI DSS avec évaluation continue ?",a:["AWS Config Rules","AWS Security Hub","AWS Audit Manager","AWS Well-Architected Tool"],r:2,e:"AWS Audit Manager automatise la collecte de preuves pour les audits de conformité.",level:5}
  ]
};

// Export pour utilisation dans le serveur
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTIONS_BY_LEVEL };
}