import { ref } from "vue";

export function useCamera() {
  const videoStream = ref<MediaStream | null>(null);
  const videoRef = ref<HTMLVideoElement | null>(null);
  const gallery = ref<string[]>([]);

  // Load gallery from localStorage
  const loadGallery = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("gallery");
        console.log("Loading gallery from localStorage:", saved);
        if (saved) {
          const parsed = JSON.parse(saved);
          gallery.value = parsed;
          console.log("Gallery loaded:", gallery.value.length, "photos");
        } else {
          console.log("No gallery found in localStorage");
        }
      } catch (error) {
        console.error("Failed to load gallery from localStorage:", error);
        gallery.value = [];
      }
    }
  };

  // Initialize gallery if on client
  if (typeof window !== "undefined") {
    loadGallery();
  }

  const initializeCamera = async () => {
    try {
      // Stop existing stream if any
      if (videoStream.value) {
        videoStream.value.getTracks().forEach((track) => track.stop());
      }

      // request permission first
      await navigator.mediaDevices.getUserMedia({ video: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      let selected = devices.find(
        (d) => d.kind === "videoinput" && d.label.toLowerCase().includes("back")
      );

      if (!selected) {
        // fallback: any camera
        selected = devices.find((d) => d.kind === "videoinput");
      }

      if (!selected) throw new Error("No camera available");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selected.deviceId },
      });

      videoStream.value = stream;
      if (videoRef.value) {
        videoRef.value.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera initialization error:", err);
      throw err;
    }
  };

  const capturePhoto = (autoSave: boolean = true): string | null => {
    if (!videoRef.value) return null;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.value.videoWidth;
    canvas.height = videoRef.value.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

    // Max size 2MB
    const base64Data = dataUrl.split(",")[1];
    if (!base64Data) return null;
    const byteString = atob(base64Data);
    const size = byteString.length / 1024 / 1024;
    if (size > 2) {
      alert("Image too large (>2MB)");
      return null;
    }

    if (autoSave) {
      gallery.value.push(dataUrl);
      saveGallery();
    }

    return dataUrl;
  };

  const saveGallery = () => {
    if (typeof window !== "undefined") {
      console.log(
        "Saving gallery to localStorage:",
        gallery.value.length,
        "photos"
      );
      localStorage.setItem("gallery", JSON.stringify(gallery.value));
      console.log("Gallery saved successfully");

      // Verify save worked
      const verification = localStorage.getItem("gallery");
      if (verification) {
        console.log("Save verification successful");
      } else {
        console.error("Save verification failed!");
      }
    }
  };

  const stopCamera = () => {
    videoStream.value?.getTracks().forEach((t) => t.stop());
  };

  return {
    videoRef,
    gallery,
    initializeCamera,
    capturePhoto,
    saveGallery,
    loadGallery,
    stopCamera,
  };
}
