<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Common-Web</title>

    <link href="/ops-common-web/static/plugins/hplus/css/bootstrap.min14ed.css" rel="stylesheet">
    <link href="/ops-common-web/static/plugins/hplus/css/font-awesome.min93e3.css" rel="stylesheet">
    <link href="/ops-common-web/static/css/admin-base.css" rel="stylesheet">
    <link href="/ops-common-web/static/css/base.css" rel="stylesheet">
    <!--<script>if(window.top !== window.self){ window.top.location = window.location;}</script>-->
    <style>
    </style>
</head>
<body style="background-color: gainsboro;">
<div class="container-fluid">
    <div class="row">
        <div style="text-align: center;">
            <iframe id="md" src="" style="border: 0;margin: 0px;padding: 0px;" width="100%" height="200px"></iframe>
            <div style="color: white;font-size: 30px;font-family: 黑体;position: relative;top:-120px;">${environment}环境配置</div>
        </div>
        <div class="col-sm-12 col-xs-12">
            <div class="col-sm-6 col-xs-6" style="text-align: center;">
                <a class="btn btn-primary btn-lg" href="/ops-common-web/config/table">表信息配置</a>
            </div>
            <div class="col-sm-6 col-xs-6" style="text-align: center;">
                <a class="btn btn-primary btn-lg" href="#"> 字段信息配置</a>
            </div>
        </div>
    </div>
</div>
<div id="footer" class="container">
    <nav class="navbar navbar-default navbar-fixed-bottom" style="min-height: 25px;border-top: 1px solid #ccc;">
            <div class="navbar-inner navbar-content-center">
                <p class="text-muted credit" style="padding: 0px;margin: 5px;text-align: center;">
                    Powered by nihao .
                    <a style="color: #707070;" target="_blank" href="https://github.com/nihao17546"><i class="fa fa-git" aria-hidden="true"></i></a>
                    . <a style="color: grey;" href="mailto:nihaocome@gmail.com?subject=bug"><i class="glyphicon glyphicon-envelope" aria-hidden="true"></i></a>
                    . <a style="color: grey;" href="http://wpa.qq.com/msgrd?v=3&uin=420584320"><i class="fa fa-qq" aria-hidden="true"></i></a>
                </p>
            </div>
    </nav>
</div>

<script src="/ops-common-web/static/plugins/hplus/js/jquery.min.js"></script>
<script>
    $(function () {
        var random=parseInt(Math.random()*6+1,10);
        $('#md').attr('src','/ops-common-web/static/'+random+".html");
    });
</script>
</body>
</html>