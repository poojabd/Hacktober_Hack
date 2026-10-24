import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, CheckCircle2, GitPullRequest, Users2, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onAnalyze: (repoUrl: string) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyze, onExploreClick }) => {
  const [quickUrl, setQuickUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickUrl.trim()) {
      onAnalyze(quickUrl.trim());
    }
  };

  const sampleSuggestions = [
    'pallets/flask',
    'facebook/react',
    'first-contributions/first-contributions',
  ];

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Value Proposition & Interactive Search */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet human kicker */}
            <div className="text-xs font-semibold tracking-wider uppercase text-amber-800 mb-4">
              Open Source Engineering Portal
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.08] mb-6 text-balance">
              Elevate Your Code. <br className="hidden sm:inline" />
              Open Source Made Simple.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-8">
              OpenHub bridges the gap for new engineering students looking for welcoming, beginner-friendly good-first-issues during Hacktoberfest and beyond. Demystify unfamiliar codebases, inspect architecture safely, and submit your first pull request with confidence.
            </p>

            {/* Interactive Repo URL Input Bar */}
            <form onSubmit={handleSubmit} className="mb-6 max-w-xl">
              <div className="relative flex items-center bg-white border border-zinc-300 rounded-xl p-1.5 focus-within:border-amber-800 focus-within:ring-2 focus-within:ring-amber-800/10 transition-all shadow-xs">
                <Search className="w-5 h-5 text-zinc-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={quickUrl}
                  onChange={(e) => setQuickUrl(e.target.value)}
                  placeholder="Paste any GitHub repository (e.g. pallets/flask or URL)..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Analyze with AI</span>
                </button>
              </div>

              {/* Sample Quick Chips */}
              <div className="flex items-center gap-2 mt-3 text-xs text-zinc-500">
                <span className="text-zinc-400">Try popular:</span>
                {sampleSuggestions.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setQuickUrl(sample);
                      onAnalyze(sample);
                    }}
                    className="hover:text-amber-800 underline decoration-zinc-300 hover:decoration-amber-800 transition-colors cursor-pointer font-mono"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </form>

            {/* Direct Link to Repo Explorer */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-amber-800 transition-colors cursor-pointer group"
              >
                <span>Browse Curated Beginner Repositories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-100 shadow-sm aspect-16/10 lg:aspect-auto lg:h-full min-h-[300px]">
              <img
                src="/src/assets/images/hero_open_source_minimal_1792822582905.jpg"
                alt="Minimalist engineering workspace with laptop displaying code and copper accents"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Resilient styled fallback container
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-xs font-mono text-zinc-300 uppercase tracking-widest mb-1">
                  Verified Curricula
                </div>
                <div className="text-sm font-medium text-zinc-100">
                  Engineered for students entering open source without intimidation.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Statistics Strip (Clean Tabular Discipline) */}
        <div className="mt-16 pt-10 border-t border-zinc-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-zinc-900 font-mono tabular-nums">
              1,280+
            </div>
            <div className="text-xs text-zinc-500 font-medium">
              Curated Good First Issues
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-zinc-900 font-mono tabular-nums">
              48
            </div>
            <div className="text-xs text-zinc-500 font-medium">
              Verified Welcoming Maintainers
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-zinc-900 font-mono tabular-nums">
              &lt; 24h
            </div>
            <div className="text-xs text-zinc-500 font-medium">
              Average First PR Review Time
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-amber-800 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs text-zinc-500 font-medium">
              Hacktoberfest '26 Aligned
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
