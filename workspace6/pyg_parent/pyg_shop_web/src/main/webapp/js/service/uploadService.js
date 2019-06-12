app.service("uploadService",function($http){
	this.uploadFile=function () {
		var formData = new FormData(); // html5对象  相当于构建一个表单对象
		// $http.get("")
        // var file = file.files[0]; //从页面中获取第一个file类型的内容
        formData.append("file",file.files[0]);                 //把数据放入到formData中
		return $http({
            method:"post",
			url:'/upload/uploadFile',
			data:formData,
            headers: {'Content-Type':undefined},
        	transformRequest: angular.identity
		});
    }
})