<p align="center">
  <img src="public/favicon.svg" alt="Rakhi Wishes" width="80" />
</p>

<h1 align="center">Rakhi Wishes</h1>

<p align="center">
  <strong>Digital Raksha Bandhan Letter Platform</strong><br/>
  Create beautiful, personalized digital Rakhi wishes and share them with a unique link.
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#features">Features</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#deployment">Deployment</a>
</p>

---

## What is Rakhi Wishes?

Rakhi Wishes lets users create personalized digital Raksha Bandhan letters. Pick a Rakhi design, write a heartfelt message, and generate a shareable link. The recipient opens the link, sees an elegant animated greeting card, and taps to flip it open and read the message.

## Features

- **Rakhi Selection** — 6 curated designs with interactive selection and visual feedback
- **Personalization** — Recipient name + personal message with 15 preset templates across 5 categories (Emotional, Sweet, Funny, Short, Traditional)
- **Live Preview** — Real-time preview of the letter as you compose it
- **3D Letter Flip** — Smooth Y-axis rotation with entrance animation and hint gesture
- **Message Reveal** — Staggered fade-in with decorative elements and subtle particles
- **Shareable Links** — Unique `/wish/[id]` URLs with Copy Link and Web Share API
- **Responsive** — Mobile-first design tested at 320px–1440px
- **Accessible** — Keyboard navigation, ARIA labels, focus states, reduced motion support
- **SEO Ready** — Open Graph metadata, semantic HTML, meta descriptions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | CSS Custom Properties (design tokens) |
| Routing | React Router v7 |
| Backend | Express 5 |
| Database | PostgreSQL (Supabase) |
| Linting | oxlint |

## Project Structure

```
Rakhi Wishes/
├── public/
│   └── favicon.svg              # Custom Rakhi-themed favicon
├── server/
│   ├── index.ts                 # Express server entry point
│   ├── db.ts                    # PostgreSQL connection pool
│   ├── rateLimit.ts             # In-memory rate limiter
│   ├── init-db.ts               # Database schema initialization
│   └── routes/
│       └── wishes.ts            # POST/GET /api/wishes
├── src/
│   ├── components/
│   │   ├── DigitalLetter.tsx     # 3D flip letter wrapper
│   │   ├── Hero.tsx             # Landing hero section
│   │   ├── LetterBack.tsx       # Letter back (message)
│   │   ├── LetterFront.tsx      # Letter front (Rakhi + name)
│   │   ├── RakhiSelection.tsx   # Interactive Rakhi grid
│   │   ├── ShareButtons.tsx     # Copy + Web Share API
│   │   ├── WishForm.tsx         # Name + message + presets
│   │   └── WishPreview.tsx      # Live preview card
│   ├── data/
│   │   ├── presetMessages.ts    # 15 preset messages
│   │   └── rakhis.ts            # 6 Rakhi designs
│   ├── pages/
│   │   ├── CreateWishPage.tsx   # Sender experience
│   │   ├── LetterPage.tsx       # Letter preview
│   │   └── WishPage.tsx         # Recipient view
│   ├── styles/
│   │   ├── variables.css        # Design tokens
│   │   ├── global.css           # Resets + typography
│   │   ├── components.css       # Button, input, card
│   │   ├── animations.css       # Keyframes + utilities
│   │   └── index.css            # Aggregator
│   ├── utils/
│   │   ├── wishId.ts            # ID generation
│   │   └── wishStore.ts         # API client
│   ├── App.tsx                  # Router + state management
│   └── main.tsx                 # Entry point
├── .env                          # Environment variables (git-ignored)
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Quick Start

### Prerequisites

- Node.js 18+
- A PostgreSQL database (Supabase, Neon, or local)

### 1. Clone and install

```bash
git clone https://github.com/tallapallimanikanta/Rakhi Wishes.git
cd Rakhi Wishes
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://username:password@host:5432/dbname
PORT=3001
```

### 3. Initialize the database

```bash
npm run db:init
```

This creates the `wishes` table if it doesn't exist.

### 4. Start development

```bash
npm run dev
```

This runs both the Vite dev server (port 5173) and Express API (port 3001) concurrently.

Open [http://localhost:5173](http://localhost:5173).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend concurrently |
| `npm run dev:client` | Start Vite dev server only |
| `npm run dev:server` | Start Express server only |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |
| `npm run db:init` | Initialize database schema |

## API Endpoints

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| `POST` | `/api/wishes` | `{ id, rakhiId, recipientName, message }` | `201` — Created wish |
| `GET` | `/api/wishes/:id` | — | `200` — Wish data, or `404` |
| `GET` | `/api/health` | — | `200` — `{ status: "ok" }` |

### Error Responses

```json
{ "error": "Invalid wish ID format" }       // 400
{ "error": "Wish not found" }               // 404
{ "error": "Wish already exists" }          // 409
{ "error": "Too many wish requests..." }    // 429
{ "error": "Failed to create wish" }        // 500
```

## Database Schema

```sql
CREATE TABLE wishes (
  id            VARCHAR(8) PRIMARY KEY,
  rakhi_id      VARCHAR(50) NOT NULL,
  recipient_name VARCHAR(50) NOT NULL,
  message       VARCHAR(500) NOT NULL,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Architecture Decisions

### Why this stack?

- **Vite** — Fastest dev server and build tool for React. Sub-second HMR.
- **Express** — Minimal, well-understood. No framework overhead for 2 endpoints.
- **Supabase PostgreSQL** — Free tier, hosted, no server management. Standard SQL.
- **CSS Custom Properties** — No CSS-in-JS runtime. Tokens are themeable and portable.
- **No state management library** — `useState` + prop drilling is sufficient for this app's complexity.

### Security

- All input validated server-side (types, lengths, required fields)
- Parameterized SQL queries (no injection)
- Rate limiting: 20 requests/minute per IP on wish creation
- `.env` git-ignored — database credentials never committed
- No `dangerouslySetInnerHTML` — all content rendered as text
- Express JSON body limit: 10KB

### Performance

- **JS bundle**: ~81KB gzipped (React + Router + app code)
- **CSS**: ~7.5KB gzipped (design system + components)
- **Fonts**: Google Fonts with `display=swap` for non-blocking render
- **Animations**: Respect `prefers-reduced-motion` — all animations disabled
- **Lazy images**: `loading="lazy"` on Rakhi images when real assets are added

## Deployment

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PORT` | No | Server port (default: 3001) |

### Deploy to Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add `DATABASE_URL` in the Variables tab
4. Railway auto-deploys on every push
5. Run `npx tsx server/init-db.ts` in the Railway shell (one-time)

### Deploy to Render

1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Build command: `npm install && npm run build`
4. Start command: `npm run dev:server`
5. Add `DATABASE_URL` as environment variable

### Deploy to Fly.io

```bash
fly launch
fly secrets set DATABASE_URL="postgresql://..."
fly deploy
```

## Roadmap

- [ ] Real Rakhi artwork (replace gradient placeholders)
- [ ] Animated entrance for recipient letter
- [ ] Custom Rakhi upload by sender
- [ ] Multiple language support
- [ ] Email delivery integration
- [ ] Wish analytics (views, flips)
- [ ] Dark mode

## License

MIT

---

<p align="center">
  Made with ❤️ for Raksha Bandhan
</p>
