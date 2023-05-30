var elementiIncassi=`<li id="li.{ID}" tag="{DOCINC}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle {DOCINC}Style" title="{TITLE}" onclick="assegnaResiduo('{ID}')">
    <div class="elementiGriglia w100 padTop5 testoNormale">
        <div id="id" name="id" class="row hide">{ID}</div>
        <div class="row hide">{DOCINC}</div>
        <div id="importo" name="importo" class="row hide">{RESIDUO}</div>
        <div class="row w40-25p hGrande cel">{DESCRIZIONE}</div>
        <div class="row w20-25p hPiccolo cel">{DESTIPO}</div>
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
        <div class="row w10 hPiccolo cx cel">{DATAF}</div>
        <div class="row w10 hPiccolo cx cel">{NUMERO}</div>
        <div id="importo.{ID}" class="row w20 dx cel">{IMPORTO}</div>
        <div id="residuo.{ID}" class="row w20 dx cel">{RESIDUO}</div>
        <div id="assegnato.{ID}" class="row w20 dx cel">{ASSEGNATO}</div>
    </div>
</li>`;

var elementiScadenziario=`<li id="li.{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="assegnaResiduo('{ID}')">
        <div class="elementiGriglia w100 padTop5 testoNormale">
        <div id="id" name="id" class="row hide">{ID}</div>
        <div id="idDoc.{ID}" name="id" class="row hide">{IDTES}</div>
        <div class="row hide">{DOCINC}</div>
        <div id="importo" name="importo" class="row hide">{SALDOF}</div>
        <div class="row w40-25p hGrande cel">{DESCRIZIONE}</div>
        <div class="row w20-25p hPiccolo cel">{DESTIPO}</div>
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{IDTES})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>
        <div class="row w10 hPiccolo cx cel">{SCADENZAF}</div>
        <div class="row w10 hPiccolo cx cel">{NUMERO}</div>
        <div id="importo.{ID}" class="row w20 dx cel">{IMPORTOF}</div>
        <div id="residuo.{ID}" class="row w20 dx cel">{SALDOF}</div>
        <div id="assegnato.{ID}" class="row w20 dx cel">{ASSEGNATO}</div>
    </div>
</li>`;
