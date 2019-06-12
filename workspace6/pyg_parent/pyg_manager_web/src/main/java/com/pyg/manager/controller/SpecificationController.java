package com.pyg.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pyg.pojo.TbSpecification;
import com.pyg.sellergoods.service.SpecificationService;
import entity.PageResult;
import entity.Result;
import groupEntity.Specification;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

//specification/findAll
//@Controller
//@ResponseBody //转json  回显到浏览器上
@RestController  //相当于@Controller+@ResponseBody
@RequestMapping("/specification")
public class SpecificationController {

    @Reference
    private SpecificationService specificationService;

    @RequestMapping("/findSpecList")
    public List<Map> findSpecList(){
       return specificationService.findSpecList();
    }
    @RequestMapping("/findAll")
    public List<TbSpecification> findAll(){
       return specificationService.findAll();
    }



    @RequestMapping("/findPage")
    public PageResult findPage(int pageNum, int pageSize){
//        {total:100,rows:[{},{},{}]}
        return specificationService.findPage(pageNum,pageSize);
    }

    @RequestMapping("/search")
    public PageResult search(int pageNum, int pageSize,@RequestBody TbSpecification specification){
//        {total:100,rows:[{},{},{}]}
        return specificationService.findPage(specification,pageNum,pageSize);
    }

    @RequestMapping("/add")
    public Result add(@RequestBody Specification specification){  //RequestBody接收 json数据
//        {success:true|false,message:"保存成功"|"保存失败"}
        try {
            specificationService.add(specification);
            return new Result(true,"保存成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"保存失败");
        }

    }
    @RequestMapping("/update")
    public Result update(@RequestBody Specification specification){  //RequestBody接收 json数据
//        {success:true|false,message:"保存成功"|"保存失败"}
        try {
            specificationService.update(specification);
            return new Result(true,"修改成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"修改失败");
        }

    }
    @RequestMapping("/dele")
    public Result dele(Long[] ids){  //RequestBody接收 json数据
        try {
            specificationService.dele(ids);
            return new Result(true,"删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"删除失败");
        }

    }

    @RequestMapping("/findOne")
   public Specification findOne(Long id){
      return  specificationService.fineOne(id);
    }

}
