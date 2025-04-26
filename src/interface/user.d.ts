import { apiRes } from './index.d';

export enum roleType {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}

/* 登录 */
export namespace Login {
    export type Req = {
        password: string;
        username: string;
        captcha: string;
    };
    export type Res = apiRes<{
        access_token: string;
        _id: string;
        username: string;
        resume: string;
    }>;
}

/* 注册 */
export namespace Register {
    export type Req = {
        password: string;
        username: string;
        resume: string;
        captcha: string;
    };
    export type Res = apiRes<{
        access_token: string;
        _id: string;
        username: string;
        resume: string;
    }>;
}

/* 获取验证码 */
export namespace GetCaptcha {
    export type Res = apiRes<{
        image: string;
        value: string;
    }>;
}

/* 修改简历 */
export namespace updateUser {
    export type Req = {
        password?: string;
        username?: string;
        resume?: string;
        captcha?: string;
    };
    export type Res = apiRes<null>;
}
