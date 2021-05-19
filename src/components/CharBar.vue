<template>
  <div class="above-room" style="display: flex; flex-direction: row">
    <div
      style="
        transform: translateX(3px);
        flex-grow: 1;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10vw;
      "
    >
      <McBar
        style="height: 1em"
        col="#A1D06A"
        :val="$root.char.progress"
      ></McBar>
    </div>
    <router-link class="undefault" style="flex-basis: 60px; margin-right: 3vw" to="/home">
      <img src="/assets/char-badge.svg" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CharBar",
};
</script>
