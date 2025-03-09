import * as User from './user.d';

export interface apiRes<T> {
    code: number;
    msg: string;
    data: T;
}

export { User };
