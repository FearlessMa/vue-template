<template>
  <div>
    <a-form
      :form="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :layout="layout"
    >
      <a-row :gutter="gutter ? gutter : 8">
        <a-col
          v-for="(item, i) in formConfig"
          :span="item.span || colSpan ? item.span || colSpan : 24"
          :key="i + '-' + item.name"
        >
          <a-form-item
            :label="item.label"
            :label-col="item.labelCol"
            :wrapper-col="item.wrapperCol"
            :style="item.style"
          >
            <a-input
              v-if="item.node === 'input'"
              :type="item.type ? item.type : 'text'"
              :disabled="item.disabled"
              v-decorator="[
                item.name,
                {
                  rules: item.rules,
                  initialValue: item.initialValue || '',
                },
              ]"
              :placeholder="item.placeholder"
              :autosize="item.autosize"
              @keyup.enter.native="enterFun(item.enterSubmit)"
            >
              <a-icon
                v-if="item.icon"
                slot="prefix"
                :type="item.icon"
                :style="item.style ? item.style : 'color:rgba(0,0,0,.25)'"
              />
            </a-input>
            <a-select
              v-if="item.node === 'select'"
              :showSearch="item.showSearch"
              :filterOption="filterOption"
              allowClear
              v-decorator="[
                item.name,
                {
                  rules: item.rules,
                  initialValue: item.initialValue || '',
                },
              ]"
              :getPopupContainer="triggerNode => triggerNode.parentNode"
            >
              <a-select-option
                v-for="(option, index) in item.option"
                :key="index + '-' + option.value"
                :value="option.value"
                >{{ option.label }}</a-select-option
              >
            </a-select>
            <a-upload
              v-if="item.node === 'upload'"
              v-decorator="[
                item.name,
                {
                  rules: item.rules,
                  initialValue: item.initialValue || '',
                },
              ]"
              :beforeUpload="beforeUpload"
            >
              <a-button>
                <a-icon :type="item.icon ? item.icon : 'upload'" />
                {{ item.btnName }}
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <!-- <a-col>
          <slot name="btnGroup" :submit="submit">
            <a-form-item
              v-if="showColBtn"
              :wrapper-col="{ span: 12, offset: 5 }"
            >
              <a-button type="primary" @click="submit">提交</a-button>
            </a-form-item>
          </slot>
        </a-col> -->
      </a-row>
      <slot></slot>
      <slot name="btnGroup" :submit="submit">
        <a-form-item v-if="showBtn" :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" @click="submit">提交</a-button>
        </a-form-item>
      </slot>
    </a-form>
  </div>
</template>
<script>
export default {
  props: {
    formConfig: { type: Array, default: () => [] },
    showBtn: { type: Boolean, default: true },
    labelCol: { type: Object, default: () => ({ span: 6 }) },
    wrapperCol: { type: Object, default: () => ({ span: 18 }) },
    formCallback: {
      type: Function,
      default: () => form => {
        console.log(form);
      },
    },
    isResetFields: { type: Boolean, default: false },
    layout: { type: String, default: 'horizontal' },
    gutter: { type: Number, default: 0 },
    colSpan: { type: Number, default: 0 },
  },
  data() {
    return {
      form: this.$form.createForm(this),
    };
  },
  watch: {
    isResetFields: {
      handler(val) {
        val && this.resetFields();
      },
    },
  },
  methods: {
    enterFun(enterSubmit) {
      enterSubmit && this.submit();
    },
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('submit', values);
        }
      });
    },
    // 重置表单数据
    resetFields() {
      this.form.resetFields();
    },
    beforeUpload() {
      return false;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
  mounted() {
    if (typeof this.formCallback == 'function') {
      this.formCallback(this.form);
    } else {
      throw new Error('formCallback is not found or is not a function');
    }
  },
};
</script>
<style lang="less" scoped></style>
