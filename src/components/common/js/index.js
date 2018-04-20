
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