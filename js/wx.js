var shareImg = 'http://ext144.nivea.com.cn/40/jacuzzi/images/share/sharewx.jpg?v=1118.01';
var link = 'http://www.nivea.com.cn/inshower';
var title = "国民借口大换购";
var desc = "别说我不告诉你，我在#国民借口大换购#用借口换好礼，秋冬润体不麻烦，真的没借口哦！小伙伴们还等什么？说出借口，更有机会换到64GiPhone6！";
var appid = '';

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid": appid,
        "img_url": shareImg,
        "img_width": "200",
        "img_height": "200",
        "link": link,
        "desc": desc,
        "title": title
    }, function (res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": shareImg,
        "img_width": "200",
        "img_height": "200",
        "link": link,
        "desc": title,
        "title": desc
        
    }, function (res) {
        //_report('timeline', res.err_msg);
    });
}

//触发WeixinJSBridgeReady事件
    
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            shareFriend();
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            shareTimeline();
        });
    }, false);