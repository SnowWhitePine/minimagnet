<template>
  <div></div>
</template>

<script>
export default {
  name: "Clear",
  mounted() {
    localStorage.removeItem("data");
    if(this.$root.data.char.type){
      window.location.reload()
    }else{
      window.location = "#/chooseChar";
    }
  },
};
</script>
