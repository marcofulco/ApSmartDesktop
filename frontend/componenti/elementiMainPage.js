var elementiMenuGruppo=`<a class="accordion" href="#" onClick="apriChiudiAccordion(this);">{DESCRIZIONE}</a>`;

var elementiMenu=`<li class="padBot0" id="{NOMELI}">
    <a id="{NOMEMENU}" href="#" onclick="avviaDaMenu(this)">
        <img class="row h30p w30p" src="img/bianche/{ICONA}" />
        <span class="row w100-35p padSx5 testoTroncato1">{DESCRIZIONE}</span> 							
    </a>
</li>`;

var elementiPulsantiera=`<a href="#" class="w20"  title="{DESCRIZIONE}" onclick="avviaDaMenu(document.getElementById('{NOMEMENU}'))"><img src="img/bianche/{ICONA}" /></a>`;

var elementiPulsantieraConDescrizione=`<a href="#" class="w25 clrBase" style="height:65px" title="{DESCRIZIONE}" onclick="avviaDaMenu(document.getElementById('{NOMEMENU}'))">
    <div class="h100 clrBase " style="border-radius: .25em;">
        <img src="img/bianche/{ICONA}" style="height: 30px; width:30px; padding: 4px 0px 2px 0px;" />
        <div style="" class="testoTroncato1 normale testoPulsantiera">
            {DESCRIZIONE}
        </div>
    </div>
</a>`;

var elementiPulsanti=`<div class="row w50 h190p">
<button id="{NOMEMENU}" class="row w100-10p h100-10p pulsante clrTestoBianco clrContorno marg5" title="{DESCRIZIONE}" onclick="avviaDaMenu(this)">
    <div class="row w100">
        <img class="row w70p posLeftCentro" src="img/bianche/{ICONA}"/>	
    </div>
    <div class="row w100 marg20Top">{DESCRIZIONE}</div>
</button>
</div>`;