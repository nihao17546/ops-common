function isNum(val) {
    if (isNaN(val)) {
        return false;
    }
    return true;
}

<!-- s:搜索表单serialize -->
function serializeJsonSearch(o) {
    var inputs=$(o).find("[data-name]");
    var resultObj=[];
    for(var i=0;i<inputs.length;i++){
        var obj={};
        var input_lable=$(inputs[i]).prev().html();
        var input_name=$(inputs[i]).attr('data-name');
        var judge_type=$(inputs[i]).attr('judge-type');
        var data_type=$(inputs[i]).attr('data-type');
        var input_value=$(inputs[i]).val();
        //下拉菜单所有,跳过
        if(input_value=='ALL_OPTIONS'){
            continue;
        }
        if(input_value!=""){
            if(input_name.endsWith("-sdate")){
                input_name=input_name.substring(0,input_name.length-6);
                input_value=input_value+" 00:00:00";
            }
            else if(input_name.endsWith("-edate")){
                input_name=input_name.substring(0,input_name.length-6);
                input_value=input_value+" 23:59:59";
            }
            obj.columnName=input_name;
            obj.judgeType=judge_type;
            obj.dataType=data_type;
            if(data_type=='int'||data_type=='bigint'){
                //var valueInt=parseInt(input_value);
                if(isNum(input_value)){
                    obj.inputValue=input_value;
                }
                else{
                    notify.warn(input_lable+"格式错误");
                    return undefined;
                }
            }
            else{
                obj.inputValue=input_value;
            }
            resultObj.push(obj);
        }
    }
    return resultObj;
};
<!-- e:搜索表单serialize -->

<!-- s: 新增表单serialize -->
function serializeJsonSave(o,followBatchKey) {
    var inputs=$(o).find("[data-name]");
    var resultObj=[];
    for(var i=0;i<inputs.length;i++){
        var obj={};
        var column_type=$(inputs[i]).attr('column-type');
        var input_lable=$(inputs[i]).parent().prev().html();
        var input_name=$(inputs[i]).attr('data-name');
        var data_type=$(inputs[i]).attr('data-type');
        var require=$(inputs[i]).attr('require');
        var input_type=$(inputs[i]).attr('input-type');
        obj.columnType=column_type;
        obj.columnName=input_name;
        var input_value="";
        if(column_type=='com'||column_type=='fk'||column_type=='pk'){
            if(input_type=='pic'||input_type=='voice'){
                input_value=$(inputs[i]).attr('src');
            }
            else if(input_type=='radio'){
                input_value=$(inputs[i]).find("input[type='radio']:checked").val();
            }
            else if(input_type=='checkbox'){
                ////checkbox待开发
            }
            else if(input_type=='rich'){
                var ifram = $(inputs[i]).prev().find('iframe');
                input_value = $(ifram[0].contentWindow.document).find('.ke-content').html();
            }
            else{
                input_value=$(inputs[i]).val();
                if(input_value!=''){
                    var reqStr=$(inputs[i]).attr('data-regular');
                    if(reqStr&&reqStr!=''){
                        var reg=new RegExp(reqStr);
                        if(!reg.test(input_value)){
                            var placeholder=$(inputs[i]).attr('placeholder');
                            notify.warn(input_lable+"校验失败:"+placeholder);
                            return undefined;
                        }
                    }
                }
            }
            if(input_value&&input_value!=""){
                // 批量操作不校验
                if(followBatchKey&&followBatchKey!=''){
                    obj.batchKey=true;
                    obj.inputValue=input_value;
                }
                else if(data_type=='int'||data_type=='bigint'){
                    //var valueInt=parseInt(input_value);
                    if(isNum(input_value)){
                        obj.inputValue=input_value;
                    }
                    else{
                        notify.warn(input_lable+"格式错误");
                        return undefined;
                    }
                }
                else{
                    obj.inputValue=input_value;
                    //resultObj.push(obj);
                }
            }
            if(require=='true'&&!obj.inputValue){
                notify.warn(input_lable+"为必输项");
                return undefined;
            }
        }
        resultObj.push(obj);
    }
    return resultObj;
};
<!-- e: 新增表单serialize -->

<!-- s: 获取新增编辑表单html -->
function getSaveHtml(saveContents,orderColumnName,batchKey) {
    var app="";
    for(var i=0;i<saveContents.length;i++){
        var saveContent=saveContents[i];
        if(orderColumnName&&saveContent.columnName==orderColumnName){//如果字段是排序字段

        }
        else{
            if(batchKey&&saveContent.columnName==batchKey){
                var tips="请输入声音id，多个声音id用,分隔",regular="";
                if(saveContent.regular){
                    regular=saveContent.regular;
                }
                app=app+"<div class='form-group'>"
                    +"<label for='"+saveContent.columnName+"' "
                    +"class='col-xs-2 control-label'>"+saveContent.lableName+"</label>"
                    +"<div class='col-xs-10'>"
                    +"<textarea input-type='"+saveContent.inputType+"' " +
                    "data-type='"+saveContent.dataType+"' " +
                    "column-type='"+saveContent.columnType+"' " +
                    "require='"+saveContent.required+"' " +
                    "data-edit='"+saveContent.edit+"' " +
                    "data-name='"+saveContent.columnName+"' class='form-control input-sm'" +
                    " placeholder='"+tips+"'" +
                    " data-regular='"+regular+"'/>"
                    +"</div></div>";
            }
            // auto_increment已排除
            else if(saveContent.columnType=='pk'){
                var tips="",regular="";
                if(saveContent.tips){
                    tips=saveContent.tips;
                }
                if(saveContent.regular){
                    regular=saveContent.regular;
                }
                app=app+"<div class='form-group'>"
                    +"<label for='"+saveContent.columnName+"' "
                    +"class='col-xs-2 control-label'>"+saveContent.lableName+"</label>"
                    +"<div class='col-xs-10'>"
                    +"<input type='text' input-type='"+saveContent.inputType+"' " +
                    "data-type='"+saveContent.dataType+"' " +
                    "column-type='"+saveContent.columnType+"' " +
                    "require='"+saveContent.required+"' " +
                    "data-edit='"+saveContent.edit+"' " +
                    "data-name='"+saveContent.columnName+"' class='form-control input-sm'" +
                    " placeholder='"+tips+"'" +
                    " data-regular='"+regular+"'/>"
                    +"</div></div>";
            }
            else if(saveContent.columnType=='com'){
                var tips="",regular="";
                if(saveContent.tips){
                    tips=saveContent.tips;
                }
                if(saveContent.regular){
                    regular=saveContent.regular;
                }

                if(saveContent.inputType=='text'){
                    app=app+"<div class='form-group'>"
                        +"<label for='"+saveContent.columnName+"' "
                        +"class='col-xs-2 control-label'>"+saveContent.lableName+"</label>"
                        +"<div class='col-xs-10'>"
                        +"<input type='text' input-type='"+saveContent.inputType+"' " +
                        "data-type='"+saveContent.dataType+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        "data-name='"+saveContent.columnName+"' class='form-control input-sm'" +
                        " placeholder='"+tips+"'" +
                        " data-regular='"+regular+"'/>"
                        +"</div></div>";
                }
                else if(saveContent.inputType=='pic'){
                    app=app+"<div class='form-group'>" +
                        "<label for='"+saveContent.columnName+"'" +
                        "class='col-xs-2 control-label'>"+saveContent.lableName+"</label>" +
                        "<div class='col-xs-10'>" +
                        "<div class='image-uploader' ";
                    if(saveContent.picUploadConf){
                        if(saveContent.picUploadConf.imageSize){
                            app=app+"data-size='"+saveContent.picUploadConf.imageSize+"' ";
                        }
                        if(saveContent.picUploadConf.width){
                            app=app+"data-width='"+saveContent.picUploadConf.width+"' ";
                        }
                        if(saveContent.picUploadConf.height){
                            app=app+"data-height='"+saveContent.picUploadConf.height+"' ";
                        }
                        if(saveContent.picUploadConf.supportImage){
                            var sapp=[];
                            for(var j=0;j<saveContent.picUploadConf.supportImage.length;j++){
                                sapp.push(saveContent.picUploadConf.supportImage[j]);
                            }
                            app=app+"data-support='"+JSON.stringify(sapp)+"' ";
                        }
                        if(saveContent.picUploadConf.upImageUrl){
                            app=app+"data-extraurl='"+saveContent.picUploadConf.upImageUrl+"' ";
                        }
                    }
                    app=app+">上传图片</div><div style='position: absolute;left: 100px;top: 0px;line-height: 34px;font-size: 13px;color: grey;'>"+tips+"</div>" +
                        "<img alt='未上传' input-type='"+saveContent.inputType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "data-name='"+saveContent.columnName+"'" +
                        " style='max-width: 300px;max-height: 150px;' src=''/><button class='btn btn-default btn-sm' style='margin-left: 8px;vertical-align: top;'>删除</button></div></div>";
                }
                else if(saveContent.inputType=='select'){//下拉菜单
                    app=app+"<div class='form-group'>"
                        +"<label for='"+saveContent.columnName+"' "
                        +"class='col-xs-2 control-label'>"+saveContent.lableName+"</label>"
                        +"<div class='col-xs-10'>" +
                        "<select class='form-control input-sm' " +
                        "data-type='"+saveContent.dataType+"' " +
                        "input-type='"+saveContent.inputType+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        "data-name='"+saveContent.columnName+"'>";
                    if(saveContent.selectContent){
                        $.each(saveContent.selectContent,function (key, value) {
                            app=app+"<option value='"+key+"'>"+value+"</option>";
                        });
                    }
                    else if(saveContent.dataSource){
                        $.ajax({
                            type:'post',
                            async:false,
                            url:'/ops-simple-web/getDataSource',
                            contentType:'application/json',
                            dataType:'json',
                            data:JSON.stringify(saveContent.dataSource),
                            success:function (data1) {
                                if(data1.code==200){
                                    var selectContent=data1.data;
                                    for(var kk=0;kk<selectContent.length;kk++){
                                        app=app+"<option value='"+selectContent[kk].k+"'>"+selectContent[kk].v+"</option>";
                                    }
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
                    app=app+"</select></div></div> ";
                }
                else if(saveContent.inputType=='date'){//日期
                    app=app+"<div class='form-group'>"
                        +"<label for='"+saveContent.columnName+"' "
                        +"class='col-xs-2 control-label'>"+saveContent.lableName+"</label>"
                        +"<div class='col-xs-10'>"
                        +"<input type='text' input-type='"+saveContent.inputType+"' " +
                        "data-type='"+saveContent.dataType+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        "data-name='"+saveContent.columnName+"' class='form-control input-sm date'" +
                        " placeholder='"+tips+"'/>"
                        +"</div></div>";
                }
                else if(saveContent.inputType=='datetime'){
                    app=app+"<div class='form-group'>"
                        +"<label for='"+saveContent.columnName+"' "
                        +"class='col-xs-2 control-label'>"+saveContent.lableName+"</label>"
                        +"<div class='col-xs-10'>"
                        +"<input type='text' input-type='"+saveContent.inputType+"' " +
                        "data-type='"+saveContent.dataType+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        "data-name='"+saveContent.columnName+"' class='form-control input-sm datetime'" +
                        " placeholder='"+tips+"'/>"
                        +"</div></div>";
                }
                else if(saveContent.inputType=='voice'){
                    app=app+"<div class='form-group'>" +
                        "<label for='"+saveContent.columnName+"'" +
                        "class='col-xs-2 control-label'>"+saveContent.lableName+"</label>" +
                        "<div class='col-xs-10'>" +
                        "<div class='video-picker' ";
                    if(saveContent.audioUploadConf){
                        if(saveContent.audioUploadConf.supportAudio){
                            var sapp=[];
                            for(var j=0;j<saveContent.audioUploadConf.supportAudio.length;j++){
                                sapp.push(saveContent.audioUploadConf.supportAudio[j]);
                            }
                            app=app+"data-support='"+JSON.stringify(sapp)+"' ";
                        }
                        if(saveContent.audioUploadConf.transCoding){
                            app=app+"data-trans='"+saveContent.audioUploadConf.transCoding+"' ";
                            if(saveContent.audioUploadConf.timeOut){
                                app=app+"data-timeout='"+saveContent.audioUploadConf.timeOut+"' ";
                            }
                        }
                        if(saveContent.audioUploadConf.maxAudioLenght){
                            app=app+"data-len='"+saveContent.audioUploadConf.maxAudioLenght+"' ";
                        }
                        if(saveContent.audioUploadConf.upAudioUrl){
                            app=app+"data-extraurl='"+saveContent.audioUploadConf.upAudioUrl+"' ";
                        }
                    }
                    app=app+">上传音频</div><div style='position: absolute;left: 100px;top: 0px;line-height: 34px;font-size: 13px;color: grey;'>"+tips+"</div>" +
                        "<audio controls preload input-type='"+saveContent.inputType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "data-name='"+saveContent.columnName+"'" +
                        "></audio><button class='btn btn-default btn-sm ios' style='margin-left: 8px;vertical-align: top;' >删除</button>" +
                        "<h5 class='text-tips'></h5>" +
                        "</div></div>";
                }
                else if(saveContent.inputType=='radio'){
                    app=app+"<div class='form-group'>" +
                        "<label for='"+saveContent.columnName+"' " +
                        "class='col-xs-2 control-label'>"+saveContent.lableName+"</label>" +
                        "<div class='col-xs-10'><div class='radio' " +
                        "data-name='"+saveContent.columnName+"' " +
                        "data-type='"+saveContent.dataType+"' " +
                        "input-type='"+saveContent.inputType+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        ">";
                    if(saveContent.selectContent){
                        $.each(saveContent.selectContent,function (key, value) {
                            app=app+"<label class='radio-inline'>" +
                                "<input type='radio' " +
                                "name='"+saveContent.columnName+"' " +
                                "value='"+key+"'" +
                                "" +
                                ">"+value+"</label>";
                        });
                    }
                    else if(saveContent.dataSource){
                        $.ajax({
                            type:'post',
                            async:false,
                            url:'/ops-simple-web/getDataSource',
                            contentType:'application/json',
                            dataType:'json',
                            data:JSON.stringify(saveContent.dataSource),
                            success:function (data1) {
                                if(data1.code==200){
                                    var selectContent=data1.data;
                                    for(var kk=0;kk<selectContent.length;kk++){
                                        app=app+"<label class='radio-inline'>" +
                                            "<input type='radio' " +
                                            "name='"+saveContent.columnName+"' " +
                                            "value='"+selectContent[kk].k+"'" +
                                            "" +
                                            ">"+selectContent[kk].v+"</label>";
                                    }
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
                    app=app+"</div></div></div> ";
                }
                else if(saveContent.inputType=='checkbox'){
                    app=app+"<div class='form-group'>" +
                        "<label for='"+saveContent.columnName+"' " +
                        "class='col-xs-2 control-label'>"+saveContent.lableName+"</label>" +
                        "<div class='col-xs-10'><div " +
                        "data-name='"+saveContent.columnName+"' " +
                        "data-type='"+saveContent.dataType+"' " +
                        "input-type='"+saveContent.inputType+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        ">";
                    if(saveContent.selectContent){
                        $.each(saveContent.selectContent,function (key, value) {
                            app=app+"<label class='checkbox-inline'>" +
                                "<input type='checkbox' " +
                                "value='"+key+"'" +
                                "" +
                                ">"+value+"</label>";
                        });
                    }
                    app=app+"</div></div></div> ";
                }
                else if(saveContent.inputType=='textarea'){
                    app=app+"<div class='form-group'>"
                        +"<label for='"+saveContent.columnName+"' "
                        +"class='col-xs-2 control-label'>"+saveContent.lableName+"</label>"
                        +"<div class='col-xs-10'>"
                        +"<textarea input-type='"+saveContent.inputType+"' " +
                        "data-type='"+saveContent.dataType+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        "data-name='"+saveContent.columnName+"' class='form-control input-sm'" +
                        " placeholder='"+tips+"'" +
                        " data-regular='"+regular+"'/>"
                        +"</div></div>";
                }
                else if(saveContent.inputType=='rich'){
                    // var cuuid = guid();
                    app=app+"<div class='form-group'>"
                        +"<label for='"+saveContent.columnName+"' "
                        +"class='col-xs-2 control-label'>"+saveContent.lableName+"</label>"
                        +"<div class='col-xs-10'>"
                        +"<textarea class='kindeditor' input-type='"+saveContent.inputType+"' " +
                        "data-type='"+saveContent.dataType+"' " +
                        "column-type='"+saveContent.columnType+"' " +
                        "require='"+saveContent.required+"' " +
                        "data-edit='"+saveContent.edit+"' " +
                        "data-name='"+saveContent.columnName+"' class='form-control input-sm'" +
                        " placeholder='"+tips+"'" +
                        " data-regular='"+regular+"'/>"
                        +"</div></div>";
                }
            }
            else{
                app=app+"<input type='hidden' " +
                    "data-name='"+saveContent.columnName+"' " +
                    "column-type='"+saveContent.columnType+"' " +
                    "data-edit='"+saveContent.edit+"' " +
                    ">";
            }
        }
    }
    return app;
};
<!-- s: 获取新增编辑表单html -->

<!-- s: 获取搜索表单html -->
function getSearchHtml(searchInputs) {
    if(searchInputs.length==0){
        return "";
    }
    var app="<form id='searchForm'>";
    for(var i=0;i<searchInputs.length;i++){
        if(searchInputs[i].inputType=='select'){//下拉菜单
            app=app+"<div class='form-group'><label>"
                +searchInputs[i].lableName+":"
                +"</label>"
                +"<select class='form-control input-sm' " +
                "data-type='"+searchInputs[i].dataType+"' " +
                "judge-type='eq' " +
                "data-name='"+searchInputs[i].columnName+"'>";
            if(searchInputs[i].selectContent){
                app=app+"<option value='ALL_OPTIONS'>所有</option>";
                $.each(searchInputs[i].selectContent,function (key, value) {
                    if(key!='ALL_OPTIONS'){
                        app=app+"<option value='"+key+"'>"+value+"</option>";
                    }
                });
            }
            else if(searchInputs[i].dataSource){
                $.ajax({
                    type:'post',
                    async:false,
                    url:'/ops-simple-web/getDataSource',
                    contentType:'application/json',
                    dataType:'json',
                    data:JSON.stringify(searchInputs[i].dataSource),
                    success:function (data1) {
                        if(data1.code==200){
                            app=app+"<option value='ALL_OPTIONS'>所有</option>";
                            var selectContent=data1.data;
                            for(var kk=0;kk<selectContent.length;kk++){
                                if(selectContent[kk].k!='ALL_OPTIONS'){
                                    app=app+"<option value='"+selectContent[kk].k+"'>"+selectContent[kk].v+"</option>";
                                }
                            }
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
            app=app+"</select></div> ";
        }
        else if(searchInputs[i].inputType=='date'){//日期
            if(searchInputs[i].judgeType=='bt'){
                app=app+"<div class='form-group'><label>"
                    +searchInputs[i].lableName+":"
                    +"</label>"
                    +"<input judge-type='gteq' data-type='"+searchInputs[i].dataType+"' data-name='"+searchInputs[i].columnName+"-sdate' "
                    +"type='text' class='form-control input-sm date' /> - "
                    +"<input judge-type='lteq' data-type='"+searchInputs[i].dataType+"' data-name='"+searchInputs[i].columnName+"-edate' "
                    +"type='text' class='form-control input-sm date' />"
                    +"</div> ";
            }
            else{
                app=app+"<div class='form-group'><label>"
                    +searchInputs[i].lableName+":"
                    +"</label>"
                    +"<input judge-type='"+searchInputs[i].judgeType+"' data-type='"+searchInputs[i].dataType+"' data-name='"+searchInputs[i].columnName+"' "
                    +"type='text' class='form-control input-sm date' />"
                    +"</div> ";
            }
        }
        else if(searchInputs[i].inputType=='datetime'){
            if(searchInputs[i].judgeType=='bt'){
                app=app+"<div class='form-group'><label>"
                    +searchInputs[i].lableName+":"
                    +"</label>"
                    +"<input judge-type='gteq' data-type='"+searchInputs[i].dataType+"' data-name='"+searchInputs[i].columnName+"-sdate' "
                    +"type='text' class='form-control input-sm datetime' /> - "
                    +"<input judge-type='lteq' data-type='"+searchInputs[i].dataType+"' data-name='"+searchInputs[i].columnName+"-edate' "
                    +"type='text' class='form-control input-sm datetime' />"
                    +"</div> ";
            }
            else{
                app=app+"<div class='form-group'><label>"
                    +searchInputs[i].lableName+":"
                    +"</label>"
                    +"<input judge-type='"+searchInputs[i].judgeType+"' data-type='"+searchInputs[i].dataType+"' data-name='"+searchInputs[i].columnName+"' "
                    +"type='text' class='form-control input-sm datetime' />"
                    +"</div> ";
            }
        }
        else{
            app=app+"<div class='form-group'><label>"
                +searchInputs[i].lableName+":"
                +"</label>"
                +"<input judge-type='"+searchInputs[i].judgeType+"' " +
                "data-type='"+searchInputs[i].dataType+"' " +
                "type='text' class='form-control input-sm' " +
                "data-name='"+searchInputs[i].columnName+"' />"
                +"</div> ";
        }
    }

    app=app+"<div class='form-group form-submit'><i class='fa fa-search'></i>" +
        "<input id='search-btn' type='button' "
        +"class='btn btn-default btn-sm j-query' value='查询'/></div>";
    app=app+"</div></form>";
    return app;
};
<!-- e: 获取搜索表单html -->

function initForm(form,param, after) {
    $.ajax({
        type : 'post',
        url : param.url,
        data : JSON.stringify(param.data),
        contentType:'application/json',
        dataType : 'json',
        success : function(data) {
            if (data.code == 200) {
                if(data.data.one2one){
                    if(data.data.a){
                        for ( var key in data.data.a) {
                            var input=$(form).find('.save-main-form').find('[data-name="'+key+'"]');
                            if($(input).attr('input-type')=='pic'||$(input).attr('input-type')=='voice'){
                                $(input).attr('src',data.data.a[key]);
                                if($(input).attr('data-edit')!='true'){
                                    $(input).prev().prev().hide();
                                    $(input).prev().hide();
                                    $(input).next().hide();
                                }
                            }
                            else if($(input).attr('input-type')=='radio'){
                                var radios=$(input).find("input[type='radio']");
                                for(var k=0;k<radios.length;k++){
                                    if($(radios[k]).attr('value')==data.data[key]){
                                        $(radios[k]).attr("checked","checked");
                                        break;
                                    }
                                }
                                if($(input).attr('data-edit')!='true'){
                                    $(input).find("input[type='radio']").attr('disabled',true);
                                }
                            }
                            else if($(input).attr('input-type')=='rich'){
                                var ifram = $(input).prev().find('iframe');
                                $(ifram[0].contentWindow.document).find('.ke-content').html(data.data[key]);
                            }
                            else{
                                $(input).val(data.data.a[key]);
                                if($(input).attr('data-edit')!='true'){
                                    $(input).attr('disabled',true);
                                }
                            }
                        }
                    }
                    if(data.data.b){
                        for ( var key in data.data.b) {
                            var input=$(form).find('.save-main-follow-form').find('[data-name="'+key+'"]');
                            if($(input).attr('input-type')=='pic'||$(input).attr('input-type')=='voice'){
                                $(input).attr('src',data.data.b[key]);
                                if($(input).attr('data-edit')!='true'){
                                    $(input).prev().prev().hide();
                                    $(input).prev().hide();
                                    $(input).next().hide();
                                }
                            }
                            else if($(input).attr('input-type')=='radio'){
                                var radios=$(input).find("input[type='radio']");
                                for(var k=0;k<radios.length;k++){
                                    if($(radios[k]).attr('value')==data.data[key]){
                                        $(radios[k]).attr("checked","checked");
                                        break;
                                    }
                                }
                                if($(input).attr('data-edit')!='true'){
                                    $(input).find("input[type='radio']").attr('disabled',true);
                                }
                            }
                            else if($(input).attr('input-type')=='rich'){
                                var ifram = $(input).prev().find('iframe');
                                $(ifram[0].contentWindow.document).find('.ke-content').html(data.data[key]);
                            }
                            else{
                                $(input).val(data.data.b[key]);
                                if($(input).attr('data-edit')!='true'){
                                    $(input).attr('disabled',true);
                                }
                            }
                        }
                    }
                }
                else{
                    for ( var key in data.data) {
                        var input=$(form).find('[data-name="'+key+'"]');
                        if($(input).attr('input-type')=='pic'||$(input).attr('input-type')=='voice'){
                            $(input).attr('src',data.data[key]);
                            if($(input).attr('data-edit')!='true'){
                                $(input).prev().prev().hide();
                                $(input).prev().hide();
                                $(input).next().hide();
                            }
                        }
                        else if($(input).attr('input-type')=='radio'){
                            var radios=$(input).find("input[type='radio']");
                            for(var k=0;k<radios.length;k++){
                                if($(radios[k]).attr('value')==data.data[key]){
                                    $(radios[k]).attr("checked","checked");
                                    break;
                                }
                            }
                            if($(input).attr('data-edit')!='true'){
                                $(input).find("input[type='radio']").attr('disabled',true);
                            }
                        }
                        else if($(input).attr('input-type')=='rich'){
                            var ifram = $(input).prev().find('iframe');
                            $(ifram[0].contentWindow.document).find('.ke-content').html(data.data[key]);
                        }
                        else{
                            if(typeof data.data[key] =='boolean'){
                                if(data.data[key]){
                                    $(input).val("1");
                                }
                                else{
                                    $(input).val("0");
                                }
                            }
                            else{
                                $(input).val(data.data[key]);
                            }
                            if($(input).attr('data-edit')!='true'){
                                $(input).attr('disabled',true);
                            }
                        }
                    }
                }
            }
            else {
                notify.error(data.message);
            }
            if(typeof(after)!='undefined'){
                after();
            }
        },
        error : function(errorThrown) {
            notify.error(errorThrown.status+" "+errorThrown.statusText);
        }
    });
}

function followEditFun(o) {
    var columns=[];
    var inputs=$('#save-follow-form').find('[data-name]');
    for(var i=0;i<inputs.length;i++){
        columns.push($(inputs[i]).attr('data-name'));
    }
    if(columns.length==0){
        notify.warn("从表没有配置编辑字段");
        return;
    }
    // var editHtml = $('#save-follow-html').html();
    var height=$(self).height()-20,
        width=$(self).width();
    if(width>600) width=600;
    var primaryKey=$(o).attr('data-pk'),
        primaryKeyValue=$(o).attr('data-pkv');
    layer.open({
        type:1,
        title:'编辑',
        hadeClose: true,
        shade: 0.5,
        area: [width+'px', height+'px'],
        content:followHtml,
        skin: 'layui-layer-lan',
        success:function (layero, index) {
            var postParam={
                primaryKey:primaryKey,
                primaryKeyValue:primaryKeyValue,
                tableSchema:mainParam.tableSchema,
                tableName:mainParam.follow.tableName,
                columns:columns,
                metaId:metaId
            };
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
            var postData=serializeJsonSave($(layero).find('.save-follow-form')[0]);
            if(typeof(postData)!='undefined'){
                var requestData={};
                requestData.mainstay=mainstay;
                requestData.primaryKey=primaryKey;
                requestData.primaryKeyValue=primaryKeyValue;
                requestData.main=postData;
                requestData.tableSchema=mainParam.tableSchema;
                requestData.mainTableName=mainParam.follow.tableName;
                requestData.metaId=metaId;
                $(layero).find('.layui-layer-btn0').hide();
                $.ajax({
                    type:'post',
                    url:'/ops-simple-web/update',
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
};

function followDeleteFun(o) {
    Lobibox.confirm({
        title:"确认",
        msg:"确定要删除？",
        callback:function($this, type, ev){
            if(type==='yes'){
                var postData={
                    mainstay:mainstay,
                    tableSchema:mainParam.tableSchema,
                    followTableName:mainParam.follow.tableName,
                    followTablePKey:$(o).attr('data-pk'),
                    followTablePKeyValue:$(o).attr('data-pkv'),
                    metaId:metaId
                };
                if(mainParam.follow.order){
                    postData.order=mainParam.follow.order;
                    postData.followTableFKey=mainParam.follow.foreignKey;
                    postData.primaryKeyValue=$(o).attr('data-fkv');
                }
                $.ajax({
                    type:'post',
                    url:'/ops-simple-web/deleteFollow',
                    contentType:'application/json',
                    dataType:'json',
                    data:JSON.stringify(postData),
                    success:function (data1) {
                        if(data1.code==200){
                            data_table_follow.bootstrapTable('refresh');
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
};

function initVoice($videoPicker){
    $videoPicker.each(function () {
        var $this = $(this);
        var audioConf={};
        audioConf.$audio=$this.next().next();
        audioConf.$audioTips=$this.nextAll('.text-tips');
        audioConf.$delBtn=$this.next().next().next();
        if($this.attr('data-support')){
            audioConf.supportAudio=eval("("+$this.attr('data-support')+")");
        }
        if($this.attr('data-trans')){
            audioConf.transCoding=Boolean($this.attr('data-trans'));
        }
        if($this.attr('data-timeout')){
            audioConf.timeOut=parseInt($this.attr('data-timeout'));
        }
        if($this.attr('data-len')){
            audioConf.maxAudioLenght=parseInt($this.attr('data-len'));
        }
        if($this.attr('data-extraurl')){
            audioConf.upAudioUrl=$this.attr('data-extraurl');
        }
        $this.uploadAudio(audioConf);
    });
};

function initPic($imgPicker) {
    $imgPicker.each(function(){
        var $this = $(this);
        var picConf={};
        picConf.$image=$this.next().next('img');
        picConf.$delBtn=$this.next().next().next();
        if($this.attr('data-support')){
            picConf.supportImage=eval("("+$this.attr('data-support')+")");
        }
        if($this.attr('data-size')){
            picConf.imageSize=parseInt($this.attr('data-size'))*1024;
        }
        if($this.attr('data-width')){
            picConf.width=$this.attr('data-width');
        }
        if($this.attr('data-height')){
            picConf.height=$this.attr('data-height');
        }
        if($this.attr('data-extraurl')){
            picConf.upImageUrl=$this.attr('data-extraurl');
        }
        $this.uploadImage(picConf);
    });
};

function initRich() {
    KindEditor.create('.kindeditor',{
        resizeType:1,
        skinType:'tinymce',
        width:'100%',
        uploadJson:'/ops-simple-web/upload',
        tranformUploadUrl: function(url) {
            return url;
        }
    });
}

function foldFun(o) {
    if($(o).html()=='折叠'){
        var selects=data_table.bootstrapTable('getSelections');
        var selected=selects[0];
        if(selected==undefined){
            notify.warn('请选择一条记录');
            return false;
        }
        $(data_table).find('tr').hide();
        $(data_table).find('tr').eq(0).show();
        $(data_table).find('input:radio[name="btSelectItem"]:checked').parent().parent().show();
        $(o).html("展开");
    }
    else if($(o).html()=='展开'){
        $(data_table).find('tr').show();
        $(o).html("折叠");
    }
};

function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}