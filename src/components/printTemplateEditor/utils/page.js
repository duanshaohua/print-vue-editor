// 纸张尺寸
export const pageSize = {
    '自定义': '',
    '241三等分': '241X93',
    A4: '210X297',
    A5: '148X210',
    A6: '105X148',
    A3: '297X420',
    B5: '176X250',
    B4: '250X353',
    B3: '353X500',
    C6: '114X162',
    C5: '162X229',
    C4: '229X324',
}
// 打印尺寸素材转换比率
export const rate = localStorage.pixelrate ? Number(localStorage.pixelrate) : 3.78 // mm px比率
// 页面配置验证规则
export const pageConfigRules = {
    width: {
        type: 'number',
        required: true,
        message: '请设置模板宽度',
        trigger: 'change',
    },
    height: {
        type: 'number',
        required: true,
        message: '请设置模板高度',
        trigger: 'change',
    },
    name: [
        { required: true, message: '请输入模板名称', trigger: ['change', 'blur'] },
    ],
}
// 页面配置
export const pageConfig = {
    size: '210X297',
    width: 210,
    height: 297,
    rate, // mm px比率
    orient: 1,//打印方向及纸张类型
    name: '',
    splitable: true,//是否分页
    describe: '',
    horizontalOffset: 0,
    verticalOffset: 0,
    backgroundImage: '',
    id: ''
}
// 打印配置
export const printerConfig = {
    printer: -1, // 打印机
    horizontalOffset: 0,
    verticalOffset: 0,
    size: '210X297',
    width: 210,
    height: 297,
    rate, // mm px比率
    orient: 1,//打印方向及纸张类型
    backgroundImage: '',
    splitable: true,//是否分页
}
// 打印配置验证规则
export const printerConfigRules = {
    width: {
        type: 'number',
        required: true,
        message: '请设置打印宽度',
        trigger: 'change',
    },
    height: {
        type: 'number',
        required: true,
        message: '请设置打印高度',
        trigger: 'change',
    },
    printer: [
        { required: true, message: '请输入选择打印机', trigger: ['change'] },
    ],
}