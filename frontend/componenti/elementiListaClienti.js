var elementiListaClienti=`<li onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
    <div class="elencoR3div">
        <div class="row w65">
            <a id="{ID}" name="lc{ID}" href="#" target="_self">{descrizione1}
                <br>
                <span class="normale">{descrizione2}</span>
            </a>
        </div>
        <div class="row w25 dx marg10top"><a href="#">${parametriNC.nascondiSaldo==1 ? '':'{SALDO}'}</a></div>
        <div class="row w10 marg10top"><img src="img/bianche/forward.svg"></div>
    </div>
</li>`;
