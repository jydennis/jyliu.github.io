
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from './types';

interface Translations {
  [key: string]: {
    en: string;
    zh: string;
    ja: string;
  };
}

const translations: Translations = {
  // Nav
  nav_home: { en: 'Home', zh: '首页', ja: 'ホーム' },
  nav_photos: { en: 'Photos', zh: '相册', ja: '写真' },
  nav_projects: { en: 'Projects', zh: '项目', ja: 'プロジェクト' },
  nav_about: { en: 'About', zh: '关于', ja: 'について' },
  
  // Home
  hero_title_1: { en: 'Let creativity', zh: '让创意', ja: '創造性を' },
  hero_title_2: { en: 'thrive.', zh: '蓬勃发展。', ja: '繁栄させる。' },
  hero_subtitle: { en: 'Creative technologist', zh: '创意技术专家', ja: 'クリエイティブ・テクノロジスト' },
  hero_description: { en: 'Unleash the hidden power of creativity by technology and more.', zh: '通过技术等手段释放创意的隐藏力量。', ja: 'テクノロジーなどで創造性の隠れた力を解き放つ。' },
  btn_view_work: { en: 'View Work', zh: '查看作品', ja: '作品を見る' },
  btn_read_research: { en: 'Read Research', zh: '阅读研究', ja: '研究を読む' },

  // Projects
  projects_title: { en: 'Projects & Works', zh: '项目与作品', ja: 'プロジェクトと作品' },
  projects_subtitle: { en: 'This section showcases my personal and professional projects. From research initiatives to software development, explore the details of each endeavor.', zh: '本板块展示了我的个人和专业项目。从研究计划到软件开发，探索每项工作的细节。', ja: 'このセクションでは、私の個人およびプロフェッショナルのプロジェクトを紹介します。研究イニシアチブからソフトウェア開発まで、各取り組みの詳細をご覧ください。' },
  btn_ai_summary: { en: 'AI Summary', zh: 'AI 摘要', ja: 'AI 要約' },
  btn_analyzing: { en: 'Analyzing...', zh: '分析中...', ja: '分析中...' },
  btn_view_repo: { en: 'View Repository', zh: '查看仓库', ja: 'リポジトリを見る' },
  gemini_insight: { en: 'Gemini Insight', zh: 'Gemini 洞察', ja: 'Gemini インサイト' },
  future_projects: { en: 'Future Projects', zh: '未来项目', ja: '今後のプロジェクト' },
  future_projects_desc: { en: 'More projects will be added as they progress through the pipeline.', zh: '随着项目的推进，将会添加更多项目。', ja: 'プロジェクトの進行に合わせて、さらに多くのプロジェクトが追加されます。' },

  // Project Detail
  btn_back_projects: { en: 'Back to Projects', zh: '返回项目', ja: 'プロジェクトに戻る' },
  project_not_found: { en: 'Project not found', zh: '未找到项目', ja: 'プロジェクトが見つかりません' },
  label_date: { en: 'Date', zh: '日期', ja: '日付' },
  label_status: { en: 'Status', zh: '状态', ja: 'ステータス' },
  status_active: { en: 'Active', zh: '进行中', ja: 'アクティブ' },
  section_overview: { en: 'Overview', zh: '概览', ja: '概要' },
  section_methodology: { en: 'Details & Methodology', zh: '细节与方法论', ja: '詳細と方法論' },
  label_resources: { en: 'Resources', zh: '资源', ja: 'リソース' },
  label_doc: { en: 'Documentation', zh: '文档', ja: 'ドキュメント' },
  label_github: { en: 'GitHub Repo', zh: 'GitHub 仓库', ja: 'GitHub リポジトリ' },
  label_demo: { en: 'Live Demo', zh: '在线演示', ja: 'ライブデモ' },
  label_project_info: { en: 'Project Info', zh: '项目信息', ja: 'プロジェクト情報' },
  label_role: { en: 'Role', zh: '角色', ja: '役割' },
  label_stack: { en: 'Stack', zh: '技术栈', ja: 'スタック' },
  label_client: { en: 'Client', zh: '客户', ja: 'クライアント' },

  // Photos
  photos_title: { en: 'Portfolio Gallery', zh: '作品集画廊', ja: 'ポートフォリオギャラリー' },
  photos_subtitle: { en: 'This section is a placeholder for your visual work and project documentation.', zh: '本板块是您的视觉作品和项目文档的占位符。', ja: 'このセクションは、あなたのビジュアルワークとプロジェクトドキュメントのプレースホルダーです。' },
  btn_view_project: { en: 'View Project', zh: '查看项目', ja: 'プロジェクトを見る' },
  photos_quote: { en: '"Capturing the evolution of integrated systems and visual research."', zh: '“捕捉集成系统和视觉研究的演变。”', ja: '「統合システムとビジュアルリサーチの進化を捉える。」' },

  // About
  about_title: { en: 'About Me', zh: '关于我', ja: '私について' },
  about_desc_1: { en: 'I am a Integrated Circuits Engineer focus on GPU Architecture.', zh: '我是一名专注于 GPU 架构的集成电路工程师。', ja: '私はGPUアーキテクチャに焦点を当てた集積回路エンジニアです。' },
  about_desc_2: { en: "Currently exploring WebGPU's potential for real-time generative art and integrating LLMs into the creative process to rethink how we build visual tools.", zh: '目前正在探索 WebGPU 在实时生成艺术方面的潜力，并将大语言模型集成到创作过程中，以重新思考我们如何构建视觉工具。', ja: '現在、リアルタイムのジェネレーティブアートにおけるWebGPUの可能性を模索しており、LLMをクリエイティブプロセスに統合して、ビジュアルツールの構築方法を再考しています。' },
  label_location: { en: 'Location', zh: '位置', ja: '場所' },
  label_email: { en: 'Email', zh: '电子邮件', ja: 'メール' },
  label_social: { en: 'Social', zh: '社交媒体', ja: 'ソーシャル' },
  label_tech_stack: { en: 'Tech Stack', zh: '技术栈', ja: '技術スタック' },
  label_focus_areas: { en: 'Focus Areas', zh: '关注领域', ja: 'フォーカスエリア' },
  location_val: { en: 'Shanghai, China', zh: '中国 上海', ja: '中国、上海' },

  // Footer
  footer_powered: { en: 'POWERED BY WEBGPU & GEMINI', zh: '由 WEBGPU 和 GEMINI 驱动', ja: 'WEBGPU と GEMINI による提供' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  resolveTranslation: (field: string | { [key in Language]: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  const resolveTranslation = (field: string | { [key in Language]: string }): string => {
    if (typeof field === 'string') return field;
    return field[language] || field['en'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, resolveTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
