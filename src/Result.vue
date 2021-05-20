<template>
  <div
      class="room-bg mont fc"
      style="background-image: url('/assets/bg_white_paws.svg')"
  >
    <div style="flex-grow: 1"></div>
  <div class="ycard hc" style="width:86%">
    <div v-for="it of results" :key="it.n" class="fr" style="width:100%;margin:5px 0">
      <div style="width:32px">
        <md-icon v-if="it.t==='+'"
                 style="color: #22bb22"
        >check</md-icon>
        <md-icon v-else
                 style="color: #bb2222"
        >close</md-icon>
      </div>
      <div class="vc" style="flex-grow: 1">{{it.n}}:</div>
      <div class="vc" style="font-weight: 700;font-size:1.2em">{{it.v}}</div>
    </div>
  </div>
  <button class="dy hc" style="width:86%;margin-top:10vh" @click="proceed">Вернуться</button>
  <div style="flex-grow: 1"></div>
</div>
</template>

<script>
export default {
  name: "Result",
  computed:{
    results(){
      const res = []
      for(let p of Object.getOwnPropertyNames(this.$route.query)){
        if(this.$route.query[p]==='0'){
          continue
        }
        if(DICT[p]){
          res.push({
            ...DICT[p],
            v: this.$route.query[p]
          })
        }
      }
      return res
    }
  },
  methods:{
    proceed(){
      this.$router.replace(this.$route.params.next || '/home')
    }
  }
}
const DICT = {
  mg:{
    t:'+',
    n:'Магнитов получено'
  },
  sc:{
    t:'+',
    n:'Очков получено'
  },
  ac:{
    t:'+',
    n:'Правильных ответов'
  },
  ai:{
    t:'-',
    n:'Неправильных ответов'
  },
}
</script>