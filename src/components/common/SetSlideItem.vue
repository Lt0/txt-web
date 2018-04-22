<template>
    <div class="set-item">
        <div>{{ title }}</div>
        <div class="slider app-btn-gutter-l">
            <Slider :v-model="v-model" show-input :min="min" :max="max" @on-change="changeSlide"></Slider>
        </div>
        <Tooltip placement="top" content="btnContent">
            <Button type="ghost" class="app-btn-gutter-l" @click="clickBtn">
                默认
            </Button>
        </Tooltip>
    </div>
</template>

<script>
export default {
    props: ['title', 'v-model', 'min', 'max', 'btnContent'],
    methods: {
        changeSlide (arg) {
            this.$emit('changeSlide', arg);
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
