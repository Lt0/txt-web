<template>
<Dropdown id="setting" placement="bottom-end" trigger="custom" transfer :visible="setVisible">
    <AppBtn icon="ios-gear" @click="setVisible? setVisible=false: setVisible=true" />
    <DropdownMenu slot="list">
        <div id="setArea">
            <div id="set-color" class="set-group">
                <div class="set-title">
                    颜色设置
                    <Tooltip content="使用浏览器默认字体">
                        <Button type="ghost" size="small" class="app-btn-gutter-l" @click="resetAllColors">
                            默认
                        </Button>
                    </Tooltip>
                </div>
                <div class="set-item">
                    <div>文字: <ColorPicker :value="conf.theme.fontColor" :colors="colors" size="small" @on-change="setFontColor" /></div>
                    <div class="app-btn-gutter-l">纸张: <ColorPicker :value="conf.theme.fontBg" :colors="colors" size="small" @on-change="setFontBg" /></div>
                    <div class="app-btn-gutter-l">背景: <ColorPicker :value="conf.theme.bg" :colors="colors" size="small" @on-change="setBg" /></div>
                    <div class="app-btn-gutter-l">页首: <ColorPicker :value="conf.theme.hdrBg" :colors="colors" size="small" @on-change="setHdrBg" /></div>
                </div>
            </div>

            <div id="set-font" class="set-group">
                <div class="set-title">字体设置</div>字体
                <Select :value="conf.theme.font" placeholder=conf.theme.font size="small" filterable style="width:150px" class="app-btn-gutter-l" @on-change="setFont">
                    <Option v-for="item in fontList" :value="item.name" :key="item.index">{{ item.name }}</Option>
                </Select>
                <!-- 如果已设置过字体，点击默认是会触发 select 的 on-change 事件，这里不需要再绑定 on-change 事件 -->
                <Tooltip content="使用浏览器默认字体"><Button type="ghost" size="small" class="app-btn-gutter" @click="resetFont">默认</Button> </Tooltip>
                <SetSlideItem title='字体大小' :value="conf.theme.fontSize" :max="300" @slide="setFontSize" @slideEnd="setEvHandler(conf)" btnTips="应用的默认值" @clickBtn="resetFontSize" />
            </div>

            <div id="set-gutter" class="set-group">
                <SetSlideItem title='文字间隔' :value="conf.theme.letterSpacing" :min="-2" :max="20" @slide="setLetterSpacing" @slideEnd="setEvHandler(conf)" btnTips="应用的默认值" @clickBtn="resetLetterSpacing" />
                <SetSlideItem title='行&ensp;间&ensp;距' :value="conf.theme.lineHeight" :max="500" @slide="setLineHeight" @slideEnd="setEvHandler(conf)" btnTips="应用的默认值" @clickBtn="resetLineHeight" />
                <SetSlideItem title='上下边距' :value="conf.theme.hPadding" :max="300" @slide="setHPadding" @slideEnd="setEvHandler(conf)" btnTips="应用的默认值" @clickBtn="resetHPadding" />
                <SetSlideItem title='左右边距' :value="conf.theme.vPadding" :max="300" @slide="setVPadding" @slideEnd="setEvHandler(conf)" btnTips="应用的默认值" @clickBtn="resetVPadding" />
                <SetSlideItem title='纸张大小' :value="conf.theme.pageWidth" :max="500" @slide="setPageWidth" @slideEnd="setEvHandler(conf)" btnTips="应用的默认值" @clickBtn="resetPageWidth" />
            </div>

            <div id="set-theme" class="set-group">
                <div class="set-title">主题设置</div>
                <div class="theme-list">
                    <div class="theme-item" v-for="t in conf.themeList" :key="t.index" @click="useTheme(t)" :style="{background: t.theme.bg, color: t.theme.fontColor}">
                        <div class="theme-close-container"><Tooltip placement="top" content="彻底删除主题"><div @click.stop="delTheme(t)"><Icon type="close-circled" size="15" class="theme-close-btn"></Icon></div></Tooltip></div>
                        <div class="theme-item-content"><div :style="{background: t.theme.fontBg, padding: '10px', width: '80%', textAlign: 'center',}">{{ t.name }}</div></div>
                    </div>
                </div>
            </div>

            <div style="text-align: right; margin: 10px 0px 20px 0px">
                <Tooltip placement="top" content="保存当前的配置为新主题"><Button type="ghost" class="app-btn-gutter-l" @click="addTheme">保存为主题</Button></Tooltip>
                <Tooltip placement="top" content="恢复本地配置为应用默认配置"><Button type="ghost" class="app-btn-gutter-l" @click="resetUserConf">重置</Button></Tooltip>
                <Button type="primary" class="app-btn-gutter-l" @click="setVisible=false">关闭</Button>
            </div>
        </div>
    </DropdownMenu>
</Dropdown>
</template>

<script>
import cm from '../common/js'
import SetSlideItem from '@/components/common/SetSlideItem'

export default {
    model: {
        prop: 'conf',
        event: 'changeConf'
    },
    props: {
        conf: Object,
    },
    components: {
        SetSlideItem,
    },
    data () {
        return {
            setVisible: false,
            colors: cm.colors,
            fontList: cm.fontList,
            basePageWidth: cm.basePageWidth,
            defaultTheme: Object.assign({}, cm.defaultTheme),
        }
    },
    beforeCreate () {
        cm.getUserConf(this);
    },
    methods: {
        resetAllColors () {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.fontColor = this.defaultTheme.fontColor; 
            tmpConf.theme.fontBg = this.defaultTheme.fontBg; 
            tmpConf.theme.bg = this.defaultTheme.bg; 
            tmpConf.theme.hdrBg = this.defaultTheme.hdrBg; 

            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setFontColor (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.fontColor = arg;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setFontBg (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.fontBg = arg;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setBg (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.bg = arg;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setHdrBg (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.hdrBg = arg;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setFont (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.font = arg;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        resetFont (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.font = this.defaultTheme.font;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setFontSize (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.fontSize = arg;
            this.$emit('changeConf', tmpConf);
        },
        resetFontSize (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.fontSize = this.defaultTheme.fontSize;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setLetterSpacing (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.letterSpacing = arg;
            this.$emit('changeConf', tmpConf);
        },
        resetLetterSpacing (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.letterSpacing = this.defaultTheme.letterSpacing;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setLineHeight (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.lineHeight = arg;
            this.$emit('changeConf', tmpConf);
        },
        resetLineHeight (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.lineHeight = this.defaultTheme.lineHeight;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setHPadding (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.hPadding = arg;
            this.$emit('changeConf', tmpConf);
        },
        resetHPadding (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.hPadding = this.defaultTheme.hPadding;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setVPadding (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.vPadding = arg;
            this.$emit('changeConf', tmpConf);
        },
        resetVPadding (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.vPadding = this.defaultTheme.vPadding;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setPageWidth (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.pageWidth = arg;
            this.$emit('changeConf', tmpConf);
        },
        resetPageWidth (arg) {
            let tmpConf = Object.assign({}, this.conf);
            tmpConf.theme.pageWidth = this.defaultTheme.pageWidth;
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        setEvHandler (saveConf) {
            console.log("setEvHandler");
            cm.saveUserConf(this, saveConf);
        },
        addTheme () {
            let tmpTheme = Object.assign({}, this.conf.theme);
            let t = new cm.themeListItem(this.conf.themeList.length + 1, tmpTheme);
            let tmpConf = new cm.userConf(Object.assign({}, tmpTheme), this.conf.themeList.concat(t));
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        delTheme (t) {
            console.log("delTheme: " + t.name);
            let list = JSON.parse(JSON.stringify(this.conf.themeList));
            let deleted = false;

            for (let i=0; i<list.length; i++){
                if (t.name == list[i].name){
                    list.splice(i, 1);
                    deleted = true;
                    break;
                }
            }

            if (deleted) {
                let tmpConf = new cm.userConf(this.conf.theme, list);
                this.$emit('changeConf', tmpConf);
                this.setEvHandler(tmpConf);
            } else {
                this.$Modal.error({
                    title: "删除主题出错",
                    content: "找不到主题",
                });
            }
            
        },
        useTheme (t) {
            let tmpConf = new cm.userConf(Object.assign({}, t.theme), this.conf.themeList);
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
        resetUserConf () {
            let tmpConf = new cm.userConf(Object.assign({}, cm.defaultTheme), JSON.parse(JSON.stringify(cm.themeList)));
            this.$emit('changeConf', tmpConf);
            this.setEvHandler(tmpConf);
        },
    },
}
</script>

<style scoped>
    #setArea {
        width: 620px;
        
        padding: 0px 30px;
    }
    .set-group{
        padding: 16px 0px;
    }
    .set-item{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .set-title{
        padding-bottom: 16px;
    }
    .set-item .slider{
        flex-grow: 1;
    }
    .theme-list{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .theme-item{
        width: 90px;
        height: 90px;
        margin: 5px 5px 0px 0px;       
    }
    .theme-item-content{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .theme-close-container{
        display: flex;
        justify-content: flex-end;

        height: 30px;
    }
    .theme-close-btn{
        margin-right: 6px;
        margin-top: 6px;
        cursor: pointer;
    }
</style>
