var webPush = require('web-push');

const vapidKeys = {
    "publicKey" : "BOkQ__jfMkEotdptZ8_hXHocJ5MpcxZiHHoOMqikXypOdLrOFHdqJcica-ExuZBGsFDtF4kAoOhsUhI2aHCcRjM",
    "privateKey" : "Dove0yJUDr22ri6vuWW2DJUdP1UxKDJiqm1ynhNqKRY"
};

webPush.setVapidDetails(
    'mailto:dnda.prameswari@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d_qwT-MEdag:APA91bE7QIUi7v77fYQllHK1uLpTW_ZRd1vzZGy8N5qSynTcf4pt9HiEA1ZqEwHLEZbLX5V0VGntmnyPhI5FoQ58VEWeOTlWLz8ksggssXjRgiuAdHDNcLQEL9UqVt8GPpVjo1CdCHpQ",
    "keys":{
        "p256dh":"BBz0xfoKn+QuFI9E+bQ4GSi5de4V2nyE3U9ZNDFSlc6lW6zP9nhNAqXELLqd63TUlvrB8XnU1UPASoxadJOcO2I=" ,
        "auth": "/AF28dNgTlX8o98LHMmyZA=="
    }
};

var payLoad = 'Push Notifikasi sudah dapat dijalankan!';

var options = {
    gcmAPIKey: '279534096032',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payLoad,
    options
);