package com.ximalaya.ops.common.web.model.param;

import java.util.List;

/**
 * 新增,更新,删除请求参数
 *
 * Created by nihao on 16/12/23.
 */
public class MainParam {
    private String primaryKey;
    private Object primaryKeyValue;
    private String tableSchema;
    private String mainTableName;
    private List<SaveInputMap> main;

    private String followTableName;
    private String followTablePKey;
    private Object followTablePKeyValue;
    private String followTableFKey;
    private List<SaveInputMap> follow;
    private String order;

    private Integer followSize;

    private Long metaId;

    public String getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(String primaryKey) {
        this.primaryKey = primaryKey;
    }

    public String getTableSchema() {
        return tableSchema;
    }

    public void setTableSchema(String tableSchema) {
        this.tableSchema = tableSchema;
    }

    public String getMainTableName() {
        return mainTableName;
    }

    public void setMainTableName(String mainTableName) {
        this.mainTableName = mainTableName;
    }

    public String getFollowTableName() {
        return followTableName;
    }

    public void setFollowTableName(String followTableName) {
        this.followTableName = followTableName;
    }

    public String getFollowTableFKey() {
        return followTableFKey;
    }

    public void setFollowTableFKey(String followTableFKey) {
        this.followTableFKey = followTableFKey;
    }

    public List<SaveInputMap> getMain() {
        return main;
    }

    public void setMain(List<SaveInputMap> main) {
        this.main = main;
    }

    public List<SaveInputMap> getFollow() {
        return follow;
    }

    public void setFollow(List<SaveInputMap> follow) {
        this.follow = follow;
    }

    public Object getPrimaryKeyValue() {
        return primaryKeyValue;
    }

    public void setPrimaryKeyValue(Object primaryKeyValue) {
        this.primaryKeyValue = primaryKeyValue;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getFollowTablePKey() {
        return followTablePKey;
    }

    public void setFollowTablePKey(String followTablePKey) {
        this.followTablePKey = followTablePKey;
    }

    public Object getFollowTablePKeyValue() {
        return followTablePKeyValue;
    }

    public void setFollowTablePKeyValue(Object followTablePKeyValue) {
        this.followTablePKeyValue = followTablePKeyValue;
    }

    public Integer getFollowSize() {
        return followSize;
    }

    public void setFollowSize(Integer followSize) {
        this.followSize = followSize;
    }

    public Long getMetaId() {
        return metaId;
    }

    public void setMetaId(Long metaId) {
        this.metaId = metaId;
    }

}
