<script setup lang="ts">
import { ref } from "vue";

import Segments from "./components/Segments.vue";
import { formatTime } from "./utils/formatTime";

const timerId = ref<number>();
const milliseconds = ref(0);
const isStarted = ref(false);

const tick = () => {
  milliseconds.value += 1;
};

const handleStartClick = () => {
  if (!isStarted.value) {
    timerId.value = setInterval(tick, 1000 / 100);
  } else {
    clearInterval(timerId.value);
  }

  isStarted.value = !isStarted.value;
};
</script>

<template>
  <div class="mx-auto w-full max-w-5xl pt-9">
    <div class="mb-6 flex flex-col items-center gap-12 pt-20">
      <h3 class="text-6xl">{{ formatTime(milliseconds) }}</h3>

      <button
        class="min-w-16 rounded border border-zinc-800 px-3 py-1 transition-colors"
        :class="{ '!border-transparent bg-red-600': isStarted }"
        @click="handleStartClick"
      >
        <span v-if="!isStarted">Start</span>
        <span v-else class="text-white">Stop</span>
      </button>
    </div>

    <Segments :milliseconds="milliseconds" />
  </div>
</template>
