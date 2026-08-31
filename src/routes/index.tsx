import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  FileText,
  Pill,
  Plus,
  Trash2,
  Stethoscope,
  CalendarClock,
  Landmark,
  Type,
  UserRound,
  Info,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VitAlign — Medicine Safety and Daily Schedule Assistant" },
      {
        name: "description",
        content:
          "Check your medicines for genuineness, understand possible side effects, follow a clear daily medicine schedule, and read government safety notices.",
      },
      { property: "og:title", content: "VitAlign — Medicine Safety and Daily Schedule Assistant" },
      {
        property: "og:description",
        content:
          "Verify medicines, review possible side effects, and follow a simple daily medicine schedule.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VitAlignPage,
});

type Status = "verified" | "recalled";

type Medicine = {
  id: string;
  name: string;
  purpose: string;
  status: Status;
  note: string;
};

const SAMPLE_MEDICINES: Medicine[] = [
  {
    id: "telmisartan",
    name: "Telmisartan 40mg",
    purpose: "For Blood Pressure",
    status: "verified",
    note: "Batch TL-4471 checked against the national medicine register.",
  },
  {
    id: "pantoprazole",
    name: "Pantoprazole 40mg",
    purpose: "For Acidity and Stomach Comfort",
    status: "verified",
    note: "Batch PN-1180 checked against the national medicine register.",
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin 20mg",
    purpose: "For Cholesterol",
    status: "recalled",
    note: "Batch AT-9032 failed a quality test in a government laboratory.",
  },
  {
    id: "ciprofloxacin",
    name: "Ciprofloxacin 500mg",
    purpose: "Antibiotic for Infection",
    status: "verified",
    note: "Genuine batch. Food timing care needed — see Daily Medicine Schedule.",
  },
];

const SYMPTOMS = [
  { id: "dizzy", label: "Dizziness or lightheadedness" },
  { id: "muscle", label: "Muscle pain or weakness" },
  { id: "stomach", label: "Stomach discomfort or nausea" },
  { id: "rash", label: "Skin rash or itching" },
];

const CAUSES = [
  {
    percent: 55,
    label: "Interaction between two of your prescribed medicines",
    tone: "primary" as const,
  },
  {
    percent: 35,
    label: "Quality defect detected in recalled medicine batch",
    tone: "danger" as const,
  },
  {
    percent: 10,
    label: "Medicine taken at an improper time relative to meals",
    tone: "warn" as const,
  },
];

const SCHEDULE = [
  {
    time: "Morning — Before Breakfast",
    clock: "7:30 AM",
    text: "Take Pantoprazole with water 30 minutes before food.",
  },
  {
    time: "Afternoon — After Lunch",
    clock: "1:30 PM",
    text: "Take your Blood Pressure medicine with or immediately after food.",
  },
  {
    time: "Night — Before Sleep",
    clock: "9:30 PM",
    text: "Take your Cholesterol medicine before bedtime.",
  },
];

const NOTICES = [
  { state: "Maharashtra", medicine: "Atorvastatin 20mg", batch: "AT-9032", issue: "Failed quality test", date: "12 Aug 2026" },
  { state: "Delhi", medicine: "Metformin 500mg", batch: "MT-2210", issue: "Incorrect medicine strength", date: "09 Aug 2026" },
  { state: "Gujarat", medicine: "Amoxicillin 500mg", batch: "AM-7745", issue: "Packaging and labelling fault", date: "04 Aug 2026" },
  { state: "Tamil Nadu", medicine: "Paracetamol 650mg", batch: "PC-3391", issue: "Failed dissolution test", date: "28 Jul 2026" },
  { state: "West Bengal", medicine: "Ranitidine 150mg", batch: "RN-5502", issue: "Impurity found in sample", date: "21 Jul 2026" },
];

const TABS = [
  { id: "medicines", label: "Check Medicines", icon: Pill },
  { id: "symptoms", label: "Symptom Safety Check", icon: Stethoscope },
  { id: "schedule", label: "Daily Medicine Schedule", icon: CalendarClock },
  { id: "notices", label: "Government Safety Notices", icon: Landmark },
] as const;

type TabId = (typeof TABS)[number]["id"];

const STORAGE_KEY = "vitalign.medicines";

function VitAlignPage() {
  const [tab, setTab] = useState<TabId>("medicines");
  const [large, setLarge] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [showFindings, setShowFindings] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMedicines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
    } catch {
      /* ignore */
    }
  }, [medicines, loaded]);

  const addMedicine = (m: Medicine) => {
    setMedicines((prev) => (prev.some((p) => p.id === m.id) ? prev : [...prev, m]));
  };

  const loadSample = () => {
    setMedicines(SAMPLE_MEDICINES);
    setSelected(["dizzy", "muscle"]);
    setShowFindings(false);
    setTab("medicines");
  };

  const base = large ? "text-[19px]" : "text-[17px]";

  return (
    <div className={`min-h-screen bg-background text-foreground ${base} leading-relaxed`}>
      <header className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:flex sm:flex-wrap sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-12 shrink-0 place-items-center rounded-md bg-primary">
              <ShieldCheck className="size-7 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">VitAlign</h1>
              <p className="truncate text-sm text-muted-foreground sm:text-base">
                Medicine Safety and Daily Schedule Assistant
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setLarge((v) => !v)}
              aria-pressed={large}
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-border bg-card px-4 font-semibold hover:bg-secondary"
            >
              <Type className="size-5" aria-hidden="true" />
              {large ? "Normal Text Size" : "Larger Text Size"}
            </button>
            <button
              type="button"
              onClick={loadSample}
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:opacity-90"
            >
              <UserRound className="size-5" aria-hidden="true" />
              Load Sample Patient Case
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <nav aria-label="Sections" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-16 items-center gap-3 rounded-md border-2 px-4 text-left font-semibold transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <Icon className="size-6 shrink-0" aria-hidden="true" />
                <span className="min-w-0">{t.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8">
          {tab === "medicines" && (
            <MedicinesTab medicines={medicines} onAdd={addMedicine} onRemove={(id) => setMedicines((p) => p.filter((m) => m.id !== id))} />
          )}
          {tab === "symptoms" && (
            <SymptomsTab
              selected={selected}
              toggle={(id) =>
                setSelected((p) => (p.includes(id) ? p.filter((s) => s !== id) : [...p, id]))
              }
              showFindings={showFindings}
              onCheck={() => setShowFindings(true)}
            />
          )}
          {tab === "schedule" && <ScheduleTab />}
          {tab === "notices" && <NoticesTab verified={medicines.filter((m) => m.status === "verified").length} total={medicines.length} />}
        </div>

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          VitAlign provides general information only. Always follow the advice of your doctor or
          pharmacist.
        </footer>
      </main>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Pill;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-6 py-5">
        <Icon className="size-6 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function MedicinesTab({
  medicines,
  onAdd,
  onRemove,
}: {
  medicines: Medicine[];
  onAdd: (m: Medicine) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="grid gap-6">
      <SectionCard title="Add or Verify Medicine" icon={Plus}>
        <p className="mb-5 text-muted-foreground">
          Select a medicine below to add it to your list and check whether it is genuine.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SAMPLE_MEDICINES.map((m) => {
            const added = medicines.some((x) => x.id === m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onAdd(m)}
                disabled={added}
                className="flex min-h-16 items-center justify-between gap-4 rounded-md border-2 border-border bg-card px-4 py-3 text-left hover:bg-secondary disabled:opacity-60"
              >
                <span className="min-w-0">
                  <span className="block font-semibold">{m.name}</span>
                  <span className="block text-sm text-muted-foreground">{m.purpose}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold text-primary">
                  {added ? "Added" : "Add"}
                </span>
              </button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Your Medicine List" icon={Pill}>
        {medicines.length === 0 ? (
          <p className="text-muted-foreground">
            No medicines added yet. Use the buttons above, or select "Load Sample Patient Case".
          </p>
        ) : (
          <ul className="grid gap-5">
            {medicines.map((m) => (
              <li key={m.id} className="rounded-md border border-border">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold">
                      {m.name} — {m.purpose}
                    </h3>
                    <p className="text-sm text-muted-foreground">{m.note}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(m.id)}
                    className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-md border border-border px-4 font-semibold hover:bg-secondary"
                  >
                    <Trash2 className="size-5" aria-hidden="true" />
                    Remove
                  </button>
                </div>
                {m.status === "verified" ? (
                  <p className="flex items-start gap-3 rounded-b-md border-t-4 border-[oklch(0.5_0.14_150)] bg-[oklch(0.97_0.03_150)] px-5 py-4 font-semibold text-[oklch(0.38_0.12_150)]">
                    <ShieldCheck className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
                    Verified Genuine — Passed Government Schedule H2 verification
                  </p>
                ) : (
                  <p className="flex items-start gap-3 rounded-b-md border-t-4 border-destructive bg-[oklch(0.96_0.03_27)] px-5 py-4 font-semibold text-[oklch(0.45_0.2_27)]">
                    <AlertTriangle className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
                    DO NOT CONSUME — This batch was recalled by national drug safety authorities due
                    to quality failure
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
}

function SymptomsTab({
  selected,
  toggle,
  showFindings,
  onCheck,
}: {
  selected: string[];
  toggle: (id: string) => void;
  showFindings: boolean;
  onCheck: () => void;
}) {
  return (
    <div className="grid gap-6">
      <SectionCard title="Symptom Safety Check" icon={Stethoscope}>
        <p className="mb-5 font-semibold">Select any symptom you are currently experiencing:</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SYMPTOMS.map((s) => {
            const on = selected.includes(s.id);
            return (
              <label
                key={s.id}
                className={`flex min-h-16 cursor-pointer items-center gap-4 rounded-md border-2 px-4 py-3 ${
                  on ? "border-primary bg-secondary" : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(s.id)}
                  className="size-6 shrink-0 accent-[oklch(0.55_0.21_262)]"
                />
                <span className="font-medium">{s.label}</span>
              </label>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onCheck}
          disabled={selected.length === 0}
          className="mt-6 inline-flex min-h-14 items-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          <FileText className="size-5" aria-hidden="true" />
          Check Possible Causes
        </button>
      </SectionCard>

      {showFindings && selected.length > 0 && (
        <SectionCard title="Findings Summary" icon={FileText}>
          <h3 className="mb-4 text-lg font-bold">Probable Cause Breakdown</h3>
          <ul className="grid gap-5">
            {CAUSES.map((c) => (
              <li key={c.label}>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium">{c.label}</span>
                  <span className="font-bold">{c.percent}%</span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.percent}%`,
                      backgroundColor:
                        c.tone === "primary"
                          ? "oklch(0.55 0.21 262)"
                          : c.tone === "danger"
                            ? "oklch(0.58 0.22 27)"
                            : "oklch(0.62 0.15 62)",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 mb-3 text-lg font-bold">Action Recommended</h3>
          <p className="flex items-start gap-3 rounded-md border-l-4 border-primary bg-secondary px-5 py-4">
            <Info className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
            Please share this summary with your treating physician or pharmacist. Do not alter or
            stop prescribed medicines without medical supervision.
          </p>
        </SectionCard>
      )}
    </div>
  );
}

function ScheduleTab() {
  return (
    <div className="grid gap-6">
      <SectionCard title="Daily Medicine Schedule" icon={Clock}>
        <ul className="grid gap-4">
          {SCHEDULE.map((s) => (
            <li
              key={s.time}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 rounded-md border border-border px-5 py-4 sm:flex sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-bold">{s.time}</p>
                <p className="text-muted-foreground">{s.text}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-md bg-secondary px-3 py-2 font-semibold">
                <Clock className="size-5" aria-hidden="true" />
                {s.clock}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="flex items-start gap-3 rounded-lg border-2 border-[oklch(0.62_0.15_62)] bg-[oklch(0.98_0.03_80)] px-6 py-5">
        <AlertTriangle className="mt-0.5 size-7 shrink-0 text-[oklch(0.5_0.13_62)]" aria-hidden="true" />
        <p className="font-semibold text-[oklch(0.35_0.08_62)]">
          Dietary Notice: Do not consume milk, yogurt, or calcium-rich dairy within 2 hours of taking
          Ciprofloxacin to ensure proper medicine absorption.
        </p>
      </div>
    </div>
  );
}

function NoticesTab({ verified, total }: { verified: number; total: number }) {
  const metrics = [
    { label: "Total Medicines Verified", value: total, icon: Pill },
    { label: "Flagged Batches Recorded", value: NOTICES.length, icon: AlertTriangle },
    { label: "Verified Genuine Batches", value: verified, icon: CheckCircle2 },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-lg border border-border bg-card px-5 py-5">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-3xl font-bold">{m.value}</p>
              <p className="text-muted-foreground">{m.label}</p>
            </div>
          );
        })}
      </div>

      <SectionCard title="Recent National Safety Notices" icon={Landmark}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="px-3 py-3 font-bold">State</th>
                <th className="px-3 py-3 font-bold">Medicine</th>
                <th className="px-3 py-3 font-bold">Batch Number</th>
                <th className="px-3 py-3 font-bold">Reported Problem</th>
                <th className="px-3 py-3 font-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {NOTICES.map((n) => (
                <tr key={n.batch} className="border-b border-border">
                  <td className="px-3 py-4 font-semibold">{n.state}</td>
                  <td className="px-3 py-4">{n.medicine}</td>
                  <td className="px-3 py-4">{n.batch}</td>
                  <td className="px-3 py-4 font-semibold text-[oklch(0.45_0.2_27)]">{n.issue}</td>
                  <td className="px-3 py-4 whitespace-nowrap">{n.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
