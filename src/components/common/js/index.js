
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