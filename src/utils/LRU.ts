import { ElMessage } from 'element-plus';
import { isEqual } from 'lodash-es';

export class EditJournal {
    private readonly capacity: number;
    private beforeHistory: any[];
    private afterHistory: any[];
    private readonly beforeLocalStoragePath = 'EditJournalBefore';
    private readonly afterLocalStoragePath = 'EditJournalAfter';

    constructor(capacity = 20) {
        if (capacity <= 0) {
            throw new Error('Capacity must be a positive number');
        }
        this.capacity = capacity;

        let localCache = localStorage.getItem(this.beforeLocalStoragePath);
        if (localCache) {
            this.beforeHistory = JSON.parse(localCache);
        } else {
            this.beforeHistory = [];
        }

        localCache = localStorage.getItem(this.afterLocalStoragePath);
        if (localCache) {
            this.afterHistory = JSON.parse(localCache);
        } else {
            this.afterHistory = [];
        }
    }

    pop() {
        if (this.beforeHistory.length == 0) {
            ElMessage({
                type: 'error',
                message: '无法回退到更早的记录了',
            });
        }
        const value = this.beforeHistory.pop();
        this.afterHistory.push(value);
        this.saveLocal();
        return value;
    }

    back() {
        if (this.afterHistory.length == 0) {
            ElMessage({
                type: 'error',
                message: '已经是最新的修改记录了',
            });
        }
        const value = this.afterHistory.pop();
        this.beforeHistory.push(value);
        this.saveLocal();
        return value;
    }

    put(value: any): boolean {
        if (isEqual(value, this.beforeHistory[this.beforeHistory.length - 1]))
            return false;
        this.beforeHistory.push(value);
        // 容量超限时删除最久未使用的键（Map 的第一个键）
        if (this.beforeHistory.length > this.capacity) {
            this.beforeHistory.unshift();
        }
        if (this.afterHistory) {
            this.afterHistory = [];
        }
        this.saveLocal();
        return true;
    }

    clear() {
        this.beforeHistory = [];
        this.afterHistory = [];
        this.saveLocal();
    }

    private saveLocal() {
        localStorage.setItem(
            this.beforeLocalStoragePath,
            JSON.stringify(this.beforeHistory),
        );
        localStorage.setItem(
            this.afterLocalStoragePath,
            JSON.stringify(this.afterHistory),
        );
    }

    get beforeSize() {
        return this.beforeHistory.length;
    }

    get afterSize() {
        return this.afterHistory.length;
    }
}
