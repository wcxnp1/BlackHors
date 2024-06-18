<template>
    <div class="login-one">
        <el-col :span="16">
        </el-col>
        <el-col :span="8">
            <div class="login-rigth">
                <div class="login-txt">智慧园区-登录</div>
                <div>
                    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules"
                        class="demo-ruleForm" status-icon>
                        <el-form-item prop="username">
                            <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="ruleForm.password" show-password placeholder="请输入密码" />
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-checkbox v-model="checked1" size="large">
                            记住密码
                        </el-checkbox>
                    </div>
                    <div>
                        <el-button type="primary" style="width: 100%; background-color: #4770ff; margin-bottom: 30px;"
                            @click="addrouter">登入</el-button>
                        <span style="display: inline-block; width: 100%; color: red;">
                            仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息（如手机号、身份证号等）！
                        </span>
                    </div>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router';

import { usepinia } from "@/stores/pinai"
const router = useRouter()
const store = usepinia()
const checked1 = ref(false);
type ruleFormtype = {
    username: string,
    password: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm: ruleFormtype = reactive(
    {
        username: 'demo',
        password: 'zh@hm#23'
    }
)
const rules = reactive<FormRules<ruleFormtype>>({
    username: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
    },
    ],
    password: [{
        required: true,
        message: '请你输入密码',
        trigger: 'blur'
    },
    ],
})
const addrouter = () => {
    ruleFormRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            const res = ref<Object>({})
            res.value = await store.Uselogin(ruleForm) as Object
            if (res.value) {
                router.push('/')
            }

        }
    });

}
</script>
<style lang='scss' scoped>
.login-one {
    width: 100%;
    height: 100%;
    // background-color: red;
    display: flex;

    .el-col {
        height: 100%;
    }

    .el-col:nth-child(1) {
        background-image: url(https://fe-hmzs.itheima.net/assets/login-bg-e4ea539c.svg);
        border-radius: 5px;
        background-size: cover;
    }

    .login-rigth {
        flex: 1;
        margin: 200px 20%;
    }

    .login-txt {
        font-size: 27px;
        text-align: center;
        padding-bottom: 74px;

    }

    .el-form-item {
        padding-bottom: 30px;
    }

    ::v-deep .el-checkbox {
        font-size: 20px;
    }

}
</style>