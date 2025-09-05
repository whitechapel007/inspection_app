<template>
  <div class="fixed inset-0 bg-white z-50 flex flex-col p-5">
    <!-- Header -->
    <div class="text-center pt-8 pb-6 px-6">
      <h1 class="text-22 font-semibold text-gray-900 mb-5">
        Step on how to inspect
      </h1>
      <p class="text-gray-600 font-normal">
        It is important to note all these
        <span class="text-purple-500 font-semibold">STEP</span>
        before starting your Inspection;
      </p>
    </div>

    <!-- Step Indicator -->

    <div class="bg-purple-50 pt-7 rounded-xl">
      <div class="flex justify-center items-center gap-3 px-6 mb-8">
        <div class="flex gap-2 items-center">
          <div
            v-for="step in totalSteps"
            :key="step"
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium transition-colors',
              step === currentStep
                ? 'bg-purple-25 text-gray-700 w-72 h-26 rounded-2xl'
                : 'bg-purple-25 text-gray-400',
            ]"
          >
            <span v-if="step === currentStep" class="flex items-center gap-1">
              <span>STEP</span> <span class="text-purple-500">{{ step }}</span>
            </span>
            <span v-else>
              <span class="hidden">STEP</span>
              <span>
                {{ step }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="flex-1 px-6 pb-6 overflow-auto">
        <!-- Animated Step Container -->
        <Transition :name="slideDirection" mode="out-in">
          <div :key="currentStep" class="text-center">
            <!-- Step 1: Parking -->
            <div v-if="currentStep === 1">
              <div class="mb-10">
                <h2 class="text-lg text-gray-700 mb-4">
                  Park your Vehicle in a
                  <span class="font-semibold">well-lit, shaded, </span> and
                  <span class="font-semibold">spacious</span> area, ensuring
                  there are <span class="font-semibold">no obstructions.</span>
                </h2>
              </div>

              <div class="mb-8">
                <img
                  src="/images/step-1.png"
                  alt="Car parked in spacious area"
                  class="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            <!-- Step 2: Exterior Inspection -->
            <div v-else-if="currentStep === 2" class="text-center">
              <div class="mb-10">
                <h2 class="text-lg text-gray-700 mb-4">
                  Take picture of your
                  <span class="text-gray-700 font-medium">Vehicle's </span>
                  <span class="text-primary-green font-medium">
                    Front View,</span
                  >
                  ensuring it fills about
                  <span class="text-success-500 font-medium">80% </span> of your
                  camera screen
                </h2>
              </div>
              <p class="text-gray-900 font-normal">Front View</p>

              <div class="mb-8">
                <img
                  src="/images/step-2.png"
                  alt="Car exterior inspection"
                  class="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            <!-- Step 3: Tires and Wheels -->
            <div v-else-if="currentStep === 3" class="text-center">
              <div class="mb-8">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">
                  Take picture of your
                  <span class="text-gray-700 font-medium">Vehicle's </span>
                  <span class="text-primary-green font-medium">
                    Left View,</span
                  >
                  ensuring it fills about
                  <span class="text-success-500 font-medium">80% </span> of your
                  camera screen
                </h2>
              </div>
              <p class="text-gray-900 font-normal pb-3">
                Left View ( Driver side )
              </p>
              <div class="mb-8">
                <img
                  src="/images/step-3.png"
                  alt="Car tire inspection"
                  class="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            <!-- Step 4: Interior Check -->
            <div v-else-if="currentStep === 4" class="text-center">
              <div class="mb-8">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">
                  Take picture of your
                  <span class="text-gray-700 font-medium">Vehicle's </span>
                  <span class="text-primary-green font-medium">
                    Back View,</span
                  >
                  ensuring it fills about
                  <span class="text-success-500 font-medium">80% </span> of your
                  camera screen
                </h2>
              </div>
              <p class="text-gray-900 font-normal pb-3">Back View</p>
              <div class="mb-8">
                <img
                  src="/images/step-4.png"
                  alt="Car interior inspection"
                  class="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            <!-- Step 5: Engine Bay -->
            <div v-else-if="currentStep === 5" class="text-center">
              <div class="mb-8">
                <h2 class="text-lg font-semibold text-gray-700 mb-4">
                  Take picture of your
                  <span class="text-gray-700 font-medium">Vehicle's </span>
                  <span class="text-primary-green font-medium">
                    Right View,</span
                  >
                  ensuring it fills about
                  <span class="text-success-500 font-medium">80% </span> of your
                  camera screen
                </h2>
              </div>
              <p class="text-gray-900 font-normal pb-3">Right View</p>
              <div class="mb-8">
                <img
                  src="/images/step-5.png"
                  alt="Car engine inspection"
                  class="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            <!-- Step 6: Documentation -->
            <div v-else-if="currentStep === 6" class="text-center">
              <div class="mb-8">
                <h2 class="text-lg text-gray-700 mb-4">
                  Take picture of your
                  <span class="font-semibold">Vehicle's </span>
                  <span class="text-primary-green font-semibold"
                    >Chassis no.
                  </span>
                </h2>

                <!-- Chassis number location instructions -->
                <div class="w-lg mx-auto space-y-4 mt-6 px-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-2 h-2 rounded-full border border-purple-500 flex-shrink-0"
                    ></div>
                    <p class="text-gray-600 text-base">
                      You can locate the chassis number on the
                      <span class="text-primary-green font-medium"
                        >front windshield</span
                      >, or
                    </p>
                  </div>

                  <div class="flex items-center gap-3">
                    <div
                      class="w-2 h-2 rounded-full border border-purple-500 flex-shrink-0"
                    ></div>
                    <p class="text-gray-600 text-base">
                      You can find it on the
                      <span class="text-primary-green font-medium"
                        >interior door</span
                      >
                      of the
                      <span class="text-primary-green font-medium"
                        >driver's side</span
                      >
                    </p>
                  </div>
                </div>
              </div>

              <p class="text-gray-900 font-normal mb-2">Chassis number</p>
              <div class="mb-8">
                <img
                  src="/images/step-6.png"
                  alt="Documenting car inspection"
                  class="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            <!-- Step 7: Final Review -->
            <div v-else-if="currentStep === 7" class="text-center">
              <div class="mb-8">
                <h2 class="text-lg text-gray-700 mb-4">
                  Take picture of your
                  <span class="text-gray-700 font-medium">Vehicle's </span>
                  <span class="text-primary-green font-medium">
                    Dashboard,</span
                  >
                  ensuring it fills about
                  <span class="text-success-500 font-medium">80% </span> of your
                  camera screen
                </h2>
              </div>
              <p class="text-gray-900 font-normal pb-3">Vehicle Dashboard</p>
              <div class="mb-8">
                <img
                  src="/images/step-7.png"
                  alt="Final inspection review"
                  class="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            <!-- Step 8: Ready to Start -->
            <div v-else-if="currentStep === 8" class="text-center">
              <div class="mb-8">
                <h2 class="text-lg text-gray-700 mb-4">
                  Take picture of your
                  <span class="text-gray-700 font-medium">Vehicle's </span>
                  <span class="text-primary-green font-medium">
                    Interior Back View,</span
                  >
                  ensuring it fills about
                  <span class="text-success-500 font-medium">80% </span> of your
                  camera screen
                </h2>
              </div>
              <p class="text-gray-900 font-normal pb-3">Vehicle Backview</p>

              <div class="mb-8">
                <img
                  src="/images/step-8.png"
                  alt="Ready to start inspection"
                  class="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div
      class="flex justify-between items-center p-6 border-t border-gray-200 gap-4"
    >
      <UiButton
        v-if="currentStep < totalSteps"
        variant="ghost"
        size="lg"
        @click="skipOnboarding"
        class="text-gray-600 w-full"
      >
        Skip
      </UiButton>

      <UiButton
        variant="primary"
        size="lg"
        @click="nextStep"
        class="bg-primary-green outline-none ring-0 hover:bg-green-700 px-8 w-full"
      >
        {{ currentStep === totalSteps ? "Start Inspection" : "Next Step" }}
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const emit = defineEmits<{
  complete: [];
  skip: [];
}>();

const currentStep = ref(1);
const totalSteps = 8;
const previousStep = ref(1);

// Animation direction based on step progression
const slideDirection = computed(() => {
  return currentStep.value > previousStep.value ? "slide-left" : "slide-right";
});

function nextStep() {
  if (currentStep.value < totalSteps) {
    previousStep.value = currentStep.value;
    currentStep.value++;
  } else {
    // Complete onboarding
    emit("complete");
  }
}

function skipOnboarding() {
  emit("skip");
}
</script>

<style scoped>
/* Slide Left Animation (Next Step) */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* Slide Right Animation (Previous Step) */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-right-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

/* Step Indicator Animation */
.w-8.h-8 {
  transition: all 0.4s ease-out;
}

/* Enhanced step indicator animation */
.w-72.h-26 {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
