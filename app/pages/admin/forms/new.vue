<script setup lang="ts">
import type { Form, FormField } from "~~/types/forms";

definePageMeta({
  layout: "admin",
});

const saving = ref(false);
const showFieldEditor = ref(false);
const selectedField = ref<FormField | null>(null);
const editingField = ref<FormField | null>(null);

const form = ref<Form>({
  id: "",
  title: "",
  description: "",
  fields: [],
  is_active: true,
  created_at: "",
  updated_at: "",
});

const fieldTypes = [
  {
    type: "text",
    label: "Text Input",
    description: "Single line text input",
    icon: "i-heroicons-document-text",
  },
  {
    type: "mcq",
    label: "Multiple Choice",
    description: "Multiple choice questions",
    icon: "i-heroicons-check-circle",
  },
  {
    type: "single_choice",
    label: "Single Choice",
    description: "Single choice questions",
    icon: "i-heroicons-circle",
  },
  {
    type: "file_upload",
    label: "File Upload",
    description: "File upload field",
    icon: "i-heroicons-paper-clip",
  },
];

const addField = (fieldType: any) => {
  const newField: FormField = {
    id: crypto.randomUUID(),
    type: fieldType.type,
    label: `New ${fieldType.label}`,
    required: false,
    placeholder: "",
    options:
      fieldType.type === "mcq" || fieldType.type === "single_choice"
        ? ["Option 1"]
        : undefined,
    order: form.value.fields.length,
  };

  form.value.fields.push(newField);
  selectField(newField);
};

const selectField = (field: FormField) => {
  selectedField.value = field;
};

const editField = (field: FormField) => {
  editingField.value = { ...field };
  showFieldEditor.value = true;
};

const saveFieldEdit = () => {
  if (editingField.value) {
    const index = form.value.fields.findIndex(
      (f) => f.id === editingField.value!.id
    );
    if (index !== -1) {
      form.value.fields[index] = { ...editingField.value };
    }
    showFieldEditor.value = false;
    editingField.value = null;
  }
};

const removeField = (index: number) => {
  form.value.fields.splice(index, 1);
  // Update order
  form.value.fields.forEach((field, idx) => {
    field.order = idx;
  });
};

const addOption = () => {
  if (editingField.value && editingField.value.options) {
    editingField.value.options.push(
      `Option ${editingField.value.options.length + 1}`
    );
  }
};

const removeOption = (index: number) => {
  if (editingField.value && editingField.value.options) {
    editingField.value.options.splice(index, 1);
  }
};

const getFieldIcon = (type: string) => {
  const fieldType = fieldTypes.find((ft) => ft.type === type);
  return fieldType?.icon || "i-heroicons-question-mark-circle";
};

const getFieldPreview = (field: FormField) => {
  switch (field.type) {
    case "text":
      return resolveComponent("TextFieldPreview");
    case "mcq":
      return resolveComponent("MCQFieldPreview");
    case "single_choice":
      return resolveComponent("SingleChoiceFieldPreview");
    case "file_upload":
      return resolveComponent("FileUploadFieldPreview");
    default:
      return resolveComponent("TextFieldPreview");
  }
};

const previewForm = () => {
  // TODO: Implement form preview
  console.log("Preview form:", form.value);
};

const saveForm = async () => {
  saving.value = true;
  try {
    // TODO: Implement form saving to Supabase
    console.log("Saving form:", form.value);
    await navigateTo("/admin/forms");
  } catch (error) {
    console.error("Error saving form:", error);
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <div>
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Create New Form</h1>
          <p class="mt-2 text-gray-600">
            Build your form with our drag-and-drop builder
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <UButton
            color="gray"
            variant="outline"
            icon="i-heroicons-eye"
            @click="previewForm"
          >
            Preview
          </UButton>
          <UButton
            color="foss"
            variant="solid"
            icon="i-heroicons-check"
            :loading="saving"
            @click="saveForm"
          >
            Save Form
          </UButton>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form Settings -->
      <div class="lg:col-span-1">
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900">Form Settings</h3>
          </template>

          <div class="space-y-4">
            <UFormGroup label="Form Title" required>
              <UInput
                v-model="form.title"
                placeholder="Enter form title"
                size="lg"
              />
            </UFormGroup>

            <UFormGroup label="Description">
              <UTextarea
                v-model="form.description"
                placeholder="Enter form description"
                rows="3"
              />
            </UFormGroup>

            <UFormGroup label="Form Status">
              <UToggle v-model="form.is_active" />
              <template #help> Active forms can be accessed by users </template>
            </UFormGroup>
          </div>
        </UCard>

        <!-- Field Types -->
        <UCard class="mt-6">
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900">Add Fields</h3>
          </template>

          <div class="space-y-3">
            <div
              v-for="fieldType in fieldTypes"
              :key="fieldType.type"
              class="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-foss-300 hover:bg-foss-50 transition-colors"
              @click="addField(fieldType)"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-foss-100 rounded-lg flex items-center justify-center"
                >
                  <UIcon :name="fieldType.icon" class="w-4 h-4 text-foss-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ fieldType.label }}</p>
                  <p class="text-sm text-gray-500">
                    {{ fieldType.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Form Builder -->
      <div class="lg:col-span-2">
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900">Form Builder</h3>
          </template>

          <div class="min-h-[600px]">
            <div
              v-if="form.fields.length === 0"
              class="flex flex-col items-center justify-center h-96 text-center"
            >
              <UIcon
                name="i-heroicons-document-text"
                class="w-16 h-16 text-gray-300 mb-4"
              />
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                No fields added yet
              </h3>
              <p class="text-gray-500 mb-4">
                Drag field types from the sidebar or click to add them
              </p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="(field, index) in form.fields"
                :key="field.id"
                class="relative p-4 border border-gray-200 rounded-lg hover:border-foss-300 transition-colors"
                :class="{
                  'border-foss-300 bg-foss-50': selectedField?.id === field.id,
                }"
                @click="selectField(field)"
              >
                <!-- Field Header -->
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-2">
                    <UIcon
                      :name="getFieldIcon(field.type)"
                      class="w-4 h-4 text-foss-600"
                    />
                    <span class="font-medium text-gray-900">{{
                      field.label
                    }}</span>
                    <UBadge v-if="field.required" color="flame" size="sm"
                      >Required</UBadge
                    >
                  </div>
                  <div class="flex items-center space-x-2">
                    <UButton
                      variant="ghost"
                      size="sm"
                      icon="i-heroicons-pencil-square"
                      @click.stop="editField(field)"
                    />
                    <UButton
                      variant="ghost"
                      size="sm"
                      icon="i-heroicons-trash"
                      color="flame"
                      @click.stop="removeField(index)"
                    />
                  </div>
                </div>

                <!-- Field Preview -->
                <div class="bg-gray-50 p-3 rounded">
                  <component :is="getFieldPreview(field)" :field="field" />
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Field Editor Modal -->
    <UModal v-model="showFieldEditor" :ui="{ width: 'sm:max-w-lg' }">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Edit Field</h3>
        </template>

        <div v-if="editingField" class="space-y-4">
          <UFormGroup label="Field Label" required>
            <UInput
              v-model="editingField.label"
              placeholder="Enter field label"
            />
          </UFormGroup>

          <UFormGroup label="Placeholder">
            <UInput
              v-model="editingField.placeholder"
              placeholder="Enter placeholder text"
            />
          </UFormGroup>

          <UFormGroup label="Required">
            <UToggle v-model="editingField.required" />
          </UFormGroup>

          <div
            v-if="
              editingField.type === 'mcq' ||
              editingField.type === 'single_choice'
            "
          >
            <UFormGroup label="Options">
              <div class="space-y-2">
                <div
                  v-for="(option, index) in editingField.options"
                  :key="index"
                  class="flex items-center space-x-2"
                >
                  <UInput
                    v-model="editingField.options[index]"
                    placeholder="Enter option"
                    size="sm"
                  />
                  <UButton
                    variant="ghost"
                    size="sm"
                    icon="i-heroicons-trash"
                    color="flame"
                    @click="removeOption(index)"
                  />
                </div>
                <UButton
                  variant="outline"
                  size="sm"
                  icon="i-heroicons-plus"
                  @click="addOption"
                >
                  Add Option
                </UButton>
              </div>
            </UFormGroup>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton variant="ghost" @click="showFieldEditor = false">
              Cancel
            </UButton>
            <UButton color="foss" @click="saveFieldEdit">
              Save Changes
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
