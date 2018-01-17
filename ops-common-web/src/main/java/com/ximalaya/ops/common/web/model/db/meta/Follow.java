package com.ximalaya.ops.common.web.model.db.meta;

/**
 * 从表
 * tableName --> 从表表名
 * foreignKey --> 外键字段
 * followSize --> 对应关系
 * order --> order字段
 *
 * Created by nihao on 18/1/16.
 */
public class Follow {
    private String tableName;
    private String foreignKey;
    private Integer followSize=-1;
    private String order;
    private Boolean delete=true;
    private Boolean save=true;
    private Boolean edit=true;
    private Boolean export=false;

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getForeignKey() {
        return foreignKey;
    }

    public void setForeignKey(String foreignKey) {
        this.foreignKey = foreignKey;
    }

    public Integer getFollowSize() {
        return followSize;
    }

    public void setFollowSize(Integer followSize) {
        this.followSize = followSize;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public Boolean getDelete() {
        return delete;
    }

    public void setDelete(Boolean delete) {
        this.delete = delete;
    }

    public Boolean getSave() {
        return save;
    }

    public void setSave(Boolean save) {
        this.save = save;
    }

    public Boolean getEdit() {
        return edit;
    }

    public void setEdit(Boolean edit) {
        this.edit = edit;
    }

    public Boolean getExport() {
        return export;
    }

    public void setExport(Boolean export) {
        this.export = export;
    }
}
