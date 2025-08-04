<template>
  <div>
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Forms</h1>
          <p class="mt-2 text-gray-600">
            Manage your forms and view their performance
          </p>
        </div>
        <UButton
          to="/admin/forms/new"
          color="foss"
          variant="solid"
          icon="i-heroicons-plus"
        >
          Create Form
        </UButton>
      </div>
    </div>

    <!-- Forms Table -->
    <UCard>
      <UTable
        :rows="forms"
        :columns="columns"
        :loading="loading"
        :empty-state="{
          icon: 'i-heroicons-document-text',
          label: 'No forms found',
        }"
      >
        <template #title-data="{ row }">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-foss-100 rounded-lg flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-document-text"
                class="w-4 h-4 text-foss-600"
              />
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ row.title }}</p>
              <p v-if="row.description" class="text-sm text-gray-500">
                {{ row.description }}
              </p>
            </div>
          </div>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :color="row.is_active ? 'foss' : 'gray'"
            :variant="row.is_active ? 'solid' : 'subtle'"
          >
            {{ row.is_active ? "Active" : "Inactive" }}
          </UBadge>
        </template>

        <template #responses-data="{ row }">
          <span class="font-medium text-gray-900">{{
            row.response_count
          }}</span>
        </template>

        <template #views-data="{ row }">
          <span class="text-gray-600">{{ row.metrics.view_count }}</span>
        </template>

        <template #submissions-data="{ row }">
          <span class="text-gray-600">{{ row.metrics.submission_count }}</span>
        </template>

        <template #created-data="{ row }">
          <span class="text-gray-600">{{ formatDate(row.created_at) }}</span>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="getActionItems(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-vertical"
              size="sm"
            />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const loading = ref(false);
const forms = ref([]);

// Mock data for now
onMounted(() => {
  forms.value = [
    {
      id: "1",
      title: "Event Registration",
      description: "Registration form for upcoming events",
      fields: [],
      is_active: true,
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
      metrics: {
        id: "1",
        form_id: "1",
        view_count: 150,
        click_count: 89,
        submission_count: 45,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
      response_count: 45,
    },
    {
      id: "2",
      title: "Feedback Survey",
      description: "General feedback collection",
      fields: [],
      is_active: true,
      created_at: "2024-01-14T10:00:00Z",
      updated_at: "2024-01-14T10:00:00Z",
      metrics: {
        id: "2",
        form_id: "2",
        view_count: 89,
        click_count: 67,
        submission_count: 23,
        created_at: "2024-01-14T10:00:00Z",
        updated_at: "2024-01-14T10:00:00Z",
      },
      response_count: 23,
    },
  ];
});

const columns = [
  {
    key: "title",
    label: "Form",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
  {
    key: "responses",
    label: "Responses",
    sortable: true,
  },
  {
    key: "views",
    label: "Views",
    sortable: true,
  },
  {
    key: "submissions",
    label: "Submissions",
    sortable: true,
  },
  {
    key: "created",
    label: "Created",
    sortable: true,
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const getActionItems = (form) => [
  [
    {
      label: "View Form",
      icon: "i-heroicons-eye",
      to: `/form/${form.id}`,
      target: "_blank",
    },
    {
      label: "Edit Form",
      icon: "i-heroicons-pencil-square",
      to: `/admin/forms/${form.id}/edit`,
    },
    {
      label: "View Responses",
      icon: "i-heroicons-chart-bar",
      to: `/admin/forms/${form.id}/responses`,
    },
  ],
  [
    {
      label: form.is_active ? "Deactivate" : "Activate",
      icon: form.is_active ? "i-heroicons-pause" : "i-heroicons-play",
      click: () => toggleFormStatus(form),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate",
      click: () => duplicateForm(form),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash",
      click: () => deleteForm(form),
    },
  ],
];

const toggleFormStatus = (form) => {
  // TODO: Implement form status toggle
  console.log("Toggle form status:", form.id);
};

const duplicateForm = (form) => {
  // TODO: Implement form duplication
  console.log("Duplicate form:", form.id);
};

const deleteForm = (form) => {
  // TODO: Implement form deletion
  console.log("Delete form:", form.id);
};
</script>
