<template>
    <view class="day-list">
        <view v-for="item in render" class="day" :key="item" @click="store.goDay(item)">
            <view :class="{
            item: true,
            'is-today': item.isToday
        }">{{ item.day }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">

import { userCalendar } from '../store'
import dayjs from 'dayjs';
import { computed, inject, ref } from 'vue';

const store = userCalendar();

const render = computed(() => {
    const day = store.day
    const dayList = []
    for (let i = 0; i < 7; i++) {
        const newDay = dayjs(day).startOf('week').add(i, 'day')
        dayList.push({
            day: newDay.format('DD'),
            date: newDay,
            isToday: dayjs(day).isSame(newDay, 'day')
        })
    }

    return dayList
})
</script>

<style scoped lang="scss">
/* Your component styles go here */
.day-list {
    display: flex;
    justify-content: space-between;
    padding: 0 32rpx;
    font-size: 24rpx;
    color: #333;
    padding: 0 16rpx;
    text-align: center;

    .day {
        flex: 1;
        display: flex;
        height: 64rpx;
        align-items: center;
        justify-content: center;

        .item {
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
            justify-content: center;
            line-height: 40rpx;
        }

        .is-today {
            background: red;
            color: #fff;
        }
    }
}
</style>