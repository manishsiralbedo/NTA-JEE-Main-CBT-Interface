import React from 'react';
import { ChevronLeft, ChevronRight, Check, Bookmark, RotateCcw, Send } from 'lucide-react';

interface ActionFooterProps {
  onSaveAndNext: () => void;
  onMarkForReviewAndNext: () => void;
  onClearResponse: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmitExam: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  hasAnswer: boolean;
}

export const ActionFooter: React.FC<ActionFooterProps> = ({
  onSaveAndNext,
  onMarkForReviewAndNext,
  onClearResponse,
  onPrevious,
  onNext,
  onSubmitExam,
  hasPrevious,
  hasNext,
  hasAnswer,
}) => {
  return (
    <div className="bg-slate-100 border-t border-slate-300 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 select-none shadow-xs">
      {/* Left Action Buttons requested by user */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Save & Next (Primary Action in Green / Blue) */}
        <button
          id="btn-save-next"
          type="button"
          onClick={onSaveAndNext}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded border border-emerald-700 shadow-xs transition-colors active:scale-98"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Save &amp; Next</span>
        </button>

        {/* Clear Response */}
        <button
          id="btn-clear-response"
          type="button"
          onClick={onClearResponse}
          disabled={!hasAnswer}
          className={`
            inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 font-medium text-xs sm:text-sm rounded border transition-colors
            ${
              hasAnswer
                ? 'bg-white hover:bg-rose-50 text-rose-700 border-rose-300 shadow-2xs cursor-pointer'
                : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
            }
          `}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Response</span>
        </button>

        {/* Mark for Review & Next */}
        <button
          id="btn-mark-review-next"
          type="button"
          onClick={onMarkForReviewAndNext}
          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm rounded border border-purple-700 shadow-xs transition-colors active:scale-98"
        >
          <Bookmark className="w-4 h-4" />
          <span>Mark for Review &amp; Next</span>
        </button>
      </div>

      {/* Right Navigation & Submit Buttons */}
      <div className="flex items-center gap-2">
        <button
          id="btn-previous"
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`
            inline-flex items-center gap-1 px-3 py-2 rounded text-xs sm:text-sm font-semibold border transition-colors
            ${
              hasPrevious
                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
                : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
            }
          `}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <button
          id="btn-next"
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className={`
            inline-flex items-center gap-1 px-3 py-2 rounded text-xs sm:text-sm font-semibold border transition-colors
            ${
              hasNext
                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
                : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
            }
          `}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          id="btn-submit-exam"
          type="button"
          onClick={onSubmitExam}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded border border-blue-800 shadow-xs transition-colors active:scale-98 ml-1"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
};
