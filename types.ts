
export enum LanguageType {
  PYTHON = 'Python',
  JAVASCRIPT = 'JavaScript',
  RUST = 'Rust',
  GO = 'Go',
  SQL = 'SQL',
  HTML_CSS = 'HTML/CSS',
  C_PLUS_PLUS = 'C++',
  JAVA = 'Java'
}

export enum Difficulty {
  ROOKIE = 'Rookie',
  SKILLED = 'Skilled',
  ELITE = 'Elite',
  MASTER = 'Master'
}

export interface TutorialStep {
  text: string;
  codeSnippet: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  story: string;
  xpReward: number;
  difficulty: Difficulty;
  starterCode: string;
  solutionKeywords: string[];
  hint: string;
  tutorialSteps: TutorialStep[];
  challengeGoal: string;
  isBoss?: boolean;
}

export interface World {
  id: string;
  language: LanguageType;
  description: string;
  missions: Mission[];
  isUnlocked: boolean;
}

export interface UserProfile {
  username: string;
  password?: string;
  level: number;
  xp: number;
  streak: number;
  badges: string[];
  avatarUrl: string;
  completedMissionIds: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
