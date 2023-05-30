var navBarUtente=`<input type="checkbox" id="nav-toggle" hidden>
    <nav id="navUser" name="navUser" class="nav posBottomNone clrSfumatoChiaro marg60Top">
        <div class="row fasciaIntestazione h80p">
            <h3 id="datiUtente" class="testoTroncato1">
                <div class="row w100-40p">
                    {NOME} {COGNOME}
                    <div id="datiConfigurazione" class="w100 testoNormale clrTestoRosso testoTroncato1"></div>
                    <a href="https://www.aziendapratica.com" target="_blank"><span id="versioneApp" class="testoNormale testoCorsivo testoSottolineato clrTestoBlu"><Azienda Pratica Smart Versione x.x.x</span></a>
                </div>
                <img id="imgNBUOpzioniPagina" src="img/bianche/opzioni.svg" class="row w40p hide" onclick="apriImpostazioniPagina()">
            </h3> 
        </div>
        <div id="divOffLine" class="row w100-10p pad5 marg10Bottom clrBase hide">
            <input id="chkOffLine" class="row w50p toggle-button" type="checkbox" onclick="attivaDisattivaModalitaOffLine(this);">
            <label for="chkOffLine" class="intestazione marg5Sx">Attiva Off Line</label>
        </div>
        <ul id="elencoMenu" name="elencoMenu" class="elencoR1 w100">
            <li class=""><a id="gestAccount" href="#" onclick="navUserClick(this)">Gestione Account</a></li>`;

            // <li><a id="cambioPwd" href="passwordDimenticata.html?c=1" onclick="navUserClick(this)">Cambio Password</a></li>
if (xSuperUser==1){
    navBarUtente+=`
        <li><a id="-" href="#"></a></li>
        <li><a id="utenti" href="#" onclick="navUserClick(this)">Gestione Utenti</a></li>
        <li><a id="configurazioniBase" href="#" onclick="navUserClick(this)">Configurazioni Base</a></li>`;
}
if(typeof modElectron !== 'undefined' && modElectron==true){
    navBarUtente+=`<li><a id="downloadEseguibile" href="#" onclick="window.open('https://smart.aziendapratica.it/apSmart.exe','_blank')">Download Esegubile</a></li>`;
}

    navBarUtente+=`<li ><a id="aggiornaTabelleOfflineVeBa" href="#" onclick="downloadPulitoTabelle()" class="${localStorage.getItem('offlineVenditaBanco')=='true' ? '':'hide'}">Ricarica Tabelle</a></li>`;

navBarUtente+=`<li><a id="-" href="#"></a></li>
        <li><a id="logOut" href="#" onclick="navUserClick(this)">Esci</a></li>
    </ul>
</nav>`;