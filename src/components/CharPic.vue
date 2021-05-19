<template>
  <div
    class="above-room"
    :style="
      room
        ? `position:absolute;bottom:${position.y}vh;right:${position.x}vw`
        : ''
    "
  >
    <img
      :style="room ? `width:${position.w}px;height:${position.h}px` : ''"
      :src="`/assets/char${$root.char.type}-${charDevStage}.svg`"
    />
  </div>
</template>

<script>
let ww = window.outerWidth;
let wh = window.outerHeight;
let refs = [];
window.addEventListener("resize", () => {
  ww = window.outerWidth;
  wh = window.outerHeight;
  refs.forEach((it) => it.$forceUpdate());
});
export default {
  name: "CharPic",
  props: ["room"],
  data() {
    return {};
  },
  computed: {
    position() {
      if (this.room === "study") {
        console.log({ ...this.positionStudy });
        return this.positionStudy;
      }
      return { w: 0, h: 0 };
    },
    positionStudy() {
      return {
        ...this.computePosition(6750, 12000, 10, 20),
        h: 150,
        w: 150,
      };
    },
    charDevStage() {
      return 1;
    },
  },
  methods: {
    computePosition(iw, ih, x, y) {
      const ratioReal = ww / wh;
      const ratioImg = iw / ih;
      const ratioRatio = ratioReal / ratioImg;
      if (ratioRatio > 1) {
        y = y * ((ratioRatio - 1) / 2 + 1);
      } else if (ratioRatio < 1) {
        x = x * ((ratioRatio - 1) / 2 + 1);
      }
      return {
        y,
        x,
      };
    },
  },
  mounted() {
    refs.push(this);
  },
  beforeDestroy() {
    refs.splice(refs.indexOf(this), 1);
  },
};
</script>

<style scoped></style>
