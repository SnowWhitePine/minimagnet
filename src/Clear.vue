<template>
<div></div>
</template>

<script>
export default {
  name: "Clear",
  mounted(){
    localStorage.removeItem("data")
    window.location.reload()
  }
}
</script>