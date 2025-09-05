<template>
  <div class="h-screen bg-black relative overflow-hidden">
    <!-- Camera Background -->
    <video
      ref="videoElement"
      class="w-full h-full object-cover"
      autoplay
      playsinline
      muted
      :style="{ transform: 'scaleX(-1)' }"
    />

    <!-- Top Instruction Overlay -->
    <div
      class="absolute top-0 right-1 w-[400px] bottom-0 p-6 backdrop-blur-sm z-10"
      :style="{
        background:
          'linear-gradient(0deg, rgba(85, 85, 85, 0.6), rgba(85, 85, 85, 0.6)), linear-gradient(180deg, rgba(124, 124, 124, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
      }"
    >
      <div class="text-center text-white">
        <h1 class="text-2xl font-bold mb-10">{{ currentStepData.title }}</h1>
        <p class="opacity-90">{{ currentStepData.instruction }}</p>
      </div>

      <div class="w-[90%] flex justify-center">
        <img :src="currentStepData.image" alt="" class="rotate-90" />
      </div>

      <div class="absolute bottom-10 w-[90%]">
        <div class="flex items-center gap-3">
          <!-- Go Back Button -->
          <UiButton
            variant="secondary"
            size="lg"
            @click="goBack"
            :disabled="currentStep === 1"
            class="text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg flex-1"
          >
            Go back
          </UiButton>

          <UiButton
            variant="primary"
            size="lg"
            @click="startCapture"
            :disabled="isCapturing"
            class="text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg flex-1 bg-primary-green"
          >
            {{ isCapturing ? "Taking..." : "Start" }}
          </UiButton>
        </div>
      </div>
    </div>

    <!-- Bottom Step Indicators -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
      <div
        class="flex items-center gap-3 rounded-full px-6 py-3 backdrop-blur-sm"
        :style="{
          background:
            'linear-gradient(0deg, rgba(85, 85, 85, 0.6), rgba(85, 85, 85, 0.6)), linear-gradient(180deg, rgba(124, 124, 124, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
        }"
      >
        <div
          v-for="step in totalSteps"
          :key="step"
          :class="[
            'w-3 h-3 rounded-full transition-all duration-300',
            step === currentStep
              ? 'bg-white scale-125'
              : step < currentStep
              ? 'bg-teal-400'
              : 'bg-white/30',
          ]"
        />
        <span class="text-white text-sm font-medium ml-2">
          {{ currentStep }}/{{ totalSteps }}
        </span>
      </div>
    </div>

    <!-- Photo Preview Modal -->
    <UiModal v-model="showPreview" size="full">
      <div class="h-full bg-black flex flex-col">
        <div class="flex-1 flex items-center justify-center p-4">
          <img
            v-if="capturedPhoto"
            :src="capturedPhoto"
            alt="Captured photo preview"
            class="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        <div class="p-6 bg-white">
          <div class="flex gap-4">
            <UiButton
              variant="secondary"
              size="lg"
              @click="retakePhoto"
              class="flex-1"
            >
              Re capture
            </UiButton>
            <UiButton
              variant="primary"
              size="lg"
              @click="acceptPhoto"
              class="flex-1 bg-teal-500 hover:bg-teal-600"
            >
              Verify
            </UiButton>
          </div>
        </div>
      </div>
    </UiModal>

    <!-- Loading Overlay -->
    <div
      v-if="!isReady"
      class="absolute inset-0 flex items-center justify-center bg-black/75"
    >
      <div class="text-center text-white">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"
        />
        <p class="text-sm">Initializing camera...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import UiButton from "~/components/ui/UiButton.vue";
import UiModal from "~/components/ui/UiModal.vue";
import { useCamera } from "~/composables/useCamera";
import { useGuidedInspectionPhotos } from "~/composables/useGuidedInspectionPhotos";

const emit = defineEmits<{
  complete: [];
  exit: [];
}>();

// Camera setup
const camera = useCamera();
const guidedPhotos = useGuidedInspectionPhotos();
const videoElement = ref<HTMLVideoElement | null>(null);
const isReady = ref(false);
const isCapturing = ref(false);
const capturedPhoto = ref<string | null>(null);
const showPreview = ref(false);

// Inspection flow state
const currentStep = ref(1);
const totalSteps = 3;

// Inspection steps data
const inspectionSteps = [
  {
    title: "Vehicle Left Side View",
    instruction: "Take Vehicle left view",
    image: "/images/insp-1.png",
  },
  {
    title: "Vehicle Right Side View",
    instruction: "Confirm Vehicle side view to move to the next Vehicle view",
    image: "/images/insp-1.png",
  },
  {
    title: "Vehicle Front Side View",
    instruction: "Take Vehicle front view",
    image: "/images/insp-3.png",
  },
];

const currentStepData = computed(() => {
  const stepIndex = currentStep.value - 1;
  return (
    inspectionSteps[stepIndex] || {
      title: "Unknown Step",
      instruction: "Please check the inspection configuration",
      image: "/images/insp-1.png",
    }
  );
});

// Camera initialization
onMounted(async () => {
  // Ensure photos are loaded from localStorage
  camera.loadGallery();
  guidedPhotos.loadPhotos();

  if (videoElement.value) {
    camera.videoRef.value = videoElement.value;
    await camera.initializeCamera();
    isReady.value = true;
  }
});

// Functions
async function startCapture() {
  if (!isReady.value || isCapturing.value) return;

  isCapturing.value = true;
  try {
    const photoData = camera.capturePhoto(false); // Don't auto-save, we'll save on accept
    capturedPhoto.value = photoData;
    showPreview.value = true;
  } catch (error) {
    console.error("Failed to capture photo:", error);
  } finally {
    isCapturing.value = false;
  }
}

function goBack() {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    emit("exit");
  }
}

function retakePhoto() {
  showPreview.value = false;
  capturedPhoto.value = null;
}

function acceptPhoto() {
  if (capturedPhoto.value && currentStepData.value) {
    // Save photo to main gallery
    camera.gallery.value.push(capturedPhoto.value);
    camera.saveGallery();

    // Save to guided inspection specific storage with metadata
    guidedPhotos.addPhoto({
      dataUrl: capturedPhoto.value,
      step: currentStep.value,
      stepTitle: currentStepData.value.title,
      type: "guided_inspection",
    });
  }

  showPreview.value = false;
  capturedPhoto.value = null;

  // Move to next step or complete
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  } else {
    emit("complete");
  }
}
</script>
