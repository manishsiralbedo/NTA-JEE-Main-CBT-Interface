/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Subject, QuestionStatus, QuestionTelemetry } from './types';
import { QUESTIONS_DATA, SUBJECT_QUESTION_RANGES } from './data/questions';
import { Header } from './components/Header';
import { QuestionViewport } from './components/QuestionViewport';
import { ActionFooter } from './components/ActionFooter';
import { QuestionPalette } from './components/QuestionPalette';
import { ExamSummaryModal } from './components/ExamSummaryModal';
import { InstructionsModal } from './components/InstructionsModal';
import { QuestionPaperModal } from './components/QuestionPaperModal';
import { SubmitConfirmModal } from './components/SubmitConfirmModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { supabase } from './supabase';

const STORAGE_KEY = 'nta_jee_main_cbt_state_v1';
const TOTAL_EXAM_SECONDS = 180 * 60; // 180 minutes = 10,800 seconds

export default function App() {
  // Initialize Question Statuses
  const initializeStatuses = () => {
    const initial: Record<number, QuestionStatus> = {};
    QUESTIONS_DATA.forEach((q) => {
      // Question 1 is initially visited, so NOT_ANSWERED; all others NOT_VISITED
      initial[q.id] = q.id === 1 ? 'NOT_ANSWERED' : 'NOT_VISITED';
    });
    return initial;
  };

  const saveSubmissionToSupabase = async (
    studentName: string,
    totalScore: number,
    physicsScore: number,
    chemScore: number,
    mathScore: number,
    timeSpent: number,
    telemetryData: any
  ) => {
    try {
      const { error } = await supabase.from('exam_submissions').insert([
        {
          student_name: studentName || 'Anonymous Student',
          total_score: totalScore,
          physics_score: physicsScore,
          chemistry_score: chemScore,
          math_score: mathScore,
          time_spent_seconds: timeSpent,
          telemetry: telemetryData,
        },
      ]);

      if (error) {
        console.error('Error saving submission to Supabase:', error.message);
      } else {
        console.log('Submission successfully recorded in Supabase!');
      }
    } catch (err) {
      console.error('Failed to submit:', err);
    }
  };

  // Initialize Telemetry
  const initializeTelemetry = () => {
    const initial: Record<number, QuestionTelemetry> = {};
    QUESTIONS_DATA.forEach((q) => {
      initial[q.id] = {
        timeSpentSeconds: 0,
        visitCount: q.id === 1 ? 1 : 0,
        lastVisitedTimestamp: q.id === 1 ? Date.now() : undefined,
      };
    });
    return initial;
  };

  // Load from localStorage or defaults
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.currentQuestionId === 'number' ? parsed.currentQuestionId : 1;
      }
    } catch {
      // ignore
    }
    return 1;
  });

  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.answers || {};
      }
    } catch {
      // ignore
    }
    return {};
  });

  const [statuses, setStatuses] = useState<Record<number, QuestionStatus>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.statuses) return parsed.statuses;
      }
    } catch {
      // ignore
    }
    return initializeStatuses();
  });

  const [telemetry, setTelemetry] = useState<Record<number, QuestionTelemetry>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.telemetry) return parsed.telemetry;
      }
    } catch {
      // ignore
    }
    return initializeTelemetry();
  });

  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.remainingTimeSeconds === 'number') {
          return parsed.remainingTimeSeconds;
        }
      }
    } catch {
      // ignore
    }
    return TOTAL_EXAM_SECONDS;
  });

  const [isFinalSubmitted, setIsFinalSubmitted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isFinalSubmitted);
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [viewMode, setViewMode] = useState<'CBT' | 'ANALYTICS'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isFinalSubmitted) return 'ANALYTICS';
      }
    } catch {
      // ignore
    }
    return 'CBT';
  });

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(() => !isFinalSubmitted);
  const [isSubmitConfirmModalOpen, setIsSubmitConfirmModalOpen] = useState<boolean>(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState<boolean>(false);
  const [isQuestionPaperModalOpen, setIsQuestionPaperModalOpen] = useState<boolean>(false);
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState<boolean>(false);
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Determine current question object
  const currentQuestion =
    QUESTIONS_DATA.find((q) => q.id === currentQuestionId) || QUESTIONS_DATA[0];

  const currentSubject: Subject = currentQuestion.subject;

  // Persist local state
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentQuestionId,
          answers,
          statuses,
          telemetry,
          remainingTimeSeconds,
          isFinalSubmitted,
        })
      );
    } catch {
      // localstorage full or restricted
    }
  }, [currentQuestionId, answers, statuses, telemetry, remainingTimeSeconds, isFinalSubmitted]);

  // Main Timer & Per-Question Telemetry Interval
  useEffect(() => {
    if (!isTimerRunning || isFinalSubmitted) return;

    const timer = setInterval(() => {
      // Decrement main countdown
      setRemainingTimeSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinalSubmitted(true);
          setIsTimerRunning(false);
          setViewMode('ANALYTICS');
          return 0;
        }
        return prev - 1;
      });

      // Increment time spent on the active question in telemetry
      setTelemetry((prev) => {
        const currentData = prev[currentQuestionId] || {
          timeSpentSeconds: 0,
          visitCount: 1,
        };
        return {
          ...prev,
          [currentQuestionId]: {
            ...currentData,
            timeSpentSeconds: currentData.timeSpentSeconds + 1,
          },
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, isFinalSubmitted, currentQuestionId]);

  // Helper to safely jump to another question
  const jumpToQuestion = useCallback((nextQId: number) => {
    if (nextQId < 1 || nextQId > QUESTIONS_DATA.length) return;

    // Record visit in telemetry
    setTelemetry((prev) => {
      const existing = prev[nextQId] || { timeSpentSeconds: 0, visitCount: 0 };
      return {
        ...prev,
        [nextQId]: {
          ...existing,
          visitCount: existing.visitCount + 1,
          lastVisitedTimestamp: Date.now(),
        },
      };
    });

    // Mark as NOT_ANSWERED if it was NOT_VISITED and exam is not frozen
    setStatuses((prev) => {
      if (prev[nextQId] === 'NOT_VISITED') {
        return { ...prev, [nextQId]: 'NOT_ANSWERED' };
      }
      return prev;
    });

    setCurrentQuestionId(nextQId);
  }, []);

  // Subject tab click
  const handleSelectSubject = (subject: Subject) => {
    if (currentQuestion.subject === subject) return;
    const range = SUBJECT_QUESTION_RANGES[subject];
    if (range) {
      jumpToQuestion(range.start);
    }
  };

  // Select Answer for current question (ignored if final submitted)
  const handleSelectAnswer = (value: string) => {
    if (isFinalSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionId]: value,
    }));
  };

  // Action Button 1: Save & Next
  const handleSaveAndNext = () => {
    if (isFinalSubmitted) {
      if (currentQuestionId < QUESTIONS_DATA.length) jumpToQuestion(currentQuestionId + 1);
      return;
    }

    const currentAnswer = (answers[currentQuestionId] || '').trim();

    setStatuses((prev) => {
      const nextStatus: QuestionStatus = currentAnswer !== '' ? 'ANSWERED' : 'NOT_ANSWERED';
      return {
        ...prev,
        [currentQuestionId]: nextStatus,
      };
    });

    if (currentQuestionId < QUESTIONS_DATA.length) {
      jumpToQuestion(currentQuestionId + 1);
    }
  };

  // Action Button 2: Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    if (isFinalSubmitted) {
      if (currentQuestionId < QUESTIONS_DATA.length) jumpToQuestion(currentQuestionId + 1);
      return;
    }

    const currentAnswer = (answers[currentQuestionId] || '').trim();

    setStatuses((prev) => {
      const nextStatus: QuestionStatus =
        currentAnswer !== '' ? 'ANSWERED_AND_MARKED' : 'MARKED_FOR_REVIEW';
      return {
        ...prev,
        [currentQuestionId]: nextStatus,
      };
    });

    if (currentQuestionId < QUESTIONS_DATA.length) {
      jumpToQuestion(currentQuestionId + 1);
    }
  };

  // Action Button 3: Clear Response
  const handleClearResponse = () => {
    if (isFinalSubmitted) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestionId];
      return updated;
    });

    // Reset status back to NOT_ANSWERED (Red)
    setStatuses((prev) => ({
      ...prev,
      [currentQuestionId]: 'NOT_ANSWERED',
    }));
  };

  // Navigation Back / Next
  const handlePrevious = () => {
    if (currentQuestionId > 1) {
      jumpToQuestion(currentQuestionId - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionId < QUESTIONS_DATA.length) {
      jumpToQuestion(currentQuestionId + 1);
    }
  };

  // Trigger Confirmation Modal for Submit
  const handleOpenSubmitConfirm = () => {
    setIsSubmitConfirmModalOpen(true);
  };

  // Final Confirmation: End Timer, Freeze Responses, Calculate Score & Push to Supabase
  const handleConfirmFinalSubmit = () => {
    setIsSubmitConfirmModalOpen(false);
    setIsSummaryModalOpen(false);
    setIsFinalSubmitted(true);
    setIsTimerRunning(false);
    setViewMode('ANALYTICS');

    // Prompt for Student Name (or roll number)
    const candidateName = window.prompt("Enter Candidate Name / Roll Number for Results:", "Student") || "Student";

    // Scoring Engine (+4 for correct, -1 for incorrect, 0 for unattempted)
    let totalScore = 0;
    let physicsScore = 0;
    let chemistryScore = 0;
    let mathScore = 0;

    QUESTIONS_DATA.forEach((q) => {
      const studentAns = answers[q.id];
      if (studentAns !== undefined && studentAns !== '') {
        const isCorrect = String(studentAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
        const delta = isCorrect ? 4 : -1;

        totalScore += delta;
        if (q.subject === 'Physics') physicsScore += delta;
        else if (q.subject === 'Chemistry') chemistryScore += delta;
        else if (q.subject === 'Mathematics') mathScore += delta;
      }
    });

    const timeSpent = TOTAL_EXAM_SECONDS - remainingTimeSeconds;

    // Send Real Data to Supabase
    saveSubmissionToSupabase(
      candidateName,
      totalScore,
      physicsScore,
      chemistryScore,
      mathScore,
      timeSpent,
      telemetry
    );
  };

  // Reset entire test
  const handleResetTest = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentQuestionId(1);
    setAnswers({});
    setStatuses(initializeStatuses());
    setTelemetry(initializeTelemetry());
    setRemainingTimeSeconds(TOTAL_EXAM_SECONDS);
    setIsTimerRunning(true);
    setIsFinalSubmitted(false);
    setViewMode('CBT');
    setIsSummaryModalOpen(false);
    setIsSubmitConfirmModalOpen(false);
  };

  // Calculate subject counts for tabs
  const subjectCounts = (['Physics', 'Chemistry', 'Mathematics'] as Subject[]).reduce(
    (acc, sub) => {
      const subQs = QUESTIONS_DATA.filter((q) => q.subject === sub);
      const answeredCount = subQs.filter((q) => {
        const s = statuses[q.id];
        return s === 'ANSWERED' || s === 'ANSWERED_AND_MARKED';
      }).length;
      acc[sub] = {
        total: subQs.length,
        answered: answeredCount,
      };
      return acc;
    },
    {} as Record<Subject, { total: number; answered: number }>
  );

  const currentQTelemetry = telemetry[currentQuestionId] || {
    timeSpentSeconds: 0,
    visitCount: 1,
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900">
      {/* If viewMode is ANALYTICS, show the Analytics & SLP Dashboard */}
      {viewMode === 'ANALYTICS' ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Quick Bar to switch back to CBT review */}
          <div className="bg-slate-900 text-slate-300 px-4 py-2 text-xs flex items-center justify-between border-b border-slate-700">
            <span className="font-semibold text-white">
              NTA JEE (Main) CBT &bull; Results &amp; Student Learning Plan (SLP)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode('CBT')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium transition-colors"
              >
                &larr; View CBT Question Palette
              </button>
            </div>
          </div>

          <AnalyticsDashboard
            questions={QUESTIONS_DATA}
            answers={answers}
            statuses={statuses}
            telemetry={telemetry}
            totalExamTimeSeconds={TOTAL_EXAM_SECONDS}
            remainingTimeSeconds={remainingTimeSeconds}
            onRetakeExam={handleResetTest}
          />
        </div>
      ) : (
        /* Otherwise, show standard CBT interface (frozen if isFinalSubmitted) */
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Banner with Countdown Timer and Subject Switch Tabs */}
          <Header
            remainingTimeSeconds={remainingTimeSeconds}
            isTimerRunning={isTimerRunning}
            onToggleTimer={() => !isFinalSubmitted && setIsTimerRunning((prev) => !prev)}
            currentSubject={currentSubject}
            onSelectSubject={handleSelectSubject}
            subjectCounts={subjectCounts}
            onOpenInstructions={() => setIsInstructionsModalOpen(true)}
            onOpenQuestionPaper={() => setIsQuestionPaperModalOpen(true)}
            language={language}
            onChangeLanguage={setLanguage}
            isFinalSubmitted={isFinalSubmitted}
            onViewAnalytics={() => setViewMode('ANALYTICS')}
          />

          {/* Main Workspace Area: Left Question Viewport + Right Question Palette */}
          <div className="flex-1 flex flex-row overflow-hidden relative">
            {/* Left: Question Viewport */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <QuestionViewport
                question={currentQuestion}
                selectedAnswer={answers[currentQuestionId] || ''}
                onSelectAnswer={handleSelectAnswer}
                timeSpentSeconds={currentQTelemetry.timeSpentSeconds}
                fontSize={fontSize}
                onChangeFontSize={setFontSize}
                isFrozen={isFinalSubmitted}
              />

              {/* Action Buttons Footer: Save & Next, Mark for Review & Next, Clear Response */}
              <ActionFooter
                onSaveAndNext={handleSaveAndNext}
                onMarkForReviewAndNext={handleMarkForReviewAndNext}
                onClearResponse={handleClearResponse}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmitExam={handleOpenSubmitConfirm}
                hasPrevious={currentQuestionId > 1}
                hasNext={currentQuestionId < QUESTIONS_DATA.length}
                hasAnswer={Boolean(answers[currentQuestionId])}
              />
            </div>

            {/* Right: Question Palette (75 buttons with 5 official NTA color states) */}
            <QuestionPalette
              questions={QUESTIONS_DATA}
              currentQuestionId={currentQuestionId}
              statuses={statuses}
              onSelectQuestion={jumpToQuestion}
              currentSubject={currentSubject}
              onSelectSubject={handleSelectSubject}
              isCollapsed={isPaletteCollapsed}
              onToggleCollapse={() => setIsPaletteCollapsed((prev) => !prev)}
              onSubmitExam={handleOpenSubmitConfirm}
            />
          </div>
        </div>
      )}

      {/* Confirmation Modal when user clicks 'Submit' */}
      <SubmitConfirmModal
        isOpen={isSubmitConfirmModalOpen}
        onClose={() => setIsSubmitConfirmModalOpen(false)}
        onConfirm={handleConfirmFinalSubmit}
        questions={QUESTIONS_DATA}
        statuses={statuses}
        remainingTimeFormatted={formatTime(remainingTimeSeconds)}
      />

      {/* Summary modal (optional secondary inspection) */}
      <ExamSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        questions={QUESTIONS_DATA}
        answers={answers}
        statuses={statuses}
        telemetry={telemetry}
        isFinalSubmitted={isFinalSubmitted}
        onConfirmFinalSubmit={handleConfirmFinalSubmit}
        onResetTest={handleResetTest}
        onJumpToQuestion={jumpToQuestion}
      />

      <InstructionsModal
        isOpen={isInstructionsModalOpen}
        onClose={() => setIsInstructionsModalOpen(false)}
      />

      <QuestionPaperModal
        isOpen={isQuestionPaperModalOpen}
        onClose={() => setIsQuestionPaperModalOpen(false)}
        questions={QUESTIONS_DATA}
        onSelectQuestion={jumpToQuestion}
      />
    </div>
  );
}
