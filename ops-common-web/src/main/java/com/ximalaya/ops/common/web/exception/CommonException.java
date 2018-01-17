package com.ximalaya.ops.common.web.exception;

/**
 * Created by nihao on 18/1/16.
 */
public class CommonException extends Exception {
    public CommonException(){
        super();
    }
    public CommonException(String msg){
        super(msg);
    }
    public CommonException(Throwable e){
        super(e);
    }
}
