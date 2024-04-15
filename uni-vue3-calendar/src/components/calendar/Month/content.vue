<template>
    <view class="month-content-container">
        <view class="date-list">
            <view v-for="dateArr in    dateList    " class="date-item">
                <view v-for="item in     dateArr    " @click="goDay(item)" class="date-arr">
                    <div :class="{
                'show-date': true,
                current: item.isCurrtentMonth,
                today: item.isToday
            }">
                        <view>{{ item.showDate }}</view>
                        <view v-if="store.list[item.formatDate]" class="point"></view>
                    </div>
                </view>
            </view>
        </view>
        {{ month }}
    </view>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { userCalendar } from '../store';
import { getMonthDays } from '../utils'
const store = userCalendar()

function goDay(item) {
    store.goDay(item)
}

const dateList = computed(() => {
    return getMonthDays(store.month)
})

</script>

<style scoped lang="scss">
/* Your component styles go here */
.month-content-container {
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}

.date-list {
    display: flex;
    flex-flow: column;
    height: 100%;
}

.date-item {
    display: flex;
    flex-flow: row;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;

}

.date-arr {
    flex: 1;
    text-align: center;
}

.show-date {
    width: 80rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 50%;
    margin: 10px auto;
    color: #ccc;
    position: relative;

    .point {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #f00;
        border-radius: 50%;
        left: 50%;
        top: 80%;
        transform: translate(-50%, -50%);
    }

    &.current {
        color: #000
    }

    &.today {
        color: #fff;
        background: #f00;

        .point {
            background: #fff;
        }
    }
}
</style>