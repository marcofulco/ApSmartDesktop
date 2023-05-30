document.addEventListener("deviceready",deviceReadyCordova,false);

var versioneCordova;
var modello;
var piattaforma;
var uuid;
var versioneOS;
var produttore;
var virtuale;
var Seriale;

function deviceReadyCordova(){
    document.addEventListener("backbutton", didPressBackButton, false);

    versioneCordova=device.cordova;
    modello=device.model;
    piattaforma=device.platform;
    uuid=device.uuid;
    versioneOS=device.version;
    produttore=device.manufacturer;
    virtuale=device.isVirtual;
    Seriale=device.serial;

    // document.getElementById("deviceInfo").innerHTML+="Cordova Version: "+versioneCordova+"<br>";
    // document.getElementById("deviceInfo").innerHTML+="Model: "+modello+"<br>";
    // document.getElementById("deviceInfo").innerHTML+="Platform: "+piattaforma+"<br>";
    // document.getElementById("deviceInfo").innerHTML+="UUID: "+uuid+"<br>";
    // document.getElementById("deviceInfo").innerHTML+="Version: "+versioneOS+"<br>";
    // document.getElementById("deviceInfo").innerHTML+="Manufacturer: "+produttore+"<br>";
    // document.getElementById("deviceInfo").innerHTML+="Is Virtual: "+virtuale+"<br>";
    // document.getElementById("deviceInfo").innerHTML+="Seriale: "+Seriale+"<br>";
    // document.getElementById("orientationInfo").innerHTML="Orientamento: "+screen.orientation.type;

    //console.log(navigator.device.capture);

    //window.open = cordova.InAppBrowser.open;

    //alert(navigator.camera);

}

function didPressBackButton(event) {
    var modalElenco=document.querySelector('.modalElenco');
    var alert=document.querySelector('.modalAlert');
    var modal=document.querySelector('.modal');
    var pdfViewer=document.getElementById('pdfViewer');
    if(pdfViewer!=undefined && pdfViewer!=null && pdfViewer.style.display=='block'){
        chiudiPDFViewer();
    }else if(modalElenco!=undefined && modalElenco.style.display=='block' && modalElenco!=null){
        chiudiModalBox(modalElenco.id);
    }else if((modal!=undefined && modal!=null && modal.style.display=='block')){
        chiudiModalBox(modal.id);
    }else if(document.getElementById('modalCustom')!=undefined){
        chiudiModalCustom();
    }else if(alert!=undefined && alert!=null){
        chiudiModalAlert();
    }else{
        if(typeof esci =='function'){
            esci();
        }else if(typeof clickBack =='function'){
            
            clickBack();
        }else{
            if(nomePagina=='mainPage.html'){
                if(typeof modElectron!='undefined' && modElectron==true){
                    location.href="login.html";
                }else{
                    window.open("login.html","_self");
                }
            }else if(nomePagina=='login.html'){
                navigator.app.exitApp();
            }else{
                attivaAlert(xTipoAllert.ESCLAMAZIONE,"AVVISO!<br>Utilizzare gli appositi pulsanti<br>\"<\" in alto a sinistra per navigare sull'APP!","catchError");
            }
        }
    }

}

function avviaVibrazione(){
    navigator.vibrate([1000, 1000, 3000, 1000, 5000]);
}

function stopVibrazione(){
    navigator.vibrate([0]);
}