<template>
    <uni-transition :show="show" class="mask">

    </uni-transition>
    <uni-transition mode-class="slide-bottom" :show="show" class="modal">
        <view class="header">
            <view class="close" @click="close">取消</view>
            <view class="title">{{ store.editInfo?.data ? '编辑日程' : "新建日程" }}</view>
            <view :class="{
        add: true,
        disabled: !formData.title
    }" @click="addFn">
                添加</view>
        </view>
        <view class="content">
            <uniForm ref="form" :model="formData" :border="true">
                <view class="input-gorm-box">
                    <uni-forms-item name="title">
                        <uni-easyinput v-model="formData.title" :inputBorder="false" placeholder="标题"></uni-easyinput>
                    </uni-forms-item>
                </view>
                <view class="input-gorm-box date-form">

                    <uni-forms-item label="日期">
                        <view @click="showCalenday"> {{ formData.date }}</view>
                    </uni-forms-item>
                    <uni-calendar :insert="false" ref="calendar" class="uni-calendar--hook" :date="formData.date"
                        @confirm="calendayChange" />

                    <uni-forms-item label="开始时间" name="startTime">

                        <time-picker type="time" :hideSecond="true" v-model="formData.startTime" :border="false"
                            :start="timepickerStartTime" style="width: 100%;">
                            {{ formData.startTime }}

                        </time-picker>

                    </uni-forms-item>
                    <uni-forms-item label="结束时间" name="endTime">

                        <time-picker type="time" :hideSecond="true" v-model="formData.endTime" :border="false"
                            :start="timepickerStartTime" style="width: 100%;">
                            {{ formData.endTime }}

                        </time-picker>

                    </uni-forms-item>
                </view>
                <view class="input-gorm-box">
                    <uni-forms-item name="remark">
                        <uni-easyinput v-model="formData.remark" :inputBorder="false" type="textarea" autoHeight
                            placeholder="备注"></uni-easyinput>
                    </uni-forms-item>
                </view>

            </uniForm>
        </view>
        <view class="delete" @click="onDelete">删除日程</view>

    </uni-transition>

</template>

<script setup lang="ts">
import uniTransition from '@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue';
import uniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue';
import uniForms from '@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue';
import timePicker from '@dcloudio/uni-ui/lib/uni-datetime-picker/time-picker.vue';
import uniCalendar from '@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue';
import uniFormsItem from '@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue';
import { inject, ref } from 'vue';
import { userCalendar } from '../store';
import dayjs from 'dayjs';


const store = userCalendar()
const addRef = inject('addRef')
const show = ref(false)
const form = ref()
const calendar = ref()
const formData = ref({

})



const close = () => {
    show.value = false
}
const open = () => {

    if (store.editInfo?.data) {
        formData.value = {
            ...store.editInfo.data
        }
        console.log('store.editInfo.data', store.editInfo.data)
    } else {
        formData.value = {
            title: '',
            date: dayjs(store.day).format('YYYY-MM-DD'),
            startTime: dayjs().startOf('hour').add(1, 'hour').format('HH:mm'),
            endTime: dayjs().startOf('hour').add(2, 'hour').format('HH:mm'),
            remark: '',
            status: 0
        }
    }


    show.value = true
}
addRef.value = {
    open,
    close
}

function getKey(data) {
    return `${data.date}-${data.startTime}-${data.endTime}`
}

const timepickerStartTime = '00:00'

const calendayChange = (e) => {
    formData.value.date = e.fulldate
}
const addFn = () => {
    if (!formData.value.title) return
    if (

        dayjs(formData.value.startTime, 'HH:mm').isAfter(dayjs(formData.value.endTime, 'HH:mm'))
    ) {
        uni.showToast({
            title: '结束时间不能小于开始时间',
            icon: 'none'
        })
        return
    }
    console.log('formData.value', formData.value)
    if (store.editInfo.data) {
        if (getKey(store.editInfo.data) !== getKey(formData.value)) {
            store.deleteList(store.editInfo.data, store.editInfo.index)
            store.addList(formData.value)
        } else {
            store.changeList(formData.value, store.editInfo.index)
        }


    } else {
        store.addList(formData.value)

    }

    close()
}

const showCalenday = () => {
    calendar.value.open()
}

const onDelete = () => {
    if (store.editInfo.data) {
        store.deleteList(store.editInfo.data, store.editInfo.index)
    }
    close()
}
</script>

<style scoped lang="scss">
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal {
    width: 100%;
    background: #f1f1f1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding-bottom: 80rpx;

}

.header {
    display: flex;
    justify-content: space-between;
    padding: 16rpx;

    .close {
        color: #333;
        color: red;
    }

    .title {
        color: #333;
    }

    .add {
        color: red;

        &.disabled {
            color: #999;
        }
    }
}

.input-gorm-box {
    background: #fff;
    padding: 8rpx 32rpx;
    margin: 32rpx;
    border-radius: 16rpx;
    line-height: 72rpx;

    .uni-forms-item {
        margin-bottom: 0;
    }

    ::v-deep {
        .uni-forms-item+.uni-forms-item {
            border-top: 1px solid #f1f1f1
        }
    }

    .startTime {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;

        ::v-deep {
            .uni-easyinput__content {
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
            }
        }


    }

    .endTime {
        border-top-right-radius: 0;
        border-top-left-radius: 0;

        ::v-deep {
            .uni-easyinput__content {
                border-top-right-radius: 0;
                border-top-left-radius: 0;
            }
        }


    }

}

.delete {
    color: red;
    font-size: 32rpx;
    text-align: center;
    padding: 16rpx;
}
</style>