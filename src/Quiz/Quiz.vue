<template>
  <div
    class="room-bg mont"
    style="background-image: url('/assets/bg_green_paws.svg')"
    v-if="q"
  >
    <div
      style="
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 2vh;
      "
    >
      <div style="width: 100%; height: 40px">
        <button
          class="surrounding"
          style="margin-left: calc(100% - 30px)"
          @click="end"
        >
          <md-icon style="transform: scale(2)">close</md-icon>
        </button>
      </div>
      <div :style="`text-align:center;width:100%`">
        <svg v-for="(it, i) of progress" :key="i" height="1.2em" width="1.2em">
          <circle
            v-if="!(i % 2)"
            cx="0.6em"
            cy="0.6em"
            r="0.6em"
            stroke="#ffffff"
            stroke-width="1"
            :fill="it ? '#A1D469' : '#aaaaaa'"
          />
          <rect
            v-if="i % 2"
            width="1.2em"
            height="0.6em"
            y="0.3em"
            stroke="#ffffff"
            stroke-width="1"
            :fill="it ? '#A1D469' : '#aaaaaa'"
          ></rect>
        </svg>
      </div>
      <div
        class="ycard"
        style="
          margin-top: calc(2vh + 24px);
          font-size: 1.2em;
          padding-top: 0;
          padding-bottom: 0;
        "
      >
        <div
          style="
            background: url('/assets/question_header.svg') no-repeat center;
            width: 195px;
            height: 48px;
            text-align: center;
            transform: translateY(-24px);
          "
          class="fc hc"
        >
          <div style="flex-grow: 1" />
          <div class="vc">Вопрос {{ initiated.size }}</div>
          <div style="flex-grow: 1" />
        </div>
        <div style="transform: translateY(-16px)">
          <div
            v-for="(it, i) of q.body"
            :key="i"
            :style="`margin-top:${i ? 8 : 0}px`"
          >
            <div v-if="it.t === 't'" style="font-weight: 700" v-text="it.c" />
            <img v-else-if="it.t === 'i'" :src="it.c" style="max-width: 80%" />
          </div>
        </div>
      </div>
      <br />
      <div style="padding: 4px 8px">
        <form
          v-if="q.a.t === 'v' && q.a.v.length <= 4"
          @submit.prevent="answer"
          style="text-align: center"
        >
          <div
            v-for="(it, i) of q.a.v"
            :key="i"
            style="padding-top: 5px; padding-bottom: 5px; text-align: center"
          >
            <button
              class="dy"
              :style="`background-color:#2FAEDB;width: 80%;border:3px solid ${
                inputAnswer === it
                  ? 'white;box-shadow:2px 1px #33333377'
                  : 'transparent'
              }`"
              type="submit"
              @click="setAnswer(it)"
            >
              <div>
                <div style="display: inline-block; transform: translateX(16px)">
                  {{ it }}
                </div>
                <span style="float: right; height: 16px; width: 32px">
                  <span
                    v-if="state === 1 || state === 2"
                    style="transform: translateY(-3px)"
                  >
                    <md-icon v-if="isCorrectAnswer(it)" style="color: green">
                      check
                    </md-icon>
                    <md-icon v-else style="color: red"> close </md-icon>
                  </span>
                </span>
              </div>
            </button>
          </div>
        </form>
        <div
          v-if="state === 1 || state === 2"
          style="text-align: center; font-weight: 700; margin-top: 1em"
        >
          <button
            v-if="!isComplete"
            style="background: #97caf9; width: 80%"
            ref="next"
            class="dy"
            @click="next"
          >
            Следующий вопрос
          </button>
          <button
            v-if="isComplete"
            style="background: #97caf9; width: 80%"
            ref="next"
            class="dy"
            @click="end"
          >
            Закончить
          </button>
        </div>
      </div>
    </div>
    <br />
  </div>
  <div v-else>Загрузка...</div>
</template>

<script>
export default {
  name: "Quiz",
  props: ["qq"],
  data() {
    return {
      initiated: new Set(),
      q: null,
      inputAnswer: null,
      state: 0,
      isComplete: false,
      correct: [],
      incorrect: [],
      resultGrowth: 0,
    };
  },
  methods: {
    next() {
      if (this.isComplete) {
        this.initiated.clear();
      }
      this.inputAnswer = null;
      this.state = 0;
      let i = 0;
      for (; !i || this.initiated.has(i); ) {
        i = Math.ceil(Math.random() * this.qq.length);
      }
      this.initiated.add(i);
      this.isComplete = this.initiated.size === this.quizLength;
      this.q = this.qq[i - 1];
    },
    setAnswer(it) {
      if (!this.state) {
        this.inputAnswer = it;
      }
    },
    answer() {
      if (this.state) {
        return;
      }
      if (this.isCorrectAnswer(this.inputAnswer)) {
        this.state = 2;
        this.correct.push(this.q);
      } else {
        this.state = 1;
        this.incorrect.push(this.q);
      }
      this.$nextTick(() => {
        this.$refs.next.scrollIntoView();
      });
    },
    isCorrectAnswer(it) {
      return new RegExp("^" + this.q.a.c + "$", "i").test(it);
    },
    end() {
      if (this.correct.length + this.incorrect.length === 0) {
        this.$router.push("/home");
      }
      if(this.correct.length + this.incorrect.length === this.quizLength){
        if(this.$root.data.studyStage===0){
          this.$root.data.studyStage=1
        }
      }
      this.$root.data.fill.study = Date.now();
      this.resultGrowth = this.correct.length * 50;
      this.$root.addProgress(this.resultGrowth);
      this.$router.push({path:'/result',query:{ac:this.correct.length, ai:this.incorrect.length, sc:this.resultGrowth}})
    },
  },
  computed: {
    quizLength() {
      return Math.min(this.qq.length, 10);
    },
    progress() {
      return "0"
        .repeat(this.quizLength * 2 - 1)
        .split("")
        .map((_, i) => {
          if ((this.initiated.size - 1) * 2 > i) {
            return true;
          } else if ((this.initiated.size - 1) * 2 === i) {
            return !!this.state;
          } else {
            return false;
          }
        });
    },
  },
  mounted() {
    this.next();
  },
};
</script>
