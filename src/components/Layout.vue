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

    .footer{
        color: #777;
        mix-blend-mode: difference;
    }

    .caption-list-item{
        width: 250px;
        text-align: left;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
    #content{
        /*line-height: 200%;*/
        text-align: justify;
    }

    #hdr{
        position: fixed;
        top: 0px;
        left: 0px;

        display: flex;
        justify-content: center;

        width: 100%;
        height: 64px;
        padding: 16px 50px;
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
    }
    #left{
        flex-grow: 1;
    }
    #center{
        min-height: 800px;
        margin: 25px auto;
    }
    #right{
        flex-grow: 1;
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

    #setArea {
        width: 600px;
        
        padding: 0px 30px;
    }
    .set-group{
        padding: 16px 0px;
    }
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
    .btn-gutter {
        margin-left: 16px;
        margin-right: 16px;
    }
    .btn-gutter-l {
        margin-left: 16px;
    }
    .btn-gutter-r {
        margin-right: 16px;
    }
    .theme-list{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .theme-item{
        width: 90px;
        height: 90px;
        margin: 5px 5px 0px 0px;       
    }
    .theme-item-content{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .theme-close-container{
        display: flex;
        justify-content: flex-end;

        height: 30px;
    }
    .theme-close-btn{
        margin-right: 6px;
        margin-top: 6px;
        cursor: pointer;
    }
</style>
<template>
<div :style="{background: theme.bg, fontFamily: theme.font}">
    <div id="hdr" :style="{background: theme.hdrBg}">
        <div id="hdr-left">{{ captionTitle }}</div>
        <div id="hdr-center"></div>
        <div id="hdr-right">
            <ButtonGroup>
                <Tooltip content="fontSize - 10%">
                    <Button type="text" shape="circle" icon="minus-round" class="btn hdr-btn" @click="minusFont"></Button>
                </Tooltip>
                <Tooltip content="fontSize + 10%">
                    <Button type="text" shape="circle" icon="plus-round" class="btn hdr-btn" @click="plusFont"></Button>
                </Tooltip>
            </ButtonGroup>
            <Dropdown id="captions" placement="bottom-end" trigger="click" class="caption-list" transfer @on-click="goCaption">
                <Button type="text" shape="circle" icon="navicon-round" class="btn hdr-btn hdr-btn-gutter-l"></Button>
                <DropdownMenu slot="list">
                    <DropdownItem class="caption-list-item" v-for="catalog in catalogs" :name="catalog.name" :key="catalog.index">{{ catalog.text }}</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Dropdown id="setting" placement="bottom-end" trigger="custom" transfer :visible="setVisible">
                <Button type="text" size="large" shape="circle" icon="ios-gear" class="btn hdr-btn hdr-btn-gutter-l" @click="setVisible? setVisible=false: setVisible=true"></Button>
                <DropdownMenu slot="list">
                    <div id="setArea">
                        <div id="set-color" class="set-group">
                            <div class="set-title">
                                颜色设置
                                <Button type="ghost" size="small" class="btn-gutter-l" @click="theme.fontColor = defaultTheme.fontColor; theme.fontBg = defaultTheme.fontBg; theme.bg = defaultTheme.bg; theme.hdrBg=defaultTheme.hdrBg; setEvHandler();">默认</Button></div>
                            <div class="set-item">
                                <div>文字: <ColorPicker v-model="theme.fontColor" :colors="colors" size="small" @on-change="setEvHandler" /></div>
                                <div class="btn-gutter-l">纸张: <ColorPicker v-model="theme.fontBg" :colors="colors" size="small" @on-change="setEvHandler" /></div>
                                <div class="btn-gutter-l">背景: <ColorPicker v-model="theme.bg" :colors="colors" size="small" @on-change="setEvHandler" /></div>
                                <div class="btn-gutter-l">页首: <ColorPicker v-model="theme.hdrBg" :colors="colors" size="small" @on-change="setEvHandler" /></div>
                                
                            </div>
                        </div>

                        <div id="set-font" class="set-group">
                            <div class="set-title">字体设置</div>字体
                                <Select v-model="theme.font" placeholder=theme.font size="small" style="width:150px" class="btn-gutter-l" @on-change="setEvHandler">
                                    <Option v-for="item in fontList" :value="item.name" :key="item.index">{{ item.name }}</Option>
                                </Select>
                                <!-- 如果已设置过字体，点击默认是会触发 select 的 on-change 事件，这里不需要再绑定 on-change 事件 -->
                                <Button type="ghost" size="small" class="btn-gutter" @click="theme.font=defaultTheme.font;">默认</Button> 
                                <!--<span class="btn-gutter-l">繁体<i-switch class="btn-gutter-l" size="small"></i-switch></span>-->

                            <div class="set-item">
                                <div>字体大小</div>
                                <div class="slider btn-gutter-l"><Slider v-model="theme.fontSize" show-input :max="300" @on-change="setEvHandler"></Slider></div>
                                <Tooltip content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.fontSize=defaultTheme.fontSize; setEvHandler();">默认</Button></Tooltip>
                            </div>
                        </div>

                        <div id="set-gutter" class="set-group">
                            <div class="set-item">
                                <div>纸张大小</div>
                                <div class="slider btn-gutter-l"><Slider v-model="theme.pageWidth" show-input :min="0" :max="500" @on-change="setEvHandler"></Slider></div>
                                <Tooltip content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.pageWidth=defaultTheme.pageWidth; setEvHandler();">默认</Button></Tooltip>
                            </div>

                            <div class="set-item">
                                <div> 文字间隔</div>
                                <div class="slider btn-gutter-l"><Slider v-model="theme.letterSpacing" show-input :min="-2" :max="20" @on-change="setEvHandler"></Slider></div>
                                <Tooltip content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.letterSpacing=defaultTheme.letterSpacing; setEvHandler();">默认</Button></Tooltip>
                            </div>

                            <div class="set-item">
                                <div> 上下边距 </div>
                                <div class="slider btn-gutter-l"><Slider v-model="theme.hPadding" show-input :max="200" @on-change="setEvHandler"></Slider></div>
                                <Tooltip content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.hPadding=defaultTheme.hPadding; setEvHandler();">默认</Button></Tooltip>
                            </div>

                            <div class="set-item">
                                <div> 行&ensp;间&ensp;距 </div>
                                <div class="slider btn-gutter-l"><Slider v-model="theme.lineHeight" show-input :max="500" @on-change="setEvHandler"></Slider></div>
                                <Tooltip content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.lineHeight=defaultTheme.lineHeight; setEvHandler();">默认</Button></Tooltip>
                            </div>

                            <div class="set-item">
                                <div> 左右边距 </div>
                                <div class="slider btn-gutter-l"><Slider v-model="theme.vPadding" show-input @on-change="setEvHandler"></Slider></div>
                                <Tooltip content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.vPadding=defaultTheme.vPadding; setEvHandler();">默认</Button></Tooltip>
                            </div>
                        </div>

                        <div id="set-theme" class="set-group">
                            <div class="set-title">主题设置</div>
                            <div class="theme-list">
                                <div class="theme-item" v-for="t in themeList" :key="t.index" @click="useTheme(t)" :style="{background: t.theme.bg, color: t.theme.fontColor}">
                                    <div class="theme-close-container"><Tooltip content="彻底删除主题"><div @click.stop="delTheme(t)"><Icon type="close-circled" size="15" class="theme-close-btn"></Icon></div></Tooltip></div>
                                    <div class="theme-item-content"><div :style="{background: t.theme.fontBg, padding: '10px', width: '80%', textAlign: 'center',}">{{ t.name }}</div></div>
                                </div>
                            </div>
                        </div>

                        <div style="text-align: right; margin: 10px 0px 20px 0px">
                            <Tooltip placement="top" content="保存当前的配置为新主题"><Button type="ghost" class="btn-gutter-l" @click="addTheme">保存为主题</Button></Tooltip>
                            <Tooltip placement="top" content="恢复本地配置为应用默认配置"><Button type="ghost" class="btn-gutter-l" @click="resetUserConf">重置</Button></Tooltip>
                            <!--<Tooltip placement="top" content="同步服务器的配置到本地"><Button type="ghost" class="btn-gutter-l" @click="getUserConf">同步</Button></Tooltip>-->
                            <!--<Tooltip placement="top" content="保存当前配置到服务器"><Button type="ghost" class="btn-gutter-l" @click="saveUserConf">保存</Button></Tooltip>-->
                            <Button type="primary" class="btn-gutter-l" @click="setVisible=false">关闭</Button>
                        </div>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>

    <div id="main">
        <div id="left" v-on:click="goPrev">
            <Button id="goPrev" type="text" shape="circle" icon="ios-arrow-back" class="btn"></Button>
        </div>
        <div id="center" :style="{color: theme.fontColor, background: theme.fontBg , fontSize: theme.fontSize+'%', lineHeight: theme.lineHeight+'%', letterSpacing: theme.letterSpacing+'px', paddingLeft: theme.vPadding+'px', paddingRight: theme.vPadding+'px', paddingTop: theme.hPadding+'px', paddingBottom: theme.hPadding+'px', width: (theme.pageWidth*basePageWidth)+'px'}">
            <h2 id="caption-title">{{ captionTitle }}</h2>
            <p id="content">{{ content }}</p>
        </div>
        <div id="right" v-on:click="goNext">
            <Button id="goNext" type="text" shape="circle" icon="ios-arrow-forward" class="btn"></Button>
        </div>
    </div>

    <Footer class="layout-footer-center footer" :style="{background: 'transparent'}">2018 &copy; lightimehpq@gmail.com</Footer>
</div>
</template>
<script>
import axios from 'axios'

let rootPath = '/static/cache/books/';
let confUrl = '/static/cache/conf/user.conf';

const colors = ['#1c2438', '#495060', '#80848f', '#bbbec4', '#dddee1', '#e9eaec', '#f8f8f9', '#EFF3F6', '#f5f7f9', '#fff'];
const basePageWidth = 8;
function theme(hdrBg, bg, fontBg, fontColor, font, fontSize, lineHeight, vPadding, hPadding, letterSpacing, pageWidth) {
    this.hdrBg = hdrBg;
    this.bg = bg;
    this.fontBg = fontBg;
    this.fontColor = fontColor;
    this.font = font;
    this.fontSize = fontSize;
    this.lineHeight = lineHeight;
    this.vPadding = vPadding;
    this.hPadding = hPadding;
    this.latterSpacing = letterSpacing;
    this.pageWidth = pageWidth;             // width = pageWidth*basePageWidth + 'px'
}
function themeListItem(name, theme) {
    this.name = name;
    this.theme = theme;
}
function userConf(theme, themeList) {
    this.theme = theme;
    this.themeList = themeList;
}

const defaultTheme = {
    hdrBg: '#EFF3F6', 
    bg: '#f5f7f9', 
    fontBg: '#fff', 
    fontColor: '#495060',
    font: "",
    fontSize: 120,
    lineHeight: 200,
    vPadding: 50,
    hPadding: 50,
    letterSpacing: 0,
    pageWidth: 100,
    };

const darkTheme = {
    hdrBg: '#1C2438', 
    bg: '#495060', 
    fontBg: '#39404F', 
    fontColor: '#E9EAEC',
    font: "",
    fontSize: 120,
    lineHeight: 200,
    vPadding: 50,
    hPadding: 50,
    letterSpacing: 0,
    pageWidth: 100,
    };

const fontList = [
    {name: 'Helvetica Neue'}, 
    {name: 'Helvetica'}, 
    {name: 'PingFang SC'}, 
    {name: 'Hiragino Sans GB'}, 
    {name: 'Microsoft YaHei'}, 
    {name: '微软雅黑'}, 
    {name: 'Arial'}, 
    {name: 'sans-serif'},
    ];
const defaultThemeListItem = new themeListItem("default", defaultTheme);
const darkThemeListItem = new themeListItem("dark", darkTheme);
var themeList = [
    defaultThemeListItem,
    darkThemeListItem,
];
    
    export default {
        data() {
            return {
                catalogs: null,
                content: null,
                captionTitle: null,
                loading: true,
                setVisible: false,
                colors: colors,
                fontList: fontList,
                basePageWidth: basePageWidth,
                defaultTheme: defaultTheme,
                theme: Object.assign({}, defaultTheme),
                themeList: themeList,
            }
        },
        beforeCreate () {
            getUserConf(this);
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
            },
            themeList: function () {
                // 直接在这里监听的话，载入页面时加载用户配置也会更改 themeList 导致指出 setEvHandler
                //this.setEvHandler();
            },
        },
        methods: {
            fetchCatalogs () {
                let self = this;
                fetchCatalogs(this);
            },
            fetchContent () {
                var self = this;
                fetchContent(self)
            },
            goCaption (val) {
                let p = "/" + this.$route.params.file + "/" + val;
                this.$router.push({ path: p })
            },
            goPrev () {
                let self = this;
                goPrev(self);
            },
            goNext () {
                let self = this;
                goNext(self)
            },
            minusFont () {
                if (this.theme.fontSize <= 10) return;
                this.theme.fontSize -= 10;
                this.$Message.info('字体大小: ' + this.theme.fontSize + "%");
            },
            plusFont () {
                this.theme.fontSize += 10;
                this.$Message.info('字体大小: ' + this.theme.fontSize + "%");
            },
            addTheme () {
                const tmpTheme = Object.assign({}, this.theme);
                const t = new themeListItem(this.themeList.length + 1, tmpTheme);
                this.themeList.push(t);
                this.setEvHandler();
            },
            delTheme (t) {
                console.log("delTheme: " + t.name);
                for (let i=0; i<this.themeList.length; i++){
                    if (t.name == this.themeList[i].name){
                        this.themeList.splice(i, 1);
                        break;
                    }
                }
                this.setEvHandler();
            },
            useTheme (t) {
                const tmpTheme = Object.assign({}, t.theme); 
                this.theme = tmpTheme;
                this.setEvHandler();
            },
            saveUserConf () {
                saveUserConf(this);
            },
            getUserConf () {
                let self = this;
                getUserConf(self);
            },
            resetUserConf () {
                this.theme = Object.assign({}, defaultTheme);
                this.themeList = [defaultThemeListItem, darkThemeListItem];
            },
            setEvHandler () {
                console.log("setEvHandler");
                //console.log("theme: " + JSON.stringify(this.theme));
                saveUserConf(this);
            },
        }

    }

    function fetchCatalogs (self) {
        let file = self.$route.params.file;
        let catalogUrl = rootPath + file + "/" + "catalog.txt";
        console.log("catalogUrl: " + catalogUrl);

        axios.get(catalogUrl).then(function(response){
            splitCatalogs(response.data, self);

            let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
            let i = caption.replace(/.txt$/, "")
            let captionTitle = self.catalogs[parseInt(i)-1].text
            captionTitle = captionTitle.replace(/^.*: /, "");
            self.captionTitle = captionTitle;

            let t = document.getElementsByTagName("title")[0];
            t.innerHTML = file;

        }).catch(function(error){
            console.log(error);
        });
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

    function fetchContent(self) {
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
    }

    function goPrev(self) {
        let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
        let index = caption.replace(/.txt$/, "")
        let prevIndex = (parseInt(index)-1);
        if (prevIndex < 1) return;

        let prevCaption = prevIndex + ".txt";
        let p = "/" + self.$route.params.file + "/" + prevCaption;
        self.$router.push({ path: p })
    }

    function goNext(self) {
        let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
        let index = caption.replace(/.txt$/, "")
        let nextIndex = (parseInt(index)+1);
        if ((nextIndex-1) >= self.catalogs.length) return;

        let nextCaption = nextIndex + ".txt";
        let p = "/" + self.$route.params.file + "/" + nextCaption;
        self.$router.push({ path: p })
    }

    function saveUserConf(self){
        let conf = new userConf(self.theme, self.themeList);

        let confPath = "/api/reader/txt/user/conf";
        axios.post(confPath, conf).then(function(res){
            console.log(res)
            if (res.data == null || res.data == "") {
                self.$Message.info("保存成功");
            } else {
                self.$Message.error({duration: 15, closable: true, content: "保存出错: " + res.data});
            }
        }).catch(function(err){
            console.log(err);
            self.$Message.error({duration: 15, closable: true, content: "连接出错: " + err});
        });
    }

    function getUserConf(self){
        console.log("get user conf: " + confUrl);
        printUserConf(self);
        axios.get(confUrl).then(function(response){
            if (response.status != 200) {
                self.$Message.warning({duration: 15, closable: true, content: "then: 同步服务端配置到本地出错：" + response.status});
                return;
            }

            if (!response.data) {
                self.$Message.info("服务端没有配置");
                return;
            }

            let conf = response.data;
            self.theme = conf.theme;
            self.themeList = conf.themeList;
            self.$Message.info("服务端配置已同步到本地");
        }).catch(function(error){
            self.$Message.error({duration: 15, closable: true, content: "同步服务端配置到本地失败: " + error});
        });
    }

    function printUserConf(self) {
        console.log("========================================");
        let conf = new userConf(self.theme, self.themeList);
        console.log(JSON.stringify(conf));
        console.log("========================================");
    }
</script>
