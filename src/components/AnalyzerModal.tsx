import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Copy,
  ExternalLink,
  Terminal,
  FileCode,
  Layers,
  HelpCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  description: string;
}

interface EntryPoint {
  area: string;
  difficulty: string;
  description: string;
  targetFiles: string[];
}

interface GitStep {
  step: number;
  title: string;
  command: string;
  note: string;
}

interface AnalysisData {
  name: string;
  owner: string;
  repoUrl: string;
  primaryLanguage: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  summary: string;
  techStack: TechItem[];
  beginnerEntryPoints: EntryPoint[];
  prCheatSheet: GitStep[];
  firstIssueRecommendation: {
    title: string;
    description: string;
    labels: string[];
    stepsToSolve: string[];
  };
  communityVibe: {
    score: string;
    reviewSpeed: string;
    mentorshipRating: string;
    tipsForFirstTimers: string[];
  };
  source?: string;
}

interface AnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRepoName?: string;
  onCopyText: (text: string, label: string) => void;
}

export const AnalyzerModal: React.FC<AnalyzerModalProps> = ({
  isOpen,
  onClose,
  initialRepoName = 'pallets/flask',
  onCopyText,
}) => {
  const [repoInput, setRepoInput] = useState(initialRepoName);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'entrypoints' | 'cheatsheet'>('overview');
  const [error, setError] = useState<string | null>(null);

  // Student PR checklist state
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    fork: false,
    branch: false,
    testsPass: false,
    conventionalCommit: false,
    linkedIssue: false,
  });

  const loadingSteps = [
    'Resolving repository architecture & branches...',
    'Analyzing beginner entry points & safe file targets...',
    'Synthesizing step-by-step Git commands & review expectations...',
  ];

  const fetchAnalysis = async (targetRepo: string) => {
    if (!targetRepo.trim()) return;
    setLoading(true);
    setError(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 700);

    try {
      const response = await fetch('/api/analyze-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo: targetRepo }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch repository analysis');
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (err: any) {
      console.error(err);
      setError('Unable to analyze repository. Please verify the URL or try another repository.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && initialRepoName) {
      setRepoInput(initialRepoName);
      fetchAnalysis(initialRepoName);
    }
  }, [isOpen, initialRepoName]);

  if (!isOpen) return null;

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl shadow-xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Top Bar: Repository Input & Close */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-xl">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 shrink-0">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>AI Repo Analyzer</span>
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchAnalysis(repoInput)}
                placeholder="Repository (e.g. pallets/flask or https://github.com/...)"
                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs text-zinc-900 font-mono placeholder-zinc-400 focus:outline-hidden focus:border-amber-800 focus:ring-1 focus:ring-amber-800"
              />
            </div>
            <button
              onClick={() => fetchAnalysis(repoInput)}
              disabled={loading}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span>Analyze</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        {analysisData && !loading && (
          <div className="px-6 border-b border-zinc-200 bg-white flex items-center gap-6 text-xs font-medium text-zinc-600">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'overview'
                  ? 'border-amber-800 text-zinc-900 font-semibold'
                  : 'border-transparent hover:text-zinc-900'
              }`}
            >
              01. Project Summary & Tech Stack
            </button>
            <button
              onClick={() => setActiveTab('entrypoints')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'entrypoints'
                  ? 'border-amber-800 text-zinc-900 font-semibold'
                  : 'border-transparent hover:text-zinc-900'
              }`}
            >
              02. Beginner Entry Points ({analysisData.beginnerEntryPoints.length})
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'cheatsheet'
                  ? 'border-amber-800 text-zinc-900 font-semibold'
                  : 'border-transparent hover:text-zinc-900'
              }`}
            >
              03. First PR Cheat Sheet & Checklist
            </button>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-zinc-200 border-t-amber-800 animate-spin" />
              <div>
                <p className="text-sm font-semibold text-zinc-900 mb-1">
                  Synthesizing Codebase Analysis
                </p>
                <p className="text-xs text-zinc-500 font-mono">
                  {loadingSteps[loadingStep]}
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="py-16 text-center max-w-md mx-auto space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-800 mx-auto" />
              <p className="text-sm font-semibold text-zinc-900">{error}</p>
              <button
                onClick={() => fetchAnalysis('first-contributions/first-contributions')}
                className="px-4 py-2 bg-zinc-900 text-white text-xs font-medium rounded-lg hover:bg-zinc-800"
              >
                Analyze First Contributions Playground
              </button>
            </div>
          ) : analysisData ? (
            <>
              {/* Header Info Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-zinc-400">
                      {analysisData.owner} /
                    </span>
                    <h3 className="text-2xl font-bold text-zinc-900">
                      {analysisData.name}
                    </h3>
                  </div>
                  {/* Clean unboxed metadata (NO PILLS) */}
                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                    <span>{analysisData.primaryLanguage}</span>
                    <span aria-hidden="true" className="text-zinc-300">·</span>
                    <span className="text-amber-800 font-medium">
                      Difficulty: {analysisData.difficulty}
                    </span>
                    <span aria-hidden="true" className="text-zinc-300">·</span>
                    <span>Review: {analysisData.communityVibe.reviewSpeed}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={analysisData.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 hover:border-zinc-300 rounded-lg text-xs font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </div>
              </div>

              {/* TAB 1: OVERVIEW & TECH STACK */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Plain English Summary */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      What It Means & Does
                    </h4>
                    <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 border border-zinc-200/80 rounded-xl p-4">
                      {analysisData.summary}
                    </p>
                  </div>

                  {/* Community Vibe & Review Expectations */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Mentorship & Review Culture
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                      <div className="p-3 border border-zinc-200 rounded-xl bg-white">
                        <div className="text-[11px] text-zinc-400 font-mono">Welcoming Score</div>
                        <div className="text-sm font-bold text-zinc-900 mt-0.5">
                          {analysisData.communityVibe.score}
                        </div>
                      </div>
                      <div className="p-3 border border-zinc-200 rounded-xl bg-white">
                        <div className="text-[11px] text-zinc-400 font-mono">Review Turnaround</div>
                        <div className="text-sm font-bold text-zinc-900 mt-0.5">
                          {analysisData.communityVibe.reviewSpeed}
                        </div>
                      </div>
                      <div className="p-3 border border-zinc-200 rounded-xl bg-white">
                        <div className="text-[11px] text-zinc-400 font-mono">First-Timer Rating</div>
                        <div className="text-sm font-bold text-zinc-900 mt-0.5">
                          {analysisData.communityVibe.mentorshipRating}
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3.5 space-y-1.5">
                      <div className="text-xs font-semibold text-zinc-800">
                        Pro-Tips for Your First PR:
                      </div>
                      <ul className="text-xs text-zinc-600 space-y-1 list-disc list-inside">
                        {analysisData.communityVibe.tipsForFirstTimers.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack & Dependencies */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Detected Architecture & Dependencies
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {analysisData.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 border border-zinc-200 rounded-xl bg-white space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-900 font-mono">
                              {tech.name}
                            </span>
                            <span className="text-[11px] font-mono text-amber-800">
                              {tech.category}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 leading-normal">
                            {tech.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BEGINNER ENTRY POINTS */}
              {activeTab === 'entrypoints' && (
                <div className="space-y-6">
                  {/* Spotlight Recommendation */}
                  {analysisData.firstIssueRecommendation && (
                    <div className="p-4 border border-amber-800/20 bg-amber-50/50 rounded-xl space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Recommended First PR Task</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900">
                          {analysisData.firstIssueRecommendation.title}
                        </h4>
                        <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                          {analysisData.firstIssueRecommendation.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-amber-800/10">
                        <div className="text-[11px] font-semibold text-zinc-800 mb-1.5">
                          Action Steps to Complete:
                        </div>
                        <ol className="text-xs text-zinc-600 space-y-1 list-decimal list-inside font-mono">
                          {analysisData.firstIssueRecommendation.stepsToSolve.map((step, idx) => (
                            <li key={idx} className="font-sans">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Entry Point Cards */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                      Safe Codebase Entry Points
                    </h4>
                    <div className="space-y-3">
                      {analysisData.beginnerEntryPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="p-4 border border-zinc-200 rounded-xl bg-white hover:border-zinc-300 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h5 className="text-sm font-bold text-zinc-900">
                              {point.area}
                            </h5>
                            <span className="text-xs font-mono font-semibold text-emerald-800">
                              {point.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                            {point.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100 text-[11px] font-mono text-zinc-500">
                            <span className="text-zinc-400">Target Files:</span>
                            {point.targetFiles.map((file, fIdx) => (
                              <code
                                key={fIdx}
                                className="px-1.5 py-0.5 bg-zinc-100 rounded text-zinc-700"
                              >
                                {file}
                              </code>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FIRST PR CHEAT SHEET & CHECKLIST */}
              {activeTab === 'cheatsheet' && (
                <div className="space-y-6">
                  {/* Step by step Git Cheat Sheet */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Tailored Git Commands
                      </h4>
                      <span className="text-xs text-zinc-400 font-mono">
                        Run these in order in your terminal
                      </span>
                    </div>

                    <div className="space-y-3">
                      {analysisData.prCheatSheet.map((item) => (
                        <div
                          key={item.step}
                          className="border border-zinc-200 rounded-xl bg-white overflow-hidden"
                        >
                          <div className="px-4 py-2.5 bg-zinc-50/70 border-b border-zinc-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-900">
                              Step {item.step}: {item.title}
                            </span>
                            <span className="text-[11px] text-zinc-500 font-mono">
                              {item.note}
                            </span>
                          </div>

                          <div className="p-3 bg-zinc-900 flex items-center justify-between gap-3 text-zinc-100 font-mono text-xs">
                            <code className="overflow-x-auto py-1">
                              {item.command}
                            </code>
                            <button
                              onClick={() => onCopyText(item.command, `Git Step ${item.step}`)}
                              className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded transition-colors cursor-pointer shrink-0"
                              title="Copy command"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive PR Readiness Checklist */}
                  <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                      First PR Pre-Flight Checklist
                    </h4>
                    <p className="text-xs text-zinc-500 mb-4">
                      Check these off before clicking "Create Pull Request" on GitHub to ensure a positive review.
                    </p>

                    <div className="space-y-2">
                      {[
                        { key: 'fork', label: 'I created a branch on my personal fork (not on the main branch)' },
                        { key: 'branch', label: 'My branch name describes the change (e.g. docs-clarify-setup)' },
                        { key: 'testsPass', label: 'I ran the local test suite or linter and all checks passed' },
                        { key: 'conventionalCommit', label: 'My commit message follows project conventions (e.g. "fix: typo in guide")' },
                        { key: 'linkedIssue', label: 'My PR description references the related issue number (e.g. Closes #123)' },
                      ].map((item) => (
                        <label
                          key={item.key}
                          onClick={() => toggleChecklist(item.key)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100/80 cursor-pointer text-xs text-zinc-700 transition-colors select-none"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              checklist[item.key]
                                ? 'bg-amber-800 border-amber-800 text-white'
                                : 'border-zinc-300 bg-white'
                            }`}
                          >
                            {checklist[item.key] && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <span className={checklist[item.key] ? 'line-through text-zinc-400' : ''}>
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500">
          <span className="font-mono text-[11px]">
            {analysisData?.source === 'gemini-ai' ? 'Powered by Gemini 3.8 Flash' : 'Verified OpenHub Engine'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
