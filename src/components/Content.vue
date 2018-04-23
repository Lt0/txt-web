<template>
    <div :style="{background: conf.theme.fontBg, color: conf.theme.fontColor, fontSize: conf.theme.fontSize+'%', lineHeight: conf.theme.lineHeight+'%', letterSpacing: conf.theme.letterSpacing+'px', paddingLeft: conf.theme.vPadding+'px', paddingRight: conf.theme.vPadding+'px', paddingTop: conf.theme.hPadding+'px', paddingBottom: conf.theme.hPadding+'px', width: (conf.theme.pageWidth*basePageWidth)+'px'}">
        <h2 id="caption-title">{{ captionTitle }}</h2>
        <p id="content">{{ content }}</p>
    </div>
</template>

<script>
import cm from './common/js'
export default {
    props: ['bookRoot', 'relDir', 'file', 'caption', 'catalogs', 'conf'],
    data () {
        return {
            captionTitle: null,
            content: null,
            basePageWidth: cm.basePageWidth,
        }
    },
    created () {
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
        caption () {
            this.fetchContent(this.caption);
        },
        catalogs () {
             this.captionTitle = this.getCaptionTitleCur();
        },
        content () {
            console.log("content changed");
            this.captionTitle = this.getCaptionTitleCur();

            this.$nextTick(this.setReadPositionScroll);
            this.$nextTick(this.saveReadPosition);
        },
    },
    methods: {
        goCaption (val) {
            cm.goCaption(this, this.relDir, this.file, val);
        },
        fetchContent (caption) {
            cm.fetchCaptionContent(this, this.bookRoot, this.relDir, this.file, caption);
        },
        getCaptionTitleCur () {
            return cm.getCaptionTitleCur(this);
        },
        saveReadPosition () {
            saveReadPosition(this);
        },
        setReadPositionScroll () {
            cm.setReadPositionScroll(this);
        },
    },
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

<style scoped>
    #caption-title{
        padding-bottom: 20px;
    }
</style>