app.controller("baseController",function ($scope) {
    // 分页对象
    $scope.paginationConf={
        currentPage: 1,  //当前页码
        totalItems: 10,  //总条数 需要查询后赋值
        itemsPerPage: 10,//没有显示的条数
        perPageOptions: [10, 20, 30, 40, 50], // 显示条数的选择
        onChange: function(){
            $scope.reloadList();//重新加载
        }
    }
    //onChange事件调用
    $scope.reloadList=function () {
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
    }

    $scope.selectIds=[]; //把需要删除的对象的id放入到此数组中

    $scope.updateSelection=function (event,id) { //修改数组中的数据
        // 向数组中放数据 push
        // 从数组中移除数据 splice
        // event事件参数
        // event.target  //获取正在操作的对象 checkbox
        if(event.target.checked){ //为true 意味着是选中
            $scope.selectIds.push(id);
        }else{
            // 从数组中移除数据
            // $scope.selectIds.splice(index,数量);
            // 获取数据在数组的位置
            var index = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(index,1);

        }
    }
})