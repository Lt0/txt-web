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
import cm from '../common/js'

export default {
  props: ['relDir', 'file'],
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
                cm.downloadBook(this.relDir, this.file);
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
        cm.showBookInfoModal(self);
        return;
    }
    cm.fetchBookInfo(self, self.relDir, self.file);
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
</script>

<style scoped>
</style>