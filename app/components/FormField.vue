<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
interface FormField {
  name: string;
  type:
    | "text"
    | "email"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "rating";
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  max?: number;
}

const props = defineProps<{
  field: FormField;
  modelValue: any;
  error?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

function handleCheckboxChange(option: string, checked: boolean) {
  const currentValue = Array.isArray(props.modelValue)
    ? [...props.modelValue]
    : [];

  if (checked) {
    if (!currentValue.includes(option)) {
      currentValue.push(option);
    }
  } else {
    const index = currentValue.indexOf(option);
    if (index > -1) {
      currentValue.splice(index, 1);
    }
  }

  emit("update:modelValue", currentValue);
}

const isOptionSelected = computed(() => (option: string) => {
  if (props.field.type === "checkbox") {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option);
  }
  return false;
});

const handleRatingClick = (rating: number) => {
  emit("update:modelValue", rating);
};

const getRatingArray = () => {
  const max = props.field.max || 5;
  return Array.from({ length: max }, (_, i) => i + 1);
};
</script>

<template>
  <div class="space-y-3">
    <label :for="field.name" class="block text-sm font-medium text-neutral-950">
      {{ field.label }}
      <span v-if="field.required" class="text-red-500">*</span>
    </label>

    <input
      v-if="field.type === 'text' || field.type === 'email'"
      :id="field.name"
      :type="field.type"
      :value="modelValue || ''"
      :placeholder="field.placeholder"
      class="w-full sm:w-96 md:w-full max-w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-neutral-950 bg-white transition-all"
      :class="{
        'border-red-500 ring-red-200': error,
        'border-gray-300': !error,
      }"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
      "
    />

    <textarea
      v-else-if="field.type === 'textarea'"
      :id="field.name"
      :value="modelValue || ''"
      :placeholder="field.placeholder"
      rows="4"
      class="w-full sm:w-96 md:w-full max-w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-neutral-950 bg-white resize-vertical transition-all"
      :class="{
        'border-red-500 ring-red-200': error,
        'border-gray-300': !error,
      }"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLTextAreaElement)?.value
        )
      "
    />

    <select
      v-else-if="field.type === 'select'"
      :id="field.name"
      :value="modelValue || ''"
      class="w-full sm:w-96 md:w-full max-w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-neutral-950 bg-white cursor-pointer appearance-none transition-all"
      :class="{
        'border-red-500 ring-red-200': error,
        'border-gray-300': !error,
      }"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)
      "
    >
      <option value="">Select an option</option>
      <option v-for="option in field.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <div v-else-if="field.type === 'rating'" class="space-y-2">
      <div class="flex items-center gap-2">
        <button
          v-for="rating in getRatingArray()"
          :key="rating"
          type="button"
          :class="[
            'w-10 h-10 rounded-lg border-2 font-medium transition-all duration-200',
            rating <= (modelValue || 0)
              ? 'bg-green-500 border-green-500 text-white shadow-md'
              : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200',
            error ? 'ring-2 ring-red-200' : '',
          ]"
          @click="handleRatingClick(rating)"
        >
          {{ rating }}
        </button>
        <span class="ml-2 text-sm text-neutral-600">
          {{ modelValue ? `${modelValue}/5` : "Not rated" }}
        </span>
      </div>
    </div>

    <div v-else-if="field.type === 'checkbox'" class="space-y-3">
      <div
        v-for="option in field.options"
        :key="option"
        class="flex items-center"
      >
        <input
          :id="`${field.name}-${option}`"
          type="checkbox"
          :checked="isOptionSelected(option)"
          class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          @change="
            handleCheckboxChange(
              option,
              ($event.target as HTMLInputElement)?.checked
            )
          "
        />
        <label
          :for="`${field.name}-${option}`"
          class="ml-2 text-sm font-medium text-neutral-950"
        >
          {{ option }}
        </label>
      </div>
    </div>

    <div v-else-if="field.type === 'radio'" class="space-y-3">
      <div
        v-for="option in field.options"
        :key="option"
        class="flex items-center"
      >
        <input
          :id="`${field.name}-${option}`"
          :name="field.name"
          type="radio"
          :value="option"
          :checked="modelValue === option"
          class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
          @change="$emit('update:modelValue', option)"
        />
        <label
          :for="`${field.name}-${option}`"
          class="ml-2 text-sm font-medium text-neutral-950"
        >
          {{ option }}
        </label>
      </div>
    </div>

    <div v-if="error" class="flex items-start space-x-2">
      <svg
        class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>
  </div>
</template>
