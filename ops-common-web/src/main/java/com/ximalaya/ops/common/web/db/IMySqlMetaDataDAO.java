package com.ximalaya.ops.common.web.db;

import com.ximalaya.ops.common.web.model.po.ColumnInfoPO;
import com.ximalaya.ops.common.web.model.po.TableInfoPO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by nihao on 18/1/16.
 */
public interface IMySqlMetaDataDAO {
    TableInfoPO getTableComment(@Param("tableSchema")String tableSchema,
                                @Param("tableName") String tableName);

    List<ColumnInfoPO> getTableInfo(@Param("tableSchema")String tableSchema,
                                    @Param("tableName") String tableName);

    Map<String,String> showTable(@Param("schema") String schema, @Param("tableName") String tableName);
}
