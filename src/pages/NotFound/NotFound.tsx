import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import LayoutProvider from '../../providers/LayoutProvider';
import {
  defaultMessages,
  useTranslationContext,
} from '../../providers/TranslationProvider';

const NotFound = () => {
  const translate = useIntl().formatMessage;
  const { locale } = useTranslationContext();

  useEffect(() => {
    document.title = translate(defaultMessages.notFound.documentTitle);
  }, [locale, translate]);

  return (
    <LayoutProvider>
      <div className="flex flex-wrap">
        <h1 className="w-full text-[2rem]">
          {translate(defaultMessages.notFound.mainTitle)}
        </h1>
        <Link to="/" className="text-[#0000ff] text-[1.25rem] hover:underline">
          {translate(defaultMessages.notFound.goBackLink)}
        </Link>
      </div>
    </LayoutProvider>
  );
};

export default NotFound;
