<style scoped>
    #layout{
        height: 100vh;

        display: flex;
        flex-direction: column;

        overflow: hidden;
    }
    #hdr{}
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

    .hdr-btn {
        /*margin-bottom: 12px;*/
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

    .bookmark-item{
        width: 250px;
        text-align: left;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
    .bookmark-hdr{
        display: flex;
        justify-content: space-between;
    }
    .bookmark-close-btn{
        margin-right: 0px;
        margin-top: 0px;
        cursor: pointer;
    }
    .bookmark-title{
        flex-grow: 1;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
<template>
<div id="layout" :style="{background: theme.bg, fontFamily: theme.font}">
    <div id="hdr" :style="{background: theme.hdrBg}">
        <div id="hdr-container">
            <div id="hdr-left">{{ captionTitle }}</div>
            <div id="hdr-center"></div>
            <div id="hdr-right">
                <!-- 标题栏书签按钮 -->
                <Dropdown placement="bottom-end" trigger="click" transfer @on-click="clickBookmark">
                    <Button type="text" shape="circle" icon="bookmark" class="btn hdr-btn hdr-btn-gutter-l"></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem class="bookmark-item" style="text-align: center" name="newMark" key="newMarkKey"><Icon type="android-add" />&ensp;添加书签</DropdownItem>
                        <DropdownItem class="bookmark-item" divided v-for="mark in bookmarks" :name="mark.id" :key="mark.index">
                            <div class="bookmark-hdr">
                                <div class="bookmark-title">章节：{{ mark.captionTitle }}</div>
                                <div @click.stop="delBookMark(mark.id)"><Icon type="close-circled" size="15" class="bookmark-close-btn"/></div>
                            </div>
                            <Tooltip content="滚动条位置"><p>位置：{{ (mark.percent * 100).toFixed(2) }}%</p></Tooltip>
                            <p>创建时间：{{ mark.saveTimeStr }}</p>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <!-- 标题栏跳转按钮 
                <Dropdown placement="bottom-center" trigger="custom" class="caption-list" transfer :visible="jumpVisible">
                    <Tooltip content="跳转">
                        <Button type="text" shape="circle" icon="forward" class="btn hdr-btn hdr-btn-gutter-l" @click="jumpVisible? jumpVisible=false: jumpVisible=true"></Button>
                    </Tooltip>
                    <DropdownMenu slot="list">
                        <div class="slider btn-gutter-l" style="width: 300px; height: 100px"><Slider show-input :step="0.01"></Slider></div>
                    </DropdownMenu>
                </Dropdown>
    -->
                <!-- 标题栏章节按钮 -->
                <Dropdown id="captions" placement="bottom-end" trigger="click" class="caption-list" transfer @on-click="goCaption">
                    <Button type="text" shape="circle" icon="navicon-round" class="btn hdr-btn hdr-btn-gutter-l"></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem class="caption-list-item" v-for="catalog in catalogs" :name="catalog.name" :key="catalog.index">{{ catalog.text }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <!-- 标题栏设置按钮 -->
                <Dropdown id="setting" placement="bottom-end" trigger="custom" transfer :visible="setVisible">
                    <Button type="text" size="large" shape="circle" icon="ios-gear" class="btn hdr-btn hdr-btn-gutter-l" @click="setVisible? setVisible=false: setVisible=true"></Button>
                    <DropdownMenu slot="list">
                        <div id="setArea">
                            <div id="set-color" class="set-group">
                                <div class="set-title">
                                    颜色设置
                                    <Tooltip content="使用浏览器默认字体">
                                        <Button type="ghost" size="small" class="btn-gutter-l" @click="theme.fontColor = defaultTheme.fontColor; theme.fontBg = defaultTheme.fontBg; theme.bg = defaultTheme.bg; theme.hdrBg=defaultTheme.hdrBg; setEvHandler();">
                                            默认
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div class="set-item">
                                    <div>文字: <ColorPicker v-model="theme.fontColor" :colors="colors" size="small" @on-change="setEvHandler" /></div>
                                    <div class="btn-gutter-l">纸张: <ColorPicker v-model="theme.fontBg" :colors="colors" size="small" @on-change="setEvHandler" /></div>
                                    <div class="btn-gutter-l">背景: <ColorPicker v-model="theme.bg" :colors="colors" size="small" @on-change="setEvHandler" /></div>
                                    <div class="btn-gutter-l">页首: <ColorPicker v-model="theme.hdrBg" :colors="colors" size="small" @on-change="setEvHandler" /></div>
                                    
                                </div>
                            </div>

                            <div id="set-font" class="set-group">
                                <div class="set-title">字体设置</div>字体
                                    <Select v-model="theme.font" placeholder=theme.font size="small" filterable style="width:150px" class="btn-gutter-l" @on-change="setEvHandler">
                                        <Option v-for="item in fontList" :value="item.name" :key="item.index">{{ item.name }}</Option>
                                    </Select>
                                    <!-- 如果已设置过字体，点击默认是会触发 select 的 on-change 事件，这里不需要再绑定 on-change 事件 -->
                                    <Tooltip content="使用浏览器默认字体"><Button type="ghost" size="small" class="btn-gutter" @click="theme.font=defaultTheme.font;">默认</Button> </Tooltip>
                                    <!--<span class="btn-gutter-l">繁体<i-switch class="btn-gutter-l" size="small"></i-switch></span>-->

                                <div class="set-item">
                                    <div>字体大小</div>
                                    <div class="slider btn-gutter-l"><Slider v-model="theme.fontSize" show-input :max="300" @on-change="setEvHandler"></Slider></div>
                                    <Tooltip placement="top" content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.fontSize=defaultTheme.fontSize; setEvHandler();">默认</Button></Tooltip>
                                </div>
                            </div>

                            <div id="set-gutter" class="set-group">
                                <div class="set-item">
                                    <div>纸张大小</div>
                                    <div class="slider btn-gutter-l"><Slider v-model="theme.pageWidth" show-input :min="0" :max="500" @on-change="setEvHandler"></Slider></div>
                                    <Tooltip placement="top" content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.pageWidth=defaultTheme.pageWidth; setEvHandler();">默认</Button></Tooltip>
                                </div>

                                <div class="set-item">
                                    <div> 文字间隔</div>
                                    <div class="slider btn-gutter-l"><Slider v-model="theme.letterSpacing" show-input :min="-2" :max="20" @on-change="setEvHandler"></Slider></div>
                                    <Tooltip placement="top" content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.letterSpacing=defaultTheme.letterSpacing; setEvHandler();">默认</Button></Tooltip>
                                </div>

                                <div class="set-item">
                                    <div> 上下边距 </div>
                                    <div class="slider btn-gutter-l"><Slider v-model="theme.hPadding" show-input :max="200" @on-change="setEvHandler"></Slider></div>
                                    <Tooltip placement="top" content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.hPadding=defaultTheme.hPadding; setEvHandler();">默认</Button></Tooltip>
                                </div>

                                <div class="set-item">
                                    <div> 行&ensp;间&ensp;距 </div>
                                    <div class="slider btn-gutter-l"><Slider v-model="theme.lineHeight" show-input :max="500" @on-change="setEvHandler"></Slider></div>
                                    <Tooltip placement="top" content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.lineHeight=defaultTheme.lineHeight; setEvHandler();">默认</Button></Tooltip>
                                </div>

                                <div class="set-item">
                                    <div> 左右边距 </div>
                                    <div class="slider btn-gutter-l"><Slider v-model="theme.vPadding" show-input @on-change="setEvHandler"></Slider></div>
                                    <Tooltip placement="top" content="应用的默认值"><Button type="ghost" class="btn-gutter-l" @click="theme.vPadding=defaultTheme.vPadding; setEvHandler();">默认</Button></Tooltip>
                                </div>
                            </div>

                            <div id="set-theme" class="set-group">
                                <div class="set-title">主题设置</div>
                                <div class="theme-list">
                                    <div class="theme-item" v-for="t in themeList" :key="t.index" @click="useTheme(t)" :style="{background: t.theme.bg, color: t.theme.fontColor}">
                                        <div class="theme-close-container"><Tooltip placement="top" content="彻底删除主题"><div @click.stop="delTheme(t)"><Icon type="close-circled" size="15" class="theme-close-btn"></Icon></div></Tooltip></div>
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

                <Dropdown placement="bottom-end" trigger="click" @on-click="hdrMoreHandler">
                    <Button type="text" shape="circle" icon="ios-more" class="btn hdr-btn hdr-btn-gutter-l"></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="bookInfo">书籍信息</DropdownItem>
                        <DropdownItem name="download">下&ensp;&ensp;&ensp;&ensp;载</DropdownItem>
                        <DropdownItem name="help">帮&ensp;&ensp;&ensp;&ensp;助</DropdownItem>
                        <DropdownItem name="about">关&ensp;&ensp;&ensp;&ensp;于</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
            </div>
        </div>
    </div>

    <div id="main" @scroll.native="saveReadPosition">
        <div id="main-layout">
            <div id="left" v-on:click="goPrev">
                <Button id="goPrev" type="text" shape="circle" icon="ios-arrow-back" class="btn"></Button>
            </div>
            <div id="center">
                <div :style="{background: theme.fontBg, color: theme.fontColor, fontSize: theme.fontSize+'%', lineHeight: theme.lineHeight+'%', letterSpacing: theme.letterSpacing+'px', paddingLeft: theme.vPadding+'px', paddingRight: theme.vPadding+'px', paddingTop: theme.hPadding+'px', paddingBottom: theme.hPadding+'px', width: (theme.pageWidth*basePageWidth)+'px'}">
                    <h2 id="caption-title">{{ captionTitle }}</h2>
                    <p id="content">{{ content }}</p>
                </div>
                <Footer class="layout-footer-center footer" :style="{background: 'transparent'}">2018 &copy; lightimehpq@gmail.com</Footer>
            </div>
            <div id="right" v-on:click="goNext">
                <Button id="goNext" type="text" shape="circle" icon="ios-arrow-forward" class="btn"></Button>
            </div>
        </div>
        
    </div>
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

function ReadPosition(file, caption, captionTitle, scrollTop, scrollMax, saveTime) {
    this.key = "readPosition-" + file;  //用于存取的 key, 每个文件只有一个
    this.id = Date().toString() ;       //唯一识别 ID
    this.file = file;                   //阅读记录对应的文件
    this.caption = caption;             //阅读进度：章节
    this.captionTitle = captionTitle;   //章节标题
    this.scrollTop = scrollTop;         //阅读进度：浏览器滚动条位置
    this.scrollMax = scrollMax;         //元素滚动总高度
    this.saveTime = saveTime;           //保存时间
    this.percent = scrollTop/scrollMax; //阅读章节的百分比
}
    
    export default {
        data() {
            return {
                file: this.$route.params.file,
                fileInfo: null,
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
                bookInfoModal: false,
                readPosition: null,
                bookmarks: [],
            }
        },
        beforeCreate () {
            getUserConf(this);
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            getBookmarks(this);
            getReadPosition(this);
            this.fetchCatalogs();
        },
        mounted () {
            // 先调用不带参数的 goCaption() 再调用记录章节的 repalceCaption() 以确保触发路由更新，避免无法刷新的问题
            this.goCaption();
            this.replaceCaption(this.readPosition.caption);
            
            showAutoJumpTips(this);
            registkeyupHandler(this);
            registScrollHandler(this);
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route' (to, from) {
                this.loading = true;
                this.fetchContent();
            },
            content () {
                console.log("content changed");
                this.captionTitle = getCaptionTitleCur(this);

                this.$nextTick(this.setReadPositionScroll);
                this.$nextTick(this.saveReadPosition);
            },
            themeList: function () {
                // 直接在这里监听的话，载入页面时加载用户配置也会更改 themeList 导致指出 setEvHandler
                //this.setEvHandler();
            },
            bookmarks () {
                updateServerBookmarks(this);
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
            jump () {
                console.log("jump");
            },
            goCaption (val) {
                let p = "/" + this.$route.params.file + "/" + val;
                console.log("goCaption: " + p);
                this.$router.push({ path: p });
            },
            replaceCaption (val) {
                let p = "/" + this.$route.params.file + "/" + val;
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
                saveUserConf(this);
            },
            hdrMoreHandler (val) {
                hdrMoreHandler(this, val);
            },
            saveReadPosition () {
                saveReadPosition(this);
            },
            setReadPositionScroll () {
                setReadPositionScroll(this);
            },
            clickBookmark (markId) {
                if (markId == "newMark") {
                    newBookmark(this);
                } else {
                    goBookmark(this, markId);
                }
            },
            delBookMark (markId) {
                console.log("delBookMark");
                delBookMark(this, markId);
            }
        }
    }

    function fetchCatalogs (self) {
        let file = self.$route.params.file;
        let catalogUrl = rootPath + file + "/" + "catalog.txt";
        console.log("catalogUrl: " + catalogUrl);

        axios.get(catalogUrl).then(function(response){
            splitCatalogs(response.data, self);
            self.captionTitle = getCaptionTitleCur(self);
            let t = document.getElementsByTagName("title")[0];
            t.innerHTML = file;

        }).catch(function(error){
            console.log(error);
        });
    }

    function getCaptionTitleCur(self){
        let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
        return getCaptionTitleByCaption(self, caption);
    }

    function getCaptionTitleByCaption(self, caption){
        let i = caption.replace(/.txt$/, "");
        if (!self.catalogs) return;
        let captionTitle = self.catalogs[parseInt(i)-1].text;
        captionTitle = captionTitle.replace(/^.*: /, "");
        return captionTitle;
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
        //printUserConf(self);
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

    function hdrMoreHandler(self, val){
        console.log("hdrMoreHandler: " + val);
        switch (val) {
            case "bookInfo":
                showBookInfo(self);
                break;
            case "help":
                showHelp();
                break;
            case "about":
                showAbout(self);
                break;
            case "download":
                download(self);
                break;
            default:
                console.log("unknow name: " + val);
        }
    }

    function showBookInfo (self) {
        console.log("showBookInfo");
        if (self.fileInfo) {
            showBookInfoModal(self);
            return;
        }

        let infoPath = rootPath + self.file + "/info.txt";
        axios.get(infoPath).then(function(res){
            if (res.status != 200) {
                self.$Message.error("获取书籍信息出错: " + res.status);
                return;
            }
            console.log(res.data);
            self.fileInfo = res.data;
            showBookInfoModal(self);
        }).catch(function(err){
            self.$Message.error("获取书籍信息失败: " + err);
        });
    }

    function showBookInfoModal(self){
        let info = "字数：" + self.fileInfo.Words;
        info += "<br><br>章节：" + self.fileInfo.Chapters;
        info += "<br><br>修改时间：" + self.fileInfo.ModTime;

        self.$Modal.info({
            title: self.fileInfo.Name,
            content: info,
            closable: true,
        });
    }
    
    function showHelp () {
        console.log("showHelp");
    }

    function showAbout (self) {
        console.log("showAbout");
        self.$Modal.info({
            title: "Athena TXT Reader",
            content: "<a href='https://github.com/Lt0/txt-web' target='_blank'>https://github.com/Lt0/txt-web</a>",
            closable: true,
        });
    }

    function download(self){
        let f = self.$route.params.file;
        let a = document.createElement('a');
        a.href = rootPath + "/" + f + "/clearFile/" + f;;
        a.download = f;

        //append to body to trigger download in firefox
        document.body.appendChild(a);
        
        a.click();
        document.body.removeChild(a);
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
    function saveReadPosition(self){
        updateReadPosition(self, self.readPosition);
        localStorage.setItem(self.readPosition.key, JSON.stringify(self.readPosition));
        //console.log("saved readPosition: " + JSON.stringify(self.readPosition));
    }

    // 更新 readPosition 为当前阅读进度
    function updateReadPosition(self, readPosition){
        let rp = readPosition;
        let el = document.getElementById("main");
        let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
        rp.caption = caption;
        rp.captionTitle = self.captionTitle;
        rp.scrollTop = el.scrollTop;
        rp.scrollMax = el.scrollTopMax? el.scrollTopMax: el.scrollHeight-el.clientHeight;
        rp.saveTime = new Date();
        rp.saveTimeStr = rp.saveTime.toLocaleDateString() + rp.saveTime.toLocaleTimeString();
        rp.percent = (rp.scrollTop/rp.scrollMax).toFixed(2);

        return rp;
    }

    function getReadPosition(self){
        console.log("getReadPosition for " + self.file);
        let key = "readPosition-" + self.file;
        self.readPosition = JSON.parse(localStorage.getItem(key));
        
        if (!self.readPosition) {
            console.log("no saved readPosition for this file, create.");
            let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";

            self.readPosition = new ReadPosition(self.file, caption, self.captionTitle, 0, 0, Date());
            console.log("created readPosition: " + JSON.stringify(self.readPosition));
        }
    }

    function setReadPositionScroll(self){
        let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
        let p;
        self.readPosition.caption == caption? p = self.readPosition.scrollTop: p = 0;
        let m = document.getElementById("main");
        console.log("setReadPositionScroll: " + p);
        m.scrollTop = p;
    }

    function showAutoJumpTips(self){
        self.$Notice.info({
            title: '已自动跳转',
            desc: '如果要返回跳转前的位置，请点击浏览器的后退按钮'
        });
    }

    function newBookmark (self) {
        let rp = new ReadPosition(self.file);
        updateReadPosition(self, rp);
        self.bookmarks.push(rp);
    }

    function goBookmark (self, markId) {
        console.log("goReadPosition");
        for (let i = 0; i < self.bookmarks.length; i++){
            if (self.bookmarks[i].id == markId) {
                self.readPosition = Object.assign({}, self.bookmarks[i]);
                break;
            }
        }
        let caption = self.$route.params.caption? self.$route.params.caption: "1.txt";
        if (caption != self.readPosition.caption) {
            console.log("goBookmark: NOT in bookmark's caption, goCaption");
            self.goCaption(self.readPosition.caption);
        } else {
            console.log("goBookmark: in bookmark's caption, set position directly");
            setReadPositionScroll(self);
        }
    }

    function updateServerBookmarks(self){
        console.log("updateServerBookmarks");
        let postBookmarksPath = "/api/reader/txt/user/bookmarks?file=" + encodeURIComponent(self.file);
        axios.post(postBookmarksPath, self.bookmarks).then(function(res){
            if (res.data == "" || res.data == null){
                self.$Message.success("书签同步成功");
            } else {
                self.$Message.error({duration: 3, content: "保存书签到服务端失败：" + res.data});
            }
        }).catch(function(err){
             self.$Message.error({duration: 3, content: "保存书签到服务端失败：" + err});
        });
    }

    function getBookmarks(self){
        console.log("getBookmarks");
        let getBookmarksPath = '/static/cache/txt/bookmarks/' + encodeURIComponent(self.file);
        axios.get(getBookmarksPath).then(function(res){
            if (!res.data) return;
            console.log("res.data: " + res.data);
            self.bookmarks = res.data;
            //self.$Message.success("服务端书签已同步到本地");
        }).catch(function(error){
            console.log("获取书签: " + error)
        });
    }

    function delBookMark(self, markId) {
        let index = getBookmarkIndexById(self.bookmarks, markId);
        if (index == undefined) {
            self.$Message.error("找不到要删除的书签");
            return;
        }
        if (!self.bookmarks.splice(index, 1)) {
            self.$Message.error("删除失败");
            return;
        }
    }

    function getBookmarkIndexById(bookmarks, markId){
        for (let i = 0; i < bookmarks.length; i++){
            if (bookmarks[i].id == markId) {
                return i;
            }
        }
    }
</script>
