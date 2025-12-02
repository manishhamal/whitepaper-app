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
    <div className="min-h-screen w-full bg-[#F9F9F3] dark:bg-[#171717] relative -mt-32 pt-32 transition-colors duration-300">
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

      <div className="max-w-4xl mx-auto pb-12 relative z-10">
        {/* Intro Hero */}
        <FadeIn>
          <section className="py-12 md:py-20 mb-8 border-b border-slate-200/60 dark:border-slate-700/60 transition-colors duration-300">
            <h1 className="text-5xl md:text-7xl font-sans font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8 animate-float">
              {t("hero.title")}
            </h1>
            <div className="pt-8"></div>
          </section>
        </FadeIn>

        {/* Recent Writings Timeline */}
        <section className="relative">
          <FadeIn delay={300}>
            <div className="flex items-center justify-between mb-12"></div>
          </FadeIn>

          <div className="relative">
            {/* Continuous Vertical Line */}
            <div className="absolute left-[9px] top-2 bottom-6 w-px bg-slate-200/60 dark:bg-slate-700/60 transition-colors duration-300"></div>

            <div className="space-y-12">
              {recentArticles.map((article, index) => (
                <FadeIn key={article.id} delay={index * 100}>
                  <div className="relative pl-12 group">
                    {/* Timeline Node */}
                    <span className="absolute left-[3px] top-3 w-3.5 h-3.5 rounded-full border-[3px] border-white dark:border-slate-950 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:scale-125 transition-all duration-300 z-10 shadow-sm"></span>

                    {/* Connecting Line Highlight (Optional - subtle glow on hover) - Hide for last item */}
                    {index !== recentArticles.length - 1 && (
                      <span className="absolute left-[9px] top-3 bottom-[-48px] w-px bg-slate-900 dark:bg-white origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-in-out z-0"></span>
                    )}

                    <ArticleCard article={article} variant="minimal" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
