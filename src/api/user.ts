import * as I from '@/interface/index.d';
import { get, post, put } from '@/utils/request';

const login = async (params: I.User.Login.Req) => {
    const res = (await post('/auth/login', params)) as I.User.Login.Res;
    return res;
};

const register = async (params: I.User.Register.Req) => {
    const res = (await post('/auth/register', params)) as I.User.Register.Res;
    return res;
};

const getCaptcha = async () => {
    const res = (await get('/auth/captcha')) as I.User.GetCaptcha.Res;
    return res;
};

const updateUser = async (id: string, params: I.User.updateUser.Req) => {
    const res = (await put(`/user/${id}`, params)) as I.User.updateUser.Res;
    return res;
};

const fetchAIResponse = async (params: I.User.fetchAIResponse.Req) => {
    const res = (await post(`/ai`, params)) as I.User.fetchAIResponse.Res;
    return res;
};

export default class UserServer {
    static login = login;
    static register = register;
    static getCaptcha = getCaptcha;
    static updateUser = updateUser;
    static fetchAIResponse = fetchAIResponse;
}
