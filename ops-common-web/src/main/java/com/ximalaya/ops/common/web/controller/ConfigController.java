package com.ximalaya.ops.common.web.controller;

import com.ximalaya.ops.common.web.exception.CommonException;
import com.ximalaya.ops.common.web.model.param.ConfigTableParam;
import com.ximalaya.ops.common.web.model.vo.DbConnectVO;
import com.ximalaya.ops.common.web.service.IConfigService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * 配置
 *
 * Created by nihao on 18/1/16.
 */
@Controller
@RequestMapping("/config")
public class ConfigController extends BaseController {

    @Value("#{configProperties['environment']}")
    private String environment;

    @Resource
    private IConfigService configService;

    @RequestMapping("/index")
    public String index(Model model){
        model.addAttribute("environment",environment);
        return "config";
    }

    @RequestMapping("/table")
    public String table(Model model){
        List<DbConnectVO> dbConnectVOList = configService.getAllConnect();
        model.addAttribute("connects", dbConnectVOList);
        model.addAttribute("environment",environment);
        return "configTable";
    }

    @RequestMapping("/saveMeta")
    @ResponseBody
    public String saveMeta(@RequestBody ConfigTableParam configTableParam){
        try {
            configService.saveMeta(configTableParam);
        } catch (CommonException e) {
            return fail(e.getMessage()).json();
        }
        return ok().json();
    }

    @RequestMapping("/getMeta")
    @ResponseBody
    public String getMeta(@RequestParam("configName") String configName){
        try {
            ConfigTableParam configTableParam = configService.getMetaByName(configName);
            return ok().pull("data", configTableParam).json();
        } catch (CommonException e) {
            return fail(e.getMessage()).json();
        }
    }

}
