<template>
<Dropdown id="captions" placement="bottom-end" trigger="click" class="caption-list" transfer @on-click="goCaption" >
    <Button type="text" shape="circle" icon="navicon-round" class="btn btn-gutter-l"></Button>
    <DropdownMenu slot="list">
        <DropdownItem class="caption-list-item" v-for="catalog in catalogs" :name="catalog.name" :key="catalog.index">{{ catalog.text }}</DropdownItem>
    </DropdownMenu>
</Dropdown>
</template>

<script>
import axios from 'axios'
import cm from '../common/js'

export default {
    props: ['bookRoot', 'relDir', 'file', 'caption'],
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
            let self = this;
            let catalogUrl = self.bookRoot + self.relDir + self.file + "/" + "catalog.txt";
            console.log("HdrCatalogs get catalog: " + catalogUrl);

            axios.get(catalogUrl).then(function(response){
                splitCatalogs(response.data, self);
                self.captionTitle = cm.getCaptionTitleCur(self);
                let t = document.getElementsByTagName("title")[0];
                t.innerHTML = self.file;
                self.$emit('sendCatalogs', self.catalogs);
            }).catch(function(error){
                console.log(error);
            });
        },
        goCaption (val) {
            console.log("goCaption in HdrCatalogs component: " + val);
            this.$emit('goCaptionByCatalog', val)
        },
    },
}

function splitCatalogs(catalogsStr, self) {
    let cls = catalogsStr.split("\n");
    
    self.catalogs = [];
    for (var i = 0; i < cls.length; i++) {
        if (cls[i] == "") {
            continue;
        }
        let item = {name: "", text: ""};
        item.name = (i+1) + ".txt";
        item.text = (i+1) +": " + cls[i];
        self.catalogs.push(item);
    }
}

</script>

<style scoped>
    .btn{
        color: #fff;
        mix-blend-mode: exclusion;
    }
    .btn:hover{
        border-color: #fff;
        mix-blend-mode: difference;
    }
    .btn:active{
        border-color: #fff;
        mix-blend-mode: difference;
    }
    .btn:visited{
        border-color: #fff;
        mix-blend-mode: difference;
    }
    .btn:focus{
        border-color: #fff;
        mix-blend-mode: difference;
    }

    .btn-gutter-l {
        margin-left: 16px;
    }

    .caption-list-item{
        width: 250px;
        text-align: left;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
</style>