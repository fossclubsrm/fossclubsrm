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
const hasValidationErrors = ref(false);

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
    const { [name]: _, ...newErrors } = errors.value;
    errors.value = newErrors;

    hasValidationErrors.value = Object.keys(newErrors).length > 0;
  }

  validateField(name, value);
}

function validateField(fieldName: string, value: unknown) {
  try {
    const fieldData = { [fieldName]: value };

    if (fieldName === "docker" || fieldName === "linux") {
      fieldData[fieldName] = Number(value) || 0;
    }

    const result = feedbackFormSchema
      .pick({ [fieldName]: true } as any)
      .safeParse(fieldData);

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (err) => err.path[0] === fieldName
      );
      if (fieldError) {
        errors.value[fieldName] = fieldError.message;
      }
    } else {
      if (errors.value[fieldName]) {
        const { [fieldName]: _, ...newErrors } = errors.value;
        errors.value = newErrors;
      }
    }
  } catch {
    // weee
  }
}

function resetForm() {
  formData.value = initializeFormData();
  errors.value = {};
  submitSuccess.value = false;
  submitError.value = "";
  hasValidationErrors.value = false;
}

function validateForm(): boolean {
  const newErrors: Record<string, string> = {};

  try {
    const dataToValidate = {
      ...formData.value,
      docker: Number(formData.value.docker) || 0,
      linux: Number(formData.value.linux) || 0,
    };

    feedbackFormSchema.parse(dataToValidate);
    errors.value = {};
    hasValidationErrors.value = false;
    return true;
  } catch (error: any) {
    if (error.issues) {
      error.issues.forEach((err: any) => {
        const fieldName = err.path[0];
        newErrors[fieldName] = err.message;
      });
    }

    errors.value = newErrors;
    hasValidationErrors.value = Object.keys(newErrors).length > 0;
    return false;
  }
}

async function handleSubmit() {
  submitError.value = "";

  if (!validateForm()) {
    const firstErrorField = Object.keys(errors.value)[0];
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  isSubmitting.value = true;

  try {
    const submissionData = {
      ...formData.value,
      docker: Number(formData.value.docker),
      linux: Number(formData.value.linux),
    };

    const response = await fetch("/api/forms/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: props.formConfig.fields,
        submittedData: submissionData,
      }),
    });

    if (!response.ok) {
      let errorMessage = "Failed to submit form";

      try {
        const errorData = await response.json();
        errorMessage =
          errorData.message || errorData.data?.error || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "Form submission failed");
    }
    submitSuccess.value = true;

    setTimeout(() => {
      resetForm();
    }, 3000);
  } catch (error: unknown) {
    if (error instanceof Error) {
      submitError.value = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: string }).message === "string"
    ) {
      submitError.value = (error as { message: string }).message;
    } else {
      submitError.value = "An unexpected error occurred. Please try again.";
    }
  } finally {
    isSubmitting.value = false;
  }
}

const getFieldLabel = (fieldName: string) => {
  const field = props.formConfig.fields.find((f) => f.name === fieldName);
  return field?.label || fieldName;
};
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-6 py-8">
    <div
      class="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200"
    >
      <div
        v-if="hasValidationErrors && Object.keys(errors).length > 0"
        class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
      >
        <h3 class="text-red-800 font-medium mb-2">
          Please fix the following errors:
        </h3>
        <ul class="text-red-700 text-sm space-y-1">
          <li
            v-for="(error, fieldName) in errors"
            :key="fieldName"
            class="flex items-start"
          >
            <span class="text-red-500 mr-2">•</span>
            <span
              ><strong>{{ getFieldLabel(fieldName) }}:</strong>
              {{ error }}</span
            >
          </li>
        </ul>
      </div>

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
            class="bg-neutral-950 border-none text-white px-8 py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-neutral-800"
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
          <p class="text-red-600 text-sm text-center mt-2">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
