var pushNotification;

function registerPush() {
   
    try {
        var _token = localStorage.getItem('device_token');
        //alertmsg(_token);

        pushNotification = window.plugins.pushNotification;

        try {

            // alert(pushNotification.notifications);
            pushNotification.getPendingNotifications(function (notifications) {
                //alert(notifications);
                navigator.notification.alert(JSON.stringify(['getPendingNotifications', notifications]));
            });
        }
        catch (ddd) {
            // alert(ddd);
        }
        if (_token == null || _token == undefined || _token == '') {
            pushNotification.register(tokenHandler,
                errorHandler, {
                    "badge": "true",
                    "sound": "true",
                    "alert": "true",
                    "ecb": "onNotificationAPN"
                });
        }
    }
    catch (err) {
        alertmsg('Push notification error, please try again later on the setting screen.\n' + err);
    }
}

function tokenHandler(result) {


    var postdata = "DeviceToken=" + result + "&" +
                         "UserID=" + userid + "&"
    DeviceToken = result;

    //alertmsg(postdata);

    try {
        $.ajax({
            url: url_update_token,
            type: 'POST',
            dataType: 'xml',
            async: true,
            cache: false,
            data: postdata,
            success: function (data) {
                // alertmsg('success');
                try {
                    user_token = data.childNodes[0].textContent;
                    // alertmsg('success');
                    var userToken = user_token.split('||');
                    if (userToken.length == 11) {

                        userid = userToken[0];
                        localStorage.setItem('userid', userid);
                        localStorage.setItem('user_token', user_token);
                        localStorage.setItem('device_token', result);

                    }
                }
                catch (ee) {
                    // alertmsg('successData connection error\n' + ee);
                }
            },
            error: function (data) {
                // alert(data.childNodes[0].textContent);
                // alertmsg('Data connection error');
                // app.hideLoading();
            }
        }).done(function (msg) {
            //$('#firstName').val('');
            //$('#lastName').val('');
            //$('#email').val('');

            //app.hideLoading();
        });



    }
    catch (err) {
        // alert(err);
        //app.hideLoading();
    }


    // app.hideLoading();

}


function errorHandler(error) {
    alertmsg('Push notification error, please try again later on the setting screen.\n' + error);
}


function onNotificationAPN(e) {
    if (e.alert) {
        navigator.notification.alertmsg(e.alert);
    }
    if (e.sound) {
        var snd = new Media(e.sound);
        snd.play();
    }

    if (e.badge) {
        try {

            resetTab(e.badge);

            pushNotification.setApplicationIconBadgeNumber(successIconBadgeNumber, e.badge);

        } catch (e) { }
    }
}



function successIconBadgeNumber(result) {
    // $("#app-status-ul").append('<li>success:' + result + '</li>');
}

function resetTab(count) {

    try{ 

        badgeCount = badgeCount + count; 

        localStorage.setItem('badgeCount', badgeCount) 

        tabstrip.badge(0, badgeCount);

    }
    catch (d) {
      // alert(d);
    }

}

