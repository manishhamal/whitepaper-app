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
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Single Grid - neutral color works on both backgrounds */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:48px_48px] transition-opacity duration-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto pb-12 px-4 relative z-10">
        {/* Intro Hero */}
        <FadeIn>
          <section className="py-12 mb-8 border-b border-slate-200/60 dark:border-slate-700/60 transition-colors duration-300">
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-4 animate-float">
              {t("hero.title")}
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
