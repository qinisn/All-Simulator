import { createI18n } from 'vue-i18n';
import zhCommon from './locales/zh/common.json';
import enCommon from './locales/en/common.json';

// 创建 i18n 实例时，只加载通用资源或最少的初始资源
const i18n = createI18n({
  locale: 'en', // 设置默认语言
  fallbackLocale: 'zh', // 设置回退语言
  messages: {
    zh: { common: zhCommon },
    en: { common: enCommon }
  }
});


// 动态加载语言包函数
async function loadLanguagePack(lang, page) {
  console.log(`Loading ${lang}  pack for ${page}`);

  try {
    // 动态导入语言文件
    const modules = ['common', page]; // 假设你有这些模块
    const messages = {};
    
    for (const module of modules) {
      console.log(`Loading ${module} module for language ${lang}`);
      const importedMessages = await import(
        `./locales/${lang}/${module}.json`
      );
      messages[module] = importedMessages.default || importedMessages;
    }

    // 设置新的语言消息
    i18n.global.setLocaleMessage(lang, messages);

    // 更新可用的语言列表
    i18n.global.availableLocales.push(lang);
  } catch (error) {
    console.error(`Failed to load language pack for ${lang}:`, error);
  }
}

// 暴露一个方法用于切换语言并加载对应的语言包
export async function setI18nLanguage(lang, page) {
  // 加载对应语言包（如果还没有加载）
  await loadLanguagePack(lang, page);

  // 切换语言
  i18n.global.locale = lang;

  // 触发事件通知应用语言已更改（可选）
  document.dispatchEvent(new Event('language-change'));
}

export default i18n;
