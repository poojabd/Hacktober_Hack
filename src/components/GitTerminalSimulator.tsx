import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal, CornerDownLeft, RotateCcw, CheckCircle2, Play } from 'lucide-react';

interface GitTerminalSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'error' | 'info';
  text: string;
}

export const GitTerminalSimulator: React.FC<GitTerminalSimulatorProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const practiceSteps = [
    {
      step: 1,
      targetCmd: 'git clone https://github.com/YOUR_USERNAME/openhub-demo.git',
      shortCmd: 'git clone',
      hint: 'Clone your personal forked repository to your local machine',
      expectedKeywords: ['git', 'clone'],
      successOutput: [
        'Cloning into \'openhub-demo\'...',
        'remote: Enumerating objects: 184, done.',
        'remote: Total 184 (delta 0), reused 0 (delta 0), pack-reused 184',
        'Receiving objects: 100% (184/184), 42.15 KiB | 2.11 MiB/s, done.',
        'Resolving deltas: 100% (91/91), done.',
        '✓ Repository cloned successfully into ./openhub-demo',
      ],
    },
    {
      step: 2,
      targetCmd: 'git checkout -b fix/docs-clarify-setup',
      shortCmd: 'git checkout -b',
      hint: 'Create and switch to a dedicated feature branch',
      expectedKeywords: ['git', 'checkout', '-b'],
      successOutput: [
        'Switched to a new branch \'fix/docs-clarify-setup\'',
        '✓ You are now working safely in an isolated branch! Your main branch is untouched.',
      ],
    },
    {
      step: 3,
      targetCmd: 'git status',
      shortCmd: 'git status',
      hint: 'Check the status of your modified files',
      expectedKeywords: ['git', 'status'],
      successOutput: [
        'On branch fix/docs-clarify-setup',
        'Changes not staged for commit:',
        '  (use "git add <file>..." to update what will be committed)',
        '        modified:   docs/getting-started.md',
        '',
        'no changes added to commit (use "git add" to track)',
      ],
    },
    {
      step: 4,
      targetCmd: 'git add docs/getting-started.md',
      shortCmd: 'git add',
      hint: 'Stage your modified file to the Git index',
      expectedKeywords: ['git', 'add'],
      successOutput: [
        '✓ docs/getting-started.md staged for commit.',
        'Run "git status" or "git commit -m" next.',
      ],
    },
    {
      step: 5,
      targetCmd: 'git commit -m "docs: clarify setup prerequisites for beginners"',
      shortCmd: 'git commit',
      hint: 'Commit your staged changes with a semantic Conventional Commit message',
      expectedKeywords: ['git', 'commit', '-m'],
      successOutput: [
        '[fix/docs-clarify-setup a4f81c9] docs: clarify setup prerequisites for beginners',
        ' 1 file changed, 14 insertions(+), 2 deletions(-)',
        '✓ Commit recorded locally with SHA a4f81c9!',
      ],
    },
    {
      step: 6,
      targetCmd: 'git push origin fix/docs-clarify-setup',
      shortCmd: 'git push',
      hint: 'Push your branch up to your personal fork on GitHub',
      expectedKeywords: ['git', 'push'],
      successOutput: [
        'Enumerating objects: 7, done.',
        'Writing objects: 100% (4/4), 412 bytes | 412.00 KiB/s, done.',
        'Total 4 (delta 2), reused 0 (delta 0)',
        'To https://github.com/YOUR_USERNAME/openhub-demo.git',
        ' * [new branch]      fix/docs-clarify-setup -> fix/docs-clarify-setup',
        '',
        '🎉 SUCCESS! GitHub PR link created:',
        'Create a pull request for \'fix/docs-clarify-setup\' on GitHub by visiting:',
        '  https://github.com/upstream/openhub-demo/pull/new/fix/docs-clarify-setup',
      ],
    },
  ];

  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'info', text: 'OpenHub Interactive Git Sandbox v1.0.0' },
    { type: 'info', text: 'Practice the complete open-source PR workflow in a safe, stress-free browser terminal.' },
    { type: 'info', text: 'Type commands below, or click "Run Step" to test the command.' },
    { type: 'output', text: '---' },
  ]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  if (!isOpen) return null;

  const currentStep = practiceSteps[currentStepIndex];

  const handleExecuteCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [...lines, { type: 'command', text: `$ ${trimmed}` }];

    if (trimmed === 'clear') {
      setLines([]);
      setInputVal('');
      return;
    }

    if (trimmed === 'help') {
      newLines.push({
        type: 'info',
        text: 'Available commands: git clone, git checkout -b, git status, git add, git commit -m, git push, clear, help',
      });
      setLines(newLines);
      setInputVal('');
      return;
    }

    if (!currentStep) {
      newLines.push({
        type: 'success',
        text: 'All practice steps completed! Click "Reset Sandbox" to practice again.',
      });
      setLines(newLines);
      setInputVal('');
      return;
    }

    // Check if the command matches the current step requirements
    const matches = currentStep.expectedKeywords.every((kw) =>
      trimmed.toLowerCase().includes(kw.toLowerCase())
    );

    if (matches) {
      currentStep.successOutput.forEach((out) => {
        newLines.push({ type: 'output', text: out });
      });

      if (currentStepIndex + 1 < practiceSteps.length) {
        setCurrentStepIndex((prev) => prev + 1);
        const nextStep = practiceSteps[currentStepIndex + 1];
        newLines.push({
          type: 'info',
          text: `\n▶ Next Step ${nextStep.step}: ${nextStep.hint}`,
        });
      } else {
        newLines.push({
          type: 'success',
          text: '\n🏆 Congratulations! You have mastered the entire Git pull request workflow!',
        });
        setCurrentStepIndex(practiceSteps.length);
      }
    } else {
      newLines.push({
        type: 'error',
        text: `git: unexpected command or arguments for Step ${currentStep.step}.`,
      });
      newLines.push({
        type: 'info',
        text: `💡 Hint: Try typing: "${currentStep.targetCmd}"`,
      });
    }

    setLines(newLines);
    setInputVal('');
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setLines([
      { type: 'info', text: 'OpenHub Interactive Git Sandbox reset.' },
      { type: 'info', text: `Step 1: ${practiceSteps[0].hint}` },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Terminal Window Header */}
        <div className="px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>git-practice-terminal ~/openhub</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 cursor-pointer transition-colors"
              title="Reset Sandbox"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-zinc-100 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Step Tracker Bar */}
        {currentStep && (
          <div className="px-5 py-2.5 bg-zinc-900/50 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-amber-500 font-semibold">
                Step {currentStep.step}/6:
              </span>
              <span className="text-zinc-300">{currentStep.hint}</span>
            </div>
            <button
              onClick={() => handleExecuteCommand(currentStep.targetCmd)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-700/30 hover:bg-amber-700/50 border border-amber-600/40 text-amber-300 rounded text-[11px] font-mono transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Play className="w-3 h-3" />
              <span>Auto-Run: {currentStep.shortCmd}</span>
            </button>
          </div>
        )}

        {/* Terminal Output Body */}
        <div className="p-5 font-mono text-xs overflow-y-auto flex-1 space-y-1.5 leading-relaxed selection:bg-amber-500 selection:text-black">
          {lines.map((l, idx) => (
            <div
              key={idx}
              className={`${
                l.type === 'command'
                  ? 'text-amber-400 font-semibold'
                  : l.type === 'error'
                  ? 'text-red-400'
                  : l.type === 'success'
                  ? 'text-emerald-400 font-semibold'
                  : l.type === 'info'
                  ? 'text-zinc-400'
                  : 'text-zinc-200'
              } whitespace-pre-wrap`}
            >
              {l.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleExecuteCommand(inputVal);
          }}
          className="p-3 border-t border-zinc-800 bg-zinc-900/90 flex items-center gap-2"
        >
          <span className="text-amber-500 font-mono text-xs select-none">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={currentStep ? `e.g. ${currentStep.targetCmd}` : 'Type "clear" or "help"...'}
            className="flex-1 bg-transparent text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-hidden"
            autoFocus
          />
          <button
            type="submit"
            className="p-1.5 text-zinc-400 hover:text-amber-400 cursor-pointer transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
