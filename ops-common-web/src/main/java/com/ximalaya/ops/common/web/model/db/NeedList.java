package com.ximalaya.ops.common.web.model.db;

/**
 * 列表
 * width --> 列宽
 * align --> 左右居中
 * valign --> 上下居中
 * sortable --> 是否支持排序
 * formatter --> 列表formatter
 * xmlWidth --> 导出的excel列宽
 *
 * field --> 数据库column_name(不需指定)
 * title --> 列表th名称(不需指定)
 *
 * Created by nihao on 16/12/20.
 */
public class NeedList {
    private Integer width;//宽度
    private String align="center";
    private String valign="middle";
    private Boolean sortable=false;
    private Formatter formatter;
    private Integer xmlWidth;

    private String field;
    private String title;

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public String getAlign() {
        return align;
    }

    public void setAlign(String align) {
        this.align = align;
    }

    public String getValign() {
        return valign;
    }

    public void setValign(String valign) {
        this.valign = valign;
    }

    public Boolean getSortable() {
        return sortable;
    }

    public void setSortable(Boolean sortable) {
        this.sortable = sortable;
    }

    public Formatter getFormatter() {
        return formatter;
    }

    public void setFormatter(Formatter formatter) {
        this.formatter = formatter;
    }

    public Integer getXmlWidth() {
        return xmlWidth;
    }

    public void setXmlWidth(Integer xmlWidth) {
        this.xmlWidth = xmlWidth;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
