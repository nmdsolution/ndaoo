import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { content } from './data.js';

const STORAGE_KEY = 'ndaoo-lang';
const LangContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved in content) return saved;
  } catch { /* stockage indisponible */ }
  return 'fr';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const data = content[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = data.ui.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.ui.pageDescription);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignoré */ }
  }, [lang, data]);

  const value = useMemo(() => ({ lang, setLang, data, ui: data.ui }), [lang, data]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
