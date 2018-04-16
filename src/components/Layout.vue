<style scoped>
    .btn{
        color: #fff;
    }
    .caption-list-item{
        width: 250px;
        text-align: left;
        overflow-x: hidden;
    }
    #content{
        line-height: 200%;
        text-align: justify;
    }

    #hdr{
        position: fixed;
        top: 0px;
        left: 0px;

        display: flex;
        justify-content: center;

        color: #fff;
        background-color: #1c2438;

        width: 100%;
        height: 64px;
        padding: 16px 50px;
    }
    #hdr-left{
        flex-grow: 0;

        display: flex;
        align-items: center;
    }
    #hdr-center{
        flex-grow: 1;
    }
    #hdr-right{
        flex-grow: 0;
    }

    .hdr-btn {
        margin-bottom: 16px;
    }
    .hdr-btn-gutter {
        margin-left: 16px;
        margin-right: 16px;
    }
    .hdr-btn-gutter-r {
        margin-right: 16px;
    }
    .hdr-btn-gutter-l {
        margin-left: 16px;
    }

    #main{
        display: flex;
        justify-content: center;

        padding-top: 64px;
        background: #f5f7f9;
    }
    #left{
        flex-grow: 1;
    }
    #center{
        min-height: 800px;
        width: 800px;
        background: #fff;
        padding: 50px;
        margin: 25px auto;
    }
    #right{
        flex-grow: 1;
    }
    #goNext{
        position: fixed;
        top: 50%;
        right: 50px;
    }
    #goPrev{
        position: fixed;
        top: 50%;
        left: 50px;
    }

    #caption-title{
        padding-bottom: 20px;
    }
</style>
<template>
<div>
    <div id="hdr">
        <div id="hdr-left">{{ captionTitle }}</div>
        <div id="hdr-center"></div>
        <div id="hdr-right">
            <ButtonGroup>
            <Button type="text" shape="circle" icon="minus-round" class="btn hdr-btn" v-on:click="minusFont"></Button>
            <Button type="text" shape="circle" icon="plus-round" class="btn hdr-btn" v-on:click="plusFont"></Button>
            </ButtonGroup>
            <Dropdown id="captions" placement="bottom-end" trigger="click" class="caption-list" transfer @on-click="goCaption">
                <Button type="ghost" shape="circle" icon="navicon-round" class="btn hdr-btn hdr-btn-gutter-l"></Button>
                <DropdownMenu slot="list">
                    <DropdownItem class="caption-list-item" v-for="catalog in catalogs" :name="catalog.name" :key="catalog.index">{{ catalog.text }}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
    <div id="main">
        <div id="left" v-on:click="goPrev"><Icon id="goPrev" type="chevron-left"></Icon></div>
        <div id="center" v-bind:style="{fontSize: fontSize + '%'}">
            <h2 id="caption-title">{{ captionTitle }}</h2>
            <p id="content">{{ content }}</p>
        </div>
        <div id="right" v-on:click="goNext"><Icon id="goNext" type="chevron-right"></Icon></div>
    </div>
    <Footer class="layout-footer-center" :style="{color: '#80848f'}">2018 &copy; lightimehpq@gmail.com</Footer>
</div>
</template>
<script>
import axios from 'axios'

let rootPath = '/static/cache/books/';

    export default {
        data() {
            return {
                catalogs: null,
                content: null,
                captionTitle: null,
                loading: true,
                fontSize: 120,
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchContent();
            this.fetchCatalogs();
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            //'$route': 'fetchData'
            '$route' (to, from) {
                this.loading = true;
                this.fetchContent();
                this.fetchCatalogs();
            }
        },
        methods: {
            fetchCatalogs () {
                var self = this;

                let file = self.$route.params.file;
                let catalogUrl = rootPath + file + "/" + "catalog.txt";
                console.log("catalogUrl: " + catalogUrl);

                axios.get(catalogUrl).then(function(response){
                    splitCatalogs(response.data, self);

                    let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
                    let i = caption.replace(/.txt$/, "")
                    //console.log("i: " + i);
                    let captionTitle = self.catalogs[parseInt(i)-1].text
                    captionTitle = captionTitle.replace(/^.*: /, "");
                    //console.log("captionTitle: " + captionTitle);
                    self.captionTitle = captionTitle;

                    let t = document.getElementsByTagName("title")[0];
                    t.innerHTML = file;

                }).catch(function(error){
                    console.log(error);
                });
            },
            fetchContent () {
                console.log("fetchContent");
                var self = this;

                let file = self.$route.params.file;
                let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
                let contentUrl = rootPath + file + "/" + caption;
                console.log("contentUrl: " + contentUrl);

                
                
                axios.get(contentUrl).then(function(response){
                    self.loading = false;
                    self.content = response.data;
                }).catch(function(error){
                    console.log(error);
                });
                
            },
            goCaption (val) {
                console.log("goCaption: " + val);
                let p = "/" + this.$route.params.file + "/" + val;
                this.$router.push({ path: p })
            },
            goPrev () {
                //console.log("go previous");
                let self = this;

                let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
                let index = caption.replace(/.txt$/, "")
                let prevIndex = (parseInt(index)-1);
                if (prevIndex < 1) return;

                let prevCaption = prevIndex + ".txt";
                let p = "/" + this.$route.params.file + "/" + prevCaption;
                this.$router.push({ path: p })
            },
            goNext () {
                //console.log("go next")
                let self = this;

                let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
                let index = caption.replace(/.txt$/, "")
                let nextIndex = (parseInt(index)+1);
                if ((nextIndex-1) >= self.catalogs.length) return;

                let nextCaption = nextIndex + ".txt";
                let p = "/" + this.$route.params.file + "/" + nextCaption;
                this.$router.push({ path: p })
            },
            minusFont () {
                console.log("minusFont");
                if (this.fontSize <= 10) return;
                this.fontSize -= 10;
                this.$Message.info('字体大小: ' + this.fontSize + "%");
            },
            plusFont () {
                console.log("plusFont");
                this.fontSize += 10;
                this.$Message.info('字体大小: ' + this.fontSize + "%");
            },
        }

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
