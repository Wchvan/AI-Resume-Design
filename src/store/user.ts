import UserServer from '@/api/user';
import * as I from '@/interface/index.d';
import { defaultTemplates, Template } from '@/schema/default';
import { cloneDeep } from 'lodash-es';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const useUserStore = defineStore(
    'user',
    () => {
        const username = ref<string>('');
        const access_token = ref<string>('');
        const id = ref<string>('');
        const resume = ref<Template[]>(cloneDeep(defaultTemplates.value));

        const init = () => {
            username.value = '';
            access_token.value = '';
            id.value = '';
            resume.value = cloneDeep(defaultTemplates.value);
        };

        const login = async (params: I.User.Login.Req) => {
            const res = (await UserServer.login(params)) as I.User.Login.Res;
            if (res.code === 200) {
                username.value = params.username;
                access_token.value = res.data.access_token;
                id.value = res.data._id;
                resume.value = JSON.parse(res.data.resume);
            }
            return res;
        };

        const logout = async () => {
            init();
            sessionStorage.clear();
        };

        const register = async (params: I.User.Register.Req) => {
            const res = (await UserServer.register(
                params,
            )) as I.User.Register.Res;
            if (res.code === 200) {
                username.value = params.username;
                access_token.value = res.data.access_token;
                id.value = res.data._id;
                resume.value = JSON.parse(res.data.resume);
            }
            return res;
        };

        return {
            username,
            id,
            resume,
            access_token,
            logout,
            login,
            register,
        };
    },
    {
        persist: {
            storage: sessionStorage, //修改存储位置
            key: 'user', //设置存储的key
            paths: ['username', 'access_token', 'resume'], //指定要长久化的字段
        },
    },
);

export default useUserStore;
