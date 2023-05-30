var elementiMovimentiPeriodici=`<li id="{ID}" name="{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
    <div class="elementiGriglia w100 padTop5 testoNormale">
        <div id="id" name="id" class="row hide">{ID}</div>
        <div class="row w50-25p hGrande cel">{DESCRIZIONE}</div>
        <div class="row w25-25p hPiccolo cel">{DESTIPO}</div>
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
        <div class="row w15 hPiccolo cx cel">{DATAF}</div>
        <div class="row w15 hPiccolo sx cel">{NUMERO}</div>
        <div class="row w15 hPiccolo dx cel">{IMPONIBILE}</div>
        <div class="row w15 hPiccolo dx cel">{IVA}</div>
        <div class="row w15 hPiccolo dx cel">{TOTALE}</div>
        <div class="row w25 hGrande dx cel">{IMPONIBILE}</div>
        <div class="row w25 hGrande dx cel">{TOTALE}</div>
    </div>
    <div class="elementiGriglia w70 testoNormale">{RAGIONE_SOCIALE}</div>
    <div class="elementiGriglia w30 testoNormale dx {NOUTILE}">{TOTUTILE} / {PERCUTILE}%</div>
    <div class="elementiGriglia w100 testoNormale testoCorsivo">{NOTE}</div>
</li>`;