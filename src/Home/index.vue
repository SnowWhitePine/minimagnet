<template>
  <div
    class="room-bg fc"
    style="
      padding: 0 1vw 8vw 1vw;
      background-image: url('/assets/bg_blue_paws.svg');
    "
  >
    <div style="flex-grow: 0.5" />
    <CharBar />
    <div
      class="above-room"
      style="text-align: center; transform: translateY(-0.6em)"
    >
      <span class="md-title mont">{{ $root.char.name }}</span>
    </div>
    <div class="above-room" style="text-align: center">
      <span class="md-title mont">{{ $root.char.lvl }} уровень</span>
    </div>
    <div style="flex-grow: 1" />
    <div style="text-align: center">
      <EvoProgress />
    </div>
    <div style="flex-grow: 1" />
    <div style="text-align: center">
      <div class="vc" style="display: inline-block; font-size: 18px">У вас</div>
      <span
        class="vc"
        style="
          font-size: 1.8em;
          color: #de4354;
          margin-left: 0.6em;
          transform: translateY(calc(8px / 1.8));
          display: inline-block;
        "
      >
        <b style="">{{ $root.data.magnets }}</b>
      </span>
      <img
        class="vc"
        src="/assets/magnet.svg"
        style="height: calc(calc(1em + 16px) * 1.4); margin-left: 0.3em"
      />
      <button class="vc dy mont" @click="magnetShop" style="margin-left: 0.6em">
        Потратить
      </button>
    </div>
    <div style="flex-grow: 1" />
    <div style="text-align: center">
      <CharPic />
    </div>
    <div style="flex-grow: 1" />
    <Navigation />
    <div style="flex-grow: 2" />
  </div>
</template>

<script>
import EvoProgress from "./EvoProgress";
export default {
  name: "Home",
  components: { EvoProgress },
  methods: {
    magnetShop() {
      console.log("Unimplemented");
    },
  },
};
</script>
