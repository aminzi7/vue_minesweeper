<template>
  <div class="min-centre">
    <div v-for="(row, y) in state" :key="y" class="row-btn">
      <button
        v-for="(block, x) in row"
        :key="x"
        @click="btnCLick(block)"
        :style="{
          color: getBlockColor(block),
          backgroundColor: getBGC(block),
        }"
      >
        <template v-if="block.revealed">
          <div v-if="block.mine">
            <MinIcon></MinIcon>
          </div>
          <div v-else>
            {{ block.adjacentMines }}
          </div>
        </template>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MinIcon from "@/components/minIcone.vue";

function btnCLick(block: BlockState) {
  // 记录没翻拍
  block.revealed = true;
}

interface BlockState {
  x: number;
  y: number;
  mine?: boolean;
  flagged?: boolean;
  adjacentMines: number;
  revealed: boolean;
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
        revealed: false,
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
  // 没翻拍，默认没样式
  if (!block.revealed) {
    return "";
  }
  return block.mine ? "#fff" : numberColor[block.adjacentMines];
}
// 背景色
function getBGC(block: BlockState) {
  if (!block.revealed) {
    return "";
  }
  return block.mine ? "#471818" : "transparent";
}

generateMines();
updateNumbers();
</script>

<style lang="less" scoped>
.min-centre {
  .row-btn {
    display: flex;
    justify-content: center;
  }
  .imge {
    width: 20px;
    height: 20px;
    vertical-align: top;
    color: #471818;
  }
  color: #fff;

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
