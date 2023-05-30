query['login.html']=new Array;
query['login.html']['modelloRiga']=elementiElencoServer;

query['login.html']['oggetti']=new Array;
query['login.html']['oggetti']['{ID}']="id";
query['login.html']['oggetti']['{DESCRIZIONE}']="descrizione";

function onSubmit(token) {
    login(0,token);
}

carDatiLogin();

function carDatiLogin(){
    var u=window.localStorage.getItem("u");
    var t=window.localStorage.getItem("t1");
    var stopLogin=window.sessionStorage.getItem("stopLogin");
    
    if (!(document.location.protocol=="http:" || document.location.protocol=="https:") || document.URL.indexOf('localhost')>0 ){
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
    }

    if (u!=undefined){
        var userName=document.getElementById("txtUserName");
        var password=document.getElementById("txtPassword");
        var chkPwd=document.getElementById("chkPassword");

        userName.value=u;
        password.value=t;

        if (t!=undefined){
            chkPwd.checked=true;
        }
    }
    
    if (verAggOffLine=="true"){
        var divOffLine=document.getElementById("divOffLine");
        divOffLine.classList.remove("hide");
    }

    if (xOffLine=="true"){
        mostraNascondiXOffLine();
    }

    if (gRe!='' && u!=null && u!='' && t!=null && t!='' && stopLogin!="true"){
        login();
    } else {
        window.sessionStorage.removeItem("stopLogin");
    }
}

function mostraNascondiXOffLine(mostra=false){
    var password=document.getElementById("divPwd");
    var divPwd=document.getElementById("divMemoPwd");

    if (mostra){
        password.classList.remove("hide");
        divPwd.classList.remove("hide");
    } else {
        password.classList.add("hide");
        divPwd.classList.add("hide");
        valorizzaCheckedElemento("chkOffLine",true);
    }
}

function login(idServer=0,token='',t1=''){
    if (xOffLine!="true"){
        var userName=document.getElementById("txtUserName").value.replace(/\s/g,'');
        var password=document.getElementById("txtPassword").value;
        var chkPwd=document.getElementById("chkPassword").checked;
        var id=window.localStorage.getItem("id");

        if (userName==""){
            attivaAlert(2,"Nome Utente Non Valido!","login","","",'reloadPagina');
            return;
        }

        if (password==""){
            attivaAlert(2,"Password Non Valida!","login","","",'reloadPagina');
            return;
        }

        if (id==undefined){
            id="";
        }

        if (t1==''){
            app=gRe;
        } else {
            app=t1;
        }

        var parametri={"userName": userName,"password":password, "idServer":idServer,"chiamante":"login","idDispositivo":id,"app":app,"captchaToken":token};

        inviaRichiestaCentralino("login",parametri,"","","reloadPagina");
    } else {
        var modCassa=window.localStorage.getItem("offlineVenditaBanco");
        if(modCassa=='true'){
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="venditaBanco.html";
            }else{
                window.open("venditaBanco.html","_self");
            }
            
            return;
        }
        if(typeof modElectron!='undefined' && modElectron==true){
            location.href="mainPage.html";
        }else{
            window.open("mainPage.html","_self");
        }
            
        
    }
}

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    var chkPwd=document.getElementById("chkPassword").checked;

    if (risp.error!=''){
        return "";
    }

    if (data.cambioPassword==1){
        console.log("Cambio Password="+$data.cambioPassword);
        //creare codice per cambio password
    }

    if (data.esito=="elenco"){
        window.localStorage.setItem("u",parametri.userName);
        window.localStorage.setItem("t1",data.tokenLogin);
        window.localStorage.setItem("id",data.idDispositivo);

        document.getElementById("txtPassword").value=data.tokenLogin;

        sceltaServer(data.server);
    } else if (data.esito!="ok.") {
        attivaAlert(2,data.esito,"verificaTokenNonOk");
    } else {
        if (data.token==''){
            attivaAlert(2,"Accesso Non Valido!","verificaToken");        
        } else {
            window.sessionStorage.clear();
            
            window.sessionStorage.setItem("t",data.token);
            window.sessionStorage.setItem("userName",parametri.userName);
            window.sessionStorage.setItem("s",data.idServer);
            window.sessionStorage.setItem("nome",data.nome);
            window.sessionStorage.setItem("cognome",data.cognome);
            window.sessionStorage.setItem("img",data.img);
            window.sessionStorage.setItem("superUser",data.superUser);
            window.sessionStorage.setItem("gruppoUtente",data.gruppoUtente);
            window.sessionStorage.setItem("versioneApp",data.versioneApp);
            window.sessionStorage.setItem("fileAppAndroid",data.fileAppAndroid);
            window.sessionStorage.setItem("imgLogoInt",data.imgLogo);
            window.sessionStorage.setItem("ragSocCliente",data.ragSocCliente);
            window.sessionStorage.setItem("ragSocAgente",data.ragSocAgente);
            window.sessionStorage.setItem("nomeConfigurazione",data.nomeConfigurazione);
            window.sessionStorage.setItem("idC",data.idConfigurazione);
            window.sessionStorage.setItem("mailMittente",data.mailMittente);
            window.sessionStorage.setItem("nomeMittente",data.nomeMittente);
            window.sessionStorage.setItem("listino",data.listino);
            window.localStorage.setItem("nomePiattaforma",data.nomePiattaforma);
            
            if(data.xUrlBase!=undefined && data.xUrlBase!=''){
                window.localStorage.setItem('xUrlBase',data.xUrlBase)
                window.localStorage.setItem('xUrlPHP',data.xUrlBase+'backend/')
            }else if(data.xUrlBase==''){
                
                window.localStorage.removeItem('xUrlBase');
                window.localStorage.removeItem('xUrlPHP');
            }
            
            
            if (data.idAgente==null){
                data.idAgente=0;
            }

            if (data.idCliente==null){
                data.idCliente=0;
            }

            window.sessionStorage.setItem("xIdAgente",data.idAgente);
            window.sessionStorage.setItem("xIdCliente",data.idCliente);
            window.sessionStorage.setItem("xIdVettore",data.idVettore);

            window.localStorage.setItem("id",data.idDispositivo);
            

            if (chkPwd){
                window.localStorage.setItem("u",parametri.userName);
                window.localStorage.setItem("t1",data.tokenLogin);
            } else {
                window.localStorage.removeItem("t1");
            }
            if(localStorage.getItem('modSupermercato.'+data.idConfigurazione)=='true'){
                if(typeof modElectron!='undefined' && modElectron==true){
                    location.href="venditaBanco.html";
                }else{
                    window.open("venditaBanco.html","_self");
                }
                
                return;
            }
            if (data.privacy==0 && data.richiediPrivacy==1 && data.idCliente>0){
                window.open("informativaPrivacy.html","_self");
            } else {
                if(typeof modElectron!='undefined' && modElectron==true){
                    location.href="mainPage.html";
                }else{
                    window.open("mainPage.html","_self");
                }
                
            }
        }
    }
}

function sceltaServer(e){
    popolaElencoDaJson(e,"elencoServer",0,nomePagina);
    modal=document.getElementById('myStorico');
    var captionText=modal.getElementsByTagName("div");

    modal.style.display="block";
    captionText[1].innerHTML="Scegli Server da Utilizzare";    
}

function avviaServer(id){
    app=window.localStorage.getItem("t1");
    chiudiModalBox();
    login(id,'',app);
    
    localStorage.setItem('dataLogin',oggiISO());
}

function passwordDimenticata(){
    sessionStorage.removeItem("utenteAttiva");
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="passwordDimenticata.html";
    }else{
    window.open("passwordDimenticata.html","_self");
    }
}

// window.addEventListener("keyup", event => {
//     if (event.isComposing) {
//         return;
//     }

//     if (event.key=="Enter"){
//         login()
//     }
// });