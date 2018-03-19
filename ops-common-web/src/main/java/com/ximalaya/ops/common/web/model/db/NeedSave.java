package com.ximalaya.ops.common.web.model.db;

import com.ximalaya.ops.common.web.model.enums.ColumnTypeEnum;
import com.ximalaya.ops.common.web.model.enums.InputTypeEnum;

import java.util.Map;

/**
 * 新增
 * columnType --> column类型,ColumnTypeEnum
 * inputType --> input标签类型,InputTypeEnum
 * selectContent --> 下拉菜单内容,如果inputType为'select'时需指定
 * edit --> 是否允许编辑
 * picUploadConf --> 图片上传配置要求
 * audioUploadConf --> 音频上传配置要求
 * tips --> 前端提示文案
 * regular --> 前端校验正则表达式
 * dataSource --> 数据来源
 *
 * lableName --> 字段名称(不需要指定)
 * columnName --> 数据库column_name(不需要指定)
 * required --> 是否是必填字段(不需要指定)
 * dataType --> 数据库data_type(不需要指定)
 *
 * Created by nihao on 16/12/20.
 */
public class NeedSave {

    private ColumnTypeEnum columnType=ColumnTypeEnum.com;
    private InputTypeEnum inputType=InputTypeEnum.text;
    private Map selectContent;//下拉菜单内容
    private Boolean edit=true;//是否允许编辑
    private PicUploadConf picUploadConf;
    private String tips;
    private String regular;
    private DataSource dataSource;

    private String lableName;
    private String columnName;
    private Boolean required;
    private String dataType;

    public ColumnTypeEnum getColumnType() {
        return columnType;
    }

    public void setColumnType(ColumnTypeEnum columnType) {
        this.columnType = columnType;
    }

    public InputTypeEnum getInputType() {
        return inputType;
    }

    public void setInputType(InputTypeEnum inputType) {
        this.inputType = inputType;
    }

    public Map getSelectContent() {
        return selectContent;
    }

    public void setSelectContent(Map selectContent) {
        this.selectContent = selectContent;
    }

    public Boolean getEdit() {
        return edit;
    }

    public void setEdit(Boolean edit) {
        this.edit = edit;
    }

    public PicUploadConf getPicUploadConf() {
        return picUploadConf;
    }

    public void setPicUploadConf(PicUploadConf picUploadConf) {
        this.picUploadConf = picUploadConf;
    }

    public String getLableName() {
        return lableName;
    }

    public void setLableName(String lableName) {
        this.lableName = lableName;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public String getTips() {
        return tips;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }

    public String getRegular() {
        return regular;
    }

    public void setRegular(String regular) {
        this.regular=regular;
    }

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}
