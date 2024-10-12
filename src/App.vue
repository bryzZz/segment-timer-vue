<script setup lang="ts">
import { ref } from "vue";

import Segments from "./components/Segments.vue";
import { formatTime } from "./utils/formatTime";
import Sun from "./assets/sun.svg";
import Moon from "./assets/moon.svg";

const timerId = ref<number>();
const milliseconds = ref(0);
const isStarted = ref(false);
const theme = ref(document.documentElement.dataset.theme);

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

const handleChangeTheme = () => {
  if (document.documentElement.dataset.theme === "light") {
    document.documentElement.dataset.theme = "dark";
  } else {
    document.documentElement.dataset.theme = "light";
  }

  theme.value = document.documentElement.dataset.theme;

  localStorage.setItem("theme", document.documentElement.dataset.theme);
};
</script>

<template>
  <div
    class="main bg-bg-primary min-h-screen w-screen overflow-hidden pt-2 transition-colors"
  >
    <header class="bg-bg-secondary mx-2 flex justify-end rounded p-2">
      <button
        class="text-text-primary"
        type="button"
        @click="handleChangeTheme"
      >
        <Sun v-if="theme === 'dark'" />
        <Moon v-else />
      </button>
    </header>

    <div class="mx-auto w-full max-w-5xl overflow-hidden pt-12">
      <div class="mb-6 flex flex-col items-center gap-12 pt-20">
        <h3 class="text-text-primary text-6xl">
          {{ formatTime(milliseconds) }}
        </h3>

        <button
          class="border-border-primary text-text-primary min-w-16 rounded border px-3 py-1 transition-colors"
          :class="{
            '!bg-error !border-transparent': isStarted,
          }"
          @click="handleStartClick"
        >
          <span v-if="!isStarted">Start</span>
          <span v-else class="text-text-primary">Stop</span>
        </button>
      </div>

      <Segments :draggable="!isStarted" :milliseconds="milliseconds" />
    </div>
  </div>
</template>
