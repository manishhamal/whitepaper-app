import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  variant?: 'standard' | 'featured' | 'minimal';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'standard' }) => {
  
  // Minimal List Style (Timeline View)
  if (variant === 'minimal') {
    return (
      <Link to={`/article/${article.id}`} className="group block w-full">
        <article className="flex flex-col justify-center min-h-[3rem]">
          <h3 className="text-2xl md:text-3xl font-sans font-bold text-slate-800 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-colors leading-tight">
            {article.title}
          </h3>
          {/* Date - Fades out on hover to reveal only title */}
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 opacity-100 group-hover:opacity-0 transform group-hover:translate-x-2 transition-all duration-300">
            {new Date(article.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </article>
      </Link>
    );
  }

  // Featured Style (Hero)
  if (variant === 'featured') {
    return (
      <article className="group relative flex flex-col">
        {article.featuredImage && (
          <Link to={`/article/${article.id}`} className="block overflow-hidden mb-8 rounded-2xl">
            <img 
              src={article.featuredImage} 
              alt={article.title} 
              className="w-full h-auto aspect-[21/9] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </Link>
        )}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              {article.category}
            </span>
          </div>
          <Link to={`/article/${article.id}`} className="block mb-6">
            <h3 className="text-4xl md:text-6xl font-sans font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tighter group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
              {article.title}
            </h3>
          </Link>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-sans font-light max-w-2xl">
            {article.excerpt}
          </p>
          <Link 
            to={`/article/${article.id}`} 
            className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white border-b-2 border-slate-200 dark:border-slate-700 pb-1 hover:border-slate-900 dark:hover:border-white transition-colors w-max"
          >
            Read Article
          </Link>
        </div>
      </article>
    );
  }

  // Standard Style (Grid/Archive)
  return (
    <article className="group flex flex-col h-full p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-300">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {article.category}
        </span>
      </div>

      <Link to={`/article/${article.id}`} className="block mb-4">
        <h3 className="text-2xl font-sans font-bold text-slate-900 dark:text-white leading-tight">
          {article.title}
        </h3>
      </Link>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3 font-sans text-sm">
        {article.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between text-xs font-mono text-slate-400">
        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </article>
  );
};

export default ArticleCard;