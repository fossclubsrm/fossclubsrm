<template>
  <div
    class="min-h-screen bg-gradient-to-br from-foss-50 to-pixel-50 flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="w-24 h-24 bg-foss-500 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <UIcon name="i-heroicons-document-text" class="w-12 h-12 text-white" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">FOSS Forms</h1>
      <p class="text-xl text-gray-600 mb-8">
        Dynamic forms builder with beautiful UI
      </p>
      <div class="flex items-center justify-center space-x-4">
        <UButton
          to="/admin"
          color="foss"
          variant="solid"
          size="lg"
          icon="i-heroicons-cog-6-tooth"
        >
          Admin Panel
        </UButton>
        <UButton
          to="/form/1"
          color="pixel"
          variant="outline"
          size="lg"
          icon="i-heroicons-document-text"
        >
          View Sample Form
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
// Redirect to admin panel after a short delay
onMounted(() => {
  setTimeout(() => {
    navigateTo("/admin");
  }, 3000);
});
</script>
