<template>
  <div class="p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-xl font-bold mb-4">Gradient Generator</h1>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Gradient Controls -->
      <div>
        <!-- Gradient Type -->
        <label class="block mb-2 text-sm font-medium text-gray-700"
          >Gradient Type</label
        >
        <select
          v-model="gradientType"
          class="w-full h-10 border border-gray-300 rounded-md px-2"
        >
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>

        <!-- First Color -->
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >Color 1</label
        >
        <input
          type="color"
          v-model="color1"
          class="w-full h-10 border border-gray-300 rounded-md"
        />

        <!-- Second Color -->
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >Color 2</label
        >
        <input
          type="color"
          v-model="color2"
          class="w-full h-10 border border-gray-300 rounded-md"
        />

        <!-- Direction (for linear gradients only) -->
        <label
          v-if="gradientType === 'linear'"
          class="block mt-4 mb-2 text-sm font-medium text-gray-700"
          >Direction</label
        >
        <select
          v-if="gradientType === 'linear'"
          v-model="direction"
          class="w-full h-10 border border-gray-300 rounded-md px-2"
        >
          <option value="to-r">To Right</option>
          <option value="to-l">To Left</option>
          <option value="to-t">To Top</option>
          <option value="to-b">To Bottom</option>
          <option value="to-tr">To Top Right</option>
          <option value="to-tl">To Top Left</option>
          <option value="to-br">To Bottom Right</option>
          <option value="to-bl">To Bottom Left</option>
        </select>
      </div>

      <!-- Live Preview -->
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-700">
          Gradient Preview
        </label>
        <div
          class="w-32 h-32 mx-auto border border-gray-300 rounded-lg"
          :style="{ background: gradientStyle }"
        ></div>
      </div>

      <!-- CSS Code Output -->
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-700"
          >CSS Code</label
        >
        <div class="mt-4 p-4 bg-white border border-gray-300 rounded-lg">
          <code class="block bg-gray-100 p-2 rounded-md text-sm">
            background: {{ gradientStyle }};
          </code>
        </div>

        <!-- Tailwind Class -->
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">
          Tailwind Class
        </label>
        <div class="mt-4 p-4 bg-white border border-gray-300 rounded-lg">
          <code class="block bg-gray-100 p-2 rounded-md text-sm">
            {{ tailwindClass }}
          </code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const gradientType = ref('linear')
const color1 = ref('#352d8b')
const color2 = ref('#111827')
const direction = ref('to-r')

const directionMap = {
  'to-r': 'to right',
  'to-l': 'to left',
  'to-t': 'to top',
  'to-b': 'to bottom',
  'to-tr': 'to top right',
  'to-tl': 'to top left',
  'to-br': 'to bottom right',
  'to-bl': 'to bottom left'
}

const gradientStyle = computed(() => {
  if (gradientType.value === 'linear') {
    return `linear-gradient(${directionMap[direction.value]}, ${color1.value}, ${color2.value})`
  } else if (gradientType.value === 'radial') {
    return `radial-gradient(circle, ${color1.value}, ${color2.value})`
  }
})

const tailwindClass = computed(() => {
  const fromColor = color1.value.replace('#', '')
  const toColor = color2.value.replace('#', '')

  if (gradientType.value === 'linear') {
    return `bg-gradient-${direction.value} from-[#${fromColor}] to-[#${toColor}]`
  } else if (gradientType.value === 'radial') {
    return `bg-gradient-radial from-[#${fromColor}] to-[#${toColor}]`
  }
})
</script>

<style>
input[type='color'] {
  cursor: pointer;
}
</style>
