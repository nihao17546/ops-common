package com.ximalaya.ops.common.web.model.db;

import com.ximalaya.ops.common.web.model.enums.FormatterTypeEnum;

import java.util.Map;

/**
 * 列表formatter
 * type --> 类型,FormatterTypeEnum
 * map --> key-value,当type为'text'时需指定。表示在列表页当值为key时显示value
 *
 * Created by nihao on 16/12/20.
 */
public class Formatter {
    private FormatterTypeEnum type=FormatterTypeEnum.text;
    private Map map;
    private DataSource dataSource;

    public FormatterTypeEnum getType() {
        return type;
    }

    public void setType(FormatterTypeEnum type) {
        this.type = type;
    }

    public Map getMap() {
        return map;
    }

    public void setMap(Map map) {
        this.map = map;
    }

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}
