import {
  Database,
  ScanLine,
  Shield,
  Layers,
  FileCheck,
  Music,
  FileText,
  Mic,
  Cpu,
  Activity,
  RefreshCw,
  Repeat,
  AlertTriangle,
} from "lucide-react";
import type { ElementType } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToolStatus =
  | "Stable"
  | "In Use"
  | "In Development"
  | "Internal Script"
  | "Internal Utility";

export interface Project {
  icon: ElementType;
  name: string;
  slug: string;
  positioning: string;
  stageLabel: string;
  status: ToolStatus;
  progress: string;
  problem: string;
  method: string;
  value: string;
  // Detail page
  startDate: string;
  version: string;
  input: string;
  output: string;
  workflow: string[];
  capabilities: string[];
  versionNotes: string[];
  usageNotes: string;
  screenshotLabel: string;
  knownIssues: string;
  nextSteps: string;
}

export interface SupportingTool {
  icon: ElementType;
  name: string;
  stageLabel: string;
  status: ToolStatus;
  purpose: string;
  progress: string;
}

export interface WorkflowStage {
  icon: ElementType;
  label: string;
  tools: string[];
  note: string;
}

export interface Metric {
  value: string;
  label: string;
  sub: string;
  icon: ElementType;
}

export interface Principle {
  icon: ElementType;
  label: string;
  description: string;
}

export interface RoadmapItem {
  name: string;
  description: string;
}

// ─── Projects (核心工具，4 个，代表主要价值) ──────────────────────────────────────
// 卡片正文只保留 问题 / 方法 / 价值 / 进度，各一句话；详细内容在详情页。

export const projects: Project[] = [
  {
    icon: Database,
    name: "AudioReuse",
    slug: "audio-reuse",
    positioning: "本地语音资产复用检索助手",
    stageLabel: "资产复用",
    status: "In Development",
    progress: "2026.05 起 · 检索库已建立 · GUI 迭代中",
    problem: "历史语音资产量大且分散，制作、CG、剧情、玩法验证中常需快速找到可复用或参考素材。",
    method: "索引语音、文本、角色和声线特征，支持按语义、角色、片段和相似声线检索。",
    value: "把经验翻找转为资产检索，提升复用效率，降低重复录制和临时补素材成本。",
    startDate: "2026.05",
    version: "音频库 + script_index 文本语义检索在用 / GUI（Phase 3）未开",
    input: "音频素材（原始出档目录 / 出档合集 / 工程内 VO）+ 配音文本 Excel",
    output: "可检索资产库（元数据 + ASR 文本 + 语义标签 + embedding 相似）",
    workflow: [
      "扫描音频素材，去重后连同元数据写入 SQLite 库",
      "ASR 批量转写音频内容",
      "配音文本入库，FTS5 关键词 + LLM 批量打标（情绪 / 场景 / 行为 / 声音类型）",
      "对文本生成 embedding，支持语义相似 topK 检索",
      "关键词 + 标签 + 语义三路合并，返回候选供人工试听确认",
    ],
    capabilities: [
      "音频元数据检索",
      "ASR 转写文本检索",
      "LLM 语义标签（情绪 / 场景 / 行为）",
      "embedding 语义相似检索",
      "配音文本 FTS5 关键词检索",
    ],
    versionNotes: [
      "音频资产库：SQLite + 扫描去重 + CLI 检索 + ASR 批量转写",
      "script_index 文本语义检索子系统：FTS5 + LLM 打标 + embedding 三路合并",
      "DB 当前约 495 MB；音频侧 GUI（Phase 3）/ 切片（Phase 4）未开",
    ],
    usageNotes: "当前通过命令行运行（python search.py -i / script_index/search.py）。在排录制计划前先检索，确认资产是否已存在。目标不是简单文件搜索，而是逐步形成面向语音复用的本地检索助手：先能找得到，再能筛得准，最后服务录音排期和复用决策。",
    screenshotLabel: "AudioReuse · 命令行检索 / 语义检索输出",
    knownIssues: "GUI 尚未开发，当前仅命令行。Whisper small 对短气声 / 呼吸（<0.8s）偶有脑补文字，需人工复审。",
    nextSteps: "开发可视化检索界面（下一阶段重点投入方向）；支持过滤和团队共享。",
  },
  {
    icon: ScanLine,
    name: "AudioCheck",
    slug: "audio-check",
    positioning: "多棚出档完整性核查",
    stageLabel: "出档回收",
    status: "Stable",
    progress: "2026.04 起 · 规则收口 · 稳定复用",
    problem: "多棚多批次出档时，缺失、漏交、性别版本不全等问题容易后续才发现。",
    method: "比对配音文本、排班表和出档目录，生成完成进度、缺失清单和待确认项。",
    value: "将交付风险前置到出档阶段，减少配置中途和 QA 阶段返工。",
    startDate: "2026.04",
    version: "规则 202606 收口 · 稳定，换月只改 batch 号",
    input: "配音文本 Excel + 排班表 + 出档目录",
    output: "总体进度看板 / 真实来源出档清单 / 合并回声出档清单",
    workflow: [
      "读取配音文本，建立文件名到预期录制的映射",
      "读取排班表（sheet 名 = 棚名），建立角色到棚的归属",
      "扫描出档目录，与映射严格集合比对",
      "按棚统计完成率，标记缺失行（保留真实来源：音熊 / 麒音 / 回声）",
      "输出三份清单（总体进度 / 真实来源 / 合并回声追档）",
    ],
    capabilities: [
      "配音文本 × 排班表 × 出档目录三方对账",
      "按棚归属统计完成率",
      "缺失文件清单（可发棚追档）",
      "命名异常 / take 后缀 / 玩家展开容错",
    ],
    versionNotes: [
      "2026.04：基础缺失核查和完成率统计",
      "2026.06：命名规则收口，性别后缀 / 复用灰格 / 棚映射判定修正，稳定复用",
    ],
    usageNotes: "每月出档后运行（python run_audiocheck.py <batch>）。运行前确认配音文本已更新为当月版本。快捷口令见 AudioCheck 规则文档。",
    screenshotLabel: "AudioCheck · 月度进度看板 / 缺失清单",
    knownIssues: "强依赖内部路径和棚映射规则；当前按单批次运行，未做多批次合并对账。",
    nextSteps: "维持现状，按月复用；如棚映射或命名规则变化再调整。",
  },
  {
    icon: Shield,
    name: "AudioDeliveryQA",
    slug: "audio-delivery-qa",
    positioning: "入库前交付复核工具",
    stageLabel: "交付复核",
    status: "Stable",
    progress: "2026.05 起 · v3 + 绿色版 exe · 稳定复用",
    problem: "语音入库前，命名、角色后缀、格式和内容匹配容易出现细碎错误。",
    method: "结合命名规则、配音文本和 ASR 结果，标记高风险项并保留人工复核。",
    value: "提升入库前交付准确性，降低重命名、返工和工程排查成本。",
    startDate: "2026.05",
    version: "v3 · 绿色版 exe（免装 Python）· 稳定",
    input: "棚交付 wav 文件夹 + 配音文本 Excel（含基础名和命名规则）",
    output: "重命名后的交付文件 + QA 报告（命名 / 缺失 / ASR 内容异常）",
    workflow: [
      "读取 Excel 基础名，按规则推导目标文件名（自动加后缀）",
      "ASR 优先对齐，失败时降级为导出顺序对齐",
      "验证命名、格式、变体（6 类）",
      "ASR 转写与原文比对，标记内容不完整 / 疑似不符",
      "左中右三栏复核后执行重命名，导出 QA 报告",
    ],
    capabilities: [
      "Excel 基础名 + 自动后缀命名",
      "{{性别：A|B}} 模板生成 _male / _female",
      "ASR 内容复核（转写 vs 原文）",
      "变体支持（6 类）",
      "校验 → 复核 → 执行工作流",
    ],
    versionNotes: [
      "v1：基础命名验证和缺失检查",
      "v2：ASR 复核集成",
      "v3：exe 封装，免装 Python；ASR 优先 + 序列 fallback",
    ],
    usageNotes: "收到棚交付后运行（绿色版 exe 或 python gui.py）。命名规则见工具 docs/naming_logic.md。ASR 模型本地部署。",
    screenshotLabel: "AudioDeliveryQA · 三栏复核 / 命名违规标注",
    knownIssues: "ASR 对强方言口音准确率偏低，需人工复审；大批次 ASR 处理时间较长。",
    nextSteps: "功能完整，维持现状；除非命名规则变化不新增。",
  },
  {
    icon: Music,
    name: "ReaperTools",
    slug: "reaper-tools",
    positioning: "Reaper 后期批处理脚本组",
    stageLabel: "后期处理",
    status: "Internal Utility",
    progress: "2026.06 起 · Lua v0.4 · 部分脚本可通用化",
    problem: "大批量语音后期中，分轨、命名、对齐、Region 和导表重复度高。",
    method: "用 Lua 脚本固化常用后期规则，批量完成整理、命名、对齐和统计导出。",
    value: "将重复操作转为规则化批处理，提高处理一致性和交付效率。",
    startDate: "2026.06",
    version: "Lua v0.4 · 部分脚本可通用化",
    input: "Reaper 工程内的对白 item / 音频文件",
    output: "整理后的角色轨 / Region 命名 / 对白 summary·detail CSV",
    workflow: [
      "按文件名把 item 移动到对应角色轨",
      "对 Region 命名并 Glue 成交付单位",
      "两轨对白自动对齐",
      "选中同轨的后续 item 批量处理",
      "统计响度并导出对白 summary / detail CSV",
    ],
    capabilities: [
      "按文件名移动到角色轨",
      "Region 命名与 Glue",
      "两轨对白自动对齐",
      "选中同轨后续 item",
      "导出对白 summary / detail CSV",
      "根据 item 生成 Region",
    ],
    versionNotes: [
      "Lua v0.4：分轨 / Region 命名 / 对白对齐 / 导表脚本在用",
      "部分脚本已可通用化，项目规则相关脚本需保留配置项",
    ],
    usageNotes: "在 Reaper 内通过 ReaScript 运行。部分脚本可整理为通用 Lua 工具，项目规则相关脚本需保留配置项。",
    screenshotLabel: "ReaperTools · 分轨 / Region 命名 / 导表",
    knownIssues: "脚本按当前项目轨道结构和命名规则编写，跨项目复用前需调整配置项。",
    nextSteps: "整理可复用 Lua 脚本包，区分通用脚本和项目规则脚本。",
  },
];

// ─── Supporting tools (辅助工具，3 个有代表性的) ──────────────────────────────────

export const supportingTools: SupportingTool[] = [
  {
    icon: FileCheck,
    name: "AudioBackfill",
    stageLabel: "工程配置",
    status: "In Development",
    purpose: "按台词把本地音频路径回填至 SVN 配置表，人工确认制。",
    progress: "2026.06 · 已用现有正确表验证 · 覆盖范围内一致率 96.4%（750/778）",
  },
  {
    icon: Activity,
    name: "EventDurationTool",
    stageLabel: "后期处理",
    status: "In Use",
    purpose: "读 FMOD 事件补语音时长，并校验未命名 / 无音频 / 查询失败等缺失（原 FmodDurationTool，将并入本地时长工具）。",
    progress: "2026.07 · 实测命中 207/211 · 约 98.1%",
  },
  {
    icon: RefreshCw,
    name: "MonthlyVoiceTool",
    stageLabel: "资产复用",
    status: "In Development",
    purpose: "月度喊昵称 / 玩家语音批处理方向；SPEC 与参考实现阶段。",
    progress: "2026.07 · SPEC / 参考实现 · 待验证",
  },
  {
    icon: Layers,
    name: "AudioConfigQA",
    stageLabel: "工程配置",
    status: "In Development",
    purpose: "FMOD / Unity 配置后只读校对，检查文本、路径和实际音频一致性。",
    progress: "2026.05 · GUI 基本稳定 · 持续迭代中",
  },
];

// ─── Workflow stages (6 段；小工具仅作流程 tag 轻量出现) ───────────────────────────

export const workflowStages: WorkflowStage[] = [
  { icon: FileText,  label: "文本准备",   tools: ["AmbVoiceNamer"],                                note: "配音表 / 命名" },
  { icon: Mic,       label: "出档回收",   tools: ["AudioCheck"],                                   note: "交付完整性" },
  { icon: Shield,    label: "交付复核",   tools: ["AudioDeliveryQA"],                              note: "命名 / 内容核对" },
  { icon: Cpu,       label: "后期处理",   tools: ["ReaperTools", "EventDurationTool"],             note: "标准化处理 / 时长配置" },
  { icon: Layers,    label: "工程配置",   tools: ["AudioConfigQA", "AudioBackfill"],               note: "配置校对 / 回填" },
  { icon: RefreshCw, label: "资产复用",   tools: ["AudioReuse", "AudioTransfer", "MonthlyVoiceTool"], note: "历史素材 / 候选" },
];

// ─── Metrics (资产库基础规模，非复用收益) ─────────────────────────────────────────

export const metrics: Metric[] = [
  { value: "398,899", label: "已索引音频文件", sub: "AudioReuse 基础库",                icon: Database },
  { value: "882 h",   label: "已索引音频时长", sub: "历史语音资产",                     icon: Activity },
  { value: "96.4%",   label: "路径回填覆盖内一致率", sub: "AudioBackfill · 750 / 778",     icon: FileCheck },
  { value: "待补充",   label: "实际使用数据", sub: "命中率 / 复用条数 / 节省时间",       icon: RefreshCw },
];

// ─── Principles (工具特点) ───────────────────────────────────────────────────────

export const principles: Principle[] = [
  { icon: AlertTriangle,  label: "从生产问题反推工具", description: "先处理每月反复出现的漏项、错配、命名和配置问题。" },
  { icon: FileText,       label: "规则优先于模型",     description: "文件名、路径、性别、批次先固化，ASR / LLM 只做辅助判断。" },
  { icon: Mic,            label: "人工确认保底",       description: "工具负责缩小问题范围，关键判断仍保留人工确认。" },
  { icon: RefreshCw,      label: "可换批次复用",       description: "把月份、路径、任务名做成参数，避免反复改脚本。" },
  { icon: Repeat,         label: "贴着工程落地",       description: "结果能回到 Excel、Reaper、FMOD 或文件目录继续使用。" },
];

// ─── Roadmap (短标签) ────────────────────────────────────────────────────────────

export const roadmapItems: RoadmapItem[] = [
  { name: "AudioReuse GUI",        description: "完善检索、试听、筛选和复用候选界面。" },
  { name: "AudioConfigQA 审核流",  description: "增加人工确认、问题标记、复查状态和导出清单。" },
  { name: "ReaperTools 通用包",    description: "整理可复用 Lua，区分通用脚本和项目规则脚本。" },
  { name: "使用数据埋点",          description: "记录查询次数、命中率、复用条数和节省时间。" },
];
