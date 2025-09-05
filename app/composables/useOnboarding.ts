import { computed, ref } from "vue";

const ONBOARDING_KEY = "inspection_app_onboarding_completed";
const GUIDED_INSPECTION_KEY = "inspection_app_guided_inspection_completed";

export const useOnboarding = () => {
  const isOnboardingCompleted = ref(false);
  const isGuidedInspectionCompleted = ref(false);
  const showOnboarding = ref(false);
  const showGuidedInspection = ref(false);

  // Check if onboarding was completed before
  const checkOnboardingStatus = () => {
    if (typeof window !== "undefined") {
      const onboardingCompleted = localStorage.getItem(ONBOARDING_KEY);
      const guidedInspectionCompleted = localStorage.getItem(
        GUIDED_INSPECTION_KEY
      );

      isOnboardingCompleted.value = onboardingCompleted === "true";
      isGuidedInspectionCompleted.value = guidedInspectionCompleted === "true";

      // Show onboarding if not completed
      if (!isOnboardingCompleted.value) {
        showOnboarding.value = true;
      }
      // Show guided inspection if onboarding is done but guided inspection is not
      else if (!isGuidedInspectionCompleted.value) {
        showGuidedInspection.value = true;
      }
    }
  };

  // Mark onboarding as completed
  const completeOnboarding = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ONBOARDING_KEY, "true");
      isOnboardingCompleted.value = true;
      showOnboarding.value = false;

      // Show guided inspection after onboarding
      if (!isGuidedInspectionCompleted.value) {
        showGuidedInspection.value = true;
      }
    }
  };

  // Skip onboarding (also marks as completed)
  const skipOnboarding = () => {
    completeOnboarding();
  };

  // Mark guided inspection as completed
  const completeGuidedInspection = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(GUIDED_INSPECTION_KEY, "true");
      isGuidedInspectionCompleted.value = true;
      showGuidedInspection.value = false;
    }
  };

  // Skip guided inspection (also marks as completed)
  const skipGuidedInspection = () => {
    completeGuidedInspection();
  };

  // Reset onboarding (for testing purposes)
  const resetOnboarding = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ONBOARDING_KEY);
      localStorage.removeItem(GUIDED_INSPECTION_KEY);
      isOnboardingCompleted.value = false;
      isGuidedInspectionCompleted.value = false;
      showOnboarding.value = true;
      showGuidedInspection.value = false;
    }
  };

  // Force show onboarding
  const forceShowOnboarding = () => {
    showOnboarding.value = true;
    showGuidedInspection.value = false;
  };

  return {
    isOnboardingCompleted: computed(() => isOnboardingCompleted.value),
    isGuidedInspectionCompleted: computed(
      () => isGuidedInspectionCompleted.value
    ),
    showOnboarding: computed(() => showOnboarding.value),
    showGuidedInspection: computed(() => showGuidedInspection.value),
    checkOnboardingStatus,
    completeOnboarding,
    skipOnboarding,
    completeGuidedInspection,
    skipGuidedInspection,
    resetOnboarding,
    forceShowOnboarding,
  };
};
