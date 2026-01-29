import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import {
  Context,
  DEFAULT_LOCALE,
  getLocal,
  getMessages,
  setLocal,
} from './utils';
import { tProps } from './types';

const TranslationProvider = (props: tProps) => {
  const [locale, setLocale] = useState(getLocal());
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    setLocal(locale);
    const fetchMessages = async () => {
      const messages = await getMessages(locale);
      setMessages(messages);
    };
    fetchMessages();
  }, [locale]);

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider
      messages={messages}
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
    >
      <Context.Provider value={{ locale, setLocale }}>
        {props.children}
      </Context.Provider>
    </IntlProvider>
  );
};

export default TranslationProvider;
