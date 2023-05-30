query['produzione.html']=new Array;
// query['estrattoConto.html']['OFFSET']=0;
// query['estrattoConto.html']['FETCH']=100;
// query['estrattoConto.html']['MAXFETCH']=0;
// query['estrattoConto.html']['modelloRiga']='';

query['produzione.html']['oggetti']=new Array;
query['produzione.html']['ricercaCodice']='ricercaCodiceDaBarcode(this)';
query['produzione.html']['oggetti']['{DESCRIZIONE}']="DESCRIZIONE";
query['produzione.html']['oggetti']['{CODICE}']="CODICE";

query['produzione.html:FORMDATI']=new Array;
query['produzione.html:FORMDATI']['oggetti']=new Array;
query['produzione.html:FORMDATI']['oggetti']['codiceArticolo']='CODICE';
query['produzione.html:FORMDATI']['oggetti']['txtLotto']='lotto';
query['produzione.html:FORMDATI']['oggetti']['txtDataScadenza']='scadenza';
query['produzione.html:FORMDATI']['oggetti']['txtQuantità']='qu';
query['produzione.html:FORMDATI']['oggetti']['descrizione']='DESCRIZIONE';
// query['produzione.html']['oggetti']['{RESIDUO}']={"campo":"RESTO","deciamaliMax":2,"decimaliMin":2};

var parametriNC={"nascosti":"", "conti":"", "visSpese":0, "maxAbbuono":0, "modificheGuajana":0};
var distintaBaseArticolo='';
var datiArticolo='';
var tabelle={};
var idDocumento;
var av='A';
var genere;
window.addEventListener("load", function(event) {
    setTimeout( function() {
       
        
        recuperaParametri();
        
        
    }, 50);
});

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 

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
    avviaCarDati('documentiAcquisti');
    avviaCarDati('elencoUtentiAp');
    avviaCarDati('documentiVendita');
}

function avviaCarDati(selectID){
    var parametri;

    switch (selectID){
        case "cmbConto":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"contiIncPag", "select":selectID, "soloConti":parametriNC.conti};
        break;
        case "documentiAcquisti":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiAcquisti", "select": selectID };
            break;
        case "elencoUtentiAp":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "elencoUtentiAp", "select": selectID };
            break;
        case "documentiVendita":
            parametri = { "tipoRisposta": "object", "tipoQuery": "querySpecifica", "nomeTabella": "documentiVendita", "select": selectID };
            break;
        case "lottiArticolo":
            var parametri = { "tipoRisposta": "json", "tipoQuery": "querySpecifica", "nomeTabella": "lottoArticolo", "codiceArticolo": datiArticolo['CODICE'], "deposito": parametriNC['deposito']
            }
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
            if (risposte==3){
                impostaVariabili()
                caricamentoForm(1);
                var dataOggi=localStorage.getItem('dataLogin');
                if(dataOggi==null || dataOggi==undefined){
                    var dataOggi=oggiISO()
                }
                document.getElementById('txtDataDocumento').value=dataOggi;
            }
            if(parametri.nomeTabella=='lottoArticolo'){
                localStorage.setItem('tmpListaLotti.json', JSON.stringify(''));
            }
            return "";
        }
    }
    
    
    data=verificaMd5(parametri.select,parametri,risp,data);

    if (parametri.tipoRisposta == 'object') {
        for (var x in data) {
            if (tabelle[parametri.nomeTabella] == undefined) {
                tabelle[parametri.nomeTabella] = {}
            }
            tabelle[parametri.nomeTabella][data[x].id] = data[x]
        }
    }else if(parametri.tipoRisposta=='json'){
        localStorage.setItem('tmpListaLotti.json', JSON.stringify(data));
    }
    
    if (risposte==3 ){
        impostaVariabili()
        caricamentoForm(1);
        var dataOggi=localStorage.getItem('dataLogin');
                if(dataOggi==null || dataOggi==undefined){
                    var dataOggi=oggiISO()
                }
        document.getElementById('txtDataDocumento').value=dataOggi;
    }
}

function esci(){
    if (xTarget == "_blank") {
        window.close();
    } else {
        open("mainPage.html", xTarget);
    }
}

function impostaVariabili(){
    
    if(location.search.indexOf('scarichi')!=-1){
        av='V';
        idDocumento=parametriNC.idTipoScarichi
        var btn=document.getElementById('cmdProduzione');
        btn.title='Salva';
        document.getElementById('txtcmdProduzione').innerText='Salva';
        document.getElementById('lblIntestazione').innerText='Scarichi di magazzino';
        document.getElementById('titolo').innerText='Scarichi di magazzino'
        if(idDocumento==undefined){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione, tipo scarico non parametrizzato');
        }
        document.getElementById('cmdPdf').classList.add('hide');
        var btn=document.querySelectorAll('.btnProduzione');
        for(var x=0;x<btn.length;x++){
            btn[x].classList.remove('w33');
            btn[x].classList.add('w50');
        }
        document.getElementById('labelTxtDataDocumento').innerText='Data Documento';
        document.getElementById('txtDataDocumento').disabled=true;
    }else{
        av='A';
        idDocumento=parametriNC.idTipoProduzione
        if(idDocumento==undefined){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione, tipo produzione non parametrizzato');
        }   
    }
    setTimeout((res)=>{
        if(parametriNC.valoreQuantitàPredefinito!=undefined){
            valorizzaValueElemento('txtQuantità',parametriNC.valoreQuantitàPredefinito)
        }
        
    },100)
    
    
    
}
function resetErrore(e){
    e.setAttribute("style","");
}
function selezionaDaMenuScomparsa(e) {
    document.getElementById('codiceArticolo').value = e.getAttribute('codice');
    ricercaCodiceDaBarcode(document.getElementById('codiceArticolo'));
}
function stampaProduzione(){
    query['modalStampa']=new Array;
    query['modalStampa']['modalC-body']=`
    <div>
        <div class="w100 h60p marg10Top ">
            <div class="w100 centraVerticalmente">
                <div id="divTipoStampa" name="divTipoStampa" class="w100 has-float-label">
                    <span class="selectDefault" id="0">Tipo Stampa</span>
                    <label for="slcTipoStampa">Tipo Stampa</label>
                    <select id="slcTipoStampa" name="slcTipoStampa" class="selectBox" onchange="opzioniStampa(this)">
                        <option value="0">Stampa Foglio Produzione</option>
                        <option value="1">Stampa Riepilogo Produzione</option>
                    </select>
                </div>
            </div>
            <div class="w100 centraVerticalmente">
                <div id="divNumeroPagine" name="divNumeroPagine" class="w100 has-float-label">
                            <input id="txtNumeroPagine" name="txtNumeroPagine" type="text" onfocusout="controlloQuantità(this)" value="1">
                            <span class="deleteicon" onclick="document.getElementById('txtNumeroPagine').value=''"></span>
                            <label for="txtNumeroPagine">Quantità pagine</label>
                </div>
            </div>
        </div>
    </div>`;
    apriModalCustom('modalStampa','','Tipo stampa','stampaFoglioProduzione()');
}
function stampaFoglioProduzione(){
    var tipoStampa=document.getElementById('slcTipoStampa').value;
    var parametri = {
        "tipoRisposta": "select",
        "tipoQuery": "produzioneArticolo",
    };
    if(tipoStampa==0){
        var codice=document.getElementById('codiceArticolo').value;
        var lotto=document.getElementById('txtLotto').value;
        var scadenza=convertiDataEngIta(document.getElementById('txtDataScadenza').value);
        if(codice=='' || lotto=='' || document.getElementById('txtDataScadenza').value==''){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Valori non validi!');
            return;
        }
        parametri.lotto=lotto;
        parametri.codice=codice;
        parametri.scadenza=scadenza;
        parametri.qta=document.getElementById('txtQuantità').value;
        parametri.nomeTabella="ricercaCodice";
        parametri.numeroPagine=document.getElementById('txtNumeroPagine').value;
        if(parametri.numeroPagine=='' || parametri.numeroPagine==isNaN){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'ATTENZIONE Numero pagine non impostato correttamente')    
            return;
        }
        if(parametri.lotto=='' || parametri.qta=='' || parametri.codice==''){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'ATTENZIONE VALORIZZARE I CAMPI PER ESEGUIRE LA STAMPA')
            return
        }     
        var obj={
            'filtri':parametri
        }
    }else if(tipoStampa==1){
        parametri.nomeTabella="riepilogoProduzione";
        parametri.idTipo=parametriNC.idTipoProduzione;
        parametri.eMailDestinatarioProduzione=parametriNC.eMailDestinatarioProduzione;
        parametri.data=convertiDataEngIta(recuperaValueElemento('txtDataDocumento'));
        if(recuperaValueElemento('txtDataDocumento')=='' ){
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'ATTENZIONE DATA PRODUZIONE NON IMPOSTATA CORRETTAMENTE!')    
            return;
        }
        var obj={
            'filtri':parametri,
            "tipoReport":"riepilogoProduzione"
        }
    }
    
    stampaReport(obj)
    chiudiModalCustom();
}

function pulisciCampi(){
    document.getElementById('codiceArticolo').value='';
    document.getElementById('txtLotto').value='';
    if(parametriNC.valoreQuantitàPredefinito!=undefined){
        valorizzaValueElemento('txtQuantità',parametriNC.valoreQuantitàPredefinito)
    }else{
        document.getElementById('txtQuantità').value='';
    }
    
    document.getElementById('txtDataScadenza').value='';
    document.getElementById('descrizione').innerHTML='';
    // document.getElementById('codiceArticolo').focus();
    document.getElementById('txtLotto').disabled=false;
    document.getElementById('txtDataScadenza').disabled=false;
    // comboScomparsaChiudi(document.getElementById('codiceArticolo'))
}
function ricercaCodiceDaBarcode(input){
    
    var codiceIngresso=input.value.trim();
    if(codiceIngresso==''){
        input.value='';
        return;
    }
    distintaBaseArticolo='';
    datiArticolo='';
    var tipoRisposta="select";
    pulisciCampi();
    var data={};
    
    
    if(input.id=='codiceArticolo'){
        campoRicerca='codice';
        nomeTabella='ricercaCodice';
        if((codiceIngresso.length>20 && codiceIngresso.substring(0,2)=='00') || codiceIngresso.indexOf('UDC')!=-1){
            campoRicerca='udc';
            nomeTabella='ricercaUDC';
            var valoreRicerca=codiceIngresso;
            var tipoRisposta='ricercaUDC';
        }else if (codiceIngresso.length >= 20 && codiceIngresso.substring(0,3)=='020') {
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione , il barcode selezionato è errato!')
            return;
        }
        else{
            var valoreRicerca=codiceIngresso;
            
        }
    }else if(input.id=='txtLotto'){
        campoRicerca='lotto';
        nomeTabella='ricercaLotto';
        valoreRicerca=codiceIngresso
        tipoRisposta="ricercaLotto";
    }
    // if(parametriNC.lottoFerraraQuarzi==1 && codiceIngresso.indexOf('10')!=-1){
    //     var pos=codiceIngresso.indexOf('10');
    //     valoreRicerca=codiceIngresso.substring(pos,codiceIngresso.length);
    // }
            var parametri = {
                "tipoRisposta": tipoRisposta,
                "tipoQuery": "produzioneArticolo",
                [campoRicerca]: valoreRicerca,
                "nomeTabella": nomeTabella,
            };
            inviaRichiestaCentralino("multiQuery",parametri,(res)=>{
                
                var res=JSON.parse(res);
                var risp=res.risposta;
                var parametri=res.parametri
                if(Array.isArray(risp)==true && risp[0]!=0){
                    query['modalPresenzaLottiMultipli']=new Array;
                    query['modalPresenzaLottiMultipli']['oggetti']=new Array;
                    query['modalPresenzaLottiMultipli']['oggetti']['{CODICE}']='Codice';
                    query['modalPresenzaLottiMultipli']['oggetti']['{DESCRIZIONE}']='DESCRIZIONE';
                    query['modalPresenzaLottiMultipli']['oggetti']['{SCADENZA}']='scadenzaIta';
                    query['modalPresenzaLottiMultipli']['oggetti']['{LOTTO}']='lotto';
                    query['modalPresenzaLottiMultipli']['oggetti']['{SCADENZAHTML}']='scadenza';
                    query['modalPresenzaLottiMultipli']['modelloRiga']=`
                    <div class="w100 h50p clrSfumatoScuro marg2Top" onclick="riportaDatiArticolo('{CODICE}','{LOTTO}','{SCADENZAHTML}')">
                        <div class="w98 padSx5 normale testo14">
                            <div class="w50 row">
                            {CODICE}
                            </div>
                            <div class="w50 row">
                            {SCADENZA}
                            </div>
                        </div>
                        <div class="w98 padSx5 normale testo16">{DESCRIZIONE}</div>
                    </div>
                    `;
                    query['modalPresenzaLottiMultipli']['modalC-body']=`
                    <div>
                        <div class="w100 h80p clrScuro normale testo20 cx ">Attenzione presenza articoli multipli con lo stesso lotto :${risp[0].lotto}<br>Selezionare l'articolo corrispondente</div>
                        <div id="elencoArticoliMultipli">

                        </div>
                    </div>
                    `
                    apriModalCustom('modalPresenzaLottiMultipli','','Articoli Multipli','','',true);
                    popolaElencoDaJson(risp,'elencoArticoliMultipli',0,'modalPresenzaLottiMultipli',false,0,false);
                    
                    return;
                }
                datiArticolo=risp;
                if(risp[0]!=0){
                    if(parametri.tipoRisposta=='codiceConLotto'){
                        risp["lotto"]=data['lotto'];
                        risp["qu"]=data['qu'];
                        risp["scadenza"]=data['scadenza'];
                    }else if(parametri.tipoRisposta=='ricercaLotto'){
                        
                    }else if(parametri.tipoRisposta=='ricercaUDC'){
                        if(risp['CREATO']==1){
                            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione UDC già confermato!');
                            return;
                        }

                    }else{
                        if(datiArticolo.GESTIONE_LOTTI==1){
                            if(av=='A'){
                                document.getElementById('txtLotto').disabled=false;
                                document.getElementById('txtDataScadenza').disabled=false;
                                //in caso di ricerca codice secco o barcode senza lotto, genero automaticamente lotto e scadenza solo se è vuoto il campo
                                var x=document.getElementById('txtLotto').value;
                                if(x==''){
                                    var today = new Date();
                                    var dd = String(today.getDate()).padStart(2, '0');
                                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                    var yyyy = today.getFullYear()+2;
                                    if(risp['lotto']==undefined || risp['lotto']==''){
                                        
                                        if(parametriNC.modificheFerrara!=1){
                                            risp["lotto"]='LA'+dd+'/'+mm+'/'+(yyyy.toString()).substring(2,4);
                                        }
                                    }
                                    
                                    if(risp['scadenza']==undefined || risp['scadenza']==''){
                                        
                                        dataScadenza = yyyy + '-' + mm + '-' + dd;
                                        risp["scadenza"]=dataScadenza;
                                    }
                                }else{
                                    risp["lotto"]=x
                                    risp["scadenza"]=document.getElementById('txtDataScadenza').value;
                                }
                            }
                            avviaCarDati('lottiArticolo');
                            
                        }else{
                            document.getElementById('txtLotto').disabled=true;
                            document.getElementById('txtDataScadenza').disabled=true;
                        }
                        
                    }
                    if(risp['PRODFINITO']==1){
                        distintaBaseArticolo=JSON.parse(risp['jsonDistintaBase']);
                    }
                    
                    document.getElementById('txtQuantità').focus();
                    popolaFormDatiObj(risp,query['produzione.html:FORMDATI']['oggetti']);
                    if(parametriNC.valoreQuantitàPredefinito!=undefined){
                        valorizzaValueElemento('txtQuantità',parametriNC.valoreQuantitàPredefinito)
                    }
            }else{
                attivaAlert(xTipoAllert.ESCLAMAZIONE,'Codice articolo non trovato!','','','',"focusProduzione");
            }
            })
}
function focusProduzione(){
    document.getElementById('codiceArticolo').focus()
}

function produci(username=''){
    documento={};
    var usernameAutorizzazione='';
    if(username!=''){
        if(tabelle.elencoUtentiAp[username]!=undefined){
            usernameAutorizzazione=username
        }else{
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Utente non valido!');
            return;
        }
    }
    // var idTipo=parametriNC.idTipoProduzione;
    var idTipo=idDocumento;
    if(av=='V'){
        var genere=tabelle['documentiVendita'][idTipo].genere;
        var identificativo='scarico';
    }else{
        var genere=tabelle["documentiAcquisti"][idTipo].genere;
        var identificativo='produzione';
    }
    
    //AGGIUNGERE TESTATA E IDAZIENDA FILTRO
    creaDocumento('produzione');
    var quProdotta=recuperaValueElemento('txtQuantità');
    var qu=recuperaValueElemento('txtQuantità');
    var lotto=recuperaValueElemento('txtLotto');
    var scadenza=recuperaValueElemento('txtDataScadenza');
    var codiceArticolo=recuperaValueElemento('codiceArticolo');
    if(quProdotta=='' || qu=='' || codiceArticolo==''){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione campo mancante');
        return;
    }
    if(datiArticolo.GESTIONE_LOTTI==1 && lotto==''){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione il lotto è obblicatorio per l\'articolo selezionato');
        return;
    }
    if(datiArticolo.CODICE=='' || datiArticolo.DESCRIZIONE==''){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione, errore nella ricerca e selezione dell\'articolo, verificare la connessione internet e riselezionare l\'articolo!');
        return;
    }
    if(parametriNC['autorizzazioneUtente']!=undefined && parametriNC['autorizzazioneUtente']==1 && usernameAutorizzazione=='' && av=='V'){
        query['modalAutorizzazione']=new Array;
        var listUser='';
        for(var [k,v] of Object.entries(tabelle.elencoUtentiAp)){
            listUser+='<option value="'+k+'">'+k+'</option>'
        }
        query['modalAutorizzazione']['modalC-body']=`
        <div class="h60p w100 centraVerticalmente">
                <div id="divnomeUtenteProduzione" name="divnomeUtenteProduzione" class="row has-float-label w90 marg10Top">
                    <select id="nomeUtenteProduzione" >
                    <option></option>
                    ${listUser}
                    </select>
                    <label id="lblnomeUtenteProduzione" for="nomeUtenteProduzione">Inserisci autorizzazione..</label>
                </div>
        </div>`
        apriModalCustom('modalAutorizzazione','','Autorizzazione','produci(recuperaValueElemento(\'nomeUtenteProduzione\') );chiudiModalCustom();');
        return 
    }
    if(distintaBaseArticolo!=''){
        for (var x of distintaBaseArticolo){
            if(x.codice=='' || x.descrizione==''){
                attivaAlert(xTipoAllert.ESCLAMAZIONE,'Distinta base con errori, riprovare il caricamento del codice');
                return;
            }
            var obj={
                'codice':x.codice,
                'descrizione':x.descrizione,
                'qu':((x.qu)*quProdotta)*-1,
                'percIva':x.piva,
                'importo':"0",
                'idIva':x.idIva,
                'um':x.ums,
                'lunghezza':-1,
                "gestioneLotti":x.gestione_lotti==1 ? true:false
            }

            aggiungiMovimento(obj,'','produzione');
            //aggiungo movimenti di scarico prodotti distinta base
        }
    }
    var obj={
        'codice':datiArticolo.CODICE,
        'descrizione':datiArticolo.DESCRIZIONE,
        'qu':quProdotta,
        'percIva':datiArticolo.PIVA,
        'idIva':datiArticolo.ID_IVA,
        'um':datiArticolo.UM,
        'lunghezza':1,
        'descrizioneAggiuntiva':usernameAutorizzazione,
        "gestioneLotti":datiArticolo.GESTIONE_LOTTI==1 ? true:false,
        "listino":datiArticolo.COSTO,
        "importo":calcolaImporto(datiArticolo.COSTO,quProdotta,'0','0','0','0','0')
    }
    var nrRiga=aggiungiMovimento(obj,'','produzione');
    

    if(datiArticolo.GESTIONE_LOTTI==1){
        var movLotto={
            'quantità':qu,
            'lotto':lotto,
            'scadenza':scadenza
        }
        
        aggiungiMovimentiLotti(movLotto,nrRiga,'produzione');//aggiungo movimento di carico
        
    }
    var data=recuperaValueElemento('txtDataDocumento');
    if(data=='' || isDate(data)==false){
        if(av=='A'){
            var testo='Attenzione data produzione non impostata!';
        }else{
            var testo='Attenzione data documento non impostata!';
        }
        attivaAlert(xTipoAllert.ESCLAMAZIONE,testo)
        return
    }
    var objTest={
        "genere":genere,
        'idTipo':idTipo,
        'AV':av,
        'idAzienda':datiArticolo.IDAZIENDA,
        'data':recuperaValueElemento('txtDataDocumento')
    }
    aggiungiTestata(objTest,'produzione');//AGGIUNGOTESTATA

    var parametri = {
        "tipoSalva": "produzione",
        "dati":documento['produzione']
    };
    if(parametriNC['documentoProduzioneGiornaliero']==1){
        parametri.documentoProduzioneGiornaliero=1
    }
    if(av=='V'){
        var testo='Scarico avvenuto correttamente!'
    }else{
        var testo='Produzione avvenuta con successo!'
    }
    // console.log(documento['produzione'])
    inviaRichiestaCentralino("salva",parametri,(res)=>{
        var res=JSON.parse(res);
        var error=res.error;
        if(error==''){
            if(datiArticolo.UDC!=undefined && datiArticolo.UDC!=''){
                var parametri = {
                    "tipoSalva": "udcLotto",
                    "dati":datiArticolo.UDC
                };
                // console.log(documento['produzione'])
                inviaRichiestaCentralino("update",parametri,(res)=>{
                    var res=JSON.parse(res);
                    var error=res.error;
                    if(error==''){
                    
                        attivaAlert(xTipoAllert.SUCCESSO,testo);
                        pulisciCampi();
                    }
                })
            }else{
                attivaAlert(xTipoAllert.SUCCESSO,testo);
                pulisciCampi();
            }
            
        }
        
    })
}
function ricercaLotto(input,event){
    if(document.getElementById('codiceArticolo').value!=''){
        
        attivaRicercaComboScomparsa(input,'listaLottiArticoloVeBa','ullistaLottiArticoloVeBa','tmpListaLotti.json')
    }else{
        if(event=='onblur'){
            ricercaCodiceDaBarcode(input);
            comboScomparsaChiudi(input)
        }
    }
}
function cmbLottoArticolo(e) {
    var inp = document.getElementById('txtLotto');
    inp.value = e.getAttribute('lotto');
    var iscadenza = document.getElementById('txtDataScadenza');
    iscadenza.value = e.getAttribute('scadenza');
    document.getElementById('txtQuantità').focus();
    comboScomparsaChiudi(inp)
}

function provaStampa(){
    var str="1330546,1330292,1330291";
    stampa(str,'V');
}
function controlloQuantità(input){
    if(input.value!=''){
        
        if(isNaN(input.value)){
            input.value='';
            attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione campo quantità non valido!');
            input.focus()
        }
    }
    if(input.value>1000){
        input.value=1;
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'Attenzione campo quantità non valido!');
        input.focus()
        
    }
}
function opzioniStampa(input){
    if(input.value==0){
        show('divNumeroPagine');
    }else{
        hide('divNumeroPagine')
    }
}
function riportaDatiArticolo(codice,lotto,scadenza){
    document.getElementById('codiceArticolo').value=codice;
    ricercaCodiceDaBarcode(document.getElementById('codiceArticolo'));
    document.getElementById('txtLotto').value=lotto;
    document.getElementById('txtDataScadenza').value=scadenza
    chiudiModalCustom()

}