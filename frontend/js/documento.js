var prodotti;
var totali;
var documento;
var numeroDocumento;
var identificativoDoc;
var listaDocumenti = new Array();

function inizializzaDocumento(aggiungiDoc = false, nonPulireDocumento = true, forzaIdentificativo = '') {
    try {
        //SE aggiungiDoc fissato a true, la funzione cerca il primo documento disponibile per essere riportato sulla lista in corso
        if (aggiungiDoc == false) {
            if (localStorage.getItem('listaDocumenti') != undefined && localStorage.getItem('listaDocumenti') != '') {
                listaDocumenti = JSON.parse(localStorage.getItem('listaDocumenti'));
            }

            for (var n in listaDocumenti) {
                var docJson = localStorage.getItem(listaDocumenti[n]);
                if (docJson != undefined) {
                    documento = JSON.parse(docJson);
                    identificativoDoc = documento.identificativo;
                    break;
                }
            }
        } else {
            documento = null;
        }
        // numeroDocumento=nd;

        if (documento == null) {
            if (nonPulireDocumento) {
                identificativoDoc = generaUidDoc();
            }
            if (forzaIdentificativo != '') {
                identificativoDoc = forzaIdentificativo;
            }
            documento = {};
            documento.identificativo = identificativoDoc;
            documento.prodotti = { index: {}, data: [] };
            documento.allegati = {};
            documento.totali = {
                totale: 0, tCosto: 0, tCostoEvadibile: 0, tQu: 0, tQuEvadibile: 0, tRighe: 0, tRigheEvadibili: 0, totEvadibile: 0, tIva: 0, tDoc: 0,
                tIvaEvadibile: 0, tDocEvadibile: 0, totaleMerce: 0, nettoMerce: 0, scCassa: 0, trasporto: 0, spese: 0, castellettoIva: []
            };

            documentoToStorage();
            if (listaDocumenti.indexOf('Documento-' + identificativoDoc) == -1 && forzaIdentificativo == '') {
                listaDocumenti.push('Documento-' + identificativoDoc);
            }

            listaDocumentiToStorage();
        }
    } catch (e) {
        console.log(e);
        attivaAlert(2, e, 'inizializzazione var documento');
        return e;
    }
}
function creaDocumento(identificativo=Date.now()){
    try {
        identificativoDoc=identificativo;
        documento = {};
        documento.identificativo = identificativo;
        documento.prodotti = { index: {}, data: [] };
        documento.allegati = {};
        documento.totali = {
            totale: 0, tCosto: 0, tCostoEvadibile: 0, tQu: 0, tQuEvadibile: 0, tRighe: 0, tRigheEvadibili: 0, totEvadibile: 0, tIva: 0, tDoc: 0,
            tIvaEvadibile: 0, tDocEvadibile: 0, totaleMerce: 0, nettoMerce: 0, scCassa: 0, trasporto: 0, spese: 0, castellettoIva: []
        };
        documentoLocal();
        } catch (e) {
            console.error(e);
            attivaAlert(2, e, 'inizializzazione var documento');
            throw e;
        }
}
function documentoToStorage() {
    localStorage.setItem('Documento-' + identificativoDoc, JSON.stringify(documento));
    
}
function documentoLocal(){
    localStorage.setItem('Documento-' + identificativoDoc, JSON.stringify(documento));
    var listaDocumenti=localStorage.getItem('listaDocumenti');
    if(listaDocumenti!=undefined){
        var listaDocumenti=JSON.parse(listaDocumenti);
    }else{
        var listaDocumenti=new Array;
    }
    listaDocumenti.push('Documento-' + identificativoDoc);
    localStorage.setItem('listaDocumenti',JSON.stringify(listaDocumenti));
}
function listaDocumentiToStorage() {
    localStorage.setItem('listaDocumenti', JSON.stringify(listaDocumenti));
}

function aggiornaTotale(totali, prodotti, molt = 1, trasporto = null, spese = null, scCassa = null, importoIvaInc = false) {
    //console.error(importoIvaInc);

    var castelletto = totali.castellettoIva;

    var imponibileOmaggio=0;
    var ivaOmaggio=0;
    var totOmaggio=0;

    var x = -1;

    if (prodotti != null) {
        for (i in castelletto) {
            if (prodotti.idIva === castelletto[i].idIva) {
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

        totali.tIva = 0;

        for (i in castelletto) {
            totali.tIva += castelletto[i].totIva;
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
        totali.totale += importo * molt;
        totali.tDoc = arrotonda(totali.totale + totali.tIva, 2);
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

    if (totali.scCassa != undefined) {
        totali.nettoMerce = arrotonda(totali.totaleMerce - (totali.totaleMerce * totali.scCassa / 100), 2);
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

        for (i in castelletto) {
            totali.tIva += castelletto[i].totIva;
        }

        totali.totale += trasporto * molt;
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

        for (i in castelletto) {
            totali.tIva += castelletto[i].totIva;
        }

        totali.totale += trasporto * molt;
        totali.tDoc = arrotonda(totali.totale + totali.tIva, 2);
    }

    totali.totale = arrotonda(totali.totale, 2);
    totali.tCosto = arrotonda(totali.tCosto, 2);
    totali.tCostoEvadibile = arrotonda(totali.tCostoEvadibile, 2);
    totali.totEvadibile = arrotonda(totali.totEvadibile, 2);

    documentoToStorage();
}

function aggiungiMovimento(movIn, numeroRigaIns = '') {
    try {
        var aggiungiMovimento;
        var movimento = {};
        if (numeroRigaIns == '') {
            var numeroRiga = documento.prodotti.data.length;
            aggiungiMovimento = true;
        }else{
            numeroRiga=numeroRigaIns;
            aggiungiMovimento=false;
        }

        var campiObbligatori = ['descrizione',
            'idIva',
            'importo',
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
            'sconti': '',
            'movLotti': new Array(),
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
            'username':''
        }
        for (var x of campiObbligatori) {
            if (movIn[x] == undefined || movIn[x] == '') {
                throw "Mancanza oggetto obbligatorio su movimento:" + [x];
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
                documento.prodotti.data[numeroRiga][k]=movIn[k];
            }
        }
        if (aggiungiMovimento == true) {
            documento.prodotti.data.push(movimento);
        } 
        documentoToStorage();
        return numeroRiga;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
function aggiungiMovimentiLotti(mov, rigaRif) {
    if (mov.lotto == undefined) {
        throw "Selezionare un lotto valido";
    }
    if (mov.quantità == undefined) {
        throw "Inserire una quantità valida";
    }

    documento.prodotti.data[rigaRif].movLotti.push({
        'lotto': mov.lotto,
        'qu': mov.quantità,
        'scadenza': mov.scadenza
    })
    var riga=documento.prodotti.data[rigaRif].movLotti.length-1;
    documento.prodotti.data[rigaRif].movLotti[riga].riga=riga;
    documentoToStorage();
    return riga;
}
function aggiungiTestata(testIn) {

    try {
        if (documento.testata == undefined) {
            documento.testata = {};
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
            'idAzienda':'',
            'idDocImport':new Array,
            'pIvaFornitoreArticolo':'',
            'idBanca':0,
            'ID_FATT':''
        };
        var campiObbligatori = ['genere'];
        for (var x of campiObbligatori) {
            if (testIn[x] == undefined || testIn[x] == '') {
                throw "Mancanza oggetto su testata:" + [x];
                break;
            } else {
                documento.testata[x] = testIn[x];
            }
        }

        for (var [k, v] of Object.entries(campiNonObbligatori)) {
            if (testIn[k] == undefined) {
                documento.testata[k] = v;
            } else {
                documento.testata[k] = testIn[k];
            }

        }

    } catch (e) {
        console.error(e);
        return e;
    }
}

function salvaDocumentosuServer() {
    if (documento.prodotti.data.length == 0) {
        attivaAlert(0, "Nessuna Riga Documento Presente!", "salvaDocumentosuServer");
        return;
    }

    var parametri = { 
        "tipoRisposta": "salva", 
        "tipoSalva": "documento", 
        "dati": documento };
    inviaRichiestaCentralino("salva", parametri, elaboraRispostaSalvaDocumento);
}

function generaUidDoc() {
    return Date.now();
}

function selezionaDocumento(numeroArray) {
    try {
        documentoToStorage();
        var nuovoDoc = localStorage.getItem(listaDocumenti[numeroArray]);

        if (nuovoDoc != undefined) {
            documento = JSON.parse(nuovoDoc);
            identificativoDoc = documento.identificativo;

            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
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

function richiamaDocumento(obj, callback) {
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
    
    var parametri = {
        "tipoRisposta": "documento",
        "tipoQuery": "preOrdini",
        "chiamante": "modificaOrdini",
        'percorsoImmagini': obj.percorsoImmagini,
        'noteInterne': obj.noteInterne,
        'id': obj.id,
        'idCliente': obj.idCliente,
        'av': obj.av
    };

    if(obj.importDocumento!=undefined && obj.importDocumento==true){
        parametri.importDocumento=true;
    }

    inviaRichiestaCentralino("multiQuery", parametri, function (dati) {
        if (callback != '') {
            callback(JSON.parse(dati));
        }
    })
}
function movimentiIvaInclusa(ivaInclusa) {
    var doc = documento.prodotti.data;
    if (ivaInclusa == true) {

        for (var m in doc) {
            if (doc[m].movIvaInc == false) {
                if (documento.prodotti.data[m].prezzoIntero != '' && documento.prodotti.data[m].prezzoIntero != undefined) {
                    var prezzoTmp = documento.prodotti.data[m].prezzoIntero;
                } else {
                    var prezzoTmp = documento.prodotti.data[m].listino
                }
                aggiornaTotale(documento.totali, documento.prodotti.data[m], -1, null, null, null, documento.prodotti.data[m].movIvaInc);
                documento.prodotti.data[m].prezzoIntero = arrotonda(Number(prezzoTmp) * ('1.' + documento.prodotti.data[m].percIva), 5);
                documento.prodotti.data[m].listino = arrotonda(Number(prezzoTmp) * ('1.' + documento.prodotti.data[m].percIva), 2);
                var sc = (documento.prodotti.data[m].sconti).split("+");
                documento.prodotti.data[m].importo = calcolaImporto(Number(documento.prodotti.data[m].listino), documento.prodotti.data[m].qu, sc[0], sc[1], sc[2], sc[3], sc[4]);
                documento.prodotti.data[m].movIvaInc = true;
                aggiornaTotale(documento.totali, documento.prodotti.data[m], 1, null, null, null, documento.prodotti.data[m].movIvaInc);
            }
        }


    } else if (ivaInclusa == false) {
        for (var m in doc) {
            if (doc[m].movIvaInc != '' && doc[m].movIvaInc == true) {
                if (documento.prodotti.data[m].prezzoIntero != '' && documento.prodotti.data[m].prezzoIntero != undefined) {
                    var prezzoTmp = documento.prodotti.data[m].prezzoIntero;
                } else {
                    var prezzoTmp = documento.prodotti.data[m].listino
                }
                aggiornaTotale(documento.totali, documento.prodotti.data[m], -1, null, null, null, documento.prodotti.data[m].movIvaInc);
                documento.prodotti.data[m].prezzoIntero = arrotonda(Number(prezzoTmp) / ('1.' + documento.prodotti.data[m].percIva), 5);
                documento.prodotti.data[m].listino = arrotonda(Number(prezzoTmp) / ('1.' + documento.prodotti.data[m].percIva), decimaliPrezzi);
                var sc = (documento.prodotti.data[m].sconti).split("+");
                documento.prodotti.data[m].importo = calcolaImporto(Number(documento.prodotti.data[m].listino), documento.prodotti.data[m].qu, sc[0], sc[1], sc[2], sc[3], sc[4]);
                documento.prodotti.data[m].movIvaInc = false;
                aggiornaTotale(documento.totali, documento.prodotti.data[m], 1, null, null, null, documento.prodotti.data[m].movIvaInc);
            }
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
    importo = formattaNumeriInput((importo * qta), 2, 2);

    return importo;
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
function pulisciAllegatiTmpDocumento(){
    try{
        if(documento!=undefined){
            for(var i in documento.prodotti.data){
                if(!isEmpty(documento.prodotti.data[i])){
                    documento.prodotti.data[i].allegatiMovimento=new Array();
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
function valorizzaDatiAccompagnatori(){
    var totColli=0;
    var totPeso=0;
    for(var x of documento.prodotti.data){
        if(x.qu!=0 && x.pesoArticolo!=0){
            totPeso+=Number(x.qu)*Number(x.pesoArticolo);
        }
        if(x.qu!=0 && x.quUnitaria!=0){
            totColli+=Number(x.qu)/Number(x.quUnitaria);
        }
    }
    documento.totali.tPeso=formattaNumeriInput(totPeso,2,0);
}