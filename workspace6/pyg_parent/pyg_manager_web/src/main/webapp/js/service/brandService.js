// 原则：只和后台controller交互 不要出现$scope
app.service("brandService",function ($http) {

    // 此方法是添加模板时需要的 需要的格式：[{id:1,text:XXX},{id:2,text:CCCC}]
    this.findBrandList=function () {
        return $http.get("../brand/findBrandList");
    }
    //查询分页数据
    this.findPage=function (pageNum,pageSize) {
        return $http.get("../brand/findPage?pageNum="+pageNum+"&pageSize="+pageSize);
    }

//查询所有
    this.findAll=function () {
       return $http.get("../brand/findAll");
    }

    this.add=function (entity) {
        return $http.post("../brand/add",entity);
    }

    this.update=function (entity) {
        return $http.post("../brand/update",entity);
    }

// 根据id查询对象
    this.findOne=function (id) {
       return $http.get("../brand/findOne?id="+id);
    }

    this.dele=function (ids) {
            return $http.get("../brand/dele?ids="+ids);
    }

    this.search=function (pageNum,pageSize,searchEntity) {
        return $http.post("../brand/search?pageNum="+pageNum+"&pageSize="+pageSize,searchEntity);
    }
})

