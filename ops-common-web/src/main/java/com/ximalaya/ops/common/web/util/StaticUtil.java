package com.ximalaya.ops.common.web.util;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.ximalaya.ops.common.web.exception.CommonException;
import com.ximalaya.ops.common.web.model.db.NeedList;
import com.ximalaya.ops.common.web.model.db.NeedSave;
import com.ximalaya.ops.common.web.model.db.NeedSearch;
import com.ximalaya.ops.common.web.model.db.TableColumnComment;
import com.ximalaya.ops.common.web.model.po.ColumnInfoPO;

import java.util.List;
import java.util.Map;

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

    public static Map<String,Object> checkMain(List<ColumnInfoPO> columnInfoPOList, String order, String primaryKey) throws CommonException {
        Map<String,Object> returnMap = Maps.newHashMapWithExpectedSize(5);
        List<NeedList> needListList = Lists.newArrayListWithCapacity(columnInfoPOList.size());
        List<NeedSearch> needSearchList =Lists.newArrayListWithCapacity(columnInfoPOList.size());
        List<NeedSave> needSaveList = Lists.newArrayListWithCapacity(columnInfoPOList.size());
        for(ColumnInfoPO columnInfoPO : columnInfoPOList){
            String extra = columnInfoPO.getEXTRA();
            String column_name = columnInfoPO.getCOLUMN_NAME();
            String is_nullable = columnInfoPO.getIS_NULLABLE();
            String data_type = columnInfoPO.getDATA_TYPE();
            String column_key = columnInfoPO.getCOLUMN_KEY();
            String column_comment = columnInfoPO.getCOLUMN_COMMENT();
            if(!Strings.isNullOrEmpty(column_comment)){
                TableColumnComment tableColumnComment=null;
                try{
                    // 使用replaceAll("\"","'"),防止出现莫名其妙的错误
                    // "{\"lableName\":\"头图\", \"save\":{\"inputType\":\"pic\"} }" inputType失效
                    tableColumnComment= JSON.parseObject(column_comment.replaceAll("\"","'"), TableColumnComment.class);
//                    if(tableColumnComment.getSave()!=null){
//                        if(InputTypeEnum.select.equals(tableColumnComment.getSave().getInputType())
//                                ||InputTypeEnum.radio.equals(tableColumnComment.getSave().getInputType())){
//                            if(tableColumnComment.getSave().getSelectContent()==null)
//                                throw new OpsException("inputType为select,radio,checkbox时,必须指定selectContent");
//                        }
//                    }
                }
                catch (Exception e){
                    throw new CommonException("字段["+column_name+"]解析错误,错误信息:"+e.getMessage());
                }
                String lableName=tableColumnComment.getLableName();
                if(Strings.isNullOrEmpty(lableName)){
                    throw new CommonException("字段["+column_name+"]未指定lableName");
                }
                NeedList needList=tableColumnComment.getList();
                if(needList!=null){
                    needList.setField(column_name);
                    needList.setTitle(lableName);
                    //如果指定了拖动排序字段,那么所有列都不能手动排序
                    if(order!=null){
                        needList.setSortable(false);
                    }
                    needListList.add(needList);
                }
                NeedSearch needSearch=tableColumnComment.getSearch();
                if(needSearch!=null){
                    needSearch.setColumnName(column_name);
                    needSearch.setLableName(lableName);
                    needSearch.setDataType(data_type);
                    needSearchList.add(needSearch);
                }
                //如果不是自增长,才能新增或编辑
                if(!"auto_increment".equals(extra)){
                    NeedSave needSave=tableColumnComment.getSave();
                    if(needSave!=null){
                        //如果是主键,此字段不能编辑
                        if(column_name.equalsIgnoreCase(primaryKey)){
                            needSave.setEdit(false);
                        }
                        needSave.setLableName(lableName);
                        needSave.setColumnName(column_name);
                        needSave.setDataType(data_type);
                        needSave.setRequired("YES".equals(is_nullable)?false:true);
                        //解码正则表达式
                        StaticUtil.decodeRegular(needSave);
                        needSaveList.add(needSave);
                    }
                }
            }
            if(column_name.equalsIgnoreCase(primaryKey))
                returnMap.put("primaryKey",primaryKey);
        }
        returnMap.put("table",needListList);
        returnMap.put("search",needSearchList);
        returnMap.put("save",needSaveList);
        return returnMap;
    }
}
