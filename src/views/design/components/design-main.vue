<template>
    <div class="main">
        <div id="print">
            <div v-show="props.templates[0].display" class="header">
                <img
                    class="header-logo"
                    :src="props.templates[0].data[0].logo"
                />
                <div class="header-desc">
                    <div
                        class="header-desc-name"
                        :style="props.templates[0].style.name"
                    >
                        {{ props.templates[0].data[0].name }}
                    </div>
                    <div class="header-desc-contact">
                        {{ props.templates[0].data[0].phone }} |
                        {{ props.templates[0].data[0].email }}
                    </div>
                </div>
                <img
                    class="header-avatar"
                    :src="props.templates[0].data[0].avatar"
                />
            </div>
            <div
                v-for="template in templates.slice(1)"
                v-show="template.display"
                :key="template.name"
                class="content"
            >
                <div class="content-header">
                    <div class="content-header-logo">
                        <component
                            :is="template.icon"
                            class="content-header-logo__icon"
                        />
                    </div>
                    <div class="content-header-title">
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
                        <div class="content-item-header-title">
                            {{ data.title }}
                        </div>
                        <div class="content-item-header-date">
                            {{ data.date }}
                        </div>
                    </div>
                    <div class="content-item-desc">
                        {{ data.desc }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Template } from '@/schema/default';
import { ref } from 'vue';

const props = defineProps<{
    templates: Template[];
}>();
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

    #print {
        width: 800px;
        height: fit-content;
        background: #fff;
        padding: 20px;
        border-top: 40px $blue-color solid;
        box-sizing: border-box;

        .header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 100px;

            &-logo {
                height: 40px;
            }

            &-desc {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            &-avatar {
                width: 80px;
                height: 80px;
            }
        }

        .content {
            margin: 20px 0;

            &-header {
                display: flex;
                align-items: center;

                &-logo {
                    width: 30px;
                    height: 30px;
                    background: $blue-color;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &__icon {
                        width: 20px;
                        height: 20px;
                        color: #fff;
                    }
                }

                &-title {
                    margin-left: 5px;
                    font-size: 20px;
                    font-weight: 600;
                    color: $blue-color;
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
