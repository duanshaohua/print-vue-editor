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
          <el-tabs v-model="printActiveName">
            <el-tab-pane label="菜鸟打印" name="cainiao">
              <el-form :model="printerConfig" inline label-width="80px">
                <el-form-item label="打印机">
                  <el-select v-model="printerConfig.name" placeholder="请选择打印机">
                    <el-option
                      v-for="item in printer.printerList"
                      :label="item"
                      :value="item"
                      :key="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="打印宽度">
                  <el-input-number
                    disabled
                    v-model="printerConfig.paperSize.width"
                    controls-position="right"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="打印高度">
                  <el-input-number
                    disabled
                    v-model="printerConfig.paperSize.height"
                    controls-position="right"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="水平偏移">
                  <el-input-number
                    disabled
                    v-model="printerConfig.horizontalOffset"
                    controls-position="right"
                    :min="0"
                    :max="10"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="垂直偏移">
                  <el-input-number
                    disabled
                    v-model="printerConfig.verticalOffset"
                    controls-position="right"
                    :min="0"
                    :max="10"
                  ></el-input-number>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="LODOP打印" name="lodop">
              <lodop-printer-list />
              <el-button @click="testPrint">LP打印</el-button>
            </el-tab-pane>
            <el-tab-pane label="WEB打印" name="web">
              <el-button type="primary" v-print="'#printContainer'" plain>NB打印</el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-aside>
      <el-main style="padding:0px">
        <el-container style="height:100%;">
          <el-main style="padding:0px">
            <div class="editor_content">
              <div
                class="editor_area"
                id="printContainer"
                ref="printContainer"
                @click="activateLayout"
                @contextmenu.prevent="handleRightMenu"
              >
                <div class="editor_bg" :style="pageStyle">
                  <div class="page_offset_h" :style="offset_h"></div>
                  <div class="page_offset_v" :style="offset_v"></div>
                  <drag-view
                    v-for="(obj,index) in layout"
                    :key="obj.type+index"
                    :config="obj"
                    @update="dragUpdate"
                    @activate="activateLayout"
                    :layout="layout"
                    @showStanderLine="showStanderLine"
                  />
                  <!-- <div
                    data-v-04d31fff
                    draggable="false"
                    class="drag_div"
                    style="z-index: 11; top: 500px; left: 15px;  width: 500px;height:auto;"
                  >
                    <div draggable="false" class="drag_div_in">
                      <el-table :data="tableData" border>
                        <el-table-column type="index" label="序号" width="50" />
                        <el-table-column prop="date" label="日期" width="180"></el-table-column>
                        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                        <el-table-column prop="address" label="地址" width="180"></el-table-column>
                      </el-table>
                    </div>
                  </div>-->
                </div>
              </div>
              <div class="page_break" style="top:300px"></div>
            </div>
          </el-main>
          <el-footer style="border-top:1px solid #eee">
            <div style="width:300px">
              <el-slider
                :min="0.25"
                :max="3"
                :step="0.25"
                v-model="pageZoom"
                :format-tooltip="formatTooltip"
              ></el-slider>
            </div>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </el-drawer>
</template>

<script>
import dragView from './dragView'
import editor from './mixin/editor'
// import {} from 'module'
import cainiaoPrinter from '../mixin/cainiaoPrinter'
import { getLodop } from '../utils/lodop'
import lodopPrinterList from '../lodop/printer'
import { tableData } from '../utils/data'
export default {
  name: 'preview',
  components: { dragView, lodopPrinterList },
  mixins: [editor, cainiaoPrinter],
  data() {
    return {
      drawerVisible: false,
      printActiveName: 'cainiao',
      pageBreak: [],
      tableData,
    }
  },
  methods: {
    open(data, page) {
      this.layout = data.map((x) => {
        // x.editable = false
        x.active = false
        return x
      })
      this.config.page = page
      this.drawerVisible = true
    },
    testPrint() {
      const LODOP = getLodop()
      LODOP.PRINT_INIT('采购单')
      LODOP.ADD_PRINT_TEXT(50, 300, 260, 39, '采购单')
      const tes = this.$refs.printContainer.innerHTML
      console.log(tes)
      LODOP.ADD_PRINT_HTM(0, 0, 350, 600, tes)
      LODOP.PREVIEW()
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
  overflow: scroll;
  background: #f5f5f5;
  position: relative;
  .editor_area {
    flex: 1;
    display: flex;
    text-align: center;
    padding: 20px 100px;

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
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
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
  }
}
</style>