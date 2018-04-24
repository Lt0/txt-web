<style scoped>
    #layout{
        height: 100vh;

        display: flex;
        flex-direction: column;

        overflow: hidden;
    }
    #hdr-container{
        display: flex;

        width: 100%;
        padding: 14px 50px;
    }
    #main{
        flex-grow: 1;
        overflow: auto;
    }
    .footer{
        color: #777;
        mix-blend-mode: difference;
    }
    #content{
        text-align: justify;
    }

    #hdr-left{
        flex-grow: 0;

        display: flex;
        align-items: center;

        color: #fff;
        mix-blend-mode: difference;
    }
    #hdr-center{
        flex-grow: 1;
    }
    #hdr-right{
        flex-grow: 0;
        
        display: flex;
        justify-content: flex-end;
    }

    #main-layout{
        display: flex;
        justify-content: center;
    }
    #left{
        flex-grow: 1;
        cursor: pointer;
    }
    #center{
        min-height: 800px;
        margin: 25px auto;
        height: auto;
    }
    #right{
        flex-grow: 1;
        cursor: pointer;
    }
    #goNext{
        position: fixed;
        top: 50%;
        right: 20px;
    }
    #goPrev{
        position: fixed;
        top: 50%;
        left: 20px;
    }
</style>
<template>
<div id="layout" :style="{background: conf.theme.bg, fontFamily: conf.theme.font}">
    <div id="hdr" :style="{background: conf.theme.hdrBg}">
        <div id="hdr-container">
            <div id="hdr-left">{{ captionTitle }}</div>
            <div id="hdr-center"></div>
            <div id="hdr-right">
                <HdrBookmarks class="app-btn-gutter-l" :relDir="relDir" :file="file" :caption="caption" :captionTitle="captionTitle" />
                <HdrCatalogs class="app-btn-gutter-l" :relDir="relDir" :file="file" :caption="caption" @goCaptionByCatalog="goCaption" @sendCatalogs="recvCatalogs" />
                <HdrSet class="app-btn-gutter-l" v-model="conf" />
                <HdrMore class="app-btn-gutter-l" :relDir="relDir" :file="file"/>
            </div>
        </div>
    </div>

    <div id="main" @scroll.native="saveReadPosition">
        <div id="main-layout">
            <div id="left" v-on:click="goPrev">
                <AppBtn id="goPrev" icon="ios-arrow-back" />
            </div>
            <div id="center">
                <Content :relDir="relDir" :file="file" :caption="caption" :conf="conf" :catalogs="catalogs" @updateContentEv="updateContentEvHandler" />
                <Footer class="layout-footer-center footer" :style="{background: 'transparent'}">2018 &copy; lightimehpq@gmail.com</Footer>
            </div>
            <div id="right" v-on:click="goNext">
                <AppBtn id="goNext" icon="ios-arrow-forward" />
            </div>
        </div>
        
    </div>
</div>
</template>
<script>
import axios from 'axios'
import cm from './common/js'
import HdrBookmarks from '@/components/hdr/HdrBookmarks'
import HdrMore from '@/components/hdr/HdrMore'
import HdrCatalogs from '@/components/hdr/HdrCatalogs'
import HdrSet from '@/components/hdr/HdrSet'
import Content from '@/components/Content'

let conf = new cm.userConf(Object.assign({}, cm.defaultTheme), JSON.parse(JSON.stringify(cm.themeList)));
    
    export default {
        components: {
            HdrMore,
            HdrCatalogs,
            HdrBookmarks,
            HdrSet,
            Content,
            },
        data() {
            return {
                path: this.$route.params.path,
                fileInfo: null,
                catalogs: null,
                captionTitle: null,
                loading: true,
                conf: conf,
                bookInfoModal: false,
                readPosition: null,
            }
        },
        computed: {
            relDir: function(){ // file dir relative to bookRoot
                if (!this.$route.params.path) return "/";
                let params = this.$route.params.path.split("/");
                if (params.length < 3) return "/";
                let dirStrs = params.slice(0, params.length-2);
                let dir = "/";
                for (let i = 0; i < dirStrs.length; i++) {
                    dir += (dirStrs[i] + "/");
                }
                return dir;
            },
            file: function(){
                if (!this.$route.params.path) return null;
                let params = this.$route.params.path.split("/");
                if (params.length == 0) return null;
                if (params.length == 1) return this.path;
                return params[params.length-2];
            },
            caption: function(){
                if (!this.$route.params.path) return null;
                let params = this.$route.params.path.split("/");
                if (params.length < 2) return null;
                return params[params.length-1];
            },
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            /* console.log("created: path: " + this.path);
            console.log("created: relDir: " + this.relDir);
            console.log("created: file: " + this.file);
            console.log("created: caption: " + this.caption); */
        },
        mounted () {
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route' (to, from) {
            },
        },
        methods: {
            recvCatalogs (cata) {
                this.catalogs = cata;
            },
            goCaption (val) {
                cm.goCaption(this, this.relDir, this.file, val);
            },
            replaceCaption (val) {
                console.log("replaceCaption");
                let p = "/read/" + this.relDir + "/" + this.file + "/" + val;
                console.log("replaceCaption: " + p);
                this.$router.replace({ path: p });
            },
            updateContentEvHandler (arg) {
                this.captionTitle = arg;
            },
            goPrev () {
                let self = this;
                goPrev(self);
            },
            goNext () {
                let self = this;
                goNext(self)
            },
        }
    }

    function goPrev(self) {
        let caption = self.caption;
        let index = caption.replace(/.txt$/, "")
        let prevIndex = (parseInt(index)-1);
        if (prevIndex < 1) return;

        let prevCaption = prevIndex + ".txt";
        self.goCaption(prevCaption);
    }

    function goNext(self) {
        let caption = self.caption;
        let index = caption.replace(/.txt$/, "");
        let nextIndex = (parseInt(index)+1);
        if ((nextIndex-1) >= self.catalogs.length) return;
        let nextCaption = nextIndex + ".txt";
        self.goCaption(nextCaption);
    }
</script>
