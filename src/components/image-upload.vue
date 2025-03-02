<template>
    <div class="profile-image">
        <div class="profile-image__label">{{ label }}：</div>
        <div
            class="profile-image__data"
            :style="{ width: width + 'px', height: height + 'px' }"
        >
            <el-upload
                v-if="!imageUrl"
                class="image-uploader"
                action="/api/upload/single-file"
                :show-file-list="false"
                :on-success="handleImageSuccess"
                :before-upload="beforeImageUpload"
            >
                <i-ep-Plus class="image-uploader-icon" />
            </el-upload>

            <div v-else class="image-preview">
                <img class="image-preview-img w-full h-full" :src="imageUrl" />
                <div class="w-full h-full image-preview-model">
                    <i-ep-delete
                        class="image-preview-model__delete"
                        @click="() => (imageUrl = '')"
                    />
                    <i-ep-zoomIn
                        class="image-preview-model__zoom"
                        @click="() => (previewDialogVisible = true)"
                    />
                </div>
            </div>

            <el-dialog v-model="previewDialogVisible">
                <img w-full :src="imageUrl" alt="Preview Image" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { ElMessage, type UploadProps } from 'element-plus';
const emit = defineEmits(['update:image']);

const props = withDefaults(
    defineProps<{
        image: string;
        label: string;
        width: number;
        height: number;
    }>(),
    {
        width: 120,
        height: 120,
    },
);

// image
const imageUrl = ref(props.image ?? '');
watch(
    () => imageUrl.value,
    (newVal: string) => {
        emit('update:image', newVal);
    },
);
const previewDialogVisible = ref(false);

const handleImageSuccess: UploadProps['onSuccess'] = (_, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeImageUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Picture size can not exceed 2MB!');
        return false;
    }
    return true;
};
</script>

<style lang="scss" scoped>
.profile-image {
    display: flex;
    align-items: center;

    &__label {
        margin-right: 50px;
    }

    &__data {
        .image-uploader {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ccc;

            &-icon {
                width: 36px;
                height: 36px;
            }
        }

        .image-preview {
            position: relative;
            border-radius: 10px;
            overflow: hidden;

            &:hover {
                .image-preview-model {
                    opacity: 1;
                    z-index: 10;
                }
            }
            &-model {
                position: absolute;
                top: 0;
                opacity: 0;
                background: rgba(0, 0, 0, 0.5);
                color: #fff;

                &__delete {
                    position: absolute;
                    top: 50%;
                    left: 30%;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
                &__zoom {
                    position: absolute;
                    top: 50%;
                    right: 30%;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
