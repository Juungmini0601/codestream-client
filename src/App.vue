<script lang="ts" setup>
import { RouterView } from 'vue-router'
import LayoutProvider from '@/routes/layouts/LayoutProvider.vue'
</script>

<template>
  <LayoutProvider>
    <RouterView />
  </LayoutProvider>
</template>
