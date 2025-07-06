<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { apiClient } from '@/api'

const router = useRouter()
const email = ref('')
const password = ref('')
const nickname = ref('')
const verificationCode = ref('')

const emailValid = ref(false)
const sendVeificationCode = ref(false)
const verificationCodeConfirm = ref(false)

const handleValidation = (isValid: boolean) => {
  emailValid.value = isValid
}

const sendVerificationButtonHandler = async () => {
  const response = await apiClient.post<void>('/api/v1/auth/verification-code', {
    email: email.value
  })

  if (response.result === 'SUCCESS') {
    alert('인증번호 발송이 완료 되었습니다!')
    sendVeificationCode.value = true
  }
}

const checkVerificationCodeButtonHandler = async () => {
  const response = await apiClient.post<void>('/api/v1/auth/verification-code/check', {
    email: email.value,
    code: verificationCode.value
  })

  if (response.result === 'SUCCESS') {
    alert('인증 번호 확인이 완료 되었습니다!')
    verificationCodeConfirm.value = true
    return
  }

  alert('인증 번호 확인이 실패 했습니다! 다시 확인 해주세요!')
  verificationCodeConfirm.value = false
}

const handleSubmit = async () => {
  const response = await apiClient.post<void>('/api/v1/users', {
    email: email.value,
    password: password.value,
    nickname: nickname.value
  })

  if (response.result === 'SUCCESS') {
    alert('회원 가입이 완료 되었습니다!')
    router.push('/signin')
    return
  }

  alert('회원 가입 요청 중 문제가 발생 했습니다!')
}
</script>

<template>
  <div class="container">
    <div class="signup--container">
      <h1>회원 가입</h1>
      <form
        class="signup-form"
        @submit.prevent="handleSubmit">
        <Input
          v-model="email"
          :disabled="sendVeificationCode"
          :validator="value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)"
          error-message="올바른 이메일 형식이 아닙니다"
          label="이메일"
          model="email"
          placeholder="이메일을 입력하세요"
          type="text"
          @validation="handleValidation" />

        <Button
          v-if="!sendVeificationCode"
          :disabled="!emailValid || sendVeificationCode"
          type="button"
          @click="sendVerificationButtonHandler"
          >인증 번호 발송
        </Button>

        <Input
          v-if="sendVeificationCode && !verificationCodeConfirm"
          v-model="verificationCode"
          :validator="value => value.length === 6"
          error-message="인증번호는 6자리 숫자여야 합니다."
          label="인증번호"
          model="verificationCode"
          placeholder="인증번호를 입력하세요"
          type="text" />

        <Button
          v-if="sendVeificationCode && !verificationCodeConfirm"
          type="button"
          @click="checkVerificationCodeButtonHandler">
          인증 번호 확인
        </Button>

        <Input
          v-if="verificationCodeConfirm"
          v-model="password"
          :validator="value => value.length > 7 && value.length < 20"
          error-message="비밀번호는 8자리 이상 19자리 미만이어야 합니다."
          label="비밀번호"
          model="password"
          placeholder="비밀번호를 입력하세요."
          type="password" />

        <Input
          v-if="verificationCodeConfirm"
          v-model="nickname"
          :validator="value => value.length > 0 && value.length < 20"
          error-message="닉네임은 1~20자리만 가능합니다"
          label="닉네임"
          model="nickname"
          placeholder="닉네임을 입력하세요"
          type="text" />

        <Button
          v-if="verificationCodeConfirm"
          type="submit"
          >회원 가입
        </Button>

        <div class="signin--nav">
          <span>이미 계정이 있으신가요?</span>
          <RouterLink to="/signin">
            <span class="text">로그인</span>
          </RouterLink>
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

.signup--container {
  min-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid $color-gray-border;
  border-radius: 8px;
  background-color: $color-white;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.signin--nav {
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
</style>
