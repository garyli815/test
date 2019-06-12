// 原则：只和后台controller交互 不要出现$scope
app.service("specificationService",function ($http) {

    this.findSpecList=function () {
        return $http.get("../specification/findSpecList");
    }

    //查询分页数据
    this.findPage=function (pageNum,pageSize) {
        return $http.get("../specification/findPage?pageNum="+pageNum+"&pageSize="+pageSize);
    }

//查询所有
    this.findAll=function () {
       return $http.get("../specification/findAll");
    }

    this.add=function (entity) {
        return $http.post("../specification/add",entity);
    }

    this.update=function (entity) {
        return $http.post("../specification/update",entity);
    }

// 根据id查询对象
    this.findOne=function (id) {
       return $http.get("../specification/findOne?id="+id);
    }

    this.dele=function (ids) {
            return $http.get("../specification/dele?ids="+ids);
    }

    this.search=function (pageNum,pageSize,searchEntity) {
        return $http.post("../specification/search?pageNum="+pageNum+"&pageSize="+pageSize,searchEntity);
    }
})

