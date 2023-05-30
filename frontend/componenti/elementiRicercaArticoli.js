var rigaElencoArticoli=`
<li id="{CODICE}" name="{CODICE}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="selezionaRiga(this)">
    <div class="elementiGriglia w100 padTop5 testoNormale">
        <div class="row w70 hGrande">
            <div>{CODICE}</div>
            <div>{DESCRIZIONE}</div>
        </div>
        <div class="row w30 hGrande">
            <div>{LISTINORIF} / {UCOSTO}</div>
            <div>{DISP} / {GIACENZA}</div>
        </div>
        <div class="row w15-25p hPiccolo">{CODICE}</div>
        <div class="row w40 cel hPiccolo testoTroncato">{DESCRIZIONE}</div>
        <div class="row w10 cel hPiccolo">{LISTINORIF}</div>
        <div class="row w10 cel hPiccolo">{PREZZOLIVAESCL}</div>
        <div class="row w10 cel hPiccolo">{UCOSTO}</div>
        <div class="row w60p cel hPiccolo cx">{GIACENZA}</div>
        <div class="row w60p cel hPiccolo cx">{DISP}</div>
        <div class="row w25p {IMMAGINE} hide" onClick="apriImmaginiMultiple(\'{TABELLA}\',{ID})">
            <img src="img/noImg.svg" alt="" class="w25p h25p posTop0p">
        </div>
            
    </div>
</li>
`;
var testataRicercaArticoli=`<div class="w100">
<div class="row w70 hGrande testo10">
    <div>CODICE</div>
    <div>DESCRIZIONE</div>
</div>
<div class="row w30 hGrande testo10">
    <div>PREZZO I.C./ U.COSTO</div>
    <div>DISP / GIACENZA</div>
</div>
<div id="id" name="id" class="row w15-25p hPiccolo">CODICE</div>
<div class="row w40 cel hPiccolo">DESCRIZIONE</div>
<div class="row w10 cel hPiccolo">PREZZO </div>
<div class="row w10 cel hPiccolo">PREZZO I.E.</div>
<div class="row w10 cel hPiccolo">UCOSTO</div>
<div class="row w60p cel hPiccolo cx">GIAC</div>
<div class="row w60p cel hPiccolo cx">DISP</div>
</div>`;