<template>
  <div>
    <table
      style="border-collapse: collapse; width: 100%; height: 106px;"
      border="1"
      data-mce-id="__mce"
    >
      <thead>
        <tr style="height: 37px;">
          <td style="width: 6.41401%; text-align: center; vertical-align: middle; height: 21px;">
            <span style="font-size: 10pt;">序号</span>
          </td>
          <td style="width: 15.0146%; text-align: center; vertical-align: middle; height: 21px;">
            <span style="font-size: 10pt;">产品名称</span>
          </td>
          <td style="width: 18.8777%; text-align: center; vertical-align: middle; height: 21px;">
            <span style="font-size: 10pt;">产品型号</span>
          </td>
          <td style="width: 8.19968%; text-align: center; vertical-align: middle; height: 21px;">
            <span style="font-size: 10pt;">单位</span>
          </td>
          <td style="width: 7.23402%; text-align: center; vertical-align: middle; height: 21px;">
            <span style="font-size: 10pt;">数量</span>
          </td>
          <td style="width: 22.0572%; text-align: center; vertical-align: middle; height: 21px;">
            <span style="font-size: 10pt;">备注</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr style="height: 28px;" v-for="(row, index) in items" :key="index">
          <td
            style="width: 6.41401%; text-align: center; vertical-align: middle; height: 28px;"
          >{{index}}</td>
          <td
            style="width: 15.0146%; text-align: center; vertical-align: middle; height: 28px;"
          >{{name}}</td>
          <td
            style="width: 18.8777%; text-align: center; vertical-align: middle; height: 28px;"
          >{{xinghao}}</td>
          <td
            style="width: 8.19968%; text-align: center; vertical-align: middle; height: 28px;"
          >{{danwei}}</td>
          <td
            style="width: 7.23402%; text-align: center; vertical-align: middle; height: 28px;"
          >{{num}}</td>
          <td
            style="width: 22.0572%; text-align: center; vertical-align: middle; height: 28px;"
          >{{time}}</td>
        </tr>
        <tr style="height: 35px;">
          <td style="width: 40.3063%; vertical-align: middle; height: 35px;" colspan="3">
            <span style="font-size: 10pt;">&nbsp;付款方式{{motif}}</span>
          </td>
          <td style="width: 37.4909%; vertical-align: middle; height: 35px;" colspan="3">
            <span style="font-size: 10pt;">&nbsp;交货方式{{totalMoney}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { dataList } from '../utils/data'
export default {
  data() {
    return {
      dataList,
      html: '',
    }
  },
  mounted() {},
}
</script>