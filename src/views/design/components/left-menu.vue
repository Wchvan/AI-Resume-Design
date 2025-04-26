<template>
    <div class="menu" :class="shrink && 'shrink'">
        <div class="menu-top">
            <div v-show="!shrink" class="menu-top__text">
                {{ templates[0].data[0].name }} {{ $t('design.leftMenuTitle') }}
            </div>
            <div class="menu-top__label" @click="shrink = !shrink">
                <leftSvg :size="20" :class="shrink && 'rotate-180'" />
            </div>
        </div>
        <div v-show="!shrink" class="timer">还有 {{ timerNum }} 秒自动保存</div>
        <div
            v-for="(template, index) in props.templates"
            :key="template.name"
            class="menu-item"
        >
            <div class="menu-item-title">
                <component
                    :is="iconList[index]"
                    class="menu-item-title__icon"
                />
                <div v-show="!shrink" class="menu-item-title__text">
                    {{ template.name }}
                </div>
            </div>
            <el-switch
                v-show="!shrink"
                v-model="template.display"
                class="menu-item__switch"
                style="--el-switch-on-color: #13ce66"
            />
        </div>

        <div v-show="!shrink" class="btn-group">
            <el-button
                class="btn-group-item"
                color="rgb(0, 60, 255)"
                @click="preview"
                >{{ $t('design.preview') }}</el-button
            >
            <el-button
                class="btn-group-item"
                color="rgba(121, 72, 234, 1)"
                @click="downloadDialogVisible = true"
                >{{ $t('design.download') }}</el-button
            >
        </div>

        <el-dialog
            v-model="previewDialogVisible"
            :title="$t('design.preview')"
            center
        >
            <img w-full :src="imageUrl" alt="Preview Image" />
        </el-dialog>

        <el-dialog v-model="downloadDialogVisible" width="600px">
            <template #header>
                <div class="download-dialog-header">
                    {{ $t('design.download') }}
                </div>
            </template>
            <div class="download-dialog">
                <div
                    class="download-dialog-item"
                    @click="download(DownloadType.Image)"
                >
                    <i-ep-picture class="download-dialog-item__icon" />
                    <span class="download-dialog-item__text">{{
                        $t('design.image')
                    }}</span>
                </div>
                <div
                    class="download-dialog-item"
                    @click="download(DownloadType.Pdf)"
                >
                    <i-ep-document class="download-dialog-item__icon" />
                    <span class="download-dialog-item__text">{{
                        $t('design.pdf')
                    }}</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import leftSvg from '@/icon/left.vue';
import { iconList, Template } from '@/schema/default';
import { downloadFileByUrl, generateImage, generatePdf } from '@/utils/dom';
import { ref } from 'vue';

const props = defineProps<{
    templates: Template[];
    timerNum: number;
}>();
const shrink = ref<boolean>(false);

// preview
const previewDialogVisible = ref(false);
const imageUrl = ref('');
const preview = async () => {
    const printEle = document.getElementById('print');
    if (!printEle) return;
    imageUrl.value = await generateImage(printEle);
    previewDialogVisible.value = true;
};

// download
const downloadDialogVisible = ref(false);
enum DownloadType {
    'Image' = 0,
    'Pdf' = 1,
}
const download = async (type: DownloadType) => {
    const printEle = document.getElementById('print');
    if (!printEle) return;
    if (type == DownloadType.Image) {
        imageUrl.value = await generateImage(printEle);
        downloadFileByUrl(imageUrl.value);
    }
    if (type == DownloadType.Pdf) {
        await generatePdf(printEle);
    }
};
</script>

<style lang="scss" scoped>
@use '/src/styles/mixins.scss' as *;

.menu {
    width: 20%;
    height: 100%;
    @include nav_color();
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08),
        0px 4px 32px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 32px 24px 24px 24px;
    position: relative;

    &.shrink {
        width: 5%;

        .menu-item {
            border: 0;
            padding: 0;
        }
    }
    .timer {
        text-align: center;
        width: 100%;
    }
    &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-size: 20px;
        height: 60px;
        margin-bottom: 20px;

        &__label {
            cursor: pointer;
        }
    }

    &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 35px 20px;
        width: 100%;
        font-size: 18px;
        height: 60px;
        border-bottom: 1px solid rgba(166, 166, 166, 0.5);

        &-title {
            display: inline-flex;
            align-items: center;
            font-size: inherit;

            &__icon {
                width: 1.2em;
                height: 1.2em;
                margin-right: 4px;
            }
        }
    }

    .btn-group {
        position: absolute;
        bottom: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
        left: -1px;

        &-item {
            border-radius: 15px;
            height: 40px;
            width: 80px;
        }
    }
    .download-dialog-header {
        color: #111;
        font-size: 20px;
        font-weight: 600;
        padding: 0 10px 10px 10px;
        border-bottom: 1px #ccc solid;
    }

    .download-dialog {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 300px;

        &-item {
            margin: 20px;
            width: 150px;
            height: 150px;
            border-radius: 10px;
            background-color: rgba(103, 224, 152, 1);
            text-align: center;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;

            &:first-child {
                background-color: rgba(125, 172, 227, 1);
            }

            &__icon {
                width: 50px;
                height: 50px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>
