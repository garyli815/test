import org.csource.fastdfs.*;

public class FastDfsTest {

    public static void main(String[] args) throws Exception {
//        1、加载配置文件，配置文件中的内容就是 tracker 服务的地址。ClientGlobal加载
        ClientGlobal.init("D:\\class16\\workspace\\fastdfs_demo\\src\\main\\resources\\fdfs_client.conf");
//        2、创建一个 TrackerClient 对象。直接 new 一个
        TrackerClient trackerClient = new TrackerClient();
//        3、使用 TrackerClient 对象获取连接，获得一个 TrackerServer 对象
        TrackerServer trackerServer = trackerClient.getConnection();
//        4、创建一个 StorageServer 的引用，值为 null
        StorageServer storageServer=null;
//        5、创建一个 StorageClient 对象，需要两个参数 TrackerServer 对象、StorageServer 的引用
        StorageClient storageClient = new StorageClient(trackerServer,storageServer);
//        6、使用 StorageClient 对象上传图片
        String[] jpgs = storageClient.upload_file("D:\\T1.jpg", "jpg", null);
//        7、返回数组。包含组名和图片的路径
        for (String jpg : jpgs) {
            System.out.println(jpg);
        }
//        group1
//        M00/00/00/wKgZhVvcFPuAe2xTAACuI4TeyLI780.jpg
//        192.168.25.133/group1/M00/00/00/wKgZhVvcFPuAe2xTAACuI4TeyLI780.jpg

    }
}
