<template>
    <Dropdown placement="bottom-end" trigger="click" @on-click="hdrMoreHandler">
        <AppBtn icon="ios-more" />
        <DropdownMenu slot="list">
            <DropdownItem name="bookInfo">书籍信息</DropdownItem>
            <DropdownItem name="download">下&ensp;&ensp;&ensp;&ensp;载</DropdownItem>
            <DropdownItem name="help">帮&ensp;&ensp;&ensp;&ensp;助</DropdownItem>
            <DropdownItem name="about">关&ensp;&ensp;&ensp;&ensp;于</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
import axios from 'axios'
export default {
  props: ['bookRoot', 'relDir', 'file'],
  methods: {
      hdrMoreHandler (val) {
        console.log("hdrMoreHandler: " + val);
        let self = this;
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
      },
  },
}

function showBookInfo (self) {
    console.log("showBookInfo");
    if (self.fileInfo) {
        showBookInfoModal(self);
        return;
    }
    let infoPath = self.bookRoot + self.relDir + self.file + "/info.txt";
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
    let a = document.createElement('a');
    a.href = self.bookRoot + "/" + self.relDir + "/" + self.file + "/clearFile/" + self.file;
    a.download = self.file;
    //append to body to trigger download in firefox
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
}
</script>

<style scoped>
</style>