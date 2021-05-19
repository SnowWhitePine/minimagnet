<template>
  <div
    v-if="!results"
    id="load"
    class="room-png fc"
    style="background: url('/assets/room_shop.png'); background-size: 100% 100%"
  >
      <div style="flex-grow: 1" />
      <CharBar />
      <div style="flex-grow: 24" class="fc">
          <div style="flex-grow: 1"></div>
          <div style="margin-left: auto; margin-right: auto" v-if="error">
            Ошибка: {{ error }}
          </div>
          <div
            style="margin-left: auto; margin-right: auto"
            v-else-if="success"
          >
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
  <div v-else>
    <md-toolbar :md-elevation="1">
      <span class="md-title">Результаты:</span>
    </md-toolbar>
    <md-list class="md-double-line" md-theme="green-red">
      <md-list-item v-if="results.quests">
        <md-icon
          class="md-primary"
          style="color: var(--md-theme-green-red-primary)"
          >check</md-icon
        >
        <div class="md-list-item-text">
          <span
            >Заданий выполнено:
            <b style="color: var(--md-theme-green-red-primary)">{{
              results.quests
            }}</b></span
          >
        </div>
      </md-list-item>
      <md-list-item v-if="results.score">
        <md-icon
          class="md-primary"
          style="color: var(--md-theme-green-red-primary)"
          >check</md-icon
        >
        <div class="md-list-item-text">
          <span
            >Очков собрано:
            <b style="color: var(--md-theme-green-red-primary)">{{
              results.score
            }}</b></span
          >
        </div>
      </md-list-item>
      <md-list-item v-if="results.growth">
        <md-icon
          class="md-primary"
          style="color: var(--md-theme-green-red-primary)"
          >check</md-icon
        >
        <div class="md-list-item-text">
          <span
            >Магнитенок вырос на:
            <b style="color: var(--md-theme-green-red-primary)">{{
              results.growth
            }}</b></span
          >
        </div>
      </md-list-item>
    </md-list>
    <br />
    <md-button class="md-raised" @click="back" style="margin-left: 2vw"
      >Вернуться в комнату</md-button
    >
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
      results: null,
    };
  },
  methods: {
    async run() {
      try {
        const res = await this.startGame();
        this.results = res;
        if (!res.score) {
          this.back();
        }
        if (res.quests >= 2) {
          res.growth = 3;
        }
      } catch (e) {
        this.success = false;
        this.error = e;
      }
    },
    back() {
      if (this.results.growth) {
        this.$root.addProgress(this.results.growth);
      }
      this.$router.back();
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
