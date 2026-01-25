import React from "react";
import { useTranslation } from "react-i18next";
import { AUTHOR } from "../constants";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import FadeIn from "../components/FadeIn";

const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-16 pb-12">
      {/* Intro */}
      <FadeIn>
        <div className="space-y-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-50 mb-2">
                {t("about.title")}
              </h1>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("about.bio")}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Who We Are / History and Truth */}
      <FadeIn delay={200}>
        <section className="mb-12 prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif">
          <h2 className="font-bold">{t("about.historyAndTruth.title")}</h2>
          <p>{t("about.historyAndTruth.p1")}</p>
          <p>{t("about.historyAndTruth.p2")}</p>
          <p>{t("about.historyAndTruth.p3")}</p>
        </section>
      </FadeIn>

      {/* Why We Write */}
      <FadeIn delay={300}>
        <section className="mb-12 prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif">
          <h2 className="font-bold">{t("about.whyIWrite.title")}</h2>
          <p className="whitespace-pre-line">{t("about.whyIWrite.intro")}</p>
          <p>{t("about.whyIWrite.reason1")}</p>
          <p>{t("about.whyIWrite.reason2")}</p>
          <p>{t("about.whyIWrite.reason3")}</p>
        </section>
      </FadeIn>

      {/* Our Approach */}
      <FadeIn delay={400}>
        <section className="mb-12 prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif">
          <h2 className="font-bold">{t("about.myApproach.title")}</h2>
          <p>{t("about.myApproach.intro")}</p>
          <ul className="marker:text-slate-900 dark:marker:text-slate-100">
            <li>{t("about.myApproach.history")}</li>
            <li>{t("about.myApproach.technology")}</li>
            <li>{t("about.myApproach.politics")}</li>
          </ul>
        </section>
      </FadeIn>
    </div>
  );
};

export default About;
