<template>
  <div id="room_kitchen">
    <div
      class="room-png fc"
      style="
        background-image: url('/assets/room_kitchen.png');
        background-size: 100% 100%;
      "
    >
      <div style="flex-grow: 1" />
      <CharBar />
      <div style="flex-grow: 24" />
      <Navigation notext="t" />
      <div style="flex-grow: 2" />
      <div
        style="
          position: absolute;
          top: calc(59vh - 4em);
          padding: 0 5%;
          width: 100%;
        "
        class="fr"
      >
        <div style="flex-basis: 80%" class="fr">
          <div style="flex-grow: 1" />
          <img
            v-if="$root.foodLeft > 0"
            src="/assets/apple.svg"
            style="padding: 0 0.5em; height: 4em"
          />
          <img
            v-if="$root.foodLeft > 1"
            src="/assets/apple.svg"
            style="padding: 0 0.5em; height: 4em"
          />
          <img
            v-if="$root.foodLeft > 2"
            src="/assets/apple.svg"
            style="padding: 0 0.5em; height: 4em"
          />
          <div style="flex-grow: 1" />
        </div>
        <router-link class="undefault" to="/kitchen/scan" style="flex-grow: 1">
          <img src="/assets/scan_initiate.svg" style="height: 5em" class="hc" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Kitchen",
  mounted() {
    this.$el.scrollIntoView({ block: "bottom" });
  },
};
</script>
