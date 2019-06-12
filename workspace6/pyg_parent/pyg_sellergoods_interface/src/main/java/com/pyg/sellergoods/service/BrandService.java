package com.pyg.sellergoods.service;

import com.pyg.pojo.TbBrand;
import entity.PageResult;

import java.util.List;
import java.util.Map;

public interface BrandService {

    public List<TbBrand> findAll();

    PageResult findPage(int pageNum, int pageSize);

    void add(TbBrand brand);

    TbBrand fineOne(Long id);

    void update(TbBrand brand);

    void dele(Long[] ids);

    PageResult findPage(TbBrand brand, int pageNum, int pageSize);

    List<Map> findBrandList();
}
