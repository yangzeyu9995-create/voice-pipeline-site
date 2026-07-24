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

export type ToolStatus = "在用" | "迭代中" | "待验证";

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
    name: "VoiceFinder",
    slug: "voice-finder",
    positioning: "语音资产智能检索",
    stageLabel: "资产复用",
    status: "迭代中",
    progress: "2026.05 起 · 全库语义打标进行中（约 58%）· 下一步做可视化检索界面",
    problem: "历史语音资产规模增长，传统关键词检索难覆盖语义、角色、声线需求，复用定位成本较高。",
    method: "融合音频、文本、角色信息建立多维索引，通过 ASR / LLM 语义理解与相似度匹配，实现自然语言检索历史素材。",
    value: "输出候选素材、命中依据及复用清单，辅助快速完成资产筛选与复用判断。",
    startDate: "2026.05",
    version: "音频库 + script_index 文本语义检索在用 / 可视化检索界面迭代中",
    input: "音频素材（原始出档目录 / 出档合集 / 工程内 VO）+ 配音文本 Excel",
    output: "可检索资产库（元数据 + ASR 文本 + 语义标签 + embedding 相似）",
    workflow: [
      "输入需求（自然语言 / 角色 / 声线）",
      "四路合并检索候选（元数据 / ASR / 语义 / 相似）",
      "试听候选",
      "加入复用篮",
    ],
    capabilities: [
      "音频元数据检索",
      "ASR 转写文本检索",
      "LLM 语义标签（情绪 / 场景 / 行为）",
      "embedding 语义相似检索",
      "候选附四类命中证据 + 试听 + 复用篮",
    ],
    versionNotes: [
      "音频资产库：SQLite + 扫描去重 + CLI 检索 + ASR 批量转写",
      "script_index 文本语义检索子系统：FTS5 + LLM 打标 + embedding 三路合并",
      "全库语义打标进行中（约 58%）；下一步从命令行升级为可视化检索界面",
    ],
    usageNotes: "候选结果附四类命中证据（元数据 / ASR / 语义 / 相似），支持试听与复用篮。目标不是简单文件搜索，而是逐步形成面向语音复用的本地检索助手：先能找得到，再能筛得准，最后服务录音排期和复用决策。",
    screenshotLabel: "VoiceFinder · 语义检索 / 命中证据 / 复用篮",
    knownIssues: "ASR 目前准确率有限（普通话尚不稳定、方言更弱），语义命中需人工复审；当前主要通过命令行运行。",
    nextSteps: "从命令行升级为可视化检索界面（检索 → 试听 → 筛选 → 复用篮），并接入 Reaper 工作流。下阶段重点投入。",
  },
  {
    icon: ScanLine,
    name: "AudioDeliveryCheck",
    slug: "audio-delivery-check",
    positioning: "多棚出档智能核查",
    stageLabel: "出档检查",
    status: "在用",
    progress: "2026.04 起 · 支持多批次合并对账 · 棚映射 / 命名规则参数化",
    problem: "多棚、多批次并行出档时，资源状态分散，缺档问题难以及时发现。",
    method: "关联配音文本、录音排期与出档目录，自动比对资源完整性，定位缺失文件并生成追踪清单。",
    value: "输出交付进度、缺档列表及核查结果，减少人工逐项检查与催档成本。",
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
      "2026.06：命名规则收口，性别后缀 / 复用灰格 / 棚映射判定修正",
      "支持多批次合并对账，棚映射 / 命名规则参数化",
    ],
    usageNotes: "每月出档后运行（python run_audiocheck.py <batch>）。运行前确认配音文本已更新为当月版本。快捷口令见 AudioDeliveryCheck 规则文档。",
    screenshotLabel: "AudioDeliveryCheck · 月度进度看板 / 缺失清单",
    knownIssues: "强依赖内部路径和棚映射规则，跨项目复用前需按当前命名 / 目录约定调整。",
    nextSteps: "棚映射 / 命名规则进一步参数化，随版本维护，减少换月改动。",
  },
  {
    icon: Shield,
    name: "AudioIntakeQA",
    slug: "audio-intake-qa",
    positioning: "入库音频质量检查",
    stageLabel: "入库复核",
    status: "待验证",
    progress: "命名校验在用 · ASR 内容比对作辅助提示 · 结果需人工复核",
    problem: "语音入库前需人工检查命名规范、文本匹配及资源质量，重复校验成本较高。",
    method: "结合命名规则与 ASR 内容比对，自动发现异常项并提供检查提示，辅助人工确认。",
    value: "输出规范化入库资源与 QA 检查结果，提高资源入库准确性。",
    startDate: "2026.05",
    version: "命名校验在用 · ASR 内容比对作辅助提示（待验证）",
    input: "棚交付 wav 文件夹 + 配音文本 Excel（含基础名和命名规则）",
    output: "重命名后的交付文件 + QA 报告（命名异常 / 缺失 / ASR 存疑）",
    workflow: [
      "导入交付文件",
      "按命名规则校验，推导目标文件名（自动加后缀）",
      "ASR 内容比对作辅助提示，标记存疑项",
      "查看异常分类（命名异常 / 缺失 / ASR 存疑）",
      "人工确认后一键重命名入库",
    ],
    capabilities: [
      "Excel 基础名 + 自动后缀命名",
      "{{性别：A|B}} 模板生成 _male / _female",
      "命名 / 缺失 / ASR 存疑分类 + QA 报告",
      "变体支持（6 类）",
      "校验 → 复核 → 执行工作流",
    ],
    versionNotes: [
      "命名校验：基础名 + 自动后缀 + 缺失检查，在用",
      "ASR 内容比对：目前准确率有限（普通话尚不稳定、方言更弱），仅作辅助提示",
    ],
    usageNotes: "收到棚交付后运行。结果按命名异常 / 缺失 / ASR 存疑分类，附 QA 报告。ASR 模型本地部署，仅作辅助提示，异常项需人工确认。",
    screenshotLabel: "AudioIntakeQA · 异常分类 / QA 报告",
    knownIssues: "ASR 目前准确率有限（普通话尚不稳定、方言更弱），仅作辅助提示、结果需人工复核；大批次 ASR 处理时间较长。",
    nextSteps: "命名校验已在用；后续提升识别模型与大批次速度，验证后转「在用」。",
  },
  {
    icon: Music,
    name: "ReaperTools",
    slug: "reaper-tools",
    positioning: "后期处理自动化工具组",
    stageLabel: "后期处理",
    status: "在用",
    progress: "Lua 脚本包在用 · 区分通用 / 项目规则脚本 · 通用部分沉淀分发",
    problem: "对白后期涉及大量分轨、命名、对齐、导表操作，重复处理耗时较高。",
    method: "将项目规则固化为脚本，自动完成批量处理、Region 管理、命名及数据导出。",
    value: "输出标准化后期工程数据，减少重复操作，提升批处理效率。",
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
    nextSteps: "整理可复用 Lua 脚本包，区分通用脚本与项目规则脚本，通用部分沉淀为可分发工具组。",
  },
];

// ─── Supporting tools (辅助工具，6 个) ─────────────────────────────────────────────

export const supportingTools: SupportingTool[] = [
  {
    icon: FileText,
    name: "AmbVoiceNamer",
    stageLabel: "文本准备",
    status: "在用",
    purpose: "按场景 / 角色规则解析台词标记，批量生成规范文件名。",
    progress: "在用 · 按场景 / 角色规则维护",
  },
  {
    icon: RefreshCw,
    name: "FmodAssetSync",
    stageLabel: "工程配置",
    status: "在用",
    purpose: "公共 build 机产出后，将新增 / 变化的音频增量同步到本地工程。",
    progress: "在用 · 替代人工多步 SVN + 拷贝",
  },
  {
    icon: FileCheck,
    name: "AudioConfigLinker",
    stageLabel: "工程配置",
    status: "迭代中",
    purpose: "以台词为主键跨表匹配，把本地音频路径回填进 Dialog 配置表，低置信项降级人工确认。",
    progress: "匹配 + 写回已跑通 · 下一步做待确认批量确认 UI",
  },
  {
    icon: Activity,
    name: "EventDurationTool",
    stageLabel: "工程配置",
    status: "迭代中",
    purpose: "按 FMOD 事件补齐音频时长，并定位未命名 / 无音频项。",
    progress: "补齐 + 校验已跑通 · 完善来源开关与批量校验",
  },
  {
    icon: Layers,
    name: "AudioConfigQA",
    stageLabel: "工程配置",
    status: "迭代中",
    purpose: "配置完成后交叉比对，定位文本、路径、音频不一致项。",
    progress: "目前为只读校对 · 下一步补审核流闭环",
  },
  {
    icon: ScanLine,
    name: "VoiceLineFilter",
    stageLabel: "资产复用",
    status: "待验证",
    purpose: "按版本 / 性别 / 关键字规则筛出目标台词，再批量整理音频。",
    progress: "规则筛选 + 批处理已跑通 · 待最新版本验证后转在用",
  },
];

// ─── Workflow stages (6 段；小工具仅作流程 tag 轻量出现) ───────────────────────────

export const workflowStages: WorkflowStage[] = [
  { icon: FileText,  label: "文本准备",   tools: ["AmbVoiceNamer"],                                                        note: "配音表 / 命名" },
  { icon: Mic,       label: "出档检查",   tools: ["AudioDeliveryCheck"],                                                   note: "交付完整性" },
  { icon: Shield,    label: "入库复核",   tools: ["AudioIntakeQA"],                                                        note: "命名 / 内容核对" },
  { icon: Cpu,       label: "后期处理",   tools: ["ReaperTools"],                                                          note: "标准化处理" },
  { icon: Layers,    label: "工程配置",   tools: ["FmodAssetSync", "AudioConfigLinker", "EventDurationTool", "AudioConfigQA"], note: "同步 / 映射 / 时长 / 校验" },
  { icon: RefreshCw, label: "资产复用",   tools: ["VoiceFinder", "VoiceLineFilter"],                                          note: "复用检索 / 规则筛选" },
];

// ─── Metrics (资产库基础规模) ─────────────────────────────────────────────────────

export const metrics: Metric[] = [
  { value: "320,818", label: "去重音频文件",   sub: "111 万条路径引用去重后", icon: Database },
  { value: "6,983",   label: "近三月核对条数", sub: "出档核对 · 2026.05–07",  icon: FileCheck },
  { value: "99,524",  label: "配音文本条数",   sub: "可检索文本库",           icon: FileText },
  { value: "55,143",  label: "已打语义标签",   sub: "打标进行中 · 约 55%",    icon: RefreshCw },
];

// ─── Principles (设计原则) ───────────────────────────────────────────────────────

export const principles: Principle[] = [
  { icon: AlertTriangle,  label: "从高频问题反推工具", description: "优先处理每月反复出现的缺失、错配、命名和配置问题。" },
  { icon: FileText,       label: "规则优先于模型",     description: "文件名、路径、性别、批次先固化，ASR / LLM 只做辅助判断。" },
  { icon: Mic,            label: "人工确认保底",       description: "工具负责缩小问题范围，关键判断仍保留人工确认。" },
  { icon: FileCheck,      label: "结果可复核、可解释", description: "不做黑盒判断，命中依据、写入变更、校验结果都能被人追溯核对。" },
  { icon: Repeat,         label: "贴着工程落地",       description: "结果能回到 Excel、Reaper、FMOD 或文件目录继续使用。" },
];

// ─── Roadmap (短标签) ────────────────────────────────────────────────────────────

export const roadmapItems: RoadmapItem[] = [
  { name: "VoiceFinder 可视化检索",  description: "从命令行升级为检索 → 试听 → 筛选 → 复用篮界面，并接入 Reaper 工作流。" },
  { name: "AudioConfigLinker 确认 UI", description: "待确认项批量确认 UI + 拆句 _b 回写流程，把「跑通」推向「好用」。" },
  { name: "VoiceLineFilter 转在用",   description: "用最新版本号跑通后转「在用」，规则 / 版本参数化，统一支撑多用途。" },
  { name: "AudioConfigQA 审核流",     description: "从只读校对补上确认 / 标记 / 复查 / 导出，让校验结果可闭环。" },
];
