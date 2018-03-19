package com.ximalaya.ops.common.web.model.db;

import com.ximalaya.ops.common.web.model.enums.InputTypeEnum;
import com.ximalaya.ops.common.web.model.enums.JudgeTypeEnum;

import java.util.Map;

/**
 * 查询
 * judgeType --> 判断方式,JudgeTypeEnum
 * inputType --> input标签类型,InputTypeEnum
 * selectContent --> 下拉菜单内容,如果inputType为'select'时需指定
 *
 * lableName --> 字段名称(不需要指定)
 * columnName --> 数据库column_name(不需要指定)
 * dataType --> 数据库data_type(不需要指定)
 *
 * Created by nihao on 16/12/20.
 */
public class NeedSearch {

    private JudgeTypeEnum judgeType=JudgeTypeEnum.eq;
    private InputTypeEnum inputType=InputTypeEnum.text;
    private Map selectContent;//下拉菜单内容
    private DataSource dataSource;

    private String lableName;
    private String columnName;
    private String dataType;

    public JudgeTypeEnum getJudgeType() {
        return judgeType;
    }

    public void setJudgeType(JudgeTypeEnum judgeType) {
        this.judgeType = judgeType;
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

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}
