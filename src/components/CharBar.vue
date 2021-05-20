<template>
  <div>
    <div style="display: flex; flex-direction: row">
      <div
          style="
        transform: translateX(3px);
        flex-grow: 1;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 5vw;
      "
      >
        <McBar style="height: 1em" col="#A1D06A" :val="barVal"></McBar>
      </div>
      <router-link
          class="undefault"
          style="flex-basis: 60px; margin-right: 3vw"
          to="/home"
      >
        <img src="/assets/char-badge.svg" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CharBar",
  data(){
    return {
      settingsOpen:false
    }
  },
  computed: {
    barVal() {
      return Math.round(
        (this.$root.barFood + this.$root.barPlay + this.$root.barStudy) / 3
      );
    },
  },
  methods:{
    doSettings(){
      if(!this.settingsOpen){
        this.settingsOpen = true
        window.addEventListener('click',this.closeSettings)
      }else{
        this.closeSettings()
      }
    },
    closeSettings(){
      window.removeEventListener('click',this.closeSettings)
      this.settingsOpen = false
    }
  }
};
</script>
