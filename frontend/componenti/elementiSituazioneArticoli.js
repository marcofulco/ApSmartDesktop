var elementiSituazioneArticoli=`<li id="{AV}{ID}" name="{AV}{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="apriDettagliDocumenti(this)">
    <div class="elementiGriglia w100 padTop5 testoNormale">
        <div id="id" name="id" class="row hide">{ID}</div>
        <div id="desEstesaTipo.{ID}" name="id" class="row hide">{DESESTESATIPO}</div>
        <div class="row w100 hGrande">
            <div class="row w25p cx cel">{CS}</div>
            <div class="row w70-25p">{DATA} - {DDEPOSITO}<br>{NUMERO} {DATADOC}<br>{DESTIPO}<br>{RAGIONE_SOCIALE}<br><span class="clrTestoRosso">{CODICE} - {UM}</span><br>{DESCRIZIONE}</div>
            <div class="row w30 dx">{QU}<br>{PREZZONETTO}<br>{IMPORTO}</div>
        </div>

        <div class="row w100 hPiccolo">
            <div class="row w25p cx cel">{CS}</div>
            <div class="row w15-25p hPiccolo cx cel">{DATA}<br>{DDEPOSITO}</div>
            <div class="row w15 hPiccolo cx cel">{NUMERO} {DATADOC}<br>{DESTIPO}</div>
            <div class="row w15 hPiccolo cel">{RAGIONE_SOCIALE}</div>
            <div class="row w25 hPiccolo cel"><span class="w100 clrTestoRosso dx">{CODICE} - {UM}</span><br>{DESCRIZIONE}</div>
            <div class="row w15 hPiccolo dx cel">{QU}</div>
            <div class="row w15 hPiccolo dx cel">{PREZZONETTO}<br>{IMPORTO}</div>
        </div>
    </div>
</li>`;