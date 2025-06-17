import { useState, useEffect, useRef, type JSX } from "react";
import LoadingScreen from "./LoadingScreen";
import CommandLine from "./CommandLine";
import CommandOutput from "./CommandOutput";

interface Command {
  id: string;
  command: string;
  output: JSX.Element;
  timestamp: Date;
}

const Terminal = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [commands]);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Handle clear command specially
    if (trimmedCmd === "clear") {
      setCommands([]);
      setCurrentCommand("");
      return;
    }

    const newCommand: Command = {
      id: Date.now().toString(),
      command: cmd,
      output: <CommandOutput command={trimmedCmd} />,
      timestamp: new Date(),
    };

    setCommands((prev) => [...prev, newCommand]);
    setCurrentCommand("");
  };

  if (!isLoadingComplete) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green font-mono overflow-hidden">
      <div
        ref={terminalRef}
        className="h-screen overflow-y-auto px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 scrollbar-thin scrollbar-track-terminal-bg scrollbar-thumb-terminal-green-dim"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#00cc33 #0a0a0a" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="space-y-3 sm:space-y-4">
            {/* Command History */}
            {commands.map((cmd) => (
              <div key={cmd.id} className="space-y-2 animate-fade-in">
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <span className="text-terminal-green-dim select-none flex-shrink-0">
                    guest@portfolio:~$
                  </span>
                  <span className="text-terminal-white break-all">
                    {cmd.command}
                  </span>
                </div>
                <div className="ml-2 sm:ml-4 lg:ml-6">{cmd.output}</div>
              </div>
            ))}

            {/* Current Command Line */}
            <div className="sticky bottom-0 bg-terminal-bg/95 backdrop-blur-sm py-2 sm:py-3">
              <CommandLine
                value={currentCommand}
                onChange={setCurrentCommand}
                onExecute={executeCommand}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
