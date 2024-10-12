<script setup lang="ts">
import { ref, computed } from "vue";

import Segment from "./Segment.vue";
import { Segment as SegmentType } from "../types";
import move from "../utils/move";

const { draggable, milliseconds } = defineProps<{
  draggable: boolean;
  milliseconds: number;
}>();

const dragId = ref<string | null>(null);

const segments = ref<SegmentType[]>([
  { id: "0", time: 5, progressColor: "green", name: "Вдох" },
  { id: "1", time: 30, progressColor: "red", name: "Задержка" },
  { id: "2", time: 5, progressColor: "green", name: "Выдох" },
  { id: "3", time: 5, progressColor: "red", name: "Задержка" },
]);
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

const handleDelete = (id: string) => {
  const index = segments.value.findIndex((s) => s.id === id);

  if (index === -1) return;

  segments.value.splice(index, 1);
};

const handleDragEnter = (e: DragEvent, index: number) => {
  e.preventDefault();

  if (!dragId.value) return;

  const dragIndex = segments.value.findIndex((s) => s.id === dragId.value);

  if (dragIndex === index || dragIndex === index - 1) return;

  if (dragIndex < index) {
    segments.value = move(segments.value, dragIndex, index - 1);
  } else {
    segments.value = move(segments.value, dragIndex, index);
  }
};
</script>

<template>
  <TransitionGroup
    tag="div"
    name="move"
    class="relative flex justify-center gap-1"
  >
    <div key="dropper-1" :class="['relative', dragId !== null && 'z-20']">
      <div
        class="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2"
        @dragenter="(e) => handleDragEnter(e, 0)"
      ></div>
    </div>
    <template v-for="(segment, index) in segments" :key="segment.id">
      <Segment
        :draggable="draggable"
        :data="segment"
        :progress="getProgress(index)"
        @changeName="(value) => handleChangeName(index, value)"
        @delete="handleDelete(segment.id)"
        @dragStart="dragId = segment.id"
        @dragEnd="dragId = null"
        :isDragging="dragId !== null"
        :isDraggingMe="dragId === segment.id"
      />

      <div :class="['relative', dragId !== null && 'z-20']">
        <div
          class="absolute left-1/2 top-0 h-full w-10 -translate-x-1/2"
          @dragenter="(e) => handleDragEnter(e, index + 1)"
        ></div>
      </div>
    </template>
  </TransitionGroup>
</template>

<style>
.move-move {
  @apply transition-all;
}
</style>
