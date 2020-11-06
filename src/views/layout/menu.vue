<template>
  <a-menu
    :selectedKeys="selectedKeys"
    mode="inline"
    @click="menuClick"
    class="menu-box"
    @openChange="openChange"
    :openKeys="openKeys"
    :theme="navTheme"
  >
    <a-sub-menu key="edgeDeviceManager">
      <span slot="title">
        <a-icon type="dashboard" />
        <span>1</span>
      </span>
      <a-menu-item key="/edgeDeviceManager/network">2</a-menu-item>
      <a-menu-item key="/edgeDeviceManager/serviceConfig"
        >3</a-menu-item
      >
      <a-menu-item key="/edgeDeviceManager/timeSynchronization"
        >4</a-menu-item
      >
      <a-menu-item key="/edgeDeviceManager/serviceManager">
        5
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script>
import { sessionStorageUtils } from 'src/utils/storage';

export default {
  props: {
    defaultSelectedKeys: { type: Array },
    click: { type: Function }
  },
  watch: {
    $route(val) {
      let key = val.path;
      this.save('activeKey', key);
      this.selectedKeys = [key];
    }
  },
  data() {
    return {
      selectedKeys: ['/edgeDeviceManager/network'],
      openKeys: ['edgeDeviceManager'],
      navTheme: 'dark'
    };
  },
  methods: {
    openChange(openKeys) {
      const lastOpenKey = openKeys.pop() || '';
      this.save('openKeys', [lastOpenKey]);
      this.openKeys = [lastOpenKey];
    },
    menuClick({ item, key, keyPath }) {
      this.click && this.click({ item, key, keyPath });
    },
    save(key, value) {
      sessionStorageUtils.setItem(key, value);
    },
    getStore() {
      const selectedKey = sessionStorageUtils.getItem('activeKey');
      const openKeys = sessionStorageUtils.getItem('openKeys');
      return { selectedKey, openKeys };
    }
  },
  mounted() {
    const { selectedKey, openKeys } = this.getStore();
    if (selectedKey) {
      this.selectedKeys = [selectedKey];
    }
    if (openKeys) {
      this.openKeys = openKeys;
    }
  }
};
</script>
<style lang="less" scoped>
.menu-box {
  text-align: left;
}
</style>
