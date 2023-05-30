var elementiLettoreBarCode = `
<div id="w100 intestazioneGriglie">
    <div id="divRicercaBarCode" name="divRicercaBarCode" class="row has-float-label w100-100p marg5Sx marg5Top">
        <input id="txtRicercaBarCode" name="txtRicercaBarCode" type="text" placeholder="Ricerca Codice Barre ...">
        <span class="deleteicon" onclick="var input = getElementById('txtRicercaBarCode'); input.value = ''; input.focus();"></span>
        <label for="txtRicercaBarCode">Ricerca Codice Barre ...</label>
    </div>
    <button id="cmdBarCode" class="row w40p h42p pulsante clrTestoBianco marg5Top padSx5 hide" title="Avvia Lettore BarCode" onclick="avviaRicercaLettoreBarcode('txtRicercaBarCode'); chiudiLettoreBarCode();">
        <img class="row w30p posTopA" src="img/bianche/ok.svg">	
    </button>
    <div class="row w5p h42p"></div>
    <button id="" class="row w40p h42p pulsante clrTestoBianco marg5Top padSx5" title="Riprendi lettura codici" style="display:none;">
        <img class="row w30p posTopA" src="img/bianche/refresh.svg">	
    </button>
</div>
<div class="posTop100px w100" id="divBodyFotocamera">
    <div class="error"></div>
    <div id="interactive" class="row w100 viewport h100-125p">
        
    </div>
    
</div>
<div id="" class="pulsantieraDescrizione">
    <label id="btnChiudiModalBarcode" name="" onclick="chiudiLettoreBarCode();" href="#" class="h65p w33" title="Modifica link rapidi">
        <img src="img/bianche/annulla.svg" style="height: 30px; width:30px; padding: 4px 0px 2px 0px;">
            <div class="testoTroncato1 normale testoPulsantiera">Chiudi</div>
    </label>
    <label id="resumeScan" name="" onclick="" href="#" class="h65p w33" title="Ricarica barcode">
        <img src="img/bianche/refresh.svg" style="height: 30px; width:30px; padding: 4px 0px 2px 0px;">
            <div class="testoTroncato1 normale testoPulsantiera">Ricarica</div>
    </label>
    <label id="cambiaFotocamera" name="" href="#" class="h65p  hide w33" title="Cambia fotocamera" onclick="apriModalSceltaFotocamera()">
        <img src="img/bianche/switch-camera.svg" style="height: 30px; width:30px; padding: 4px 0px 2px 0px;">
            <div class="testoTroncato1 normale testoPulsantiera">Cambia Fotocamera</div>
    </label>
    <label id="btnConfermaBarcode" name="" onclick="avviaRicercaLettoreBarcode('txtRicercaBarCode'); chiudiLettoreBarCode();" href="#" class="h65p w33" title="Modifica link rapidi">
        <img src="img/bianche/ok.svg" style="height: 30px; width:30px; padding: 4px 0px 2px 0px;">
            <div class="testoTroncato1 normale testoPulsantiera">Conferma</div>
    </label>
</div>
`;