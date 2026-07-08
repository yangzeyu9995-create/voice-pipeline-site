import { useState } from "react";
import { Link } from "react-router";
import { Mic, Menu, X, ChevronRight } from "lucide-react";
import {
  projects, supportingTools, workflowStages, metrics, principles, roadmapItems,
} from "../lib/data";
import { HF, T, StatusPill, StagePill, SectionHeader, Divider } from "../components/shared";

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "项目", href: "#projects" },
    { label: "流程", href: "#pipeline" },
    { label: "方法", href: "#principles" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: "rgba(12,11,18,0.88)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.055)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 56 }}>
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c5cfc, #a78bfa)" }}
          >
            <Mic className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className="font-semibold text-white tracking-tight"
            style={{ fontSize: T.small, fontFamily: HF }}
          >
            Voice Pipeline Tooling
          </span>
        </Link>

        <div
          className="hidden md:flex items-center gap-7"
          style={{ fontSize: T.small, fontFamily: HF, fontWeight: T.medium, color: T.muted }}
        >
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-white transition-colors duration-150">
              {label}
            </a>
          ))}
        </div>

        <button className="md:hidden p-1.5" style={{ color: T.muted }} onClick={() => setOpen(o => !o)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-1 border-t" style={{ borderColor: "rgba(255,255,255,0.055)" }}>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="py-2.5 hover:text-white transition-colors"
              style={{ fontSize: T.small, fontFamily: HF, fontWeight: T.medium, color: T.muted }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pt-14"
      style={{ minHeight: "56vh" }}
    >
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "5%", left: "50%", transform: "translateX(-50%)",
            width: 760, height: 460,
            background: "radial-gradient(ellipse, rgba(124,92,252,0.12) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "38%", left: "3%", width: 300, height: 300,
            background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "10%", right: "5%", width: 240, height: 240,
            background: "radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)",
          }}
        />
      </div>
      {/* subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.011) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.011) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <h1
          className="mb-6"
          style={{
            fontFamily: HF,
            fontWeight: T.bold,
            fontSize: "clamp(2.4rem, 6.5vw, 4rem)",
            lineHeight: T.tight,
            letterSpacing: "-0.03em",
            color: T.white,
            whiteSpace: "nowrap",
          }}
        >
          Voice Pipeline{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #c4b5fd 0%, #7c5cfc 55%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tooling
          </span>
        </h1>

        <p
          style={{
            fontSize: T.body,
            fontFamily: HF,
            color: T.sub,
            lineHeight: T.relax,
          }}
        >
          围绕游戏语音生产流程做过的一些工具、脚本和自动化尝试。
        </p>
      </div>
    </section>
  );
}

// ─── Pipeline ─────────────────────────────────────────────────────────────────

function Pipeline() {
  return (
    <section id="pipeline" className="pt-8 pb-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(124,92,252,0.030) 0%, transparent 55%)" }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          title="流程覆盖"
          sub="覆盖语音交付、工程配置、后期处理和资产复用中的高频节点。"
        />

        {/* desktop */}
        <div className="mt-14 hidden lg:flex items-start">
          {workflowStages.map((stage, i) => {
            const Icon = stage.icon;
            const isLast = i === workflowStages.length - 1;
            return (
              <div key={stage.label} className="flex items-start flex-1">
                <div className="flex flex-col items-center flex-1 min-w-0 px-1">
                  {/* icon — purple tinted */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: T.iconBg, border: `1px solid ${T.iconBorder}` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: T.accent }} />
                  </div>

                  <div className="text-center mt-3.5 px-1 w-full">
                    <div className="font-semibold text-white mb-1" style={{ fontSize: T.small, fontFamily: HF }}>
                      {stage.label}
                    </div>
                    <div className="mb-2" style={{ fontSize: T.nano, color: T.muted, fontFamily: HF }}>
                      {stage.note}
                    </div>
                    {/* tool pills — light purple tint */}
                    <div className="flex flex-col items-center gap-1">
                      {stage.tools.length > 0 ? stage.tools.map(t => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded border"
                          style={{
                            fontSize: 11, fontFamily: HF,
                            color: "rgba(167,139,250,0.85)",
                            borderColor: "rgba(124,92,252,0.25)",
                            background: "rgba(124,92,252,0.08)",
                          }}
                        >
                          {t}
                        </span>
                      )) : (
                        <span style={{ fontSize: 9, color: T.faint }}>—</span>
                      )}
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex items-center pt-5 flex-shrink-0" style={{ width: 22 }}>
                    <div
                      className="flex-1 h-px"
                      style={{ background: "linear-gradient(90deg, rgba(124,92,252,0.30), rgba(124,92,252,0.06))" }}
                    />
                    <ChevronRight className="w-3 h-3 -ml-0.5" style={{ color: "rgba(124,92,252,0.30)" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* mobile */}
        <div className="lg:hidden mt-10 flex flex-col gap-2">
          {workflowStages.map((stage, i) => {
            const Icon = stage.icon;
            const isLast = i === workflowStages.length - 1;
            return (
              <div key={stage.label} className="flex flex-col">
                <div
                  className="flex items-start gap-4 rounded-xl p-4 border"
                  style={{ background: "rgba(124,92,252,0.04)", borderColor: "rgba(124,92,252,0.13)" }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: T.iconBg }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: T.accent }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-0.5" style={{ fontSize: T.small, fontFamily: HF }}>{stage.label}</div>
                    <div className="mb-1.5" style={{ fontSize: T.nano, color: T.muted, fontFamily: HF }}>{stage.note}</div>
                    <div className="flex flex-wrap gap-1">
                      {stage.tools.map(t => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded border"
                          style={{ fontSize: 11, fontFamily: HF, color: "rgba(167,139,250,0.85)", borderColor: "rgba(124,92,252,0.25)", background: "rgba(124,92,252,0.08)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {!isLast && <div className="ml-7 w-px h-2" style={{ background: "rgba(124,92,252,0.18)" }} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="核心工具项目"
          sub="覆盖资产复用、出档回收、交付复核和 Reaper 内处理。"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map(project => {
            const Icon = project.icon;
            return (
              <div
                key={project.name}
                className="rounded-2xl border flex flex-col overflow-hidden transition-all duration-200"
                style={{ background: T.cardBg, borderColor: T.border }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = T.cardBgHover;
                  el.style.borderColor = "rgba(124,92,252,0.25)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = T.cardBg;
                  el.style.borderColor = T.border;
                }}
              >
                {/* violet gradient top line */}
                <div
                  className="h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(124,92,252,0.50), transparent)" }}
                />

                <div className="p-7 flex flex-col gap-5">
                  {/* header */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: T.iconBg, border: `1px solid ${T.iconBorder}` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: T.accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="font-semibold text-white" style={{ fontSize: T.card, fontFamily: HF }}>
                          {project.name}
                        </h3>
                        <StatusPill status={project.status} />
                      </div>
                      <p className="mt-0.5" style={{ fontSize: T.small, color: T.sub, lineHeight: T.snug, textWrap: "pretty" }}>
                        {project.positioning}
                      </p>
                    </div>
                  </div>

                  {/* stage + progress */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <StagePill label={project.stageLabel} />
                    <span style={{ fontSize: T.nano, fontFamily: HF, color: T.muted }}>
                      {project.progress}
                    </span>
                  </div>

                  {/* problem / method / value */}
                  <div
                    className="flex flex-col rounded-xl overflow-hidden border"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    {[
                      { label: "问题", value: project.problem },
                      { label: "方法", value: project.method },
                      { label: "价值", value: project.value },
                    ].map(({ label, value }, idx) => (
                      <div
                        key={label}
                        className="flex gap-3.5 px-4 py-3.5"
                        style={{
                          background: idx % 2 === 0 ? "rgba(255,255,255,0.020)" : "rgba(255,255,255,0.012)",
                          borderBottom: idx < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                        }}
                      >
                        {/* field label — violet, readable Inter */}
                        <span
                          className="flex-shrink-0 font-semibold pt-px"
                          style={{ fontSize: T.label, fontFamily: HF, color: T.fieldLabel, minWidth: 28 }}
                        >
                          {label}
                        </span>
                        <span style={{ fontSize: T.body, color: T.text, lineHeight: T.relax, textWrap: "pretty" }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* view details */}
                  <div className="flex justify-end pt-0.5">
                    <Link
                      to={`/project/${project.slug}`}
                      className="inline-flex items-center gap-1 font-medium no-underline transition-colors duration-150"
                      style={{ fontSize: T.micro, fontFamily: HF, color: T.accentDim }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.accent}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.accentDim}
                    >
                      查看详情 <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Supporting Utilities ─────────────────────────────────────────────────────

function SupportingUtilities() {
  return (
    <section className="py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2
            className="font-semibold text-white"
            style={{ fontSize: T.section, fontFamily: HF, letterSpacing: "-0.02em", lineHeight: T.tight }}
          >
            辅助工具
          </h2>
          <p className="mt-2.5" style={{ fontSize: T.body, color: T.sub, lineHeight: T.relax, textWrap: "pretty" }}>
            围绕主链路的单点能力，解决具体环节问题。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportingTools.map(tool => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="rounded-xl border p-5 flex flex-col gap-3 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.014)", borderColor: "rgba(255,255,255,0.055)" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.025)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.014)";
                  el.style.borderColor = "rgba(255,255,255,0.055)";
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: T.muted }} />
                  </div>
                  <StatusPill status={tool.status} />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1.5" style={{ fontSize: T.small, fontFamily: HF }}>
                    {tool.name}
                  </div>
                  <StagePill label={tool.stageLabel} />
                </div>
                <p style={{ fontSize: T.small, color: T.sub, lineHeight: T.base, textWrap: "pretty" }}>{tool.purpose}</p>
                <div className="pt-2 border-t" style={{ borderColor: T.borderSub }}>
                  <span style={{ fontSize: T.nano, fontFamily: HF, color: T.faint }}>{tool.progress}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Impact ───────────────────────────────────────────────────────────────────

function Impact() {
  return (
    <section id="impact" className="py-24 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(124,92,252,0.022) 50%, transparent 100%)" }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="资产库规模" sub="当前数据用于说明基础规模和样本验证；真实使用与复用收益后续通过埋点补充。" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(m => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="relative rounded-2xl border p-7 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.020)", borderColor: T.border }}
              >
                {/* violet top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(124,92,252,0.40), transparent)" }}
                />
                <Icon className="w-4 h-4 mb-4" style={{ color: "rgba(167,139,250,0.50)" }} />
                <div
                  className="font-semibold text-white mb-1.5 tracking-tight"
                  style={{ fontSize: "1.7rem", fontFamily: HF }}
                >
                  {m.value}
                </div>
                <div className="font-medium mb-1" style={{ fontSize: T.small, color: T.text }}>{m.label}</div>
                <div style={{ fontSize: T.nano, color: T.muted, fontFamily: HF }}>{m.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Principles ───────────────────────────────────────────────────────────────

function Principles() {
  return (
    <section id="principles" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="工具化特点" sub="这些工具背后的共同方法。" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map(p => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="rounded-xl border p-6 flex flex-col gap-4 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.018)", borderColor: "rgba(255,255,255,0.065)" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.030)";
                  el.style.borderColor = "rgba(124,92,252,0.20)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.018)";
                  el.style.borderColor = "rgba(255,255,255,0.065)";
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: T.iconBg, border: `1px solid ${T.iconBorder}` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: T.accent }} />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1.5" style={{ fontSize: T.small, fontFamily: HF }}>
                    {p.label}
                  </div>
                  <p style={{ fontSize: T.small, color: T.sub, lineHeight: T.relax, textWrap: "pretty" }}>{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Next Steps ───────────────────────────────────────────────────────────────

function NextSteps() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="后续方向" sub="几个正在推进或计划中的改进方向。" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roadmapItems.map((item, i) => (
            <div
              key={item.name}
              className="flex gap-4 rounded-xl border p-5 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.016)", borderColor: "rgba(255,255,255,0.060)" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.028)";
                el.style.borderColor = "rgba(124,92,252,0.18)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.016)";
                el.style.borderColor = "rgba(255,255,255,0.060)";
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 font-bold"
                style={{
                  fontSize: 9, fontFamily: HF,
                  background: "rgba(124,92,252,0.09)",
                  border: "1px solid rgba(124,92,252,0.18)",
                  color: "rgba(124,92,252,0.70)",
                }}
              >
                {i + 1}
              </div>
              <div>
                <div className="font-semibold text-white mb-1.5" style={{ fontSize: T.small, fontFamily: HF }}>
                  {item.name}
                </div>
                <p style={{ fontSize: T.small, color: T.sub, lineHeight: T.relax, textWrap: "pretty" }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t px-6 py-7" style={{ borderColor: T.borderSub }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c5cfc, #a78bfa)" }}
          >
            <Mic className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-white tracking-tight" style={{ fontSize: T.small, fontFamily: HF }}>
            Voice Pipeline Tooling
          </span>
        </Link>
        <div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
          style={{ fontSize: T.nano, fontFamily: HF, color: T.faint }}
        >
          <span>游戏语音生产</span><span>·</span><span>个人工具化实践</span><span>·</span><span>内部参考</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0c0b12" }}>
      <Nav />
      <Hero />
      <Pipeline />
      <Divider />
      <Projects />
      <Divider />
      <SupportingUtilities />
      <Divider />
      <Impact />
      <Divider />
      <Principles />
      <Divider />
      <NextSteps />
      <Footer />
    </div>
  );
}
