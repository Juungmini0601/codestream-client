<script lang="ts" setup>
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <div class="content">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 80px;
  height: calc(100vh - 80px);
}
</style>
