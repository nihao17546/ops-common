package com.ximalaya.ops.common.web.model.param;

import com.ximalaya.ops.common.web.model.db.meta.MetaComment;

/**
 * Created by nihao on 18/1/16.
 */
public class ConfigTableParam {
    private Long id;
    private String name;
    private Long connectId;
    private String tableName;
    private String tableSchema;
    private MetaComment comment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getConnectId() {
        return connectId;
    }

    public void setConnectId(Long connectId) {
        this.connectId = connectId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTableSchema() {
        return tableSchema;
    }

    public void setTableSchema(String tableSchema) {
        this.tableSchema = tableSchema;
    }

    public MetaComment getComment() {
        return comment;
    }

    public void setComment(MetaComment comment) {
        this.comment = comment;
    }
}
