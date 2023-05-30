var elementiEstrattoConto='<li id="{ID}" tag="{DOCINC}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle {DOCINC}Style" title="{TITLE}" onclick="apriDettagliDocumenti(this)">\
    <div class="elementiGriglia w100 padTop5 testoNormale">\
        <div id="id" name="id" class="row hide">{ID}</div>\
        <div class="row hide">{DOCINC}</div>\
        <div id="importo" name="importo" class="row hide">{TOT_PAGAREF}</div>\
        <div class="row w50-25p hGrande cel">{DESCRIZIONE}</div>\
        <div class="row w25-25p hPiccolo cel">{DESTIPO}</div>\
        <div class="row w25p {IMMAGINE}" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})"><img src="img/noImg.svg" alt="" class="w25p h25p posTop0p"></div>\
        <div class="row w15 hPiccolo cx cel">{DATAF}</div>\
        <div class="row w15 hPiccolo cx cel">{NUMERO}</div>\
        <div class="row w15 hPiccolo dx cel">{TOT_PAGARED}</div>\
        <div class="row w15 hPiccolo dx cel">{TOT_PAGAREA}</div>\
        <div class="row w15 hPiccolo dx cel">{PROGRESSIVO}</div>\
        <div class="row w25 hGrande dx cel">{IMPORTO}</div>\
        <div class="row w25 hGrande dx cel">{PROGRESSIVO}</div>\
    </div>\
    <div class="elementiGriglia w100 testoNormale">\
        {NOTE}\
    </div>\
</li>';