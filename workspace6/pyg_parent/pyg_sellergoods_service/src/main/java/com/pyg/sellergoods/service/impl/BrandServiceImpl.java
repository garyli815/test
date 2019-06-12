package com.pyg.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pyg.mapper.TbBrandMapper;
import com.pyg.pojo.TbBrand;
import com.pyg.pojo.TbBrandExample;
import com.pyg.sellergoods.service.BrandService;
import entity.PageResult;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    private TbBrandMapper brandMapper;
    @Override
    public List<TbBrand> findAll() {
        return brandMapper.selectByExample(null); //根据条件查询 传null 意味着没有条件
    }

    @Override
    public PageResult findPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        Page page = (Page) brandMapper.selectByExample(null);
//        page.getTotal()  总条数
//        page.getResult() 当前页的数据 list
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public void add(TbBrand brand) {
        brandMapper.insert(brand);
    }

    @Override
    public TbBrand fineOne(Long id) {
        return brandMapper.selectByPrimaryKey(id);
    }

    @Override
    public void update(TbBrand brand) {
        brandMapper.updateByPrimaryKey(brand);
    }

    @Override
    public void dele(Long[] ids) {
        for (Long id : ids) {
            brandMapper.deleteByPrimaryKey(id);
        }

    }


//    条件并且分页
    @Override
    public PageResult findPage(TbBrand brand, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);


        TbBrandExample example = new TbBrandExample();
        TbBrandExample.Criteria criteria = example.createCriteria();
//        判断name是否为空
        if(StringUtils.isNotBlank(brand.getName())){
            criteria.andNameLike("%"+brand.getName()+"%");
        }
        if(StringUtils.isNotBlank(brand.getFirstChar())){
            criteria.andFirstCharEqualTo(brand.getFirstChar());
        }
        Page page = (Page) brandMapper.selectByExample(example);
        return new PageResult(page.getTotal(),page.getResult());
    }


    //此方法是添加模板时需要的 需要的格式：findBrandList[{id:1,text:XXX},{id:2,text:CCCC}]
    @Override
    public List<Map> findBrandList() {
        return brandMapper.findBrandList();
    }
}
