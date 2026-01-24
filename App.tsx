import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';

import AdminDashboard from './pages/AdminDashboard';
import TranslationHelper from './pages/TranslationHelper';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="article/:id" element={<ArticleDetail />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/translation-helper" element={<TranslationHelper />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
