import React from 'react';
import { Question, QuestionStatus, Subject } from '../types';
import { AlertTriangle, CheckCircle2, Bookmark, EyeOff, RotateCcw, X, ShieldAlert } from 'lucide-react';

interface SubmitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  questions: Question[];
  statuses: Record<number, QuestionStatus>;
  remainingTimeFormatted: string;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  questions,
  statuses,
  remainingTimeFormatted,
}) => {
  if (!isOpen) return null;

  // Calculate required summary stats:
  // 1. Total Attempted: Answered (Green) + Answered & Marked (Purple with green check)
  // 2. Marked for Review: Marked for Review (Purple) + Answered & Marked (Purple with green check)
  // 3. Unvisited: Not Visited (Gray)
  // 4. Not Answered: Not Answered (Red)
  let totalAttempted = 0;
  let totalMarkedForReview = 0;
  let totalUnvisited = 0;
  let totalNotAnswered = 0;

  questions.forEach((q) => {
    const s = statuses[q.id] || 'NOT_VISITED';
    if (s === 'ANSWERED') {
      totalAttempted++;
    } else if (s === 'ANSWERED_AND_MARKED') {
      totalAttempted++;
      totalMarkedForReview++;
    } else if (s === 'MARKED_FOR_REVIEW') {
      totalMarkedForReview++;
    } else if (s === 'NOT_ANSWERED') {
      totalNotAnswered++;
    } else {
      totalUnvisited++;
    }
  });

  const subjects: Subject[] = ['Physics', 'Chemistry', 'Mathematics'];
  const subjectAttempted = subjects.map((sub) => {
    const subQs = questions.filter((q) => q.subject === sub);
    const attempted = subQs.filter((q) => {
      const s = statuses[q.id];
      return s === 'ANSWERED' || s === 'ANSWERED_AND_MARKED';
    }).length;
    return { subject: sub, attempted, total: subQs.length };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 p-4 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-blue-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Final Submission Confirmation</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Main Question Header */}
          <div className="text-center py-1">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2 border border-amber-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Are you sure you want to submit?
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Once submitted, the timer will stop, your responses will be frozen, and your detailed Analytics &amp; Student Learning Plan (SLP) will be generated.
            </p>
          </div>

          {/* Key Summary Stats Cards requested by user */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {/* Total Attempted */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-700 mb-0.5">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Attempted</span>
              </div>
              <div className="text-2xl font-black text-emerald-800 font-mono">
                {totalAttempted}
              </div>
              <div className="text-[10px] text-emerald-600">out of 75</div>
            </div>

            {/* Marked for Review */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-700 mb-0.5">
                <Bookmark className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Marked</span>
              </div>
              <div className="text-2xl font-black text-purple-800 font-mono">
                {totalMarkedForReview}
              </div>
              <div className="text-[10px] text-purple-600">for Review</div>
            </div>

            {/* Unvisited */}
            <div className="bg-slate-100 border border-slate-300 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-600 mb-0.5">
                <EyeOff className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Unvisited</span>
              </div>
              <div className="text-2xl font-black text-slate-700 font-mono">
                {totalUnvisited}
              </div>
              <div className="text-[10px] text-slate-500">Unseen</div>
            </div>
          </div>

          {/* Additional details */}
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-600">
              <span>Time Remaining:</span>
              <span className="font-mono font-bold text-slate-800">{remainingTimeFormatted}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Not Answered (Visited but Skipped):</span>
              <span className="font-mono font-bold text-rose-700">{totalNotAnswered} questions</span>
            </div>
            <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Subject-wise Attempted:</span>
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                {subjectAttempted.map((s) => (
                  <span key={s.subject} className="bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {s.subject.slice(0, 4)}: {s.attempted}/{s.total}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3 flex items-center justify-end gap-2.5">
          <button
            id="cancel-submit-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md shadow-2xs transition-colors"
          >
            No, Return to Test
          </button>
          <button
            id="confirm-submit-btn"
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 border border-blue-800 rounded-md shadow-xs flex items-center gap-1.5 transition-colors active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Yes, Submit Test</span>
          </button>
        </div>
      </div>
    </div>
  );
};
