
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
  title: string;
  authors: string[];
  abstract: string;
  date: string;
  tags: string[];
  link?: string;
}

export type View = 'home' | 'photos' | 'projects' | 'about' | 'project-detail';
