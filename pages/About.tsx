import React from 'react';
import { useTranslation } from 'react-i18next';
import { AUTHOR } from '../constants';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto space-y-16 pb-12">
      {/* Intro */}
      <FadeIn>
        <div className="space-y-6">

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-50 mb-2">
                {AUTHOR.name}
              </h1>

            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('about.bio')}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* History and Truth */}
      <FadeIn delay={200}>
        <section className="mb-12 prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif">
          <h2>{t('about.historyAndTruth.title')}</h2>
          <p>{t('about.historyAndTruth.p1')}</p>
          <p>{t('about.historyAndTruth.p2')}</p>
          <p>{t('about.historyAndTruth.p3')}</p>
        </section>
      </FadeIn>

      {/* Why I Write */}
      <FadeIn delay={300}>
        <section className="mb-12 prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif">
          <h2>{t('about.whyIWrite.title')}</h2>
          <p className="whitespace-pre-line">{t('about.whyIWrite.intro')}</p>
          <p>{t('about.whyIWrite.reason1')}</p>
          <p>{t('about.whyIWrite.reason2')}</p>
          <p>{t('about.whyIWrite.reason3')}</p>
        </section>
      </FadeIn>

      {/* My Approach */}
      <FadeIn delay={400}>
        <section className="mb-12 prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif">
          <h2>{t('about.myApproach.title')}</h2>
          <p>{t('about.myApproach.intro')}</p>
          <ul className="marker:text-slate-900 dark:marker:text-slate-100">
            <li>{t('about.myApproach.history')}</li>
            <li>{t('about.myApproach.technology')}</li>
            <li>{t('about.myApproach.politics')}</li>
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center">
            <Mail size={24} className="text-slate-400 mr-4" />
            <span className="text-lg font-medium">{AUTHOR.email}</span>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors transform active:scale-95 transition duration-150" onClick={() => navigator.clipboard.writeText(AUTHOR.email)}>{t('about.copyEmail')}</button>
        </div>
      </FadeIn>
    </div>
  );
};

export default About;