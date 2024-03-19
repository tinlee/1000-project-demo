<template>
    <div class="math">
        <div class=" box">{{ current.firstNumber }}</div>
        <div class=" box">{{ current.operator }}</div>
        <div class=" box">{{ current.secondNumber }}</div>
        <div class=" box">=</div>
        <div class=" box">?</div>
    </div>
    <div class="answer">
        <div class="answer-button" @click="answerClick(i)" v-for="i in 10">
            {{ i }}</div>
    </div>
    <div class="tooptip" v-if="toolTip === 'right'">
        <img src="../assets/right.png" alt="right" />
    </div>
    <div class="tooptip" v-if="toolTip === 'wrong'">
        <img src="../assets/wrong.png" alt="wrong" />
    </div>

</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import rightAudioSource from '../assets/right.mp3'
import wrongAudioSource from '../assets/wrong.mp3'
const emit = defineEmits(['onChangeStatus'])
const mathList = []
const current = ref({})
const toolTip = ref(null)

const rightAudio = new Audio(rightAudioSource)
const wrongAudio = new Audio(wrongAudioSource)


function changeToolTip(value) {
    let audio
    toolTip.value = value
    if (value === 'right') {
        audio = rightAudio
    } else if (value === 'wrong') {
        audio = wrongAudio
    }
    audio.play()

    setTimeout(() => {
        toolTip.value = null
    }, 3000)
}


function createMath() {
    //  生成2-10的随机数
    let result = Math.floor(Math.random() * 8) + 2
    const operator = Math.random() > 0.5 ? '+' : '-'; // 生成规则
    const firstNumber = Math.floor(Math.random() * (result - 1)) + 1
    let secondNumber = result - firstNumber
    if (operator === '+') {
        return {
            firstNumber,
            secondNumber,
            operator,
            result
        }
    } else {
        return {
            firstNumber: result,
            secondNumber: firstNumber,
            operator,
            result: secondNumber
        }

    }
}

function answerClick(answer) {
    if (mathList.length === 0) {
        emit('onChangeStatus', 'success')
        return
    }
    if (answer === current.value.result) {
        changeToolTip('right')
        current.value = mathList.shift()
    } else {
        changeToolTip('wrong')

    }

}

onMounted(() => {
    for (let i = 0; i < 10; i++) {
        mathList.push(createMath())
    }
    current.value = mathList.shift()
})


</script>

<style scoped>
.math {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    gap: 10px;
    padding: 100px 0;
    font-weight: bold;


}

.box {
    width: 60px;
    border-radius: 10px;
    background: #ffe2a6;
    line-height: 60px;
    text-align: center;
    color: #8ec1db;
}


.answer {
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
}

.answer-button {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background: #fff;
    line-height: 60px;
    text-align: center;
    color: #80ccc6;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);

}

.tooptip {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.tooptip img {
    width: 200px;
    height: 200px;
}
</style>