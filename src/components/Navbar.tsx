import React from 'react';
import { Search, Sparkles, BookOpen, Terminal, ShieldCheck, Github } from 'lucide-react';

interface NavbarProps {
  onOpenAnalyzer: (defaultRepo?: string) => void;
  onOpenDifficultyGuide: () => void;
  onOpenHacktoberfestGuide: () => void;
  onOpenTerminalSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAnalyzer,
  onOpenDifficultyGuide,
  onOpenHacktoberfestGuide,
  onOpenTerminalSimulator,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-50/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <span className="text-xl font-bold tracking-tight text-zinc-900 flex items-center">
            Open<span className="text-amber-800">Hub</span>
          </span>
          <span className="text-xs font-mono text-zinc-400 font-medium">/ 2026</span>
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600">
          <a
            href="#explorer"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            Repositories
          </a>
          <button
            onClick={onOpenDifficultyGuide}
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Difficulty Scale
          </button>
          <button
            onClick={onOpenHacktoberfestGuide}
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Hacktoberfest Guide
          </button>
          <button
            onClick={onOpenTerminalSimulator}
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-800" />
            <span>Git Simulator</span>
          </button>
          <a
            href="https://github.com/first-contributions/first-contributions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-zinc-500"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenAnalyzer()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-xs border border-zinc-900 hover:border-amber-800/80 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Analyze Any Repo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
