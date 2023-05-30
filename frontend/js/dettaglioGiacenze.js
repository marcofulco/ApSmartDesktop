var elementoTestaElencoDettaglioGiacenza=`
<div class="row w100 h30p marg1Top clrScuro centraVerticalmente testoNormale">
    <div class="w100-180p  row">Deposito</div>
    <div class="w60p row ">Giac.</div>
    <div class="w60p row ">Disp.</div>
    <div class="w60p row ">In Arrivo</div>
    <span class="closeCustom rowDx cursoreBtn" onclick="chiudiModalCustom()">×</span>
    
</div>
`;
var elementoRigaDettaglioGiacenza=`
<div class="row w100 h50p clrSfumatoScuro centraVerticalmente marg5Top testoNormale cursoreBtn" onclick="apriDettaglioGiacenzaDeposito('{AZIENDA}','{IDDEPOSITO}','{CODICE}','{GIACENZA}')">
    <div class="w100-180p row" style="padding-left:5px">{DESCRIZIONEDEPOSITO}</div>
    <div class="w60p row dx">{GIACENZA}</div>
    <div class="w60p row dx">{DISP}</div>
    <div class="w60p row cx">{DISPPRES}</div>
</div>
`;
var elementoDettaglioGiacenzaDeposito=`
<div class="row w100 h40p clrSfumatoScuro centraVerticalmente marg5Top testoNormale ">
    <div class="w100-60p row" style="padding-left:5px">{DESCRIZIONE}</div>
    <div class="w60p row">{GIACENZA}</div>
</div>
`;
var elementoRaggruppamentoDettaglioGiacenzaDeposito=`
<div class="row w100 centraVerticalmente clrScuro h40p">
    <h3>GIACENZA {RAGGRUPPAMENTO}</h3>
</div>
`;
var modalDettaglioGiacenzaDeposito=`<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        ELENCO GIACENZE DEPOSITO
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    <!--<div class="clrBase h60p cel"></div>-->
    
</div>
<div class="posTopA45p posBottomA10p w100 centraElemento">
    <ul id="elencoDettagli" name="elencoDettagli" class="elencoRubrica marg5Sx posTopA5p posBottomA w98">

    </ul>
    
</div>
<div class="pulsantiera posBottomA10p w100">
    <a id="cmdAddR" name="cmdAddR" href="#" class="w100" title="Aggiungi" onclick="chiudiModalBox();"><img src="img/bianche/annulla.svg"></a>
    </div>`;

query['ListaArticoli.html:dettaglioGiacenze']=new Array;
query['ListaArticoli.html:dettaglioGiacenze']['modalC-head']=elementoTestaElencoDettaglioGiacenza;
// query['ListaArticoli.html:dettaglioGiacenze']['modalC-body']=elementoTestaElencoDettaglioGiacenza;
query['ListaArticoli.html:dettaglioGiacenze']['modelloRiga']=elementoRigaDettaglioGiacenza
query['ListaArticoli.html:dettaglioGiacenze']['oggetti']=new Array;
query['ListaArticoli.html:dettaglioGiacenze']['oggetti']['{DISP}']={campo:"DISP", decimaliMax:2, decimaliMin:0};
query['ListaArticoli.html:dettaglioGiacenze']['oggetti']['{GIACENZA}']={campo:"GIACENZA", decimaliMax:2, decimaliMin:0};
query['ListaArticoli.html:dettaglioGiacenze']['oggetti']['{DISPPRES}']={campo:"DISPPRES", decimaliMax:2, decimaliMin:0};
query['ListaArticoli.html:dettaglioGiacenze']['oggetti']['{DESCRIZIONEDEPOSITO}']='DEPOSITO';
query['ListaArticoli.html:dettaglioGiacenze']['oggetti']['{IDDEPOSITO}']='IDDEPOSITO';
query['ListaArticoli.html:dettaglioGiacenze']['oggetti']['{AZIENDA}']='AZIENDA';
query['ListaArticoli.html:dettaglioGiacenze']['oggetti']['{CODICE}']='CODICE';

query['ListaArticoli.html:dettaglioGiacenzeDeposito']=new Array;
query['ListaArticoli.html:dettaglioGiacenzeDeposito']['modelloRiga']=elementoDettaglioGiacenzaDeposito;
query['ListaArticoli.html:dettaglioGiacenzeDeposito']['modelloRaggruppamento']=elementoRaggruppamentoDettaglioGiacenzaDeposito;
query['ListaArticoli.html:dettaglioGiacenzeDeposito']['modelloContenitore']=modalDettaglioGiacenzaDeposito;
query['ListaArticoli.html:dettaglioGiacenzeDeposito']['oggetti']=new Array;
query['ListaArticoli.html:dettaglioGiacenzeDeposito']['oggetti']['{DESCRIZIONE}']='DESCRIZIONE';
query['ListaArticoli.html:dettaglioGiacenzeDeposito']['oggetti']['{GIACENZA}']={campo:"GIACENZA", decimaliMax:2, decimaliMin:0};;
query['ListaArticoli.html:dettaglioGiacenzeDeposito']['oggetti']['{RAGGRUPPAMENTO}']="RAGGRUPPAMENTO";

function apriDettaglioGiacenzaDeposito(azienda,idDeposito,codiceArticolo,giacenza=0){
    if(Number(giacenza)!=0){
        parametri = {
            "tipoQuery": "dettaglioGiacenzaDeposito",
            "tipoRisposta": '',
            "nomeTabella": "dettaglioGiacenzaDeposito",
            "azienda":azienda,
            "idDeposito":idDeposito,
            "codiceArticolo":codiceArticolo
        };
        inviaRichiestaCentralino("multiQuery", parametri,(res)=>{
            var risp=JSON.parse(res);
            var error=risp.error;
            var risposta=risp.risposta;
            // console.log(risposta);
            if(error==''){
                if (risposta[0]==0){
                    return;
                } else {
                    apriModalDettagli('ListaArticoli.html:dettaglioGiacenzeDeposito','',risposta,0,true,'');
                    xRag='';//CHIEDERE SE VA BENE L'AZZERAMENTO DEL RAGGRUPPAMENTO OPPURE TROVARE NUOVA SOLUZIONE
                }
            }
        })
    }
}