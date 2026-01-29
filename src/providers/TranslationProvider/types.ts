import { Dispatch, ReactNode, SetStateAction } from 'react';

// Type of props
export type tProps = {
  children: ReactNode;
};

// Type of locales
export enum tLocales {
  CS_CZ = 'cs-CZ',
  DE_DE = 'de-DE',
  EN_GB = 'en-GB',
  ES_ES = 'es-ES',
  FR_FR = 'fr-FR',
  HU_HU = 'hu-HU',
  IT_IT = 'it-IT',
  JA_JP = 'ja-JP',
  PL_PL = 'pl-PL',
  PT_PT = 'pt-PT',
  SK_SK = 'sk-SK',
  TR_TR = 'tr-TR',
  ZH_CN = 'zh-CN',
}

// Type of translated messages
export type tMessages = Record<string, string>;

// Type of context
export type tContext = {
  locale: tLocales;
  setLocale: Dispatch<SetStateAction<tLocales>>;
};
