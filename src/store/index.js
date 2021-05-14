import Vue from 'vue';
import Vuex from 'vuex';
import {fetchData} from '../utils/fetchData'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
  },
  mutations: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload.data;
    },
    clearUserInfo(state) {
      console.log('state:clearUserInfo ', state);
      state.userInfo = null;
    }
  },
  actions: {
    async getUserInfo(ctx) {
      const res = await fetchData.get('getUserInfo');
      if (res.code === 0) {
        ctx.commit('setUserInfo', { payload: { data: res.data } });
      }
      return res;
    },
  },
  getters: {
  }
});
