import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Mic } from "lucide-react";
import { projects } from "../lib/data";
import { HF, MF, T, StatusPill, StagePill, ScreenshotPlaceholder } from "../components/shared";

// ─── Nav ─────────────────────────────────────────────────────────────────────

function DetailNav() {
  const navigate = useNavigate();
  const links = [
    { label: "项目", href: "/#projects" },
    { label: "流程", href: "/#pipeline" },
    { label: "方法", href: "/#principles" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: "rgba(12,11,18,0.9)", backdropFilter: "blur(20px)", borderColor: T.borderSub }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 56 }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 transition-colors duration-150"
            style={{ fontSize: T.body, fontFamily: HF, color: T.muted }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.sub}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.muted}
          >
            <ArrowLeft className="w-4 h-4" /> 返回
          </button>
          <div className="w-px h-4" style={{ background: T.border }} />
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c5cfc, #a78bfa)" }}>
              <Mic className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-white hidden sm:block" style={{ fontSize: T.small, fontFamily: HF }}>Voice Pipeline Tooling</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 font-medium" style={{ fontSize: T.body, color: T.faint }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-white transition-colors duration-150">{label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Block ────────────────────────────────────────────────────────────────────
// Section heading style: small, clear, sans-serif — not tiny mono uppercase

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="font-semibold"
        style={{ fontSize: T.small, fontFamily: HF, color: T.muted, letterSpacing: "0" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── IO row ───────────────────────────────────────────────────────────────────

function IORow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 px-5 py-4" style={{ borderBottom: `1px solid ${T.borderSub}` }}>
      <span
        className="flex-shrink-0 font-semibold pt-px"
        style={{ fontSize: T.label, fontFamily: HF, color: T.accent, width: 56 }}
      >
        {label}
      </span>
      <span style={{ fontSize: T.body, color: T.sub, lineHeight: T.relax }}>{value}</span>
    </div>
  );
}

// ─── Detail page ─────────────────────────────────────────────────────────────

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0c0b12" }}>
        <div className="text-center">
          <p className="text-white mb-4" style={{ fontFamily: HF }}>工具未找到</p>
          <Link to="/" className="no-underline" style={{ fontSize: T.body, color: T.accent }}>返回首页</Link>
        </div>
      </div>
    );
  }

  const Icon = project.icon;

  return (
    <div className="min-h-screen" style={{ background: "#0c0b12" }}>
      <DetailNav />

      {/* header */}
      <div className="pt-14">
        <div
          className="border-b px-6 py-10"
          style={{ borderColor: T.borderSub, background: "linear-gradient(180deg, rgba(124,92,252,0.035) 0%, transparent 100%)" }}
        >
          <div className="max-w-4xl mx-auto">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 mb-6" style={{ fontSize: T.micro, fontFamily: MF, color: T.faint }}>
              <Link to="/" className="hover:text-white transition-colors no-underline" style={{ color: "inherit" }}>Voice Pipeline Tooling</Link>
              <span>/</span>
              <span style={{ color: T.muted }}>{project.name}</span>
            </div>

            <div className="flex items-start gap-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(124,92,252,0.11)", border: "1px solid rgba(124,92,252,0.22)" }}
              >
                <Icon className="w-6 h-6" style={{ color: T.accent }} />
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-3 flex-wrap mb-1">
                  <h1 className="text-white" style={{ fontFamily: HF, fontWeight: T.bold, fontSize: "clamp(1.35rem, 2.8vw, 1.85rem)", lineHeight: T.tight, letterSpacing: "-0.02em" }}>
                    {project.name}
                  </h1>
                  <StatusPill status={project.status} />
                </div>
                <p style={{ fontSize: T.body, color: T.sub, lineHeight: T.base }}>{project.positioning}</p>
              </div>
            </div>

            {/* meta row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-5 border-t" style={{ borderColor: T.borderSub }}>
              {[
                { label: "开始时间", value: project.startDate },
                { label: "当前版本", value: project.version },
                { label: "流程阶段", value: project.stageLabel },
                { label: "进度",     value: project.progress },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span style={{ fontSize: T.micro, fontFamily: MF, color: T.faint }}>{label}</span>
                  <span style={{ fontSize: T.micro, fontFamily: MF, color: T.muted }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">

        {/* Problem */}
        <Block title="问题背景">
          <div className="rounded-xl border p-6" style={{ background: "rgba(255,255,255,0.018)", borderColor: T.border }}>
            <p style={{ fontSize: T.body, color: T.sub, lineHeight: T.loose }}>{project.problem}</p>
          </div>
        </Block>

        {/* Input / Output */}
        <Block title="输入 / 输出">
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: T.border }}>
            <IORow label="INPUT" value={project.input} />
            <div className="flex gap-4 px-5 py-4">
              <span className="flex-shrink-0 font-semibold pt-px" style={{ fontSize: T.label, fontFamily: HF, color: T.accent, width: 56 }}>OUTPUT</span>
              <span style={{ fontSize: T.body, color: T.sub, lineHeight: T.relax }}>{project.output}</span>
            </div>
          </div>
        </Block>

        {/* Workflow */}
        <Block title="核心流程">
          <ol className="flex flex-col gap-2">
            {project.workflow.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 items-start rounded-xl border px-5 py-3.5"
                style={{ background: "rgba(255,255,255,0.016)", borderColor: "rgba(255,255,255,0.062)" }}
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-bold mt-0.5"
                  style={{ fontSize: 9, fontFamily: MF, background: "rgba(124,92,252,0.14)", color: T.accent, border: "1px solid rgba(124,92,252,0.2)", flexShrink: 0 }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: T.body, color: T.sub, lineHeight: T.relax }}>{step}</span>
              </li>
            ))}
          </ol>
        </Block>

        {/* Capabilities */}
        <Block title="主要能力">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border px-4 py-3"
                style={{ background: "rgba(255,255,255,0.016)", borderColor: "rgba(255,255,255,0.062)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: T.violet }} />
                <span style={{ fontSize: T.body, color: T.sub }}>{cap}</span>
              </div>
            ))}
          </div>
        </Block>

        {/* Screenshot */}
        <Block title="界面 / 输出示例">
          <ScreenshotPlaceholder label={project.screenshotLabel} />
        </Block>

        {/* Version notes */}
        <Block title="版本记录">
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: T.border }}>
            {project.versionNotes.map((note, i) => (
              <div
                key={i}
                className="flex gap-3 items-start px-5 py-3.5 border-b last:border-b-0"
                style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.016)" : "rgba(255,255,255,0.01)", borderColor: T.borderSub }}
              >
                <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2.5" style={{ background: "rgba(124,92,252,0.5)" }} />
                <span style={{ fontSize: T.small, color: T.sub, fontFamily: MF, lineHeight: T.relax }}>{note}</span>
              </div>
            ))}
          </div>
        </Block>

        {/* Usage */}
        <Block title="使用说明">
          <div className="rounded-xl border p-6" style={{ background: "rgba(255,255,255,0.018)", borderColor: T.border }}>
            <p style={{ fontSize: T.body, color: T.sub, lineHeight: T.loose }}>{project.usageNotes}</p>
          </div>
        </Block>

        {/* Known issues + next steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Block title="已知问题">
            <div className="rounded-xl border p-5 h-full" style={{ background: "rgba(255,255,255,0.016)", borderColor: "rgba(255,255,255,0.062)" }}>
              <p style={{ fontSize: T.body, color: T.sub, lineHeight: T.relax }}>{project.knownIssues}</p>
            </div>
          </Block>
          <Block title="后续计划">
            <div className="rounded-xl border p-5 h-full" style={{ background: "rgba(255,255,255,0.016)", borderColor: "rgba(255,255,255,0.062)" }}>
              <p style={{ fontSize: T.body, color: T.sub, lineHeight: T.relax }}>{project.nextSteps}</p>
            </div>
          </Block>
        </div>

        {/* back */}
        <div className="flex items-center pt-4 border-t" style={{ borderColor: T.borderSub }}>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 transition-colors duration-150"
            style={{ fontSize: T.body, fontFamily: HF, color: T.faint }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T.muted}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T.faint}
          >
            <ArrowLeft className="w-4 h-4" /> 返回工具列表
          </button>
        </div>
      </div>
    </div>
  );
}
