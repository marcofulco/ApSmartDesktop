var elementiElencoAssistenze = `<li>
    <a class="elencoR1">
        <div class="row w100-120p hpiccolo">
            <div class="row w35 cx">
                <div>{DATA}</div>
                <div>{ORAAPP}</div>
            </div>
            <div id="{ID}" name="lc{ID}" class="row w65">
                <div>{RAGIONESOCIALE}</div>
                <div>{TECNICO}</div>
            </div>
            
        </div>
        <div class="row w100-120p hgrande">
            <div>{RAGIONESOCIALE}</div>
            <div>{TECNICO}</div>
            <div>{DATA} {ORAAPP}</div>
        </div>
        <div class="row w120p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w30p cursoreBtn" src="img/bianche/edit.svg" onclick="apriSchedaAssistenza(this,'{ID}')">
            <div class="row w5p hidden">div</div>
            <img class="row w30p cursoreBtn" src="img/bianche/printer.svg" onclick="stampaRapportoAssistenza('{ID}')">
            <div class="row w5p hidden">div</div>
            <img class="row w30p cursoreBtn" src="img/bianche/delete.svg" onclick="attivaAlert(xTipoAllert.DOMANDASINO,\'Attenzione sei sicuro di voler eliminare la scheda?\',\'eliminaScheda_{ID}\')"')">
        </div>
    </a>
</li>`;
var modelloRigaModalListaMagazzino = `
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
var elementoLiFormModificaMateriale = `<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liXModificaMateriale"></li>`;
var rigaDocumentoVeBa = `
    <li id="liRigaMateriale.{riga}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10">
            <div class="elementiGriglia w100-100p h60p row">
                <div class="h30p w100">
                    <div class="row w10 cx" id="quantitàRiga-{nrRiga}">{quantità} x</div>
                    <div class="row w35 cx colonnaCodiceRigheDocumentoVeBa" id="codiceRiga-{nrRiga}">{codice}</div>
                    <div class="row w15 hPiccolo cx" id="prezzoUnitarioRiga-{nrRiga}">{prezzoUnitario}</div>
                    <div class="row w30 cx colonnaImportoRigheDocumentoVeBa" id="importoRiga-{nrRiga}">{importo}</div>
                    <div class="row w10 hPiccolo cx">{piva}</div>
                </div>
                <div class="h30p w100 testoTroncato" id="descrizioneRiga-{nrRiga}">
                {descrizione}
                </div>
            </div>
            <div class="row w100p h60p">
                <div class="row w7p hidden">div</div>
                <img class="row w40p cursoreBtn" src="img/bianche/edit.svg" onclick="formModificaMateriale('{riga}')">
                <div class="row w5p hidden">div</div>
                <img class="rowDx w40p cursoreBtn" src="img/bianche/delete.svg" onclick="eliminaRigaMateriale('{riga}');">
            </div>
    </li>
`;
var elementoFormModificaMateriale = `
	<div class="elementiGriglia w100" id="divModificaMateriale">
		<div class="row w100-40p padTop5 normale">
            <div class="">
                <div id="divtxtCodiceMaterialeInserito" name="divGruppo" class="row has-float-label w100">
                    <span class="selectDefault" id="0">Codice </span>
                    <label for="txtCodiceMateriale">Data</label>
                    <input id="txtCodiceMateriale" name="txtCodiceMateriale" class="selectBox" type="text" disabled>
                </div>
            </div>
            <div class="row w100">
                <div id="divDescrizione" name="divGruppo" class="row has-float-label w100">
                    <span class="selectDefault" id="0">Descrizione</span>
                    <label for="txtDescrizioneMateriale">Descrizione</label>
                    <input id="txtDescrizioneMateriale" name="txtDescrizioneMateriale" class="selectBox" type="text">
                </div>
            </div>
            <div class="row w100">
                <div id="divtxtQuantità" name="divGruppo" class="row has-float-label w50">
                    <span class="selectDefault" id="0">Quantità</span>
                    <label for="txtQuantitàMateriale">Quantità</label>
                    <input id="txtQuantitàMateriale" name="txtQuantitàMateriale" class="selectBox" type="number">
                </div>
                <div id="divtxtQuantità" name="divGruppo" class="row has-float-label w50">
                    <span class="selectDefault" id="0">Prezzo</span>
                    <label for="txtPrezzoUnitario">Prezzo</label>
                    <input id="txtPrezzoUnitario" name="txtPrezzoUnitario" class="selectBox" type="number">
                </div>
            </div>
        </div>
        <div class="pulsantiera">
            <a  href="#" class="w50" title="Salva" onclick="formModificaMateriale()" id="btnModificaMateriale">
                <img src="img/bianche/save.svg"/>
            </a>
            <a  href="#" class="w50" title="Annulla" onclick="annullaModificaMateriale()" id="btnAnnullaModificaMateriale">
                <img src="img/bianche/annulla.svg"/>
            </a>
        </div>
	</div>
`;
var elementoLiFormInserimentoRangeDataOra = `<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liXAddRigaRangeDataOra"></li>`;
var elementoFormInserimentoRangeDataOra = `
	<div class="elementiGriglia w100" id="divAddDataOra">
		<div class="row w100-40p padTop5 normale">
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label w100">
                    <span class="selectDefault" id="0">Data </span>
                    <label for="txtDataLavoro">Data</label>
                    <input id="txtDataLavoro" name="txtDataLavoro" class="selectBox" type="date">
                </div>
            </div>
            <div class="row w100">
                <div id="divOraInizio" name="divGruppo" class="row has-float-label w50">
                    <span class="selectDefault" id="0">Ora Inizio</span>
                    <label for="txtOraInizio">Ora Inizio</label>
                    <input id="txtOraInizio" name="txtOraInizio" class="selectBox" type="time">
                </div>
                <div id="divOraFine" name="divGruppo" class="row has-float-label w50">
                    <span class="selectDefault" id="0">Ora Fine</span>
                    <label for="txtOraFine">Ora Fine</label>
                    <input id="txtOraFine" name="txtOraFine" class="selectBox" type="time">
                </div>
            </div>
        </div>
        <div class="pulsantiera">
            <a  href="#" class="w50" title="Salva" onclick="inserisciRigaRangeDataOra()" id="btnInseriementoRigaRangeDataOra">
                <img src="img/bianche/save.svg"/>
            </a>
            <a  href="#" class="w50" title="Annulla" onclick="annullaAddRigaRangeDataOra()" id="btnAnnullaInserimentoRangeDataOra">
                <img src="img/bianche/annulla.svg"/>
            </a>
        </div>
	</div>
`;
var elementoGrigliaRangeDataOra = `
<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liRigaRangeDataOra.{id}">
	<div class="elementiGriglia w100">
		<div class="row w100-120p padTop5 normale" style="overflow-y:auto">
            <div class=" row w50">
                {data}
            </div>
            <div class=" row w15">
                <div>{oraInizio}</div>
                <div>{oraFine}</div>
            </div>
        </div>
        <div class="row w100p">
            <div class="row w7p hidden">div</div>
            <img class="row w40p cursoreBtn" src="img/bianche/edit.svg" onclick="formInserimentoRangeDataOra('{id}')">
            <div class="row w5p hidden">div</div>
            <img class="rowDx w40p cursoreBtn" src="img/bianche/delete.svg" onclick="eliminaRigaRageDataOra('{id}');">
        </div>
	</div>
</li>`;