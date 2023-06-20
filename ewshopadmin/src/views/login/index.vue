<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo m-0">
          <img class="m-auto" src="~@/assets/images/logo.png" alt=""/>
        </div>
      </div>
      <div class="view-account-form">
        <n-form
            ref="formRef"
            label-placement="left"
            size="large"
            :model="formInline"
            :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline/>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline/>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useMessage } from 'naive-ui';
import { PersonOutline, LockClosedOutline} from '@vicons/ionicons5';
import {login} from "@/api/user";
import {useUserStore} from '@/store/user'
interface FormState {
  email: string;
  password: string;
}
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const message = useMessage()
const formRef = ref();
const loading = ref(false);
const formInline = reactive({
  username: 'super@a.com',
  password: '123123',
});
const rules = {
  username: {required: true, message: '请输入用户名', trigger: 'blur'},
  password: {required: true, message: '请输入密码', trigger: 'blur'},
};
//表单验证
const handleSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors:any) => {
    if (!errors) {
      message.success('验证成功')
      //接收数据
      const {username,password} = formInline
      //显示登录中
      loading.value = true
      //调整数据结构
      const data:FormState = reactive({
        email:username,
        password:password
      })
      //执行登录操作
      userStore.login(data).then(res=>{
        console.log(res)
        //关闭登录中
        loading.value = false
        //弹出提示
        message.success(
            "登录成功"
        )
        if(!route.query){
          router.push({path:"/dashboard"})
        }else{
          router.push({path:`${route.query.redirect}`})
        }
      }).catch(err=>{
        //关闭登录中
        loading.value = false
        //弹出提示
        message.error(
            "登录失败"
        )
        console.log(err)
      })


    } else {
      console.log(errors)
      message.error('验证失败')

    }
  })
}

</script>


<style lang="less" scoped>
.view-account {
  background-image: url('../../assets/images/login.svg');
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url('../../assets/images/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
