<template>
  <div class="min-h-screen bg-gray-50"></div>
</template>

<script setup lang="ts">
// Set page meta for mobile optimization

// import
useHead({
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "theme-color", content: "#000000" },
  ],
});
</script>
