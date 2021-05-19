<template>
  <div
    style="
      width: 100%;
      height: 100%;
      border: 1px solid white;
      background: #bbbbbb;
    "
  >
    <div :style="`height: 100%;width:${value}%;background:${color}`"></div>
  </div>
</template>

<script>
export default {
  name: "McBar",
  props: ["val", "maxValue", "col"],
  computed: {
    value() {
      return this.maxValue ? (this.val / this.maxValue) * 100 : this.val;
    },
    color() {
      if (this.col) {
        return this.col;
      }
      return this.value >= 70
        ? "#A1D06A"
        : this.value >= 25
        ? "#FECD54"
        : "#8F7BB8";
    },
  },
};
</script>
