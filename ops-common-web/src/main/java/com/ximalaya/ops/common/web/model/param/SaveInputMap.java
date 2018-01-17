package com.ximalaya.ops.common.web.model.param;

import com.ximalaya.ops.common.web.model.enums.ColumnTypeEnum;

/**
 * 新增,更新input标签参数
 * columnType --> column类型,ColumnTypeEnum
 * columnName --> 数据库column_name
 * inputValue --> 值
 *
 * Created by nihao on 16/12/23.
 */
public class SaveInputMap {
    private ColumnTypeEnum columnType;
    private String columnName;
    private Object inputValue;

    public ColumnTypeEnum getColumnType() {
        return columnType;
    }

    public void setColumnType(ColumnTypeEnum columnType) {
        this.columnType = columnType;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public Object getInputValue() {
        return inputValue;
    }

    public void setInputValue(Object inputValue) {
        this.inputValue = inputValue;
    }

}
