<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-gray-600">Welcome to your FOSS Forms dashboard</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <UCard>
        <div class="flex items-center">
          <div class="p-3 bg-foss-100 rounded-lg">
            <UIcon
              name="i-heroicons-document-text"
              class="w-6 h-6 text-foss-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Forms</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.totalForms }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 bg-pixel-100 rounded-lg">
            <UIcon name="i-heroicons-eye" class="w-6 h-6 text-pixel-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Views</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.totalViews }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 bg-byte-100 rounded-lg">
            <UIcon
              name="i-heroicons-cursor-arrow-rays"
              class="w-6 h-6 text-byte-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Clicks</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.totalClicks }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center">
          <div class="p-3 bg-flame-100 rounded-lg">
            <UIcon
              name="i-heroicons-chart-bar"
              class="w-6 h-6 text-flame-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Submissions</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.totalSubmissions }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Recent Forms -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Recent Forms</h3>
            <UButton to="/admin/forms" variant="ghost" size="sm">
              View All
            </UButton>
          </div>
        </template>

        <div class="space-y-4">
          <div
            v-for="form in recentForms"
            :key="form.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ form.title }}</h4>
              <p class="text-sm text-gray-500">
                {{ form.response_count }} responses
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <UButton
                :to="`/admin/forms/${form.id}`"
                variant="ghost"
                size="sm"
                icon="i-heroicons-eye"
              />
              <UButton
                :to="`/admin/forms/${form.id}/edit`"
                variant="ghost"
                size="sm"
                icon="i-heroicons-pencil-square"
              />
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
        </template>

        <div class="space-y-4">
          <UButton
            to="/admin/forms/new"
            color="foss"
            variant="solid"
            icon="i-heroicons-plus"
            class="w-full justify-start"
          >
            Create New Form
          </UButton>

          <UButton
            to="/admin/responses"
            color="pixel"
            variant="outline"
            icon="i-heroicons-chart-bar"
            class="w-full justify-start"
          >
            View Responses
          </UButton>

          <UButton
            to="/admin/analytics"
            color="byte"
            variant="outline"
            icon="i-heroicons-presentation-chart-line"
            class="w-full justify-start"
          >
            View Analytics
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

// Mock data for now - will be replaced with real data from Supabase
const stats = ref({
  totalForms: 12,
  totalViews: 1542,
  totalClicks: 892,
  totalSubmissions: 234,
});

const recentForms = ref([
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
]);
</script>
