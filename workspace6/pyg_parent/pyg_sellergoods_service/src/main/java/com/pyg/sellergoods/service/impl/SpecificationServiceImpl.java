package com.pyg.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pyg.mapper.TbSpecificationMapper;
import com.pyg.mapper.TbSpecificationOptionMapper;
import com.pyg.pojo.TbSpecification;
import com.pyg.pojo.TbSpecificationExample;
import com.pyg.pojo.TbSpecificationOption;
import com.pyg.pojo.TbSpecificationOptionExample;
import com.pyg.sellergoods.service.SpecificationService;
import entity.PageResult;
import groupEntity.Specification;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SpecificationServiceImpl implements SpecificationService {
    @Autowired
    private TbSpecificationMapper specificationMapper;
    @Autowired
    private TbSpecificationOptionMapper specificationOptionMapper;
    @Override
    public List<TbSpecification> findAll() {
        return specificationMapper.selectByExample(null); //根据条件查询 传null 意味着没有条件
    }

    @Override
    public PageResult findPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        Page page = (Page) specificationMapper.selectByExample(null);
//        page.getTotal()  总条数
//        page.getResult() 当前页的数据 list
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public void add(Specification specification) {
//        specification 组合类中有两个表的数据
        TbSpecification tbSpecification = specification.getTbSpecification();
            /* <selectKey resultType="long" keyProperty="id" order="AFTER">
                select LAST_INSERT_ID()
                </selectKey>
                */
        specificationMapper.insert(tbSpecification); // insert 时 可以返回id
        List<TbSpecificationOption> tbSpecificationOptions = specification.getTbSpecificationOptions();
        for (TbSpecificationOption tbSpecificationOption : tbSpecificationOptions) {
            tbSpecificationOption.setSpecId(tbSpecification.getId());
            specificationOptionMapper.insert(tbSpecificationOption);
        }
    }

    @Override
    public Specification fineOne(Long id) {
        Specification specification = new Specification();

        TbSpecification tbSpecification = specificationMapper.selectByPrimaryKey(id);
        specification.setTbSpecification(tbSpecification);
//        select *  form tb_specification_option where spec_id=?
        TbSpecificationOptionExample example = new TbSpecificationOptionExample();
        example.createCriteria().andSpecIdEqualTo(id);
        List<TbSpecificationOption> tbSpecificationOptions = specificationOptionMapper.selectByExample(example);
        specification.setTbSpecificationOptions(tbSpecificationOptions);
//        return specificationMapper.selectByPrimaryKey(id);
        return specification;
    }

    @Override
    public void update(Specification specification) {
        TbSpecification tbSpecification = specification.getTbSpecification();
        specificationMapper.updateByPrimaryKey(tbSpecification);

//        删除此规格下的所有规格小项

//        delete from tb_specification_option where spec_id=?
        TbSpecificationOptionExample example = new TbSpecificationOptionExample();
        example.createCriteria().andSpecIdEqualTo(tbSpecification.getId());
        specificationOptionMapper.deleteByExample(example);

        List<TbSpecificationOption> tbSpecificationOptions = specification.getTbSpecificationOptions();
        for (TbSpecificationOption tbSpecificationOption : tbSpecificationOptions) {
//            重新添加此规格下的规格小项
            tbSpecificationOption.setSpecId(tbSpecification.getId());
            specificationOptionMapper.insert(tbSpecificationOption);
        }
    }

    @Override
    public void dele(Long[] ids) {
        for (Long id : ids) {
            specificationMapper.deleteByPrimaryKey(id);  //只是删除了主表

//            还需要删除从表的数据
            TbSpecificationOptionExample example = new TbSpecificationOptionExample();
            example.createCriteria().andSpecIdEqualTo(id);
            specificationOptionMapper.deleteByExample(example);
//            delete from tb_specification_option where spec_id=?
        }

    }


//    条件并且分页
    @Override
    public PageResult findPage(TbSpecification specification, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        TbSpecificationExample example = new TbSpecificationExample();
        TbSpecificationExample.Criteria criteria = example.createCriteria();
//        判断name是否为空
        Page page = (Page) specificationMapper.selectByExample(example);
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public List<Map> findSpecList() {
        return specificationMapper.findSpecList();
    }
}
