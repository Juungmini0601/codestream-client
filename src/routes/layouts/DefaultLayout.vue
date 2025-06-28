<script lang="ts" setup>
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <div class="content">
    <slot />
  </div>
</template>

<style scoped>
.content {
  margin-top: 100px;
}
</style>
