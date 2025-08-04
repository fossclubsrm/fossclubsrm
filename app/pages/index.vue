<script setup lang="ts">
const feedbackForm = {
  id: "event-feedback-form",
  title: "Event Feedback Form",
  description: "",
  fields: [
    {
      name: "feedback",
      type: "textarea" as const,
      label: "Your Feedback",
      required: true,
      placeholder:
        "Share your thoughts about the event, what you learned, and suggestions for improvement...",
    },
    {
      name: "docker",
      type: "rating" as const,
      label: "Docker Session Rating",
      required: true,
      max: 5,
    },
    {
      name: "linux",
      type: "rating" as const,
      label: "Linux Session Rating",
      required: true,
      max: 5,
    },
  ],
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50"
  >
    <div class="relative py-12 md:py-16">
      <div class="absolute inset-0 opacity-5">
        <div
          class="w-full h-full bg-gradient-to-r from-green-400 to-blue-500"
        ></div>
      </div>

      <div class="relative text-center max-w-4xl mx-auto px-6">
        <div class="mb-6">
          <img
            src="/images/logo.png"
            alt="FOSS Club SRM Logo"
            class="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h1
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-950 mb-6 leading-tight"
        >
          <span
            class="bg-gradient-to-r from-neutral-950 via-green-600 to-neutral-950 bg-clip-text text-transparent"
          >
            Unbox Freedom:
          </span>
          <br class="md:hidden" />
          <span class="text-neutral-950"> Dive into FOSS, Docker & Linux </span>
        </h1>

        <div class="max-w-2xl mx-auto">
          <p class="text-lg md:text-xl text-neutral-600 mb-4 leading-relaxed">
            Help us improve future events by sharing your valuable feedback!
          </p>
        </div>

        <div
          class="w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-8"
        ></div>
      </div>
    </div>

    <div class="relative pb-16">
      <div class="absolute inset-0 bg-white opacity-80"></div>

      <div class="relative">
        <DynamicForm :form-config="feedbackForm" />
      </div>
    </div>

    <div
      class="bg-gradient-to-r from-gray-50 to-green-50 py-8 border-t border-gray-100"
    >
      <div class="text-center text-neutral-500 text-sm">
        <p>&copy; 2025 FOSS Club SRM. Empowering open source innovation.</p>
      </div>
    </div>
  </div>
</template>
