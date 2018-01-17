package com.ximalaya.ops.common.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by nihao on 18/1/16.
 */
@Controller
@RequestMapping("/test")
public class TestController extends BaseController {
    @RequestMapping("/{qwe}")
    @ResponseBody
    public String test(@PathVariable String qwe){
        return qwe;
    }
}
