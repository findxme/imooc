

function btnhandle() {
    var signin=document.getElementById("js-signin-btn");
    var signup=document.getElementById("js-signup-btn");
    var search=document.querySelector(".showhide-search");
    var searcharea=document.querySelector(".search-area");
    var backtop=document.getElementById("backTop");
    EventUtil.addHandler(search,"click",function (event) {
        if(searcharea.style.display=="block"){
            searcharea.style.display="none";
        }else{
            searcharea.style.display="block";
        }
    }); 
    /*EventUtil.addHandler(gbanner,"click",function (event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        if(target.parentNode.className=="banner-dots"){
            if(target.className!="active"){
                var active=target.parentNode.querySelector(".active");
                active.className="";
                target.className="active";
                var spans=target.parentNode.getElementsByTagName("span");
                for(var i=0;i<spans.length;i++){
                    if(spans[i].className=="active"){
                        for(var j=0;j<background.length;j++){
                            background[j].style.display="none";
                        }
                        background[i].style.display="block";
                    }
                }
            }
        }
    });*/
    EventUtil.addHandler(signin,"click",Signhandle/*function (event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        signin_up(target.dataset.sign);
    }*/);
    EventUtil.addHandler(signup,"click",Signhandle/*function (event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        signin_up(target.dataset.sign);
    }*/);
    EventUtil.addHandler(document,"mousewheel",Wheelhandle);
    EventUtil.addHandler(window,"DOMMouseScroll",Wheelhandle);
    EventUtil.addHandler(window,"scroll",Wheelhandle);
    EventUtil.addHandler(backtop,"click",Animate);
}
function Animate(event) {
    var timer=setInterval(function () {
        var bodyscrolltop=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
        bodyscrolltop=bodyscrolltop-1000;
        window.scrollTo(0,bodyscrolltop)
        if(bodyscrolltop<=0){
            clearInterval(timer);
        }
    },20);
}
//绑定滚轮事件
function Wheelhandle (event) {
    var bodyscrolltop=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
    if(bodyscrolltop>600){
        var backtop=document.getElementById("backTop");
        backtop.style.display="block";
    }else{
        var backtop=document.getElementById("backTop");
        backtop.style.display="none";
    }
}
//登入注册按钮绑定函数
function Signhandle (event) {
    event=EventUtil.getEvent(event);
    var target=EventUtil.getTarget(event);
    signin_up(target.dataset.sign);
}
//图片轮播
function Carousel() {
    var prev=document.querySelector(".prev");   
    var next=document.querySelector(".next"); 
    var background=document.querySelectorAll(".banner-slide");
    var dot=document.querySelector(".banner-dots");
    var dots=dot.getElementsByTagName("span");
    var index=0;
    EventUtil.addHandler(prev,"click",function () {
        index--;
        if(index<0){
            index=background.length-1;
        }else if(index>background.length-1){
            index=0;
        }
        Animate();
        Showdot()
    });
    EventUtil.addHandler(next,"click",function () {
        index++;
        if(index<0){
            index=background.length-1;
        }else if(index>background.length-1){
            index=0;
        }
        Animate();
        Showdot();
    });
    var timer=setInterval(function () {
        index++;
        if(index<0){
            index=background.length-1;
        }else if(index>background.length-1){
            index=0;
        }
        Animate();
        Showdot();
    },3000);
    EventUtil.addHandler(dot,"click",function (event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        if(target.className=="active"){
            return;
        }
        for(var i=0;i<dots.length;i++){
            if(dots[i]===target){
                index=i;
                break;
            }
        }
        Animate();
        Showdot();
    });
    function Showdot() {
        for(var i=0;i<dots.length;i++){
            if(dots[i].className=="active"){
                dots[i].className="";
                break;
            } 
        }
        dots[index].className="active";
    }
    function Animate() {
        for(var i=0;i<background.length;i++){
            if(background[i].style.display=="block"){
                background[i].style.display="none";
                break;
            }
        }

        background[index].style.display="block";
    }
}
//注册登入界面获取AJAX程序
function signin_up(sign) {
    var self=this;
    this.sign=sign;
    xmlHttp=getXmlHttpObject()
    if (xmlHttp==null){
        alert ("Browser does not support HTTP Request");
        return;
    }
    var url="signin_up.php";
    url=url+"?q="+sign;
   /* url=url+"&sid="+Math.random();*/
    xmlHttp.onreadystatechange= function (){stateChanged(self.sign)}; 
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}
function stateChanged(sign) { 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") {
       if(sign=="signin"){
           var div=document.createElement("div");
           var bod=document.getElementById("index");
           bod.appendChild(div);
          /* div.id="signin";*/
           div.className="rl-modal";
           div.innerHTML=xmlHttp.responseText;
           var div1=document.createElement("div");
           bod.appendChild(div1);
           div1.className="modal-backdrop";
           addInterfaceEvent(div);
           EventUtil.addHandler(div1,"click",function (event) {
               for(var i=0;i<2;i++){
                   bod.removeChild(bod.lastChild);
                }
           });
        }else if(sign=="signup"){
           var div=document.createElement("div");
           var bod=document.getElementById("index");
           bod.appendChild(div);
           /*div.id="signup";*/
           div.className="rl-modal";
           div.innerHTML=xmlHttp.responseText ;
           var signin=document.getElementById("signin");
           signin.className="";
           var signup=document.getElementById("signup");
           signup.className="active-title";
           var verify=document.getElementById("verify");
           verify.parentNode.className=verify.parentNode.className.replace(" hide","");
           var forget=document.getElementById("forget");
           forget.className=forget.className+" hide";
           var erweima=document.querySelector(".erweima");
           erweima.className=erweima.className+" hide";
           var div1=document.createElement("div");
           bod.appendChild(div1);
           div1.className="modal-backdrop";
           var btn=document.getElementById("signchange");
           btn.value="注册";
           requestVerify();
           EventUtil.addHandler(div1,"click",function (event) {
               for(var i=0;i<2;i++){
                   bod.removeChild(bod.lastChild);
                }
            });
           addInterfaceEvent(div);
          // addInterfaceEvent(div1);
        }
    } 
}
//注册登入界面转换
function inerfaceChange(target) {
    if(target.className!="active-title"){
        if(target.dataset.sign=="signin"){
            target.className="active-title";
            var signup=document.getElementById("signup");
            signup.className="";
            var verify=document.getElementById("verify");
            verify.parentNode.className=verify.parentNode.className+" hide";
            var forget=document.getElementById("forget");
            forget.className=forget.className.replace(" hide","");
            var erweima=document.querySelector(".erweima");
            erweima.className=erweima.className.replace(" hide","")
            var btn=document.getElementById("signchange");
            btn.value="登入";
            return;
        }else if(target.dataset.sign=="signup"){
            target.className="active-title";
            var signin=document.getElementById("signin");
            signin.className="";
            var verify=document.getElementById("verify");
            verify.parentNode.className=verify.parentNode.className.replace(" hide","");
            var forget=document.getElementById("forget");
            forget.className=forget.className+" hide";
            var erweima=document.querySelector(".erweima");
            erweima.className=erweima.className+" hide";
            var btn=document.getElementById("signchange");
            btn.value="注册";
            requestVerify();
            return;
        }
    }
}
          
//给登入注册面添加事件
function addInterfaceEvent(div) {
    var email=document.getElementById("email");
    var password=document.getElementById("password");
    var verify=document.getElementById("verify");
    var bod=document.getElementById("index");
    EventUtil.addHandler(div,"click",function (event) {
        event=EventUtil.getEvent(event);
        var target=EventUtil.getTarget(event);
        if(target.id=="canvas"){
            requestVerify();
            return;
        }
        if(target.className=="rl-close"){
            for(var i=0;i<2;i++){
                bod.removeChild(bod.lastChild);
            }
        }
        if(target.type=="button"){
            var active=document.querySelector(".active-title").id;
            if(active=="signup"){
                var sign=(Sign.testUser()&Sign.testPassword()&Verify.testVerify());
            }else if(active=="signin"){
                var sign=(Sign.testUser()&Sign.testPassword());
            }
            if(sign){
                xmlHttp=null;
                xmlHttp=getXmlHttpObject();
                if (xmlHttp==null){
                    alert ("Browser does not support HTTP Request");
                    return;
                }
                xmlHttp.onreadystatechange= function (){
                    if(xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){
                        var str=xmlHttp.responseText;
                        var obj=JSON.parse(str)
                        dealData(obj);
                    }
                }; 
                xmlHttp.open("post","verify.php",true);
                xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                var form=document.getElementById("sign-form");
                xmlHttp.send(serialize(form)+"&sign="+active);
                return;
            }else{
                outputStyle(email);
                outputStyle(password);
                outputStyle(verify);
            }
        }
        inerfaceChange(target);
    });

    EventUtil.addHandler(email,"blur",function (event) {
        outputStyle(email);
    });
    EventUtil.addHandler(password,"blur",function (event) {
        outputStyle(password);
    });
    EventUtil.addHandler(verify,"blur",function (event) {
        outputStyle(verify);
    });
}



//更新验证码
function requestVerify () {
    xmlHttp=getXmlHttpObject()
    if (xmlHttp==null){
        alert ("Browser does not support HTTP Request");
        return;
    }
    var url="verify.php";
    /* url=url+"&sid="+Math.random();*/
    xmlHttp.onreadystatechange=function () {
        if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") {
            var str=xmlHttp.responseText;
            Verify.getVerify(str);
            var canvas=document.getElementById("canvas");
            Verify.drawVerify(canvas);
        }
    }
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

//登入注册界面的数据检测
var Sign={
    email:"",
    password:"",
    verify:"",
    //用户名的检测
    testUser:function () {
        var pattern=/([\w\d-])+@([\w-]+\.[\w-]+)+/;
        var pattern1=/\d{11}/;
        if(pattern.test(this.email)||pattern1.test(this.email)){
            return true;
        }else{
            return false;
        }
    },
    testPassword:function () {
        var pattern=/[\w\d-]{6,16}/;
        if(pattern.test(this.password)){
            return true;
        }else{
            return false
        }
    },
    getData:function (target) {
        switch(target.id){
            case "email" :
                this.email=target.value;
                break;
            case "password" :
                this.password=target.value;
                break;         
            case "verify" :
                this.verify=target.value;
                break;
            default:
               alert("此函数只能用于用户名、密码、验证码的获取");    
        }

    }
}
//根据检测的结果确定样式
function outputStyle(target) {
    Sign.getData(target);
    var ok=true;
    if(target.id=="email"){
        if(!Sign.testUser()){
            ok=false;
        }

    }else if(target.id=="password"){
        if(!Sign.testPassword()){
            ok=false;
        }

    }else{
        if(!Verify.testVerify()){
            ok=false;
        }
    }
    if(!ok){
        var p=target.parentNode.querySelector(".errorHint");
        p.innerHTML=p.dataset.error;
    }else{
        var p=target.parentNode.querySelector(".errorHint");
        p.innerHTML="";
    }
}
//对服务器处理表单返回的数据进行处理
function dealData(data) {
    if(data.sign=="signin"){
        switch(data.type){
            case 0:
                var email=document.getElementById("email");
                var p=email.parentNode.querySelector(".errorHint");
                p.innerHTML=p.dataset.error;
                break;
            case 1:
                var body=document.getElementById("index");
                for(var i=0;i<2;i++){
                   body.removeChild(body.lastChild);
                }
                Suceess(data.email);
                break;
            case 2:
                var password=document.getElementById("password");
                var p=password.parentNode.querySelector(".errorHint");
                p.innerHTML="密码错误"; 
                break;
        }

    }else if(data.sign=="signup"){
        switch(data.type){
            case 0:
                var email=document.getElementById("email");
                var p=email.parentNode.querySelector(".errorHint");
                p.innerHTML="用户名重复";
                var str=data.str;
                Verify.getVerify(str);
                var canvas=document.getElementById("canvas");
                Verify.drawVerify(canvas);
                break;
            case 1:
                var body=document.getElementById("index");
                for(var i=0;i<2;i++){
                   body.removeChild(body.lastChild);
                }
                Suceess(data.email);
                break;
        }
    }
}
//登入注册成功
function Suceess(user) {
    var signin=document.getElementById("js-signin-btn");
    var signup=document.getElementById("js-signup-btn");
    EventUtil.removeHandler(signin,"click",signhandle);
    EventUtil.removeHandler(signup,"click",signhandle);
    signin.innerHTML="退出";
    signup.innerHTML=user;
    EventUtil.addHandler(signin,"click",function (event) {
        signin.innerHTML="登入";
        signup.innerHTML="注册";
        EventUtil.removeHandler(signin,"click",arguments.callee);
        EventUtil.addHandler(signin,"click",signhandle);
        EventUtil.addHandler(signup,"click",signhandle);
    }); 
}
//此对象用于验证码的获取和验证
var Verify={
    str:"",
    //获取验证码
    getVerify:function (str) {
        this.str=str;
    },
    //绘制验证码
    drawVerify:function (canvas) {
        canvas.width=70;
        canvas.height=40;
        var context=canvas.getContext("2d");
        context.fillStyle="rgba(100,100,100,0.5)";
        context.fillRect(0,0,70,40);
        context.font="bold 14px Arial";
        context.textAlign="center";
        context.textBaseline="middle";
        for(var i=0;i<this.str.length;i++){
            context.save();
            context.translate(0,20);
            /*context.rotate(Math.floor(Math.random()*60));*/
            context.fillText(this.str.substr(i,1),14+i*14,0);
            context.restore();
        }
        context=null;
    },
    //测试验证码
    testVerify:function () {
        if(this.str==Sign.verify){
            return true;
        }else{
            return false;
        }
    }
} 


addLoadEvent(btnhandle);
addLoadEvent(Carousel);






