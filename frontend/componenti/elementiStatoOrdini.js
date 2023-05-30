var intestazioneStatoOrdini = `<div class="row w25 hGrande cx">Descrizione</div>
    <div class="row w15 hPiccolo cx">Data</div>
    <div class="row w10 hPiccolo cx">Numero</div>
    <div class="row w15 hPiccolo cx">Stato</div>
    <div class="row w25 hGrande cx">Ordinati</div>
    <div class="row w25 hGrande cx">Tagliati</div>
    <div class="row w25 hGrande cx">Evasi</div>
    <div class="row w20 hPiccolo cx">Ordinati</div>
    <div class="row w20 hPiccolo cx">Tagliati</div>
    <div class="row w20 hPiccolo cx">Evasi</div>
`;

if (parametriSO.noPrelevatoSuOrdini == 0) {
    var intestazioneStatoOrdiniDE = `<div class="row w20 hGrande cx">Descrizione</div>
        <div class="row w15 hPiccolo cx">Data</div>
        <div class="row w10 hPiccolo cx">Numero</div>
        <div class="row w15 hPiccolo cx">Stato</div>
        <div class="row w25 hGrande cx">Ordinati</div>
        <div class="row w25-20p hGrande cx">Tagliati</div>
        <div class="row w25-20p hGrande cx">Prelevati</div>
        <div class="row w20 hPiccolo cx">Ordinati</div>
        <div class="row w20-20p hPiccolo cx">Tagliati</div>
        <div class="row w20-20p hPiccolo cx">Prelevati</div>
    `;
} else if (xIdVettore > 0) {
    var intestazioneStatoOrdiniDE = `
    <div class="row w25 hGrande cx">Descrizione</div>
    <div class="row w25 hGrande cx">Ordinati</div>
    <div class="row w25 hGrande cx">Tagliati</div>
    <div class="row w25 hGrande cx">Prelevati</div>

    <div class="row w15 hPiccolo cx">Data</div>
    <div class="row w10 hPiccolo cx">Numero</div>
    <div class="row w15 hPiccolo cx">Stato</div>
    <div class="row w20 hPiccolo cx">Ordinati</div>
    <div class="row w20 hPiccolo cx">Tagliati</div>
    <div class="row w20 hPiccolo cx">Prelevati</div>
`;
} else {
    var intestazioneStatoOrdiniDE = `<div class="row w30 hGrande cx">Descrizione</div>
        <div class="row w15 hPiccolo cx">Data</div>
        <div class="row w10 hPiccolo cx">Numero</div>
        <div class="row w15 hPiccolo cx">Stato</div>
        <div class="row w35 hGrande cx">Ordinati</div>
        <div class="row w35 hGrande cx">Tagliati</div>
        <div class="row w30 hPiccolo cx">Ordinati</div>
        <div class="row w30 hPiccolo cx">Tagliati</div>
    `;
}

if (parametriSO.modificheDenaro == 1 && xIdCliente > 0) {
    var intestazioneStatoOrdiniPE = `<div class="row w25 cx">Data</div>
        <div class="row w15 cx">Numero</div>
        <div class="row w30 cx">Stato</div>
        <div class="row w30-15p dx">Importo Ordine</div>
    `;
} else if (parametriSO.modificheFerrara == 1) {
    var intestazioneStatoOrdiniPE = `
        <div class="row w20 cx hPiccolo">Data</div>
        <div class="row w15 cx hPiccolo">Numero</div>
        <div class="row w30 cx hGrande"><div>Data</div><div>Numero</div></div>
        <div class="row w40 cx">Stato</div>
        <div class="row w25 cx">Riferimento</div>
    `;
} else {
    var intestazioneStatoOrdiniPE = `<div class="row w25 hGrande cx">Descrizione</div>
        <div class="row w15 hPiccolo cx">Data</div>
        <div class="row w10 hPiccolo cx">Numero</div>
        <div class="row w15 hPiccolo cx">Stato</div>
        <div class="row w25 hGrande cx">Ordinati</div>
        <div class="row w25 hGrande cx">Evasi</div>
        <div class="row w25 hGrande cx">da Evadere</div>
        <div class="row w20 hPiccolo cx">Ordinati</div>
        <div class="row w20 hPiccolo cx">Evasi</div>
        <div class="row w20 hPiccolo cx">da Evadere</div>
    `;
}

if (parametriSO.righeOrdiniUgualeQu == 0) {
    var campoRighe = "RIGHE";
} else {
    var campoRighe = "QU";
}

if (xIdVettore > 0) {
    var elementiStatoOrdini = `<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
        <div class="elementiGriglia w100 padTop5 testoNormale">
            <div id="id" name="id" class="row hide">{ID}</div>
            <div class="row w25-25p hGrande cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')">{DESCRIZIONE}</div>
            <div class="row w15 hPiccolo cx cel">{DATA} {ORA}</div>
            <div class="row w10 hPiccolo sx cel">{NUMERO}</div>
            <div class="row w25p cel {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
            <div class="row w15-25p hPiccolo cx cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')">{DSTATO}</div>
            <div class="row w25 hGrande cx">
                <div class="row col6 dx">{${campoRighe}}</div>
                
            </div>
            <div class="row w25 hGrande cx">
                <div class="row col6 dx">{${campoRighe}TAGLIATE}</div>
                
            </div>
            <div class="row w25 hGrande cx">
                <div class="row col6 dx">{${campoRighe}EVASE}</div>
                
            </div>
            <div class="row w20 hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}}</div>
                
            </div>
            <div class="row w20 hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}TAGLIATE}</div>
                
            </div>
            <div class="row w20 hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}EVASE}</div>
                
            </div>
        </div>
        <div class="elementiGriglia w100 hGrande testoNormale" ><span id="ragioneSociale.{ID}">{RAGIONE_SOCIALE}</span>  <span class="clrTestoRosso">{RIGHEINEVASE}</span></div>
        <div class="elementiGriglia w100 hGrande testoNormale testoCorsivo testo12">{DAGENTE}</span></div>
        <div class="elementiGriglia w50 hPiccolo testoNormale">{RAGIONE_SOCIALE}  <span class="clrTestoRosso">{RIGHEINEVASE}</span></div>
        <div class="elementiGriglia w50 hPiccolo testoNormale testoCorsivo">{DAGENTE}</span></div>
    </li>`;
} else {
    var elementiStatoOrdini = `<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
    <div class="elementiGriglia w100 padTop5 testoNormale">
        <div id="id" name="id" class="row hide">{ID}</div>
        <div class="row w25-25p hGrande cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')">{DESCRIZIONE}</div>
        <div class="row w15 hPiccolo cx cel">{DATA} {ORA}</div>
        <div class="row w10 hPiccolo sx cel">{NUMERO}</div>
        <div class="row w25p cel {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
        <div class="row w15-25p hPiccolo cx cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')">{DSTATO}</div>
        <div class="row w25 hGrande cx">
            <div class="row col6 dx">{${campoRighe}}</div>
            <div class="row col6 dx">{TIMPORTO}</div>
        </div>
        <div class="row w25 hGrande cx">
            <div class="row col6 dx">{${campoRighe}TAGLIATE}</div>
            <div class="row col6 dx">{IMPORTOTAGLIATO}</div>
        </div>
        <div class="row w25 hGrande cx">
            <div class="row col6 dx">{${campoRighe}EVASE}</div>
            <div class="row col6 dx">{IMPORTOEVASO}</div>
        </div>
        <div class="row w20 hPiccolo cx">
            <div class="row col6 dx">{${campoRighe}}</div>
            <div class="row col6 dx">{TIMPORTO}</div>
        </div>
        <div class="row w20 hPiccolo cx">
            <div class="row col6 dx">{${campoRighe}TAGLIATE}</div>
            <div class="row col6 dx">{IMPORTOTAGLIATO}</div>
        </div>
        <div class="row w20 hPiccolo cx">
            <div class="row col6 dx">{${campoRighe}EVASE}</div>
            <div class="row col6 dx">{IMPORTOEVASO}</div>
        </div>
    </div>
    <div class="elementiGriglia w100 hGrande testoNormale"> <span id="ragioneSociale.{ID}">{RAGIONE_SOCIALE}</id>  <span class="clrTestoRosso">{RIGHEINEVASE}</span></div>
    <div class="elementiGriglia w100 hGrande testoNormale testoCorsivo testo12">{DAGENTE}</span></div>
    <div class="elementiGriglia w50 hPiccolo testoNormale">{RAGIONE_SOCIALE}  <span class="clrTestoRosso">{RIGHEINEVASE}</span></div>
    <div class="elementiGriglia w50 hPiccolo testoNormale testoCorsivo">{DAGENTE}</span></div>
    <div class="elementiGriglia w100 testoNormale testoCorsivo">{DESTINAZIONE}</span></div>
        </li>`;
}

var colli = "";
var dataConsegna = "";
if (parametriSO.modificheIceCube == 1) {
    colli = "({COLLI} plt)";
    dataConsegna = "{DATAINITRA}";
}

if (parametriSO.noPrelevatoSuOrdini == 0) {
    var elementiStatoOrdiniDE = `<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
        <div class="elementiGriglia w100 padTop5 testoNormale">
            <div id="id" name="id" class="row hide">{ID}</div>
            <div class="row w25-25p hGrande cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}',1)">{DESCRIZIONE}</div>
            <div class="row w15 hPiccolo cx cel">{DATA} {ORA}</div>
            <div class="row w10 hPiccolo sx cel">{NUMERO}</div>
            <div class="row w25p cel {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
            <div class="row w15-25p hPiccolo cx cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}',1)">{DSTATO}</div>
            <div class="row w25 hGrande cx">
                <div class="row col6 dx">{${campoRighe}}</div>
                <div class="row col6 dx">{TIMPORTO}</div>
            </div>
            <div class="row w25-20p hGrande cx">
                <div class="row col6 dx">{${campoRighe}TAGLIATE}</div>
                <div class="row col6 dx">{IMPORTOTAGLIATO}</div>
            </div>
            <div class="row w25-20p hGrande cx">
                <div class="row col6 dx">{${campoRighe}PRELEVATE}</div>
                <div class="row col6 dx">{IMPORTOPRELEVATO}</div>
            </div>
            <div class="row w20 hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}}</div>
                <div class="row col6 dx">{TIMPORTO}</div>
            </div>
            <div class="row w20-20p hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}TAGLIATE}</div>
                <div class="row col6 dx">{IMPORTOTAGLIATO}</div>
            </div>
            <div class="row w20-20p hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}PRELEVATE}</div>
                <div class="row col6 dx">{IMPORTOPRELEVATO}</div>
            </div>
            <div class="row w40p marg15Top ">
                <img class="rowDx w30p pulsanteFunzioneListaStatoOrdini cursoreBtn ${(xGruppoUtente == 'Amministratori') ? '' : 'hide'}" src="img/bianche/edit.svg" onclick="allertCambioDomento('{ID}')" id="{ID}" numero="{NUMERO}" qta="{${campoRighe}}">
            </div>
            <div class="row w40p marg15Top ">
                <img class="rowDx w30p cursoreBtn ${(parametriSO.allegaFoto == 1) ? '' : 'hide'}" src="img/bianche/attach.svg" onclick="xImmagineAperta=true;modalAcquisizione('{ID}','TES_VENDITE','avviaCarStoricoOrdini()')" id="{ID}" numero="{NUMERO}" ragionesociale="{RAGIONE_SOCIALE}" qta="{COLLI}">
            </div>
        </div>
        <div class="elementiGriglia w100 hGrande testoNormale" > <span id="ragioneSociale.{ID}" >{RAGIONE_SOCIALE}</span>  <span class="clrTestoRosso">{RIGHENONPRELEVATE}</span></div>
        <div class="elementiGriglia w100 hGrande testoNormale testoCorsivo testo12">{DAGENTE}</span></div>
        <div class="elementiGriglia w50 hPiccolo testoNormale">{RAGIONE_SOCIALE}  <span class="clrTestoRosso">{RIGHENONPRELEVATE}</span></div>
        <div class="elementiGriglia w50 hPiccolo testoNormale testoCorsivo">{DAGENTE}</span></div>
        <div class="elementiGriglia w100 testoNormale testoCorsivo">{DESTINAZIONE}</span></div>`;
} else if (xIdVettore > 0) {
    var elementiStatoOrdiniDE = `
    <li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
        <div class="elementiGriglia w100 padTop5 testoNormale">
            <div id="id" name="id" class="row hide">{ID}</div>
            <div class="row w30-25p hGrande cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')">{DESCRIZIONE}</div>
            <div class="row w25 hGrande cx">
                <div class="row col6 cx">{${campoRighe}}</div>
            </div>
            <div class="row w25 hGrande cx" id="tagliate1">
                <div class="row col6 cx">{${campoRighe}TAGLIATE}</div>
            </div>
            <div class="row w15 hGrande cx" id="prelevati">
                <div class="row col6 cx">{${campoRighe}PRELEVATE}</div>
            </div>

            <div class="row w15 hPiccolo cx cel">{DATA} {ORA}</div>
            <div class="row w10 hPiccolo sx cel">{NUMERO}</div>
            <div class="row w25p cel {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
            <div class="row w15-25p hPiccolo cx cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')" >{DSTATO}</div>
            <div class="row w20 hPiccolo cx">
                <div class="row col6 cx">{${campoRighe}}</div>
            </div>
            <div class="row w20 hPiccolo cx" id="tagliate2">
                <div class="row col6 cx">{${campoRighe}TAGLIATE}</div>
            </div>
            <div class="row w20 hPiccolo cx" id="prelevati">
                <div class="row col6 cx">{${campoRighe}PRELEVATE}</div>
            </div>
        </div>
        <div class="elementiGriglia w100 hGrande testoNormale"  ><span id="ragioneSociale.{ID}">{RAGIONE_SOCIALE}</span></div>
        <div class="elementiGriglia w50 hPiccolo testoNormale">{RAGIONE_SOCIALE}</div>`;
} else {
    var elementiStatoOrdiniDE = `<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
        <div class="elementiGriglia w100 padTop5 testoNormale">
            <div id="id" name="id" class="row hide">{ID}</div>
            <div class="row w30-25p hGrande cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}',1)">{DESCRIZIONE}</div>
            <div class="row w15 hPiccolo cx cel">{DATA} {ORA}</div>
            <div class="row w10 hPiccolo sx cel">{NUMERO}</div>
            <div class="row w25p cel {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
            <div class="row w15-25p hPiccolo cx cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}',1)" >{DSTATO}</div>
            <div class="row w35-20p hGrande cx">
                <div class="row col6 dx">{${campoRighe}} ${colli}</div>
                <div class="row col6 dx">${dataConsegna}</div>
                <div class="row col6 dx">{TIMPORTO}</div>
            </div>
            <div class="row w35-20p hGrande cx">
                <div class="row col6 dx">{${campoRighe}TAGLIATE}</div>
                <div class="row col6 dx">{IMPORTOTAGLIATO}</div>
            </div>
            <div class="row w30-20p hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}} ${colli}</div>
                <div class="row col6 dx">${dataConsegna}</div>
                <div class="row col6 dx">{TIMPORTO}</div>
            </div>
            <div class="row w30-20p hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}TAGLIATE}</div>
                <div class="row col6 dx">{IMPORTOTAGLIATO}</div>
            </div>
            <div class="row w40p marg15Top ">
                <img class="rowDx w30p pulsanteFunzioneListaStatoOrdini cursoreBtn ${(xGruppoUtente == 'Amministratori') ? '' : 'hide'}" src="img/bianche/edit.svg" onclick="allertCambioDomento('{ID}')" id="{ID}" numero="{NUMERO}" ragionesociale="{RAGIONE_SOCIALE}" qta="{COLLI}">
                <img class="rowDx w30p cursoreBtn ${(parametriSO.acquisizioneImmagini == '1') ? '' : 'hide'}" src="img/bianche/attach.svg" onclick="xImmagineAperta=true;modalAcquisizione('{ID}','TES_VENDITE','avviaCarStoricoOrdini()')" id="{ID}" numero="{NUMERO}" ragionesociale="{RAGIONE_SOCIALE}" qta="{COLLI}">
            </div>
        </div>
        <div class="elementiGriglia w100 hGrande testoNormale" ><span id="ragioneSociale.{ID}">{RAGIONE_SOCIALE}</span></div>
        <div class="elementiGriglia w100 hGrande testoNormale testoCorsivo testo12">{DAGENTE}</span></div>
        <div class="elementiGriglia w50 hPiccolo testoNormale">{RAGIONE_SOCIALE}</div>
        <div class="elementiGriglia w50 hPiccolo testoNormale testoCorsivo">{DAGENTE}</span></div>
        <div class="elementiGriglia w100 testoNormale testoCorsivo">{DESTINAZIONE}</span></div>`;
}

if (parametriSO.visDataConsegna == 1) {
    elementiStatoOrdiniDE += '<div class="elementiGriglia w100 testoNormale clrTestoArancione cx {hideProgrammazione}">Programmazione {DATAINITRA} {ORAINITRA}</div>';
}

elementiStatoOrdiniDE += '</li>';

if (parametriSO.modificheDenaro == 1 && xIdCliente > 0) {
    var elementiStatoOrdiniPE = '<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">' +
        '<div class="elementiGriglia w100 padTop5 testoNormale">' +
        '<div id="id" name="id" class="row hide">{ID}</div>' +
        '<div id="divDescrizione" class="row w25-25p hide">{DATA}<br>{NUMERO}<BR><div class="testo16 testoGrassetto cursoreBtn" onClick="modalCambiaStatoOrdine(\'{ID}\',\'{IDSTATO}\')">{DSTATO}</div></div>' +
        '<div class="row w25 cx cel">{DATA}</div>' +
        '<div class="row w15 cx cel">{NUMERONS}</div>' +
        '<div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>' +
        '<div class="row w30-25p cx cel testo20 cursoreBtn" onClick="modalCambiaStatoOrdine(\'{ID}\',\'{IDSTATO}\')">{DSTATO}</div>' +
        '<div class="row w30 dx">{TIMPORTO}</div>' +
        '<div class="row w100-5p {hideTraking}" onclick="xImmagineAperta=true;"><a href="{TRAKING}" target="_blank"><img class="posTop2p" src="img/grafiche/tracking.svg"><span class="posTop5p">Controlla Spedizione</span></a></div>';

    if (xIdCliente == 0) {
        elementiStatoOrdiniPE += '<div class="elementiGriglia w100 hGrande testoNormale clrScuro"><span id="ragioneSociale.{ID}"> {RAGIONE_SOCIALE} </span>  <span class="clrTestoRosso">{RIGHEINEVASE}</span></div>' +
            '<div class="elementiGriglia w100 hGrande testoNormale testoCorsivo testo12">{DAGENTE}</span></div>';

        if (xIdAgente == 0) {
            elementiStatoOrdiniPE += '<div class="elementiGriglia w50 hPiccolo testoNormale">{RAGIONE_SOCIALE}  <span class="clrTestoRosso">{RIGHEINEVASE}</span></div>' +
                '<div class="elementiGriglia w50 hPiccolo testoNormale testoCorsivo">{DAGENTE}</span></div>';
        }
    }

    if (parametriSO.visDataConsegna == 1) {
        elementiStatoOrdiniPE += '<div class="elementiGriglia w100 testoNormale clrTestoArancione cx {hideProgrammazione}">Programmazione {DATAINITRA} {ORAINITRA}</div>';
    }

    elementiStatoOrdiniPE += '</li>';
} else if (parametriSO.modificheFerrara == 1) {
    var elementiStatoOrdiniPE = '<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">' +
        '<div class="elementiGriglia w100 padTop5 testoNormale">' +
        '<div id="id" name="id" class="row hide">{ID}</div>' +
        '<div id="divDescrizione" class="row w30 hide">{DATA}<br>{NUMERO}<BR><div class="testo16 testoGrassetto cursoreBtn" onClick="modalCambiaStatoOrdine(\'{ID}\',\'{IDSTATO}\')">{DSTATO}</div></div>' +
        '<div class="row w30 cx cel hGrande"><div>{DATA}</div><div>{NUMERONS}</div></div>' +
        '<div class="row w25 cx cel hPiccolo">{DATA}</div>' +
        '<div class="row w15 cx cel hPiccolo">{NUMERONS}</div>' +
        '<div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>' +
        '<div class="row w30-25p cx cel cursoreBtn" onClick="modalCambiaStatoOrdine(\'{ID}\',\'{IDSTATO}\')">{DSTATO}</div>' +
        '<div class="row w25 cx cel">{NOTEAB19}</div>' +
        '<div class="row w30 cx cel {hideProgrammazione} hide">{DATAINITRA} {ORAINITRA}</div>';

    if (xIdCliente == 0) {
        elementiStatoOrdiniPE += '<div class="elementiGriglia w100 testoNormale"><span id="ragioneSociale.{ID}">{RAGIONE_SOCIALE}</span></div>';
        elementiStatoOrdiniPE += '<div class="elementiGriglia w100 testoNormale"><span id="">{NOTE}</span></div>';
        if (xIdAgente == 0) {
            // elementiStatoOrdiniPE += '<div class="elementiGriglia w50 testoNormale testoCorsivo">{DAGENTE}</span></div>';
        }
        if (parametriSO.allegaFoto == 1) {
            elementiStatoOrdiniPE += `
                <div class="row w40p marg15Top ">
                    <img class="rowDx w30p cursoreBtn " src="img/bianche/attach.svg" onclick="xImmagineAperta=true;modalAcquisizione('{ID}','TES_VENDITE','avviaCarStoricoOrdini()')" id="{ID}" numero="{NUMERO}" ragionesociale="{RAGIONE_SOCIALE}" qta="{COLLI}">
                </div>`
        }
    }

    if (parametriSO.visDataConsegna == 1) {
        elementiStatoOrdiniPE += '<div class="elementiGriglia w100 testoNormale clrTestoArancione cx {hideRilievo}">Rilievo {VETTORECONSEGNAIL} {VETTORECONSEGNAILORE}</div>'+
            '<div class="elementiGriglia w100 testoNormale clrTestoArancione cx {hideProgrammazione}">Programmazione {DATAINITRA} {ORAINITRA}</div>';
    }



    elementiStatoOrdiniPE += '</li>';
} else {
    var elementiStatoOrdiniPE = `<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
        <div class="elementiGriglia w100 padTop5 testoNormale">
        <div id="id" name="id" class="row hide">{ID}</div>
        <div id="divDescrizione" class="row w25-25p hGrande">{DATA}<br>{NUMERO}</div>
        <div class="row w15 hPiccolo cx cel">{DATA} {ORA}</div>
        <div class="row w10 hPiccolo sx cel">{NUMERO}</div>
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
            <div class="row w15-25p hPiccolo cx cel testo20 cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')">{DSTATO}</div>
            <div class="row w25 hGrande cx">
                <div class="row col6 dx">{${campoRighe}}</div>
                <div class="row col6 dx">{TIMPORTO}</div>
            </div>
            <div class="row w25 hGrande cx">
                <div class="row col6 dx">{${campoRighe}EVASE}</div>
                <div class="row col6 dx">{IMPORTOEVASO}</div>
            </div>
            <div class="row w25 hGrande cx">
                <div class="row col6 dx">{${campoRighe}DAEVADERE}</div>
                <div class="row col6 dx">{IMPORTODAEVADERE}</div>
            </div>
            <div class="row w20 hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}}</div>
                <div class="row col6 dx">{TIMPORTO}</div>
            </div>
            <div class="row w20 hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}EVASE}</div>
                <div class="row col6 dx">{IMPORTOEVASO}</div>
            </div>
            <div class="row w20 hPiccolo cx">
                <div class="row col6 dx">{${campoRighe}DAEVADERE}</div>
                <div class="row col6 dx">{IMPORTODAEVADERE}</div>
            </div>
            <div class="elementiGriglia w100 testoNormale testoCorsivo">{DESTINAZIONE}</span></div>
        </div>`;

    if (xIdCliente == 0) {
        elementiStatoOrdiniPE += `
        <div class="testo16 testoGrassetto cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')">{DSTATO}</div><div class="elementiGriglia w100 hGrande testoNormale"><span id="ragioneSociale.{ID}">{RAGIONE_SOCIALE}</span>  <span class="clrTestoRosso">{RIGHEINEVASE}</span></div>
        <div class="elementiGriglia w100 hGrande testoNormale testoCorsivo testo12">{DAGENTE}</span></div>`;

        if (xIdAgente == 0) {
            elementiStatoOrdiniPE += '<div class="elementiGriglia w50 hPiccolo testoNormale"><span id="ragioneSociale.{ID}">{RAGIONE_SOCIALE}</span>  <span class="clrTestoRosso">{RIGHEINEVASE}</span></div>' +
                '<div class="elementiGriglia w50 hPiccolo testoNormale testoCorsivo">{DAGENTE}</span></div>';
        }
    }

    if (parametriSO.visDataConsegna == 1) {
        elementiStatoOrdiniPE += '<div class="elementiGriglia w100 testoNormale clrTestoArancione cx {hideProgrammazione}">Programmazione {DATAINITRA} {ORAINITRA}</div>';
    }

    elementiStatoOrdiniPE += '</li>';
}
if (xIdVettore > 0) {
    var piedeOrdini = `<div class="row hGrande dx w25-10p">Tot. per <span id="nr"></span> Doc. <span id="percEvaso"></span></div>
        <div class="row hPiccolo dx w40-10p">Totali per <span id="nrP"></span> Documenti <span id="percEvasoG"></span></div>
        <div id="Ordinati" class="row hGrande w25">
            <div id="righe" class="row col6 dx"></div> 
            
        </div>
        <div id="Tagliati" class="row hGrande w25">
            <div id="righeTagliate" class="row col6 dx"></div> 
            
        </div>
        <div id="Evasi" class="row hGrande w25">
            <div id="righeEvase" class="row col6 dx"></div> 
            
        </div>
        <div id="Ordinati" class="row hPiccolo w20">
            <div id="righeG" class="row col6 dx"></div> 
            
        </div>
        <div id="Tagliati" class="row hPiccolo w20">
            <div id="righeTagliateG" class="row col6 dx"></div> 
            
        </div>
        <div id="Evasi" class="row hPiccolo w20">
            <div id="righeEvaseG" class="row col6 dx"></div> 
            
        </div>`;
} else {
    var piedeOrdini = `<div class="row hGrande dx w25-10p">Tot. per <span id="nr"></span> Doc. <span id="percEvaso"></span></div>
    <div class="row hPiccolo dx w40-10p">Totali per <span id="nrP"></span> Documenti <span id="percEvasoG"></span></div>
    <div id="Ordinati" class="row hGrande w25">
        <div id="righe" class="row col6 dx"></div> 
        <div id="tImporto" class="row col6 dx"></div> 
    </div>
    <div id="Tagliati" class="row hGrande w25">
        <div id="righeTagliate" class="row col6 dx"></div> 
        <div id="tImportoTagliato" class="row col6 dx"></div> 
    </div>
    <div id="Evasi" class="row hGrande w25">
        <div id="righeEvase" class="row col6 dx"></div> 
        <div id="tImportoEvaso" class="row col6 dx"></div> 
    </div>
    <div id="Ordinati" class="row hPiccolo w20">
        <div id="righeG" class="row col6 dx"></div> 
        <div id="tImportoG" class="row col6 dx"></div> 
    </div>
    <div id="Tagliati" class="row hPiccolo w20">
        <div id="righeTagliateG" class="row col6 dx"></div> 
        <div id="tImportoTagliatoG" class="row col6 dx"></div> 
    </div>
    <div id="Evasi" class="row hPiccolo w20">
        <div id="righeEvaseG" class="row col6 dx"></div> 
        <div id="tImportoEvasoG" class="row col6 dx"></div> 
    </div>`;
}

if (parametriSO.noPrelevatoSuOrdini == 0) {
    var piedeOrdiniDE = `<div class="row hGrande dx w25-10p">Tot. per <span id="nr"></span> Doc. <span id="percPrelevato"></span></div>
        <div class="row hPiccolo dx w40-10p">Totali per <span id="nrP"></span> Documenti <span id="percPrelevatoG"></span></div>
        <div id="Ordinati" class="row hGrande w25">
            <div id="righe" class="row col6 dx"></div> 
            <div id="tImporto" class="row col6 dx"></div> 
        </div>
        <div id="Tagliati" class="row hGrande w25">
            <div id="righeTagliate" class="row col6 dx"></div> 
            <div id="tImportoTagliato" class="row col6 dx"></div> 
        </div>
        <div id="Evasi" class="row hGrande w25">
            <div id="righePrelevate" class="row col6 dx"></div> 
            <div id="tImportoPrelevato" class="row col6 dx"></div> 
        </div>
        <div id="Ordinati" class="row hPiccolo w20">
            <div id="righeG" class="row col6 dx"></div> 
            <div id="tImportoG" class="row col6 dx"></div> 
        </div>
        <div id="Tagliati" class="row hPiccolo w20">
            <div id="righeTagliateG" class="row col6 dx"></div> 
            <div id="tImportoTagliatoG" class="row col6 dx"></div> 
        </div>
        <div id="Evasi" class="row hPiccolo w20">
            <div id="righePrelevateG" class="row col6 dx"></div> 
            <div id="tImportoPrelevatoG" class="row col6 dx"></div> 
        </div>`;
} else if (xIdVettore > 0) {
    var piedeOrdiniDE = `<div class="row hGrande dx w25-10p">Tot. per <span id="nr"></span> Doc. <span id="percPrelevato"></span></div>
    <div class="row hPiccolo dx w40-10p">Totali per <span id="nrP"></span> Documenti <span id="percPrelevatoG"></span></div>
    <div id="Ordinati" class="row hGrande w25">
        <div id="righe" class="row col6 dx"></div> 
        <div id="tImporto" class="row col6 dx hide"></div> 
    </div>
    <div id="Tagliati" class="row hGrande w25">
        <div id="righeTagliate" class="row col6 dx"></div> 
        <div id="tImportoTagliato hide" class="row col6 dx"></div> 
    </div>
    <div id="Evasi" class="row hGrande w25">
        <div id="righePrelevate" class="row col6 dx"></div> 
        <div id="tImportoPrelevato hide" class="row col6 dx"></div> 
    </div>
    <div id="Ordinati" class="row hPiccolo w20">
        <div id="righeG" class="row col6 dx"></div> 
        <div id="tImportoG hide class="row col6 dx"></div> 
    </div>
    <div id="Tagliati" class="row hPiccolo w20">
        <div id="righeTagliateG" class="row col6 dx"></div> 
        <div id="tImportoTagliatoG hide" class="row col6 dx"></div> 
    </div>
    <div id="Evasi" class="row hPiccolo w20">
        <div id="righePrelevateG" class="row col6 dx"></div> 
        <div id="tImportoPrelevatoG hide" class="row col6 dx"></div> 
    </div>`;
} else {
    var piedeOrdiniDE = `<div class="row hGrande dx w30-20p">Tot. per <span id="nr"></span> Doc. <span id="percPrelevato"></span></div>
    <div class="row hPiccolo dx w40-10p">Totali per <span id="nrP"></span> Documenti</div>
    <div id="Ordinati" class="row hGrande w35">
        <div id="righe" class="row col6 dx"></div> 
        <div id="tImporto" class="row col6 dx"></div> 
    </div>
    <div id="Tagliati" class="row hGrande w35">
        <div id="righeTagliate" class="row col6 dx"></div> 
        <div id="tImportoTagliato" class="row col6 dx"></div> 
    </div>
    <div id="Ordinati" class="row hPiccolo w30">
        <div id="righeG" class="row col6 dx"></div> 
        <div id="tImportoG" class="row col6 dx"></div> 
    </div>
    <div id="Tagliati" class="row hPiccolo w30">
        <div id="righeTagliateG" class="row col6 dx"></div> 
        <div id="tImportoTagliatoG" class="row col6 dx"></div> 
    </div>`;
}

if (parametriSO.modificheDenaro == 1 && xIdCliente > 0) {
    var piedeOrdiniPE = `<div class="row dx w70-20p">Totali per <span id="nr"></span> Documenti <span id="percDaEvadere"></span></div>
        <div id="tImporto" class="row w30 dx"></div>`;
} else if (parametriSO.modificheFerrara == 1) {
    var piedeOrdiniPE = `<div class="row cx w100"><span id="nr"></span> Documenti <span id="percDaEvadere" class="hide"></span></div>`;
} else {
    var piedeOrdiniPE = `<div class="row hGrande dx w25-10p">Tot. per <span id="nr"></span> Doc. <span id="percDaEvadere"></span></div>
        <div class="row hPiccolo dx w40-10p">Totali per <span id="nrP"></span> Documenti <span id="percDaEvadereG"></span></div>
        <div id="Ordinati" class="row hGrande w25">
            <div id="righe" class="row col6 dx"></div> 
            <div id="tImporto" class="row col6 dx"></div> 
        </div>
        <div id="Evasi" class="row hGrande w25">
            <div id="righeEvase" class="row col6 dx"></div> 
            <div id="tImportoEvaso" class="row col6 dx"></div> 
        </div>
        <div id="Tagliati" class="row hGrande w25">
            <div id="righeDaEvadere" class="row col6 dx"></div> 
            <div id="tImportoDaEvadere" class="row col6 dx"></div> 
        </div>
        <div id="Ordinati" class="row hPiccolo w20">
            <div id="righeG" class="row col6 dx"></div> 
            <div id="tImportoG" class="row col6 dx"></div> 
        </div>
        <div id="Tagliati" class="row hPiccolo w20">
            <div id="righeEvaseG" class="row col6 dx"></div> 
            <div id="tImportoEvasoG" class="row col6 dx"></div> 
        </div>
        <div id="Evasi" class="row hPiccolo w20">
            <div id="righeDaEvadereG" class="row col6 dx"></div> 
            <div id="tImportoDaEvadereG" class="row col6 dx"></div> 
        </div>`;
}

var elementiPreOrdini = `<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
    <div class="elementiGriglia w100 padTop5 testoNormale">
        <div id="id" name="id" class="row hide">{ID}</div>
        <div class="row w25-25p hGrande cel cursoreBtn" onClick="modalCambiaStatoOrdine('{ID}','{IDSTATO}')">{DESCRIZIONE}</div>
        <div class="row w15 hPiccolo cx cel">{DATA}</div>
        <div class="row w10 hPiccolo sx cel">{NUMERO}</div>
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
        <div class="row w50-85p hGrande testoNormale">{RAGIONE_SOCIALE}</div>
        <div class="row w55-130p hPiccolo testoNormale" id="ragioneSociale.{ID}">{RAGIONE_SOCIALE}</div>
        <div class="row w25 hGrande cx">
            <div class="row col6 dx">{RIGHE}</div>
            <div class="row col6 dx">{TIMPORTO}</div>
        </div>
        <div class="row w20 hPiccolo cx">
            <div class="row col6 dx">{RIGHE}</div>
            <div class="row col6 dx">{TIMPORTO}</div>
        </div>
        <div class="row w105p marg15Top hPiccolo">
            <div class="row w10p hidden">div</div>
            <img class="row w40p" src="img/bianche/edit.svg" onclick="apriModificaPreOrdine('{ID}')">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/delete.svg" onclick="eliminaPreordine(this,'{ID}','{NUMERO}','{DATA}');">
        </div>
        <div class="row w85p marg15Top hGrande">
            <div class="row w10p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriModificaPreOrdine('{ID}')">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaPreordine(this,'{ID}','{NUMERO}','{DATA}');">
        </div>
        <div class="row w100 testoNormale testoCorsivo testo12">{DAGENTE}</span></div>
        <div class="row w100 testoNormale testoCorsivo testo12">{DESTINAZIONE}</span></div>
    </div>
</li>`;

var intestazionePreOrdini = `
    <div class="row w25 hGrande cx">Descrizione</div>
    <div class="row w15 hPiccolo cx">Data</div>
    <div class="row w10 hPiccolo cx">Numero</div>
    <div class="row w55 hPiccolo cx">Cliente</div>
    <div class="row w50-85p hGrande cx">Cliente</div>
    <div class="row w25 hGrande cx">Righe/Imp.</div>
    <div class="row w20 hPiccolo cx">Righe/Importo</div>`;

var piedePreOrdini = `<div class="row hGrande dx w75-95p">Tot. per <span id="nr"></span> Doc.</div>
    <div class="row hPiccolo dx w80-130p">Totali per <span id="nrP"></span> Documenti</div>
    <div id="Ordinati" class="row hGrande w25">
        <div id="righe" class="row col6 dx"></div> 
        <div id="tImporto" class="row col6 dx"></div> 
    </div>
    <div id="Ordinati" class="row hPiccolo w20">
        <div id="righeG" class="row col6 dx"></div> 
        <div id="tImportoG" class="row col6 dx"></div> 
    </div>`;

var elementoRigaOrdineDaCompletare = `
<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle testoNormale" onclick="">
    <div class="row w50-85p hGrande testoNormale marg10Top">{RAGIONE_SOCIALE}</div>
    <div class="row w40-105p hPiccolo testoNormale marg10Top" id="ragioneSociale.{IDCLIENTE}.{IDDEST}">{RAGIONE_SOCIALE}</div>
    <div class="row w15 cx marg10Top " id="QU.{IDCLIENTE}.{IDDEST}"></div>
    <div class="row w15 cx marg10Top hPiccolo" id="TOTIMP.{IDCLIENTE}.{IDDEST}"></div>
    <div class="row w15 cx marg10Top hPiccolo" id="TOTIVA.{IDCLIENTE}.{IDDEST}"></div>
    <div class="row w15 cx marg10Top " id="TOT.{IDCLIENTE}.{IDDEST}"></div>
    <div class="rowDx w105p marg5Top">
            <div class="row w10p hidden">div</div>
            <img class="row w30p" style="top:0px;" src="img/bianche/edit.svg" onclick="apriDettagliDocumentiDaLocal('{IDCLIENTE}','{IDDEST}')">
            <div class="row w5p hidden">div</div>
            <img class="row w30p hide" style="top:0px;" src="img/bianche/delete.svg" onclick="eliminaOrdineLocal('{IDCLIENTE}','{IDDEST}')">
    </div>
</li>`;

var intestazioneStatoOrdiniDaCompletare = `
    <div class="row w50-90p hGrande padSx2">Ragione Sociale</div>
    <div class="row w40-110p hPiccolo padSx2">Ragione Sociale</div>
    <div class="row w15 cx"># Articoli</div>
    <div class="row w15 hPiccolo cx">Totale Imponibile</div>
    <div class="row w15 hPiccolo cx">Totale Iva</div>
    <div class="row w15 cx">Totale</div>
`;