<template>
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item>
      <button @click="submit">提交</button>
    </el-form-item>
  </el-form>
</template>
<script>
import ElInput from './ElInput';
import ElFormItem from './ElFormItem';
import ElForm from './index';
export default {
  components: {
    ElInput,
    ElFormItem,
    ElForm,
  },
  data() {
    return {
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        console.log(valid);
      });
    },
  },
};
</script>
