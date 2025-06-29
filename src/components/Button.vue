<script lang="ts" setup>
interface Props {
  variant?: 'primary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})
</script>

<template>
  <button
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--disabled': disabled }]"
    :disabled="disabled">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/styles/variables.scss' as *;

.btn {
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }

  // Variants
  &--primary {
    background-color: $color-primary;
    color: $color-white;

    &:hover:not(:disabled) {
      background-color: color.adjust($color-primary, $lightness: -10%);
    }
  }

  &--outline {
    background-color: transparent;
    color: $color-primary;
    border: 2px solid $color-primary;

    &:hover:not(:disabled) {
      background-color: $color-primary;
      color: $color-white;
    }
  }

  // Sizes
  &--small {
    padding: 8px 16px;
    font-size: 14px;
  }

  &--medium {
    padding: 12px 24px;
    font-size: 16px;
  }

  &--large {
    padding: 16px 32px;
    font-size: 18px;
  }

  // Disabled
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
