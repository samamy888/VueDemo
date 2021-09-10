<template>
  <div class="SignIn">
    <vxe-form :data="formData" @submit="signInEvent()" :rules="formRule">
      <vxe-form-item title="用戶名" field="username" align="center" >
        <vxe-input v-model="formData.username" placeholder="Name"></vxe-input>
      </vxe-form-item>
      <vxe-form-item title="密碼" field="password" align="center" >
        <vxe-input v-model="formData.password"></vxe-input>
      </vxe-form-item>
      <vxe-form-item align="center" span="24">
        <vxe-button content="登入" status="success" type="submit"></vxe-button>
      </vxe-form-item>
    </vxe-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { AxiosResponse } from "axios";
import { signIn } from "../api/api";
import { LoginModel } from "../model/model";
//import router from "@/router";
export default defineComponent({
  setup() {
    const formData = ref<LoginModel>({
      username: "",
      password: "",
    });
    const formRule = ref({
      username: [{ required: true, message: "請輸入用戶名" }],
      password: [{ required: true, message: "請輸入密碼" }],
    });
    const signInEvent = () => {
      signIn(formData.value)
        .then((res: AxiosResponse<any>) => {
          localStorage.setItem('token',res.data);
          alert("登入成功!");
          //router.push('/table');
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
    return {
      formData,
      formRule,
      signInEvent,
    };
  },
});
</script>