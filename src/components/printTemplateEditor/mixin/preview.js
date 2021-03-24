// 预览器
export default {
    data() {
        return {
            config: { page: {} },
            pageZoom: 1, // 文档放大缩小的倍数
            pageStyle: { width: 0, height: 0 }, // 文档大小
            offset_h: {},
            offset_v: {},
        }
    },
    watch: {
        config: {
            handler(obj) {
                this.editPageSize()
            },
            immediate: true,
            deep: true
        },
        pageZoom(v) {
            this.editPageSize()
        }
    },
    methods: {
        // 修改文档尺寸
        editPageSize() {
            const p = this.pageStyle
            const c = this.config.page
            const z = this.getZoom
            p.width = `${z(c.width)}px`
            p.height = `${z(c.height)}px`

            if (c.orient == 3 && this.$refs.printContainer) {
                p.height = `${this.$refs.printContainer.offsetHeight}px`
            }

            if (c.backgroundImage) {
                p.backgroundImage = `url(${c.backgroundImage})`
            }
            // 修改页边距
            this.offset_h = {
                display: `${c.horizontalOffset > 0 ? 'block' : 'none'}`,
                left: `${z(c.horizontalOffset)}px`,
                fontSize: `${z(8)}px`,
                width: `${z(c.width - 2 * c.horizontalOffset)}px`
            }
            this.offset_v = {
                display: `${c.verticalOffset > 0 ? 'block' : 'none'}`,
                top: `${z(c.verticalOffset)}px`,
                height: `${z(c.height - 2 * c.verticalOffset)}px`
            }
        },
        formatTooltip(val) {
            return `缩放：${val * 100}%`
        },
        getZoom(v) {
            return v * this.config.page.rate * this.pageZoom
        },
    },
}