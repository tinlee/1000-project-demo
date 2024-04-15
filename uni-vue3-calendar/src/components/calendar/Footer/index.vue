<template>
    <view class="footer-container">

        <template v-if="store.viewStatus === 'month'">
            <view @click="store.goPreMonth">
                <uni-icons class="icon" type="left"></uni-icons>
                上月
            </view>
            <view @click="store.goToday">今天</view>
            <view @click="store.goNextMonth">
                下月
                <uni-icons class="icon" type="right"></uni-icons>
            </view>
        </template>
        <template v-if="store.viewStatus === 'day'">
            <view @click="store.goPreWeek">
                <uni-icons class="icon" type="left"></uni-icons>
                上周
            </view>
            <view @click="store.goToday">今天</view>
            <view @click="store.goNextWeek">
                下周
                <uni-icons class="icon" type="right"></uni-icons>
            </view>
        </template>
    </view>
</template>

<script setup lang="ts">
import { userCalendar } from '../store';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';

const store = userCalendar()

</script>

<style scoped lange="less">
.footer-container {
    background: #f1f1f1;
    color: red;
    padding: 0 32rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    /* 兼容 iOS < 11.2 */

    padding-bottom: env(safe-area-inset-bottom);
    /* 兼容 iOS >= 11.2 */
    display: flex;
    justify-content: space-between;
    line-height: 100rpx;
    font-size: 32rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

}

.icon {
    font-size: 40rpx !important;
    color: red !important;
}

/* Your component styles go here */
</style>