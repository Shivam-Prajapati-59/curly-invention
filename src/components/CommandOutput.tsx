import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Zap,
  Code,
  Database,
  Globe,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";

interface CommandOutputProps {
  command: string;
}

const CommandOutput = ({ command }: CommandOutputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Sound effects
  const playSound = (
    frequency: number,
    duration: number,
    type: OscillatorType = "sine"
  ) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(
      frequency,
      audioContextRef.current.currentTime
    );
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContextRef.current.currentTime + duration
    );

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const playKeyboardSound = () => playSound(800, 0.05, "square");
  const playBeepSound = () => playSound(1000, 0.1, "sine");
  const playErrorSound = () => playSound(200, 0.3, "sawtooth");
  const playSuccessSound = () => {
    playSound(523, 0.1);
    setTimeout(() => playSound(659, 0.1), 100);
    setTimeout(() => playSound(784, 0.15), 200);
  };

  // Trigger animations on command change
  useEffect(() => {
    if (command) {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
        if (command === "clear" || command === "") {
          // No sound for clear/empty
        } else if (
          ["whoami", "projects", "skills", "contact", "help"].includes(command)
        ) {
          playSuccessSound();
        } else {
          playErrorSound();
        }
      }, 100);
    }
  }, [command]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const MatrixRain = () => {
    const [drops, setDrops] = useState<number[]>([]);

    useEffect(() => {
      const initDrops = Array.from({ length: 20 }, () => Math.random() * -100);
      setDrops(initDrops);

      const animateDrops = () => {
        setDrops((prev) =>
          prev.map((drop) => (drop > 100 ? Math.random() * -100 : drop + 2))
        );
      };

      const interval = setInterval(animateDrops, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        {drops.map((drop, index) => (
          <div
            key={index}
            className="absolute text-terminal-green text-xs font-mono animate-pulse"
            style={{
              left: `${(index * 5) % 100}%`,
              top: `${drop}%`,
              transform: "translateY(-50%)",
            }}
          >
            {String.fromCharCode(0x30a0 + Math.random() * 96)}
          </div>
        ))}
      </div>
    );
  };

  const GlitchText = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 animate-glitch-1 text-red-500 opacity-80">
        {children}
      </div>
      <div className="absolute inset-0 animate-glitch-2 text-blue-500 opacity-80">
        {children}
      </div>
      <div className="relative">{children}</div>
    </div>
  );

  const ScanLine = () => (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-terminal-green to-transparent animate-scan-line opacity-20" />
    </div>
  );

  const ProgressBar = ({ value, label }: { value: number; label: string }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = value / 30; // Reduced steps for smoother animation
        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(counter);
            // Removed playBeepSound() call
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, 30); // Slightly longer intervals for smoother animation

        return () => clearInterval(counter); // Return cleanup function
      }, Math.random() * 500); // Reduced random delay

      return () => clearTimeout(timer);
    }, [value]);

    return (
      <div className="flex items-center justify-between group hover:scale-105 transition-transform duration-200">
        <span className="min-w-0 flex-1 mr-2 group-hover:text-terminal-green transition-colors">
          {label}
        </span>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-16 sm:w-20 bg-gray-700 rounded-full h-1.5 relative overflow-hidden">
            <div
              className="bg-gradient-to-r from-terminal-green to-green-400 h-1.5 rounded-full transition-all duration-500 relative"
              style={{ width: `${displayValue}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
            </div>
          </div>
          <span className="text-xs text-terminal-green w-8 text-right font-mono">
            {displayValue}%
          </span>
        </div>
      </div>
    );
  };

  const renderWhoami = () => (
    <div
      className={`space-y-3 text-terminal-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <MatrixRain />
      <ScanLine />
      <GlitchText className="text-terminal-green animate-glow">
        ╔════════════════════════════════════════╗ ║ DEVELOPER PROFILE ║
        ╚════════════════════════════════════════╝
      </GlitchText>
      <div className="ml-2 sm:ml-4 space-y-2 bg-black/20 p-3 sm:p-4 rounded border-l-2 border-terminal-green backdrop-blur-sm hover:bg-black/30 transition-all duration-300 hover:shadow-lg hover:shadow-terminal-green/20">
        {[
          { label: "Name", value: "Shivam Prajapati", icon: "👨‍💻" },
          { label: "Role", value: "Full Stack Developer", icon: "🚀" },
          { label: "Experience", value: "5+ years", icon: "⚡" },
          { label: "Location", value: "India", icon: "🌏" },
          { label: "Status", value: "Available for opportunities", icon: "✨" },
        ].map((item, index) => (
          <div
            key={index}
            className={`animate-slide-in-left flex items-center space-x-2`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-terminal-green font-semibold">
              {item.label}:
            </span>
            <span
              className={`text-white ${
                item.label === "Status" ? "animate-pulse text-green-400" : ""
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 sm:p-4 bg-terminal-bg/50 rounded border border-terminal-green-dim backdrop-blur-sm hover:border-terminal-green transition-all duration-500 hover:shadow-glow">
        <p className="text-terminal-gray leading-relaxed text-sm sm:text-base animate-fade-in-up">
          Passionate full-stack developer specializing in React, Node.js, and
          cloud technologies. I love building scalable applications and solving
          complex problems with elegant code.
        </p>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div
      className={`space-y-4 text-terminal-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <GlitchText className="text-terminal-green animate-glow text-sm sm:text-base">
        ╔════════════════════════════════════════╗ ║ PROJECT PORTFOLIO ║
        ╚════════════════════════════════════════╝
      </GlitchText>
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
            icon: <Globe className="w-4 h-4" />,
          },
          {
            id: "02",
            title: "Task Management App",
            tech: "React Native • Firebase • Redux",
            desc: "Cross-platform mobile app for team collaboration with real-time synchronization",
            repo: "https://github.com/shivam/task-manager",
            live: "https://taskmanager-demo.com",
            status: "BETA",
            icon: <Code className="w-4 h-4" />,
          },
          {
            id: "03",
            title: "AI Chat Bot",
            tech: "Python • TensorFlow • FastAPI",
            desc: "Intelligent chatbot with natural language processing and machine learning capabilities",
            repo: "https://github.com/shivam/ai-chatbot",
            live: "https://chatbot-demo.com",
            status: "DEV",
            icon: <Zap className="w-4 h-4" />,
          },
        ].map((project, index) => (
          <div
            key={index}
            className={`bg-black/30 rounded border border-terminal-green-dim/50 p-3 sm:p-4 hover:border-terminal-green transition-all duration-500 hover:shadow-glow hover:scale-[1.02] hover:bg-black/40 animate-slide-in-right backdrop-blur-sm`}
            style={{ animationDelay: `${index * 300}ms` }}
            onMouseEnter={() => playBeepSound()}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 text-xs sm:text-sm font-mono">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                {project.icon}
                <span className="text-terminal-green animate-pulse">
                  [{project.id}]
                </span>
                <span className="text-terminal-white font-semibold hover:text-terminal-green transition-colors">
                  {project.title}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs animate-bounce ${
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
              <div className="text-terminal-gray-dim font-mono">
                ~/{project.title.toLowerCase().replace(/\s+/g, "-")}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex flex-wrap items-start">
                <span className="text-terminal-green min-w-[60px] sm:min-w-[80px] animate-pulse">
                  tech:
                </span>
                <span className="text-terminal-gray font-mono text-xs sm:text-sm hover:text-white transition-colors">
                  {project.tech}
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-terminal-green min-w-[60px] sm:min-w-[80px] animate-pulse">
                  desc:
                </span>
                <span className="text-terminal-white flex-1 hover:text-terminal-green transition-colors">
                  {project.desc}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-terminal-green-dim/30">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => playSuccessSound()}
                  className="group flex items-center justify-center sm:justify-start gap-2 px-3 py-2 bg-terminal-bg/50 border border-terminal-green-dim rounded text-xs sm:text-sm text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-all duration-300 font-mono hover:scale-105 hover:shadow-lg hover:shadow-terminal-green/30"
                >
                  <Github
                    size={14}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>git clone repo</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity animate-bounce">
                    ↗
                  </span>
                </button>
                <button
                  onClick={() => playSuccessSound()}
                  className="group flex items-center justify-center sm:justify-start gap-2 px-3 py-2 bg-terminal-green/10 border border-terminal-green rounded text-xs sm:text-sm text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-all duration-300 font-mono hover:scale-105 hover:shadow-lg hover:shadow-terminal-green/30"
                >
                  <ExternalLink
                    size={14}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>./run --live</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity animate-bounce">
                    ↗
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-terminal-gray-dim text-xs font-mono mt-4 p-2 bg-black/20 rounded border border-terminal-green-dim/30 animate-fade-in backdrop-blur-sm">
        <span className="text-terminal-green animate-pulse">$</span> ls -la
        projects/ | wc -l
        <br />
        <span className="ml-2 animate-slide-in-left">3 projects found</span>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div
      className={`space-y-4 text-terminal-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <GlitchText className="text-terminal-green animate-glow text-sm sm:text-base">
        ╔════════════════════════════════════════╗ ║ SKILL MATRIX ║
        ╚════════════════════════════════════════╝
      </GlitchText>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
        <div className="bg-black/20 p-3 sm:p-4 rounded border border-terminal-green-dim hover:border-terminal-green transition-all duration-500 hover:shadow-glow backdrop-blur-sm animate-slide-in-left">
          <div className="text-terminal-green font-semibold mb-3 text-sm sm:text-base flex items-center space-x-2">
            <Code className="w-4 h-4 animate-pulse" />
            <span>Frontend:</span>
          </div>
          <div className="space-y-3 text-xs sm:text-sm">
            <ProgressBar value={95} label="React/Next.js" />
            <ProgressBar value={90} label="TypeScript" />
            <ProgressBar value={95} label="Tailwind CSS" />
            <ProgressBar value={75} label="Vue.js" />
          </div>
        </div>

        <div className="bg-black/20 p-3 sm:p-4 rounded border border-terminal-green-dim hover:border-terminal-green transition-all duration-500 hover:shadow-glow backdrop-blur-sm animate-slide-in-right">
          <div className="text-terminal-green font-semibold mb-3 text-sm sm:text-base flex items-center space-x-2">
            <Database className="w-4 h-4 animate-pulse" />
            <span>Backend:</span>
          </div>
          <div className="space-y-3 text-xs sm:text-sm">
            <ProgressBar label="Node.js" value={90} />
            <ProgressBar label="Python" value={85} />
            <ProgressBar label="PostgreSQL" value={90} />
            <ProgressBar label="Docker" value={80} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div
      className={`space-y-4 text-terminal-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <GlitchText className="text-terminal-green animate-glow text-sm sm:text-base">
        ╔════════════════════════════════════════╗ ║ CONTACT INFO ║
        ╚════════════════════════════════════════╝
      </GlitchText>
      <div className="bg-black/20 p-4 sm:p-6 rounded border border-terminal-green-dim hover:border-terminal-green transition-all duration-500 hover:shadow-glow backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            {
              icon: <Mail className="w-4 h-4" />,
              label: "Email",
              value: "shivam.dev@example.com",
            },
            {
              icon: <Linkedin className="w-4 h-4" />,
              label: "LinkedIn",
              value: "linkedin.com/in/shivamprajapati",
            },
            {
              icon: <Github className="w-4 h-4" />,
              label: "GitHub",
              value: "github.com/shivamprajapati",
            },
            {
              icon: <Globe className="w-4 h-4" />,
              label: "Website",
              value: "shivam.portfolio.com",
            },
            {
              icon: <Phone className="w-4 h-4" />,
              label: "Phone",
              value: "+91 98765 43210",
            },
          ].map((contact, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-2 hover:bg-black/30 rounded transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-in-up hover:shadow-md`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => playBeepSound()}
            >
              <span className="text-terminal-green flex-shrink-0 animate-pulse">
                {contact.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-terminal-green text-xs sm:text-sm font-semibold">
                  {contact.label}:
                </div>
                <div className="text-terminal-white text-xs sm:text-sm break-all hover:text-terminal-green transition-colors">
                  {contact.value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-terminal-bg/50 rounded border border-terminal-green-dim hover:border-terminal-green transition-all duration-300 animate-fade-in-up">
          <p className="text-terminal-gray text-xs sm:text-sm leading-relaxed">
            Feel free to reach out for collaborations, opportunities, or just to
            say hi! 👋
          </p>
        </div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div
      className={`space-y-3 text-terminal-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="text-terminal-green font-semibold text-sm sm:text-base animate-glow">
        Available commands:
      </div>
      <div className="bg-black/20 p-3 sm:p-4 rounded border border-terminal-green-dim hover:border-terminal-green transition-all duration-500 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
          {[
            {
              cmd: "whoami",
              desc: "Display developer information",
              icon: "👨‍💻",
            },
            { cmd: "projects", desc: "Show portfolio projects", icon: "🚀" },
            { cmd: "skills", desc: "List technical skills", icon: "⚡" },
            { cmd: "contact", desc: "Get contact information", icon: "📧" },
            { cmd: "clear", desc: "Clear the terminal", icon: "🧹" },
            { cmd: "help", desc: "Show this help message", icon: "❓" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex space-x-2 sm:space-x-3 p-2 hover:bg-black/30 rounded transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => playKeyboardSound()}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-terminal-green font-mono font-semibold min-w-[60px] sm:min-w-[80px] flex-shrink-0 hover:text-white transition-colors">
                {item.cmd}
              </span>
              <span className="text-terminal-gray hover:text-terminal-green transition-colors">
                - {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderError = (cmd: string) => (
    <div
      className={`text-red-400 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center space-x-2 animate-shake">
        <span className="animate-pulse">❌</span>
        <GlitchText className="text-sm sm:text-base">
          bash: {cmd}: command not found
        </GlitchText>
      </div>
      <div className="text-terminal-gray text-xs sm:text-sm mt-2 ml-6 animate-fade-in-up">
        Type 'help' to see available commands
      </div>
    </div>
  );

  // This can be added to the component where your clear functionality exists

  const playClearSound = () => {
    const audio = new Audio("/audio/bb.mp3");
    audio.play().catch((error) => console.error("Error playing sound:", error));
  };

  // Then call playClearSound() when your clear function is triggered
  // For example:
  const handleClear = () => {
    playClearSound();
    return <div></div>; // Clear output
  };

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
      return handleClear();
    case "":
      return <div></div>;
    default:
      return renderError(command);
  }
};

// Enhanced CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes glitch-1 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
  }
  
  @keyframes glitch-2 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(2px, -2px); }
    40% { transform: translate(2px, 2px); }
    60% { transform: translate(-2px, -2px); }
    80% { transform: translate(-2px, 2px); }
  }
  
  @keyframes scan-line {
    0% { top: 0%; }
    100% { top: 100%; }
  }
  
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slide-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .animate-glitch-1 { animation: glitch-1 0.3s infinite; }
  .animate-glitch-2 { animation: glitch-2 0.3s infinite reverse; }
  .animate-scan-line { animation: scan-line 2s ease-in-out infinite; }
  .animate-slide-in-left { animation: slide-in-left 0.6s ease-out forwards; }
  .animate-slide-in-right { animation: slide-in-right 0.6s ease-out forwards; }
  .animate-slide-in-up { animation: slide-in-up 0.5s ease-out forwards; }
  .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
  .animate-shake { animation: shake 0.5s ease-in-out; }
  
  .shadow-glow {
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
  }
  
  :root {
    --terminal-green: #22c55e;
    --terminal-green-dim: #16a34a;
    --terminal-white: #ffffff;
    --terminal-gray: #9ca3af;
    --terminal-gray-dim: #6b7280;
    --terminal-bg: #000000;
  }
`;
document.head.appendChild(style);

export default CommandOutput;
