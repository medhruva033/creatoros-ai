
import { useState } from "react";
import {
  Sparkles,
  LayoutDashboard,
  WandSparkles,
  Library,
  Settings,
  Bell,
  Search,
  Plus,
  Camera,
PlayCircle,
  Copy,
  Download,
  Zap,
  Hash,
  Clock3,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import "./App.css";

type ContentItem = {
  id: number;
  title: string;
  platform: string;
  tone: string;
  content: string;
};

const initialContent: ContentItem[] = [
  {
    id: 1,
    title: "The creator economy is changing",
    platform: "Instagram",
    tone: "Engaging",
    content:
      "Your next big idea doesn't need a big budget. It needs a clear message, consistency, and the courage to start. 🚀\n\nCreate something useful. Share what you learn. Improve with every post.\n\nSave this for your next content session.\n\n#ContentCreator #CreatorEconomy #DigitalGrowth",
  },
  {
    id: 2,
    title: "Build better habits",
    platform: "YouTube",
    tone: "Educational",
    content:
      "Want to get better at anything? Stop waiting for motivation.\n\n1. Pick one small goal.\n2. Make it easy to repeat.\n3. Track your progress.\n4. Review your results every week.\n\nConsistency beats intensity when you build it into your routine.",
  },
];

const demoTemplates: Record<string, string> = {
  Instagram:
    "Stop scrolling for a second. 👇\n\nYour next level starts when you stop waiting for the perfect moment and start taking action.\n\n✨ Start small.\n📈 Stay consistent.\n🔥 Keep improving.\n\nSave this post and come back to it when you need a reminder.\n\n#ContentCreation #CreatorGrowth #DigitalCreator #Motivation",
  YouTube:
    "HOOK: Most people make this mistake when they start creating content.\n\nBODY:\nThey spend too much time planning and not enough time publishing. Start with one useful idea, make it clear, and share it with your audience. Then use feedback to improve your next video.\n\nCTA: Subscribe for more practical creator tips.",
  TikTok:
    "POV: You finally stop overthinking your content and start posting. 🚀\n\nOne idea. One short video. One lesson learned.\n\nRepeat the process and get better every time.\n\n#CreatorTips #ContentCreator #GrowthMindset",
  LinkedIn:
    "A lesson I've learned about creating consistently:\n\nYou don't need to have everything figured out before you begin. You need a process that helps you learn, publish, and improve.\n\nStart with a small experiment. Measure the response. Keep what works.\n\nProgress comes from iteration.",
};

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Engaging");
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("Social media post");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<ContentItem | null>(null);
  const [library, setLibrary] = useState(initialContent);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const generateContent = () => {
    if (!topic.trim()) {
      showNotice("Enter a topic to generate content.");
      return;
    }

    setIsGenerating(true);
    setGenerated(null);

    window.setTimeout(() => {
      const template =
        demoTemplates[platform] ?? demoTemplates.Instagram;

      const result: ContentItem = {
        id: Date.now(),
        title: topic.trim(),
        platform,
        tone,
        content: `${topic.trim()}\n\n${template}\n\nTone: ${tone}\nFormat: ${contentType}`,
      };

      setGenerated(result);
      setIsGenerating(false);
      showNotice("Demo content generated successfully.");
    }, 900);
  };

  const copyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showNotice("Content copied to clipboard.");
    } catch {
      showNotice("Clipboard access unavailable in this browser.");
    }
  };

  const exportContent = (item: ContentItem) => {
    const blob = new Blob([item.content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice("Text file exported.");
  };

  const saveContent = (item: ContentItem) => {
    setLibrary((current) => {
      if (current.some((entry) => entry.id === item.id)) {
        showNotice("This item is already saved.");
        return current;
      }
      showNotice("Saved to your library.");
      return [item, ...current];
    });
  };

  const navigation = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "AI Studio", icon: WandSparkles },
    { label: "My Library", icon: Library },
  ];

  const selectedContent = activePage === "My Library" ? library : [];

  return (
    <div className="app-shell">
      {mobileMenu && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={21} />
          </div>
          <div>
            <div className="brand-name">
              CreatorOS<span> AI</span>
            </div>
            <div className="brand-caption">CREATOR WORKSPACE</div>
          </div>
          <button
            className="icon-button mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "active" : ""}`}
              onClick={() => {
                setActivePage(label);
                setMobileMenu(false);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === "My Library" && (
                <span className="nav-count">{library.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">
              <Zap size={17} />
            </div>
            <div className="upgrade-title">Create without limits</div>
            <p>Build your next big idea, one post at a time.</p>
            <button onClick={() => showNotice("You're using the demo workspace.")}>
              Explore workspace <span>↗</span>
            </button>
          </div>

          <button
            className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
            onClick={() => {
              setActivePage("Settings");
              setMobileMenu(false);
            }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <div className="profile">
            <div className="avatar">D</div>
            <div className="profile-copy">
              <strong>Creator</strong>
              <span>Free workspace</span>
            </div>
            <ChevronDown size={16} className="profile-chevron" />
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button menu-trigger"
              aria-label="Open navigation"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={20} />
            </button>
            <div className="breadcrumb">
              Workspace <span>/</span>{" "}
              <strong>{activePage}</strong>
            </div>
          </div>
          <div className="topbar-right">
            <div className="status-pill">
              <span className="status-dot" /> Demo mode
            </div>
            <button
              className="icon-button notification-button"
              aria-label="Notifications"
              onClick={() => showNotice("You're all caught up.")}
            >
              <Bell size={18} />
              <span />
            </button>
            <div className="top-avatar">D</div>
          </div>
        </header>

        <div className="page-content">
          {activePage === "Settings" ? (
            <section className="settings-page">
              <div className="eyebrow">PREFERENCES</div>
              <h1>Settings</h1>
              <p className="page-subtitle">
                Manage your local demo workspace.
              </p>
              <div className="settings-card">
                <h3>Workspace information</h3>
                <p>CreatorOS AI frontend prototype</p>
                <div className="settings-row">
                  <span>Content generation</span>
                  <span className="settings-value">Demo templates</span>
                </div>
                <div className="settings-row">
                  <span>Data storage</span>
                  <span className="settings-value">Local component state</span>
                </div>
                <div className="settings-row">
                  <span>Backend connection</span>
                  <span className="settings-value">Not connected</span>
                </div>
              </div>
            </section>
          ) : activePage === "My Library" ? (
            <section>
              <div className="eyebrow">YOUR WORKSPACE</div>
              <h1>My Library<span className="heading-period">.</span></h1>
              <p className="page-subtitle">
                Your saved content, ready to reuse and refine.
              </p>
              <div className="library-grid">
                {selectedContent.map((item) => (
                  <article className="library-card" key={item.id}>
                    <div className="library-card-top">
                      <span className="library-platform">
                        {item.platform}
                      </span>
                      <span className="library-tone">{item.tone}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <div className="library-actions">
                      <button onClick={() => copyContent(item.content)}>
                        <Copy size={15} /> Copy
                      </button>
                      <button onClick={() => exportContent(item)}>
                        <Download size={15} /> Export
                      </button>
                    </div>
                  </article>
                ))}
                {selectedContent.length === 0 && (
                  <div className="empty-state">
                    <Library size={30} />
                    <h3>Your library is waiting</h3>
                    <p>Save content from AI Studio to see it here.</p>
                    <button
                      className="primary-button"
                      onClick={() => setActivePage("AI Studio")}
                    >
                      Open AI Studio
                    </button>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <>
              <div className="welcome-row">
                <div>
                  <div className="eyebrow">
                    {activePage === "AI Studio"
                      ? "YOUR CREATIVE WORKSPACE"
                      : "MONDAY, YOUR WAY"}
                  </div>
                  <h1>
                    {activePage === "AI Studio"
                      ? "AI Studio"
                      : "Create something"} 
                    <span className="heading-period">.</span>
                  </h1>
                  <p className="page-subtitle">
                    Turn your ideas into content that connects.
                  </p>
                </div>
                <button
                  className="secondary-button new-project"
                  onClick={() => {
                    setTopic("");
                    setGenerated(null);
                    setActivePage("AI Studio");
                  }}
                >
                  <Plus size={16} /> New creation
                </button>
              </div>

              <div className="stats-grid">
                <article className="stat-card">
                  <div className="stat-icon purple">
                    <WandSparkles size={19} />
                  </div>
                  <div className="stat-label">Content saved</div>
                  <div className="stat-value">{library.length}</div>
                  <div className="stat-foot">In your library</div>
                </article>
                <article className="stat-card">
                  <div className="stat-icon cyan">
                    <Hash size={19} />
                  </div>
                  <div className="stat-label">Platforms</div>
                  <div className="stat-value">04</div>
                  <div className="stat-foot">Ready for your ideas</div>
                </article>
                <article className="stat-card">
                  <div className="stat-icon orange">
                    <Clock3 size={19} />
                  </div>
                  <div className="stat-label">Time saved</div>
                  <div className="stat-value">~2h</div>
                  <div className="stat-foot">Illustrative demo metric</div>
                </article>
              </div>

              <div className="studio-layout">
                <section className="generator-panel">
                  <div className="panel-heading">
                    <div className="panel-heading-icon">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h2>Content generator</h2>
                      <p>From rough idea to ready-to-edit content.</p>
                    </div>
                    <span className="demo-tag">DEMO</span>
                  </div>

                  <div className="form-section">
                    <label htmlFor="topic">What do you want to create?</label>
                    <textarea
                      id="topic"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                      placeholder="e.g. 5 habits that changed my productivity..."
                      rows={4}
                    />
                    <div className="input-hint">
                      Be specific. A topic, audience, or key message works well.
                    </div>
                  </div>

                  <div className="form-section">
                    <label>Choose a platform</label>
                    <div className="platform-grid">
                      {[
                        { name: "Instagram", icon: Camera },
                        { name: "YouTube", icon: PlayCircle },
                        { name: "TikTok", icon: Zap },
                        { name: "LinkedIn", icon: Search },
                      ].map(({ name, icon: Icon }) => (
                        <button
                          key={name}
                          className={`platform-option ${platform === name ? "selected" : ""}`}
                          onClick={() => setPlatform(name)}
                        >
                          <Icon size={17} />
                          {name}
                          {platform === name && (
                            <span className="selected-check">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-section">
                      <label htmlFor="format">Content format</label>
                      <select
                        id="format"
                        value={contentType}
                        onChange={(event) => setContentType(event.target.value)}
                      >
                        <option>Social media post</option>
                        <option>Short video script</option>
                        <option>Caption and hashtags</option>
                        <option>Content idea</option>
                      </select>
                    </div>
                    <div className="form-section">
                      <label htmlFor="tone">Writing tone</label>
                      <select
                        id="tone"
                        value={tone}
                        onChange={(event) => setTone(event.target.value)}
                      >
                        <option>Engaging</option>
                        <option>Professional</option>
                        <option>Educational</option>
                        <option>Funny</option>
                        <option>Inspirational</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="primary-button generate-button"
                    onClick={generateContent}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <span className="loading-spinner" />
                    ) : (
                      <Sparkles size={18} />
                    )}
                    {isGenerating ? "Creating your content..." : "Generate content"}
                    {!isGenerating && <span className="button-shortcut">↗</span>}
                  </button>
                  <p className="demo-disclaimer">
                    Demo only · Uses sample templates, not a live AI model.
                  </p>
                </section>

                <section className="output-panel">
                  <div className="output-heading">
                    <div>
                      <div className="eyebrow">YOUR RESULTS</div>
                      <h2>Content preview</h2>
                    </div>
                    <span className="live-indicator">
                      <span /> Preview
                    </span>
                  </div>

                  {isGenerating ? (
                    <div className="generating-state">
                      <div className="generating-orb">
                        <Sparkles size={25} />
                      </div>
                      <h3>Preparing your draft</h3>
                      <p>Putting your idea into shape...</p>
                      <div className="skeleton-line" />
                      <div className="skeleton-line short" />
                      <div className="skeleton-line" />
                    </div>
                  ) : generated ? (
                    <div className="generated-result">
                      <div className="result-meta">
                        <span className="result-platform">{generated.platform}</span>
                        <span>{generated.tone}</span>
                      </div>
                      <h3>{generated.title}</h3>
                      <pre>{generated.content}</pre>
                      <div className="result-actions">
                        <button
                          className="primary-button"
                          onClick={() => copyContent(generated.content)}
                        >
                          <Copy size={15} /> Copy content
                        </button>
                        <button
                          className="secondary-button"
                          onClick={() => saveContent(generated)}
                        >
                          <Plus size={15} /> Save
                        </button>
                        <button
                          className="icon-button"
                          aria-label="Export content"
                          onClick={() => exportContent(generated)}
                        >
                          <Download size={17} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="output-empty">
                      <div className="preview-art">
                        <div className="art-window">
                          <div className="art-window-top">
                            <span /><span /><span />
                          </div>
                          <div className="art-sparkle"><Sparkles size={25} /></div>
                          <div className="art-line" />
                          <div className="art-line small" />
                          <div className="art-blocks">
                            <span /><span /><span />
                          </div>
                        </div>
                        <div className="floating-chip chip-one">
                         <Camera size={17} />
                        </div>
                        <div className="floating-chip chip-two">
                          <Sparkles size={17} />
                        </div>
                      </div>
                      <h3>Your next idea starts here</h3>
                      <p>
                        Add a topic, choose your platform, and generate a draft
                        to preview your content.
                      </p>
                      <div className="empty-hint">
                        <Sparkles size={14} /> Your creative canvas awaits
                      </div>
                    </div>
                  )}
                </section>
              </div>

              {activePage === "Dashboard" && (
                <section className="recent-section">
                  <div className="section-title-row">
                    <div>
                      <h2>Recent inspiration</h2>
                      <p>Starter examples to help you get moving.</p>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => setActivePage("My Library")}
                    >
                      View library <span>→</span>
                    </button>
                  </div>
                  <div className="recent-grid">
                    {initialContent.map((item, index) => (
                      <article className="recent-card" key={item.id}>
                        <div className={`recent-art recent-art-${index + 1}`}>
                          {index === 0 ? (
                            <Camera size={25} />
                          ) : (
                            <PlayCircle size={25} />
                          )}
                          <span>{index === 0 ? "CREATOR NOTES" : "GROWTH PLAYBOOK"}</span>
                        </div>
                        <div className="recent-card-body">
                          <div className="recent-meta">
                            {item.platform} <span>·</span> {item.tone}
                          </div>
                          <h3>{item.title}</h3>
                          <button
                            onClick={() => {
                              setTopic(item.title);
                              setPlatform(item.platform);
                              setTone(item.tone);
                              setActivePage("AI Studio");
                            }}
                          >
                            Use this idea <span>↗</span>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      {notice && <div className="toast-message">{notice}</div>}
    </div>
  );
}

export default App;
