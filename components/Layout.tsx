
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BLOG_NAME } from '../constants';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { pathname, hash } = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Handle scrolling on route or hash change
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    setIsMenuOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ne' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.articles'), path: '/articles' },
    { name: t('nav.about'), path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F3] dark:bg-[#171717] text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900">

      {/* Modern Fixed Header */}
      <header className="fixed top-0 w-full z-50 bg-[#F9F9F3]/80 dark:bg-[#171717]/80 backdrop-blur-md border-b border-slate-100/50 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="z-50 group">
            <span className="text-xl font-sans font-bold tracking-tight text-slate-900 dark:text-white group-hover:opacity-80 transition-opacity">
              {BLOG_NAME}.
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

            <button
              onClick={toggleLanguage}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle language"
              title={i18n.language === 'en' ? 'Switch to Nepali' : 'Switch to English'}
            >
              <Languages size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="text-slate-500 dark:text-slate-400 p-2"
              title={i18n.language === 'en' ? 'Switch to Nepali' : 'Switch to English'}
            >
              <Languages size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="text-slate-500 dark:text-slate-400 p-2"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-900 dark:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Dropdown - Placed outside Header to fix stacking context */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#F9F9F3] dark:bg-[#171717] animate-in slide-in-from-right duration-200 border-t border-slate-100 dark:border-slate-800 md:hidden overflow-y-auto">
          <div className="p-6 flex flex-col space-y-6 mt-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-2xl font-sans font-bold tracking-tight ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 dark:border-slate-900 mt-auto bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-6xl mx-auto flex justify-center items-center text-sm text-slate-500 dark:text-slate-400">
          <div className="font-medium">
            &copy; {new Date().getFullYear()} {BLOG_NAME}.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
