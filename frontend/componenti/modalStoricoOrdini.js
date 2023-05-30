if(xIdVettore>0 || parametriSO.emissioneDDT==1){
    var modalStoricoOrdini=`<div class="posTopA w100">
        <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
            DETTAGLI ORDINI EVASI
            <span class="close" onclick="chiudiModalBox();">&times;</span>
        </div>
        <!--<div class="clrBase h60p cel"></div>-->
            <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
        </div>
        <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
            <div class="row w35 hPiccolo testoNormale cx">Descrizione</div>
            <div class="row w5 hPiccolo testoNormale cx">UM</div>
            <div class="row w15 hPiccolo testoNormale cx">Ordinati</div>
            <div class="row w15 hPiccolo testoNormale cx">Tagliati</div>
            <div class="row w15 hPiccolo testoNormale cx">Evasi</div>
            <div class="row w100 hGrande">Descrizione</div>
            <div class="row w5 hGrande testoNormale cx">UM</div>
            <div class="row w20 hGrande testoNormale cx">Ordinati</div>
            <div class="row w25 hGrande testoNormale cx">Tagliati</div>
            <div class="row w30 hGrande testoNormale cx">Evasi</div>
        </div>
        <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
        </ul>`;
}else{
    var modalStoricoOrdini=`<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
        DETTAGLI ORDINI EVASI
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    <!--<div class="clrBase h60p cel"></div>-->
        <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
    </div>
    <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
        <div class="row w35 hPiccolo testoNormale cx">Descrizione</div>
        <div class="row w5 hPiccolo testoNormale cx">UM</div>
        <div class="row w15 hPiccolo testoNormale cx">Prezzo</div>
        <div class="row w15 hPiccolo testoNormale cx">Ordinati</div>
        <div class="row w15 hPiccolo testoNormale cx">Tagliati</div>
        <div class="row w15 hPiccolo testoNormale cx">Evasi</div>
        <div class="row w100 hGrande">Descrizione</div>
        <div class="row w5 hGrande testoNormale cx">UM</div>
        <div class="row w20 hGrande testoNormale cx">Prezzo</div>
        <div class="row w20 hGrande testoNormale cx">Ordinati</div>
        <div class="row w25 hGrande testoNormale cx">Tagliati</div>
        <div class="row w30 hGrande testoNormale cx">Evasi</div>
    </div>
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
    </ul>`;
}
if (parametriSO.noPrelevatoSuOrdini==0){ 
    var modalStoricoOrdiniDE=`<div class="posTopA w100">
        <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
            DETTAGLI ORDINI DA EVADERE
            <span class="close" onclick="chiudiModalBox();">&times;</span>
        </div>
    <!--<div class="clrBase h60p cel"></div>-->
        <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
    </div>
    <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
        <div class="row w35 hPiccolo testoNormale cx">Descrizione</div>
        <div class="row w5 hPiccolo testoNormale cx">UM</div>
        <div class="row w15 hPiccolo testoNormale cx">Prezzo</div>
        <div class="row w15 hPiccolo testoNormale cx">Ordinati</div>
        <div class="row w15 hPiccolo testoNormale cx">Tagliati</div>
        <div class="row w15 hPiccolo testoNormale cx">Prelevati</div>
        <div class="row w100 hGrande">Descrizione</div>
        <div class="row w5 hGrande testoNormale cx">UM</div>
        <div class="row w20 hGrande testoNormale cx">Prezzo</div>
        <div class="row w20 hGrande testoNormale cx">Ordinati</div>
        <div class="row w25 hGrande testoNormale cx">Tagliati</div>
        <div class="row w30 hGrande testoNormale cx">Prelevati</div>
    </div>
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
    </ul>`;
} else if(xIdVettore>0 || parametriSO.emissioneDDT==1){
    var modalStoricoOrdiniDE=`<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
        DETTAGLI ORDINI DA EVADERE
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    <!--<div class="clrBase h60p cel"></div>-->
        <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
    </div>
    <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
        <div class="row w100 hGrande">Descrizione</div>
        <div class="row w10 hGrande testoNormale cx">UM</div>
        <div class="row w25 hGrande testoNormale cx">Ordinati</div>
        <div class="row w25 hGrande testoNormale cx">Tagliati</div>
        <div class="row w25 hGrande testoNormale cx">Prelevati</div>
        

        <div class="row w35 hPiccolo testoNormale cx">Descrizione</div>
        <div class="row w5 hPiccolo testoNormale cx">UM</div>
        <div class="row w15 hPiccolo testoNormale cx">Ordinati</div>
        <div class="row w15 hPiccolo testoNormale cx">Tagliati</div>
        <div class="row w15 hPiccolo testoNormale cx">Prelevati</div>
        
    </div>
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA60p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
    </ul>
    <button class="w100 h60p posBottomA5p pulsanteVeBa intestazione" onclick="inizioEvasioneOrdineVettoreGestLotti('{IDTES}')" id="btnModalEvasioneOrdineVettore">
        Inizia Evasione
    </button>`;
}
    else {
    var modalStoricoOrdiniDE=`<div class="posTopA w100">
        <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
            DETTAGLI ORDINI DA EVADERE
            <span class="close" onclick="chiudiModalBox();">&times;</span>
        </div>
    <!--<div class="clrBase h60p cel"></div>-->
        <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
    </div>
    <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
        <div class="row w35 hPiccolo testoNormale cx">Descrizione</div>
        <div class="row w5 hPiccolo testoNormale cx">UM</div>
        <div class="row w20 hPiccolo testoNormale cx">Prezzo</div>
        <div class="row w20 hPiccolo testoNormale cx">Ordinati</div>
        <div class="row w20 hPiccolo testoNormale cx">Tagliati</div>
        <div class="row w100 hGrande">Descrizione</div>
        <div class="row w5 hGrande testoNormale cx">UM</div>
        <div class="row w30 hGrande testoNormale cx">Prezzo</div>
        <div class="row w30 hGrande testoNormale cx">Ordinati</div>
        <div class="row w35 hGrande testoNormale cx">Tagliati</div>
    </div>
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
    </ul>`;
}

if (parametriSO.modificheFerrara==1){
    var modalStoricoOrdiniPE=`<div class="posTopA w100">
        <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>    
            DETTAGLI ORDINI PARZ. EVASI
            <span class="close" onclick="chiudiModalBox();">&times;</span>
        </div>
    <!--<div class="clrBase h60p cel"></div>-->
        <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
    </div>
    <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
        <div class="row w35 hPiccolo testoNormale cx">Descrizione</div>
        <div class="row w5 hPiccolo testoNormale cx">UM</div>
        <div class="row w20 hPiccolo testoNormale cx">Ordinati</div>
        <div class="row w20 hPiccolo testoNormale cx">Evasi</div>
        <div class="row w20 hPiccolo testoNormale cx">da Evadere</div>
        <div class="row w100 hGrande">Descrizione</div>
        <div class="row w10 hGrande testoNormale cx">UM</div>
        <div class="row w25 hGrande testoNormale cx">Ordinati</div>
        <div class="row w30 hGrande testoNormale cx">Evasi</div>
        <div class="row w35 hGrande testoNormale cx">da Evadere</div>
    </div>
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
    </ul>`;
} else {
    var modalStoricoOrdiniPE=`<div class="posTopA w100">
        <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
            <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>    
            DETTAGLI ORDINI`;
            
    if (xIdCliente==0){
        modalStoricoOrdiniPE+=`PARZ. EVASI`;
    }
            
    modalStoricoOrdiniPE+=`<span class="close" onclick="chiudiModalBox();">&times;</span>
        </div>
    <!--<div class="clrBase h60p cel"></div>-->
        <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
    </div>
    <div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
        <div class="row w35 hPiccolo testoNormale cx">Descrizione</div>
        <div class="row w5 hPiccolo testoNormale cx">UM</div>
        <div class="row w15 hPiccolo testoNormale cx">Prezzo</div>
        <div class="row w15 hPiccolo testoNormale cx">Ordinati</div>
        <div class="row w15 hPiccolo testoNormale cx">Evasi</div>
        <div class="row w15 hPiccolo testoNormale cx">da Evadere</div>
        <div class="row w100 hGrande">Descrizione</div>
        <div class="row w5 hGrande testoNormale cx">UM</div>
        <div class="row w20 hGrande testoNormale cx">Prezzo</div>
        <div class="row w20 hGrande testoNormale cx">Ordinati</div>
        <div class="row w25 hGrande testoNormale cx">Evasi</div>
        <div class="row w30 hGrande testoNormale cx">da Evadere</div>
    </div>
    <ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
    </ul>`;
}

var modalStoricoPreOrdini=`<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>
        DETTAGLI PREORDINI
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    <!--<div class="clrBase h60p cel"></div>-->
    <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
</div>
<div class="posTopA125p intestazioneGriglie clrScuro w100 h30p padTop5 padBot10 tableStyle">
    <div class="row w50 hPiccolo testoNormale cx">Descrizione</div>
    <div class="row w5 hPiccolo testoNormale cx">UM</div>
    <div class="row w15 hPiccolo testoNormale cx">Prezzo</div>
    <div class="row w30 hPiccolo testoNormale cx">Ordinati</div>
    <div class="row w100 hGrande">Descrizione</div>
    <div class="row w5 hGrande testoNormale cx">UM</div>
    <div class="row w45 hGrande testoNormale cx">Prezzo</div>
    <div class="row w40 hGrande testoNormale cx">Ordinati</div>
</div>
<ul id="elencoDettagli" name="elencoDettagli" class="posTopA175p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
</ul>`;