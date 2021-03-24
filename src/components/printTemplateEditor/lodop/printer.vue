<template>
  <el-select v-model="selected" :loading="loading" @change="change" placeholder="请选择打印机">
    <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { getLodop } from '../utils/lodop'
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      selected: -1,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selected = val
      },
      immediate: true,
    },
  },
  mounted() {
    this.getPrinters()
  },
  methods: {
    getPrinters() {
      if (this.list.length == 0) {
        this.loading = true
        let LODOP = getLodop()
        let arr = []
        let iPrinterCount = LODOP.GET_PRINTER_COUNT()
        for (let i = 0; i < iPrinterCount; i++) {
          arr.push({
            label: LODOP.GET_PRINTER_NAME(i),
            value: i,
          })
        }
        let defaultName = LODOP.GET_PRINTER_NAME(-1) //GET_PRINTER_NAME(intPrinterIndex);用序号获得打印机名，一般序号从0开始，-1特指默认打印机；
        arr.forEach((item) => {
          if (item.label == defaultName) {
            item.value = -1
            item.label += '-默认打印机'
          }
        })
        // console.log(defaultName)
        this.list = arr
        this.loading = false
      }
    },
    change(val) {
      this.$emit('change', val)
    },
  },
}
</script>