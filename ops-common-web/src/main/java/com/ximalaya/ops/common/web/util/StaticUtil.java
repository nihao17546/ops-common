package com.ximalaya.ops.common.web.util;

/**
 * Created by nihao on 18/1/19.
 */
public class StaticUtil {
    public static String getPrimaryKey(String createSql){
        createSql = createSql.toUpperCase().replaceAll(" ","");
        if(createSql!=null && createSql.contains("PRIMARYKEY")){
            String s =createSql.substring(createSql.indexOf("PRIMARYKEY(`")+"PRIMARYKEY(`".length());
            return s.substring(0,s.indexOf("`)"));
        }
        return null;
    }
    public static boolean equal(String a, String b) {
        if (a==null && b == null) {
            return true;
        }
        if (a != null) {
            return a.equals(b);
        }else {
            return b.equals(a);
        }
    }
}
