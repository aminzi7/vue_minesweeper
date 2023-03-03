<template>
  <div class="min-centre">
    <div class="tt">hovber</div>
    <div v-for="(row, y) in state" :key="y">
      <button
        v-for="(item, x) in row"
        :key="x"
        @click="btnCLick(x, y)"
        :style="{
          color: getBlockColor(item),
          backgroundColor: item.mine ? '#471818' : 'transparent',
        }"
      >
        <div v-if="item.mine">
          <MinIcon></MinIcon>
        </div>
        <div v-else>
          {{ item.adjacentMines }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MinIcon from "@/components/minIcone.vue";
function btnCLick(x: number, y: number) {
  console.log(x, y, "-", x * y);
}

interface BlockState {
  x: number;
  y: number;
  mine?: boolean;
  flagged?: boolean;
  adjacentMines: number;
}

const WIDTH = 10;
const HEIGHT = 10;
const state = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from(
      { length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
      })
    )
  )
);

function generateMines() {
  for (const raw of state) {
    for (const block of raw) {
      block.mine = Math.random() < 0.3;
    }
  }
}

const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

function updateNumbers() {
  state.forEach((raw, y) => {
    raw.forEach((block, x) => {
      if (block.mine) return;
      directions.forEach(([dx, dy]) => {
        const x2 = x + dx;
        const y2 = y + dy;
        if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) {
          return;
        }
        if (state[y2][x2].mine) block.adjacentMines += 1;
      });
    });
  });
}
const numberColor = [
  "transparent",
  "green",
  "aquamarine",
  "yellow",
  "darkgoldenrod",
  "chartreuse",
  "indianred",
  "khaki",
  "cyan",
];
// 颜色快
function getBlockColor(block: BlockState) {
  return block.mine ? "#fff" : numberColor[block.adjacentMines];
}

generateMines();
updateNumbers();
</script>

<style lang="less" scoped>
.min-centre {
  .imge {
    width: 20px;
    height: 20px;
    vertical-align: top;
    color: #471818;
  }
  color: #fff;
  .tt {
    &:hover {
      background-color: aqua;
    }
  }
  button {
    width: 40px;
    height: 40px;
    padding: 0;
    background-color: transparent;
    border: 1px solid #ffffff;
    color: #fff;
    &:hover {
      background-color: rgb(134, 148, 148) !important;
    }
  }
}
</style>
