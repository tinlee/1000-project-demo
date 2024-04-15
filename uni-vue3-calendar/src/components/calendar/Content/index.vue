<template>
    <view class="content-container">
        <Month v-if="store.viewStatus === 'month'" />
        <Day v-if="store.viewStatus === 'day'" />

    </view>
</template>

<script setup lang="ts">
import { userCalendar } from '../store';
import Month from '../Month/content.vue';
import Day from '../Day/content.vue';
import Test from '../text.vue'


const store = userCalendar()



</script>

<style scoped lange="less">
.content-container {
    flex: 1;
    overflow: hidden;
}

/* Your component styles go here */
</style>