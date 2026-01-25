import React from "react";
import { useTranslation } from "react-i18next";
import { AUTHOR } from "../constants";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import FadeIn from "../components/FadeIn";

const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-16 pb-12">
      {/* Intro - Lex Fridman style profile */}
      <FadeIn>
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={AUTHOR.avatar}
              alt={AUTHOR.name}
              className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-md grayscale hover:grayscale-0 transition-all duration-700 ease-out shadow-sm"
            />
          </div>

          {/* Intro Text */}
          <div className="space-y-6 pt-2">
            <div>
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-slate-900 dark:text-slate-50 mb-2 tracking-tight">
                {AUTHOR.name}
              </h1>
              <div className="text-xl text-slate-500 font-medium">{AUTHOR.role}</div>
            </div>
            <div
              className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl"
              dangerouslySetInnerHTML={{ __html: t("about.bio") }}
            />
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
