var elementoMenu = `<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="li.{riga}">
	<div class="elementiGriglia w100">
		<div class="row w100-40p padTop5 normale">
            <div>
                Menu : <u>{descrizione}</u>
            </div>
            <div>
                {gruppoUtenti}
            </div>
            <div>
                {utente}
            </div>
            <div>
                Posizione Pulsantiera :{pulsantiera}
            </div>
            <div>
                Posizione Menu Rapido :{rapido}
            </div>
            <div>
                Abilitato :{abilita}
            </div>
        </div>
        <div class="row w40p">
            <div class="row w7p hidden">div</div>
			<img class="row w30p" src="img/bianche/edit.svg" onclick="apriModificaUtenteMenu('{riga}')">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/delete.svg" onclick="eliminaUtenteMenu('{riga}');">
        </div>
	</div>
</li>`;
var elementoLiUtenteMenuXAdd=`<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liXAddMenu"></li>`;
var elementoUtenteMenuAdd = `
	<div class="elementiGriglia w100" id="divAddD">
		<div class="row w100-40p padTop5 normale">
            <div>
                <div id="divGruppo" name="divGruppo" class="row has-float-label col6">
                <span class="selectDefault" id="0">Seleziona menù</span>
                <label for="cmbListaPagineAdd">Seleziona menù</label>
                <select id="cmbListaPagineAdd" name="cmbListaPagineAdd" class="selectBox" onchange="changeSelect(this)">
                    <option value="0">Seleziona menù</option>
                </select>
                </div>
            </div>
            <div>
                <div id="divGruppo" name="divGruppo" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Seleziona gruppo</span>
                    <label for="cmbGruppoAdd">Seleziona gruppo</label>
                    <select id="cmbGruppoAdd" name="cmbGruppoAdd" class="selectBox" onchange="changeSelect(this)">
                    <option value="0">Tutti</option>
                </select>
            </div>
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                <span class="selectDefault" id="0">Seleziona autorizzazione singolo utente</span>
                <label for="txtUtentiAdd">Seleziona autorizzazione singolo utente</label>
                <input id="txtUtentiAdd" name="txtUtenti" class="selectBox" list="dtlListaUtenti" type="text">
                </div>
            </div>
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                <span class="selectDefault" id="0">Seleziona Posizione Menu rapido</span>
                <label for="txtPosizioneRapidoAdd">Posizione Menu rapido</label>
                <input id="txtPosizioneRapidoAdd" name="txtPosizioneRapidoAdd" class="selectBox" type="number" value="0">
                </div>
            </div>
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                <span class="selectDefault" id="0">Seleziona Posizione Pulsantiera</span>
                <label for="txtPosizionePulsantieraAdd">Posizione Pulsantiera</label>
                <input id="txtPosizionePulsantieraAdd" name="txtPosizionePulsantieraAdd" class="selectBox" type="number" value="0">
                </div>
            </div>
            <div>
                <div class="row h60p marg5Bottom">
                    <input id="chkAbilitaMenu" name="chkAbilitaMenu" type="checkbox" class="w30p h30p" checked="">
                    <label for="chkAbilitaMenu" class="posTop-5p">
                        Abilita
                    </label>
                </div>
            </div>
        </div>
        <div class="pulsantiera">
            <a id="cmdSalvaD" href="#" class="w50" title="Salva" onclick="salvaMenu()"><img src="img/bianche/save.svg"/></a>
            <a id="cmdAnnullaD" href="#" class="w50" title="Annulla" onclick="annullaAddUtenteMenu()"><img src="img/bianche/annulla.svg"/></a>
        </div>
	</div>
`;
var elementoUtentePagina = `<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liAutorizzazione.{riga}">
	<div class="elementiGriglia w100">
		<div class="row w100-50p padTop5 normale">
            <div>
                <u>{descrizione}</u>
            </div>
            <div>
                {utente}
            </div>
            <div>
                {gruppoUtenti}
            </div>
            <div class="" style="overflow-y:auto">
                {autorizzazioni}
            </div>
        </div>
        <div class="row w40p">
            <div class="row w7p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="formAutorizzazione('{riga}')">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/delete.svg" onclick="eliminaUtentePagina('{riga}');">
        </div>
	</div>
</li>`;
var elementoParametroPagina = `<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liParametroPagina.{riga}">
	<div class="elementiGriglia w100">
		<div class="row w100-40p padTop5 normale" style="overflow-y:auto">
            <div>
                {nomePagina}
            </div>
            <div>
                {parametro} : {valore}
            </div>
            <div>
                {utente}
            </div>
            <div>
                {gruppoUtenti}
            </div>
        </div>
        <div class="row w40p">
            <div class="row w7p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="formParametroPagina('{riga}')">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/delete.svg" onclick="eliminaParametroPagina('{riga}');">
        </div>
	</div>
</li>`;
var modalRubrica=`<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        {TITOLO}
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    <!--<div class="clrBase h60p cel"></div>-->
    <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
</div>
<div class="posTopA115p posBottomA75p w100">
    <ul id="elencoDettagli" name="elencoDettagli" class="elencoRubrica marg5Sx posTopA5p posBottomA w100-5p">

    </ul>
</div>`;

var elementoConfigurazione=`<li>
<div class="elencoR3div">
    <div class="row w100-90p">
        <a id="13" name="lc13" href="#" target="_self">{descrizione} <span class="testoNormale">({id})</span>
        </br>
        <span class="normale">{dbServer}</span>
        </a>
        
    </div>
    <div class="row w90p marg5Top">
        <div class="row w5p hidden">div</div>
        <img class="row w40p" src="img/bianche/enter.svg" onclick="caricaConfigurazione('{id}')">
    </div>
</div>
</li>`
var elementoAutorizzazioniXAdd=`<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liXAddAutorizzazione"></li>`;
var elementoAutorizzazioni = `
	<div class="elementiGriglia w100" id="divAddAutorizzazione">
		<div class="row w100-40p padTop5 normale">
            <div>
                <div id="divGruppo" name="divGruppo" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Seleziona gruppo</span>
                    <label for="cmbGruppoAutorizzazione">Seleziona gruppo</label>
                    <select id="cmbGruppoAutorizzazione" name="cmbGruppoAutorizzazione" class="selectBox" onchange="changeSelect(this)">
                    <option value="0">Tutti</option>
                </select>
            </div>
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                <span class="selectDefault" id="0">Seleziona autorizzazione singolo utente</span>
                <label for="txtUtentiAdd">Seleziona autorizzazione singolo utente</label>
                <input id="txtUtentiAdd" name="txtUtenti" class="selectBox" list="dtlListaUtenti" type="text">
                </div>
            </div>
            <div class="row w100">

            <div id="divAutorizzazionePagina" name="divGruppo"
                class="row has-float-label col12">
                <span class="selectDefault" id="0">Seleziona lista pagine</span>
                <label for="txtListaPagine">Lista pagine</label>
                <input id="txtListaPagine" name="txtListaPagine" class="selectBox"
                    list="dtlListaPagine">
                <datalist id="dtlListaPagine">

                </datalist>
            </div>
        </div>
        <div class="row w100">

            <div class="row h60p marg5Bottom">
                <input id="chkLettura" name="chkLettura" type="checkbox" class="w30p h30p">
                <label for="chkLettura" class=" posTop-5p">
                    Lettura
                </label>
            </div>
            <div class="row h60p marg5Bottom">
                <input id="chkScrittura" name="chkScrittura" type="checkbox"
                    class="w30p h30p">
                <label for="chkScrittura" class=" posTop-5p">
                    Scrittura
                </label>
            </div>
            <div class="row h60p marg5Bottom">
                <input id="chkModifica" name="chkModifica" type="checkbox"
                    class="w30p h30p">
                <label for="chkModifica" class=" posTop-5p">
                    Modifica
                </label>
            </div>
            <div class="row h60p marg5Bottom">
                <input id="chkCancellazione" name="chkCancellazione" type="checkbox"
                    class="w30p h30p">
                <label for="chkCancellazione" class=" posTop-5p">
                    Elimina
                </label>
            </div>
        </div>
           
        </div>
        <div class="pulsantiera">
            <a id="cmdSalvaDAutorizzazioni" href="#" class="w50" title="Salva" onclick="salvaAutorizzazione()"><img src="img/bianche/save.svg"/></a>
            <a id="cmdAnnullaDAutorizzazioni" href="#" class="w50" title="Annulla" onclick="annullaFormAutorizzazione()"><img src="img/bianche/annulla.svg"/></a>
        </div>
	</div>
`;
var elementoFormParametriPaginaXAdd=`<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liXAddParametriPagina"></li>`;
var elementoFormParametriPagina = `
	<div class="elementiGriglia w100" id="divAddParametriPagina">
		<div class="row w100-40p padTop5 normale">
            <div>
                <div id="divGruppo" name="divGruppo" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Seleziona gruppo</span>
                    <label for="cmbGruppoParametriPagina">Seleziona gruppo</label>
                    <select id="cmbGruppoParametriPagina" name="cmbGruppoParametriPagina" class="selectBox" onchange="changeSelect(this)">
                    <option value="0">Tutti</option>
                </select>
            </div>
            <div>
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Seleziona autorizzazione singolo utente</span>
                    <label for="txtUtentiAddParametriPagina">Seleziona autorizzazione singolo utente</label>
                    <input id="txtUtentiAddParametriPagina" name="txtUtentiParametriPagina" class="selectBox" list="dtlListaUtenti" type="text">
                </div>
            </div>
            <div class="row w100">

            <div id="divAutorizzazionePagina" name="divGruppo"
                class="row has-float-label col12">
                <span class="selectDefault" id="0">Selezina Pagina</span>
                <label for="txtListaPagineParametriPagina">Seleziona Pagina</label>
                <input id="txtListaPagineParametriPagina" name="txtListaPagineParametriPagina" class="selectBox"
                    list="dtlListaPagine">
            </div>
            <div class="row w100">
                <div id="divParametriPagina" name="divParametriPagina" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Parametro pagina</span>
                    <label for="txtParametroPagina">Parametro pagina</label>
                    <input id="txtParametroPagina" name="txtParametroPagina" class="selectBox" list="dtlParametriPagina">
                </div>
                <div id="divValoreParametro" name="divValoreParametro" class="row has-float-label col6">
                    <span class="selectDefault" id="0">Inserimento valore parametro</span>
                    <label for="txtValoreParametro">nserimento valore parametro</label>
                    <input id="txtValoreParametro" name="txtValoreParametro" class="selectBox" >
                    <span class="deleteicon" onclick="var input = getElementById('txtValoreParametro'); input.value = ''; input.focus();"></span>
                </div>
            </div>
        </div>
        
        <div class="pulsantiera">
            <a id="cmdSalvaFormParametri" href="#" class="w50" title="Salva" onclick="aggiungiParametro()"><img src="img/bianche/save.svg"/></a>
            <a id="cmdAnnullaFormParametri" href="#" class="w50" title="Annulla" onclick="annullaFormParametroPagina()"><img src="img/bianche/annulla.svg"/></a>
        </div>
	</div>
`;