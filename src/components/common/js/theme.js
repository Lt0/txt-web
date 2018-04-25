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
    hdrBg: '#191919', 
    bg: '#161616', 
    fontBg: '#1c1c1c', 
    fontColor: '#7b7a7a',
    font: "dongqingheiti",
    fontSize: 135,
    lineHeight: 188,
    vPadding: 50,
    hPadding: 50,
    letterSpacing: 1,
    pageWidth: 100,
};

const yelloTheme = {
    hdrBg: '#d8c09b', 
    bg: '#e9dec7', 
    fontBg: '#e2cca9', 
    fontColor: '#4f3f25',
    font: "siyuanheiti-Regular",
    fontSize: 120,
    lineHeight: 200,
    vPadding: 50,
    hPadding: 50,
    letterSpacing: 0,
    pageWidth: 100,
}

const greenTheme = {
    hdrBg: '#e7f2d2', 
    bg: '#eff7df', 
    fontBg: '#eaf5d5', 
    fontColor: '#5f684d',
    font: "dongqingheiti",
    fontSize: 120,
    lineHeight: 200,
    vPadding: 50,
    hPadding: 50,
    letterSpacing: 0,
    pageWidth: 100,
}

const pinkTheme = {
    hdrBg: '#ffe3e0', 
    bg: '#ffebe9', 
    fontBg: '#fee2df', 
    fontColor: '#523635',
    font: "xiliangshaonv",
    fontSize: 135,
    lineHeight: 200,
    vPadding: 50,
    hPadding: 50,
    letterSpacing: 0,
    pageWidth: 100,
}

exports.fontList = [
    // 黑体
    {name: '冬青黑体', font: 'dongqingheiti', size: '7.5M'}, 
    {name: '苹方常规简体', font: 'pingfangchangguijianti', size: '5.4M'}, 
    {name: '苹方极细简体', font: 'pingfangjixijianti', size: '4.9M'}, 
    {name: '方正黑简体', font: 'fangzhengheijianti', size: '1.2M'}, 
    {name: '思源黑体', font: 'siyuanheiti-Regular', size: '12M'},
    {name: '思源黑体-Thin', font: 'siyuanheiti-Thin', size: '9.4M'}, 
    {name: '思源黑体-Bold', font: 'siyuanheiti-Bold', size: '12M'}, 
    {name: '文泉正黑', font: 'wenquanzhenghei', size: '5.2M'}, 
    {name: '文泉微米黑', font: 'wenquanweimihei', size: '1.4M'}, 
    {name: '旗黑修长', font: 'qiheixiuchang', size: '4.8M'},

    // 宋体
    {name: '方正仿宋简体', font: 'fangzhengfangsongjianti', size: '1.5M'}, 
    {name: '方正书宋简体', font: 'fangzhengshusongjianti', size: '1.2M'}, 

    
    // 少女
    {name: '华康少女', font: 'huakangshaonv', size: '1.7M'}, 
    {name: '西凉少女', font: 'xiliangshaonv', size: '9.3M'}, 
    {name: '青柠幼圆', font: 'qingningyouyuan', size: '2.0M'}, 
    
    // 楷体
    {name: '字酷堂黄楷体', font: 'zikutanghuangkaiti', size: '1.1M'},
];

const defaultThemeListItem = new themeListItem("Default", defaultTheme);
const darkThemeListItem = new themeListItem("Dark", darkTheme);
const yelloThemeListItem = new themeListItem("Yellow", yelloTheme);
const greenThemeListItem = new themeListItem("Green", greenTheme);
const pinkThemeListItem = new themeListItem("Pink", pinkTheme);
var themeList = [
    defaultThemeListItem,
    pinkThemeListItem,
    greenThemeListItem,
    yelloThemeListItem,
    darkThemeListItem,
];

exports.theme = theme;

exports.defaultTheme = defaultTheme;
exports.darkTheme = darkTheme;
exports.yelloTheme = yelloTheme;
exports.greenTheme = greenTheme;
exports.pinkTheme = pinkTheme;

exports.themeList = themeList;
exports.themeListItem = themeListItem;
exports.colors = ['#1c2438', '#495060', '#80848f', '#bbbec4', '#dddee1', '#e9eaec', '#f8f8f9', '#EFF3F6', '#f5f7f9', '#fff'];
exports.basePageWidth = 8;