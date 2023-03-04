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
        <template v-if="block.revealed || dev">
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

let mineGenerated = false;
let dev = true;
function btnCLick(block: BlockState) {
  if (!mineGenerated) {
    generateMines(block);
    mineGenerated = true;
  }
  // 记录没翻拍
  block.revealed = true;
  if (block.mine) {
    alert("BOOOOOM!");
  }
  expendZ(block);
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

function generateMines(init: BlockState) {
  for (const raw of state) {
    for (const block of raw) {
      // 一开始确保点不了炸弹,边缘判断
      if (Math.abs(init.x - block.x) <= 1) continue;
      if (Math.abs(init.y - block.y) <= 1) continue;
      block.mine = Math.random() < 0.2;
    }
  }
  updateNumbers();
}

function expendZ(block: BlockState) {
  if (block.adjacentMines) return;

  getSiblings(block).forEach((s) => {
    // 翻拍
    if (!s.revealed) {
      s.revealed = true;
      expendZ(s);
    }
  });
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
      getSiblings(block).forEach((b) => {
        if (b.mine) block.adjacentMines += 1;
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

// generateMines();
// updateNumbers();

function getSiblings(block: BlockState) {
  return directions
    .map(([dx, dy]) => {
      const x2 = block.x + dx;
      const y2 = block.y + dy;
      if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) {
        return undefined;
      }
      return state[y2][x2];
    })
    .filter(Boolean) as BlockState[];
}
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
