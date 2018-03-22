_ts = getTs();
window.config = window.config||{};
config.XM_STATIC_PATH = config.XM_STATIC_PATH||getRootPath();
function getCurrentScriptPath() {
    if (document.hasOwnProperty && document.hasOwnProperty('currentScript')) {
        return document.currentScript.src;
    }
    var scripts = document.scripts || document.getElementsByTagName('script');
    var lastScript = "";
    var len = scripts.length;
    var state = 'interactive';
    for (var i = 0; i < len; i++) {
        if (scripts[i].readyState == state && scripts[i].src) {
            return scripts[i].src;
        }
        if (scripts[i].src) {
            lastScript = scripts[i];
        }
    }
    return lastScript.src;
}
function getRootPath() {
    if (config.STATIC_PATH) {
        return config.STATIC_PATH;
    }
    var path = getCurrentScriptPath();
    var reg = /http(s)?\:\/\/([^\/]+)\/?/i;
    var result = reg.exec(path);
    if (!result) {
        result = "http://" + location.host;
    } else {
        result = result[0];
    }
    return result.replace(/\/$/, '');
}
function getTs() {
    var inMobile = document.hasOwnProperty && document.hasOwnProperty('ontouchstart'); //濡傛灉鐢╱serAgent鏉ュ垽鏂紝鍦╬c绔ā鎷熶腑璋冭瘯锛屼細鍑虹幇涓嶈兘璁剧疆鏂偣鐨勯棶棰�
    var reg = /_ts=([^\&]+)/;
    var result = reg.exec(location.href);
    var ts = inMobile ? new Date().getTime() : '';
    return result ? result[1] : ts;
}
function createScriptAsync(filepath) {
    var ts = getTs();
    ts = ts ? ('?_ts=' + ts) : '';
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.src = getRootPath() + filepath + ts;
    body.appendChild(script);
}
function createScript(filepath) {
    var ts = getTs();
    ts = ts ? ('?_ts=' + ts) : '';
    document.write('<script src="' + getRootPath() + filepath + ts + '"></script>');
}
createScript("/source/packageMethod/0.1.2/uploader/js/audio.uploader.js");