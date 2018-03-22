var data_table,data_table_follow;

var followHtml="";
var followBatchHtml="";

var mainListUid = [],followListUid = [];
$(function () {
    var initData;
    var p = {
        meta:mainParam,
        metaId:metaId
    }
    $.ajax({
        type:'post',
        url:'/ops-simple-web/init',
        async: false,
        contentType:'application/json',
        data:JSON.stringify(p),
        dataType:'json',
        success:function (data) {
            if(data.code!=200){
                notify.warn(data.message);
                return;
            }
            initData=data;
        },
        error : function(errorThrown) {
            notify.error(errorThrown.status+" "+errorThrown.statusText);
        }
    });

    if(initData){
        if(initData.follow && initData.follow.save){
            for(var pp=0;pp<initData.follow.save.length;pp++){
                if(initData.follow.save[pp].columnType == 'uuid' || initData.follow.save[pp].columnType == 'cuid'){
                    followListUid.push(initData.follow.save[pp].columnName);
                }
            }
        }
        if(initData.main){
            if(initData.main.save){
                for(var pp=0;pp<initData.main.save.length;pp++){
                    if(initData.main.save[pp].columnType == 'uuid' || initData.main.save[pp].columnType == 'cuid'){
                        mainListUid.push(initData.main.save[pp].columnName);
                    }
                }
            }
            <!-- s:搜索表单 -->
            if(initData.main.search){
                $('#search-div').append(getSearchHtml(initData.main.search));
                $(".date").on("focus", function () {
                    WdatePicker({dateFmt: 'yyyy-MM-dd'});
                });
                $(".datetime").on("focus", function () {
                    WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'});
                });
            }
            <!-- e:搜索表单 -->

            <!-- s:列表 -->
            if(initData.main.table){
                <!-- s:主表 -->
                if(true){
                    var primaryKey=initData.main.primaryKey;
                    var followPrimaryKey;
                    if(initData.follow&&initData.follow.primaryKey){
                        followPrimaryKey=initData.follow.primaryKey;
                    }
                    var tableContent=initData.main.table;
                    var columnArray=[],tableHeads=[];
                    var columnSate={};
                    columnSate.field='state';
                    columnSate.radio=true;
                    columnSate.align='center';
                    columnSate.valign='middle';
                    columnArray.push(columnSate);
                    //tableContent中是否有primaryKey
                    var ifHashprimaryKey=0;
                    for(var i=0;i<tableContent.length;i++){
                        var columnBbj={};
                        if(tableContent[i].field==primaryKey){
                            ifHashprimaryKey=1;
                        }
                        if(tableContent[i].field.toLowerCase()==primaryKey.toLowerCase()){
                            // 拖动排序
                            columnBbj.formatter=function (value) {
                                return value+"<input class='row-id' type='hidden' value='"+value+"'>";
                            }
                        }
                        columnBbj.field=tableContent[i].field;
                        columnBbj.title=tableContent[i].title;
                        // 拖动排序禁用下面功能
                        if (mainParam.isOrder)
                            columnBbj.sortable=false;
                        else
                            columnBbj.sortable=tableContent[i].sortable;
                        columnBbj.align=tableContent[i].align;
                        columnBbj.valign=tableContent[i].valign;
                        columnBbj.extendColumns=tableContent[i].extendColumns;
                        columnBbj.extendSource=tableContent[i].extendSource;
                        if(tableContent[i].width){
                            columnBbj.width=tableContent[i].width;
                        }
                        if(tableContent[i].formatter){
                            if(tableContent[i].formatter.type=='pic'){
                                columnBbj.formatter=function (value) {
                                    return "<img style='max-width: 90px;max-height: 100px;' alt='未上传' src='"+value+"'/>";
                                };
                            }
                            else if(tableContent[i].formatter.type=='text'){
                                var fff={};
                                if(tableContent[i].formatter.map){
                                    $.each(tableContent[i].formatter.map,function (key, value) {
                                        fff[key]=value;
                                    });
                                }
                                else if(tableContent[i].formatter.dataSource){
                                    getDataSource(tableContent[i].formatter.dataSource,fff);
                                }
                                columnBbj.fff=fff;
                                columnBbj.formatter=function (value) {
                                    if($(this)[0].fff[value]){
                                        return $(this)[0].fff[value];
                                    }
                                    else{
                                        return value;
                                    }
                                }
                            }
                        }
                        columnArray.push(columnBbj);
                        tableHeads.push(columnBbj);
                        // 暂时只支持声音和专辑的标题
                        if (columnBbj.extendColumns&&columnBbj.extendColumns.length>0&&columnBbj.extendSource) {
                            for (var n=0;n<columnBbj.extendColumns.length;n++) {
                                var extendColumn = columnBbj.extendColumns[n]
                                if (extendColumn=='title') {
                                    if (columnBbj.extendSource=='track') {
                                        var columnBbj2={};
                                        columnBbj2.field='trackTitle';
                                        columnBbj2.title='声音标题';
                                        columnBbj2.sortable=false;
                                        columnBbj2.align=columnBbj.align;
                                        columnBbj2.valign=columnBbj.valign;
                                        columnBbj2.formatter=function (value) {
                                            var index = value.lastIndexOf(',');
                                            var title = value.substring(0,index);
                                            var url = value.substring(index+1);
                                            return "<a href='"+url+"' target='_blank'>"+title+"</a>";
                                        };
                                        columnArray.push(columnBbj2);
                                    } else if (columnBbj.extendSource=='album') {
                                        var columnBbj2={};
                                        columnBbj2.field='albumTitle';
                                        columnBbj2.title='专辑标题';
                                        columnBbj2.sortable=false;
                                        columnBbj2.align=columnBbj.align;
                                        columnBbj2.valign=columnBbj.valign;
                                        columnBbj2.formatter=function (value) {
                                            var index = value.lastIndexOf(',');
                                            var title = value.substring(0,index);
                                            var url = value.substring(index+1);
                                            return "<a href='"+url+"' target='_blank'>"+title+"</a>";
                                        };
                                        columnArray.push(columnBbj2);
                                    }
                                }
                            }
                        }
                    }
                    //如果tableContent中没有primaryKey,那么需要tableHeads中添加上
                    if(ifHashprimaryKey==0){
                        var columnBbj={};
                        if(mainParam.follow&&mainParam.follow.followSize&&mainParam.follow.followSize==1){
                            columnBbj.field="a."+primaryKey;
                        }
                        else{
                            columnBbj.field=primaryKey;
                        }
                        tableHeads.push(columnBbj);
                    }
                    $("#table-div").append("<table id='data_table' data-mobile-responsive='true'></table>");
                    data_table=$('#data_table');

                    // 拖动排序禁用下面的分页功能(sizeNum:1000相当于禁用)
                    var sizeNum=10;
                    var sizeList=[10, 25, 50, 100];
                    if (mainParam.isOrder) {
                        sizeNum=1000;
                        sizeList=[];
                    }
                    var data_table_bootstrap={
                        method:'post',
                        //classes:'table table-bordered',
                        url:'/ops-simple-web/list',
                        pagination:'true',
                        pageSize:sizeNum,
                        pageList:sizeList,
                        sidePagination:'server',
                        idField:primaryKey,
                        contentType:'application/json',
                        queryParamsType:'undefined',
                        toolbar:'#toolbar',
                        clickToSelect:true,
                        sortOrder:'desc',
                        queryParams:function (params) {
                            var newFormObj = {};
                            var searchForm=$('#searchForm');
                            if(searchForm){
                                var formArray = serializeJsonSearch($('#searchForm'));
                                if(typeof(formArray)=='undefined'){
                                    return false;
                                }
                                newFormObj.searchParam=formArray;
                            }

                            newFormObj.tableHeads=tableHeads;
                            newFormObj.tableSchema=mainParam.tableSchema;
                            newFormObj.tableName=mainParam.tableName;
                            newFormObj.primaryKey=primaryKey;
                            if(mainParam.follow&&mainParam.follow.tableName){
                                if(mainParam.follow.followSize==1){//如果是一对一的关系
                                    newFormObj.followTableName=mainParam.follow.tableName;
                                    newFormObj.followTableFKey=mainParam.follow.foreignKey;
                                    newFormObj.primaryKey=primaryKey;
                                }
                                else{//一对多的关系

                                }
                            }
                            var postData = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                                pageSize: params.pageSize,   //页面大小
                                pageNumber: params.pageNumber,  //页码
                                sortName: params.sortName,  //排序列名
                                sortOrder: params.sortOrder,//排位命令（desc，asc）
                                param: newFormObj,
                                metaId:metaId,
                                uidColunms:mainListUid
                            };
                            return postData;
                        },
                        onLoadSuccess:function(data){
                            if(data.code!=200){
                                notify.warn(data.message);
                            }
                            else{
                                if(data.rows.length==0&&data.total>0){
                                    data_table.bootstrapTable('refresh');
                                }
                                else{
                                    if(data_table_follow){
                                        $('#ppk').val('-1');
                                        data_table_follow.bootstrapTable('removeAll');
                                    }
                                    $(data_table).find('tr').show();
                                    $("#fold_btn").html("折叠");
                                }
                            }
                        },
                        onLoadError:function (status) {
                            //notify.error(status);
                        },
                        onCheck:function(row){
                            if(data_table_follow){
                                $('#ppk').val(row[primaryKey]);
                                data_table_follow.bootstrapTable('refresh');
                            }
                        },
                        onSort:function(name, order){
                        },
                        onUncheck:function(row){
                        },
                        onRefresh:function(params){
                        },
                        onPageChange:function(number, size){
                        },
                        columns: columnArray
                    }
                    if(mainParam.defaultOrderColumn){
                        if(mainParam.follow&&mainParam.follow.followSize&&mainParam.follow.followSize==1){
                            data_table_bootstrap.sortName="a."+mainParam.defaultOrderColumn;
                        }
                        else{
                            data_table_bootstrap.sortName=mainParam.defaultOrderColumn;
                        }
                        data_table_bootstrap.sortOrder=mainParam.defaultSort;
                    }
                    data_table.bootstrapTable(data_table_bootstrap);

                    //主表拖动排序
                    if(mainParam.isOrder){
                        var sortDiv=document.getElementById('data_table').getElementsByTagName('tbody')[0];
                        new Sortable(sortDiv, {
                            group: "omega",
                            forceFallback: true,
                            animation: 150,
                            onEnd: function (e) {
                                var changePositionParam = {},order_index=1;
                                var idArray=[];
                                $(sortDiv).children('tr').each(function () {
                                    if($(this).find('.row-id').val()){
                                        var m={};
                                        m.order=order_index++;
                                        m.primaryKey=$(this).find('.row-id').val();
                                        idArray.push(m);
                                    }
                                });
                                if(idArray.length>0){
                                    changePositionParam.mainstay=mainstay;
                                    changePositionParam.list=idArray;
                                    changePositionParam.tableSchema=mainParam.tableSchema;
                                    changePositionParam.tableName=mainParam.tableName;
                                    changePositionParam.order=mainParam.defaultOrderColumn;
                                    changePositionParam.primaryKey=primaryKey;
                                    changePositionParam.metaId=metaId;
                                    $.ajax({
                                        type:'post',
                                        url:'/ops-simple-web/changePosition',
                                        contentType:'application/json',
                                        data:JSON.stringify(changePositionParam),
                                        dataType:'json',
                                        success:function(data){
                                            if(data.code!=200){
                                                notify.error(data.message);
                                            }
                                            else {
                                                data_table.bootstrapTable('refresh');
                                                data_table_follow.bootstrapTable('refresh');
                                            }
                                        },
                                        error : function(errorThrown) {
                                            notify.error(errorThrown.status+" "+errorThrown.statusText);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
                <!-- e:主表 -->

                <!-- s:从表 -->
                if(initData.follow&&initData.follow.table){
                    var followTableHeads,followColumnArray;
                    ifHashprimaryKey=0;
                    $("#table-div").append("<table id='data_table_follow' data-mobile-responsive='true'></table>");
                    data_table_follow=$('#data_table_follow');
                    followColumnArray=[],followTableHeads=[];
                    for(var k=0;k<initData.follow.table.length;k++){
                        var columnBbj={};
                        if(initData.follow.table[k].field==followPrimaryKey){
                            ifHashprimaryKey=1;
                        }
                        columnBbj.field=initData.follow.table[k].field;
                        columnBbj.title=initData.follow.table[k].title;
                        columnBbj.sortable=initData.follow.table[k].sortable;
                        columnBbj.align=initData.follow.table[k].align;
                        columnBbj.valign=initData.follow.table[k].valign;
                        columnBbj.extendColumns=initData.follow.table[k].extendColumns;
                        columnBbj.extendSource=initData.follow.table[k].extendSource;
                        if(initData.follow.table[k].width){
                            columnBbj.width=initData.follow.table[k].width;
                        }
                        if(initData.follow.table[k].formatter){
                            if(initData.follow.table[k].formatter.type=='pic'){
                                columnBbj.formatter=function (value) {
                                    return "<img style='max-width: 90px;max-height: 100px;' alt='未上传' src='"+value+"'/>";
                                };
                            }
                            else if(initData.follow.table[k].formatter.type=='text'){
                                var fff={};
                                if(initData.follow.table[k].formatter.map){
                                    $.each(initData.follow.table[k].formatter.map,function (key, value) {
                                        fff[key]=value;
                                    });
                                }
                                else if(initData.follow.table[k].formatter.dataSource){
                                    getDataSource(initData.follow.table[k].formatter.dataSource,fff);
                                }
                                columnBbj.fff=fff;
                                columnBbj.formatter=function (value) {
                                    if($(this)[0].fff[value]){
                                        return $(this)[0].fff[value];
                                    }
                                    else{
                                        return value;
                                    }
                                }
                            }
                        }
                        followColumnArray.push(columnBbj);
                        followTableHeads.push(columnBbj);
                        // 暂时只支持声音和专辑的标题
                        if (columnBbj.extendColumns&&columnBbj.extendColumns.length>0&&columnBbj.extendSource) {
                            for (var n=0;n<columnBbj.extendColumns.length;n++) {
                                var extendColumn = columnBbj.extendColumns[n]
                                if (extendColumn=='title') {
                                    if (columnBbj.extendSource=='track') {
                                        var columnBbj2={};
                                        columnBbj2.field='trackTitle';
                                        columnBbj2.title='声音标题';
                                        columnBbj2.sortable=false;
                                        columnBbj2.align=columnBbj.align;
                                        columnBbj2.valign=columnBbj.valign;
                                        columnBbj2.formatter=function (value) {
                                            var index = value.lastIndexOf(',');
                                            var title = value.substring(0,index);
                                            var url = value.substring(index+1);
                                            return "<a href='"+url+"' target='_blank'>"+title+"</a>";
                                        };
                                        followColumnArray.push(columnBbj2);
                                    } else if (columnBbj.extendSource=='album') {
                                        var columnBbj2={};
                                        columnBbj2.field='albumTitle';
                                        columnBbj2.title='专辑标题';
                                        columnBbj2.sortable=false;
                                        columnBbj2.align=columnBbj.align;
                                        columnBbj2.valign=columnBbj.valign;
                                        columnBbj2.formatter=function (value) {
                                            var index = value.lastIndexOf(',');
                                            var title = value.substring(0,index);
                                            var url = value.substring(index+1);
                                            return "<a href='"+url+"' target='_blank'>"+title+"</a>";
                                        };
                                        followColumnArray.push(columnBbj2);
                                    }
                                }
                            }
                        }
                    }
                    if(ifHashprimaryKey==0){
                        var columnBbj={};
                        if(mainParam.follow&&mainParam.follow.followSize&&mainParam.follow.followSize==1){
                            columnBbj.field="b."+followPrimaryKey;
                        }
                        else{
                            columnBbj.field=followPrimaryKey;
                        }
                        followTableHeads.push(columnBbj);
                    }
                    var operate={
                        field:'operate-field',
                        title:'操作',
                        align:'center',
                        valign:'middle',
                        width:180,
                        formatter:function(value,row,index){
                            var app_operate="";
                            if(mainParam.follow){
                                if(mainParam.follow.edit){
                                    app_operate=app_operate+"<button onclick='followEditFun(this)' data-pk='"+followPrimaryKey+"' data-pkv='"+row[followPrimaryKey]+"' class='btn btn-default btn-xs btn-edit'>编辑</button>&nbsp;";
                                }
                                if(mainParam.follow.delete){
                                    app_operate=app_operate+"&nbsp;<button onclick='followDeleteFun(this)' data-fkv='"+$('#ppk').val()+"' data-pk='"+followPrimaryKey+"' data-pkv='"+row[followPrimaryKey]+"' class='btn btn-default btn-xs btn-del'>删除</button>";
                                }
                            }
                            app_operate=app_operate+"<input class='row-id' type='hidden' value='"+row[followPrimaryKey]+"'>";
                            return app_operate;
                        }
                    };
                    followColumnArray.push(operate);

                    data_table_follow.bootstrapTable({
                        method:'post',
                        url:'/ops-simple-web/followList',
                        idField:followPrimaryKey,
                        contentType:'application/json',
                        queryParamsType:'undefined',
                        queryParams:function(params){
                            var newFormObj={};
                            newFormObj.foreignKeyValue=$('#ppk').val();
                            newFormObj.followFKey=mainParam.follow.foreignKey;
                            newFormObj.tableHeads=followTableHeads;
                            newFormObj.tableSchema=mainParam.tableSchema;
                            newFormObj.tableName=mainParam.follow.tableName;
                            if(mainParam.follow.order){
                                newFormObj.order=mainParam.follow.order;
                            }
                            newFormObj.metaId = metaId;
                            newFormObj.uidColunms = followListUid;
                            return newFormObj;
                        },
                        onLoadSuccess:function(data){
                        },
                        onLoadError:function (status) {
                            //notify.error(status);
                        },
                        columns: followColumnArray
                    });

                    //从表拖动排序
                    if(data_table_follow &&mainParam.follow&& mainParam.follow.order){
                        var sortDiv=document.getElementById('data_table_follow').getElementsByTagName('tbody')[0];
                        new Sortable(sortDiv, {
                            group: "omega",
                            forceFallback: true,
                            animation: 150,
                            onEnd: function (e) {
                                var changePositionParam = {},order_index=1;
                                var idArray=[];
                                $(sortDiv).children('tr').each(function () {
                                    if($(this).find('.row-id').val()){
                                        var m={};
                                        m.order=order_index++;
                                        m.primaryKey=$(this).find('.row-id').val();
                                        idArray.push(m);
                                    }
                                });
                                if(idArray.length>0){
                                    changePositionParam.mainstay=mainstay;
                                    changePositionParam.list=idArray;
                                    changePositionParam.tableSchema=mainParam.tableSchema;
                                    changePositionParam.tableName=mainParam.follow.tableName;
                                    changePositionParam.order=mainParam.follow.order;
                                    changePositionParam.primaryKey=followPrimaryKey;
                                    changePositionParam.metaId=metaId;
                                    $.ajax({
                                        type:'post',
                                        url:'/ops-simple-web/changePosition',
                                        contentType:'application/json',
                                        data:JSON.stringify(changePositionParam),
                                        dataType:'json',
                                        success:function(data){
                                            if(data.code!=200){
                                                notify.error(data.message);
                                            }
                                            else {
                                                data_table_follow.bootstrapTable('refresh');
                                            }
                                        },
                                        error : function(errorThrown) {
                                            notify.error(errorThrown.status+" "+errorThrown.statusText);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
                <!-- e:从表 -->
            }
            <!-- e:列表 -->
        }

        <!-- s:主表新增、编辑 -->
        if(true){
            //主表单html(包括新增,和编辑)
            var saveHtml;
            if(initData.main&&initData.main.save){
                $('#save-main-form').html(getSaveHtml(initData.main.save));
                saveHtml = $('#save-main-html').html();
            }
            if(mainParam.export){
                $('#export').show().click(function () {
                    $('#loading').show();
                    $('body').css('overflow','hidden');
                    var $form=$("<form action='/ops-simple-web/excel/export/main' method='post' style='display: none'></form>");
                    var input1 = $("<input>");
                    input1.attr("name", "tableSchema");
                    input1.attr("value",mainParam.tableSchema);
                    $form.append(input1);
                    var input2 = $("<input>");
                    input2.attr("name", "tableName");
                    input2.attr("value",mainParam.tableName);
                    $form.append(input2);
                    var input3 = $("<input>");
                    input3.attr("name", "metaId");
                    input3.attr("value",metaId);
                    $form.append(input3);

                    var sortDiv = $('#data_table').find('.sortable');
                    var sortName = mainParam.defaultOrderColumn;
                    var sortOrder = mainParam.defaultSort;
                    for(var d=0;d<sortDiv.length;d++){
                        var sortDivClass = $(sortDiv[d]).attr('class').split(' ');
                        if(sortDivClass.length == 4){
                            sortName = $(sortDiv[d]).parent().attr('data-field');
                            sortOrder = sortDivClass[3];
                            break;
                        }
                    }

                    if(sortName){
                        var input4 = $("<input>");
                        input4.attr("name", "sortName");
                        input4.attr("value", sortName);
                        $form.append(input4);
                    }
                    if(sortOrder){
                        var input4 = $("<input>");
                        input4.attr("name", "sortOrder");
                        input4.attr("value", sortOrder);
                        $form.append(input4);
                    }
                    var hhh = $('#data_table').find('.fht-cell');
                    var excelTableHeads = [];
                    for(var p=0;p<hhh.length;p++){
                        var field = $(hhh[p]).parent().attr('data-field');
                        if(field != 'state'){
                            var title = $(hhh[p]).prev().html();
                            var needList = {
                                field: field,
                                title: title,
                                xmlWidth: $(hhh[p]).width()
                            }
                            excelTableHeads.push(needList)
                        }
                    }
                    var input5 = $("<input>");
                    input5.attr("name", "tableHeads");
                    input5.attr("value",JSON.stringify(excelTableHeads));
                    $form.append(input5);

                    var searchForm = $('#searchForm');
                    if(searchForm){
                        var formArray = serializeJsonSearch($('#searchForm'));
                        if(typeof(formArray) == 'undefined'){
                            return false;
                        }
                        var input6 = $("<input>");
                        input6.attr("name", "searchParam");
                        input6.attr("value",JSON.stringify(formArray));
                        $form.append(input6);
                    }
                    $('body').append($form);
                    $form.submit();
                    window.setTimeout(function () {
                        $('#loading').hide();
                        $('body').css('overflow','auto');
                        $form.remove();
                    },5000);
                })
            }
            if(mainParam.save){
                $('#save_btn').show().click(function(){
                    if(!saveHtml){
                        notify.warn("主表没有配置新增字段");
                        return;
                    }
                    var height=$(self).height()-20,
                        width=$(self).width();
                    if(width>600) width=600;
                    //if(height>500) height=500;
                    layer.open({
                        type:1,
                        title:'新增',
                        hadeClose: true,
                        shade: 0.5,
                        area: [width+'px', height+'px'],
                        content:saveHtml,
                        btn:['确认','取消'],
                        skin: 'layui-layer-lan',
                        yes:function(index, layero){
                            var postData=serializeJsonSave($(layero).find('.save-main-form')[0]);
                            if(typeof(postData)!='undefined'){
                                $(layero).find('.layui-layer-btn0').hide();
                                var requestData={};
                                requestData.primaryKey=primaryKey;
                                requestData.mainstay=mainstay;
                                requestData.main=postData;
                                requestData.tableSchema=mainParam.tableSchema;
                                requestData.mainTableName=mainParam.tableName;
                                requestData.metaId = metaId;
                                if(mainParam.isOrder)
                                    requestData.order=mainParam.defaultOrderColumn;
                                if(mainParam.follow&&mainParam.follow.followSize==1&&data.follow.save&&data.follow.save.length>0){
                                    var followPostData=serializeJsonSave($(layero).find('.save-main-follow-form')[0]);
                                    if(typeof(followPostData)!='undefined'){
                                        if(followPrimaryKey){
                                            requestData.followTablePKey=followPrimaryKey;
                                        }
                                        requestData.followTableName=mainParam.follow.tableName;
                                        requestData.followTableFKey=mainParam.follow.foreignKey;
                                        requestData.follow=followPostData;
                                    }
                                }
                                $.ajax({
                                    type:'post',
                                    url:'/ops-simple-web/saveMain',
                                    contentType:'application/json',
                                    data:JSON.stringify(requestData),
                                    success:function (data1) {
                                        if(data1.code==200){
                                            data_table.bootstrapTable('refresh');
                                            layer.close(index);
                                        }
                                        else{
                                            notify.warn(data1.message);
                                            $(layero).find('.layui-layer-btn0').show();
                                        }
                                    },
                                    error : function(errorThrown) {
                                        notify.error(errorThrown.status+" "+errorThrown.statusText);
                                        $(layero).find('.layui-layer-btn0').show();
                                    }
                                });
                            }
                        },
                        btn2:function(index, layero){
                            layer.close(index);
                        },
                        success:function (layero, index) {
                            var $imgPicker = $(layero).find(".image-uploader");
                            var $videoPicker = $(layero).find(".video-picker");
                            initPic($imgPicker);
                            initVoice($videoPicker);
                            $(layero).find('.date').on("focus", function () {
                                WdatePicker({dateFmt: 'yyyy-MM-dd'});
                            });
                            $(layero).find('.datetime').on("focus", function () {
                                WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'});
                            });
                            initRich();
                        }
                    });
                });
            }
            if(mainParam.edit){
                var columns=[];
                if(mainParam.follow&&mainParam.follow.tableName&&mainParam.follow.followSize==1){
                    var inputs=$('#save-main-form').find('[data-name]');
                    for(var i=0;i<inputs.length;i++){
                        columns.push("a."+$(inputs[i]).attr('data-name'));
                    }
                    inputs=$('#save-main-follow-form').find('[data-name]');
                    for(var i=0;i<inputs.length;i++){
                        columns.push("b."+$(inputs[i]).attr('data-name'));
                    }
                }
                else{
                    var inputs=$('#save-main-form').find('[data-name]');
                    for(var i=0;i<inputs.length;i++){
                        columns.push($(inputs[i]).attr('data-name'));
                    }
                }
                $('#edit_btn').show().click(function () {
                    if(!saveHtml||columns.length==0){
                        notify.warn("主表没有配置编辑字段");
                        return;
                    }
                    var selects=data_table.bootstrapTable('getSelections');
                    var selected=selects[0];
                    if(selected==undefined){
                        notify.warn('请选择一条记录');
                        return false;
                    }
                    else{
                        var primaryKeyValue;
                        if(mainParam.follow&&mainParam.follow.tableName&&mainParam.follow.followSize==1){//如果多表一对一,key需要加上'a.'
                            primaryKeyValue=selected.a[primaryKey];
                        }
                        else{
                            primaryKeyValue=selected[primaryKey];
                        }
                        if(primaryKeyValue){
                            var height=$(self).height()-20,
                                width=$(self).width();
                            if(width>600) width=600;
                            layer.open({
                                type:1,
                                title:'编辑',
                                hadeClose: true,
                                shade: 0.5,
                                area: [width+'px', height+'px'],
                                content:saveHtml,
                                skin: 'layui-layer-lan',
                                success:function (layero, index) {
                                    var postParam={
                                        primaryKey:primaryKey,
                                        primaryKeyValue:primaryKeyValue,
                                        tableSchema:mainParam.tableSchema,
                                        tableName:mainParam.tableName,
                                        columns:columns,
                                        metaId:metaId
                                    };
                                    if(mainParam.follow&&mainParam.follow.followSize==1){
                                        postParam.followTableName=mainParam.follow.tableName;
                                        postParam.followTableFKey=mainParam.follow.foreignKey;
                                    }
                                    var param={
                                        data:postParam,
                                        url:'/ops-simple-web/info'
                                    };
                                    initForm(layero,param);
                                    var $imgPicker = $(layero).find(".image-uploader");
                                    var $videoPicker = $(layero).find(".video-picker");
                                    initPic($imgPicker);
                                    initVoice($videoPicker);
                                    $(layero).find('.date').on("focus", function () {
                                        WdatePicker({dateFmt: 'yyyy-MM-dd'});
                                    });
                                    $(layero).find('.datetime').on("focus", function () {
                                        WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'});
                                    });
                                    initRich();
                                },
                                btn:['确认','取消'],
                                yes:function(index, layero){
                                    var postData=serializeJsonSave($(layero).find('.save-main-form')[0]);
                                    if(typeof(postData)!='undefined'){
                                        $(layero).find('.layui-layer-btn0').hide();
                                        var requestData={};
                                        requestData.mainstay=mainstay;
                                        requestData.primaryKey=primaryKey;
                                        requestData.primaryKeyValue=primaryKeyValue;
                                        requestData.main=postData;
                                        requestData.tableSchema=mainParam.tableSchema;
                                        requestData.mainTableName=mainParam.tableName;
                                        requestData.metaId=metaId;
                                        if(mainParam.follow&&mainParam.follow.followSize==1&&data.follow.save&&data.follow.save.length>0){
                                            var followPostData=serializeJsonSave($(layero).find('.save-main-follow-form')[0]);
                                            if(typeof(followPostData)!='undefined'){
                                                requestData.followTableName=mainParam.follow.tableName;
                                                requestData.followTableFKey=mainParam.follow.foreignKey;
                                                requestData.follow=followPostData;
                                            }
                                            else{
                                                return;
                                            }
                                        }
                                        $.ajax({
                                            type:'post',
                                            url:'/ops-simple-web/update',
                                            contentType:'application/json',
                                            data:JSON.stringify(requestData),
                                            success:function (data1) {
                                                if(data1.code==200){
                                                    data_table.bootstrapTable('refresh');
                                                    layer.close(index);
                                                }
                                                else{
                                                    notify.warn(data1.message);
                                                    $(layero).find('.layui-layer-btn0').show();
                                                }
                                            },
                                            error : function(errorThrown) {
                                                notify.error(errorThrown.status+" "+errorThrown.statusText);
                                                $(layero).find('.layui-layer-btn0').show();
                                            }
                                        });
                                    }
                                },
                                btn2:function(index, layero){
                                    layer.close(index);
                                },
                            });
                        }
                        else{
                            notify.warn('未找到主键');
                        }
                    }
                });
            }
        }
        <!-- e:主表新增、编辑 -->

        if(mainParam.follow){
            <!-- s:从表新增 -->
            if(initData.follow&&initData.follow.save){
                if(mainParam.follow.followSize==1){//如果是一对一
                    $('#save-main-follow-form').html(getSaveHtml(initData.follow.save,mainParam.follow.order));
                    $('#save-main-follow-form-div').show();
                }
                else{
                    $('#save-follow-form').html(getSaveHtml(initData.follow.save,mainParam.follow.order));
                    if(mainParam.follow.save){
                        followHtml=$('#save-follow-html').html();
                        $('#save_follow_btn').show().click(function () {
                            var selects=data_table.bootstrapTable('getSelections');
                            var selected=selects[0];
                            if(selected==undefined){
                                notify.warn('请选择一条记录');
                                return false;
                            }
                            else{
                                var fkValue=selected[primaryKey];
                                if(fkValue){
                                    var height=$(self).height()-20,
                                        width=$(self).width();
                                    if(width>600) width=600;
                                    layer.open({
                                        type:1,
                                        title:'新增',
                                        hadeClose: true,
                                        shade: 0.5,
                                        area: [width+'px', height+'px'],
                                        content:followHtml,
                                        skin: 'layui-layer-lan',
                                        success:function (layero, index) {
                                            //获取外键值
                                            $(layero).find('[data-name="'+mainParam.follow.foreignKey+'"]').val(fkValue);
                                            var $imgPicker = $(layero).find(".image-uploader");
                                            var $videoPicker = $(layero).find(".video-picker");
                                            initPic($imgPicker);
                                            initVoice($videoPicker);
                                            $(layero).find('.date').on("focus", function () {
                                                WdatePicker({dateFmt: 'yyyy-MM-dd'});
                                            });
                                            $(layero).find('.datetime').on("focus", function () {
                                                WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'});
                                            });
                                            initRich();
                                        },
                                        btn:['确认','取消'],
                                        yes:function(index, layero){
                                            var postData=serializeJsonSave($(layero).find('.save-follow-form')[0]);
                                            if(typeof(postData)!='undefined'){
                                                $(layero).find('.layui-layer-btn0').hide();
                                                var requestData={};
                                                if(followPrimaryKey){
                                                    requestData.followTablePKey=followPrimaryKey;
                                                }
                                                requestData.mainstay=mainstay;
                                                requestData.follow=postData;
                                                requestData.tableSchema=mainParam.tableSchema;
                                                requestData.followTableName=mainParam.follow.tableName;
                                                requestData.metaId = metaId;
                                                if(mainParam.follow.order){
                                                    requestData.order=mainParam.follow.order;
                                                    requestData.followTableFKey=mainParam.follow.foreignKey;
                                                    requestData.primaryKeyValue=fkValue;
                                                }
                                                $.ajax({
                                                    type:'post',
                                                    url:'/ops-simple-web/saveFollow',
                                                    contentType:'application/json',
                                                    data:JSON.stringify(requestData),
                                                    success:function (data1) {
                                                        if(data1.code==200){
                                                            data_table_follow.bootstrapTable('refresh');
                                                            layer.close(index);
                                                        }
                                                        else{
                                                            notify.warn(data1.message);
                                                            $(layero).find('.layui-layer-btn0').show();
                                                        }
                                                    },
                                                    error : function(errorThrown) {
                                                        notify.error(errorThrown.status+" "+errorThrown.statusText);
                                                        $(layero).find('.layui-layer-btn0').show();
                                                    }
                                                });
                                            }
                                        },
                                        btn2:function(index, layero){
                                            layer.close(index);
                                        },
                                    });
                                }
                                else{
                                    notify.warn('未找到主表主键');
                                }
                            }
                        });
                    }
                    if(mainParam.follow.export){
                        $('#follow_export').show().click(function () {
                            var selects=data_table.bootstrapTable('getSelections');
                            var selected=selects[0];
                            if(selected==undefined){
                                notify.warn('请选择一条记录');
                                return false;
                            }
                            else{
                                var fkValue=selected[primaryKey];
                                if(fkValue){
                                    var newFormObj={};
                                    newFormObj.foreignKeyValue=$('#ppk').val();
                                    newFormObj.followFKey=mainParam.follow.foreignKey;
                                    newFormObj.tableHeads=followTableHeads;
                                    newFormObj.tableSchema=mainParam.tableSchema;
                                    newFormObj.tableName=mainParam.follow.tableName;
                                    if(mainParam.follow.order){
                                        newFormObj.order=mainParam.follow.order;
                                    }
                                    newFormObj.metaId = metaId;
                                    newFormObj.uidColunms = followListUid;
                                    console.log(newFormObj)

                                    $('#loading').show();
                                    $('body').css('overflow','hidden');
                                    var $form=$("<form action='/ops-simple-web/excel/export/follow' method='post' style='display: none'></form>");
                                    var input1 = $("<input>");
                                    input1.attr("name", "tableSchema");
                                    input1.attr("value",mainParam.tableSchema);
                                    $form.append(input1);
                                    var input2 = $("<input>");
                                    input2.attr("name", "tableName");
                                    input2.attr("value",mainParam.follow.tableName);
                                    $form.append(input2);
                                    var input3 = $("<input>");
                                    input3.attr("name", "metaId");
                                    input3.attr("value",metaId);
                                    $form.append(input3);
                                    var input4 = $("<input>");
                                    input4.attr("name", "followFKey");
                                    input4.attr("value",mainParam.follow.foreignKey);
                                    $form.append(input4);
                                    var input5 = $("<input>");
                                    input5.attr("name", "foreignKeyValue");
                                    input5.attr("value", $('#ppk').val());
                                    $form.append(input5);
                                    if(mainParam.follow.order){
                                        var input6 = $("<input>");
                                        input6.attr("name", "order");
                                        input6.attr("value",mainParam.follow.order);
                                        $form.append(input6);
                                    }

                                    var hhh = $('#data_table_follow').find('.fht-cell');
                                    var excelTableHeads = [];
                                    for(var p=0;p<hhh.length;p++){
                                        var field = $(hhh[p]).parent().attr('data-field');
                                        if(field != 'state' && field != 'operate-field'){
                                            var title = $(hhh[p]).prev().html();
                                            var needList = {
                                                field: field,
                                                title: title,
                                                xmlWidth: $(hhh[p]).width()
                                            }
                                            excelTableHeads.push(needList)
                                        }
                                    }
                                    var input5 = $("<input>");
                                    input5.attr("name", "tableHeads");
                                    input5.attr("value",JSON.stringify(excelTableHeads));
                                    $form.append(input5);
                                    $('body').append($form);
                                    $form.submit();
                                    window.setTimeout(function () {
                                        $('#loading').hide();
                                        $('body').css('overflow','auto');
                                        $form.remove();
                                    },5000);

                                }
                                else{
                                    notify.warn('未找到主表主键');
                                }
                            }
                        })
                    }
                }
            }
            <!-- e:从表新增 -->
            <!-- s:从表批量新增 -->
            if(initData.follow&&initData.follow.save&&mainParam.follow.followBatchKey&&mainParam.follow.followBatchKey!=''){
                // 一对多
                if(mainParam.follow.followSize!=1){
                    $('#bat-save-follow-form').html(getSaveHtml(initData.follow.save,mainParam.follow.order,mainParam.follow.followBatchKey));
                    if(mainParam.follow.save){
                        followBatchHtml=$('#bat-save-follow-html').html();
                        $('#bat_save_follow_btn').show().click(function () {
                            var selects=data_table.bootstrapTable('getSelections');
                            var selected=selects[0];
                            if(selected==undefined){
                                notify.warn('请选择一条记录');
                                return false;
                            }
                            else{
                                var fkValue=selected[primaryKey];
                                if(fkValue){
                                    var height=$(self).height()-20,
                                        width=$(self).width();
                                    if(width>600) width=600;
                                    layer.open({
                                        type:1,
                                        title:'批量新增',
                                        hadeClose: true,
                                        shade: 0.5,
                                        area: [width+'px', height+'px'],
                                        content:followBatchHtml,
                                        skin: 'layui-layer-lan',
                                        success:function (layero, index) {
                                            //获取外键值
                                            $(layero).find('[data-name="'+mainParam.follow.foreignKey+'"]').val(fkValue);
                                            var $imgPicker = $(layero).find(".image-uploader");
                                            var $videoPicker = $(layero).find(".video-picker");
                                            initPic($imgPicker);
                                            initVoice($videoPicker);
                                            $(layero).find('.date').on("focus", function () {
                                                WdatePicker({dateFmt: 'yyyy-MM-dd'});
                                            });
                                            $(layero).find('.datetime').on("focus", function () {
                                                WdatePicker({dateFmt: 'yyyy-MM-dd HH:mm:ss'});
                                            });
                                            initRich();
                                        },
                                        btn:['确认','取消'],
                                        yes:function(index, layero){
                                            var postData=serializeJsonSave($(layero).find('.bat-save-follow-form')[0],mainParam.follow.followBatchKey);
                                            if(typeof(postData)!='undefined'){
                                                $(layero).find('.layui-layer-btn0').hide();
                                                var requestData={};
                                                if(followPrimaryKey){
                                                    requestData.followTablePKey=followPrimaryKey;
                                                }
                                                requestData.mainstay=mainstay;
                                                requestData.follow=postData;
                                                requestData.tableSchema=mainParam.tableSchema;
                                                requestData.followTableName=mainParam.follow.tableName;
                                                requestData.metaId = metaId;
                                                if(mainParam.follow.order){
                                                    requestData.order=mainParam.follow.order;
                                                    requestData.followTableFKey=mainParam.follow.foreignKey;
                                                    requestData.primaryKeyValue=fkValue;
                                                }
                                                $.ajax({
                                                    type:'post',
                                                    url:'/ops-simple-web/saveBatchFollow',
                                                    contentType:'application/json',
                                                    data:JSON.stringify(requestData),
                                                    success:function (data1) {
                                                        if(data1.code==200){
                                                            data_table_follow.bootstrapTable('refresh');
                                                            layer.close(index);
                                                        }
                                                        else{
                                                            notify.warn(data1.message);
                                                            $(layero).find('.layui-layer-btn0').show();
                                                        }
                                                    },
                                                    error : function(errorThrown) {
                                                        notify.error(errorThrown.status+" "+errorThrown.statusText);
                                                        $(layero).find('.layui-layer-btn0').show();
                                                    }
                                                });
                                            }
                                        },
                                        btn2:function(index, layero){
                                            layer.close(index);
                                        },
                                    });
                                }
                                else{
                                    notify.warn('未找到主表主键');
                                }
                            }
                        });
                    }
                }
            }
            <!-- e:从表批量新增 -->
        }

        <!-- s:主表删除 -->
        if(mainParam.delete){
            $('#del_btn').show().click(function () {
                var selects=data_table.bootstrapTable('getSelections');
                var selected=selects[0];
                if(selected==undefined){
                    notify.warn('请选择一条记录');
                    return false;
                }
                var primaryKeyValue;
                if(mainParam.follow&&mainParam.follow.tableName&&mainParam.follow.followSize==1){//如果多表一对一,key需要加上'a.'
                    primaryKeyValue=selected.a[primaryKey];
                }
                else{
                    primaryKeyValue=selected[primaryKey];
                }
                if(primaryKeyValue){
                    Lobibox.confirm({
                        title:"确认",
                        msg:"确定要删除？",
                        callback:function($this, type, ev){
                            if(type==='yes'){
                                var postData={
                                    mainstay:mainstay,
                                    tableSchema:mainParam.tableSchema,
                                    mainTableName:mainParam.tableName,
                                    primaryKey:primaryKey,
                                    primaryKeyValue:primaryKeyValue,
                                    metaId:metaId
                                };
                                if(mainParam.follow){
                                    postData.followTableName=mainParam.follow.tableName;
                                    postData.followTableFKey=mainParam.follow.foreignKey;
                                }
                                $.ajax({
                                    type:'post',
                                    url:'/ops-simple-web/delete',
                                    contentType:'application/json',
                                    dataType:'json',
                                    data:JSON.stringify(postData),
                                    success:function (data1) {
                                        if(data1.code==200){
                                            data_table.bootstrapTable('refresh');
                                        }
                                        else{
                                            notify.warn(data1.message);
                                        }
                                    },
                                    error : function(errorThrown) {
                                        notify.error(errorThrown.status+" "+errorThrown.statusText);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
        <!-- e:主表删除 -->


        //按钮绑定事件
        $('#search-btn').click(function () {
            data_table.bootstrapTable('selectPage',1);
        });
        if(mainParam.follow&&mainParam.follow.followSize!=1){
            $('#fold_btn').show();
        }
    }

});

function getDataSource(dataSource,fff) {
    $.ajax({
        type:'post',
        async:false,
        url:'/ops-simple-web/getDataSource',
        contentType:'application/json',
        dataType:'json',
        data:JSON.stringify(dataSource),
        success:function (data) {
            if(data.code==200){
                var selectContent=data.data;
                for(var kk=0;kk<selectContent.length;kk++){
                    fff[selectContent[kk].k]=selectContent[kk].v;
                }
                return fff;
            }
            else{
                notify.warn(data.message);
            }
        },
        error : function(errorThrown) {
            notify.error(errorThrown.status+" "+errorThrown.statusText);
        }
    });
}