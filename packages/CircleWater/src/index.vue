<template>
  <div
    class="circle-water"
    :style="{ width: `${props.size + 18}px`, height: `${props.size + 18}px` }"
  >
    <div
      class="circle-water-per"
      :style="{
        top: `${props.size / 2 - 8}px`,
        fontSize: `${props.size > 100 ? '18px' : '14px'}`,
      }"
    >
      {{ props.perNumber + "%" }}
    </div>
    <div class="circle-water-num">{{ props.textNumber }}</div>
    <div></div>
    <canvas
      :id="'circle-water' + props.id"
      :width="props.size"
      :height="props.size"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const props = defineProps({
  perNumber: {
    type: Number,
    default: 0,
  },
  id: {
    type: Number,
    default: 0,
  },
  textNumber: {
    type: String,
    default: "",
  },
  distance: {
    type: Number,
    default: 100,
  },
  speed: {
    type: Number,
    default: 2,
  },
  wave: {
    type: Number,
    default: 20,
  },
  size: {
    type: Number,
    default: 58,
  },
});

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  mW: number,
  color: string
) => {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(mW / 2, mW / 2, mW / 2 - 1, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(mW / 2, mW / 2, mW / 2 - 2, 0, 2 * Math.PI);
  ctx.clip();
};

const drawSin = (
  ctx: CanvasRenderingContext2D,
  mW: number,
  color1: string,
  wav: number,
  dY: number
) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, mW);
  ctx.lineTo(0, dY);
  ctx.quadraticCurveTo(mW / 4, dY - wav, mW / 2, dY);
  ctx.lineTo(mW / 2, dY);
  ctx.quadraticCurveTo((mW * 3) / 4, dY + wav, mW, dY);
  ctx.lineTo(mW, mW);
  ctx.lineTo(0, mW);
  ctx.fillStyle = color1;
  ctx.fill();
  ctx.restore();
};

const init = () => {
  let canvas1 = document.getElementById(
    `circle-water${props.id}`
  ) as HTMLCanvasElement;

  let mW: number = canvas1.clientWidth;
  // 设置Canvas元素的高
  canvas1.style.height = mW.toString();
  // 设置Canvas画布的宽高
  canvas1.width = canvas1.height = mW;

  let canvas2: HTMLCanvasElement = document.createElement("canvas"),
    ctx2 = canvas2.getContext("2d") as CanvasRenderingContext2D;
  canvas2.width = mW;
  canvas2.height = mW;

  let canvas3: HTMLCanvasElement = document.createElement("canvas"),
    ctx3 = canvas3.getContext("2d") as CanvasRenderingContext2D;
  canvas3.width = mW;
  canvas3.height = mW;

  let x = 0,
    flat = 300,
    rate = props.perNumber / 100;

  let ctx1 = canvas1.getContext("2d") as CanvasRenderingContext2D;

  drawCircle(ctx1, mW, "#1a4768");
  drawSin(ctx2, mW, "#1c86d1", props.wave, mW - mW * rate);
  drawSin(ctx3, mW, "rgba(28, 134, 209, 0.5)", props.wave, mW - mW * rate);

  let rate1 = rate,
    wave1 = props.wave;

  function animation() {
    if (rate !== rate1 || wave1 !== props.wave) {
      ctx2.clearRect(0, 0, mW, mW);
      ctx3.clearRect(0, 0, mW, mW);
      rate1 = rate;
      wave1 = props.wave;
      drawSin(ctx2, mW, "#1c86d1", props.wave, mW - mW * rate);
      drawSin(ctx3, mW, "rgba(28, 134, 209, 0.5)", props.wave, mW - mW * rate);
    }

    ctx1.clearRect(0, 0, mW, mW);
    ctx1.drawImage(canvas2, x, 0, mW + flat, mW);
    ctx1.drawImage(canvas2, x - mW - flat, 0, mW + flat, mW);
    ctx1.drawImage(canvas3, x + props.distance, 0, mW + flat, mW);
    ctx1.drawImage(canvas3, x - mW + props.distance - flat, 0, mW + flat, mW);
    x >= mW - props.speed + flat ? (x = 0) : (x += props.speed);
    requestAnimationFrame(animation);
  }
  animation();
};
onMounted(() => {
  init();
});
</script>
<style lang="less" scoped>
.circle-water {
  width: 76px;
  height: 76px;
  border: 1px solid #00abff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: auto;
  position: relative;
  font-size: 12px;
  &-per {
    position: absolute;
    top: 20px;
    color: rgba(0, 255, 255, 1);
  }
  &-num {
    position: absolute;
    top: 46px;
    color: #fff;
  }
}
</style>
