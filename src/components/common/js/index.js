var caption = require('./caption');
var theme = require('./theme');
var conf = require('./conf');
var bapi = require('./backendAPI');

export default {
    // 全局通信总线，在 main.js 中初始化为 vue 示例，通过 vue 事件进行通信
    bus: null,

    // caption
    getCaptionTitleCur: caption.getCaptionTitleCur,
    ReadPosition: caption.ReadPosition,
    updateReadPosition: caption.updateReadPosition,
    setReadPositionScroll: caption.setReadPositionScroll,
    goCaption: caption.goCaption,
    fetchCaptionContent: caption.fetchCaptionContent,
    fetchCatalogs: caption.fetchCatalogs,
    fetchBookInfo: caption.fetchBookInfo,
    showBookInfoModal: caption.showBookInfoModal,
    downloadBook: caption.downloadBook,

    // theme
    theme: theme.theme,

    colors: theme.colors,
    fontList: theme.fontList,
    basePageWidth: theme.basePageWidth,

    defaultTheme: theme.defaultTheme,
    darkTheme: theme.darkTheme,
    yelloTheme: theme.yelloTheme,

    themeListItem: theme.themeListItem,
    themeList: theme.themeList,

    // user config
    userConf: conf.userConf,
    saveUserConf: conf.saveUserConf,
    getUserConf: conf.getUserConf,

    // backend api
    getBookmarkUrl: bapi.getBookmarkUrl,
    saveBookmarkUrl: bapi.saveBookmarkUrl,
}