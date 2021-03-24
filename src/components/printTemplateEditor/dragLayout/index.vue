<template>
  <el-container class="editor">
    <el-header class="editor_top">
      <div style="float: right;padding:14px">
        <el-button round @click="empty">清空模板</el-button>
        <el-button round @click="save">保存模板</el-button>
        <el-button round @click="preview">预览</el-button>
      </div>
      <div class="editor_logo">打印模板编辑器</div>

      <el-dropdown @command="handleDropDown" trigger="click">
        <div class="editor_button">
          <i class="fa fa-font"></i>文本
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="h-text">
            <i class="fa fa-align-left"></i>横排
          </el-dropdown-item>
          <el-dropdown-item command="v-text">
            <i class="fa fa-align-left fa-rotate-90"></i>竖排
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="editor_button" @click="handleDropDown('image')">
        <i class="fa fa-image"></i>图片
      </div>
      <el-dropdown @command="handleDropDown" trigger="click">
        <div class="editor_button">
          <i class="fa fa-star"></i>形状
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="h-line">
            <i class="fa fa-arrows-alt-h"></i>横线
          </el-dropdown-item>
          <el-dropdown-item command="v-line">
            <i class="fa fa-arrows-alt-v"></i>竖线
          </el-dropdown-item>
          <el-dropdown-item command="rect">
            <i class="fa fa-square"></i>矩形
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="editor_button" @click="handleDropDown('qrcode')">
        <i class="fa fa-qrcode"></i>二维码
      </div>
      <div class="editor_button" @click="handleDropDown('barcode')">
        <i class="fa fa-barcode"></i>条形码
      </div>
    </el-header>
    <el-main style="padding:0px;height:100%">
      <el-container style="height:100%">
        <el-aside width="314px" class="editor_data">
          <div class="main">
            <el-row :gutter="20">
              <el-col :span="item.span||12" v-for="(item, index) in templateTags" :key="index">
                <el-button
                  class="editor_data_item"
                  @click="handleDropDown('d-text',item)"
                >{{item.value}}</el-button>
              </el-col>
            </el-row>
            <el-button class="editor_data_item" @click="insertTestTemplate">插入测试模板</el-button>
          </div>
        </el-aside>
        <el-main class="editor_content">
          <el-container style="height:100%">
            <el-main class="editor_area_wrap">
              <div
                class="editor_area"
                @click="activateLayout"
                @contextmenu.prevent="handleRightMenu"
              >
                <div class="editor_bg" :style="pageStyle">
                  <div class="page_offset_h" :style="offset_h"></div>
                  <div class="page_offset_v" :style="offset_v"></div>
                  <ul v-if="standerLineList.length>0">
                    <li
                      v-for="(items,index) in standerLineList"
                      :key="index"
                      :style="items"
                      class="stander_line"
                    ></li>
                  </ul>
                  <drag
                    v-for="(obj,index) in layout"
                    :key="obj.type+index"
                    :config="obj"
                    @update="dragUpdate"
                    @activate="activateLayout"
                    :layout="layout"
                    @showStanderLine="showStanderLine"
                  ></drag>
                </div>
                <div class="context_menu" :style="menuStyle" @click="clickContextMenu">
                  <ul>
                    <li v-for="(v,k) in menuList" :key="k" :class="{can:getActiveLayoutObj}">
                      <span>{{k}}</span>
                      {{v}}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="el-slider-box">
                <el-slider
                  :min="0.25"
                  :max="3"
                  :step="0.25"
                  v-model="pageZoom"
                  :format-tooltip="formatTooltip"
                ></el-slider>
              </div>
            </el-main>
            <el-aside width="314px" class="editor_config" @keydown.stop>
              <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="样式" name="style" v-if="showStyleTab">
                  <div class="config_config" v-show="getActiveLayoutType === 'text'">
                    <el-form
                      :inline="true"
                      ref="style_text"
                      label-width="53px"
                      size="mini"
                      :model="config.text"
                      :rules="config.text.rules"
                    >
                      <div class="el-collapse-item__header">位置排列</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="x 轴" prop="left">
                          <el-input-number
                            v-model="config.text.left"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="y 轴" prop="top">
                          <el-input-number
                            v-model="config.text.top"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="宽度" prop="width">
                          <el-input-number
                            v-model="config.text.width"
                            controls-position="right"
                            :min="1"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="高度" prop="height">
                          <el-input-number
                            v-model="config.text.height"
                            controls-position="right"
                            :min="1"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                      <div class="el-collapse-item__header">文本</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="旋转" prop="rotation">
                          <el-input-number
                            v-model="config.text.rotation"
                            controls-position="right"
                            :min="-360"
                            :max="360"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="透明" prop="alpha">
                          <el-input-number
                            v-model="config.text.alpha"
                            controls-position="right"
                            :min="0.1"
                            :max="1"
                            :step="0.1"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="字体" prop="fontFamily" class="full-line">
                          <el-select v-model="config.text.fontFamily">
                            <el-option
                              v-for="item in config.fontFamilyList"
                              :key="item"
                              :label="item"
                              :value="item"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="字号" prop="fontSize">
                          <el-input-number
                            v-model="config.text.fontSize"
                            controls-position="right"
                            :min="8"
                            :max="100"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="颜色" prop="fontColor">
                          <el-color-picker v-model="config.text.fontColor"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="字间距" label-width="65px" prop="letterSpacing">
                          <el-input-number
                            v-model="config.text.letterSpacing"
                            controls-position="right"
                            :min="0"
                            :max="360"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="行高" prop="lineHeight" class="full-line">
                          <el-input v-model="config.text.lineHeight" placeholder="毫米或百分比"></el-input>
                        </el-form-item>
                        <el-form-item label="字体粗细" label-width="80px" prop="fontWeight">
                          <el-select v-model="config.text.fontWeight">
                            <el-option
                              v-for="(item,key) in config.fontWeightList"
                              :key="key"
                              :label="key+item"
                              :value="key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="样式" prop="fontStyle">
                          <el-checkbox-group v-model="config.text.fontStyle">
                            <el-checkbox-button label="fontItalic">
                              <i class="fa fa-italic">斜体</i>
                            </el-checkbox-button>
                            <el-checkbox-button label="fontUnderline">
                              <i class="fa fa-underline">下划线</i>
                            </el-checkbox-button>
                          </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="单行" prop="wrap">
                          <el-switch v-model="config.text.wrap"></el-switch>
                        </el-form-item>
                      </div>
                      <div class="el-collapse-item__header">排列</div>
                      <div class="el-collapse-item__content">
                        <el-radio-group
                          v-model="config.text.orientation"
                          style="margin-bottom:10px"
                        >
                          <el-radio-button label="horizontal">水平文本</el-radio-button>
                          <el-radio-button label="vertical">垂直文本</el-radio-button>
                        </el-radio-group>

                        <el-radio-group v-model="config.text.align">
                          <el-radio-button
                            v-for="item in config.fontAlign"
                            :label="item"
                            :key="item"
                          >
                            <i :class="['fa','fa-align-'+item]">{{item}}</i>
                          </el-radio-button>
                        </el-radio-group>

                        <el-radio-group v-model="config.text.valign" style="margin-top:10px">
                          <el-radio-button
                            v-for="(item,key) in config.valignList"
                            :label="key"
                            :key="item"
                          >
                            <i :class="['fa','fa-rotate-90','fa-align-'+item]">{{key}}</i>
                          </el-radio-button>
                        </el-radio-group>
                      </div>
                    </el-form>
                  </div>
                  <div class="config_config" v-show="getActiveLayoutType === 'line'">
                    <el-form
                      v-model="config.line"
                      :rules="config.line.rules"
                      :inline="true"
                      label-width="53px"
                      size="mini"
                    >
                      <div class="el-collapse-item__header">线条设置</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="起x1">
                          <el-input-number
                            v-model="config.line.startX"
                            controls-position="right"
                            :min="-1000"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="起y1">
                          <el-input-number
                            v-model="config.line.startY"
                            controls-position="right"
                            :min="-1000"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="终x2">
                          <el-input-number
                            v-model="config.line.endX"
                            controls-position="right"
                            :min="-1000"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="终y2">
                          <el-input-number
                            v-model="config.line.endY"
                            controls-position="right"
                            :min="-1000"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                      <div class="el-collapse-item__header">线段样式</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="类型">
                          <el-select v-model="config.line.lineType">
                            <el-option
                              v-for="(item,key) in config.lineType"
                              :key="item"
                              :label="item"
                              :value="key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="大小">
                          <el-input-number
                            v-model="config.line.lineWidth"
                            controls-position="right"
                            :min="1"
                            :max="50"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="颜色">
                          <el-color-picker v-model="config.line.lineColor"></el-color-picker>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                  <div class="config_config" v-show="getActiveLayoutType === 'rect'">
                    <el-form
                      v-model="config.rect"
                      :rules="config.rect.rules"
                      :inline="true"
                      label-width="53px"
                      size="mini"
                    >
                      <div class="el-collapse-item__header">矩形设置</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="x 轴" prop="left">
                          <el-input-number
                            v-model="config.rect.left"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="y 轴" prop="top">
                          <el-input-number
                            v-model="config.rect.top"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="宽度" prop="width">
                          <el-input-number
                            v-model="config.rect.width"
                            controls-position="right"
                            :min="0"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="高度" prop="height">
                          <el-input-number
                            v-model="config.rect.height"
                            controls-position="right"
                            :min="0"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                      <div class="el-collapse-item__header">边框</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="类型">
                          <el-select v-model="config.rect.borderStyle">
                            <el-option
                              v-for="(item,key) in config.lineType"
                              :key="item"
                              :label="item"
                              :value="key"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="大小">
                          <el-input-number
                            v-model="config.rect.borderWidth"
                            controls-position="right"
                            :min="0"
                            :max="50"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="颜色">
                          <el-color-picker v-model="config.rect.borderColor"></el-color-picker>
                        </el-form-item>
                      </div>
                      <div class="el-collapse-item__header">背景</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="背景颜色" label-width="80px">
                          <el-color-picker v-model="config.rect.fillColor"></el-color-picker>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                  <div class="config_config" v-show="getActiveLayoutType === 'barcode'">
                    <el-form
                      :inline="true"
                      ref="style_barcode"
                      label-width="53px"
                      size="mini"
                      :model="config.barcode"
                    >
                      <div class="el-collapse-item__header">位置排列</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="x 轴" prop="left">
                          <el-input-number
                            v-model="config.barcode.left"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="y 轴" prop="top">
                          <el-input-number
                            v-model="config.barcode.top"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="宽度" prop="width">
                          <el-input-number
                            v-model="config.barcode.width"
                            controls-position="right"
                            :min="1"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="高度" prop="height">
                          <el-input-number
                            v-model="config.barcode.height"
                            controls-position="right"
                            :min="1"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                      <div class="el-collapse-item__header">其他</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="透明" prop="alpha">
                          <el-input-number
                            v-model="config.barcode.alpha"
                            controls-position="right"
                            :min="0.1"
                            :max="1"
                            :step="0.1"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                  <div class="config_config" v-show="getActiveLayoutType === 'qrcode'">
                    <el-form
                      :inline="true"
                      ref="style_qrcode"
                      label-width="53px"
                      size="mini"
                      :model="config.qrcode"
                    >
                      <div class="el-collapse-item__header">位置排列</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="x 轴" prop="left">
                          <el-input-number
                            v-model="config.qrcode.left"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="y 轴" prop="top">
                          <el-input-number
                            v-model="config.qrcode.top"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="宽度" prop="width">
                          <el-input-number
                            v-model="config.qrcode.width"
                            controls-position="right"
                            :min="1"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="高度" prop="height">
                          <el-input-number
                            v-model="config.qrcode.height"
                            controls-position="right"
                            :min="1"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                      <div class="el-collapse-item__header">其他</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="透明" prop="alpha">
                          <el-input-number
                            v-model="config.qrcode.alpha"
                            controls-position="right"
                            :min="0.1"
                            :max="1"
                            :step="0.1"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                  <div class="config_config" v-show="getActiveLayoutType === 'image'">
                    <el-form
                      :inline="true"
                      ref="style_qrcode"
                      label-width="53px"
                      size="mini"
                      :model="config.image"
                      :rules="config.image.rules"
                    >
                      <div class="el-collapse-item__header">位置排列</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="x 轴" prop="left">
                          <el-input-number
                            v-model="config.image.left"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="y 轴" prop="top">
                          <el-input-number
                            v-model="config.image.top"
                            controls-position="right"
                            :min="-1000"
                            :max="2000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="宽度" prop="width">
                          <el-input-number
                            v-model="config.image.width"
                            controls-position="right"
                            :min="1"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="高度" prop="height">
                          <el-input-number
                            v-model="config.image.height"
                            controls-position="right"
                            :min="1"
                            :max="1000"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                      <div class="el-collapse-item__header">其他</div>
                      <div class="el-collapse-item__content">
                        <el-form-item label="透明" prop="alpha">
                          <el-input-number
                            v-model="config.image.alpha"
                            controls-position="right"
                            :min="0.1"
                            :max="1"
                            :step="0.1"
                          ></el-input-number>
                        </el-form-item>
                        <el-form-item label="旋转" prop="rotation">
                          <el-input-number
                            v-model="config.image.rotation"
                            controls-position="right"
                            :min="-360"
                            :max="360"
                          ></el-input-number>
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="配置" name="config" v-if="showConfigTab">
                  <div class="config_config" v-show="getActiveLayoutType === 'page'">
                    <div class="el-collapse-item__header">模板设置</div>
                    <div class="el-collapse-item__content">
                      <page-config-form v-model="config.page" inline />
                    </div>
                  </div>
                  <div class="config_config" v-show="getActiveLayoutType === 'text'">
                    <div class="el-collapse-item__header">文本配置</div>
                    <div class="el-collapse-item__content">
                      <el-form
                        :inline="true"
                        ref="config_text"
                        label-width="53px"
                        size="mini"
                        :model="config.text"
                        :rules="config.text.rules"
                      >
                        <el-form-item label="内容" prop="value" class="full-line">
                          <el-input
                            type="textarea"
                            :disabled="config.text.disabled.value"
                            :rows="2"
                            v-model="config.text.value"
                            placeholder="请输入文本内容"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="别名" class="full-line">
                          <el-input
                            v-model="config.text.alias"
                            :disabled="config.text.disabled.alias"
                            placeholder="请输入别名"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                  <div class="config_config" v-show="getActiveLayoutType === 'barcode'">
                    <div class="el-collapse-item__header">条形码配置</div>
                    <div class="el-collapse-item__content">
                      <el-form
                        :inline="true"
                        ref="config_barcode"
                        label-width="53px"
                        size="mini"
                        :model="config.barcode"
                        :rules="config.barcode.rules"
                      >
                        <el-form-item label="内容" prop="value" class="full-line">
                          <el-input
                            type="textarea"
                            :rows="2"
                            v-model="config.barcode.value"
                            placeholder="请输入条形码内容"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="码式" class="full-line">
                          <el-select v-model="config.barcode.type">
                            <el-option
                              v-for="item in config.barcodeType"
                              :key="item"
                              :label="item"
                              :value="item"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="文字" class="full-line">
                          <el-radio-group v-model="config.barcode.hideText">
                            <el-radio :label="false">显示</el-radio>
                            <el-radio :label="true">隐藏</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                  <div class="config_config" v-show="getActiveLayoutType === 'qrcode'">
                    <div class="el-collapse-item__header">二维码配置</div>
                    <div class="el-collapse-item__content">
                      <el-form
                        :inline="true"
                        ref="config_qrcode"
                        label-width="53px"
                        size="mini"
                        :model="config.qrcode"
                        :rules="config.qrcode.rules"
                      >
                        <el-form-item label="内容" prop="value" class="full-line">
                          <el-input
                            type="textarea"
                            :rows="2"
                            v-model="config.qrcode.value"
                            placeholder="请输入文本内容"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="码式" class="full-line">
                          <el-select v-model="config.qrcode.type">
                            <el-option
                              v-for="item in config.qrcodeType"
                              :key="item"
                              :label="item"
                              :value="item"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-aside>
          </el-container>
        </el-main>
      </el-container>
      <preview ref="preview" />
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script>
import pageConfigForm from '../pageConfig'
import drag from './drag'
import editor from './mixin/editor'
import preview from './preview'
import { layoutData, templateTags } from '../utils/data'
export default {
  components: {
    drag,
    preview,
    pageConfigForm,
  },
  mixins: [editor],
  data() {
    return {
      templateTags,
    }
  },
  created() {
    console.log('created', this.layout)
  },
  mounted() {},
  methods: {
    save() {
      this.layout.forEach((x) => {
        x.active = false
      })
      console.log(JSON.stringify(this.layout))
    },
    insertTestTemplate() {
      this.layout = layoutData
    },
    empty() {
      this.layout = []
    },
    preview() {
      this.$refs.preview.open(this.layout, this.config.page)
    },
  },
}
</script>