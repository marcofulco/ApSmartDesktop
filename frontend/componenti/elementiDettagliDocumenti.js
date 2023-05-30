if (typeof parametriMP=="undefined"){
	parametriMP={dettaglioUDC:0};
}

if (parametriMP.dettaglioUDC==1){
	var elementiDettagliDocumenti=`<li id="{ID}" name="{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom">
		<div class="elementiGriglia w100-45p">
			<div class="row testoNormale primeLettereMaiuscole {MARGINE} {LARGHEZZAD}">{DESCRIZIONE}<br><span class="clrTestoRosso">{CODICE}</span></div>
			<div class="row w5 testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div>
			<div class="row w15 testoNormale dx cel {MARGINE} {HIDEIMP}">{QU}</div>
			<div class="row w25 testoNormale dx {HIDEIMP}">{PREZZO}{BR}{SC}</div>
			<div class="row w20 testoNormale dx {HIDEIMP}">{IMPORTO}</div>
		</div>
		<div class="w40p row centraVerticalmente marg35Top">
			<img src="img/bianche/check-box.svg" style="height:40px" class="cursoreBtn {HIDEIMP}" onclick="apriDettaglioUDC('{ID}')" title="Dettaglio Imballaggio">
		</div>
	</li>`;
} else {
	var elementiDettagliDocumenti=`<li id="{ID}" name="{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom">
		<div class="elementiGriglia w100">
			<div class="row testoNormale primeLettereMaiuscole {MARGINE} {LARGHEZZAD}">{DESCRIZIONE}<br><span class="clrTestoRosso">{CODICE}</span></div>
			<div class="row w5 testoNormale cx cel {MARGINE} {HIDEIMP}">{UM}</div>
			<div class="row w15 testoNormale dx cel {MARGINE} {HIDEIMP}">{QU}</div>
			<div class="row w25 testoNormale dx {HIDEIMP}">{PREZZO}{BR}{SC}</div>
			<div class="row w20 testoNormale dx {HIDEIMP}">{IMPORTO}</div>
		</div>
	</li>`;
}