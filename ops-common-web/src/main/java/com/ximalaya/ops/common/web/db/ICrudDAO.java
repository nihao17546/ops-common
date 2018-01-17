package com.ximalaya.ops.common.web.db;

import com.ximalaya.ops.common.web.model.db.NeedList;
import com.ximalaya.ops.common.web.model.param.MainParam;
import com.ximalaya.ops.common.web.model.param.Pagination;
import com.ximalaya.ops.common.web.model.param.SaveInputMap;
import com.ximalaya.ops.common.web.model.param.SearchParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by nihao on 18/1/16.
 */
public interface ICrudDAO {
    List<Map<String,Object>> getSingleTableData(@Param("tableName") String tableName,
                                                @Param("tableSchema")String tableSchema,
                                                @Param("searchParams") List<SearchParam> searchParams,
                                                @Param("tableHeads") List<NeedList> tableHeads,
                                                @Param("pagination") Pagination pagination);
    Long getSingleTableCount(@Param("tableName") String tableName,
                             @Param("tableSchema")String tableSchema,
                             @Param("searchParams") List<SearchParam> searchParams);
    Long getDoubleTableCount(@Param("mainTableName") String mainTableName,
                             @Param("mainPrimaryKey") String mainPrimaryKey,
                             @Param("followTableName") String followTableName,
                             @Param("followTableFKey") String followTableFKey,
                             @Param("tableSchema")String tableSchema,
                             @Param("searchParams") List<SearchParam> searchParams);
    List<Map<String,Object>> getDoubleTableData(@Param("mainTableName") String mainTableName,
                                                @Param("mainPrimaryKey") String mainPrimaryKey,
                                                @Param("followTableName") String followTableName,
                                                @Param("followTableFKey") String followTableFKey,
                                                @Param("tableSchema")String tableSchema,
                                                @Param("searchParams") List<SearchParam> searchParams,
                                                @Param("tableHeads") List<NeedList> tableHeads,
                                                @Param("pagination") Pagination pagination);

    List<Map<String,Object>> getFollowTableData(@Param("tableSchema")String tableSchema,
                                                @Param("tableName")String tableName,
                                                @Param("foreignKeyValue")Object foreignKeyValue,
                                                @Param("followFKey")String followFKey,
                                                @Param("tableHeads")List<NeedList> tableHeads,
                                                @Param("order")String order);
    void updatePosition(@Param("tableSchema")String tableSchema,
                        @Param("tableName")String tableName,
                        @Param("order")String order,
                        @Param("primaryKey")String primaryKey,
                        @Param("params")List<Map<String,Object>> params);

    void insertMain(MainParam mainParam);

    void insertFollow(MainParam mainParam);

    Object getMaxPosition(@Param("tableSchema")String tableSchema,
                          @Param("tableName")String tableName,
                          @Param("order")String order,
                          @Param("foreignKey")String foreignKey,
                          @Param("foreignKeyValue")Object foreignKeyValue);

    Object getMainMaxPosition(@Param("tableSchema")String tableSchema,
                              @Param("tableName")String tableName,
                              @Param("order")String order);

    List<Map<String,Object>> selectSingleInfo(@Param("tableSchema")String tableSchema,
                                              @Param("tableName")String tableName,
                                              @Param("primaryKey")String primaryKey,
                                              @Param("primaryKeyValue")Object primaryKeyValue,
                                              @Param("columns")List<String> columns);

    List<Map<String,Object>> selectDoubleInfo(@Param("tableSchema")String tableSchema,
                                              @Param("mainTableName")String mainTableName,
                                              @Param("followTableName")String followTableName,
                                              @Param("primaryKey")String primaryKey,
                                              @Param("primaryKeyValue")Object primaryKeyValue,
                                              @Param("followTableFKey")String followTableFKey,
                                              @Param("columns")List<String> columns);
    void update(@Param("tableSchema")String tableSchema,
                @Param("tableName")String tableName,
                @Param("primaryKey")String primaryKey,
                @Param("primaryKeyValue")Object primaryKeyValue,
                @Param("params")List<SaveInputMap> params);
    int delete(@Param("tableSchema")String tableSchema,
               @Param("tableName")String tableName,
               @Param("key")String key,
               @Param("keyValue")Object keyValue);

    List<Object> getPkAfterDelete(@Param("tableSchema")String tableSchema,
                                  @Param("tableName")String tableName,
                                  @Param("primaryKey")String primaryKey,
                                  @Param("foreignKey")String foreignKey,
                                  @Param("foreignKeyValue")Object foreignKeyValue,
                                  @Param("order")String order);

    List<Map> getDataSource(@Param("tableSchema")String tableSchema,
                            @Param("tableName")String tableName,
                            @Param("key")String key,
                            @Param("value")String value);
}
