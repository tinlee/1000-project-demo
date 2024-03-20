<script setup>
import { ref } from 'vue'
import StartPage from './components/StartPage.vue'
import MathPage from './components/MathPage.vue'
import SuccessPage from './components/SuccessPage.vue'

const pageStatus = ref('start')

function onChangeStatus(status) {
  pageStatus.value = status
}

</script>

<template>
  <StartPage @onChangeStatus="onChangeStatus" v-if="pageStatus === 'start'" />
  <MathPage @onChangeStatus="onChangeStatus" v-else-if="pageStatus === 'math'" />
  <SuccessPage @onChangeStatus="onChangeStatus" v-if="pageStatus === 'success'" />
</template>

<style scoped></style>
