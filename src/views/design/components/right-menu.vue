<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="menu">
        <div class="menu-title">
            {{ menuTitle }}
        </div>

        <el-button-group class="menu-btns">
            <el-button
                class="menu-btns-item"
                :type="!dataMode ? 'primary' : ''"
                @click="dataMode = false"
                >{{ $t('design.styleConfiguration') }}</el-button
            >
            <el-button
                class="menu-btns-item"
                :type="dataMode ? 'primary' : ''"
                @click="dataMode = true"
                >{{ $t('design.dataConfiguration') }}</el-button
            >
        </el-button-group>

        <!-- data configuration -->
        <template v-if="dataMode">
            <div v-if="templateEditIndex === -1" class="data">暂无数据</div>
            <div v-else class="data">
                <template
                    v-for="(data, key) in templates[templateEditIndex].data"
                    :key="key"
                >
                    <template v-for="(value, key) in data" :key="key">
                        <div
                            v-if="!['logo', 'avatar'].includes(key)"
                            class="data-item"
                        >
                            <div class="data-item__label">
                                {{ $t('design.' + key) }}：
                            </div>
                            <el-input
                                v-if="key !== 'desc'"
                                class="data-item__input"
                                v-model="data[key]"
                            />
                            <el-input
                                v-else
                                autosize
                                type="textarea"
                                class="data-item__input"
                                v-model="data[key]"
                            />
                        </div>

                        <ImageUpload
                            v-else
                            :label="$t('design.' + key)"
                            v-model:image="data[key]"
                            :height="key === 'logo' ? 30 : 120"
                            style="margin: 20px 0"
                        ></ImageUpload>
                    </template>
                </template>
            </div>
        </template>

        <!-- style configuration -->
        <template v-else>
            <div v-if="templateEditIndex === -1" class="data">
                <template v-for="(value, key) in globalStyle" :key="key">
                    <div class="style-item">
                        <div class="style-item__label">
                            {{ $t('design.' + key) }}：
                        </div>
                        <el-input
                            v-if="!key.includes('color')"
                            class="style-item__input"
                            v-model="globalStyle[key]"
                        />
                        <div v-else class="style-item__input">
                            <el-color-picker v-model="globalStyle[key]" />
                        </div>
                    </div>
                </template>
            </div>
            <div v-else class="style">
                <template
                    v-for="(data, label) in templates[templateEditIndex].style"
                    :key="label"
                >
                    <template v-for="(value, key) in data" :key="key">
                        <div class="style-item">
                            <div class="style-item__label">
                                {{ $t('design.' + label) }} -
                                {{ $t('design.' + key) }}：
                            </div>
                            <el-input
                                v-if="key !== 'desc' && !key.includes('color')"
                                class="style-item__input"
                                v-model="data[key]"
                            />
                            <el-input
                                v-else-if="!key.includes('color')"
                                autosize
                                type="textarea"
                                class="style-item__input"
                                v-model="data[key]"
                            />
                            <div v-else class="style-item__input">
                                <el-color-picker v-model="data[key]" />
                            </div>
                        </div>
                    </template>
                </template>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Template } from '@/schema/default';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n();

const props = defineProps<{
    templates: Template[];
    templateEditIndex: number;
    globalStyle: Record<string, string>;
}>();

const menuTitle = computed(() =>
    props.templateEditIndex > -1
        ? props.templates[props.templateEditIndex].name
        : t('design.menuTitle'),
);

const dataMode = ref<boolean>(false);

// profile
</script>

<style lang="scss" scoped>
@use '/src/styles/mixins.scss' as *;

.menu {
    width: 25%;
    height: 100%;
    @include nav_color();
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08),
        0px 4px 32px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 40px 24px 24px 24px;
    position: relative;

    &-title {
        width: 100%;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
    }

    &-btns {
        width: 100%;
        height: 36px;
        margin-top: 30px;

        &-item {
            width: 50%;
            height: 100%;
            border-radius: 16px;
        }
    }

    .data {
        width: 100%;
        margin-top: 20px;

        &-item {
            margin: 20px 0;
            display: flex;
            align-items: center;

            &__label {
                flex: 1;
            }
            &__input {
                flex: 3;
            }
        }
    }

    .style {
        width: 100%;
        margin-top: 20px;

        &-item {
            margin: 20px 0;
            display: flex;
            align-items: center;

            &__label {
                flex: 1;
            }
            &__input {
                flex: 1;
            }
        }
    }
}
</style>
