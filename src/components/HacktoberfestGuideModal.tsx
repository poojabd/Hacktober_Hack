import React from 'react';
import { X, CheckCircle2, AlertOctagon, HelpCircle, HeartHandshake } from 'lucide-react';

interface HacktoberfestGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HacktoberfestGuideModal: React.FC<HacktoberfestGuideModalProps> = ({
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
            <div className="text-xs font-mono text-amber-800 uppercase tracking-widest font-semibold">
              Hacktoberfest 2026 Manual
            </div>
            <h3 className="text-base font-bold text-zinc-900 mt-0.5">
              Beginner Etiquette & Pull Request Rules
            </h3>
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
          {/* Rule 1: Quality Over Quantity */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>1. Valid PRs vs Spam</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg space-y-1">
                <div className="font-semibold text-emerald-900">Valid Contributions</div>
                <ul className="text-zinc-600 space-y-1 list-disc list-inside">
                  <li>Fixing verified bugs or broken unit tests</li>
                  <li>Adding missing doc examples or translations</li>
                  <li>Improving accessibility (ARIA labels, keyboard traps)</li>
                  <li>Writing new test cases reproducing edge cases</li>
                </ul>
              </div>

              <div className="p-3 bg-red-50/50 border border-red-200 rounded-lg space-y-1">
                <div className="font-semibold text-red-900">Marked as Spam</div>
                <ul className="text-zinc-600 space-y-1 list-disc list-inside">
                  <li>Random whitespace or formatting changes</li>
                  <li>Copy-pasting ChatGPT text into READMEs</li>
                  <li>Opening PRs without reading CONTRIBUTING.md</li>
                  <li>Submitting PRs for issues already assigned</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rule 2: Respectful Issue Claiming */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-800" />
              <span>2. How to Claim an Issue on GitHub</span>
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Always leave a polite comment on the issue before starting work. Many open-source maintainers operate in different timezones and need to ensure multiple students aren't duplicating effort.
            </p>
            <div className="bg-zinc-900 text-zinc-200 font-mono text-xs p-3 rounded-lg">
              "Hi @maintainer! I'm a student participating in Hacktoberfest. I'd love to work on this issue if it's available. My proposed approach is to update [file/module]. May I take this on?"
            </div>
          </div>

          {/* Rule 3: The 4 Accepted PRs Target */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-zinc-700" />
              <span>3. How Pull Requests Are Counted</span>
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              To complete Hacktoberfest, your pull requests must be opened in repositories with the <code>hacktoberfest</code> topic, or merged and approved by a maintainer with the <code>hacktoberfest-accepted</code> label. Maintainers have a 7-day review window.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 text-xs font-medium cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
