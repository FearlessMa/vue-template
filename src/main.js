import Vue from 'vue';
import App from './App.vue';
import { registerComponent } from './antv';
import { Message, Notification, Modal } from 'ant-design-vue';
import { fetchData } from './utils/fetchData';
import moment from 'moment';

Vue.config.productionTip = false;
registerComponent(Vue);
Vue.prototype.$fetchData = fetchData;
Vue.prototype.$message = Message;
Vue.prototype.$notification = Notification;
Vue.prototype.$moment = moment;
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$confirm = Modal.confirm;
Message.config({ top: '100px' });
Notification.config({ top: '80px' });

new Vue({
  render: (h) => h(App)
}).$mount('#app');
