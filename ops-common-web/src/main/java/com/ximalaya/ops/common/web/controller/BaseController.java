package com.ximalaya.ops.common.web.controller;


import com.ximalaya.ops.common.web.model.result.JsonResult;

/**
 * Created by nihao on 17/12/15.
 */
public class BaseController {
    protected JsonResult fail(String message){
        return JsonResult.fail(message);
    }
    protected JsonResult ok(String message){
        return JsonResult.success(message);
    }
    protected JsonResult fail(){
        return JsonResult.fail();
    }
    protected JsonResult ok(){
        return JsonResult.success();
    }
}
