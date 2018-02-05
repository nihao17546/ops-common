package com.ximalaya.ops.common.web.dao;

import com.ximalaya.ops.common.web.model.po.ColumnConfigPO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by nihao on 18/1/19.
 */
public interface IColumnConfigDAO {
    List<ColumnConfigPO> getListByMetaIdAndSchemaAndTable(@Param("metaId") Long metaId,
                                          @Param("schema") String schema,
                                          @Param("table") String table);
}
