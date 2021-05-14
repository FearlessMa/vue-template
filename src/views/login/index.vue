<template>
  <div>
    <div class="login-box">
      <Form
        :formConfig="config"
        @submit="submit"
        :labelCol="{ span: 0 }"
        :wrapperCol="{ span: 24 }"
      >
        <template>
          <div class="code">
            <img
              @click="queryNum = Math.random()"
              :src="'/uac/wapi/account/pic/get_code?' + queryNum"
            />
          </div>
        </template>
        <template #btnGroup="props">
          <a-button style="width: 100%" type="primary" @click="props.submit"
            >登录</a-button
          >
        </template>
      </Form>
    </div>
    <div class="footer">
    </div>
  </div>
</template>
<script>
import { Form } from '../../components';
import sha1 from 'sha1.js';
import { sessionStorageUtils } from 'src/utils/storage';
import { mapState } from 'vuex';
export default {
  components: { Form },
  data() {
    return {
      config,
      loading: false,
      dialogVisible: false,
      companyData: [],
      activeCompany: '',
      account: '',
      queryNum: Math.random(),
      staffs: [],
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo
    })
  },
  methods: {
    submit(value) {
      this.account = value.account;
      const data = {
        ...value,
        password: sha1.hex(value.password + 'zhiyun')
      };
      this.$fetchData.post('login', data).then((res) => {
        if (res.code == 0) {
          this.$store.commit('setUserInfo', { payload: { data: res.data } });
          // 平台管理员
            this.toActiveKey();
        } else {
          this.queryNum = Math.random();
          // this.$message.error(res.msg);
        }
      });
    },
    toActiveKey() {
      const activeKey = sessionStorageUtils.getItem('activeKey');
      this.$router.push(activeKey ? activeKey : '/');
    },
  },
  mounted() {
    this.userInfo && this.toActiveKey();
  }
};
const config = [
  {
    name: 'account',
    icon: 'user',
    node: 'input',
    rules: [{ required: true, message: '必填！' }],
    placeholder: '用户名'
  },
  {
    name: 'password',
    icon: 'lock',
    node: 'input',
    type: 'password',
    rules: [{ required: true, message: '必填！' }],
    placeholder: '密码'
  },
  {
    name: 'code',
    node: 'input',
    rules: [{ required: true, message: '必填！' }],
    style: {
      display: 'inline-block',
      width: '50%',
      color: 'rgba(0,0,0,.25)'
    },
    icon: 'robot',
    enterSubmit: true
  }
];
</script>
<style lang="less" scoped>
.login-box {
  display: flex;
  justify-content: center;
  height: 100vh;
  > div {
    margin-top: 30vh;
    width: 300px;
    height: 300px;
    padding: 10px;
  }
  .code {
    float: right;
    margin-top: -65px;
    > img {
      position: relative;
      height: 40px;
      z-index: 999;
      cursor: pointer;
    }
  }
  .errorMsg {
    color: red;
  }
}
.footer {
  position: absolute;
  bottom: 39px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  text-align: center;
  a {
    color: #aaa;
  }
}
</style>
