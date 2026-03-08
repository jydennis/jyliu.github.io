
export interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  projectId?: string;
}

export interface Project {
  id: string;
  title: string | { [key in Language]: string };
  authors: string[];
  abstract: string | { [key in Language]: string };
  date: string | { [key in Language]: string };
  tags: string[];
  link?: string;
}

export type View = 'home' | 'photos' | 'projects' | 'about' | 'project-detail';

export type Language = 'en' | 'zh' | 'ja';
