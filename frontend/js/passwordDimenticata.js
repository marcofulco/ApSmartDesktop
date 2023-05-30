var backPage="login.html";
backPage=recuperaParametroHRef(backPage,"bp");

carDatiLogin();

function annulla(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href=backPage;
    }else{
        window.open(backPage,'_self');
    }
    
}

function carDatiLogin(){
    var des="PASSWORD DIMENTICATA";
    var domanda="Hai problemi di accesso?";
    
    var c = location.href.split("?");
    if (c.length>1){
        v=c[1].split("&");
        if (v.length>0){
            for (y in v){
                z=v[y].split("=");    
                if (z[0]=="c"){
                    des="CAMBIO PASSWORD";
                    domanda="Vuoi Cambiare la Tua Password?";
                    document.getElementById("btAnnulla").setAttribute("onclick","location.href='mainPage.html'");
                }
            }
        } else {
            z=c[1].split("=");
            if (z[0]=="c"){
                des="CAMBIO PASSWORD";
                domanda="Vuoi Cambiare la Tua Password?";
                document.getElementById("btAnnulla").setAttribute("onclick","location.href='mainPage.html'");
            }
        }
    }

    document.getElementById("txtH3").innerHTML=des;
    document.getElementById("txtDomanda").innerHTML=domanda;

    var u=sessionStorage.getItem("utenteAttiva");
    if (u==undefined){
        u=window.localStorage.getItem("u");
    }
    
    if (u!=undefined){
        var userName=document.getElementById("txtUserName");
    
        userName.value=u;
    }

    document.getElementById("pwdLost").setAttribute("action", xUrlPHP+"php/googleReCaptcha.php");
    
    if (!(document.location.protocol=="http:" || document.location.protocol=="https:") || document.URL.indexOf('localhost')>0){
        div = document.createElement("input");
        div.id = "noCaptcha"; 
        div.setAttribute("name","noCaptcha"); 
        div.setAttribute("hidden",""); 
        div.value=gRe;
        document.getElementById("pwdLost").appendChild(div);
        
        var btn=document.getElementById("btReCaptcha");
        btn.parentNode.removeChild(btn);
        document.getElementById("btNoCaptcha").classList.remove("hide");  
    } else {
        var btn=document.getElementById("btNoCaptcha");
        btn.parentNode.removeChild(btn);

        var script=document.createElement("script");
        script.setAttribute("src","https://www.google.com/recaptcha/api.js");
        document.body.appendChild(script);

        div = document.createElement("input");
        div.id = "bp"; 
        div.setAttribute("name","bp"); 
        div.setAttribute("hidden",""); 
        div.value=backPage;
        document.getElementById("pwdLost").appendChild(div);
    }
}

function passwordDimenticataNC() {
    fetch(xUrlPHP+"php/googleReCaptcha.php", {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "*/*",
            "Origin":"null"
        },
        body: 'txtUserName='+document.getElementById("txtUserName").value+'&bp='+backPage+'&noCaptcha='+gRe+'&g-recaptcha-response='
    })
    .then(res=>res.json())
    .then(function (phpRes) {
        alert(phpRes.risposta.replace(/<br>/g," "));
        window.open(backPage,"_self");
    });
}