<template>
  <div
    id="hello"
    v-if="state < 4"
    class="fc mont"
    style="background: url('/assets/bg_green_paws.svg'); height: 100vh"
  >
    <div
      v-if="state === 1"
      class="ycard fc vc hc"
      style="padding: 20px 12px; width: 86%"
    >
      <h3 style="text-align: center; margin-top: 0">Привет!</h3>
      <div style="flex-grow: 1; min-height: 70px">текст...</div>
      <div style="text-align: center">
        <button class="undefault dy" @click="toState(2)">
          <b>Регистрация</b>
        </button>
      </div>
    </div>
    <div
      v-else-if="state === 2"
      class="fc vc hc"
      style="padding: 20px 12px; width: 86%"
    >
      <h3 style="text-align: center; margin-top: 0">Как тебя зовут?</h3>
      <br />
      <form
        novalidate
        class="md-layout fr ycard"
        style="padding: 0px 2px; margin-top: 2vh"
        @submit.prevent="setName"
      >
        <md-field style="margin-left: 10px; margin-right: 10px">
          <label>Напиши свое имя</label>
          <md-input v-model="name" maxlength="64" ref="usernameInput" />
        </md-field>
      </form>
      <br />
      <div style="text-align: center">
        <button class="undefault dy" @click="toState(3)" ref="usernameNext">
          <b>Далее</b>
        </button>
      </div>
    </div>
    <div
      v-else-if="state === 3"
      class="fc vc hc"
      style="padding: 20px 12px; width: 86%"
    >
      <h3 style="text-align: center; margin-top: 0">Сколько тебе лет?</h3>
      <br />
      <div class="fr">
        <button
          class="btn-age-select"
          @click="
            $root.data.user.age = '7-';
            toState(4);
          "
        >
          до 7
        </button>
        <div style="flex-grow: 1"></div>
        <button
          class="btn-age-select"
          @click="
            $root.data.user.age = '8-10';
            toState(4);
          "
        >
          8-10
        </button>
        <div style="flex-grow: 1"></div>
        <button
          class="btn-age-select"
          @click="
            $root.data.user.age = '11+';
            toState(4);
          "
        >
          11+
        </button>
      </div>
    </div>
  </div>
  <div
    id="choice"
    v-else
    style="background: url('/assets/bg_green_paws.svg'); height: 100vh"
  >
    <CharOption :id="1" :selected="selected" @selectchar="selectChar" />
    <CharOption :id="2" :selected="selected" @selectchar="selectChar" />
    <CharOption :id="3" :selected="selected" @selectchar="selectChar" />
  </div>
</template>

<script>
import CharOption from "./CharOption";
export default {
  name: "Choice",
  components: { CharOption },
  data() {
    return {
      state: 1,
      selected: 0,
      name: "",
    };
  },
  methods: {
    toState(s) {
      this.state = s;
      if (s === 2) {
        this.$nextTick(() => {
          this.$refs.usernameInput.$el.focus();
          this.$refs.usernameNext.scrollIntoView();
        });
      }
    },
    setName() {
      this.$root.data.user.name = this.name;
    },
    selectChar(id) {
      this.selected = id;
    },
  },
  beforeRouteLeave(to, from, proceed) {
    if (this.$root.data.char.type) {
      proceed();
    }
  },
};
</script>

<style>
button.btn-age-select {
  background: #fff7cd;
  border: 3px solid white;
  border-radius: 10px;
  padding: 20px 12px;
  flex-basis: 30%;
  text-align: center;
  padding: 1em 0.6em;
}
</style>
