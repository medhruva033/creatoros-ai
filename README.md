# CreatorOS AI ✨

**An AI-powered content creation studio frontend built for modern content creators.**

CreatorOS AI is a sleek, responsive dashboard designed to help creators plan and prepare social media content for multiple platforms from one workspace. It features a content generation interface, platform and tone selection, content previews, and a library for saved drafts.

> **Project status:** Frontend prototype. Content generation currently uses predefined demo templates; a live AI API, backend, and database have not yet been integrated.

## 🚀 Features

- **Modern Dashboard** — Dark-themed interface with violet and cyan accents.
- **Content Generator** — Enter a topic and generate a sample content draft.
- **Multi-Platform Support** — Instagram, YouTube, TikTok, and LinkedIn.
- **Customizable Tone** — Choose from engaging, professional, educational, funny, and inspirational styles.
- **Multiple Content Formats** — Social media posts, short video scripts, captions with hashtags, and content ideas.
- **Content Preview** — Review generated drafts before using them.
- **Copy & Export** — Copy content to the clipboard or export it as a `.txt` file.
- **Content Library** — Save drafts and access them from the library during the current session.
- **Responsive Design** — Layout adapts to desktop and mobile-sized screens.
- **Workspace Navigation** — Dashboard, AI Studio, My Library, and Settings.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | User interface and reusable components |
| TypeScript | Type-safe application development |
| Vite | Development server and production build |
| CSS3 | Styling, responsive layouts, and animations |
| Lucide React | Interface icons |
| HTML5 | Application entry point |

## 📸 Application Overview

The dashboard includes:

- A sidebar for workspace navigation
- Content generation controls
- Platform and tone selectors
- A content preview panel
- Recent content inspiration cards
- A saved-content library

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) — preferably a current LTS version
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/medhruva033/creatoros-ai.git
```

### 2. Navigate to the project

```bash
cd creatoros-ai
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, usually `http://localhost:5173/`.

### 5. Build for production

```bash
npm run build
```

Vite generates the production build in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```text
creatoros-ai/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Generator.tsx
│   │   ├── Sidebar.tsx
│   │   └── ResultCard.txs
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## 🧪 Current Limitations

CreatorOS AI is currently a frontend prototype.

- Generated content comes from predefined templates, not a live AI model.
- No backend or database is connected.
- Authentication and user accounts are not implemented.
- Saved content is held in application state and may disappear after a full page refresh.
- Social media publishing and scheduling are not implemented.

## 🗺️ Roadmap

- [ ] Integrate a real AI model through a secure backend.
- [ ] Add persistent storage for generated content.
- [ ] Implement user authentication.
- [ ] Add content editing and regeneration.
- [ ] Introduce content history and reusable templates.
- [ ] Deploy a production version.
- [ ] Explore social media scheduling and publishing integrations.

## 🔐 Security

The current frontend prototype does not require an AI API key. When AI integration is introduced, API credentials should be stored on the server and must not be exposed in client-side code or committed to GitHub.

## 👨‍💻 Author

**Dhruva M. K.**

- GitHub: [@medhruva033](https://github.com/medhruva033)
- Project: [CreatorOS AI](https://github.com/medhruva033/creatoros-ai)

## 📄 License

No license has been added yet. All rights are reserved by default unless a license is added to the repository.

---

*Built with React, TypeScript, Vite, and a focus on creator productivity.*
