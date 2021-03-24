<template>
  <el-tabs v-model="printActiveName">
    <el-tab-pane label="菜鸟打印" name="cainiao">
      <!-- <cainiao /> -->
    </el-tab-pane>
    <el-tab-pane label="LODOP打印" name="lodop">
      <lodop />
    </el-tab-pane>
    <el-tab-pane label="WEB打印" name="web">
      <el-button type="primary" v-print="'#printContainer'" plain>打 印</el-button>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// import cainiao from './cainiao'
import lodop from './lodop'
export default {
  components: {
    // cainiao,
    lodop,
  },
  data() {
    return {
      printActiveName: 'cainiao',
    }
  },
}
</script>