<template>
<Dropdown placement="bottom-end" trigger="click" transfer @on-click="clickBookmark">
    <AppBtn icon="bookmark" />
    <DropdownMenu slot="list">
        <DropdownItem class="bookmark-item" style="text-align: center" name="newMark" key="newMarkKey"><Icon type="android-add" />&ensp;添加书签</DropdownItem>
        <DropdownItem class="bookmark-item" divided v-for="mark in bookmarks" :name="mark.id" :key="mark.index">
            <div class="bookmark-hdr">
                <div class="bookmark-title">章节：{{ mark.captionTitle }}</div>
                <div @click.stop="delBookMark(mark.id)"><Icon type="close-circled" size="15" class="bookmark-close-btn"/></div>
            </div>
            <p>位置：{{ (mark.percent * 100).toFixed(2) }}%</p>
            <p>创建时间：{{ mark.saveTimeStr }}</p>
        </DropdownItem>
    </DropdownMenu>
</Dropdown>
</template>

<script>
import axios from 'axios'
import cm from '../common/js'

let bookmarkRoot = '/static/cache/txt/bookmarks/';

export default {
    props: ['relDir', 'file', 'caption', 'captionTitle', 'readPosition'],
    data () {
        return {
            bookmarks: [],
        }
    },
    created () {
        getBookmarks(this);
    },
    watch: {
        bookmarks () {
            updateServerBookmarks(this);
        },
    },
    methods: {
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
        },
    },
}

function getBookmarks(self){
    console.log("getBookmarks");
    let getBookmarksPath = bookmarkRoot + encodeURIComponent(self.relDir + self.file);
    axios.get(getBookmarksPath).then(function(res){
        if (!res.data) return;
        self.bookmarks = res.data;
        //self.$Message.success("服务端书签已同步到本地");
    }).catch(function(error){
        console.log("获取书签: " + error)
    });
}

function updateServerBookmarks(self){
    console.log("updateServerBookmarks");
    let postBookmarksPath = "/api/reader/txt/user/bookmarks?file=" + encodeURIComponent(self.relDir + self.file);
    axios.post(postBookmarksPath, self.bookmarks).then(function(res){
        if (res.data == "" || res.data == null){
            //self.$Message.success("书签同步成功");
        } else {
            self.$Message.error({duration: 3, content: "保存书签到服务端失败：" + res.data});
        }
    }).catch(function(err){
         self.$Message.error({duration: 3, content: "保存书签到服务端失败：" + err});
    });
}

function newBookmark (self) {
    let rp = new cm.ReadPosition(self.file);
    cm.updateReadPosition(self, rp);
    self.bookmarks.push(rp);
}

function goBookmark (self, markId) {
    let rp;
    for (let i = 0; i < self.bookmarks.length; i++){
        if (self.bookmarks[i].id == markId) {
            rp = Object.assign({}, self.bookmarks[i]);
            break;
        }
    }

    cm.bus.$emit('goBookmarkEv', rp);
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

<style scoped>
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