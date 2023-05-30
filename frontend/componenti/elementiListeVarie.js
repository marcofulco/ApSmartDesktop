var elementiListeVarieCodiciIva=`<li>
    <a class="elencoR1">
        <div class="row w100-70p">
            <div id="{ID}" name="lc{ID}" class="row w85">{descrizione1}</div>
            <div class="row w15 cx">{descrizione2}%</div>
        </div>
        <div class="row w70p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaSchedaCliente(this,'{ID}',\`{descrizione1}\`);">
        </div>
    </a>
</li>`;

var elementiListeVarieContratti=`<li>
    <a class="elencoR1">
        <div class="row w100-70p">
            <div id="{ID}" name="lc{ID}" class="row col6">{descrizione1}</div>
            <div class="row col2 cx">{DADATA}</div>
            <div class="row col2 cx">{ADATA}</div>
        </div>
        <div class="row w70p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaSchedaCliente(this,'{ID}',\`{descrizione1}\`);">
        </div>
    </a>
</li>`;

var elementiListeVarieFamiglieArticoli=`<li>
    <a class="elencoR1">
        <div class="row w100-70p">
            <div id="{ID}" name="lc{ID}" class="row w85">{descrizione1}</div>
        </div>
        <div class="row w70p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaSchedaCliente(this,'{ID}',\`{descrizione1}\`);">
        </div>
    </a>
</li>`;

var elementiListeVarieTipologieArticoli=`<li>
    <a class="elencoR1">
        <div class="row w100-70p">
            <div id="{ID}" name="lc{ID}" class="row w85">{descrizione1}</div>
            <div class="row w15 cx">{descrizione2}</div>
        </div>
        <div class="row w70p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaSchedaCliente(this,'{ID}',\`{descrizione1}\`);">
        </div>
    </a>
</li>`;


var elementiListeVarieDescrizione=`<li>
    <a class="elencoR1">
        <div class="row w100-70p">
            <div id="{ID}" name="lc{ID}" class="row w85">{descrizione1}</div>
        </div>
        <div class="row w70p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaSchedaCliente(this,'{ID}',\`{descrizione1}\`);">
        </div>
    </a>
</li>`;

var elementiListeVarie2Righe=`<li>
    <a class="elencoR1">
        <div class="row w100-70p">
            <div id="{ID}" name="lc{ID}" class="row w85">{descrizione1}</div>
            <br>
            <div class="row w15">{descrizione2}</div>
        </div>
        <div class="row w70p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaSchedaCliente(this,'{ID}',\`{descrizione1}\`);">
        </div>
    </a>
</li>`;
var elementiListeVarieContrattiB2B=`<li>
    <a class="elencoR1">
        <div class="row w100-70p">
            <div id="{ID}" name="lc{ID}" class="row col6">{descrizione1}</div>
            <div class="row col2 cx">{DATADA}</div>
            <div class="row col2 cx">{DATAA}</div>
        </div>
        <div class="row w70p marg5Top">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/edit.svg" onclick="apriSchedaCliente(this,'{ID}',\`{descrizione1}\`)">
            <div class="row w5p hidden">div</div>
            <img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaSchedaCliente(this,'{ID}',\`{descrizione1}\`);">
        </div>
    </a>
</li>`;