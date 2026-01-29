import { createContext, useContext } from 'react';
import { getLocalStorage } from '../../utils';
import { tContext, tLocales, tMessages } from './types';

export const DEFAULT_LOCALE = tLocales.EN_GB;

export const getLocal = () => {
  const local = getLocalStorage('locale') as tLocales | null;
  return local ? local : DEFAULT_LOCALE;
};

export const setLocal = (locale: tLocales) => {
  localStorage.setItem('locale', locale);
};

export const getMessages = async (locale: tLocales) => {
  try {
    // dynamic import based on locale
    const messages = await import(`./messages/${locale}.json`);
    return (messages.default ?? messages) as tMessages;
  } catch (err) {
    // fallback to English
    const messages = await import(`./messages/${DEFAULT_LOCALE}.json`);
    return (messages.default ?? messages) as tMessages;
  }
};

// create context
export const Context = createContext({} as tContext);

// context custom hook
export const useTranslationContext = () => useContext(Context);
