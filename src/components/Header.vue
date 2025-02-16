<template>
  <header class="d-flex align-items-center justify-content-between p-3 bg-dark text-white shadow">
    <!-- 左侧：项目名称 -->
    <div class="d-flex align-items-center flex-shrink-0">
      <span class="fs-4 fw-bold project-name">{{ projectName }}</span>
    </div>

    <!-- 中间：搜索框 -->
    <div class="d-flex align-items-center flex-shrink-0">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control me-2"
        placeholder="" 
      />
    </div>

    <!-- 右侧：导航图标和语言切换按钮 -->
    <div class="d-flex align-items-center flex-shrink-0">
      <!-- 导航图标（自定义 SVG 图标） -->
      <a :href="navUrl" target="_blank" class="text-white text-decoration-none me-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="me-2"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>

      <!-- 语言切换按钮 -->
      <button @click="toggleLanguage" class="btn btn-primary p-1 language-button" >
        {{ currentLanguage === 'en' ? '中' : 'EN' }} 
      </button>
    </div>
  </header>
</template>

<script>
import { ref, computed } from 'vue';
import { useLanguageStore } from '@/store/language';
import { useRoute } from 'vue-router';

export default {
  name: 'MainHeader', 
  setup() {
    const languageStore = useLanguageStore();
    const projectName = 'All-Simulator';
    const searchQuery = ref('');
    const navUrl = 'https://github.com/qinisn/All-Simulator';
    const currentLanguage = computed(() => languageStore.locale);
    const route = useRoute();

    function toggleLanguage() {
      const newLocale = languageStore.locale === 'en' ? 'zh' : 'en';
      const currentRoute = route.name || 'Unnamed Route';
      console.log(`${currentRoute}`);
      
      languageStore.changeLocale(newLocale, currentRoute);
    }

    return {
      projectName,
      searchQuery,
      navUrl,
      currentLanguage,
      toggleLanguage
    };
  }
};
</script>

<style scoped>
.project-name {
  font-size: 24px; 
  font-weight: bold;
  color: #e1dfdf; 
  font-family: 'Pacifico', cursive; 
}
/* 

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #4d546b; 
  border-bottom: 1px solid #555; 
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
  position: relative;
}

.header-left,
.header-center,
.header-right {
  display: flex;
  align-items: center;
}



.search-input {
  padding: 8px 12px;
  border: 1px solid #555; 
  border-radius: 4px;
  width: 300px;
  font-size: 14px;
  background-color: #fff; 
  color: #333; 
}

.search-input::placeholder {
  color: #999; 
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-right: 20px;
  color: #333; 
}

.nav-icon svg {
  width: 24px;
  height: 24px;
}

.language-button {
  padding: 8px 12px;
  border: 1px solid #555; 
  border-radius: 4px;
  background-color: #fff; 
  color: #333; 
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.language-button:hover {
  background-color: #1abc9c; 
  color: #fff; 
}

@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
  }

  .header-center {
    order: 3;
    width: 100%;
    margin-top: 10px;
  }

  .search-input {
    max-width: 100%;
  }
}
保持原有的样式 */

.language-button {
  height: 40px;
  width: 40px;
  background-color: #fff; /* 白色背景 */
  color: #333; /* 深色文字 */
  border: 1px solid #ccc; /* 边框颜色 */
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 当文本超出时显示省略号 */
  transition: background-color 0.3s ease, border-color 0.3s ease; /* 平滑过渡 */
}



</style>