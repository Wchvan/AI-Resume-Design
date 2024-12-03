import {
    Link,
    Notebook,
    OfficeBuilding,
    School,
    User,
    House,
} from '@element-plus/icons-vue';
import { Component, ref } from 'vue';
export type Template = {
    name: string;
    display: boolean;
    icon: Component;
};
export const defaultTemplates = ref<any>([
    {
        name: '个人经历',
        display: true,
        icon: House,
    },
    {
        name: '教育经历',
        display: true,
        icon: School,
    },
    {
        name: '实习经历',
        display: true,
        icon: OfficeBuilding,
    },
    {
        name: '项目经历',
        display: true,
        icon: Link,
    },
    {
        name: '技能',
        display: true,
        icon: Notebook,
    },
    {
        name: '自我介绍',
        display: true,
        icon: User,
    },
]);
