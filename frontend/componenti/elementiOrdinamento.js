var elementiOrdinamento='<li class="h40p clrBase marg5Bottom">\
    <label for="chk{descrizione1}" id="lbl{ID}" class="row w100-65p intestazione">\
        <div class="w100 padTop5">\
            <div class="row w100-30p testoTroncato1" title="{descrizione1}">{descrizione1}</div>\
            <div class="rowDx"><img id="img{descrizione1}" src="img/bianche/sort.svg"></div>\
            <input id="chk{descrizione1}" type="checkbox" class="rowDx w40p h40p hide clrSfumatoChiaro marg10Dx" onchange="aggiungiOrdinamento(this,\'{descrizione1}\',\'chkZA{descrizione1}\',\'{descrizione1} DESC\',\'img{descrizione1}\',\'\')">\
        </div>\
    </label>\
    <label for="chkZA{descrizione1}" id="lbl{ID}" class="row w50p intestazione">\
        <div class="w100 padTop5">\
            <div class="rowDx"><img id="imgZA{descrizione1}" src="img/bianche/sortZA.svg"></div>\
            <input id="chkZA{descrizione1}" type="checkbox" class="rowDx w40p h40p hide clrSfumatoChiaro marg10Dx"\
             onchange="aggiungiOrdinamento(this,\'{descrizione1} DESC\',\'chk{descrizione1}\',\'{descrizione1}\',\'imgZA{descrizione1}\',\'ZA\')">\
        </div>\
    </label>\
</li>';