export interface Exercise {
  id: string;
  question: string;
  hint?: string;
  answer?: string;
}

export interface Example {
  id: string;
  problem: string;
  solution: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation?: string;
}

export interface LessonContent {
  theory: string[]; // Array of paragraphs/bullet points
  keyPoints: string[]; // Summary box content
  examples: Example[];
  exercises: Exercise[];
  quizzes: Quiz[]; // New field for interactive quizzes
}

export interface Lesson {
  id: string;
  title: string;
  content: LessonContent;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}