<template>
  <div class="home">
    <div class="login">
      <div class="input-container">
        <input type="text" style="display: none; height: 0; position: absolute" />
        <input type="password" style="display: none; height: 0; position: absolute" />
        <input v-model="account" type="text" name="username" placeholder="用户名" @keyup.enter="login" />
        <input v-model="password" type="password" name="password" placeholder="请输入密码" @keyup.enter="login" />
      </div>
      <button @click="login">登入</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const account = ref("");
    const password = ref("");
    const login = function () {
      store.commit("setLogin", true);
      router.replace(<string>route.query.next || "/");
    };
    return {
      login,
      account,
      password,
    };
  },
});
</script>
<style >
.login {
  width: 20rem;
  text-align: center;
  margin: 3rem auto;
  background-color: #eee;
  padding: 2rem;
  border-radius: 0.4rem;
  box-shadow: 0 10px 50px 0px #eee;
}

.input-container input {
  border: 0;
  background: none;
  outline: 0;
  color: rgb(0, 0, 0);
  margin: 1.3rem 0;
  display: block;
  width: 100%;
  padding: 0.4rem 0;
  transition: 0.2s;
  border-bottom: 1px solid #b3b3b3;
  font-weight: bolder;
  font-size: 1rem;
  letter-spacing: 0.1rem;
}

.input-container input::placeholder {
  color: #ccc;
}

.input-container input:hover {
  border-bottom-color: #fff;
}
.login button {
  width: 100%;
  border-radius: 10rem;
  font-size: 1rem;
  font-weight: bolder;
  background-color: #215adfaa;
  color: white;
  padding: 0.5rem 0;
  border: 0;
  margin: 10px;
}
.login button:hover {
  background-color: #215adf;
  box-shadow: 0 0rem 1rem 0px #ededee;
  cursor: pointer;
}
</style>