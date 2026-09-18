import React, { useState } from 'react';
import { Question, Subject } from '../types';
import { KaTeXRenderer } from './KaTeXRenderer';
import { X, FileText } from 'lucide-react';

interface QuestionPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onSelectQuestion: (id: number) => void;
}

export const QuestionPaperModal: React.FC<QuestionPaperModalProps> = ({
  isOpen,
  onClose,
  questions,
  onSelectQuestion,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Physics');

  if (!isOpen) return null;

  const filtered = questions.filter((q) => q.subject === selectedSubject);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in">
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Question Paper View</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subject Filter Bar */}
        <div className="bg-slate-100 px-5 py-2 border-b border-slate-200 flex items-center gap-2">
          {(['Physics', 'Chemistry', 'Mathematics'] as Subject[]).map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                selectedSubject === sub
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              {sub} (25 Questions)
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-900">
                  Question {q.id} ({q.section})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectQuestion(q.id);
                  }}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded font-semibold text-xs border border-blue-200"
                >
                  Go to this question &rarr;
                </button>
              </div>
              <div className="font-medium text-slate-800">
                <KaTeXRenderer content={q.questionText} />
              </div>
              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="p-2 bg-white rounded border border-slate-200 flex items-baseline gap-2"
                    >
                      <span className="font-bold text-slate-600">({opt.id})</span>
                      <KaTeXRenderer content={opt.label} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-100 border-t border-slate-200 px-5 py-2.5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
