<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['onChangeStatus']);
const onStart = () => {
    emit('onChangeStatus', 'math');
};

</script>
<template>
    <div class="banner">
        <img src="../assets/banner.png" alt="logo" />
    </div>
    <div class="start-button" @click="onStart">start</div>

</template>

<style scoped>
.banner {
    img {
        width: 100%;
        display: block;

    }

}

.start-button {
    width: 80%;
    height: 100px;
    margin: 40px auto;
    border-radius: 40px;
    background-color: #ffe2a6;
    display: flex;
    color: orange;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;

}
</style>