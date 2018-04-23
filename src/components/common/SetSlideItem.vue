<template>
    <div class="set-item">
        <div v-html="title"></div>
        <div class="slider app-btn-gutter-l">
            <Slider :value="value" @input="changeSlide" show-input :min="min" :max="max" @on-change="changeSlide"></Slider>
        </div>
        <Tooltip placement="top" :content="btnTips">
            <Button type="ghost" class="app-btn-gutter-l" @click="clickBtn">
                默认
            </Button>
        </Tooltip>
    </div>
</template>

<script>
// 使用说明
// 示例：<SetSlideItem title='文字间隔' v-model="theme.letterSpacing" :min="-2" :max="20" @changeSlide="setEvHandler" btnTips="应用的默认值" @clickBtn="theme.letterSpacing=defaultTheme.letterSpacing; setEvHandler();" />
// [:]title: 设置项最左边显示的名字
// v-model: 双向绑定的变量
// :min: 滑块的最小值
// :max: 滑块的最大值
// @changeSlide: 滑块操作结束后触发的事件

// btnTips: 默认按钮的 Tooltips 说明
// @clickBtn: 点击默认按钮触发的事件


export default {
    //[:]value: 滑块的值， v-model 所配置的值会以 value 的变量名传递进来当前组件
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
