import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RepoExplorer } from './components/RepoExplorer';
import { AnalyzerModal } from './components/AnalyzerModal';
import { DifficultyGuideModal } from './components/DifficultyGuideModal';
import { HacktoberfestGuideModal } from './components/HacktoberfestGuideModal';
import { GitTerminalSimulator } from './components/GitTerminalSimulator';
import { Toast } from './components/Toast';
import { Repository } from './data/repositories';
import { Sparkles, Terminal, BookOpen, ShieldCheck, Github, ArrowUpRight, Heart } from 'lucide-react';

export default function App() {
  const [analyzerOpen, setAnalyzerOpen] = useState(false);
  const [analyzingRepo, setAnalyzingRepo] = useState<string>('first-contributions/first-contributions');

  const [difficultyGuideOpen, setDifficultyGuideOpen] = useState(false);
  const [hacktoberfestGuideOpen, setHacktoberfestGuideOpen] = useState(false);
  const [gitSimulatorOpen, setGitSimulatorOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  const handleOpenAnalyzer = (repo?: Repository | string) => {
    if (typeof repo === 'string') {
      setAnalyzingRepo(repo);
    } else if (repo) {
      setAnalyzingRepo(`${repo.owner}/${repo.name}`);
    } else {
      setAnalyzingRepo('pallets/flask');
    }
    setAnalyzerOpen(true);
  };

  const scrollToExplorer = () => {
    const el = document.getElementById('explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenAnalyzer={handleOpenAnalyzer}
        onOpenDifficultyGuide={() => setDifficultyGuideOpen(true)}
        onOpenHacktoberfestGuide={() => setHacktoberfestGuideOpen(true)}
        onOpenTerminalSimulator={() => setGitSimulatorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onAnalyze={handleOpenAnalyzer}
          onExploreClick={scrollToExplorer}
        />

        {/* Feature Spotlight Banner: Hacktoberfest Readiness Callout */}
        <section className="border-b border-zinc-200 bg-white py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setDifficultyGuideOpen(true)}
                className="p-5 border border-zinc-200/90 rounded-xl hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer group bg-zinc-50/50"
              >
                <div className="text-xs font-mono text-amber-800 uppercase tracking-widest font-semibold mb-1">
                  01. Tiered Difficulty
                </div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-amber-800 transition-colors flex items-center justify-between">
                  <span>How We Rank Repos</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Understand Easy vs Medium vs Hard criteria to choose projects tailored to your current coding skills.
                </p>
              </div>

              <div
                onClick={() => setHacktoberfestGuideOpen(true)}
                className="p-5 border border-zinc-200/90 rounded-xl hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer group bg-zinc-50/50"
              >
                <div className="text-xs font-mono text-amber-800 uppercase tracking-widest font-semibold mb-1">
                  02. Hacktoberfest '26
                </div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-amber-800 transition-colors flex items-center justify-between">
                  <span>First-Timer PR Rules</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Avoid spam flags, respect maintainers, and learn the etiquette for claiming issues and opening clean PRs.
                </p>
              </div>

              <div
                onClick={() => setGitSimulatorOpen(true)}
                className="p-5 border border-zinc-200/90 rounded-xl hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer group bg-zinc-50/50"
              >
                <div className="text-xs font-mono text-amber-800 uppercase tracking-widest font-semibold mb-1">
                  03. Hands-On Practice
                </div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-amber-800 transition-colors flex items-center justify-between">
                  <span>Git Terminal Sandbox</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Practice cloning, creating branches, conventional commits, and pushing in an isolated browser shell.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Repository Explorer & Ranking Grid */}
        <RepoExplorer
          onAnalyzeRepo={handleOpenAnalyzer}
          onCopyText={handleCopyText}
        />
      </main>

      {/* Quiet, Minimalist Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold tracking-tight text-zinc-900">
              Open<span className="text-amber-800">Hub</span>
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              · Built for engineering students entering open source
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <button
              onClick={() => setDifficultyGuideOpen(true)}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Difficulty Scale
            </button>
            <button
              onClick={() => setHacktoberfestGuideOpen(true)}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Hacktoberfest Rules
            </button>
            <button
              onClick={() => setGitSimulatorOpen(true)}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Git Terminal
            </button>
            <a
              href="https://github.com/first-contributions/first-contributions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            &copy; 2026 OpenHub Portal. All repositories public domain or open source.
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <AnalyzerModal
        isOpen={analyzerOpen}
        onClose={() => setAnalyzerOpen(false)}
        initialRepoName={analyzingRepo}
        onCopyText={handleCopyText}
      />

      <DifficultyGuideModal
        isOpen={difficultyGuideOpen}
        onClose={() => setDifficultyGuideOpen(false)}
      />

      <HacktoberfestGuideModal
        isOpen={hacktoberfestGuideOpen}
        onClose={() => setHacktoberfestGuideOpen(false)}
      />

      <GitTerminalSimulator
        isOpen={gitSimulatorOpen}
        onClose={() => setGitSimulatorOpen(false)}
      />

      {/* Minimalist Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
