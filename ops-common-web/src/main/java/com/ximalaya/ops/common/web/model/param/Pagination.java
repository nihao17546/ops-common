package com.ximalaya.ops.common.web.model.param;

/**
 * 分页参数
 * pageIndex --> 页码
 * pageSize -->  每页显示条目数
 * order --> order by字段
 * sort --> desc,asc
 *
 * limit --> sql语句limit第一个参数(根据pageIndex和pageSize自动生成)
 *
 * Created by nihao on 16/12/16.
 */
public class Pagination {
    private Integer pageIndex;
    private Integer pageSize;
    private String order;
    private String sort;

    private Integer limit;

    public Integer getLimit() {
        return limit;
    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        if(pageIndex<=0){
            pageIndex=1;
        }
        this.pageIndex = pageIndex;
        if(pageIndex!=null&&pageSize!=null){
            limit=(pageIndex-1)*pageSize;
        }
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        if(pageSize<=0){
            pageSize=10;
        }
        this.pageSize = pageSize;
        if(pageIndex!=null&&pageSize!=null){
            limit=(pageIndex-1)*pageSize;
        }
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }
}
