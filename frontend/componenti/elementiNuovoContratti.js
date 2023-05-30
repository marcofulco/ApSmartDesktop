// array Tipo
const applicaA = [
        "Tutti",
        "Famiglia",
        "Cliente",
        "Agente",
        "Professione"
];

const applicaAR = [
    "Tutti",
    "Famiglia",
    "Tipologia",
    "Articolo",
    "Fornitore Abit."
];

// template righe
const elementiNuovoContratti = `
    <li id="li.{ID}" name="li.{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10">
	    <div class="elementiGriglia hPiccolo w100-75p">
            <div class="row w7 testoTroncato1" title="{DESTIPO}">{DESTIPO}</div>
            <div class="row w18 cel">{DESIDRIF}</div>
            <div class="row w8 cel">{CATSC}</div>
            <div class="row w5 dx cel">{QU}</div>
            <div class="row w10 dx cel">{PREZZO}</div>
            <div class="row w5 dx cel">{SC1}</div>
            <div class="row w5 dx cel">{SC2}</div>
            <div class="row w5 dx cel">{SC3}</div>
            <div class="row w5 dx cel">{SC4}</div>
            <div class="row w5 dx cel">{SC5}</div>
            <div class="row w10 dx cel">{PREZZOIC}</div>
            <div class="row w10 dx cel">{PROVVIGIONE}</div>
            <div class="row w7 dx cel">{QUTAMAX}</div>
	    </div>
        <div class="elementiGriglia hGrande w100-75p testo14">
            <div class="row w15 testoTroncato1">{DESTIPO}</div>
            <div class="row w70 cel">{DESIDRIF}</div>
            <div class="row w15 cx cel">{CATSC}</div>
            <div class="row w30 dx cel">{PREZZO}</div>
            <div class="row w30 dx cel">{PREZZOIC}</div>
            <div class="row w40 dx cel">{SCONTI}</div>
            <div class="row w33 dx cel">{QU}</div>
            <div class="row w33 dx cel">{PROVVIGIONE}</div>
            <div class="row w33 dx cel">{QUTAMAX}</div>
        </div>
        <div class="row w75p">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriModificaRiga('{ID}')">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaRiga('{ID}');">
        </div>
    </li>`;

// righe nuove
const liXAddR = `<li id="liAddR" name="liAddR" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom"></li>`;

// template modifica righe
const elementiRigheAdd = `
    <div id="divAddR" class="elementiGriglia marg10Top w100">
        <input id="txtIDR" type="number" class="w100-10p hide" placeholder="ID">
        <div class="has-float-label row w100">
            <div class="has-float-label row col3">
                <label for="cmbTipos">Tipo</label>
                <select id="cmbTipos" name="cmbTipos" class="selectBox" onchange="aggiornaApplicaAR(this)">
                    <option value="0">Tutti</option>
                    <option value="1">Famiglia</option>
                    <option value="2">Tipologia</option>
                    <option value="3">Articolo</option>
                    <option value="4">Fornitore Abit.</option>
                </select>
            </div>
            <div id="divApplicaARCont" class="has-float-label row col6">
                <label for="cmbApplicaAR">Applica a ...</label>
                <select id="cmbApplicaAR" name="cmbApplicaA" class="selectBox">
                    <option value="0">Applica a ...</option>
                </select>
            </div>
            <div id="divArticolo" class="row col6 hide">
                <div class="has-float-label row col3">
                    <label for="txtCodiceArticolo">Codice Articolo</label>
                    <input id="txtCodiceArticolo" type="text" maxlenght="40" class="w100-10p" placeholder="Codice Articolo" onkeypress="resetErrore(this)">
                </div>
                <button id="cmdBarCode" class="row w40p h42p pulsante clrTestoBianco marg2Top padSx5 marg5Dx btnCustom" title="Avvia Lettore BarCode" onclick="apriLettoreBarCode('txtCodiceArticolo')">
                    <img class="row w30p posTopA" src="img/bianche/barcode.svg">
                </button>
                <button id="cmdBarCode" class="row w40p h42p pulsante clrTestoBianco marg2Top padSx5 btnCustom" title="Ricera Articolo" onclick="apriModalRicercaArticoli('txtCodiceArticolo')">
                    <img class="row w30p posTopA" src="img/bianche/search.svg">
                </button>
                <div id="divDescrizioneArticoloR" class="row col6 clrTestoBianco testoNormale marg5Sx marg5Top"></div>
            </div>
        </div
        <div class="has-float-label row w100">
            <div class="has-float-label row col2">
                <label for="txtCat">Categoria Sconto</label>
                <input id="txtCat" type="text" maxlenght="20" class="w100-10p" placeholder="Categoria Sconto" onkeypress="resetErrore(this)">
            </div>
            <div class="has-float-label row col2">
                <input id="txtQu" type="number" inputmode="decimal" class="w100-10p" placeholder="Qu.tà" onkeypress="resetErrore(this)">
                <label for="txtQu">Qu.tà</label>
            </div>
            <div class="has-float-label row col3">
                <input id="txtPrezzo" type="number" inputmode="decimal" class="w100-10p" placeholder="Prezzo+I." onkeypress="resetErrore(this)" onchange="calcolaPrezzi()">
                <label for="txtPrezzo">Prezzo+I.</label>
            </div>
            <div class="has-float-label row col1">
                <input id="txtSc1" type="number" inputmode="decimal" max="100" class="w100-10p" placeholder="Sc.1" onkeypress="resetErrore(this)">
                <label for="txtSc1">Sc.1</label>
            </div>
            <div class="has-float-label row col1">
                <input id="txtSc2" type="number" inputmode="decimal" max="100" class="w100-10p" placeholder="Sc.2" onkeypress="resetErrore(this)">
                <label for="txtSc2">Sc.2</label>
            </div>
            <div class="has-float-label row col1">
                <input id="txtSc3" type="number" inputmode="decimal" max="100" class="w100-10p" placeholder="Sc.3" onkeypress="resetErrore(this)">
                <label for="txtSc3">Sc.3</label>
            </div>
            <div class="has-float-label row col1">
                <input id="txtSc4" type="number" inputmode="decimal" max="100" class="w100-10p" placeholder="Sc.4" onkeypress="resetErrore(this)">
                <label for="txtSc4">Sc.4</label>
            </div>
            <div class="has-float-label row col1">
                <input id="txtSc5" type="number" inputmode="decimal" max="100" class="w100-10p" placeholder="Sc.5" onkeypress="resetErrore(this)">
                <label for="txtSc5">Sc.5</label>
            </div>
            <div class="has-float-label row col3">
                <input id="txtPrezzoIC" type="number" inputmode="decimal" class="w100-10p" placeholder="Prezzo ic" onkeypress="resetErrore(this)" onchange="calcolaPrezzi(true)">
                <label for="txtPrezzoIC">Prezzo ic</label>
            </div>
            <div class="has-float-label row col1">
                <input id="txtPercProv" type="number" inputmode="decimal" max="100" class="w100-10p" placeholder="% Prov." onkeypress="resetErrore(this)">
                <label for="txtPercProv">% Prov</label>
            </div>
            <div class="has-float-label row col2">
                <input id="txtQuMax" type="number" inputmode="decimal" class="w100-10p" placeholder="Qu.tà Max" onkeypress="resetErrore(this)">
                <label for="txtQuMax">Qu.tà Max</label>
            </div>
        </div>
        <div class="pulsantiera">
            <a id="cmdSalvaRiga" href="#" class="w50" title="Salva" onclick="salvaRiga()"><img src="img/bianche/save.svg"/></a>
            <a id="cmdAnnullaRiga" href="#" class="w50" title="Annulla" onclick="annullaAddRiga()"><img src="img/bianche/annulla.svg"/></a>
        </div>
    </div>`;

const session = {
    key: 'skVarie.contratti',
    setItems(value) {
        sessionStorage.setItem(this.key, JSON.stringify(value));
    },
    getItems() {
        return JSON.parse(sessionStorage.getItem(this.key));
    },
    clearItems() {
        sessionStorage.removeItem(this.key);
    }
}
     

var parametriRNC={"obbligatori":""};
var jSonConfig;
var idNew=0;
var isNew = false;

function aggiungiLiR() {
    if (document.getElementById("divAddR") == undefined) {
        var ul = document.getElementById("elencoRighe");
        ul.innerHTML += liXAddR;

        var li = document.getElementById("liAddR");
        li.innerHTML=elementiRigheAdd;

        isNew = true;

        ul.scrollTop = ul.scrollHeight;
        document.getElementById("elencoRighe").focus();

        valorizzaValueElemento("txtIDR",0);
        valorizzaValueElemento("txtCat","");
        valorizzaValueElemento("txtQu",0);
        valorizzaValueElemento("txtPrezzo",0);
        valorizzaValueElemento("txtSc1",0);
        valorizzaValueElemento("txtSc2",0);
        valorizzaValueElemento("txtSc3",0);
        valorizzaValueElemento("txtSc4",0);
        valorizzaValueElemento("txtSc5",0);
        valorizzaValueElemento("txtPrezzoIC",0);
        valorizzaValueElemento("txtPercProv",-1);
        valorizzaValueElemento("txtQuMax",0);

        document.getElementById("cmbTipos").focus();
    }
}

function annullaAddRiga(id=0){
    var e=document.getElementById("liAddR");

    if (id==0){
        var e=document.getElementById("liAddR");
        e.parentNode.removeChild(e);
    } else {
        var e=document.getElementById("li."+id);
        e.innerHTML=liOrig;
    }
}

function salvaRiga(id=0){
    var v;
    var errori=false;
    var campi="";
    var e;

    for (x in parametriRNC){
        if (x=="obbligatori") {
            v=parametriRNC.obbligatori.split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    errori=true;
                    e=document.getElementById(v[i]);
                    e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi+=e.getAttribute("placeholder")+'<br>';
                }
            }
        }
    }

    if (errori){
        attivaAlert(2,"Non sono stati valorizzati i seguenti Campi Obbligatori:<br>"+campi,"erroriCampi");
        return;
    }

    if (sk!=undefined){
        var jSon = sk;
    } else {
        var jSon=[];

        jSon[0]={};

        jSon[0].tipoSalva="salva";

        for (x in query[tagNuovoHtml]['oggetti']){
            if (x!="elencoRighe"){
                jSon[0][query[tagNuovoHtml]['oggetti'][x]]=recuperaValueElemento(x);
            }
        }

        jSon[0].righe=[];
    }
    
    var appo={};

    if (id==0){
        idNew-=1;
        id=idNew;
    }

    for (x in query[tagNuovoElencoM]['oggetti']){
        // if (x=="IDRif"){
        //     switch (recuperaValueElemento("cmbTipos")){
        //         case "3":
        //             appo[query[tagNuovoElencoM]['oggetti'][x]]=recuperaValueElemento("txtCodiceArticolo");
        //         break;
        //         default:
        //             appo[query[tagNuovoElencoM]['oggetti'][x]]=recuperaValueElemento("cmbApplicaAR");
        //         break;
        //     }
        // } else {
            if (typeof query[tagNuovoElencoM]['oggetti'][x] === 'object') {
                appo[query[tagNuovoElencoM]['oggetti'][x].campo]=recuperaValueElemento(x);
            } else {
                appo[query[tagNuovoElencoM]['oggetti'][x]]=recuperaValueElemento(x);
            }
        // }
    }

    if (id<0){
        appo.ID=String(id);
    }

    appo.SCONTI="";

    for (i=1;i<6;i++){
        if (i>2){
            if (appo["SC"+i]!=0){
                appo.SCONTI+="+"+formattaNumeri(appo["SC"+i],2,0);
            }
        } else {
            if (appo["Sc"+i]!=0){
                if (i==1){
                    appo.SCONTI+=formattaNumeri(appo["Sc"+i],2,0);
                } else {
                    appo.SCONTI+="+"+formattaNumeri(appo["Sc"+i],2,0);
                }
            } else if (i==1){
                break;
            }
        }
    }

    x=-1;
    i=-1;

    if (jSon[0].righe.length>0){
        for (i in jSon[0].righe){
            if (jSon[0].righe[i].ID==id){
                x=i;
                break;
            }
        }
    }

    if (x==-1){
        x=Number(i)+1;
    } else {
        appo.modificato=1;
    }

    if (recuperaValueElemento("cmbTipos")==3){
        appo.IDRif=recuperaValueElemento("txtCodiceArticolo");
        appo.DESIDRIF=recuperaHTMLElemento("divDescrizioneArticoloR");
    }

    jSon[0].righe[x]=appo;

    session.setItems(jSon);
    sk = session.getItems();
    
    var e = document.getElementById("elencoRighe");
    e.innerHTML = "";
  
    renderElencoRighe(jSon[0].righe);
}

function eliminaRiga(id ){
    attivaAlert(5,"Sei sicuro di voler eliminare questa riga?","rispEliminaRiga_"+id);
}

function rispEliminaRiga(risp, id) {
    if (risp == "Si") {
        avviaEliminaRiga(id);
    } else {
        chiudiModalAlert("rispEliminaRiga");
    }
}

function avviaEliminaRiga(id) {
    var jSon = sk[0];
    jSon.righe = jSon.righe.filter(function (riga) { 
        return riga.id != id 
    });

    renderElencoRighe(jSon.righe);
}

var liOrig;

function apriModificaRiga(id){
    if (document.getElementById("divAddR")==undefined){
        const jSonModal = sk[0].righe;

        const riga = jSonModal.find(function (item) {
            return item.ID === id;
        });

        if (riga) {
            var li=document.getElementById("li."+id);
            liOrig=li.innerHTML;
            li.innerHTML=elementiRigheAdd;

            document.getElementById("cmdSalvaRiga").setAttribute("onclick","salvaRiga('"+id+"')");
            document.getElementById("cmdAnnullaRiga").setAttribute("onclick","annullaAddRiga('"+id+"')");

            valorizzaApplicaAR(riga.TIPO);

            popolaFormModificaDati(riga, tagNuovoElencoM);

            if (riga.TIPO=="3"){
                valorizzaHTMLElemento("divDescrizioneArticoloR",riga.DESIDRIF);
            }
        }
    } else {
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaRubrica");
    }
}

function valorizzaApplicaAR(tipo) {
    var divArt=document.getElementById("divArticolo");
    var divApp=document.getElementById("divApplicaARCont");

    if (tipo=="3"){
        divArt.classList.remove("hide");
        divApp.classList.add("hide");

    } else {
        divArt.classList.add("hide");
        divApp.classList.remove("hide");

        switch (tipo) {
            case "1":
                rs=JSON.parse(localStorage.getItem("listaGrMercContratti.jSon"));
            break;
            case "2":
                rs=JSON.parse(localStorage.getItem("cmbTipologia.jSon"));
            break;
            // case "3":
            //     rs=JSON.parse(localStorage.getItem("listaArticoliContratti.jSon"));
            // break;
            case "4":
                rs=JSON.parse(localStorage.getItem("cmbFornitore.jSon"));
            break;
        }

        var cbo=document.getElementById("cmbApplicaAR");

        if (tipo!="0" && rs!=undefined){
            popolaSelectDaJSON(rs,"cmbApplicaAR");
            cbo.removeAttribute("disabled");
            cbo.focus();
        } else {
            cbo.value="0";
            cbo.setAttribute("disabled",true);
        }
    }
}

function aggiornaApplicaAR(s){
    var tipo=s.value;
    valorizzaApplicaAR(tipo);
}

function recuperaDescrizioni(righe) {
    righe.map(r => {
        r.DESTIPO = applicaAR[+r.TIPO];

        if (r.TIPO!="0"){
            switch (r.TIPO) {
                case "1":
                    rs=JSON.parse(localStorage.getItem("listaGrMercContratti.jSon"));
                break;
                case "2":
                    rs=JSON.parse(localStorage.getItem("cmbTipologia.jSon"));
                break;
                case "3":
                    //rs=JSON.parse(localStorage.getItem("listaArticoliContratti.jSon"));
                    return;
                break;
                case "4":
                    rs=JSON.parse(localStorage.getItem("cmbFornitore.jSon"));
                break;
            }

            var x=rs.find(x => x.id.toLowerCase() == r.IDRif.toLowerCase());

            if (x!=undefined){
                r.DESIDRIF = x.descrizione;
            } else {  
                r.DESIDRIF = "";
            }
        } else {
            r.DESIDRIF = "";
        }
    });
}

function renderElencoRighe(righe) {
    recuperaDescrizioni(righe);
    popolaElencoDaJson(righe, 'elencoRighe', 0, tagNuovoElenco, true);
}

function calcolaPrezzi(daIvaInc=false){
    var Prezzo=0;

    if (daIvaInc==false){
        Prezzo=recuperaValueElemento("txtPrezzo");
        valorizzaValueElemento("txtPrezzoIC",arrotonda(Prezzo*1.22,5));
    } else {
        Prezzo=recuperaValueElemento("txtPrezzoIC");
        valorizzaValueElemento("txtPrezzo",arrotonda(Prezzo/1.22,5));
    }
}