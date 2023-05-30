var nomePaginaConfig=location.pathname.split("/").slice(-1)[0];
if(window.localStorage.getItem('xUrlBase')!=undefined && (nomePaginaConfig!='login.html' || modElectron==true)){
    var xUrlBase=window.localStorage.getItem('xUrlBase');
}else{
    var xUrlBase="https://smart.aziendapratica.it/test/";
}
if(window.localStorage.getItem('xUrlPHP')!=undefined && (nomePaginaConfig!='login.html' || modElectron==true)){
    var xUrlPHP=window.localStorage.getItem('xUrlPHP');
}else{
    var xUrlPHP="https://smart.aziendapratica.it/test/backend/";
}



var xColoreBase="75, 122, 70";
var xColoreScuro="40, 69, 37"
var xColoreSecondario="30, 87, 153";
var xColoreBaseHex="#4B7A46"
var xColorCSS="css/clrAziendaPratica.css";
var xSfondo="clrSfondoAP";
var xLogoGrande="img/logo.png";
var xLogoMedio="img/logo.png";
var xLogoPiccolo="img/logo.png";
var xClasseLogoOrizzontale="logoOrizzontale";
var gRe="captcha Non Necessario!!!";
var xfileAppAndroid='android.apk?v='+Date.now();
var appleTouchIcon="img/icona152.png";
var msapplicationTileImage="img/icona144.png";
var favicon="favicon.ico";
var applicationName="Azienda Pratica Smart";
var disabilitaDownloadApk=true;
var modCordova=false;
var modElectron=true;