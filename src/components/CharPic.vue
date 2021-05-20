<template>
  <div>
    <div v-if="$root.dialog"
         class="ycard mont"
        :style="dialogPosition">
      {{$root.dialog}}
    </div>
    <div
        :style="position"
    >
      <img @click="$root.addProgress(100)"
          :style="`height:${h||'100%'};width:${w||'100%'}`"
          :src="`/assets/char${$root.char.type}-${charDevStage}.svg`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CharPic",
  props: ["room", 'h','w','dialog'],
  data() {
    return {
      rmDialogTimeout: null
    };
  },
  computed: {
    position() {
      if(!this.room){
        return ''
      }if(this.room==='kitchen'){
        if(this.charDevStage===1){
          return 'position:absolute;top: calc(59vh - 120px);height:120px;left:calc(50vw - 85px)'
        }if(this.charDevStage===2){
          return 'position:absolute;top: calc(80vh - 220px);height:220px;left:0'
        }if(this.charDevStage===3){
          return 'position:absolute;top: calc(80vh - 270px);height:270px;left:0'
        }
      }if(this.room==='game'){
        if(this.charDevStage===1){
          return 'position:absolute;top: calc(55vh - 120px);height:120px;right:20px'
        }if(this.charDevStage===2){
          return 'position:absolute;top: calc(80vh - 220px);height:220px;right:10px'
        }if(this.charDevStage===3){
          return 'position:absolute;top: calc(80vh - 270px);height:270px;right:10px'
        }
      }if(this.room==='study'){
        if(this.charDevStage===1){
          return 'position:absolute;top: calc(80vh - 120px);height:120px;right:7vw'
        }if(this.charDevStage===2){
          return 'position:absolute;top: calc(94vh - 220px);height:220px;right:100px'
        }if(this.charDevStage===3){
          return 'position:absolute;top: calc(94vh - 270px);height:270px;right:100px'
        }
      }
      return 'display:none'
    },
    dialogPosition(){
      const txtApprH = this.$root.dialog ? Math.ceil(this.$root.dialog.length/50)+'em' : 0
      if(this.dialog===false){
        return 'display:none'
      }if(this.room==='kitchen'){
        if(this.charDevStage===1){
          return `position:absolute;top: calc(59vh - calc(190px + ${txtApprH}));right:10vw`
        }if(this.charDevStage===2){
          return `position:absolute;top: calc(80vh - calc(290px + ${txtApprH}));left:0`
        }if(this.charDevStage===3){
          return `position:absolute;top: calc(80vh - calc(340px + ${txtApprH}));left:0`
        }
      }if(this.room==='game'){
        if(this.charDevStage===1){
          return `position:absolute;top: calc(55vh - calc(190px + ${txtApprH}));right:30px`
        }if(this.charDevStage===2){
          return `position:absolute;top: calc(80vh - calc(290px + ${txtApprH}));right:20px`
        }if(this.charDevStage===3){
          return `position:absolute;top: calc(80vh - calc(340px + ${txtApprH}));right:20px`
        }
      }
      return ''
    },
    charDevStage() {
      return this.$root.data.char.lvl >= 100 ? 3 : this.$root.data.char.lvl >= 50 ? 2 : 1;
    },
  },
  watch:{
    '$root.dialog':function(mew){
      clearTimeout(this.rmDialogTimeout)
      this.rmDialogTimeout = setTimeout(()=>{
        this.rmDialogTimeout = null
        this.$root.dialog = null
      },10000)
    }
  }
};
</script>

<style scoped></style>
