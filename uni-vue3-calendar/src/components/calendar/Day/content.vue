<template>
    <view class="day-content-container">
        <TimeLine />
        <view class="day-content">
            <view class="day-arr" v-for="dateArr in dateList" :style="{ top: dateArr.top, height: dateArr.height }">
                <template v-for="(item, index) in dateArr.list">
                    <Item :item="item" :index="index" />
                </template>
            </view>
        </view>

    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { userCalendar } from '../store';
import { getMonthDays } from '../utils'
import TimeLine from './timeLine.vue'
import Item from './item.vue'
import dayjs from 'dayjs';

function getTop(time, isEnd = false) {
    const [hour, minute] = time.split(':')
    const top = (hour * 60 + minute * 1) / 1440 * 100
    return top
}

const store = userCalendar()
const dateList = computed(() => {
    const { list, month, day } = store
    const dayText = dayjs(day).format('YYYY-MM-DD')
    const dateList = list[dayText]
    return Object.keys(dateList).map(key => {
        const item = dateList[key]
        const [startHour, endHour] = key.split('-')
        return {
            list: item,
            top: getTop(startHour) + '%',
            height: (getTop(endHour) - getTop(startHour)) + '%'

        }
    })

})


</script>

<style scoped lang="scss">
.day-content-container {
    flex: 1;
    padding: 0 16rpx;
    box-sizing: border-box;
    height: 100%;
    position: relative;


    .day-content {
        position: absolute;
        top: 14rpx;
        bottom: 14rpx;
        left: 106rpx;
        right: 16rpx;

        .day-arr {
            position: absolute;
            background: #f1f1f1;
            border-radius: 8rpx;
            left: 0;
            right: 0;

            display: flex;

        }

    }
}
</style>