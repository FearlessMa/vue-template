<template>
  <a-config-provider :locale="locale">
    <a-layout id="components-layout-demo-custom-trigger" class="layout-box">
      <a-layout-sider
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        class="layout-sider"
      >
        <div class="logo" :class="{ light: navTheme === 'light' }">
          {{ collapsed ? 't' : 'title' }}
        </div>
        <Menu :click="menuClick" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="layout-header"></a-layout-header>
        <a-layout-header class="layout-header position-fixed">
          <a-icon
            class="trigger toggle-icon"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content class="layout-content" style="min-height: auto">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          test ©2020
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import Menu from './menu.vue';
export default {
  components: { Menu },
  data() {
    return {
      locale: zhCN,
      collapsed: false,
      selected: '',
      visible: false,
      companys: [],
      navTheme: 'dark'
    };
  },
  methods: {
    menuClick({ key }) {
      this.push(key);
    },
    push(key) {
      this.$router.history.push(key);
    }
  },
  mounted() {
  }
};
</script>
<style lang="less">
@h: 100vh;
@w: 100vw;
.position-fixed {
  position: fixed;
}
.layout-box {
  height: @h;
  width: @w;
  .toggle-icon {
    float: left;
  }
  .layout-header {
    background-color: #fff;
    padding: 0;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    &.position-fixed {
      .position-fixed();
      top: 0;
      width: 100%;
      // z-index: 1051;
      z-index: 1000;
    }
  }
  .layout-sider {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    .ant-layout-sider-children {
      display: flex;
      flex-direction: column;
      ::-webkit-scrollbar {
        width: 0px;
        height: 10px;
      }
      .menu-box {
        flex: 1;
        overflow-y: scroll;
      }
    }
  }
  .layout-content {
    margin: 24px 16px;
    // padding: 10px;
  }
}
#components-layout-demo-custom-trigger {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
// tooltip logo style
// .logo {
//   height: 50px;
//   position: relative;
//   display: flex;
//   padding: 0;
//   margin: 0;
//   img {
//     width: 100%;
//     max-height: 100%;
//     margin: auto;
//   }
//   .have-companys-i {
//     position: absolute;
//     right: -14px;
//     bottom: 0px;
//     width: 0;
//     height: 0;
//     border-width: 0 16px 16px;
//     border-style: solid;
//     border-color: transparent transparent #0191ff;
//     transform: rotate(135deg);
//   }
// }
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  color: #ffffff;
  font-weight: bold;
  line-height: 32px;
  font-size: 20px;
  text-align: center;
}

#components-layout-demo-custom-trigger .logo.light {
  color: #f5222d;
}
.company-switch-list {
  ul {
    padding: 0;
  }
  li {
    padding: 0 !important;
    margin: 0 !important;
    background: #0f1012 !important;
  }
}

// .ant-drawer {
//   position: fixed;
//   top: 0;
//   z-index: 1052;
//   width: 0%;
//   height: 100%;
// }
</style>
