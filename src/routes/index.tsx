import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Bot,
  Clock,
  Coffee,
  Cpu,
  FlaskConical,
  Map,
  Moon,
  PillBottle,
  Plus,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Trash2,
  TrendingUp,
  Utensils,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VitAlign — Agentic Drug Safety & Chrono-Nutrition" },
      {
        name: "description",
        content:
          "VitAlign is an SIH 2026 MedTech prototype: medicine authenticity scanning, agentic ADR triage, chrono-nutrition timing and CDSCO surveillance.",
      },
      { property: "og:title", content: "VitAlign — Agentic Drug Safety & Chrono-Nutrition" },
      {
        property: "og:description",
        content:
          "Scan medicines against CDSCO recalls, run 3-agent ADR attribution, and optimise drug timing with chrono-nutrition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VitAlign,
});

type Drug = {
  id: string;
  name: string;
  dose: string;
  batch: string;
  expiry: string;
  status: "verified" | "recalled";
  note: string;
  schedule: string;
  timing: string;
};

const PRESETS: Omit<Drug, "id">[] = [
  {
    name: "Telmisartan",
    dose: "40mg",
    batch: "TL-2291-A",
    expiry: "11/2027",
    status: "verified",
    note: "Antihypertensive — authentic supply chain",
    schedule: "Schedule H",
    timing: "Morning, after food",
  },
  {
    name: "Pantoprazole",
    dose: "40mg",
    batch: "PN-8842-C",
    expiry: "03/2028",
    status: "verified",
    note: "PPI — strict pre-meal window",
    schedule: "Schedule H",
    timing: "30 min before breakfast",
  },
  {
    name: "Atorvastatin",
    dose: "20mg",
    batch: "AT-FAKE-01",
    expiry: "07/2026",
    status: "recalled",
    note: "CDSCO NSQ recall — substandard assay reported",
    schedule: "Schedule H",
    timing: "Bedtime",
  },
  {
    name: "Ciprofloxacin",
    dose: "500mg",
    batch: "CF-5510-B",
    expiry: "01/2028",
    status: "verified",
    note: "Dairy/calcium chelation alert — 2 hr separation",
    schedule: "Schedule H2",
    timing: "Lunch + Evening, no milk",
  },
];

const SYMPTOMS = ["Dizziness", "Muscle Weakness", "Gastric Distress"];

const HOTSPOTS = [
  { state: "Maharashtra", scans: 4820, flagged: 142, batches: "AT-FAKE-01, PN-3320", risk: "High" },
  { state: "Delhi NCR", scans: 3960, flagged: 121, batches: "AT-FAKE-01", risk: "High" },
  { state: "Gujarat", scans: 3110, flagged: 74, batches: "CF-1180", risk: "Medium" },
  { state: "Uttar Pradesh", scans: 2890, flagged: 63, batches: "TL-7741", risk: "Medium" },
  { state: "Tamil Nadu", scans: 2410, flagged: 28, batches: "—", risk: "Low" },
  { state: "West Bengal", scans: 1980, flagged: 21, batches: "PN-9021", risk: "Low" },
];

const TABS = [
  { key: "regimen", label: "Regimen & Scanner", icon: ScanLine },
  { key: "adr", label: "ADR Agent Triage", icon: Bot },
  { key: "chrono", label: "Chrono Timeline", icon: Clock },
  { key: "heatmap", label: "Regulator Heatmap", icon: Map },
] as const;

type TabKey = (typeof TABS)[number]["key"];

let uid = 0;
const makeId = () => `d${++uid}`;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card/70 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: Drug["status"] }) {
  return status === "verified" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary">
      <ShieldCheck className="h-3.5 w-3.5" /> CDSCO VERIFIED
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-destructive">
      <ShieldAlert className="h-3.5 w-3.5" /> NSQ RECALLED
    </span>
  );
}

function VitAlign() {
  const [tab, setTab] = useState<TabKey>("regimen");
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [triage, setTriage] = useState<null | { ran: boolean }>(null);
  const [scanning, setScanning] = useState<string | null>(null);

  const hasRecall = drugs.some((d) => d.status === "recalled");
  const hasCipro = drugs.some((d) => d.name === "Ciprofloxacin");
  const hasStatin = drugs.some((d) => d.name === "Atorvastatin");
  const hasPPI = drugs.some((d) => d.name === "Pantoprazole");

  const addDrug = (preset: Omit<Drug, "id">) => {
    setScanning(preset.name);
    setTimeout(() => {
      setDrugs((prev) => [...prev, { ...preset, id: makeId() }]);
      setScanning(null);
    }, 450);
  };

  const loadDemo = () => {
    setDrugs(PRESETS.map((p) => ({ ...p, id: makeId() })));
    setSymptoms(["Dizziness", "Muscle Weakness"]);
    setTriage(null);
    setTab("regimen");
  };

  const attribution = useMemo(() => {
    const ddi = hasStatin && hasCipro ? 55 : 40;
    const batch = hasRecall ? 35 : 15;
    const food = 100 - ddi - batch;
    return [
      { label: "Drug–Drug Interaction (DDInter)", value: ddi, tone: "bg-destructive" },
      { label: "Substandard / Recalled Batch", value: batch, tone: "bg-warning" },
      { label: "Food & Timing Conflict", value: food, tone: "bg-accent" },
    ];
  }, [hasStatin, hasCipro, hasRecall]);

  return (
    <main className="min-h-screen bg-background bg-grid text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary panel-glow">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gradient-brand">VitAlign</h1>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Agentic Drug Safety Layer
              </p>
            </div>
          </div>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
            SIH 2026 · MedTech Prototype
          </span>
          <button
            onClick={loadDemo}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" /> Quick Load Demo Patient
          </button>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 pb-2 sm:px-5">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-t-xl border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {tab === "regimen" && (
          <section className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <ScanLine className="h-4 w-4 text-primary" /> Scan Simulator
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap a strip to simulate a QR/2D barcode scan against the CDSCO registry.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => addDrug(p)}
                    className="group rounded-xl border border-border bg-secondary/40 p-4 text-left transition hover:border-primary/50 hover:bg-secondary/70"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 font-semibold">
                        <PillBottle className="h-4 w-4 text-accent" />
                        {p.name} {p.dose}
                      </div>
                      <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
                    <div className="mt-3">
                      {scanning === p.name ? (
                        <span className="text-[11px] font-semibold text-accent">Scanning…</span>
                      ) : (
                        <StatusBadge status={p.status} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-semibold">
                  <FlaskConical className="h-4 w-4 text-primary" /> Active Regimen
                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {drugs.length}
                  </span>
                </h2>
                {drugs.length > 0 && (
                  <button
                    onClick={() => setDrugs([])}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {hasRecall && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Recalled batch detected in this regimen — CDSCO NSQ alert #AT-FAKE-01. Stop
                    intake and report to the nearest pharmacovigilance centre.
                  </p>
                </div>
              )}

              <div className="mt-4 space-y-3">
                {drugs.length === 0 && (
                  <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                    No medicines scanned yet. Use the simulator or load the demo patient.
                  </p>
                )}
                {drugs.map((d) => (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-secondary/30 p-4"
                  >
                    <div className="min-w-40 flex-1">
                      <div className="font-semibold">
                        {d.name} <span className="text-muted-foreground">{d.dose}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>Batch: {d.batch}</span>
                        <span>Exp: {d.expiry}</span>
                        <span>{d.schedule}</span>
                        <span className="text-accent">{d.timing}</span>
                      </div>
                    </div>
                    <StatusBadge status={d.status} />
                    <button
                      onClick={() => setDrugs((prev) => prev.filter((x) => x.id !== d.id))}
                      className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Remove ${d.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        )}

        {tab === "adr" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <Zap className="h-4 w-4 text-primary" /> Reported Symptoms
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {SYMPTOMS.map((s) => {
                  const on = symptoms.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() =>
                        setSymptoms((prev) =>
                          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
                        )
                      }
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        on
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setTriage({ ran: true })}
                disabled={symptoms.length === 0 || drugs.length === 0}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Cpu className="h-4 w-4" /> Run Triage Analysis
              </button>
              <p className="mt-2 text-xs text-muted-foreground">
                Requires at least one scanned medicine and one symptom.
              </p>
            </Card>

            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <Bot className="h-4 w-4 text-primary" /> Agent Orchestration
              </h2>
              {!triage ? (
                <p className="mt-6 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  Run the triage to see the 3-agent breakdown.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  <AgentRow
                    icon={BadgeCheck}
                    title="Authenticity Agent · CDSCO registry"
                    tone={hasRecall ? "bad" : "good"}
                    text={
                      hasRecall
                        ? "Batch #AT-FAKE-01 matches an active NSQ recall notice. Assay variance flagged."
                        : "All batch IDs matched authentic manufacturer records."
                    }
                  />
                  <AgentRow
                    icon={Activity}
                    title="Drug–Drug Interaction Agent · DDInter graph"
                    tone={hasStatin && hasCipro ? "bad" : "warn"}
                    text={
                      hasStatin && hasCipro
                        ? "Severity 0.82 — Ciprofloxacin inhibits CYP3A4 clearance of Atorvastatin, raising myopathy risk."
                        : "Severity 0.31 — no major pairwise conflicts in the current regimen."
                    }
                  />
                  <AgentRow
                    icon={Utensils}
                    title="Chrono-Nutrition Agent"
                    tone={hasCipro || hasPPI ? "warn" : "good"}
                    text={
                      hasCipro
                        ? "Conflict: Ciprofloxacin logged near dairy intake — calcium chelation reduces absorption ~40%."
                        : hasPPI
                          ? "Pantoprazole taken with food — efficacy reduced, shift 30 min pre-breakfast."
                          : "No timing conflicts detected."
                    }
                  />

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold">Probabilistic Attribution</h3>
                    <div className="mt-3 space-y-3">
                      {attribution.map((a) => (
                        <div key={a.label}>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{a.label}</span>
                            <span className="font-semibold text-foreground">{a.value}%</span>
                          </div>
                          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className={`h-full rounded-full ${a.tone} transition-all duration-700`}
                              style={{ width: `${a.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </section>
        )}

        {tab === "chrono" && (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Sun,
                slot: "Morning · 07:00",
                items: [
                  "Pantoprazole 40mg — 30 mins BEFORE breakfast",
                  "Telmisartan 40mg — after breakfast, with water",
                ],
              },
              {
                icon: Coffee,
                slot: "Lunch · 13:00",
                items: [
                  "Ciprofloxacin 500mg — 2 hrs away from milk/curd",
                  "Avoid antacids and calcium supplements",
                ],
              },
              {
                icon: Utensils,
                slot: "Evening · 19:00",
                items: [
                  "Ciprofloxacin 500mg — second dose",
                  "Hydration target: 500ml before next dose",
                ],
              },
              {
                icon: Moon,
                slot: "Bedtime · 22:30",
                items: [
                  "Atorvastatin 20mg — peak HMG-CoA synthesis window",
                  "No grapefruit juice within 4 hrs",
                ],
              },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <Card key={b.slot} className="p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <Icon className="h-4 w-4" /> {b.slot}
                  </div>
                  <ul className="mt-4 space-y-3">
                    {b.items.map((i) => (
                      <li
                        key={i}
                        className="rounded-lg border border-border bg-secondary/30 p-3 text-sm text-muted-foreground"
                      >
                        {i}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </section>
        )}

        {tab === "heatmap" && (
          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: ScanLine, label: "Total Scans (30d)", value: "19,170" },
                { icon: TrendingUp, label: "NSQ Detection Rate", value: "10.5%" },
                { icon: AlertTriangle, label: "Flagged Hotspots", value: "12 districts" },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <Card key={m.label} className="p-5">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                      <Icon className="h-4 w-4 text-primary" /> {m.label}
                    </div>
                    <div className="mt-3 text-3xl font-bold text-gradient-brand">{m.value}</div>
                  </Card>
                );
              })}
            </div>

            <Card className="overflow-hidden">
              <div className="border-b border-border p-5">
                <h2 className="flex items-center gap-2 text-base font-semibold">
                  <Map className="h-4 w-4 text-primary" /> Regional Batch Surveillance
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 text-left">State / Region</th>
                      <th className="px-5 py-3 text-right">Scans</th>
                      <th className="px-5 py-3 text-right">Flagged</th>
                      <th className="px-5 py-3 text-left">Batches</th>
                      <th className="px-5 py-3 text-left">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HOTSPOTS.map((h) => (
                      <tr key={h.state} className="border-t border-border">
                        <td className="px-5 py-3 font-medium">{h.state}</td>
                        <td className="px-5 py-3 text-right text-muted-foreground">{h.scans}</td>
                        <td className="px-5 py-3 text-right text-muted-foreground">{h.flagged}</td>
                        <td className="px-5 py-3 text-muted-foreground">{h.batches}</td>
                        <td className="px-5 py-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              h.risk === "High"
                                ? "bg-destructive/15 text-destructive"
                                : h.risk === "Medium"
                                  ? "bg-warning/15 text-warning"
                                  : "bg-primary/12 text-primary"
                            }`}
                          >
                            {h.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        )}
      </div>
    </main>
  );
}

function AgentRow({
  icon: Icon,
  title,
  text,
  tone,
}: {
  icon: typeof Bot;
  title: string;
  text: string;
  tone: "good" | "warn" | "bad";
}) {
  const toneClass =
    tone === "good"
      ? "border-primary/40 bg-primary/8 text-primary"
      : tone === "warn"
        ? "border-warning/40 bg-warning/8 text-warning"
        : "border-destructive/40 bg-destructive/8 text-destructive";
  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4" /> {title}
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
