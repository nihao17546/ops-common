<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字段信息配置</title>

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
        th,td{
            word-break: break-all;
        }
        .b-div{
            border:1px dashed #000;
            padding-top: 5px;
            padding-bottom: 5px;
            margin-top: 10px;
            margin-bottom: 10px;
            margin-left: 1px;
            margin-right: 1px;
            position: relative;
            background-color: aliceblue;
        }
        .b-div .b-tag{
            position: absolute;
            left: 5px;
            top:5px;
        }
    </style>
</head>

<body class="gray-bg" style="overflow: auto;">
<div class="container-fluid">
    <div class="row">
        <div class="s-wrapper">
            <h4>字段信息配置(${environment})</h4>
        </div>
        <div class="s-wrapper">
            配置名称:<input type="text" name="metaName" id="meta_name" class="input-sm" placeholder="请输入配置名称">&nbsp;&nbsp;
            <button class="btn btn-primary btn-sm" onclick="start()">开始进行配置</button>&nbsp;
            <a type="button" class="btn btn-default btn-sm" href="/ops-common-web/config/index">返回</a>
            <span style="color: red" id="config-hit"></span>
        </div>
        <div class="clearfix" style="display: none;padding: 15px;" id="config-main">
            <button class="btn btn-primary btn-sm" onclick="getMainTable()">获取主表结构</button>&nbsp;&nbsp;
            主表:<span id="mainTableSpan"></span>&nbsp;<button onclick="reloadMain()" class="btn btn-warning btn-xs">表结构重置</button><br><br>
            <div id="follow-div" style="display: none;">
                <button class="btn btn-primary btn-sm" onclick="getFollowTable()">获取从表结构</button>&nbsp;&nbsp;
                从表:<span id="followTableSpan"></span>&nbsp;<button onclick="reloadFollow()" class="btn btn-warning btn-xs">表结构重置</button>
            </div>
            <input type="text" name="schema" id="schema" style="display: none;">
            <input type="text" name="schema" id="mainTableName" style="display: none;">
            <input type="text" name="schema" id="followTableName" style="display: none;">
            <input type="text" id="meta_id" style="display: none;">
            <input type="text" id="connect_id" style="display: none;">
            <hr>
            <span id="testUrl"></span>
        </div>
        <div class="clearfix" style="display: none" id="config-content">
            <div id="table-name-show" table="" style="color: red;margin-left: 10px;"></div>
            <table id="table" class="table table-bordered table-striped table-hover text-center col-xs-12">
                <tr>
                    <th width="100">字段</th>
                    <th width="100">数据类型</th>
                    <!--<th>是否允许为空</th>-->
                    <!--<th>默认值</th>-->
                    <!--<th>其他信息</th>-->
                    <th>配置信息</th>
                    <th>操作</th>
                </tr>
            </table>
            <hr>
            <div id="form" class="container-fluid" style="display: none;">
                <input type="hidden" id="col-type" value="">
                <div class="row">
                    <form class="form-horizontal">
                        <div class="col-xs-10">
                            <div class="form-group">
                                <label class="col-xs-3 control-label">schema:</label>
                                <div class="col-xs-7">
                                    <input disabled data-name="tableSchema" required tips="请输入schema" id="tableSchema" class="form-control input-sm" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">表名:</label>
                                <div class="col-xs-7">
                                    <input disabled data-name="tableName" required tips="请输入表名" id="tableName" class="form-control input-sm" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">字段:</label>
                                <div class="col-xs-7">
                                    <input disabled data-name="columnName" required tips="请输入字段" id="columnName" class="form-control input-sm" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label">字段名称<span style="color: red;">*</span>:</label>
                                <div class="col-xs-7">
                                    <input data-name="lableName" required tips="请填写字段名称" id="lableName" class="form-control input-sm" placeholder="请输入字段名称"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-3 control-label">字段类型:</label>
                                <div class="col-xs-7">
                                    <select id="columnType" data-name="columnType" autocomplete = "off" class="form-control">
                                        <option value="com">普通字段</option>
                                        <option value="pk">主键</option>
                                        <option value="fk">外键</option>
                                        <option value="cdate">创建时间</option>
                                        <option value="udate">更新时间</option>
                                    </select>
                                </div>
                            </div>

                            <div class="b-div" data-tag="新增/编辑配置">
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">是否需要新增:</label>
                                    <div class="col-xs-7">
                                        <label class="checkbox-inline">
                                            <input id="save" type="checkbox">&nbsp;
                                        </label>
                                    </div>
                                </div>
                                <div id="save-div" style="display: none;">
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">是否允许编辑:</label>
                                        <div class="col-xs-7">
                                            <select id="edit" data-name="edit" autocomplete = "off" class="form-control">
                                                <option value="true">是</option>
                                                <option value="false">否</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div id="div-tips" class="form-group">
                                        <label class="col-xs-3 control-label">输入框提示信息:</label>
                                        <div class="col-xs-7">
                                            <input data-name="tips" id="tips" maxlength="35" class="form-control" placeholder="前端页面输入提示信息,字数限制35"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">前端input标签类型:</label>
                                        <div class="col-xs-7">
                                            <select id="save-inputType" data-name="inputType" autocomplete = "off" class="form-control">
                                                <option value="text">普通文本框</option>
                                                <option value="date">日期选择框</option>
                                                <option value="datetime">日期时间选择框</option>
                                                <option value="select">下拉菜单</option>
                                                <option value="radio">单选框</option>
                                                <option value="pic">图片上传</option>
                                                <option value="textarea">多行文本框</option>
                                                <option value="rich">富文本框</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div id="save-pic-div" data-tag="图片配置" class="b-div" style="display: none;">
                                        <div class="form-group">
                                            <label for="imageSize" class="col-xs-3 control-label">限制图片大小:</label>
                                            <div class="col-xs-7">
                                                <input data-name="imageSize" id="imageSize" class="form-control" placeholder="格式要求正整数,单位:k"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-xs-3 control-label">限制上传图片类型<span style="color: red;">*</span>:</label>
                                            <div class="col-xs-7">
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" name="supportImage" value="jpg">jpg
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" name="supportImage" value="jpeg">jpeg
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" name="supportImage" value="png">png
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" name="supportImage" value="gif">gif
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-xs-3 control-label">限制图片宽:</label>
                                            <div class="col-xs-7">
                                                <input data-name="width" class="form-control" placeholder="格式要求正整数,单位:px"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-xs-3 control-label">限制图片高:</label>
                                            <div class="col-xs-7">
                                                <input data-name="height" class="form-control" placeholder="格式要求正整数,单位:px"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="upAudioUrl" class="col-xs-3 control-label">指定接口地址:</label>
                                            <div class="col-xs-7">
                                                <input data-name="upImageUrl" id="upImageUrl" class="form-control input-sm" placeholder="默认接口:.../ops-audio-upload/v1/uploadPic，前端组件自动区分线上线下"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="save-check-div" data-tag="校验配置" class="b-div">
                                        <div class="form-group">
                                            <label class="col-xs-3 control-label">校验类型:</label>
                                            <div class="col-xs-7">
                                                <select id="regular" data-name="regular" autocomplete = "off" class="form-control">
                                                    <option value="false">不校验</option>
                                                    <option value="^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$">邮箱</option>
                                                    <option value="^\d{15}|\d{18}$">身份证号</option>
                                                    <option value="^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$">座机电话号</option>
                                                    <option value="^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$">手机号</option>
                                                    <option value="^[0-9]{1,20}$">纯数字</option>
                                                    <option value="^[a-zA-Z0-9 ]{3,12}$">邮政编码</option>
                                                    <option value="other">其他</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="regular-express-div" class="form-group" style="display: none;">
                                            <label class="col-xs-3 control-label">JS正则表达式<span style="color: red;">*</span>:</label>
                                            <div class="col-xs-7">
                                                <input data-name="express" id="express" class="form-control" placeholder="请输入JS正则表达式"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="b-div" data-tag="过滤配置">
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">是否过滤:</label>
                                    <div class="col-xs-7">
                                        <label class="checkbox-inline">
                                            <input id="formatter" type="checkbox">&nbsp;
                                        </label>
                                    </div>
                                </div>
                                <div id="formatter-div" style="display: none;">
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">过滤类型:</label>
                                        <div class="col-xs-7">
                                            <select id="formatterType" autocomplete = "off" class="form-control pull-left require-name">
                                                <option value="text">普通文本</option>
                                                <option value="pic">图片</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div id="formatterType-div">
                                        <div class="form-group">
                                            <label class="col-xs-3 control-label">数据源:</label>
                                            <div class="col-xs-7">
                                                <select id="dataSource" autocomplete = "off" class="form-control pull-left require-name">
                                                    <option value="local">本地添加</option>
                                                    <option value="database">数据库</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="dataSource-div-local">
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label">过滤参数:</label>
                                                <div class="col-xs-7">
                                                    <a type="button" class="btn btn-default btn-sm formatter-add">添加</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="dataSource-div-database" style="display: none;">
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label">数据源schema<span style="color: red;">*</span>:</label>
                                                <div class="col-xs-7">
                                                    <input data-name="schema" id="dataSourceSchema" class="form-control input-sm require-name" placeholder="请输入数据源表所在schema"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label">数据源表名<span style="color: red;">*</span>:</label>
                                                <div class="col-xs-7">
                                                    <input data-name="tableName" id="dataSourceTableName" class="form-control input-sm require-name" placeholder="请输入数据源表名"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label">数据源key字段<span style="color: red;">*</span>:</label>
                                                <div class="col-xs-7">
                                                    <input data-name="key" id="key" class="form-control input-sm require-name" placeholder="请输入作为key的字段名"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-xs-3 control-label">数据源value字段<span style="color: red;">*</span>:</label>
                                                <div class="col-xs-7">
                                                    <input data-name="value" id="value" class="form-control input-sm require-name" placeholder="请输入作为value的字段名"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="b-div" data-tag="列表配置">
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">是否需要在列表页展示:</label>
                                    <div class="col-xs-7">
                                        <label class="checkbox-inline">
                                            <input id="list" type="checkbox">&nbsp;
                                        </label>
                                    </div>
                                </div>
                                <div id="list-div" style="display: none;">
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">列宽:</label>
                                        <div class="col-xs-7">
                                            <input data-name="width" id="width" class="form-control input-sm require-name" placeholder="格式要求正整数,单位:px"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">水平对齐方式:</label>
                                        <div class="col-xs-7">
                                            <select id="align" data-name="align" autocomplete = "off" class="form-control">
                                                <option value="center">居中</option>
                                                <option value="left">靠左</option>
                                                <option value="right">靠右</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">垂直对齐方式:</label>
                                        <div class="col-xs-7">
                                            <select id="valign" data-name="valign" autocomplete = "off" class="form-control">
                                                <option value="middle">居中</option>
                                                <option value="top">置顶</option>
                                                <option value="bottom">置底</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">是否作为排序字段:</label>
                                        <div class="col-xs-7">
                                            <select data-name="sortable" id="sortable" class="form-control">
                                                <option value="false">否</option>
                                                <option value="true">是</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="b-div" data-tag="搜索配置">
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">是否需要作为搜索条件:</label>
                                    <div class="col-xs-7">
                                        <label class="checkbox-inline">
                                            <input id="search" type="checkbox">&nbsp;
                                        </label>
                                    </div>
                                </div>
                                <div id="search-div" style="display: none;">
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">前端input标签类型:</label>
                                        <div class="col-xs-7">
                                            <select id="search-inputType" data-name="inputType" autocomplete = "off" class="form-control pull-left require-name">
                                                <option value="text">普通文本</option>
                                                <option value="date">日期选择框</option>
                                                <option value="datetime">日期时间选择框</option>
                                                <option value="select">下拉菜单</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">判断方式:</label>
                                        <div class="col-xs-7">
                                            <select data-name="judgeType" id="judgeType" autocomplete = "off" class="form-control">
                                                <option value="eq">相等</option>
                                                <option value="like">模糊查询</option>
                                                <option value="gt">大于</option>
                                                <option value="lt">小于</option>
                                                <option value="gteq">大于等于</option>
                                                <option value="lteq">小于等于</option>
                                                <option value="bt">在...区间</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="btn-save">
                    <a type="button" class="btn btn-default btn-sm" onclick="cancel()">取消</a>
                    <button class="btn btn-primary btn-sm" onclick="saveColumnComment()">保存</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/ops-common-web/static/plugins/hplus/js/jquery.min.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/bootstrap.min.js"></script>
<script src="/ops-common-web/static/js/libs/noty/noty.js"></script>
<script src="/ops-common-web/static/js/base.js"></script>
<script>
    var table = $('#table'), form = $('#form'), formHtml = form.html();
    $(function () {
        $(".b-div").each(function(){
            $(this).append('<div class="b-tag"></div>');
            var textVal = $(this).attr('data-tag');
            $(this).find('.b-tag').text(textVal);
        })

        init();
    })

    function start() {
        var metaName = $("#meta_name").val();
        if(metaName == ''){
            $("#config-hit").text("请填写配置名称")
            return;
        }
        $.ajax({
            type:'post',
            url:'/ops-common-web/config/metaConfigExist',
            dataType : 'json',
            data:{metaName:metaName},
            success:function (data) {
                if (data.code == 200){
                    $("#meta_name").prop("disabled", true);
                    $("#start-config-bn").prop("disabled", true);
                    $("#config-hit").text("");
                    $("#meta_id").val(data.meta.id);
                    $("#connect_id").val(data.meta.connectId);
                    $('#mainTableSpan').html(data.meta.schemaName+"."+data.meta.tableName);
                    $('#schema').val(data.meta.schemaName);
                    $('#mainTableName').val(data.meta.tableName);
                    var configObj = JSON.parse(data.meta.configJson);
                    if(configObj.follow){
                        $('#followTableSpan').html(data.meta.schemaName+"."+configObj.follow.tableName);
                        $('#followTableName').val(configObj.follow.tableName);
                        $('#follow-div').show();
                    }
                    $('#config-main').show();
                    $('#testUrl').html('预览链接:<a href="'+data.meta.url+'" target="_blank">'+data.meta.url+'</a>');
                }
                else{
                    notify.error(data.message);
                }
            }
        })
    }
    
    function init() {

        $('.formatter-add').click(function () {
            $(this).parent().append('<div class="list-formatter-map-add">' +
                    'key:<input type="text" class="list-formatter-map-key">' +
                    'value:<input type="text" class="list-formatter-map-value"> ' +
                    '<a type="button" class="btn btn-default btn-sm" onclick="formatterDel(this)">删除</a> </div>');
        })

        $('#columnType').change(function () {
            $('#formatter').prop('disabled',false);
            $('#formatter').prop('checked',false).change();
            $('#edit').prop('disabled',false);
            $('#save').prop('disabled',false);
            $('#tips').prop('disabled',false);
            $('#tips').val('');
            $('#search').change();
            $('#list').change();
            $('#search-inputType').change();
            var columnType = $(this).val();
            if(columnType == 'com'){
                $('#edit').find("option[value='true']").prop("selected",true);
                $('#save').change();
            }
            else if(columnType=='pk'||columnType=='fk'){
                $('#formatter').prop('disabled',true);
                $('#edit').find("option[value='false']").prop("selected",true);
                $('#edit').prop('disabled',true);
                $('#tips').prop('disabled',true);
                $('#save').prop('checked',true).change();
                $('#save').prop('disabled',true);
            }
            else if(columnType=='cdate'||columnType=='udate'){
                $('#formatter').prop('disabled',true);
                $('#edit').find("option[value='false']").prop("selected",true);
                $('#edit').prop('disabled',true);
                $('#tips').prop('disabled',true);
                $('#save').prop('checked',true).change();
                $('#save').prop('disabled',true);
            }
        })

        $('#formatter').change(function () {
            $('#formatterType').find("option[value='text']").prop("selected",true).change();
            if($(this).is(':checked')){
                $('#formatter-div').show();
            }
            else{
                $('#formatter-div').hide();
            }
        })

        $('#formatterType').change(function () {
            $('#dataSource').find("option[value='local']").prop("selected",true).change();
            var formatterType=$(this).val();
            if(formatterType=='text'){
                $('#formatterType-div').show();
            }
            else if(formatterType=='pic'){
                $('#formatterType-div').hide();
            }
        })

        $('#dataSource').change(function () {
            $('#dataSource-div-database').find('[data-name]').val('');
            $('#dataSourceSchema').val($('#tableSchema').val());
            $('.list-formatter-map-add').remove();
            var dataSource = $(this).val();
            if(dataSource == 'local'){
                $('#dataSource-div-local').show();
                $('#dataSource-div-database').hide();
            }
            else if(dataSource == 'database'){
                $('#dataSource-div-local').hide();
                $('#dataSource-div-database').show();
            }
        })

        $('#list').change(function () {
            $('#width').val('');
            $('#align').find("option[value='center']").prop("selected",true);
            $('#valign').find("option[value='middle']").prop("selected",true);
            $('#sortable').find("option[value='false']").prop("selected",true);
            if($(this).is(':checked')){
                $('#list-div').show();
            }
            else{
                $('#list-div').hide();
            }
        })

        $('#search-inputType').change(function () {
            var inputType = $(this).val();
            if(inputType == 'select'){
                $('#judgeType').find("option[value='eq']").prop("selected",true);
                $('#judgeType').prop('disabled',true);
            }
            else{
                var columnType = $('#columnType').val();
                if(columnType == 'pk' || columnType == 'fk'){
                    $('#judgeType').find("option[value='eq']").prop("selected",true);
                    $('#judgeType').prop('disabled',true);
                }
                else if(columnType == 'cdate' || columnType == 'udate'){
                    $('#judgeType').find("option[value='bt']").prop("selected",true);
                    $('#judgeType').prop('disabled',true);
                }
                else if(columnType == 'com'){
                    $('#judgeType').prop('disabled',false);
                }
            }
        })

        $('#search').change(function () {
            var columnType = $('#columnType').val();
            if(columnType == 'com'){
                $('#search-inputType').prop('disabled',false);
            }
            else if(columnType=='pk'||columnType=='fk'){
                $('#search-inputType').find("option[value='text']").prop("selected",true).change();
                $('#search-inputType').prop('disabled',true);
            }
            else if(columnType=='cdate'||columnType=='udate'){
                $('#search-inputType').find("option[value='date']").prop("selected",true).change();
                $('#search-inputType').prop('disabled',true);
            }
            if($(this).is(':checked')){
                $('#search-div').show();
            }
            else{
                $('#search-div').hide();
            }
        })

        $('#save').change(function () {
            $('#regular').find("option[value='false']").prop("selected",true).change();
            var columnType=$('#columnType').val();
            if(columnType=='com'){
                $('#save-inputType').prop('disabled',false);
                $('#regular').prop('disabled',false);
            }
            else{
                $('#save-inputType').find("option[value='text']").prop("selected",true).change();
                $('#save-inputType').prop('disabled',true);
                $('#regular').prop('disabled',true);
            }
            if($(this).is(':checked')){
                $('#save-div').show();
            }
            else{
                $('#save-div').hide();
            }
        })

        $('#save-inputType').change(function () {
            $('#formatter').prop('disabled',false);
            $('#formatter').prop('checked',false).change();
            $('#list').prop('disabled',false);
            $('#list').prop('checked',false).change();
            $('#search').prop('disabled',false);
            $('#search').prop('checked',false).change();

            $('#save-pic-div').hide();
            $('#regular').prop('disabled',false);
            $('#regular').find("option[value='false']").prop("selected",true).change();

            var inputType=$(this).val();
            if(inputType=='text'){

            }
            else if(inputType=='date'){
                $('#regular').prop('disabled',true);
            }
            else if(inputType=='datetime'){
                $('#regular').prop('disabled',true);
            }
            else if(inputType=='select'){
                $('#regular').prop('disabled',true);
            }
            else if(inputType=='radio'){
                $('#regular').prop('disabled',true);
            }
            else if(inputType=='pic'){
                $('#save-pic-div').show();
                $('#regular').prop('disabled',true);
            }
            else if(inputType=='textarea'){

            }
            else if(inputType=='rich'){
                $('#formatter').prop('disabled',true);
                $('#regular').prop('disabled',true);
                $('#list').prop('disabled',true);
                $('#search').prop('disabled',true);
            }
        })

        $('#regular').change(function () {
            $('#express').val('');
            var regular=$(this).val();
            if(regular=='other'){
                $('#regular-express-div').show();
            }
            else{
                $('#regular-express-div').hide();
            }
        })

    }

    function formatterDel(o) {
        $(o).parent().remove();
    }

    function getTable(metaId,schema,tableName,type) {
        $('#table-name-show').html('');
        $('.add').remove();
        $.ajax({
            type:'post',
            url:'/ops-common-web/config/getTable',
            dataType:'json',
            data:{
                schema:schema,
                table:tableName,
                metaId:metaId
            },
            success:function (data) {
                if(data.code==200){
                    var list=data.tableColumn;
                    var app;
                    for(var i=0;i<list.length;i++){
                        var COLUMN_DEFAULT="[null]",COLUMN_COMMENT="";
                        if(list[i].cOLUMN_DEFAULT)
                            COLUMN_DEFAULT=list[i].cOLUMN_DEFAULT;
                        if(list[i].cOLUMN_COMMENT)
                            COLUMN_COMMENT=list[i].cOLUMN_COMMENT;
                        app=app+'<tr class="add">' +
                                '<td data-name="column_name">'+list[i].cOLUMN_NAME+'</td>' +
                                '<td data-name="column_type">'+list[i].cOLUMN_TYPE+'</td>' +
//                                        '<td data-name="is_nullable">'+list[i].iS_NULLABLE+'</td>' +
//                                        '<td data-name="column_default">'+COLUMN_DEFAULT+'</td>' +
//                                        '<td data-name="extra">'+list[i].eXTRA+'</td>' +
                                '<td data-name="colmun_comment">'+COLUMN_COMMENT+'</td>' +
                                '<td><button class="btn btn-default btn-sm" ' +
                                'column_name="'+list[i].cOLUMN_NAME+'" ' +
                                'table_name="'+tableName+'"' +
                                'onclick="reset(this)">重置</button>&nbsp;&nbsp;' +
                                '<button class="btn btn-primary btn-sm" ' +
                                'column_name="'+list[i].cOLUMN_NAME+'" ' +
                                'column_key="'+list[i].cOLUMN_KEY+'" ' +
                                'column_type="'+list[i].cOLUMN_TYPE+'" ' +
                                'table_name="'+tableName+'"' +
                                'onclick="handle(this)">设置</button></td>' +
                                '</tr>';
                    }
                    table.append(app);
                    $('#table-name-show').html("表:"+tableName);
                    $('#table-name-show').attr('table',type);
                    $('#config-content').show();
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

    function getMainTable() {
        form.hide();
        table.show();
        form.html(formHtml);
        init();
        var schema=$.trim($('#schema').val());
        var tableName=$.trim($('#mainTableName').val());
        var metaId = $("#meta_id").val();
        if(schema!=''&&tableName!=''&&metaId!=''){
            getTable(metaId,schema,tableName,'main');
        }
    }

    function getFollowTable() {
        form.hide();
        table.show();
        form.html(formHtml);
        init();
        var schema=$.trim($('#schema').val());
        var tableName=$.trim($('#followTableName').val());
        var metaId = $("#meta_id").val();
        if(schema!=''&&tableName!=''&&metaId!=''){
            getTable(metaId,schema,tableName,'follow');
        }
    }

    function reloadMain() {
        var schema=$.trim($('#schema').val());
        var tableName=$.trim($('#mainTableName').val());
        var metaId = $("#meta_id").val();
        reloadColumn(metaId,schema,tableName,getMainTable());
    }

    function reloadColumn(metaId,schema,tableName,fun) {
        $.ajax({
            type : 'post',
            url : '/ops-common-web/config/reloadTable',
            data : {
                metaId:metaId,
                schema:schema,
                tableName:tableName
            },
            dataType : 'json',
            success : function (data) {
                if(data.code==200){
                    var list=data.data;
                    if(list.length==0) {
                        notify.info("操作成功。");
                    }
                    else {
                        notify.info("操作成功。删除字段:"+list.join(",")+"。");
                    }
                    fun();
                }
                else{
                    notify.error(data.message);
                }
            },
            error : function(errorThrown) {
                notify.error("操作失败:"+errorThrown.status+" "+errorThrown.statusText);
            }
        });
    }

    function reloadFollow() {
        var schema=$.trim($('#schema').val());
        var tableName=$.trim($('#followTableName').val());
        var metaId = $("#meta_id").val();
        reloadColumn(metaId,schema,tableName,getFollowTable());
    }
    
    function handle(o) {
        table.hide();
        var column_key = $(o).attr('column_key');
        var column_name = $(o).attr('column_name');
        var column_type = $(o).attr('column_type');
        var table_schema = $.trim($('#schema').val());
        var table_name = $(o).attr('table_name');
        $('#tableSchema').val(table_schema);
        $('#tableName').val(table_name);
        $('#columnName').val(column_name);
        $('#col-type').val(column_type);
        if(column_key=='PRI'){
            $('#columnType').find("option[value='pk']").attr("selected",true).change();
            $('#columnType').attr("disabled",true);
        }
        form.show();
    }
    
    function cancel() {
        form.hide();
        table.show();
        form.html(formHtml);
        init();
    }
    
    function reset(o) {
        if(!confirm("确定要重置字段:"+$(o).attr('column_name'))){
            return;
        }
        var postObj={};
        postObj.comment="";
        postObj.schema=$.trim($('#schema').val());
        postObj.tableName=$(o).attr('table_name');
        postObj.columnName=$(o).attr('column_name');
        postObj.metaId=$("#meta_id").val();
        $.ajax({
            type : 'post',
            url : '/ops-common-web/config/updateComment',
            data : JSON.stringify(postObj),
            contentType:'application/json',
            dataType : 'json',
            success : function (data) {
                if(data.code==200){
                    notify.info("操作成功");
                    var type=$('#table-name-show').attr('table');
                    if(type=='main'){
                        getMainTable()
                    }
                    else if(type=='follow'){
                        getFollowTable()
                    }
                    else{
                        alert("div table-name-show attr table is empty");
                    }
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

    function saveColumnComment() {
        var postData={};
        var lableName=$.trim($('#lableName').val());
        if(lableName==''){
            notify.warn('请填写字段名称');
            return;
        }
        postData.lableName=lableName;
        var formatter={};
        if($('#formatter').is(':checked')){
            var formatterType=$('#formatterType').val();
            if(formatterType=='text'){
                formatter.type='text';
                var dataSource=$('#dataSource').val();
                if(dataSource=='local'){
                    var maps=$('#dataSource-div-local').find('.list-formatter-map-add');
                    if(maps.length==0){
                        notify.warn("请填写过滤参数");
                        return;
                    }
                    var map={};
                    var col_type=$('#col-type').val();
                    for(var i=0;i<maps.length;i++){
                        var key=$.trim($(maps[i]).children().eq(0).val());
                        var value=$.trim($(maps[i]).children().eq(1).val());
                        if(key==''){
                            notify.warn("过滤参数key不能为空");
                            return;
                        }
                        if(value==''){
                            notify.warn("过滤参数value不能为空");
                            return;
                        }
                        if(col_type=='tinyint(1)'){
                            if(key!='1'&&key!='0'){
                                notify.warn("字段类型为tinyint(1)时,过滤参数key只能是0或1");
                                return;
                            }
                        }
                        map[key]=value;
                    }
                    formatter.map=map;
                }
                else if(dataSource=='database'){
                    var dataSource={};
                    var dataSourceSchema =$.trim($('#dataSourceSchema').val());
                    if(dataSourceSchema==''){
                        notify.warn('请输入数据源表所在schema');
                        return;
                    }
                    dataSource.schema=dataSourceSchema;
                    var dataSourceTN=$.trim($('#dataSourceTableName').val());
                    if(dataSourceTN==''){
                        notify.warn('请输入数据源表名');
                        return;
                    }
                    dataSource.tableName=dataSourceTN;
                    var dataSourceK=$.trim($('#key').val());
                    if(dataSourceK==''){
                        notify.warn('请输入数据源key');
                        return;
                    }
                    dataSource.key=dataSourceK;
                    var dataSourceV=$.trim($('#value').val());
                    if(dataSourceV==''){
                        notify.warn('请输入数据源value');
                        return;
                    }
                    dataSource.value=dataSourceV;
                    dataSource.connectId=$("#connect_id").val();
                    formatter.dataSource=dataSource;
                }
            }
            else if(formatterType=='pic'){
                formatter.type='pic';
            }
        }

        if($('#list').is(':checked')){
            var list={};
            var width=$.trim($('#width').val());
            if(width!=''){
                var widthInt=parseInt(width);
                if(widthInt){
                    list.width=widthInt;
                }
                else{
                    notify.warn("列宽格式错误,请输入正整数");
                    return;
                }
            }
            list.align=$('#align').val();
            list.valign=$('#valign').val();
            var sortable=$('#sortable').val();
            if(sortable=='true'){
                list.sortable=true;
            }
            else{
                list.sortable=false;
            }
            if(formatter&&formatter.type){
                if(formatter.type=='pic'){
                    list.formatter=formatter;
                }
                else if(formatter.type=='text'){
                    if($('#col-type').val()=='tinyint(1)'&&formatter.map){
                        var forma={
                            type:'text',
                            map:{}
                        };
                        for(var k in formatter.map){
                            if(k=='1'){
                                forma['map']['true']=formatter.map[k];
                            }
                            else{
                                forma['map']['false']=formatter.map[k];
                            }
                        }
                        list.formatter=forma;
                    }
                    else{
                        list.formatter=formatter;
                    }
                }
            }
            if($('#extend').is(':checked')){
                var extendSource=$('#extendSource').val();
                list.extendSource=extendSource;
                var extendColumns=[];
                $('.extendColumns:checked').each(function(){
                    extendColumns.push($(this).val());
                });
                list.extendColumns=extendColumns;
            }
            postData.list=list;
        }

        if($('#search').is(':checked')){
            var search={};
            var inputType=$('#search-inputType').val();
            search.inputType=inputType;
            if(inputType=='select'){
                if(formatter&&formatter.type&&formatter.type=='text'){
                    if(formatter.map){
                        search.selectContent=formatter.map;
                    }
                    else if(formatter.dataSource){
                        search.dataSource=formatter.dataSource;
                    }
                }
                else{
                    notify.warn("当搜索input标签类型为下拉菜单时,必须配置过滤参数");
                    return;
                }
            }
            var judgeType=$('#judgeType').val();
            search.judgeType=judgeType;
            postData.search=search;
        }

        if($('#save').is(':checked')){
            var save={};
            save.columnType=$('#columnType').val();
            var inputType=$('#save-inputType').val();
            save.inputType=inputType;
            if(save.columnType=='com'){
                if(save.inputType=='select'||save.inputType=='radio'){
                    if(formatter&&formatter.type&&formatter.type=='text'){
                        if(formatter.map){
                            save.selectContent=formatter.map;
                        }
                        else if(formatter.dataSource){
                            save.dataSource=formatter.dataSource;
                        }
                    }
                    else{
                        notify.warn("当新增input标签类型为下拉菜单或单选框时,必须配置过滤参数");
                        return;
                    }
                }
                else if(save.inputType=='pic'){
                    var postDataPic={};
                    var inputs=$('#save-pic-div').find("[data-name]");
                    for(var i=0;i<inputs.length;i++){
                        var key=$(inputs[i]).attr('data-name'),value=$.trim($(inputs[i]).val());
                        if($(inputs[i]).attr('required')){
                            if(!value){
                                var tip=$(inputs[i]).attr('tips');
                                notify.warn(tip);
                                return;
                            }
                        }
                        if(value){
                            postDataPic[key]=value;
                        }
                    }
                    var supportImage=[];
                    $('input[name="supportImage"]:checked').each(function(){
                        supportImage.push($(this).val());
                    });
                    if(supportImage.length==0){
                        notify.warn("请选择上传图片类型");
                        return;
                    }
                    postDataPic.supportImage=supportImage;
                    save.picUploadConf=postDataPic;
                }
                else if(save.inputType=='text'){
                    var regular=$('#regular').val();
                    if(regular=='other'){
                        var express=$.trim($('#express').val());
                        if(express==''){
                            notify.warn("请输入JS正则表达式");
                            return;
                        }
                        save.regular=express;
                    }
                    else if(regular!='false'){
                        save.regular=$('#regular').val();
                    }
                }
                else if(save.inputType=='rich'){
                    if($('#col-type').val()!='text'){
                        notify.warn("富文本框,数据库字段类型必须为text");
                        return;
                    }
                }
            }
            var tips=$.trim($('#tips').val());
            if(tips!=''){
                save.tips=tips;
            }
            var edit=$('#edit').val();
            if(edit=='true'){
                save.edit=true;
            }
            else{
                save.edit=false;
            }
            postData.save=save;
        }

        var postObj={};
        postObj.comment=postData;
        postObj.schema=$('#tableSchema').val();
        postObj.tableName=$('#tableName').val();
        postObj.columnName=$('#columnName').val();
        postObj.metaId=$("#meta_id").val();
        $.ajax({
            type : 'post',
            url : '/ops-common-web/config/updateComment',
            data : JSON.stringify(postObj),
            contentType:'application/json',
            dataType : 'json',
            success : function (data) {
                if(data.code==200){
                    notify.info("操作成功");
                    var type=$('#table-name-show').attr('table');
                    if(type=='main'){
                        getMainTable();
                    }
                    else if(type=='follow'){
                        getFollowTable();
                    }
                    else{
                        alert("div table-name-show attr table is empty");
                    }
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