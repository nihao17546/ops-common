package com.ximalaya.ops.common.web.model.db;

/**
 * 扩展表备注
 * lableName --> 字段名称
 * list --> 列表详情
 * search --> 搜索表单详情
 * save --> 新增或编辑详情
 *
 * Created by nihao on 16/12/20.
 */
public class TableColumnComment {
    private String lableName;//字段名称
    private NeedList list;
    private NeedSearch search;
    private NeedSave save;

    public String getLableName() {
        return lableName;
    }

    public void setLableName(String lableName) {
        this.lableName = lableName;
    }

    public NeedList getList() {
        return list;
    }

    public void setList(NeedList list) {
        this.list = list;
    }

    public NeedSearch getSearch() {
        return search;
    }

    public void setSearch(NeedSearch search) {
        this.search = search;
    }

    public NeedSave getSave() {
        return save;
    }

    public void setSave(NeedSave save) {
        this.save = save;
    }
}
