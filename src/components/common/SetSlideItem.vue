<template>
    <div class="set-item">
        <div v-html="title"></div>
        <div class="slider app-btn-gutter-l">
            <Slider :value="value" @input="changeSlide" show-input :min="min" :max="max" @on-change="changeSlide"></Slider>
            <!-- <Slider :something="vmVal" @input="changeSlide" show-input :min="min" :max="max" @on-change="changeSlide"></Slider> -->
        </div>
        <Tooltip placement="top" :content="btnTips">
            <Button type="ghost" class="app-btn-gutter-l" @click="clickBtn">
                默认
            </Button>
        </Tooltip>
    </div>
</template>

<script>
export default {
    //title: 设置项最左边显示的名字
    //value: 滑块的值， v-model 所配置的值会以 value 的变量名传递进来当前组件
    //min: 滑块的最小值
    //max: 滑块的最大值
    //btnTips: 默认按钮的 Tooltips 说明
    props: ['title', 'value', 'min', 'max', 'btnTips'],

    methods: {
        changeSlide (arg) {
            this.$emit('input', arg);
        },
        clickBtn (arg) {
            this.$emit('clickBtn', arg);
        },
    },
}
</script>

<style scoped>
    .set-item{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .set-title{
        padding-bottom: 16px;
    }
    .set-item .slider{
        flex-grow: 1;
    }
</style>
