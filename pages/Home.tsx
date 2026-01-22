import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArticleCard from "../components/ArticleCard";
import FadeIn from "../components/FadeIn";
import { Article } from "../types";
import { articleService } from "../src/services/articleService";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await articleService.getArticles();
      setRecentArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#171717] relative -mt-32 pt-32 transition-colors duration-300">
      {/* Grid Pattern with CSS Mask for Vignette */}
      <div className="max-w-7xl mx-auto pb-12 px-4 relative z-10">
        {/* Intro Hero */}
        <FadeIn>
          <section className="py-12 mb-8 border-b border-slate-200/60 dark:border-slate-700/60 transition-colors duration-300">
            <h1 className="text-4xl md:text-5xl font-sans font-bold leading-[0.9] tracking-tighter mb-4 animate-float text-center max-w-4xl mx-auto">
              <span className="text-slate-900 dark:text-white">{t("hero.title_line1")}</span>
              <br className="hidden md:block" />{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {t("hero.title_line2")}
              </span>
            </h1>
          </section>
        </FadeIn>

        {/* Recent Writings Grid */}
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArticles.map((article, index) => (
              <FadeIn key={article.id} delay={index * 100}>
                <ArticleCard article={article} variant="card" />
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
