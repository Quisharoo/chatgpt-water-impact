ChatGPT Water Impact Analyzer
==============================

A simple, visual tool to analyze the water consumption impact of your ChatGPT usage. Drop in your ChatGPT export `.zip` (or `conversations.json`) and get instant insights into your environmental footprint.

## 🔒 Privacy First

**Your data never leaves your device.** This app runs 100% in your browser—no uploads, no servers, no tracking. All file processing, parsing, and analysis happens locally using JavaScript. You can verify this yourself by checking your browser's Network tab (F12) or even running the app offline.

## 🚀 Live Demo

**[View Live Demo →](https://chatgpt-water-impact.vercel.app/)**

> Upload your ChatGPT data or click **"Try Sample Data"** to see instant analytics without any setup!

## 🖼️ Screenshot

![ChatGPT Water Impact Analyzer Screenshot](.github/assets/screenshot.png)

*Upload your ChatGPT export and instantly see your water consumption visualized with meaningful comparisons and analytics*

> **Note:** Don't have your ChatGPT data? Try the **"Try Sample Data"** button to see a live demo!

Why this exists
---------------

Large language models consume water indirectly through data center cooling and power generation. This project turns your personal ChatGPT conversation history into practical water consumption stats and relatable comparisons you can understand.

What it does
------------

- Calculates estimated water use from your conversations over time
- Visualizes daily/weekly/monthly trends
- Provides relatable comparisons (e.g., showers, glasses of water)
- Works with ChatGPT export `.zip` or `conversations.json`
- **Processes everything locally in your browser—no data transmission**

How Privacy Works
-----------------

### Client-Side Only Architecture

All data processing happens in your browser:

1. **File Reading**: When you select a file, it's read directly into browser memory using the `FileReader` API
2. **ZIP Extraction**: If you upload a `.zip`, it's extracted client-side using JSZip
3. **Parsing**: Your `conversations.json` is parsed using JavaScript—no server involved
4. **Calculations**: Water consumption estimates are calculated locally
5. **Visualization**: Charts are generated in your browser using Chart.js

### Verify It Yourself

**Option 1: Network Monitoring**
- Open Developer Tools (F12)
- Go to the Network tab
- Upload your file
- You'll see only static asset loads—no POST/PUT requests with your data

**Option 2: Offline Test**
- Load the page
- Disconnect from the internet
- Upload and analyze your file
- Everything still works because it's 100% local

**Option 3: Review the Code**
- Check `client/src/lib/conversation-parser.ts` for parsing logic
- Check `client/src/lib/water-calculator.ts` for calculation logic
- No server endpoints handle user data

Getting your ChatGPT data
-------------------------

1. Open ChatGPT → Settings → Data Controls → Export data
2. You’ll receive an email with a download link to a `.zip` containing `conversations.json`
3. Upload that `.zip` here (preferred) or extract and upload `conversations.json`

Quick start
----------

- Node.js 20+
- Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and upload your `.zip` or `conversations.json`.

Deployment
----------

This project is configured for easy deployment to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Quisharoo/chatgpt-water-impact)

Tech stack
---------

**Client-Side (Where Your Data Is Processed):**
- React + TypeScript for the UI
- Vite for build tooling
- Tailwind CSS + shadcn/ui for styling
- Chart.js for visualizations
- JSZip for client-side ZIP parsing
- FileReader API for local file access

**Server-Side (Static Hosting Only):**
- Express serves the static built files
- No server-side data processing
- No database storage of user data
- Optional features use Drizzle ORM + Neon (not for user uploads)

Background
---------

This is a weekend project exploring how to make AI environmental costs tangible. It’s not a perfect lifecycle analysis—just a personal lens on usage.

License
------

MIT


