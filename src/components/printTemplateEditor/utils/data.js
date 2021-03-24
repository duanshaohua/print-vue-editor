import { buildTable, buildTableThead, buildTableTbody } from "./html";
export const layoutData = [{ "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 1, "id": "sdfsdf", "left": 71.59, "top": 85.71, "width": 30, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "名称", "alias": "name", "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } }, "disabled": { "value": true, "alias": true } } }, { "type": "h-line", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 2, "id": 1597649397271, "startX": "35.04", "startY": "69.97", "endX": "87.61", "endY": "69.97", "lineColor": "#000000", "lineWidth": 1, "lineType": "solid", "rules": {} } }, { "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 4, "id": 1597734813320, "left": 125.22, "top": 40.56, "width": 19.77, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "下单时间", "alias": "", "disabled": false, "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } } } }, { "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 5, "id": 1597734816665, "left": 100.18, "top": 64.19, "width": 30, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "订单号", "alias": "code", "disabled": { "value": true, "alias": true }, "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } } } }, { "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 7, "id": 1597734822153, "left": 117.1, "top": 116.76, "width": 30, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "订单总额", "alias": "totalMoney", "disabled": { "value": true, "alias": true }, "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } } } }, { "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 8, "id": 1597734827417, "left": 145.67, "top": 75.83, "width": 30, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "订单商品数量", "alias": "amount", "disabled": { "value": true, "alias": true }, "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } } } }, { "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 9, "id": 1597734830647, "left": 147.44, "top": 40.56, "width": 51.16, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "#EB0F0F", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "下单时间", "alias": "time", "disabled": { "value": true, "alias": true }, "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } } } }, { "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 10, "id": 1597734860699, "left": 47.62, "top": 39.86, "width": 30, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "订单主题", "alias": "motif", "disabled": { "value": true, "alias": true }, "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } } } }, { "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 9, "id": 1597735009020, "left": 16.93, "top": 39.51, "width": 30, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "订单主题", "alias": "", "disabled": false, "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } } } }, { "type": "text", "zoom": 0.75, "editable": true, "active": false, "config": { "zIndex": 10, "id": 1597735041840, "left": 113.93, "top": 75.49, "width": 30, "height": 8, "orientation": "horizontal", "rotation": 0, "alpha": 1, "fontFamily": "宋体", "fontSize": 8, "letterSpacing": 0, "lineHeight": "", "fontColor": "", "fontWeight": "normal", "wrap": false, "fontStyle": [], "align": "left", "valign": "left", "value": "订单商品数量", "alias": "", "disabled": false, "rules": { "lineHeight": { "pattern": {}, "message": "请设置正确的行高", "trigger": "change" }, "value": { "required": true, "message": "请输入文本内容", "trigger": "change" } } } }]

export function getDataMaster(x) {
    if (x.details && x.details.length > 0) {
        return buildTable(buildTableThead(x.details) + buildTableTbody(x.details, x.alias))
    }
    return null
}
// 测试表格数据
export const tableData = [
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
]
//测试模板
export const testTemplate = `
    <p style="text-align: center;"><span style="font-size: 18pt;"><strong> &nbsp;</strong><strong>产&nbsp; 品&nbsp; 明&nbsp; 细&nbsp; 表</strong></span>&nbsp; &nbsp; &nbsp;<span style="font-size: 10pt;">山西*********有限公司</span></p>
    <table style="border-collapse: collapse; width: 100%; height: 73px;" border="1" data-mce-id="__mce">
    <tbody>
    <tr style="height: 31px;">
    <td style="width: 28.9063%; height: 43px;"><span style="font-size: 10pt;">客户名称：{{customerName}}</span></td>
    <td style="width: 30.571%; height: 43px;"><span style="font-size: 10pt;">客户手机号：{{customerPhone}}</span></td>
    <td style="width: 40.3925%; height: 43px;"><span style="font-size: 10pt;">出库编号：{{code}}</span></td>
    </tr>
    <tr style="height: 30px;">
    <td style="width: 28.9063%; height: 30px;"><span style="font-size: 10pt;">业务员：{{staff}}</span></td>
    <td style="width: 30.571%; height: 30px;"><span style="font-size: 10pt;">业务手机号：{{staffPhone}}</span></td>
    <td style="width: 40.3925%; height: 30px;"><span style="font-size: 10pt;">出库时间：{{time}}</span></td>
    </tr>
    </tbody>
    </table>
    <table style="border-collapse: collapse; width: 100%; height: 105px;" border="1" data-mce-id="__mce">
    <thead>
    <tr style="height: 37px;">
    <td style="width: 7.55209%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">序号</span></td>
    <td style="width: 21.7446%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">产品名称</span></td>
    <td style="width: 19.7918%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">产品型号</span></td>
    <td style="width: 9.24479%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">单位</span></td>
    <td style="width: 8.72391%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">数量</span></td>
    <td style="width: 17.9688%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">备注</span></td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, index) in details" style="height: 33px;">
    <td v-html="index+1" style="width: 7.55209%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">{index}</span></td>
    <td style="width: 21.7446%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">{{row.a}}</span></td>
    <td style="width: 19.7918%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">{{row.b}}</span></td>
    <td style="width: 9.24479%; text-align: center; vertical-align: middle;"><span style="font-size: 10pt;">{{row.c}}</span></td>
    <td style="width: 8.72391%; text-align: center; vertical-align: middle;"></td>
    <td style="width: 17.9688%; text-align: center; vertical-align: middle;"></td>
    </tr>
    <tr style="height: 29px;">
    <td colspan="2" style="width: 7.55209%;"><span style="font-size: 10pt;">付款方式：</span><span style="font-size: 10pt;"><br /></span></td>
    <td colspan="2" style="width: 19.7918%;"><span style="font-size: 10pt;">交货方式：</span></td>
    <td colspan="2" style="width: 8.72391%;"><span style="font-size: 10pt;">客户签名</span></td>
    </tr>
    </tbody>
    </table>
    <p style="text-align: center;"><span style="font-size: 10pt;">**** 公司主营：******</span></p>
    <p style="text-align: center;"><span style="font-size: 10pt;">&nbsp;公司联系方式：{{staffPhone}}</span></p>
    `
// 测试模板数据标签
export const templateTags = [
    {
        value: '客户名称',
        alias: 'customerName',
    },
    {
        value: '客户手机号',
        alias: 'customerPhone',
    },
    {
        value: '订单主题',
        alias: 'motif',
    },
    {
        value: '订单号',
        alias: 'code',
    },
    {
        value: '订单总额',
        alias: 'totalMoney',
    },
    {
        value: '订单优惠金额',
        alias: 'discounts',
    },
    {
        value: '订单商品数量',
        alias: 'amount',
    },
    {
        value: '下单时间',
        alias: 'time',
    },
    {
        value: '下单人',
        alias: 'staff',
    },

    {
        value: '下单人手机号',
        alias: 'staffPhone',
    },
    {
        value: '已出库数量',
        alias: 'outAmount',
    },
    {
        value: '明细',
        span: 24,
        alias: 'details',
        details: [
            {
                value: 'A',
                alias: 'a',
            },
            {
                value: 'B',
                alias: 'b',
            },
            {
                value: 'C',
                alias: 'c',
            }
        ]
    }
]
//测试模板数据
export const templateData = {
    motif: '订单主题',
    customerName: '腾讯科技',
    customerPhone: '18945685468',
    code: 'D548946585',
    time: '2020年8月24日 10:58:02',
    staff: '张三',
    staffPhone: '15846458595',
    amount: 58,
    totalMoney: 586.25,
    discounts: 6.25,
    outAmount: 18,
    details: [
        { a: 'a1', b: 'b1', c: 'c1' },
        { a: 'a2', b: 'b2', c: 'c2' },
        { a: 'a3', b: 'b3', c: 'c3' },
        { a: 'a3', b: 'b3', c: 'c3' },
        { a: 'a3', b: 'b3', c: 'c3' },
        { a: 'a3', b: 'b3', c: 'c3' },
        { a: 'a3', b: 'b3', c: 'c3' },
    ],
}