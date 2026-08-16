export type Lang = 'zh' | 'en';
export type Localized = Record<Lang, string>;

export interface LinkItem {
  label: Localized;
  href: string;
}

export interface Metric {
  value: string;
  label: Localized;
}

export interface Project {
  slug: string;
  index: string;
  category: 'engineering' | 'research';
  title: Localized;
  eyebrow: Localized;
  period: Localized;
  summary: Localized;
  challenge: Localized;
  role: Localized;
  approach: Record<Lang, string[]>;
  outcomes: Record<Lang, string[]>;
  metrics: Metric[];
  stack: string[];
  flow: Record<Lang, string[]>;
  links: LinkItem[];
  accent: 'blue' | 'green' | 'violet' | 'orange';
  status?: Localized;
}

export interface Publication {
  title: string;
  authors: string;
  venue: Localized;
  year: string;
  status: 'published' | 'under-review';
  description: Localized;
  href?: string;
}

export interface Experience {
  company: Localized;
  role: Localized;
  period: Localized;
  summary: Localized;
}

export interface Education {
  school: Localized;
  degree: Localized;
  period: Localized;
  detail: Localized;
}

export const profile = {
  name: { zh: '高伟翔', en: 'Weixiang Gao' },
  title: { zh: 'AI 应用开发者 × EEG 研究者', en: 'AI Application Engineer × EEG Researcher' },
  location: { zh: '中国 · 杭州', en: 'Hangzhou, China' },
  email: '18973489380@163.com',
  github: 'https://github.com/wxG2',
  intro: {
    zh: '我构建可恢复的 Agent 系统、规模化语音智能基础设施，也研究如何让脑电信号成为可解释、可生成的计算对象。',
    en: 'I build recoverable agent systems and speech intelligence infrastructure, while researching interpretable and generative models for EEG.',
  },
};

export const projects: Project[] = [
  {
    slug: 'lingshu-audio-platform',
    index: '01',
    category: 'engineering',
    title: { zh: '灵枢智能录音处理平台', en: 'Lingshu Intelligent Audio Platform' },
    eyebrow: { zh: '语音基础设施 · 分布式系统', en: 'Speech Infrastructure · Distributed Systems' },
    period: { zh: '有方大健康 · 2026', en: 'Youfang Health · 2026' },
    summary: {
      zh: '面向大规模业务录音，将 ASR、长文本语义分析、报告生成与业务回调串成可恢复、可审计的端到端平台。',
      en: 'A recoverable and auditable platform connecting distributed ASR, long-form semantic analysis, report generation, and business callbacks.',
    },
    challenge: {
      zh: '每月约 53 万小时录音需要跨 GPU 节点稳定处理；长录音分析还要应对消息重复、阶段失败、状态恢复与成本追踪。',
      en: 'Roughly 530,000 hours of audio per month required reliable multi-GPU processing, while long-recording analysis needed idempotency, recovery, and cost traceability.',
    },
    role: {
      zh: '负责顶层 LLM Pipeline、ASR 集群可靠性设计、分布式部署与性能优化，将算法链路落成可运行的平台。',
      en: 'Owned the top-level LLM pipeline, ASR reliability design, distributed deployment, and performance optimization.',
    },
    approach: {
      zh: [
        '用 LangGraph 与 PostgreSQL 构建 Job 状态机和分析 DAG，持久化模型版本、Token、延迟与成本。',
        '以 RocketMQ、对象存储和 Worker Pool 解耦预处理、FunASR、CAM++、标点恢复与后处理。',
        '通过 Inbox/Outbox、幂等消费、Worker Lease、重试和 DLQ 支持跨节点可恢复执行。',
        '将 Chunk 链路改造成流式生产者—消费者模式，并结合动态 Batch 与阶段并行减少 GPU 空转。',
      ],
      en: [
        'Built a persistent Job state machine and analysis DAG with LangGraph and PostgreSQL, tracking model version, tokens, latency, and cost.',
        'Decoupled preprocessing, FunASR, CAM++, punctuation, and postprocessing through RocketMQ, object storage, and worker pools.',
        'Applied Inbox/Outbox, idempotent consumption, leases, retries, and DLQ handling for cross-node recovery.',
        'Refactored chunk processing into a streaming producer-consumer pipeline with dynamic batching and stage parallelism.',
      ],
    },
    outcomes: {
      zh: ['完成 6 张 RTX 4090 的分布式部署与角色资源配比。', '完整 ASR 链路实测吞吐达到 900× 以上。'],
      en: ['Deployed and balanced the workload across six RTX 4090 GPUs.', 'Measured end-to-end ASR throughput above 900× real time.'],
    },
    metrics: [
      { value: '530K h', label: { zh: '月度录音需求', en: 'monthly audio demand' } },
      { value: '6×4090', label: { zh: '分布式 GPU', en: 'distributed GPUs' } },
      { value: '900×+', label: { zh: '完整链路吞吐', en: 'pipeline throughput' } },
    ],
    stack: ['LangGraph', 'FastAPI', 'PostgreSQL', 'RocketMQ', 'FunASR', 'CAM++', 'Docker'],
    flow: {
      zh: ['Job API', 'ASR 集群', 'Transcript 2.0', '窗口分析', '报告与回调'],
      en: ['Job API', 'ASR Cluster', 'Transcript 2.0', 'Window Analysis', 'Report & Callback'],
    },
    links: [],
    accent: 'blue',
  },
  {
    slug: 'fangxiaoji-remix-agent',
    index: '02',
    category: 'engineering',
    title: { zh: '方小集 AI 混剪 Agent', en: 'Fangxiaoji AI Remix Agent' },
    eyebrow: { zh: 'Agentic Workflow · 多路 RAG', en: 'Agentic Workflow · Hybrid RAG' },
    period: { zh: '有方大健康 · 2026', en: 'Youfang Health · 2026' },
    summary: {
      zh: '为拥有 10k+ 视频素材的营销平台设计人机协同混剪工作流，从自然语言需求到逐镜头确认、异步渲染与交付。',
      en: 'A human-in-the-loop remix workflow for a marketing platform with 10k+ video assets, spanning intent understanding, shot confirmation, rendering, and delivery.',
    },
    challenge: {
      zh: '整视频检索无法直接支持镜头级叙事；全自动生成又难以满足品牌素材选择、时长和可控性要求。',
      en: 'Video-level retrieval could not support shot-level storytelling, while fully automatic generation lacked control over asset choice, duration, and brand fit.',
    },
    role: {
      zh: '设计 Agentic Workflow、场景级 RAG、人工反馈重规划与 GRPO 后训练方案。',
      en: 'Designed the agentic workflow, scene-level RAG, human-feedback replanning, and GRPO post-training strategy.',
    },
    approach: {
      zh: [
        '用 FastAPI 与 remix_jobs 状态机编排需求解析、故事板、召回、确认、TTS 预验证和 FFmpeg 渲染。',
        '将视频拆为带时间戳和视觉描述的片段，以向量、全文、标签/关键词三路召回，使用 RRF 与业务规则重排。',
        '设置 Human-in-the-Loop 节点，支持整体重排和局部换片两类反馈。',
        '基于 Qwen2.5-7B-Instruct 构造约 500 条训练 Prompt，以七维奖励函数优化结构化 Planner。',
      ],
      en: [
        'Orchestrated intent parsing, storyboarding, retrieval, confirmation, TTS validation, and FFmpeg rendering with FastAPI and a job state machine.',
        'Indexed timestamped scenes and fused vector, full-text, and tag retrieval with RRF and business-aware reranking.',
        'Added human-in-the-loop checkpoints for full replanning and local shot replacement.',
        'Post-trained a Qwen2.5-7B-Instruct planner on roughly 500 prompts with a seven-dimensional reward function.',
      ],
    },
    outcomes: {
      zh: ['Schema 合法率从 88.5% 提升到 96.8%。', '首轮 QA 通过率从 63.3% 提升到 78.9%。'],
      en: ['Improved schema validity from 88.5% to 96.8%.', 'Raised first-pass QA acceptance from 63.3% to 78.9%.'],
    },
    metrics: [
      { value: '10K+', label: { zh: '平台视频素材', en: 'video assets' } },
      { value: '96.8%', label: { zh: 'Schema 合法率', en: 'schema validity' } },
      { value: '+15.6pt', label: { zh: '首轮 QA 提升', en: 'first-pass QA gain' } },
    ],
    stack: ['FastAPI', 'Qwen2.5', 'GRPO', 'pgvector', 'RRF', 'FFmpeg', 'TTS'],
    flow: {
      zh: ['自然语言需求', '故事板 Planner', '多路场景召回', '人工确认', '异步渲染'],
      en: ['Natural-language Brief', 'Storyboard Planner', 'Hybrid Scene Retrieval', 'Human Review', 'Async Rendering'],
    },
    links: [],
    accent: 'green',
  },
  {
    slug: 'vidgen-agent',
    index: '03',
    category: 'engineering',
    title: { zh: 'VidGen 多 Agent 视频生成平台', en: 'VidGen Multi-Agent Video Studio' },
    eyebrow: { zh: '开源项目 · AIGC 工作台', en: 'Open Source · AIGC Workspace' },
    period: { zh: '个人项目 · 2026', en: 'Personal Project · 2026' },
    summary: {
      zh: '将脚本、图片、语音、分镜生成和时间线编辑组合成一键与手动两种创作模式的短视频生产工作台。',
      en: 'A short-video production workspace combining scripts, images, speech, shot generation, and timeline editing in automatic and manual modes.',
    },
    challenge: {
      zh: '视频生成涉及多模型、长耗时任务和大量中间产物，创作者既需要自动化，也需要随时接管每一步。',
      en: 'Video generation spans multiple models, long-running jobs, and many intermediate assets; creators need automation without losing control.',
    },
    role: {
      zh: '独立设计前后端架构、五 Agent 流水线、Provider 路由、进度可视化和可下载中间产物。',
      en: 'Designed the full-stack architecture, five-agent pipeline, provider routing, progress visualization, and downloadable intermediates.',
    },
    approach: {
      zh: [
        '由 Orchestrator、Prompt Engineer、Audio/Subtitle、Video Generator 和 Video Editor 分工协作。',
        '自动模式从素材与脚本生成分镜；手动模式开放素材选择、Prompt 编辑和时间线调整。',
        '统一接入 Qwen Omni、Qwen TTS、Kling 与 Seedance 等 Provider。',
      ],
      en: [
        'Split responsibilities across orchestrator, prompt engineer, audio/subtitle, video generator, and editor agents.',
        'Offered an automatic script-to-storyboard flow plus a manual mode for prompt, material, and timeline control.',
        'Unified Qwen Omni, Qwen TTS, Kling, and Seedance providers behind a consistent service layer.',
      ],
    },
    outcomes: {
      zh: ['完整呈现任务进度、Token 使用与中间资产。', '支持抖音、小红书和 Bilibili 等目标画幅导出。'],
      en: ['Exposes run progress, token usage, and intermediate assets.', 'Exports platform-specific formats for Douyin, Xiaohongshu, and Bilibili.'],
    },
    metrics: [
      { value: '5', label: { zh: '协作 Agent', en: 'cooperating agents' } },
      { value: '2', label: { zh: '创作模式', en: 'creation modes' } },
      { value: 'Full-stack', label: { zh: '端到端工作台', en: 'end-to-end studio' } },
    ],
    stack: ['Vue 3', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'Qwen', 'Seedance', 'FFmpeg'],
    flow: {
      zh: ['素材与脚本', '规划与 Prompt', '音频与字幕', '分镜生成', '时间线编辑'],
      en: ['Assets & Script', 'Planning & Prompting', 'Audio & Subtitles', 'Shot Generation', 'Timeline Editing'],
    },
    links: [{ label: { zh: '查看 GitHub', en: 'View on GitHub' }, href: 'https://github.com/wxG2/marketvidgen-agent' }],
    accent: 'orange',
  },
  {
    slug: 'sttcnn-pd-eeg',
    index: '04',
    category: 'research',
    title: { zh: 'STTCNN 帕金森 EEG 分类', en: 'STTCNN for Parkinson’s EEG Classification' },
    eyebrow: { zh: '第一作者论文 · Applied Soft Computing', en: 'First-author Paper · Applied Soft Computing' },
    period: { zh: '杭州电子科技大学 · 2025', en: 'Hangzhou Dianzi University · 2025' },
    summary: {
      zh: '融合电极拓扑重排、多尺度空间卷积与周期敏感时间建模，学习帕金森脑电的时空耦合特征。',
      en: 'A topology-aware network combining multiscale spatial convolution and period-sensitive temporal modeling for Parkinson’s EEG.',
    },
    challenge: {
      zh: 'EEG 同时具有电极空间拓扑、短时动态与长周期模式，传统单尺度或单域模型难以充分耦合这些信息。',
      en: 'EEG combines electrode topology, short-term dynamics, and long-period patterns that single-scale or single-domain models struggle to couple.',
    },
    role: {
      zh: '第一作者，负责问题定义、模型设计、实验与论文撰写。',
      en: 'First author; led problem formulation, model design, experimentation, and manuscript preparation.',
    },
    approach: {
      zh: [
        '按头皮电极空间关系重排通道序列，增强空间表征。',
        '使用渐进式多尺度空间卷积提取局部到全局的脑区协同。',
        '结合 TimesNet 周期建模与 LSTM 时空交互形成分类决策。',
      ],
      en: [
        'Reordered channel sequences according to scalp topology to strengthen spatial encoding.',
        'Used progressive multiscale convolution to capture local-to-global regional interactions.',
        'Combined TimesNet periodic modeling with LSTM-based spatiotemporal integration.',
      ],
    },
    outcomes: {
      zh: ['在公开 PD Oddball 数据集上取得 92.11% Accuracy。', 'F1 92.00%，Recall 92.54%，Kappa 84.08%。'],
      en: ['Achieved 92.11% accuracy on a public PD Oddball dataset.', 'Reached 92.00% F1, 92.54% recall, and 84.08% Kappa.'],
    },
    metrics: [
      { value: '92.11%', label: { zh: 'Accuracy', en: 'accuracy' } },
      { value: '92.00%', label: { zh: 'F1 Score', en: 'F1 score' } },
      { value: '84.08%', label: { zh: 'Kappa', en: 'Kappa' } },
    ],
    stack: ['PyTorch', 'EEG', 'TimesNet', 'CNN', 'LSTM', 'Cross-validation'],
    flow: {
      zh: ['EEG 预处理', '拓扑重排', '多尺度空间卷积', '周期建模', '时空融合'],
      en: ['EEG Preprocessing', 'Topology Reordering', 'Multiscale Spatial CNN', 'Period Modeling', 'Fusion'],
    },
    links: [
      { label: { zh: '论文 DOI', en: 'Paper DOI' }, href: 'https://doi.org/10.1016/j.asoc.2025.114087' },
      { label: { zh: '查看代码', en: 'View Code' }, href: 'https://github.com/wxG2/TTSNet' },
    ],
    accent: 'violet',
    status: { zh: '已发表', en: 'Published' },
  },
  {
    slug: 'seeg-to-text',
    index: '05',
    category: 'research',
    title: { zh: 'sEEG-to-Text 跨模态解码', en: 'sEEG-to-Text Cross-modal Decoding' },
    eyebrow: { zh: '脑机接口 · 多模态学习', en: 'Brain–Computer Interface · Multimodal Learning' },
    period: { zh: '西湖灵犀 / CenBRAIN · 2025', en: 'Westlake Lingxi / CenBRAIN · 2025' },
    summary: {
      zh: '将临床 sEEG 时序信号与中文文本表示对齐，再通过自回归解码器生成汉字序列。',
      en: 'Aligned clinical sEEG time-series representations with Chinese text embeddings, then generated character sequences autoregressively.',
    },
    challenge: {
      zh: '侵入式脑电数据量有限、跨受试者差异显著，而且神经信号与离散语言之间存在巨大的模态鸿沟。',
      en: 'Clinical sEEG is scarce, strongly subject-dependent, and separated from discrete language by a substantial modality gap.',
    },
    role: {
      zh: '负责临床数据处理、sEEG Encoder、多模态对齐目标与生成式微调框架。',
      en: 'Worked on clinical data processing, the sEEG encoder, multimodal alignment objectives, and generative fine-tuning.',
    },
    approach: {
      zh: [
        '以 CNN + Transformer 构建 sEEG Encoder，提取时空特征。',
        '结合冻结的 BART-Chinese Encoder，通过 InfoNCE 与随机掩码重构预训练脑电—文本对齐。',
        '接入 BART-Chinese Decoder，以 Cross-Attention 自回归生成，并使用 LoRA 完成 SFT。',
      ],
      en: [
        'Built a CNN–Transformer sEEG encoder for spatiotemporal representation learning.',
        'Aligned brain and text embeddings with a frozen BART-Chinese encoder, InfoNCE, and masked reconstruction.',
        'Attached a BART-Chinese decoder for cross-attentive generation and applied LoRA-based SFT.',
      ],
    },
    outcomes: {
      zh: ['在多受试者训练、单个未见受试者测试设置下取得 BLEU-4 0.403。', '形成预训练对齐到生成微调的完整两阶段框架。'],
      en: ['Reached BLEU-4 0.403 when testing on one unseen subject after multi-subject training.', 'Established a complete two-stage alignment-to-generation framework.'],
    },
    metrics: [
      { value: '0.403', label: { zh: '未见受试者 BLEU-4', en: 'unseen-subject BLEU-4' } },
      { value: '2-stage', label: { zh: '预训练与微调', en: 'pretrain + fine-tune' } },
      { value: 'LoRA r=8', label: { zh: '参数高效微调', en: 'parameter-efficient SFT' } },
    ],
    stack: ['PyTorch', 'CNN', 'Transformer', 'BART-Chinese', 'InfoNCE', 'LoRA'],
    flow: {
      zh: ['临床 sEEG', '时空编码', '脑电—文本对齐', 'Cross-Attention', '中文生成'],
      en: ['Clinical sEEG', 'Spatiotemporal Encoding', 'Brain–Text Alignment', 'Cross-Attention', 'Chinese Generation'],
    },
    links: [],
    accent: 'green',
  },
  {
    slug: 'msphys-diff',
    index: '06',
    category: 'research',
    title: { zh: 'MSPhys-Diff 生理先验 EEG 生成', en: 'MSPhys-Diff: Physiological-prior EEG Generation' },
    eyebrow: { zh: '在审研究 · 扩散模型', en: 'Under Review · Diffusion Models' },
    period: { zh: '杭州电子科技大学 · 2026', en: 'Hangzhou Dianzi University · 2026' },
    summary: {
      zh: '用微观、介观与宏观生理坐标约束扩散模型，使生成脑电不仅分布相似，还能显式遵循频谱与连接性条件。',
      en: 'A scale-aware diffusion model conditioned on Micro, Meso, and Macro physiological coordinates for controllable EEG generation.',
    },
    challenge: {
      zh: '类别标签无法表达频谱平衡、区域连接和全局网络组织；直接使用个体嵌入又可能把受试者特异性泄漏给生成器。',
      en: 'Class labels do not specify spectral balance or network organization, while individual embeddings risk leaking subject-specific information.',
    },
    role: {
      zh: '负责多尺度生理条件、双原型分解、扩散网络路由和严格留一受试者评估。',
      en: 'Developed multiscale physiological conditioning, dual-prototype decomposition, scale-aware routing, and subject-held-out evaluation.',
    },
    approach: {
      zh: [
        '从 20 秒窗口束提取 Micro 频谱、Meso 区域连接与 Macro 全局网络坐标。',
        '用同类别双原型分离群体支持成分与个体残差，只保留有界 Micro 残差。',
        '按感受野将三种条件注入 U-Net 的浅层、中层与瓶颈，并加入生理重提取一致性约束。',
      ],
      en: [
        'Extracted Micro spectral, Meso regional-connectivity, and Macro whole-network coordinates from 20-second bundles.',
        'Separated prototype-supported structure from individual residuals using two same-class prototypes and retained only a bounded Micro residual.',
        'Routed conditions to U-Net depths by receptive field and enforced physiological re-extraction consistency.',
      ],
    },
    outcomes: {
      zh: ['相对标签条件扩散，class-conditional MMD² 在 UCSD-OFF 降低 38.4%，在 UNM-OFF 降低 72.7%。', '严格 outer leave-one-subject-out 设置下，三类下游分类器的平衡准确率点估计均获提升。'],
      en: ['Reduced class-conditional MMD² by 38.4% on UCSD-OFF and 72.7% on UNM-OFF versus label-only diffusion.', 'Improved held-out-subject balanced-accuracy point estimates across three downstream classifiers.'],
    },
    metrics: [
      { value: '−38.4%', label: { zh: 'UCSD-OFF MMD²', en: 'UCSD-OFF MMD²' } },
      { value: '−72.7%', label: { zh: 'UNM-OFF MMD²', en: 'UNM-OFF MMD²' } },
      { value: '3-scale', label: { zh: '生理条件', en: 'physiological control' } },
    ],
    stack: ['PyTorch', 'Diffusion', 'EEG', 'U-Net', 'Prototype Learning', 'LOSO'],
    flow: {
      zh: ['EEG 窗口束', '三尺度生理坐标', '双原型分解', '尺度感知 U-Net', '生理一致性'],
      en: ['EEG Bundle', 'Three-scale Coordinates', 'Dual Prototypes', 'Scale-aware U-Net', 'Consistency'],
    },
    links: [],
    accent: 'violet',
    status: { zh: '在审', en: 'Under Review' },
  },
];

export const publications: Publication[] = [
  {
    title: 'EEG-based Parkinson’s disease classification method by integrating topological features and multi-scale spatio-temporal networks',
    authors: 'Weixiang Gao, Yunyuan Gao, Jiangwen Lu, Xugang Xia, Xiaohui Lou',
    venue: { zh: 'Applied Soft Computing · 第一作者', en: 'Applied Soft Computing · First Author' },
    year: '2025',
    status: 'published',
    description: {
      zh: '提出 STTCNN，以电极拓扑重排、多尺度空间卷积和周期建模联合学习 PD 脑电。',
      en: 'Introduces STTCNN for joint topology-aware, multiscale spatial, and periodic modeling of Parkinson’s EEG.',
    },
    href: 'https://doi.org/10.1016/j.asoc.2025.114087',
  },
  {
    title: 'MSPhys-Diff: Diffusion with Multiscale Physiological Priors for Parkinson’s Disease EEG Generation',
    authors: 'Manuscript under review',
    venue: { zh: '在审研究', en: 'Manuscript Under Review' },
    year: '2026',
    status: 'under-review',
    description: {
      zh: '以微观、介观和宏观生理坐标实现可测量、跨受试者约束的 EEG 扩散生成。',
      en: 'Uses Micro, Meso, and Macro physiological coordinates for measurable, subject-regularized EEG diffusion.',
    },
  },
];

export const experiences: Experience[] = [
  {
    company: { zh: '有方大健康科技集团', en: 'Youfang Health Technology Group' },
    role: { zh: 'AI 应用开发实习生', en: 'AI Application Engineering Intern' },
    period: { zh: '2026.02 — 2026.08', en: 'Feb 2026 — Aug 2026' },
    summary: { zh: 'Agentic Workflow、场景级 RAG、LLM Pipeline 与分布式 ASR 集群。', en: 'Agentic workflows, scene-level RAG, LLM pipelines, and distributed ASR infrastructure.' },
  },
  {
    company: { zh: '杭州小影创新科技股份有限公司', en: 'Hangzhou Xiaoying Innovation Technology' },
    role: { zh: 'AIGC 算法实习生', en: 'AIGC Algorithm Intern' },
    period: { zh: '2025.11 — 2026.02', en: 'Nov 2025 — Feb 2026' },
    summary: { zh: '长视频角色替换、视觉分割优化与模型按需加载，将 VRAM 峰值从 60GB 降到 32GB 内。', en: 'Long-video character replacement, segmentation optimization, and on-demand model loading that reduced peak VRAM from 60GB to under 32GB.' },
  },
  {
    company: { zh: '西湖灵犀科技 / 西湖大学 CenBRAIN 实验室', en: 'Westlake Lingxi / Westlake University CenBRAIN Lab' },
    role: { zh: '算法工程实习生', en: 'Algorithm Engineering Intern' },
    period: { zh: '2025.06 — 2025.09', en: 'Jun 2025 — Sep 2025' },
    summary: { zh: '临床 sEEG 数据处理、脑电—文本跨模态对齐与中文自回归解码。', en: 'Clinical sEEG processing, brain–text alignment, and autoregressive Chinese decoding.' },
  },
];

export const education: Education[] = [
  {
    school: { zh: '杭州电子科技大学', en: 'Hangzhou Dianzi University' },
    degree: { zh: '控制科学与工程 · 硕士', en: 'M.Eng. in Control Science and Engineering' },
    period: { zh: '2024 — 至今', en: '2024 — Present' },
    detail: { zh: 'GPA 4.40/5.00 · 华为奖学金 · “华为杯”研究生数学建模国家级三等奖', en: 'GPA 4.40/5.00 · Huawei Scholarship · National Third Prize, Huawei Cup Graduate Mathematical Contest in Modeling' },
  },
  {
    school: { zh: '怀化学院', en: 'Huaihua University' },
    degree: { zh: '电气工程及其自动化 · 本科', en: 'B.Eng. in Electrical Engineering and Automation' },
    period: { zh: '2020 — 2024', en: '2020 — 2024' },
    detail: { zh: 'GPA 4.56/5.00 · 湖南省优秀毕业生 · 国家励志奖学金 · 全国大学生数学竞赛省二等奖', en: 'GPA 4.56/5.00 · Outstanding Graduate of Hunan Province · National Encouragement Scholarship · Provincial Second Prize in the National College Mathematics Competition' },
  },
];

export const repositories = [
  { name: 'TTSNet', description: { zh: 'PD/HC 脑电分类与完整实验流水线', en: 'PD/HC EEG classification and experiment pipeline' }, href: 'https://github.com/wxG2/TTSNet', language: 'Python' },
  { name: 'ReadWeave', description: { zh: '本地优先的微信文章摄取与知识图谱 Agent', en: 'Local-first reading ingestion and knowledge graph agent' }, href: 'https://github.com/wxG2/ReadWeave', language: 'Python' },
  { name: 'marketvidgen-agent', description: { zh: '多 Agent AI 短视频生产工作台', en: 'Multi-agent AI short-video production workspace' }, href: 'https://github.com/wxG2/marketvidgen-agent', language: 'Python / Vue' },
  { name: 'Huxiang', description: { zh: '面向长视频的角色替换工作流', en: 'Character replacement workflow for long-form video' }, href: 'https://github.com/wxG2/Huxiang', language: 'ComfyUI' },
];

function hasLocalized(value: Localized): boolean {
  return Boolean(value.zh.trim() && value.en.trim());
}

function validateSiteData() {
  const slugs = new Set<string>();
  for (const project of projects) {
    if (!/^[a-z0-9-]+$/.test(project.slug)) throw new Error(`Invalid project slug: ${project.slug}`);
    if (slugs.has(project.slug)) throw new Error(`Duplicate project slug: ${project.slug}`);
    slugs.add(project.slug);
    if (!hasLocalized(project.title) || !hasLocalized(project.summary) || !hasLocalized(project.role)) {
      throw new Error(`Missing project translation: ${project.slug}`);
    }
    if (!project.approach.zh.length || project.approach.zh.length !== project.approach.en.length) {
      throw new Error(`Mismatched approach translation: ${project.slug}`);
    }
  }
}

validateSiteData();
