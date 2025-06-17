import { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const welcomeSequence = [
    {
      text: `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
      `,
      delay: 50,
    },
    {
      text: "\n=== Welcome to John Dev's Portfolio Terminal ===\n",
      delay: 1000,
    },
    { text: "Loading system information...\n", delay: 800 },
    { text: "[OK] Portfolio modules loaded\n", delay: 600 },
    { text: "[OK] Skills database initialized\n", delay: 600 },
    { text: "[OK] Project repository connected\n", delay: 600 },
    { text: "[OK] Contact services ready\n\n", delay: 800 },
    { text: 'Type "help" to see available commands or try:\n', delay: 1000 },
    { text: "  • whoami     - Display developer information\n", delay: 500 },
    { text: "  • projects   - Show portfolio projects\n", delay: 500 },
    { text: "  • skills     - List technical skills\n", delay: 500 },
    { text: "  • contact    - Get contact information\n\n", delay: 500 },
    { text: "System ready. Happy coding! 🚀\n\n", delay: 1000 },
  ];

  useEffect(() => {
    if (currentStep < welcomeSequence.length) {
      const currentItem = welcomeSequence[currentStep];
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentItem.text);
        setCurrentStep((prev) => prev + 1);
      }, currentItem.delay);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(onComplete, 1200);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="space-y-2 animate-fade-in">
      <pre className="text-terminal-green whitespace-pre-wrap text-xs sm:text-sm leading-tight select-none">
        {displayedText}
      </pre>
      {currentStep < welcomeSequence.length && (
        <span className="animate-blink text-terminal-green">█</span>
      )}
    </div>
  );
};

export default WelcomeScreen;
