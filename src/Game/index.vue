<template>
  <div
    id="load"
    class="room-png fc"
    style="background: url('/assets/room_shop.png'); background-size: 100% 100%"
  >
    <div style="flex-grow: 1" />
    <CharBar />
    <CharPic room="game" />
    <div style="flex-grow: 24" class="fc">
      <div style="flex-grow: 4"></div>
      <div style="margin-left: auto; margin-right: auto" v-if="error">
        Ошибка: {{ error }}
      </div>
      <div style="margin-left: auto; margin-right: auto" v-else-if="success">
        <button
          class="mont dy"
          @click="run"
          style="font-size: 1.2em; padding: 0.8em 1.4em"
        >
          Начать игру
        </button>
      </div>
      <div style="margin-left: auto; margin-right: auto" v-else>
        Загрузка...
      </div>
      <div style="flex-grow: 1"></div>
    </div>
    <Navigation notext="t" />
    <div style="flex-grow: 2" />
    <div
      id="gameroot"
      style="height: 100vh; width: 100vw; overflow: hidden"
      hidden
    >
      <div
        id="game"
        style="width: 100%; height: 100vh; display: inline-block"
      ></div>
    </div>
  </div>
</template>

<script>
import prepGame from "./game";
export default {
  name: "index",
  data() {
    return {
      error: null,
      success: null,
      startGame: null,
    };
  },
  methods: {
    async run() {
      try {
        const res = await this.startGame();
        if (!res.score) {
          this.$router.back();
        }
        if(res.magnets){
          this.$root.data.magnets+=res.magnets
        }
        this.$root.data.fill.play = Date.now();
        this.$router.push({path:'/result',query:{mg:res.magnets, sc:res.score}})
      } catch (e) {
        this.success = false;
        this.error = e;
      }
    },
  },
  computed: {
    result() {
      return this.error || this.success;
    },
  },
  async mounted() {
    try {
      this.startGame = prepGame(document.getElementById("gameroot"));
      this.success = true;
    } catch (e) {
      this.success = false;
      this.error = e;
    }
  },
};
</script>
