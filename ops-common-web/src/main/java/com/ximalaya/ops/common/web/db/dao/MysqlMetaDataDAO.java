package com.ximalaya.ops.common.web.db.dao;

import com.google.common.base.Preconditions;
import com.ximalaya.ops.common.web.dao.IDbConnectDAO;
import com.ximalaya.ops.common.web.db.IMySqlMetaDataDAO;
import com.ximalaya.ops.common.web.db.ISqlSessionExecutor;
import com.ximalaya.ops.common.web.db.SqlSessionManager;
import com.ximalaya.ops.common.web.exception.CommonException;
import com.ximalaya.ops.common.web.model.po.ColumnInfoPO;
import com.ximalaya.ops.common.web.model.po.DbConnectPO;
import com.ximalaya.ops.common.web.model.po.TableInfoPO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by nihao on 18/1/16.
 */
@Component
public class MysqlMetaDataDAO {

    @Resource
    private IDbConnectDAO dbConnectDAO;

    public TableInfoPO getTableComment(Long connectId, String tableSchema, String tableName) throws CommonException{
        DbConnectPO dbConnectPO = dbConnectDAO.getById(connectId);
        if(dbConnectPO == null){
            throw new CommonException("数据库链接[" + connectId + "]不存在");
        }
        return getTableComment(dbConnectPO, tableSchema, tableName);
    }

    public TableInfoPO getTableComment(DbConnectPO dbConnectPO , String tableSchema, String tableName) throws CommonException{
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

    public List<ColumnInfoPO> getTableInfo(DbConnectPO dbConnectPO , String tableSchema, String tableName) throws CommonException{
        List<ColumnInfoPO> list = SqlSessionManager.excute(dbConnectPO, new ISqlSessionExecutor<List<ColumnInfoPO>>() {
            @Override
            public List<ColumnInfoPO> execute(SqlSession sqlSession) {
                return sqlSession.getMapper(IMySqlMetaDataDAO.class).getTableInfo(tableSchema, tableName);
            }
        });
        return list;
    }

}
