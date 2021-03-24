<template>
  <el-select v-model="selected" :placeholder="placeholder" @change="change">
    <el-option v-for="(item,key) in pageSize" :key="key" :label="key" :value="item"></el-option>
  </el-select>
</template>

<script>
import { pageSize } from './utils/page'
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '请选择纸张类型',
    },
  },
  data() {
    return {
      pageSize,
      selected: null,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.selected = this.value
      },
      immediate: true,
    },
  },
  methods: {
    change(val) {
      this.$emit('change', val)
    },
  },
}
</script>