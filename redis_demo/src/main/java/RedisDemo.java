import redis.clients.jedis.Jedis;

public class RedisDemo {
    public static void main(String[] args) {
//        1、创建jedis对象

        Jedis jedis = new Jedis("192.168.158.153");
        jedis.set("name","syl");

//        jedis.del("name");
        String name = jedis.get("name");
        System.out.println(name);

//        value  set list zset    hash

//        Redis  jedis   springDataRedis
//        Mysql  jdbc    mybatis

    }
}
