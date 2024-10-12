<script setup lang="ts">
import { Segment } from "../types";
import SvgImage from "../assets/transh.svg";

const {
  data,
  progress,
  onChangeName,
  onDelete,
  isDragging,
  onDragStart,
  onDragEnd,
} = defineProps<{
  data: Segment;
  progress: number;
  onChangeName: (value: string | undefined) => void;
  onDelete: () => void;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
}>();

const colorsMap = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
};

const handleChangeName = (e: Event) => {
  const value = (e.target as any)?.value || undefined;

  onChangeName(value);
};

const handleDragStart = (e: DragEvent) => {
  const dragEle = e.target;

  if (!dragEle || !e.dataTransfer) return;

  const ghostEle = (dragEle as any).cloneNode(true);
  ghostEle.classList.add(
    "dragging",
    colorsMap[data.progressColor ?? "red"],
    "bg-opacity-65",
  );
  ghostEle.style.width = (dragEle as any).offsetWidth + "px";
  ghostEle.querySelector(".progress").remove();

  document.body.appendChild(ghostEle);

  const nodeRect = (dragEle as any).getBoundingClientRect();

  e.dataTransfer.setDragImage(
    ghostEle,
    e.clientX - nodeRect.left,
    e.clientY - nodeRect.top,
  );

  const handleDragEnd = () => {
    ghostEle.remove();
    dragEle.removeEventListener("dragend", handleDragEnd);
  };
  dragEle.addEventListener("dragend", handleDragEnd);

  onDragStart();
};
</script>

<template>
  <div
    :class="[
      'group relative z-10 grid h-36 place-items-center overflow-hidden rounded border border-zinc-800 text-2xl',
      isDragging && colorsMap[data.progressColor ?? 'red'],
      isDragging && '!border-transparent text-white',
    ]"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="onDragEnd"
    :style="{ flexGrow: data.time }"
  >
    {{ data.time }}s

    <div class="absolute inset-0 grid place-items-center pt-12">
      <span class="w-full max-w-32 text-center text-base">{{ data.name }}</span>
    </div>

    <div
      :style="{ transform: `translateX(${-100 + progress}%)` }"
      :class="[
        { '!bg-transparent': progress === 0 },
        colorsMap[data.progressColor ?? 'red'],
      ]"
      class="progress absolute inset-0 overflow-hidden"
    >
      <div
        :style="{ transform: `translateX(${100 - progress}%)` }"
        class="absolute inset-0 grid place-items-center text-white"
      >
        {{ data.time }}s
      </div>

      <div
        :style="{ transform: `translateX(${100 - progress}%)` }"
        class="absolute inset-0 grid place-items-center pt-12"
      >
        <span class="w-full max-w-32 text-center text-base text-white">{{
          data.name
        }}</span>
      </div>
    </div>

    <div class="absolute inset-0 grid place-items-center pt-12">
      <input
        class="w-full max-w-32 rounded-sm bg-transparent text-center text-base opacity-0 outline-none transition-opacity placeholder-shown:opacity-0 focus:opacity-100 group-hover:placeholder-shown:opacity-100"
        placeholder="Без названия"
        maxlength="15"
        :value="data.name"
        @input="handleChangeName"
      />
    </div>

    <button
      type="button"
      @click="onDelete"
      :class="[
        'group absolute right-0 top-0 rounded-sm bg-white p-[2px] text-red-500 opacity-0 transition-opacity group-hover:opacity-100',
        isDragging && '!opacity-0 !transition-none',
      ]"
    >
      <SvgImage class="size-4 group-active:scale-90" />
    </button>
  </div>
</template>

<style>
.dragging {
  @apply fixed left-[-9999px] border-none text-white;
}
</style>
