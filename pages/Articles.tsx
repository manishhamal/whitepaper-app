import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ArticleCard from '../components/ArticleCard';
import FadeIn from '../components/FadeIn';
import { Category, Article } from '../types';
import { articleService } from '../src/services/articleService';

const Articles: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || Category.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles on mount
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await articleService.getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // Sync state with URL param if it changes externally
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory(Category.All);
    }
  }, [categoryParam]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = activeCategory === Category.All || article.category === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, articles]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === Category.All) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="pb-12">
      <FadeIn>
        <div className="space-y-6 mb-16">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-slate-50">
            {t('articles.title')}
          </h1>


          {/* Simplified Search & Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[Category.All, Category.History, Category.Technology, Category.Politics].map((cat) => {
                // Map category to translation key
                let translationKey = 'all';
                if (cat === Category.History) translationKey = 'history';
                else if (cat === Category.Technology) translationKey = 'technology';
                else if (cat === Category.Politics) translationKey = 'politics';

                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`font-bold uppercase tracking-widest  ${activeCategory === cat
                      ? 'text-slate-900 dark:text-white underline underline-offset-4 decoration-2'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                  >
                    {t(`category.${translationKey}`)}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-56">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-1 pl-0 pr-6 text-sm focus:outline-none focus:border-slate-900 dark:focus:border-slate-100 placeholder:text-slate-300"
              />
              <Search size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Timeline List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-slate-400" size={32} />
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="space-y-0 w-full">
          {filteredArticles.map((article, index) => (
            <FadeIn key={article.id} delay={index * 50}>
              <ArticleCard article={article} variant="timeline" />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-500 font-mono text-sm">
          <p>{t('articles.noArticles')}</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory(Category.All) }}
            className="mt-4 text-slate-900 dark:text-slate-100 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Articles;
