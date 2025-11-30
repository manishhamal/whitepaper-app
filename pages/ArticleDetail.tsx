import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, BookOpen, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FadeIn from '../components/FadeIn';
import { Article } from '../types';
import { articleService } from '../src/services/articleService';
import { trackView, trackRead, getArticleStats } from '../utils/analytics';

const ArticleDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [stats, setStats] = useState({ views: 0, reads: 0 });
  const [hasTrackedRead, setHasTrackedRead] = useState(false);

  // Fetch article
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await articleService.getArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error("Failed to fetch article", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  // Track view on mount (only if article loaded)
  useEffect(() => {
    if (id && article) {
      trackView(id);
      setStats(getArticleStats(id));
    }
  }, [id, article]);

  // Track scroll progress and reads
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        const progress = Number((currentScroll / scrollHeight).toFixed(2)) * 100;
        setReadingProgress(progress);

        // Track as "read" when user scrolls to 80% or more
        if (progress >= 80 && !hasTrackedRead && id && article) {
          trackRead(id);
          setHasTrackedRead(true);
          setStats(getArticleStats(id));
        }
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [id, hasTrackedRead, article]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4 font-sans">{t('common.error')}</h2>
        <Link to="/articles" className="text-slate-900 hover:underline flex items-center">
          <ArrowLeft size={16} className="mr-2" /> {t('articleDetail.backToArticles')}
        </Link>
      </div>
    );
  }

  const title = i18n.language === 'ne' && article.titleNe ? article.titleNe : article.title;
  const content = i18n.language === 'ne' && article.contentNe ? article.contentNe : article.content;

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
            <ArrowLeft size={16} className="mr-2" /> {t('articleDetail.backToArticles')}
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
              {title}
            </h1>

            {/* View and Read Stats */}
            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{stats.views} views</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>{stats.reads} reads</span>
              </div>
            </div>
          </header>
        </FadeIn>

        {/* Featured Image */}
        {article.featuredImage && (
          <FadeIn delay={200}>
            <div className="mb-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 group">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px] grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
            </div>
          </FadeIn>
        )}

        {/* Content Body */}
        <FadeIn delay={300}>
          <style>{`
            .article-content img {
              filter: grayscale(100%);
              transition: filter 0.7s ease-out;
            }
            .article-content img:hover {
              filter: grayscale(0%);
            }
          `}</style>
          <div
            className="article-content prose prose-lg dark:prose-invert prose-slate max-w-none
            prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
            prose-p:font-serif prose-p:leading-loose
            prose-a:font-medium prose-a:text-slate-900 dark:prose-a:text-white prose-a:no-underline prose-a:border-b prose-a:border-slate-300 dark:prose-a:border-slate-600 hover:prose-a:border-slate-900 dark:hover:prose-a:border-white prose-a:transition-colors
            prose-img:rounded-xl
            lead:text-xl lead:font-sans lead:text-slate-600 dark:lead:text-slate-300"
            dangerouslySetInnerHTML={{ __html: content }}
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