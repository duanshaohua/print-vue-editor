<template>
  <div v-html="html"></div>
</template>

<script>
import Vue from 'vue/dist/vue'
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    template: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      html: '',
    }
  },
  watch: {
    template: {
      handler(val) {
        this.compile()
      },
      immediate: true,
    },
  },
  methods: {
    compile() {
      const self = this
      const Component = Vue.extend({
        template: `<div>${this.template}</div>`,
        data() {
          return { ...self.data }
        },
      })
      const dynamicContent = new Component().$mount()
      this.html = dynamicContent.$el.innerHTML
      this.$nextTick(() => {
        this.$emit('complate', this.html)
      })
    },
  },
}
</script>