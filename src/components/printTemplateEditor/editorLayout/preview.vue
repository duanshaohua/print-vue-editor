<template>
  <el-drawer
    title="我是标题"
    size="80%"
    :visible.sync="drawerVisible"
    :with-header="false"
    append-to-body
  >
    <el-container style="height:100%">
      <el-aside width="400px">
        <div style="padding:30px">
          <el-alert
            v-if="test"
            title="本页面为示例数据，请预览测试打印效果"
            style="margin-bottom:20px"
            type="success"
          ></el-alert>
          <!-- <print /> -->
          <lodop-print
            ref="lodopPrint"
            :page.sync="config.page"
            :print-container="printContainer"
            @complate="printComplate"
          />
          <!-- <el-button type="primary" @click="getContentHeight" plain>获取内容高</el-button> -->
        </div>
      </el-aside>
      <el-main style="padding:0px">
        <el-container style="height:100%;">
          <el-main style="padding:0px">
            <div class="editor_content">
              <div class="editor_area">
                <div class="editor_bg" :style="pageStyle">
                  <div class="page_offset_h" :style="offset_h"></div>
                  <div class="page_offset_v" :style="offset_v"></div>
                  <div ref="printContainer" id="printContainer">
                    <dynamicContent
                      :data="templateData"
                      :template="template"
                      @complate="dynamicContentComplate"
                    />
                  </div>
                </div>
                <div
                  v-for="(item, index) in pageBreak"
                  :key="index"
                  :style="item"
                  class="page_break"
                  title="分页符"
                ></div>
              </div>
            </div>
          </el-main>
          <!-- <el-footer style="border-top:1px solid #eee">
            <div style="padding-top:13px;">
              <div style="width:300px">
                <el-slider
                  :min="0.25"
                  :max="1"
                  :step="0.05"
                  v-model="pageZoom"
                  :format-tooltip="formatTooltip"
                ></el-slider>
              </div>
            </div>
          </el-footer>-->
        </el-container>
      </el-main>
    </el-container>
  </el-drawer>
</template>

<script>
import preview from '../mixin/preview'
import dynamicContent from './dynamicContent'
// import print from '../sendPrint'
import lodopPrint from '../sendPrint/lodop'
import { templateData } from '../utils/data'

export default {
  components: {
    dynamicContent,
    // print,
    lodopPrint,
  },
  props: {
    page: {
      type: Object,
      default() {
        return {}
      },
    },
    template: {
      type: String,
      default: '',
    },
    templateData: {
      type: Object,
      default() {
        return templateData
      },
    },
    test: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [preview],
  data() {
    return {
      drawerVisible: false,
      printContainer: null,
      pageBreak: [
        {
          top: '300px',
        },
        {
          top: '600px',
        },
        {
          top: '900px',
        },
        {
          top: '1200px',
        },
        {
          top: '1500px',
        },
      ],
    }
  },
  watch: {
    page: {
      handler(val) {
        this.config.page = {}
        this.config.page = val
      },
      immediate: true,
    },
    'config.page': {
      handler(val) {
        this.getPrintContainer()
        this.$emit('update:page', val)
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    open() {
      this.drawerVisible = true
      this.$nextTick(() => {
        this.editPageSize()
      })
    },
    dynamicContentComplate() {
      this.getPrintContainer()
    },
    getPrintContainer() {
      const _printContainer = this.$refs.printContainer
      if (!_printContainer) return
      this.printContainer = {
        innerHTML: _printContainer.innerHTML,
        offsetWidth: _printContainer.offsetWidth,
        offsetHeight: _printContainer.offsetHeight,
      }
    },
    printComplate() {
      console.log('打印完成')
      // const printContainer = this.$refs.printContainer
      // console.log(111, printContainer.innerHTML)
      // this.$refs.lodopPrint.sendPrint(
      //   printContainer.innerHTML,
      //   printContainer.offsetWidth,
      //   printContainer.offsetHeight + 10
      // )
    },
    getContentHeight() {
      console.log(
        this.$refs.printContainer.offsetWidth,
        this.$refs.printContainer.offsetHeight
      )
    },
  },
}
</script>

<style lang="less" scoped>
.el-drawer__body {
  height: 100%;
}
.el-aside {
  border-right: 1px solid #eee;
}
.el-header {
  background: #054572;
}
.editor_content {
  display: flex;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
  .editor_area {
    overflow: scroll;
    text-align: center;
    position: relative;
    width: 100%;

    .editor_bg {
      position: relative;
      text-align: left;
      background-color: #fff;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
      width: 300px;
      height: 400px;
      margin: 20px auto;
      background-size: cover;

      .page_offset_h,
      .page_offset_v {
        position: absolute;
        // border: 1px dashed #ececec;
        user-select: none;
        height: 100%;
        text-align: center;
        font-size: 24px;
        color: #d6d6d5;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .page_offset_h {
        border-width: 0 1px;
        height: 100%;
      }

      .page_offset_v {
        border-width: 1px 0;
        width: 100%;
      }

      .stander_line {
        position: absolute;
        border-color: black;
      }

      .el-table {
        th,
        td {
          border-bottom: 1px solid #000;
          border-right: 1px solid #000;
        }
      }
    }

    .page_break {
      width: 100%;
      height: 0px;
      border-top: 1px dashed #bbb;
      position: absolute;
      &:hover {
        border-color: #f30;
      }
    }
  }
}
</style>