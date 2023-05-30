var rigaMovimentiCassa=`
`
var rigaListaConti=`
<li>
    <a class="">
        <div class="row w100-70p" onclick="selezionaDocumento({RIGA});popolaVeBaDaDocumento();richiamaModal('modalMd');">
            <div id="45" name="lc45" class="row w85">{RIGA} - Totale Documento € {TOTALEDOCUMENTO}</div>
        </div>
        <div class="row w70p marg5Top" onclick="">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="attivaAlert(5,'Sei sicuro di voler eliminare il documento selezionato?','rspEliminaDocumento_'+'{RIGA}')" style="display:block; margin:5px auto;">
        </div>
    </a>
</li>
`;//NON USATO
var rigaMovimentiLotto=`
<li id="lotto-{RIGA}" name="" class="w100-10p clrSfumatoChiaro elementiGriglia marg5Bottom tableStyle testoNero " onclick="">
  <div class="padTop5 testoNormale">
        <div class="row w100-30p">
            <div class="row w100-100p col6" >
                <div id="lotto" class="w100 testoTroncato1">Lotto - {lotto}</div>
                <div class="w100 testoTroncato1">Scadenza - {scadenza}</div>
            </div>
            <div class="row w80p col6">Quantità : {quantità}</div>
        </div>    
        <div class="w30p row padTop5">
            <img src="img/Nere/cestino.svg" style="height:45px;position:initial;" onclick="rimuoviMovimentoLotto({rigaRif},{RIGA})">
        </div>
  </div>
  
</li>
`;//NON USATO
var rigaDocumentoVeBa=`
<div class="h90p clrSfumatoScuro rigaDocumento testoGrassetto {coloreRiga}" onclick="richiamaModal('modalBg','Modifica Riga',{nrRiga})" id="riga-{nrRiga}">
    <div class="h40p w100" style="font-size: 24px;">
    <div class="row w25 sx" id="quantitàRiga-{nrRiga}">{quantità} x</div>
    <div class="row w25 hPiccolo cx" id="prezzoUnitarioRiga-{nrRiga}">{prezzoUnitario}</div>
    <div class="row w35 cx colonnaImportoRigheDocumentoVeBa" id="importoRiga-{nrRiga}">{importo}</div>
    <div class="row w15 hPiccolo cx">{piva}</div>
    </div>
    <div class="h50p w100 testoTroncato testo20" >
        <span class="w35 sx colonnaCodiceRigheDocumentoVeBa" id="codiceRiga-{nrRiga}">{codice}</span> - 
        <span class="w70"id="descrizioneRiga-{nrRiga}" >{descrizione}</span>
    </div>
</div>
`;
var rigaRepartoIva=`
<li>
              <div class="w20 row">{reparto}</div>
              <div class="w75 row">{descrizione}</div>
              <div class="w5 row" onclick="eliminaReparto('{idIva}')">x</div>
            </li>
`;
var rigaDocumentoTmp=`
<li class="pulsanteVeBa rigaDocumento" onclick="selezionaRigaReso('quReintegroAnnulloScontrino-{riga}',{quantità});controlloInputRichiamoScontrino('quReintegroAnnulloScontrino-{riga}')">
<div class="h30p w100" style="font-size: 15px;">
  <div class="row w10 cx" >{quantità} x</div>
  <div class="row w30 cx colonnaCodiceRigheDocumentoVeBa" >{codice}</div>
  <div class="row w15 hPiccolo cx" >{listino}</div>
  <div class="row w30 hPiccolo cx colonnaImportoRigheDocumentoVeBa" >{importo}</div>
  <div class="row w15 cx">
    <input 
    type="number" 
    id="quReintegroAnnulloScontrino-{riga}" 
    class="h100 w100" 
    style="padding-left: 20%; padding-top: 0px;" 
    value="0" 
    onchange="controlloInputRichiamoScontrino('quReintegroAnnulloScontrino-{riga}')" 
    onfocusin="if(this.value=='' || this.value==0)this.value=''"
    onfocusout="if(this.value=='')this.value=0"
    ></div>
</div>
<div class="h30p w100 testoTroncato" >
{descrizione}
</div>
</li>
`;
var modalVisualizzaDocumentiOffline=`
<div class="posTopA w100">
        <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            <div id="cmdPDF" class="row marg10Sx w30p hide"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
            <span class="close" onclick="chiudiModalBox();">&times;</span>
            LISTA DOCUMENTI
            </div>
            <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p">
                 
            </div>
            </div>
            
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA120p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="">
    </ul>
    `;

var elementiDocumentiOffline=`
    <li id="{identificativo}" name="{identificativo}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle h40p" onclick="">
        <div class="elementiGriglia w100 padTop5 testoNormale">
        <div class="w100-120p row">
            <div class="w100">
                <div class="w100 row">{identificativo} - {totale}</div>
            </div>   
        </div>
        <div class="row w120p h100 padTop10">
            <div class="w100 h100">
                <img src="img/bianche/edit.svg" class="h100 w45p" onclick="richiamaDocumentoOfflineSuVeBa('{identificativo}')">
            </div>
        </div>
        </div>
    </li>
    `;