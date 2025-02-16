<template>
<div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px; min-height: 90vh; overflow-y: auto;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span class="fs-4"></span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <router-link to="/" class="nav-link link-dark">{{$t('common.navbar.Home') }}</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/help" class="nav-link link-dark">{{$t('common.navbar.Help') }}</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/GamblersAndDrunkards" class="nav-link link-dark">{{$t('common.navbar.GamblersAndDrunkards') }}</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/SpeedIsKey" class="nav-link link-dark">{{$t('common.navbar.SpeedIsKey') }}</router-link>
        </li>

    </ul>
    </div>
</template>

<script>

export default {
  name: 'NavBar',
  
};
</script>

<style scoped>

</style>