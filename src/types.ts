export type Subject = 'Physics' | 'Chemistry' | 'Mathematics';

export type QuestionType = 'MCQ' | 'NUMERICAL';

export type QuestionStatus = 
  | 'NOT_VISITED'
  | 'NOT_ANSWERED'
  | 'ANSWERED'
  | 'MARKED_FOR_REVIEW'
  | 'ANSWERED_AND_MARKED';

export interface Option {
  id: string; // '1' | '2' | '3' | '4'
  label: string; // text or LaTeX
}

export interface Question {
  id: number; // 1 to 75
  subject: Subject;
  chapter: string;
  section: 'Section A' | 'Section B'; // Section A: MCQ (1-20), Section B: Numerical (21-25)
  type: QuestionType;
  questionText: string;
  options?: Option[]; // for MCQ
  correctAnswer: string; // '1','2','3','4' or numerical value e.g. '25'
  explanation?: string;
  marks: {
    correct: number;
    incorrect: number;
  };
}

export interface QuestionTelemetry {
  timeSpentSeconds: number; // total time spent on this question
  visitCount: number;
  lastVisitedTimestamp?: number;
}

export interface ChapterStat {
  chapter: string;
  subject: Subject;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  accuracy: number; // 0 - 100
  totalTimeSeconds: number;
  score: number;
}

export interface SLPRecommendation {
  id: number;
  title: string;
  category: 'REVISION' | 'TIME_MANAGEMENT' | 'ACCURACY';
  description: string;
  actionItems: string[];
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ExamState {
  currentQuestionId: number;
  currentSubject: Subject;
  answers: Record<number, string>; // questionId -> selectedOptionId or numerical answer
  statuses: Record<number, QuestionStatus>; // questionId -> status
  telemetry: Record<number, QuestionTelemetry>; // questionId -> telemetry
  remainingTimeSeconds: number; // 180 min * 60 = 10800
  isTimerRunning: boolean;
  isExamSubmitted: boolean;
  language: 'English' | 'Hindi';
  fontSize: 'small' | 'medium' | 'large';
}
