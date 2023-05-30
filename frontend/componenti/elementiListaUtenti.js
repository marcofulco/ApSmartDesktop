var elementiListaUtenti=`<li>
    <div class="elencoR3div">
        <div class="row w100-200p">
            <a id="{ID}" name="lc{ID}" href="#" target="_self">{descrizione1} <span class="testoNormale">({ID})</span></a>
            <span class="row w100 normale testoTroncato1 h30p">{descrizione2}</span>
        </div>
        <div class="row w180p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/invio.svg" onclick="mailReset('{ID}',true)">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/mail.svg" onclick="mailReset('{ID}')">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/edit.svg" onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/delete.svg" onclick="eliminaUtente(this,'{ID}',\`{descrizione1}\`);">
            <div class="row cx w100 marg5Top">
                <a id="data.{ID}" name="data{ID}" href="#" target="_self" class="testo12">{ultimaAttivita}</a>
            </div>
        </div>
    </div>
</li>`;