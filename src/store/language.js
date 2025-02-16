// store/language.js
import { defineStore } from 'pinia';
import { setI18nLanguage } from '../lang/i18n';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: 'en' // 默认语言
  }),
  actions: {
    async changeLocale(locale, page) {
      await setI18nLanguage(locale, page);
      this.locale = locale;
    }
  }
});