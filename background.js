var storage_local = chrome.storage.local;
var SERVER_KEY = "es-server";
var INDEX_KEY = "es-index";
var TYPE_KEY = "es-type";
var getNotificationOptions = function(message){
    return {
        type : "basic",
             title : "setting error",
             message : message,
             iconUrl : ""
    };
};

var storageItem;
//���[�J���X�g���[�W�̐ݒ���擾
storage_local.get(function(item){
    storageItem = item;
});

chrome.history.onVisited.addListener(function(result){
    if (storageItem[SERVER_KEY]){
        //elastic-search�T�[�o�Ƀf�[�^�𑗐M        
        $.ajax({
            url: storageItem[SERVER_KEY] + "/" + 
                (storageItem[INDEX_KEY] ? storageItem[INDEX_KEY] : "history") + "/" + 
                (storageItem[TYPE_KEY] ? storageItem[TYPE_KEY] : "chrome"),
            data : JSON.stringify({"url": result.url}),
            type : "POST",
            contentType : "application/json"
        }).done(function(result){
            console.log(result);
        }).fail(function(result){
            //�ʐM�����s�����ꍇ�̓��b�Z�[�W���o��
            chrome.notifications.create(
                "es-error", 
                getNotificationOptions("Sending to elasticsearch-server is failed.\r\nPlease confirm settings."), 
                function(result) {
                    console.log(result);
                }
            );
        });
    } else {
        //�T�[�o�̐ݒ肪�������Ă��Ȃ��ꍇ�̓��b�Z�[�W���o��
        chrome.notifications.create(
            "es-error", 
            getNotificationOptions("You did not set up elasticsearch server information.\r\nPlease set up the information."), 
            function(result) {
                console.log(result);
            }
        );
    }
});

