<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { feedbackFormSchema } from "../utils/validation";

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
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface FormConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

const props = defineProps<{
  formConfig: FormConfig;
}>();

const formData = ref<Record<string, unknown>>({});
const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref("");

const initializeFormData = () => {
  const initialData: Record<string, unknown> = {};
  props.formConfig.fields.forEach((field) => {
    switch (field.type) {
      case "checkbox":
        initialData[field.name] = [];
        break;
      case "rating":
        initialData[field.name] = 0;
        break;
      case "text":
      case "email":
      case "textarea":
      case "select":
      case "radio":
      default:
        initialData[field.name] = "";
        break;
    }
  });
  return initialData;
};

formData.value = initializeFormData();

onMounted(() => {
  resetForm();
});

function updateField(name: string, value: unknown) {
  formData.value[name] = value;
  if (errors.value[name]) {
    errors.value[name] = "";
  }
}

function resetForm() {
  formData.value = initializeFormData();
  errors.value = {};
  submitSuccess.value = false;
  submitError.value = "";
}

function validateForm(): boolean {
  const newErrors: Record<string, string> = {};

  try {
    const dataToValidate = {
      ...formData.value,
      session1Rating: Number(formData.value.session1Rating) || 0,
      session2Rating: Number(formData.value.session2Rating) || 0,
    };

    feedbackFormSchema.parse(dataToValidate);
    errors.value = {};
    return true;
  } catch (error: any) {
    if (error.errors) {
      error.errors.forEach((err: any) => {
        const fieldName = err.path[0];
        newErrors[fieldName] = err.message;
      });
    }
    errors.value = newErrors;
    return false;
  }
}

async function handleSubmit() {
  if (!validateForm()) return;

  isSubmitting.value = true;
  submitError.value = "";

  try {
    const submissionData = {
      ...formData.value,
      session1Rating: Number(formData.value.session1Rating),
      session2Rating: Number(formData.value.session2Rating),
    };

    await $fetch("/api/forms/submit", {
      method: "POST",
      body: {
        formId: props.formConfig.id,
        formTitle: props.formConfig.title,
        fields: props.formConfig.fields,
        submittedData: submissionData,
      },
    });

    submitSuccess.value = true;
    setTimeout(() => {
      resetForm();
    }, 3000);
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as { data?: { message?: string } }).data?.message ===
        "string"
    ) {
      submitError.value =
        (error as { data?: { message?: string } }).data?.message ||
        "Failed to submit form";
    } else {
      submitError.value = "Failed to submit form";
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-6 py-8">
    <div
      class="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200"
    >
      <form class="space-y-8" @submit.prevent="handleSubmit">
        <div class="max-w-2xl mx-auto space-y-6">
          <FormField
            v-for="field in formConfig.fields"
            :key="field.name"
            :field="field"
            :model-value="formData[field.name]"
            :error="errors[field.name]"
            @update:model-value="updateField(field.name, $event)"
          />
        </div>

        <div class="flex justify-center gap-4 pt-6">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-neutral-950 border-none text-white px-8 py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {{ isSubmitting ? "Submitting..." : "Submit" }}
          </button>

          <button
            type="button"
            class="bg-gray-100 border-none text-neutral-950 px-8 py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-200 transition-colors"
            @click="resetForm"
          >
            Reset
          </button>
        </div>
      </form>

      <div class="max-w-2xl mx-auto">
        <div
          v-if="submitSuccess"
          class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p class="text-green-800 font-medium text-center">
            ✓ Feedback submitted successfully! Thank you for your input.
          </p>
        </div>

        <div
          v-if="submitError"
          class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p class="text-red-800 font-medium text-center">
            ✗ {{ submitError }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
