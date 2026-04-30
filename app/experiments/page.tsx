import { FlaskConical, ExternalLink } from "lucide-react";

const experiments = [
  {
    name: "AI Wordbook",
    desc: "Spaced repetition vocabulary learning powered by AI. Generate word lists, track progress, remember forever.",
    tags: ["AI", "Learning", "React"],
    status: "paused",
    emoji: "📖",
  },
  {
    name: "Food Menu App",
    desc: "Daily meal decision helper. Built with Trae AI, exploring solo-agent development patterns.",
    tags: ["Vue", "Trae AI", "Experiment"],
    status: "active",
    emoji: "🍽",
  },
  {
    name: "Graphify Integration",
    desc: "Exploring knowledge graph-based code understanding. Token compression ratio 71.5x vs traditional RAG.",
    tags: ["Graph", "AI", "Research"],
    status: "research",
    emoji: "🕸",
  },
];

const statusMap = {
  active: { label: "Active", color: "text-neon-green" },
  paused: { label: "Paused", color: "text-neon-amber" },
  research: { label: "Research", color: "text-neon-purple" },
};

export default function ExperimentsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Experiments</h1>
        <p className="text-text-secondary">
          Playground for ideas, prototypes, and things I'm exploring.
        </p>
      </div>

      <div className="grid gap-4">
        {experiments.map((exp, i) => {
          const status = statusMap[exp.status as keyof typeof statusMap];
          return (
            <div
              key={exp.name}
              className={`card-glow rounded-xl p-6 animate-slide-up stagger-${i + 1}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{exp.emoji}</span>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-text-primary">
                      {exp.name}
                    </h3>
                    <span className={`text-xs font-mono ${status.color}`}>
                      ● {status.label}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag tag-purple">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card-glow rounded-xl p-6 text-center">
        <FlaskConical className="w-8 h-8 text-neon-cyan mx-auto mb-3" />
        <p className="text-text-secondary text-sm">
          More experiments coming soon. Follow my GitHub to see what I'm building.
        </p>
      </div>
    </div>
  );
}
