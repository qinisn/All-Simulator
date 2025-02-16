<!-- src/views/Home.vue -->
<template>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" id="Background-tab" data-bs-toggle="tab" href="#Background" role="tab" aria-controls="Background" aria-selected="true">{{$t('Help.tab1.tab') }}</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="Simulator-tab" data-bs-toggle="tab" href="#Simulator" role="tab" aria-controls="Simulator" aria-selected="false">{{$t('Help.tab2.tab') }}</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" id="Settings-tab" data-bs-toggle="tab" href="#Settings" role="tab" aria-controls="Settings" aria-selected="false">{{$t('Help.tab3.tab') }}</a>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active p-4" id="Background" role="tabpanel" aria-labelledby="Background-tab">
      <p style="font-size: 18px;">{{$t('Help.tab1.description') }} </p>
    </div>
    <div class="tab-pane fade p-4" id="Simulator" role="tabpanel" aria-labelledby="Simulator-tab">
      <p style="font-size: 18px;">{{$t('Help.tab2.description') }} </p>
    </div>
    <div class="tab-pane fade p-4" id="Settings" role="tabpanel" aria-labelledby="Settings-tab">
      <p style="font-size: 18px;">{{$t('Help.tab3.description') }} </p> 
    </div>
  </div>
  </template>
  
  <script>
  import { setI18nLanguage } from '/src/lang/i18n';
  import { useLanguageStore } from '@/store/language';
  import { computed, onMounted  } from 'vue'; 

  export default {
    name: 'HelpPage',
    setup() {
    const languageStore = useLanguageStore();
    const currentLanguage = computed(() => languageStore.locale);
    console.log(currentLanguage.value);

    // 使用 onMounted 钩子
    onMounted(() => {
      setI18nLanguage(currentLanguage.value, 'Help'); // 使用 .value 访问计算属性
    });
    
    return {
      currentLanguage
    };
  },
  };
  </script>