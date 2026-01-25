import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import FadeIn from "../components/FadeIn";
import { Article } from "../types";
import { AUTHOR } from "../constants";
import { articleService } from "../src/services/articleService";
import {
  getArticleAnalytics,
  trackView,
  trackRead,
  subscribeToAnalytics,
} from "../src/services/analyticsService";

const ArticleDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [stats, setStats] = useState({ views: 0, reads: 0 });

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

  // Fetch analytics and track view on mount
  useEffect(() => {
    if (!id || !article) return;

    // Prevent multiple view increments in the same session
    const sessionKey = `viewed_${id}`;
    if (sessionStorage.getItem(sessionKey)) {
      // Already tracked view this session, just fetch current stats
      getArticleAnalytics(id).then((analytics) =>
        setStats({ views: analytics.views, reads: analytics.reads })
      );
      return;
    }

    const initAnalytics = async () => {
      try {
        // Fetch current analytics
        const analytics = await getArticleAnalytics(id);
        setStats({ views: analytics.views, reads: analytics.reads });

        // Track view
        await trackView(id);
        sessionStorage.setItem(sessionKey, "true");

        // Refresh stats after tracking
        const updatedAnalytics = await getArticleAnalytics(id);
        setStats({
          views: updatedAnalytics.views,
          reads: updatedAnalytics.reads,
        });
      } catch (error) {
        console.error("Failed to initialize analytics:", error);
      }
    };

    initAnalytics();
  }, [id, article]);

  // Subscribe to real-time analytics updates
  useEffect(() => {
    if (!id) return;

    const unsubscribe = subscribeToAnalytics(id, (analytics) => {
      setStats({ views: analytics.views, reads: analytics.reads });
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  // Track scroll progress and reads
  useEffect(() => {
    const updateScrollProgress = async () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        const progress =
          Number((currentScroll / scrollHeight).toFixed(2)) * 100;
        setReadingProgress(progress);

        // Track as "read" when user scrolls to 80% or more
        if (progress >= 80 && id && article) {
          const readKey = `read_${id}`;
          if (!sessionStorage.getItem(readKey)) {
            sessionStorage.setItem(readKey, "true");
            await trackRead(id);
            // Stats will be updated via real-time subscription
          }
        }
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, [id, article]);

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
        <h2 className="text-3xl font-bold mb-4 font-sans">
          {t("common.error")}
        </h2>
        <p className="text-slate-500">{t("articleDetail.notFound")}</p>
      </div>
    );
  }

  const title =
    i18n.language === "ne" && article.titleNe ? article.titleNe : article.title;
  const content =
    i18n.language === "ne" && article.contentNe
      ? article.contentNe
      : article.content;
  const tags =
    i18n.language === "ne" && article.tagsNe ? article.tagsNe : article.tags;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent pointer-events-none transition-colors duration-300">
        <div
          className="h-full bg-slate-900 dark:bg-white transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Grid Background Wrapper */}
      <div className="min-h-screen w-full bg-white dark:bg-[#171717] relative transition-colors duration-300">
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
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] transition-opacity duration-300" />
          </div>
        </div>

        <article className="pb-20 relative z-10 pt-4 transition-colors duration-300">

          {/* Header */}
          <FadeIn>
            <header className="mb-6 border-b border-slate-200/60 dark:border-slate-700/60 pb-6 transition-colors duration-300 flex flex-col items-center">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-sans font-bold text-black dark:text-white mb-4 text-center pt-3 pb-2" style={{ fontSize: 'clamp(32px, 4vw, 36px)', lineHeight: '1.4' }}>
                {title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-mono rounded-md transition-colors duration-300"
                  >
                    {tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </header>
          </FadeIn>

          {/* Featured Image */}
          {article.featuredImage && (
            <FadeIn delay={200}>
              <div className="mb-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 group transition-colors duration-300">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-auto object-cover max-h-[500px] article-image-hover"
                  style={{
                    filter: "grayscale(100%)",
                    transition: "filter 0.7s ease-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "grayscale(0%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "grayscale(100%)";
                  }}
                />
              </div>
            </FadeIn>
          )}

          {/* Content Body */}
          <FadeIn delay={300}>
            <style>{`
              .article-content img {
                filter: grayscale(100%) !important;
                transition: filter 0.7s ease-out !important;
                cursor: pointer;
              }
              .article-content img:hover {
                filter: grayscale(0%) !important;
              }
              .article-image-hover {
                filter: grayscale(100%);
                transition: filter 0.7s ease-out;
                cursor: pointer;
              }
              .article-image-hover:hover {
                filter: grayscale(0%);
              }
            `}</style>
            <div
              className="article-content prose prose-lg dark:prose-invert prose-slate max-w-none
              prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black dark:prose-headings:text-white
              prose-p:font-sans prose-p:font-normal prose-p:leading-relaxed prose-p:text-black dark:prose-p:text-white
              prose-a:font-medium prose-a:text-slate-900 dark:prose-a:text-white prose-a:no-underline prose-a:border-b prose-a:border-slate-300 dark:prose-a:border-slate-600 hover:prose-a:border-slate-900 dark:hover:prose-a:border-white prose-a:transition-colors
              prose-img:rounded-xl
              prose-hr:border-slate-200/40 dark:prose-hr:border-slate-700/40 prose-hr:transition-colors prose-hr:duration-500
              lead:text-xl lead:font-sans lead:text-slate-600 dark:lead:text-slate-300"
              style={{
                fontSize: '18px',
                lineHeight: '1.5'
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </FadeIn>

          {/* Footer - Author Info and Date */}
          <FadeIn delay={400}>
            <div className="mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-700/60 transition-colors duration-300">
              <div className="flex justify-end">
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-lg md:text-2xl">
                      {article.authorName || AUTHOR.name}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
                      {article.authorRole || AUTHOR.role}
                    </div>
                    <div className="text-slate-400 dark:text-slate-500 text-xs md:text-sm mt-1">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={article.authorAvatar || AUTHOR.avatar}
                      alt={article.authorName || AUTHOR.name}
                      className="w-20 h-20 md:w-28 md:h-28 object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </article>
      </div>
    </>
  );
};

export default ArticleDetail;
