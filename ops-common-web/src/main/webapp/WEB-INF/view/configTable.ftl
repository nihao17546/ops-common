<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>表信息配置</title>

    <link href="/ops-common-web/static/plugins/hplus/css/bootstrap.min14ed.css" rel="stylesheet">
    <link href="/ops-common-web/static/css/admin-base.css" rel="stylesheet">
    <link href="/ops-common-web/static/css/base.css" rel="stylesheet">
    <!--<script>if(window.top !== window.self){ window.top.location = window.location;}</script>-->
    <style>
        .btn-save{
            padding: 15px;
            border-top: 1px solid #e5e5e5;
            text-align: right;
        }
    </style>
</head>

<body class="gray-bg" style="width: 800px;overflow: auto;">
<div class="container-fluid">
    <div class="row">
        <div class="s-wrapper">
            <h4>表信息配置(${environment})</h4>
        </div>
        <ul class="nav nav-tabs">
            <li role="presentation" class="active li-tab" to="save"><a href="javascript:void(0)">新增</a></li>
            <li role="presentation" class="li-tab" to="edit"><a href="javascript:void(0)">编辑</a></li>
        </ul>


        <div class="content clearfix">
            <form id="form" class="form-horizontal">
                <div class="col-xs-12">
                    <div id="public-form">
                        <div class="form-group" id="configName-div">
                            <label for="configName" class="col-xs-3 control-label">配置名称<span style="color: red;">*</span>:</label>
                            <div class="col-xs-7">
                                <input data-name="name" tips = "请填写配置名称" required id="configName" class="form-control input-sm require-name"/>
                                <a href="#" id="btn-getToEdit" onclick="getToEdit()" class="btn btn-default btn-sm" style="display: none;">获取配置信息</a>
                                <input type="hidden" data-name="id" id="configId">
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label for="dbConnect" class="col-xs-3 control-label">数据库连接<span style="color: red;">*</span>:</label>
                            <div class="col-xs-7">
                                <select data-name="connectId" tips = "请选择数据库连接" required id="dbConnect" class="form-control input-sm require-name">
                                    <#list connects as connect>
                                    <option value="${connect.id}">${connect.name}</option>
                                    </#list>
                                </select>
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label for="tableSchema" class="col-xs-3 control-label">schema<span style="color: red;">*</span>:</label>
                            <div class="col-xs-7">
                                <input data-name="tableSchema" required tips="请填写schema" id="tableSchema" class="form-control input-sm require-name" placeholder="请输入业务表所在数据库"/>
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label for="tableName" class="col-xs-3 control-label">业务主表表名<span style="color: red;">*</span>:</label>
                            <div class="col-xs-7">
                                <input data-name="tableName" required tips="请填写主表表名" id="tableName" class="form-control input-sm require-name" placeholder="请输入业务表主表的表名"/>
                            </div>
                        </div>
                    </div>
                    <div id="comment-form">
                        <div class="form-group edit-hide">
                            <label for="title" class="col-xs-3 control-label">页面title<span style="color: red;">*</span>:</label>
                            <div class="col-xs-7">
                                <input data-name="title" required tips="请填写页面title" id="title" class="form-control input-sm require-name" placeholder="请输入页面title"/>
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label for="export" class="col-xs-3 control-label">是否提供excel导出功能:</label>
                            <div class="col-xs-7">
                                <select data-name="export" autocomplete = "off" id="export" class="form-control pull-left require-name">
                                    <option value="false">否</option>
                                    <option value="true">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label for="save" class="col-xs-3 control-label">是否提供新增功能:</label>
                            <div class="col-xs-7">
                                <select data-name="save" autocomplete = "off" id="save" class="form-control pull-left require-name">
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label for="delete" class="col-xs-3 control-label">是否提供删除功能:</label>
                            <div class="col-xs-7">
                                <select data-name="delete" autocomplete = "off" id="delete" class="form-control pull-left require-name">
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label for="edit" class="col-xs-3 control-label">是否提供编辑功能:</label>
                            <div class="col-xs-7">
                                <select data-name="edit" autocomplete = "off" id="edit" class="form-control pull-left require-name">
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label for="defaultOrderColumn" class="col-xs-3 control-label">主表默认排序字段:</label>
                            <div class="col-xs-7">
                                <input data-name="defaultOrderColumn" id="defaultOrderColumn" class="form-control input-sm require-name" placeholder="主表默认排序字段"/>
                            </div>
                        </div>
                        <div class="form-group" id="div-defaultSort" style="display: none;">
                            <label for="defaultSort" class="col-xs-3 control-label">主表默认排序方式:</label>
                            <div class="col-xs-7">
                                <select autocomplete = "off" id="defaultSort" class="form-control pull-left require-name">
                                    <option value="desc">倒序</option>
                                    <option value="asc">正序</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" id="div-isOrder" style="display: none;">
	                        <label for="isOrder" class="col-xs-3 control-label">是否拖动排序(不分页):</label>
	                        <div class="col-xs-7">
	                            <label class="checkbox-inline">
	                                <input id="isOrder" type="checkbox">&nbsp;
	                            </label>
	                        </div>
	                    </div>
                    </div>
                    <div class="col-xs-12" style="border-top: 1px solid #e5e5e5;margin-bottom: 10px;"></div>
                    <div class="form-group edit-hide">
                        <label for="follow" class="col-xs-3 control-label">是否有从表:</label>
                        <div class="col-xs-7">
                            <label class="checkbox-inline">
                                <input id="follow" type="checkbox">&nbsp;
                            </label>
                        </div>
                    </div>
                    <div id="div-follow" style="display: none;">
                        <div class="form-group">
                            <label for="followTableName" class="col-xs-3 control-label">从表表名<span style="color: red;">*</span>:</label>
                            <div class="col-xs-7">
                                <input data-name="tableName" required tips="请填写从表表名" id="followTableName" class="form-control input-sm require-name" placeholder="请输入从表的表名"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="foreignKey" class="col-xs-3 control-label">从表外键<span style="color: red;">*</span>:</label>
                            <div class="col-xs-7">
                                <input data-name="foreignKey" required tips="请填写从表外键" id="foreignKey" class="form-control input-sm require-name" placeholder="请输入从表的外键"/>
                            </div>
                        </div>
                        <div class="form-group" style="display: none;">
                            <label for="followSize" class="col-xs-3 control-label">主从关系:</label>
                            <div class="col-xs-7">
                                <select data-name="followSize" autocomplete = "off" id="followSize" class="form-control pull-left require-name">
                                    <option value="-1" selected>一对多</option>
                                    <option value="1">一对一</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group edit-hide">
                            <label class="col-xs-3 control-label">是否提供excel导出功能:</label>
                            <div class="col-xs-7">
                                <select data-name="export" autocomplete = "off" id="follow_export" class="form-control pull-left require-name">
                                    <option value="false">否</option>
                                    <option value="true">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">是否提供新增功能:</label>
                            <div class="col-xs-7">
                                <select id="follow-save" data-name="save" autocomplete = "off" class="form-control pull-left require-name">
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">是否提供删除功能:</label>
                            <div class="col-xs-7">
                                <select id="follow-delete" data-name="delete" autocomplete = "off" class="form-control pull-left require-name">
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-xs-3 control-label">是否提供编辑功能:</label>
                            <div class="col-xs-7">
                                <select  id="follow-edit" data-name="edit" autocomplete = "off" class="form-control pull-left require-name">
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="order" class="col-xs-3 control-label">从表拖动排序字段:</label>
                            <div class="col-xs-7">
                                <input data-name="order" id="order" class="form-control input-sm require-name" placeholder="拖动排序,若没有可以不填"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="btn-save">
            <a type="button" class="btn btn-default btn-sm" href="/ops-common-web/config/index">返回</a>
            <button class="btn btn-primary btn-sm" id="savePages" type="save">保存</button>
        </div>
    </div>
</div>

<script src="/ops-common-web/static/plugins/hplus/js/jquery.min.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/bootstrap.min.js"></script>
<script src="/ops-common-web/static/js/libs/noty/noty.js"></script>
<script src="/ops-common-web/static/js/base.js"></script>
<script type="text/javascript">
    var formHtml;
    $(function () {
        formHtml=$('#form').html();
        init();
        $('.li-tab').click(function () {
            if($(this).hasClass('active')){
                return;
            }
            $('.li-tab').removeClass('active');
            $(this).addClass('active');
            $('#form').html(formHtml);
            init();
            var to=$(this).attr('to');
            if(to=='edit'){
                $('#savePages').attr('type','edit');
                $('.edit-hide').hide();
                $('#btn-getToEdit').show();
            }
        })
        $('#savePages').click(function () {
            $('#savePages').attr('disabled',true);
            var inputs=$('#public-form').find("[data-name]");
            var postData={};
            for(var i=0;i<inputs.length;i++){
                var key=$(inputs[i]).attr('data-name'),value=$.trim($(inputs[i]).val());
                if($(inputs[i]).attr('required')){
                    if(!value){
                        var tip=$(inputs[i]).attr('tips');
                        notify.warn(tip);
                        $('#savePages').removeAttr("disabled");
                        return;
                    }
                }
                if(value){
                    postData[key]=value;
                }
            }
            inputs=$('#comment-form').find("[data-name]");
            var postDataA={};
            for(var i=0;i<inputs.length;i++){
                var key=$(inputs[i]).attr('data-name'),value=$.trim($(inputs[i]).val());
                if($(inputs[i]).attr('required')){
                    if(!value){
                        var tip=$(inputs[i]).attr('tips');
                        notify.warn(tip);
                        $('#savePages').removeAttr("disabled");
                        return;
                    }
                }
                if(value){
                    postDataA[key]=value;
                }
            }
            if($('#isOrder').is(':checked')){
                postDataA.isOrder=true;
            }
            if($('#follow').is(':checked')){
                var postDataFollow={};
                inputs=$('#div-follow').find("[data-name]");
                for(var i=0;i<inputs.length;i++){
                    var key=$(inputs[i]).attr('data-name'),value=$.trim($(inputs[i]).val());
                    if($(inputs[i]).attr('required')){
                        if(!value){
                            var tip=$(inputs[i]).attr('tips');
                            notify.warn(tip);
                            $('#savePages').removeAttr("disabled");
                            return;
                        }
                    }
                    if(value){
                        postDataFollow[key]=value;
                    }
                }
                postDataA.follow=postDataFollow;
            }
            postData.comment=postDataA;
            $.ajax({
                type : 'post',
                url : '/ops-common-web/config/saveMeta',
                data : JSON.stringify(postData),
                contentType:'application/json',
                dataType : 'json',
                success : function (data) {
                    if(data.code==200){
                        alert("操作成功");
                        self.location.href="/ops-common-web/config/index";
                    }
                    else{
                        notify.error(data.message);
                        $('#savePages').removeAttr("disabled");
                    }
                },
                error : function(errorThrown) {
                    notify.error("操作失败:"+errorThrown.status+" "+errorThrown.statusText);
                    $('#savePages').removeAttr("disabled");
                }
            });
        })
    })

    function init() {
        // 主表默认排序字段
        $('#defaultOrderColumn').bind('input propertychange', function() {
            if($.trim($(this).val())==''){
                $('#div-defaultSort').hide();
                $('#div-isOrder').hide();
                $('#defaultSort').removeAttr('data-name');
            }
            else{
                $('#div-defaultSort').show();
                $('#div-isOrder').show();
                $('#defaultSort').attr('data-name','defaultSort');
            }
        });
        // 主表拖动排序
        $('#isOrder').change(function () {
            if($(this).is(':checked')){
                $('#defaultSort').find("option[value='asc']").prop("selected",true).change();
                $('#defaultSort').prop('disabled',true);
            }
            else{
                $('#defaultSort').prop('disabled',false);
            }
        });
        // 从表
        $('#follow').change(function () {
            if($(this).is(':checked')){
                $('#div-follow').show();
            }
            else{
                $('#div-follow').hide();
            }
        });
    }

    function getToEdit() {
        var configName = $.trim($('#configName').val());
        if(configName==''){
            notify.info("请填写配置名称");
            return;
        }
        $.ajax({
            type : 'post',
            url : '/ops-common-web/config/getMeta',
            data : {
                configName : configName
            },
            dataType : 'json',
            success : function (data) {
                if(data.code==200){
                    $('#configName').prop('disabled',true);
                    $('#btn-getToEdit').attr('disabled',true);
                    $('#btn-getToEdit').removeAttr('onclick');

                    $('#configId').val(data.data.id);
                    $('#dbConnect').val(data.data.connectId);
                    $('#tableSchema').val(data.data.tableSchema);
                    $('#tableName').val(data.data.tableName);
                    $('#title').val(data.data.comment.title);
                    $('#export').val(data.data.comment.export+"");
                    $('#save').val(data.data.comment.save+"");
                    $('#edit').val(data.data.comment.edit+"");
                    $('#delete').val(data.data.comment.delete+"");
                    if(data.data.comment.defaultOrderColumn){
                        $('#defaultOrderColumn').val(data.data.comment.defaultOrderColumn);
                        if(data.data.comment.defaultSort){
                            $('#defaultSort').val(data.data.comment.defaultSort);
                        }
                        $('#div-defaultSort').show();
                        $('#defaultSort').attr('data-name','defaultSort');
                        $('#div-isOrder').show();
                        if(data.data.comment.isOrder){
                            $('#isOrder').prop('checked',true);
                            $('#defaultSort').prop('disabled',true);
                        }
                    }
                    if(data.data.comment.follow){
                        $('#follow').prop('checked',true);
                        $('#followTableName').val(data.data.comment.follow.tableName);
                        $('#foreignKey').val(data.data.comment.follow.foreignKey);
                        $('#followSize').val(data.data.comment.follow.followSize);
                        $('#order').val(data.data.comment.follow.order);
                        $('#follow-save').val(data.data.comment.follow.save+"");
                        $('#follow-edit').val(data.data.comment.follow.edit+"");
                        $('#follow-delete').val(data.data.comment.follow.delete+"");
                        $('#follow_export').val(data.data.comment.follow.export+"");
                        $('#follow').change();
                    }
                    $('.edit-hide').show();
                }
                else{
                    notify.error(data.message);
                }
            },
            error : function(errorThrown) {
                notify.error("操作失败:"+errorThrown.status+" "+errorThrown.statusText);
            }
        })
    }
</script>
</body>
</html>