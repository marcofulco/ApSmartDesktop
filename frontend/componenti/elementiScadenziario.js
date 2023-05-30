var elementiScadenziario='<li id="{ID}" name="{IDTES}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">\
    <div class="elementiGriglia w100 padTop5 testoNormale">\
        <div id="id" name="id" class="row hide">{IDTES}</div>\
        <div class="row w30-25p hGrande cel">{DESCRIZIONE}</div>\
        <div class="row w15-25p hPiccolo cel">{DESTIPO}</div>\
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{IDTES})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>\
        <div class="row w15 hPiccolo cx cel">{DATAF}</div>\
        <div class="row w15 hPiccolo cx cel">{NUMERO}</div>\
        <div class="row w20 hGrande cel">{SCADENZAF}</div>\
        <div class="row w10 hPiccolo cel">{SCADENZAF}</div>\
        <div class="row w15 hPiccolo dx cel">{IMPORTOF}</div>\
        <div class="row w15 hPiccolo dx cel">{PAGATOF}</div>\
        <div class="row w15 hPiccolo dx cel">{SALDOF}</div>\
        <div class="row w25 hGrande dx cel">{IMPORTOF}</div>\
        <div class="row w25 hGrande dx cel">{SALDOF}</div>\
    </div>\
    <div class="elementiGriglia hGrande w100 testoNormale">{RAGIONE_SOCIALE}</div>\
    <div class="elementiGriglia hGrande w100 testoNormale">{PAGAMENTOF}</div>\
    <div class="elementiGriglia hGrande w100 testoNormale">{DAGENTE}</div>\
    <div class="elementiGriglia hPiccolo w33 testoNormale">{RAGIONE_SOCIALE}</div>\
    <div class="elementiGriglia hPiccolo w33 testoNormale cel">{PAGAMENTOF}</div>\
    <div class="elementiGriglia hPiccolo w34 testoNormale">{DAGENTE}</div>\
    <div class="elementiGriglia w100 testoNormale testoCorsivo">{NOTE}</div>\
</li>';

var elementiScadenziarioClienti=`<li id="{CLIENTE}" name="{CLIENTE}" class="w100-10p clrSfumatoScuro elementiGriglia testoNormale marg5Bottom tableStyle padTop10 padBot10" onclick="listaDaClienteElenco(this,{CLIENTE},\`{RAGIONE_SOCIALE}\`)">
    <div id="id" name="id" class="row hide">{CLIENTE}</div>
    <div class="elementiGriglia hGrande w50-30p testoNormale">{RAGIONE_SOCIALE}</div>
    <img src="img/bianche/post-it.svg" class="row w30p h30p posTop0p {HIDENOTECLI}">
    <div class="row w25 hGrande dx cel">{SCADEREF}</div>
    <div class="row w25 hGrande dx cel">{SCADUTOF}</div>
    <div class="elementiGriglia hPiccolo w100-30p testoNormale">{RAGIONE_SOCIALE}</div>
    <div class="elementiGriglia hPiccolo w100 padTop5 testoNormale">    
        <div class="row w14 dx cel">{SCADEREF}</div>
        <div class="row w14 dx cel">{SCADUTO30F}</div>
        <div class="row w14 dx cel">{SCADUTO60F}</div>
        <div class="row w14 dx cel">{SCADUTO90F}</div>
        <div class="row w14 dx cel">{SCADUTO120F}</div>
        <div class="row w14 dx cel">{SCADUTOOLTREF}</div>
        <div class="row w14 dx cel">{SCADUTOF}</div>
    </div>
</li>`;

var elementiScadenziarioClientiScheda=`<li id="{CLIENTE}" name="{CLIENTE}" class="w100-10p clrSfumatoScuro elementiGriglia testoNormale marg5Bottom tableStyle padTop10 padBot10" onclick="listaDaClienteElenco(this,{CLIENTE},\`{RAGIONE_SOCIALE}\`)">
    <div id="id" name="id" class="row hide">{CLIENTE}</div>
    <div class="elementiGriglia hGrande w50">{RAGIONE_SOCIALE}</div>
    <div class="row w25 hGrande dx cel">{SCADEREF}</div>
    <div class="row w25 hGrande dx cel">{SCADUTOF}</div>
    <div class="elementiGriglia hPiccolo w100 padTop5">    
        <div class="row w14 dx cel">{SCADEREF}</div>
        <div class="row w14 dx cel">{SCADUTO30F}</div>
        <div class="row w14 dx cel">{SCADUTO60F}</div>
        <div class="row w14 dx cel">{SCADUTO90F}</div>
        <div class="row w14 dx cel">{SCADUTO120F}</div>
        <div class="row w14 dx cel">{SCADUTOOLTREF}</div>
        <div class="row w14 dx cel">{SCADUTOF}</div>
    </div>
</li>`;

var elementiScadenziarioMese=`<li id="{CLIENTE}" name="{CLIENTE}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle testoNormale padTop10 padBot10" onclick="listaDaMese('{MESE}')">
    <div id="id" name="id" class="row hide">{MESE}</div>
    <div class="elementiGriglia w25 testoNormale">{MESE}</div>
    <div class="row w25 cx cel">{NR}</div>
    <div class="row w25 dx cel">{SALDOF}</div>
    <div class="row w25 dx cel">{PROGRESSIVO}</div>
</li>`;

var elementiScadenziarioScheda='<li id="{ID}" name="{IDTES}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">\
    <div class="elementiGriglia w100 padTop5 testoNormale">\
        <div id="id" name="id" class="row hide">{IDTES}</div>\
        <div class="row w30-25p hGrande cel">{DESCRIZIONE}</div>\
        <div class="row w15-25p hPiccolo cel">{DESTIPO}</div>\
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{IDTES})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>\
        <div class="row w15 hPiccolo cx cel">{DATAF}</div>\
        <div class="row w15 hPiccolo cx cel">{NUMERO}</div>\
        <div class="row w20 hGrande cel">{SCADENZAF}</div>\
        <div class="row w10 hPiccolo cel">{SCADENZAF}</div>\
        <div class="row w15 hPiccolo dx cel">{IMPORTOF}</div>\
        <div class="row w15 hPiccolo dx cel">{PAGATOF}</div>\
        <div class="row w15 hPiccolo dx cel">{SALDOF}</div>\
        <div class="row w25 hGrande dx cel">{IMPORTOF}</div>\
        <div class="row w25 hGrande dx cel">{SALDOF}</div>\
    </div>\
    <div class="elementiGriglia hGrande w100 testoNormale">{PAGAMENTOF}</div>\
    <div class="elementiGriglia hGrande w100 testoNormale">{DAGENTE}</div>\
    <div class="elementiGriglia hPiccolo w50 testoNormale">{PAGAMENTOF}</div>\
    <div class="elementiGriglia hPiccolo w50 testoNormale">{DAGENTE}</div>\
    <div class="elementiGriglia w100 testoNormale testoCorsivo">{NOTE}</div>\
</li>';

var scadenziarioModelloIntestazione=`<div class="row hGrande w30">Descrizione</div>
    <div class="row w15 hPiccolo">Tipo Doc.</div>
    <div class="row w15 hPiccolo cx">Data</div>
    <div class="row w15 hPiccolo cx">Numero</div>
    <div class="row w20 hGrande">Scadenza</div>
    <div class="row w10 hPiccolo">Scadenza</div>
    <div class="row w15 hPiccolo cx">Importo</div>
    <div class="row w15 hPiccolo cx">Pagato</div>
    <div class="row w15 hPiccolo cx">Saldo</div>
    <div class="row w25 hGrande cx">Importo</div>
    <div class="row w25 hGrande cx">Saldo</div>
</div>`;

var scadenziarioModelloIntestazioneClienti=`<div class="row hPiccolo w14 cx">a Scadere</div>
<div class="row w14 hPiccolo cx">Scaduto 30gg</div>
<div class="row w14 hPiccolo cx">60gg</div>
<div class="row w14 hPiccolo cx">90gg</div>
<div class="row w14 hPiccolo cx">120gg</div>
<div class="row w14 hPiccolo cx">Oltre</div>
<div class="row w14 hPiccolo cx">Scaduto</div>
<div class="row hGrande w50 cx">Cliente</div>
<div class="row hGrande w25 cx">a Scadere</div>
<div class="row hGrande w25 cx">Scaduto</div>`;

var scadenziarioModelloIntestazioneMese=`<div class="row w25">Mese</div>
    <div class="row w25"># Scadenze</div>
    <div class="row w25 cx">Importo</div>
    <div class="row w25 cx">Progressivo</div>
</div>`;

var scadenziarioModelloPiede=`<div class="row w10p cel"></div>
<div class="row w100-20p hPiccolo">
    <div class="row w55 dx">Totali per <span id="nrP"></span>Scad.</div>
    <div id="tImporto" class="row w15 dx cel"></div>
    <div id="tPagato" class="row w15 dx cel"></div>
    <div id="tSaldo" class="row w15 dx cel"></div>
</div>
<div class="row w100-5p hGrande">
    <div class="row w50-10p dx">Tot. per <span id="nrPG"></span>Scad.</div>
    <div id="tImportoG" class="row w25 dx cel"></div>
    <div id="tSaldoG" class="row w25 dx cel"></div>
</div>`;

var scadenziarioModelloPiedeClienti=`<div class="row w10p cel"></div>
<div class="row w100-20p hPiccolo">
    <div id="tScadere" class="row w14 hPiccolo dx cel"></div>
    <div id="tScaduto30" class="row w14 hPiccolo dx cel"></div>
    <div id="tScaduto60" class="row w14 hPiccolo dx cel"></div>
    <div id="tScaduto90" class="row w14 hPiccolo dx cel"></div>
    <div id="tScaduto120" class="row w14 hPiccolo dx cel"></div>
    <div id="tScadutoOltre" class="row w14 hPiccolo dx cel"></div>
    <div id="tScaduto" class="row w14 hPiccolo dx cel"></div>
</div>
<div class="row w100-5p hGrande">
    <div class="row w50-10p hGrande dx">Totali</div>
    <div id="tScadereG" class="row w25 hGrande dx cel"></div>
    <div id="tScadutoG" class="row w25 hGrande dx cel"></div>
</div>`;

var scadenziarioModelloPiedeMese=`<div class="row w10p cel"></div>
<div class="row w100-20p hPiccolo">
    <div class="row w25 dx">Totali</div>
    <div id="nrP" class="row w25 cx cel"></div>
    <div id="tImporto" class="row w25 dx cel"></div>
</div>
<div class="row w100-5p hGrande">
    <div class="row w25-10p dx">Totali</div>
    <div id="nrPG" class="row w25 cx cel"></div>
    <div id="tImportoG" class="row w25 dx cel"></div>
</div>`;