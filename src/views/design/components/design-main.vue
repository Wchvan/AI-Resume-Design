<template>
    <div class="main" @click="editTemplate(-1)">
        <div
            id="print"
            :style="{ 'border-top': `40px ${globalStyle['top-color']} solid` }"
        >
            <div
                v-show="props.templates[0].display"
                class="header"
                @click.stop="editTemplate(0)"
            >
                <img
                    class="header-logo"
                    :src="props.templates[0].data[0].logo"
                    :style="props.templates[0].style.logo"
                />
                <div class="header-desc">
                    <div
                        class="header-desc-name"
                        :style="props.templates[0].style.name"
                    >
                        {{ props.templates[0].data[0].name }}
                    </div>
                    <div
                        class="header-desc-contact"
                        :style="props.templates[0].style.contact"
                    >
                        {{ props.templates[0].data[0].phone }} |
                        {{ props.templates[0].data[0].email }}
                    </div>
                </div>
                <img
                    class="header-avatar"
                    :src="props.templates[0].data[0].avatar"
                    :style="props.templates[0].style.avatar"
                />
            </div>
            <div
                v-for="(template, index) in templates.slice(1)"
                v-show="template.display"
                :key="template.name"
                class="content"
                @click.stop="editTemplate(index + 1)"
            >
                <div class="content-header">
                    <div
                        class="content-header-logo"
                        :style="{
                            background: globalStyle['icon-background-color'],
                            width: globalStyle['icon-background-width'],
                            height: globalStyle['icon-background-height'],
                        }"
                    >
                        <component
                            :is="template.icon"
                            class="content-header-logo__icon"
                            :style="{
                                color: globalStyle['icon-color'],
                                width: globalStyle['icon-width'],
                                height: globalStyle['icon-height'],
                            }"
                        />
                    </div>
                    <div
                        class="content-header-title"
                        :style="{
                            'font-size': globalStyle['font-size'],
                            'font-weight': globalStyle['font-weight'],
                            color: globalStyle['font-color'],
                        }"
                    >
                        {{ template.name }}
                    </div>
                    <div class="content-header-line"></div>
                </div>
                <div
                    v-for="(data, index) in template.data"
                    :key="index"
                    class="content-item"
                >
                    <div
                        v-if="!template.hideItemHeader"
                        class="content-item-header"
                    >
                        <div
                            class="content-item-header-title"
                            :style="template.style.title"
                        >
                            {{ data.title }}
                        </div>
                        <div
                            class="content-item-header-date"
                            :style="template.style.date"
                        >
                            {{ data.date }}
                        </div>
                    </div>
                    <div class="content-item-desc" :style="template.style.desc">
                        {{ data.desc }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Template } from '@/schema/default';

const props = defineProps<{
    templates: Template[];
    globalStyle: Record<string, string>;
}>();
const emits = defineEmits(['editTemplate']);

function editTemplate(index: number) {
    emits('editTemplate', index);
}
</script>

<style lang="scss" scoped>
@use '/src/styles/vars.scss' as *;

.main {
    flex: 1;
    min-height: 100%;
    display: flex;
    justify-content: center;
    padding: 100px 0;
    color: #111;
    overflow: auto;
    cursor: pointer;

    #print {
        width: 800px;
        height: fit-content;
        background: #fff;
        padding: 20px;
        box-sizing: border-box;

        .header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 100px;
            cursor: pointer;

            &-desc {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }

        .content {
            margin: 20px 0;
            cursor: pointer;

            &-header {
                display: flex;
                align-items: center;

                &-logo {
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                &-title {
                    margin-left: 5px;
                }

                &-line {
                    margin-left: 15px;
                    flex: 1;
                    height: 2px;
                    border-radius: 1px;
                    background: rgba(204, 204, 204, 0.5);
                }
            }

            &-item {
                margin-top: 10px;
                padding: 0 10px;

                &-header {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                }

                &-desc {
                    white-space: pre-line;
                }
            }
        }
    }
}
</style>
