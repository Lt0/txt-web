<template>
<Dropdown id="captions" placement="bottom-end" trigger="click" class="app-caption-list" transfer @on-click="goCaption" >
    <AppBtn icon="navicon-round" />
    <DropdownMenu slot="list">
        <DropdownItem class="app-caption-list-item" v-for="catalog in catalogs" :name="catalog.name" :key="catalog.index">{{ catalog.text }}</DropdownItem>
    </DropdownMenu>
</Dropdown>
</template>

<script>
import axios from 'axios'
import cm from '../common/js'

export default {
    props: ['relDir', 'file', 'caption'],
    data () {
        return {
            catalogs: null,
        }
    },
    created () {
        this.fetchCatalogs();
    },
    methods: {
        fetchCatalogs () {
            cm.fetchCatalogs(this, this.relDir, this.file);
        }, 
        goCaption (val) {
            console.log("goCaption in HdrCatalogs component: " + val);
            this.$emit('goCaptionByCatalog', val)
        },
    },
}
</script>

<style scoped>
</style>