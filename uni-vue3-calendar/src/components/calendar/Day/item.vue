<template>
    <view class="item-text" @click="changeEditInfo">
        {{ props.item.title }}


    </view>
</template>

<script setup lang="ts">
import { defineProps, inject } from 'vue';
import { userCalendar } from '../store';
const props = defineProps({
    item: Object,
    index: Number
})
const store = userCalendar()
const addRef = inject('addRef')

function changeEditInfo() {
    store.changeEditInfo(props.item, props.index)
    addRef?.value.open('bottom')

}

</script>

<style scoped lang="scss">
.item-text {
    background: #f1f1f1;
    flex: 1;
    border-radius: 8rpx;
    border-left: 8rpx solid red;
    padding: 8rpx;
    font-size: 28rpx;
    overflow: hidden;
}
</style>