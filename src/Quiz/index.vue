<template>
  <div id="room_quiz">
    <div
      class="room-png"
      v-if="!category"
      :style="`background-image: url('/assets/room_study_${Math.floor($root.data.studyStage/2)+1}_${$root.data.studyStage%2}.png');background-size:100% 100%`"
    >
      <button class="undefault"
              title="Мир"
              :style="btnRect(40,260,228,451)"
            @click="study('Мир',0)">
      </button>
      <button
          class="undefault"
              title="Космос"
              :style="btnRect(248,312,332,451)"
              @click="study('Космос',2)">
      </button>
      <div style="height:100vh" class="fc">
        <div style="flex-grow: 1" />
        <CharBar />
        <div style="flex-grow: 24" />
        <Navigation notext="t" />
        <div style="flex-grow: 2" />
      </div>
      <CharPic room="study"/>
    </div>
    <Quiz v-else :qq="questions" />
  </div>
</template>

<script>
import Quiz from "./Quiz";
export default {
  name: "QuizParent",
  components: { Quiz },
  data() {
    return {
      category: null,
      categories: ["Космос", "Мир"],
    };
  },
  computed: {
    questions() {
      return QQ[this.category];
    },
    rows() {
      let res = [];
      for (let i = 0; i < this.categories.length; ++i) {
        if (!(i % 3)) {
          res.push([]);
        }
        res[res.length - 1].push(this.categories[i]);
      }
      return res;
    },
  },
  methods:{
    study(theme, stage){
      if(stage===this.$root.data.studyStage+1){
        this.$root.data.studyStage+=1
      }else if(stage<=this.$root.data.studyStage){
        this.category = theme
      }
    },
    btnRect(x0,y0,x1,y1){
      return `position:absolute;left:${100*x0/800}vw;top:${100*y0/1422}vh;width:${100*(x1-x0)/800}vw;height:${100*(y1-y0)/1422}vh;`
    }
  }
};

const QQ = {
  Космос: [
    {
      body: [
        {
          t: "t",
          c: "Третья планета от Солнца?",
        },
      ],
      a: {
        t: "v",
        v: ["Меркурий", "Земля", "Венера", "Марс"],
        c: "Земля",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "Падающая звезда на самом деле это.. ",
        },
      ],
      a: {
        t: "v",
        v: ["Метеор", "Спутник", "космический мусор", "НЛО"],
        c: "Метеор",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "Больше всего спутников у ",
        },
      ],
      a: {
        t: "v",
        v: ["Марса", "Сатурна", "Юпитера", "Нептуна"],
        c: "Юпитера",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "Полярные сияния - это ",
        },
      ],
      a: {
        t: "v",
        v: [
          "Метеорный поток",
          "Отражение света городов",
          "Хвост кометы",
          "Солнечный ветер",
        ],
        c: "Солнечный ветер",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "Приливы и отливы возникают на Земле из-за ",
        },
      ],
      a: {
        t: "v",
        v: [
          "Землетрясений",
          "Притяжения Солнца",
          "Притяжения Луны",
          "Притяжения Земли",
        ],
        c: "Притяжения Луны",
      },
    },
  ],
  Мир: [
    {
      body: [
        {
          t: "t",
          c: "Что из перечисленного не овощ и не фрукт?",
        },
      ],
      a: {
        t: "v",
        v: ["Арбуз", "Помидор", "Яблоко", "Ананас"],
        c: "Арбуз",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "Какая птица не является перелетной, и остаётся зимовать, донимая своим стуком всю зиму жителей леса?",
        },
      ],
      a: {
        t: "v",
        v: ["Дятел", "Ласточка", "Соловей", "Скворец"],
        c: "Дятел",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "Чем занимаются домашние кошки большую часть жизни?",
        },
      ],
      a: {
        t: "v",
        v: ["Спят", "Играют", "Мурлычат", "Едят"],
        c: "Спят",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "Где вода соленая?",
        },
      ],
      a: {
        t: "v",
        v: ["Река", "Болото", "Ручей", "Море"],
        c: "Море",
      },
    },
  ],
};
</script>

<style>
#room_quiz .md-card {
  background: #ffffffaa;
}
</style>
