package com.pyg.sellergoods.service;

import com.pyg.pojo.TbSpecification;
import entity.PageResult;
import groupEntity.Specification;

import java.util.List;
import java.util.Map;

public interface SpecificationService {

    public List<TbSpecification> findAll();

    PageResult findPage(int pageNum, int pageSize);

    void add(Specification specification);

    Specification fineOne(Long id);

    void update(Specification specification);

    void dele(Long[] ids);

    PageResult findPage(TbSpecification specification, int pageNum, int pageSize);

    List<Map> findSpecList();
}
