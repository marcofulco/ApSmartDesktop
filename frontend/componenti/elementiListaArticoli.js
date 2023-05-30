var elementiInArrivo='<li id="{ID}" name="{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom">\
	<div class="elementiGriglia w100">\
		<div class="row w40 testoNormale cx {MARGINE}">{DATACONSEGNA}</div>\
		<div class="row w10 testoNormale cx {MARGINE}">{UM}</div>\
		<div class="row w20 testoNormale dx {MARGINE}">{QU}</div>\
	</div>\
</li>';

var elementiListaArticoli=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSub clrBianco testoNero elementiGriglia marg5Bottom" style="{hLi}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="FASCIAPROV.{CODICE}" class="hide">{PROVVIGIONE}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-2p hPanelArticoli" style="{hContainer}">
        <div class="elementiGriglia marg5Bottom w40">
            <div class="blocco w100">
                <label id="lblQu{ID}" class="elementiSovrapposti zIndex2 clrBianco intestazione w60p cx hidden padDx5"></label>
                <div class="elementiSovrapposti pos-24">
                    <img id="img.{CODICE}" class="w100 mH135p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}',"","rect","230")}" datiImg="{DESCRIZIONE}<BR><b>{SKTECNICA}</b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\');" />
                </div>
            </div>
        </div>
        <div class="elementiGriglia marg5Bottom h10p w5p"></div>
        <div class="elementiGriglia marg5Bottom w60-5p">
            <div>
                <div class="blocco">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="blocco w100 testoGrassetto padTop6 h60p"><span class="h60p testoTroncato">{DESCRIZIONE}</span></div>
                    </div>
                </div>
                <div id="codice.{CODICE}" class="blocco w100 testoNormale clrTestoRosso">{CODICE}</div>
                <div class="blocco">
                    <div class="row w100">
                        <div id="desQuUnitaria.{CODICE}" class="row w40 testoGrassetto">Conf. da</div>
                        <div class="row w15 testoNormale">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row w45 testoNormale">{QUUNITARIA}</div>
                    </div>
                </div>
                <div class="blocco">
                    <div class="row w100">
                        <div class="row w40 testoGrassetto" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div>
                        <div class="row w15 testoNormale">{UM}</div>
                        <div class="row w45 testoNormale">{DISP}</div>
                    </div>
                </div>
                <div class="blocco">
                    <div class="row w100">
                        <div id="desOrd.{CODICE}" class="row w40 testoGrassetto">In Arrivo</div>
                        <div id="UMOrd.{CODICE}" class="row w15 testoNormale">{UM}</div>
                        <div id="ord.{CODICE}" class="row w45 testoNormale">{ORDINATO}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="elementiGriglia w100-5p pos-24">
            <div class="row w20 cel">
                <div class="row w65 testoNormale">{DESSCONTO}</div>
                <div id="sconti.{CODICE}" class="row w35 dx testoNormale">{SC1}</div>
            </div>
            <div id="listino.{CODICE}" class="row w40 testoNormale testoTagliato dx testo20 cel">{PREZZO}</div>
            <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="row w40 testoGrassetto dx testo20">{SCONTATO}</div>
        </div>
        <div class="w100 posBottomA5p">
            <div class="pulsantieraPiccola">
                <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\'{CODICE}\',\'{DESCRIZIONE}\');"><img src="img/bianche/statistics.svg" /></a>
                <a href="#" id="cmdM{ID}" codice="{ID}" class="w20 hidden" onclick="rimuoviCarrello(this);"><img src="img/bianche/minus.svg" /></a>
                <a href="#" id="cmdP{ID}" codice="{ID}" class="w20" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                <a href="#" class="w20"><img src="img/bianche/edit.svg" /></a>
                <a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>
            </div>
        </div>
    </div>
</li>`;

var elementiListaArticoliNoPulsantiera=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubNP clrBianco testoNero elementiGriglia marg5Bottom" style="{hLiNP}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-2p hPanelArticoliNP" style="{hContainerNP}">
        <div class="elementiGriglia marg5Bottom w40">
            <div class="blocco w100">
                <label id="lblQu{ID}" class="elementiSovrapposti zIndex2 clrBianco intestazione w60p cx hidden padDx5"></label>
                <div class="elementiSovrapposti pos-24">
                    <img id="img.{CODICE}" class="w100 mH135p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}',"","rect","230")}" datiImg="{DESCRIZIONE}<BR><b>{SKTECNICA}</b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\');" />
                </div>
            </div>
        </div>
        <div class="elementiGriglia marg5Bottom h10p w5p"></div>
        <div class="elementiGriglia marg5Bottom w60-5p">
            <div>
                <div class="blocco">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="blocco w100 testoGrassetto padTop6 h60p"><span class="h60p testoTroncato">{DESCRIZIONE}</span></div>
                    </div>
                </div>
                <div id="codice.{CODICE}" class="blocco w100 testoNormale clrTestoRosso">{CODICE}</div>
                <div class="blocco">
                    <div class="row w100">
                        <div id="desQuUnitaria.{CODICE}" class="row w40 testoGrassetto">Conf. da</div>
                        <div class="row w15 testoNormale">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row w45 testoNormale">{QUUNITARIA}</div>
                    </div>
                </div>
                <div class="blocco">
                    <div class="row w100">
                        <div class="row w40 testoGrassetto" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div>
                        <div class="row w15 testoNormale">{UM}</div>
                        <div class="row w45 testoNormale">{DISP}</div>
                    </div>
                </div>
                <div class="blocco">
                    <div class="row w100">
                        <div id="desOrd.{CODICE}" class="row w40 testoGrassetto">In Arrivo</div>
                        <div id="UMOrd.{CODICE}" class="row w15 testoNormale">{UM}</div>
                        <div id="ord.{CODICE}" class="row w45 testoNormale">{ORDINATO}</div>
                    </div>
                </div>
                <div class="blocco">
                    <div class="row w100">
                        <div class="row w50 testoGrassetto">{DESSCONTO}</div>
                        <div class="row w5 testoGrassetto"></div>
                        <div id="sconti.{CODICE}" class="row w40 testoNormale">{SC1}</div>
                    </div>
                </div>
                <div class="blocco h10p"> </div>
                <div id="listino.{CODICE}" class="blocco w100 testoNormale testoTagliato cx testo20">{PREZZO}</div>
                <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="blocco w100 testoGrassetto cx testo20">{SCONTATO}</div>
            </div>
        </div>
        <div class="elementiGriglia marg5Bottom w100 hide">
            <div class="pulsantieraPiccola">
                <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\'{CODICE}\',\'{DESCRIZIONE}\');"><img src="img/bianche/statistics.svg" /></a>
                <a href="#" id="cmdM{ID}" codice="{ID}" class="w20 hidden" onclick="rimuoviCarrello(this);"><img src="img/bianche/minus.svg" /></a>
                <a href="#" id="cmdP{ID}" codice="{ID}" class="w20" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                <a href="#" class="w20"><img src="img/bianche/edit.svg" /></a>
                <a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>
            </div>
        </div>
    </div>
</li>`;

var elementiListaArticoliLight=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubLight clrBianco testoNero elementiGriglia marg5Bottom" style="{hLi}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-2p hPanelArticoliLight" style="{hContainer}">
        <div class="elementiGriglia marg5Bottom w100-5p">
            <div>
                <div class="blocco">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="blocco w100 testoGrassetto padTop6 h{hDescrizione}p"><span class="h{hDescrizione}p testoTroncato">{DESCRIZIONE}</span></div>
                    </div>
                </div>
                <div class="hide">
                    <div class="row w100">
                        <div id="desQuUnitaria.{CODICE}" class="row w40 testoGrassetto">Conf. da</div>
                        <div class="row w16 testoNormale">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row w45 testoNormale">{QUUNITARIA}</div>
                    </div>
                </div>
                <div class="blocco">
                    <div id="codice.{CODICE}" class="row w50 testoNormale clrTestoRosso">{CODICE}</div>
                    <div class="row w50">                       
                        <div class="rowDx testoNormale">{DISP}</div>
                        <div class="rowDx w15 testoNormale">{UM}</div>
                        <div class="rowDx w30 testoNormale" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div>
                    </div>
                </div>
                <div class="blocco hide">
                    <div class="row w100">
                        <div class="row w50 testoGrassetto">{DESSCONTO}</div>
                        <div class="row w5 testoGrassetto"></div>
                        <div id="sconti.{CODICE}" class="row w40 testoNormale">{SC1}</div>
                    </div>
                </div>
                <div class="blocco h10p hide"> </div>
                <div id="listino.{CODICE}" class="blocco w100 testoNormale testoTagliato cx testo20 hide">{PREZZO}</div>
                <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="row w45 testoGrassetto sx testo20">{SCONTATO}+iva</div>
                <div id="costo.{CODICE}" tag="{costo}" class="row w10 testoGrassetto sx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}','hidden')">{COSTO}</div>
                <div id="prezzoNettoII.{CODICE}" tag="{przNettoII}" class="row w45 testoGrassetto dx testo20" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATOII} i.c.</div>
            </div>
        </div>
        <div id="pulsantiera{ID}" name="pulsantiera" class="elementiGriglia marg5Bottom w100">
            <label id="lblQu{ID}" class="elementiSovrapposti zIndex2 clrBianco intestazione w60p cx hidden padDx5"></label>
            <div class="pulsantieraPiccola">
                <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\'{CODICE}\',\'{DESCRIZIONE}\');"><img src="img/bianche/statistics.svg" /></a>
                <a href="#" id="cmdM{ID}" codice="{ID}" class="w20 hidden" onclick="rimuoviCarrello(this);"><img src="img/bianche/minus.svg" /></a>
                <a href="#" id="cmdP{ID}" codice="{ID}" class="w20" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                <a href="#" class="w20"><img src="img/bianche/edit.svg" /></a>
                <a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>
            </div>
        </div>
    </div>
</li>`;

var elementiListaArticoliLightNoPulsantiera=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubLightNP clrBianco testoNero elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-2p hPanelArticoliLightNP" style="{hContainerNP}">
        <div class="elementiGriglia marg5Bottom w100-5p">
            <div>
                <div class="blocco">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="blocco w100 testoGrassetto padTop6 h{hDescrizione}p"><span class="h{hDescrizione}p testoTroncato">{DESCRIZIONE}</span></div>
                    </div>
                </div>
                <div class="hide">
                    <div class="row w100">
                        <div id="desQuUnitaria.{CODICE}" class="row w40 testoGrassetto">Conf. da</div>
                        <div class="row w16 testoNormale">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row w45 testoNormale">{QUUNITARIA}</div>
                    </div>
                </div>
                <div class="blocco">
                    <div id="codice.{CODICE}" class="row w50 testoNormale clrTestoRosso">{CODICE}</div>
                    <div class="row w50">                       
                        <div class="rowDx testoNormale">{DISP}</div>
                        <div class="rowDx w15 testoNormale">{UM}</div>
                        <div class="rowDx w30 testoNormale" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div>
                    </div>
                </div>
                <div class="blocco hide">
                    <div class="row w100">
                        <div class="row w50 testoGrassetto">{DESSCONTO}</div>
                        <div class="row w5 testoGrassetto"></div>
                        <div id="sconti.{CODICE}" class="row w40 testoNormale">{SC1}</div>
                    </div>
                </div>
                <div class="blocco h10p hide"> </div>
                <div id="listino.{CODICE}" class="blocco w100 testoNormale testoTagliato cx testo20 hide">{PREZZO}</div>
                <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="row w45 testoGrassetto sx testo20">{SCONTATO}+iva</div>
                <div id="costo.{CODICE}" tag="{costo}" class="row w10 testoGrassetto sx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}','hidden')">{COSTO}</div>
                <div id="prezzoNettoII.{CODICE}" tag="{przNettoII}" class="row w45 testoGrassetto dx testo20" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATOII} i.c.</div>
            </div>
        </div>
        <div id="pulsantiera{ID}" name="pulsantiera" class="elementiGriglia marg5Bottom w100 hide">
            <label id="lblQu{ID}" class="elementiSovrapposti zIndex2 clrBianco intestazione w60p cx hidden padDx5"></label>
            <div class="pulsantieraPiccola">
                <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\'{CODICE}\',\'{DESCRIZIONE}\');"><img src="img/bianche/statistics.svg" /></a>
                <a href="#" id="cmdM{ID}" codice="{ID}" class="w20 hidden" onclick="rimuoviCarrello(this);"><img src="img/bianche/minus.svg" /></a>
                <a href="#" id="cmdP{ID}" codice="{ID}" class="w20" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                <a href="#" class="w20"><img src="img/bianche/edit.svg" /></a>
                <a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>
            </div>
        </div>
    </div>
</li>`;

var elementiListaArticoliLightGuajanaNP=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubLightGNP clrBianco testoNero elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="SOLORIVENDITORI.{CODICE}" class="hide">{SOLORIVENDITORI}</div>
    <div id="SCALA.{CODICE}" class="hide">{SCALA}</div>
    <div id="PREZZONETTOORIG.{CODICE}" class="hide">{przNetto}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="percImg.{CODICE}" class="hide">{IMMAGINE}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="FASCIAPROV.{CODICE}" class="hide">{PROVVIGIONE}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-4p hPanelArticoliLightGNP padSx2" style="{hContainerNP}">
        <div class="elementiGriglia marg5Bottom w100-5p">
            <div>
                <div class="row w100">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="row w100-115p testoGrassetto padTop6 h{hDescrizione}p">
                            <span class="h{hDescrizione}p testoTroncato w100-5p">
                                {DESCRIZIONE}
                            </span>
                        </div>
                        <div class="row w115p">
                            <label id="lblQu{ID}" class="posTopA marg1Top posRightA zIndex2 clrBianco clrTestoRosso intestazione hidden"></label>
                            <div class="posTopA w115p">
                                <img id="img.{CODICE}" name="switch" maxImg="{NRIMG}" nrImg="1" stile="rect" actualImg="{IMMAGINE}" class="w100 mH115p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}',"","rect","230")}" datiImg="{DESCRIZIONE}<BR><b>{SKTECNICA}</b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\',\'{hideMultiImg}\',{NRIMG},\'{CODICE}\',\'{HIDDENALLEGATOTECNICO}\',\'{ALLEGATIWEB}\',\'{CODICEFORN}\',\`{CAR1}\`,\`{CAR2}\`,\`{CAR3}\`,\'{HIDEOPZIONI}\',\`{LINKRAGGRUPPAMENTO}\`,\`{IMGTIPO}\`);" />
                            </div>
                            <!--<img class="posTopA90p w20p zIndex2 {hideMultiImg}" src="img/rosse/back.svg" onclick="cambiaImmagineMouse('{CODICE}',-1)"/>-->
                            <!--<div id="sw.{CODICE}" class="posTopA90p posLeftA20p w75P clrTestoRosso testoGrassetto cx zIndex2 {hideMultiImg}">1/{NRIMG}</div>-->
                            <!--<img class="posTopA90p posRightA10p w20p zIndex2 {hideMultiImg}" src="img/rosse/forward.svg" onclick="cambiaImmagineMouse('{CODICE}',1)"/>-->
                            <img class="posTopA90p posRightA10p w30p zIndex2 {hideMultiImg}" src="img/grafiche/photo-gallery.svg"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex2 {nuovo}" src="img/grafiche/nuovo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex3 {INELIMINAZIONE}" src="img/grafiche/stock.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDEPROMO}" src="img/grafiche/promo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDENETTO}" src="img/grafiche/netto.png?ver=1.1"/>
                        </div>
                    </div>
                </div>
                <div class="row w100-115p testoTroncato1 h20p">
                    <div id="codice.{CODICE}" class="row w75 testoNormale clrTestoRosso">{CODICE} <span class="testoNormale clrTestoNero">- {CODICEFORN}</span></div>
                </div>
                <div class="row w100-115p">
                    <div class="row w25">
                        <div id="desQuUnitaria.{CODICE}" class="row w100 testo12">Conf.da</div>    
                        <div class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row testo12 testoGrassetto">{QUUNITARIA}</div>
                    </div> 
                    <div class="row w75-10p">
                        <div class="row testoNormale clrSfondoGiallo testo10 testoTroncato1 w100 dx" style="color: red;">{SOSTITUITI}</div>
                        <div id="costo.{CODICE}" tag="{costo}" class="row w100 testoGrassetto dx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}','hidden');visualizzaCosto('costoU.{CODICE}')">{COSTOSTDF}</div>
                        <div id="costoU.{CODICE}" tag="{costo}" class="row w100 testoGrassetto dx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}');visualizzaCosto('costoU.{CODICE}','hidden')">{DATACOSTO} - {COSTO}</div>
                    </div>
                </div>
                <div class="row w100-115p testoNormale">
                    <div class="row w50-30p">
                        <div id="desOrd.{CODICE}" class="row w100 testo12">In Arrivo</div>
                        <div id="UMOrd.{CODICE}" class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="ord.{CODICE}" class="row testo12 testoGrassetto mW55p testoTroncato1">{ORDINATO}</div>
                    </div>
                    <div class="row w30p">
                        <img id="dettagliInArrivo.{CODICE}" class="w30p hide {HIDEINARRIVO}" title="Dettagli Arrivo Merce" src="img/grafiche/deadline.svg" onclick="caricaDettagliInArrivo(\`{CODICE}\`,\`{DESCRIZIONE}\`)"/>
                    </div>
                    <div class="row w30 testo12 testoNormale cx">{PREZZO}</div>
                    <div class="row w20">
                        <div class="row w65 testoNormale hide">{DESSCONTO}</div>
                        <div id="sconti.{CODICE}" class="row w100 cx testo12">{SC1}</div>
                    </div>
                </div> 
                <div class="elementiGriglia marg10Top w100-5p">
                    <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto dx testo20 testoTroncato1 {NOPROMO} {NOHIDESCALA}" onclick="visualizzaCosto('costo.{CODICE}');visualizzaCosto('costoU.{CODICE}')">{SCONTATO}</div>    
                    <div id="cmdScala.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto cx testo20 clrContornoScuro testoTroncato1 marg-15Top {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`,\`{SCONTATO}\`);'><img class="w40p" src="img/grafiche/scala.svg"/><img class="w40p" src="img/grafiche/touch.svg"/></div>    
                    <div class="rowDx posTop-5p w30 clrTestoArancione clrSfondoNero testo20 testoGrassetto dx testoTroncato1 padDx10 padTop2p5 padBot2p5 {promo}" onclick="visualizzaCosto('costo.{CODICE}');visualizzaCosto('costoU.{CODICE}')">{SCONTATO}</div>
                    <div class="rowDx w50 h50p pos-24">
                        <div class="pulsantieraPiccola h50p">
                            <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\`{CODICE}\`,\`{DESCRIZIONE}\`);"><img src="img/bianche/statistics.svg" /></a>
                            <a href="#" id="cmdM{ID}" codice="{ID}" class="w20" onclick="rimuoviCarrello(this);" style="visibility: hidden;"><img src="img/bianche/minus.svg" /></a>
                            <a href="#" id="cmdP{ID}" codice="{ID}" class="w20" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                            <a href="#" class="w20"><img src="img/bianche/edit.svg" onclick="apriModificaQuantita(\`{CODICE}\`,\`{DESCRIZIONE}\`,'{UM}','{UM} {DISP}','{UM} {QUUNITARIA}','{UM} {ORDINATO}','{PREZZO}','{SCONTATO}','{SC1}','{LISTINORIF}','{visQuReso}','{visQuOmaggio}','{NOPROMO}','{NOHIDESCALA}')" /></a>
                            <!--<a href="#" class="w20 {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`);'><img class="blink_text" src="img/grafiche/scala.svg"/></a>-->
                            <!--<a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>-->
                            <a href="#" class="cmdAlternativi w20 {HIDEALTERNATIVI} clrContornoRosso" title="Presenza Prodotti Alternativi" onclick="apriAlternativi(\'{CODICE}\');"><img class="blink_text" src="img/bianche/alternate.svg"/></a>
                        </div>
                    </div>
                    <div id="listino.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{PREZZO}</div>
                    <div id="listinoRif.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{LISTINORIF}</div>
                    <div class="posBottomA25p w20 testoNormale">                       
                        <div class="row w100 testo12" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div>    
                        <div id="um.{CODICE}" class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="disp.{CODICE}" class="row testo12 testoGrassetto">{DISP}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>`;

var elementiListaArticoliLightGuajanaClienti=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubLightGNP clrBianco testoNero elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="SOLORIVENDITORI.{CODICE}" class="hide">{SOLORIVENDITORI}</div>
    <div id="SCALA.{CODICE}" class="hide">{SCALA}</div>
    <div id="PREZZONETTOORIG.{CODICE}" class="hide">{przNetto}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="percImg.{CODICE}" class="hide">{IMMAGINE}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-4p hPanelArticoliLightGNP padSx2" style="{hContainerNP}">
        <div class="elementiGriglia marg5Bottom w100-5p">
            <div>
                <div class="row w100">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="row w100-115p testoGrassetto padTop6 h{hDescrizione}p">
                            <span class="h{hDescrizione}p testoTroncato w100-5p">
                                {DESCRIZIONE}
                            </span>
                        </div>
                        <div class="row w115p">
                            <label id="lblQu{ID}" class="posTopA marg1Top posRightA zIndex2 clrBianco clrTestoRosso intestazione hidden"></label>
                            <div class="posTopA w115p">
                                <img id="img.{CODICE}" name="switch" maxImg="{NRIMG}" nrImg="1" stile="rect" actualImg="{IMMAGINE}" class="w100 mH115p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}',"","rect","230")}" datiImg="{DESCRIZIONE}<BR><b>{SKTECNICA}</b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\',\'{hideMultiImg}\',{NRIMG},\'{CODICE}\',\'{HIDDENALLEGATOTECNICO}\',\'{ALLEGATIWEB}\',\'{CODICEFORN}\',\`{CAR1}\`,\`{CAR2}\`,\`{CAR3}\`,\'{HIDEOPZIONI}\',\`{LINKRAGGRUPPAMENTO}\`,\'{IMGTIPO}\');" />
                            </div>
                            <!--<img class="posTopA90p w20p zIndex2 {hideMultiImg}" src="img/rosse/back.svg" onclick="cambiaImmagineMouse('{CODICE}',-1)"/>-->
                            <!--<div id="sw.{CODICE}" class="posTopA90p posLeftA20p w75P clrTestoRosso testoGrassetto cx zIndex2 {hideMultiImg}">1/{NRIMG}</div>-->
                            <!--<img class="posTopA90p posRightA10p w20p zIndex2 {hideMultiImg}" src="img/rosse/forward.svg" onclick="cambiaImmagineMouse('{CODICE}',1)"/>-->
                            <img class="posTopA90p posRightA10p w30p zIndex2 {hideMultiImg}" src="img/grafiche/photo-gallery.svg"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex2 {nuovo}" src="img/grafiche/nuovo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex3 {INELIMINAZIONE}" src="img/grafiche/stock.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDEPROMO}" src="img/grafiche/promo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDENETTO}" src="img/grafiche/netto.png?ver=1.1"/>
                        </div>
                    </div>
                </div>
                <div class="row w100-115p testoTroncato1 h20p">
                    <div id="codice.{CODICE}" class="row w75 testoNormale clrTestoRosso">{CODICE} <span class="testoNormale clrTestoNero">- {CODICEFORN}</span></div>
                </div>
                <div class="row w100-115p">
                    <div class="row w25">
                        <div id="desQuUnitaria.{CODICE}" class="row w100 testo12">Conf.da</div>    
                        <div class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row testo12 testoGrassetto">{QUUNITARIA}</div>
                    </div> 
                    <div class="row w75-10p">
                        <div class="row testoNormale clrSfondoGiallo testo10 testoTroncato1 w100 dx" style="color: red;">{SOSTITUITI}</div>
                        <div id="costo.{CODICE}" tag="{costo}" class="row w100 testoGrassetto dx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}','hidden')">{COSTOSTD}</div>
                    </div>
                </div>
                <div class="row w100-115p testoNormale">
                    <div class="row w40">
                        <div class="row w100 testo12" onclick="apriModalDettaglioGiacenze('{CODICE}')>Disp.tà</div>
                        <div class="row w20p testo12 testoGrassetto hidden">{UM}</div>
                        <div id="ord.{CODICE}" class="row testo12 testoGrassetto hidden">{ORDINATO}</div>
                        <img id="imgDisponibile.{CODICE}" class="posTopA20p posLeftA w40p zIndex2" title="{titoloDisponibile}" src="img/grafiche/{imgDisponibile}.svg" onclick="spiegaDisponibilita(this)"/>
                    </div>
                    <div class="row w30 testo12 testoNormale cx">{PREZZO}</div>
                    <div class="row w20">
                        <div class="row w65 testoNormale hide">{DESSCONTO}</div>
                        <div id="sconti.{CODICE}" class="row w100 cx testo12">{SC1}</div>
                    </div>
                </div> 
                <div class="elementiGriglia marg10Top w100-5p">
                    <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto dx testo20 testoTroncato1 {NOPROMO} {NOHIDESCALA}" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATO}</div>    
                    <div id="cmdScala.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto cx testo20 clrContornoScuro testoTroncato1 marg-15Top {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`,\`{SCONTATO}\`);'><img class="w40p" src="img/grafiche/scala.svg"/><img class="w40p" src="img/grafiche/touch.svg"/></div>    
                    <div class="rowDx posTop-5p w30 clrTestoArancione clrSfondoNero testo20 testoGrassetto dx testoTroncato1 padDx10 padTop2p5 padBot2p5 {promo}" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATO}</div>
                    <div class="rowDx w50 h50p pos-24">
                        <div class="pulsantieraPiccola h50p">
                            <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\`{CODICE}\`,\`{DESCRIZIONE}\`);"><img src="img/bianche/statistics.svg" /></a>
                            <a href="#" id="cmdM{ID}" codice="{ID}" class="w20" onclick="rimuoviCarrello(this);" style="visibility: hidden;"><img src="img/bianche/minus.svg" /></a>
                            <a href="#" id="cmdP{ID}" codice="{ID}" class="w20" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                            <a href="#" class="w20"><img src="img/bianche/edit.svg" onclick="apriModificaQuantita(\`{CODICE}\`,\`{DESCRIZIONE}\`,'{UM}','{UM} {DISP}','{UM} {QUUNITARIA}','{UM} {ORDINATO}','{PREZZO}','{SCONTATO}','{SC1}','{LISTINORIF}','{visQuReso}','{visQuOmaggio}','{NOPROMO}','{NOHIDESCALA}')" /></a>
                            <!--<a href="#" class="w20 {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`);'><img class="blink_text" src="img/grafiche/scala.svg"/></a>-->
                            <!--<a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>-->
                            <a href="#" class="cmdAlternativi w20-4p h100-4p {HIDEALTERNATIVI} clrContornoRosso" title="Presenza Prodotti Alternativi" onclick="apriAlternativi(\'{CODICE}\');"><img class="posTop-2p5 blink_text" src="img/bianche/alternate.svg"/></a>
                        </div>
                    </div>
                    <div id="listino.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{PREZZO}</div>
                    <div id="listinoRif.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{LISTINORIF}</div>
                    <div class="posBottomA25p w20 testoNormale hide">                       
                        <div class="row w100 testo12" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div>    
                        <div id="um.{CODICE}" class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="disp.{CODICE}" class="row testo12 testoGrassetto">{DISP}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>`;

var elementiListaArticoliDenaro=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubDenaro clrBianco testoNero elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="SOLORIVENDITORI.{CODICE}" class="hide">{SOLORIVENDITORI}</div>
    <div id="SCALA.{CODICE}" class="hide">{SCALA}</div>
    <div id="PREZZONETTOORIG.{CODICE}" class="hide">{przNetto}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="percImg.{CODICE}" class="hide">{IMMAGINE}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-4p hPanelArticoliDenaro padSx2" style="{hContainerNP}">
        <div class="elementiGriglia marg5Bottom w100-5p">
            <div>
                <div class="row w100">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESWEB}" class="row w100 testoGrassetto padTop6 h{hDescrizione}p">
                            <span class="h{hDescrizione}p testoTroncato w100-5p">
                                {DESWEB}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row w100 testoTroncato1 h20p">
                    <div id="codice.{CODICE}" class="row w75 testoGrassetto clrTestoRosso">{CODICE} <span class="testoNormale clrTestoNero hide">- {CODICEFORN}</span></div>
                </div>
                <div class="row w100">
                    <div class="row w33">
                        <div id="desOrd.{CODICE}" class="row w100 testNormale">In Arrivo</div>
                        <div id="UMOrd.{CODICE}" class="row w30p testo16 testoGrassetto">{UM}</div>
                        <div id="ord.{CODICE}" class="row testo16 testoGrassetto">{ORDINATO}</div>
                    </div>
                    <div class="row w33">
                        <div class="row w100 testNormale">Confez. da</div>    
                        <div class="row w30p testo16 testoGrassetto">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row testo16 testoGrassetto">{QUUNITARIA}</div>
                    </div> 
                    <div class="rowDx w34">                       
                        <div class="row w100 testNormale">Disponibilità</div>    
                        <div id="um.{CODICE}" class="row w30p testo16 testoGrassetto">{UM}</div>
                        <div id="disp.{CODICE}" class="row testo16 testoGrassetto {COLOREDISP}">{DISP}</div>
                    </div>
                    <div class="row w60-10p hide">
                        <div class="row testoNormale clrSfondoGiallo testo10 testoTroncato1 w100 dx" style="color: red;">{SOSTITUITI}</div>
                        <div id="costo.{CODICE}" tag="{costo}" class="row w100 testoGrassetto dx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}','hidden')">{COSTO}</div>
                    </div>
                </div>
                <div class="row w100 {HIDEINARRIVO}" onclick="caricaDettagliInArrivo(\`{CODICE}\`,\`{DESCRIZIONE}\`)">
                    <img id="dettagliInArrivo.{CODICE}" class="row w45p" title="Dettagli Arrivo Merce" src="img/grafiche/deadline.svg"/>
                    <div class="row testoNormale marg10Sx marg10Top testoSottolineato clrTestoBlu">Calendario Riassortimenti</div>
                </div>
                <div class="row w100-115p testoNormale hide">
                    <div class="row w30 testo12 testoNormale cx">{PREZZO}</div>
                    <div class="row w20">
                        <div class="row w65 testoNormale hide">{DESSCONTO}</div>
                        <div id="sconti.{CODICE}" class="row w100 cx testo12">{SC1}</div>
                    </div>
                </div> 
                <div class="row w230p">
                    <label id="lblQu{ID}" class="posTopA marg1Top posRightA zIndex2 clrBianco clrTestoRosso intestazione hidden"></label>
                    <div class="w230p">
                        <img id="img.{CODICE}" name="switch" maxImg="{NRIMG}" nrImg="1" stile="rect" actualImg="{IMMAGINE}" class="w100 mH230p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}',"","rect","460")}" datiImg="{DESCRIZIONE}<BR><b>{SKTECNICA}</b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\',\'{hideMultiImg}\',{NRIMG},\'{CODICE}\',\'{HIDDENALLEGATOTECNICO}\',\'{ALLEGATIWEB}\',\'{CODICEFORN}\',\`{CAR1}\`,\`{CAR2}\`,\`{CAR3}\`,\'{HIDEOPZIONI}\',\`{LINKRAGGRUPPAMENTO}\`);" />
                    </div>
                    <!--<img class="posTopA90p w20p zIndex2 {hideMultiImg}" src="img/rosse/back.svg" onclick="cambiaImmagineMouse('{CODICE}',-1)"/>-->
                    <!--<div id="sw.{CODICE}" class="posTopA90p posLeftA20p w75P clrTestoRosso testoGrassetto cx zIndex2 {hideMultiImg}">1/{NRIMG}</div>-->
                    <!--<img class="posTopA90p posRightA10p w20p zIndex2 {hideMultiImg}" src="img/rosse/forward.svg" onclick="cambiaImmagineMouse('{CODICE}',1)"/>-->
                    <img class="posTopA90p posRightA10p w30p zIndex2 {hideMultiImg}" src="img/grafiche/photo-gallery.svg"/>
                    <img class="posTopA1p posLeftA1p w50p zIndex2 {nuovo}" src="img/grafiche/nuovo.png?ver=1.1"/>
                    <img class="posTopA1p posLeftA1p w50p zIndex3 {INELIMINAZIONE}" src="img/grafiche/stock.png?ver=1.1"/>
                    <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDEPROMO}" src="img/grafiche/promo.png?ver=1.1"/>
                    <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDENETTO}" src="img/grafiche/netto.png?ver=1.1"/>
                </div>
                <div class="row w100-235p marg100Top">
                    <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="row w100 testoGrassetto dx testo20 testoTroncato1 {NOPROMO} {NOHIDESCALA}" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATO}</div>    
                    <div id="cmdScala.{CODICE}" tag="{przNetto}" class="row w100 testoGrassetto cx testo20 clrContornoScuro testoTroncato1 marg-15Top {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`,\`{SCONTATO}\`);'><img class="w40p" src="img/grafiche/scala.svg"/><img class="w40p" src="img/grafiche/touch.svg"/></div>    
                    <div class="row posTop-5p w100 clrTestoArancione clrSfondoNero testo20 testoGrassetto dx testoTroncato1 padDx10 padTop2p5 padBot2p5 {promo}" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATO}</div>
                    <div id="listino.{CODICE}" class="row w15 testo12 testoNormale sx hide">{PREZZO}</div>
                    <div id="listinoRif.{CODICE}" class="row w15 testo12 testoNormale sx hide">{LISTINORIF}</div>
                </div>
                <div class="row w70 margPerc10Sx h48p hide">
                    <div class="pulsantieraPiccola h48p">
                        <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\`{CODICE}\`,\`{DESCRIZIONE}\`);"><img src="img/bianche/statistics.svg" /></a>
                        <a href="#" id="cmdM{ID}" codice="{ID}" class="w20" onclick="rimuoviCarrello(this);" style="visibility: hidden;"><img src="img/bianche/minus.svg" /></a>
                        <a href="#" id="cmdP{ID}" codice="{ID}" class="w20" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                        <a href="#" class="w20"><img src="img/bianche/edit.svg" onclick="apriModificaQuantita(\`{CODICE}\`,\`{DESCRIZIONE}\`,'{UM}','{UM} {DISP}','{UM} {QUUNITARIA}','{UM} {ORDINATO}','{PREZZO}','{SCONTATO}','{SC1}','{LISTINORIF}','{visQuReso}','{visQuOmaggio}','{NOPROMO}','{NOHIDESCALA}')" /></a>
                        <!--<a href="#" class="w20 {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`);'><img class="blink_text" src="img/grafiche/scala.svg"/></a>-->
                        <!--<a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>-->
                        <a href="#" class="cmdAlternativi w20 hide clrContornoRosso" title="Presenza Prodotti Alternativi" onclick="apriAlternativi(\'{CODICE}\');"><img class="blink_text" src="img/bianche/alternate.svg"/></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>`;

var elementiListaArticoliIceCube=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubLightGNP clrBianco testoNero testoNormale elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="SOLORIVENDITORI.{CODICE}" class="hide">{SOLORIVENDITORI}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="SCALA.{CODICE}" class="hide">{SCALA}</div>
    <div id="PREZZONETTOORIG.{CODICE}" class="hide">{przNetto}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="percImg.{CODICE}" class="hide">{IMMAGINE}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="FASCIAPROV.{CODICE}" class="hide">{PROVVIGIONE}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-4p hPanelArticoliLightGNP padSx2" style="{hContainerNP}">
        <div class="elementiGriglia marg5Bottom w100-5p">
            <div>
                <div class="row w100">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="row w100-115p testoGrassetto padTop6 h{hDescrizione}p">
                            <span class="h{hDescrizione}p testoTroncato w100-5p">
                                {DESCRIZIONE}
                            </span>
                        </div>
                        <div class="row w115p">
                            <label id="lblQu{ID}" class="posTopA marg1Top posRightA zIndex2 clrBianco clrTestoRosso intestazione hidden"></label>
                            <div class="posTopA w115p">
                                <img id="img.{CODICE}" name="switch" maxImg="{NRIMG}" nrImg="1" stile="rect" actualImg="{IMMAGINE}" class="w100 mH115p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}',"","rect","230")}" datiImg="{DESCRIZIONE}<BR><b>{SKTECNICA}</b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\',\'{hideMultiImg}\',{NRIMG},\'{CODICE}\',\'{HIDDENALLEGATOTECNICO}\',\'{ALLEGATIWEB}\',\'{CODICEFORN}\',\`{CAR1}\`,\`{CAR2}\`,\`{CAR3}\`,\'{HIDEOPZIONI}\',\`{LINKRAGGRUPPAMENTO}\`);" />
                            </div>
                            <!--<img class="posTopA90p w20p zIndex2 {hideMultiImg}" src="img/rosse/back.svg" onclick="cambiaImmagineMouse('{CODICE}',-1)"/>-->
                            <!--<div id="sw.{CODICE}" class="posTopA90p posLeftA20p w75P clrTestoRosso testoGrassetto cx zIndex2 {hideMultiImg}">1/{NRIMG}</div>-->
                            <!--<img class="posTopA90p posRightA10p w20p zIndex2 {hideMultiImg}" src="img/rosse/forward.svg" onclick="cambiaImmagineMouse('{CODICE}',1)"/>-->
                            <img class="posTopA90p posRightA10p w30p zIndex2 {hideMultiImg}" src="img/grafiche/photo-gallery.svg"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex2 {nuovo}" src="img/grafiche/nuovo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex3 {INELIMINAZIONE}" src="img/grafiche/stock.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDEPROMO}" src="img/grafiche/promo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDENETTO}" src="img/grafiche/netto.png?ver=1.1"/>
                        </div>
                    </div>
                </div>
                <div class="row w100-115p testoTroncato1 h20p">
                    <div id="codice.{CODICE}" class="row w75 testoNormale clrTestoRosso">{CODICE} <span class="testoNormale clrTestoNero">- {CODICEFORN}</span></div>
                </div>
                <div class="row w100-115p">
                    <div class="row w25">
                        <div id="desQuUnitaria.{CODICE}" class="row w100 testo12">Pedana</div>    
                        <div class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row testo12 testoGrassetto">{QUUNITARIA}</div>
                    </div> 
                    <div class="row w75-10p">
                        <div class="row testoNormale clrSfondoGiallo testo10 testoTroncato1 w100 dx" style="color: red;">{SOSTITUITI}</div>
                        <div id="costo.{CODICE}" tag="{costo}" class="row w100 testoGrassetto dx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}','hidden')">{COSTO}</div>
                    </div>
                </div>
                <div class="row w100-115p testoNormale">
                    <div class="row w40-30p">
                        <div id="desOrd.{CODICE}" class="row w100 testo12">Peso</div>
                        <div id="UMOrd.{CODICE}" class="row w20p testo12 testoGrassetto">KG</div>
                        <div id="ord.{CODICE}" class="row testo12 testoGrassetto mW55p testoTroncato1">{PESOSPECIFICO}</div>
                    </div>
                    <div class="row w30p">
                        <img id="dettagliInArrivo.{CODICE}" class="w30p hide {HIDEINARRIVO}" title="Dettagli Arrivo Merce" src="img/grafiche/deadline.svg" onclick="caricaDettagliInArrivo(\`{CODICE}\`,\`{DESCRIZIONE}\`)"/>
                    </div>
                    <div class="row w30 testo12 testoNormale cx">{PREZZO}</div>
                    <div class="row w20">
                        <div class="row w65 testoNormale hide">{DESSCONTO}</div>
                        <div id="sconti.{CODICE}" class="row w100 cx testo12">{SC1}</div>
                    </div>
                </div> 
                <div class="elementiGriglia marg10Top w100-5p">
                    <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto dx testo20 testoTroncato1 {NOPROMO} {NOHIDESCALA}" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATO}</div>    
                    <div id="cmdScala.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto cx testo20 clrContornoScuro testoTroncato1 marg-15Top {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`,\`{SCONTATO}\`);'><img class="w40p" src="img/grafiche/scala.svg"/><img class="w40p" src="img/grafiche/touch.svg"/></div>    
                    <div class="rowDx posTop-5p w30 clrTestoArancione clrSfondoNero testo20 testoGrassetto dx testoTroncato1 padDx10 padTop2p5 padBot2p5 {promo} {HIDEDOPPIAPROMO}" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATO}</div>
                    <div class="rowDx w50 h50p pos-24">
                        <div class="pulsantieraPiccola h50p">
                            <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\`{CODICE}\`,\`{DESCRIZIONE}\`);"><img src="img/bianche/statistics.svg" /></a>
                            <a href="#" id="cmdM{ID}" codice="{ID}" class="w20" onclick="rimuoviCarrello(this);" style="visibility: hidden;"><img src="img/bianche/minus.svg" /></a>
                            <a href="#" id="cmdP{ID}" codice="{ID}" class="w20 {HIDEORDINA}" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                            <a href="#" class="w20 {HIDEORDINA}"><img src="img/bianche/edit.svg" onclick="apriModificaQuantita(\`{CODICE}\`,\`{DESCRIZIONE}\`,'{UM}','{UM} {DISP}','{UM} {QUUNITARIA}','KG {PESOSPECIFICO}','{PREZZO}','{SCONTATO}','{SC1}','{LISTINORIF}','{visQuReso}','{visQuOmaggio}','{NOPROMO}','{NOHIDESCALA}')" /></a>
                            <a href="#" id="cmdMSGDISP{ID}" codice="{ID}" class="w40 clrTestoRosso {HIDEMSGDISP}">NON DISPONIBILE</a>
                            <!--<a href="#" class="w20 {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`);'><img class="blink_text" src="img/grafiche/scala.svg"/></a>-->
                            <!--<a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>-->
                            <a href="#" class="cmdAlternativi w20 {HIDEALTERNATIVI} clrContornoRosso" title="Presenza Prodotti Alternativi" onclick="apriAlternativi(\'{CODICE}\');"><img class="blink_text" src="img/bianche/alternate.svg"/></a>
                        </div>
                    </div>
                    <div id="listino.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{PREZZO}</div>
                    <div id="listinoRif.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{LISTINORIF}</div>
                    <div class="posBottomA25p w20 testoNormale">                       
                        <div class="row w100 testo12" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div>    
                        <div id="um.{CODICE}" class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="disp.{CODICE}" class="row testo12 testoGrassetto">{DISP}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>`;

var elementiListaArticoliIceCubeVettori=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubLightGNP prova clrBianco testoNero testoNormale elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="SOLORIVENDITORI.{CODICE}" class="hide">{SOLORIVENDITORI}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="SCALA.{CODICE}" class="hide">{SCALA}</div>
    <div id="PREZZONETTOORIG.{CODICE}" class="hide">{przNetto}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="percImg.{CODICE}" class="hide">{IMMAGINE}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="FASCIAPROV.{CODICE}" class="hide">{PROVVIGIONE}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-4p hPanelArticoliLightGNP padSx2" style="{hContainerNP}">
        <div class="elementiGriglia marg5Bottom w100-5p">
            <div>
                <div class="row w100">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="row w100-115p testoGrassetto padTop6 h{hDescrizione}p">
                            <span class="h{hDescrizione}p testoTroncato w100-5p">
                                {DESCRIZIONE}
                            </span>
                        </div>
                        <div class="row w115p">
                            <label id="lblQu{ID}" class="posTopA marg1Top posRightA zIndex2 clrBianco clrTestoRosso intestazione hidden"></label>
                            <div class="posTopA w115p">
                                <img id="img.{CODICE}" name="switch" maxImg="{NRIMG}" nrImg="1" stile="rect" actualImg="{IMMAGINE}" class="w100 mH115p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}',"","rect","230")}" datiImg="{DESCRIZIONE}<BR><b>{SKTECNICA}</b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\',\'{hideMultiImg}\',{NRIMG},\'{CODICE}\',\'{HIDDENALLEGATOTECNICO}\',\'{ALLEGATIWEB}\',\'{CODICEFORN}\',\`{CAR1}\`,\`{CAR2}\`,\`{CAR3}\`,\'{HIDEOPZIONI}\',\`{LINKRAGGRUPPAMENTO}\`);" />
                            </div>
                            <!--<img class="posTopA90p w20p zIndex2 {hideMultiImg}" src="img/rosse/back.svg" onclick="cambiaImmagineMouse('{CODICE}',-1)"/>-->
                            <!--<div id="sw.{CODICE}" class="posTopA90p posLeftA20p w75P clrTestoRosso testoGrassetto cx zIndex2 {hideMultiImg}">1/{NRIMG}</div>-->
                            <!--<img class="posTopA90p posRightA10p w20p zIndex2 {hideMultiImg}" src="img/rosse/forward.svg" onclick="cambiaImmagineMouse('{CODICE}',1)"/>-->
                            <img class="posTopA90p posRightA10p w30p zIndex2 {hideMultiImg}" src="img/grafiche/photo-gallery.svg"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex2 {nuovo}" src="img/grafiche/nuovo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex3 {INELIMINAZIONE}" src="img/grafiche/stock.png?ver=1.1"/>
                            <!--<img class="posTopA1p posLeftA1p w60p zIndex4 {HIDEPROMO}" src="img/grafiche/promo.png?ver=1.1"/>-->
                            <!--<img class="posTopA1p posLeftA1p w60p zIndex4 {HIDENETTO}" src="img/grafiche/netto.png?ver=1.1"/>-->
                        </div>
                    </div>
                </div>
                <div class="row w100-115p testoTroncato1 h20p">
                    <div id="codice.{CODICE}" class="row w75 testoNormale clrTestoRosso">{CODICE} <span class="testoNormale clrTestoNero">- {CODICEFORN}</span></div>
                </div>
                <div class="row w100-115p">
                    <div class="row w25">
                        <div id="desQuUnitaria.{CODICE}" class="row w100 testo12">Pedana</div>    
                        <div class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row testo12 testoGrassetto">{QUUNITARIA}</div>
                    </div> 
                    <div class="row w75-10p">
                        <div class="row testoNormale clrSfondoGiallo testo10 testoTroncato1 w100 dx" style="color: red;">{SOSTITUITI}</div>
                        <div id="costo.{CODICE}" tag="{costo}" class="row w100 testoGrassetto dx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}','hidden')">{COSTO}</div>
                    </div>
                </div>
                <div class="row w100-115p testoNormale">
                    <div class="row w40-30p">
                        <div id="desOrd.{CODICE}" class="row w100 testo12">Peso</div>
                        <div id="UMOrd.{CODICE}" class="row w20p testo12 testoGrassetto">KG</div>
                        <div id="ord.{CODICE}" class="row testo12 testoGrassetto mW55p testoTroncato1">{PESOSPECIFICO}</div>
                    </div>
                    <div class="row w30p">
                        <img id="dettagliInArrivo.{CODICE}" class="w30p hide {HIDEINARRIVO}" title="Dettagli Arrivo Merce" src="img/grafiche/deadline.svg" onclick="caricaDettagliInArrivo(\`{CODICE}\`,\`{DESCRIZIONE}\`)"/>
                    </div>
                    <!--<div class="row w30 testo12 testoNormale cx">{PREZZO}</div>
                    <div class="row w20">
                        <div class="row w65 testoNormale hide">{DESSCONTO}</div>
                        <div id="sconti.{CODICE}" class="row w100 cx testo12">{SC1}</div>
                    </div>-->
                </div> 
                <div class="elementiGriglia marg10Top w100-5p">
                    <!--<div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto dx testo20 testoTroncato1 {NOPROMO} {NOHIDESCALA}" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATO}</div>    -->
                    <!--<div id="cmdScala.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto cx testo20 clrContornoScuro testoTroncato1 marg-15Top {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`,\`{SCONTATO}\`);'><img class="w40p" src="img/grafiche/scala.svg"/><img class="w40p" src="img/grafiche/touch.svg"/></div>    -->
                    <!--<div class="rowDx posTop-5p w30 clrTestoArancione clrSfondoNero testo20 testoGrassetto dx testoTroncato1 padDx10 padTop2p5 padBot2p5 {promo} {HIDEDOPPIAPROMO}" onclick="visualizzaCosto('costo.{CODICE}')">{SCONTATO}</div>-->
                    <div class="rowDx w50 h50p pos-24">
                        <div class="pulsantieraPiccola h50p">
                            <a href="#" id="cmdDisp{ID}" codice="{ID}" class="w20" onclick="apriModalDettaglioGiacenze('{CODICE}')"><img src="img/bianche/inventario.svg" /></a>
                            <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\`{CODICE}\`,\`{DESCRIZIONE}\`);"><img src="img/bianche/statistics.svg" /></a>
                            <a href="#" id="cmdM{ID}" codice="{ID}" class="w20" onclick="rimuoviCarrello(this);" style="visibility: hidden;"><img src="img/bianche/minus.svg" /></a>
                            <a href="#" class="w20" style="visibility: hidden;"><img src="img/bianche/edit.svg" " onclick="apriModificaQuantita(\`{CODICE}\`,\`{DESCRIZIONE}\`,'{UM}','{UM} {DISP}','{UM} {QUUNITARIA}','KG {PESOSPECIFICO}','{PREZZO}','{SCONTATO}','{SC1}','{LISTINORIF}','{visQuReso}','{visQuOmaggio}','{NOPROMO}','{NOHIDESCALA}')" /></a>
                            <!--<a href="#" class="w20 {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`);'><img class="blink_text" src="img/grafiche/scala.svg"/></a>-->
                            <!--<a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>-->
                            <a href="#" class="cmdAlternativi w20 {HIDEALTERNATIVI} clrContornoRosso" title="Presenza Prodotti Alternativi" onclick="apriAlternativi(\'{CODICE}\');"><img class="blink_text" src="img/bianche/alternate.svg"/></a>
                        </div>
                    </div>
                    <div id="listino.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{PREZZO}</div>
                    <div id="listinoRif.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{LISTINORIF}</div>
                    <div class="posBottomA25p w20 testoNormale">                       
                        <div class="row w100 testo12" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div> 
                        <div id="um.{CODICE}" class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="disp.{CODICE}" class="row testo12 testoGrassetto">{DISP}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>`;

var elementoListaLink=`<li>
<div class="elencoR3div">
    <div class="row w100-150p">
        <a id="link-{riga}" name="" href="#" target="_self"><div>{descrizione}</div>
        <div>Validità {dataDa}  {dataA}</div>
        </a>
        
    </div>
    <div class="row w150p marg5Top">
        <div class="row w5p hidden">div</div>
        <img class="row w40p cursoreBtn" src="img/bianche/duplica.svg" title="Genera Link Rapido" onclick="generaLinkListaArticoli('{id}')">
        <div class="row w5p hidden">div</div>
        <img class="row w40p cursoreBtn" src="img/bianche/edit.svg" onclick="apriFormModificaLinkListaArticoli('{riga}')">
        <div class="row w5p hidden">div</div>
        <img class="row w40p cursoreBtn" src="img/bianche/delete.svg" title="Elimina link rapido" onclick="eliminaLink(\`{id}\`,\`{descrizione}\`)">
    </div>
</div>
</li>`
var modalListaLink=`
<div class="posTopA w100">
    <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
        Lista link rapidi
        <span class="close" onclick="chiudiModalBox();">&times;</span>
    </div>
    <div id="caption" class="marg10Bottom marg10Top fasciaIntestazione testoTroncato h60p"></div>
</div>
<div class="posTopA115p posBottomA75p w100">
    <ul id="elencoDettagli" name="elencoDettagli" class="elencoRubrica marg5Sx posTopA5p posBottomA w100-5p">

    </ul>

</div>
<div class="pulsantiera posLeftA5p posBottomA10p">
<a id="cmdAddR" name="cmdAddR" href="#" class="w100-10p" title="Aggiungi" onclick="apriFormInserimentoLinkListaArticoli();"><img src="img/bianche/add.svg"></a>
</div>`;
var elementoLiInserimenoLink=`<li class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10" id="liXAggiuntaLink"></li>`;
var elementoFormInserimentoLink = `
	<div class="elementiGriglia w100" id="divFormAddInserimentoLInk">
		<div class="row w100-40p padTop5 normale">
            <div class="row w100">
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col12">
                    <span class="selectDefault" id="0">Descrizione link rapido</span>
                    <label for="txtDescrizioneLinkRapido">Descrizione Link rapido</label>
                    <input id="txtDescrizioneLinkRapido" name="txtDescrizioneLinkRapido" class="selectBox" type="text">
                </div>
            </div>
        <div class="row w100">
                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                <span class="selectDefault" id="0">Data inizio validità</span>
                <label for="txtDataValiditaDa">Data Validità</label>
                <input id="txtDataValiditaDa" name="txtDataValiditaDa" class="selectBox" type="date" >
                </div>

                <div id="divAutorizzazionePagina" name="divGruppo" class="row has-float-label col6">
                <span class="selectDefault" id="0">Data inizio validità</span>
                <label for="txtDataValiditaA">Data Validità A</label>
                <input id="txtDataValiditaA" name="txtDataValiditaA" class="selectBox" type="date" >
                </div>
            </div>
            <div class="w100 row h120p marg10Top">
                <div class="w50 row centraElemento">
                    <input type="file" id="fileElemReso" multiple accept="image/*,application/pdf,application/msword,
    application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv" style="display:none">
                    <button class="pulsanteTastieraImg pulsanteVeBa" onclick="allegaFotoRiga(\`fileElemReso\`)"
                        id="btnScontrinoCortesia">
                        <img src="img/bianche/attach.svg" style="height:45px;width:45px">

                    </button>
                </div>
                <div class="w50 row centraElemento">
                    <ul id="immagineCarosello" name="immagineCarosello" class="row w100-5p elencoR1 marg10Top"></ul>

                </div>
            </div>
            <div class="w100 row h100p marg10Top">
                <div class="row h40p marg5Bottom">
                    <input id="chkSovrascriviFiltri" onchange="chkFiltriLink(this)" name="chkSovrascriviFiltri" descrizione="Disponibilità > 0" type="checkbox" class="row w25p h25p clrSfumatoChiaro marg10Dx toggle-button" >               
                        <label for="chkSovrascriviFiltri" class="posTop-5p">
                            Salva filtri 
                        </label>
                </div>
                <div class="row w100">
                    <div id="divForzaLink" name="divGruppo" class="row has-float-label w100 hide">
                        <span class="selectDefault" id="0">Link Esterno</span>
                        <label for="txtLinkEsterno">Link Esterno</label>
                        <input id="txtLinkEsterno" name="txtDescrizioneLinkRapido" class="selectBox" type="text">
                    </div>
            </div>
            </div>
<div>
        </div>
        <div class="pulsantiera">
            <a id="cmdSalvaLink" href="#" class="w50" title="Salva" onclick="salvaLinkListaArticoli()"><img src="img/bianche/save.svg"/></a>
            <a id="cmdAnnullaLink" href="#" class="w50" title="Annulla" onclick="annullaFormLinkListaArticoli()"><img src="img/bianche/annulla.svg"/></a>
        </div>
	</div>
`;

var elementoBodyModal=`
<div class="padTop10">
    <div class="has-float-label w100">
        <select id="slcSceltaFunzioneLista" placeholder="Scelta funzione lista" onchange="controlloListaMagazzino(this)">
            <option value="0"></option>
            <option value="1">Lista magazzino</option>
            <option value="2">Lista assortimento</option>
        </select>
        <label for="slcSceltaFunzioneLista">Scelta funzione lista</label>
    </div>
    <div class="has-float-label w100" id="divNomeAssortimento" style="display: none">
        <input id="txtNomeAssortimento" placeholder="Descrizione assortimento" type="text">
        <label for="txtNomeAssortimento">Descrizione assortimento</label>
    </div>
</div>
`;
var layoutTipologiaDescrizioneImmagine=`
<li class="h50p marg10Bottom"><a id="{ID}" href="#" onclick="listaDaTipologia(this)" descrizionecampo="{descrizione1}" class="h100"><div class="row w50p {CSSIMMAGINE} centraVerticalmente h100 " ><img src="${urlImmagineArticolo('{IMMAGINE}',"","rect","230")}" class="w100" style="height: auto;"></div><div class="row centraVerticalmente padSx10 h100">{descrizione1}</div><div class="centraVerticalmente h100" style="justify-content:flex-end"><img src="img/bianche/forward.svg" ></div></a></li>`;

var elementiListaArticoliLightSmartMagazzini=`<li id="{ID}" name="{ID}" class="col3Catalogo hPanelArticoliSubLightGNP clrBianco testoNero elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="IDIVA.{CODICE}" class="hide">{ID_IVA}</div>
    <div id="PERCIVA.{CODICE}" class="hide">{PERCIVA}</div>
    <div id="SOLORIVENDITORI.{CODICE}" class="hide">{SOLORIVENDITORI}</div>
    <div id="SCALA.{CODICE}" class="hide">{SCALA}</div>
    <div id="PREZZONETTOORIG.{CODICE}" class="hide">{przNetto}</div>
    <div id="GRMERC.{CODICE}" class="hide">{GRMERC}</div>
    <div id="SGRMERC.{CODICE}" class="hide">{SGR_MERC}</div>
    <div id="SFAM1.{CODICE}" class="hide">{SFAM1}</div>
    <div id="SFAM2.{CODICE}" class="hide">{SFAM2}</div>
    <div id="percImg.{CODICE}" class="hide">{IMMAGINE}</div>
    <div id="PESO.{CODICE}" class="hide">{PESOSPECIFICO}</div>
    <div id="NOSCONTISUAPP.{CODICE}" class="hide">{NOSCONTISUAPP}</div>
    <div id="FASCIAPROV.{CODICE}" class="hide">{PROVVIGIONE}</div>
    <div id="divCont{ID}" class="clrContornoScuro w100-4p hPanelArticoliLightGNP padSx2" style="{hContainerNP}">
        <div class="elementiGriglia marg5Bottom w100-5p">
            <div>
                <div class="row w100">
                    <div class="row w100">
                        <div id="descrizione.{CODICE}" tag="{DESCRIZIONE}" class="row w100-115p testoGrassetto padTop6 h{hDescrizione}p">
                            <span class="h{hDescrizione}p testoTroncato w100-5p">
                                {DESCRIZIONE}
                            </span>
                        </div>
                        <div class="row w115p">
                            <label id="lblQu{ID}" class="posTopA marg1Top posRightA zIndex2 clrBianco clrTestoRosso intestazione hidden"></label>
                            <div class="posTopA w115p">
                                <img id="img.{CODICE}" name="switch" maxImg="{NRIMG}" nrImg="1" stile="rect" actualImg="{IMMAGINE}" class="w100 mH115p marg1Top" src="${urlImmagineArticolo('{IMMAGINE}',"","rect","230")}" datiImg="{DESCRIZIONE}<BR><b>{SKTECNICA}</b>" alt="Immagine Assente" onclick="apriImmagine(this,\'myModal\',\'{hideMultiImg}\',{NRIMG},\'{CODICE}\',\'{HIDDENALLEGATOTECNICO}\',\'{ALLEGATIWEB}\',\'{CODICEFORN}\',\`{CAR1}\`,\`{CAR2}\`,\`{CAR3}\`,\'{HIDEOPZIONI}\',\`{LINKRAGGRUPPAMENTO}\`,\`{IMGTIPO}\`);" />
                            </div>
                            <!--<img class="posTopA90p w20p zIndex2 {hideMultiImg}" src="img/rosse/back.svg" onclick="cambiaImmagineMouse('{CODICE}',-1)"/>-->
                            <!--<div id="sw.{CODICE}" class="posTopA90p posLeftA20p w75P clrTestoRosso testoGrassetto cx zIndex2 {hideMultiImg}">1/{NRIMG}</div>-->
                            <!--<img class="posTopA90p posRightA10p w20p zIndex2 {hideMultiImg}" src="img/rosse/forward.svg" onclick="cambiaImmagineMouse('{CODICE}',1)"/>-->
                            <img class="posTopA90p posRightA10p w30p zIndex2 {hideMultiImg}" src="img/grafiche/photo-gallery.svg"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex2 {nuovo}" src="img/grafiche/nuovo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w50p zIndex3 {INELIMINAZIONE}" src="img/grafiche/stock.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDEPROMO}" src="img/grafiche/promo.png?ver=1.1"/>
                            <img class="posTopA1p posLeftA1p w60p zIndex4 {HIDENETTO}" src="img/grafiche/netto.png?ver=1.1"/>
                        </div>
                    </div>
                </div>
                <div class="row w100-115p testoTroncato1 h20p">
                    <div id="codice.{CODICE}" class="row w75 testoNormale clrTestoRosso">{CODICE} <span class="testoNormale clrTestoNero">- {CODICEFORN}</span></div>
                </div>
                <div class="row w100-115p">
                    <div class="row w25">
                        <div id="desQuUnitaria.{CODICE}" class="row w100 testo12">Conf.da</div>    
                        <div class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="quUnitaria.{CODICE}" class="row testo12 testoGrassetto">{QUUNITARIA}</div>
                    </div> 
                    <div class="row w75-10p">
                        <div class="row testoNormale clrSfondoGiallo testo10 testoTroncato1 w100 dx" style="color: red;">{SOSTITUITI}</div>
                        <div id="costo.{CODICE}" tag="{costo}" class="row w100 testoGrassetto dx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}','hidden');visualizzaCosto('costoU.{CODICE}')">{COSTOSTDF}</div>
                        <div id="costoU.{CODICE}" tag="{costo}" class="row w100 testoGrassetto dx testo10 hidden" onclick="visualizzaCosto('costo.{CODICE}');visualizzaCosto('costoU.{CODICE}','hidden')">{DATACOSTO} - {COSTO}</div>
                    </div>
                </div>
                <div class="row w100-115p testoNormale">
                    <div class="row w50-30p">
                        <div id="desOrd.{CODICE}" class="row w100 testo12">In Arrivo</div>
                        <div id="UMOrd.{CODICE}" class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="ord.{CODICE}" class="row testo12 testoGrassetto mW55p testoTroncato1">{ORDINATO}</div>
                    </div>
                    <div class="row w30p">
                        <img id="dettagliInArrivo.{CODICE}" class="w30p hide {HIDEINARRIVO}" title="Dettagli Arrivo Merce" src="img/grafiche/deadline.svg" onclick="caricaDettagliInArrivo(\`{CODICE}\`,\`{DESCRIZIONE}\`)"/>
                    </div>
                    <div class="row w30 testo12 testoNormale cx">{PREZZOII}</div>
                    <div class="row w20">
                        <div class="row w65 testoNormale hide">{DESSCONTO}</div>
                        <div id="sconti.{CODICE}" class="row w100 cx testo12">{SC1}</div>
                    </div>
                </div> 
                <div class="elementiGriglia marg10Top w100-5p">
                    <div id="prezzoNetto.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto dx testo20 testoTroncato1 {NOPROMO} {NOHIDESCALA}" onclick="visualizzaCosto('costo.{CODICE}');visualizzaCosto('costoU.{CODICE}')">{SCONTATOII}</div>    
                    <div id="cmdScala.{CODICE}" tag="{przNetto}" class="rowDx w30 testoGrassetto cx testo20 clrContornoScuro testoTroncato1 marg-15Top {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`,\`{SCONTATOII}\`);'><img class="w40p" src="img/grafiche/scala.svg"/><img class="w40p" src="img/grafiche/touch.svg"/></div>    
                    <div class="rowDx posTop-5p w30 clrTestoArancione clrSfondoNero testo20 testoGrassetto dx testoTroncato1 padDx10 padTop2p5 padBot2p5 {promo}" onclick="visualizzaCosto('costo.{CODICE}');visualizzaCosto('costoU.{CODICE}')">{SCONTATOII}</div>
                    <div class="rowDx w50 h50p pos-24">
                        <div class="pulsantieraPiccola h50p">
                            <a href="#" class="w20 {HIDDENSTORICO}" onclick="caricaStorico(\`{CODICE}\`,\`{DESCRIZIONE}\`);"><img src="img/bianche/statistics.svg" /></a>
                            <a href="#" id="cmdM{ID}" codice="{ID}" class="w20" onclick="rimuoviCarrello(this);" style="visibility: hidden;"><img src="img/bianche/minus.svg" /></a>
                            <a href="#" id="cmdP{ID}" codice="{ID}" class="w20" onclick="aggiungiCarrello(this);"><img src="img/bianche/add.svg" /></a>
                            <a href="#" class="w20"><img src="img/bianche/edit.svg" onclick="apriModificaQuantita(\`{CODICE}\`,\`{DESCRIZIONE}\`,'{UM}','{UM} {DISP}','{UM} {QUUNITARIA}','{UM} {ORDINATO}','{PREZZOII}','{SCONTATOII}','{SC1}','{LISTINORIF}','{visQuReso}','{visQuOmaggio}','{NOPROMO}','{NOHIDESCALA}')" /></a>
                            <!--<a href="#" class="w20 {HIDESCALA}" title="Premi per Elenco Prezzi Netti" onclick='apriScala(\`{CODICE}\`, \`{DESCRIZIONE}\`,\`{SCALA}\`);'><img class="blink_text" src="img/grafiche/scala.svg"/></a>-->
                            <!--<a href="#" class="w20 {HIDDENALLEGATOTECNICO}" onclick="apriAllegato(\'{ALLEGATIWEB}\',\'divFrame\',\'xFrame\');"><img src="img/bianche/attach.svg"/></a>-->
                            <a href="#" class="cmdAlternativi w20 {HIDEALTERNATIVI} clrContornoRosso" title="Presenza Prodotti Alternativi" onclick="apriAlternativi(\'{CODICE}\');"><img class="blink_text" src="img/bianche/alternate.svg"/></a>
                        </div>
                    </div>
                    <div id="listino.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{PREZZOII}</div>
                    <div id="listinoRif.{CODICE}" class="rowDx w15 testo12 testoNormale sx hide">{LISTINO}</div>
                    <div class="posBottomA25p w20 testoNormale">                       
                        <div class="row w100 testo12" onclick="apriModalDettaglioGiacenze('{CODICE}')">Disp.tà</div>    
                        <div id="um.{CODICE}" class="row w20p testo12 testoGrassetto">{UM}</div>
                        <div id="disp.{CODICE}" class="row testo12 testoGrassetto">{DISP}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>`;