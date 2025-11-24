import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import FadeIn from '../components/FadeIn';
import { ARTICLES, BLOG_TAGLINE } from '../constants';

const Home: React.FC = () => {
  const featuredArticle = ARTICLES[0];
  const recentArticles = ARTICLES.slice(1);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      
      {/* Intro Hero */}
      <FadeIn>
        <section className="py-12 md:py-20 mb-8 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-5xl md:text-7xl font-sans font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
            Exploring the <span className="text-slate-300 dark:text-slate-700">structure</span> of our world.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-sans font-light">
            {BLOG_TAGLINE}
          </p>
          <div className="pt-8">
             <Link to="/about" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white hover:text-slate-500 transition-colors">
               More about the author →
             </Link>
          </div>
        </section>
      </FadeIn>

      {/* Featured Article */}
      <FadeIn delay={200}>
        <section className="mb-24">
          <div className="flex items-center space-x-4 mb-8">
             <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white animate-pulse"></span>
             <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Latest Insight</h2>
          </div>
          <ArticleCard article={featuredArticle} variant="featured" />
        </section>
      </FadeIn>

      {/* Recent Writings Timeline */}
      <section className="relative">
        <FadeIn delay={300}>
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 pl-10">Recent Writings</h2>
             <Link to="/articles" className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white hover:text-slate-500 transition-colors">
               View Archive
             </Link>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Continuous Vertical Line */}
          <div className="absolute left-[9px] top-2 bottom-6 w-px bg-slate-200 dark:bg-slate-800"></div>

          <div className="space-y-12">
            {recentArticles.map((article, index) => (
              <FadeIn key={article.id} delay={index * 100}>
                <div className="relative pl-12 group">
                  {/* Timeline Node */}
                  <span className="absolute left-[3px] top-3 w-3.5 h-3.5 rounded-full border-[3px] border-white dark:border-slate-950 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:scale-125 transition-all duration-300 z-10 shadow-sm"></span>
                  
                  {/* Connecting Line Highlight (Optional - subtle glow on hover) */}
                  <span className="absolute left-[9px] top-3 bottom-[-48px] w-px bg-slate-900 dark:bg-white origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out z-0"></span>

                  <ArticleCard article={article} variant="minimal" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;