import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentPenguin, setCurrentPenguin] = useState(0);

  const penguinFrames = [
    `
       ___
      (o o)
     /  V  \\
    /(  _  )\\
     ^^ ^^ ^^
    `,
    `
       ___
      (^ ^)
     /  V  \\
    /(  _  )\\
     ^^ ^^ ^^
    `,
    `
       ___
      (- -)
     /  V  \\
    /(  _  )\\
     ^^ ^^ ^^
    `,
  ];

  const loadingSequence = [
    { text: "[SYSTEM] Initializing Terminal...\n", delay: 300 },
    {
      text: "[BOOT] Loading kernel modules... ████████████ 100%\n",
      delay: 800,
    },
    { text: "[NET] Establishing secure connection...\n", delay: 600 },
    { text: "[AUTH] Authenticating user credentials...\n", delay: 700 },
    { text: "[OK] Access granted. Welcome, hacker.\n", delay: 500 },
    { text: "[LOAD] Spawning system daemons...\n", delay: 400 },
    { text: "[PENGUIN] Tux is ready to assist you!\n\n", delay: 800 },
    {
      text: `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 

`,
      delay: 1200,
    },
    { text: "\n=== Welcome to ", delay: 800 },
    { text: "SHIVAM PRAJAPATI", delay: 1000, bold: true },
    { text: "'s Portfolio Terminal ===\n\n", delay: 800 },
    { text: "Loading system information...\n", delay: 600 },
    { text: "[OK] Portfolio modules loaded\n", delay: 500 },
    { text: "[OK] Skills database initialized\n", delay: 500 },
    { text: "[OK] Project repository connected\n", delay: 500 },
    { text: "[OK] Contact services ready\n\n", delay: 600 },
    { text: 'Type "help" to see available commands or try:\n', delay: 800 },
    { text: "  • whoami     - Display developer information\n", delay: 400 },
    { text: "  • projects   - Show portfolio projects\n", delay: 400 },
    { text: "  • skills     - List technical skills\n", delay: 400 },
    { text: "  • contact    - Get contact information\n\n", delay: 400 },
    { text: "System ready. Happy coding! 🚀\n\n", delay: 800 },
  ];

  useEffect(() => {
    const penguinTimer = setInterval(() => {
      setCurrentPenguin((prev) => (prev + 1) % penguinFrames.length);
    }, 500);
    return () => clearInterval(penguinTimer);
  }, []);

  useEffect(() => {
    if (currentStep < loadingSequence.length) {
      const currentItem = loadingSequence[currentStep];
      const timer = setTimeout(() => {
        if (currentItem.bold) {
          setDisplayedText((prev) => prev + `**${currentItem.text}**`);
        } else {
          setDisplayedText((prev) => prev + currentItem.text);
        }
        setCurrentStep((prev) => prev + 1);
      }, currentItem.delay);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(onComplete, 1500);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, onComplete]);

  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span
            key={index}
            className="font-bold text-terminal-green animate-glow"
          >
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green font-mono overflow-hidden">
      <div className="h-screen overflow-y-auto px-4 py-2 sm:px-6 sm:py-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Matrix Header - Only show during initial loading */}
          {currentStep < 7 && (
            <div className="text-center">
              <div className="text-xs text-terminal-green-dim animate-pulse mb-4 tracking-widest">
                {">>> ACCESSING SECURE TERMINAL <<<"}
              </div>

              {/* Penguin Container */}
              <div className="border border-terminal-green-dim p-6 rounded bg-black/20 backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                  <pre className="text-terminal-green text-xs leading-tight animate-glow select-none">
                    {penguinFrames[currentPenguin]}
                  </pre>
                </div>
                <div className="text-center text-xs text-terminal-green-dim mb-3 tracking-wider">
                  TUX LOADING SYSTEM
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: "1.2s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Terminal Output */}
          <div className="bg-black/80 border border-terminal-green-dim p-6 rounded backdrop-blur-sm">
            <pre className="text-terminal-green text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
              {renderTextWithBold(displayedText)}
            </pre>
            {currentStep < loadingSequence.length && (
              <span className="animate-blink text-terminal-green">█</span>
            )}
          </div>

          {/* Binary Animation - Only show during initial loading */}
          {currentStep < 7 && (
            <div className="text-center">
              <div className="text-xs text-terminal-green-dim opacity-60 animate-pulse font-mono tracking-wider">
                01001000 01000001 01000011 01001011 01000101 01010010
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
