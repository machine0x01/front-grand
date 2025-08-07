import type { LocalizationResource } from '@clerk/types';
import type { LocalePrefixMode } from 'next-intl/routing';
import { enUS, arSA } from '@clerk/localizations';

const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'GrandNotion',
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix,
};

const supportedLocales: Record<string, LocalizationResource> = {
  en: enUS,
  ar: arSA,
};

export const ClerkLocalizations = {
  defaultLocale: arSA,
  supportedLocales,
};
