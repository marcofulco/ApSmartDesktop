var rigaArticolo = `<div class="col3Catalogo hPanelArticoliSubLightGNP clrBianco testoNero elementiGriglia marg5Bottom">
<div class="h100 w100 clrContornoScuro ">
  <div class="w100-135p h95 centraElemento row" style="padding-left:5px">
    <div class="w100 row testoGrassetto padTop6 h50">
        <div>{DESCRIZIONE}</div>
        <div class="testoNormale clrTestoRosso">{CODICE} <span class="testoNormale clrTestoNero">-{CODICEFORN}</span></div>
    </div>
    <div class="h30 w100 row">
      <div class="h50 w100 testoGrassetto">Quantità {UM} {QUFORM}</div>
      <div class="h50 w100 testoGrassetto">Prezzo € {PREZZONETTO}</div>
    </div>
  </div>
  <div class="w130p h95  rowDx">
    <div class="w120p h80 centraElemento">
        <img id="img.{CODICE}" name="switch" maxImg="1" nrImg="1" stile="rect" class="w100 mH115p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}', "", "rect", "230")}" datiImg="{DESCRIZIONE}<BR><b></b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\','hide',1,\'{CODICE}\','hidden','','{CODICEFORN}','','','','hide','');" />
    </div>
    <div class="h20 w120p centraElemento">
      <button class="pulsanteVeBa h85 w100" onclick="apriModalReso('{IDMOV}','')">
        <img src="img/bianche/returning.svg" class="" style="height:30px; width:30px;">
      </button>
    </div>
  </div>
</div>
</div>`;
var rigaDocumento = ``;

var rigaFattura = `<div class="row intestazioneGriglie clrScuro h40p w100" style="padding-left: 0px!important;">
<div class="row w100-45p padTop10">Riferimento Fattura numero {RAGGRUPPAMENTO} del {DATADOC}</div>
<div class="rowDx w45p h100 marg5top">
    <a href="#">
        <img src="img/bianche/add.svg" class="w100 h80 " 
        onclick="attivaAlert(5, 'Sei sicuro di voler rendere tutti gl\\'articoli della fattura? ? ', 'rspAlertAggiuntaResoFattura_' + '{ID}')">
    </a>
</div>
</div>`;
var rigaDocumentoReso = `<div class="w98 h135p clrBianco testoNero clrContornoScuro marg10Top centraElemento testoNormale ">
 <div class="w100-40p row h100" onclick="apriModalReso('{IDMOV}','{riga}')">
   <div><span class="clrTestoRosso">{CODICE}</span>-<span class="">{CODICEFORN}</span></div>
   <div class="testoTroncato h40p">{DESCRIZIONE}</div>
   <div>
       <div class="row w40">Reso : {UM} {QU} </div>
       <div class="row w60">Importo : {IMPORTO} </div>
   </div>
   <div>Motivo reso: {MOTIVO}</div>
   <div> {NOTAUFFICIO}</div>
 </div>
 <button class="h100 w40p pulsanteVeBa" onclick="eliminaRigaDocumentoReso({POSIZIONE})">
   <img src="img/bianche/cestino.svg" class="w100 h100">
 </button>
</div>`;
var documentiDiReso = `<div class="w98 h100p clrBianco testoNero clrContornoScuro marg10Top centraElemento testoNormale ">
 <div class="w100-80p row h100">
   <div> Documento Nr. {NUMERO} del <span class="">{DATA}</span></div>
   <div class="testoTroncato h20p clrTestoRosso" >{STATODOCUMENTO}</div>
   <div>
       <div class="w100">Righe : {TOT_QU} </div>
       <div class="w100">Importo Totale: {TOTALE} </div>
   </div>
 </div>
 <button class="h100 w40p pulsanteVeBa rowDx {BTNDATIDDT}" onclick="apriModaldatiDDT('{ID}')" title="Completa richiesta di reso">
   <img src="img/bianche/done.svg" class="w100 h100">
 </button>
 <button class="h100 w40p pulsanteVeBa rowDx {BTNCOMPLETARESO}" onclick="attivaAlert(5,'Sei Sicuro di voler richiamare il documento di reso? <strong>eventuali resi in corso andranno persi!</strong>','rspRichiamoDocumento_{ID}')" title="Richiama documento">
   <img src="img/bianche/enter.svg" class="w100 h100">
 </button>
 <button class="h100 w40p pulsanteVeBa rowDx {BTNSTAMPADDT}" onclick="stampa({IDDDT},'A')" title="Stampa DDT">
   <div><img src="img/bianche/printer.svg" class="w100"></div><div>DDT</div>
 </button>
 <button class="h100 w40p pulsanteVeBa rowDx {BTNSTAMPARICHIESTA}" onclick="apriModalMovimentiResi('{ID}')" title="Stampa Richiesta">
 <div><img src="img/bianche/info.svg" class="w100"></div>
</button>
</div>`;
var comparazioneReso = `<div class="w98 h130p clrBianco testoNero clrContornoScuro marg10Top centraElemento testoNormale" style="border-radius:5px 5px 5px 5px">
<div class="w100-130p h95 centraElemento row">
    <div>{CODICE} - {DESCRIZIONE}</div>
    <div>Quantita Accettata <span class="clrTestoRosso">{QUACCETTATA}</span>/{QURICHIESTA} Importo : {IMPORTO}</div>
    <div>Riferimenti :{INFOCLIENTE}</div>
    <div><strong>{NOTAUFFICIO} - {NOTAPRELIEVO}</strong></div>
</div>
<div class="w130p h95  rowDx">
    <div class="w120p h100 centraElemento">
        <img id="img.{CODICE}" name="switch" maxImg="1" nrImg="1" stile="rect" class="w100 mH115p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}', "", "rect", "230")}" datiImg="{DESCRIZIONE}<BR><b></b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\','hide',1,\'{CODICE}\','hidden','','','','','','hide','');" />
    </div>
</div>
</div>`;
var modalSoloVisione = `
    <div class="posTopA w100">
            <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx" style="margin-bottom:0px">
                <div id="cmdPDF" class="row marg10Sx w30p hide"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
                <span class="close" onclick="chiudiModalBox();">&times;</span>
                STORICO RESO
                </div>
                <!--<div class="clrBase h60p cel"></div>-->
                <div id="caption" class="marg10Bottom marg5Top fasciaIntestazione testoTroncato h100p">
                     
                </div>
                </div>
        <div class="posTopA150p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
            <div class="w100 row">
                <div class="row w35">
                    <div class="w100 hPiccolo testoNormale sx">Descrizione</div>
                    <div class="w100 hPiccolo testoNormale sx">Codice</div>
                </div>
                <div class="row w5 hPiccolo testoNormale cx">UM</div>
                <div class="row w10 hPiccolo testoNormale cx">Qu Richiesta</div>
                <div class="row w10 hPiccolo testoNormale cx">Qu Accettata</div>
                <div class="row w10 hPiccolo testoNormale cx">Qu DDT</div>
                <div class="row w10 hPiccolo testoNormale cx">Qu Resa</div>
                <div class="row w10 hPiccolo testoNormale cx">Importo</div>
                
            </div>
            <div class="w100">
            </div>    
        </div>
        <ul id="elencoDettagli" name="elencoDettagli" class="posTopA200p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="">
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
var elementiDettagliRichiestaResoSoloVisione = `
        <li id="{IDMOV}" name="{IDMOV}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom tableStyle h120p" onclick="">
            <div class="elementiGriglia w100 padTop5 testoNormale">
                <div class="w100 row">
                    <div class="w100 row">
                            <div class="row w35">
                                <div class="w100 hPiccolo testoNormale sx">{DESCRIZIONE}</div>
                                <div class="w100 hPiccolo testoNormale sx">{CODICE}</div>
                            </div>
                            <div class="row w5 hPiccolo testoNormale cx">{UM}</div>
                            <div class="row w10 hPiccolo testoNormale cx">{QURICHIESTA}</div>
                            <div class="row w10 hPiccolo testoNormale cx">{QUACCETTATA}</div>
                            <div class="row w10 hPiccolo testoNormale cx">{QUDDT}</div>
                            <div class="row w10 hPiccolo testoNormale cx">{QURESA}</div>
                            <div class="row w10 hPiccolo testoNormale cx">{IMPORTO}</div>
                        
                    </div>
                    <div class="w100 h20p">
                        <div class="w100 row">{NOTAUFFICIO} - {CAUSALERESO} Note : {DESCRIZIONEAGGIUNTIVA}</div>
                    </div>   
                    <div class="w100 h20p clrTestoRosso">
                        {DOCRESO}
                    </div>
                </div>
            </div>
        </li>
        `;