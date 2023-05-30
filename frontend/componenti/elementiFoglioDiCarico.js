
var modelloRigaFogliDiCarico=`
<div class="marg10Top clrSfumatoScuro h60p normale" >
    <div class="row w100-35p padSx5">
        <div class="testo16"><div class="row w70">{RAGIONESOCIALEVETTORE}</div><div class="row w30">{USERNAME}</div></div>
        <div class="testo14">
            <div class="row w40 cx">{DATAC}</div>
            <div class="row w30 cx">{NORDINI}</div>
            <div class="row w30 cx">{TOTPALLETS}</div>
            
        </div>
        <div class="testo14">{OPERATORE}</div>
    </div>
    <div class="row h100 centraVerticalmente">
        <img class="h30p cursoreBtn" src="img/bianche/info.svg" listaidtes="{LISTAIDTES}" idfoglio="{ID}" onclick="apriDettagliFoglioDiCarico('{LISTAIDTES}')">
    </div>
</div>`
var modelloRigaDettaglioFoglioDiCarico=`
    <div class="marg5Top w100 h50p normale testo14 {RIGADESCRITTIVA}" >
        <div class="w90 padSx4 clrSfumatoScuro h100 RowDx centraVerticalmente movimento-{IDTES}" style="justify-content:flex-start">
            <div class="row w15 hPiccolo">
                {CODICE}
            </div>
            <div class="row w45 hPiccolo">
                {DESCRIZIONE}
            </div>
            <div class="hGrande w60">
                <div>{CODICE}</diV>
                <div>{DESCRIZIONE}</diV>
            </div>
            <div class="row w20">
                {UM} : {QU}
            </div>
            <div class="row w20 cx" id="quEvasa-{IDMOV}" onclick="apriDettaglioLotti('{IDMOV}')">
                {TOTQULOTTI}
            </div>
            <div class="row w40p centraVerticalmente">
                <img class="rowDx w30p pulsanteFunzioneListaStatoOrdini cursoreBtn hide" src="img/bianche/checkVuoto.svg" onclick="" id="{IDMOV}">
            </div>
        </div>
    </div>
`;
var modelloRaggruppamentoDettaglioFoglioDiCarico=`
    <div class="marg5Top w100-4p h40p clrSfumatoScuro centraVerticalmente padSx4 normale testo16" style="justify-content:flex-start" id="ordine-{IDTES}" onclick="selezionaOrdineDaEvadere('{IDTES}',this)">
        <div class="row w30">
            {ORDINE}
        </div>
        <div class="row w40">
            {RAGIONE_SOCIALE}
        </div>
        <div class="rowDx w30 centraVerticalmente" style="justify-content:flex-end;">
            <img class="rowDx w30p cursoreBtn padDx5 hide" src="" onclick="" id="stato-{IDTES}">
        </div>
    </div>
`;
var modalDettaglioFoglioDiCarico=`
<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        DETTAGLI FOGLIO DI CARICO
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    
</div>
<div class="posTopA45p posBottomA10p w100 centraElemento">
    <div class="fasciaIntestazione h60p posTopA5p">
        <div class="row w100-70p padSx5">
            <div class="h50">
                <div class="testo20 w30 row">Ordine</div>
                <div class="testo20 w50 row">Riferimento</div>
            </div>
            <div class="w95 padSx4 testo16 RowDx h50 centraVerticalmente" style="justify-content:flex-start">
                <div class="row w15 hPiccolo">
                    Codice
                </div>
                <div class="row w45 cx hPiccolo">
                    Descrizione
                </div>
                <div class="hGrande w60">
                    <div>Codice</div>
                    <div>Descrizione</div>
                </div>
                <div class="rowDx w35 dx">
                    UM : QU
                </div>
                <div class="w20 dx">
                    Evasa
                </div>
            </div>
        </div>
    </div>
    <div id="elencoDettagli" name="elencoDettagli" class="elencoRubrica marg5Sx posTopA65p posBottomA65p w100-5p" >

    </div>
    
</div>

<div class="pulsantiera posBottomA10p w100">
    <a id="cmdAvviaEvasione" href="#" class="w50 h65p" title="Avvia evasione" onclick="avviaEvasioneFoglioDiCarico()">
        <div class="w100 centraVerticalmente">
            <img src="img/bianche/forward.svg" style="height: 30px; width:30px; padding: 4px 0px 2px 0px;"/>
        </div>
        <div class="testoTroncato1 normale testoPulsantiera">
            Avvia Evasione
        </div>
    </a>
    <a id="cmdAvviaEvasione" href="#" class="w50 h65p" title="Avvia evasione" onclick="forzaChiusuraFoglioDiCarico('')">
        <div class="w100 centraVerticalmente">
            <img src="img/bianche/cestino.svg" style="height: 30px; width:30px; padding: 4px 0px 2px 0px;"/>
        </div>
        <div class="testoTroncato1 normale testoPulsantiera">
            Elimina
        </div>
    </a>
</div>`;