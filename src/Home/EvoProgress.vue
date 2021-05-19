<template>
  <div style="height: 90px; overflow: hidden">
    <svg
      width="263"
      height="103"
      viewBox="0 0 263 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <rect
          x="29.8824"
          y="20.8824"
          width="203.235"
          height="12.3529"
          rx="2.05882"
          fill="#C4C4C4"
          stroke="#FEFEFE"
          stroke-width="1.76471"
        />
        <rect
          x="35.8333"
          y="22"
          :width="progress"
          height="10"
          rx="0.588235"
          fill="#8F7BB8"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="27"
          y="20"
          width="209"
          height="18.1176"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
    <img src="/assets/sil1.svg" style="transform: translateY(-110px)" />
  </div>
</template>

<script>
export default {
  name: "EvoProgress",
  computed: {
    progress() {
      return this.$root.char.lvl * 2;
    },
  },
};
</script>
