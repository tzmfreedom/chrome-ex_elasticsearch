$(function(){
    var storage_local = chrome.storage.local;
    var SERVER_KEY = "es-server";
    var INDEX_KEY = "es-index";
    var TYPE_KEY = "es-type";

    //èâä˙ílÇÃê›íË
    storage_local.get(function(results) {
        if (results[SERVER_KEY]) {
            $("#es-server").val(results[SERVER_KEY]);
        }
        if (results[INDEX_KEY]) {
            $("#index").val(results[INDEX_KEY]);
        }
        if (results[TYPE_KEY]) {
            $("#type").val(results[TYPE_KEY]);
        }
        console.log(results);
    });

    //ê›íËÇÃï€ë∂
    $("#save").click(function(){
        var obj = {};
        obj[SERVER_KEY] = $("#es-server").val();
        obj[INDEX_KEY] = $("#index").val();
        obj[TYPE_KEY] = $("#type").val();
        storage_local.set(obj);
        chrome.notifications.clear("es-error", function(result) {
            console.log(result);
        });
        alert("Save Completed!!\n\nThis extension send history datas to\n" + 
            obj[SERVER_KEY] + "/" + 
            (obj[INDEX_KEY] ? obj[INDEX_KEY] : "history") + "/" + 
            (obj[TYPE_KEY] ? obj[TYPE_KEY] : "chrome"));
    });
});

