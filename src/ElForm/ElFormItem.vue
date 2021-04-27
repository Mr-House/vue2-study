<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p style="color: red;" v-if="error">{{ error }}</p>
  </div>
</template>
<script>
import Schema from 'async-validator';
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      error: '',
    };
  },
  mounted() {
    this.$on('validate', () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const desc = { [this.prop]: rules };
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, (errors, fields) => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = '';
          console.log(fields);
        }
      });
    },
  },
};
</script>
