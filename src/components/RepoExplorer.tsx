import React, { useState, useMemo } from 'react';
import { Repository, REPOSITORIES, IssueSample } from '../data/repositories';
import {
  Search,
  Sparkles,
  GitPullRequest,
  Star,
  GitFork,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  Filter,
  CheckCircle,
} from 'lucide-react';

interface RepoExplorerProps {
  onAnalyzeRepo: (repo: Repository | string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const RepoExplorer: React.FC<RepoExplorerProps> = ({
  onAnalyzeRepo,
  onCopyText,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'issues' | 'stars' | 'speed'>('issues');
  const [expandedIssuesRepoId, setExpandedIssuesRepoId] = useState<string | null>(null);

  // Available languages from data
  const languages = ['All', 'Python', 'TypeScript', 'JavaScript', 'C++', 'Rust', 'Markdown'];

  // Difficulty counts
  const difficultyCounts = useMemo(() => {
    return {
      All: REPOSITORIES.length,
      Easy: REPOSITORIES.filter((r) => r.difficulty === 'Easy').length,
      Medium: REPOSITORIES.filter((r) => r.difficulty === 'Medium').length,
      Hard: REPOSITORIES.filter((r) => r.difficulty === 'Hard').length,
    };
  }, []);

  // Filtered & sorted repos
  const filteredRepos = useMemo(() => {
    return REPOSITORIES.filter((repo) => {
      // Search query
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Difficulty
      const matchesDifficulty =
        selectedDifficulty === 'All' || repo.difficulty === selectedDifficulty;

      // Language
      const matchesLanguage =
        selectedLanguage === 'All' || repo.primaryLanguage === selectedLanguage;

      return matchesSearch && matchesDifficulty && matchesLanguage;
    }).sort((a, b) => {
      if (sortBy === 'issues') return b.goodFirstIssuesCount - a.goodFirstIssuesCount;
      if (sortBy === 'stars') return b.stars - a.stars;
      if (sortBy === 'speed') return a.typicalReviewTime.localeCompare(b.typicalReviewTime);
      return 0;
    });
  }, [searchQuery, selectedDifficulty, selectedLanguage, sortBy]);

  const toggleExpandIssues = (repoId: string) => {
    setExpandedIssuesRepoId((prev) => (prev === repoId ? null : repoId));
  };

  const getDifficultyAccent = (diff: 'Easy' | 'Medium' | 'Hard') => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-800 font-semibold';
      case 'Medium':
        return 'text-amber-800 font-semibold';
      case 'Hard':
        return 'text-zinc-800 font-semibold';
    }
  };

  return (
    <section id="explorer" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-800 mb-2">
            Curated Directory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 text-balance">
            Repository Explorer & Ranking
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-2 max-w-2xl">
            Triage open-source codebases by real contribution difficulty. Every project listed here maintains an active good-first-issue triage backlog.
          </p>
        </div>

        {/* Difficulty Counts Overview */}
        <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
          <span>{filteredRepos.length} Repositories Found</span>
        </div>
      </div>

      {/* Sticky Search & Filter Bar */}
      <div className="sticky top-16 z-30 bg-zinc-50/95 backdrop-blur-md pt-2 pb-6 border-b border-zinc-200 mb-8 space-y-4">
        {/* Top Filter Row: Search Input + Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by repository name, language, or topic..."
              className="w-full bg-white border border-zinc-300 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-amber-800 focus:ring-1 focus:ring-amber-800 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-zinc-600 shrink-0">
            <span className="text-zinc-400">Sort by:</span>
            <div className="inline-flex rounded-lg border border-zinc-300 bg-white p-0.5 shadow-2xs">
              <button
                onClick={() => setSortBy('issues')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  sortBy === 'issues'
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Good First Issues
              </button>
              <button
                onClick={() => setSortBy('stars')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  sortBy === 'stars'
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                GitHub Stars
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Filter Row: Difficulty Segmented Control + Language Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Difficulty Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-zinc-200/80 rounded-lg">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  selectedDifficulty === diff
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {diff}
                <span className="ml-1.5 font-mono text-[11px] opacity-60">
                  ({difficultyCounts[diff]})
                </span>
              </button>
            ))}
          </div>

          {/* Language Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
            <span className="text-xs text-zinc-400 mr-1 hidden lg:inline">Language:</span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedLanguage === lang
                    ? 'bg-amber-800 text-white'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      {filteredRepos.length === 0 ? (
        <div className="text-center py-20 bg-white border border-zinc-200 rounded-xl p-8 max-w-md mx-auto">
          <p className="text-zinc-900 font-semibold mb-1">No repositories found</p>
          <p className="text-xs text-zinc-500 mb-4">
            Try adjusting your search terms or clearing difficulty and language filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDifficulty('All');
              setSelectedLanguage('All');
            }}
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-medium rounded-lg hover:bg-zinc-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => {
            const isExpanded = expandedIssuesRepoId === repo.id;

            return (
              <article
                key={repo.id}
                className="bg-white border border-zinc-200/90 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-400 hover:shadow-xs transition-all duration-200 group relative"
              >
                {/* Card Top: Header & Difficulty Indicator */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <span className="text-xs font-mono text-zinc-400 truncate block">
                        {repo.owner} /
                      </span>
                      <h3 className="text-lg font-bold text-zinc-900 truncate group-hover:text-amber-800 transition-colors">
                        {repo.name}
                      </h3>
                    </div>

                    {/* Unboxed Difficulty Indicator */}
                    <div className="text-right shrink-0">
                      <span className={`text-xs font-mono uppercase tracking-wider ${getDifficultyAccent(repo.difficulty)}`}>
                        {repo.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Clean Unboxed Metadata with Typographic Separators (Rule: NO PILLS) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-mono mb-4">
                    <span>{repo.primaryLanguage}</span>
                    <span aria-hidden="true" className="text-zinc-300">·</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-zinc-400" />
                      {(repo.stars / 1000).toFixed(1)}k
                    </span>
                    <span aria-hidden="true" className="text-zinc-300">·</span>
                    <span className="text-amber-800 font-medium">
                      {repo.goodFirstIssuesCount} issues
                    </span>
                    {repo.hacktoberfestApproved && (
                      <>
                        <span aria-hidden="true" className="text-zinc-300">·</span>
                        <span className="text-zinc-600">Hacktoberfest</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                    {repo.description}
                  </p>

                  {/* Maintainer Vibe & Review Speed (Unboxed Text) */}
                  <div className="pt-3 border-t border-zinc-100 mb-5 text-xs text-zinc-500 flex items-center justify-between">
                    <span className="truncate pr-2">{repo.maintainerFriendlyScore}</span>
                    <span className="shrink-0 font-mono text-[11px] text-zinc-400">
                      Review: {repo.typicalReviewTime}
                    </span>
                  </div>
                </div>

                {/* Card Bottom: Primary Actions & Expandable Issues */}
                <div>
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-100">
                    {/* Primary Button: Analyze with AI */}
                    <button
                      onClick={() => onAnalyzeRepo(repo)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Analyze with AI</span>
                    </button>

                    {/* Secondary Button: View Issues Toggle */}
                    <button
                      onClick={() => toggleExpandIssues(repo.id)}
                      className="inline-flex items-center gap-1 py-2 px-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                      title="View curated good first issues"
                    >
                      <span className="font-mono">{repo.sampleGoodFirstIssues.length}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                      )}
                    </button>

                    {/* Quick Fork/Clone Command Copy */}
                    <button
                      onClick={() => onCopyText(repo.quickPrCommand, `Fork command for ${repo.name}`)}
                      className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                      title="Copy gh fork command"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* External Link */}
                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
                      title="Open repository on GitHub"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Expandable Good First Issues Inline List */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-zinc-200/80 space-y-3 bg-zinc-50/70 -mx-6 -mb-6 p-4 rounded-b-xl">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                        <span>Sample Good First Issues</span>
                        <span>{repo.sampleGoodFirstIssues.length} active preview</span>
                      </div>
                      {repo.sampleGoodFirstIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className="p-2.5 bg-white border border-zinc-200 rounded-lg text-left hover:border-zinc-300 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-zinc-800 leading-snug line-clamp-2">
                              #{issue.number} {issue.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                            {issue.description}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-zinc-400">
                            {issue.labels.map((l, i) => (
                              <span key={i}>
                                {i > 0 && <span className="mr-1">·</span>}
                                {l}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
