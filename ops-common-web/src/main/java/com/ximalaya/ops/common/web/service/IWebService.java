package com.ximalaya.ops.common.web.service;


import com.ximalaya.ops.common.web.exception.CommonException;
import com.ximalaya.ops.common.web.model.vo.InitHtmlVO;

/**
 * Created by nihao on 18/3/21.
 */
public interface IWebService {
    InitHtmlVO initHtml(Long metaId) throws CommonException;
}
