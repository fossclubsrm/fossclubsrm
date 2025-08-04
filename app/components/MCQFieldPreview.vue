<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ field.label }}
      <span v-if="field.required" class="text-flame-500">*</span>
    </label>
    <div class="space-y-2">
      <div
        v-for="(option, index) in field.options"
        :key="index"
        class="flex items-center space-x-2"
      >
        <UCheckbox disabled />
        <span class="text-sm text-gray-600">{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import type { FormField } from '~/types/forms'

defineProps<{
  field: FormField
}>()
</script>
