import React, { useState } from 'react';
import { Question, QuestionStatus, QuestionTelemetry, Subject } from '../types';
import { NTAStateBadge } from './NTAStateBadge';
import { KaTeXRenderer } from './KaTeXRenderer';
import { Clock, CheckCircle2, X, AlertTriangle, BarChart3, Award, RotateCcw, ChevronRight } from 'lucide-react';

interface ExamSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  answers: Record<number, string>;
  statuses: Record<number, QuestionStatus>;
  telemetry: Record<number, QuestionTelemetry>;
  isFinalSubmitted: boolean;
  onConfirmFinalSubmit: () => void;
  onResetTest: () => void;
  onJumpToQuestion: (qId: number) => void;
}

export const ExamSummaryModal: React.FC<ExamSummaryModalProps> = ({
  isOpen,
  onClose,
  questions,
  answers,
  statuses,
  telemetry,
  isFinalSubmitted,
  onConfirmFinalSubmit,
  onResetTest,
  onJumpToQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'TELEMETRY' | 'SOLUTIONS'>(
    isFinalSubmitted ? 'SOLUTIONS' : 'SUMMARY'
  );
  const [filterSubject, setFilterSubject] = useState<'ALL' | Subject>('ALL');

  if (!isOpen) return null;

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const subjects: Subject[] = ['Physics', 'Chemistry', 'Mathematics'];

  // Calculate subject-wise breakdown
  const summaryBySubject = subjects.map((sub) => {
    const subQuestions = questions.filter((q) => q.subject === sub);
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let totalTime = 0;

    subQuestions.forEach((q) => {
      const status = statuses[q.id] || 'NOT_VISITED';
      const time = telemetry[q.id]?.timeSpentSeconds || 0;
      totalTime += time;

      if (status === 'ANSWERED') answered++;
      else if (status === 'NOT_ANSWERED') notAnswered++;
      else if (status === 'MARKED_FOR_REVIEW') marked++;
      else if (status === 'ANSWERED_AND_MARKED') answeredAndMarked++;
      else notVisited++;
    });

    return {
      subject: sub,
      total: subQuestions.length,
      answered,
      notAnswered,
      notVisited,
      marked,
      answeredAndMarked,
      totalTime,
    };
  });

  // Calculate overall totals
  const totalQuestions = questions.length;
  const totalAnswered = summaryBySubject.reduce((sum, s) => sum + s.answered, 0);
  const totalNotAnswered = summaryBySubject.reduce((sum, s) => sum + s.notAnswered, 0);
  const totalNotVisited = summaryBySubject.reduce((sum, s) => sum + s.notVisited, 0);
  const totalMarked = summaryBySubject.reduce((sum, s) => sum + s.marked, 0);
  const totalAnsweredAndMarked = summaryBySubject.reduce((sum, s) => sum + s.answeredAndMarked, 0);
  const grandTotalTime = summaryBySubject.reduce((sum, s) => sum + s.totalTime, 0);

  // Score calculation (Evaluates ANSWERED and ANSWERED_AND_MARKED per official NTA rule)
  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  questions.forEach((q) => {
    const status = statuses[q.id];
    const candidateAnswer = (answers[q.id] || '').trim();
    // In NTA, Answered and Answered & Marked for Review are considered for evaluation
    if (status === 'ANSWERED' || status === 'ANSWERED_AND_MARKED') {
      if (candidateAnswer === q.correctAnswer.trim()) {
        totalScore += q.marks.correct;
        correctCount++;
      } else {
        totalScore += q.marks.incorrect;
        incorrectCount++;
      }
    }
  });

  // Telemetry stats
  const questionsWithTime = questions.map((q) => ({
    id: q.id,
    subject: q.subject,
    time: telemetry[q.id]?.timeSpentSeconds || 0,
    visits: telemetry[q.id]?.visitCount || 0,
  }));
  const maxTimeQuestion = [...questionsWithTime].sort((a, b) => b.time - a.time)[0];
  const avgTime = Math.round(grandTotalTime / 75);

  const filteredQuestions =
    filterSubject === 'ALL'
      ? questions
      : questions.filter((q) => q.subject === filterSubject);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-3 sm:p-5 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-blue-900 via-slate-900 to-blue-950 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold tracking-tight">
                {isFinalSubmitted ? 'Exam Results & Telemetry Analysis' : 'Exam Submission Summary'}
              </h2>
              <p className="text-xs text-slate-300">
                National Testing Agency &bull; JEE (Main) Computer-Based Test
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Banner if final submitted */}
        {isFinalSubmitted && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Final Exam Score
                </div>
                <div className="text-xl font-black text-emerald-900">
                  {totalScore} <span className="text-sm font-normal text-emerald-700">/ 300 Marks</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="bg-white px-3 py-1.5 rounded border border-emerald-200">
                <span className="text-slate-500 block text-[10px]">CORRECT</span>
                <span className="font-bold text-emerald-700 text-sm">{correctCount}</span>
              </div>
              <div className="bg-white px-3 py-1.5 rounded border border-emerald-200">
                <span className="text-slate-500 block text-[10px]">INCORRECT</span>
                <span className="font-bold text-rose-700 text-sm">{incorrectCount}</span>
              </div>
              <div className="bg-white px-3 py-1.5 rounded border border-emerald-200">
                <span className="text-slate-500 block text-[10px]">TIME SPENT</span>
                <span className="font-bold text-slate-800 text-sm font-mono">
                  {formatSeconds(grandTotalTime)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center px-5 bg-slate-100 border-b border-slate-200 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('SUMMARY')}
            className={`px-4 py-2 font-bold text-xs rounded-t-md transition-colors ${
              activeTab === 'SUMMARY'
                ? 'bg-white text-blue-900 border-t-2 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Exam Status Breakdown
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('TELEMETRY')}
            className={`px-4 py-2 font-bold text-xs rounded-t-md transition-colors ${
              activeTab === 'TELEMETRY'
                ? 'bg-white text-blue-900 border-t-2 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Per-Question Timing Telemetry
          </button>
          {isFinalSubmitted && (
            <button
              type="button"
              onClick={() => setActiveTab('SOLUTIONS')}
              className={`px-4 py-2 font-bold text-xs rounded-t-md transition-colors ${
                activeTab === 'SOLUTIONS'
                  ? 'bg-white text-blue-900 border-t-2 border-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Detailed Solutions with LaTeX
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'SUMMARY' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Official NTA Evaluation Note:</strong> Questions marked as{' '}
                  <span className="font-semibold text-emerald-700">Answered</span> and{' '}
                  <span className="font-semibold text-purple-700">
                    Answered &amp; Marked for Review
                  </span>{' '}
                  are evaluated. Questions Marked for Review without an answer are NOT considered for scoring.
                </div>
              </div>

              {/* Official NTA Summary Table */}
              <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-300">
                    <tr>
                      <th className="p-2.5 border-r border-slate-300">Subject</th>
                      <th className="p-2.5 border-r border-slate-300 text-center">No. of Questions</th>
                      <th className="p-2.5 border-r border-slate-300 text-center bg-emerald-50 text-emerald-800">
                        Answered
                      </th>
                      <th className="p-2.5 border-r border-slate-300 text-center bg-rose-50 text-rose-800">
                        Not Answered
                      </th>
                      <th className="p-2.5 border-r border-slate-300 text-center bg-purple-50 text-purple-800">
                        Marked for Review
                      </th>
                      <th className="p-2.5 border-r border-slate-300 text-center bg-purple-100 text-purple-900">
                        Ans &amp; Marked
                      </th>
                      <th className="p-2.5 border-r border-slate-300 text-center">Not Visited</th>
                      <th className="p-2.5 text-center font-mono">Time Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {summaryBySubject.map((row) => (
                      <tr key={row.subject} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-800 border-r border-slate-200">
                          {row.subject}
                        </td>
                        <td className="p-2.5 text-center border-r border-slate-200 font-semibold">
                          {row.total}
                        </td>
                        <td className="p-2.5 text-center border-r border-slate-200 font-bold text-emerald-700 bg-emerald-50/40">
                          {row.answered}
                        </td>
                        <td className="p-2.5 text-center border-r border-slate-200 font-bold text-rose-700 bg-rose-50/40">
                          {row.notAnswered}
                        </td>
                        <td className="p-2.5 text-center border-r border-slate-200 font-bold text-purple-700 bg-purple-50/40">
                          {row.marked}
                        </td>
                        <td className="p-2.5 text-center border-r border-slate-200 font-bold text-purple-900 bg-purple-100/40">
                          {row.answeredAndMarked}
                        </td>
                        <td className="p-2.5 text-center border-r border-slate-200 text-slate-500 font-semibold">
                          {row.notVisited}
                        </td>
                        <td className="p-2.5 text-center font-mono font-semibold text-slate-700">
                          {formatSeconds(row.totalTime)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-900">
                    <tr>
                      <td className="p-2.5 border-r border-slate-300">Total</td>
                      <td className="p-2.5 text-center border-r border-slate-300">{totalQuestions}</td>
                      <td className="p-2.5 text-center border-r border-slate-300 text-emerald-800">
                        {totalAnswered}
                      </td>
                      <td className="p-2.5 text-center border-r border-slate-300 text-rose-800">
                        {totalNotAnswered}
                      </td>
                      <td className="p-2.5 text-center border-r border-slate-300 text-purple-800">
                        {totalMarked}
                      </td>
                      <td className="p-2.5 text-center border-r border-slate-300 text-purple-950">
                        {totalAnsweredAndMarked}
                      </td>
                      <td className="p-2.5 text-center border-r border-slate-300 text-slate-600">
                        {totalNotVisited}
                      </td>
                      <td className="p-2.5 text-center font-mono text-blue-900">
                        {formatSeconds(grandTotalTime)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'TELEMETRY' && (
            <div className="space-y-4">
              {/* Telemetry Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-[11px] font-semibold text-blue-800 uppercase">Total Active Time</div>
                  <div className="text-xl font-black text-blue-950 font-mono mt-0.5">
                    {formatSeconds(grandTotalTime)}
                  </div>
                  <div className="text-[11px] text-blue-700 mt-0.5">Tracked in local telemetry state</div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="text-[11px] font-semibold text-amber-800 uppercase">Average Time / Question</div>
                  <div className="text-xl font-black text-amber-950 font-mono mt-0.5">
                    {formatSeconds(avgTime)}
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">Across all 75 questions</div>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-[11px] font-semibold text-purple-800 uppercase">Most Time Spent</div>
                  <div className="text-xl font-black text-purple-950 font-mono mt-0.5">
                    Q{maxTimeQuestion?.id} ({formatSeconds(maxTimeQuestion?.time || 0)})
                  </div>
                  <div className="text-[11px] text-purple-700 mt-0.5">
                    {maxTimeQuestion?.subject} &bull; {maxTimeQuestion?.visits || 0} visits
                  </div>
                </div>
              </div>

              {/* Filter controls */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Detailed Telemetry Log (75 Questions):</span>
                <div className="flex items-center gap-1 text-xs">
                  {(['ALL', 'Physics', 'Chemistry', 'Mathematics'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFilterSubject(s)}
                      className={`px-2 py-1 rounded font-semibold transition-colors ${
                        filterSubject === s
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 75 Question Telemetry Table */}
              <div className="max-h-72 overflow-y-auto border border-slate-300 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 sticky top-0 border-b border-slate-300 font-bold text-slate-700">
                    <tr>
                      <th className="p-2">Q No.</th>
                      <th className="p-2">Subject</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Response</th>
                      <th className="p-2 font-mono">Time Spent</th>
                      <th className="p-2">Visits</th>
                      <th className="p-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredQuestions.map((q) => {
                      const status = statuses[q.id] || 'NOT_VISITED';
                      const answer = answers[q.id] || '-';
                      const itemTelemetry = telemetry[q.id] || { timeSpentSeconds: 0, visitCount: 0 };
                      return (
                        <tr key={q.id} className="hover:bg-slate-50">
                          <td className="p-2 font-bold text-slate-800">Q{q.id}</td>
                          <td className="p-2 text-slate-600">{q.subject}</td>
                          <td className="p-2">
                            <span className="inline-flex items-center gap-1">
                              <NTAStateBadge status={status} label={q.id} size="sm" />
                              <span className="text-[11px] font-medium text-slate-700">
                                {status.replace(/_/g, ' ')}
                              </span>
                            </span>
                          </td>
                          <td className="p-2 font-mono font-semibold text-slate-800">{answer}</td>
                          <td className="p-2 font-mono font-bold text-blue-900">
                            {formatSeconds(itemTelemetry.timeSpentSeconds)}
                          </td>
                          <td className="p-2 text-slate-600">{itemTelemetry.visitCount}</td>
                          <td className="p-2 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                onJumpToQuestion(q.id);
                              }}
                              className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                            >
                              Jump to Q
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'SOLUTIONS' && isFinalSubmitted && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Solutions with Step-by-Step LaTeX:</span>
                <div className="flex items-center gap-1 text-xs">
                  {(['ALL', 'Physics', 'Chemistry', 'Mathematics'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFilterSubject(s)}
                      className={`px-2 py-1 rounded font-semibold transition-colors ${
                        filterSubject === s
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {filteredQuestions.map((q) => {
                  const candidateAnswer = answers[q.id] || '';
                  const isCorrect = candidateAnswer.trim() === q.correctAnswer.trim();
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border text-xs sm:text-sm ${
                        candidateAnswer
                          ? isCorrect
                            ? 'border-emerald-300 bg-emerald-50/40'
                            : 'border-rose-300 bg-rose-50/40'
                          : 'border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-2">
                        <span className="text-slate-800">
                          Q{q.id} ({q.subject} &bull; {q.section})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded font-bold ${
                            candidateAnswer
                              ? isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {candidateAnswer
                            ? isCorrect
                              ? 'Correct (+4)'
                              : 'Incorrect (-1)'
                            : 'Unattempted (0)'}
                        </span>
                      </div>

                      <div className="mb-3 font-medium text-slate-900">
                        <KaTeXRenderer content={q.questionText} />
                      </div>

                      <div className="p-2.5 bg-white rounded border border-slate-200 mb-2 space-y-1 text-xs">
                        <div>
                          <span className="text-slate-500 font-semibold">Your Answer: </span>
                          <span className="font-bold text-slate-800">{candidateAnswer || 'None'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold">Correct Answer: </span>
                          <span className="font-bold text-emerald-700">{q.correctAnswer}</span>
                        </div>
                      </div>

                      {q.explanation && (
                        <div className="mt-2 p-3 bg-blue-50/80 rounded border border-blue-200 text-xs text-slate-800">
                          <div className="font-bold text-blue-900 mb-1">Explanation / Solution:</div>
                          <KaTeXRenderer content={q.explanation} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onResetTest}
            className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Test &amp; Telemetry</span>
          </button>

          <div className="flex items-center gap-2">
            {!isFinalSubmitted ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded shadow-2xs"
                >
                  Return to Test
                </button>
                <button
                  type="button"
                  onClick={onConfirmFinalSubmit}
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 border border-blue-800 rounded shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm &amp; Final Submit</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded"
              >
                Close Summary
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
