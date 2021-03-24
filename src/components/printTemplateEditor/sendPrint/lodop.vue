<template>
  <el-form :model="form" :rules="rules" ref="form" v-bind="$attrs" label-width="70px">
    <el-form-item label="打印机" prop="printer" class="full-line">
      <lodop-printer-list v-model="form.printer" @change="printerChange" style="width:100%" />
    </el-form-item>
    <el-form-item label="尺寸" prop="size" class="full-line">
      <page-size v-model="form.size" />
    </el-form-item>
    <el-form-item label="纸张类型" class="extrusion_line">
      <page-orient v-model="form.orient" style="width:100%" />
    </el-form-item>
    <el-form-item label="宽度" prop="width">
      <el-input-number v-model="form.width" controls-position="right" :min="50" :max="1000"></el-input-number>
    </el-form-item>
    <el-form-item label="高度" prop="height">
      <el-input-number v-model="form.height" controls-position="right" :min="50" :max="1000"></el-input-number>
    </el-form-item>
    <el-form-item label="打印比率" prop>
      <pixelrate v-model="form.rate" />
      <!-- <el-input-number v-model="form.rate" :precision="2" :step="0.2" :max="100" :min="0"></el-input-number> -->
    </el-form-item>
    <el-form-item label="水平偏移" prop="horizontalOffset" class="extrusion_line">
      <el-input-number
        v-model="form.horizontalOffset"
        controls-position="right"
        :min="0"
        :max="form.width/2"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="垂直偏移" prop="verticalOffset" class="extrusion_line">
      <el-input-number
        v-model="form.verticalOffset"
        controls-position="right"
        :min="0"
        :max="form.height/2"
      ></el-input-number>
    </el-form-item>
    <!-- <el-form-item label="分页" prop="splitable">
      <el-radio-group disabled v-model="form.splitable">
        <el-radio :label="true">分页</el-radio>
        <el-radio :label="false">不分页</el-radio>
      </el-radio-group>
    </el-form-item>-->
    <el-form-item>
      <el-button type="primary" @click="print" plain>打 印</el-button>
      <el-button type="primary" @click="preview" plain>预览打印</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getLodop } from '../utils/lodop'
import lodopPrinterList from '../lodop/printer'
import pageOrient from '../lodop/orient'
import { printerConfig, printerConfigRules } from '../utils/page'
import pixelrate from '../pixelrate'
import pageSize from '../pageSize'
export default {
  components: {
    lodopPrinterList,
    pageOrient,
    pixelrate,
    pageSize,
  },
  props: {
    page: {
      type: Object,
      default() {
        return {}
      },
    },
    printContainer: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      form: { printer: -1, ...printerConfig },
      rules: printerConfigRules,
      LODOP: null,
    }
  },
  watch: {
    page: {
      handler(val) {
        this.$map(this.form, val)
      },
      immediate: true,
      deep: true,
    },
    form: {
      handler(val) {
        this.$emit('update:page', val)
      },
      deep: true,
    },
    'form.size': function (val) {
      this.form.orient = 1
    },
  },
  mounted() {
    this.LODOP = getLodop()
  },
  methods: {
    printerChange(val) {
      // 设置打印机
      this.LODOP.SET_PRINTER_INDEX(val)
    },
    initPrint() {
      return new Promise((resolve, reject) => {
        if (!this.printContainer) {
          this.$message.error('初始化打印失败')
          reject()
          return
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 设置打印机
            this.LODOP.SET_PRINTER_INDEX(this.form.printer)
            //打印内容宽度
            const contentWidth = this.printContainer.offsetWidth
            //打印内容高度
            const contentHeight = this.printContainer.offsetHeight + 10
            console.log('纸张高度', `${this.form.height}mm`)
            //初始化打印
            this.LODOP.PRINT_INIT('测试打印调试')
            //使输出以纸张边缘为基点
            this.LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true)
            //计算内容的高（mm）
            const contentHeightMM = (contentHeight / this.form.rate) * 10
            console.log('打印内容高度', `${contentHeightMM}mm`)
            //纸张高度转打印机接收纸张高度
            const pageHeightMM = this.form.height * 10
            console.log('纸张高度[精度]', pageHeightMM)
            //计算打印页面数
            let pages = Math.floor(contentHeightMM / pageHeightMM)
            if (contentHeightMM % pageHeightMM > 0) {
              pages++
            }
            console.log('打印页面数', pages)
            console.log(
              '纸张底边的空白高',
              pageHeightMM * pages - contentHeightMM
            )
            this.LODOP.SET_PRINT_PAGESIZE(
              this.form.orient,
              this.form.width * 10,
              pageHeightMM * pages - contentHeightMM,
              '241三等分'
            )
            this.LODOP.ADD_PRINT_HTM(
              this.form.verticalOffset,
              this.form.horizontalOffset,
              contentWidth,
              contentHeight,
              this.printContainer.innerHTML
            )
            resolve(this.LODOP)
          } else {
            return false
          }
        })
      })
    },
    preview() {
      this.initPrint().then((lodop) => {
        lodop.PREVIEW()
      })
    },
    print() {
      this.initPrint().then((lodop) => {
        lodop.PRINT()
        this.$emit('complate', this.form)
      })
    },
  },
}
</script>