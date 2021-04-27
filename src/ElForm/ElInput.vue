<template>
  <input :value="value" @input="onInput" />
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
      this.$parent.$emit('validate');
    },
  },
};
</script>
