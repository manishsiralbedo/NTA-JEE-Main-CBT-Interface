import React from 'react';
import { NTAStateBadge } from './NTAStateBadge';
import { X, BookOpen, AlertCircle } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in">
        <div className="bg-blue-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">General Instructions &amp; Question Palette Guide</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Exam Duration:</strong> 180 Minutes (3 Hours). The countdown timer in the top banner will display remaining time. At 00:00:00, the test will automatically submit.
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Navigating to a Question:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
              <li>Click on <strong className="text-emerald-700">Save &amp; Next</strong> to save your answer for the current question and then go to the next question.</li>
              <li>Click on <strong className="text-purple-700">Mark for Review &amp; Next</strong> to save your answer for the current question, mark it for review, and then go to the next question.</li>
            </ol>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Answering a Question:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Procedure for answering a multiple choice type question:</strong> To select your answer, click on the button of one of the options. To deselect your chosen answer, click on the <strong className="text-rose-700">Clear Response</strong> button.</li>
              <li><strong>Procedure for answering numerical value questions:</strong> Use the virtual numerical keypad or input box to enter the numerical value.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Official Question Palette Symbols:</h4>
            <div className="space-y-2 border border-slate-200 rounded-lg p-3 bg-slate-50">
              <div className="flex items-center gap-3">
                <NTAStateBadge status="NOT_VISITED" label="1" size="sm" />
                <span>You have not visited the question yet.</span>
              </div>
              <div className="flex items-center gap-3">
                <NTAStateBadge status="NOT_ANSWERED" label="2" size="sm" />
                <span>You have not answered the question.</span>
              </div>
              <div className="flex items-center gap-3">
                <NTAStateBadge status="ANSWERED" label="3" size="sm" />
                <span>You have answered the question.</span>
              </div>
              <div className="flex items-center gap-3">
                <NTAStateBadge status="MARKED_FOR_REVIEW" label="4" size="sm" />
                <span>You have NOT answered the question, but have marked the question for review.</span>
              </div>
              <div className="flex items-center gap-3">
                <NTAStateBadge status="ANSWERED_AND_MARKED" label="5" size="sm" />
                <span>The question(s) &quot;Answered and Marked for Review&quot; will be considered for evaluation.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 border-t border-slate-200 px-5 py-2.5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs sm:text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded"
          >
            Close Instructions
          </button>
        </div>
      </div>
    </div>
  );
};
