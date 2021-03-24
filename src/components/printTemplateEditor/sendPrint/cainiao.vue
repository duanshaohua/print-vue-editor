<template>
  <el-form :model="printerConfig" label-width="80px">
    <el-form-item label="打印机">
      <el-select v-model="printerConfig.name" placeholder="请选择打印机">
        <el-option v-for="item in printer.printerList" :label="item" :value="item" :key="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="打印宽度">
      <el-input-number disabled v-model="printerConfig.paperSize.width" controls-position="right"></el-input-number>
    </el-form-item>
    <el-form-item label="打印高度">
      <el-input-number disabled v-model="printerConfig.paperSize.height" controls-position="right"></el-input-number>
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
    <el-form-item>
      <el-button type="primary" plain>打 印</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import cainiaoPrinter from '../../mixin/cainiaoPrinter'
export default {
  data() {
    return {}
  },
}
</script>