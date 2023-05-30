// array Tipo
const tiposArr = [
        "R.D.",
        "Ri.Ba.",
        "Contanti",
        "Bonifico",
        "Contrassegno",
        "RID",
        "Titolo",
        "Acconto",
        "POS",
        "Ecobonus"
];

// array Iniz. Scad.
const iniScadArr = [
        "Data Fattura",
        "Fine Mese",
        "Giorno Fisso",
        "Fine Quindicina",
        "Data Inizio Trasporto",
        "Data Inizio Trasporto Fine Mese",    
];

// template riga pagamenti
const elementiNuovoPagamenti = `
    <li id="li.{ID}" name="li.{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10">
	    <div class="elementiGriglia w100">
            <div class="row w20 padTop5 normale">{DES_TIPOS}</div>
            <div class="row w25 padTop5 normale">{DES_INISCAD}</div>
            <div class="row w15 padTop5 normale">{GG}</div>
            <div class="row w10 padTop5 normale">{PERC_IMPONIB}</div>
            <div class="row w10 padTop5 normale">{PERC_IVA}</div>
            <div class="row w120p">
                <div class="row w10p hidden">div</div>
                <img class="row w40p" src="img/bianche/edit.svg" onclick="apriModificaRigaPagamento('{ID}')">
                <div class="row w5p hidden">div</div>
                <img class="row w40p" src="img/bianche/delete.svg" onclick="eliminaPagamento('{ID}');">
            </div>
	    </div>
    </li>`;

// righe pagamento
const liXAddR = `<li id="liAddR" name="liAddR" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom"></li>`;

// template modifica riga pagamento
const elementiPagamentiAdd = `
    <div id="divAddR" class="elementiGriglia marg10Top w100">
        <input id="txtID" type="number" class="w100-10p hide" placeholder="ID">
        <div class="has-float-label row w100">
            <div class="has-float-label row w30">
                <label for="cmbTipos">Tipo</label>
                <select id="cmbTipos" name="cmbTipos" class="selectBox"></select>
            </div>
            <div class="has-float-label row w30">
                <label for="cmbIniScad">Iniz. Scad</label>
                <select id="cmbIniScad" name="cmbIniScad" class="selectBox"></select>
            </div>
        </div
        <div class="has-float-label row w100">
            <div class="has-float-label row w20 ">
                <label for="txtGG">Giorni</label>
                <input id="txtGG" type="number" class="w100-10p" placeholder="Giorni" onkeypress="resetErrore(this)">
            </div>
            <div class="has-float-label row w20 ">
                <input id="txtPercImponib" type="number" max="100" class="w100-10p" placeholder="% Imponibile" onkeypress="resetErrore(this)">
                <label for="txtPercImponib">% Imponibile</label>
            </div>
            <div class="has-float-label row w20 ">
                <input id="txtPercIva" type="number" max="100" class="w100-10p" placeholder="% Iva" onkeypress="resetErrore(this)">
                <label for="txtPercIva">% Iva</label>
            </div>
        </div>
        <div class="pulsantiera">
            <a id="cmdSalvaRiga" href="#" class="w50" title="Salva" onclick="salvaRiga()"><img src="img/bianche/save.svg"/></a>
            <a id="cmdAnnullaRiga" href="#" class="w50" title="Annulla" onclick="annullaAddRiga()"><img src="img/bianche/annulla.svg"/></a>
        </div>
    </div>`;

const sessionPagamenti = {
    key: 'skPagamento',
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
var chkImportiUguali = false;        // checkbox importi uguali 
var imponibileColChanged = false;   // 
var ivaColChanged = false;
var isNew = false;

function descrizioniRighe() {
    makeLista('cmbTipos', tiposArr);    // crea elenco Tipo dall'array tiposArr
    makeLista('cmbIniScad', iniScadArr);  // crea elenco Iniz. Scad dall'array iniScadArr
}


function aggiungiLiR() {
    if (document.getElementById("divAddR") == undefined) {
        var ul = document.getElementById("elencoPagamenti");
        ul.innerHTML += liXAddR;

        var li = document.getElementById("liAddR");
        li.innerHTML=elementiPagamentiAdd;

        descrizioniRighe();

        imponibileColChanged = true;
        ivaColChanged = true;
        isNew = true;

        ul.scrollTop = ul.scrollHeight;
        document.getElementById("elencoPagamenti").focus();
        setEventImportiUguali(true);        
    }
}

function AnnullaAddR(id=0){
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
    var campiAl;
    var r;
    var idOrig=id;

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

    if (skPagamento!=undefined){
        //var jSon = JSON.parse(skPagamento);
        var jSon = sessionPagamenti.getItems();
    } else {
        var jSon={};

        jSon.tipoSalva="salva";

        for (x in query['nuovoPagamenti.html']['oggetti']){
            if (x!="elencoPagamenti"){
                jSon[query['nuovoPagamenti.html']['oggetti'][x]]=recuperaValueElemento(x);
            }
        }

        jSon.righe=[];
    }
    
    var appo={};

    if (id==0){
        idNew-=1;
        id=idNew;
    }

    for (x in query['nuovoPagamenti.html:elencoPagamentiM']['oggetti']){
        appo[query['nuovoPagamenti.html:elencoPagamentiM']['oggetti'][x]]=recuperaValueElemento(x);
    }

    if (id<0){
        appo.id=String(id);
    }

    x=-1;
    i=-1;

    if (jSon.righe.length>0){
        for (i in jSon.righe){
            if (jSon.righe[i].id==id){
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

    jSon.righe[x]=appo;

    // ricalcolo percentuali imponibile e iva
    console.log('elementiNuovoPagamenti => ', jSon.righe);
    // const rigaRif = idNew === -1 ? -1 : x;
    ricalcolaPercentuali(jSon.righe, x, imponibileColChanged, ivaColChanged, isNew);
    console.log('elementiNuovoPagamenti => ', jSon.righe);
    // skPagamento=JSON.stringify(jSon);
    sessionPagamenti.setItems(jSon);
    skPagamento = sessionPagamenti.getItems();
    // sessionStorage.setItem("skPagamento",skPagamento);

    var e = document.getElementById("elencoPagamenti");
    e.innerHTML = "";

    // AnnullaAddR(idOrig);    
    renderElencoPagamenti(jSon.righe);
    setEventImportiUguali(false);      
    isNew = false;  
    imponibileColChanged = false;
    ivaColChanged = false;
}

function eliminaPagamento(id ){
    attivaAlert(5,"Sei sicuro di voler eliminare questa riga?","rispEliminaPagamento_"+id);
}

function rispEliminaPagamento(risp, id) {
    if (risp == "Si") {
        avviaEliminaPagamento(id);
    } else {
        chiudiModalAlert("rispEliminaPagamento");
    }
}

function avviaEliminaPagamento(id) {
    var jSon = sessionPagamenti.getItems();
    jSon.righe = jSon.righe.filter(function (riga) { 
        return riga.id != id 
    });

    sessionPagamenti.setItems(jSon);
    skPagamento = sessionPagamenti.getItems();

    renderElencoPagamenti(jSon.righe);
}


function annullaAddRiga(id) {
    setEventImportiUguali(false);    
    renderElencoPagamenti(sessionPagamenti.getItems().righe);
}

var liOrig;

function apriModificaRigaPagamento(id){
    if (document.getElementById("divAddR")==undefined){
        setEventImportiUguali(true);        
        //skPagamento = sessionStorage.getItem("skPagamento");
        skPagamento = sessionPagamenti.getItems();
        //const jSonModal=JSON.parse(skPagamento).righe;
        const jSonModal = skPagamento.righe;
        console.log(jSonModal);

        const riga = jSonModal.find(function (item) {
            return item.id === id;
        });

       
        if (riga) {
            // console.log(riga);
            var li=document.getElementById("li."+id);
            liOrig=li.innerHTML;
            li.innerHTML=elementiPagamentiAdd;

            document.getElementById('txtPercImponib').addEventListener('change', function () {
                imponibileColChanged = true;
                console.log('imponibileColChanged: ', imponibileColChanged);
            })
    
            document.getElementById('txtPercIva').addEventListener('change', function () {
                ivaColChanged = true;
                console.log('ivaColChanged: ', ivaColChanged);
            })

            document.getElementById("cmdSalvaRiga").setAttribute("onclick","salvaRiga('"+id+"')");
            document.getElementById("cmdAnnullaRiga").setAttribute("onclick","annullaAddRiga('"+id+"')");

            descrizioniRighe();

            // jSonConfig=localStorage.getItem("cmbServer.jSon");
            // if (jSonConfig!=undefined){
            //     jSonConfig=JSON.parse(jSonConfig);
            //     popolaSelectDaJSON(jSonConfig,"cmbServer");
            // }
            
            console.log(riga);
            popolaFormModificaDati(riga, "nuovoPagamenti.html:elencoPagamentiM");
        }

        // for (x in jSonModal){
        //     if (jSonModal[x].ID==id){
        //         var li=document.getElementById("li."+id);
        //         liOrig=li.innerHTML;
        //         li.innerHTML=elementiServerAdd;

        //         document.getElementById("cmdSalvaR").setAttribute("onclick","SalvaServer('"+id+"')");
        //         document.getElementById("cmdAnnullaR").setAttribute("onclick","AnnullaAddR('"+id+"')");

        //         jSonConfig=localStorage.getItem("cmbServer.jSon");
        //         if (jSonConfig!=undefined){
        //             jSonConfig=JSON.parse(jSonConfig);
        //             popolaSelectDaJSON(jSonConfig,"cmbServer");
        //         }
                
        //         popolaFormModificaDati(jSonModal[x],"nuovoUtente.html:elencoServerM");
        //     }
        // }
    } 
    else {
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaRubrica");
    }
}

// UTILS
function renderElencoPagamenti(righe) {
    recuperaDescrizioni(righe);
    popolaElencoDaJson(righe, 'elencoPagamenti', 0, nomePagina+":elencoPagamenti", true);
}

function recuperaDescrizioni(righe) {
    righe.map(r => {
        r.DES_TIPOS = tiposArr[+r.TIPOS];
        r.DES_INISCAD = iniScadArr[+r.INISCAD]
    });
}

function makeLista(elementId, listaArray) {
    const obj = document.getElementById(elementId);         
    listaArray.map(function(descrizione, index) {
        opt = document.createElement("option");
        opt.value = index;
        opt.text = descrizione;
        obj.appendChild(opt);
    });
}

function setEventImportiUguali(value) {
    document.getElementById('chkRateUguali').disabled = value;
}