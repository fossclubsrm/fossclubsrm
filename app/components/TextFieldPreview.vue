<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ field.label }}
      <span v-if="field.required" class="text-flame-500">*</span>
    </label>
    <UInput
      :placeholder="field.placeholder || 'Enter your answer'"
      disabled
      class="bg-gray-100"
    />
  </div>
</template>

<script setup>
import type { FormField } from '~/types/forms'

defineProps<{
  field: FormField
}>()
</script>
