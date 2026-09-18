import React from 'react';
import { Subject } from '../types';
import { Clock, User, AlertCircle, Play, Pause, FileText, Maximize2, Minimize2 } from 'lucide-react';

interface HeaderProps {
  remainingTimeSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
  subjectCounts: Record<Subject, { total: number; answered: number }>;
  onOpenInstructions: () => void;
  onOpenQuestionPaper: () => void;
  language: 'English' | 'Hindi';
  onChangeLanguage: (lang: 'English' | 'Hindi') => void;
  isFinalSubmitted?: boolean;
  onViewAnalytics?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  remainingTimeSeconds,
  isTimerRunning,
  onToggleTimer,
  currentSubject,
  onSelectSubject,
  subjectCounts,
  onOpenInstructions,
  onOpenQuestionPaper,
  language,
  onChangeLanguage,
  isFinalSubmitted = false,
  onViewAnalytics,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const isLowTime = remainingTimeSeconds < 600; // less than 10 mins

  const subjects: Subject[] = ['Physics', 'Chemistry', 'Mathematics'];

  return (
    <header className="bg-white border-b border-slate-300 shadow-xs select-none">
      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 py-2 border-b border-slate-200 bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
        {/* Left: Exam Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-white text-blue-900 font-extrabold text-sm shadow-sm tracking-tighter">
            NTA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm sm:text-base tracking-tight text-white leading-tight">
                JEE (Main) Examination — Paper 1 (B.E./B.Tech)
              </h1>
              <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] uppercase font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded">
                Live CBT
              </span>
            </div>
            <p className="text-xs text-slate-300 hidden sm:block">
              National Testing Agency Mock Test Environment
            </p>
          </div>
        </div>

        {/* Center: Countdown Timer or Submitted indicator */}
        <div className="flex items-center gap-3 my-1 sm:my-0">
          {isFinalSubmitted ? (
            <div className="flex items-center gap-2">
              <div
                id="candidate-timer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs sm:text-sm font-mono font-bold bg-emerald-950/70 border-emerald-500 text-emerald-300"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Submitted &bull; Frozen</span>
              </div>
              {onViewAnalytics && (
                <button
                  id="header-view-analytics-btn"
                  type="button"
                  onClick={onViewAnalytics}
                  className="px-3 py-1 text-xs font-bold rounded-md bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition-colors flex items-center gap-1"
                >
                  <span>View Analytics &amp; SLP</span>
                </button>
              )}
            </div>
          ) : (
            <>
              <div
                id="candidate-timer"
                className={`flex items-center gap-2 px-3 py-1 rounded-md border text-sm sm:text-base font-mono font-bold shadow-inner ${
                  isLowTime
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300 animate-pulse'
                    : 'bg-slate-800/80 border-slate-600 text-amber-300'
                }`}
              >
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-sans text-slate-300 mr-1 hidden xs:inline">Time Left:</span>
                <span className="tracking-wider">{formatTime(remainingTimeSeconds)}</span>
              </div>

              {/* Pause / Resume toggle for mock test convenience */}
              <button
                id="timer-toggle-btn"
                type="button"
                onClick={onToggleTimer}
                title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs flex items-center gap-1 transition-colors"
              >
                {isTimerRunning ? (
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
            </>
          )}
        </div>

        {/* Right: Candidate Mini Profile & Tools */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-right text-xs text-slate-200">
            <div>
              <div className="font-semibold text-white">Abhinav Sharma</div>
              <div className="text-slate-400 text-[11px]">Roll: 250310084920</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 border-l border-slate-700 pl-2">
            <button
              id="view-instructions-btn"
              type="button"
              onClick={onOpenInstructions}
              className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 flex items-center gap-1 transition-colors"
              title="View Instructions"
            >
              <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Instructions</span>
            </button>

            <button
              id="view-question-paper-btn"
              type="button"
              onClick={onOpenQuestionPaper}
              className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 flex items-center gap-1 transition-colors"
              title="Question Paper Overview"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Question Paper</span>
            </button>

            <button
              id="fullscreen-btn"
              type="button"
              onClick={toggleFullscreen}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs hidden sm:flex items-center"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Subject Switch Tabs Row */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 py-1.5 bg-slate-100 border-b border-slate-300 gap-2">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider hidden sm:inline mr-1">
            Sections:
          </span>
          {subjects.map((sub) => {
            const isActive = currentSubject === sub;
            const count = subjectCounts[sub];
            return (
              <button
                key={sub}
                id={`subject-tab-${sub.toLowerCase()}`}
                type="button"
                onClick={() => onSelectSubject(sub)}
                className={`
                  flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-t-md text-xs sm:text-sm font-semibold transition-all border-b-2
                  ${
                    isActive
                      ? 'bg-white text-blue-800 border-blue-600 shadow-xs'
                      : 'bg-slate-200/80 hover:bg-slate-200 text-slate-700 border-transparent'
                  }
                `}
              >
                <span>{sub}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-slate-300/70 text-slate-600'
                  }`}
                >
                  {count.answered}/{count.total}
                </span>
              </button>
            );
          })}
        </div>

        {/* Language selector & Marking scheme hint */}
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <label htmlFor="view-lang" className="text-slate-600 font-medium hidden xs:inline">
              View in:
            </label>
            <select
              id="view-lang"
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as 'English' | 'Hindi')}
              className="text-xs font-semibold bg-white border border-slate-300 rounded px-2 py-0.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
