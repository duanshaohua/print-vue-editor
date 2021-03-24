<template>
  <el-container class="editor">
    <el-header class="editor_top">
      <div style="float: right;padding:14px">
        <!-- <el-button round @click="empty">清空模板</el-button>
        <el-button round @click="save">保存模板</el-button>
        
        <el-button round @click="printTest">测试打印</el-button>
        <el-button round @click="handleXML">转换模板</el-button>
        <el-button round @click="dialogVisible=!0">打印</el-button>-->
        <!-- <el-button round v-print="'#printTemplate'">测试打印</el-button> -->
        <!-- <el-button round @click="testTransform">测试转换</el-button> -->
        <el-button round @click="preview">预览</el-button>
        <el-button round @click="saveTemplate">保存模板</el-button>
      </div>
      <div class="editor_logo">打印模板编辑器</div>
    </el-header>
    <el-main style="padding:0px;height:100%">
      <el-container style="height:100%">
        <el-aside width="314px" class="editor_data">
          <div class="main">
            <el-row :gutter="20">
              <el-col :span="item.span||12" v-for="(item, index) in templateTags" :key="index">
                <el-button
                  class="editor_data_item"
                  :disabled="tinymceLoading"
                  @click="insertVariable(item)"
                >{{item.value}}</el-button>
                <el-card v-if="item.details" shadow="never">
                  <el-row :gutter="20">
                    <el-col
                      :span="item.span||12"
                      v-for="(item, index) in item.details"
                      :key="index"
                    >
                      <el-button
                        class="editor_data_item"
                        :disabled="tinymceLoading"
                        @click="insertVariable(item,'row.')"
                      >{{item.value}}</el-button>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
            <el-button class="editor_data_item" @click="insertTestTemplate">插入测试模板</el-button>
          </div>
        </el-aside>
        <el-main class="editor_content">
          <el-container style="height:100%">
            <el-main
              class="editor_area_wrap"
              v-loading="tinymceLoading"
              element-loading-text="正在初始化编辑器"
            >
              <div class="editor_area">
                <div
                  class="editor_bg"
                  id="printTemplate"
                  @click="editorAreaClick"
                  :style="pageStyle"
                >
                  <div class="page_offset_h" :style="offset_h"></div>
                  <div class="page_offset_v" :style="offset_v"></div>
                  <tinymce
                    ref="tinymceContainer"
                    class="tinymce"
                    v-model="content"
                    api-key="6mc7mn3dt2ee04bc86ugh8e47ltipweqjbrod4h8ljky9c28"
                    :init="config.tinymce"
                    v-bind="$attrs"
                    @onInit="onInit"
                  />
                  <!-- :style="pagePadding" -->
                </div>
                <div
                  v-for="(item, index) in pageBreak"
                  :key="index"
                  :style="item"
                  class="page_break"
                  title="分页符"
                ></div>
              </div>
              <div class="el-slider-box">
                <el-slider
                  :min="0.25"
                  :max="3"
                  :step="0.25"
                  v-model="pageZoom"
                  :format-tooltip="formatTooltip"
                ></el-slider>
              </div>
            </el-main>
            <el-aside width="314px" class="editor_config" @keydown.stop>
              <el-tabs type="border-card" v-model="activeName">
                <!-- <el-tab-pane label="样式" name="style"></el-tab-pane> -->
                <el-tab-pane label="配置" name="config">
                  <div class="config_config">
                    <div class="el-collapse-item__header">模板设置</div>
                    <div class="el-collapse-item__content">
                      <page-config-form v-model="config.page" inline />
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-aside>
          </el-container>
        </el-main>
      </el-container>
      <preview ref="preview" :page.sync="config.page" :template="content" />
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script>
// const compiler = require('vue-template-compiler')
import { templateTags, testTemplate, getDataMaster } from '../utils/data'
import pageConfigForm from '../pageConfig'
import tinymce from '@tinymce/tinymce-vue'
import preview from './preview'
export default {
  components: { tinymce, preview, pageConfigForm },
  props: {
    templateTags: {
      type: Array,
      default() {
        return templateTags
      },
    },
  },
  data() {
    return {
      config: {
        page: {},
        tinymce: {
          language: 'zh_CN',
          inline: true,
          plugins: [
            'quickbars',
            'table',
            'pagebreak',
            // 'autosave',
            'preview',
            'paste',
          ],
          toolbar: false,
          menubar: false,
          quickbars_insert_toolbar:
            'preview quickimage quicktable pagebreak restoredraft',
          quickbars_selection_toolbar:
            'bold italic | quicklink fontsizeselect | alignleft aligncenter alignright alignjustify | forecolor backcolor',
          lineheight_formats:
            '8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt',
          // auto_focus: true,
          paste_as_text: true, //粘贴为纯文本
          // autosave_restore_when_empty: true,
          extended_valid_elements:
            'tr[v-for|v-html|style|data-mce-style],td[v-html|class|colspan|style]', //允许输入vue语法
          table_cell_class_list: [
            { title: '无', value: '' },
            { title: '去除下边框', value: 'border-bottom-none' },
          ], //表格配置
          // table_default_attributes: {
          //   border: '0',
          // },
          table_tab_navigation: true,
          content_css: 'tinymce_content.css',
        },
      },
      pages: 1,
      pageHeight: 0,
      pageStyle: { width: 0, height: 0 },
      pagePadding: {
        padding: '0px',
      },
      offset_h: {},
      offset_v: {},
      pageZoom: 1, // 文档放大缩小的倍数0.84
      activeName: 'config',
      pageBreak: [],
      tinymceLoading: true,
      tinymce: null,
      content: null,
    }
  },
  watch: {
    config: {
      handler(obj) {
        if (obj.page.size) {
          const arr = obj.page.size.split('X')
          obj.page.width = arr[0] >> 0
          obj.page.height = arr[1] >> 0
        }
        this.editPageSize()
      },
      immediate: true,
      deep: true,
    },
    pageZoom(val) {
      this.editPageSize()
    },
    content(val) {
      // const domparser = new DOMParser()
      // const doc = domparser.parseFromString(val, 'text/html')
      // const pagebreak = doc.querySelectorAll('.mce-pagebreak')
      this.pages = val.split('<!-- pagebreak -->').length
      this.pageBreak = []
      for (let n = 0; n < this.pages - 1; n++) {
        this.pageBreak.push({ top: `${this.pageHeight * (n + 1) + 20}px` })
      }
      this.editPageSize()
      // console.log(pagebreak)
    },
  },
  methods: {
    formatTooltip(val) {
      return `缩放：${val * 100}%`
    },
    // 修改文档尺寸
    editPageSize() {
      const p = this.pageStyle
      const c = this.config.page
      const z = this.getZoom
      this.pageHeight = z(c.height)
      p.width = `${z(c.width)}px`
      p.height = `${this.pageHeight * this.pages}px`
      // console.log('this.$refs.tinymceContainer', this.$refs.tinymceContainer)
      if (c.orient == 3 && this.$refs.tinymceContainer) {
        p.height = `${this.$refs.tinymceContainer.$el.offsetHeight}px`
      }
      // 处理背景图片
      if (c.backgroundImage) {
        p.backgroundImage = `url(${c.backgroundImage})`
      }
      const offset_lr = `${z(c.horizontalOffset)}px`
      const offset_tb = `${z(c.verticalOffset)}px`
      this.pagePadding.padding = `${offset_tb} ${offset_lr}`
      // 修改页边距（左右）
      this.offset_h = {
        display: `${c.horizontalOffset > 0 ? 'block' : 'none'}`,
        left: offset_lr,
        fontSize: `${z(8)}px`,
        width: `${z(c.width - 2 * c.horizontalOffset)}px`,
      }
      // 修改页边距（上下）
      this.offset_v = {
        display: `${c.verticalOffset > 0 ? 'block' : 'none'}`,
        top: offset_tb,
        height: `${z(c.height - 2 * c.verticalOffset)}px`,
      }
    },
    getZoom(v) {
      return v * this.config.page.rate * this.pageZoom
    },
    // 编辑器初始化完成
    onInit(event, editor) {
      // console.log(event, editor)
      this.tinymce = editor
      this.tinymceLoading = false
    },
    editorAreaClick() {
      this.tinymce.focus()
    },
    insertVariable(item, prefix = '') {
      this.tinymce.insertContent(
        item.details ? getDataMaster(item) : `{{${prefix}${item.alias}}}`
      )
    },
    insertTestTemplate() {
      this.tinymce.insertContent(testTemplate)
    },
    // testTransform() {
    //   const res = compiler.ssrCompile(this.content)
    //   console.log(res)
    // },
    preview() {
      //this.content, this.config.page
      this.$refs.preview.open()
    },
    saveTemplate() {
      console.log(this.content)
      this.$emit('save', this.content, this.config.page)
    },
  },
}
</script>