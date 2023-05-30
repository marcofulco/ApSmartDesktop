var alertHtml='<span class="close" onclick="chiudiModalAlert(``,`{callBack}`);">&times;</span>\
<div class="w100-15p marg5Sx h340p posCentro">\
    <img class="modalAlert-content" id="img1">\
    <div id="captionAlert" class="scrollY-Auto h100"></div>\
</div>';

var alertHtmlSiNo=`<span class="close" onclick="chiudiModalAlert();">&times;</span>
<div class="w100 h340p posCentro">
    <img class="modalAlert-content" id="img1">
    <div id="captionAlert" class="scrollY-Auto h100-60p"></div>
    <div class="posBottom pulsantiera testoGrassetto testo30 cx">
        <div id="cmdSi" name="cmdSi" class="w50 padTop10" onclick="{funzione}('Si','{ID}')">SI</div>
        <div id="cmdNo" name="cmdNo" class="w50 padTop10" onclick="{funzione}('No')">NO</div>
    </div>
</div>`;