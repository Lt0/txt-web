<template>
<Button type="ghost" shape="circle" :icon="icon" class="app-btn" @click="click"></Button>
</template>

<script>
export default {
    props: ['icon'],
    methods: {
        click (arg) {
            this.$emit('click', arg);
        },
    },
}
</script>

