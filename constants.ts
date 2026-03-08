
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'placeholder-1',
    title: {
      en: 'Project Title Placeholder',
      zh: '项目标题占位符',
      ja: 'プロジェクトタイトルのプレースホルダー'
    },
    authors: ['Author Name', 'Collaborator'],
    abstract: {
      en: 'This is a placeholder for your project abstract. Once you have your projects ready, you can replace this text with the actual summary of your work, including methodologies and key findings.',
      zh: '这是您的项目摘要占位符。一旦您的项目准备就绪，您可以用您的实际工作摘要（包括方法论和关键发现）替换此文本。',
      ja: 'これはプロジェクトの要約のプレースホルダーです。プロジェクトの準備ができたら、このテキストを、方法論や主要な調査結果を含む実際の作業の要約に置き換えることができます。'
    },
    date: '202X-XX-XX',
    tags: ['Domain', 'Technology', 'Method'],
  },
  {
    id: 'placeholder-2',
    title: {
      en: 'Upcoming Project',
      zh: '即将推出的项目',
      ja: '今後のプロジェクト'
    },
    authors: ['Author Name'],
    abstract: {
      en: 'Abstract for an upcoming project. This section will highlight the core contributions and results of the study once it is finalized and ready for public display.',
      zh: '即将推出的项目的摘要。一旦研究完成并准备好公开展示，本板块将重点介绍该研究的核心贡献和结果。',
      ja: '今後のプロジェクトの要約。研究が完了し、公開展示の準備が整い次第、このセクションでは研究の主要な貢献と結果を強調します。'
    },
    date: {
      en: 'In Progress',
      zh: '进行中',
      ja: '進行中'
    },
    tags: ['Future Work', 'Innovation'],
  }
];
