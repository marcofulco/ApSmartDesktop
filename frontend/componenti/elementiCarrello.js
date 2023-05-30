var elementiCarrello=`<li id="car.{codice}" name="{codice}" class="w100 h99p clrBianco testoNero elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="divCont{codice}" class="clrContornoScuro w100-4p h99p padSx2">
        <div class="elementiGriglia marg5Bottom w100">
            <div>
                <div class="row w100">
                    <div class="row w70">
                        <div class="row w60p">    
                            <div class="row w60p">
                                <img id="imgC.{codice}" class="w100 mH60p marg1Top" src="${urlImmagineArticolo('{imgSrc}',"","rect","230")}" title="{descrizione}" alt="Immagine Assente"/>
                            </div>    
                            <div class="row w30p">
                                <img id="dispC.{codice}" class="w100 mH30p marg1Top" src="{srcDisp}" alt="XXX"/>
                            </div>    
                            <div class="row w30p">
                                <img id="ricC.{codice}" class="w100 mH30p marg1Top" src="{srcRicarico}" alt="XXX"/>
                            </div>    
                        </div>
                        <div class="row marg5Sx w100-65p">
                            <div id="descrizione.{codice}" tag="{descrizione}" class="row w100 testoNormale padTop6 h40p">
                                <span class="h40p testoTroncato">
                                    {descrizione}
                                </span>
                            </div>
                            <div class="row w100">
                                <div class="row w40 testoNormale testo12 testoNormale dx testoTroncato1 cel">{listino}</div>
                                <div class="row w25 testoNormale  testo12 cel">{sconti}</div>
                                <div id="prezzoNettoC.{codice}" tag="{prezzo}" class="row w35 testoNormale testo12 sx testoTroncato1 cel" onclick="visualizzaCosto('costoC.{codice}')">{prezzo}</div>    
                            </div> 
                            <div class="row w100">
                                <div id="codice.{codice}" class="row w75 ">
                                   <div class="row w100 testoNormale clrTestoRosso">{codice}</div>
                                   <div class="row w100 testoGrassetto sx testo10 ${parametriArticoli.nascondiProvvigioni}">{percentualeProvvigione}% €{importoProvvigione} </div>
                                </div>
                                <div id="costoC.{codice}" class="row w25 hidden">
                                    <div tag="{costo}" class="row w100 testoGrassetto sx testo10" onclick="visualizzaCosto('costoC.{codice}','hidden')">{costo}</div>
                                    <div class="row w100 testoGrassetto sx testo10" onclick="visualizzaCosto('costoC.{codice}','hidden')">{ricarico}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w30-5p">
                        <div class="row w100 testoNormale dx testoTroncato1 {hideQu}">{um} <span class="testoGrassetto">{qu}</span><span class="testoCorsivo clrSfondoGiallo {hideDesReso}">+{quReso}</span><span class="testoCorsivo clrSfondoRosso {hideDesOmaggio}">+{quOmaggio}</span></div>
                        <div class="row w100 testoNormale clrTestoArancione dx testoTroncato1 {hideDisp}">{um} <span class="testoGrassetto">{disp}/{qu}</span></div>
                        <div class="row w100 testoNormale dx testoTroncato1 {hideNoDisp}">{um} <span class="testoGrassetto clrTestoRosso">{disp}/{qu}</span><span class="testoCorsivo clrSfondoGiallo {hideDesReso}">+{quReso}</span></div>
                        <div class="row w100 testoGrassetto dx testoTroncato1" onclick="visualizzaCosto('costoC.{codice}')">{importo}</div>    
                        <div class="row w100 testoNormale testo12 dx testoTroncato1">iva {percIva}%</div>    
                    </div> 
                </div>
                <div class="rowDx marg10Top w100p pos-48">
                    <div class="rowDx w100p h40p">
                        <div class="rowDx pulsantieraPiccola h40p">
                            <a href="#" codice="{codice}" class="rowDx w40p" onclick="rimuoviCarrello(this,true);"><img src="img/bianche/delete.svg" /></a>
                            <a href="#" class="rowDx w40p"><img src="img/bianche/edit.svg" onclick="apriModificaQuantita('{codice}',\`{descrizione}\`,'{um}','{um} {disp}','{um} {quUnitaria}','{um} {ordinato}','{listino}','{prezzo}','{scontiListinoRif}','{przListinoRif}','{visQuReso}','{visQuOmaggio}')" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>`;

var elementiIndispensabili=`<li id="carI.{codice}" name="{codice}" class="w100 h99p clrBianco testoNero elementiGriglia marg5Bottom"  style="{hLiNP}">
    <div id="divContI{codice}" class="clrContornoScuro w100-4p h99p padSx2">
        <div class="elementiGriglia marg5Bottom w100">
            <div>
                <div class="row w100">
                    <div class="row w70">
                        <div class="row w60p">    
                            <div class="row w60p">
                                <img id="imgI.{codice}" class="w100 mH60p marg1Top" src="${urlImmagineArticolo('{imgSrc}',"","rect","230")}" title="{descrizione}" alt="Immagine Assente"/>
                            </div>    
                            <div class="row w30p">
                                <img id="dispCI.{codice}" class="w100 mH30p marg1Top" src="{srcDisp}" alt="XXX"/>
                            </div>    
                            <div class="row w30p">
                                <img id="ricCI.{codice}" class="w100 mH30p marg1Top" src="{srcRicarico}" alt="XXX"/>
                            </div>    
                        </div>
                        <div class="row marg5Sx w100-65p">
                            <div id="descrizioneI.{codice}" tag="{descrizione}" class="row w100 testoNormale padTop6 h40p">
                                <span class="h40p testoTroncato">
                                    {descrizione}
                                </span>
                            </div>
                            <div class="row w100">
                                <div class="row w40 testoNormale testo12 testoNormale dx testoTroncato1 cel">{listino}</div>
                                <div class="row w25 testoNormale  testo12 cel">{sconti}</div>
                                <div id="prezzoNettoI.{codice}" tag="{prezzo}" class="row w35 testoNormale testo12 sx testoTroncato1 cel" onclick="visualizzaCosto('costoCI.{codice}')">{prezzo}</div>    
                            </div> 
                            <div class="row w100">
                                <div id="codiceI.{codice}" class="row w75 testoNormale clrTestoRosso">{codice}</div>
                                <div id="costoCI.{codice}" class="row w25 hidden">
                                    <div tag="{costo}" class="row w100 testoGrassetto sx testo10" onclick="visualizzaCosto('costoCI.{codice}','hidden')">{costo}</div>
                                    <div class="row w100 testoGrassetto sx testo10" onclick="visualizzaCosto('costoCI.{codice}','hidden')">{ricarico}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w30-5p">
                        <div class="row w100 testoNormale dx testoTroncato1 {hideQu}">{um} <span class="testoGrassetto">{qu}</span></div>
                        <div class="row w100 testoNormale clrTestoArancione dx testoTroncato1 {hideDisp}">{um} <span class="testoGrassetto">{disp}/{qu}</span></div>
                        <div class="row w100 testoNormale clrTestoRosso dx testoTroncato1 {hideNoDisp}">{um} <span class="testoGrassetto">{disp}/{qu}</span></div>
                        <div class="row w100 testoGrassetto dx testoTroncato1" onclick="visualizzaCosto('costoCI.{codice}')">{importo}</div>    
                        <div class="row w100 testoNormale testo12 dx testoTroncato1">iva {percIva}%</div>    
                    </div> 
                </div>
            </div>
        </div>
    </div>
</li>`;