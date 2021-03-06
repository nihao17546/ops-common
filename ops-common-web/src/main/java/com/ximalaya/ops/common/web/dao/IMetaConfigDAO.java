package com.ximalaya.ops.common.web.dao;

import com.ximalaya.ops.common.web.model.po.MetaConfigPO;
import org.apache.ibatis.annotations.Param;

/**
 * Created by nihao on 18/1/16.
 */
public interface IMetaConfigDAO {
    MetaConfigPO selectByName(@Param("name") String name);
    int insert(MetaConfigPO metaConfigPO);
    int updateById(MetaConfigPO metaConfigPO);
    MetaConfigPO selectById(@Param("id") Long id);
    void deleteColumnConfig(@Param("schemaName") String schemaName,
                            @Param("tableName") String tableName,
                            @Param("columnName") String columnName,
                            @Param("metaId") Long metaId);
}
