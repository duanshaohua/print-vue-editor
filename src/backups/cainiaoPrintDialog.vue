<template>
  <el-dialog title="菜鸟打印\预览" :visible.sync="dialogVisible" width="550px">
    <el-form :model="printerConfig" inline label-width="80px">
      <el-form-item label="打印机" class="full-line">
        <el-select v-model="printerConfig.name" placeholder="请选择打印机">
          <el-option v-for="item in printer.printerList" :label="item" :value="item" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="宽度" class="extrusion_line">
        <el-input-number disabled v-model="printerConfig.paperSize.width" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="高度" class="extrusion_line">
        <el-input-number
          disabled
          v-model="printerConfig.paperSize.height"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="水平偏移" class="extrusion_line">
        <el-input-number
          disabled
          v-model="printerConfig.horizontalOffset"
          controls-position="right"
          :min="0"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="垂直偏移" class="extrusion_line">
        <el-input-number
          disabled
          v-model="printerConfig.verticalOffset"
          controls-position="right"
          :min="0"
          :max="10"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handlePreview('pdf')">PDF预览</el-button>
      <el-button size="medium" @click="handlePreview('image')">图片预览</el-button>
      <el-button size="medium" type="primary" @click="handlePreview">打印</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>