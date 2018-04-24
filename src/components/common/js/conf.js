var axios = require('axios');
var bapi = require('./backendAPI');

exports.userConf = userConf;
exports.saveUserConf = saveUserConf;
exports.getUserConf = getUserConf;


function userConf(theme, themeList) {
    this.theme = theme;
    this.themeList = themeList;
}

function saveUserConf(self, conf){
    path = bapi.saveConfUrl;
    console.log("saveUserConf: " + path);
    axios.post(path, conf).then(function(res){
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

function getUserConf(self){
    console.log("get user conf: " + bapi.getConfUrl);
    //printUserConf(self);
    axios.get(bapi.getConfUrl).then(function(response){
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
