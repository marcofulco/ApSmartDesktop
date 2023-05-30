var elementiListaUtenti=`<li>
    <div class="elencoR3div">
        <div class="row w100-90p">
            <a id="{ID}" name="lc{ID}" href="#" target="_self">{descrizione1} <span class="testoNormale">({ID})</span>
                <br>
                <span class="normale">{descrizione2}</span>
            </a>
        </div>
        <div class="row w90p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/edit.svg" onclick="apriConfigurazione(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/delete.svg" onclick="eliminaConfigurazione(this,'{ID}',\`{descrizione1}\`);">
        </div>
    </div>
</li>`;