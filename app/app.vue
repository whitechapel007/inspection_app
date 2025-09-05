<template>
  <div id="app" class="antialiased">
    <!-- Onboarding Flow -->
    <OnboardingFlow
      v-if="onboarding.showOnboarding.value"
      @complete="onboarding.completeOnboarding"
      @skip="onboarding.skipOnboarding"
    />

    <!-- Guided Inspection -->
    <GuidedInspection
      v-else-if="onboarding.showGuidedInspection.value"
      @complete="onboarding.completeGuidedInspection"
      @exit="onboarding.skipGuidedInspection"
    />

    <!-- Main App -->
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import GuidedInspection from "~/components/inspection/GuidedInspection.vue";
import { useOnboarding } from "~/composables/useOnboarding";

const onboarding = useOnboarding();

onMounted(() => {
  onboarding.checkOnboardingStatus();
});

// Global app configuration
useHead({
  title: "Inspection App",
  meta: [
    { charset: "utf-8" },
    {
      name: "description",
      content: "A vehicle inspection app with camera and onboarding",
    },
    { name: "format-detection", content: "telephone=no" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>
