/*!
 * swiped-events.js - v1.1.4
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!function (t, e) { "use strict"; "function" != typeof t.CustomEvent && (t.CustomEvent = function (t, n) { n = n || { bubbles: !1, cancelable: !1, detail: void 0 }; var a = e.createEvent("CustomEvent"); return a.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), a }, t.CustomEvent.prototype = t.Event.prototype), e.addEventListener("touchstart", function (t) { if ("true" === t.target.getAttribute("data-swipe-ignore")) return; s = t.target, r = Date.now(), n = t.touches[0].clientX, a = t.touches[0].clientY, u = 0, i = 0 }, !1), e.addEventListener("touchmove", function (t) { if (!n || !a) return; var e = t.touches[0].clientX, r = t.touches[0].clientY; u = n - e, i = a - r }, !1), e.addEventListener("touchend", function (t) { if (s !== t.target) return; var e = parseInt(l(s, "data-swipe-threshold", "20"), 10), o = parseInt(l(s, "data-swipe-timeout", "500"), 10), c = Date.now() - r, d = "", p = t.changedTouches || t.touches || []; Math.abs(u) > Math.abs(i) ? Math.abs(u) > e && c < o && (d = u > 0 ? "swiped-left" : "swiped-right") : Math.abs(i) > e && c < o && (d = i > 0 ? "swiped-up" : "swiped-down"); if ("" !== d) { var b = { dir: d.replace(/swiped-/, ""), xStart: parseInt(n, 10), xEnd: parseInt((p[0] || {}).clientX || -1, 10), yStart: parseInt(a, 10), yEnd: parseInt((p[0] || {}).clientY || -1, 10) }; s.dispatchEvent(new CustomEvent("swiped", { bubbles: !0, cancelable: !0, detail: b })), s.dispatchEvent(new CustomEvent(d, { bubbles: !0, cancelable: !0, detail: b })) } n = null, a = null, r = null }, !1); var n = null, a = null, u = null, i = null, r = null, s = null; function l(t, n, a) { for (; t && t !== e.documentElement;) { var u = t.getAttribute(n); if (u) return u; t = t.parentNode } return a } }(window, document);

window.onerror = function myErrorHandler(error, url, lineNumber, column, errorObj) {
    error = error.replace("Uncaught ", "");

    switch (error) {
        case "ReferenceError: apriCarrello is not defined":
        case "ReferenceError: tornaScheda is not defined":
        case "TypeError: Cannot set properties of undefined (setting 'modelloRiga')":
        case "TypeError: undefined is not an object (evaluating 'carrelloJson.prodotti')":
        case "ReferenceError: clickBack is not defined":
        case "Script error.":
        case "ReferenceError: tornaElenco is not defined":
        case "ReferenceError: tabClick is not defined":
        case "ReferenceError: txtRicercaChange is not defined":
        case "SyntaxError: Unexpected EOF":
        case "ReferenceError: Elimina is not defined":
        case "ReferenceError: Can't find variable: Elimina":
        case "TypeError: null is not an object (evaluating 'carrelloJson.prodotti')":
        case "ReferenceError: $ is not defined":
        case "ReferenceError: Can't find variable: elementiPreOrdini":
        case "ReferenceError: avviaCarDati is not defined":
        case "ReferenceError: Can't find variable: tornaElenco":
        case "SyntaxError: Unexpected end of input":
        case "TypeError: undefined is not an object (evaluating 'query[nomePagina]['MAXFETCH']')":
        case "ReferenceError: Can't find variable: elementiListaClienti":
        case "SyntaxError: missing ) after argument list":
        case "SyntaxError: Invalid regular expression: missing /":
        case "ReferenceError: Can't find variable: clickBack":
        case "ReferenceError: Can't find variable: elementiMenuGruppo":
        case "ReferenceError: Can't find variable: tabClick":
        case "TypeError: Cannot read properties of undefined (reading 'modelloContenitore')":
        case "ReferenceError: elementiFiltriSceltaMultipla is not defined":
        case "ReferenceError: Can't find variable: modalRubrica":
        case "ReferenceError: Can't find variable: tornaScheda":
        case "ReferenceError: apriArticoli is not defined":
        case "ReferenceError: avviaCarDettagliDocumenti is not defined":
        case "ReferenceError: caricaCarrello is not defined":
        case "ReferenceError: statoOrdini is not defined":
        case "ReferenceError: apriGrafici is not defined":
        case "ReferenceError: Can't find variable: elementiFiltriSceltaMultipla":
        case "ReferenceError: Can't find variable: elementiListaClientiFiltro":
        case "SyntaxError: unterminated regular expression literal":
        case "SyntaxError: Unterminated regular expression literal '/div>'":
        case "ReferenceError: Can't find variable: modalECDocumenti":
        case "ReferenceError: caricaMenu is not defined":
        case "ReferenceError: Can't find variable: txtRicercaChange":
        case "ReferenceError: Can't find variable: elementiOrdinamento":
        case "TypeError: Cannot read property 'MAXFETCH' of undefined":
        case "ReferenceError: tornaIndietro is not defined":
        case "ReferenceError: Can't find variable: apriArticoli":
            attivaAlert(2, "Ops ... Si è verificato un errore!<br>Sarà ricaricata automaticamente la pagina tra 5 secondi<br>Assicurarsi che la connessione ad internet sia attiva e funzionante!", "catchError");
            setTimeout(function () {
                location.reload();
            }, 5000);
        case "ReferenceError: globalThis is not defined":
        case "ReferenceError: comboScomparsaChiudi is not defined":
            return;
        case "TypeError: Necessario Ripartire da Home":
            attivaAlert(2, "Ops ... Si è verificato un errore!<br>Sarai reindirizzato alla pagina principale automaticamente tra 5 secondi<br>Assicurarsi che la connessione ad internet sia attiva e funzionante!", "catchError");
            setTimeout(function () {
                location.href="mainPage.html";
            }, 5000);
            return;
    }

    if (error.indexOf("EvalError") >= 0) {
        return;
    }

    console.error(error);
    var testoErrore = "<b>Errore: </b>" + error + "<br/><br/><b>Stack: </b>" + errorObj.stack + "<br/><br/><b>url: </b>" + url + "<br/><br/><b>riga: </b>" + lineNumber + ':' + column;
    inviaSegnalazioneViaMail(testoErrore);
}

/* VARIABILI GENERALI */
const versioneFrontEnd = "2.0.00";
var verAggOffLine = localStorage.getItem("visualizzaOffLine");
var xOffLine = localStorage.getItem("offLine");
//var matriceColori = ['0,255,255', '0,0,255', '255,0,255', '128,128,128', '0,128,0', '0,255,0', '128,0,0', '0,0,128', '128,128,0', '128,0,128', '255,0,0', '192,192,192', '0,128,128', '180,180,0', '0,0,0'];
var matriceColori = ['0,255,255', '0,0,255', '255,0,255', '128,128,128', '0,128,0', '0,255,0', '128,0,0', '0,0,128', '128,128,0', '128,0,128', '255,0,0', '192,192,192', '0,128,128', '180,180,0', '240,248,255', '250,235,215', '127,255,212', '240,255,255', '245,245,220', '255,228,196', '255,235,205', '0,0,255', '138,43,226', '165,42,42', '222,184,135', '95,158,160', '127,255,0', '210,105,30', '255,127,80', '100,149,237', '255,248,220', '220,20,60', '0,255,255', '0,0,139', '0,139,139', '184,134,11', '169,169,169', '0,100,0', '169,169,169', '189,183,107', '139,0,139', '85,107,47', '255,140,0', '153,50,204', '139,0,0', '233,150,122', '143,188,143', '72,61,139', '47,79,79', '47,79,79', '0,206,209', '148,0,211', '255,20,147', '0,191,255', '105,105,105', '105,105,105', '30,144,255', '178,34,34', '255,250,240', '34,139,34', '255,0,255', '220,220,220', '248,248,255', '255,215,0', '218,165,32', '128,128,128', '0,128,0', '173,255,47', '128,128,128', '240,255,240', '255,105,180', '205,92,92', '75,0,130', '255,255,240', '240,230,140', '230,230,250', '255,240,245', '124,252,0', '255,250,205', '173,216,230', '240,128,128', '224,255,255', '250,250,210', '211,211,211', '144,238,144', '211,211,211', '255,182,193', '255,160,122', '32,178,170', '135,206,250', '119,136,153', '119,136,153', '176,196,222', '255,255,224', '0,255,0', '50,205,50', '250,240,230', '255,0,255', '128,0,0', '102,205,170', '0,0,205', '186,85,211', '147,112,219', '60,179,113', '123,104,238', '0,250,154', '72,209,204', '199,21,133', '25,25,112', '245,255,250', '255,228,225', '255,228,181', '255,222,173', '0,0,128', '253,245,230', '128,128,0', '107,142,35', '255,165,0', '255,69,0', '218,112,214', '238,232,170', '152,251,152', '175,238,238', '219,112,147', '255,239,213', '255,218,185', '205,133,63', '255,192,203', '221,160,221', '176,224,230', '128,0,128', '255,0,0', '188,143,143', '65,105,225', '139,69,19', '250,128,114', '244,164,96', '46,139,87', '255,245,238', '160,82,45', '192,192,192', '135,206,235', '106,90,205', '112,128,144', '112,128,144', '255,250,250', '0,255,127', '70,130,180', '210,180,140', '0,128,128', '216,191,216', '255,99,71', '64,224,208', '238,130,238', '245,222,179', '255,255,255', '245,245,245', '255,255,0', '154,205,50'];
var query = new Array; //contiene le informazioni per il popolamento degli elenchi e maschere
var nomePagina = location.pathname.split("/").slice(-1)[0];
var variantePagina = "";
var xTkCom = window.sessionStorage.getItem("t");
var xPwd = window.localStorage.getItem("t1");
var xUserCom = window.sessionStorage.getItem("userName");
var xDB = window.sessionStorage.getItem("s");
var xPercorsoImmagini = "WebImage/";
var xPercorsoAllegati = ""; //window.sessionStorage.getItem("percorsoAllegati");
var xVersioneApp = window.sessionStorage.getItem("versioneApp");
var xNomeConfigurazione = window.sessionStorage.getItem("nomeConfigurazione");
var xRagSocCliente = window.sessionStorage.getItem("ragSocCliente");
var xRagSocAgente = window.sessionStorage.getItem("ragSocAgente");
var xNome = window.sessionStorage.getItem("nome");
var xCognome = window.sessionStorage.getItem("cognome");
var xSuperUser = window.sessionStorage.getItem("superUser");
var xGruppoUtente = window.sessionStorage.getItem("gruppoUtente");
var xIdDispositivo = window.localStorage.getItem("id");
var xIdConfigurazione = window.sessionStorage.getItem("idC");
var xListino = window.sessionStorage.getItem("listino");
var xProgressivo = 0;
var xImmagineAperta = false; //permette di evitare che cliccando sul pulsantino per aprire un'immagine in estratto conto parta l'evento per aprire i dettagli!
var xConnesso = true;
var xTarget = "_self";
var tipoAnagrafica = "";
var xIdAgente = sessionStorage.getItem("xIdAgente");
var xIdCliente = sessionStorage.getItem("xIdCliente");
var xIdVettore = sessionStorage.getItem("xIdVettore");
var xLogoIntestazione = sessionStorage.getItem("imgLogoInt");
var xMobile = false;
var xAppType = (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) || document.URL.indexOf('localhost') > 0;
var xNomeDestinazione = "";
var xParametriGenerali = "";
var xMailMittente = sessionStorage.getItem("mailMittente");
var xNomeMittente = sessionStorage.getItem("nomeMittente");
var xImgUser = sessionStorage.getItem("img");
var xNomeApplicazione = window.localStorage.getItem("nomePiattaforma");
var listaStatoOrdini = {};
var statoOrdiniArray = new Array;
var xTipoDispositivo = 'Web';
if (xOffLine == "true") {
    xTkCom = localStorage.getItem("offLine.t");
    xUserCom = localStorage.getItem("offLine.userName");
    xDB = localStorage.getItem("offLine.s");
    xNome = localStorage.getItem("offLine.nome");
    xCognome = localStorage.getItem("offLine.cognome");
    xImgUser = localStorage.getItem("offLine.img");
    xSuperUser = localStorage.getItem("offLine.superUser");
    xGruppoUtente = localStorage.getItem("offLine.gruppoUtente");
    xVersioneApp = localStorage.getItem("offLine.versioneApp");
    xLogoIntestazione = localStorage.getItem("offLine.imgLogoInt");
    xRagSocCliente = localStorage.getItem("offLine.ragSocCliente");
    xRagSocAgente = localStorage.getItem("offLine.ragSocAgente");
    xNomeConfigurazione = localStorage.getItem("offLine.nomeConfigurazione");
    xIdConfigurazione = localStorage.getItem("offLine.idC");
    xMailMittente = localStorage.getItem("offLine.mailMittente");
    xNomeMittente = localStorage.getItem("offLine.nomeMittente");
    xListino = localStorage.getItem("offLine.listino");
    xIdAgente = localStorage.getItem("offLine.xIdAgente");
    xIdCliente = localStorage.getItem("offLine.xIdCliente");
    xfileAppAndroid = localStorage.getItem("offLine.fileAppAndroid");
    xIdDispositivo = "offLine." + xIdDispositivo;
}

var xIdDaStampare = 0;

if (window.matchMedia('(display-mode: standalone)').matches) {
    xMobile = true;
}

var Filtri = new Array;
Filtri[nomePagina] = new Array;

var elencoInCaricamento = 0;
var xRag = "";

var richiestaAJAXinCorso = 0;

var timer1;

const nomiMesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

var scriptOffLineCaricato = false;

/* FINE VARIABILI GENERALI */

/* PER GESTIONE DIMENSIONAMENTI E POSIZIONAMENTI */
window.addEventListener("orientationchange", function () {
    var originalMarginTop = document.body.style.marginTop;
    document.body.style.marginTop = "1px";
    setTimeout(function () {
        document.body.style.marginTop = originalMarginTop;
        impostaDimensioniPagina();
    }, 100);
}, false);
window.addEventListener('resize', impostaDimensioniPagina, false);
window.addEventListener("DOMContentLoaded", onDeviceReady, false);

function onDeviceReady() {
    if (getParamValue('modRichiamo') != false) {
        xIdDispositivo = getParamValue('modRichiamo');
        var body = document.querySelectorAll('.posTop');
        for (var x in body) {
            body[x].style = "top:0px!important;";
        }

        // var html=document.querySelector('html');
        // html.style="padding-top:0px!important;";
    }
    caricaScriptOffLine();

    eImg = document.createElement("img");
    eImg.setAttribute("hidden", "");
    eImg.src = "img/question.svg";
    document.body.appendChild(eImg);

    eImg = document.createElement("img");
    eImg.setAttribute("hidden", "");
    eImg.src = "img/critical.svg";
    document.body.appendChild(eImg);

    eImg = document.createElement("img");
    eImg.setAttribute("hidden", "");
    eImg.src = "img/attention.svg";
    document.body.appendChild(eImg);

    eImg = document.createElement("img");
    eImg.setAttribute("hidden", "");
    eImg.src = "img/grafiche/successo.svg";
    document.body.appendChild(eImg);

    var script = document.createElement("script");
    script.setAttribute("src", "config/config.js");
    document.body.appendChild(script);

    script.onload = function () {
        var css = document.createElement("link");

        css.setAttribute("href", xColorCSS);
        css.setAttribute("rel", "stylesheet")
        css.setAttribute("type", "text/css");

        document.getElementsByTagName("head")[0].appendChild(css);

        css.onload = function () {
            impostaDimensioniPagina();
            cambiaImmagineUser();
            elaboraCampiRicercaCodice();
            try {
                var e = document.getElementsByClassName("clrSfondoAP");
                e[0].setAttribute("class", xSfondo);
            } catch (error) {

            }

            if (xLogoGrande == "") {
                try {
                    document.getElementById("logoGrande").classList.add("hide");
                } catch (error) {

                }
            } else {
                valorizzaSrcImmagine("logoGrande", xLogoGrande);
            }

            if (xLogoMedio == "") {
                try {
                    document.getElementById("logoMedio").classList.add("hide");
                } catch (error) {

                }
            } else {
                valorizzaSrcImmagine("logoMedio", xLogoMedio);
            }

            if (xLogoPiccolo == "") {
                try {
                    document.getElementById("logoPiccolo").classList.add("hide");
                } catch (error) {

                }
            } else {
                valorizzaSrcImmagine("logoPiccolo", xLogoPiccolo);
            }

            valorizzaSrcImmagine("logoIntestazione", xLogoIntestazione);

            try {
                document.getElementById("logoIntestazione").setAttribute("class", xClasseLogoOrizzontale);
            } catch (error) {

            }
        }

        xParametriGenerali = sessionStorage.getItem("parametriGenerali");
        if (xParametriGenerali != undefined) {
            xParametriGenerali = JSON.parse(xParametriGenerali);
        }

        if (xNomeApplicazione == null) {
            xNomeApplicazione = applicationName;
        }

        document.getElementsByTagName('meta')["msapplication-TileColor"].content = xColoreBaseHex;
        document.getElementsByTagName('meta')["theme-color"].content = xColoreBaseHex;
        document.getElementsByTagName('meta')["msapplication-TileImage"].content = msapplicationTileImage;
        document.getElementsByTagName('meta')["application-name"].content = xNomeApplicazione;
        document.getElementsByTagName('meta')["description"].content = xNomeApplicazione;

        var link = document.getElementsByTagName("link");

        for (x in link) {
            try {
                switch (link[x].getAttribute("rel")) {
                    case "apple-touch-icon":
                        link[x].setAttribute("href", appleTouchIcon);
                        break;
                    case "icon":
                        link[x].setAttribute("href", favicon);
                        break;
                }
            } catch (error) {

            }
        }

        function preventBack() {
            window.history.forward();
        }

        setTimeout(preventBack, 0);
        window.onunload = function () {
            null
        };
        if (typeof modCordova!='undefined'){
         if(modCordova != "" && modCordova==true) {
            //verifica app
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            if (location.pathname.indexOf('login.html') != -1) {
                //verifica pagina principale
                script.setAttribute("src", "../cordova.js");

            } else {
                //verifico l'ambiente
                if (localStorage['cordovaApp'] != undefined) {
                    var tmpCordova = JSON.parse(localStorage['cordovaApp']);
                    var tmpCordovaPlatform = tmpCordova.platformId;
                } else {
                    var tmpCordovaPlatform = 'android';
                }
                if (tmpCordovaPlatform == 'ios') {
                    script.setAttribute("src", "../cordova.js");
                } else {
                    script.setAttribute("src", "../../cordova.js");
                }
            }

            document.getElementsByTagName("head")[0].appendChild(script);
            script.onload = function () {
                localStorage['cordovaApp'] = JSON.stringify(cordova)
                // var script = document.createElement("script");
                // script.setAttribute("src", "js/cordova.js");
                var cmpApp = document.createElement("script");
                cmpApp.setAttribute("type", "text/javascript");
                cmpApp.setAttribute("src", "js/cmpApp.js");
                document.getElementsByTagName("head")[0].appendChild(cmpApp);
                cmpApp.onload = (res) => {

                    document.addEventListener("backbutton", didPressBackButton, false);
                    window.addEventListener('native.keyboardshow', function(e) {
                        // Ottieni l'altezza della tastiera
                        var keyboardHeight = e.keyboardHeight || e.detail.keyboardHeight;
                        
                        // Imposta lo stile CSS per il body per adattarsi all'altezza della tastiera
                        document.body.style.height = 'calc(100% - ' + keyboardHeight + 'px)';
                        document.body.style.overflow = 'auto';
                    });
                    
                    window.addEventListener('native.keyboardhide', function() {
                        // Reimposta lo stile CSS per il body per utilizzare l'intera altezza dello schermo
                        document.body.style.height = '100%';
                        document.body.style.overflow = 'initial';
                    });
                    
                }

                if (getParamValue('modRichiamo') != false) {
                    xIdDispositivo = getParamValue('modRichiamo');
                }
                if (typeof cordova !== 'undefined') {
                    xTipoDispositivo = "cordova";
                }
            }
            }
        }
        if(nomePagina=='login.html'){
            document.getElementById("txtUserName").addEventListener("keyup", function (e) {
                if(this.value=='xconfigurazione'.toLowerCase()){
                    query['xConfigurazionePercorso']=new Array
                    query['xConfigurazionePercorso']['modalC-body']=`<div class="padTop10">
                    <div class="has-float-label w100">
                        <input type="text" id="txtPercorsoBackend" placeholder="Url Base " value="${xUrlBase}">
                        <label for="txtPercorsoBackend">url base</label>
                    </div>
                </div>`;
                apriModalCustom('xConfigurazionePercorso','','Percorso Base','salvaPercorsoBase()',0);
                this.value='';
                }
            })
        }
        if(typeof modElectron !='undefined' && modElectron==true){
            var script = document.createElement("script");
            script.setAttribute("src", "componenti/elementiElectron.js");
            document.body.appendChild(script);
        
            script.onload = function () {

            }
            var btn=document.querySelectorAll('.tastieraModElectron');
            for(var x in btn){
                if(btn[x].classList!=undefined){
                    if(btn[x].classList.contains('hide')){
                        btn[x].classList.remove('hide');
                    }
                }
            }
        }
    }
}
function salvaPercorsoBase(){
    xUrlBase=document.getElementById('txtPercorsoBackend').value;
    if(xUrlBase.substr(xUrlBase.length-1,1)!='/'){
        xUrlBase=xUrlBase+'/';
    }
    localStorage.setItem('xUrlBase',xUrlBase);
    xUrlPHP=xUrlBase+'backend/';
    localStorage.setItem('xUrlPHP',xUrlPHP);
    chiudiModalCustom();
    // location.reload();
}
function impostaDimensioniPagina() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    // alert(vh+" - "+vw);

    var dTB = 0;
    var dTH = 0;
    var dPH = 0;

    var divBase = document.getElementById("divBase");
    var divTesta = document.getElementById("divTesta");
    var divCorpo = document.getElementById("divCorpo");
    var divPiede = document.getElementById("divPiede");

    if (divBase != undefined) {
        dTB = divBase.offsetTop;
        dTH = dTB;
    }

    if (divTesta != undefined) {
        dTH = divTesta.offsetHeight + dTB;
    }

    if (divPiede != undefined) {
        dPH = divPiede.offsetHeight;
    }

    if (divCorpo != undefined) {
        var ul = divCorpo.getElementsByTagName("ul");

        if (!ul.length > 0) {
            ul = divCorpo.getElementsByClassName("ul");
        }

        // if (ul.length>0){
        //     ul[0].style.position="fixed";
        //     ul[0].style.top=dTH;
        //     ul[0].style.bottom=dPH;
        // }
    }

    dTH = 0;

    var nav = document.getElementsByClassName("nav");

    var x = 0;
    var tabContent;
    var hNav = 0;

    for (x = 0; x < nav.length; x++) {
        dTH = 0;
        dPH = 0;

        divTesta = nav[x].getElementsByClassName("navTesta")
        if (divTesta.length > 0) {
            dTH = divTesta[0].offsetHeight;
        }

        divPiede = nav[x].getElementsByClassName("navPiede")
        if (divPiede.length > 0) {
            dPH = divPiede[0].offsetHeight;
        }

        hNav = vh - dTH - dPH - dTB - 65;

        divCorpo = nav[x].getElementsByClassName("navCorpo");
        if (divCorpo.length > 0) {
            // divCorpo[0].style.height=(hNav)+'px';
            divCorpo[0].style.position = "absolute";
            divCorpo[0].style.top = dTH;

            tabContent = divCorpo[0].getElementsByClassName("tabcontent");
            if (tabContent.length > 0) {
                for (z = 0; z < tabContent.length; z++) {
                    dTH = tabContent[z].getAttribute("hMeno");
                    if (dTH != undefined) {
                        dTH = Number(dTH);
                    }

                    // tabContent[z].style.height=(hNav)+'px';

                    // ul=tabContent[z].getElementsByTagName("ul");
                    // if (ul.length>0){
                    //     ul[0].style.height=(hNav-dTH)+"px";
                    // }
                }
            }
        }
    }

}
/* FINE PER GESTIONE DIMENSIONAMENTI E POSIZIONAMENTI */

/* CARICAMENTO IMMAGINI ERRORI */
var descrizioneErroreConnessione = "Si è verificato un errore di connessione al server!<br>Verificare che la connessione Intenet sia attiva e funzionante.";
var eImg;

sessionStorage.setItem("primoCaricamento", Date.now());

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
    if (document[hidden]) {
        //console.log("App Nascosta");
        // setInterval(() => {
        //    console.log("Sono qui!") 
        // }, 1000);
    } else {
        var pc = sessionStorage.getItem("primoCaricamento");
        if (pc != undefined) {
            var ore = Math.abs(pc - Date.now()) / (60 * 60 * 1000);
            var secondi = ore * 60 * 60;
            var minuti = ore * 60;
            //console.log("Dal primo Caricamento hh. "+Math.trunc(ore)+"."+Math.trunc(minuti)+"."+secondi);

            if (ore >= 6) {
                location.reload();
            }
        }
    }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || hidden === undefined) {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

/* PER GESTIONE TABS */

function openPage(pageName, elmnt) {
    //Nascondo tutti gli elementi con class="tabcontent"
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    //Rimuovo il colore di background
    tablinks = document.getElementsByClassName("tablink");
    if (tablinks.length > 0) {
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("tabLinkSelezionato");
        }
    } else {
        tablinks = document.getElementsByClassName("tablinkColonne");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("tabLinkSelezionato");
        }
    }

    if (pageName != "") {
        //Visualizzo il tab specifico
        document.getElementById(pageName).style.display = "block";
    }

    //Aggiungo uno specifico colore al pulsante usato per aprire il contenuto
    // elmnt.style.background = "rgb("+xColoreScuro+")";
    elmnt.classList.add("tabLinkSelezionato");
}

/* FINE GESTIONE TABS */

/* PER ATTIVARE ACCORDION */

function apriChiudiAccordion(a) {
    a.classList.toggle("active");
    var panel = a.nextElementSibling;

    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = (panel.scrollHeight + 30) + "px";
    }

    setTimeout(function () {
        var li = a.parentNode;
        var ul = li.parentNode;
        var os = li.offsetTop - ul.offsetTop;

        if (os < ul.scrollHeight) {
            ul.scrollTop = os;
        }
    }, 200);
}

/* FINE ATTIVARE ACCORDION */

/* FUNZIONI DI UTILITA' GENERALE */
// var deferredPrompt;

// window.addEventListener('beforeinstallprompt', function(event) {
//     console.log('beforeinstallprompt fired');
//     event.preventDefault();
//     deferredPrompt = event;
//     return false;
// }); 

// function installaWebApp(){
//     if (deferredPrompt) {
//         deferredPrompt.prompt();

//         deferredPrompt.userChoice.then(function(choiceResult) {
//             console.log(choiceResult.outcome);

//             if (choiceResult.outcome === 'dismissed') {
//                 console.log('User cancelled installation');
//             } else {
//                 console.log('User added to home screen');
//             }
//         });

//         deferredPrompt = null;         
//     }
// }

function cambiaImmagineUser() {
    if (nomePagina == "registrazioneUtente.html") {
        var aDiv = document.getElementById("userImg");
        aDiv.parentNode.removeChild(aDiv);
        return;
    }

    img = xImgUser;
    divImg = document.getElementById("userImg");

    if (divImg != undefined) {
        if (img != "") {
            divImg.style.backgroundImage = "url(" + xUrlPHP + "img/User/" + img + ")";
        }

        var script = document.createElement("script");
        script.setAttribute("src", "componenti/navBarUtente.js");
        document.body.appendChild(script);

        script.onload = function () {
            document.body.innerHTML += navBarUtente;

            var span = document.getElementById("versioneApp");
            span.innerHTML = "Azienda Pratica Smart Versione " + xVersioneApp + "/" + versioneFrontEnd;

            span = document.getElementById("datiConfigurazione");
            span.innerHTML = xNomeConfigurazione

            if (xRagSocCliente != '' || xRagSocAgente != '') {
                span.innerHTML += " - " + xRagSocAgente + xRagSocCliente;
            }

            if (xSuperUser == 1) {
                span.innerHTML += " - SuperUser"
            }

            var h3 = document.getElementById("datiUtente");
            h3.innerHTML = h3.innerHTML.replace(/{NOME}/g, xNome).replace(/{COGNOME}/g, xCognome)

            if (typeof apriImpostazioniPagina === "function") {
                document.getElementById("imgNBUOpzioniPagina").classList.remove("hide");
            }

            if (nomePagina != "mainPage.html") {
                if (verAggOffLine == "true") {
                    var uImg = document.getElementById("userImg")

                    document.getElementById("divOffLine").classList.remove("hide");
                    //document.getElementById("liAggiornaAppAndroid").classList.remove("hide");

                    if (xOffLine == "true") {
                        uImg.classList.add("clrContornoRosso");
                        valoreChk = true;
                    } else {
                        uImg.classList.remove("clrContornoRosso");
                        valoreChk = false;
                    }
                    valorizzaCheckedElemento("chkOffLine", valoreChk);
                } else {
                    xOffLine = "false";
                }
            }
        }
    }
}

String.prototype.lTrim = function () {
    return this.replace(/^\s+/, "");
}

String.prototype.rTrim = function () {
    var trimmed = this.replace(/\s+$/g, '');
    return trimmed;
};

function _toJSONString(obj) {
    var str = JSON.stringify(obj);
    return str;
}

function arrotonda(valore, decimali) {
    if (document.getElementById('libreriaDecimali')==null){
        const moltiplicatore = Math.pow(10, decimali);
        const moltiplicatoreExtra = Math.pow(10, decimali + 1);

        let numero = Math.floor(valore * moltiplicatore); // arrotondamento per difetto con il numero desiderato di cifre
        let ultimaCifra = Math.floor(valore * moltiplicatoreExtra) % 10; // estrapola la cifra successiva

        if (ultimaCifra >= 5) {
            numero = numero + 1; // aggiunge 1 per arrotondare per eccesso
        }

        return numero / moltiplicatore;
    } else {
        try {
            if(valore==isNaN()){
                valore=Number(valore);
            }else if(valore==null || valore==undefined || valore==''){
                valore=0;
            }
            let numero = new Decimal(valore);
            return Number(numero.toFixed(decimali, Decimal.ROUND_HALF_UP));
        } catch (error) {
            const moltiplicatore = Math.pow(10, decimali);
            const moltiplicatoreExtra = Math.pow(10, decimali + 1);
    
            let numero = Math.floor(valore * moltiplicatore); // arrotondamento per difetto con il numero desiderato di cifre
            let ultimaCifra = Math.floor(valore * moltiplicatoreExtra) % 10; // estrapola la cifra successiva
    
            if (ultimaCifra >= 5) {
                numero = numero + 1; // aggiunge 1 per arrotondare per eccesso
            }
    
            return numero / moltiplicatore; 
        }
    }   
}

function arrotondaPerEccesso(valore, decimali) {
    const moltiplicatore = Math.pow(10, decimali);

    let numero = Math.round(valore * moltiplicatore); //arrotondamento con il numero di cifre desiderato
    let ultimaCifra = numero % 10; //estrapola l'ultima cifra

    if (ultimaCifra >= 5) {
        numero = numero + 10 - ultimaCifra; //aggiunge la differenza tra 10 e l'ultima cifra per arrotondare per eccesso
    }

    return numero / moltiplicatore;
}

function sistemaNull(valore, numero = false) {
    if (valore == null) {
        if (numero) {
            valore = 0;
        } else {
            valore = "";
        }
    }

    return valore;
}

function formattaNumeriInput(valore, decimaliMax, decimaliMin) {
    if (isNaN(valore)) {
        try {
            if (valore.indexOf(",", 0) != -1) {
                valore = (valore.replace(/\./g, "")).replace(/\,/g, ".");
            } else {
                return "";
            }
        } catch (e) {
            return "";
        }
    }

    var formatta = new Intl.NumberFormat("it-IT", {
        minimumFractionDigits: decimaliMin,
        maximumFractionDigits: decimaliMax
    });

    return String(formatta.format(valore)).replace(/\./g, "").replace(/\,/g, ".");
}

function formattaNumeri(valore, decimaliMax, decimaliMin) {
    if (isNaN(valore)) {
        return "";
    }

    var formatta = new Intl.NumberFormat("it-IT", {
        minimumFractionDigits: decimaliMin,
        maximumFractionDigits: decimaliMax
    });

    return formatta.format(valore);
}

var formatter = new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

var formatter1D = new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
});

function controllaPartitaIVA(pi) {
    if (pi == '') return false;
    else if (!/^[0-9]{11}$/.test(pi)) return false;
    else {
        var s = 0;
        for (i = 0; i <= 9; i += 2) {
            s += pi.charCodeAt(i) - '0'.charCodeAt(0);
        }
        for (i = 1; i <= 9; i += 2) {
            var c = 2 * (pi.charCodeAt(i) - '0'.charCodeAt(0));
            if (c > 9) c = c - 9;
            s += c;
        }
        var controllo = (10 - s % 10) % 10;
        if (controllo != pi.charCodeAt(10) - '0'.charCodeAt(0)) return false;
        else return true;
    }
}

function controllaCodiceFiscale(cf) {
    if (cf == '') return false;
    else if (! /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$/.test(cf))
        return false;
    var s = 0;
    var even_map = "BAFHJNPRTVCESULDGIMOQKWZYX";
    for (var i = 0; i < 15; i++) {
        var c = cf[i];
        var n = 0;
        if ("0" <= c && c <= "9")
            n = c.charCodeAt(0) - "0".charCodeAt(0);
        else
            n = c.charCodeAt(0) - "A".charCodeAt(0);
        if ((i & 1) === 0)
            n = even_map.charCodeAt(n) - "A".charCodeAt(0);
        s += n;
    }
    if (s % 26 + "A".charCodeAt(0) !== cf.charCodeAt(15)) return false;
    return true;
}

function validazioneEmail(idElemento, NoInput = false, NoMailMultiple = false) {
    if (NoInput == true) {
        var gEmailStr = recuperaHTMLElemento(idElemento);
    } else {
        var e = document.getElementById(idElemento);
        var desCampo = e.getAttribute("placeholder");
        var gEmailStr = recuperaValueElemento(idElemento);
    }

    if (NoMailMultiple == true) {
        gEmailStr = gEmailStr.replace(/,/g, ";");
    }

    if (gEmailStr.indexOf(",") != -1) {
        var mEmailStr = (gEmailStr + ",").split(",");
    } else {
        var mEmailStr = (gEmailStr + ",").split(",");
    }

    for (x = 0; x < mEmailStr.length - 1; x++) {
        var emailStr = mEmailStr[x].trim();
        var emailPat = /^(.+)@(.+)$/;
        var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
        var validChars = "[^\\s" + specialChars + "]";
        var quotedUser = "(\"[^\"]*\")";
        var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
        var atom = validChars + "+";
        var word = "(" + atom + "|" + quotedUser + ")";
        var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
        var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");
        var matchArray = emailStr.match(emailPat);

        if (matchArray == null) {
            if (NoInput == false) {
                e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2, "Indirizzo " + desCampo + " non valido (controlla @ e .)!", "erroriCampi");
            }

            return false;
        }

        var user = matchArray[1];
        var domain = matchArray[2];

        if (user.match(userPat) == null) {
            if (NoInput == false) {
                e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2, "Indirizzo " + desCampo + " non valido (La parte dell'email prima di '@' non sembra essere valida)!", "erroriCampi");
            }
            return false;
        }

        var IPArray = domain.match(ipDomainPat);

        if (IPArray != null) {
            for (var i = 1; i <= 4; i++) {
                if (IPArray[i] > 255) {
                    if (NoInput == false) {
                        e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                        attivaAlert(2, "Indirizzo " + desCampo + " non valido (L'IP di destinazione non è valido)!", "erroriCampi");
                    }
                    return false;
                }
            }

            if (NoInput == false) {
                e.setAttribute("style", "");
            }
            return true;
        }

        var domainArray = domain.match(domainPat);

        if (domainArray == null) {
            if (NoInput == false) {
                e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2, "Indirizzo " + desCampo + " non valido (La parte dell'email dopo '@' non sembra essere valida)!", "erroriCampi");
            }
            return false;
        }

        var atomPat = new RegExp(atom, "g");
        var domArr = domain.match(atomPat);
        var len = domArr.length;

        if (domArr[domArr.length - 1].length < 2 || domArr[domArr.length - 1].length > 6) {
            if (NoInput == false) {
                e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2, "Indirizzo " + desCampo + " non valido (Il dominio di primo livello (es: .com e .it) non sembra essere valido)!", "erroriCampi");
            }
            return false;
        }

        if (len < 2) {
            if (NoInput == false) {
                e.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                attivaAlert(2, "Indirizzo " + desCampo + " non valido (L'indirizzo manca del dominio)!", "erroriCampi");
            }
            return false;
        }
    }

    if (NoInput == false) {
        e.setAttribute("style", "");
    }
    return true;
}

function apriAllegato(src) {
    var data = new Array;

    data[0] = { "img": src };

    var script = document.createElement("script");
    script.setAttribute("src", "componenti/elementiPdfViewer.js");
    document.body.appendChild(script);

    script.onload = function () {
        pdfViewer = document.createElement("div");

        pdfViewer.id = "pdfViewer"
        pdfViewer.setAttribute("name", "pdfViewer");
        pdfViewer.setAttribute("class", "clrBianco pdfViewer scroolXHidden scroolYHidden");
        pdfViewer.innerHTML = elementiPdfViewer;

        document.body.appendChild(pdfViewer);

        var script = document.createElement("script");
        script.setAttribute("src", "js/pdfjs/pdf.min.js");
        document.body.appendChild(script);

        script.onload = function () {
            script = document.createElement("script");
            script.setAttribute("src", "js/pdfViewer.js?ver=2.0");
            document.body.appendChild(script);

            script.onload = function () {
                openPdf(data, 0, true);

                pdfViewer.style.display = "block";
            }
        }
    };
}

function ultimoGiornoMeseIta(anno, mese) {
    var res = "";

    nMese = new Number(mese);

    int_d = new Date(anno, nMese, 1);
    d = new Date(int_d - 1);

    if (new String(nMese).length == 1) {
        mese = "0" + nMese;
    }

    var giorno = d.getDate();
    if (new String(giorno).length == 1) {
        girono = "0" + giorno;
    }

    res = giorno + "/" + mese + "/" + anno;

    return res;
}

function oggiISO() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}

function convertiDataItaEng(valore) {
    var appo = valore.split("/");

    return appo[2] + '-' + appo[1] + '-' + appo[0];
}

function convertiDataEngIta(valore) {
    var appo = valore.split("-");

    return appo[2] + '/' + appo[1] + '/' + appo[0];
}

function isDate(valore, object = '') {
    var gg, mm, aa;
    var res;

    if (valore != undefined) {
        if (valore.indexOf("/") > 0) {
            valore = convertiDataItaEng(valore);
        }

        valore = valore.replace(/-/g, '');

        if (valore.length == 8) {
            aa = valore.substring(0, 4);
            mm = valore.substring(4, 2);
            gg = valore.substring(6, 2);

            if (aa < 2000 || mm == 0 || gg == 0 || aa > 2999) {
                res = false;
            } else {
                res = new Date(aa, mm, gg) instanceof Date;
            }
        } else {
            res = false;
        }
    } else {
        res = false;
    }
    if (object != '') {
        if (!res) {
            object.setAttribute("style", "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
        } else {
            object.setAttribute("style", "");
        }
    }

    return res;
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function tornaLogin(msg) {
    var e = msg;
    var i = msg.indexOf("{");
    if (i > 0) {
        e = e.substring(0, i);
    }
    attivaAlert(2, e, "tornaLogin");

    if (nomePagina != "login.html") {
        setTimeout(function () {
            
            // window.open("login.html", "_self");
            location.href="login.html";
        }, 4000);
    }
}

function recuperaParametroHRef(xTipoAnagrafica, nomeParametro = 'tipoAnagrafica') {
    var c = location.href.split("?");
    if (c.length > 1) {
        v = c[1].split("&");
        if (v.length > 0) {
            for (y in v) {
                z = v[y].split("=");
                if (z[0] == nomeParametro) {
                    xTipoAnagrafica = z[1].replace("#", "");
                }
            }
        } else {
            z = c[1].split("=");
            if (z[0] == nomeParametro) {
                xTipoAnagrafica = z[1].replace("#", "");
            }
        }
    }

    if (xTipoAnagrafica != '' && (nomeParametro == 'tipoAnagrafica' || nomeParametro == 'tabella')) {
        variantePagina = ":" + xTipoAnagrafica;
    }

    return xTipoAnagrafica;
}
function getValoreParametroHref(paramName) {
    const queryString = window.location.href.split('?')[1];
    if (!queryString) {
      return null;
    }
  
    const queryParams = queryString.split('&');
    for (let i = 0; i < queryParams.length; i++) {
      const keyValue = queryParams[i].split('=');
      if (keyValue[0] === paramName) {
        return decodeURIComponent(keyValue[1]);
      }
    }
  
    return null;
  }
  
/* FINE FUNZIONI DI UTILITA' GENERALE */

function ricercaSuHtml(inputID, ulID) {
    var input, filter, ul, li, a, i;
    input = document.getElementById(inputID);
    filter = input.value.toUpperCase();
    ul = document.getElementById(ulID);

    // var panel=ul.getElementsByClassName("panel");
    // if (panel!=undefined){
    //     for (i=0;i<panel.length;i++){
    //         if (filter==''){
    //             panel[i].style.maxHeight = null;
    //         } else {
    //             panel[i].style.maxHeight = panel[i].scrollHeight + "px";
    //         }
    //     }   

    //     a=ul.getElementsByTagName("a");
    //     console.log(a);
    //     for (i=0; i<a.length;i++){
    //         li=a[i].parentNode;
    //         //a=li[i].getElementsByTagName("a")[0];
    //         if (a[i].getAttribute("class")!="accordion"){
    //             if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
    //                 li.style.display="";
    //             } else {
    //                 li.style.display="none";
    //             }
    //         }
    //     } 
    // } else {
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    // }
}

/* PER GESTIONE MODAL BOX */
var modal;

const xTipoAllert = {
    ESCLAMAZIONE: 0,
    INFORMAZIONE: 1,
    CRITICO: 2,
    ATTESA: 3,
    SUCCESSO: 4,
    DOMANDASINO: 5
};

/*
tipo=0 Esclamazione
tipo=1 Informazione
tipo=2 Critico
tipo=3 Attesa
tipo=4 Successo
tipo=5 Domanda si/no
*/

var timerAttesa = new Array;
var modalAlert = new Array;

function attivaAlert(tipo = 0, descrizione = '', chiamante = "nonAssegnatoNome", img = "", idElementoContenitore = '', strCallBackChiusura = '', daIndexedDB = false, tempo = 30000) {
    if (chiamante == undefined) {
        chiamante = "nonAssegnatoNome";
    }

    if (tipo != 3) {
        try {
            avviaVibrazione();
            setTimeout(stopVibrazione, 1500);
        } catch (error) {

        }
    }

    chiudiModalAlert(chiamante);

    var s = document.getElementById("alert.js");
    if (s != undefined) {
        creaModalAlert(tipo, descrizione, chiamante, img, idElementoContenitore, strCallBackChiusura, daIndexedDB, tempo);
        return;
    }

    var script = document.createElement("script");
    script.setAttribute("src", "componenti/alert.js?ver=1.2");
    script.setAttribute("id", "alert.js");
    document.body.appendChild(script);

    script.onload = function () {
        creaModalAlert(tipo, descrizione, chiamante, img, idElementoContenitore, strCallBackChiusura, daIndexedDB, tempo);
    }
}

function disabilitaAbilitaInput(disabilita = true) {
    var inp = document.getElementsByTagName("input");
    var x;

    for (x in inp) {
        inp[x].disabled = disabilita;
    }
}

function creaModalAlert(tipo = 0, descrizione = '', chiamante = "nonAssegnatoNome", img = "", idElementoContenitore = '', strCallBackChiusura = '', daIndexedDB = false, tempo = 30000) {
    if (chiamante == undefined) {
        chiamante = "nonAssegnatoNome";
    }

    modalAlert[chiamante] = document.createElement("div");
    modalAlert[chiamante].id = chiamante;
    modalAlert[chiamante].setAttribute("name", "myAlert");

    if (tipo == 3) {
        // disabilitaAbilitaInput();

        var coloreRoller = "";

        if (daIndexedDB == true) {
            coloreRoller = "lds-roller-rosso";
        }

        var pos = "<div class='posTop40 posLeftCentro lds-roller " + coloreRoller + "'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";
        var w = document.getElementById(idElementoContenitore);

        if (w != undefined) {
            w = w.offsetHeight;

            if (w < 80) {
                pos = "<div class='posTopR-67p lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";
            }
        }

        modalAlert[chiamante].setAttribute("class", "modalAlert modalNoSfondo");
        modalAlert[chiamante].innerHTML = pos;
    } else {
        modalAlert[chiamante].setAttribute("class", "modalAlert");
        modalAlert[chiamante].setAttribute("onClick", "chiudiModalAlert('" + chiamante + "','" + strCallBackChiusura + "')");

        if (tipo == 5) {
            infoFunzione = chiamante.split("_");
            modalAlert[chiamante].innerHTML = alertHtmlSiNo.replace(/{funzione}/g, infoFunzione[0]).replace(/{ID}/g, infoFunzione[1]);
        } else {
            modalAlert[chiamante].innerHTML = alertHtml.replace(/{funzioneChiamante}"/g, chiamante).replace(/{callBack}/g, strCallBackChiusura);
        }
    }

    modalAlert[chiamante].setAttribute("chiamante", chiamante);

    // console.log(chiamante,idElementoContenitore);

    //Finally, append the element to the HTML body
    if (idElementoContenitore != '') {
        document.getElementById(idElementoContenitore).appendChild(modalAlert[chiamante]);
    } else {
        document.body.appendChild(modalAlert[chiamante]);
    }

    if (tipo != 3) {
        var modalImg = modalAlert[chiamante].getElementsByTagName("img");
        var captionText = modalAlert[chiamante].getElementsByTagName("div");

        captionText[1].innerHTML = descrizione;

        if (img == "") {
            switch (tipo) {
                case 1:
                case 5:
                    modalImg[0].src = "img/question.svg"
                    break;
                case 2:
                    modalImg[0].src = "img/critical.svg"
                    break;
                case 4:
                    modalImg[0].src = "img/grafiche/successo.svg"
                    break;
                default:
                    modalImg[0].src = "img/attention.svg"
            }
        } else {
            modalImg[0].src = img;
        }
    } else {
        if (timerAttesa[chiamante]) {
            clearTimeout(timerAttesa[chiamante]);
        }

        timerAttesa[chiamante] = setTimeout(function () {
            chiudiModalAlert(chiamante);
            return "";
        }, tempo);
    }

    modalAlert[chiamante].style.display = "block";
}

function chiudiModalAlert(chiamante = "nonAssegnatoNome", strCallBackChiusura = '') {
    if (chiamante == undefined) {
        chiamante = "nonAssegnatoNome";
    }

    if (timerAttesa[chiamante]) {
        clearTimeout(timerAttesa[chiamante]);
    }

    if (richiestaAJAXinCorso < 0) {
        richiestaAJAXinCorso = 0;
    }

    if (modalAlert[chiamante] != undefined) {
        try {
            modalAlert[chiamante].style.display = "none";
            modalAlert[chiamante].parentNode.removeChild(modalAlert[chiamante]);
            modalAlert[chiamante] = undefined;
        } catch (error) {

        }
    }

    modalAlert[chiamante] = undefined;

    z = document.getElementsByName("myAlert");

    for (x = 0; x < z.length; x++) {
        if (z[x].getAttribute("chiamante") == chiamante || (richiestaAJAXinCorso == 0 && z[x].getAttribute("class") != "modalAlert")) {
            try {
                z[x].style.display = "none";
                z[x].parentNode.removeChild(z[x]);
            } catch (error) {

            }

        }
    }

    z = document.getElementById(chiamante);
    if (z != undefined) {
        z.style.display = "none";
        z.parentNode.removeChild(z);
    }
    // disabilitaAbilitaInput(false);
    if (strCallBackChiusura != '') {
        eval(strCallBackChiusura + '();');
    }
}

function apriModalDettagli(nomeTabella, descrizione, data, idTes = 0, ricarica = true, titolo = '') {
    modal = document.getElementById("myStorico");

    if (modal == undefined) {
        modal = document.createElement("div");

        modal.id = "myStorico"
        modal.setAttribute("class", "modalElenco clrSfumatoChiaro");
    }

    xIdDaStampare = idTes;

    if (ricarica == true) {
        modal.setAttribute("idTes", idTes);
        modal.innerHTML = query[nomeTabella]['modelloContenitore'];

        document.body.appendChild(modal);
        if (descrizione != '') {
            var captionText = modal.getElementsByTagName("div");
            if (captionText[1].getAttribute("id") == "caption") {
                captionText[1].innerHTML = descrizione;
            } else if (captionText[2].getAttribute("id") == "caption") {
                captionText[2].innerHTML = descrizione;
            } else {
                captionText[3].innerHTML = descrizione;
            }
        }

        var tit = modal.getElementsByClassName("titoloModal")[0];

        if (tit != undefined) {
            tit.innerHTML = tit.innerHTML.replace(/{TITOLO}/g, titolo);
        } else {
            tit = document.getElementById("divTitolo");

            if (tit != undefined) {
                tit.innerHTML = tit.innerHTML.replace(/{TITOLO}/g, titolo);
            }
        }

        modal.style.display = "block";
    }
    if (data != '') {
        popolaElencoDaJson(data, "elencoDettagli", 0, nomeTabella, ricarica, 0);
    }
    
}
function apriModalCustom(nomeOggettoRif = '', data = '', titolo = '', callback = '', tipoModalElenco = 0, forzaSovrapposizione = false,callBackChiusura='') {
    if (document.getElementById('modalCustom') == undefined) {
        var headContent = ''
        var bodyContent = ''
        var footerContent = ''
        if (nomeOggettoRif != '' && query[nomeOggettoRif]['modalC-head'] != undefined) {
            headContent = query[nomeOggettoRif]['modalC-head'];
        } else {
            headContent = `
        <div class="row w100-30p">{TITOLO}</div>
        <span class="closeCustom rowDx cursoreBtn" onclick="chiudiModalCustom('${callBackChiusura}')">×</span>`;
        }
        if (nomeOggettoRif != '' && query[nomeOggettoRif]['modalC-body'] != undefined) {
            bodyContent = query[nomeOggettoRif]['modalC-body'];
        } else {
            bodyContent = '';
        }
        if (nomeOggettoRif != '' && query[nomeOggettoRif]['modalC-footer'] != undefined) {
            footerContent = query[nomeOggettoRif]['modalC-footer']
        } else {
            var functionConfirm = `<input type="button" class="pulsanteVeBa w100 h90" value="Conferma" onclick="${callback}">`;
            footerContent = `
    <div class="w50 row h100">
        <div class="w90 centraElemento centraVerticalmente h100">
        ${callback != '' ? functionConfirm : ''}
        </div>
    </div>
    <div class="w50 row h100">
        <div class="w90 centraElemento centraVerticalmente h100">
            <input type="button" class="pulsanteVeBa w100 h90" value="Chiudi" onclick="chiudiModalCustom('${callBackChiusura}')">
        </div>
    </div>`;
        }
        var styleFooter = ''
        if (nomeOggettoRif != '' && query[nomeOggettoRif]['modalC-footerStyle'] != undefined) {
            styleFooter = query[nomeOggettoRif]['modalC-footerStyle'];
        }
        var modal = document.createElement('div');
        modal.id = "modalCustom"
        modal.setAttribute("class", `modalBlockBodyCustom posTop posBottom w100 centraElemento centraVerticalmente ${forzaSovrapposizione ? 'sopraModalDettaglio' : ''}`);
        var stileModal = '';
        if (nomeOggettoRif != '' && query[nomeOggettoRif]['styleModal'] != undefined) {
            stileModal = query[nomeOggettoRif]['styleModal'];
        }
        var classModal = '';
        if (nomeOggettoRif != '' && query[nomeOggettoRif]['classModal'] != undefined) {
            classModal = query[nomeOggettoRif]['classModal'];
        }
        var styleModalBody = '';
        if (nomeOggettoRif != '' && query[nomeOggettoRif]['styleModalBody'] != undefined) {
            styleModalBody = query[nomeOggettoRif]['styleModalBody'];
        }
        var contentModal = `
    
        <div class="modalCustomContent clrSfumatoChiaro centraElemento ${classModal}" style="${stileModal}">
            <div class="h50p clrScuro w100 normale cx centraVerticalmente" style="border-radius:10px 10px 0px 0px">
                ${headContent}
            </div>
            
        
        
    
            <div class="h100-100p w97 centraElemento scrool" id="elencoDettagliModalCustom" style="${styleModalBody}">
                ${bodyContent}
            </div>
            <div class="h50p clrSfumatoChiaro w100" style="border-radius:0px 0px 10px 10px; ${styleFooter}">
                ${footerContent}
            </div>
        </div>

`

        contentModal = contentModal.replace('{TITOLO}', titolo.replace(/'/g, "&apos;").replace(/"/g, '&quot;').replace(/\n/g, "<br>"));
        if (data != '' && nomeOggettoRif != '') {
            if (tipoModalElenco == 0) {
                for (var x in query[nomeOggettoRif]['oggetti']) {
                    var eR = new RegExp(x, 'g');
                    for (var n in data) {
                        contentModal = contentModal.replace(eR, data[n][query[nomeOggettoRif]['oggetti'][x]].replace(/'/g, "&apos;").replace(/"/g, '&quot;').replace(/\n/g, "<br>"));
                    }
                }
                modal.innerHTML = contentModal
                document.body.appendChild(modal);
            } else if (tipoModalElenco == 1) {
                modal.innerHTML = contentModal
                document.body.appendChild(modal);
                popolaElencoDaJson(data, "elencoDettagliModalCustom", 0, nomeOggettoRif, false, 0);
            }
        } else {
            modal.innerHTML = contentModal
            document.body.appendChild(modal);
        }


        modal.style.display = "flex";
    }
}
function chiudiModalCustom(callBackChiusura='') {
    var elem = document.querySelector('#modalCustom');
    if (elem != undefined && elem != null) {
        elem.parentNode.removeChild(elem);
    }
    
    if(callBackChiusura!=''){
        eval(callBackChiusura);
    }
}

function chiudiModalBox(idModal = '', callBack = null, parametro = '') {
    try {
        if (idModal == '') {
            modal.style.display = "none";
        } else {
            mod = document.getElementById(idModal);
            mod.style.display = "none";
        }

        if (callBack && typeof callBack === "function") {
            callBack(parametro);
        }



    } catch (error) {

    }
}

var pdfViewer;

function apriImmaginiMultiple(tabella, id, idImmagineSecca = '') {
    var idImmagine = '';
    if (tipoAnagrafica == undefined) {
        tipoAnagrafica = "CLIENTE";
    }
    if (idImmagineSecca != '') {
        idImmagine = idImmagineSecca
    }
    var parametri = { "tipoRisposta": "img", "tipoQuery": "querySpecifica", "nomeTabella": "immagini", "tabella": tabella, "id": id, "tipoAnagrafica": tipoAnagrafica, 'idImmagine': idImmagine };
    inviaRichiestaCentralino("query", parametri, elaboraRispostaPDF);
    xImmagineAperta = true;
}

function elaboraRispostaPDF(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != '') {
        return "";
    }

    if (data[0] == 0) {
        if (xIdVettore > 0 || xIdAgente > 0 || xIdCliente > 0) {
            attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Non è stata associata nessun immagine all\'anagrafica!');
        }
        return "";
    }

    var script = document.createElement("script");
    script.setAttribute("src", "componenti/elementiPdfViewer.js");
    document.body.appendChild(script);

    script.onload = function () {
        pdfViewer = document.createElement("div");

        pdfViewer.id = "pdfViewer"
        pdfViewer.setAttribute("name", "pdfViewer");
        pdfViewer.setAttribute("class", "clrBianco pdfViewer scroolXHidden scroolYHidden");
        pdfViewer.innerHTML = elementiPdfViewer;

        try {
            pdfViewer.setAttribute("celWhatsapp", data[0].CEL);
            pdfViewer.setAttribute("eMailCli", data[0].EMAIL);
            pdfViewer.setAttribute("idCliente", data[0].idCliente);
        } catch (error) {

        }

        document.body.appendChild(pdfViewer);

        var script = document.createElement("script");
        script.setAttribute("src", "js/pdfjs/pdf.min.js");
        document.body.appendChild(script);

        script.onload = function () {
            script = document.createElement("script");
            script.setAttribute("src", "js/pdfViewer.js?ver=2.0");
            document.body.appendChild(script);

            script.onload = function () {
                if (xGruppoUtente == "Amministratori" || xGruppoUtente == "Utenti") {
                    var div = document.getElementById("divPulsantieraPDF");
                    var e = div.getElementsByTagName("a");

                    for (x = 0; x < e.length; x++) {
                        e[x].classList.remove("w14");
                        e[x].classList.add("w12");
                    }

                    document.getElementById("cmdEliminaPDF").classList.remove("hide");
                }

                openPdf(data);

                pdfViewer.style.display = "block";
            };
        };
    };
}

function chiudiPDFViewer(chiamante = "nonAssegnatoNome") {
    var ricarica = false;

    if (pdfViewer != undefined) {
        try {
            ricarica = pdfViewer.getAttribute("ricaricaPagina");
            pdfViewer.style.display = "none";
            pdfViewer.parentNode.removeChild(pdfViewer);
            pdfViewer = undefined;
        } catch (error) {

        }
    }

    pdfViewer = undefined;

    z = document.getElementsByName("pdfViewer");

    for (x = 0; x < z.length; x++) {
        if (z[x].id == "pdfViewer") {
            try {
                ricarica = z[x].getAttribute("ricaricaPagina");
                z[x].style.display = "none";
                z[x].parentNode.removeChild(z[x]);
            } catch (error) {

            }

        }
    }

    try {
        var elem = document.querySelector('#divSignature');
        elem.parentNode.removeChild(elem);
        var elem = document.querySelector('#jsignatureScript');
        elem.parentNode.removeChild(elem);
    } catch (error) {

    }

    try {
        if (ricarica != false && ricarica != undefined) {
            eval(ricarica);
        }
    } catch (error) {

    }
    // if(nomePagina=='movimentiPeriodici.html'){
    //     if(parametriMP['modalitaFirma']!=undefined &&parametriMP['modalitaFirma']==1){
    //         clickBack();
    //     }
    // }
}

/* FINE GESTIONE MODAL BOX */

/* GESTIONE RICHIESTE AJAX */
function impacchettaRichiesta(tipoRichiesta, parametri) {
    var jSon = {
        "tipoRichiesta": tipoRichiesta,
        "parametri": parametri,
        "autenticazione": {
            "userName": xUserCom,
            "token": xTkCom,
            "idServer": xDB,
            "idDispositivo": xIdDispositivo,
            "nomePagina": nomePagina + variantePagina
        }
    };

    return jSon;
}

var idChiamante = 0;

function inviaRichiestaCentralino(tipoRichiesta, parametri, callBack, idElementoContenitore = '', strCallBackErrore = '', tempo = 30000) {
    var jSonRichiesta = JSON.stringify(impacchettaRichiesta(tipoRichiesta, parametri));
    jSonRichiesta = jSonRichiesta.replace(/&/g, "§e§");

    // var sTime=[];
    var erroreCompleto = "";
    var chiamatoDa = "";

    if (parametri.chiamante == undefined) {
        chiamatoDa = "generico";
    }

    if (chiamatoDa == "") {
        chiamatoDa = parametri.chiamante;
    }

    chiamatoDa += idChiamante;

    if (idElementoContenitore == "" && (tipoRichiesta == "query" || tipoRichiesta == "multiQuery" || tipoRichiesta == "parametri")) {
        idElementoContenitore = "divCorpo";
    }

    ver = document.getElementById(idElementoContenitore);
    if (ver == undefined) {
        idElementoContenitore = "";
    }

    attivaAlert(3, "", chiamatoDa, '', idElementoContenitore, "", false, tempo);

    richiestaAJAXinCorso++;

    fetch(xUrlPHP + "php/centralino.php", {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'jSonRichiesta=' + jSonRichiesta
    })
        .then(res => res.text()) //res.json()
        .then(function (phpRes) {
            richiestaAJAXinCorso--;
            chiudiModalAlert(chiamatoDa);
            // clearTimeout(sTime[chiamatoDa]);

            try {
                var x = JSON.parse(phpRes);
            } catch (error) {
                erroreCompleto = phpRes;
                if (phpRes == "" && (tipoRichiesta == "query" || tipoRichiesta == "multiQuery")) {
                    if (parametri.ritentaDaFailParseJS == undefined) {
                        parametri.ritentaDaFailParseJS = true;
                        inviaRichiestaCentralino(tipoRichiesta, parametri, callBack, idElementoContenitore, strCallBackErrore)
                        return;
                    }
                }
                throw Error("Si è verificato un errore! Riprovare o contattare l'assistenza.");
            }

            if (x.error != '') {
                if (tipoRichiesta != 'eMail') {
                    if ((x.error.indexOf("deadlock") > 0 || x.error.indexOf("TEMPDB.DBO.TMPLISTINI") > 0) && (tipoRichiesta == "query" || tipoRichiesta == "multiQuery")) {
                        if (parametri.ritentaDaDeadLock == undefined) {
                            parametri.ritentaDaDeadLock = true;
                            inviaRichiestaCentralino(tipoRichiesta, parametri, callBack, idElementoContenitore, strCallBackErrore)
                            return;
                        }
                    } else if (x.error.indexOf('Errore Verifica Dati!') >= 0) {
                        if (location.search.indexOf('linkRapido') != -1) {
                            localStorage.setItem('linkRapidoStorage', location.href)
                            ritornaPaginaLogin();
                            return;
                        } else {
                            strCallBackErrore = 'ritornaPaginaLogin';
                            attivaAlert(xTipoAllert.ESCLAMAZIONE, "Sessione Scaduta!<br>Eseguire Nuovamente l'accesso.", "warning", "", "", strCallBackErrore);
                            return;
                        }
                    } else if (x.error.indexOf('Accesso alla Pagina Negato!') >= 0) {
                        attivaAlert(xTipoAllert.ESCLAMAZIONE, "Non sei autorizzato ad accedere a questa Pagina!<br>Sarai reindirizzato alla pagina di login!", "warning", "", "", "ritornaPaginaLogin");
                        return;
                    }

                    throw Error(x.error);
                }
            }

            if (x.avvisi != "") {
                attivaAlert(xTipoAllert.ESCLAMAZIONE, x.avvisi, "warning", "", "", strCallBackErrore);
                return;
            }

            if (x.console != "") {
                console.log(x.console);
            }

            res = phpRes;

            if (tipoRichiesta == "logOut") {
                window.sessionStorage.clear();
                window.sessionStorage.setItem("stopLogin", true);
                location.href="login.html";
            } else {
                if (callBack && typeof callBack === "function") {
                    callBack(res);
                } else {
                    elaboraRisposta(res);
                }
            }
        })
        .catch(function (err) {
            // clearTimeout(sTime[chiamatoDa]);
            richiestaAJAXinCorso--;
            chiudiModalAlert(chiamatoDa);
            var errore = err;
            console.error(err, erroreCompleto);

            var noMail = 0;

            if (err == "TypeError: Failed to fetch" || err == "TypeError: La connessione è stata persa." || err == "TypeError: Si è verificato un errore SSL ed è impossibile effettuare una connessione sicura con il server." || err == "TypeError: Tempo di richiesta scaduto." || err == "TypeError: Impossibile completare l'operazione. Il software ha provocato l'interruzione della connessione" || err == "TypeError: NetworkError when attempting to fetch resource." || err == "TypeError: Load failed" || err == "TypeError: Cannot read properties of null (reading 'prodotti')") {
                if (tipoRichiesta == "query" || tipoRichiesta == "multiQuery") {
                    if (parametri.ritentaDaFail == undefined) {
                        parametri.ritentaDaFail = true;
                        inviaRichiestaCentralino(tipoRichiesta, parametri, callBack, idElementoContenitore, strCallBackErrore)
                        return;
                    }
                }
                noMail = 1;
                errore = "Si è verificato un errore di collegamento al server.<br>Verificare la connessione a internet e riprovare.";
            }

            if (String(err).indexOf("Error: - SQLSTATE") >= 0) {
                errore = "Si è verificato un errore! Riprovare o contattare l'assistenza.";
            }

            if (parametri.chiamante != undefined) {
                errore += "<br> (" + parametri.chiamante + ")";
            }

            attivaAlert(2, errore, "catchError", "", "", strCallBackErrore);
            if (tipoRichiesta != 'eMail' && parametri.ritentaDaFail == undefined && noMail == 0) {
                var testoErrore = "<b>Errore Visualizzato all'utente: </b>" + errore + "<br/><br/><b>Errore Effettivo: </b>" + err + "<br/><br/><b>Tipo Richiesta: </b>" + tipoRichiesta + "<br/><br/><b>Parametri: </b>" + JSON.stringify(parametri) + "<br/><br/><b>Risposta PHP Completa: </b>" + erroreCompleto + "<br/><br/><b>Stack: </b>" + err.stack;
                inviaSegnalazioneViaMail(testoErrore);
            }
        });
}
function inviaRichiestaCentralinoNoBlocchi(tipoRichiesta, parametri, callBack, idElementoContenitoreDaDisabilitare = '',callBackErrore='') {
    var jSonRichiesta = JSON.stringify(impacchettaRichiesta(tipoRichiesta, parametri));
    jSonRichiesta = jSonRichiesta.replace(/&/g, "§e§");

    if (parametri.chiamante == undefined) {
        chiamatoDa = "generico";
    }

    var btn = document.getElementById(idElementoContenitoreDaDisabilitare);

    fetch(xUrlPHP + "php/centralino.php", {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'jSonRichiesta=' + jSonRichiesta
    })
        .then(res => res.text()) //res.json()
        .then(function (phpRes) {

                var x = JSON.parse(phpRes);
          

            if (x.error != '') {
                var testoErrore = "<b>Errore nascosto: </b>" + x.error + "<br/><br/><b>Errore Effettivo: </b>" + x.error + "<br/><br/><b>Tipo Richiesta: </b>" + tipoRichiesta + "<br/><br/><b>Parametri: </b>" + JSON.stringify(parametri) + "<br/><br/><b>Risposta PHP Completa: </b>" + phpRes + "<br/><br/>";
                console.error(x.error);
                gestErroreLocalStorage('aggiungi',testoErrore);
                if(callBackErrore!=''){
                    callBackErrore(x.error);
                }
                return
            }

            res = phpRes;
                if (callBack && typeof callBack === "function") {
                    callBack(res);
                } 
        })
        .catch(function (err) {           
            var errore = err;
            console.error(err);  
            var rispostaphp='';
            if(typeof phpRes != 'undefined'){
                if(phpRes != undefined && phpRes != null && phpRes != "") {
                    rispostaphp = phpRes;
                }
            }
            if (tipoRichiesta != 'eMail' && parametri.ritentaDaFail == undefined ) {
                var testoErrore = "<b>Errore nascosto: </b>" + errore + "<br/><br/><b>Errore Effettivo: </b>" + err + "<br/><br/><b>Tipo Richiesta: </b>" + tipoRichiesta + "<br/><br/><b>Parametri: </b>" + JSON.stringify(parametri) + "<br/><br/><b>Risposta PHP Completa: </b>" + rispostaphp + "<br/><br/><b>Stack: </b>" + err.stack;
                gestErroreLocalStorage('aggiungi',testoErrore);
            }
            if(callBackErrore!=''){
                callBackErrore(x.error);
            }
        });
}

function inviaRichiestaCentralinoUploadFile(formData, parametri, callBack) {
    var erroreCompleto = "";

    attivaAlert(3, "", parametri.chiamante);
    richiestaAJAXinCorso++;

    fetch(xUrlPHP + "php/centralino.php", {
        method: 'post',
        body: formData
    })
        .then(res => res.text()) //res.json()
        .then(function (phpRes) {
            richiestaAJAXinCorso--;

            try {
                var x = JSON.parse(phpRes);
            } catch (error) {
                erroreCompleto = phpRes;
                throw Error("Si è verificato un errore! Riprovare o contattare l'assistenza.");
            }

            if (x.error != '') {
                attivaAlert(2, x.error, "errore");
            }

            if (x.console != "") {
                console.log(x.console);
            }

            res = phpRes;

            chiudiModalAlert(parametri.chiamante);

            if (callBack && typeof callBack === "function") {
                callBack(res);
            } else {
                elaboraRisposta(res);
            }
        })
        .catch(function (error) {
            richiestaAJAXinCorso--;
            chiudiModalAlert(parametri.chiamante);
            if (error == "TypeError: Failed to fetch") {
                error = "Si è verificato un errore di collegamento al server.<br>Verificare la connessione a internet e riprovare.";
            }
            attivaAlert(2, error + "<br> (" + parametri.chiamante + ")", "catchError");
        });
}

function inviaSegnalazioneViaMail(testo, mailDestinatario="", oggetto="", chiamante="segnalazioneMail", segnalaIDDispositivo=true) {
    if (segnalaIDDispositivo) {
        testo += "<br/><br/><b>idDispositivo: </b>" + xIdDispositivo;
    }

    var parametri = { "tipoRisposta": "eMail", "chiamante": chiamante, "messaggio": testo };

    if (mailDestinatario != "") {
        parametri.mailDestinatario = mailDestinatario;
    }

    if (oggetto != "") {
        parametri.oggetto = oggetto;
    }

    inviaRichiestaCentralino("eMail", parametri, elaboraRispostaSegnalazione);
}

function elaboraRispostaSegnalazione(res) {

}

function avviaCarDatiGenerico(selectID, tabella, callBack = '') {
    var parametri = { "tipoRisposta": selectID, "tipoQuery": "querySpecifica", "nomeTabella": tabella, "select": selectID, "nomeQuery": nomePagina + ":" + selectID, "tipoElenco": 1 };
    try {
        if (idCliente != undefined) {
            parametri.idCliente = idCliente;
        }
    } catch (e) {

    }


    if (callBack == '') {
        callBack = elaboraRispostaGenerico;
    }

    inviaRichiestaCentralino("query", parametri, callBack);
}

function elaboraRispostaGenerico(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;

    if (risp.error != '') {
        return "";
    }

    if (data[0] == 0) {
        var s = document.getElementById(parametri.tipoRisposta);
        var o = s.getElementsByTagName("option")[0];
        if (o != undefined) {
            if (o.innerHTML.indexOf("Seleziona") >= 0) {
                valorizzaHTMLElemento(parametri.select, `<option value="0">${o.innerHTML}</option>`);
            }
        }
        return "";
    }

    var e = document.getElementById(parametri.tipoRisposta);
    if (e == undefined) {
        popolaElencoDaJson(data, parametri.tipoRisposta, parametri.tipoElenco, parametri.nomeQuery, true, 0);
    } else {
        if (e.nodeName == "SELECT") {
            popolaSelectDaJSON(data, parametri.tipoRisposta);
        } else {
            popolaElencoDaJson(data, parametri.tipoRisposta, parametri.tipoElenco, parametri.nomeQuery, true, 0);
        }
    }

    if (parametri.select == 'elencoStatoOrdine') {
        for (var x in data) {
            listaStatoOrdini[data[x].id] = data[x].d1;
        }
        statoOrdiniArray = data;
    }
}

function popolaSelectDaJSON(rs, selectID, selVal = "§") {
    var opt = "";

    var select = document.getElementById(selectID);

    if (select == undefined) {
        return;
    }

    var o = select.getElementsByTagName("option")[0];

    if (o != undefined) {
        valorizzaHTMLElemento(selectID, `<option value="${o.getAttribute("value")}">${o.innerHTML}</option>`);
    }

    for (n in rs) {
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rs[n].descrizione));
        opt.value = rs[n].id;

        if (opt.value == selVal) {
            opt.setAttribute("selected", "selected");
        }

        select.appendChild(opt);
    }
}

function popolaFormDati(data, xNomePagina = '') {
    if (xNomePagina == '') {
        xNomePagina = nomePagina;
    }

    for (n in data) {
        for (x in query[xNomePagina]['oggetti']) {
            var e = document.getElementById(x);
            if (e.type == "checkbox") {
                document.getElementById(x).checked = (data[n][query[xNomePagina]['oggetti'][x]] == 1)
            } else {
                var dp = query[xNomePagina]['oggetti'][x].indexOf(":", 0);
                var hide = query[xNomePagina]['oggetti'][x].indexOf("HIDE", 0);

                if (dp > 0) {
                    var valore = data[n][query[xNomePagina]['oggetti'][x].substring(0, dp)];
                    var test = /^tel:/;
                    var test2 = /^whatsapp/;

                    if (test.test(query[xNomePagina]['oggetti'][x].substring(dp + 1)) || test2.test(query[xNomePagina]['oggetti'][x].substring(dp + 1))) {
                        valore = valore.replace(/[a-z]/ig, '');
                    }

                    if (valore) {
                        document.getElementById(x).setAttribute("href", query[xNomePagina]['oggetti'][x].substring(dp + 1).replace(/{CAMPO}/g, valore));
                    } else {
                        document.getElementById(x).parentNode.removeChild(document.getElementById(x));
                    }
                } else if (hide >= 0) {
                    if (data[n][query[xNomePagina]['oggetti'][x]] != "") {
                        document.getElementById(x).setAttribute("class", data[n][query[xNomePagina]['oggetti'][x]]);
                    }
                } else {
                    document.getElementById(x).innerHTML = data[n][query[xNomePagina]['oggetti'][x]];
                }
            }
        }
    }
}

function popolaFormModificaDati(data, xNomePagina = '') {
    if (xNomePagina == '') {
        xNomePagina = nomePagina;
    }

    for (x in query[xNomePagina]['oggetti']) {
        try {
            if (typeof data[query[xNomePagina]['oggetti'][x]] === 'object') {
                popolaElencoDaJson(data[query[xNomePagina]['oggetti'][x]], x, 0, xNomePagina + ":" + x, true);
            } else {
                var e = document.getElementById(x);
                if (e.type == "checkbox") {
                    if (data[query[xNomePagina]['oggetti'][x]] != null) {
                        e.checked = (data[query[xNomePagina]['oggetti'][x]] == 1);
                    }
                } else if (e.type == "select") {
                    var dp = query[xNomePagina]['oggetti'][x].indexOf(":", 0);

                    if (dp > 0) {
                        cambiaSelezioneSelect(x, data[query[xNomePagina]['oggetti'][x].substring(0, dp)], true);
                    } else {
                        cambiaSelezioneSelect(x, data[query[xNomePagina]['oggetti'][x]], false);
                    }
                } else if (e.type == "number") {
                    if (typeof query[xNomePagina]['oggetti'][x] === 'object') {
                        e.value =formattaNumeriInput(data[query[xNomePagina]['oggetti'][x].campo],query[xNomePagina]['oggetti'][x].decimaliMax,query[xNomePagina]['oggetti'][x].decimaliMin);
                    } else {
                        if (isNaN(data[query[xNomePagina]['oggetti'][x]])) {
                            e.value = data[query[xNomePagina]['oggetti'][x]].replace(".", "").replace(",", ".");
                        } else {
                            e.value = data[query[xNomePagina]['oggetti'][x]];
                        }
                    }
                } else {
                    e.value = data[query[xNomePagina]['oggetti'][x]];
                }
            }
        } catch (error) {
            console.log(error);
            console.log('Nome dato errato:-> ' + query[xNomePagina]['oggetti'][x]);
            console.log('Valore dato errato:-> ' + data[query[xNomePagina]['oggetti'][x]])
        }
    }
}

//conterrà tutti i prodotti presenti nel carrello e sarà popolata durante il caricamento dell'elenco
var mOrdinati;

function valorizzaElementoListaComplesso(data, n, progressivo = 'x', nomePagina, zNomeCarrello = '') {
    var eR = "";
    var el = query[nomePagina]['modelloRiga'];

    ra = query[nomePagina]['modelloRaggruppamento'];

    var imgOL;

    if (xOffLine == "true") {
        if (query[nomePagina]["imgOffLine"] != undefined) {
            imgOL = query[nomePagina]["imgOffLine"];
        }
    }

    for (x in query[nomePagina]['oggetti']) {
        if (x == '{RAGGRUPPAMENTO}') {
            if (xRag != data[n][query[nomePagina]['oggetti'][x]]) {
                eR = new RegExp(x, 'g');
                el = ra.replace(eR, data[n][query[nomePagina]['oggetti'][x]]) + el;
                xRag = data[n][query[nomePagina]['oggetti'][x]];
            }
        }

        eR = new RegExp(x, 'g');

        if (typeof query[nomePagina]['oggetti'][x] === 'object') {
            if (query[nomePagina]['oggetti'][x].noZero != undefined) {
                if (data[n][query[nomePagina]['oggetti'][x].campo] === 0) {
                    el = el.replace(eR, "");

                    continue;
                }

            } else if (query[nomePagina]['oggetti'][x].nonFormattare != undefined) {
                el = el.replace(eR, data[n][query[nomePagina]['oggetti'][x].campo]);
                continue;
            }else if(query[nomePagina]['oggetti'][x].formattaData != undefined){
                el = el.replace(eR, convertiDataEngIta(data[n][query[nomePagina]['oggetti'][x].campo]));
                continue;
            }
            try {
                el = el.replace(eR, formattaNumeri(data[n][query[nomePagina]['oggetti'][x].campo], query[nomePagina]['oggetti'][x].decimaliMax, query[nomePagina]['oggetti'][x].decimaliMin));

            } catch (error) {

            }
        } else {
            if (data[n][query[nomePagina]['oggetti'][x]] != undefined) {
                try {

                    el = el.replace(eR, data[n][query[nomePagina]['oggetti'][x]].replace(/'/g, "&apos;").replace(/"/g, '&quot;').replace(/\n/g, "<br>"));
                } catch (error) {
                    console.warn(eR + ' - ' + data[n][query[nomePagina]['oggetti'][x]]);
                    console.log(error)

                }
            }
        }
    }

    if (progressivo != 'x') {
        //VERIFICA VARIABILI E MODELLO RIGA SE DA ERRORE
        el = el.replace(/{PROGRESSIVO}/g, formatter.format(progressivo));
    }

    if (imgOL != undefined) {
        assegnaImmagineOffLine(imgOL.precodice + data[n][imgOL.campoCodice], data[n][imgOL.campoImmagine]);
    }

    if (zNomeCarrello != '') {
        var codice = data[n]["CODICE"];

        //var carrelloJson =JSON.parse(localStorage.getItem(zNomeCarrello));
        var prodotti = carrelloJson.prodotti.data;
        var index = carrelloJson.prodotti.index;

        if (prodotti != null) {
            var i = index[codice];
            if (i != undefined) {
                var obj = { "codice": codice, "qu": prodotti[i].qu };

                obj.quReso = 0;

                if (prodotti[i].quReso != undefined) {
                    if (prodotti[i].quReso > 0) {
                        obj.quReso = prodotti[i].quReso;
                    }
                }

                mOrdinati.push(obj);
            }
        }
    }

    return el;
}

function aggiungiOrdinamento(chk, ordinamento, chk2Id, ordinamento2, imgId, direzione) {
    var lbl = document.getElementById("lblOrdinamento");
    var eR = new RegExp(ordinamento + ", ", 'g');
    lbl.innerHTML = lbl.innerHTML.replace(eR, "");
    var eR = new RegExp(ordinamento2 + ", ", 'g');
    lbl.innerHTML = lbl.innerHTML.replace(eR, "");

    chk2 = document.getElementById(chk2Id);
    chk2.checked = false;

    var img = document.getElementById("img" + ordinamento.replace(" DESC", ""));
    img.src = "img/bianche/sort.svg"

    img = document.getElementById("imgZA" + ordinamento.replace(" DESC", ""));
    img.src = "img/bianche/sortZA.svg"

    if (chk.checked == true) {
        img = document.getElementById(imgId);
        img.src = "img/blu/sort" + direzione + ".svg";
        lbl.innerHTML += ordinamento + ", ";
    }
}

function ripristinaImgOrdinamento(lblOrd) {
    if (lblOrd == '') {
        return;
    }

    var vet = lblOrd.split(", ");
    var x;
    var img;

    for (x = 0; x < vet.length; x++) {
        if (vet[x] != "") {
            if (vet[x].indexOf("DESC") > 0) {
                img = document.getElementById("imgZA" + vet[x].replace(" DESC", ""));
                img.src = "img/blu/sortZA.svg";
            } else {
                img = document.getElementById("img" + vet[x]);
                img.src = "img/blu/sort.svg";
            }
        }
    }
}

function popolaListaOrdinamenti(ordinamenti, ulId, cmdId, xNomePagina, forzaRicarica = false, xOrd = "") {
    var ul = document.getElementById(ulId);
    var cmd = document.getElementById(cmdId);
    var li = "";

    if (forzaRicarica) {
        ul.innerHTML = "";
        document.getElementById("lblOrdinamento").innerHTML = "";
    } else {
        if (ul.innerHTML.trim() != '') {
            return;
        }
    }

    if (ordinamenti == '') {
        cmd.style.display = "none";
        return;
    }

    var data = ordinamenti.split(",");
    for (n in data) {
        var xData1 = data[n].replace(/'/g, "").replace(/"/g, '');

        if (xData1 != '') {
            li += query[xNomePagina]['modello1Riga'].replace(/{descrizione1}/g, xData1);
        }
    }

    ul.innerHTML = li;

    if (forzaRicarica) {
        if (xOrd != "") {
            document.getElementById("lblOrdinamento").innerHTML = xOrd;
            ripristinaImgOrdinamento(xOrd);
        }
    }
}

function popolaElencoDaJson(data, nomeUl, tipoElenco, nomePagina, riposizionaScrool = true, scroolTop = 0, calcolaProgressivo = 'x', zNomeCarrello = '') {
    var ul = document.getElementById(nomeUl);

    var li = "";
    var p = 0;

    var xL0 = 0;
    var xL1 = 0;
    var xL2 = 0;

    if (zNomeCarrello != '') {
        mOrdinati = new Array();
    }

    if (data == null) {
        return;
    }
    //aggiunto data[0]!=undefined per resoMerce
    //aggiunto typeof data==='object' per poter popolare anche da oggetto 
    if ((typeof data === 'object') || (data[0] != 0 && data[0] != undefined)) {
        if (data[0] != undefined && data[0]["max"] != undefined) {
            query[nomePagina]["MAXFETCH"] = data[0]["max"];
        }

        for (n in data) {
            if (data[n].eliminato != undefined) {
                if (data[n].eliminato == 1) {
                    continue;
                }
            }
            if (isEmpty(data[n])) {
                continue;
            }

            switch (tipoElenco) {
                case 0: //elenco Complesso es. ListaArticoli

                    if (calcolaProgressivo != 'x') {

                        xProgressivo += Number(data[n][query[nomePagina]['campoProgressivo']]);
                    }

                    li += valorizzaElementoListaComplesso(data, n, xProgressivo, nomePagina, zNomeCarrello);

                    break;
                case 1: //elenco semplice ad 1 riga
                    var xData1 = data[n].d1.replace(/'/g, "&apos;").replace(/"/g, '&quot;');
                    var xTipo = "";

                    if (data[n]["tipo"] != undefined) {
                        xTipo = data[n].tipo;
                    }

                    li += query[nomePagina]['modello1Riga'].replace(/{ID}/g, data[n].id).replace(/{descrizione1}/g, xData1).replace(/{tipo}/g, xTipo);

                    break;
                case 2: //elenco semplice a 2 righe
                    var xData1 = data[n].d1.replace(/'/g, '&apos;').replace(/"/g, '&quot;');
                    var xData2 = data[n].d2.replace(/'/g, '&apos;').replace(/"/g, '&quot;');

                    var aID;

                    if (data[n].id == undefined) {
                        aID = data[n].ID;
                    } else {
                        aID = data[n].id;
                    }

                    li += query[nomePagina]['modello2Righe'].replace(/{ID}/g, aID).replace(/{descrizione1}/g, xData1).replace(/{descrizione2}/g, xData2);

                    if (data[n].SALDO != undefined) {
                        li = li.replace("{SALDO}", data[n].SALDO)
                    }
                    break;
                case 3:

                    break;
                case 99: //elenco Gerarchico con Accordion
                    var xLi = query[nomePagina]['modelloRigaLi'];
                    var xAc = query[nomePagina]['modelloRigaAc'];

                    if (data[n]['ID1'] == 0) {
                        ul.innerHTML += xLi.replace(/{ID}/g, data[n]['ID0']).replace("{descrizione}", data[n]['D0']);
                    } else {
                        if (data[n]['ID0'] != xL0) {
                            cLi = document.createElement("li");
                            cLi.innerHTML = xAc.replace(/{ID}/g, data[n]['ID0']).replace("{descrizione}", data[n]['D0']).replace("{TUTTI}", 'Tutti i Prodotti ' + data[n]['D0']);
                            cLi1 = ul.appendChild(cLi);
                            xL0 = data[n]['ID0'];
                        }

                        if (data[n]['ID2'] == 0) {
                            cUl = cLi1.getElementsByTagName("ul");
                            cUl[0].innerHTML += xLi.replace(/{ID}/g, data[n]['ID1'] + ":SGR_MERC").replace("{descrizione}", data[n]['D1']);
                            cUl[0].style.marginLeft = "10px";
                            cUl[0].style.width = "98%";
                        } else {
                            if (data[n]['ID1'] != xL1) {
                                cLi = document.createElement("li");
                                cLi.innerHTML = xAc.replace(/{ID}/g, data[n]['ID1'] + ":SGR_MERC").replace("{descrizione}", data[n]['D1']).replace("{TUTTI}", 'Tutti i Prodotti ' + data[n]['D1']);

                                cUl = cLi1.getElementsByTagName("ul");

                                cLi2 = cUl[0].appendChild(cLi);
                                cUl[0].style.marginLeft = "10px";
                                cUl[0].style.width = "98%";

                                xL1 = data[n]['ID1'];
                            }

                            if (data[n]['ID3'] == 0) {
                                cUl = cLi2.getElementsByTagName("ul");
                                cUl[0].innerHTML += xLi.replace(/{ID}/g, data[n]['ID2'] + ":SFAM1").replace("{descrizione}", data[n]['D2']);
                                cUl[0].style.marginLeft = "20px";
                                cUl[0].style.width = "96%";
                            } else {
                                if (data[n]['ID2'] != xL2) {
                                    cLi = document.createElement("li");
                                    cLi.innerHTML = xAc.replace(/{ID}/g, data[n]['ID2'] + ":SFAM1").replace("{descrizione}", data[n]['D2']).replace("{TUTTI}", 'Tutti i Prodotti ' + data[n]['D2']);

                                    cUl = cLi2.getElementsByTagName("ul");

                                    cLi3 = cUl[0].appendChild(cLi);
                                    cUl[0].style.marginLeft = "20px";
                                    cUl[0].style.width = "96%";

                                    xL2 = data[n]['ID2'];
                                }

                                cUl = cLi3.getElementsByTagName("ul");
                                cUl[0].innerHTML += xLi.replace(/{ID}/g, data[n]['ID3'] + ":SFAM2").replace("{descrizione}", data[n]['D3']);
                                cUl[0].style.marginLeft = "30px";
                                cUl[0].style.width = "94%";
                            }
                        }
                    }
                    break;
            }
        }
    }

    if (tipoElenco != 99) {
        if ((query[nomePagina]['OFFSET'] == query[nomePagina]['FETCH'] && query[nomePagina]['FETCH'] > 0) || riposizionaScrool) {
            ul.innerHTML = li;

        } else {
            ul.innerHTML += li;

        }
    }

    ul.style.visibility = "visible";

    if (riposizionaScrool) {
        ul.scrollTop = scroolTop;
    }

    if (zNomeCarrello != '') {
        for (x in mOrdinati) {
            aggiornaLabelOrdinato(mOrdinati[x].codice, mOrdinati[x].qu, mOrdinati[x].quReso);
        }
    }
}

/* FINE GESTIONE RICHIESTE AJAX */

/* GESTIONE SESSIONSTORAGE */
function segnaStato(e, nomeUL = '', xID = '', xDescrizione = '', tipoAnagrafica = '', nomeStorage = '') {
    try {
        var id = ((xID == '') ? e.getAttribute("id") : xID);

        var ulName;
        var ul;
        var uDescrizione = '';

        if (nomeUL == '') {
            ulName = e.parentNode.parentNode.getAttribute("id");
            ul = e.parentNode.parentNode;
        } else {
            ulName = nomeUL;
            ul = document.getElementById(ulName);
        }

        if (xDescrizione == '') {
            uDescrizione = e.innerHTML.substring(0, e.innerHTML.indexOf('<img'));
        } else {
            uDescrizione = xDescrizione;
        }

        var sezione = "";

        if (nomeStorage != "") {
            sezione = nomeStorage;
        } else {
            sezione = nomePagina;
            if (tipoAnagrafica != '') {
                sezione += "." + tipoAnagrafica;
            }
        }

        window.sessionStorage.setItem(sezione + "." + ulName + ".id", id);
        window.sessionStorage.setItem(sezione + "." + ulName + ".scroolTop", ul.scrollTop);
        window.sessionStorage.setItem(sezione + "." + ulName + ".descrizioneId", uDescrizione);

        if (typeof segnaStatoPaginaCorrente == 'function') {
            segnaStatoPaginaCorrente(e);
        }
    } catch (error) {

    }
}

function eliminaStato(chiave) {
    window.sessionStorage.removeItem(chiave);
}

function salvaFiltro(inputID, tipoAnagrafica = "") {
    var input, filter;
    //var nomePagina = location.pathname.split("/").slice(-1);

    input = document.getElementById(inputID);
    filter = input.value;

    var sezione = nomePagina;

    if (tipoAnagrafica != "") {
        sezione += "." + tipoAnagrafica;
    }
    window.sessionStorage.setItem(sezione + ".filter", filter);
}
/* FINE GESTIONE SESSIONSTORAGE */

/* PER GESTIONE SELECT */

function changeSelect(s) {
    var valText = s.options[s.selectedIndex].text;
    var div = s.parentNode;
    var span = div.getElementsByTagName("span");
    span[0].innerHTML = valText;
    span[0].setAttribute("id", s.value);

    if (typeof changeSelectPaginaCorrente == 'function') {
        changeSelectPaginaCorrente(s);
    }
}

function cambiaSelezioneSelect(idSelect, id, cercaSuText = false) {
    try {
        var s = document.getElementById(idSelect);

        for (x in s.options) {
            if (cercaSuText) {
                if (s.options[x].text == id) {
                    s.selectedIndex = x;
                    break;
                }
            } else {
                if (s.options[x].value == id) {
                    s.selectedIndex = x;
                    break;
                }
            }
        }

        var valText = s.options[s.selectedIndex].text;
        var div = s.parentNode;
        var span = div.getElementsByTagName("span");
        span[0].innerHTML = valText;
        span[0].setAttribute("id", s.value);

        if (typeof changeSelectPaginaCorrente == 'function') {
            changeSelectPaginaCorrente(s);
        }
    } catch (error) {

    }
}

function getSelectedSelectText(idSelect) {
    try {
        var elt = document.getElementById(idSelect);

        if (elt.selectedIndex == -1)
            return "";

        return elt.options[elt.selectedIndex].text;
    } catch (error) {
        return "";
    }
}
/* FINE GESTIONE SELECT */

function getTextWidth(inputText, font) {
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    context.font = font;
    width = context.measureText(inputText).width;

    return width;
}

function navUserClick(li) {
    var tipo = li.getAttribute("ID");

    switch (tipo) {
        case "aggiornaAppAndroid":
            window.open(xUrlBase + xfileAppAndroid, "_blank");
            break;
        case "impostazioni":

            break;
        case "gestAccount":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="gestioneAccount.html";
            }else{
                window.open("gestioneAccount.html", "_self");
            }
            
            break;
        case "cambiaPwd":

            break;
        case "logOut":
            if (xOffLine == "true") {
                window.sessionStorage.clear();
                window.sessionStorage.setItem("stopLogin", true);
                if(typeof modElectron!='undefined' && modElectron==true){
                    location.href="login.html";
                }else{
                    window.open("login.html", "_self");
                }
                
            } else {
                var parametri = { "userName": xUserCom };

                inviaRichiestaCentralino("logOut", parametri);
            }

            break;
        case "utenti":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listaUtenti.html";
            }else{
                window.open("listaUtenti.html", xTarget);
            }
            
            break;
        case "configurazioniBase":
            if(typeof modElectron!='undefined' && modElectron==true){
                location.href="listaConfigurazioni.html";
            }else{
                window.open("listaConfigurazioni.html", xTarget);
            }
            
            break;
    }
}

function valorizzaHTMLElemento(idElemento, valore) {
    try {
        var div = document.getElementById(idElemento);
        div.innerHTML = valore;
    } catch (error) {

    }
}

function valorizzaSrcImmagine(idElemento, valore) {
    try {
        var div = document.getElementById(idElemento);
        div.src = valore;
    } catch (error) {

    }
}

function recuperaHTMLElemento(idElemento, cercaSuName = false, trasformaNumero = false) {
    try {
        if (cercaSuName == true) {
            var div = document.getElementsByName(idElemento)[0];
        } else {
            var div = document.getElementById(idElemento);
        }

        if (trasformaNumero === false) {
            return div.innerHTML
        } else {
            return Number(div.innerHTML.replace(".", "").replace(",", "."));
        }
    } catch (error) {
        if (trasformaNumero == false) {
            return "";
        } else {
            return 0;
        }
    }
}

function valorizzaCheckedElemento(idElemento, valore) {
    try {
        var div = document.getElementById(idElemento);
        div.checked = valore;
    } catch (error) {

    }
}

function recuperaCheckedElemento(idElemento) {
    try {
        var div = document.getElementById(idElemento);
        return div.checked;
    } catch (error) {
        return false;
    }
}

function valorizzaValueElemento(idElemento, valore) {
    try {
        var div = document.getElementById(idElemento);
        div.value = valore;
    } catch (error) {

    }
}

function recuperaValueElemento(idElemento, trasformaNumero = false) {
    try {
        var div = document.getElementById(idElemento);
        if (div.type == "checkbox") {
            if (div.checked) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (trasformaNumero === false) {
                return div.value;
            } else {
                return Number(div.value.replace(".", "").replace(",", "."));
            }
        }
    } catch (error) {
        if (trasformaNumero == false) {
            return "";
        } else {
            return 0;
        }
    }
}

function mostraNascondiElemento(idElemento, tipo, pulsante) {
    try {
        globalClickButton = true;
    } catch (error) {

    }

    if (idElemento.indexOf(";") > 0) {
        var appo = idElemento.split(";");
        for (x in appo) {
            if (document.getElementById(appo[x]).getAttribute("class").indexOf(tipo) > 0) {
                document.getElementById(appo[x]).setAttribute("class", document.getElementById(appo[x]).getAttribute("class").replace(tipo, ''));
                pulsante.src = "img/bianche/up.svg"
            } else {
                document.getElementById(appo[x]).setAttribute("class", document.getElementById(appo[x]).getAttribute("class") + ' ' + tipo);
                pulsante.src = "img/bianche/down.svg"
            }
        }
    } else {
        if (document.getElementById(idElemento).getAttribute("class").indexOf(tipo) > 0) {
            document.getElementById(idElemento).setAttribute("class", document.getElementById(idElemento).getAttribute("class").replace(tipo, ''));
            pulsante.src = "img/bianche/up.svg"
        } else {
            document.getElementById(idElemento).setAttribute("class", document.getElementById(idElemento).getAttribute("class") + ' ' + tipo);
            pulsante.src = "img/bianche/down.svg"
        }
    }
}

function selezionaDestinazione(idDest, ragioneSociale, indirizzo, localita, cap, prov, tel, fax, pagamento = 0, agente = 0, vettore = 0, deposito = 0, dPagamento = "", listino = -1, raggruppamentoD=0) {
    if (globalClickButton != undefined) {
        if (globalClickButton == true) {
            globalClickButton = false;
            return;
        }
    }

    if (globalModificaInCorso != undefined) {
        if (globalModificaInCorso == true) {
            return;
        }
    }

    var jSonDest = { idDest: idDest, ragioneSociale: ragioneSociale, indirizzo: indirizzo, localita: localita, cap: cap, prov: prov, tel: tel, fax: fax, pagamento: pagamento, agente: agente, vettore: vettore, deposito: deposito, dPagamento: dPagamento, listinoDest: listino, RAGGRUPPAMENTOD:raggruppamentoD };

    localStorage.setItem(xNomeDestinazione, JSON.stringify(jSonDest));

    if (typeof valorizzaCampiDestinazione === "function") {
        carrelloJson.testata.destinazioni = jSonDest

        if (jSonDest.pagamento != 0) {
            carrelloJson.testata.idPagamento = jSonDest.pagamento;
            idPagamentoD = jSonDest.pagamento;
            valorizzaValueElemento("cmbPagamento", idPagamentoD);
            valorizzaHTMLElemento("divPagamento", dPagamento);
        } else if (skCli[0].PAGAMENTO != undefined) {
            carrelloJson.testata.idPagamento = skCli[0].PAGAMENTO;
            idPagamentoD = 0;
            valorizzaValueElemento("cmbPagamento", skCli[0].PAGAMENTO);
            valorizzaHTMLElemento("divPagamento", skCli[0].DPAGAMENTO);
        }

        if (jSonDest.vettore != 0) {
            carrelloJson.testata.mezzo = "2";
            carrelloJson.testata.idVettore = jSonDest.vettore;
            idVettoreD = jSonDest.vettore;
            valorizzaValueElemento("cmbMezzo", "2");
            valorizzaValueElemento("cmbVettore", idVettoreD);
        } else if (skCli[0].VETTORE != undefined) {
            carrelloJson.testata.idVettore = skCli[0].VETTORE;
            idVettoreD = 0;
            valorizzaValueElemento("cmbMezzo", skCli[0].MEZZOTRAS);
            valorizzaValueElemento("cmbVettore", skCli[0].VETTORE);
        }

        if (jSonDest.agente != 0 && xIdAgente == 0) {
            carrelloJson.testata.idAgente = jSonDest.agente;
            idAgenteD = jSonDest.agente;
        } else if (skCli[0].COD_AGENTE != undefined) {
            carrelloJson.testata.idAgente = skCli[0].COD_AGENTE;
            idAgenteD = 0;
        }

        if (jSonDest.deposito != 0) {
            carrelloJson.testata.idDeposito = jSonDest.deposito;
            idDeposito = jSonDest.deposito;
        } else if (skCli[0].IDDEPOSITO != undefined) {
            carrelloJson.testata.idDeposito = skCli[0].IDDEPOSITO;
            idDeposito = skCli[0].IDDEPOSITO;
        }

        localStorage.setItem(nomeCarrello, JSON.stringify(carrelloJson));
        valorizzaCampiDestinazione();
    } else if (typeof apriDestinazioniMP === "function") {
        apriPagina(globalParametriSkCli);
    }

    try {
        document.getElementById("myStorico").style.display = "none";

        if (daApriArticoli == 1) {
            apriArticoli(document.getElementById("cmdArticoli"), false, false);
        }
    } catch (error) {

    }
}

function urlImmagineArticolo(pathImg, nrImg = "", stile = "rect", thumb = "230", pdf = false, allegati = false, daAggiornamentoOffLine = false) {
    if (xOffLine == "true" && daAggiornamentoOffLine == false) {
        return "";
    }

    var dir = "";
    var style = "";
    var thumbNail = "";

    if (nrImg != "" && nrImg != "1" && nrImg != "0") {
        nrImg = "&nrImg=" + nrImg;
    } else {
        nrImg = "";
    }

    if (stile == "rect") {
        style = "&rect=1";
    } else if (stile == "crop") {
        style = "&crop=1";
    }

    if (thumb != '' && thumb != 0 && thumb != "0") {
        thumbNail = "&thumb=" + thumb;
    }

    var tipo = "img";

    if (pdf) {
        tipo = "pdf";
    }

    var xApriAllegato = "";
    if (allegati) {
        xApriAllegato = "&all=1";
    }

    var urlGet = `${xUrlPHP}php/centralino.php?i=${xIdDispositivo}&u=${xUserCom}&s=${xDB}&t=${xTkCom}${style}${thumbNail}${nrImg}${xApriAllegato}&${tipo}=${pathImg}`;

    return urlGet;
}

// document.addEventListener('swiped-left', function(e) {
//     console.log(e.target); // the element that was swiped
// });

// document.addEventListener('swiped-right', function(e) {
//     console.log(e.target); // the element that was swiped
// });


function resetErrore(e) {
    e.setAttribute("style", "");
}

function stampa(idDocumento = "0", AV = "V", mailDestinatario = "", modelloMail = "") {
    if (idDocumento == "0") {
        try {
            idDocumento = idTes;
        } catch (error) {
            idDocumento = xIdDaStampare;
        }
    }

    xIdDaStampare = idDocumento;

    var firme = {};

    try {
        if (firmaDestinatario != undefined) {
            if (firmaDestinatario.length > 0) {
                if (firmaDestinatario[1] != '') {
                    firme.destinatario = firmaDestinatario[1];
                }
            }
        }

        if (firmaVettore != undefined) {
            if (firmaVettore.length > 0) {
                if (firmaVettore[1] != '') {
                    firme.vettore = firmaVettore[1];
                }
            }
        }
    } catch (error) {

    }

    firmaDestinatario = new Array();
    firmaVettore = new Array();

    var parametri = { tipoStampa: "documento", idDocumento: idDocumento, AV: AV, "mailDestinatario": mailDestinatario, "modelloMail": modelloMail };
    parametri.firme = firme;

    // 
    inviaRichiestaCentralino("stampa", parametri, elaboraRispostaStampa);
}

var parametriReportOld={};
var firmaDestinatario = new Array();
var firmaVettore = new Array();

function stampaReport(parametri) {
    try {
        var parametriReport = {
            'tipoReport': { obbligatorio: false, default: nomePagina },
            'filtri': { obbligatorio: false, default: '' }
        };
        
        var parametriSend = {
            tipoStampa: 'report'
        };

        for (var [k, v] of Object.entries(parametriReport)) {
            if (v.obbligatorio == true && (parametri[k] == undefined || parametri[k] == '')) {
                throw "Errore mancanza parametro obbligatorio ->" + parametriObbligatori[x];
            } else {
                if (parametri[k] == undefined || parametri[k] == '') {
                    parametriSend[k] = v.default;
                } else {
                    parametriSend[k] = parametri[k];
                }
            }
        }
        parametriReportOld=parametriSend;
        if(firmaDestinatario!=undefined || firmaVettore!=undefined ){
            
            if (firmaDestinatario != undefined) {
                if (firmaDestinatario.length > 0) {
                    if (firmaDestinatario[1] != '') {
                        parametriSend.firmeDestinatario = firmaDestinatario[1];
                    }
                }
            }

            if (firmaVettore != undefined) {
                if (firmaVettore.length > 0) {
                    if (firmaVettore[1] != '') {
                        parametriSend.firmeVettore = firmaVettore[1];
                    }
                }
            }
        }
        inviaRichiestaCentralino("stampa", parametriSend, elaboraRispostaStampa, "", "", 60000);
    } catch (e) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, e);
    }
}

function elaboraRispostaStampa(res) {
    var risp = JSON.parse(res);
    var parametri = risp.parametri;
    var data = risp.risposta;
    // console.log(data);
    if (risp.error != '') {
        return "";
    }

    if (data[0] == 0) {
        return;
    }

    var script = document.createElement("script");
    script.setAttribute("src", "componenti/elementiPdfViewer.js");
    document.body.appendChild(script);

    script.onload = function () {
        pdfViewer = document.createElement("div");

        pdfViewer.id = "pdfViewer"
        pdfViewer.setAttribute("name", "pdfViewer");
        pdfViewer.setAttribute("class", "clrBianco pdfViewer scroolXHidden scroolYHidden");
        pdfViewer.innerHTML = elementiPdfViewerFirma;

        pdfViewer.setAttribute("celWhatsapp", data.CEL);

        if (parametri.mailDestinatario != "" && parametri.mailDestinatario != undefined) {
            pdfViewer.setAttribute("eMailCli", parametri.mailDestinatario);
        } else {
            pdfViewer.setAttribute("eMailCli", data.EMAIL);
        }

        pdfViewer.setAttribute("idCliente", data.idCliente);
        pdfViewer.setAttribute("desDoc", data.desDoc);

        if (parametri.modelloMail != "" && parametri.modelloMail != undefined) {
            pdfViewer.setAttribute("testoMail", parametri.modelloMail);
        }else if(data.testoEmail!='' && data.testoEmail!=undefined){
            pdfViewer.setAttribute("testoMail", data.testoEmail);
        }

        try {
            if (parametri.firme != undefined) {
                if (parametri.firme.destinatario != undefined || parametri.firme.vettore != undefined) {
                    pdfViewer.setAttribute("ricaricaPagina", "avviaCarDettagliDocumenti()");
                }
            }
        } catch (error) {

        }

        document.body.appendChild(pdfViewer);

        var script = document.createElement("script");
        script.setAttribute("src", "js/pdfjs/pdf.min.js");
        document.body.appendChild(script);

        script.onload = function () {
            script = document.createElement("script");
            script.setAttribute("src", "js/pdfViewer.js?ver=2.0");
            document.body.appendChild(script);

            script.onload = function () {
                try {
                    if (statoModalitaFirma && parametri.firme.destinatario == undefined && parametri.firme.vettore == undefined) {
                        pdfFirma(document.getElementById("cmdFirma"));
                    }
                } catch (error) {

                }

                openPdf(data, 0, false, xUrlBase + data.pdf, parametri);

                pdfViewer.style.display = "block";
                if (nomePagina == 'movimentiPeriodici.html' && parametri.firme != undefined) {
                    if (parametri.firme.destinatario != undefined || parametri.firme.vettore != undefined) {
                        if (parametriMP['modalitaFirma'] != undefined && parametriMP['modalitaFirma'] == 1) {
                            var obj = {
                                "tipoRisposta": "update",
                                "tipoSalva": "aggiornaStatoFirma",
                                "dati": { "idTes": parametri.idDocumento, 'AV': 'V', 'nuovoStatoDocumento': parametriMP['nuovoStatoDocumentoFirma'] }
                            };
                            inviaRichiestaCentralino('update', obj, (res) => {
                                var res = JSON.parse(res);
                                var error = res.error;
                                if (error == '') {
                                    document.getElementById('cmdChiudi').setAttribute('onclick', 'clickBack()')
                                }
                            })
                        }
                    }
                }
                if(parametri.tipoStampa!=undefined && parametri.tipoStampa=='report'){
                    document.getElementById('cmdFirma').setAttribute('tipoStampa', 'report')
                }
            };
        };
    };
}

function attivaTouchZoom(elm) {
    if (document.getElementById("hammer") == undefined) {
        var script = document.createElement("script");
        script.setAttribute("src", "js/hammer.min.js");
        script.id = "hammer";
        document.body.appendChild(script);

        script.onload = function () {
            attivaHammer(elm);
        };
    } else {
        attivaHammer(elm);
    }
}

function attivaHammer(elm) {
    try {
        hammertime = new Hammer(elm, {});
        hammertime.get('pinch').set({
            enable: true
        });
        var posX = 0,
            posY = 0,
            scale = 1,
            last_scale = 1,
            last_posX = 0,
            last_posY = 0,
            max_pos_x = 0,
            max_pos_y = 0,
            transform = "",
            el = elm;

        hammertime.on('doubletap pan pinch panend pinchend', function (ev) {
            if (ev.type == "doubletap") {
                transform =
                    "translate3d(0, 0, 0) " +
                    "scale3d(2, 2, 1) ";
                scale = 2;
                last_scale = 2;
                try {
                    if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
                        transform =
                            "translate3d(0, 0, 0) " +
                            "scale3d(1, 1, 1) ";
                        scale = 1;
                        last_scale = 1;
                    }
                } catch (err) { }
                el.style.webkitTransform = transform;
                transform = "";
            }

            //pan    
            if (scale != 1) {
                posX = last_posX + ev.deltaX;
                posY = last_posY + ev.deltaY;
                max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
                max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
                if (posX > max_pos_x) {
                    posX = max_pos_x;
                }
                if (posX < -max_pos_x) {
                    posX = -max_pos_x;
                }
                if (posY > max_pos_y) {
                    posY = max_pos_y;
                }
                if (posY < -max_pos_y) {
                    posY = -max_pos_y;
                }
            }


            //pinch
            if (ev.type == "pinch") {
                scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
            }
            if (ev.type == "pinchend") { last_scale = scale; }

            //panend
            if (ev.type == "panend") {
                last_posX = posX < max_pos_x ? posX : max_pos_x;
                last_posY = posY < max_pos_y ? posY : max_pos_y;
            }

            if (scale != 1) {
                transform =
                    "translate3d(" + posX + "px," + posY + "px, 0) " +
                    "scale3d(" + scale + ", " + scale + ", 1)";
            }

            if (transform) {
                el.style.webkitTransform = transform;
            }
        });
    } catch (error) {

    }
}
function coloriDinamici() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    console.log(r + "," + g + "," + b);

    return r + "," + g + "," + b;

};

function verificaMd5(nomeElemento, parametri, risp, data) {
    var d;

    if (parametri.md5 == risp.md5) {
        d = JSON.parse(localStorage.getItem(nomeElemento + ".jSon"));
        if (d == undefined) {
            localStorage.removeItem(nomeElemento + ".md5");
        }
    } else {
        localStorage.setItem(nomeElemento + ".md5", risp.md5);
        localStorage.setItem(nomeElemento + ".jSon", JSON.stringify(data));
        d = data;
    }

    return d;
}

function attivaRicercaComboScomparsa(e, tabella, ul, jSonKey = '') {
    if (timer1) {
        clearTimeout(timer1);
    }
    var timer = e.getAttribute('timer');
    if (timer != null) {
        var tempo = timer
    } else {
        var tempo = 1000
    }
    timer1 = setTimeout(function () {

        var script = document.getElementById("sctCboScomparsa");
        if (script == undefined) {
            script = document.createElement("script");
            script.setAttribute("src", "componenti/elementiComboScomparsa.js");
            script.id = "sctCboScomparsa"
            document.body.appendChild(script);
            script.onload = function () {
                if (jSonKey == '') {
                    avviaRicercaComboScomparsa(e, tabella, ul)
                } else {

                    avviaRicercaComboScomparsaJson(e, tabella, ul, jSonKey);
                }
            };
        } else {

            if (jSonKey == '') {

                avviaRicercaComboScomparsa(e, tabella, ul)
            } else {

                avviaRicercaComboScomparsaJson(e, tabella, ul, jSonKey);
            }
        }
    }, tempo);
}

function deleteIconClick(inputID) {
    var input = document.getElementById(inputID);
    input.value = '';
    input.focus();
    input.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'a' }));
}

var lettoreBarCode;

function apriLettoreBarCode(inputID, callback, tipo = 'barcode') {
    if ( typeof cordova != 'undefined'  && gRe != '' && cordova.plugins != undefined) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                // alert("We got a barcode\n" +
                //       "Result: " + result.text + "\n" +
                //       "Format: " + result.format + "\n" +
                //       "Cancelled: " + result.cancelled);


                var e = document.getElementById(inputID);

                if (e == undefined) {
                    var e = document.createElement("input");
                    e.id = inputID;
                    e.setAttribute("type", "text");
                    e.classList.add("hide");
                    document.body.appendChild(e);
                }

                valorizzaValueElemento(inputID, result.text);
                avviaRicercaLettoreBarcode(inputID);

            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Centrare il barcode nel riquadro", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                // formats : "QR_CODE,all", // default: all but PDF_417 and RSS_EXPANDED
                orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
        );
        return;
    }
    if(typeof parametriArticoli === 'object'){
        if(parametriArticoli.tipoLettoreBarCode != undefined ){
            tipo=parametriArticoli.tipoLettoreBarCode;
        }
    }
    var script = document.createElement("script");
    script.setAttribute("src", "componenti/elementiLettoreBarCode.js");
    script.id = "scrLettoreBarCode";
    document.body.appendChild(script);

    script.onload = function () {
        lettoreBarCode = document.createElement("div");

        lettoreBarCode.id = "lettoreBarCode"
        lettoreBarCode.setAttribute("name", "lettoreBarCode");
        lettoreBarCode.setAttribute("class", "clrBase pdfViewer scroolXHidden scroolYHidden");
        lettoreBarCode.innerHTML = elementiLettoreBarCode;

        document.body.appendChild(lettoreBarCode);

        var script = document.createElement("script");
        if (tipo == 'barcode') {
            script.setAttribute("src", "js/qrCode/quagga.min.js");
        } else {
            script.setAttribute("src", "js/qrCode/jsqr.js");
        }
        document.body.appendChild(script);

        script.onload = function () {
            script = document.createElement("script");
            script.setAttribute("src", "js/qrCode/qrCode.js");

            document.body.appendChild(script);

            script.onload = function () {
                if (tipo == 'barcode') {
                    apriModalFotocamera(inputID);
                } else {
                    apriModalFotocameraQrCode(inputID);
                        
                }
                lettoreBarCode.style.display = "block";
                var r = document.getElementById("txtRicercaBarCode")
                r.focus();

                r.addEventListener("keyup", event => {
                    if (event.isComposing) {
                        return;
                    }

                    if (event.key == "Enter") {
                        avviaRicercaLettoreBarcode('txtRicercaBarCode'); chiudiLettoreBarCode();
                    }
                });
            };
        };
    };
}

function caricaScriptOffLine(callBack = '') {
    if (scriptOffLineCaricato == false) {
        var script = document.createElement("script");
        script.setAttribute("src", "js/offLine.js");
        script.setAttribute("id", "scrOffLine");
        document.body.appendChild(script);

        script.onload = function () {
            scriptOffLineCaricato = true;
            if (callBack != '') {
                callBack();
            }
        }
    } else if (callBack != '') {
        callBack();
    }
}

function reloadPagina(ms = 0) {
    setTimeout(function () {
        if (nomePagina == "login.html") {
            window.sessionStorage.setItem("stopLogin", true);
        }

        location.reload();
    }, ms);
}

function impacchettaSimulaElaboraRisposta(rs, parametri) {
    if (rs.length == 0) {
        rs = [0];
    }

    var res = { "parametri": parametri, "risposta": rs, "error": "", "md5": "no" };
    return JSON.stringify(res);
}

function ritornaPaginaLogin() {
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href = "login.html";
    }else{
        window.open("login.html", xTarget);
    }
    
}
function Duplica(idDescrizione, campoId = 'txtID') {
    if (document.getElementById(campoId).value != '') {
        document.getElementById(idDescrizione).value = '';
        document.getElementById(campoId).value = '';
        document.getElementById(idDescrizione).focus();
        var div = document.getElementById("divTitolo");
        var str = String(div.innerHTML);
        var newStr = str.replaceAll("NUOVO ", "DUPLICA ");
        var newStr = str.replaceAll("MODIFICA ", "DUPLICA ");
        div.innerHTML = newStr;
        skUtente = undefined
    } else {
        var tipo = xTipoAllert.ESCLAMAZIONE
        attivaAlert(tipo, 'Impossibile duplicare un record non esistente')
    }
}
var tabellaRecord;
/*eliminazione record da scheda record */
function eliminaRecord(e, idCli, descrRecord = '', tmpTabellaRecord = '', callback) {
    if (idCli != '') {
        attivaAlert(5, "<div><div>Sei sicuro di voler eliminare questo record?</div><div><u>" + (descrRecord != '' ? descrRecord : '') + "</u></div></div>", "rispEliminaSchedaRecord_" + idCli, '', '', callback);
    }
    if (tmpTabellaRecord != '') {
        tabellaRecord = tmpTabellaRecord
    }
}

function rispEliminaSchedaRecord(risp, id) {
    if (risp == "Si") {

        const parametri = { "tipoRisposta": "elimina", "tipoElimina": tabellaRecord, "dati": id };
        inviaRichiestaCentralino("elimina", parametri, function (res) {
            var risp = JSON.parse(res);
            var parametri = risp.parametri;
            var data = risp.risposta;

            if (risp.error != '') {
                return "";
            }

            if (data[0] == 0) {
                attivaAlert(0, "Errore durante l'eliminazione del record'", "fineElimina");
                return "";
            }

        });

    } else {
        chiudiModalAlert("rispEliminaSchedaRecord." + id);
    }
}
function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
function verificaStatoDocumento(x, idTes) {
    if (x != "0" && x != "1") {
        var str = `onclick="apriModaldatiDDT('${idTes}')"`;
    } else {
        var str = 'hidden';
    }
    return str;
}
function popolaFormDatiObj(dataObj, oggetto) {
    try {
        for (var [k, v] of Object.entries(oggetto)) {

            if (typeof v === 'object') {
                if (document.getElementById(k).tagName == 'SPAN' || document.getElementById(k).tagName == 'DIV') {
                    document.getElementById(k).innerText = formattaNumeri(dataObj[v.campo], v.decimaliMax, v.decimaliMin);
                }
            }
            else if (document.getElementById(k).tagName == 'SPAN' || document.getElementById(k).tagName == 'DIV' || document.getElementById(k).tagName == 'P') {
                document.getElementById(k).innerText = dataObj[v]
            } else if (document.getElementById(k).type == 'number') {
                document.getElementById(k).value = dataObj[v] != undefined ? formattaNumeriInput(dataObj[v], 5, 0) : ('');
            } else if (document.getElementById(k).type == 'text' || document.getElementById(k).tagName == 'SELECT') {
                document.getElementById(k).value = dataObj[v] != undefined ? dataObj[v] : ('');
            } else if (document.getElementById(k).tagName == 'IMG') {
                document.getElementById(k).src = urlImmagineArticolo(dataObj[v])
            } else if (document.getElementById(k).type == 'date') {
                document.getElementById(k).value = dataObj[v] != undefined ? dataObj[v] : ('');
            }
        }
    } catch (e) {
        console.error(e);
        console.error(v);
        console.error(k);
    }
}
function popolaDatalist(rs, selectID) {
    var opt = "";

    var select = document.getElementById(selectID);

    for (n in rs) {
        opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rs[n].descrizione));
        opt.value = rs[n].descrizione;


        select.appendChild(opt);
    }
}
function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}
var timerSesNuovoCli;
function creaNuovoCliente(idCampo, callBack = '') {
    var streamInputNew = document.getElementById(idCampo);
    localStorage.setItem('objNuovoCli', 'vuoto');
    open("nuovoCliente.html", "_blank");

    timerSesNuovoCli = setInterval(() => {

        if (localStorage.getItem('objNuovoCli') != 'vuoto' && localStorage.getItem('objNuovoCli') != 'chiuso') {
            sessionStorage.setItem('objNuovoCli', '')
            var obj = JSON.parse(localStorage.getItem('objNuovoCli'));
            clearTimeout(timerSesNuovoCli);
            streamInputNew.setAttribute('idRagioneSociale', obj.ID);
            streamInputNew.value = obj.ragioneSociale;
            localStorage.removeItem('objNuovoCli');
            if (callBack != '') {
                callBack(obj)
            }
        } else if (localStorage.getItem('objNuovoCli') == 'chiuso') {
            localStorage.removeItem('objNuovoCli');
            clearTimeout(timerSesNuovoCli);

        }
    }, 1000);
}
function show(id) {
    // document.getElementById(id).style.display = "block";
    document.getElementById(id).classList.remove('hide');
}
function hide(id) {
    document.getElementById(id).classList.add('hide');
    // document.getElementById(id).style.display = "none";
}
function focus(id) {
    document.getElementById(id).focus();
}
function remove(id) {
    var elem = document.querySelector('#' + id);
    elem.innerHTML = '';
}
function attivaSlideShow(idDivContainerSlideShow = 'slideShowContainer') {
    if (document.getElementById('jsSlideShow') == undefined) {
        var script = document.createElement("script");
        script.setAttribute("src", "js/slideShow.js");
        document.body.appendChild(script);
        script.id = 'jsSlideShow';
        script.onload = () => {
            document.getElementsByTagName("head")[0].appendChild(cssSlideShow);
            cssSlideShow.onload = () => {
                try {
                    if (xParametriPagina.stileSlide != undefined) {
                        slideCss = xParametriPagina.stileSlide;
                    }
                    compilaSlideShow(idDivContainerSlideShow);


                } catch (error) {
                    console.log(error);
                }

            }

        }
    } else {
        console.error('dentro');
        compilaSlideShow(idDivContainerSlideShow);
    }
}

var immaginiCaricate = {};
function allegaImmagine(input, limiteUnaImmagine = true, idUl = 'listaImmagini') {

    if (limiteUnaImmagine == true) {
        var ul = document.getElementById(idUl);
        if (ul.tagName.toUpperCase() == 'UL') {
            if (ul.innerHTML != '' && !isEmpty(immaginiCaricate)) {
                attivaAlert(xTipoAllert.ESCLAMAZIONE, 'è possibile caricare un solo file , eliminare la foto già caricata prima di procedere!');
                return;
            }
        }
    }
    
    try {
        
        inputElement = document.getElementById(input);
        inputElement.addEventListener("change", (evt) => {
            // immaginiCaricate = {};

            var ul = document.getElementById(idUl);
            ul.innerHTML = '';
            var tgt = evt.target || window.event.srcElement,
                files = tgt.files;
            var fileList = files;
            for (i = 0; i < files.length; i++) {
                var url = URL.createObjectURL(files[i]);
                var extArr = files[i].name.split(".");
                var ext = extArr[extArr.length - 1];
                var uid = Math.random().toString();
                uid = uid.substring(uid.length - 5, uid.length);
                if (gRe == '') {
                    immaginiCaricate[url] = renameFile(fileList[i], uid + "-" + extArr[0] + "." + ext);
                } else {
                    immaginiCaricate[url] = files[i];
                }

                if (idUl != '') {

                    var ul = document.getElementById(idUl);
                    if (ul.tagName.toUpperCase() == 'UL') {
                        continue;
                    } else if (ul.tagName.toUpperCase() == 'IMG') {
                        ul.src = url;
                    }
                }
            }
            clearFileInput(document.getElementById(input));

            var ul = document.getElementById(idUl);
            for (var [k, v] of Object.entries(immaginiCaricate)) {
                if (!isEmpty(k)) {
                    var elementiAllegati = `
                        <li id="imgLi.{NOMEFILE}" name="{NOMEFILE}" class="w100-5p clrSfumatoScuro clrContorno elementiGriglia marg5Bottom" url="{URL}">
                            <a id="a.{NOMEFILE}" href="{URL}" target="_blank" class="w100-45p clrSfumatoScuro">
                                <img class="row marg5Dx" src="img/bianche/pdf.svg"/>
                                {NOMEFILE}
                            </a>
                            <img id="del.{NOMEFILE}" class="rowDx marg5Top marg5Dx hide cursoreBtn" title="Rimuovi Allegato" src="img/bianche/delete.svg" onclick="rimuoviImmagine(\'{NOMEFILE}\',\'{URL}\')"/>
                        </li>`;
                    ul.innerHTML += elementiAllegati.replace(/{URL}/g, k).replace(/{NOMEFILE}/g, v.name).replace(/ hide/g, '');
                }
            }
        }, false);

        inputElement.click();
    } catch (error) {
        console.log(error);
    }

}
function allegaFotoDispositivoCordova(idRiferimento, tabella, callBack = '') {
    navigator.camera.getPicture(function (fileURI) {

        // Ottiene il fileEntry corrispondente all'URI del file
        window.resolveLocalFileSystemURL(fileURI, function (fileEntry) {

            // Ottiene il file dal fileEntry
            fileEntry.file(function (file) {

                // Legge il file come dati binari
                const reader = new FileReader();
                reader.onloadend = function () {

                    // Crea un oggetto Blob dai dati binari
                    var fileBlob = new Blob([new Uint8Array(this.result)], { type: file.type });

                    // Crea un oggetto FormData e aggiunge il file ad esso
                    var formData = new FormData();
                    formData.append(xIdDispositivo + '§' + xTkCom + '§' + xUserCom.replace(/\./g, "__") + "§" + xIdConfigurazione + "§" + 1, fileBlob, file.name);

                    var parametri = { "chiamante": "FileUpload" };

                    inviaRichiestaCentralinoUploadFile(formData, parametri, function (res) {
                        var risp = JSON.parse(res);
                        var parametri = risp.parametri;
                        var data = risp.risposta;

                        if (risp.error != '') {
                            attivaAlert(xTipoAllert.ESCLAMAZIONE, risp.error);
                        } else if (data == 'ok') {
                            var jSon = {
                                'id': idRiferimento
                            }
                            var tabella = "TES_VENDITE";
                            var parametri = { "tipoRisposta": "salva", "tipoSalva": "salvaImmagini", "dati": jSon, "tabella": tabella };
                            var nomiImmagini = new Array;
                            nomiImmagini.push(file.name);

                            jSon.immagini = nomiImmagini;
                            inviaRichiestaCentralino("salva", parametri, (res) => {
                                chiudiModalCustom();
                                if (callBack != '') {
                                    eval(callBack);
                                }

                            });
                        }

                    });

                };
                reader.readAsArrayBuffer(file);

            }, function (error) {
                console.error('Error getting file:', error);
            });

        }, function (error) {
            console.error('Error resolving file URI:', error);
        });

    }, function (error) {
        console.error('Error getting picture:', error);
    }, {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        saveToPhotoAlbum: true
    });

}

function clearFileInput(ctrl) {
    try {
        ctrl.value = null;
    } catch (ex) { }
    if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
}
function rimuoviImmagine(nomeFile, url) {
    var li = document.getElementById("imgLi." + nomeFile);
    li.parentNode.removeChild(li);
    delete immaginiCaricate[url];
}


function caricaImmagini(callback, svuotaImmagginiCaricate = true) {
    if (!isEmpty(immaginiCaricate)) {
        var r = 0;
        var formData = new FormData();
        for (x in immaginiCaricate) {
            r++;
            formData.append(xIdDispositivo + '§' + xTkCom + '§' + xUserCom.replace(/\./g, "__") + "§" + xIdConfigurazione + "§" + r, immaginiCaricate[x]);
        }



        var parametri = { "chiamante": "FileUpload" };

        inviaRichiestaCentralinoUploadFile(formData, parametri, function (res) {
            var risp = JSON.parse(res);
            var parametri = risp.parametri;
            var data = risp.risposta;

            if (risp.error != '') {
                attivaAlert(xTipoAllert.ESCLAMAZIONE, risp.error);
            } else if (data == 'ok') {

                if (typeof callback === 'function') {
                    callback();
                }

                if (svuotaImmagginiCaricate) {
                    immaginiCaricate = {};
                }
                // fotoCarosello = {};
            }

        });
    } else {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Non è stata caricata alcun immagine')
    }
}

/* FUNZIONI DETTAGLIO GIACENZE ARTICOLI*/
function avviaRichiestaModalDettaglioGiacenze(codiceArticolo) {
    var scr = document.getElementById("scrDetGiac");

    if (scr == undefined) {
        var script = document.createElement("script");
        script.setAttribute("src", "js/dettaglioGiacenze.js");
        script.id = "scrDetGiac";
        document.body.appendChild(script);

        script.onload = function () {
            avviaRichiestaModalDettaglioGiacenze(codiceArticolo);
        }
        return;
    }

    parametri = {
        "tipoQuery": "querySpecifica",
        "tipoRisposta": 'select',
        "nomeTabella": "dettaglioGiacenzeArticolo",
        "codiceArticolo": codiceArticolo
    };
    inviaRichiestaCentralino("query", parametri, (res) => {
        var risp = JSON.parse(res);
        var data = risp.risposta;
        if (risp.error == '') {
            apriModalCustom('ListaArticoli.html:dettaglioGiacenze', data, 'Dettaglio giacenze', '', 1)
        } else {
            attivaAlert(xTipoAllert.CRITICO, risp.error);
        }
    });
}
/* FINE FUNZIONI DETTAGLIO GIACENZE ARTICOLI*/

function cercaHTML(input, idLista) {
    var ul = document.getElementById(idLista);
    var li = ul.childNodes;
    for (var x = 0; x < li.length; x++) {
        if (li[x].innerText != undefined) {
            if ((li[x].innerText.toUpperCase()).indexOf(input.value.toUpperCase()) > -1) {
                li[x].style.display = '';
            } else {

                li[x].style.display = 'none';
            }
        } else {
            // li[x].style.display='none';
        }
    }
}
var idIntervalCaricamento;
var countSpinnerCaricamento = 0;
var fineSpinner;
function caricamentoForm(stato = 0) {
    if (stato == 1) {
        // var div=document.createElement('div');
        //   div.setAttribute('class',"clrSfumatoChiaro sovrapponiElemento");
        var div = `<div class="clrSfumatoChiaro caricamentoAp centraVerticalmente" id="spinnerAp">
                        <img src="img/aziendapratica/ApBase0.png" style="height:300px" id="imgSpinnerAp">
                </div>`;
        document.body.innerHTML += div;
        idIntervalCaricamento = setInterval(() => {
            var img = document.getElementById('imgSpinnerAp');
            if (countSpinnerCaricamento < 3) {
                countSpinnerCaricamento++
            } else {
                countSpinnerCaricamento = 0;
            }
            img.src = "img/aziendapratica/ApBase" + countSpinnerCaricamento + ".png";
        }, 400)
    } else {
        fineSpinner = setInterval(() => {
            if (countSpinnerCaricamento == 3) {
                clearInterval(idIntervalCaricamento);
                clearInterval(fineSpinner);
                countSpinnerCaricamento = 0;
                var div = document.querySelector('#spinnerAp');
                div.parentElement.removeChild(div);
                var divBase = document.getElementById('divBase');
                if (divBase != undefined) {
                    if (divBase.classList.contains('hide')) {
                        divBase.classList.remove('hide')
                    }
                }
            }
        }, 300)


    }
}

window.addEventListener("orientationchange", function () {
    creaMenuLaterale(idPulsantiera);
}, false);

var idDaAbilitare = new Array();
var idPulsantiera = '';

function creaMenuLaterale(idPulsantieraTmp = '') {
    try {
        var pulsanti = document.getElementById(idPulsantieraTmp);

        if (pulsanti == undefined) {
            return;
        }

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        if (vw > 500) {
            if (idDaAbilitare.length > 0) {
                for (var y = 0; y < idDaAbilitare.length; y++) {
                    hide(idDaAbilitare[y] + 'L');
                    show(idDaAbilitare[y]);
                }
                hide('cmdMenu');
                return;
            } else {
                return;

            }
        }

        var count = 0;

        if (idDaAbilitare.length == 0) {
            for (var x in pulsanti.childNodes) {
                if (pulsanti.childNodes[x].nodeType != Node.TEXT_NODE && pulsanti.childNodes[x].classList != undefined) {
                    if ((pulsanti.childNodes[x].classList).contains('hide')) {

                    } else {
                        count++
                        if (count > 4) {
                            idDaAbilitare.push(pulsanti.childNodes[x].id);
                        }
                    }
                }
            }
        } else {
            count = 7;
        }

        if (count > 6) {
            for (var y = 0; y < idDaAbilitare.length; y++) {
                show(idDaAbilitare[y] + 'L');
                hide(idDaAbilitare[y]);
            }
            show('cmdMenu');
        }
    } catch (error) {

    }
}

function gestMenuLaterale(input, id) {
    var stato = input.getAttribute('stato');
    if (stato != undefined && stato == 'aperto') {
        var x = document.getElementById(id);
        x.style.display = 'none';
        input.setAttribute('stato', '');
    } else {
        var x = document.getElementById(id);
        x.style.display = 'flex';
        input.setAttribute('stato', 'aperto');


    }
}
function gestLarghezzaPulsantiera(id) {
    var lab = document.getElementById(id);
    var n = 0;
    for (var x = 0; x < lab.childNodes.length; x++) {
        if (lab.childNodes[x].nodeType != Node.TEXT_NODE) {
            if (lab.childNodes[x].classList != undefined) {
                c = lab.childNodes[x].getAttribute("class");
                if (c.indexOf("hide") == -1) {
                    n += 1;
                }
            }
        }
    }
    if (n > 0) {
        var varW = arrotonda(100 / n, 0);
        for (var x = 0; x < lab.childNodes.length; x++) {
            try {
                if (lab.childNodes[x].getAttribute("class").indexOf("hide") == -1) {
                    lab.childNodes[x].classList.add("w" + varW);
                }
            } catch (error) {

            }
        }
    }
}
function getPercentualeProvviggione(recordSet, idAgente, articolo, sconto/*Sconto applicato dall'agente*/, ricarico = 0/*Ricarico su articolo*/, prezzoListino = 0/*prezzo di listino*/, listinoBase = -1/*Numero listino Es 0 Dettaglio 1 Ingrosso*/, fascia = -1/*Scaglione*/) {
    var idAgenteTmp = idAgente
    var fasciaTmp = fascia;
    var tipoP = "GE";
    var provviggione = 0;
    var riprovato = 0;
    if (articolo == '') {
        return false;
    }
    if (Array.isArray(recordSet) == true) {
        while (provviggione == 0 || riprovato < 5) {
            for (var x in recordSet) {
                if (recordSet[x].IDAGENTE == idAgente && recordSet[x].TIPOPROV == tipoP && recordSet[x].LISTINO == listinoBase && recordSet[x].SCAGLIONE == fascia) {
                    
                    if (fascia < 0 && recordSet[x].TIPOPROV == 'GL') {
                        for (var y = x; y < (recordSet).length; y++) {
                            if (recordSet[y].IDAGENTE == idAgente && recordSet[y].TIPOPROV == tipoP && recordSet[y].LISTINO == listinoBase && recordSet[y].SCAGLIONE == fascia) {
                                if (prezzoListino == Number(recordSet[y].FINOA)) {
                                    provviggione = recordSet[y].PROVVIGIONE;
                                    break;
                                }
                            }
                        }
                    } else if (fascia < 0) {
                        for (var y = x; y < (recordSet).length; y++) {
                            if (recordSet[y].IDAGENTE == idAgente && recordSet[y].TIPOPROV == tipoP && recordSet[y].LISTINO == listinoBase && recordSet[y].SCAGLIONE == fascia) {
                                if (ricarico <= Number(recordSet[y].FINOA)) {
                                    provviggione = recordSet[y].PROVVIGIONE;
                                    break;
                                }
                            }
                        }
                    } else {
                        for (var y = x; y < (recordSet).length; y++) {
                            if (recordSet[y].IDAGENTE == idAgente && recordSet[y].TIPOPROV == tipoP && recordSet[y].LISTINO == listinoBase && recordSet[y].SCAGLIONE == fascia) {
                                if (sconto <= Number(recordSet[y].FINOA)) {
                                    provviggione = recordSet[y].PROVVIGIONE;
                                    break;
                                }
                            }
                        }
                    }
                    if (provviggione != 0) {
                        break;
                    }
                }
            }
            if (provviggione == 0) {
                if (riprovato == 0 && fascia < 0) {
                    tipoP = 'GL';
                    riprovato = 1;
                } else if (riprovato == 1 || (riprovato == 0 && fascia >= 0)) {
                    idAgente = 0;
                    tipoP = 'GE';
                    riprovato = 2;
                } else if (riprovato == 2 && fascia < 0) {
                    idAgente = 0;
                    tipoP = 'GL';
                    riprovato = 3;
                } else if (riprovato < 4 && listinoBase >= 0) {
                    idAgente = idAgenteTmp;
                    tipoP = 'GE';
                    listinoBase = -1;
                    riprovato = 4;
                } else if (riprovato == 4) {
                    idAgente = 0;
                    riprovato = 5;
                } else {
                    return false;
                }
            }
        }

        return Number(provviggione);
    } else {
        attivaAlert(xTipoAllert.CRITICO, 'Errore record set non valido');
    }
}

function assegnaProvvigione(movimento, recordSet, listinoBase/*Tipo listino */, idAgente, prezzoListino/*Prezzo di listino teorico*/, fascia/*scaglione*/, scontoCassa = 0, omaggio = 0, costoArticolo = 0, provviggioneTotMerce = 0/*parametro cliente*/) {
    if (isEmpty(movimento) == false) {
        var aProv = 0;
        var aPrz = 0;
        var aListino = 0;
        var aRic = 0;
        // console.log('Scaglione : '+fascia)
        var codice = movimento.codice;
        var imponibileProvviggione = 0;
        var qu = movimento.qu;
        var importo = movimento.importo;

        if (qu != 0) {
            aPrz = Number(importo) / Number(qu);
        }
        aListino = prezzoListino;
        if (aListino > 0) {
            var aSc = 100 - (aPrz * 100 / aListino);
        } else {
            var aSc = 0;
        }
        if (costoArticolo == isNaN) {
            var costoArt = 0;
        } else {
            var costoArt = Number(costoArticolo);
        }

        if (costoArt == 0) {
            aRic = 0;
        } else {
            aRic = (Number(aPrz) * 100 / Number(costoArt)) - 100;
        }

        aProv = getPercentualeProvviggione(recordSet, idAgente, codice, aSc, aRic, -1, listinoBase, fascia)
        // console.log('Ritorno valore get percentuale aProv : '+aProv);
        movimento.percentualeProvvigione = aProv;
        if (provviggioneTotMerce == 0) {
            imponibileProvviggione = importo * (100 - Number(scontoCassa)) / 100;
        } else {
            imponibileProvviggione = importo;
        }

        if (omaggio == 1) {
            var impProv = 0;
        } else {
            var impProv = (Number(imponibileProvviggione) * aProv) / 100;
        }
        // console.log('Ritorno valore assegna provvigione : '+formattaNumeriInput(Number(impProv),2,0));
        if (impProv == isNaN) {
            console.error(impProv);
            return 0;
        }
        // console.log(formattaNumeriInput(Number(impProv),2,0));
        movimento.importoProvvigione = Number(formattaNumeriInput(Number(impProv), 2, 0));
        return formattaNumeriInput(Number(impProv), 2, 0);
    } else {
        attivaAlert(xTipoAllert.CRITICO, 'Errore movimento non valido');
    }
}
function recuperaValoriJson(obj, nomeOggettoJson) {
    for (var [k, v] of Object.entries(query[nomeOggettoJson]['oggetti'])) {
        if (typeof v === 'object') {
            if (v.obbligatorio == true) {
                var x = recuperaValueElemento(k);
                if (x == '') {
                    attivaAlert(xTipoAllert.ESCLAMAZIONE, '<div>Attenzione valore non valido!</div><div>' + v.campo + '</div>');
                    return false;
                }
                obj[v.campo] = recuperaValueElemento(k);
            } else if (v.lotto == true) {
                var x = recuperaValueElemento(k);
                obj['movLotti'] = [{ [v.campo]: recuperaValueElemento(k), 'qu': 1, 'scadenza': oggiISO() }]
            }
        } else {
            obj[v] = recuperaValueElemento(k);
        }

    }
}
function modalParametriPagina(nomeVariabileParametri = '') {
    if (nomeVariabileParametri != '') {
        eval('var objParametri = ' + nomeVariabileParametri);
    } else {
        var objParametri = parametri;
    }
    var list = ''
    for (var [k, v] of Object.entries(objParametri)) {
        list += `
        <div class="col4 row">
            <div class="w100 h60p row centraVerticalmente">
                <div id="" name="" class="row has-float-label">
                <input id="par-${k}" name="" type="text" placeholder="${k}" value="${v}">

                <span class="deleteicon" onclick="document.getElementById('par-${k}').value=''; "></span>
                <label id="lbl-par-${k}" for="par-${k}">${k}</label>
                </div>
            </div>
        </div>`
    }
    var modalListaMagazzino = `
<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        Lista Parametri Pagina
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
</div>
<div class="posTopA45p posBottomA75p w100 ">
    ${list}
</div>
<div class="pulsantiera posLeftA5p posBottomA10p">
<a id="cmdAddR" name="cmdAddR" href="#" class="w100-10p" title="Invia" onclick="attivaAlert(xTipoAllert.DOMANDASINO,'Attenzione sei sicuro di voler inviare la lista?','inviaLista_');"><img src="img/bianche/done.svg"></a>
</div>`;
    query['parametriPagina'] = new Array;
    query['parametriPagina']['modelloRiga'] = '';
    query['parametriPagina']['modelloContenitore'] = modalListaMagazzino;
    apriModalDettagli('parametriPagina', '', '', '');
    // var modalParametri=document.createElement('div');
    // modalParametri.id="modalParametri";
    // modalParametri.setAttribute("class","modalElenco clrSfumatoChiaro");
    // modalParametri.innerHTML=modalListaMagazzino;
    // document.body.appendChild(modalParametri);
    // modalParametri.style.display = "block";
    // show('modalParametri');
}
function getParamValue(paramName) {
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    for (var i = 0; i < qArray.length; i++) {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName)
            return pArr[1]; //return value
    }
    return false
}
function convertiDataSql(data) {
    if (data.indexOf('-') != -1) {
        var dataTmp = data.split('-');
        if (dataTmp[0].length == 4) {
            return data;
        } else {
            return dataTmp[2] + '-' + dataTmp[1] + '-' + dataTmp[0];
        }
    } else if (data.indexOf('-') == -1) {
        var data = data.replace(/\//g, '-')
        var dataTmp = data.split('-');
        if (dataTmp[0].length == 4) {
            return data;
        } else {
            return dataTmp[2] + '-' + dataTmp[1] + '-' + dataTmp[0];
        }
    }
}
function apriModalRicercaArticoli(idCodiceArticolo) {
    blur();
    var x = (location.href).split('/');
    var link = location.href.replace(x[x.length - 1], `ricercaArticoli.html?modRichiamo=${xIdDispositivo}`);

    query['modalRicercaArticoli'] = new Array();
    query['modalRicercaArticoli']['modalC-body'] = `
     <iframe style="width:100%; height:98%;" src="${link}" title="Ricerca Articoli" frameborder="0" ></iframe>'
      `;
   
    query['modalRicercaArticoli']['classModal'] = "modalRicercaArticoli";
    if (query[nomePagina]['ricercaCodice'] == undefined) {
        throw ('Funzione di ricerca non impostata ');
    }
    query['modalRicercaArticoli']['modalC-footerStyle'] = 'display:none;';
    query['modalRicercaArticoli']['styleModalBody'] = 'height:calc(100% - 50px);overflow:hidden;';
    var funzioneRicercaPagina = query[nomePagina]['ricercaCodice'];
    if (funzioneRicercaPagina.indexOf('this') != -1) {
        var funzioneRicercaPagina = funzioneRicercaPagina.replace('this', `document.getElementById('${idCodiceArticolo}')`)
    }
    apriModalCustom('modalRicercaArticoli', '', 'Ricerca Articoli', '', '', true);
    
    var action = function (e) {
        var tmpToken = '';
        if (e.data != undefined) {
            try {
                var dataJ = JSON.parse(e.data);
                if (dataJ.token != undefined) {
                    tmpToken = dataJ.token;
                }
            } catch (e) {
            }
        }

        if (xTkCom != tmpToken) {
            return;
        }
        chiudiModalCustom();

        document.getElementById(idCodiceArticolo).value = dataJ.codice
        eval(funzioneRicercaPagina);
        window.removeEventListener('message', action, false);
        // document.getElementById(idCodiceArticolo).focus();
    };
    window.addEventListener("message", action, false);

}

function elaboraCampiRicercaCodice() {
    var input = document.querySelectorAll('.inputRicercaArticolo');
    if (input.length == 0) {
        return;
    }
    if (query[nomePagina]['ricercaCodice'] == undefined) {
        return;
    }
    var funzioneRicercaPagina = query[nomePagina]['ricercaCodice'];

    for (var x in input) {
        if (input[x].id == null) {
            continue;
        }
        var funzione = `
        if (event.keyCode == 9 || event.keyCode==13){${funzioneRicercaPagina};comboScomparsaChiudi(this);}else if(event.keyCode==115){apriModalRicercaArticoli('${input[x].id}')}
    `;
        document.getElementById(input[x].id).setAttribute('onkeydown', funzione);

    }
}
function modalAcquisizione(idRiferimento, tabella, callback = '') {
    var li = '';
    for (var [k, v] of Object.entries(immaginiCaricate)) {
        if (!isEmpty(k)) {
            var elementiAllegati = `
                <li id="imgLi.{NOMEFILE}" name="{NOMEFILE}" class="w100-5p clrSfumatoScuro clrContorno elementiGriglia marg5Bottom" url="{URL}">
                    <a id="a.{NOMEFILE}" href="{URL}" target="_blank" class="w100-45p clrSfumatoScuro">
                        <img class="row marg5Dx" src="img/bianche/pdf.svg"/>
                        {NOMEFILE}
                    </a>
                    <img id="del.{NOMEFILE}" class="rowDx marg5Top marg5Dx hide cursoreBtn" title="Rimuovi Allegato" src="img/bianche/delete.svg" onclick="rimuoviImmagine(\'{NOMEFILE}\',\'{URL}\')"/>
                </li>`;
            li += elementiAllegati.replace(/{URL}/g, k).replace(/{NOMEFILE}/g, v.name).replace(/ hide/g, '');
        }
    }
    btnAllegaFotoCordova = '';
    query['incassa.html:allegati'] = new Array;
    query['incassa.html:allegati']['modalC-body'] = `
        <ul id="listaAllegati" class="row w100-5p elencoR1 h100-70p">${li}</ul>
        
        <input type="file" id="flImmagineCaricata"  accept="image/*,application/pdf,application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv" style="display:none">
    <div class="row w100-5p centraVerticalmente">
        <div class="pulsantieraDescrizione" id="">
						<label id="btnFotocamera" name="cmdFiltri"class="h65p ${xTipoDispositivo == 'web' ? 'w100' : 'w50'}" title="Fotocamera" onclick="allegaFotoDispositivoCordova('${idRiferimento}','${tabella}','${callback}')">
                            <img src="img/bianche/camera.svg">
                            <div class="testoTroncato1 normale testoPulsantiera">
                                Foto
                            </div>
                        </label>
						<label id="btnAllegaNuovaFoto" name="cmdOrdinamento" class="h65p ${xTipoDispositivo == 'web' ? 'w100' : 'w50'}" title="Allega" onclick="allegaImmagine('flImmagineCaricata',true,'listaAllegati')">
                            <img src="img/bianche/attach.svg">
                            <div class="testoTroncato1 normale testoPulsantiera"> 
                                Allega
                            </div>
                        </label>
	    </div>
    </div>
            `;
    query['incassa.html:allegati']['modalC-footer'] = `
        <div class="h50p clrSfumatoChiaro w100" style="border-radius:0px 0px 10px 10px ">
            <div class="w50 row h100">
                <div class="w90 centraElemento centraVerticalmente h100">
                    <input type="button" class="pulsanteVeBa w100 h90" value="Invia Immagini" onclick="inviaImmaginiAcquisite('${idRiferimento}','${tabella}','${callback}')">
                </div>
            </div>
            <div class="w50 row h100">
                <div class="w90 centraElemento centraVerticalmente h100">
                    <input type="button" class="pulsanteVeBa w100 h90" value="Chiudi" onclick="chiudiModalCustom()">
                </div>
            </div>
        </div>
        `;
    apriModalCustom('incassa.html:allegati', '', 'Acquisizione Immagini', 'allegaImmagine(\'flImmagineCaricata\',true,\'listaAllegati\')')
}
function inviaImmaginiAcquisite(idRiferimento, tabella, callBack = '') {
    if (idRiferimento == '' || tabella == '') {

        attivaAlert(xTipoAllert.ESCLAMAZIONE, 'Id o tabella non passata');
        throw ('id o tabella non passata');
        return;
    }
    var jSon = {
        'id': idRiferimento
    }
    var tabella = "TES_VENDITE";
    var parametri = { "tipoRisposta": "salva", "tipoSalva": "salvaImmagini", "dati": jSon, "tabella": tabella };
    var nomiImmagini = new Array;
    for (var [k, n] of Object.entries(immaginiCaricate)) {
        nomiImmagini.push(n.name);
    }
    jSon.immagini = nomiImmagini;
    caricaImmagini(() => {

        inviaRichiestaCentralino("salva", parametri, (res) => {
            chiudiModalCustom();
            if (callBack != '') {
                eval(callBack);
            }

        });
    }, true);
}
function modalRicercaCliente(idCampo, callBack = '',callBackChiusura='') {
    blur();
    var x = (location.href).split('/');
    var link = location.href.replace(x[x.length - 1], `ListaClienti.html?ListaClienti.html?tipoAnagrafica=ANAGRAFICA&modRichiamo=${xIdDispositivo}`);

    query['modalClienti'] = new Array();
    query['modalClienti']['modalC-body'] = `
     <iframe style="width:100%; height:96%;" src="${link}" title="Rubrica" frameborder="0" ></iframe>'
      `;
    query['modalClienti']['modalC-footerStyle'] = 'display:none;';
    query['modalClienti']['styleModalBody'] = 'height:calc(100% - 50px);';
    query['modalClienti']['classModal'] = "modalRicercaArticoli";

    apriModalCustom('modalClienti', '', 'Seleziona cliente', '', '', true,callBackChiusura);
    var fnc = (e) => {
        var tmpToken = '';
        if (e.data != undefined) {
            try {
                var dataJ = JSON.parse(e.data);
                if (dataJ.token != undefined) {
                    tmpToken = dataJ.token;
                }
            } catch (e) {
            }
        }

        if (xTkCom != tmpToken) {
            return;
        }
        var input = document.getElementById(idCampo)
        input.value = dataJ.ragioneSociale;
        input.setAttribute('idRagioneSociale', dataJ.id);
        
        if (callBack != '') {
            eval(callBack);
        }
        chiudiModalCustom();
        window.removeEventListener("message", fnc, false);

    }
    window.addEventListener("message", fnc, false);
}
function goMainPage(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href='mainPage.html';
    }else{
        window.open('mainPage.html',xTarget);
    }
    
}
function gestErroreLocalStorage(operazione, errore='') {
    var tmpError='';
    if(operazione=='aggiungi'){
        if(localStorage.getItem('gestErroreLocalStorage.'+xIdConfigurazione)!=''){
            tmpError+=localStorage.getItem('gestErroreLocalStorage.'+xIdConfigurazione);
        }
    localStorage.setItem('gestErroreLocalStorage.'+xIdConfigurazione,tmpError+' '+oggiISO()+' : '+ora()+' '+errore);
    }else if(operazione=='visualizza'){
        inviaSegnalazioneViaMail('Errore gestito su localStorage <br> '+localStorage.getItem('gestErroreLocalStorage.'+xIdConfigurazione))
        
    }else if(operazione=='svuota'){
        localStorage.setItem('gestErroreLocalStorage.'+xIdConfigurazione,'');
    }
    

}
function isNumber(text) {
    return !isNaN(text) && text.trim() !== '';
  }



  