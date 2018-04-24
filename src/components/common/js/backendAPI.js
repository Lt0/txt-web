// 后端 API 的定义文件，本文件应包含当前项目所有用到的后端 API，以便统一管理
const bookRoot = '/static/cache/books/';
const getConfUrl = '/static/cache/conf/user.conf';
const saveConfUrl = '/api/reader/txt/user/conf';
const bookmarkRoot = '/static/cache/txt/bookmarks/';

function catalogUrl(relDir, file){
    return bookRoot + relDir + file + "/" + "catalog.txt";
}

function contentUrl(relDir, file, caption){
    return contentUrl = bookRoot + "/" + relDir + "/" + file + "/" + caption;
}

function bookInfoUrl(relDir, file) {
    return infoPath = bookRoot + "/" + relDir + file + "/info.txt";
}

function downloadBookUrl(relDir, file) {
    return bookRoot + "/" + relDir + "/" + file + "/clearFile/" + file;
}

function getBookmarkUrl(relDir, file){
    return bookmarkRoot + encodeURIComponent(relDir + file);
}

function saveBookmarkUrl(relDir, file){
    return "/api/reader/txt/user/bookmarks?file=" + encodeURIComponent(relDir + file);
}

exports.getConfUrl = getConfUrl;
exports.saveConfUrl = saveConfUrl;
exports.catalogUrl = catalogUrl;
exports.contentUrl = contentUrl;
exports.bookInfoUrl = bookInfoUrl;
exports.downloadBookUrl = downloadBookUrl;
exports.getBookmarkUrl = getBookmarkUrl;
exports.saveBookmarkUrl = saveBookmarkUrl;