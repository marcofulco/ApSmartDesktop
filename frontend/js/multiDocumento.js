var prodotti;
var totali;
var documento= {};
var numeroDocumento;
var identificativoDoc;
var listaDocumenti = new Array();

function creaDocumento(identificativo=generaUUID()){
    try {
        identificativoDoc=identificativo;
        documento[identificativoDoc] = {};
        documento[identificativoDoc].identificativo = identificativo;
        documento[identificativoDoc].prodotti = { index: {}, data: [] };
        documento[identificativoDoc].allegati = {};
        documento[identificativoDoc].totali = {
            totale: 0, tCosto: 0, tCostoEvadibile: 0, tQu: 0, tQuEvadibile: 0, tRighe: 0, tRigheEvadibili: 0, totEvadibile: 0, tIva: 0, tDoc: 0,
            tIvaEvadibile: 0, tDocEvadibile: 0, totaleMerce: 0, nettoMerce: 0, scCassa: 0, trasporto: 0, spese: 0, castellettoIva: [], tColli:0,tPeso:0
        };
        documentoLocal();
        
        } catch (e) {
            console.error(e);
            attivaAlert(2, e, 'inizializzazione var documento');
            throw e;
        }
}
function documentoLocal(){
    localStorage.setItem('MultiDocumento', JSON.stringify(documento));
}
function salvaListaDocumenti(identificativo) {
    var listaDocumenti=localStorage.getItem('listaDocumenti')!=undefined ? JSON.parse(localStorage.getItem('listaDocumenti')):'';
    listaDocumenti.push(identificativo)
    localStorage.setItem('listaDocumenti', JSON.stringify(listaDocumenti));
}
function caricaDocumento(){
    var JsonDocumenti=localStorage.getItem('MultiDocumento');
    if(JsonDocumenti!=undefined && JsonDocumenti!=''){
        documento=JSON.parse(JsonDocumenti);
    }
}
function aggiornaTotale(totali, prodotti, molt = 1, trasporto = null, spese = null, scCassa = null, importoIvaInc = false) {
    
    var castelletto = totali.castellettoIva;

    var imponibileOmaggio=0;
    var ivaOmaggio=0;
    var totOmaggio=0;

    var x = -1;

    if (prodotti != null) {
        for (i in castelletto) {
            if (Number(prodotti.idIva) === Number(castelletto[i].idIva)) {
                x = i;
                break;
            }
        }

        prodotti.importo = arrotonda(prodotti.importo, 2);

        var importo = prodotti.importo;
        var iva = 0;

        if (scCassa != null) {
            importo -= arrotonda(importo * totali.scCassa / 100, 2);
        }

        if (importoIvaInc == true) {
            importo = arrotonda(importo / (1 + (prodotti.percIva / 100)), 2);
            iva = arrotonda(prodotti.importo - importo, 2);
        } else {
            iva = arrotonda(importo * prodotti.percIva / 100, 2);
        }

        if (prodotti.idTaglia!=null){
            switch (prodotti.idTaglia){
                case 1:
                    imponibileOmaggio+=importo;
                    break;
                case 2:
                    imponibileOmaggio+=importo;
                    ivaOmaggio+=iva;
                    break;
            }

            totOmaggio+=imponibileOmaggio+ivaOmaggio;
        }

        if (x != -1) {
            castelletto[x].totImponibile += importo * molt;

            if (importoIvaInc == true) {
                
                castelletto[x].totIva += iva * molt;
            } else {
                castelletto[x].totIva = arrotonda(castelletto[x].totImponibile * prodotti.percIva / 100, 2);
            }

            if (castelletto[x].totImponibile == 0) {
                castelletto.splice(x, 1);
            }
        } else {
            castelletto.push({
                idIva: prodotti.idIva, percIva: prodotti.percIva, totImponibile: importo * molt,
                totIva: iva * molt
            });
        }

        // console.log(importo);
        // totali.totale +=arrotonda(importo * molt,2);
        // console.log(totali.totale);

        totali.tIva = 0;
        totali.totale = 0;

        for (i in castelletto) {
            totali.tIva += castelletto[i].totIva;
            totali.totale+=castelletto[i].totImponibile;
        }

        if (totali.imponibileOmaggio==null){
            totali.imponibileOmaggio=0;
        }

        if (totali.ivaOmaggio==null){
            totali.ivaOmaggio=0;
        }

        if (totali.tOmaggio==null){
            totali.tOmaggio=0;
        }
        
        totali.imponibileOmaggio+=imponibileOmaggio*molt;
        totali.ivaOmaggio+=ivaOmaggio*molt;
        totali.tOmaggio+=totOmaggio*molt;
        totali.totaleMerce += Number(importo) * molt;
        //totali.totale += importo * molt;
        
        totali.tDoc = arrotonda(Number(totali.totale) + Number(totali.tIva), 2);
        totali.tCosto += arrotonda(prodotti.qu * prodotti.costo, 2) * molt;
        totali.tQu += Number(prodotti.qu) * molt;
        totali.tRighe += 1 * molt;
        totali.tPagare=totali.tDoc-totali.tOmaggio;

        if (prodotti.disp >= prodotti.qu) {
            totali.tQuEvadibile += Number(prodotti.qu) * molt;
            totali.totEvadibile += Number(importo) * molt;
            totali.tRigheEvadibili += 1 * molt;
            totali.tCostoEvadibile += arrotonda(prodotti.qu * prodotti.costo, 2) * molt;
        } else {
            if (prodotti.disp > 0) {
                totali.tQuEvadibile += Number(prodotti.disp) * molt;
                totali.totEvadibile += arrotonda(prodotti.disp * prodotti.prezzo, 2) * molt;
                totali.tCostoEvadibile += arrotonda(prodotti.disp * prodotti.costo, 2) * molt;
                totali.tRigheEvadibili += arrotonda(prodotti.disp / prodotti.qu, 2) * molt;
            }
        }
    }

    totali.nettoMerce = totali.totaleMerce;

    if (scCassa != null) {
        totali.scCassa = scCassa;
    }

    if (totali.scCassa != undefined){
        if (totali.scCassa !=0) {
            totali.nettoMerce = arrotonda(totali.totaleMerce - (totali.totaleMerce * totali.scCassa / 100), 2);
        }    
    }
    
    if (trasporto != null) {
        trasporto = Number(trasporto);

        totali.trasporto = trasporto;

        x = -1;

        for (i in castelletto) {
            if (xParametriGenerali.idIvaPredefinita === castelletto[i].idIva) {
                x = i;
                break;
            }
        }

        if (x != -1) {
            castelletto[x].totImponibile += trasporto * molt;
            castelletto[x].totIva = arrotonda(castelletto[x].totImponibile * xParametriGenerali.percIvaPredefinita / 100, 2);

            if (castelletto[x].totImponibile == 0) {
                castelletto.splice(x, 1);
            }
        } else {
            castelletto.push({
                idIva: xParametriGenerali.idIvaPredefinita, percIva: xParametriGenerali.percIvaPredefinita, totImponibile: trasporto * molt,
                totIva: arrotonda(trasporto * molt * xParametriGenerali.percIvaPredefinita / 100, 2)
            });
        }

        totali.tIva = 0;
        totali.totale = 0;

        for (i in castelletto) {
            totali.tIva += castelletto[i].totIva;
            totali.totale+=castelletto[i].totImponibile;
        }

        totali.tDoc = arrotonda(totali.totale + totali.tIva, 2);
    }

    if (spese != null) {
        trasporto = Number(spese);

        totali.spese = trasporto;

        x = -1;

        for (i in castelletto) {
            if (xParametriGenerali.idIvaPredefinita === castelletto[i].idIva) {
                x = i;
                break;
            }
        }

        if (x != -1) {
            castelletto[x].totImponibile += trasporto * molt;
            castelletto[x].totIva = arrotonda(castelletto[x].totImponibile * xParametriGenerali.percIvaPredefinita / 100, 2);

            if (castelletto[x].totImponibile == 0) {
                castelletto.splice(x, 1);
            }
        } else {
            castelletto.push({
                idIva: xParametriGenerali.idIvaPredefinita, percIva: xParametriGenerali.percIvaPredefinita, totImponibile: trasporto * molt,
                totIva: arrotonda(trasporto * molt * xParametriGenerali.percIvaPredefinita / 100, 2)
            });
        }

        totali.tIva = 0;
        totali.totale = 0;

        for (i in castelletto) {
            totali.tIva += castelletto[i].totIva;
            totali.totale+=castelletto[i].totImponibile;
        }

        totali.tDoc = arrotonda(totali.totale + totali.tIva, 2);
    }

    totali.tCosto = arrotonda(Number(totali.tCosto), 2);
    totali.tCostoEvadibile = arrotonda(totali.tCostoEvadibile, 2);
    totali.totEvadibile = arrotonda(totali.totEvadibile, 2);

    documentoLocal();
}

function aggiungiMovimento(movIn, numeroRigaIns = '',identificativo) {
    
    try {
        // if(identificativo=='')
        // {
        //     identificativo=identificativoDoc
        // }
        var aggiungiMovimento;
        var movimento = {};
        if (numeroRigaIns == '') {
            var numeroRiga = documento[identificativo].prodotti.data.length;
            aggiungiMovimento = true;
        }else{
            numeroRiga=numeroRigaIns;
            aggiungiMovimento=false;
        }

        var campiObbligatori = ['descrizione',
            'idIva',
            'percIva',
            ];
        var campiNonObbligatori = {
            'codice': '',
            'prezzo': 0,
            'quOmaggio': 0,
            'quReso': 0,
            'ricarico': '',
            'sconti': '',
            'scontiListinoRif': 0,
            'srcDisp': 0,
            'srcRicarico': 0,
            'visQuOmaggio': 0,
            'qu': 1,
            'costo': 0,
            'indispensabile': false,
            'listino': 0,
            'notaPrelievo': '',
            'notaUfficio': '',
            'ordinato': 0,
            'prenotazione': 0,
            'quScala': 0,
            'movIvaInc': '',
            'prezzoIntero': '',
            'sc1': 0,
            'sc2': 0,
            'sc3': 0,
            'sc4': 0,
            'sc5': 0,
            'movLotti': [],
            'gestioneLotti': 0,
            'codiceFornitore': '',
            'idMovOrigReso': '',
            'riga': numeroRiga.toString(),
            'allegatiMovimento': '',
            'deposito': '',
            'imgSrc': '',
            'descrizioneAggiuntiva':'',
            'forzaChiusuraOrdine':0,
            'idDocImport':'0',
            'composto':'',
            'idMovOrig':'0',
            'um':'',
            'lunghezza':0,
            'pesoRiga':0,
            'colloRiga':0,
            'importo':0,
            'origine':'',
            'spuntati':'',
            'LFT':'',
            'tipoContabileArt':'',
            'segnoGiac':'',
            'costoMedioM':'',
            'descrizioneCompleta':'',
            'chiave':0,
            'datiPorteMVP':'',
            'coloreRiga':''

        }
        // console.log(identificativo)
        for (var x of campiObbligatori) {
            if (movIn[x] === undefined || movIn[x] === '') {
                throw "Mancanza oggetto obbligatorio su movimento :  " + [x]+"<div>"+JSON.stringify(movIn)+"</div>";
            } else {
                movimento[x] = movIn[x];
            }
        }
        if (numeroRigaIns == '') {
            // documento.prodotti.data[numeroRiga] = '';
            // aggiungiMovimento = true;
        }

        if (aggiungiMovimento == true) {
            for (var [k, v] of Object.entries(campiNonObbligatori)) {
                if (movIn[k] == undefined) {
                    movimento[k] = v;
                } else {
                    movimento[k] = movIn[k];
                }
            }
        } else {
            for (var [k, v] of Object.entries(movIn)) {
                documento[identificativo].prodotti.data[numeroRiga][k]=movIn[k];
            }
        }
        if (aggiungiMovimento == true) {
            documento[identificativo].prodotti.data.push(movimento);
        } 
        // documento[identificativoDoc].prodotti.data[numeroRiga].movLotti.splice(0,1);
        documentoLocal();
        return numeroRiga;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

function aggiungiMovimentiLotti(mov, rigaRif,identificativo) {
    if (identificativo == undefined) {
        throw "Indentificativo Mancante";
    }
    if (mov.lotto == undefined) {
        throw "Selezionare un lotto valido";
    }
    if (mov.quantità == undefined) {
        throw "Inserire una quantità valida";
    }
    if (rigaRif == undefined) {
        throw "Inserire un valore riga corretto";
    }
    
    var movLottoIn={
        'lotto': mov.lotto,
        'qu': mov.quantità,
        'scadenza': mov.scadenza
    }
    if (documento[identificativo].prodotti.data[rigaRif].movLotti.length==0) {
        documento[identificativo].prodotti.data[rigaRif].movLotti=[];
      }
    documento[identificativo].prodotti.data[rigaRif].movLotti.push(movLottoIn);

    var index=documento[identificativo].prodotti.data[rigaRif].movLotti.length-1;
    documento[identificativo].prodotti.data[rigaRif].movLotti[index].riga=index
    documentoLocal();
    return index;
}
function aggiungiTestata(testIn,identificativo='') {
    if(identificativo==''){
        identificativo=identificativoDoc;
    }
    try {
        if (documento[identificativo].testata == undefined) {
            documento[identificativo].testata = {};
        }

        var campiNonObbligatori = {
            'idTipo': 0,
            'idAgente': 0,
            'idCliente': 0,
            'idIva': 0,
            'idMandante': 0,
            'idPagamento': 0,
            'idVettore': '0',
            'mezzo': '0',
            'noteMagazzino': '',
            'noteUfficio': '',
            'noteVettore': '',
            'noteInterne': '',
            'data': oggiISO(),
            'deposito': 0,
            'contanti': 0,
            'assegni': 0,
            'pos': 0,
            'credito': 0,
            'protocollo': '',
            'idDest': 0,
            'responsabile': '',
            'ivaInc': '0',
            'AV': 'V',
            'statoDocumento': '0',
            'note':'',
            'idAzienda':'0',
            'idDocImport':new Array,
            'pIvaFornitoreArticolo':'',
            'idBanca':0,
            'ID_FATT':'',
            'dataSpedizione':'',
            'oraSpedizione':'',
            'aspetto':'',
            'causale':'',
            'numero':'',
            'serie':'',
            'dataCreazione':getDataOraMinutiSql(),
            'buono':0,
            'contantiCassa': 0,
            'identificativoVeBa':'',
            'idConto6':''
        };
        var campiObbligatori = ['genere'];
        for (var x of campiObbligatori) {
            if (testIn[x] == undefined || testIn[x] == '') {
                console.error( "Mancanza oggetto su testata:" + [x])
                break;
            } else {
                documento[identificativo].testata[x] = testIn[x];
            }
        }

        for (var [k, v] of Object.entries(campiNonObbligatori)) {
            if (testIn[k] == undefined) {
                documento[identificativo].testata[k] = v;
            } else {
                documento[identificativo].testata[k] = testIn[k];
            }

        }

    } catch (e) {
        console.error(e);
        return e;
    }
}

function salvaDocumentiSuServer(callBack,documentiImport='',divContenitore='',nascosto=false,callBackErrore='') {
    
    if(documentiImport!=''){
        var jSon=documentiImport
    }else{
        var jSon=documento
    }
    
    for(var [k,v] of Object.entries(jSon)){
        if(v.prodotti.data.length==0){
            if(nascosto==false){
                attivaAlert(0, "Nessuna Riga Documento Presente! - "+k, "salvaDocumentosuServer");
            }
            return false;
        }
    }
    var parametri = { 
        "tipoRisposta": "salva", 
        "tipoSalva": "multiDocumenti", 
        "dati": jSon
     };
     if(nascosto==false){
        inviaRichiestaCentralino("salva", parametri, callBack,divContenitore);
     }else{
        inviaRichiestaCentralinoNoBlocchi("salva", parametri, callBack,divContenitore,callBackErrore);
     }
    
}
function salvaDocumentoSuServer(callBack='',identificativo='') {
    if(identificativo==''){
        identificativo=identificativoDoc;
    }
    // var jSon=documento
       
        if(documento[identificativo].prodotti.data.length==0){
            attivaAlert(0, "Nessuna Riga Documento Presente! - "+k, "salvaDocumentosuServer");
            return;
        }
    

    var parametri = { 
        "tipoRisposta": "salva", 
        "tipoSalva": "documento", 
        "dati": documento[identificativo] };
        if(callBack==''){
            callBack=elaboraRispostaSalvaDocumento;
        }
    inviaRichiestaCentralino("salva", parametri, callBack);
}

function selezionaDocumento(identificativo) {
    identificativoDoc=identificativo;
}

function eliminaDocumento(numeroArray) {
    try {
        localStorage.removeItem(listaDocumenti[numeroArray]);
        localStorage.removeItem('listaDocumenti');
        listaDocumenti.splice(numeroArray, 1);
        listaDocumentiToStorage();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

function richiamaDocumento(obj, callback,cercaPrimaSuIndexDb=false) {
    if (obj.id == undefined) {
        obj.id = '';
    }

    if (obj.noteInterne == undefined) {
        obj.noteInterne = '';
    }

    if (obj.percorsoImmagini == undefined) {
        obj.percorsoImmagini = '';
    }

    if (obj.idCliente == undefined) {
        obj.idCliente = '';
    }

    if (obj.av == undefined) {
        obj.av = 'V';
    }
    if(obj.identificativoVeBa == undefined){
        obj.identificativoVeBa = '';
    }
    if(cercaPrimaSuIndexDb==true){
        leggiTabellaIndexedDBSemplice('documentiVeBa',obj.identificativoVeBa,(res)=>{
            
            if(res.risposta[0]==0){
                richiamaDocumento(obj,callback,false);
            }else{
                if(res.risposta!=''){
                    callback(res);
                }
            }
            
        })
        return;
    }
    var parametri = {
        "tipoRisposta": "documento",
        "tipoQuery": "preOrdini",
        "chiamante": "modificaOrdini",
        'percorsoImmagini': obj.percorsoImmagini,
        'noteInterne': obj.noteInterne,
        'id': obj.id,
        'idCliente': obj.idCliente,
        'av': obj.av,
        'identificativoVeBa':obj.identificativoVeBa
    };

    if(obj.importDocumento!=undefined && obj.importDocumento==true){
        parametri.importDocumento=true;
    }

    inviaRichiestaCentralino("multiQuery", parametri, function (datiJ) {
        var dati=JSON.parse(datiJ);
        if(dati.error!=''){
            attivaAlert(0, dati.error, "richiamaDocumento");
            return;
        }
        if(dati.risposta[0]==0){
            attivaAlert(0, "Documento non trovato!", "richiamaDocumento");
            return;
        }
        if (callback != '') {
            callback(dati);
        }
    })
}
function movimentiIvaInclusa(ivaInclusa,identificativo='') {
    if(identificativo==''){
        identificativo=identificativoDoc;
    }

    var tmpTotali = {
        totale: 0, tCosto: 0, tCostoEvadibile: 0, tQu: 0, tQuEvadibile: 0, tRighe: 0, tRigheEvadibili: 0, totEvadibile: 0, tIva: 0, tDoc: 0,
        tIvaEvadibile: 0, tDocEvadibile: 0, totaleMerce: 0, nettoMerce: 0, scCassa: 0, trasporto: 0, spese: 0, castellettoIva: [], tColli:0,tPeso:0
    }
    for(var [k,v] of Object.entries(tmpTotali)){
        documento[identificativo].totali[k]=v;
    }
    var doc = documento[identificativo].prodotti.data;
    if (ivaInclusa == true) {

        for (var m in doc) {
            if(isEmpty(doc[m])==true){
                continue;
            }
            if (doc[m].movIvaInc == false) {
                if (documento[identificativo].prodotti.data[m].prezzoIntero != '' && documento[identificativo].prodotti.data[m].prezzoIntero != undefined) {
                    var prezzoTmp = documento[identificativo].prodotti.data[m].prezzoIntero;
                } else {
                    var prezzoTmp = documento[identificativo].prodotti.data[m].listino
                }
                // aggiornaTotale(documento[identificativo].totali, documento[identificativo].prodotti.data[m], -1, null, null, null, documento[identificativo].prodotti.data[m].movIvaInc);
                documento[identificativo].prodotti.data[m].prezzoIntero = Number(prezzoTmp) * Number('1.' + documento[identificativo].prodotti.data[m].percIva)
                documento[identificativo].prodotti.data[m].listino = arrotonda(documento[identificativo].prodotti.data[m].prezzoIntero, 2);
                var sc = (documento[identificativo].prodotti.data[m].sconti).split("+");
                documento[identificativo].prodotti.data[m].importo = calcolaImporto(Number(documento[identificativo].prodotti.data[m].listino), documento[identificativo].prodotti.data[m].qu, sc[0], sc[1], sc[2], sc[3], sc[4]);
                documento[identificativo].prodotti.data[m].movIvaInc = true;
                
            }
            aggiornaTotale(documento[identificativo].totali, documento[identificativo].prodotti.data[m], 1, null, null, null, documento[identificativo].prodotti.data[m].movIvaInc);
        }


    } else if (ivaInclusa == false) {
        for (var m in doc) {
            
            if(isEmpty(doc[m])==true){
                continue;
            }
            if (doc[m].movIvaInc != '' && doc[m].movIvaInc == true) {
                if (documento[identificativo].prodotti.data[m].prezzoIntero != '' && documento[identificativo].prodotti.data[m].prezzoIntero != undefined) {
                    var prezzoTmp = documento[identificativo].prodotti.data[m].prezzoIntero;
                } else {
                    var prezzoTmp = documento[identificativo].prodotti.data[m].listino
                }
                // aggiornaTotale(documento[identificativo].totali, documento[identificativo].prodotti.data[m], -1, null, null, null, documento[identificativo].prodotti.data[m].movIvaInc);

                documento[identificativo].prodotti.data[m].prezzoIntero = Number(prezzoTmp) / Number('1.' + documento[identificativo].prodotti.data[m].percIva);
                documento[identificativo].prodotti.data[m].listino = arrotonda(documento[identificativo].prodotti.data[m].prezzoIntero, decimaliPrezzi);

                var sc = (documento[identificativo].prodotti.data[m].sconti).split("+");
                console.log(calcolaImporto(documento[identificativo].prodotti.data[m].prezzoIntero, documento[identificativo].prodotti.data[m].qu, sc[0], sc[1], sc[2], sc[3], sc[4]))
                documento[identificativo].prodotti.data[m].importo = calcolaImporto(documento[identificativo].prodotti.data[m].prezzoIntero, documento[identificativo].prodotti.data[m].qu, sc[0], sc[1], sc[2], sc[3], sc[4]);
                documento[identificativo].prodotti.data[m].movIvaInc = false;
                
            }
            aggiornaTotale(documento[identificativo].totali, documento[identificativo].prodotti.data[m], 1, null, null, null, documento[identificativo].prodotti.data[m].movIvaInc);
        }
    }
}
function calcolaImporto(prezzoUnitario, qta, sc1, sc2, sc3, sc4, sc5) {
    var importo = prezzoUnitario;

    if (sc1 == undefined) {
        sc1 = 0;
    }else if(sc1.indexOf(",")!=-1){
        sc1=sc1.replace(/,/,'.');
    }
    if (sc2 == undefined) {
        sc2 = 0;
    }else if(sc2.indexOf(",")!=-1){
        sc2=sc2.replace(/,/,'.');
    }
    if (sc3 == undefined) {
        sc3 = 0;
    }else if(sc3.indexOf(",")!=-1){
        sc3=sc3.replace(/,/,'.');
    }
    if (sc4 == undefined) {
        sc4 = 0;
    }else if(sc4.indexOf(",")!=-1){
        sc4=sc4.replace(/,/,'.');
    }
    if (sc5 == undefined) {
        sc5 = 0;
    }else if(sc5.indexOf(",")!=-1){
        sc5=sc5.replace(/,/,'.');
    }

    importo = arrotonda(importo - ((importo * sc1) / 100), 5);
    importo = arrotonda(importo - ((importo * sc2) / 100), 5);
    importo = arrotonda(importo - ((importo * sc3) / 100), 5);
    importo = arrotonda(importo - ((importo * sc4) / 100), 5);
    importo = arrotonda(importo - ((importo * sc5) / 100), 5);
    importo = arrotonda((importo * qta), 2);
    
    return importo
}
function calcolaTotSconti(prezzoUnitario, qta, sc1, sc2, sc3, sc4, sc5) {
    var importo = prezzoUnitario;
    var totSconto = 0
    importo = arrotonda(((importo * sc1) / 100), 5);
    totSconto += importo;

    importo = arrotonda(((importo * sc2) / 100), 5);
    totSconto += importo;

    importo = arrotonda(((importo * sc3) / 100), 5);
    totSconto += importo;

    importo = arrotonda(((importo * sc4) / 100), 5);
    totSconto += importo;

    importo = arrotonda(((importo * sc5) / 100), 5);
    totSconto += importo;

    totSconto = formattaNumeriInput((totSconto * qta), 2, 2);

    return totSconto;
}
function pulisciAllegatiTmpDocumento(identificativo=''){
    if(identificativo==''){
        return false
    }
    try{
        if(documento[identificativo]!=undefined){
            for(var i in documento[identificativo].prodotti.data){
                if(!isEmpty(documento[identificativo].prodotti.data[i])){
                    documento[identificativo].prodotti.data[i].allegatiMovimento=new Array();
                }
            }
        }
    }catch(e){
        console.error(e)
    }
    
}
function datiTipoDocumento(idTipo,av,callBack=''){
    if(idTipo=='' || av==''){
        attivaAlert(xTipoAllert.ESCLAMAZIONE,'non è stato indicato il tipo documento o av');
        return;
    }
        parametri = {
            tipoRisposta: "select",
            tipoQuery: "querySpecifica",
            nomeTabella: "datiTipoDocumento",
            idTipo: idTipo,
            av:av
        };
        inviaRichiestaCentralino("query", parametri, (res)=>{
            callBack(res);
        });
    }
    function ora(){
        var today = new Date();
        var ora=today.getHours().toString();
        if(ora<10){
            ora='0'+ora.toString();
        }
        var minuti=today.getMinutes().toString();
        if(minuti<10){
            minuti='0'+minuti.toString();
        }
        return ora+'.'+minuti;
        
    }
    function getDataOraMinutiSql() {
        let dataOggi = new Date();
        let anno = dataOggi.getFullYear();
        let mese = (dataOggi.getMonth() + 1).toString().padStart(2, '0');
        let giorno = dataOggi.getDate().toString().padStart(2, '0');
        let ore = dataOggi.getHours().toString().padStart(2, '0');
        let minuti = dataOggi.getMinutes().toString().padStart(2, '0');
        let secondi = dataOggi.getSeconds().toString().padStart(2, '0');

        let dataOraMinuti = `${anno}-${mese}-${giorno}T${ore}:${minuti}:${secondi}`;
        return dataOraMinuti;
      }
function generaUUID() {
    try{
        const array = new Uint8Array(8);
        crypto.getRandomValues(array);
        let hexID = Array.from(array, byte => byte.toString(16).padStart(2, "0")).join("");
        return hexID.toUpperCase();
    }catch(e){
        return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }
        

    }      
