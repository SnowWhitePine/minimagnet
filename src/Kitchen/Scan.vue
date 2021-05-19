<template>
  <div
    class="room-bg"
    style="background-image: url('/assets/bg_paws_blue.png')"
  >
    <div
      v-if="!!error || !!result"
      class="fc"
      style="height: 80vh; position: absolute; margin: 0 5vw"
    >
      <div style="flex-grow: 1" />
      <div
        v-if="!!error"
        class="ycard mont"
        style="font-size: 1.2em; font-weight: 700; text-align: center"
      >
        {{ error }}
        <br />
        <br />
        <button class="undefault dy" @click="done">Упс</button>
      </div>
      <div
        v-else-if="!!result"
        class="ycard mont"
        style="font-size: 1.2em; font-weight: 700; text-align: center"
      >
        Магнитенок пополнил свои запасы!
        <br />
        <br />
        <button class="undefault dy" @click="success">OK</button>
      </div>
      <div style="flex-grow: 1" />
    </div>
    <qrcode-stream
      @decode="onDecode"
      @init="onInit"
      v-if="!result && !error"
      style="height: 100vh; width: 100vw"
    />
  </div>
</template>

<script>
export default {
  name: "Scan",
  data() {
    return {
      result: null,
      error: null,
    };
  },
  methods: {
    success() {
      this.done();
    },
    done() {
      this.result = null;
      this.error = null;
      this.$router.back();
    },
    onDecode(result) {
      this.result = result;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
        if (!this.error) {
          this.error = error.name;
        }
        console.error(this.error);
      }
    },
  },
};
</script>
