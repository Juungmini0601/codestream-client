<script lang="ts" setup>
import { useUserStore } from '@/stores/users.ts'

const user = useUserStore().user
console.log(user)
</script>

<template>
  <h1>Home Page</h1>
</template>

<style scoped></style>
