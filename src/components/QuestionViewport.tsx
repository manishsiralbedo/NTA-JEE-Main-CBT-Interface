import React from 'react';
import { Question } from '../types';
import { KaTeXRenderer } from './KaTeXRenderer';
import { Clock, CheckCircle2, AlertTriangle, ZoomIn, ZoomOut, Hash, RotateCcw } from 'lucide-react';

interface QuestionViewportProps {
  question: Question;
  selectedAnswer: string;
  onSelectAnswer: (value: string) => void;
  timeSpentSeconds: number;
  fontSize: 'small' | 'medium' | 'large';
  onChangeFontSize: (size: 'small' | 'medium' | 'large') => void;
  isFrozen?: boolean;
}

export const QuestionViewport: React.FC<QuestionViewportProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  timeSpentSeconds,
  fontSize,
  onChangeFontSize,
  isFrozen = false,
}) => {
  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const fontSizeClasses = {
    small: 'text-sm leading-relaxed',
    medium: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
  }[fontSize];

  // For virtual numeric keypad in Section B (Numerical)
  const handleKeypadPress = (val: string) => {
    if (isFrozen) return;
    if (val === 'CLEAR') {
      onSelectAnswer('');
    } else if (val === 'BACKSPACE') {
      onSelectAnswer(selectedAnswer.slice(0, -1));
    } else if (val === '.') {
      if (!selectedAnswer.includes('.')) {
        onSelectAnswer(selectedAnswer + '.');
      }
    } else if (val === '-') {
      if (selectedAnswer.startsWith('-')) {
        onSelectAnswer(selectedAnswer.slice(1));
      } else {
        onSelectAnswer('-' + selectedAnswer);
      }
    } else {
      // digit
      if (selectedAnswer.length < 10) {
        onSelectAnswer(selectedAnswer + val);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden border-r border-slate-300">
      {/* Sub-Header: Question Meta Info */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 gap-2">
        <div className="flex items-center gap-3">
          <span
            id="current-question-badge"
            className="px-2.5 py-1 bg-blue-700 text-white font-bold text-xs sm:text-sm rounded"
          >
            Question No. {question.id}
          </span>
          <span className="text-xs font-semibold text-slate-600">
            {question.subject} &bull; {question.section} ({question.type === 'MCQ' ? 'Single Choice' : 'Numerical'})
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Marks display */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold">
              +{question.marks.correct}.00
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-300 font-semibold">
              {question.marks.incorrect}.00
            </span>
          </div>

          {/* Per-Question Telemetry Clock */}
          <div
            id="question-telemetry-indicator"
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300 text-xs font-mono font-bold"
            title="Time spent on this specific question"
          >
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Time: {formatSeconds(timeSpentSeconds)}</span>
          </div>

          {/* Font scale buttons */}
          <div className="hidden sm:flex items-center gap-0.5 border border-slate-300 rounded bg-white p-0.5">
            <button
              type="button"
              onClick={() => onChangeFontSize('small')}
              className={`px-1.5 py-0.5 text-xs font-bold rounded ${fontSize === 'small' ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Small Text"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => onChangeFontSize('medium')}
              className={`px-1.5 py-0.5 text-xs font-bold rounded ${fontSize === 'medium' ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Standard Text"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => onChangeFontSize('large')}
              className={`px-1.5 py-0.5 text-xs font-bold rounded ${fontSize === 'large' ? 'bg-slate-200 text-slate-900' : 'text-slate-600'}`}
              title="Large Text"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Content Area (Scrollable) */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-6 ${fontSizeClasses} text-slate-800`}>
        {isFrozen && (
          <div className="mb-4 p-2.5 bg-amber-50 border border-amber-300 rounded-lg flex items-center justify-between text-xs text-amber-900">
            <span className="font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Examination Submitted &bull; All candidate responses are frozen in read-only mode.
            </span>
          </div>
        )}

        {/* Question Text */}
        <div className="mb-6 p-4 bg-slate-50/70 rounded-lg border border-slate-200 shadow-2xs">
          <div className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-blue-600" />
            <span>Question Statement</span>
          </div>
          <KaTeXRenderer
            content={question.questionText}
            className="text-slate-900 font-medium"
          />
        </div>

        {/* Options for MCQ */}
        {question.type === 'MCQ' && question.options && (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Select One Option:
            </div>
            {question.options.map((option) => {
              const isChecked = selectedAnswer === option.id;
              return (
                <label
                  key={option.id}
                  id={`option-${question.id}-${option.id}`}
                  onClick={() => !isFrozen && onSelectAnswer(option.id)}
                  className={`
                    flex items-start gap-3.5 p-3.5 rounded-lg border transition-all select-none
                    ${isFrozen ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}
                    ${
                      isChecked
                        ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500 text-slate-900 shadow-2xs'
                        : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    value={option.id}
                    checked={isChecked}
                    disabled={isFrozen}
                    onChange={() => !isFrozen && onSelectAnswer(option.id)}
                    className="mt-1 w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <div className="flex items-baseline gap-2 flex-1">
                    <span className="font-bold text-slate-700 text-sm">
                      ({option.id})
                    </span>
                    <div className="flex-1">
                      <KaTeXRenderer content={option.label} />
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* Numerical Value Input for Section B */}
        {question.type === 'NUMERICAL' && (
          <div className="mt-4 p-4 sm:p-5 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-slate-800 text-sm">
                Enter Numerical Answer (Rounded to nearest integer / decimal):
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-full sm:w-64">
                <input
                  id="numerical-answer-input"
                  type="text"
                  readOnly
                  placeholder="Enter value"
                  value={selectedAnswer}
                  className="w-full text-center font-mono text-xl font-bold px-4 py-2.5 bg-white border-2 border-blue-600 rounded-md shadow-inner text-blue-900 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => handleKeypadPress('CLEAR')}
                className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded border border-slate-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear Input
              </button>
            </div>

            {/* Virtual Keypad (Authentic to CBT) */}
            <div className="mt-4 max-w-xs">
              <div className="text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                Virtual Numeric Keypad:
              </div>
              <div className="grid grid-cols-4 gap-1.5 bg-white p-2.5 rounded-lg border border-slate-300 shadow-2xs">
                {['7', '8', '9', 'BACKSPACE', '4', '5', '6', 'CLEAR', '1', '2', '3', '-', '0', '.'].map((key) => {
                  let spanClass = '';
                  let label: React.ReactNode = key;
                  if (key === 'BACKSPACE') {
                    label = 'Bksp';
                  } else if (key === 'CLEAR') {
                    label = 'Clear';
                  }
                  if (key === '0') {
                    spanClass = 'col-span-2';
                  }

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeypadPress(key)}
                      className={`
                        py-2 text-sm font-bold rounded border transition-colors shadow-2xs active:scale-95
                        ${
                          key === 'CLEAR' || key === 'BACKSPACE'
                            ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 text-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        }
                        ${spanClass}
                      `}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
