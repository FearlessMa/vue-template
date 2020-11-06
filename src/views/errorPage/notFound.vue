<template>
  <div class="container-404">
    <a-result
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <a-button type="primary" @click="backHome">
          Back Home
        </a-button>
      </template>
    </a-result>
  </div>
</template>
<script>
export default {
  methods: {
    backHome() {
      console.log('this.$router: ', this.$router);
      this.$router.push('/');
    }
  }
};
</script>
<style lang="less" scoped>
.container-404 {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
