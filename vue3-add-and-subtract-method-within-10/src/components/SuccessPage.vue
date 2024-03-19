<template>
    <div class="container">

        <img src="../assets/success.png" alt="right" />
    </div>
    <div class="restart" @click="restart">
        再来一次
    </div>
</template>

<script setup>
import { defineEmits, onMounted } from 'vue';
import successAudioSource from '../assets/success.mp3';
const emit = defineEmits(['onChangeStatus']);
const successAudio = new Audio(successAudioSource);
const restart = () => {
    emit('onChangeStatus', 'start');
};

onMounted(() => {
    successAudio.play();
});
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

}

.container img {
    width: 100%;
    display: block;
}


.restart {
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