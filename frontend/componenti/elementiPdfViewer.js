var elementiPdfViewer='<div id="w100 intestazioneGriglie">\
    <div id="divPulsantieraPDF" class="pulsantiera">\
        <a id="prevFile" href="#" class="pulsantieraPDF w14" title="Immagine Precedente" onclick="onPrevFile()"><img src="img/bianche/back.svg"/></a>\
        <a id="lblPage" href="#" class="pulsantieraPDF w14"><div class="row w100 normale marg10Top"><div class="row w33 dx" id="file_num"></div><div class="row w34 cx">/</div><div class="row w33 sx" id="file_count"></div></div></a>\
        <a id="nextFile" href="#" class="pulsantieraPDF w14" title="Immagine Successiva" onclick="onNextFile()"><img src="img/bianche/forward.svg" /></a>\
        <a id="cmdEMail" href="#" class="pulsantieraPDF w14" title="Invia Copia Tramite e-Mail" onclick="pdfInviaEMail()"><img src="img/bianche/mail.svg" /></a>\
        <a id="cmdWhatsApp" href="#" class="pulsantieraPDF w14" title="Invia Copia Tramite WhatsApp" onclick="pdfWhatsAppFile()"><img src="img/bianche/whatsapp.svg" /></a>\
        <a id="cmdDownload" href="#" class="pulsantieraPDF w14" title="Scarica File" onClick="pdfDownloadFile()"><img src="img/bianche/download.svg" /></a>\
        <a id="cmdEliminaPDF" href="#" class="pulsantieraPDF w14 hide" title="Elimina Immagine" onClick="pdfElimina()"><img src="img/bianche/cestino.svg" /></a>\
        <a id="cmdChiudi" href="#" class="pulsantieraPDF w14" title="Chiudi" onclick="chiudiPDFViewer();"><img src="img/bianche/annulla.svg" /></a>\
    </div>\
</div>\
<div id="divPdfContainer">\
    <div id="pdfContainer" class="posTop60px clrBianco h100vh-60p w100 scrool">\
        <canvas id="pdfBox"></canvas>\
    </div>\
    <div class="w60 h40p posLeft20 posBottomA60p zIndex2">\
        <div class="pulsantieraPiccola">\
            <a id="prev" href="#" class="w15" title="Riduci Dimensione" onclick="pdfZoom(\'out\')"><img src="img/bianche/ZoomOut.svg"/></a>\
            <a id="prev" href="#" class="w20" title="Immagine Precedente" onclick="pdfOnPrevPage()"><img src="img/bianche/back.svg"/></a>\
            <a id="lblPage" href="#" class="w30"><div class="row w100 normale marg5Top"><div class="row w33 dx" id="page_num"></div><div class="row w34 cx">/</div><div class="row w33 sx" id="page_count"></div></div></a>\
            <a id="next" href="#" class="w20" title="Immagine Successiva" onclick="pdfOnNextPage()"><img src="img/bianche/forward.svg" /></a>\
            <a id="prev" href="#" class="w15" title="Aumenta Dimensione" onclick="pdfZoom(\'in\')"><img src="img/bianche/ZoomIn.svg"/></a>\
        </div>\
    </div>\
</div>\
<div id="divImgContainer" class="posTop60px clrBianco scrool h100" hidden>\
    <img id="imgBox" class="w100" src="" alt="">\
</div>';

var elementiPdfViewerFirma='<div id="w100 intestazioneGriglie">\
    <div class="pulsantiera">\
        <a id="prevFile" href="#" class="w12" title="Immagine Precedente" onclick="onPrevFile()"><img src="img/bianche/back.svg"/></a>\
        <a id="lblPage" href="#" class="w12"><div class="row w100 normale marg10Top"><div class="row w33 dx" id="file_num"></div><div class="row w34 cx">/</div><div class="row w33 sx" id="file_count"></div></div></a>\
        <a id="nextFile" href="#" class="w12" title="Immagine Successiva" onclick="onNextFile()"><img src="img/bianche/forward.svg" /></a>\
        <a id="cmdEMail" href="#" class="w12" title="Invia Copia Tramite e-Mail" onclick="pdfInviaEMail()"><img src="img/bianche/mail.svg" /></a>\
        <a id="cmdWhatsApp" href="#" class="w12" title="Invia Copia Tramite WhatsApp" onclick="pdfWhatsAppFile()"><img src="img/bianche/whatsapp.svg" /></a>\
        <a id="cmdDownload" href="#" class="w12" title="Scarica File" onClick="pdfDownloadFile()"><img src="img/bianche/download.svg" /></a>\
        <a id="cmdFirma" href="#" class="w12" title="Firma Documento" onClick="pdfFirma(this)"><img src="img/bianche/firma.svg" /></a>\
        <a id="cmdChiudi" href="#" class="w12" title="Chiudi" onclick="chiudiPDFViewer();"><img src="img/bianche/annulla.svg" /></a>\
    </div>\
</div>\
<div id="divPdfContainer">\
    <div id="pdfContainer" class="posTop60px clrBianco h100vh-60p w100 scrool">\
        <canvas id="pdfBox"></canvas>\
    </div>\
    <div class="w60 h40p posLeft20 posBottomA60p zIndex2">\
        <div class="pulsantieraPiccola">\
            <a id="prev" href="#" class="w15" title="Riduci Dimensione" onclick="pdfZoom(\'out\')"><img src="img/bianche/ZoomOut.svg"/></a>\
            <a id="prev" href="#" class="w20" title="Immagine Precedente" onclick="pdfOnPrevPage()"><img src="img/bianche/back.svg"/></a>\
            <a id="lblPage" href="#" class="w30"><div class="row w100 normale marg5Top"><div class="row w33 dx" id="page_num"></div><div class="row w34 cx">/</div><div class="row w33 sx" id="page_count"></div></div></a>\
            <a id="next" href="#" class="w20" title="Immagine Successiva" onclick="pdfOnNextPage()"><img src="img/bianche/forward.svg" /></a>\
            <a id="prev" href="#" class="w15" title="Aumenta Dimensione" onclick="pdfZoom(\'in\')"><img src="img/bianche/ZoomIn.svg"/></a>\
        </div>\
    </div>\
</div>\
<div id="divImgContainer" class="posTop60px clrBianco scrool h100" hidden>\
    <img id="imgBox" class="w100" src="" alt="">\
</div>';

var elementiPdfFirma=`<div  style="position:absolute;max-height:420px; bottom:105px; background-color:rgb(162 162 162 / 48%);z-index:9999;" id="divSignature">
    <div id="signature" style="max-height:420px;">
    </div>
    <div class="w100 centraElemento">
        <div class="pulsantieraPiccola w80 centraElemento">
            <div class="w33"> 
            <button onclick="inviaFirma();" class="w95 centraElemento pulsanteVeBa" id="btnInvioFirma">
                <img src="img/bianche/firma.svg">
            </button>
        </div>
            <div class="w33"> 
            <button onclick="$('#signature').jSignature('reset')" class="w95 centraElemento pulsanteVeBa">
                <img src="img/bianche/sweeping.svg">
            </button>
            </div>
            <div class="w33">
                <div class="has-float-label w95 centraElemento">
                    <select id="cmbTipoFirma" class="selectBox cx" onchange="slcFirma(this)")>
                    <option value="destinatario">Firma Destinatario</option>
                    <option value="vettore">Firma Vettore</option>
                    </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`