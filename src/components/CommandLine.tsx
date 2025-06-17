import React, { useRef, useEffect } from "react";

interface CommandLineProps {
  value: string;
  onChange: (value: string) => void;
  onExecute: (command: string) => void;
}

const CommandLine = ({ value, onChange, onExecute }: CommandLineProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    focusInput();
    document.addEventListener("click", focusInput);

    return () => {
      document.removeEventListener("click", focusInput);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      onExecute(value);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 sm:p-3 bg-black/20 rounded border border-terminal-green-dim/30 mx-auto max-w-7xl">
      <span className="text-terminal-green-dim flex-shrink-0 select-none font-semibold text-xs sm:text-sm">
        guest@portfolio:~$
      </span>
      <div className="flex-1 relative min-w-0">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-terminal-white w-full font-mono placeholder-terminal-gray-dim focus:placeholder-transparent text-xs sm:text-sm"
          placeholder="Type a command... (try 'help')"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="absolute right-0 top-0 animate-blink text-terminal-green font-bold text-xs sm:text-sm">
          █
        </span>
      </div>
    </div>
  );
};

export default CommandLine;
