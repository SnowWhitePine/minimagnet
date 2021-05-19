<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  font-size: 18px;
}
</style>
<style lang="scss">
@import "~vue-material/dist/theme/engine";
@include md-register-theme(
  "green-red",
  (
    primary: md-get-palette-color(lightgreen, A400),
    accent: md-get-palette-color(red, A200),
  )
);
@import "~vue-material/dist/base/theme";
@import "~vue-material/dist/components/MdProgress/theme";
@import "~vue-material/dist/components/MdChips/theme";
</style>
