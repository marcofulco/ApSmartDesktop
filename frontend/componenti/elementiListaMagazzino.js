var modalListaMagazzino = `
<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        Lista Magazzino
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
</div>
<div class="posTopA45p posBottomA75p w100">
    <ul id="elencoDettagli" name="elencoDettagli" class="elencoRubrica marg5Sx posTopA5p posBottomA w100-5p">

    </ul>

</div>
<div class="pulsantiera posLeftA5p posBottomA10p">
<a id="cmdAddR" name="cmdAddR" href="#" class="w100-10p" title="Invia" onclick="attivaAlert(xTipoAllert.DOMANDASINO,'Attenzione sei sicuro di voler inviare la lista?','inviaLista_');"><img src="img/bianche/done.svg"></a>
<a id="cmdAddR" name="cmdAddR" href="#" class="w100-10p" title="Invia" onclick="attivaAlert(xTipoAllert.DOMANDASINO,'Attenzione sei sicuro di voler <strong>eliminare</strong> la lista?','eliminaLista_');"><img src="img/bianche/delete.svg"></a>
</div>`;
var modelloRigaModalListaMagazzino=`
<div class="w100 row h60p clrSfumatoScuro testoNormale testo16 marg5Bottom">
        <div class="w100-80p row">
            <div>{codice}</div>
            <div>{descrizione}</div>
        </div>
        <div class="w40p row h100 centraVerticalmente">{qu}</div>
        <div class="w40p row h100 centraVerticalmente">
            <img src="img/rosse/cestino.svg" class="h30p" onclick="attivaAlert(xTipoAllert.DOMANDASINO,\'Attenzione sei sicuro di voler eliminare la riga?\',\'eliminaRiga_{riga}\')">
        </div>
    </div>`;