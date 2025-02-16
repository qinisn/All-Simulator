// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue'; 
import Help from '../views/Help.vue'; 
import GamblersAndDrunkards from '../views/GamblersAndDrunkards.vue'; 
import SpeedIsKey from '../views/SpeedIsKey.vue'; 





const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/help', component: Help, name: 'Help' },
  { path: '/GamblersAndDrunkards', component: GamblersAndDrunkards, name: 'GamblersAndDrunkards' },
  { path: '/SpeedIsKey', component: SpeedIsKey, name: 'SpeedIsKey' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;