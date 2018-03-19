package com.ximalaya.ops.common.web.model.param;

import com.ximalaya.ops.common.web.model.db.TableColumnComment;

/**
 * Created by nihao on 17/1/25.
 */
public class ConfigColumnParam {
    private Long metaId;
    private String schema;
    private String tableName;
    private String columnName;

    private TableColumnComment comment;

    public Long getMetaId() {
        return metaId;
    }

    public void setMetaId(Long metaId) {
        this.metaId = metaId;
    }

    public String getSchema() {
        return schema;
    }

    public void setSchema(String schema) {
        this.schema = schema;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public TableColumnComment getComment() {
        return comment;
    }

    public void setComment(TableColumnComment comment) {
        this.comment = comment;
    }
}
