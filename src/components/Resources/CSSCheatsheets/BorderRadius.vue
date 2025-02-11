<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-xl font-bold mb-4">Border Radius Generator</h1>

    <!-- Slider -->
    <label for="radius" class="block mb-2 text-sm font-medium text-gray-700">
      Border Radius: {{ radius }}px ({{ tailwindClass }})
    </label>
    <input
      id="radius"
      type="range"
      :min="0"
      :max="maxRadius"
      v-model="radius"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />

    <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <!-- Live Preview -->
        <div class="mt-6">
          <div
            class="w-32 h-32 bg-blue-500 mx-auto"
            :style="{ borderRadius: radius + 'px' }"
          ></div>
        </div>

        <!-- CSS Code -->
        <div class="mt-4 p-4 bg-white border border-gray-300 rounded-lg">
          <p class="text-sm font-mono text-gray-800">CSS Code:</p>
          <code class="block mt-2 bg-gray-100 p-2 rounded-md text-sm">
            border-radius: {{ radius }}px;
          </code>
        </div>
      </div>

      <div>
        <!-- Live Preview -->
        <div class="mt-6">
          <div
            class="w-32 h-32 bg-blue-500 mx-auto"
            :style="{ borderRadius: radius + 'px' }"
          ></div>
        </div>

        <!-- CSS Code -->
        <div class="mt-4 p-4 bg-white border border-gray-300 rounded-lg">
          <p class="text-sm font-mono text-gray-800">
            Tailwind Class with Pixels:
          </p>
          <code class="block mt-2 bg-gray-100 p-2 rounded-md text-sm">
            &lt;div class="rounded-[{{ radius }}px]"&gt;&lt;/div&gt;
          </code>
        </div>
      </div>

      <div>
        <!-- Live Preview -->
        <div class="mt-6">
          <div
            class="w-32 h-32 bg-blue-500 mx-auto"
            :class="[tailwindClass]"
          ></div>
        </div>

        <!-- CSS Code -->
        <div class="mt-4 p-4 bg-white border border-gray-300 rounded-lg">
          <p class="text-sm font-mono text-gray-800">Tailwind Class:</p>
          <code class="block mt-2 bg-gray-100 p-2 rounded-md text-sm">
            &lt;div class="{{ tailwindClass }}"&gt;&lt;/div&gt;
          </code>
        </div>
      </div>
    </div>
  </div>
  <!-- Tailwind Class -->
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state
const radius = ref(4) // Default radius value
const maxRadius = 100 // Maximum value for the slider

// Tailwind predefined radius mapping
const tailwindSizes = [
  { size: 0, class: 'rounded-none' },
  { size: 2, class: 'rounded-sm' },
  { size: 4, class: 'rounded' },
  { size: 8, class: 'rounded-md' },
  { size: 16, class: 'rounded-lg' },
  { size: 24, class: 'rounded-xl' },
  { size: 32, class: 'rounded-2xl' },
  { size: 40, class: 'rounded-3xl' },
  { size: 50, class: 'rounded-full' } // Fully rounded
]

// Computed Tailwind class
const tailwindClass = computed(() => {
  // Find the closest Tailwind class for the current radius
  let closest = tailwindSizes[0]
  for (const size of tailwindSizes) {
    if (radius.value >= size.size) closest = size
    else break
  }
  return closest.class
})
</script>

<style>
/* Additional styling for the range slider */
input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}
</style>
