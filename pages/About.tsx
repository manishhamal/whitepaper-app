import React from 'react';
import { AUTHOR } from '../constants';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-16 pb-12">
      {/* Intro */}
      <FadeIn>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img 
            src={AUTHOR.avatar} 
            alt={AUTHOR.name} 
            className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover shadow-sm bg-slate-100 grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-slate-50 mb-2">
                Hi, I'm {AUTHOR.name}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{AUTHOR.role}</p>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {AUTHOR.bio}
            </p>
            <div className="flex gap-4">
               <a href={AUTHOR.socials.twitter} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors">
                 <Twitter size={20} />
               </a>
               <a href={AUTHOR.socials.github} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors">
                 <Github size={20} />
               </a>
               <a href={AUTHOR.socials.linkedin} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors">
                 <Linkedin size={20} />
               </a>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Manifesto */}
      <FadeIn delay={200}>
        <div className="prose prose-lg dark:prose-invert prose-slate max-w-none prose-headings:font-serif">
          <h2 className="">Why Whitepaper?</h2>
          <p>
            In a world of hot takes and algorithmic rage bait, I wanted to create a space for slow thinking. 
            "Whitepaper" denotes authority, research, and clarity. That is the standard I strive for.
          </p>
          <p>
            My writing focuses on three pillars:
          </p>
          <ul className="marker:text-slate-900 dark:marker:text-slate-100">
            <li><strong>History:</strong> Because the past is the only reliable data set we have.</li>
            <li><strong>Technology:</strong> Because it is the lever moving the world today.</li>
            <li><strong>Politics:</strong> Because it is the mechanism by which we decide how to use that lever.</li>
          </ul>

          <h2 className="">Contact</h2>
          <p>
            I am always open to interesting conversations, consulting opportunities, or debate. 
            The best way to reach me is via email.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center">
            <Mail size={24} className="text-slate-400 mr-4" />
            <span className="text-lg font-medium">alex@whitepaper.dev</span>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors">
            Copy Email
          </button>
        </div>
      </FadeIn>
    </div>
  );
};

export default About;