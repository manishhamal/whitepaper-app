import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { ARTICLES } from '../constants';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES.find((a) => a.id === id);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setReadingProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    
    // Initial call
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  if (!article) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4 font-sans">Article Not Found</h2>
        <Link to="/articles" className="text-slate-900 hover:underline flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent pointer-events-none">
        <div 
          className="h-full bg-slate-900 dark:bg-white transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="max-w-3xl mx-auto pb-20">
        {/* Back Link */}
        <FadeIn>
          <Link to="/articles" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 mb-12 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={100}>
          <header className="mb-12">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-slate-900 dark:text-slate-50 mb-6 leading-tighter tracking-tight">
              {article.title}
            </h1>
          </header>
        </FadeIn>

        {/* Featured Image */}
        {article.featuredImage && (
          <FadeIn delay={200}>
            <div className="mb-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
              <img 
                src={article.featuredImage} 
                alt={article.title} 
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          </FadeIn>
        )}

        {/* Content Body */}
        <FadeIn delay={300}>
          <div 
            className="prose prose-lg dark:prose-invert prose-slate max-w-none 
            prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
            prose-p:font-serif prose-p:leading-loose
            prose-a:font-medium prose-a:text-slate-900 dark:prose-a:text-white prose-a:no-underline prose-a:border-b prose-a:border-slate-300 dark:prose-a:border-slate-600 hover:prose-a:border-slate-900 dark:hover:prose-a:border-white prose-a:transition-colors
            prose-img:rounded-xl prose-img:grayscale hover:prose-img:grayscale-0 prose-img:transition-all
            lead:text-xl lead:font-sans lead:text-slate-600 dark:lead:text-slate-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </FadeIn>

        {/* Date at the end */}
        <FadeIn delay={400}>
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
             <p className="text-sm font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wide">
               Published on {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
             </p>
          </div>
        </FadeIn>
      </article>
    </>
  );
};

export default ArticleDetail;