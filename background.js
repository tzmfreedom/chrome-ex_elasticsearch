chrome.history.onVisited.addListener(function(result){
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

    //���[�J���X�g���[�W�̐ݒ���擾
    storage_local.get(function(item){
        if (item[SERVER_KEY]){
            //elastic-search�T�[�o�Ƀf�[�^�𑗐M        
            var index = item[INDEX_KEY] ? item[INDEX_KEY] : "history";
            var type = item[TYPE_KEY] ? item[TYPE_KEY] : "chrome";
            $.ajax({
                url: item[SERVER_KEY] + "/" + index + "/" + type,
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
});

