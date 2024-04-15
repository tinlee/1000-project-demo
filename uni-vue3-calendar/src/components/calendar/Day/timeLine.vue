<template>
    <view class="timeline">
        <view v-for="item in list" class="time-line-item">
            <view class="text"> {{ item }}</view>
            <view class="line"></view>
        </view>

    </view>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
const list: Ref<string[]> = ref([])

onMounted(() => {
    const timeList = Array.from({ length: 24 }, (v, k) => {
        if (k < 10) {
            return '0' + k + ':00'
        } else {
            return k + ':00'

        }
    })
    timeList.push('00:00')
    list.value = timeList
})


</script>

<style scoped lang="scss">
.timeline {
    display: flex;
    flex-flow: column;
    gap: 80rpx;
    color: #333;

    .time-line-item {
        display: flex;
        font-size: 20rpx;
        line-height: 30rpx;

        .text {
            width: 90rpx;
        }

        .line {
            flex: 1;
            height: 14rpx;
            border-bottom: 1rpx solid #999;
        }
    }

}
</style>