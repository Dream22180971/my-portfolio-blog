import { MapPin, GraduationCap, Briefcase, Code2 } from "lucide-react";

const timeline = [
  {
    year: "2026",
    title: "AI Agent Developer",
    desc: "Transitioning to AI development. Building RAG systems, AI agents, and exploring LangGraph/LangChain ecosystem.",
    icon: "🤖",
  },
  {
    year: "2024",
    title: "Automated Testing Engineer",
    desc: "Working in QA with focus on test automation, CI/CD pipelines, and Python scripting.",
    icon: "🧪",
  },
  {
    year: "Education",
    title: "Computer Science Foundation",
    desc: "Solid background in algorithms, data structures, and software engineering principles.",
    icon: "📚",
  },
];

const skills = {
  "AI & LLM": [
    "LangChain",
    "LangGraph",
    "RAG Systems",
    "FAISS",
    "DashScope",
    "Coze Platform",
    "Prompt Engineering",
  ],
  "Frontend": ["Next.js", "React", "TypeScript", "Vue 3", "TailwindCSS"],
  "Backend": ["Python", "FastAPI", "Node.js", "SQLite"],
  "Tools": ["Git", "Docker", "GitHub Actions", "Vercel"],
};

const values = [
  {
    title: "Build to Learn",
    desc: "Every project is a learning opportunity. I ship code to understand concepts deeply.",
  },
  {
    title: "Production First",
    desc: "Clean, maintainable code over quick hacks. Real projects > toy demos.",
  },
  {
    title: "Share Openly",
    desc: "Open source everything. Documentation is a love letter to your future self.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">About Me</h1>
        <p className="text-text-secondary">
          Automated testing engineer → AI Agent developer
        </p>
      </div>

      {/* Intro */}
      <section className="card-glow rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-2xl font-bold text-white">
            SW
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-primary">seanwalter</h2>
            <p className="text-sm text-text-secondary">Dream22180971</p>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed">
          Based in Nanjing, China. Former automated testing engineer, now on a mission to 
          become an AI Agent developer. I spend my days building RAG knowledge bases, 
          experimenting with multi-agent systems, and preparing for IELTS to level up 
          my English skills.
        </p>
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neon-cyan" />
            Nanjing, China
          </span>
          <a
            href="https://github.com/Dream22180971"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-neon-cyan transition-colors"
          >
            <Code2 className="w-4 h-4" />
            github.com/Dream22180971
          </a>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Journey</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-space-border" />
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-10 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="absolute left-2 w-4 h-4 rounded-full bg-space-card border-2 border-neon-cyan" />
                <div className="card-glow rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-mono text-neon-cyan">{item.year}</span>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Skills</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(skills).map(([category, items], i) => (
            <div
              key={category}
              className={`card-glow rounded-xl p-5 animate-slide-up stagger-${Math.min(i + 1, 5)}`}
            >
              <h3 className="font-mono text-sm text-neon-cyan mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="tag tag-cyan">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Values</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {values.map((value, i) => (
            <div
              key={value.title}
              className={`card-glow rounded-xl p-5 text-center animate-slide-up stagger-${i + 1}`}
            >
              <h3 className="font-semibold text-text-primary mb-2">{value.title}</h3>
              <p className="text-sm text-text-secondary">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
