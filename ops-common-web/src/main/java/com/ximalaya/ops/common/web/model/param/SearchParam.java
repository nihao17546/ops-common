package com.ximalaya.ops.common.web.model.param;

import com.ximalaya.ops.common.web.model.enums.JudgeTypeEnum;

/**
 * form表单查询参数
 * columnName --> 数据库column_name
 * judgeType --> 判断方式,JudgeTypeEnum
 * inputValue --> 值
 * dataType --> 数据库data_type
 *
 * Created by nihao on 16/12/21.
 */
public class SearchParam {
    private String columnName;
    private JudgeTypeEnum judgeType;
    private Object inputValue;
    private String dataType;

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public JudgeTypeEnum getJudgeType() {
        return judgeType;
    }

    public void setJudgeType(JudgeTypeEnum judgeType) {
        this.judgeType = judgeType;
    }

    public Object getInputValue() {
        return inputValue;
    }

    public void setInputValue(Object inputValue) {
        this.inputValue = inputValue;
    }

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }
}
