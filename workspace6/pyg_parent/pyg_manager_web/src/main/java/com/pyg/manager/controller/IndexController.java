package com.pyg.manager.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController //response+controller  //responsezhuanjson
@RequestMapping("/index")
public class IndexController {

    @RequestMapping("/showName")
    public String showName(){
//        获取当前登录人名称
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return name;
    }
    @RequestMapping("/showName2")
    public Map showName2(){
//        获取当前登录人名称
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Map map = new HashMap();
        map.put("name",name);
        return map;
    }

    public static void main(String[] args) {
        String str="admin";
        System.out.println(str);
        String s = JSON.toJSONString(str);
        System.out.println(s);

    }
}
