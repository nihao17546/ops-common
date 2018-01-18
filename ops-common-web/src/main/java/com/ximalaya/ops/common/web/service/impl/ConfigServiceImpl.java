package com.ximalaya.ops.common.web.service.impl;

import com.alibaba.fastjson.JSON;
import com.ximalaya.ops.common.web.dao.IDbConnectDAO;
import com.ximalaya.ops.common.web.dao.IMetaConfigDAO;
import com.ximalaya.ops.common.web.db.dao.MysqlMetaDataDAO;
import com.ximalaya.ops.common.web.exception.CommonException;
import com.ximalaya.ops.common.web.model.db.meta.MetaComment;
import com.ximalaya.ops.common.web.model.param.ConfigTableParam;
import com.ximalaya.ops.common.web.model.po.ColumnInfoPO;
import com.ximalaya.ops.common.web.model.po.DbConnectPO;
import com.ximalaya.ops.common.web.model.po.MetaConfigPO;
import com.ximalaya.ops.common.web.model.po.TableInfoPO;
import com.ximalaya.ops.common.web.model.vo.DbConnectVO;
import com.ximalaya.ops.common.web.model.vo.MetaConfigVO;
import com.ximalaya.ops.common.web.service.IConfigService;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by nihao on 18/1/16.
 */
@Service
public class ConfigServiceImpl implements IConfigService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private IDbConnectDAO dbConnectDAO;
    @Resource
    private IMetaConfigDAO metaConfigDAO;
    @Resource
    private MysqlMetaDataDAO mysqlMetaDataDAO;

    @Override
    public List<DbConnectVO> getAllConnect() {
        List<DbConnectPO> poList = dbConnectDAO.selectAll();
        List<DbConnectVO> voList = poList.stream().map(dbConnectPO -> {
            DbConnectVO vo = new DbConnectVO();
            vo.setId(dbConnectPO.getId());
            vo.setName(dbConnectPO.getName() + "(" + dbConnectPO.getHost() + ")");
            return vo;
        }).collect(Collectors.toList());
        return voList;
    }

    @Override
    public void saveMeta(ConfigTableParam configTableParam) throws CommonException {
        MetaConfigPO checkPO = metaConfigDAO.selectByName(configTableParam.getName());
        if(checkPO != null){
            //如果id为null,表示新增。如果id不为null,表示编辑
            if(configTableParam.getId()==null || !configTableParam.getId().equals(checkPO.getId())){
                throw new CommonException("配置名称["+configTableParam.getName()+"]已存在");
            }
        }

        DbConnectPO dbConnectPO = dbConnectDAO.getById(configTableParam.getConnectId());

        // 校验主表是否存在
        TableInfoPO tableInfoPO = mysqlMetaDataDAO.getTableComment(dbConnectPO,
                configTableParam.getTableSchema(), configTableParam.getTableName());
        if(tableInfoPO==null){
            throw new CommonException("表"+configTableParam.getTableSchema()+"."+configTableParam.getTableName()+"不存在");
        }

        // 校验主表默认排序字段是否存在
        if(configTableParam.getComment().getDefaultOrderColumn() != null){
            boolean b = true;
            List<ColumnInfoPO> columnInfoPOList = mysqlMetaDataDAO.getTableInfo(dbConnectPO,
                    configTableParam.getTableSchema(), configTableParam.getTableName());
            for(ColumnInfoPO columnInfoPO :columnInfoPOList){
                if(columnInfoPO.getCOLUMN_NAME().equals(configTableParam.getComment().getDefaultOrderColumn())){
                    b = false;
                    break;
                }
            }
            if(b){
                throw new CommonException("主表默认排序字段设置错误,不存在该字段:"+configTableParam.getComment().getDefaultOrderColumn());
            }
        }

        // 校验从表
        if(configTableParam.getComment().getFollow() != null){
            List<ColumnInfoPO> columnInfoPOList = mysqlMetaDataDAO.getTableInfo(dbConnectPO,
                    configTableParam.getTableSchema(), configTableParam.getComment().getFollow().getTableName());
            if(CollectionUtils.isEmpty(columnInfoPOList)){
                throw new CommonException("从表"+configTableParam.getComment().getFollow().getTableName()+"不存在");
            }
            boolean foreign = true;
            for(ColumnInfoPO columnInfoPO : columnInfoPOList){
                if(columnInfoPO.getCOLUMN_NAME().equals(configTableParam.getComment().getFollow().getForeignKey())){
                    foreign = false;
                }
            }
            if(foreign){
                throw new CommonException("从表外键设置错误,不存在该字段:"+configTableParam.getComment().getFollow().getForeignKey());
            }
            if(configTableParam.getComment().getFollow().getOrder()!=null){
                boolean b=true;
                for(ColumnInfoPO columnInfoPO : columnInfoPOList){
                    if(columnInfoPO.getCOLUMN_NAME().equals(configTableParam.getComment().getFollow().getOrder())){
                        b=false;
                        break;
                    }
                }
                if(b){
                    throw new CommonException("表拖动排序字段设置错误,不存在该字段:"+configTableParam.getComment().getFollow().getOrder());
                }
            }
        }

        // 保存
        MetaConfigPO metaConfigPO = new MetaConfigPO();
        metaConfigPO.setId(configTableParam.getId());
        metaConfigPO.setConnectId(dbConnectPO.getId());
        metaConfigPO.setName(configTableParam.getName());
        metaConfigPO.setSchemaName(configTableParam.getTableSchema());
        metaConfigPO.setTableName(configTableParam.getTableName());
        metaConfigPO.setConfigJson(JSON.toJSONString(configTableParam.getComment()));
        if(metaConfigPO.getId()==null){
            metaConfigDAO.insert(metaConfigPO);
        }
        else{
            metaConfigDAO.updateById(metaConfigPO);
        }
    }

    @Override
    public ConfigTableParam getMetaByName(String configName) throws CommonException {
        MetaConfigPO metaConfigPO = metaConfigDAO.selectByName(configName);
        if(metaConfigPO == null){
            throw new CommonException("配置名不存在");
        }
        ConfigTableParam configTableParam=new ConfigTableParam();
        configTableParam.setId(metaConfigPO.getId());
        configTableParam.setConnectId(metaConfigPO.getConnectId());
        configTableParam.setName(metaConfigPO.getName());
        configTableParam.setTableSchema(metaConfigPO.getSchemaName());
        configTableParam.setTableName(metaConfigPO.getTableName());
        configTableParam.setComment(JSON.parseObject(metaConfigPO.getConfigJson(), MetaComment.class));
        return configTableParam;
    }

    @Override
    public MetaConfigVO getMetaConfigByName(String metaName) throws CommonException{
        MetaConfigPO metaConfigPO = metaConfigDAO.selectByName(metaName);
        if(metaConfigPO == null){
            throw new CommonException("配置名不存在");
        }
        MetaConfigVO vo = new MetaConfigVO();
        vo.setId(metaConfigPO.getId());
        vo.setName(metaConfigPO.getName());
        vo.setConnectId(metaConfigPO.getConnectId());
        vo.setSchemaName(metaConfigPO.getSchemaName());
        vo.setTableName(metaConfigPO.getTableName());
        vo.setConfigJson(metaConfigPO.getConfigJson());
        return vo;
    }
}
