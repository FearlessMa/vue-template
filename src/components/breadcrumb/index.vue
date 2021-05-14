<template>
  <div class="breadcrumb-box">
    <a-breadcrumb :routes="pathList">
      <template slot="itemRender" slot-scope="{ route, routes, paths }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <span v-else-if="routes.indexOf(route) === 0">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="`${basePath}/${paths.join('/')}`">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    routes: { type: Array },
    basePath: { type: String, default: '' }
  },
  data() {
    return { pathList: [] };
  },
  watch: {
    routes: {
      handler() {
        this.changePathList();
      },
      immediate: true
    },
    $route: {
      handler() {
        this.changePathList();
      },
      deep: true
    }
  },
  methods: {
    changePathList() {
      const { routes, $route } = this;
      if (Array.isArray(routes)) {
        this.pathList = routes.filter((item) => {
          return $route.path.includes(item.path);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.breadcrumb-box {
  padding-left: 20px;
  text-align: left;
}
</style>
