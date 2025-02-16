<!-- src/views/Home.vue -->
<template>
    <div>
      <h1>{{$t('Home.title') }} </h1>
      <p class="pt-3" style="font-size: 18px;">{{$t('Home.content') }} </p>
    </div>
  </template>
  
  <script>
  import { setI18nLanguage } from '/src/lang/i18n';
  import { useLanguageStore } from '@/store/language';
  import { computed, onMounted  } from 'vue'; 

  export default {
    name: 'HomePage',
    setup() {
    const languageStore = useLanguageStore();
    const currentLanguage = computed(() => languageStore.locale);
    console.log(currentLanguage.value);

    // 使用 onMounted 钩子
    onMounted(() => {
      setI18nLanguage(currentLanguage.value, 'Home'); // 使用 .value 访问计算属性
    });
    
    return {
      currentLanguage
    };
  },
};

  </script>