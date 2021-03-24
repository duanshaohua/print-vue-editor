export default {
    data() {
        return {

        }
    },
    methods: {
        handlePreview(type) {
            this.dialogVisible = !1
            let preview = ['pdf', 'image'].includes(type),
                frame
            if (preview) {
                frame = window.open('about:blank', '_blank')
            }
            const xml = this.saveXML()
            fetch('http://103.27.4.146:3001/api/saveXML', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `xml=${xml}`
            })
                .then(res => res.text())
                .then(res => {
                    const json = JSON.parse(res)
                    new Promise(resolve => {
                        this.setPrinterConfig(resolve, this.printerConfig)
                    }).then(() => {
                        new Promise(resolve => {
                            this.sendPrint(
                                resolve,
                                '1',
                                [
                                    {
                                        templateURL: json.data.file,
                                        data: {}
                                    }
                                ],
                                preview,
                                type
                            )
                        }).then(url => {
                            if (preview) {
                                frame.location = url
                            }
                        })
                    })
                })
        },
        saveXML() {
            const str = `<?xml version="1.0" encoding="UTF-8"?><page xmlns="http://cloudprint.cainiao.com/print"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://cloudprint.cainiao.com/print http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpml_schema.xsd"
        xmlns:editor="http://cloudprint.cainiao.com/schema/editor"></page>`
            const xml = new DOMParser().parseFromString(str, 'text/xml')
            const page = xml.getElementsByTagName('page')[0] // nodeValue
            for (const [key, val] of Object.entries(this.config.page)) {
                if (key !== 'rules' && val !== '') {
                    page.setAttribute(key, val) // 设置属性
                }
            }
            console.log('this.layout', JSON.stringify(this.layout));
            this.layout.forEach(obj => {
                let type = obj.type.replace(/[vh]-/, '')
                const c = obj.config
                let layout = document.createElement('layout')
                if (type === 'line') {
                    layout = document.createElement(type) // 覆盖
                        ;['startX', 'startY', 'endX', 'endY'].forEach(k => {
                            layout.setAttribute(k, c[k]) // 设置属性
                        })
                    let str = ''
                        ;['lineColor', 'lineWidth', 'lineType'].forEach(k => {
                            str += `${k}:${c[k]}${k === 'lineWidth' ? 'pt' : ''};`
                        })
                    layout.setAttribute('style', str)
                } else {
                    ;[
                        'id',
                        'height',
                        'width',
                        'left',
                        'top',
                        'ref',
                        'orientation'
                    ].forEach(k => {
                        if (c.hasOwnProperty(k)) {
                            const v = c[k]
                            v !== '' && layout.setAttribute(k, v) // 设置属性
                        }
                    })
                    type = type === 'qrcode' ? 'barcode' : type // 没有二维码类型
                    const child = document.createElement(type) // 子元素
                        // 设置子元素属性
                        ;['src', 'value', 'type', 'ratioMode', 'alias'].forEach(k => {
                            if (c.hasOwnProperty(k)) {
                                if (k === 'value') {
                                    child.textContent = `<![CDATA[${c.value}]]>`
                                } else if (k === 'alias') {
                                    c.alias && child.setAttribute('editor:_printName_', c.alias) // 别名
                                } else {
                                    child.setAttribute(k, c[k])
                                }
                            }
                        })
                    // 设置子元素样式
                    let str = ''
                    for (const [key, val] of Object.entries(c)) {
                        if (!this.styleKeys.includes(key)) {
                            if (key === 'fontStyle') {
                                ;['fontItalic', 'fontUnderline'].forEach(k => {
                                    val.includes(k) && (str += `${k}:true;`)
                                })
                            } else if (key === 'hideText' && !val) {
                                str += `${key}:false;`
                            } else if (val) {
                                if (!(key === 'alpha' && val === 1)) {
                                    str += `${key}:${val};`
                                }
                            }
                        }
                    }
                    str && child.setAttribute('style', str)
                    layout.setAttribute('style', `overflow:visible;zIndex:${c.zIndex}`)
                    layout.appendChild(child)
                }
                page.appendChild(layout)
            })
            let string = new XMLSerializer().serializeToString(xml)
            string = string.replace(
                /(start|end)([xy])=/g,
                (a, b, c) => `${b + c.toUpperCase()}=`
            )
            string = string
                .replace(/&lt;/gm, '<')
                .replace(/&gt;/gm, '>')
                .replace(/ xmlns="http:\/\/www.w3.org\/1999\/xhtml"/gm, '')
            string = string.replace(/editor:_printname_/gm, 'editor:_printName_')
            console.log(string)
            // this.$message('请查看控制台');
            return string
        },
        handleXML() {
            this.$prompt('请输入XML模板(可选)', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(({ value }) => {
                    if (!value) {
                        value =
                            '<?xml version="1.0" encoding="UTF-8"?><page xmlns="http://cloudprint.cainiao.com/print" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:editor="http://cloudprint.cainiao.com/schema/editor" xsi:schemaLocation="http://cloudprint.cainiao.com/print http://cloudprint-docs-resource.oss-cn-shanghai.aliyuncs.com/lpml_schema.xsd" size="210X297" width="210" height="297" splitable="false" horizontalOffset="0" verticalOffset="0"><layout height="40.73" width="53.44" left="147.09" top="76.46" style="overflow:visible;zIndex:81111111111111111111111111111111111;"><rect style="fillColor:#F4EEEE;borderWidth:2;borderColor:#FB0909;borderStyle:solid;overflow:visible;"></rect></layout><layout height="41.86" width="68.88" left="66.93" top="23.54" orientation="horizontal" style="overflow:visible;zIndex:15"><text style="orientation:horizontal;fontFamily:宋体;fontSize:12;fontColor:#EE0A0A;fontWeight:normal;align:left;valign:left;overflow:visible;"><![CDATA[支持文本、图片、直线、矩形、二维码、条形码，暂不支持表格可视化编辑。支持右键菜单快捷操作和快捷键操作。]]></text></layout><layout height="19.95" width="39.89" left="13.23" top="78.57" style="overflow:visible;zIndex:4"><barcode type="code128" style="hideText:false;overflow:visible;"><![CDATA[123456789]]></barcode></layout><layout height="23.65" width="44.81" left="147.89" top="23.53" style="overflow:visible;zIndex:5"><barcode type="qrcode" style="hideText:false;overflow:visible;"><![CDATA[http://www.scscms.com/]]></barcode></layout><layout height="21.16" width="69.05" left="69.84" top="78.3" style="overflow:visible;zIndex:7"><image src="http://www.scscms.com/scs_img/logo.png" style="overflow:visible;"></image></layout><layout height="37.41" width="37.41" left="14.01" top="23.55" style="overflow:visible;zIndex:8"><barcode type="qrcode" ratiomode="keepRatio"><![CDATA[http://www.scscms.com/]]></barcode></layout><line startX="9" startY="9" endX="199.85" endY="9" style="lineColor:#000000;lineWidth:2pt;lineType:solid;"></line><line startX="98.62" startY="110.79" endX="98.62" endY="140.79" style="lineColor:#000000;lineWidth:2pt;lineType:solid;"></line></page>'
                    } else if (!/^<\?xml[\s\S]+<\/page>$/im.test(value)) {
                        return this.$message({
                            type: 'error',
                            message: 'XML模板不正确'
                        })
                    }
                    this.convertXML(value)
                })
                .catch(() => { })
        },
        convertXML(xml) {
            const setAttr = (obj, attr) => {
                for (let i = attr.length; i--;) {
                    const t = attr[i]
                    if (t.name === 'style') {
                        t.value.replace(/(\w+):(#?[\w.]+)/g, (a, b, c) => {
                            if (b === 'hideText') {
                                c = c === 'true'
                            }
                            return (obj[b] = c)
                        })
                    } else {
                        const k = t.name.includes('editor:_print') ? 'alias' : t.name
                        if (obj.hasOwnProperty(k)) {
                            obj[k] = t.value
                        }
                    }
                }
            }
            // 处理字符串
            const xmlString = xml
                .replace(/^[^<]+/m, '') //清空首行非法字符
                .replace(/<!\[CDATA\[(.+?)]]>/gm, function (r, str) {
                    return str.replace(/<%/g, '&lt;%').replace(/%>/g, '%&gt;')
                }) //临时转换变量字符
                //.replace(/<%([\s\S]*?)%>/gm, '<!--<%$1%>-->') //注释脚本
                .replace(/<%[\s\S]*?%>/gm, '') //清空脚本
            const domParser = new DOMParser()
            const xmlDoc = domParser.parseFromString(xmlString, 'text/xml')
            const err = xmlDoc.getElementsByTagName('parsererror') // attributes
            if (err.length) {
                this.$message({
                    type: 'error',
                    message: 'XML模板格式有误!'
                })
                console.error(err[0].textContent)
            } else {
                let page = xmlDoc.getElementsByTagName('page')
                page = page.length
                    ? page[0]
                    : xmlDoc.getElementsByTagName('layout')[0]
                Array.from(page.children).forEach(item => {
                    const tg = item.tagName
                    if (tg === 'layout' || tg === 'line') {
                        const ch = item.firstElementChild
                        let type = ch ? ch.tagName : tg
                        const obj = Object.assign({}, this.CONFIG[type])
                        const a = item.attributes
                        if (tg === 'line') {
                            // 修复特殊情况的type
                            type =
                                a.endX - a.startX > a.endY - a.startY ? 'v-line' : 'h-line'
                        }
                        if (type === 'image') {
                            obj.src = ch.src
                        }
                        // 修改配置
                        setAttr(obj, a)
                        ch && setAttr(obj, ch.attributes)
                        if (type === 'text' || type === 'barcode') {
                            obj.value = ch.textContent
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                        }
                        this.layout.push({
                            type,
                            zoom: this.pageZoom,
                            active: !1,
                            editable: !0,
                            config: obj
                        })
                    }
                })
            }
        },
    },
}