<script lang="ts" setup>
import Default from '@/routes/layouts/DefaultLayout.vue'
import Empty from '@/routes/layouts/EmptyLayout.vue'
import { useRoute } from 'vue-router'

// 라우터 인터페이스 확장
declare module 'vue-router' {
  interface RouteMeta {
    layout?: keyof typeof layouts
  }
}

const layouts = {
  Default,
  Empty
} as const

const route = useRoute()
</script>

<template>
  <!-- 동적 레이아웃 출력 및 기본 레이아웃 지정 -->
  <Component :is="layouts[route.meta.layout || 'Default']">
    <RouterView />
  </Component>
</template>

<style scoped></style>
