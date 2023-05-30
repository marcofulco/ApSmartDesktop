var objDocumento={
    documento:{},
    identificativoDoc:'',
    creaDocumento:(indentificativo=Date.now())=>{
        try {
                objDocumento.identificativoDoc=indentificativo;
                objDocumento.documento = {};
                objDocumento.documento.identificativo = indentificativo;
                objDocumento.documento.prodotti = { index: {}, data: [] };
                objDocumento.documento.allegati = {};
                objDocumento.documento.totali = {
                    totale: 0, tCosto: 0, tCostoEvadibile: 0, tQu: 0, tQuEvadibile: 0, tRighe: 0, tRigheEvadibili: 0, totEvadibile: 0, tIva: 0, tDoc: 0,
                    tIvaEvadibile: 0, tDocEvadibile: 0, totaleMerce: 0, nettoMerce: 0, scCassa: 0, trasporto: 0, spese: 0, castellettoIva: []
                };
    
                objDocumento.salvaDocumentoLocal();
                if (listaDocumenti.indexOf('Documento-' + indentificativo) == -1) {
                    listaDocumenti.push('Documento-' + indentificativo);
                }
    
                listaDocumentiToStorage();
            
        } catch (e) {
            console.error(e);
            attivaAlert(2, e, 'inizializzazione var documento');
            throw e;
        }
    },
    salvaDocumentoLocal:()=>{
        localStorage.setItem('Documento-' + objDocumento.identificativoDoc, JSON.stringify(objDocumento.documento));
        var listaDocumenti=localStorage.getItem('listaDocumenti');
        if(listaDocumenti!=undefined){
            var listaDocumenti=JSON.parse(listaDocumenti);
        }
        listaDocumenti.push('Documento-' + objDocumento.identificativoDoc);
        localStorage.setItem('listaDocumenti',JSON.stringify(listaDocumenti));
    },
    aggiornaTotale:(prodotti, molt = 1, trasporto = null, spese = null, scCassa = null, importoIvaInc = false) =>{
        
        totali=objDocumento.documento.totali;
        
        var castelletto = totali.castellettoIva;
    
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
    
            totali.totaleMerce += Number(importo) * molt;
            totali.totale += importo * molt;
            totali.tDoc = arrotonda(totali.totale + totali.tIva, 2);
            totali.tCosto += arrotonda(prodotti.qu * prodotti.costo, 2) * molt;
            totali.tQu += Number(prodotti.qu) * molt;
            totali.tRighe += 1 * molt;
    
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
    
        objDocumento.salvaDocumentoLocal();
    },
    aggiungiMovimento:(movIn, numeroRigaIns = '')=> {
        try {
            var aggiungiMovimento;
            var movimento = {};
            if (numeroRigaIns == '') {
                var numeroRiga = objDocumento.documento.prodotti.data.length;
                aggiungiMovimento = true;
                
            }else{
                numeroRiga=numeroRigaIns;
                aggiungiMovimento=false;
                objDocumento.aggiornaTotale(objDocumento.documento.prodotti.data[numeroRiga],-1);
            }
    
            var campiObbligatori = ['descrizione',
                'idIva',
                'importo',
                'percIva',
                'um'];
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
                'gestioneLotti': false,
                'codiceFornitore': '',
                'idMovOrigReso': '',
                'riga': numeroRiga.toString(),
                'allegatiMovimento': '',
                'deposito': '',
                'imgSrc': '',
                'descrizioneAggiuntiva':'',
                'forzaChiusuraOrdine':0,
            }
            for (var x of campiObbligatori) {
                if (movIn[x] == undefined || movIn[x] == '') {
                    throw "Mancanza oggetto obbligatorio su movimento:" + [x];
                } else {
                    movimento[x] = movIn[x];
                }
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
                    objDocumento.documento.prodotti.data[numeroRiga][k]=movIn[k];
                }
                
            }
            if (aggiungiMovimento == true) {
                objDocumento.documento.prodotti.data.push(movimento);
            } 
            objDocumento.aggiornaTotale(objDocumento.documento.prodotti.data[numeroRiga],1);
            objDocumento.salvaDocumentoLocal();
            return numeroRiga;
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    aggiungiMovimentiLotti:(mov, rigaRif)=> {
        if (mov.lotto == undefined) {
            throw "Selezionare un lotto valido";
        }
        if (mov.quantità == undefined) {
            throw "Inserire una quantità valida";
        }
    
        objDocumento.documento.prodotti.data[rigaRif].movLotti.push({
            'lotto': mov.lotto,
            'qu': mov.quantità,
            'scadenza': mov.scadenza
        })
        objDocumento.salvaDocumentoLocal();
        objDocumento.documento.prodotti.data[rigaRif].movLotti.riga= (objDocumento.documento.prodotti.data[rigaRif].movLotti.length - 1);
        return objDocumento.documento.prodotti.data[rigaRif].movLotti.riga;
    },
    aggiungiTestata:(testIn)=> {
    try {
        if (objDocumento.documento.testata == undefined) {
            objDocumento.documento.testata = {};
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
            'note':''
        };
        var campiObbligatori = ['genere'];
        for (var x of campiObbligatori) {
            if (testIn[x] == undefined || testIn[x] == '') {
                throw "Mancanza oggetto su testata:" + [x];
                break;
            } else {
                objDocumento.documento.testata[x] = testIn[x];
            }
        }

        for (var [k, v] of Object.entries(campiNonObbligatori)) {
            if (testIn[k] == undefined) {
                objDocumento.documento.testata[k] = v;
            } else {
                objDocumento.documento.testata[k] = testIn[k];
            }

        }

    } catch (e) {
        console.error(e);
        return e;
    }
    },
    salvaDocumentosuServer:(callback)=> {
        if (objDocumento.documento.prodotti.data.length == 0) {
            attivaAlert(0, "Nessuna Riga Documento Presente!", "salvaDocumentosuServer");
            return;
        }
        var parametri = { 
            "tipoRisposta": "salva", 
            "tipoSalva": "documento", 
            "dati": objDocumento.documento };
        inviaRichiestaCentralino("salva", parametri, callback(JSON.parse(res)));
    },
    movimentiIvaInclusa:(ivaInclusa) =>{
        var doc = objDocumento.documento.prodotti.data;
        if (ivaInclusa == true) {
    
            for (var m in doc) {
                if (doc[m].movIvaInc == false) {
                    if (objDocumento.documento.prodotti.data[m].prezzoIntero != '' && objDocumento.documento.prodotti.data[m].prezzoIntero != undefined) {
                        var prezzoTmp = objDocumento.documento.prodotti.data[m].prezzoIntero;
                    } else {
                        var prezzoTmp = objDocumento.documento.prodotti.data[m].listino
                    }
                    objDocumento.aggiornaTotale(objDocumento.documento.prodotti.data[m], -1, null, null, null, objDocumento.documento.prodotti.data[m].movIvaInc);
                    objDocumento.documento.prodotti.data[m].prezzoIntero = arrotonda(Number(prezzoTmp) * ('1.' + objDocumento.documento.prodotti.data[m].percIva), 5);
                    objDocumento.documento.prodotti.data[m].listino = arrotonda(Number(prezzoTmp) * ('1.' + objDocumento.documento.prodotti.data[m].percIva), 2);
                    var sc = (objDocumento.documento.prodotti.data[m].sconti).split("+");
                    objDocumento.documento.prodotti.data[m].importo = calcolaImporto(Number(objDocumento.documento.prodotti.data[m].listino), objDocumento.documento.prodotti.data[m].qu, sc[0], sc[1], sc[2], sc[3], sc[4]);
                    objDocumento.documento.prodotti.data[m].movIvaInc = true;
                    objDocumento.aggiornaTotale(objDocumento.documento.prodotti.data[m], 1, null, null, null, objDocumento.documento.prodotti.data[m].movIvaInc);
                }
            }
    
    
        } else if (ivaInclusa == false) {
            for (var m in doc) {
                if (doc[m].movIvaInc != '' && doc[m].movIvaInc == true) {
                    if (objDocumento.documento.prodotti.data[m].prezzoIntero != '' && objDocumento.documento.prodotti.data[m].prezzoIntero != undefined) {
                        var prezzoTmp = objDocumento.documento.prodotti.data[m].prezzoIntero;
                    } else {
                        var prezzoTmp = objDocumento.documento.prodotti.data[m].listino
                    }
                    objDocumento.aggiornaTotale(objDocumento.documento.prodotti.data[m], -1, null, null, null, objDocumento.documento.prodotti.data[m].movIvaInc);
                    objDocumento.documento.prodotti.data[m].prezzoIntero = arrotonda(Number(prezzoTmp) / ('1.' + objDocumento.documento.prodotti.data[m].percIva), 5);
                    objDocumento.documento.prodotti.data[m].listino = arrotonda(Number(prezzoTmp) / ('1.' + objDocumento.documento.prodotti.data[m].percIva), decimaliPrezzi);
                    var sc = (objDocumento.documento.prodotti.data[m].sconti).split("+");
                    objDocumento.documento.prodotti.data[m].importo = calcolaImporto(Number(objDocumento.documento.prodotti.data[m].listino), objDocumento.documento.prodotti.data[m].qu, sc[0], sc[1], sc[2], sc[3], sc[4]);
                    objDocumento.documento.prodotti.data[m].movIvaInc = false;
                    objDocumento.aggiornaTotale(objDocumento.documento.prodotti.data[m], 1, null, null, null, objDocumento.documento.prodotti.data[m].movIvaInc);
                }
            }
        }
    },
    calcolaImporto:(prezzoUnitario, qta, sc1, sc2, sc3, sc4, sc5)=> {
        var importo = prezzoUnitario;
    
        if (sc1 == undefined) {
            sc1 = 0;
        }
        if (sc2 == undefined) {
            sc2 = 0;
        }
        if (sc3 == undefined) {
            sc3 = 0;
        }
        if (sc4 == undefined) {
            sc4 = 0;
        }
        if (sc5 == undefined) {
            sc5 = 0;
        }
    
        importo = arrotonda(importo - ((importo * sc1) / 100), 5);
        importo = arrotonda(importo - ((importo * sc2) / 100), 5);
        importo = arrotonda(importo - ((importo * sc3) / 100), 5);
        importo = arrotonda(importo - ((importo * sc4) / 100), 5);
        importo = arrotonda(importo - ((importo * sc5) / 100), 5);
        importo = formattaNumeriInput((importo * qta), 2, 2);
    
        return importo;
    },
    calcolaTotSconti:(prezzoUnitario, qta, sc1, sc2, sc3, sc4, sc5)=> {
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
    },
    pulisciAllegatiTmpDocumento:()=>{
        try{
            if(objDocumento.documento!=undefined){
                for(var i in objDocumento.documento.prodotti.data){
                    if(!isEmpty(objDocumento.documento.prodotti.data[i])){
                        objDocumento.documento.prodotti.data[i].allegatiMovimento=new Array();
                    }
                }
            }
        }catch(e){
            console.error(e)
        }
        
    },
    richiamaDocumento:(obj, callback) =>{
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
            var res=JSON.parse(dati);
            if(res.error==''){
                
                try{
            objDocumento.documento=res.risposta;
                if (callback != '') {
                    callback(JSON.parse(dati));
                }
            }catch(e){
                console.log(e);
            }
            }
        })
    }
}

