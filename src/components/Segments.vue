<script setup lang="ts">
import { ref, computed } from "vue";

import Segment from "./Segment.vue";
import { Segment as SegmentType } from "../types";

const { milliseconds } = defineProps<{ milliseconds: number }>();

const segments = ref([
  { time: 5 },
  { time: 30, progressColor: "green" },
  { time: 5, progressColor: "blue" },
  { time: 5 },
] as SegmentType[]);
const total = computed(() => segments.value.reduce((a, c) => a + c.time, 0));

const currentSegment = computed(() => {
  const progressSeconds = (milliseconds / 100) % total.value;

  let sum = 0;

  for (let i = 0; i < segments.value.length; i++) {
    const time = segments.value[i].time;
    sum += time;

    if (progressSeconds <= sum)
      return {
        index: i,
        progress: ((progressSeconds - (sum - time)) / time) * 100,
      };
  }

  return { index: 0, progress: 0 };
});

const getProgress = (i: number) => {
  if (currentSegment.value.index < i) return 0;
  if (currentSegment.value.index > i) return 100;
  return currentSegment.value.progress;
};

const handleChangeName = (index: number, value: string | undefined) => {
  segments.value[index].name = value;
};
</script>

<template>
  <div
    class="grid justify-center gap-1"
    :style="{
      gridTemplateColumns: segments.map((s) => `${s.time}fr`).join(' '),
    }"
  >
    <Segment
      v-for="(segment, i) in segments"
      :data="segment"
      :progress="getProgress(i)"
      @changeName="(value) => handleChangeName(i, value)"
    />
  </div>
</template>
