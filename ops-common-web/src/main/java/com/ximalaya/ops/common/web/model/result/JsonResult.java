package com.ximalaya.ops.common.web.model.result;

import com.alibaba.fastjson.JSON;

import java.util.HashMap;

/**
 * Created by nihao on 18/1/16.
 */
public class JsonResult<K,V> extends HashMap<K,V> {

    public String json(){
        return JSON.toJSONString(this);
    }

    public JsonResult<K,V> pull(K key, V value){
        put(key, value);
        return this;
    }

    public static JsonResult success(){
        return success("success");
    }

    public static JsonResult fail(){
        return fail("fail");
    }

    public static JsonResult success(String message){
        return new JsonResult().pull("code", 200).pull("message", message);
    }

    public static JsonResult fail(String message){
        return new JsonResult().pull("code", 500).pull("message", message);
    }

    public JsonResult() {

    }
}