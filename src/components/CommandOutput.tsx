import { Github, ExternalLink } from "lucide-react";

interface CommandOutputProps {
  command: string;
}

const CommandOutput = ({ command }: CommandOutputProps) => {
  const renderWhoami = () => (
    <div className="space-y-3 text-terminal-white animate-fade-in">
      <div className="text-terminal-green animate-glow">
        ╔════════════════════════════════════════╗ ║ DEVELOPER PROFILE ║
        ╚════════════════════════════════════════╝
      </div>
      <div className="ml-2 sm:ml-4 space-y-2 bg-black/20 p-3 sm:p-4 rounded border-l-2 border-terminal-green">
        <div>
          <span className="text-terminal-green font-semibold">Name:</span>{" "}
          <span className="text-white">Shivam Prajapati</span>
        </div>
        <div>
          <span className="text-terminal-green font-semibold">Role:</span>{" "}
          <span className="text-white">Full Stack Developer</span>
        </div>
        <div>
          <span className="text-terminal-green font-semibold">Experience:</span>{" "}
          <span className="text-white">5+ years</span>
        </div>
        <div>
          <span className="text-terminal-green font-semibold">Location:</span>{" "}
          <span className="text-white">India</span>
        </div>
        <div>
          <span className="text-terminal-green font-semibold">Status:</span>{" "}
          <span className="text-green-400 animate-pulse">
            Available for opportunities
          </span>
        </div>
      </div>
      <div className="mt-4 p-3 sm:p-4 bg-terminal-bg/50 rounded border border-terminal-green-dim">
        <p className="text-terminal-gray leading-relaxed text-sm sm:text-base">
          Passionate full-stack developer specializing in React, Node.js, and
          cloud technologies. I love building scalable applications and solving
          complex problems with elegant code.
        </p>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4 text-terminal-white animate-fade-in">
      <div className="text-terminal-green animate-glow text-sm sm:text-base">
        ╔════════════════════════════════════════╗ ║ PROJECT PORTFOLIO ║
        ╚════════════════════════════════════════╝
      </div>
      <div className="space-y-4">
        {[
          {
            id: "01",
            title: "E-Commerce Platform",
            tech: "React • Node.js • PostgreSQL • AWS",
            desc: "Full-stack e-commerce solution with real-time inventory management and payment processing",
            repo: "https://github.com/shivam/ecommerce-platform",
            live: "https://ecommerce-demo.com",
            status: "ACTIVE",
          },
          {
            id: "02",
            title: "Task Management App",
            tech: "React Native • Firebase • Redux",
            desc: "Cross-platform mobile app for team collaboration with real-time synchronization",
            repo: "https://github.com/shivam/task-manager",
            live: "https://taskmanager-demo.com",
            status: "BETA",
          },
          {
            id: "03",
            title: "AI Chat Bot",
            tech: "Python • TensorFlow • FastAPI",
            desc: "Intelligent chatbot with natural language processing and machine learning capabilities",
            repo: "https://github.com/shivam/ai-chatbot",
            live: "https://chatbot-demo.com",
            status: "DEV",
          },
        ].map((project, index) => (
          <div
            key={index}
            className="bg-black/30 rounded border border-terminal-green-dim/50 p-3 sm:p-4 hover:border-terminal-green transition-all duration-300"
          >
            {/* Terminal-style header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 text-xs sm:text-sm font-mono">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <span className="text-terminal-green">[{project.id}]</span>
                <span className="text-terminal-white font-semibold">
                  {project.title}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    project.status === "ACTIVE"
                      ? "bg-green-900/50 text-green-400"
                      : project.status === "BETA"
                      ? "bg-yellow-900/50 text-yellow-400"
                      : "bg-blue-900/50 text-blue-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="text-terminal-gray-dim">
                ~/{project.title.toLowerCase().replace(/\s+/g, "-")}
              </div>
            </div>

            {/* Project details in terminal format */}
            <div className="space-y-2 text-sm">
              <div className="flex flex-wrap items-start">
                <span className="text-terminal-green min-w-[60px] sm:min-w-[80px]">
                  tech:
                </span>
                <span className="text-terminal-gray font-mono text-xs sm:text-sm">
                  {project.tech}
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-terminal-green min-w-[60px] sm:min-w-[80px]">
                  desc:
                </span>
                <span className="text-terminal-white flex-1">
                  {project.desc}
                </span>
              </div>
            </div>

            {/* Terminal-style action buttons */}
            <div className="mt-4 pt-3 border-t border-terminal-green-dim/30">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center sm:justify-start gap-2 px-3 py-2 bg-terminal-bg/50 border border-terminal-green-dim rounded text-xs sm:text-sm text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-all duration-200 font-mono"
                >
                  <Github size={14} />
                  <span>git clone repo</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center sm:justify-start gap-2 px-3 py-2 bg-terminal-green/10 border border-terminal-green rounded text-xs sm:text-sm text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-all duration-200 font-mono"
                >
                  <ExternalLink size={14} />
                  <span>./run --live</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal footer */}
      <div className="text-terminal-gray-dim text-xs font-mono mt-4 p-2 bg-black/20 rounded border border-terminal-green-dim/30">
        <span className="text-terminal-green">$</span> ls -la projects/ | wc -l
        <br />
        <span className="ml-2">3 projects found</span>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4 text-terminal-white animate-fade-in">
      <div className="text-terminal-green animate-glow text-sm sm:text-base">
        ╔════════════════════════════════════════╗ ║ SKILL MATRIX ║
        ╚════════════════════════════════════════╝
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
        {/* Frontend Skills */}
        <div className="bg-black/20 p-3 sm:p-4 rounded border border-terminal-green-dim">
          <div className="text-terminal-green font-semibold mb-3 text-sm sm:text-base">
            Frontend:
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            {[
              { skill: "React/Next.js", level: 95 },
              { skill: "TypeScript", level: 90 },
              { skill: "Tailwind CSS", level: 95 },
              { skill: "Vue.js", level: 75 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="min-w-0 flex-1 mr-2">{item.skill}</span>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="w-16 sm:w-20 bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-terminal-green h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-terminal-green w-8 text-right">
                    {item.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Skills */}
        <div className="bg-black/20 p-3 sm:p-4 rounded border border-terminal-green-dim">
          <div className="text-terminal-green font-semibold mb-3 text-sm sm:text-base">
            Backend:
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            {[
              { skill: "Node.js", level: 90 },
              { skill: "Python", level: 85 },
              { skill: "PostgreSQL", level: 90 },
              { skill: "Docker", level: 80 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="min-w-0 flex-1 mr-2">{item.skill}</span>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="w-16 sm:w-20 bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-terminal-green h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-terminal-green w-8 text-right">
                    {item.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-4 text-terminal-white animate-fade-in">
      <div className="text-terminal-green animate-glow text-sm sm:text-base">
        ╔════════════════════════════════════════╗ ║ CONTACT INFO ║
        ╚════════════════════════════════════════╝
      </div>
      <div className="bg-black/20 p-4 sm:p-6 rounded border border-terminal-green-dim">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            { icon: "📧", label: "Email", value: "shivam.dev@example.com" },
            {
              icon: "💼",
              label: "LinkedIn",
              value: "linkedin.com/in/shivamprajapati",
            },
            {
              icon: "🐙",
              label: "GitHub",
              value: "github.com/shivamprajapati",
            },
            { icon: "🌐", label: "Website", value: "shivam.portfolio.com" },
            { icon: "📱", label: "Phone", value: "+91 98765 43210" },
          ].map((contact, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-black/30 rounded transition-colors"
            >
              <span className="text-base sm:text-lg flex-shrink-0">
                {contact.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-terminal-green text-xs sm:text-sm font-semibold">
                  {contact.label}:
                </div>
                <div className="text-terminal-white text-xs sm:text-sm break-all">
                  {contact.value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-terminal-bg/50 rounded border border-terminal-green-dim">
          <p className="text-terminal-gray text-xs sm:text-sm leading-relaxed">
            Feel free to reach out for collaborations, opportunities, or just to
            say hi! 👋
          </p>
        </div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-3 text-terminal-white animate-fade-in">
      <div className="text-terminal-green font-semibold text-sm sm:text-base">
        Available commands:
      </div>
      <div className="bg-black/20 p-3 sm:p-4 rounded border border-terminal-green-dim">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
          {[
            { cmd: "whoami", desc: "Display developer information" },
            { cmd: "projects", desc: "Show portfolio projects" },
            { cmd: "skills", desc: "List technical skills" },
            { cmd: "contact", desc: "Get contact information" },
            { cmd: "clear", desc: "Clear the terminal" },
            { cmd: "help", desc: "Show this help message" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex space-x-2 sm:space-x-3 p-2 hover:bg-black/30 rounded transition-colors"
            >
              <span className="text-terminal-green font-mono font-semibold min-w-[60px] sm:min-w-[80px] flex-shrink-0">
                {item.cmd}
              </span>
              <span className="text-terminal-gray">- {item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderError = (cmd: string) => (
    <div className="text-red-400 animate-fade-in">
      <div className="flex items-center space-x-2">
        <span>❌</span>
        <span className="text-sm sm:text-base">
          bash: {cmd}: command not found
        </span>
      </div>
      <div className="text-terminal-gray text-xs sm:text-sm mt-2 ml-6">
        Type 'help' to see available commands
      </div>
    </div>
  );

  switch (command) {
    case "whoami":
      return renderWhoami();
    case "projects":
      return renderProjects();
    case "skills":
      return renderSkills();
    case "contact":
      return renderContact();
    case "help":
      return renderHelp();
    case "clear":
      return <div></div>;
    case "":
      return <div></div>;
    default:
      return renderError(command);
  }
};

export default CommandOutput;
