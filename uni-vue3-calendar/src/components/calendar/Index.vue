<template>
    <Add />
    <div class="calendar-container">
        <view class="insert-container">
            <Header />
            <Content />
            <Footer />
        </view>
    </div>
</template>


<script setup lang="ts">

import Header from './Header/index.vue';
import Footer from './Footer/index.vue';
import Content from './Content/index.vue';
import Add from './Add/index.vue';
import { inject, provide, ref } from 'vue';


const addRef = ref('11')
provide('addRef', addRef)

</script>

<style scoped lange="less">
.calendar-container {

    width: 100vw;
    min-height: 100vh;
    padding-bottom: constant(safe-area-inset-bottom);
    /* 兼容 iOS < 11.2 */

    padding-bottom: env(safe-area-inset-bottom);
}

.insert-container {
    padding-bottom: 100rpx;

}

/* Your component styles go here */
</style>