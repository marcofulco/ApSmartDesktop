var elementiListaPagamenti=`<li>
    <a class="elencoR1">
    <div class="row w100-70p">
        <div id="{ID}" name="lc{ID}" class="row w85">{descrizione1}</div>
    </div>
    <div class="row w70p marg5Top">
        <div class="row w5p hidden">div</div>
        <img class="row w30p" src="img/bianche/edit.svg" onclick="apriSchedaPagamento('{ID}')">
        <div class="row w5p hidden">div</div>
        <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaSchedaPagamento(this,'{ID}',\`{descrizione1}\`);">
    </div>
    </a>
</li>`;