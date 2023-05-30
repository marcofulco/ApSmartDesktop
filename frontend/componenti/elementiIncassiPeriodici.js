var elementiIncassiPeriodici=`<li id="{ID}" name="{ID}" tag="{DOCINC}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
    <div class="elementiGriglia w100 padTop5 testoNormale">
        <div id="id" name="id" class="row hide">{ID}</div>
        <div id="descrizione.{ID}" class="row w50-25p hGrande cel">{DESCRIZIONE}</div>
        <div class="row w15 hPiccolo cx cel">{DATACREAZIONEF}</div>
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
        <div class="row w15 hPiccolo cx cel">{DATAF}</div>
        <div class="row w40-25p hPiccolo sx cel">{CONTO}</div>
        <div class="row w15 hPiccolo dx cel">{IMPORTO}</div>
        <div class="row w15 hPiccolo dx cel">{ABBUONO}</div>
        <div class="row w25 hGrande dx cel">{IMPORTO}</div>
        <div class="row w25 hGrande dx cel">{ABBUONO}</div>
    </div>
    <div id="cliente.{ID}" class="elementiGriglia w70 testoNormale">{RAGIONE_SOCIALE}</div>
    <div class="elementiGriglia w100 testoNormale testoCorsivo">{NOTE}</div>
</li>`;

var elementiDettagliIncassi='<li id="{ID}" name="{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom">\
	<div class="elementiGriglia w100">\
		<div class="row w20 testoNormale primeLettereMaiuscole testoTroncato1 cel">{DESCRIZIONE}</div>\
		<div class="row w15 testoNormale cx cel">{DATA}</div>\
		<div class="row w20 testoNormale cx cel">{NUMERO}</div>\
        <div class="row w15 testoNormale cx cel">{SCADENZA}</div>\
		<div class="row w20 testoNormale dx">{IMPORTOSCAD}</div>\
        <div class="row w10 testoNormale cx testoTroncato1 cel">{GG}</div>\
	</div>\
</li>';

var modalECIncassi=`<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        DETTAGLI INCASSO
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    <!--<div class="clrBase h60p cel"></div>-->
    <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
</div>
<div class="posTopA125p intestazioneGriglie clrScuro w100-15p h30p padTop10 marg5Sx tableStyle">
    <div class="row w20 testoNormale">Tipo Doc.</div>
    <div class="row w15 testoNormale cx">Data</div>
    <div class="row w20 testoNormale cx">Numero</div>
    <div class="row w15 testoNormale cx">Scadenza</div>
    <div class="row w20 testoNormale cx">Importo</div>
    <div class="row w10 testoNormale cx">gg</div>
</div>
<ul id="elencoDettagli" name="elencoDettagli" class="posTopA170p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p">
</ul>`;