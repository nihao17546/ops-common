package com.ximalaya.ops.common.web.db.dao;

import com.google.common.base.Function;
import com.google.common.base.Preconditions;
import com.google.common.collect.Maps;
import com.ximalaya.ops.common.web.dao.IColumnConfigDAO;
import com.ximalaya.ops.common.web.dao.IDbConnectDAO;
import com.ximalaya.ops.common.web.db.IMySqlMetaDataDAO;
import com.ximalaya.ops.common.web.db.ISqlSessionExecutor;
import com.ximalaya.ops.common.web.db.SqlSessionManager;
import com.ximalaya.ops.common.web.exception.CommonException;
import com.ximalaya.ops.common.web.model.po.ColumnConfigPO;
import com.ximalaya.ops.common.web.model.po.ColumnInfoPO;
import com.ximalaya.ops.common.web.model.po.DbConnectPO;
import com.ximalaya.ops.common.web.model.po.TableInfoPO;
import com.ximalaya.ops.common.web.util.StaticUtil;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by nihao on 18/1/16.
 */
@Component
public class MysqlMetaDataDAO {

    @Resource
    private IDbConnectDAO dbConnectDAO;
    @Resource
    private IColumnConfigDAO columnConfigDAO;

    public TableInfoPO getTableComment(Long connectId, String tableSchema, String tableName) throws CommonException{
        DbConnectPO dbConnectPO = dbConnectDAO.getById(connectId);
        if(dbConnectPO == null){
            throw new CommonException("数据库链接[" + connectId + "]不存在");
        }
        return getTableComment(dbConnectPO, tableSchema, tableName);
    }

    public TableInfoPO getTableComment(DbConnectPO dbConnectPO , String tableSchema, String tableName){
        TableInfoPO tableInfoPO = SqlSessionManager.excute(dbConnectPO, new ISqlSessionExecutor<TableInfoPO>() {
            @Override
            public TableInfoPO execute(SqlSession sqlSession) {
                return sqlSession.getMapper(IMySqlMetaDataDAO.class).getTableComment(tableSchema, tableName);
            }
        });
        return tableInfoPO;
    }

    public List<ColumnInfoPO> getTableInfo(Long connectId, String tableSchema, String tableName) throws CommonException{
        DbConnectPO dbConnectPO = dbConnectDAO.getById(connectId);
        if(dbConnectPO == null){
            throw new CommonException("数据库链接[" + connectId + "]不存在");
        }
        return getTableInfo(dbConnectPO, tableSchema, tableName);
    }

    public List<ColumnInfoPO> getTableInfo(DbConnectPO dbConnectPO , String tableSchema, String tableName){
        List<ColumnInfoPO> list = SqlSessionManager.excute(dbConnectPO, new ISqlSessionExecutor<List<ColumnInfoPO>>() {
            @Override
            public List<ColumnInfoPO> execute(SqlSession sqlSession) {
                return sqlSession.getMapper(IMySqlMetaDataDAO.class).getTableInfo(tableSchema, tableName);
            }
        });
        return list;
    }

    public Map<String,String> showTable(DbConnectPO dbConnectPO, String tableSchema, String tableName){
        return SqlSessionManager.excute(dbConnectPO, new ISqlSessionExecutor<Map<String, String>>() {
            @Override
            public Map<String, String> execute(SqlSession sqlSession) {
                return sqlSession.getMapper(IMySqlMetaDataDAO.class).showTable(tableSchema,tableName);
            }
        });
    }

    public List<ColumnInfoPO> getColumInfoPOsWithFilledComment(DbConnectPO dbConnectPO, Long metaId, String schema, String table){
        List<ColumnInfoPO> columnInfoPOList = getTableInfo(dbConnectPO, schema, table);
        List<ColumnConfigPO> columnConfigPOs = columnConfigDAO.getListByMetaIdAndSchemaAndTable(metaId, schema, table);
        Map<String, ColumnConfigPO> columnConfigPOMap = Maps.uniqueIndex(columnConfigPOs, new Function<ColumnConfigPO, String>() {
            @Override
            public String apply(ColumnConfigPO input) {
                return input.getColumnName();
            }
        });
        for (ColumnInfoPO infoPO : columnInfoPOList) {
            ColumnConfigPO configPO = columnConfigPOMap.get(infoPO.getCOLUMN_NAME());
            if (configPO != null && StaticUtil.equal(configPO.getColumnName(), infoPO.getCOLUMN_NAME())) {
                infoPO.setCOLUMN_COMMENT(configPO.getConfigJson());
            }else {
                infoPO.setCOLUMN_COMMENT(null);
            }
        }
        return columnInfoPOList;
    }

}
