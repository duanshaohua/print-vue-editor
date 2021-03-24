// 菜鸟打印组件
export default {
    data() {
        return {
            socket: null,
            UUID: [],
            printer: {
                version: '1.0', // 协议版本
                errMsg: '等待初始化',
                printerList: [], // 打印机列表
                printerDate: [] // 需要打印的数据
            },
            resolveList: {}, // 回调函数
            printerConfig: {
                name: '', // 默认打印机
                needTopLogo: !1,
                needBottomLogo: !1,
                horizontalOffset: 0,
                verticalOffset: 0,
                forceNoPageMargins: !1, // v0.2.8.3 新增字段
                paperSize: {
                    width: 1,
                    height: 1
                }
            }
        }
    },
    created() {
        this.socket = new WebSocket('ws://localhost:13528')
        this.socket.onopen = () => {
            this.socket.onmessage = event => {
                console.log('监听到一条消息, data:', event.data)
                const response = JSON.parse(event.data)
                if (
                    response.status === 'success' ||
                    response.taskStatus === 'printed'
                ) {
                    switch (response.cmd) {
                        case 'getAgentInfo':
                            // 获取打印机列表
                            return this.socket.send(
                                JSON.stringify(
                                    this.getDefaultRequest('getPrinters', response.requestID)
                                )
                            )
                        // 获取打印机版本
                        case 'getPrinters':
                            // 获取打印机列表 并解析打印机列表数据
                            if (response.printers.length) {
                                // 获取默认打印机的配置
                                const p = this.printer.printerList
                                response.printers.forEach(pt => {
                                    pt.status === 'enable' && p.push(pt.name)
                                    if (response.defaultPrinter) {
                                        this.printerConfig.name = pt.name
                                    }
                                })
                            } else {
                                this.printer.errMsg = '无可用的打印机!'
                            }
                            break
                        case 'getPrinterConfig':
                            // 获取某个打印机的设置参数
                            break
                        case 'setPrinterConfig':
                            this.resolve_setPrinterConfig &&
                                this.resolve_setPrinterConfig('setPrinterConfig')
                            break
                        case 'notifyPrintResult':
                            // 打印结果通知协议
                            if (response.taskStatus === 'printed') {
                                // 已经打印完成
                            } else if (response.taskStatus === 'rendered') {
                                // 已经渲染完成
                            }
                            break
                        case 'print':
                            // 打印
                            if (response.previewURL || response.previewImage) {
                                const f = this.resolveList.print
                                f &&
                                    f(
                                        response.previewURL
                                            ? response.previewURL
                                            : response.previewImage[0]
                                    )
                            } else {
                                console.log('打印成功:', response)
                            }
                            break
                        default:
                    }
                } else {
                    if (response.cmd === 'notifyPrintResult') {
                    } else {
                        this.printer.errMsg = response.msg
                        console.error(response)
                    }
                    this.$monitor.push({
                        title: `打印错误信息${response.msg}`,
                        info: JSON.stringify(response)
                    })
                }
            }
            this.socket.onclose = () => {
                this.printer.errMsg = '菜鸟打印组件连接断开！'
            }
            // 先获取版本
            this.socket.send(JSON.stringify(this.getDefaultRequest('getAgentInfo')))
            this.printer.errMsg = ''
        }
        this.socket.onerror = () => {
            this.$notify.error({
                title: '系统错误',
                duration: 0,
                dangerouslyUseHTMLString: true,
                message: `<div class="print_info">亲，系统检测到菜鸟打印组件启动失败，解决办法：
                        <h3>1、未安装控件</h3>
                        <p>请先安装控件，<a href="http://cloudprint.cainiao.com/cloudprint/client/CNPrintSetup.exe" target="_blank">请点击此处下载</a>。安装好后重启浏览器即可。</p>
                        <h3>2、已安装控件</h3>
                        <p>请在电脑的开始菜单-->“所有程序”里找到“CAINIAO打印组件”进行启动。</p></div>`
            })
            this.printer.errMsg = '连接打印组件失败！'
        }
    },
    methods: {
        // 获取通用请求参数
        getDefaultRequest(cmd, id) {
            return {
                version: this.printer.version,
                cmd,
                requestID: id || this.getUUID()
            }
        },
        // 获取通用唯一标识符
        getUUID(len = 8) {
            let id
            do {
                id = Math.random()
                    .toString(16)
                    .slice(len * -1)
                    .toUpperCase()
            } while (this.UUID.includes(id))
            this.UUID.push(id)
            return id
        },
        // 获取打印机配置
        getPrinterConfig(name) {
            const request = this.getDefaultRequest('getPrinterConfig')
            request.printer = this.printerConfig.name = name // 设置默认打印机
            this.socket.send(JSON.stringify(request))
        },
        // 设置打印机配置(每次打印前设置)
        setPrinterConfig(resolve, obj) {
            if (resolve) {
                this.resolve_setPrinterConfig = resolve
            }
            const request = this.getDefaultRequest(
                'setPrinterConfig',
                this.getUUID()
            )
            request.printer = Object.assign(this.printerConfig, obj)
            request.printer.paperSize.width >>= 0
            request.printer.paperSize.height >>= 0
            this.socket.send(JSON.stringify(request))
        },
        // 请求打印
        sendPrint(resolve, orderId, contents, preview = true, type = 'pdf') {
            if (resolve) {
                this.resolveList.print = resolve
            }
            const request = this.getDefaultRequest('print', this.getUUID())
            request.task = {
                previewType: type,
                preview,
                taskID: `${orderId}_${this.getUUID()}`,
                printer: this.printerConfig.name,
                notifyType: ['print'], // 仅出纸响应
                notifyMode: 'allInOne',
                documents: [
                    {
                        documentID: `${orderId}_${this.getUUID()}`,
                        contents
                    }
                ]
            }
            this.socket.send(JSON.stringify(request))
        }
    }
}