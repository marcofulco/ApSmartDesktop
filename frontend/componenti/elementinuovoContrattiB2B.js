var elementoRigaScontoAdd = `
	<div class="elementiGriglia w100" id="divAddD">
		<div class="row w100-40p padTop5 normale">
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Quantità </span>
                    <label for="txtAddQuantità">Quantità</label>
                    <input id="txtAddQuantità" name="txtAddQuantità" class="selectBox" type="text">
                </div>
            </div>
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Sconto </span>
                    <label for="txtAddSconto">Sconto</label>
                    <input id="txtAddSconto" name="txtAddSconto" class="selectBox" type="text">
                </div>
            </div>
        </div>
        <div class="pulsantiera">
            <a  href="#" class="w50" title="Salva" onclick="inserisciRigaSconto()" id="btnInseriementoRigaSconto">
                <img src="img/bianche/save.svg"/>
            </a>
            <a  href="#" class="w50" title="Annulla" onclick="annullaAddScontoRiga()" id="btnAnnullaInserimentoSconto">
                <img src="img/bianche/annulla.svg"/>
            </a>
        </div>
	</div>
`;
var elementoRigaScontoTrasportoAdd = `
	<div class="elementiGriglia w100" id="divAddScontoTrasporto">
		<div class="row w100-40p padTop5 normale">
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Quantità </span>
                    <label for="txtAddQuantitàTrasporto">Quantità</label>
                    <input id="txtAddQuantitàTrasporto" name="txtAddQuantitàTrasporto" class="selectBox" type="text">
                </div>
            </div>
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Trasporto</span>
                    <label for="txtAddScontoTrasporto">Trasporto</label>
                    <input id="txtAddScontoTrasporto" name="txtAddScontoTrasporto" class="selectBox" type="text">
                </div>
            </div>
        </div>
        <div class="pulsantiera">
            <a  href="#" class="w50" title="Salva" onclick="inserisciRigaScontoTrasporto()" id="btnInseriementoRigaScontoTrasporto">
                <img src="img/bianche/save.svg"/>
            </a>
            <a  href="#" class="w50" title="Annulla" onclick="annullaAddScontoRigaTrasporto()" id="btnAnnullaInserimentoScontoTrasporto">
                <img src="img/bianche/annulla.svg"/>
            </a>
        </div>
	</div>
`;
var elementoGrigliaListaSconto = `
<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liRigaSconto.{id}">
	<div class="elementiGriglia w100">
		<div class="row w100-120p padTop5 normale" style="overflow-y:auto">
            <div class=" row w50">
                {quantita}
            </div>
            <div class=" row w15">
                {sconto}
            </div>
        </div>
        <div class="row w100p">
            <div class="row w7p hidden">div</div>
            <img class="row w40p cursoreBtn" src="img/bianche/edit.svg" onclick="formInserimentoRigaSconto('{id}')">
            <div class="row w5p hidden">div</div>
            <img class="rowDx w40p cursoreBtn" src="img/bianche/delete.svg" onclick="eliminaRigaSconto('{id}');">
        </div>
	</div>
</li>`;
var elementoGrigliaListaScontoTrasporto = `
<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liRigaScontoTrasporto.{id}">
	<div class="elementiGriglia w100">
		<div class="row w100-120p padTop5 normale" style="overflow-y:auto">
            <div class=" row w50">
                {quantita}
            </div>
            <div class=" row w15">
                {sconto}
            </div>
        </div>
        <div class="row w100p">
            <div class="row w7p hidden">div</div>
            <img class="row w40p cursoreBtn" src="img/bianche/edit.svg" onclick="formInserimentoRigaScontoTrasporto('{id}')">
            <div class="row w5p hidden">div</div>
            <img class="rowDx w40p cursoreBtn" src="img/bianche/delete.svg" onclick="eliminaRigaScontoTrasporto('{id}');">
        </div>
	</div>
</li>`;
var elementiComboScomparsaFamiglia=`
<li id="cboNas.{id}" idRiferimento="{id}" descrizione="{descrizione}" class="row w100-15p pad10 separatoreLi" onclick="selezionaSoggettoDaLista(this)" style="min-height:30px;">
    <div class="w100 testoTroncato" style="font-size:20px;"><b>{descrizione}</b></div>
</li>`;
var elementoLiRigaScontoxAdd=`<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liXAddRigaSconto"></li>`;
var elementoLiRigaScontoTrasportoxAdd=`<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liXAddRigaScontoTrasporto"></li>`;

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