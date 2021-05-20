import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import Kitchen from "./Kitchen";
import KitchenScan from "./Kitchen/Scan";
import Game from "./Game";
import Quiz from "./Quiz";
import ChooseChar from "./ChooseChar";
import Home from "./Home";
import Clear from "./Clear";
import Result from "./Result";
import CharPic from "./components/CharPic";
import McBar from "./components/McBar";
import Navigation from "./components/Navigation";
import CharBar from "./components/CharBar";
import VueQrcodeReader from "vue-qrcode-reader";
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './main.scss'
import {MdButton, MdCard, MdRipple, MdField, MdProgress, MdChips, MdToolbar, MdList} from 'vue-material/dist/components'
import merge from 'deepmerge'
// import _ from 'lodash';
//
// window._ = _

Vue.config.productionTip = false;
Vue.prototype.llog = console.log

Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdRipple)
Vue.use(MdField)
Vue.use(MdProgress)
Vue.use(MdChips)
Vue.use(MdToolbar)
Vue.use(MdList)

Vue.use(VueRouter)
Vue.use(VueQrcodeReader);

Vue.component('CharPic', CharPic)
Vue.component('McBar',McBar)
Vue.component('Navigation',Navigation)
Vue.component('CharBar',CharBar)

const router = new VueRouter({
  routes:[
    {path:'/kitchen',component:Kitchen},
    {path:'/kitchen/scan',component:KitchenScan},
    {path:'/game',component:Game},
    {path:'/quiz',component:Quiz},
    {path:'/chooseChar',component:ChooseChar},
    {path:'/home',component:Home},
    {path:'/clear',component:Clear},
    {path:'/result',component:Result},
    {path:'/',component:Home},
  ]
})

window.app = new Vue({
  render: (h) => h(App),
  router,
  data(){
    let data = {
      state:1,
      user:{
        name:'',
        age: ''
      },
      char:{
        type: 0,
        state: 1,
        name: '',
        lvl: 1,
        progress: 0,
      },
      fill:{
        food:0,
        study:0,
        play:0,
      },
      studyStage:0,
      foodLeft: 2,
      magnets: 0
    }
    data = merge(data, JSON.parse(localStorage.getItem("data") || '{}'))
    return {
      data,
      dialog:null,
      fillRecompute:true
    }
  },
  computed:{
    char(){
      return this.data.char
    },
    barFood() {
      this.fillRecompute
      return this.toPctLeft(this.data.fill.food);
    },
    barStudy() {
      this.fillRecompute
      return this.toPctLeft(this.data.fill.study);
    },
    barPlay() {
      this.fillRecompute
      return this.toPctLeft(this.data.fill.play);
    },
  },
  methods:{
    toPctLeft(lastRefill){
      return Math.round(Math.max(0, lastRefill + 1000*60*12 - Date.now())/(10*60*12));
    },
    addProgress(n){
      const pr = this.data.char.progress + n
      if(pr>=100){
        this.data.char.lvl += Math.floor(pr/100)
        this.data.char.progress = pr%100
        return
      }
      this.data.char.progress = pr
    }
  },
  watch:{
    data:{
      handler(mew){
        localStorage.setItem("data",JSON.stringify(mew))
      },
      deep:true
    }
  },
  mounted(){
    if(this.data.state===1){
      if(this.$route.path!=='/chooseChar'){
        this.$router.replace('/chooseChar')
      }
    }else if(this.data.state===2){
      if(this.$route.path==='/' || this.$route.path==='/chooseChar'){
        this.$router.replace('/home')
      }
    }
    setInterval(()=>{
      this.fillRecompute = !this.fillRecompute
    },1000)
  }
})
window.app.$mount("#app");
