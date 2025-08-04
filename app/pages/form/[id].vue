<template>
  <div class="min-h-screen bg-gradient-to-br from-foss-50 to-pixel-50">
    <div class="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Form Header -->
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-foss-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ form.title }}</h1>
        <p v-if="form.description" class="text-lg text-gray-600">
          {{ form.description }}
        </p>
      </div>

      <!-- Form Content -->
      <UCard class="shadow-xl">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div v-for="field in form.fields" :key="field.id" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              {{ field.label }}
              <span v-if="field.required" class="text-flame-500">*</span>
            </label>

            <!-- Text Input -->
            <UInput
              v-if="field.type === 'text'"
              v-model="formData[field.id]"
              :placeholder="field.placeholder || 'Enter your answer'"
              :required="field.required"
              size="lg"
            />

            <!-- Multiple Choice -->
            <div v-else-if="field.type === 'mcq'" class="space-y-3">
              <div
                v-for="(option, index) in field.options"
                :key="index"
                class="flex items-center space-x-3"
              >
                <UCheckbox
                  v-model="formData[field.id]"
                  :value="option"
                  :name="field.id"
                />
                <label class="text-sm text-gray-700">{{ option }}</label>
              </div>
            </div>

            <!-- Single Choice -->
            <div v-else-if="field.type === 'single_choice'" class="space-y-3">
              <div
                v-for="(option, index) in field.options"
                :key="index"
                class="flex items-center space-x-3"
              >
                <URadio
                  v-model="formData[field.id]"
                  :value="option"
                  :name="field.id"
                />
                <label class="text-sm text-gray-700">{{ option }}</label>
              </div>
            </div>

            <!-- File Upload -->
            <div v-else-if="field.type === 'file_upload'" class="space-y-3">
              <div
                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-foss-300 transition-colors cursor-pointer"
                @click="$refs[`file-${field.id}`]?.click()"
              >
                <UIcon
                  name="i-heroicons-paper-clip"
                  class="w-8 h-8 text-gray-400 mx-auto mb-2"
                />
                <p class="text-sm text-gray-500">
                  {{
                    formData[field.id]
                      ? "File selected"
                      : "Click to upload or drag and drop"
                  }}
                </p>
                <p v-if="formData[field.id]" class="text-xs text-foss-600 mt-1">
                  {{ formData[field.id].name }}
                </p>
              </div>
              <input
                :ref="`file-${field.id}`"
                type="file"
                class="hidden"
                @change="handleFileUpload($event, field.id)"
                :required="field.required"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-6 border-t border-gray-200">
            <UButton
              type="submit"
              color="foss"
              variant="solid"
              size="lg"
              class="w-full"
              :loading="submitting"
              :disabled="submitting"
            >
              {{ submitting ? "Submitting..." : "Submit Form" }}
            </UButton>
          </div>
        </form>
      </UCard>

      <!-- Success Message -->
      <UModal v-model="showSuccess" :ui="{ width: 'sm:max-w-md' }">
        <UCard>
          <div class="text-center">
            <div
              class="w-12 h-12 bg-foss-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UIcon name="i-heroicons-check" class="w-6 h-6 text-foss-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Form Submitted!
            </h3>
            <p class="text-gray-600">
              Thank you for your response. Your submission has been recorded.
            </p>
          </div>
        </UCard>
      </UModal>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const formId = route.params.id

const form = ref({
  id: '',
  title: '',
  description: '',
  fields: [],
  is_active: true,
  created_at: '',
  updated_at: ''
})

const formData = ref({})
const submitting = ref(false)
const showSuccess = ref(false)

// Mock form data for now
onMounted(() => {
  form.value = {
    id: formId,
    title: 'Event Registration Form',
    description: 'Please fill out this form to register for our upcoming event.',
    fields: [
      {
        id: '1',
        type: 'text',
        label: 'Full Name',
        required: true,
        placeholder: 'Enter your full name',
        order: 0
      },
      {
        id: '2',
        type: 'text',
        label: 'Email Address',
        required: true,
        placeholder: 'Enter your email address',
        order: 1
      },
      {
        id: '3',
        type: 'single_choice',
        label: 'Preferred Session',
        required: true,
        options: ['Morning Session (9 AM - 12 PM)', 'Afternoon Session (1 PM - 4 PM)', 'Evening Session (6 PM - 9 PM)'],
        order: 2
      },
      {
        id: '4',
        type: 'mcq',
        label: 'Interests',
        required: false,
        options: ['Technology', 'Design', 'Business', 'Marketing', 'Development'],
        order: 3
      },
      {
        id: '5',
        type: 'file_upload',
        label: 'Resume/CV',
        required: false,
        order: 4
      }
    ],
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
})

const handleFileUpload = (event: Event, fieldId: string) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    formData.value[fieldId] = target.files[0]
  }
}

const submitForm = async () => {
  submitting.value = true

  try {
    // TODO: Implement form submission to Supabase
    console.log('Submitting form data:', formData.value)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    showSuccess.value = true

    // Reset form data
    formData.value = {}

  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    submitting.value = false
  }
}
</script>
