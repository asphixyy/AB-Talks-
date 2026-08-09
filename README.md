# ABTalks Coding Cohort - 60-Day Challenge Dashboard

A highly interactive, gamified, and premium student progress-tracking portal built for the ABTalks Coding Cohort. This web application tracks a student's daily programming submissions, wallet coins balance, program streaks, cohort leaderboard standings, and rewards redemption.

The workspace contains both **a static page-based frontend** (Vanilla HTML/CSS/JS) and **a dynamic single-page React app** (Vite + Tailwind + Framer Motion) to support various user deployment configurations.

---

## 🌟 Key Features

### 1. Cohort Registration Portal
* **Clean Authentication**: Authenticates users using client-side name verification.
* **Onboarding Details**: Captures name, email, date of birth, program tracks (SDE), and location hub.
* **Wallet Boost**: Rewards newly registered coders with `150 coins` starting balance.

### 2. Main Dashboard & Leaderboard
* **Program Stats**: Displays cohort streaks (active days committed) and overall leaderboard standings.
* **Activity Tracker**: Includes a task checklist for tracking daily commitments (DSA tasks, code commits, and LinkedIn shares).
* **Dynamic Leaderboard**: Displays participant ranking list with relative scoring.

### 3. Interactive Bottom Navigation (Liquid Glass Design)
* **Glassmorphic Aesthetic**: A floating bottom navigation dock using modern CSS glassmorphism, blur filters, and glow effects.
* **Sweep Indicator Animation**: Features a fluid white sweeping highlight indicator that offsets to fit the active menu tab width.
* **Responsive Layouts**: Designed to be completely hidden on landing registration pages and visible on inner portals.

### 4. Progress Heatmap (GitHub Contribution Style)
* **Commit Grid**: A 60-day visual grid displaying contribution intensity.
* **Dynamic Highlighting**: Automatically updates cell colors as user submits challenges (highlights 20 cells initially, and shifts to 21 cells once Day 20 is submitted).
* **Reset on Logout**: Resets back to default 20 cells when session is cleared.

### 5. Challenge Day Detail Portal (DAY.TWENTY)
* **Problem Statement**: Dynamic text detailing the Day 20 challenge task (*Build a CRUD REST API*).
* **Proof Submissions**: Interactive forms validating GitHub repository commits and LinkedIn post urls.
* **Successful Modal**: A centered glassmorphic success pop-up that details +25 coin rewards and redirects to the dashboard.
* **State Updates**: Swaps form UI and descriptions dynamically to display *"Milestone Completed! Come back tomorrow!"* once submitted.

### 6. Rewards Catalog
* **Redemption Logic**: Users can redeem premium items (Swag boxes, stickers, stickers packs, mentor 1-on-1s) using earned wallet coins.
* **State Syncing**: Automatically deducts coin balances and alerts users of insufficient funds.

---

## 🛠️ Technology Stack

### Static Pages Component
* **HTML5**: Structured semantic pages (`index.html`, `dashboard.html`, `rewards.html`, `day.html`).
* **CSS3**: Premium custom stylesheets (`styles.css`) using linear gradients, CSS glassmorphic blurs, custom font imports (Outfit, Space Grotesk, Anton), and pulsating animations.
* **JavaScript**: Modern ES6 script file (`script.js`) managing active indicators, page routing, form validations, and database syncing.

### React Application Component
* **Framework**: React 19, powered by Vite.
* **Styling**: TailwindCSS & custom component CSS.
* **Animations**: Pure CSS transitions and micro-interactions.
* **Build tool**: Vite + PostCSS.

---

## 📂 Project Structure

```bash
├── dashboard.html                  # HTML Dashboard layout page
├── day.html                        # HTML Day challenge page
├── index.html                      # HTML Registration onboarding landing page
├── rewards.html                    # HTML Rewards catalog page
├── script.js                       # Shared logic for static pages
├── styles.css                      # Global stylesheet (Custom styles, variables, & glass design)
├── package.json                    # Project configuration (Root server)
├── .gitignore                      # Git ignored files definition
├── session_summary.txt             # Paired session changes log
└── frontend/                       # React frontend source files
    ├── index.html                  # App root HTML
    ├── package.json                # Vite dependencies
    ├── tailwind.config.js          # Tailwind styling rules
    ├── postcss.config.js           # PostCSS compiler rules
    └── src/
        ├── App.jsx                 # React routing and main layouts
        ├── index.css               # Global Tailwind stylesheet
        ├── components/
            ├── Dashboard.jsx       # Dashboard grid card panels
            ├── Dashboard.css       # Flat dashboard overrides
            ├── Day.jsx             # Challenge Day 20 submission page
            ├── Day.css             # Challenge details styling rules
            ├── Rewards.jsx         # Rewards redemption panel
            └── RotatingText.jsx    # Animated hero taglines
```

---

## ⚙️ Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd ViCodathon_Shhivam
   ```

2. **Install Root and Frontend dependencies:**
   ```bash
   npm run install:all
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The script will launch Vite inside the frontend directory.*
   *Open **`http://localhost:5173`** in your browser.*

---

## 🚀 Deploying to Vercel

This repository is optimized for one-click Vercel deployments.

### How to Deploy:

1. **Push your code to GitHub**: Create a repository and push this project workspace.
2. **Connect Vercel**: Import the GitHub repository into your Vercel Dashboard.
3. **Configure Project Settings**:
   - **Framework Preset**: `Vite` (or `Other` if you choose static pages).
   - **Root Directory**: Select `frontend` (to deploy the React SPA).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Click Deploy**: Vercel will install dependencies, build the production bundle, and generate a live URL.
