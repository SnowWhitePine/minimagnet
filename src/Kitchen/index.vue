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
      <CharPic room="kitchen"/>
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
          <div style="flex-grow: 2" />
          <button
            v-for="i of apples"
            class="undefault"
            @click="eatApple"
            :key="i"
          >
            <img
              src="/assets/apple.svg"
              style="padding: 0 0.5em; height: 4em"
            />
          </button>
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
  methods: {
    eatApple() {
      if(this.$root.barFood > 50){
        this.$root.dialog = 'Я еще не проголодался'
        return
      }
      this.$root.data.magnets+=1
      this.$root.dialog = 'Уммм... вкустое яблочко'
      this.$root.data.foodLeft -= 1;
      this.$root.data.fill.food = Date.now();
      this.$root.addProgress(50);
    },
  },
  computed: {
    apples() {
      return "0"
        .repeat(this.$root.data.foodLeft)
        .split("")
        .map((_, i) => i);
    },
  },
};
</script>
