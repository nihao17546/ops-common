package com.ximalaya.ops.common.web.model.po;

/**
 * Created by nihao on 17/1/25.
 */
public class TableInfoPO {
    private String table_schema;
    private String table_name;
    private String table_comment;

    public String getTable_schema() {
        return table_schema;
    }

    public void setTable_schema(String table_schema) {
        this.table_schema = table_schema;
    }

    public String getTable_name() {
        return table_name;
    }

    public void setTable_name(String table_name) {
        this.table_name = table_name;
    }

    public String getTable_comment() {
        return table_comment;
    }

    public void setTable_comment(String table_comment) {
        this.table_comment = table_comment;
    }
}
