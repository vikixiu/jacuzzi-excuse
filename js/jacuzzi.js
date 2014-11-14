
var jiathis_config = {
    boldNum:0,
    siteNum:7,
    showClose:false,
    sm:"t163,kaixin001,renren,douban,tsina,tqq,tsohu",
    //imageUrl:"http://ext144.nivea.com.cn/40/jacuzzi/images/share/share.png",
    //imageWidth:26,
    //marginTop:150,
    //url:"http://www.nivea.com.cn/inshower",
    title:"国民借口大换购",
    summary:"别说我不告诉你，我在#国民借口大换购#用借口换好礼，秋冬润体不麻烦，真的没借口哦！小伙伴们还等什么？说出借口，更有机会换到64GiPhone6！",
    desc:"别说我不告诉你，我在#国民借口大换购#用借口换好礼，秋冬润体不麻烦，真的没借口哦！小伙伴们还等什么？说出借口，更有机会换到64GiPhone6！",
    pic:"http://ext144.nivea.com.cn/40/jacuzzi/images/share/share.jpg?v=1111.01",
    data_track_clickback:true,
    appkey:{
        "tsina":"3147808038",
        "tqq":"101166725"
    },
    ralateuid:{
        //"tsina":"您的新浪微博UID"
    },
    //"shortUrl":'是否开启短链接',
    evt:{
        //"share":"用户自定义函数" 
    }
}

var snstitle = '国民借口大换购';

var jacuzzi = angular.module('jacuzzi', ['mb-scrollbar']).config(function($sceProvider) {
  // Completely disable SCE to support IE7.
  $sceProvider.enabled(false);
});


jacuzzi.controller('jacuzziCtrl', function($scope, $http, $timeout){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      }

    var r = '?v=' + s4();    

    $timeout(function(){
        $scope.yulianer = {'left':'-290px'}; 
    },1000)
    $scope.jacuzziInit = function(){
        $scope.userInfo = {
            'login' : 1, // 0 - login, 1 - not login
            'qqlogin':'',
            'webologin':'',
            'usertype' : '', // weibo, qq, none
            'username' : '',
            'userpic' : '',
            'userlink' : '',
            'showresult' : false,
            'result' : {
                'excuseType':2, //1-8
                'excuse':'',
                'prize':'', // gift, tmall5, none, tmall10, tmall15
                'tmalllink' : 'http://www.tmall.com'
            }
        };

        $scope.resulttype = 1;

        //$scope.popupInit($scope);
        $scope.excusename = ['浴后不涂润体乳',
                            '迟到',
                            '没空和父母多联络',
                            '不运动',
                            '买买买',
                            '做不到多喝水',
                            '放弃治疗拖延症',
                            '想换iPhone6'];
        $scope.prizename = {'gift':'。我用这个借口换到了免费的妮维雅沐浴润体乳，',
                            'tmall':'。我用这个借口换到了妮维雅天猫优惠券，',
                            'tmall5':'。我用这个借口换到了妮维雅天猫5元优惠券，',
                            'tmall10':'。我用这个借口换到了妮维雅天猫10元优惠券，',
                            'tmall15':'。我用这个借口换到了妮维雅天猫15元优惠券，',
                            'none':'。'};
        $scope.excusetext = ['碗都还没洗呢！哪有时间涂！',
                            '我堵在高架上了！五分钟！五分钟就到……',
                            '这个点我妈估计又去跳广场舞了，太吵了也听不见啊。',
                            '还没吃饱呢，哪来力气运动！',
                            '双11商家们都打折打到粉碎性骨折，我总不能见死不救。',
                            '我是不喝饮料会死星人，水都没味道怎么喝下八杯……',
                            '我懒我骄傲……',
                            '等妮维雅送！'];
        $scope.showDetails = false;
        $scope.showPopup = false;
        
        $scope.rawinputClass = 'raw';

        $scope.popupexcuseResult = 'images/result-tmall5.png'+r;
        $scope.popupexcuseText = 'images/popup-excusetext-01.png'+r;
        $scope.excuseformClass = 'excuseform1'

        $scope.formele = {'name':'','tel':'','address':'','sheng':'','shi':''}  

        window.onload = $scope.checkLogin();
        //$scope.checkLogin();

    }

    //popup
    $scope.popupInit = function($scope, includepage, _w){

        $scope.popupContent = includepage;
        $scope.showPopup = true;
        //console.log('showPopup:'+$scope.showPopup)
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = g.clientWidth,
        //y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        y = g.clientHeight;
        //console.log(x + ' × ' + y);
        $scope.width = x;
        $scope.height = y;
        $scope.overlayStyle = {'width':x +'px', 'height': y + 'px'};
        $scope.popupPosition = {'left': ($scope.width - _w)/2 + 'px'};
    }
    //endof popup

    //share
    $scope.shareResult = function(){
        var _excuseType = $scope.resulttype;
        var _title="国民借口大换购";
        var _pageurl="http://www.nivea.com.cn/inshower";
        var _picurl="http://ext144.nivea.com.cn/40/jacuzzi/images/share/"+$scope.userInfo.result.prize+'-'+_excuseType+".jpg?v=1111.001";
        var _sharetext="我" + $scope.excusename[_excuseType-1] + "的借口：“" + $scope.userInfo.result.excuse + "”"+$scope.prizename[$scope.userInfo.result.prize]+"秋冬润体不麻烦，真的没借口哦！小伙伴们还等什么？说出借口，更有机会换到iPhone6！";
        var target_str='_blank';
        var window_size="scrollbars=no,width=600,height=450,"+"left=75,top=20,status=no,resizable=yes"; 

        //分享到新浪网
        function shareToSina(sharetext, pageurl, picUrl) {
            window.open("http://v.t.sina.com.cn/share/share.php?title=" + encodeURIComponent('#国民借口大换购#'+sharetext) + "&url=" + encodeURIComponent(pageurl)+"&pic="+encodeURIComponent(picUrl), target_str,window_size)}
        //分享到QQ空间
        function shareToQzone(title, pageurl,sharetext,picUrl) {   
            window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + pageurl+"&title="+encodeURIComponent(title)+"&pics="+encodeURIComponent(picUrl)+"&desc="+encodeURIComponent(sharetext), target_str,window_size);
        }
        
        if($scope.userInfo.usertype == 'qq'){
            shareToQzone(_title,_pageurl,_sharetext, _picurl);
        }else if ($scope.userInfo.usertype == 'weibo'){
            shareToSina(_sharetext, _pageurl, _picurl);
        }
        
    }
    //end of share

    //check login
    
    $scope.checkLogin = function(){
        //console.log('checklogin');
        $http.get('api/?act=userinfo').
          success(function(data, status, headers, config) {
            //console.log(data.result);
            $scope.userInfo = data.result; 

            //console.log($scope.userInfo);
            if ($scope.userInfo.login == 1){
                
                $scope.logininfo = 'html/login.html'+r;
                
            }else{
                $scope.logininfo = 'html/logout.html'+r;

            }
            
            if(window.location.href.indexOf('home.php') == -1 && $scope.userInfo.login == 0){
                //location.href="http://www.nivea.com.cn/inshower-back";
                location.href="http://ext144.nivea.com.cn/40/jacuzzi/home.php";
            }else{
                if ($scope.userInfo.login == 1){
                
                    //$scope.logininfo = 'html/login.html'+r;
                    
                }else{
                    //$scope.logininfo = 'html/logout.html'+r;
                    $scope.submitagainClass = 'submitagain';
                    if($scope.userInfo.showresult){                    
                        $scope.popupInit($scope, 'html/excusepopup.html'+r,765);
                        $scope.popupMyexcuseClass = 'myexcuse' + $scope.userInfo.result.excuseType;
                        $scope.popupexcuseResult = 'images/result-'+$scope.userInfo.result.prize+'.png'+r;
                        $scope.popupexcuseText = 'images/popup-excusetext-0'+$scope.userInfo.result.excuseType+'.png'+r;
                        if($scope.userInfo.result.prize == 'none'){
                            $scope.popupExcuseNoneClass = 'popup-excuse-none';
                        }
                    }
                }
            }

            var _n = $scope.userInfo.result.excuseTypeNew -1;
            $scope.excuseSample = $scope.excusetext[_n];
            $scope.inputholder = $scope.excusetext[_n];
            $scope.excuseformClass = 'excuseform' + $scope.userInfo.result.excuseTypeNew;
            // this callback will be called asynchronously
            // when the response is available
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        
         
        
    }
    //end of checklogin

    $scope.reloadPage = function(){
        location.reload();
    }

    //excuse form
    $scope.validateExcuse = function(e){ 
        var _v = $scope.excuseSample.replace(/^\s+|\s+$/g, "");
        return (_v != $scope.inputholder) && (_v != '');
    }

    $scope.submitExcuse = function(e){
        $scope.excuseform.submitted = false;
        if($scope.excuseform.$valid && $scope.validateExcuse() ){
            //validation form
            //var _excuseType = $scope.userInfo.result.excuseType == $scope.userInfo.result.excuseTypeNew ? 
            $http.post('api/?act=gift', {excuse:$scope.excuseSample,excuseType:$scope.userInfo.result.excuseTypeNew},{headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }}).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                if($scope.userInfo.login == 0 ){
                    $scope.popupInit($scope, 'html/excusepopup.html'+r,765);
                    $scope.userInfo.result.excuse = data.excuse;
                    $scope.popupexcuseResult = 'images/result-'+ data.prize+'.png'+r;
                    $scope.userInfo.result.tmalllink = data.tmalllink;
                    $scope.userInfo.result.prize = data.prize;
                    $scope.popupexcuseText = 'images/popup-excusetext-0'+data.excuseType+'.png'+r;
                    $scope.popupMyexcuseClass = 'myexcuse' + data.excuseType;
                    $scope.resulttype = data.excuseType;
                    if(data.prize == 'none'){
                            $scope.popupExcuseNoneClass = 'popup-excuse-none';
                        }
                }else{
                    //show login popup
                    $scope.popupInit($scope, 'html/loginpopup.html'+r,305);                    
                }
                
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
            
            
          }else{
            $scope.excuseform.submitted = true;
            $scope.excuseform.myexcuse.$error.required = true;
          }
        
    }
    //end of excuse form

})

jacuzzi.controller('contactformCtrl', function($scope, $http){
    $scope.contactSubmit = function(){
        
        $scope.contactform.submitted = false;
        if($scope.contactform.$valid){
            $scope.showsubmitloading=true;
            $http.post('api/?act=giftRecord', $scope.formele, {headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }}).
              success(function(data, status, headers, config) {
                if(data.status == 'timeserror'){
                    $scope.contactform.timeserror = true;
                    $scope.showsubmitsuccess = false;
                }else if(data.status == 'telerror'){
                    contactform.tel.$error = true;
                    $scope.showsubmitsuccess = false;
                }else{
                    $scope.showsubmitsuccess = true;
                }                
                $scope.showsubmitloading = false;
                // this callback will be called asynchronously
                // when the response is available
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.showsubmitsuccess = false;
                $scope.showsubmitloading = false;
              });
        }else{
            $scope.contactform.submitted = true;
        }
    }

    //$scope.goApi = function(){}
})


//excuse History
jacuzzi.controller('excuseListCtrl', function($scope, $http){
	
    $scope.items = [];
        $http.get('api/?act=excuseTopList').
          success(function(data, status, headers, config) {
            $scope.items = data;
            //console.log(data)
            // this callback will be called asynchronously
            // when the response is available
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });      

    var _Scrollbar = (document.documentMode && document.documentMode < 8) ? false:true;

    if(_Scrollbar){
        var config = {};
        $scope.scrollbar = function(direction, autoResize, show) {
            //console.log(config);
            config.direction = direction;
            config.autoResize = autoResize;
            config.scrollbar = {
                show: !!show,
                width:18,
                hoverWidth:18,
                color:'rgb(134,179,255)'
            };
            config.scrollbarContainer= {
                  width: 18, // Width of the container surrounding the scrollbar. Becomes visible on hover
                  color: 'rgba(255,255,255, .0)' // Background color of the scrollbar container
              }
            return config;
        }
    }
    
})
//end of excuse History



