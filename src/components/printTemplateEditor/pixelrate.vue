<template>
  <div class="pixelrate-container">
    <el-input-number
      v-model="rate"
      :precision="2"
      :step="0.01"
      :max="100"
      :min="0"
      @change="rateChange"
      controls-position="right"
    ></el-input-number>
    <!-- <el-link :underline="false" @click="openPixelrate" style="margin-left:15px">计算像素比</el-link>
    <el-dialog width="300px" :visible.sync="dialogVisible" append-to-body>
      <div class="pixelrate">100PX</div>
      <div class="msg">
        <p>不同显示器的DPI都不一样，所以导致，显示和打印尺寸不一样</p>
        <p>请用尺子量一下上面方框的毫米数</p>
        <p>像素比=100/毫米数</p>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Number,
      default: 3.78,
    },
  },
  data() {
    return {
      dialogVisible: false,
      rate: 3.78,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.rate = val
      },
      immediate: true,
    },
  },
  mounted() {
    if (localStorage.pixelrate) {
      this.rate = localStorage.pixelrate
    }
  },
  methods: {
    openPixelrate() {
      this.dialogVisible = true
    },
    rateChange(val) {
      localStorage.pixelrate = val
      this.$emit('change', val)
    },
  },
}
</script>

<style lang="less" scoped>
.pixelrate-container {
  display: inline-block;
}
.pixelrate {
  width: 100px;
  height: 100px;
  margin: auto;
  background: #409eff;
  color: #fff;
  text-align: center;
  line-height: 100px;
}
.msg {
  margin-top: 20px;
  text-align: center;
}
</style>