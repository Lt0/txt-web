var axios = require('axios')

exports.bus;

exports.getCaptionTitleCur = function getCaptionTitleCur(self){
    let caption = self.caption;
    return getCaptionTitleByCaption(self, caption);
}

function getCaptionTitleByCaption(self, caption){
    let i = caption.replace(/.txt$/, "");
    if (!self.catalogs) return;
    let captionTitle = self.catalogs[parseInt(i)-1].text;
    captionTitle = captionTitle.replace(/^.*: /, "");
    return captionTitle;
}

exports.ReadPosition = function ReadPosition(file, caption, captionTitle, scrollTop, scrollMax, saveTime) {
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

// 更新传入的 readPosition 为当前阅读进度
// self 为 vue 示例
// readPosition 为要更新的 ReadPosition
exports.updateReadPosition = function updateReadPosition(self, readPosition){
    let rp = readPosition;
    let el = document.getElementById("main");
    let caption = self.caption;
    rp.caption = caption;
    rp.captionTitle = self.captionTitle;
    rp.scrollTop = el.scrollTop;
    rp.scrollMax = el.scrollTopMax? el.scrollTopMax: el.scrollHeight-el.clientHeight;
    rp.saveTime = new Date();
    rp.saveTimeStr = rp.saveTime.toLocaleDateString() + rp.saveTime.toLocaleTimeString();
    rp.percent = (rp.scrollTop/rp.scrollMax).toFixed(2);

    return rp;
}

exports.setReadPositionScroll = function setReadPositionScroll(self){
    let caption = self.caption;
    let p;
    self.readPosition.caption == caption? p = self.readPosition.scrollTop: p = 0;
    let m = document.getElementById("main");
    console.log("setReadPositionScroll: " + p);
    m.scrollTop = p;
}

// self: 为 vue 实例
// relDir: 为文件坐在目录相对 bookRoot 的相对路径
// file: 文件名
// caption: 章节文件
exports.goCaption = function goCaption(self, relDir, file, caption){
    let p = "/read/" + relDir + "/" + file + "/" + caption;
    console.log("goCaption: " + p);
    self.$router.push({ path: caption });
}

//获取指定 caption 的 content
exports.fetchCaptionContent = function fetchCaptionContent(self, bookRoot, relDir, file, caption) {
    self.$Message.loading({
        content: '读取正文...', 
        duration: 0,    
    });
    let contentUrl = bookRoot + "/" + relDir + "/" + file + "/" + caption;
    console.log("fetchCaptionContent: " + contentUrl);
    axios.get(contentUrl).then(function(response){
        self.$Message.destroy();
        self.content = response.data;
    }).catch(function(error){
        self.$Message.destroy();
        console.log(error);
        let errStr = "<p>章节文件路径: " + contentUrl + "</p>";
        errStr += "err: " + error;
        self.$Modal.error({
            title: "读取章节出错",
            content: errStr,
        });
    });
}


// theme
exports.colors = ['#1c2438', '#495060', '#80848f', '#bbbec4', '#dddee1', '#e9eaec', '#f8f8f9', '#EFF3F6', '#f5f7f9', '#fff'];
exports.basePageWidth = 8;

exports.theme = theme;
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

exports.themeListItem = themeListItem;
function themeListItem(name, theme) {
    this.name = name;
    this.theme = theme;
}

exports.defaultTheme = defaultTheme;
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

exports.darkTheme = darkTheme;
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

exports.fontList = [
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

exports.defaultTheme = defaultTheme;
exports.darkTheme = darkTheme;
exports.themeList = themeList;

// user config
let confUrl = '/static/cache/conf/user.conf';

exports.userConf =  userConf;
function userConf(theme, themeList) {
    this.theme = theme;
    this.themeList = themeList;
}
/* 
exports.defaultConf = defaultConf;
const defaultConf = {
    theme: defaultTheme, 
    themeList: themeList,
}
 */
exports.saveUserConf = function saveUserConf(self, conf){
    let confPath = "/api/reader/txt/user/conf";
    axios.post(confPath, conf).then(function(res){
        console.log(res)
        if (res.data == null || res.data == "") {
            self.$Message.info("保存成功");
        } else {
            self.$Message.error({duration: 3, closable: true, content: "保存出错: " + res.data});
        }
    }).catch(function(err){
        console.log(err);
        self.$Message.error({duration: 3, closable: true, content: "连接出错: " + err});
    });
}


exports.getUserConf = function getUserConf(self){
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
        //self.$Message.info("服务端配置已同步到本地");
    }).catch(function(error){
        self.$Message.error({duration: 15, closable: true, content: "同步服务端配置到本地失败: " + error});
    });
}

