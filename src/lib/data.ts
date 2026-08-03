export const profile = {
  name: "森 幸夫",
  nameRomaji: "Mori Yukio",
  title: "フルスタックエンジニア / AIエンジニア / テクニカルリード",
  subtitle: "Full-Stack & AI Engineer / Technical Lead",
  location: "埼玉県上尾市",
  email: "ka6994388@gmail.com",
  yearsOfExperience: 8,
  freelanceSince: "2025年11月",
  summary:
    "約8年間、バックエンドエンジニア・AIエンジニアとして、FinTech・GovTech・SaaS・AI領域のシステム開発に従事。高トラフィック決済基盤の設計、行政システムのクラウド化、SaaSのマイクロサービス化、AIエージェント/RAG構築まで一貫して担当してまいりました。要件定義から設計・開発・インフラ・運用まで横断的に対応し、「業務構造をシステム設計に変換する力」を強みとしています。直近では生成AIを活用した業務自動化・RAG構築により、最大60%の業務削減を実現しました。",
  motto:
    "技術は、静かに人の仕事を支えるためにある。",
  mottoEn: "Technology should quietly support the work of people.",
};

export const selfPR = [
  {
    title: "課題起点で設計できるエンジニアリング能力",
    body: "業務フローの暗黙知を構造化し、システム設計に落とし込むことを得意とする。AIエージェント開発では、問い合わせ業務を分解しRAG構造を設計することで、60%の工数削減を実現。",
  },
  {
    title: "0→1〜運用までの一貫実装力",
    body: "PoCで終わらず、本番運用まで責任を持って設計・実装。AWS構築・API開発・運用設計まで一気通貫で対応可能。",
  },
  {
    title: "グローバル開発適応力",
    body: "オフショア開発・多国籍チームでのブリッジ経験を通じて、曖昧な要件を構造化し、開発可能な仕様へ変換する能力を習得。",
  },
];

export type SkillGroup = {
  key: string;
  label: string;
  labelEn: string;
  years: string;
  level: number; // 0-100 for visual bar
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "ai",
    label: "AI / Agent / RAG設計",
    labelEn: "AI / Agent / RAG",
    years: "実務経験 5年以上",
    level: 90,
    items: ["OpenAI", "Claude", "LangChain", "Dify", "RAG設計", "ベクトル検索(pgvector)"],
  },
  {
    key: "backend",
    label: "Backend設計",
    labelEn: "Backend Architecture",
    years: "実務経験 6年以上",
    level: 95,
    items: ["Python (FastAPI)", "Java (Spring Boot)", "REST / OpenAPI", "冪等性設計", "非同期・バッチ処理"],
  },
  {
    key: "cloud",
    label: "AWS / クラウド設計",
    labelEn: "Cloud Architecture",
    years: "実務経験 5年以上",
    level: 88,
    items: ["ECS", "EKS", "EC2", "RDS", "S3", "Lambda", "Multi-AZ / 99.9% SLA", "CloudWatch"],
  },
  {
    key: "db",
    label: "DB設計・性能改善",
    labelEn: "Database Design",
    years: "実務経験 5年以上",
    level: 85,
    items: ["PostgreSQL", "MySQL", "Ledger設計(金融)", "インデックス設計", "クエリチューニング"],
  },
  {
    key: "pm",
    label: "プロジェクト推進",
    labelEn: "Project Leadership",
    years: "実務経験 8年以上",
    level: 92,
    items: ["要件定義", "PM補佐 / PL", "オフショアブリッジ開発", "QAプロセス設計・標準化"],
  },
];

export type InstitutionKey =
  | "hust"
  | "hanoiJp"
  | "redsquare"
  | "scoville"
  | "cmc"
  | "freelance";

export type Institution = {
  name: string;
  nameEn?: string;
  url?: string;
  logo?: string;
  business?: string;
  capital?: string;
  employees?: string;
};

export const institutions: Record<InstitutionKey, Institution> = {
  hust: {
    name: "ハノイ工科大学",
    nameEn: "Hanoi University of Science and Technology",
    url: "https://www.hust.edu.vn",
    logo: "/logos/hust.png",
  },
  hanoiJp: {
    name: "ハノイ日本人学校",
    nameEn: "The Japanese School of Hanoi",
    url: "https://jsh.edu.vn",
    logo: "/logos/jsh.png",
  },
  redsquare: {
    name: "RedSquare Technologies Sdn. Bhd.",
    url: "https://redsquare.software",
    logo: "/logos/redsquare.png",
    business:
      "FinTech・GovTech領域に特化した開発会社。決済システム、行政システム、加盟店管理基盤などミッションクリティカルな領域を中心に受託開発を実施。",
    capital: "70万円",
    employees: "100名",
  },
  scoville: {
    name: "株式会社Scoville",
    url: "https://scoville.jp/en/",
    logo: "/logos/scoville.png",
    business: "AI開発、業務システム開発、B2B SaaS開発、DX支援を手がけるITベンチャー。",
    capital: "75万円",
    employees: "80名",
  },
  cmc: {
    name: "CMC Japan / CMC Global Company Limited",
    url: "https://cmc-japan.co.jp",
    logo: "/logos/cmc.png",
    business:
      "ベトナム第2位のICTグループ CMC Corporationの日本法人。オフショア開発拠点「CMC Global」と連携したブリッジエンジニアリング・API設計を担当。",
    capital: "120万円",
    employees: "300名",
  },
  freelance: {
    name: "フリーランス（個人事業主）",
    business: "AIエージェント開発、RAGシステム構築、業務自動化、Web開発。",
    capital: "70万円",
    employees: "1名",
  },
};

export type CareerEntry = {
  period: string;
  org: string;
  role: string;
  type: "education" | "work";
  description?: string;
  institutionKey: InstitutionKey;
};

export const career: CareerEntry[] = [
  {
    period: "2011.03",
    org: "ハノイ日本人学校",
    role: "中等部 卒業",
    type: "education",
    institutionKey: "hanoiJp",
  },
  {
    period: "2014.03",
    org: "ハノイ日本人学校",
    role: "高等部 卒業",
    type: "education",
    institutionKey: "hanoiJp",
  },
  {
    period: "2014.04 – 2018.10",
    org: "ハノイ工科大学（Hanoi University of Science and Technology）",
    role: "先端技術工学部 コンピュータサイエンス・エンジニアリング学科 卒業",
    type: "education",
    description:
      "アルゴリズム・データ構造・データベース・ネットワーク・ソフトウェア工学・人工知能を専攻。チーム開発を通じてWebアプリケーション開発の基礎を習得。",
    institutionKey: "hust",
  },
  {
    period: "2019.02 – 2022.01",
    org: "RedSquare Technologies Sdn. Bhd.",
    role: "バックエンドエンジニア / 設計リード補佐",
    type: "work",
    description: "FinTech・GovTech領域の受託開発。決済基盤、行政システム、加盟店管理基盤を担当。",
    institutionKey: "redsquare",
  },
  {
    period: "2022.05 – 2024.02",
    org: "株式会社Scoville",
    role: "テックリード補佐",
    type: "work",
    description: "AI開発・業務システム・B2B SaaS開発。看護シフト最適化AI、SaaSマイクロサービス化を担当。",
    institutionKey: "scoville",
  },
  {
    period: "2024.03 – 2025.09",
    org: "CMC Japan / CMC Global Company Limited",
    role: "ブリッジエンジニア / API設計責任者",
    type: "work",
    description: "日本企業向けオフショア開発。要件の構造化とAPI設計、QA標準化を推進。",
    institutionKey: "cmc",
  },
  {
    period: "2025.11 – 現在",
    org: "フリーランス（個人事業主）",
    role: "AIエンジニア / フルスタックエンジニア",
    type: "work",
    description: "AIエージェント開発、RAGシステム構築、業務自動化、Web開発を手がける。",
    institutionKey: "freelance",
  },
];

export type CaseStudy = {
  period: string;
  org: string;
  institutionKey: InstitutionKey;
  title: string;
  role: string;
  tags: string[];
  summary: string;
  results: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    period: "2019.02 – 2020.03",
    org: "RedSquare Technologies",
    institutionKey: "redsquare",
    title: "E-Wallet決済基盤（FinTech）",
    role: "バックエンドエンジニア / 設計リード補佐",
    tags: ["Spring Boot", "Redis", "Saga設計", "冪等性設計"],
    summary:
      "東南アジア向けE-Wallet基幹システム（ピーク数千TPS）を新規構築。Ledgerベースで残高整合性を担保する金融トランザクション基盤を設計。",
    results: ["レスポンス性能 約35%改善", "決済整合性バグを大幅削減", "金融Ledger設計を標準化"],
  },
  {
    period: "2020.04 – 2021.02",
    org: "RedSquare Technologies",
    institutionKey: "redsquare",
    title: "政府向けデジタル行政プラットフォーム",
    role: "バックエンドエンジニア",
    tags: ["FastAPI", "ECS", "Multi-AZ"],
    summary: "軽量・高速なFastAPIとOpenAPI自動生成を採用し、運用負荷とスケーラビリティを両立するECS構成を構築。",
    results: ["稼働率 99.9%", "行政申請処理を完全デジタル化"],
  },
  {
    period: "2021.03 – 2022.01",
    org: "RedSquare Technologies",
    institutionKey: "redsquare",
    title: "加盟店管理プラットフォーム",
    role: "バックエンドエンジニア",
    tags: ["Kafka", "Redis"],
    summary: "集計遅延という課題をイベント駆動アーキテクチャで解決し、レポート生成を高速化。",
    results: ["処理速度 25%改善", "レポート生成時間を短縮"],
  },
  {
    period: "2022.05 – 2023.10",
    org: "株式会社Scoville",
    institutionKey: "scoville",
    title: "看護シフト最適化AI",
    role: "AIエンジニア",
    tags: ["CSP", "バックトラッキング", "ヒューリスティック"],
    summary: "制約充足問題（CSP）とバックトラッキングを用いたルールベース最適化により、厳密解と計算コストのトレードオフを実用時間内に収束。",
    results: ["シフト作成工数 70%削減"],
  },
  {
    period: "2023.11 – 2024.02",
    org: "株式会社Scoville",
    institutionKey: "scoville",
    title: "SaaSマイクロサービス化",
    role: "テックリード補佐",
    tags: ["DDD", "CI/CD"],
    summary: "DDDによるbounded contextの再設計とCI/CD改善を主導。",
    results: ["リリース頻度が向上", "デプロイ時間を短縮"],
  },
  {
    period: "2024.03 – 2025.09",
    org: "CMC Japan",
    institutionKey: "cmc",
    title: "日本企業向けオフショア開発プロジェクト",
    role: "ブリッジエンジニア / API設計責任者",
    tags: ["OpenAPI", "ログ設計標準化", "QA標準化"],
    summary: "曖昧な業務要件をAPI設計へ変換し、仕様の曖昧性を排除。テストケース標準化により属人性を排除。",
    results: ["QA指摘率 30〜40%改善", "手戻り工数を削減"],
  },
  {
    period: "2025.11 – 2026.01",
    org: "フリーランス",
    institutionKey: "freelance",
    title: "AI業務自動化エージェント",
    role: "フルスタックAIエンジニア",
    tags: ["Dify", "OpenAI", "FastAPI", "AWS ECS"],
    summary: "業務プロセスをAIワークフローへ変換し、自動化エージェントを構築・運用。",
    results: ["業務工数 60%削減"],
  },
  {
    period: "2026.01 – 2026.03",
    org: "フリーランス",
    institutionKey: "freelance",
    title: "RAG検索システム",
    role: "AIアーキテクト",
    tags: ["pgvector", "Embedding設計", "Chunk設計"],
    summary: "chunk設計・embedding設計・pgvector構築により、社内ナレッジ検索基盤を構築。",
    results: ["ナレッジ検索効率が大幅改善"],
  },
  {
    period: "2026.04 – 2026.05",
    org: "フリーランス",
    institutionKey: "freelance",
    title: "AIチャットボット（EC）",
    role: "AI + Backend + UI設計",
    tags: ["Next.js", "Claude API", "ベクトル検索"],
    summary: "Next.jsとClaude APIを組み合わせ、ベクトル検索と連携したECサイト向けAIチャットボットを開発。",
    results: ["CVR 1.7倍", "離脱率 20%改善"],
  },
];

export type WebWork = {
  url: string;
  label: string;
  stack: string;
  logo?: string;
};

export const webWorks: WebWork[] = [
  {
    url: "https://www.vitahealth.net.au/",
    label: "VitaHealth",
    stack: "React",
    logo: "/logos/webworks/vitahealth.png",
  },
  { url: "https://www.gopanache.com/", label: "Panache", stack: "React" },
  { url: "https://www.aimro.ie/", label: "AIMRO", stack: "React", logo: "/logos/webworks/aimro.png" },
  {
    url: "https://tutorful.co.uk/",
    label: "Tutorful",
    stack: "Vue / Nuxt",
    logo: "/logos/webworks/tutorful.png",
  },
  {
    url: "https://www.arttoframe.com/",
    label: "Art to Frame",
    stack: "Angular",
    logo: "/logos/webworks/arttoframe.png",
  },
  { url: "https://opacity.io", label: "Opacity", stack: "Angular", logo: "/logos/webworks/opacity.png" },
  { url: "https://coach.io/", label: "Coach.io", stack: "Laravel", logo: "/logos/webworks/coach.png" },
  { url: "https://mycreatorhive.com/", label: "Creator Hive", stack: "Laravel" },
  {
    url: "http://www.thornlighting.com.au/en-au",
    label: "Thorn Lighting",
    stack: "Python",
    logo: "/logos/webworks/thorn.png",
  },
  { url: "https://www.kodeclubs.com/", label: "KodeClubs", stack: "Three.js" },
  {
    url: "https://www.thewodlife.com.au/",
    label: "The WOD Life",
    stack: "WordPress",
    logo: "/logos/webworks/wodlife.png",
  },
  {
    url: "https://drivedge.com/",
    label: "Drivedge",
    stack: "WordPress",
    logo: "/logos/webworks/drivedge.png",
  },
  {
    url: "https://zac.finance/",
    label: "ZAC Finance",
    stack: "Blockchain",
    logo: "/logos/webworks/zacfinance.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.urbytus.login_signup",
    label: "Urbytus",
    stack: "Mobile",
    logo: "/logos/webworks/urbytus.png",
  },
];

