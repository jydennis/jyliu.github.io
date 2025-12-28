
export interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  date: string;
  tags: string[];
  link?: string;
}

export type View = 'home' | 'photos' | 'research' | 'about';
