package com.ximalaya.ops.common.web.model.db.meta;

/**
 * 公共表备注
 * export --> 是否提供导出excel功能
 * delete --> 是否提供删除功能
 * save --> 是否提供新增功能
 * edit --> 是否提供编辑功能
 * defaultOrderColumn --> 默认排序字段
 * defaultSort --> 默认倒序排
 * follow --> 从表
 * isOrder --> 主表是否拖动排序
 *
 * Created by nihao on 18/1/16.
 */
public class MetaComment {
    private Boolean export=false;
    private Boolean delete=true;
    private Boolean save=true;
    private Boolean edit=true;
    private String defaultOrderColumn;
    private String defaultSort="desc";
    private Follow follow;
    private Boolean isOrder;

    private String tableSchema;
    private String tableName;
    private String title;

    public Boolean getExport() {
        return export;
    }

    public void setExport(Boolean export) {
        this.export = export;
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

    public String getDefaultOrderColumn() {
        return defaultOrderColumn;
    }

    public void setDefaultOrderColumn(String defaultOrderColumn) {
        this.defaultOrderColumn = defaultOrderColumn;
    }

    public String getDefaultSort() {
        return defaultSort;
    }

    public void setDefaultSort(String defaultSort) {
        this.defaultSort = defaultSort;
    }

    public Follow getFollow() {
        return follow;
    }

    public void setFollow(Follow follow) {
        this.follow = follow;
    }

    public Boolean getOrder() {
        return isOrder;
    }

    public void setOrder(Boolean order) {
        isOrder = order;
    }

    public String getTableSchema() {
        return tableSchema;
    }

    public void setTableSchema(String tableSchema) {
        this.tableSchema = tableSchema;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
