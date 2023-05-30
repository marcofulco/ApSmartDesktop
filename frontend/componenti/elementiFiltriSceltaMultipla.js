var elementiFiltriSceltaMultipla='<li id="{tipo}.{ID}" class="h35p clrBase marg5Bottom">\
    <label for="chk{tipo}.{ID}" id="lbl{ID}" class="row w100 intestazione">\
        <div class="w100 padTop5">\
            <span class="row w100-70p testoTroncato1">{descrizione1}</span>\
            <input id="chk{tipo}.{ID}" name="{ID}" type="checkbox" class="rowDx w25p h25p clrSfumatoChiaro marg10Dx toggle-button" onchange="listaDaSceltaMultipla(\'{tipo}\',{ID})">\
        </div>\
    </label>\
</li>';