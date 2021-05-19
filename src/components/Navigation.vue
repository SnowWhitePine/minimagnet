<template>
  <div class="fr">
    <router-link
      class="fc hc"
      style="color: inherit; text-decoration: none"
      to="/kitchen"
    >
      <div
        v-if="!notext"
        class="hc"
        style="font-size: 1.2em; margin-bottom: 0.5em"
      >
        Запасы
      </div>
      <img src="/assets/eat.svg" style="height: 66px; margin-bottom: 0.3em" />
      <McBar style="height: 0.8em" :val="$root.barFood"></McBar>
    </router-link>
    <router-link
      class="surrounding fc hc"
      style="color: inherit; text-decoration: none"
      to="/quiz"
    >
      <div
        v-if="!notext"
        class="hc"
        style="font-size: 1.2em; margin-bottom: 0.5em"
      >
        Учиться
      </div>
      <img src="/assets/learn.svg" style="height: 66px; margin-bottom: 0.3em" />
      <McBar style="height: 0.8em" :val="$root.barStudy"></McBar>
    </router-link>
    <router-link
      class="surrounding fc hc"
      style="color: inherit; text-decoration: none"
      to="/game"
    >
      <div
        v-if="!notext"
        class="hc"
        style="font-size: 1.2em; margin-bottom: 0.5em"
      >
        Играть
      </div>
      <img src="/assets/play.svg" style="height: 66px; margin-bottom: 0.3em" />
      <McBar style="height: 0.8em" :val="$root.barPlay"></McBar>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: ["notext"],
};
</script>
