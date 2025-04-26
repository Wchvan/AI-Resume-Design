import {
    Link,
    Notebook,
    OfficeBuilding,
    School,
    User,
    House,
} from '@element-plus/icons-vue';
import { Component, ref } from 'vue';
import Logo from '@/assets/logo.png';
export type Template = {
    name: string;
    display: boolean;
    hideItemHeader?: boolean;
    data: Record<string, any>[];
    style: Record<string, Record<string, string>>;
};
export const iconList = [House, School, OfficeBuilding, Link, Notebook, User];
export const defaultTemplates = ref<Template[]>([
    {
        name: '个人简介',
        display: true,
        data: [
            {
                logo: 'https://www.uestc.edu.cn/c13209856342b0df2c7ee4eaeb07db5a.png',
                avatar: Logo,
                name: '简小历',
                phone: '18888888888',
                email: 'jianxiaoli@gmail.com',
            },
        ],
        style: {
            logo: {
                width: '140px',
                height: '40px',
            },
            avatar: {
                width: '80px',
                height: '80px',
            },
            name: {
                'font-size': '24px',
                'font-weight': '600',
                color: '#111',
            },
            contact: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
        },
    },
    {
        name: '教育经历',
        display: true,
        data: [
            {
                title: '简小历大学',
                date: '2021.09 - 2025.06',
                desc: `【竞赛】第十四届中国大学生服务外包创新创业大赛国家三等奖
【奖学金】XXXX大学标兵奖学金 
【荣誉】XXX大学十大杰出青年志愿者
【主修课程】计算机网络，数据结构与算法`,
            },
        ],
        style: {
            title: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
            date: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
            desc: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
        },
    },
    {
        name: '实习经历',
        display: true,
        data: [
            {
                title: 'Tesla',
                date: '2021.09 - 2025.06',
                desc: `工作内容：：
1. 负责车机系统的中国媒体模块的维护、开发和迭代，包括但不限于qq音乐、喜马拉雅和网易云音乐等。
2. 独立负责新版网易云音乐的从零到一的开发，包括：UI实现，插播、随机播放、音乐和博客切换、恢复播放等。
3. 重构已有代码，包括但不限于编写JSDoc，提取公用类和函数，提取公用组件等。
4. 优化软件性能和用户体验，如通过Inspector的Performance来定位致使页面卡顿的关键要素并优化以适应车机性能。
5. 参与编写与维护各个团队通用的代码，如播放器类、websocket的message处理控制等。`,
            },
        ],
        style: {
            title: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
            date: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
            desc: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
        },
    },
    {
        name: '项目经历',
        display: true,
        data: [
            {
                title: 'Tesla',
                date: '2021.09 - 2025.06',
                desc: `【竞赛】第十四届中国大学生服务外包创新创业大赛国家三等奖
【奖学金】XXXX大学标兵奖学金 
【荣誉】XXX大学十大杰出青年志愿者
【主修课程】计算机网络，数据结构与算法`,
            },
        ],
        style: {
            title: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
            date: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
            desc: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
        },
    },
    {
        name: '技能',
        display: true,
        hideItemHeader: true,
        data: [
            {
                desc: `【竞赛】第十四届中国大学生服务外包创新创业大赛国家三等奖
【奖学金】XXXX大学标兵奖学金 
【荣誉】XXX大学十大杰出青年志愿者
【主修课程】计算机网络，数据结构与算法`,
            },
        ],
        style: {
            desc: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
        },
    },
    {
        name: '自我介绍',
        display: true,
        hideItemHeader: true,
        data: [
            {
                desc: `【竞赛】第十四届中国大学生服务外包创新创业大赛国家三等奖
【奖学金】XXXX大学标兵奖学金 
【荣誉】XXX大学十大杰出青年志愿者
【主修课程】计算机网络，数据结构与算法`,
            },
        ],
        style: {
            desc: {
                'font-size': '16px',
                'font-weight': '500',
                color: '#111',
            },
        },
    },
]);

export const defaultGlobalStyle = ref<Record<string, string>>({
    'top-color': '#409eff',
    'icon-background-color': '#409eff',
    'icon-background-width': '30px',
    'icon-background-height': '30px',
    'icon-color': '#fff',
    'icon-width': '20px',
    'icon-height': '20px',
    'font-size': '20px',
    'font-weight': '600',
    'font-color': '#409eff',
});
