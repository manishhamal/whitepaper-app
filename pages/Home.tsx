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
      <div className="pb-12 relative z-10">
        {/* Intro Hero */}
        <FadeIn>
          <section className="py-12 mb-8 border-b border-slate-200/60 dark:border-slate-700/60 transition-colors duration-300">
            <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter mb-4 animate-float text-center max-w-4xl mx-auto bg-gradient-to-br from-slate-800 via-slate-700 to-blue-700 dark:from-slate-100 dark:via-slate-200 dark:to-blue-400 bg-clip-text text-transparent pt-3 pb-2" style={{ lineHeight: '1.4' }}>
              {t("hero.title_line1")}
              <br className="hidden md:block" />{" "}
              {t("hero.title_line2")}
            </h1>
          </section>
        </FadeIn>

        {/* Recent Writings Timeline */}
        <section className="relative w-full">
          <div className="space-y-0">
            {recentArticles.map((article, index) => (
              <FadeIn key={article.id} delay={index * 50}>
                <ArticleCard article={article} variant="timeline" />
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
