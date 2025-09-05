import { ref, computed } from 'vue'

export interface GuidedInspectionPhoto {
  id: string
  dataUrl: string
  step: number
  stepTitle: string
  timestamp: string
  type: 'guided_inspection'
}

const GUIDED_INSPECTION_PHOTOS_KEY = 'guided_inspection_photos'

export function useGuidedInspectionPhotos() {
  const photos = ref<GuidedInspectionPhoto[]>([])

  // Load photos from localStorage
  const loadPhotos = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(GUIDED_INSPECTION_PHOTOS_KEY)
      if (saved) {
        try {
          photos.value = JSON.parse(saved)
        } catch (error) {
          console.error('Failed to parse guided inspection photos:', error)
          photos.value = []
        }
      }
    }
  }

  // Save photos to localStorage
  const savePhotos = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(GUIDED_INSPECTION_PHOTOS_KEY, JSON.stringify(photos.value))
    }
  }

  // Add a new photo
  const addPhoto = (photo: Omit<GuidedInspectionPhoto, 'id' | 'timestamp'>) => {
    const newPhoto: GuidedInspectionPhoto = {
      ...photo,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    photos.value.push(newPhoto)
    savePhotos()
    return newPhoto
  }

  // Remove a photo by ID
  const removePhoto = (id: string) => {
    const index = photos.value.findIndex(photo => photo.id === id)
    if (index > -1) {
      photos.value.splice(index, 1)
      savePhotos()
      return true
    }
    return false
  }

  // Get photo by step
  const getPhotoByStep = (step: number) => {
    return photos.value.find(photo => photo.step === step)
  }

  // Get all photos sorted by step
  const getPhotosSortedByStep = computed(() => {
    return [...photos.value].sort((a, b) => a.step - b.step)
  })

  // Clear all photos
  const clearAllPhotos = () => {
    photos.value = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem(GUIDED_INSPECTION_PHOTOS_KEY)
    }
  }

  // Check if all steps have photos
  const isInspectionComplete = computed(() => {
    const totalSteps = 3 // Total guided inspection steps
    const completedSteps = new Set(photos.value.map(photo => photo.step))
    return completedSteps.size === totalSteps
  })

  // Get completion percentage
  const completionPercentage = computed(() => {
    const totalSteps = 3
    const completedSteps = new Set(photos.value.map(photo => photo.step))
    return Math.round((completedSteps.size / totalSteps) * 100)
  })

  // Get missing steps
  const getMissingSteps = computed(() => {
    const totalSteps = 10
    const completedSteps = new Set(photos.value.map(photo => photo.step))
    const missingSteps = []
    for (let i = 1; i <= totalSteps; i++) {
      if (!completedSteps.has(i)) {
        missingSteps.push(i)
      }
    }
    return missingSteps
  })

  // Initialize by loading existing photos
  loadPhotos()

  return {
    photos: computed(() => photos.value),
    addPhoto,
    removePhoto,
    getPhotoByStep,
    getPhotosSortedByStep,
    clearAllPhotos,
    isInspectionComplete,
    completionPercentage,
    getMissingSteps,
    loadPhotos,
    savePhotos
  }
}
