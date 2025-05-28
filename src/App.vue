<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { SidebarProvider } from '@/components/ui/sidebar';

const showSidebar = false;
console.log(showSidebar,'')
const isUserLoggedIn = false;
</script>

<template>
  <router-view />
</template>

<!-- <template>
  <div v-if="!isUserLoggedIn" style="position:relative;">
    <main class="relative min-h-svh flex-col bg-background w-full h-screen flex items-center justify-center px-4">
      <RouterView />
    </main>
  </div>

  <SidebarProvider v-else>
    <AppSidebar />
    <RouterView />
  </SidebarProvider>

</template> -->



