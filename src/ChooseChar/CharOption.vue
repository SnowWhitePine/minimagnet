<template>
  <div style="width: 100%; padding: 2vh 2vw" class="vc">
    <button style="width: 100%" @click="doname" class="surrounding fr">
      <img
        :src="`/assets/char${id}-1.svg`"
        :style="`width: unset; height: 20vh;z-index:100`"
      />
      <div style="width: 80%" class="fc">
        <div style="flex-grow: 1" />
        <div class="ycard" style="transform: translateX(-30px)">
          <span style="margin-left: 30px"> Тип {{ id }}... </span>
        </div>
        <div style="flex-grow: 1" />
      </div>
    </button>
    <form
      novalidate
      class="md-layout fr ycard"
      style="padding: 0px 2px; margin-top: 2vh"
      @submit.prevent="sel"
      v-if="selected === id"
    >
      <md-field style="margin-left: 10px; margin-right: 10px">
        <label>Придумай и напиши имя</label>
        <md-input v-model="name" maxlength="64" ref="input" />
      </md-field>
    </form>
    <button
      ref="btn"
      class="dy"
      style="margin-top: 2vh; min-width: 40%"
      @click="sel"
      v-if="selected === id"
    >
      Начать
    </button>
  </div>
</template>

<script>
export default {
  name: "CharOption",
  props: ["id", "selected"],
  data() {
    return {
      name: "",
    };
  },
  methods: {
    doname() {
      this.$emit("selectchar", this.id);
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.$el.focus();
        }
        if (this.$refs.btn) {
          this.$refs.btn.scrollIntoView({ block: "end" });
        }
      });
    },
    sel() {
      this.$root.data.char.type = this.id;
      this.$root.data.char.name = this.name;
      this.$root.data.state = 2;
      this.$router.replace("/");
    },
  },
  computed: {
    isSelected() {
      return this.selected === this.id;
    },
    descr() {
      if (this.id === 0) {
        return "???";
      }
      return "Этот персонаж ...";
    },
  },
};
</script>
