<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ field.label }}
      <span v-if="field.required" class="text-flame-500">*</span>
    </label>
    <div
      class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
    >
      <UIcon
        name="i-heroicons-paper-clip"
        class="w-8 h-8 text-gray-400 mx-auto mb-2"
      />
      <p class="text-sm text-gray-500">Click to upload or drag and drop</p>
      <p class="text-xs text-gray-400 mt-1">File upload preview</p>
    </div>
  </div>
</template>

<script setup>
import type { FormField } from '~/types/forms'

defineProps<{
  field: FormField
}>()
</script>
