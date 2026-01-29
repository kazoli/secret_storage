import { ComponentType, JSX, useEffect, useState } from 'react';
import {
  Cn,
  Cz,
  De,
  Gb,
  Es,
  Fr,
  Hu,
  It,
  Jp,
  Pl,
  Pt,
  Sk,
  Tr,
} from 'react-flag-icons';

import DropDownMenu from '../../../../components/general/DropDownMenu';
import { tDropDownOption } from '../../../../utils';

import { tLocales, useTranslationContext } from '../../../TranslationProvider';

import { tProps } from './types';

const HeaderLanguageSelector = (props: tProps) => {
  const { locale, setLocale } = useTranslationContext();

  const [selected, setSelected] = useState<JSX.Element>(<></>);
  const [options, setOptions] = useState<tDropDownOption[]>([]);

  useEffect(() => {
    const flag = (Component: ComponentType, locale: string) => (
      <div className="flex gap-[5px]">
        <Component />
        {locale}
      </div>
    );
    const baseOptions = [
      { key: tLocales.ZH_CN, value: flag(Cn, 'CN') },
      { key: tLocales.CS_CZ, value: flag(Cz, 'CZ') },
      { key: tLocales.DE_DE, value: flag(De, 'DE') },
      { key: tLocales.ES_ES, value: flag(Es, 'ES') },
      { key: tLocales.FR_FR, value: flag(Fr, 'FR') },
      { key: tLocales.EN_GB, value: flag(Gb, 'GB') },
      { key: tLocales.HU_HU, value: flag(Hu, 'HU') },
      { key: tLocales.IT_IT, value: flag(It, 'IT') },
      { key: tLocales.JA_JP, value: flag(Jp, 'JP') },
      { key: tLocales.PL_PL, value: flag(Pl, 'PL') },
      { key: tLocales.PT_PT, value: flag(Pt, 'PT') },
      { key: tLocales.SK_SK, value: flag(Sk, 'SK') },
      { key: tLocales.TR_TR, value: flag(Tr, 'TR') },
    ];
    const filteredOptions = baseOptions.filter((option) => {
      if (option.key === locale) {
        setSelected(option.value);
        return false;
      }
      return true;
    });
    setOptions(filteredOptions);
  }, [locale]);

  const action = (locale: tDropDownOption['key']) => {
    setLocale(locale as tLocales);
  };

  if (options.length === 0) {
    return null;
  }

  return (
    <DropDownMenu
      selected={selected}
      classContainer="relative"
      classTrigger=""
      classList={`${props.hide ? '!hidden' : ''} right-0 w-[max-content] max-h-[85vh]`}
      classElement="transition-custom block cursor-pointer mt-[5px] p-[5px_10px] bg-[#fff] shadow-[inset_0_0_5px_0_#777] hover:shadow-[inset_0_0_3px_1px_#8563c5] hover:text-[#7a54bf] border border-[#777] hover:border-[#8563c5] rounded-[3px]"
      options={options}
      action={action}
    />
  );
};

export default HeaderLanguageSelector;
