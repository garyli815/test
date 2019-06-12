// 和html交互
app.controller("specificationController",function ($scope,$controller,specificationService) {

    $controller('baseController',{$scope:$scope});//继承  本质：共用一个$scope

    //查询分页数据
    $scope.findPage=function (pageNum,pageSize) {
        specificationService.findPage(pageNum,pageSize).success(function (response) {
            $scope.paginationConf.totalItems = response.total; //把总条数赋值给分页对象的总条数属性上
            $scope.list = response.rows;
        })
    }

    //查询所有
    $scope.findAll=function () {
        specificationService.findAll().success(function (response) {
            $scope.list=response;
        })
    }

    // 保存  如果成功 数据刷新 重新查询$scope.reloadList()
    //       如果失败 alert 提示失败
    $scope.save=function () {
        var obj=null;
        if($scope.entity.tbSpecification.id!=null){  //组合类中的tbSpecification对象的id是否为空
            obj = specificationService.update($scope.entity);
        }else{
            obj = specificationService.add($scope.entity);
        }
        obj.success(function (response) {
            // 要求response 的格式：{success:true|false,message:"保存成功"|"保存失败"}
            if(response.success){
                $scope.reloadList();
            }else{
                alert(response.message);
            }
        })
    }
    // 根据id查询对象
    $scope.findOne=function (id) {
        specificationService.findOne(id).success(function (response) {
            // response 品牌的对象
            $scope.entity =response;
        })
    }



    $scope.dele=function () {
        if($scope.selectIds.length==0){
            return;
        }
        var flag = window.confirm("确认删除您选择的数据吗?");
        if(flag){
            specificationService.dele($scope.selectIds).success(function (response) {
                if(response.success){
                    $scope.reloadList();
                    $scope.selectIds=[];// 清空数组
                }else{
                    alert(response.message);
                }
            })
        }
    }
    $scope.searchEntity={};
    // $scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage
    $scope.search=function (pageNum,pageSize) {
         specificationService.search(pageNum,pageSize,$scope.searchEntity).success(function (response) {
            // response应该有的数据： 总条数   当前页的数据List
            // 要求response的格式：{total:100,rows:[{},{},{}]}
            $scope.paginationConf.totalItems = response.total; //把总条数赋值给分页对象的总条数属性上
            $scope.list = response.rows;
        })
    }

    // 动态添加行 数据：向entity.tbSpecificationOptions中添加对象
    $scope.addTbSpecificationOptions=function () {
        $scope.entity.tbSpecificationOptions.push({});
    }
    // 动态删除行 数据：从entity.tbSpecificationOptions中移除对象
    $scope.deleTbSpecificationOptions=function (index) {
        $scope.entity.tbSpecificationOptions.splice(index,1);
    }
})