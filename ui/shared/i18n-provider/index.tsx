import React, { createContext } from 'react';

// Default interface for translations
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Default value for i18n
const I18nContext: React.Context<string> = createContext('en');

interface I18nProviderProps {
  locale?: string;
  children: any;
}

function I18nProvider({ locale = 'en', children }: I18nProviderProps) {
  return <I18nContext.Provider value={locale}>{children}</I18nContext.Provider>;
}

export { I18nContext, I18nProvider };
