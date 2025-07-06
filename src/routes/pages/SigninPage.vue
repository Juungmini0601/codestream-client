<script lang="ts" setup>
import Input from '@/components/Input.vue'
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import { apiClient } from '@/api'
import { useRouter } from 'vue-router'
import GoogleLoginIcon from '@/components/GoogleLoginIcon.vue'
import KakaoLoginIcon from '@/components/KakaoLoginIcon.vue'

const SERVER_URL = `http://${import.meta.env.VITE_SERVER_BASE_URL}`

const router = useRouter()
const email = ref()
const password = ref()

const emailValidation = ref(false)
const passwordValidation = ref(false)

const handleSubmit = async () => {
  const response = await apiClient.post<void>('/auth/signin', {
    email: email.value,
    password: password.value
  })

  if (response.result === 'SUCCESS') {
    alert('로그인이 완료 되었습니다.')
    router.push('/')
    return
  }

  alert('이메일과 비밀번호를 다시 확인 해주세요!')
  email.value = ''
  password.value = ''
}
</script>

<template>
  <div class="container">
    <div class="signin--container">
      <h1>로그인</h1>
      <form
        class="signin--form"
        @submit.prevent="handleSubmit">
        <Input
          v-model="email"
          :validator="value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)"
          error-message="올바른 이메일 형식이 아닙니다"
          label="이메일"
          model="email"
          placeholder="이메일을 입력하세요"
          type="text"
          @validation="isValid => (emailValidation = isValid)" />

        <Input
          v-model="password"
          :validator="value => value.length > 7 && value.length < 20"
          error-message="비밀번호는 8자리 이상 19자리 미만이어야 합니다."
          label="비밀번호"
          model="password"
          placeholder="비밀번호를 입력하세요."
          type="password"
          @validation="isValid => (passwordValidation = isValid)" />

        <Button
          :disabled="passwordValidation === false || emailValidation === false"
          type="submit"
          >로그인
        </Button>

        <div class="signup--nav">
          <span>계정이 없으신가요?</span>
          <RouterLink to="/signup">
            <span class="text">회원가입</span>
          </RouterLink>
        </div>

        <div class="divider"></div>

        <div class="social-login-btn-wrapper">
          <a
            :href="`${SERVER_URL}/api/v1/auth/google/login`"
            class="social-login-btn">
            <GoogleLoginIcon />
          </a>

          <a
            :href="`${SERVER_URL}/api/v1/auth/kakao/login`"
            class="social-login-btn kakao-btn">
            <KakaoLoginIcon />
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.signin--container {
  min-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid $color-gray-border;
  border-radius: 8px;
  background-color: $color-white;
}

.signin--form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.signup--nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .text {
    color: $color-primary;
    font-weight: bold;
    text-decoration: underline;
  }
}

.divider {
  height: 1px;
  border-bottom: 1px solid lightgray;
}

.social-login-btn-wrapper {
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
}

.social-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  border: 2px solid #e2e8f0;
  background-color: white;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &.kakao-btn {
    background-color: #fee500;
    border-color: #fee500;

    &:hover {
      background-color: #ffeb3b;
      border-color: #ffeb3b;
    }
  }
}
</style>
