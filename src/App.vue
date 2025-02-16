<template>
  <div id="app" class="d-flex flex-column vh-100">
    <!-- Header -->
    <Header style="height: 7%;" />


    <!-- Main Content -->
    <div class="d-flex flex-grow-1" style="height: 93%;">
      <!-- NavBar (左侧) -->
      <NavBar class="bg-light p-3" style="width: 15%;" />

      <!-- Router View (右侧) -->
      <main class="flex-grow-1 p-3 " style="width: 85%; height: 100%; overflow: auto;">
        <router-view class="router-view"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    NavBar, Header
  }
};
</script>