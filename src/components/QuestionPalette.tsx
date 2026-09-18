import React, { useState } from 'react';
import { Question, QuestionStatus, Subject } from '../types';
import { NTAStateBadge } from './NTAStateBadge';
import { User, ChevronRight, ChevronLeft, Layers, CheckCircle } from 'lucide-react';

interface QuestionPaletteProps {
  questions: Question[];
  currentQuestionId: number;
  statuses: Record<number, QuestionStatus>;
  onSelectQuestion: (questionId: number) => void;
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSubmitExam: () => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentQuestionId,
  statuses,
  onSelectQuestion,
  currentSubject,
  onSelectSubject,
  isCollapsed,
  onToggleCollapse,
  onSubmitExam,
}) => {
  const [viewFilter, setViewFilter] = useState<'ALL' | 'SUBJECT'>('ALL');

  // Compute status counts across all 75 questions
  const statusCounts = questions.reduce(
    (acc, q) => {
      const status = statuses[q.id] || 'NOT_VISITED';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {
      ANSWERED: 0,
      NOT_ANSWERED: 0,
      NOT_VISITED: 0,
      MARKED_FOR_REVIEW: 0,
      ANSWERED_AND_MARKED: 0,
    } as Record<QuestionStatus, number>
  );

  const displayedQuestions =
    viewFilter === 'ALL'
      ? questions
      : questions.filter((q) => q.subject === currentSubject);

  if (isCollapsed) {
    return (
      <div className="relative border-l border-slate-300 bg-slate-50 flex flex-col items-center py-4 px-1 select-none">
        <button
          id="expand-palette-btn"
          type="button"
          onClick={onToggleCollapse}
          className="p-2 rounded bg-blue-700 hover:bg-blue-800 text-white shadow-md flex items-center justify-center transition-colors"
          title="Expand Question Palette"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="[writing-mode:vertical-rl] font-bold text-xs text-slate-600 mt-6 tracking-wider uppercase">
          Question Palette (75)
        </span>
      </div>
    );
  }

  return (
    <aside
      id="question-palette-sidebar"
      className="w-80 sm:w-88 md:w-96 flex flex-col h-full bg-white border-l border-slate-300 select-none overflow-hidden relative shadow-sm"
    >
      {/* Collapse Toggle Tab on Left Border */}
      <button
        id="collapse-palette-btn"
        type="button"
        onClick={onToggleCollapse}
        className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-l-md shadow-md flex items-center justify-center transition-colors"
        title="Collapse Palette"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Candidate Profile Bar */}
      <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-3">
        <div className="w-12 h-12 rounded-md bg-slate-300 border border-slate-400 flex items-center justify-center text-slate-600 font-bold overflow-hidden shrink-0">
          <User className="w-7 h-7 text-slate-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-500 uppercase">Candidate Name:</div>
          <div className="text-sm font-bold text-slate-800 truncate">ABHINAV SHARMA</div>
          <div className="text-[11px] text-slate-600">Roll: 250310084920</div>
        </div>
      </div>

      {/* Legend of 5 Official NTA States with Live Counts */}
      <div className="p-3 bg-slate-50 border-b border-slate-200">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
          <span>Question Status Legend</span>
          <span className="text-[10px] text-slate-500 font-normal">75 Total</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Answered */}
          <div className="flex items-center gap-2 p-1 rounded bg-white border border-slate-200">
            <NTAStateBadge
              status="ANSWERED"
              label={statusCounts.ANSWERED}
              size="sm"
            />
            <span className="text-slate-700 font-medium text-[11px] leading-tight">
              Answered
            </span>
          </div>

          {/* Not Answered */}
          <div className="flex items-center gap-2 p-1 rounded bg-white border border-slate-200">
            <NTAStateBadge
              status="NOT_ANSWERED"
              label={statusCounts.NOT_ANSWERED}
              size="sm"
            />
            <span className="text-slate-700 font-medium text-[11px] leading-tight">
              Not Answered
            </span>
          </div>

          {/* Not Visited */}
          <div className="flex items-center gap-2 p-1 rounded bg-white border border-slate-200">
            <NTAStateBadge
              status="NOT_VISITED"
              label={statusCounts.NOT_VISITED}
              size="sm"
            />
            <span className="text-slate-700 font-medium text-[11px] leading-tight">
              Not Visited
            </span>
          </div>

          {/* Marked for Review */}
          <div className="flex items-center gap-2 p-1 rounded bg-white border border-slate-200">
            <NTAStateBadge
              status="MARKED_FOR_REVIEW"
              label={statusCounts.MARKED_FOR_REVIEW}
              size="sm"
            />
            <span className="text-slate-700 font-medium text-[11px] leading-tight">
              Marked for Review
            </span>
          </div>
        </div>

        {/* 5th State: Answered & Marked for Review (Spans full width) */}
        <div className="mt-2 flex items-center gap-2 p-1.5 rounded bg-white border border-slate-200">
          <NTAStateBadge
            status="ANSWERED_AND_MARKED"
            label={statusCounts.ANSWERED_AND_MARKED}
            size="sm"
          />
          <span className="text-slate-700 font-medium text-[11px] leading-tight">
            Answered &amp; Marked for Review{' '}
            <span className="text-purple-700 text-[10px] block">
              (will be considered for evaluation)
            </span>
          </span>
        </div>
      </div>

      {/* Palette Header & Filter Toggle */}
      <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
        <div className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-700" />
          <span>Choose a Question</span>
        </div>

        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setViewFilter('ALL')}
            className={`px-2 py-0.5 rounded font-semibold transition-colors ${
              viewFilter === 'ALL'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            All 75
          </button>
          <button
            type="button"
            onClick={() => setViewFilter('SUBJECT')}
            className={`px-2 py-0.5 rounded font-semibold transition-colors ${
              viewFilter === 'SUBJECT'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {currentSubject.slice(0, 4)}
          </button>
        </div>
      </div>

      {/* 75 Question Grid (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {viewFilter === 'ALL' ? (
          // Grouped by Subject: Physics (1-25), Chemistry (26-50), Mathematics (51-75)
          (['Physics', 'Chemistry', 'Mathematics'] as Subject[]).map((subject) => {
            const subjectQuestions = questions.filter((q) => q.subject === subject);
            return (
              <div key={subject} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 border-b border-slate-200 pb-1">
                  <span>{subject}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Q{subjectQuestions[0].id} - Q{subjectQuestions[subjectQuestions.length - 1].id}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2 justify-items-center">
                  {subjectQuestions.map((q) => {
                    const status = statuses[q.id] || 'NOT_VISITED';
                    const isSelected = q.id === currentQuestionId;
                    return (
                      <NTAStateBadge
                        key={q.id}
                        status={status}
                        label={q.id}
                        isSelected={isSelected}
                        size="md"
                        onClick={() => onSelectQuestion(q.id)}
                        title={`Question ${q.id} (${subject}) - Status: ${status.replace(/_/g, ' ')}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          // Current Subject only
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 border-b border-slate-200 pb-1">
              <span>{currentSubject} Questions</span>
              <span className="text-[10px] text-slate-400 font-normal">25 Questions</span>
            </div>
            <div className="grid grid-cols-5 gap-2 justify-items-center">
              {displayedQuestions.map((q) => {
                const status = statuses[q.id] || 'NOT_VISITED';
                const isSelected = q.id === currentQuestionId;
                return (
                  <NTAStateBadge
                    key={q.id}
                    status={status}
                    label={q.id}
                    isSelected={isSelected}
                    size="md"
                    onClick={() => onSelectQuestion(q.id)}
                    title={`Question ${q.id} - Status: ${status.replace(/_/g, ' ')}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Submit Exam Button at bottom of sidebar */}
      <div className="p-3 bg-slate-100 border-t border-slate-200">
        <button
          id="palette-submit-btn"
          type="button"
          onClick={onSubmitExam}
          className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded border border-blue-800 shadow-xs flex items-center justify-center gap-2 transition-colors active:scale-98"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Submit Test</span>
        </button>
      </div>
    </aside>
  );
};
