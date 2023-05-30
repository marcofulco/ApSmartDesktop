if(xIdVettore>0 || parametriSO.emissioneDDT==1){
	var elementiDettagliOrdini='<li id="{ID}" name="{ID}" class="w100-20p clrSfumatoScuro elementiGriglia marg5Bottom {PERCINEVASE}"> \
		<div class="elementiGriglia w100"> \
			<div class="row {LARGHEZZAD} hPiccolo testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w5 hPiccolo testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w15 hPiccolo testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx">{QU}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx">{QUTAGLIATA}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx">{QUEVASA}</div> \
			</div> \
			<div class="row w100 hGrande testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w5 hGrande testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w20 hGrande testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx">{QU}</div> \
			</div> \
			<div class="row w25 hGrande testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx">{QUTAGLIATA}</div> \
			</div> \
			<div class="row w30 hGrande testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx">{QUEVASA}</div> \
			</div> \
		</div> \
	</li>';
}else{
    var elementiDettagliOrdini='<li id="{ID}" name="{ID}" class="w100-20p clrSfumatoScuro elementiGriglia marg5Bottom {PERCINEVASE}"> \
	<div class="elementiGriglia w100"> \
		<div class="row {LARGHEZZAD} hPiccolo testoNormale primeLettereMaiuscole {MARGINE}"><div>{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div><div class="clrTestoBlu"> {DOCUMENTOEVASIONE}</div></div> \
		<div class="row w5 hPiccolo testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
		<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row w100 dx">{PREZZO}</div> \
			<div class="row w100 dx">{SC}</div> \
		</div> \
		<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row w100 dx">{QU}</div> \
			<div class="row w100 dx">{IMPORTO}</div> \
		</div> \
		<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row w100 dx">{QUTAGLIATA}</div> \
			<div class="row w100 dx">{IMPORTOTAGLIATO}</div> \
		</div> \
		<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row w100 dx">{QUEVASA}</div> \
			<div class="row w100 dx">{IMPORTOEVASO}</div> \
		</div> \
		<div class="row w100 hGrande testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span> </div> \
        <div class="clrTestoBlu hGrande"> {DOCUMENTOEVASIONE}</div>\
		<div class="row w5 hGrande testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
		<div class="row w20 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row col4 dx">{PREZZO}</div> \
			<div class="row col4 dx">{SC}</div> \
		</div>	\
		<div class="row w20 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row col3 dx">{QU}</div> \
			<div class="row col4 dx">{IMPORTO}</div> \
		</div> \
		<div class="row w25 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row col3 dx">{QUTAGLIATA}</div> \
			<div class="row col4 dx">{IMPORTOTAGLIATO}</div> \
		</div> \
		<div class="row w30 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row col3 dx">{QUEVASA}</div> \
			<div class="row col4 dx">{IMPORTOEVASO}</div> \
		</div> \
	</div> \
</li>';
}
if (parametriSO.noPrelevatoSuOrdini==0){    
	var elementiDettagliOrdiniDE='<li id="{ID}" name="{ID}" class="w100-20p clrSfumatoScuro elementiGriglia marg5Bottom {PERCNONPRELEVATE}"> \
		<div class="elementiGriglia w100"> \
			<div class="row {LARGHEZZAD} hPiccolo testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w5 hPiccolo testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{PREZZO}</div> \
				<div class="row w100 dx">{SC}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{QU}</div> \
				<div class="row w100 dx">{IMPORTO}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{QUTAGLIATA}</div> \
				<div class="row w100 dx">{IMPORTOTAGLIATO}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{QUPRELEVATA}</div> \
				<div class="row w100 dx">{IMPORTOPRELEVATO}</div> \
			</div> \
			<div class="row w100 hGrande testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w5 hGrande testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w20 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col4 dx">{PREZZO}</div> \
				<div class="row col4 dx">{SC}</div> \
			</div>	\
			<div class="row w20 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 dx">{QU}</div> \
				<div class="row col4 dx">{IMPORTO}</div> \
			</div> \
			<div class="row w25 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 dx">{QUTAGLIATA}</div> \
				<div class="row col4 dx">{IMPORTOTAGLIATO}</div> \
			</div> \
			<div class="row w30 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 dx">{QUPRELEVATA}</div> \
				<div class="row col4 dx">{IMPORTOPRELEVATO}</div> \
			</div> \
		</div> \
	</li>';
}else if(xIdVettore>0 || parametriSO.emissioneDDT==1){
    var elementiDettagliOrdiniDE=`<li id="{ID}" name="{ID}" class="w100-20p clrSfumatoScuro elementiGriglia marg5Bottom {PERCNONPRELEVATE}"> \
		<div class="elementiGriglia w100"> \
			<div class="row w100 hGrande testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w10 hGrande testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w25 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx">{QU}</div> \
			</div> \
			<div class="row w25 hGrande testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx" id="tagliati-{ID}">{QUTAGLIATA}</div> \
			</div> \
			<div class="row w25 hGrande testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx" id="prelevati-{ID}">{QUPRELEVATA}</div> \
			</div> \
			<div class="row {LARGHEZZAD} hPiccolo testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w5 hPiccolo testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w15 hPiccolo testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx" id="ordinati-{ID}">{QU}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx" id="tagliati-{ID}">{QUTAGLIATA}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale cx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx" id="prelevati-{ID}">{QUPRELEVATA}</div> \
			</div> \
			<div class="row w30p h30p hide" id="gestioneLottiRighe-{ID}" onclick="apriFormInserimentoLotto('{ID}')"><img src="img/bianche/edit.svg" class="h30p w30p" style="position:revert;"></div>
		</div> \
		<div class="row w100 padTop5 normale" id="formInserimentoLotti-{ID}">
			
		</div>
	</li>`;
} else {
	var elementiDettagliOrdiniDE='<li id="{ID}" name="{ID}" class="w100-20p clrSfumatoScuro elementiGriglia marg5Bottom"> \
		<div class="elementiGriglia w100"> \
			<div class="row {LARGHEZZAD} hPiccolo testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w5 hPiccolo testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w20 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{PREZZO}</div> \
				<div class="row w100 dx">{SC}</div> \
			</div> \
			<div class="row w20 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{QU}</div> \
				<div class="row w100 dx">{IMPORTO}</div> \
			</div> \
			<div class="row w20 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{QUTAGLIATA}</div> \
				<div class="row w100 dx">{IMPORTOTAGLIATO}</div> \
			</div> \
			<div class="row w100 hGrande testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w5 hGrande testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w30 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col4 dx">{PREZZO}</div> \
				<div class="row col4 dx">{SC}</div> \
			</div>	\
			<div class="row w30 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 dx">{QU}</div> \
				<div class="row col4 dx">{IMPORTO}</div> \
			</div> \
			<div class="row w35 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 dx">{QUTAGLIATA}</div> \
				<div class="row col4 dx">{IMPORTOTAGLIATO}</div> \
			</div> \
		</div> \
	</li>';
}

if (parametriSO.modificheFerrara==1){
	var elementiDettagliOrdiniPE='<li id="{ID}" name="{ID}" class="w100-20p clrSfumatoScuro elementiGriglia marg5Bottom {PERCINEVASE}"> \
		<div class="elementiGriglia w100"> \
			<div class="row {LARGHEZZAD} hPiccolo testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w5 hPiccolo testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w20 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx">{QU}</div> \
			</div> \
			<div class="row w20 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx">{QUEVASA}</div> \
			</div> \
			<div class="row w20 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 cx">{QUDAEVADERE}</div> \
			</div> \
			<div class="row w100 hGrande testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
			<div class="row w10 hGrande testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w25 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx">{QU}</div> \
			</div> \
			<div class="row w30 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx">{QUEVASA}</div> \
			</div> \
			<div class="row w35 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 cx">{QUDAEVADERE}</div> \
			</div> \
		</div> \
	</li>';
} else {
	var elementiDettagliOrdiniPE='<li id="{ID}" name="{ID}" class="w100-20p clrSfumatoScuro elementiGriglia marg5Bottom {PERCINEVASE}"> \
		<div class="elementiGriglia w100"> \
			<div class="row {LARGHEZZAD} hPiccolo testoNormale primeLettereMaiuscole {MARGINE}"><div>{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div><div class="clrTestoBlu"> {DOCUMENTOEVASIONE}</div></div> \
			<div class="row w5 hPiccolo testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{PREZZO}</div> \
				<div class="row w100 dx">{SC}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{QU}</div> \
				<div class="row w100 dx">{IMPORTO}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{QUEVASA}</div> \
				<div class="row w100 dx">{IMPORTOEVASO}</div> \
			</div> \
			<div class="row w15 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row w100 dx">{QUDAEVADERE}</div> \
				<div class="row w100 dx">{IMPORTODAEVADERE}</div> \
			</div> \
			<div class="row w100 hGrande testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
            <div class="clrTestoBlu hGrande"> {DOCUMENTOEVASIONE}</div>\
			<div class="row w5 hGrande testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
			<div class="row w20 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col4 dx">{PREZZO}</div> \
				<div class="row col4 dx">{SC}</div> \
			</div>	\
			<div class="row w20 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 dx">{QU}</div> \
				<div class="row col4 dx">{IMPORTO}</div> \
			</div> \
			<div class="row w25 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 dx">{QUEVASA}</div> \
				<div class="row col4 dx">{IMPORTOEVASO}</div> \
			</div> \
			<div class="row w30 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
				<div class="row col3 dx">{QUDAEVADERE}</div> \
				<div class="row col4 dx">{IMPORTODAEVADERE}</div> \
			</div> \
		</div> \
	</li>';
}

var elementiDettagliPreOrdini='<li id="{ID}" name="{ID}" class="w100-20p clrSfumatoScuro elementiGriglia marg5Bottom"> \
	<div class="elementiGriglia w100"> \
		<div class="row {LARGHEZZAD} hPiccolo testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
		<div class="row w5 hPiccolo testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
		<div class="row w35 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row w100 dx">{PREZZO}</div> \
			<div class="row w100 dx">{SC}</div> \
		</div> \
		<div class="row w25 hPiccolo testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row w100 dx">{QU}</div> \
			<div class="row w100 dx">{IMPORTO}</div> \
		</div> \
		<div class="row w100 hGrande testoNormale primeLettereMaiuscole {MARGINE}">{DESCRIZIONE} <span class="clrTestoRosso">{CODICE}</span></div> \
		<div class="row w5 hGrande testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div> \
		<div class="row w40 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row col4 dx">{PREZZO}</div> \
			<div class="row col4 dx">{SC}</div> \
		</div>	\
		<div class="row w35 hGrande testoNormale dx {MARGINE} {HIDEIMP}"> \
			<div class="row col3 dx">{QU}</div> \
		    	<div class="row col4 dx">{IMPORTO}</div> \
		</div> \
	</div> \
</li>';


var formInserimentoLotti=`<div class="w100 h40p intestazione clrScuro marg5Top centraVerticalmente" id="formInserimentoLotti">Inserimento Lotti</div>
	<input id="txtIDMov" type="text" hidden>
	<div class="w100 marg5Top h50p">
		<div class="has-float-label w180p row ">
			<input id="txtCodiceLotto" type="text" inputmode="text" placeholder="Ricerca Lotto" onfocus="" value=""
			onkeypress="attivaRicercaComboScomparsa(this,'listaLottiArticoloVeBa','ullistaLottiArticoloVeBa','tmpListaLottiVeBa.json')"
			onfocusin="attivaRicercaComboScomparsa(this,'listaLottiArticoloVeBa','ullistaLottiArticoloVeBa','tmpListaLottiVeBa.json')"
			onblur="comboScomparsaChiudi(this)" timer="200" comboattiva="true" filtro="LOTTO">
			<label for="txtCodiceLotto">Codice Lotto</label>
			<ul id="ullistaLottiArticoloVeBa" campo="LOTTO" name="ullistaLottiArticoloVeBa"  class="comboScomparsa elencoR1 testoNormale"  onscroll="comboScomparsaScroll(this,'listaLottiArticoloVeBa','ullistaLottiArticoloVeBa','txtCodiceLotto')"
			onfocus="nonChiudereComboScomparsa=true;" onblur="nonChiudereComboScomparsa=false;"
			inputid="txtCodiceLotto">
		</ul>
		</div>
		<div class="has-float-label w180p row ">
			<input id="txtScadenzaLotto" type="date" class="w100-10p" placeholder="Scadenza" onkeypress="" >
			<label for="txtScadenzaLotto" >Scadenza</label>
		</div>
		<div class="has-float-label w130p row">
			<input id="txtQu" type="text" class="w100-10p" placeholder="Quantità" onkeypress="" >
			<label for="txtQu" >Quantità</label>
		</div>
		<div class="row w45p h100 centraVerticalmente" >
			<img src="img/bianche/add.svg" class="h30p w30p cursoreBtn" style="position:revert;" onclick="aggiungiRigalotto()">
		</div>
	</div>
	<ul class="w100 h120p row scrool" style="padding:0px;" id="listaLotti">

	</ul>
	<div class="w100 h60p row ">
		<div id="cmdSalvaD" href="#" class="w45  h100 row centraVerticalmente pulsanteVeBa" title="Salva" onclick="salvaLotti('')"><img src="img/bianche/save.svg" style="top:0px;"></div>
		<div id="cmdAnnullaD" href="#" class="w45  h100 row centraVerticalmente pulsanteVeBa" title="Annulla" onclick="chiudiInserimentoLotti()" ><img src="img/bianche/annulla.svg" style="top:0px;" ></div>
	</div>`;

var dettaglioLottiRiga=`
	<li class="clrSfumatoScuro elementiGriglia ">
		<div class="w100-40p row">
			<div class="w150p row">
				<div>{LOTTO}</div>
			</div>
			<div class="w150p row">
				<div>{SCADENZA}</div>
			</div>
			<div class="w130p row">
				{QU}
			</div>
		</div>
		<div class="w40p row centraVerticalmente">
			<img src="img/bianche/delete.svg" class="h30p w30p cursoreBtn" style="position:revert;" onclick="eliminaRigaLotto('{RIGA}')">
		</div>
	</li>
	`;
