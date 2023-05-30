var modalECDocumenti=`<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        <div id="cmdPDF" class="row marg10Sx w30p"><a href="#" title="Genera PDF" onclick="stampa()"><img class="imgPiccola30Dx marg5Top" src="img/bianche/pdf.svg" alt=""></a></div>    
        DETTAGLI DOCUMENTO
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    <!--<div class="clrBase h60p cel"></div>-->
    <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
</div>
<div class="posTopA125p intestazioneGriglie clrScuro w100-15p h30p padTop10 marg5Sx tableStyle">
    <div class="row w35 testoNormale cx">Descrizione</div>
    <div class="row w5 testoNormale cx">UM</div>
    <div class="row w15 testoNormale cx">Q.tà</div>
    <div class="row w25 testoNormale cx">Prezzo</div>
    <div class="row w20 testoNormale cx">Importo</div>
</div>
<ul id="elencoDettagli" name="elencoDettagli" class="posTopA170p posBottomA5p elencoR2 marg5Sx marg5Top w100-10p" onscroll="dettaglioOrdiniScroll(this)">
</ul>`;