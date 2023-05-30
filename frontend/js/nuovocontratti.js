const tagNuovoHtml = 'nuovocontratti.html';
const tagNuovoElenco = tagNuovoHtml + ':elencoRighe';
const tagNuovoElencoM = tagNuovoHtml + ':elencoRigheM';

query[tagNuovoHtml]=new Array;
query[tagNuovoHtml]['oggetti']=new Array;
query[tagNuovoHtml]['oggetti']['txtID']='ID';
query[tagNuovoHtml]['oggetti']['txtDescrizione']='Descrizione';
query[tagNuovoHtml]['oggetti']['cmbApplicaA']='TIPO';
query[tagNuovoHtml]['oggetti']['cmbFamigliaCliFor']='IDRif';
query[tagNuovoHtml]['oggetti']['cmbAgente']='IDRif';
query[tagNuovoHtml]['oggetti']['cmbClienti']='IDRif';
query[tagNuovoHtml]['oggetti']['cmbProfessione']='IDRif';
query[tagNuovoHtml]['oggetti']['txtDataDa']='daData';
query[tagNuovoHtml]['oggetti']['txtDataA']='aData';
query[tagNuovoHtml]['oggetti']['cmbListino']='Listino';
query[tagNuovoHtml]['oggetti']['txtListino']='Listino';
query[tagNuovoHtml]['oggetti']['cmbPagamento']='Pagamento';
query[tagNuovoHtml]['oggetti']['txtScCassa']='ScCassa';
query[tagNuovoHtml]['oggetti']['cmbDestinazione']='IDDEST';
query[tagNuovoHtml]['oggetti']['cmbPagamentoC']='C_PAGAMENTO';
query[tagNuovoHtml]['oggetti']['chkPagamento']='chkPAGAMENTO';
query[tagNuovoHtml]['oggetti']['chkPriorita']='PRIORITA';
query[tagNuovoHtml]['oggetti']['chkInternet']='INTERNET';
query[tagNuovoHtml]['oggetti']['chkAvviso']='AVVISO';
query[tagNuovoHtml]['oggetti']['chkObbiettivo']='OBBIETTIVO';
query[tagNuovoHtml]['oggetti']['txtNoteC']='NOTEC';
query[tagNuovoHtml]['oggetti']['chkGiornalino']='GIORNALINO';
query[tagNuovoHtml]['oggetti']['chkSoloExtraSconto']='SOLOEXTRASCONTO';
query[tagNuovoHtml]['oggetti']['elencoRighe']="righe";
query[tagNuovoHtml]['ricercaCodice']='ricercaCodiceDaBarcode(this)';

query[tagNuovoElenco]=new Array;
query[tagNuovoElenco]['OFFSET']=0;
query[tagNuovoElenco]['FETCH']=100;
query[tagNuovoElenco]['MAXFETCH']=0;
query[tagNuovoElenco]['COUNT']="id";
query[tagNuovoElenco]['modelloRiga']=elementiNuovoContratti;
query[tagNuovoElenco]['oggetti']=new Array;

/*[ID],[IDTES],[TIPO],[IDRif],[QU],[Prezzo],[Sc1],[Sc2],[CATSC],[PROVVIGIONE],[SC3],[SC4],[SC5],[QUTAMAX]*/

query[tagNuovoElenco]['oggetti']['{ID}']="ID";
query[tagNuovoElenco]['oggetti']['{IDTES}']="IDTES";
query[tagNuovoElenco]['oggetti']['{TIPO}']="TIPO";
query[tagNuovoElenco]['oggetti']['{DESTIPO}']="DESTIPO";
query[tagNuovoElenco]['oggetti']['{IDRif}']="IDRif";
query[tagNuovoElenco]['oggetti']['{DESIDRIF}']="DESIDRIF";
query[tagNuovoElenco]['oggetti']['{QU}']={campo: "QU", decimaliMax: 3, decimaliMin: 0};
query[tagNuovoElenco]['oggetti']['{PREZZO}']={campo: "Prezzo", decimaliMax: 5, decimaliMin: 2};
query[tagNuovoElenco]['oggetti']['{PREZZOIC}']={campo: "PREZZOIC", decimaliMax: 5, decimaliMin: 2};
query[tagNuovoElenco]['oggetti']['{SC1}']={campo: "Sc1", decimaliMax: 2, decimaliMin: 0};
query[tagNuovoElenco]['oggetti']['{SC2}']={campo: "Sc2", decimaliMax: 2, decimaliMin: 0};
query[tagNuovoElenco]['oggetti']['{SC3}']={campo: "SC3", decimaliMax: 2, decimaliMin: 0};
query[tagNuovoElenco]['oggetti']['{SC4}']={campo: "SC4", decimaliMax: 2, decimaliMin: 0};
query[tagNuovoElenco]['oggetti']['{SC5}']={campo: "SC5", decimaliMax: 2, decimaliMin: 0};
query[tagNuovoElenco]['oggetti']['{SCONTI}']="SCONTI";
query[tagNuovoElenco]['oggetti']['{CATSC}']="CATSC";
query[tagNuovoElenco]['oggetti']['{PROVVIGIONE}']={ campo: "PROVVIGIONE", decimaliMax: 2, decimaliMin: 0 };
query[tagNuovoElenco]['oggetti']['{QUTAMAX}']={ campo: "QUTAMAX", decimaliMax: 3, decimaliMin: 0 };

query[tagNuovoElencoM]=new Array;
query[tagNuovoElencoM]['oggetti']=new Array;
query[tagNuovoElencoM]['oggetti']['txtIDR']="ID";
query[tagNuovoElencoM]['oggetti']['cmbTipos']="TIPO";
query[tagNuovoElencoM]['oggetti']['txtCodiceArticolo']="IDRif";
query[tagNuovoElencoM]['oggetti']['cmbApplicaAR']="IDRif";
query[tagNuovoElencoM]['oggetti']['txtCat']="CATSC";
query[tagNuovoElencoM]['oggetti']['txtQu']="QU";
query[tagNuovoElencoM]['oggetti']['txtPrezzo']={campo: "Prezzo", decimaliMax: 5, decimaliMin: 2};;
query[tagNuovoElencoM]['oggetti']['txtSc1']="Sc1";
query[tagNuovoElencoM]['oggetti']['txtSc2']="Sc2";
query[tagNuovoElencoM]['oggetti']['txtSc3']="SC3";
query[tagNuovoElencoM]['oggetti']['txtSc4']="SC4";
query[tagNuovoElencoM]['oggetti']['txtSc5']="SC5";
query[tagNuovoElencoM]['oggetti']['txtPrezzoIC']={campo: "PREZZOIC", decimaliMax: 5, decimaliMin: 2};
query[tagNuovoElencoM]['oggetti']['txtPercProv']="PROVVIGIONE";
query[tagNuovoElencoM]['oggetti']['txtQuMax']="QUTAMAX";

var parametriNC={"obbligatori":"", "alternativi":"", "alternativi1":"", "nascosti":";"};

var sk;
var idModifica=0;
var av=recuperaParametroHRef("","av");

if (av=="A"){
    valorizzaHTMLElemento("optCliente","Fornitore");
} else if (av==""){
    av="V";
}

window.addEventListener("load", function(event) {
    setTimeout( function() {
        var div=document.getElementById("divTitolo");

        sk=session.getItems();

        if (sk != undefined) {
            idModifica=sk[0].ID;
            div.innerHTML="MODIFICA ";
        } else {
            div.innerHTML="NUOVO ";
        }

        div.innerHTML+="CONTRATTO";

        recuperaParametri();

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        
            mostraNascondiElemento('divChk','hide',document.getElementById('cmdNascondiChk'));
            mostraNascondiElemento('divAltriRif','hide',document.getElementById('cmdNascondiAltriRif'));
    }, 50);
});

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "id":"", "userName": ""}; 
    elencoInCaricamento=1;
    inviaRichiestaCentralino("parametri",parametri,elaboraParametri);
}

function elaboraParametri(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    for (x in data){
        if (!isNaN(Number(data[x]["valore"]))){
            parametriNC[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriNC[data[x]["parametro"]]=data[x]["valore"];
        }  
    }

    if (parametriNC.nascosti!=''){
        m=parametriNC.nascosti.split(";");
        for (x in m){
            try {
                document.getElementById(m[x]).classList.add("hide");
            } catch (error) {
                
            }
        }
    }

    sk = session.getItems();

    avviaCarDati("cmbFamigliaCliFor");
    //avviaCarDati("cmbClienti");
    avviaCarDati("cmbAgente");
    avviaCarDati("cmbProfessione");
    avviaCarDati("cmbDeposito");
    avviaCarDati("cmbListino");
    avviaCarDati("cmbPagamento");
    avviaCarDati("cmbPagamentoC");
    avviaCarDati("cmbDestinazione");
    // avviaCarDati("listaArticoliContratti");
    avviaCarDati("listaGrMercContratti");
    avviaCarDati("cmbTipologia");
    avviaCarDati("cmbFornitore");
}

function avviaCarDati(selectID, idCliente=0){
    var parametri;

    switch (selectID){
        case "cmbPagamento":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"tesPagamenti", "select":selectID};
        break;
        case "cmbPagamentoC":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"tesPagamenti", "select":selectID};
        break;
        case "cmbFamigliaCliFor":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"RaggruppamentoCliFor", "select":selectID};
        break;
        case "cmbAgente":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"Agenti", "select":selectID};
        break;
        case "cmbProfessione":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"professioni", "select":selectID};
        break;
        case "cmbListino":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"anagraficaListini", "select":selectID};
        break;
        case "cmbDeposito":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"depositi", "select":selectID};
        break;
        // case "cmbClienti":
        //     if (av=='V'){
        //         parametri={"tipoRisposta": "select","tipoQuery":"querySpecifica","nomeTabella":"clienti","select": selectID};
        //     } else {
        //         parametri={"tipoRisposta": "select","tipoQuery":"querySpecifica","nomeTabella":"fornitori","select": selectID};
        //     }
        // break;
        case "cmbDestinazione":
            if (sk!=undefined && idCliente==0){
                if (sk[0].TIPO==2){
                    idCliente=sk[0].IDRif;
                }
            }

            parametri={"tipoRisposta": "select","tipoQuery":"querySpecifica","nomeTabella": "listaDestinazioni", "select": selectID, "idCliente":idCliente};
        break;
        // case "listaArticoliContratti":
        //     parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"articoliContratti", "select":selectID};
        // break;
        case "listaGrMercContratti":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"GrMercContratti", "select":selectID};
        break;
        case "cmbTipologia":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"tipologiaArticoli", "select":selectID};
        break;
        case "cmbFornitore":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"fornitori", "select":selectID};
        break;
    }   

    parametri.md5=localStorage.getItem(selectID+".md5");

    inviaRichiestaCentralino("query",parametri);
}

var risposte=0;

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    risposte+=1;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            var s=document.getElementById(parametri.select);
            var o=s.getElementsByTagName("option")[0];
            if (o!=undefined){
                valorizzaHTMLElemento(parametri.select,`<option value="0">${o.innerHTML}</option>`);
            }

            if (risposte==11 && sk!=undefined){
                if (sk[0].ID!=""){
                    carDatiAnag();
                }
            }

            return "";
        }
    }
    
    data=verificaMd5(parametri.select,parametri,risp,data);

    if (res.select!="listaArticoliContratti" && res.select!="listaGrMercContratti" && res.select!="cmbTipologia" && res.select!="cmbFornitore"){
        popolaSelectDaJSON(data,parametri.select);
    }
    
    if (risposte==11 && sk!=undefined){
        if (sk[0].ID!=""){
            carDatiAnag();
        }
    }
}

function carDatiAnag(){
    risposte=0;

    var parametri={"tipoQuery":"listeVarie","tipoRisposta":"scheda","nomeQuery":"listeVarie.html:schedacontrattiRighe","id":idModifica,"chiamante":"scheda","offSet":0,"fetch":0,"ricerca":''}; 
    
    inviaRichiestaCentralino("query",parametri,elaboraCarDatiAnag);
}

function elaboraCarDatiAnag(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            visualizzaRiferimento(sk[0].TIPO);
            popolaFormModificaDati(sk[0], "nuovocontratti.html");
            return "";
        }
    }

    sk[0].righe=data;

    visualizzaRiferimento(sk[0].TIPO);
    popolaFormModificaDati(sk[0], "nuovocontratti.html");

    if (sk[0].TIPO==2){
        var parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"ragSocContratti", "idCliente":sk[0].IDRif};

        inviaRichiestaCentralino("query",parametri,elaboraCarDatiAnagCliente);
    }
}

function elaboraCarDatiAnagCliente(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            return "";
        }
    }

    document.getElementById("cmbClienti").setAttribute("idragionesociale",data[0].id);
    valorizzaValueElemento("cmbClienti",data[0].descrizione);
}

function visualizzaRiferimento(tipo){
    document.getElementById("divFamigliaCliFor").classList.add("hide");
    document.getElementById("divClienti").classList.add("hide");
    document.getElementById("divAgente").classList.add("hide");
    document.getElementById("divProfessione").classList.add("hide");
    document.getElementById("divDestinazione").classList.add("hide");

    switch (tipo){
        case "1":
            document.getElementById("divFamigliaCliFor").classList.remove("hide");
            break;
        case "2":
            document.getElementById("divClienti").classList.remove("hide");
            document.getElementById("divDestinazione").classList.remove("hide");
            break;
        case "3":
            document.getElementById("divAgente").classList.remove("hide");
            break;
        case "4":
            document.getElementById("divProfessione").classList.remove("hide");
            break;
    }
}

function esci(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="listeVarie.html?tabella=contratti&av="+av;
    }else{
        window.open("listeVarie.html?tabella=contratti&av="+av, "_self");
    }
    
}

function Salva(){
    var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;

    if (document.getElementById("divAddR") != undefined) {
        attivaAlert(xTipoAllert.ESCLAMAZIONE, "Attenzione! Terminare la modifica della riga contratto prima di procedere al salvataggio!");
        return;
    }

    for (x in parametriNC){
        if (x=="obbligatori") {
            v=parametriNC.obbligatori.split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    errori=true;
                    e=document.getElementById(v[i]);
                    e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi+=e.getAttribute("placeholder")+'<br>';
                }
            }
        } else if (x.indexOf("alternativi")>=0) {
            r=0;
            campiAl=[""];

            v=parametriNC[x].split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    r+=1;
                    campiAl[r]=v[i];
                } else {
                    r=0;
                    break;
                }
            }

            if (r>0){
                for (i=1;i<=r;i++){
                    errori=true;
                    e=document.getElementById(campiAl[i]);
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

    var tipoSalva="update";

    if (sk!=undefined){
        var jSon=sk[0];

        if (jSon.ID==""){
            tipoSalva="salva";
        }
    } else {
        var jSon={};
        jSon.tipoSalva="salva";
    }

    if (jSon.tipoSalva!=undefined){
        tipoSalva=jSon.tipoSalva;
        delete jSon["tipoSalva"];
    }

    for (x in query[tagNuovoHtml]['oggetti']){
        if (x!="elencoRighe"){
            jSon[query[tagNuovoHtml]['oggetti'][x]]=recuperaValueElemento(x);
        }
    }

    switch (jSon.TIPO){
        case "1":
            jSon["IDRif"]=recuperaValueElemento("cmbFamigliaCliFor");
            break;
        case "2":
            jSon["IDRif"]=document.getElementById("cmbClienti").getAttribute("idragionesociale");
            break;
        case "3":
            jSon["IDRif"]=recuperaValueElemento("cmbAgente");
            break;
        case "4":
            jSon["IDRif"]=recuperaValueElemento("cmbProfessione");
            break;
        default:
            jSon["IDRif"]=0;
            break;
    }

    if (jSon.Listino==""){
        jSon.Listino=0;
    }

    if (jSon.ScCassa==""){
        jSon.ScCassa=0;
    }

    if (jSon.AVC=="" || jSon.AVC==undefined){
        jSon.AVC=av;
    }

    var parametri={"tipoRisposta":tipoSalva,"tipoSalva":"contratti", "dati":jSon};
    inviaRichiestaCentralino(tipoSalva,parametri,elaboraRispostaSalva);
}

function elaboraRispostaSalva(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante il salvataggio del pagamento","fineSalva");
        return "";
    }

    esci();
}

function resetErrore(e){
    e.setAttribute("style","");
}

function changeSelectPaginaCorrente(s){
    switch (s.id){
        case "cmbApplicaA":
            visualizzaRiferimento(s.value);
        break;
        case "cmbClienti":
            avviaCarDati("cmbDestinazione",s.value);
        break;
    }
}

function ricercaCodiceDaBarcode(input){
    var codiceIngresso=input.value.trim();
    if(codiceIngresso==''){
        input.value='';
        return;
    }

    pulisciCampi();
    var data={};
    
    var parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"articoliContratti", "select":"listaArticoliContratti","codiceArticolo":codiceIngresso};

    inviaRichiestaCentralino("query",parametri,elaboraRicercaArticolo);
}

function elaboraRicercaArticolo(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            attivaAlert(2,"Codice Articolo non trovato","erroreCodiceArticolo");
            return "";
        }
    }

    document.getElementById('txtCodiceArticolo').value=data[0].id;
    valorizzaHTMLElemento("divDescrizioneArticoloR",data[0].descrizione);
}

function pulisciCampi(){
    document.getElementById('txtCodiceArticolo').value='';
    valorizzaHTMLElemento("divDescrizioneArticoloR","");
}

function cmbClientiSel() {
    var input = document.getElementById('cmbClienti');
    var idRagioneSociale = input.getAttribute("idragionesociale");
    if(idRagioneSociale==''){
        return;
    }
    
    // var parametri = {
    //     tipoRisposta: "select",
    //     tipoQuery: "querySpecifica",
    //     nomeTabella: "destinazioniCliente",
    //     select: 'destinazioniCliente',
    //     idClienteDest: idRagioneSociale
    // };
    // inviaRichiestaCentralino("query", parametri, function (dati) {

    //     document.getElementById('destinazioniCliente').innerHTML = ''
    //     var risp = JSON.parse(dati);

    //     if (risp.risposta[0] != 0) {
    //         show('divDestinazioniCliente');
    //         var list = '<option></option>';
    //         for (var d of risp.risposta) {
    //             if (d.ID != 0 && d.ID != '0') {
    //                 list += `<option value="${d.ID}" class="separatoreLi"><div>${d.RAGIONE_SOCIALE} - </div><div style="font-size:8px">${d.INDIRIZZO}</div></option>`
    //             }
    //         }
    //         document.getElementById('destinazioniCliente').innerHTML = list;


    //     }
    //     if (risp.risposta[0].PAGAMENTO != undefined) {
    //         document.getElementById('listaPagamenti').value = risp.risposta[0].PAGAMENTO;
    //     }
    //     if (risp.risposta[0].AGENTE != undefined) {
    //         document.getElementById('cmbAgente').value = risp.risposta[0].AGENTE;
    //     }
    // })
}