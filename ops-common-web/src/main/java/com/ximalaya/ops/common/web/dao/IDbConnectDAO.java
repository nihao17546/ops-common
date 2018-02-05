package com.ximalaya.ops.common.web.dao;

import com.ximalaya.ops.common.web.model.po.DbConnectPO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by nihao on 18/1/16.
 */
public interface IDbConnectDAO {
    List<DbConnectPO> selectAll();
    DbConnectPO getById(@Param("id") Long id);
    DbConnectPO getByMetaId(@Param("mataId") Long mataId);
}
