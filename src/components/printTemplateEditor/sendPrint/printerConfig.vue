<template>
  <el-form :model="form" :rules="rules" ref="form" v-bind="$attrs" label-width="53px">
    <el-form-item label="打印机" class="full-line">请选择打印机</el-form-item>
    <el-form-item label="尺寸" prop="size" class="full-line">
      <page-size v-model="form.size" />
    </el-form-item>
    <el-form-item label="纸张类型" class="extrusion_line">
      <page-orient v-model="form.orient" />
    </el-form-item>
    <el-form-item label="宽度" prop="width">
      <el-input-number
        :disabled="form.size!=''"
        v-model="form.width"
        controls-position="right"
        :min="50"
        :max="1000"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="高度" prop="height">
      <el-input-number
        :disabled="form.size!=''"
        v-model="form.height"
        controls-position="right"
        :min="50"
        :max="1000"
      ></el-input-number>
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
    <el-form-item label="名称" prop="name" class="full-line">
      <el-input v-model="form.name" placeholder="模板名称"></el-input>
    </el-form-item>
    <el-form-item label="分页" prop="splitable">
      <el-radio-group disabled v-model="form.splitable">
        <el-radio :label="true">分页</el-radio>
        <el-radio :label="false">不分页</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="描述" prop="describe" class="full-line">
      <el-input type="textarea" :rows="2" v-model="form.describe" placeholder="模板描述"></el-input>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import pageSize from './pageSize'
import pageOrient from './lodop/orient'
import { printerConfig, pageConfigRules } from '../utils/page'
export default {
  components: {
    pageSize,
    pageOrient,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: { ...printerConfig },
      rules: pageConfigRules,
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val != null) {
          this.$map(this.form, val)
        } else {
          this.form = { ...pageConfig }
        }
      },
      immediate: true,
    },
    form: {
      handler(val) {
        this.emitChange(val)
      },
      deep: true,
    },
  },
  mounted() {
    this.emitChange({ ...pageConfig })
  },
  methods: {
    validate(fn) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          fn(valid, this.form)
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.form = { ...form }
      this.$refs.form.resetFields()
    },
    emitChange(val) {
      this.$emit('change', val)
    },
  },
}
</script>