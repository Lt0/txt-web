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

exports.theme = theme;
exports.defaultTheme = defaultTheme;
exports.darkTheme = darkTheme;
exports.themeList = themeList;
exports.themeListItem = themeListItem;
exports.colors = ['#1c2438', '#495060', '#80848f', '#bbbec4', '#dddee1', '#e9eaec', '#f8f8f9', '#EFF3F6', '#f5f7f9', '#fff'];
exports.basePageWidth = 8;