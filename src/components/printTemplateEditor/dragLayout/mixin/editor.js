// 模板编辑器
import { pageConfig, rate } from "../../utils/page";
export default {
    data() {
        return {
            rate, // mm px比率
            typeArray: [
                'h-text',
                'v-text',
                'd-text',//动态文本占位符
                'h-line',
                'v-line',
                'rect',
                'barcode',
                'qrcode',
                'image'
            ],
            pageZoom: 0.75, // 文档放大缩小的倍数
            caiNiaoPageStyle: {}, // 不可编辑样式
            pageStyle: { width: 0, height: 0 }, // 文档大小
            offset_h: {},
            offset_v: {},
            layout: [],
            styleKeys: [
                'id',
                'height',
                'width',
                'left',
                'top',
                'ref',
                'src',
                'value',
                'type',
                'ratioMode',
                'zIndex',
                'rules',
                'alias'
            ],
            disMenu: [], // 右键菜单
            menuList: {
                Delete: '删除',
                'Ctrl+c': '复制',
                'Ctrl+up': '置顶',
                'Ctrl+down': '置底'
            },
            menuStyle: {
                zIndex: 1000,
                visibility: 'hidden',
                left: 0,
                top: 0
            }, // 右键菜单样式
            standerLineList: [], // 对齐线存放数组
            activeName: 'config',
            print: [],
            config: {
                page: pageConfig,
                fontFamilyList: ['宋体', '黑体', '楷体', '仿宋体'],
                fontWeightList: { normal: '默认', bold: '粗体', light: '细体' },
                valignList: { top: 'left', middle: 'center', bottom: 'right' },
                fontAlign: ['left', 'center', 'right'],
                barcodeType: [
                    'code128a',
                    'code128b',
                    'code128c',
                    'code11',
                    'postnet',
                    'Code39',
                    'Code93',
                    'upca',
                    'upce',
                    'ean8',
                    'ean13',
                    'itf14',
                    'c25inter',
                    'maxicode',
                    'datamatrix'
                ], // 条形码
                qrcodeType: ['qrcode', 'pdf417'],
                lineType: { solid: '实线条', dashed: '破折线', dotted: '点线条' },
                text: {
                    zIndex: 1,
                    id: '',
                    left: 0,
                    top: 0,
                    width: 30,
                    height: 8,
                    orientation: 'horizontal', // 方向，默认水平
                    rotation: 0,
                    alpha: 1,
                    fontFamily: '宋体',
                    fontSize: 8,
                    letterSpacing: '',
                    lineHeight: '',
                    fontColor: '',
                    fontWeight: 'normal',
                    wrap: false,
                    fontStyle: [],
                    align: 'left',
                    valign: 'left',
                    value: '请输入文本',
                    alias: '',
                    rules: {
                        lineHeight: {
                            pattern: /^\d+%?$/,
                            message: '请设置正确的行高',
                            trigger: 'change'
                        },
                        value: {
                            required: true,
                            message: '请输入文本内容',
                            trigger: 'change'
                        }
                    },
                    disabled: {
                        value: false,
                        alias: false
                    }
                },
                barcode: {
                    zIndex: 1,
                    id: '',
                    left: 0,
                    top: 0,
                    width: 60,
                    height: 30,
                    alpha: 1,
                    value: '请输入条形码',
                    type: 'code128',
                    hideText: false,
                    rules: {
                        value: {
                            required: true,
                            message: '请输入条形码内容',
                            trigger: 'change'
                        }
                    }
                },
                qrcode: {
                    zIndex: 1,
                    id: '',
                    left: 0,
                    top: 0,
                    width: 30,
                    height: 30,
                    alpha: 1,
                    value: '',
                    type: 'qrcode',
                    ratioMode: 'keepRatio', // 保持正方形
                    rules: {
                        value: {
                            required: true,
                            message: '请输入二维码内容',
                            trigger: 'change'
                        }
                    }
                },
                line: {
                    zIndex: 1,
                    id: '',
                    startX: 10,
                    startY: 10,
                    endX: 40,
                    endY: 40,
                    lineColor: '#000000',
                    lineWidth: 1,
                    lineType: 'solid',
                    rules: {}
                },
                rect: {
                    zIndex: 1,
                    id: '',
                    left: 50,
                    top: 50,
                    width: 50,
                    height: 50,
                    rotation: 0,
                    fillColor: '',
                    borderWidth: 0,
                    borderColor: '',
                    borderStyle: '',
                    rules: {}
                },
                image: {
                    zIndex: 1,
                    id: '',
                    left: 0,
                    top: 0,
                    width: 100,
                    height: 100,
                    rotation: 0,
                    alpha: 1
                }
            }
        }
    },
    mounted() {
        // 备份配置
        const C = (this.CONFIG = JSON.parse(JSON.stringify(this.config)))
        for (const k in C) {
            if (C.hasOwnProperty(k)) delete C[k].rules
        }
        document.addEventListener('click', this.handleDocumentClick)
        document.addEventListener('keydown', this.handleKeyDown)
    },
    computed: {
        getActiveLayoutObj() {
            // 获取当前激活的layout
            let s = false
            this.layout.forEach(obj => {
                if (obj.active) {
                    s = obj
                }
            })
            return s
        },
        getActiveLayoutType() {
            // 获取当前激活的layout类型
            const v = this.getConfigType(this.getActiveLayoutObj)
            this.activeName = v === 'page' ? 'config' : 'style'
            return v
        },
        showStyleTab() {
            // 判断是否显示样式tab
            return !['page'].includes(this.getActiveLayoutType)
        },
        showConfigTab() {
            // 判断是否显示配置tab
            return ['page', 'text', 'barcode', 'qrcode'].includes(
                this.getActiveLayoutType
            )
        }
    },
    methods: {
        // 处理右键菜单
        handleRightMenu(e) {
            this.menuStyle.left = `${e.pageX}px`
            this.menuStyle.top = `${e.pageY}px`
            this.menuStyle.visibility = 'visible'
        },
        handleDocumentClick() {
            this.menuStyle.visibility = 'hidden'
        },
        handleKeyDown(e) {
            e = e || window.event
            const kc = e.keyCode
            if (kc === 46) {
                // Delete
                this.handleContextMenu('D')
            } else if (e.ctrlKey) {
                if (kc === 67) {
                    // Ctrl+c
                    this.handleContextMenu('c')
                } else if (kc === 38) {
                    // Ctrl+UP
                    this.handleContextMenu('u')
                } else if (kc === 40) {
                    // Ctrl+Down
                    this.handleContextMenu('d')
                }
            }
            if (/^(37|38|39|40)$/.test(kc)) {
                this.handleContextMenu(kc)
                e.preventDefault()
            }
            this.menuStyle.visibility = 'hidden'
        },
        //对齐线展示触发方法
        showStanderLine(lineList) {
            this.standerLineList = lineList
        },
        // 插入元素
        handleDropDown(c, _config = null) {
            console.log('this.CONFIG', this.CONFIG)
            console.log('type-c', c)
            console.log('sss', c.replace(/^[vhd]-/, ''));
            if (this.typeArray.includes(c)) {
                const _obj = {
                    type: c.includes('text') ? c.replace(/^[vhd]-/, '') : c,
                    zoom: this.pageZoom,
                    editable: true,
                    active: true,
                    config: {}
                }
                const obj = Object.assign(
                    _obj.config,
                    this.CONFIG[c.replace(/^[vhd]-/, '')]
                )
                // 为每个layout打上id记号以区分
                obj.id = new Date().getTime()
                if (c.includes('text')) {
                    obj.orientation = c === 'v-text' ? 'vertical' : 'horizontal'
                    if (c === 'd-text') {
                        obj.disabled.value = true
                        obj.disabled.alias = true
                    }
                } else if (c.includes('line')) {
                    obj[c === 'h-line' ? 'endY' : 'endX'] =
                        c === 'h-line' ? obj.startX : obj.startY
                } else if (c === 'image') {
                    this.$prompt('请输入图片地址', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /^https?:\/\/.+\.(jpg|gif|png)/i,
                        inputErrorMessage: '图片地址不正确'
                    })
                        .then(({ value }) => {
                            obj.src = value
                            const img = new Image()
                            img.onload = () => {
                                _obj.config.width = this.getExchange(img.width)
                                _obj.config.height = this.getExchange(img.height)
                                this.layout.push(_obj)
                                this.activateLayout(_obj)
                            }
                            img.src = obj.src
                        })
                        .catch(() => { })
                }
                obj.zIndex = this.layout.length + 1
                if (_config != null) {
                    this.$map(obj, _config)
                }
                if (c !== 'image') {
                    this.layout.push(_obj)
                    this.activateLayout(_obj)
                }
            }
        },
        formatTooltip(val) {
            return `缩放：${val * 100}%`
        },
        getZoom(v) {
            return v * this.rate * this.pageZoom
        },
        getExchange(v) {
            return (v / this.rate).toFixed(2)
        },
        // 修改文档尺寸
        editPageSize() {
            const p = this.pageStyle
            const c = this.config.page
            const z = this.getZoom
            p.width = `${z(c.width)}px`
            p.height = `${z(c.height)}px`
            if (c.backgroundImage) {
                p.backgroundImage = `url(${c.backgroundImage})`
            }
            if (this.cainiao) {
                const obj = Object.assign({}, p)
                obj.backgroundImage = `url(${this.cainiao.backgroundImage})`
                obj.height = `${z(this.cainiao.height)}px`
                obj.marginBottom = 0
                obj.marginTop = '20px'
                this.caiNiaoPageStyle = obj
                p.marginTop = 0
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
        // 放大缩小
        handlePageZoom(z) {
            let p = this.pageZoom + (z ? 0.25 : -0.25)
            if (p < 0.25) p = 0.25
            if (p > 6) p = 6
            this.pageZoom = p
        },
        // 点击右键菜单
        clickContextMenu(e) {
            this.handleContextMenu(
                e.target.innerHTML.replace(/(?:.+\+)?(\w).+/, '$1')
            )
        },
        // 处理右键菜单点击
        handleContextMenu(type) {
            if (this.getActiveLayoutObj) {
                if (this.disMenu.includes(type)) return // 被禁止的功能
                switch (type) {
                    case 'D':
                        this.layout.forEach((obj, i) => {
                            if (obj.active) {
                                if (this.store) {
                                    this.print.forEach(o => {
                                        const l = o.value.findIndex(v => v === obj.name)
                                        l >= 0 &&
                                            o.list.findIndex(
                                                k => k.name === obj.name && !k.disabled
                                            ) >= 0 &&
                                            o.value.splice(l, 1)
                                    })
                                } else {
                                    this.layout.splice(i, 1)
                                }
                            }
                        })
                        break
                    case 'c':
                        const obj = JSON.parse(JSON.stringify(this.getActiveLayoutObj))
                        const c = obj.config
                        if (c.hasOwnProperty('startX')) {
                            c.startY += 8
                            c.endY += 8
                        } else {
                            c.left += 8
                            c.top += 8
                        }
                        c.zIndex += 1
                        this.getActiveLayoutObj.active = false
                        this.layout.push(obj)
                        break
                    case 'u':
                        let max = 0
                        this.layout.forEach(o => {
                            max = Math.max(o.config.zIndex, max)
                        })
                        this.getActiveLayoutObj.config.zIndex = max + 1
                        break
                    case 'd':
                        let min = 100
                        this.layout.forEach(o => {
                            o.config.zIndex += 1
                            min = Math.min(o.config.zIndex, min)
                        })
                        this.getActiveLayoutObj.config.zIndex = min - 1
                        break
                    case 37: // left
                    case 38: // up
                    case 39: // right
                    case 40: // down
                        const con = this.config[
                            this.getConfigType(this.getActiveLayoutObj)
                        ]
                        const v = /(37|38)/.test(type) ? -1 : 1
                        if (con.hasOwnProperty('startX')) {
                            const k = /(37|39)/.test(type) ? 'X' : 'Y'
                            con[`start${k}`] += v
                            con[`end${k}`] += v
                        } else {
                            con[/(37|39)/.test(type) ? 'left' : 'top'] += v
                        }
                        break
                    default:
                }
            }
        },
        getConfigType(o) {
            return o ? o.type.replace(/^[vh]-/, '') : 'page'
        },
        activateLayout(o) {
            // 激活当前点击的layout,并替换数据
            this.menuStyle.visibility = 'hidden'
            this.layout.forEach(obj => {
                if (obj === o) {
                    obj.active = true
                    const config = this.config[this.getConfigType(o)]
                    const _c = obj.config
                    for (const key in _c) {
                        if (_c.hasOwnProperty(key)) {
                            config[key] = _c[key]
                        }
                    }
                } else {
                    obj.active = false
                }
            })
        },
        dragUpdate(obj) {
            // 更新数据
            const type = this.getActiveLayoutType
            if (type !== 'page') {
                const config = this.config[type]
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        config[key] = obj[key]
                    }
                }
            }
        }
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleDocumentClick)
        document.removeEventListener('keydown', this.handleKeyDown)
    },
    watch: {
        config: {
            handler(obj) {
                const o = this.getActiveLayoutObj
                if (o) {
                    const _o = obj[this.getConfigType(o)]
                    for (const key in _o) {
                        if (_o.hasOwnProperty(key)) {
                            o.config[key] = _o[key]
                        }
                    }
                    if (o.type === 'qrcode') {
                        // 二维码保持正方形
                        o.config.width = o.config.height = Math.max(_o.width, _o.height)
                    }
                    // 有菜鸟模板不准y小于0
                    if (this.cainiao) {
                        o.config.top = Math.max(o.config.top, 0)
                    }
                }
                if (obj.page.size) {
                    const arr = obj.page.size.split('X')
                    // const c = this.printerConfig
                    // c.paperSize.width = 
                    obj.page.width = arr[0] >> 0
                    // c.paperSize.height = 
                    obj.page.height = arr[1] >> 0
                    // c.horizontalOffset = obj.page.horizontalOffset
                    // c.verticalOffset = obj.page.verticalOffset
                }
                this.editPageSize()
            },
            immediate: true,
            deep: true
        },
        pageZoom(v) {
            this.editPageSize()
            this.layout.forEach(obj => {
                obj.zoom = v
            })
        }
    }
}