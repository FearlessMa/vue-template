<template>
  <div>
    <div class="breadcrumb">
      <Breadcrumb :routes="routes" :basePath="basePath" />
    </div>
    <div class="search-box">
      <slot name="search">
        <div class="search">
          <a-input-search
            @change="inputChange"
            :value="inputVal"
            @search="search"
          >
            <a-button :type="btnType" slot="enterButton">{{
              btnName
            }}</a-button>
          </a-input-search>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { Breadcrumb } from 'components';
export default {
  components: { Breadcrumb },
  props: {
    routes: { type: Array, default: () => [] },
    basePath: { type: String, default: '' },
    btnName: { type: String, default: '搜索' },
    btnType: { type: String, default: 'primary' },
  },
  data() {
    return {
      inputVal: '',
    };
  },
  watch: {
    $route: {
      handler() {
        this.inputVal = '';
      },
      deep: true,
    },
  },
  methods: {
    inputChange(e) {
      const val = e.target.value;
      this.inputVal = val;
    },
    search() {
      this.$emit('search', this.inputVal);
    },
  },
};
</script>
<style lang="less" scoped>
.search-box {
  padding: 20px 0;
  .search {
    width: 50%;
    margin: auto;
  }
}
</style>
