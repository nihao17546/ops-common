package com.ximalaya.ops.common.web.controller;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.ximalaya.ops.common.web.dao.IDbConnectDAO;
import com.ximalaya.ops.common.web.dao.IMetaConfigDAO;
import com.ximalaya.ops.common.web.db.dao.MysqlMetaDataDAO;
import com.ximalaya.ops.common.web.model.db.meta.MetaComment;
import com.ximalaya.ops.common.web.model.po.DbConnectPO;
import com.ximalaya.ops.common.web.model.po.MetaConfigPO;
import com.ximalaya.ops.common.web.model.po.TableInfoPO;
import com.ximalaya.ops.common.web.util.DesUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

/**
 * Created by nihao on 18/3/20.
 */
@Controller
@RequestMapping("/web")
public class WebController extends BaseController {

    @Resource
    private IDbConnectDAO dbConnectDAO;
    @Resource
    private IMetaConfigDAO metaConfigDAO;
    @Resource
    private MysqlMetaDataDAO mysqlMetaDataDAO;

    @RequestMapping("/{meteIdEncryptStr}/index")
    public String index(@PathVariable String meteIdEncryptStr,
                        Model model){
        Long metaId = null;
        try {
            metaId = Long.parseLong(DesUtil.decrypt(meteIdEncryptStr));
        } catch (Exception e) {
            model.addAttribute("mess", "页面不存在");
            return "error/500";
        }

        DbConnectPO dbConnectPO = dbConnectDAO.getByMetaId(metaId);
        MetaConfigPO metaConfigPO = metaConfigDAO.selectById(metaId);
        if(Strings.isNullOrEmpty(metaConfigPO.getConfigJson())){
            model.addAttribute("mess","表"+metaConfigPO.getSchemaName()+"."+metaConfigPO.getTableName()+"未配置表信息");
            return "error/500";
        }
        TableInfoPO tableInfoPO = mysqlMetaDataDAO.getTableComment(dbConnectPO, metaConfigPO.getSchemaName(), metaConfigPO.getTableName());
        if(tableInfoPO == null){
            model.addAttribute("mess","表"+metaConfigPO.getSchemaName()+"."+metaConfigPO.getTableName()+"不存在");
            return "error/500";
        }
        MetaComment metaComment = null;
        try{
            metaComment = JSON.parseObject(metaConfigPO.getConfigJson().replaceAll("\"","'"),MetaComment.class);
        } catch (Exception e){
            model.addAttribute("mess","表"+metaConfigPO.getSchemaName()+"."+metaConfigPO.getTableName()+"字段配置错误,错误信息:"+e.getMessage());
            return "error/500";
        }
        metaComment.setTableSchema(metaConfigPO.getSchemaName());
        metaComment.setTableName(metaConfigPO.getTableName());
        model.addAttribute("title",metaComment.getTitle());
        model.addAttribute("meta",JSON.toJSONString(metaComment));
        // 项目元数据id
        model.addAttribute("metaId", metaId);
        return "index";
    }

}
