<template>
  <el-select v-model="selected" filterable :placeholder="placeholder" @change="change">
    <el-option v-for="item in orient" :key="item.value" :label="item.name" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import { orient } from '../utils/lodop'
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Number,
      default: null,
    },
    placeholder: {
      type: String,
      default: '请选择纸张类型',
    },
  },
  data() {
    return {
      orient,
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