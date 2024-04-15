<template>
    <view class="header-container">
        <view class="global-header">
            <view class="back" @click="back">
                <uni-icons v-if="store.viewStatus === 'day'" class="icon" type="left"></uni-icons>
            </view>
            <view class="month-text">
                {{ monthText }}
            </view>
            <view class="back" @click="onAdd">
                <uni-icons class="icon" type="plusempty"></uni-icons>
            </view>
        </view>

        <dayList v-if="store.viewStatus === 'day'" />
        <view class="week-list">
            <view v-for="item in weekList" class="week" :key="item">{{ item }}</view>
        </view>

    </view>
</template>

<script setup lang="ts">
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import Add from '../Add/index.vue'
import { userCalendar } from '../store'
import dayjs from 'dayjs';
import { computed, inject, ref } from 'vue';
import dayList from './dayList.vue'

const store = userCalendar();
const share = ref()
const monthText = computed(() => {
    return dayjs(store.month).format('YYYY年MM月')
})
const addRef = inject('addRef')

const onAdd = () => {
    store.changeEditInfo(null)
    addRef?.value.open('bottom')
}

const weekList = ['日', '一', '二', '三', '四', '五', '六'];


function back() {
    if (store.viewStatus === 'day') {
        store.setViewStatus('month')
    } else {
    }
}
</script>

<style scoped lang="scss">
.header-container {
    background: #f1f1f1;
    position: sticky;
    top: 0;
    z-index: 10;
}

.global-header {
    padding: 16rpx;
    display: flex;
    gap: 16rpx;
    color: red;

    .month-text {
        font-size: 32rpx;
        flex: 1;
    }
}

.icon {
    font-size: 40rpx !important;
    color: red !important
}

.week-list {
    display: flex;
    justify-content: space-between;
    padding: 0 16rpx;
    font-size: 20rpx;
    color: #333;

}

.week {
    width: 100%;
    text-align: center;
}

.back {
    width: 32rpx;
}

/* Your component styles go here */
</style>