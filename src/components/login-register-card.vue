<template>
    <div v-if="visible" class="model">
        <div class="container" :class="isRegister && 'right-panel-active'">
            <i-ep-Close class="close" @click="handleClose" />
            <div class="form-container sign-up-container">
                <form class="form">
                    <h1 class="form-title">{{ $t('login.register') }}</h1>
                    <div
                        v-for="item in registerForm"
                        :key="item.label"
                        class="form-item"
                    >
                        <input
                            v-model="item.value"
                            :type="item.type"
                            class="form-item__input"
                            :class="item.value && 'focus'"
                        />
                        <span
                            class="form-item__label"
                            :data-placeholder="$t('login.' + item.label)"
                        ></span>
                    </div>
                    <div
                        class="form-captcha"
                        v-html="captchaImage.image"
                        @click="refreshCaptcha"
                    ></div>
                    <button class="button" @click="register">
                        {{ $t('login.register') }}
                    </button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form class="form">
                    <h1 class="form-title">{{ $t('login.login') }}</h1>
                    <div
                        v-for="item in loginForm"
                        :key="item.label"
                        class="form-item"
                    >
                        <input
                            v-model="item.value"
                            :type="item.type"
                            class="form-item__input"
                            :class="item.value && 'focus'"
                        />
                        <span
                            class="form-item__label"
                            :data-placeholder="$t('login.' + item.label)"
                        ></span>
                    </div>
                    <div
                        class="form-captcha"
                        v-html="captchaImage.image"
                        @click="refreshCaptcha"
                    ></div>
                    <a class="forget" href="#">{{ $t('login.forgetPass') }}</a>
                    <button class="button" @click="login">
                        {{ $t('login.login') }}
                    </button>
                </form>
            </div>

            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>{{ $t('login.haveAccount') }}</h1>
                        <p class="overlay-panel-desc">
                            {{ $t('login.haveAccountDesc') }}
                        </p>
                        <button
                            class="button ghost"
                            @click="isRegister = false"
                        >
                            {{ $t('login.login') }}
                        </button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>{{ $t('login.noAccount') }}</h1>
                        <p class="overlay-panel-desc">
                            {{ $t('login.noAccountDesc') }}
                        </p>
                        <button class="button ghost" @click="isRegister = true">
                            {{ $t('login.register') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserServer from '@/api/user';
import { ElMessage } from 'element-plus';
import { defaultTemplates } from '@/schema/default';
import { cloneDeep } from 'lodash-es';
import useUserStore from '@/store/user';
import { useRouter } from 'vue-router';

const emit = defineEmits(['update:visible']);
const router = useRouter();
const props = defineProps<{
    visible: boolean;
    path: string;
}>();
const userStore = useUserStore();

const isRegister = ref(false);
const handleClose = () => {
    registerForm.value = cloneDeep(defaultRegisterform);
    loginForm.value = cloneDeep(defaultLoginForm);
    refreshCaptcha();
    emit('update:visible', false);
    if (props.path) {
        router.push(props.path);
    }
};

// captcha
const captchaImage = ref({
    image: '',
    value: '',
});
const refreshCaptcha = async () => {
    captchaImage.value = (await UserServer.getCaptcha()).data;
};
onMounted(refreshCaptcha);

// Login
const defaultLoginForm = {
    username: {
        label: 'username',
        type: 'text',
        value: '',
    },
    password: {
        label: 'password',
        type: 'password',
        value: '',
    },
    captcha: {
        label: 'captcha',
        type: 'text',
        value: '',
    },
};
const loginForm = ref(cloneDeep(defaultLoginForm));
const login = async () => {
    const captchaVal = loginForm.value.captcha.value;
    if (captchaVal !== captchaImage.value.value) {
        return ElMessage({
            type: 'error',
            message: '学生暂不支持自己注册',
        });
    }
    const res = await userStore.login({
        username: loginForm.value.username.value,
        password: loginForm.value.password.value,
        captcha: captchaVal,
    });
    if (res.code == 200) {
        handleClose();
    }
};

// Register
const defaultRegisterform = {
    username: {
        label: 'username',
        type: 'text',
        value: '',
    },
    password: {
        label: 'password',
        type: 'password',
        value: '',
    },
    checkPass: {
        label: 'check',
        type: 'password',
        value: '',
    },
    captcha: {
        label: 'captcha',
        type: 'text',
        value: '',
    },
};
const registerForm = ref(cloneDeep(defaultRegisterform));
const register = async () => {
    const captchaVal = registerForm.value.captcha.value;
    if (captchaVal !== captchaImage.value.value) {
        return ElMessage({
            type: 'error',
            message: '验证码错误',
        });
    }

    if (
        registerForm.value.password.value !== registerForm.value.checkPass.value
    ) {
        return ElMessage({
            type: 'error',
            message: '两次密码输入不一致',
        });
    }
    const res = await userStore.register({
        username: registerForm.value.username.value,
        password: registerForm.value.password.value,
        resume: JSON.stringify(defaultTemplates.value),
        captcha: captchaVal,
    });
    if (res.code == 200) {
        handleClose();
    }
};
</script>

<style lang="scss" scoped>
.model {
    position: fixed;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.6);
}

.button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }

    &.ghost {
        background: transparent;
        border-color: #fff;
    }
}

.container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;

    .close {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 5px;
        top: 5px;
        cursor: pointer;
        z-index: 999;
        color: #111;
    }
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;

    &.sign-in-container {
        left: 0;
        width: 50%;
        z-index: 2;
    }

    &.sign-up-container {
        left: 0;
        width: 50%;
        z-index: 2;
        opacity: 0;
    }

    .form {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        justify-content: center;
        text-align: center;

        &-title {
            font-weight: bold;
            color: #111;
        }

        &-item {
            border-bottom: 2px solid #adadad;
            position: relative;
            margin: 10px 0;

            &__label {
                font-size: 12px;
            }

            &__input {
                font-size: 15px;
                color: #333;
                border: none;
                width: 100%;
                outline: none;
                background: none;
                padding: 0 3px;
                height: 35px;

                &:focus {
                    & + span::before {
                        top: -5px;
                    }

                    & + span::after {
                        width: 100%;
                    }
                }
            }

            .focus {
                & + span::before {
                    top: -5px;
                }

                & + span::after {
                    width: 100%;
                }
            }

            &__label {
                &::after {
                    content: '';
                    position: absolute;
                    left: 0%;
                    top: 100%;
                    width: 0%;
                    height: 2px;
                    background-image: linear-gradient(120deg, #3498db, #8e44ad);
                    transition: 0.5s;
                }

                &::before {
                    content: attr(data-placeholder);
                    position: absolute;
                    top: 50%;
                    left: 5px;
                    color: #adadad;
                    transform: translateY(-50%);
                    transition: 0.5s;
                }
            }
        }

        &-captcha {
            width: 100%;
            margin: 10px 0;
            cursor: pointer;
        }

        .button {
            background: linear-gradient(120deg, #3498db, #8e44ad);
            border: none;
            background-size: 200%;
            color: #fff;
            transition: 0.5s;
            margin-top: 20px;

            &:hover {
                background-position: right;
            }
        }

        .forget {
            color: #333;
            font-size: 14px;
            text-decoration: none;
            margin-top: 15px;
            position: relative;
            left: 100px;
        }
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;

    .overlay {
        background-image: linear-gradient(120deg, #3498db, #8e44ad);
        color: #fff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateY(0);
        transition: transform 0.6s ease-in-out;

        &-panel {
            position: absolute;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 40px;
            height: 100%;
            width: 50%;
            text-align: center;
            transform: translateY(0);
            transition: transform 0.6s ease-in-out;

            &-desc {
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.5px;
                margin: 20px 0 30px;
            }
        }

        &-right {
            right: 0;
            transform: translateY(0);
        }

        &-left {
            transform: translateY(-20%);
        }
    }
}

.container.right-panel-active {
    .sign-in-container {
        transform: translateY(100%);
    }

    .sign-up-container {
        transform: translateX(100%);
        opacity: 1;
    }

    .overlay-container {
        transform: translateX(-100%);

        .overlay {
            transform: translateX(50%);

            &-right {
                transform: translateY(20%);
            }

            &-left {
                transform: translateY(0);
            }
        }
    }
}
</style>
