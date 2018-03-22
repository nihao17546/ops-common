package com.ximalaya.ops.common.web.service.impl;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.ximalaya.ops.common.web.dao.IDbConnectDAO;
import com.ximalaya.ops.common.web.dao.IMetaConfigDAO;
import com.ximalaya.ops.common.web.db.dao.MysqlMetaDataDAO;
import com.ximalaya.ops.common.web.exception.CommonException;
import com.ximalaya.ops.common.web.model.db.meta.MetaComment;
import com.ximalaya.ops.common.web.model.po.ColumnInfoPO;
import com.ximalaya.ops.common.web.model.po.DbConnectPO;
import com.ximalaya.ops.common.web.model.po.MetaConfigPO;
import com.ximalaya.ops.common.web.model.po.TableInfoPO;
import com.ximalaya.ops.common.web.model.vo.InitHtmlVO;
import com.ximalaya.ops.common.web.service.IWebService;
import com.ximalaya.ops.common.web.util.StaticUtil;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by nihao on 18/3/21.
 */
@Service
public class WebServiceImpl implements IWebService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private IDbConnectDAO dbConnectDAO;
    @Resource
    private IMetaConfigDAO metaConfigDAO;
    @Resource
    private MysqlMetaDataDAO mysqlMetaDataDAO;

    @Override
    public InitHtmlVO initHtml(Long metaId) throws CommonException {
        DbConnectPO dbConnectPO = dbConnectDAO.getByMetaId(metaId);
        MetaConfigPO metaConfigPO = metaConfigDAO.selectById(metaId);
        if(Strings.isNullOrEmpty(metaConfigPO.getConfigJson())){
            throw new CommonException("表"+metaConfigPO.getSchemaName()+"."+metaConfigPO.getTableName()+"未配置表信息");
        }
        TableInfoPO tableInfoPO = mysqlMetaDataDAO.getTableComment(dbConnectPO, metaConfigPO.getSchemaName(), metaConfigPO.getTableName());
        if(tableInfoPO == null){
            throw new CommonException("表"+metaConfigPO.getSchemaName()+"."+metaConfigPO.getTableName()+"不存在");
        }
        MetaComment metaComment = null;
        try{
            metaComment = JSON.parseObject(metaConfigPO.getConfigJson().replaceAll("\"","'"),MetaComment.class);
        } catch (Exception e){
            throw new CommonException("表"+metaConfigPO.getSchemaName()+"."+metaConfigPO.getTableName()+"字段配置错误,错误信息:"+e.getMessage());
        }
//        metaComment.setTableSchema(metaConfigPO.getSchemaName());
//        metaComment.setTableName(metaConfigPO.getTableName());
//
//        InitHtmlVO initHtmlVO = new InitHtmlVO();
//        initHtmlVO.setMetaId(metaId);
//        initHtmlVO.setTitle(metaComment.getTitle());
//
//
//
//        // 项目元数据id
//        model.addAttribute("metaId", metaId);
//        return "index";

        //获取主表信息
        List<ColumnInfoPO> columnInfoPOList = mysqlMetaDataDAO.getColumInfoPOsWithFilledComment(dbConnectPO, metaId,
                metaConfigPO.getSchemaName(), metaConfigPO.getTableName());
        if(CollectionUtils.isEmpty(columnInfoPOList)){
            throw new CommonException("表"+metaConfigPO.getSchemaName()+"."+metaConfigPO.getTableName()+"不存在");
        }
        Map<String,String> sqlMap = mysqlMetaDataDAO.showTable(dbConnectPO, metaConfigPO.getSchemaName(), metaConfigPO.getTableName());
        String mainPrimaryKey = StaticUtil.getPrimaryKey(sqlMap.get("Create Table"));
        Map<String,Object> mainMap = StaticUtil.checkMain(columnInfoPOList,null,mainPrimaryKey);

        //判断从表
        if(metaComment.getFollow() != null){
            String followTableName = metaComment.getFollow().getTableName();
            List<ColumnInfoPO> followColumnInfoPOList = mysqlMetaDataDAO.getColumInfoPOsWithFilledComment(dbConnectPO,metaId,tableSchema, followTableName);
            if(CollectionUtils.isEmpty(followColumnInfoPOList)){
                throw new CommonException("表"+metaConfigPO.getSchemaName()+"."+followTableName+"不存在");
            }
            Map<String,String> followSqlMap = mysqlMetaDataDAO.showTable(dbConnectPO, metaConfigPO.getSchemaName(), followTableName);
            String followPrimaryKey = StaticUtil.getPrimaryKey(followSqlMap.get("Create Table"));
            Map<String,Object> followMap = StaticUtil.checkMain(followColumnInfoPOList,metaComment.getFollow().getOrder(),followPrimaryKey);
        }

    }
}
