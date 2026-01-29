import { useIntl } from 'react-intl';
import { defaultMessages } from '../../TranslationProvider';

const Footer = () => {
  const translate = useIntl().formatMessage;

  return (
    <footer className="bg-[#404040] shadow-[inset_0_0_30px_0_#000]">
      <div className="content-positioner text-[#ffffff] flex-1 py-[20px]">
        {translate(defaultMessages.footer.designedBy)}
      </div>
    </footer>
  );
};

export default Footer;
