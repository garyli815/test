package com.pyg.shop.controller;

import entity.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import utils.FastDFSClient;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Value("${uploadServer}")
    private String uploadServer;
    @RequestMapping("/uploadFile")
    public Result uploadFile(MultipartFile file){
        try {
            FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
            String originalFilename = file.getOriginalFilename(); //文件的原始名称 T.1.jpg
            String extName = originalFilename.substring(originalFilename.lastIndexOf(".")+1); //jpg
            String fileUrl = fastDFSClient.uploadFile(file.getBytes(), extName);
//            fileUrl结果相当于： group1/M00/00/00/wKgZhVvcFPuAe2xTAACuI4TeyLI780.jpg
            return new Result(true,  uploadServer+fileUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,  "上传失败");
        }
    }
}
