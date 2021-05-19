<template>
  <div id="room_quiz">
    <div
      class="room-bg"
      v-if="!category"
      style="padding: 2vh 0; background-image: url('/assets/bg_white_paws.svg')"
    >
      <div v-for="(row, i) of rows" :key="i" style="width: 100%" class="fr">
        <button
          class="surrounding"
          v-for="it of row"
          :key="it"
          style="flex-basis: 30%; margin-left: 1.5%; margin-right: 1.5%"
          @click="category = it"
        >
          <md-card style="width: 30vw; height: 100%" md-with-hover>
            <md-ripple>
              <md-card-header
                class="md-title"
                style="padding-top: 8px; padding-bottom: 8px"
                >{{ it }}</md-card-header
              >
            </md-ripple>
          </md-card>
        </button>
      </div>
    </div>
    <Quiz v-else :qq="questions" />
    <div
      class="above-room"
      style="position: absolute; bottom: 13vh; right: 10vw"
    ></div>
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
      categories: ["Проверка", "Физика", "Математика"],
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
};

const QQ = {
  Физика: [
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
  ],
  Математика: [
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
  ],
  Проверка: [
    {
      body: [
        {
          t: "i",
          c: "/cart/src/assets/cart.png",
        },
        {
          t: "t",
          c: "Это тележка?",
        },
      ],
      a: {
        t: "v",
        v: ["Да", "Нет", "Не знаю"],
        c: "да",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
      },
    },
    {
      body: [
        {
          t: "t",
          c: "2*2=?",
        },
      ],
      a: {
        t: "v",
        v: ["1", "2", "4", "6"],
        c: "4",
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
