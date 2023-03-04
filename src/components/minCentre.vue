<template>
  <div class="min-centre">
    <div v-for="(row, y) in state" :key="y" class="row-btn">
      <button
        ref="btnRef"
        v-for="(block, x) in row"
        :key="x"
        @click="btnCLick($event, block)"
        :style="{
          color: getBlockColor(block),
          backgroundColor: getBGC(block),
        }"
        @contextmenu.prevent="onRightClick(block)"
      >
        <template v-if="block.flagged">
          <div>👌</div>
        </template>
        <template v-else-if="block.revealed || dev">
          <div v-if="block.mine">
            <!-- <MinIcon></MinIcon> -->
            <div>💀</div>
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
import { ref } from "vue";

let mineGenerated = false;
let dev = false;
function onRightClick(block: BlockState) {
  if (block.revealed) return;
  block.flagged = !block.flagged;
  checkGame();
}
function btnCLick(e: MouseEvent, block: BlockState) {
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
  checkGame();
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

const state = ref(
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
  for (const raw of state.value) {
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
  state.value.forEach((raw, y) => {
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
const btnRef = ref();
// 颜色快
function getBlockColor(block: BlockState) {
  // 没翻拍，默认没样式
  if (!block.revealed) {
    return "";
  }
  // if(block.flagged)
  return block.mine ? "#fff" : numberColor[block.adjacentMines];
}
// 背景色
function getBGC(block: BlockState) {
  if (block.flagged) {
    return "rgba(125, 125, 125, .6)";
  }
  if (!block.revealed) {
    return "rgba(125, 125, 125, .6)";
  }
  return block.mine ? "#471818" : "transparent";
}

function getSiblings(block: BlockState) {
  return directions
    .map(([dx, dy]) => {
      const x2 = block.x + dx;
      const y2 = block.y + dy;
      if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) {
        return undefined;
      }
      return state.value[y2][x2];
    })
    .filter(Boolean) as BlockState[];
}

function checkGame() {
  const blocks = state.value.flat();
  if (blocks.every((block) => block.revealed || block.flagged)) {
    if (blocks.some((block) => block.flagged && !block.mine)) {
      alert("cheat");
    } else {
      alert("win!");
    }
  }
}
</script>

<style lang="less" scoped>
.min-centre {
  padding-top: 100px;
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
    // border: 1px solid #ffffff;
    border: 1px solid #2e2e2e;
    color: #fff;
    &:hover {
      background-color: rgb(159, 201, 201) !important;
    }
  }
}
</style>
