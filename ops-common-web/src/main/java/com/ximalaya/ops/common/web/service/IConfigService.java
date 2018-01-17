package com.ximalaya.ops.common.web.service;

import com.ximalaya.ops.common.web.exception.CommonException;
import com.ximalaya.ops.common.web.model.param.ConfigTableParam;
import com.ximalaya.ops.common.web.model.vo.DbConnectVO;

import java.util.List;

/**
 * Created by nihao on 18/1/16.
 */
public interface IConfigService {
    /**
     * 获取所有链接配置
     * @return
     */
    List<DbConnectVO> getAllConnect();

    /**
     * 保存表信息
     * @param configTableParam
     * @throws CommonException
     */
    void saveMeta(ConfigTableParam configTableParam) throws CommonException;

    /**
     * 根据配置名称获取配置详情
     * @param configName
     * @return
     * @throws CommonException
     */
    ConfigTableParam getMetaByName(String configName) throws CommonException;
}
