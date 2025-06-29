<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

interface Props {
  type: 'text' | 'password'
  label: string
  model: string
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  validator?: (value: string) => boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void

  (e: 'validation', isValid: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  model: '',
  modelValue: '',
  placeholder: '',
  disabled: false,
  required: false,
  errorMessage: '올바른 값을 입력 해주세요.',
  validator: undefined
})

const emit = defineEmits<Emits>()

const error = ref(false)
const currentValue = ref(props.modelValue)

const isValid = computed(() => {
  if (!currentValue.value && props.required) {
    return false
  }
  if (props.validator && currentValue.value) {
    return props.validator(currentValue.value)
  }
  return true
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  currentValue.value = target.value
  emit('update:modelValue', target.value)
}

watch([currentValue, isValid], () => {
  error.value = !isValid.value && currentValue.value !== ''
  emit('validation', isValid.value)
})

watch(
  () => props.modelValue,
  newValue => {
    currentValue.value = newValue || ''
  }
)
</script>

<template>
  <div class="input">
    <label
      v-if="label"
      :for="model"
      class="label">
      {{ label }}
    </label>
    <input
      :id="model"
      :class="['input__field', { 'input__field--error': error }]"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :value="currentValue"
      @input="handleInput" />
    <div
      v-if="error"
      class="input__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.input {
  .label {
    display: block;
    margin: 4px;
    font-size: 16px;
    font-weight: 600;
  }

  &__field {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid $color-gray-border;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
    background-color: $color-white;

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: 0 0 0 2px rgba(0, 196, 133, 0.2);
    }

    &:disabled {
      background-color: #f5f5f5;
      color: $color-gray-text;
      cursor: not-allowed;
    }

    &::placeholder {
      color: $color-gray-text;
    }

    &--error {
      border-color: #ff4444;

      &:focus {
        border-color: #ff4444;
        box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2);
      }
    }
  }

  &__error {
    margin-top: 4px;
    font-size: 14px;
    color: #ff4444;
  }
}
</style>
