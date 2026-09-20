import React, { useState, useMemo } from 'react';
import { Question, QuestionStatus, QuestionTelemetry, Subject, ChapterStat, SLPRecommendation } from '../types';
import { KaTeXRenderer } from './KaTeXRenderer';
import {
  Award,
  Zap,
  Clock,
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  TrendingDown,
  RotateCcw,
  Target,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Filter,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  questions: Question[];
  answers: Record<number, string>;
  statuses: Record<number, QuestionStatus>;
  telemetry: Record<number, QuestionTelemetry>;
  totalExamTimeSeconds: number;
  remainingTimeSeconds: number;
  onRetakeExam: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  questions,
  answers,
  statuses,
  telemetry,
  totalExamTimeSeconds,
  remainingTimeSeconds,
  onRetakeExam,
}) => {
  const [activeTab, setActiveTab] = useState<'SLP_OVERVIEW' | 'CHAPTERS' | 'SOLUTIONS'>('SLP_OVERVIEW');
  const [subjectFilter, setSubjectFilter] = useState<'ALL' | Subject>('ALL');
  const [solutionFilter, setSolutionFilter] = useState<'ALL' | 'INCORRECT' | 'SILLY' | 'TRAP' | 'CORRECT'>('ALL');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  // Exam analytics computation
  const analytics = useMemo(() => {
    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalTimeSpent = 0;

    // Silly mistakes: < 45s spent on wrong questions
    const sillyMistakeQuestionIds: number[] = [];
    // Time traps: > 3.5 min (210s) spent on a question
    const timeTrapQuestionIds: number[] = [];

    // Per-question evaluated items
    const questionEvaluations = questions.map((q) => {
      const status = statuses[q.id] || 'NOT_VISITED';
      const candidateAnswer = (answers[q.id] || '').trim();
      const isAttempted = status === 'ANSWERED' || status === 'ANSWERED_AND_MARKED';
      const timeSpent = telemetry[q.id]?.timeSpentSeconds || 0;
      totalTimeSpent += timeSpent;

      const isCorrect = isAttempted && candidateAnswer === q.correctAnswer.trim();
      const isWrong = isAttempted && !isCorrect;

      let marksAwarded = 0;
      if (isAttempted) {
        if (isCorrect) {
          marksAwarded = q.marks.correct;
          correctCount++;
        } else {
          marksAwarded = q.marks.incorrect;
          incorrectCount++;
        }
      } else {
        unattemptedCount++;
      }

      totalScore += marksAwarded;

      // Check Silly Mistake: < 45s on a wrong question
      const isSillyMistake = isWrong && timeSpent < 45;
      if (isSillyMistake) {
        sillyMistakeQuestionIds.push(q.id);
      }

      // Check Time Trap: > 3.5 min (210s) spent
      const isTimeTrap = timeSpent > 210;
      if (isTimeTrap) {
        timeTrapQuestionIds.push(q.id);
      }

      return {
        question: q,
        status,
        candidateAnswer,
        isAttempted,
        isCorrect,
        isWrong,
        marksAwarded,
        timeSpent,
        isSillyMistake,
        isTimeTrap,
      };
    });

    const totalAttempted = correctCount + incorrectCount;
    const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;
    const percentileEstimate = Math.min(
      99.9,
      Math.max(25, Math.round((totalScore / 300) * 100 * 0.95 + 15))
    );

    // Chapter-wise breakdown calculation
    const chapterMap = new Map<string, ChapterStat>();

    questions.forEach((q) => {
      const chKey = `${q.subject}___${q.chapter}`;
      if (!chapterMap.has(chKey)) {
        chapterMap.set(chKey, {
          chapter: q.chapter,
          subject: q.subject,
          totalQuestions: 0,
          attempted: 0,
          correct: 0,
          incorrect: 0,
          unattempted: 0,
          accuracy: 0,
          totalTimeSeconds: 0,
          score: 0,
        });
      }

      const stat = chapterMap.get(chKey)!;
      stat.totalQuestions++;

      const evalItem = questionEvaluations.find((e) => e.question.id === q.id);
      if (evalItem) {
        stat.totalTimeSeconds += evalItem.timeSpent;
        stat.score += evalItem.marksAwarded;
        if (evalItem.isAttempted) {
          stat.attempted++;
          if (evalItem.isCorrect) stat.correct++;
          else stat.incorrect++;
        } else {
          stat.unattempted++;
        }
      }
    });

    const chapterStats: ChapterStat[] = Array.from(chapterMap.values()).map((stat) => ({
      ...stat,
      accuracy: stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0,
    }));

    // Subject-wise stats
    const subjectsList: Subject[] = ['Physics', 'Chemistry', 'Mathematics'];
    const subjectStats = subjectsList.map((sub) => {
      const subItems = questionEvaluations.filter((e) => e.question.subject === sub);
      const subScore = subItems.reduce((sum, item) => sum + item.marksAwarded, 0);
      const subAttempted = subItems.filter((i) => i.isAttempted).length;
      const subCorrect = subItems.filter((i) => i.isCorrect).length;
      const subIncorrect = subItems.filter((i) => i.isWrong).length;
      const subTime = subItems.reduce((sum, item) => sum + item.timeSpent, 0);
      const subAccuracy = subAttempted > 0 ? Math.round((subCorrect / subAttempted) * 100) : 0;
      return {
        subject: sub,
        score: subScore,
        maxScore: subItems.length * 4,
        attempted: subAttempted,
        correct: subCorrect,
        incorrect: subIncorrect,
        accuracy: subAccuracy,
        timeSeconds: subTime,
      };
    });

    // 3-Point Automated Student Learning Plan (SLP) Generation
    // Find chapters with lowest accuracy among attempted, or chapters with negative scores
    const weakChapters = [...chapterStats]
      .filter((c) => c.attempted > 0)
      .sort((a, b) => a.accuracy - b.accuracy || a.score - b.score);

    const lowestAccuracyChapters =
      weakChapters.length > 0
        ? weakChapters.slice(0, 3).map((c) => `${c.chapter} (${c.subject}: ${c.accuracy}% acc)`)
        : ['Thermodynamics & Heat Engines', 'Definite Integrals', 'Chemical Kinetics'];

    const slpRecommendations: SLPRecommendation[] = [
      {
        id: 1,
        category: 'REVISION',
        title: 'Priority Concept Revision: Remediate High-Error Chapters',
        description: `Your diagnostic performance highlights vulnerability in ${lowestAccuracyChapters.slice(0, 2).join(' and ')}. Focus your immediate 7-day study cycle on these low-yield topics to recover lost marks.`,
        actionItems: [
          `Revisit core formulas & definitions in ${weakChapters[0]?.chapter || 'Thermodynamics'} (review NCERT + summary notes).`,
          `Solve 15-20 Previous Year Questions (JEE Main 2022-2025) specifically targeting ${weakChapters[1]?.chapter || 'Definite Integrals'}.`,
          `Create a one-page formula sheet for rapid revision before attempting full mock series.`,
        ],
        priority: 'HIGH',
      },
      {
        id: 2,
        category: 'TIME_MANAGEMENT',
        title: `Time Trap Mitigation: Eliminate >3.5 Min Deadlocks (${timeTrapQuestionIds.length} flagged)`,
        description:
          timeTrapQuestionIds.length > 0
            ? `You got caught in ${timeTrapQuestionIds.length} time traps (spending >3.5 minutes per question), draining critical exam time. In JEE Main, prolonged engagement on complex problems lowers aggregate percentile.`
            : `Pacing discipline was steady. Continue practicing rapid problem triage to prevent lingering beyond 2.5 minutes on stubborn questions.`,
        actionItems: [
          `Implement the "2-Minute Skip Rule": If no definitive solution pathway emerges within 120 seconds, immediately mark as 'Marked for Review' and proceed.`,
          `Save lengthy Section B numericals for the second pass after picking up all direct Section A MCQs.`,
          `Review the questions flagged as Time Traps (${timeTrapQuestionIds.map((id) => `Q${id}`).join(', ') || 'None'}) to recognize early friction patterns.`,
        ],
        priority: timeTrapQuestionIds.length > 0 ? 'HIGH' : 'MEDIUM',
      },
      {
        id: 3,
        category: 'ACCURACY',
        title: `Silly Mistake Eradication: Stop Rushed Errors Under 45s (${sillyMistakeQuestionIds.length} flagged)`,
        description:
          sillyMistakeQuestionIds.length > 0
            ? `You committed ${sillyMistakeQuestionIds.length} silly mistake(s) by spending less than 45 seconds on questions you answered incorrectly, burning ${sillyMistakeQuestionIds.length * 5} potential marks (including negative penalties).`
            : `No rapid rush errors (<45s) were detected. Maintain your deliberate reading speed to preserve high positive net margins.`,
        actionItems: [
          `Add a mandatory 15-second "Sanity Check" before pressing 'Save & Next' to double check units (e.g. cm vs m, rad vs deg).`,
          `Circle or highlight negative keywords such as "INCORRECT", "NOT TRUE", and "ALL EXCEPT" in question prompts.`,
          `Examine questions ${sillyMistakeQuestionIds.map((id) => `Q${id}`).join(', ') || 'identified'} below to isolate calculation slips from conceptual gaps.`,
        ],
        priority: sillyMistakeQuestionIds.length > 0 ? 'HIGH' : 'MEDIUM',
      },
    ];

    return {
      totalScore,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalAttempted,
      accuracy,
      percentileEstimate,
      totalTimeSpent,
      sillyMistakeQuestionIds,
      timeTrapQuestionIds,
      questionEvaluations,
      chapterStats,
      subjectStats,
      slpRecommendations,
    };
  }, [questions, answers, statuses, telemetry]);

  // Filter solutions
  const filteredSolutions = useMemo(() => {
    return analytics.questionEvaluations.filter((item) => {
      // Subject filter
      if (subjectFilter !== 'ALL' && item.question.subject !== subjectFilter) {
        return false;
      }
      // Status/Type filter
      if (solutionFilter === 'INCORRECT') return item.isWrong;
      if (solutionFilter === 'SILLY') return item.isSillyMistake;
      if (solutionFilter === 'TRAP') return item.isTimeTrap;
      if (solutionFilter === 'CORRECT') return item.isCorrect;
      return true;
    });
  }, [analytics.questionEvaluations, subjectFilter, solutionFilter]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-100 overflow-y-auto select-none font-sans text-slate-900">
      {/* Top Banner: Score & Candidate Overview */}
      <div className="bg-linear-to-r from-blue-950 via-slate-900 to-indigo-950 text-white px-4 sm:px-6 py-4 shadow-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  JEE (Main) Mock Exam &bull; Analytics &amp; SLP Report
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Evaluated
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Candidate: <strong>{JSON.parse(localStorage.getItem('nta_student_info') || '{}').name || 'Candidate'}</strong> (Roll: {JSON.parse(localStorage.getItem('nta_student_info') || '{}').rollNo || 'N/A'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="retake-test-btn"
              type="button"
              onClick={onRetakeExam}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Retake Mock Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6 flex-1">
        {/* 4 Key Performance Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Score (+4 / -1 Scheme) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Total Score</span>
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl sm:text-4xl font-black font-mono ${analytics.totalScore >= 0 ? 'text-blue-900' : 'text-rose-700'}`}>
                {analytics.totalScore}
              </span>
              <span className="text-xs font-semibold text-slate-500">/ 300 Marks</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-600 flex items-center justify-between border-t border-slate-100 pt-2">
              <span className="text-emerald-700 font-semibold">+{analytics.correctCount * 4} positive</span>
              <span className="text-rose-700 font-semibold">-{analytics.incorrectCount} negative</span>
            </div>
          </div>

          {/* Accuracy & Attempts */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Accuracy</span>
              <FileCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-700">
                {analytics.accuracy}%
              </span>
              <span className="text-xs font-semibold text-slate-500">
                ({analytics.correctCount}/{analytics.totalAttempted})
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-600 flex items-center justify-between border-t border-slate-100 pt-2">
              <span>Attempted: {analytics.totalAttempted}/75</span>
              <span>Skipped: {analytics.unattemptedCount}</span>
            </div>
          </div>

          {/* "Silly Mistakes" Counter (<45s spent on wrong questions) */}
          <div
            id="silly-mistakes-card"
            className="bg-white p-4 rounded-xl border border-rose-200 shadow-xs flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-rose-700 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Silly Mistakes
              </span>
              <span className="text-[10px] font-bold bg-rose-100 px-1.5 py-0.5 rounded text-rose-800">
                &lt;45s wrong
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-rose-700">
                {analytics.sillyMistakeQuestionIds.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">questions</span>
            </div>
            <div className="mt-2 text-[11px] text-rose-800 flex items-center justify-between border-t border-rose-100 pt-2">
              <span>Lost ~{analytics.sillyMistakeQuestionIds.length * 5} marks</span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('SOLUTIONS');
                  setSolutionFilter('SILLY');
                }}
                className="text-blue-700 font-bold hover:underline"
              >
                Inspect &rarr;
              </button>
            </div>
          </div>

          {/* "Time Traps" Counter (>3.5 min spent on a question) */}
          <div
            id="time-traps-card"
            className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                Time Traps
              </span>
              <span className="text-[10px] font-bold bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">
                &gt;3.5 min
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-amber-800">
                {analytics.timeTrapQuestionIds.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">questions</span>
            </div>
            <div className="mt-2 text-[11px] text-amber-800 flex items-center justify-between border-t border-amber-100 pt-2">
              <span>Flagged for pacing</span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('SOLUTIONS');
                  setSolutionFilter('TRAP');
                }}
                className="text-blue-700 font-bold hover:underline"
              >
                Inspect &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-300 pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('SLP_OVERVIEW')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'SLP_OVERVIEW'
              ? 'border-blue-700 text-blue-800 bg-white rounded-t-lg shadow-2xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
          >
            <Award className="w-4 h-4 text-blue-700" />
            <span>3-Point Student Learning Plan (SLP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CHAPTERS')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'CHAPTERS'
              ? 'border-blue-700 text-blue-800 bg-white rounded-t-lg shadow-2xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-700" />
            <span>Chapter-wise Breakdown</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SOLUTIONS')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'SOLUTIONS'
              ? 'border-blue-700 text-blue-800 bg-white rounded-t-lg shadow-2xs'
              : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-700" />
            <span>Question Solutions &amp; LaTeX Telemetry</span>
          </button>
        </div>

        {/* TAB 1: 3-Point Automated Student Learning Plan (SLP) */}
        {activeTab === 'SLP_OVERVIEW' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Subject Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analytics.subjectStats.map((sub) => (
                <div
                  key={sub.subject}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-800 text-sm">{sub.subject}</h3>
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {sub.score} / {sub.maxScore}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Attempted:</span>
                      <span className="font-semibold text-slate-800">
                        {sub.attempted}/25 ({sub.accuracy}% accuracy)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Correct / Incorrect:</span>
                      <span>
                        <strong className="text-emerald-700">+{sub.correct}</strong> /{' '}
                        <strong className="text-rose-700">-{sub.incorrect}</strong>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Spent:</span>
                      <span className="font-mono font-semibold text-slate-700">
                        {formatSeconds(sub.timeSeconds)}
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-emerald-600 h-full"
                      style={{ width: `${(sub.correct / 25) * 100}%` }}
                      title={`Correct: ${sub.correct}`}
                    />
                    <div
                      className="bg-rose-500 h-full"
                      style={{ width: `${(sub.incorrect / 25) * 100}%` }}
                      title={`Incorrect: ${sub.incorrect}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* The 3-Point Automated Student Learning Plan (SLP) Cards */}
            <div className="bg-white rounded-xl border border-blue-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-black text-sm">
                    SLP
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Automated 3-Point Student Learning Plan (SLP)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Personalized tactical strategy synthesized from your test telemetry and accuracy metrics
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">
                  Targeted Diagnostic
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analytics.slpRecommendations.map((rec, index) => {
                  const icons = [
                    <Target key="1" className="w-5 h-5 text-indigo-600" />,
                    <Clock key="2" className="w-5 h-5 text-amber-600" />,
                    <Zap key="3" className="w-5 h-5 text-rose-600" />,
                  ];
                  const borderColors = [
                    'border-indigo-200 bg-indigo-50/30',
                    'border-amber-200 bg-amber-50/30',
                    'border-rose-200 bg-rose-50/30',
                  ];

                  return (
                    <div
                      key={rec.id}
                      className={`rounded-xl border p-4.5 flex flex-col justify-between shadow-2xs ${borderColors[index]}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                            {icons[index]}
                            <span>Recommendation 0{index + 1}</span>
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                            {rec.priority} PRIORITY
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-slate-900 mb-2 leading-snug">
                          {rec.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {rec.description}
                        </p>
                      </div>

                      <div className="border-t border-slate-200/80 pt-3">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                          Action Items:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {rec.actionItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-blue-700 font-bold shrink-0 mt-0.5">&bull;</span>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Chapter-wise Breakdown */}
        {activeTab === 'CHAPTERS' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden animate-in fade-in duration-150">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Chapter-wise Performance Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Granular breakdown across Physics, Chemistry, and Mathematics chapters
                </p>
              </div>

              {/* Subject filter */}
              <div className="flex items-center gap-1 text-xs">
                {(['ALL', 'Physics', 'Chemistry', 'Mathematics'] as const).map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubjectFilter(sub)}
                    className={`px-3 py-1 rounded font-semibold transition-colors ${subjectFilter === sub
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                      }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-300 uppercase text-[11px]">
                  <tr>
                    <th className="p-3 border-r border-slate-200">Chapter / Topic</th>
                    <th className="p-3 border-r border-slate-200">Subject</th>
                    <th className="p-3 border-r border-slate-200 text-center">Questions</th>
                    <th className="p-3 border-r border-slate-200 text-center">Attempted</th>
                    <th className="p-3 border-r border-slate-200 text-center text-emerald-800">Correct</th>
                    <th className="p-3 border-r border-slate-200 text-center text-rose-800">Incorrect</th>
                    <th className="p-3 border-r border-slate-200 text-center">Accuracy</th>
                    <th className="p-3 border-r border-slate-200 text-center">Net Score</th>
                    <th className="p-3 text-center font-mono">Time Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {analytics.chapterStats
                    .filter((ch) => subjectFilter === 'ALL' || ch.subject === subjectFilter)
                    .map((ch) => (
                      <tr key={`${ch.subject}-${ch.chapter}`} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900 border-r border-slate-200">
                          {ch.chapter}
                        </td>
                        <td className="p-3 border-r border-slate-200 text-slate-600">
                          {ch.subject}
                        </td>
                        <td className="p-3 text-center border-r border-slate-200 font-semibold">
                          {ch.totalQuestions}
                        </td>
                        <td className="p-3 text-center border-r border-slate-200 font-semibold text-slate-700">
                          {ch.attempted}
                        </td>
                        <td className="p-3 text-center border-r border-slate-200 font-bold text-emerald-700 bg-emerald-50/40">
                          {ch.correct}
                        </td>
                        <td className="p-3 text-center border-r border-slate-200 font-bold text-rose-700 bg-rose-50/40">
                          {ch.incorrect}
                        </td>
                        <td className="p-3 text-center border-r border-slate-200">
                          <span
                            className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${ch.attempted === 0
                              ? 'bg-slate-100 text-slate-500'
                              : ch.accuracy >= 75
                                ? 'bg-emerald-100 text-emerald-800'
                                : ch.accuracy >= 40
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                          >
                            {ch.attempted > 0 ? `${ch.accuracy}%` : 'Unattempted'}
                          </span>
                        </td>
                        <td className="p-3 text-center border-r border-slate-200 font-mono font-bold">
                          <span className={ch.score >= 0 ? 'text-blue-900' : 'text-rose-700'}>
                            {ch.score > 0 ? `+${ch.score}` : ch.score}
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono font-semibold text-slate-600">
                          {formatSeconds(ch.totalTimeSeconds)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Question Solutions & Telemetry Inspector */}
        {activeTab === 'SOLUTIONS' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Filter controls */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <Filter className="w-4 h-4 text-slate-500" />
                <span className="font-bold text-slate-700 mr-1">Filter:</span>
                {[
                  { id: 'ALL', label: 'All Questions' },
                  { id: 'INCORRECT', label: 'Incorrect Only' },
                  { id: 'SILLY', label: `Silly Mistakes (<45s) [${analytics.sillyMistakeQuestionIds.length}]` },
                  { id: 'TRAP', label: `Time Traps (>3.5m) [${analytics.timeTrapQuestionIds.length}]` },
                  { id: 'CORRECT', label: 'Correct Only' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSolutionFilter(item.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${solutionFilter === item.id
                      ? 'bg-blue-700 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Subject Filter */}
              <div className="flex items-center gap-1 text-xs">
                {(['ALL', 'Physics', 'Chemistry', 'Mathematics'] as const).map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubjectFilter(sub)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${subjectFilter === sub
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Solution List */}
            <div className="space-y-3">
              {filteredSolutions.map((item) => {
                const q = item.question;
                const isExpanded = expandedQuestionId === q.id;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-xl border transition-all shadow-xs ${item.isSillyMistake
                      ? 'border-rose-300 ring-1 ring-rose-200'
                      : item.isTimeTrap
                        ? 'border-amber-300 ring-1 ring-amber-200'
                        : item.isCorrect
                          ? 'border-emerald-200'
                          : item.isWrong
                            ? 'border-rose-200'
                            : 'border-slate-200'
                      }`}
                  >
                    {/* Header bar of question card */}
                    <div
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="p-3.5 flex flex-wrap items-center justify-between gap-2 cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-md bg-slate-800 text-white font-bold text-xs flex items-center justify-center font-mono">
                          Q{q.id}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-xs sm:text-sm">
                              {q.subject} &bull; {q.chapter}
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                              {q.section}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {formatSeconds(item.timeSpent)} spent
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Tags */}
                        {item.isSillyMistake && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-rose-600 fill-rose-600" />
                            Silly Mistake (&lt;45s)
                          </span>
                        )}

                        {item.isTimeTrap && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-600" />
                            Time Trap (&gt;3.5m)
                          </span>
                        )}

                        {/* Result Tag */}
                        {item.isCorrect ? (
                          <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Correct (+4)
                          </span>
                        ) : item.isWrong ? (
                          <span className="px-2.5 py-1 rounded text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" />
                            Incorrect (-1)
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 text-slate-600">
                            Unattempted (0)
                          </span>
                        )}

                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Question Body */}
                    {isExpanded && (
                      <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3 text-xs sm:text-sm">
                        <div className="p-3 bg-white rounded-lg border border-slate-200 font-medium text-slate-900">
                          <KaTeXRenderer content={q.questionText} />
                        </div>

                        {/* Options if MCQ */}
                        {q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt) => {
                              const isCandidateChoice = item.candidateAnswer === opt.id;
                              const isActualCorrect = q.correctAnswer === opt.id;
                              return (
                                <div
                                  key={opt.id}
                                  className={`p-2.5 rounded-md border flex items-start gap-2 ${isActualCorrect
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                    : isCandidateChoice
                                      ? 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
                                      : 'bg-white border-slate-200 text-slate-700'
                                    }`}
                                >
                                  <span className="font-bold">({opt.id})</span>
                                  <KaTeXRenderer content={opt.label} />
                                  {isActualCorrect && (
                                    <span className="ml-auto text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">
                                      Key
                                    </span>
                                  )}
                                  {isCandidateChoice && !isActualCorrect && (
                                    <span className="ml-auto text-[10px] font-bold text-rose-700 bg-rose-100 px-1 rounded">
                                      Your Ans
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Summary response box */}
                        <div className="p-2.5 bg-white rounded-md border border-slate-200 flex flex-wrap items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-500 font-medium">Your Response: </span>
                            <span className="font-bold text-slate-800">
                              {item.candidateAnswer || 'None (Unattempted)'}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium">Official Correct Answer: </span>
                            <span className="font-bold text-emerald-700">{q.correctAnswer}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium">Time Taken: </span>
                            <span className="font-mono font-bold text-blue-800">
                              {formatSeconds(item.timeSpent)}
                            </span>
                          </div>
                        </div>

                        {/* Step-by-step Solution */}
                        {q.explanation && (
                          <div className="p-3 bg-blue-50/80 rounded-lg border border-blue-200 text-xs text-slate-800">
                            <div className="font-bold text-blue-900 mb-1">
                              Step-by-Step Solution &amp; Formulae:
                            </div>
                            <KaTeXRenderer content={q.explanation} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
