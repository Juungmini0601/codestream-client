<script lang="ts" setup>
import { Heart, Search, UserRound } from 'lucide-vue-next'
import Button from '@/components/Button.vue'
import { ref } from 'vue'

const isLoggin = ref(false)
</script>

<template>
  <header class="header">
    <nav class="nav">
      <RouterLink
        class="link"
        to="/">
        <div class="logo">CodeStream</div>
      </RouterLink>

      <div class="right--box">
        <div>
          <Search class="icon" />
        </div>
        <div>
          <Heart class="icon" />
        </div>
        <div>
          <div v-if="isLoggin === false">
            <RouterLink to="/signin">
              <Button
                size="small"
                variant="outline"
                >로그인
              </Button>
            </RouterLink>
            <RouterLink to="/signup">
              <Button size="small">회원가입</Button>
            </RouterLink>
          </div>
          <div v-else>
            <UserRound class="icon" />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/styles/variables.scss' as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
  border-bottom: 1px solid $color-gray-light;
  background-color: $color-white;
  height: 80px;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.right--box {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 16px;

  button {
    margin-right: 16px;
  }
}

.link {
  text-decoration: none;
}

.logo {
  font-weight: bold;
  font-size: 24px;
  color: $color-primary;

  &:hover {
    color: color.adjust($color-primary, $lightness: 5%);
  }
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    color: $color-primary;
  }
}
</style>
