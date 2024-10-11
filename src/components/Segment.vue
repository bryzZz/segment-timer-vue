<script setup lang="ts">
import { Segment } from "../types";

const { data, progress, onChangeName } = defineProps<{
  data: Segment;
  progress: number;
  onChangeName: (value: string | undefined) => void;
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
</script>

<template>
  <div
    class="group relative grid h-36 place-items-center overflow-hidden rounded text-2xl ring-[1px] ring-zinc-800 ring-offset-[0px]"
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
      class="absolute inset-0 overflow-hidden"
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
  </div>
</template>
