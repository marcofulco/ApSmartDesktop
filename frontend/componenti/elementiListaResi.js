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
var elementoRichiesaReso=`
<li id="{ID}" name="{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle" onclick="">
    <div class="elementiGriglia w100 padTop5 testoNormale">
    <div id="id" name="id" class="row hide">{ID}</div>
    <div class="row w20 sx cel">
        <div class="w100 sx ">{DOCUMENTO}</div>
        <div class="w100 sx ">{DATAC}</div>
    </div>
    <div class="row w30 sx cel">{RAGIONESOCIALE}</div>
    <div class="row w10 sx cel">{TOTIMPONIBILE}</div>
    <div class="row w20 sx cel " >
    <div onclick="modalCambiaStatoOrdine('{IDRESO}',{IDSTATODOCUMENTO})" class="cursoreBtn">{STATODOCUMENTO}</div>
    <div><u>{STATODOCUMENTODDT}</u></div>
    </div>
    <div class="row w10 dx cel">{RIGHE}</div>
    <div class="row w10 dx cel">
        <img src="img/bianche/edit.svg" class="w25p padTop10 cursoreBtn" onclick="apriDettagliDocumenti('{ID}','{IDRESO}','{IDSTATODOCUMENTO}')">
    </div>
    </div>
</li>
`;
var elementiDettagliRichiestaReso=`
<li id="{IDMOV}" name="{IDMOV}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle h100p" onclick="">
    <div class="elementiGriglia w100 padTop5 testoNormale">
    <div class="w100-45p row">
        <div class="w100">
                <div class="row w35">
                    <div class="w100 hPiccolo testoNormale sx">{DESCRIZIONE}</div>
                    <div class="w100 hPiccolo testoNormale sx">{CODICE}</div>
                </div>
                <div class="row w5 hPiccolo testoNormale cx">{UM}</div>
                <div class="row w10 hPiccolo testoNormale cx cursoreBtn" onclick="modalCambiaQuantitàAccettata('{IDMOV}','{QU}')"><span id="quta-{IDMOV}">{QU}</span>/{ORIGINE}</div>
                <div class="row w15 hPiccolo testoNormale cx">{PREZZO}</div>
                <div class="row w15 hPiccolo testoNormale cx">{IMPORTO}</div>
               
        </div>
            <div class="w100">
                <div class="w100 row">{DOCUMENTORIF} - {CAUSALERESO} <br> <span id="descrizioneAggiuntiva-{IDMOV}">Note : {NOTECLI} </span></div>
            </div>   
    </div>
    <div class="row w45p h100 padTop10">
        <div class="w100">
            <img src="img/bianche/done.svg" class="w100" onclick="deselezionaDettaglioReso(this,'{IDMOV}')">
        </div>
        <div class="w100" id="dettaglioReso-{IDMOV}">
            <img src="img/bianche/edit.svg" class="w100" onclick="dettaglioReso('{IDMOV}')">
        </div>
    </div>
    </div>
</li>
`;
var modalStoricoOrdiniDE=`
<div class="posTopA w100">
        <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            <div id="cmdPDF" class="row marg10Sx w30p hide"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
            <span class="close" onclick="chiudiModalBox();">&times;</span>
            RICHIESTA RESO
            </div>
            <!--<div class="clrBase h60p cel"></div>-->
            <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p">
                 
            </div>
            </div>
    <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
        <div class="w100-100p row">
            <div class="row w35">
                <div class="w100 hPiccolo testoNormale sx">Descrizione</div>
                <div class="w100 hPiccolo testoNormale sx">Codice</div>
            </div>
            <div class="row w5 hPiccolo testoNormale cx">UM</div>
            <div class="row w10 hPiccolo testoNormale cx">Qu/Origine</div>
            <div class="row w15 hPiccolo testoNormale cx">Prezzo</div>
            <div class="row w15 hPiccolo testoNormale cx">Importo</div>
            
        </div>
        <div class="w100">
        </div>    
    </div>
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="">
    </ul>
    <div id="" class="posBottomA w100">
				<div id="cmdBottom" class="w100">
					<div class="pulsantieraDescrizione" id="">
                        <label id="cmdListaResi" name="cmdListaResi" class="w100 btnLisaResi" title="Lista Resi" onclick="elaboraRichiestaDiReso()">
                            <img src="img/bianche/ok.svg">
                            <div class="testoTroncato1 normale testoPulsantiera">
                                Fine
                            </div>
                        </label>
					</div>
				</div>
			</div>
    `;
var elementiDettagliRichiestaResoGenerazioneDocumenti=`
    <li id="{IDMOV}" name="{IDMOV}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle h120p" onclick="">
        <div class="elementiGriglia w100 padTop5 testoNormale">
        <div class="w100-120p row">
            <div class="w100 row">
                    <div class="row w35">
                        <div class="w100 hPiccolo testoNormale sx">{DESCRIZIONE}</div>
                        <div class="w100 hPiccolo testoNormale sx">{CODICE}</div>
                    </div>
                    <div class="row w5 hPiccolo testoNormale cx">{UM}</div>
                    <div class="row w20 hPiccolo testoNormale cx">{QU} / {ORIGINE}</div>
                    <div class="row w20 hPiccolo testoNormale cx">{PREZZO}</div>
                    <div class="row w20 hPiccolo testoNormale cx">{IMPORTO}</div>
                   
            </div>
            <div class="w100 " style="color:blue;" id="documentoGenerato-{IDMOV}">

            </div>
            <div class="w100">
                <div class="w100 row">{DOCUMENTORIF} - {CAUSALERESO} <br> <span id="descrizioneAggiuntiva-{IDMOV}">Note : {NOTECLI} </span> </div>
            </div>   
            
        </div>
        <div class="row w120p h100 padTop10">
            <div class="w100">
                <img src="img/bianche/edit.svg" class="w100 w45p" onclick="dettaglioReso('{IDMOV}')">
            </div>
            
            <div class="w120p">
                <select id="cmbTipoDocumentoGenerato-{IDMOV}" name="cmbTipoDocumentoGenerato" class="selectBox w100" onchange="">
                    <option value="0"></option>
                    <option value="1">Ordine</option>
                    <option value="2">Nota di credito</option>
                    <option value="3">Nota di credito esercizi precedenti</option>
                    <option value="4">Nota di credito no iva</option>
                    
                </select>
            </div>
        </div>
        </div>
    </li>
    `;
var modalGenerazioneDocumentiDiReso=`
<div class="posTopA w100">
        <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            <div id="cmdPDF" class="row marg10Sx w30p hide"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
            <span class="close" onclick="chiudiModalBox();">&times;</span>
            RICHIESTA RESO
            </div>
            <!--<div class="clrBase h60p cel"></div>-->
            <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p">
                 
            </div>
            </div>
    <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
        <div class="w100-120p row">
            <div class="row w35">
                <div class="w100 hPiccolo testoNormale sx">Descrizione</div>
                <div class="w100 hPiccolo testoNormale sx">Codice</div>
            </div>
            <div class="row w5 hPiccolo testoNormale cx">UM</div>
            <div class="row w20 hPiccolo testoNormale cx">Qu/Origine</div>
            <div class="row w20 hPiccolo testoNormale cx">Prezzo</div>
            <div class="row w20 hPiccolo testoNormale cx">Importo</div>
            
        </div>
        <div class="w100">
        </div>    
    </div>
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="">
    </ul>
    <div id="" class="posBottomA w100">
				<div id="cmdBottom" class="w100">
					<div class="pulsantieraDescrizione" id="">
                        <label id="cmdListaResi" name="cmdListaResi" class="w100 btnLisaResi" title="Lista Resi" onclick="attivaAlert(xTipoAllert.DOMANDASINO,'Attenzione sei sicuro di voler generare i documenti?','generaDocumentiDiReso_');">
                            <img src="img/bianche/ok.svg">
                            <div class="testoTroncato1 normale testoPulsantiera">
                                Genera Documenti
                            </div>
                        </label>
					</div>
				</div>
			</div>
    `;
    var elementiDettagliRichiestaResoSoloVisione=`
    <li id="{IDMOV}" name="{IDMOV}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle h120p" onclick="">
        <div class="elementiGriglia w100 padTop5 testoNormale">
        <div class="w100 row">
            <div class="w100 row">
                    <div class="row w35">
                        <div class="w100 hPiccolo testoNormale sx">{DESCRIZIONE}</div>
                        <div class="w100 hPiccolo testoNormale sx">{CODICE}</div>
                    </div>
                    <div class="row w5 hPiccolo testoNormale cx">{UM}</div>
                    <div class="row w20 hPiccolo testoNormale cx">{QU} / {ORIGINE}</div>
                    <div class="row w20 hPiccolo testoNormale cx">{PREZZO}</div>
                    <div class="row w20 hPiccolo testoNormale cx">{IMPORTO}</div>
                   
            </div>
            <div class="w100 " style="color:red;" id="documentoGenerato-{IDMOV}">

            </div>
            <div class="w100">
                <div class="w100 row">{DOCUMENTORIF} - {CAUSALERESO} <br> <span id="descrizioneAggiuntiva-{IDMOV}">Note : {NOTECLI} </span> </div>
            </div>   
            
        </div>
        </div>
    </li>
    `;
    var modalSoloVisione=`
    <div class="posTopA w100">
            <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
                <div id="cmdPDF" class="row marg10Sx w30p hide"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
                <span class="close" onclick="chiudiModalBox();">&times;</span>
                RICHIESTA RESO
                </div>
                <!--<div class="clrBase h60p cel"></div>-->
                <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p">
                     
                </div>
                </div>
        <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
            <div class="w100-120p row">
                <div class="row w35">
                    <div class="w100 hPiccolo testoNormale sx">Descrizione</div>
                    <div class="w100 hPiccolo testoNormale sx">Codice</div>
                </div>
                <div class="row w5 hPiccolo testoNormale cx">UM</div>
                <div class="row w20 hPiccolo testoNormale cx">Qu/Origine</div>
                <div class="row w20 hPiccolo testoNormale cx">Prezzo</div>
                <div class="row w20 hPiccolo testoNormale cx">Importo</div>
                
            </div>
            <div class="w100">
            </div>    
        </div>
        <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="">
        </ul>
        <div id="" class="posBottomA w100">
                    <div id="cmdBottom" class="w100">
                        <div class="pulsantieraDescrizione" id="">
                            <label id="cmdListaResi" name="cmdListaResi" class="w100 btnLisaResi" title="Lista Resi" onclick="chiudiModalBox()">
                                <img src="img/bianche/enter.svg">
                                <div class="testoTroncato1 normale testoPulsantiera">
                                    Chiudi
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
        `;