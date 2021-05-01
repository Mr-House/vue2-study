<template>
   <svg :class="svgClass" v-on="$listeners">
      <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    },
    svgClass() {
      return this.className || 'svg-icon'
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>