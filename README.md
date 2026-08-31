# VitAlign Health Hub

Build a complete, single-page interactive UI for "VitAlign" (MedTech / SIH 2026 Prototype) using React, Tailwind CSS, and Lucide-React. Keep all state, mock datasets, and logic in-memory (pure frontend UI-first, no backend required).

UI Layout & Header:

- MedTech theme: Dark slate background, emerald/cyan accents, responsive cards.

- Top bar with: Title "VitAlign", Hackathon badge, and a "Quick Load Demo Patient" button.

- 4 Tab views:

  1. [Regimen & Scanner]

  2. [ADR Agent Triage]

  3. [Chrono Timeline]

  4. [Regulator Heatmap]

Tab 1: Medicine Scanner & Regimen (UI):

- Quick Add / Scan simulator with 4 preset drug cards:

  * Telmisartan 40mg (Authentic)

  * Pantoprazole 40mg (Authentic)

  * Atorvastatin 20mg (CDSCO Flagged: NSQ Recall Batch #AT-FAKE-01)

  * Ciprofloxacin 500mg (Authentic, Dairy-interaction alert)

- Displays current drug list with Batch ID, Expiry, and Schedule H2 verification badge (Green Verified / Red Recalled).

Tab 2: Agentic ADR Attribution (UI):

- Symptom selection pills (Dizziness, Muscle Weakness, Gastric Distress).

- "Run Triage Analysis" button displaying a 3-agent orchestration breakdown:

  * Authenticity Agent result (CDSCO check)

  * Drug-Drug Interaction Agent score (DDInter graph)

  * Chrono-Nutrition conflict flag

- Probabilistic Attribution progress bars (e.g. 55% DDI, 35% Substandard Batch, 10% Food Timing).

Tab 3: Precision Chrono-Nutrition Timeline:

- 24-hour visual schedule cards (Morning, Lunch, Evening, Bedtime).

- Shows optimal intake instructions (e.g., "PPI 30 mins before breakfast", "Avoid milk/calcium with Ciprofloxacin").

Tab 4: CDSCO Surveillance Heatmap:

- Metric cards: Total Scans, NSQ Detection Rate (10.5%), Flagged Hotspots.

- India regional table/grid showing flagged batch alerts per state (e.g. Maharashtra, Delhi, Gujarat).

Include full interactive state (switching tabs, adding/removing drugs, triggering the demo preset) directly in this single UI build.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ed2e3c0-8ef1-4598-a0ff-162dcfa7bf25).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
