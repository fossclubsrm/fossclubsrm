<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/admin" class="flex items-center space-x-3">
              <div
                class="w-8 h-8 bg-foss-500 rounded-lg flex items-center justify-center"
              >
                <UIcon
                  name="i-heroicons-document-text"
                  class="w-5 h-5 text-white"
                />
              </div>
              <span class="text-xl font-bold text-gray-900">FOSS Forms</span>
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <UButton
              to="/admin/forms/new"
              color="foss"
              variant="solid"
              icon="i-heroicons-plus"
            >
              New Form
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar and Main Content -->
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-sm min-h-screen">
        <nav class="mt-8">
          <div class="px-4 space-y-1">
            <NuxtLink
              to="/admin"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="[
                $route.path === '/admin'
                  ? 'bg-foss-50 text-foss-700 border-r-2 border-foss-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <UIcon name="i-heroicons-home" class="mr-3 h-5 w-5" />
              Dashboard
            </NuxtLink>

            <NuxtLink
              to="/admin/forms"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="[
                $route.path.startsWith('/admin/forms')
                  ? 'bg-foss-50 text-foss-700 border-r-2 border-foss-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <UIcon name="i-heroicons-document-text" class="mr-3 h-5 w-5" />
              Forms
            </NuxtLink>

            <NuxtLink
              to="/admin/responses"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="[
                $route.path.startsWith('/admin/responses')
                  ? 'bg-foss-50 text-foss-700 border-r-2 border-foss-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <UIcon name="i-heroicons-chart-bar" class="mr-3 h-5 w-5" />
              Responses
            </NuxtLink>

            <NuxtLink
              to="/admin/analytics"
              class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="[
                $route.path.startsWith('/admin/analytics')
                  ? 'bg-foss-50 text-foss-700 border-r-2 border-foss-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ]"
            >
              <UIcon
                name="i-heroicons-presentation-chart-line"
                class="mr-3 h-5 w-5"
              />
              Analytics
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
</script>
