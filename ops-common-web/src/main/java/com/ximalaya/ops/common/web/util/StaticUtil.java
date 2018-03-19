package com.ximalaya.ops.common.web.util;

import com.google.common.base.Strings;
import com.ximalaya.ops.common.web.model.db.NeedSave;

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
    public static void encodeRegular(NeedSave needSave){
        if(needSave!=null&&!Strings.isNullOrEmpty(needSave.getRegular())){
            char[] chars=needSave.getRegular().toCharArray();
            StringBuffer sb=new StringBuffer();
            for(char c:chars){
                sb.append((int)c+",");
            }
            needSave.setRegular(sb.toString());
        }
    }

    public static void decodeRegular(NeedSave needSave){
        if(needSave!=null&&!Strings.isNullOrEmpty(needSave.getRegular())){
            String[] strings=needSave.getRegular().split(",");
            char[] chars=new char[strings.length];
            for(int i=0;i<strings.length;i++){
                chars[i]=(char)Integer.parseInt(strings[i]);
            }
            needSave.setRegular(new String(chars));
        }
    }
}
