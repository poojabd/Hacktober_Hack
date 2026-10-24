import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface DifficultyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DifficultyGuideModal: React.FC<DifficultyGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              OpenHub Contribution Difficulty Scale
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              How we evaluate repositories so you pick projects matched to your experience.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Easy Tier */}
          <div className="p-4 border border-emerald-800/20 bg-emerald-50/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-900">
                01. Easy (First-Timer Friendly)
              </span>
              <span className="text-xs font-mono text-emerald-800 font-semibold">
                Time: 15–45 mins
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Ideal for students who have never opened a pull request before. Changes are self-contained with minimal setup.
            </p>
            <div className="text-xs text-zinc-700 pt-2 border-t border-emerald-800/10 space-y-1">
              <div><strong>Typical tasks:</strong> Documentation corrections, fixing dead links, adding code snippet tests, translating readmes, and alphabetical contributor profiles.</div>
              <div><strong>Setup required:</strong> Just Git and a browser or basic text editor. No local compilation or heavyweight Docker containers required.</div>
            </div>
          </div>

          {/* Medium Tier */}
          <div className="p-4 border border-amber-800/20 bg-amber-50/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-amber-900">
                02. Medium (Familiar with Core Language)
              </span>
              <span className="text-xs font-mono text-amber-800 font-semibold">
                Time: 1–3 hours
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              For developers comfortable with Python, TypeScript, or modern web frameworks who know how to run tests locally.
            </p>
            <div className="text-xs text-zinc-700 pt-2 border-t border-amber-800/10 space-y-1">
              <div><strong>Typical tasks:</strong> Adding unit test coverage for edge cases, adding Python type hints, improving CLI flag error messages, fixing UI component responsive styles.</div>
              <div><strong>Setup required:</strong> Local virtualenv or node_modules installation, running test harnesses (`pytest` or `npm test`), and linting hooks.</div>
            </div>
          </div>

          {/* Hard Tier */}
          <div className="p-4 border border-zinc-300 bg-zinc-50 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-900">
                03. Hard (Advanced Architectures)
              </span>
              <span className="text-xs font-mono text-zinc-600 font-semibold">
                Time: Multiple days
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Complex codebases involving compiled languages (C++, Rust), memory lifecycles, concurrency, or large monorepos.
            </p>
            <div className="text-xs text-zinc-700 pt-2 border-t border-zinc-200 space-y-1">
              <div><strong>Typical tasks:</strong> Engine subsystem patches, compiler passes, memory deallocation bugfixes, W3C cryptographic spec implementations.</div>
              <div><strong>Setup required:</strong> CMake, Cargo, Ninja, signing enterprise Contributor License Agreements (CLA), and navigating extensive multi-crate monorepos.</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 text-xs font-medium cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
