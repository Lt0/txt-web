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

    #caption-title{
        padding-bottom: 20px;
    }
</style>
<template>
<div id="layout" :style="{background: conf.theme.bg, fontFamily: conf.theme.font}">
    <div id="hdr" :style="{background: conf.theme.hdrBg}">
        <div id="hdr-container">
            <div id="hdr-left">{{ captionTitle }}</div>
            <div id="hdr-center"></div>
            <div id="hdr-right">
                <HdrBookmarks class="app-btn-gutter-l" :relDir="relDir" :file="file" :caption="caption" :captionTitle="captionTitle" @goBookmarkEv="goBookmarkEvHandler" />
                <HdrCatalogs class="app-btn-gutter-l" :bookRoot="bookRoot" :relDir="relDir" :file="file" :caption="caption" @goCaptionByCatalog="goCaption" @sendCatalogs="recvCatalogs" />
                <HdrSet class="app-btn-gutter-l" v-model="conf" />
                <HdrMore class="app-btn-gutter-l" :bookRoot="bookRoot" :relDir="relDir" :file="file"/>
            </div>
        </div>
    </div>

    <div id="main" @scroll.native="saveReadPosition">
        <div id="main-layout">
            <div id="left" v-on:click="goPrev">
                <AppBtn id="goPrev" icon="ios-arrow-back" />
            </div>
            <div id="center">
                <div :style="{background: conf.theme.fontBg, color: conf.theme.fontColor, fontSize: conf.theme.fontSize+'%', lineHeight: conf.theme.lineHeight+'%', letterSpacing: conf.theme.letterSpacing+'px', paddingLeft: conf.theme.vPadding+'px', paddingRight: conf.theme.vPadding+'px', paddingTop: conf.theme.hPadding+'px', paddingBottom: conf.theme.hPadding+'px', width: (conf.theme.pageWidth*basePageWidth)+'px'}">
                    <h2 id="caption-title">{{ captionTitle }}</h2>
                    <p id="content">{{ content }}</p>
                </div>
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

let bookRoot = '/static/cache/books/';
let conf = new cm.userConf(Object.assign({}, cm.defaultTheme), JSON.parse(JSON.stringify(cm.themeList)));
    
    export default {
        components: {
            HdrMore,
            HdrCatalogs,
            HdrBookmarks,
            HdrSet,
            },
        data() {
            return {
                bookRoot: bookRoot,
                path: this.$route.params.path,
                fileInfo: null,
                catalogs: null,
                captionTitle: null,
                content: null,
                loading: true,
                basePageWidth: cm.basePageWidth,
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
/*             console.log("created: path: " + this.path);
            console.log("created: relDir: " + this.relDir);
            console.log("created: file: " + this.file);
            console.log("created: caption: " + this.caption); */
            getReadPosition(this);
        },
        mounted () {
            //如果自动记录的 caption 和用户输入的 caption 相同，直接 goCaption 到自动记录的 caption 不会触发路由变化，也就不会触发获取 content 函数，所以需要手动获取一次自动记录的章节内容
            this.goCaption(this.readPosition.caption);
            this.fetchContent(this.readPosition.caption);
            
            registkeyupHandler(this);
            registScrollHandler(this);
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route' (to, from) {
                this.loading = true;
                this.fetchContent(this.caption);
            },
            catalogs () {
                this.captionTitle = cm.getCaptionTitleCur(this);
            },
            content () {
                console.log("content changed");
                this.captionTitle = cm.getCaptionTitleCur(this);

                this.$nextTick(this.setReadPositionScroll);
                this.$nextTick(this.saveReadPosition);
            },
        },
        methods: {
            recvCatalogs (cata) {
                this.catalogs = cata;
            },
            fetchContent (caption) {
                cm.fetchCaptionContent(this, bookRoot, this.relDir, this.file, caption);
            },
            jump () {
                console.log("jump");
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
            goPrev () {
                let self = this;
                goPrev(self);
            },
            goNext () {
                let self = this;
                goNext(self)
            },
            saveReadPosition () {
                saveReadPosition(this);
            },
            setReadPositionScroll () {
                cm.setReadPositionScroll(this);
            },
            goBookmarkEvHandler (readPosition) {
                console.log("goBookmarkEvHandler");
                let self = this;

                self.readPosition = readPosition;
                let caption = self.caption;
                if (caption != readPosition.caption) {
                    console.log("goBookmark: NOT in bookmark's caption, goCaption");
                    self.goCaption(readPosition.caption);
                } else {
                    console.log("goBookmark: in bookmark's caption, set position directly");
                    cm.setReadPositionScroll(self);
                }
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

    function registkeyupHandler(self){
        console.log("registkeyupHandler");
        document.onkeyup = function(ev){
            console.log("registkeyupHandler");
            switch (ev.keyCode) {
                case 37: //left
                    self.goPrev();
                    break;
                case 39: //right
                    self.goNext();
                    break;
                default:
            }
        }
    }

    function registScrollHandler(self) {
        console.log("registScrollHandler");
        let m = document.getElementById("main");
        m.onscroll = function() {
            saveReadPosition(self);
        }
    }

    // 保存当前阅读进度到自动进度记录 self.readPosition
    function saveReadPosition(self){
        cm.updateReadPosition(self, self.readPosition);
        localStorage.setItem(self.readPosition.key, JSON.stringify(self.readPosition));
        //console.log("saved readPosition: " + JSON.stringify(self.readPosition));
    }

    //从本地读取之前的阅读进度记录
    function getReadPosition(self){
        console.log("getReadPosition for " + self.relDir + self.file);
        let key = "readPosition-" + self.relDir + self.file;
        self.readPosition = JSON.parse(localStorage.getItem(key));
        
        if (!self.readPosition) {
            console.log("no saved readPosition for this file, create.");
            let caption = self.caption;

            self.readPosition = new cm.ReadPosition(self.relDir + self.file, caption, self.captionTitle, 0, 0, Date());
            console.log("created readPosition: " + JSON.stringify(self.readPosition));
        }
    }
</script>
