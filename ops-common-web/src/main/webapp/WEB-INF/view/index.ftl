<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>

    <link href="/ops-common-web/static/plugins/hplus/css/bootstrap.min14ed.css" rel="stylesheet">
    <link href="/ops-common-web/static/plugins/hplus/css/font-awesome.min93e3.css" rel="stylesheet">
    <link href="/ops-common-web/static/plugins/hplus/css/bootstrap-table.min.css" rel="stylesheet">
    <link href="/ops-common-web/static/plugins/lightbox-dialog/dist/css/Lobibox.min.css" rel="stylesheet">
    <link href="/ops-common-web/static/css/admin-base.css" rel="stylesheet">
    <link href="/ops-common-web/static/css/base.css" rel="stylesheet">
    <link rel="stylesheet" href="/ops-common-web/static/plugins/hplus/css/uploader.css">
    <style>
        form .form-group {
            padding-left: 10px;
        }
        div.form-submit{
            position: relative;
        }
        div.form-submit i.fa-search {
            position:absolute;
            left:17px;
            top:7px;
            pointer-events:none
        }
        div.form-submit .j-query {
            padding-left:20px
        }
        .layui-layer-shade{
            z-index: 9999 !important;
        }
        .layui-layer{
            z-index: 10000 !important;
        }
        th,td{
            word-break: break-all;
            vertical-align: middle !important;
        }
        .fixer{  position : fixed ;  top : 0px ;left: 26px;z-index: 9998}
    </style>
</head>

<body class="gray-bg">
<div class="container-fluid">
    <div class="page-header">
        <h3>${title}</h3>
    </div>
    <div class="s-wrapper">
        <div class="form-inline" id="search-div">
        </div>
    </div>
    <div class="s-wrapper clearfix">
        <div class="table-responsive" id="table-div">
            <div class="mock" id="mock">
                <div class="mock-modal"></div>
                <div class="mock-css3"></div>
            </div>
            <div id="toolbar" class="btn-group"  data-toggle="bottons-checkbox">
                <button style="display: none;" id="save_btn" class="btn btn-default" type="button"><i class="fa fa-plus"></i>新增</button>
                <button style="display: none;" id="edit_btn" class="btn btn-default" type="button"><i class="fa fa-edit"></i>编辑</button>
                <button style="display: none;" id="del_btn" class="btn btn-default" type="button"><i class="fa fa-remove"></i>删除</button>
                <button style="display: none;" id="save_follow_btn" class="btn btn-default" type="button"><i class="fa fa-plus"></i>从表新增</button>
                <button style="display: none;" id="bat_save_follow_btn" class="btn btn-default" type="button"><i class="fa fa-plus"></i>从表批量新增</button>
                <button style="display: none;" id="export" class="btn btn-default" type="button"><i class="fa fa-file-excel-o"></i>主表导出excel</button>
                <button style="display: none;" id="follow_export" class="btn btn-default" type="button"><i class="fa fa-file-excel-o"></i>从表导出excel</button>
            </div>
            <button id="fold_btn" class="btn btn-info" onclick="foldFun(this)" style="position: fixed;top: 1%;right: 15px;z-index: 1000;display: none;">折叠</button>
        </div>
    </div>
</div>
<input type="hidden" id="ppk" value="-1">



<!--表单html-->
<div id="save-main-html" style="display: none;">
    <div class="container-fluid">
        <div class="row">
            <div class="content clearfix">
                <form class="form-horizontal col-xs-12 save-main-form" id="save-main-form">
                </form>
            </div>
        </div>
        <div class="row" id="save-main-follow-form-div" style="display: none;">
            <div class="content clearfix">
                <form class="form-horizontal col-xs-12 save-main-follow-form" id="save-main-follow-form">
                </form>
            </div>
        </div>
    </div>
</div>
<div id="save-follow-html" style="display: none;">
    <div class="container-fluid">
        <div class="row">
            <div class="content clearfix">
                <form class="form-horizontal col-xs-12 save-follow-form" id="save-follow-form">
                </form>
            </div>
        </div>
    </div>
</div>
<div id="bat-save-follow-html" style="display: none;">
    <div class="container-fluid">
        <div class="row">
            <div class="content clearfix">
                <form class="form-horizontal col-xs-12 bat-save-follow-form" id="bat-save-follow-form">
                </form>
            </div>
        </div>
    </div>
</div>
<div id="loading" style="position: absolute;z-index: 99999999;width: 100%;display: none;
height: 100%;background-color: grey;text-align: center;vertical-align: middle;background: rgba(0,0,0,0.5);">
    <div style="color: white;position: fixed;top: 50%;left: 50%;background-color: #0d6aad;">下载处理中......</div>
</div>

<script src="/ops-common-web/static/plugins/hplus/js/jquery.min.js"></script>
<script type="text/javascript">
    var mainParam=${meta};
    var metaId=${metaId};
</script>
<script src="/ops-common-web/static/plugins/hplus/js/bootstrap.min.js"></script>
<script src="/ops-common-web/static/js/libs/My97DatePicker/WdatePicker.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/bootstrap-table.min.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/bootstrap-table-mobile.min.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/bootstrap-table-zh-CN.min.js"></script>
<script src="/ops-common-web/static/plugins/layer-v2.4/layer/layer.js"></script>
<script src="/ops-common-web/static/plugins/noty/noty.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/base.js"></script>
<script src="/ops-common-web/static/plugins/webuploader/webuploader.min.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/image.uploader.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/audio.uploader.js"></script>
<script src="/ops-common-web/static/plugins/hplus/js/Sortable.min.js"></script>
<script src="/ops-common-web/static/plugins/lightbox-dialog/dist/js/lobibox.min.js"></script>
<script src="/ops-common-web/static/plugins/kindeditor/kindeditor-all-new.js"></script>
<script src="/ops-common-web/static/plugins/kindeditor/lang/zh_CN.js"></script>
<script src="/ops-common-web/static/js/util.js?v=4.0"></script>
<script src="/ops-common-web/static/js/main.js?v=5.5"></script>
<script type="text/javascript">
    $(window).scroll( function (){
        var  h_num=$(window).scrollTop();
        if (h_num>168){
            $("#toolbar").addClass( 'fixer' );
        } else {
            $("#toolbar").removeClass( 'fixer' );
        }
    });
</script>
</body>
</html>