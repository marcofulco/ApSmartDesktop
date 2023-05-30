var modalEMail=`<!-- Modal Box eMail  -->
    <div class="modalEMail">
        <div class="w100-15p marg10Sx">
            <div class="row w100">
                <div id="divDatiMittente" class="row w100 marg10Bottom marg10Top">
                    <div id="divMittente" class="row w100-40p testoTroncato1 normale marg5Sx cel"></div>
                    <img id="cmdServerMittente" class="row w30p marg5Sx pulsantiNoSfondo" src="img/bianche/down.svg" alt="" onclick="mostraNascondiElemento('divServerMittente','hide',this)"></img>
                </div>
                <div id="divServerMittente" class="row w100-30p marg30Sx hide">
                    <div class="has-float-label row w100">
                        <input id="txtNomeMittente" type="text" class="w100" placeholder="Nome Mittente" onChange="assegnaDesMittente()" onkeypress="resetErrore(this)">
                        <label for="txtNomeMittente" >Nome Mittente</label>
                    </div>
                    <div class="has-float-label row w100">
                        <input id="txtEMailMittente" type="text" class="w100" placeholder="e-Mail Mittente" onChange="assegnaDesMittente()" onkeypress="resetErrore(this)">
                        <label for="txtEMailMittente" >e-Mail Mittente</label>
                    </div>
                    <div class="has-float-label w100">
                        <input id="txtServer" type="text" class="w100" placeholder="Server Smtp" maxlength="100">
                        <label for="txtServer" >Server Smtp</label>
                        <img id="cmdDatiSmtp" class="row w30p marg5Sx pulsantiNoSfondo" src="img/bianche/down.svg" alt="" onclick="mostraNascondiElemento('divDatiSmtp','hide',this)"></img>
                    </div>
                    <div id="divDatiSmtp" class="row w100-30p marg30Sx hide">
                        <div class="has-float-label row w100">
                            <input id="txtUserName" type="text" class="w100" placeholder="Nome Utente" maxlength="100">
                            <label for="txtUserName" >Nome Utente</label>
                        </div>
                        <div class="has-float-label row w100">
                            <input id="txtPassword" type="password" class="w100" placeholder="Password" maxlength="100">
                            <label for="txtPassword" >Password</label>
                        </div>
                        <div class="has-float-label row w20">
                            <input id="txtPorta" type="text" inputmode="decimal" class="w100" placeholder="Porta" maxlength="5">
                            <label for="txtPorta" >Porta</label>
                        </div>
                        <div id="divSSL" class="row w100p marg5Top marg10Sx">
                            <input id="chkSSL" name="chkSSL" type="checkbox" class="w30p h30p">
                            <label for="chkSSL" class="intestazione posTop-5p">SSL</label>
                        </div>
                        <div id="divStar" class="row w150p marg5Top">
                            <input id="chkTLS" name="chkTLS" type="checkbox" class="w30p h30p">
                            <label for="chkTLS" class="intestazione posTop-5p">Star TLS</label>
                        </div>
                        <div id="divOAuth" class="row w120p marg5Top marg10Sx">
                            <input id="chkOAuth" name="chkOAuth" type="checkbox" class="w30p h30p" onchange="attivaCmdEMail()">
                            <label for="chkOAuth" class="intestazione posTop-5p">OAuth</label>
                        </div>
                        <img id="cmdOAuth" class="row w50p marg10Sx pulsantiNoSfondo hide" title="Accredita App presso GMail" src="img/grafiche/gmail.svg" alt="" onclick="recuperaRefreshToken()"></img>
                        <div id="divPerTutti" class="row w150p marg5Top marg10Sx hide">
                            <input id="chkPerTutti" name="chkPerTutti" type="checkbox" class="w30p h30p">
                            <label for="chkPerTutti" class="intestazione posTop-5p">Per Tutti</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row w100">
                <div class="has-float-label row w100-70p">
                    <input id="txtDestinatario" type="text" placeholder="Destinatario" onkeypress="resetErrore(this)">
                    <label id="slblDestinatario" for="txtDestinatario">Destinatario</label>
                </div>
                <img id="cmdRubrica" class="row w40p pulsantiNoSfondo" src="img/bianche/phone-book.svg" alt="" onclick="apriEMRubrica(\'txtDestinatario\')"></img>
                <img id="cmdDestinatari" class="row w30p pulsantiNoSfondo" src="img/bianche/down.svg" alt="" onclick="mostraNascondiElemento('divDestinatari','hide',this)"></img>
                <div id="divDestinatari" class="row w100 hide">
                    <div class="has-float-label row w100-70p">
                        <input id="txtCC" type="text" class="w100" placeholder="cc">
                        <label for="txtCC" >cc</label>
                    </div>
                    <img id="cmdRubricaCC" class="row w40p pulsantiNoSfondo" src="img/bianche/phone-book.svg" alt="" onclick="apriEMRubrica(\'txtCC\')"></img>
                    <div class="has-float-label row w100-70p">
                        <input id="txtCCn" type="text" class="w100" placeholder="ccn">
                        <label for="txtCCn" >ccn</label>
                    </div>
                    <img id="cmdRubricaCCn" class="row w40p pulsantiNoSfondo" src="img/bianche/phone-book.svg" alt="" onclick="apriEMRubrica(\'txtCCn\')"></img>
                </div>
            </div>
            <div class="row w100 marg15Top">
                <div class="has-float-label row w100">
                    <input id="txtOggetto" type="text" placeholder="Oggetto" onkeypress="resetErrore(this)">
                    <label for="txtOggetto">Oggetto</label>
                </div>
            </div>

            <div class="row w100">
                <div class="has-float-label row w100">
                    <textarea id="txtTesto" placeholder="Testo Messaggio" class="w100-4p h200p" onkeypress="resetErrore(this)"></textarea>
                    <label for="txtTesto">Testo Messaggio</label>
                </div>
            </div>
            
            <div class="row w100 marg5Top">
                <div class="row fasciaIntestazione marg10Top">
                    <h3 class="">ALLEGATI</h3> 
                </div>	
                <ul id="elencoAllegati" name="elencoAllegati" class="row w100-5p mH180p elencoR1">
                
                </ul>
            </div>

            <div class="row w100 marg5Top">
                <label href="#" class="rowDx posBottomA marg10Dx h50p w50p cx clrSfumatoScuro" onclick="chiudiEMail()">
                    <img class="imgPiccola50" src="img/bianche/annulla.svg"/>
                </label>

                <label href="#" class="rowDx posBottomA marg10Dx h50p w50p cx clrSfumatoScuro" onclick="inviaMail()">
                    <img class="imgPiccola50" src="img/bianche/mailSend.svg" />
                </label>

                <input type="file" id="fileElem" multiple accept="image/*,application/pdf,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,
                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv" style="display:none">
                <label href="#" class="rowDx posBottomA marg10Dx h50p w50p cx clrSfumatoScuro" onclick="apriAllegaFile();">
                    <img class="imgPiccola50" src="img/bianche/attach.svg" />
                </label>
            </div>
        </div>
    </div>`;

var elementiAllegati=`<li id="emAt.{NOMEFILE}" name="{NOMEFILE}" class="w100-5p clrSfumatoScuro clrContorno elementiGriglia marg5Bottom" url="{URL}">
        <a id="a.{NOMEFILE}" href="{URL}" target="_blank" class="w100-45p clrSfumatoScuro">
            <img class="row marg5Dx" src="img/bianche/pdf.svg"/>
            {NOMEFILE}
        </a>
        <img id="del.{NOMEFILE}" class="rowDx marg5Top marg5Dx hide" title="Rimuovi Allegato" src="img/bianche/delete.svg" onclick="rimuoviAllegato(\'{NOMEFILE}\',\'{URL}\')"/>
    </li>`;

var modalEMailRubrica=`<!-- Modal Box Rubrica eMail  -->
    <div class="modalEMail clrSfumatoChiaro">
        <div class="posTopA2p w100-5p clrBase">
            <div id="divTitolo" class="fasciaIntestazione normale padTop6 h40p cx">
                Rubrica e-Mail
                <span class="close" onclick="chiudiModalBox(\'modEMailRubrica\');">&times;</span>
            </div>
            <div class="row w100-5p">
                <div class="row w100">
                    <div id="divRicercaEM" name="divRicercaEM" class="row has-float-label w100-160p marg5Top">
                        <input id="txtRicercaEM" class="w100" name="txtRicercaEM" type="text" placeholder="Ricerca Cliente" onkeyup="txtRicercaEMRChange()">
                        <span class="deleteicon" onclick="var input = getElementById('txtRicercaEM'); input.value = ''; input.focus(); txtRicercaEMRChange()"></span>
                        <label id="lblRicercaEM" for="txtRicercaEM" >Ricerca ...</label>
                    </div>
                    <div id="divEMCliCor" class="row w150p marg5Top marg10Sx">
                        <input id="chkEMCliCor" name="chkEMCliCor" type="checkbox" class="w30p h30p" onchange="caricaRubrica()">
                        <label for="chkEMCliCor" class="intestazione posTop-5p">Cliente Corrente</label>
                    </div>

                    <div class="row intestazioneGriglie clrScuro w100 h30p padTop10 tableStyle">
                        <div class="row w60">Denominazione</div>
                        <div class="row w40">e-Mail</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="divCorpo" class="w100-10p marg5Sx posBottomA posTopA180p">			
            <ul id="elencoEMRubrica" name="elencoEMRubrica" class="w100 elencoR3 posTopA5p posBottomA5p scroolXHidden" onscroll="elencoEMRubricaScroll(this)">
                
            </ul>
        </div>
    </div>`;

var elementiEMailRubrica=`<li id="liEMR.{ID}" name="{ID}" eMail="{EMAIL}" class="w100 clrSfumatoScuro elementiGriglia marg5Bottom" onclick="selezioneEMRubrica(this)">
    <div class="row w100">
        <div class="row w60-10p">
            <div id="divEMRNominativo{ID}" class="row w60-10p normale padDx5 padSx5">{RAGIONE_SOCIALE}</div>    
        </div>
        <div id="divEMRMail{ID}" class="row w40-5p h30p normale testoTroncato1">{EMAIL}</div>    
    </div>
</li>`;

query['rubricaEMail']=new Array;
query['rubricaEMail']['OFFSET']=0;
query['rubricaEMail']['FETCH']=100;
query['rubricaEMail']['MAXFETCH']=0;
query['rubricaEMail']['modelloRiga']=elementiEMailRubrica;

query['rubricaEMail']['oggetti']=new Array;
query['rubricaEMail']['oggetti']['{ID}']="ID";
query['rubricaEMail']['oggetti']['{RAGIONE_SOCIALE}']="RAGIONE_SOCIALE";
query['rubricaEMail']['oggetti']['{EMAIL}']="EMAIL";
query['rubricaEMail']['oggetti']['{REPARTO}']="REPARTO";

function attivaCmdEMail(){
    if (recuperaCheckedElemento("chkOAuth") && xSuperUser==1){
        document.getElementById("cmdOAuth").classList.remove("hide");
    } else {
        document.getElementById("cmdOAuth").classList.add("hide");
    }
}

function assegnaDesMittente(){
    nomeMittente=recuperaValueElemento("txtNomeMittente");
    mailMittente=recuperaValueElemento("txtEMailMittente");
    valorizzaHTMLElemento("divMittente",nomeMittente+' &lt;'+mailMittente+'&gt;');
}

function caricaParametriEMail(){
    if (xIdCliente>0){
        valorizzaValueElemento("txtEMailMittente",xUserCom);
        valorizzaValueElemento("txtNomeMittente",xNome+' '+xCognome);
    } else {
        valorizzaValueElemento("txtEMailMittente",xMailMittente);
        valorizzaValueElemento("txtNomeMittente",xNomeMittente);
    }
    
    if (xSuperUser==1){
        document.getElementById("divPerTutti").classList.remove("hide");
    }

    assegnaDesMittente();

    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":"eMail", "userName":xUserCom}; 

    elencoInCaricamento=1;

    inviaRichiestaCentralino("parametri",parametri,eleboraCaricaParametriEMail);
}

var parametriEMail={nomeMittente:"",mailMittente:"",mailReply:"",nomeReply:"",smtpServer:"",smtpPort:"",
                    smtpSecure:"",smtpAuth:"",smtpUser:"",smtpPassword:"",oAuth2:"", perTutti:0};

function eleboraCaricaParametriEMail(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    for (x in data){
        if (!isNaN(Number(data[x]["valore"]))){
            parametriEMail[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriEMail[data[x]["parametro"]]=data[x]["valore"];
        }  
    }

    if ((xIdCliente==0 && xIdAgente==0)||parametriEMail.perTutti==0){
        if (parametriEMail.nomeReply!=''){
            valorizzaValueElemento("txtNomeMittente",parametriEMail.nomeReply);
        } else if (parametriEMail.nomeMittente!=''){    
            valorizzaValueElemento("txtNomeMittente",parametriEMail.nomeMittente);
        }
    
        if (parametriEMail.mailReply!=''){
            valorizzaValueElemento("txtEMailMittente",parametriEMail.mailReply);
        } else if (parametriEMail.mailMittente!=''){
            valorizzaValueElemento("txtEMailMittente",parametriEMail.mailMittente);
        }

        assegnaDesMittente()

        valorizzaValueElemento("txtServer",parametriEMail.smtpServer);
        valorizzaValueElemento("txtUserName",parametriEMail.smtpUser);
        valorizzaValueElemento("txtPassword",parametriEMail.smtpPassword);
        valorizzaValueElemento("txtPorta",parametriEMail.smtpPort);
        
        if (parametriEMail.smtpSecure=="ssl"){
            valorizzaCheckedElemento("chkSSL",true);
        }
        
        if (parametriEMail.smtpSecure=="tls"){
            valorizzaCheckedElemento("chkTLS",true);
        }

        if (parametriEMail.oAuth2==1){
            valorizzaCheckedElemento("chkOAuth",true);
            attivaCmdEMail();
        }

        if (parametriEMail.perTutti==1){
            valorizzaCheckedElemento("chkPerTutti",true);
        }
    }
}

function chiudiEMail(){
    var divEMail=document.getElementById('modEMail');
    divEMail.parentNode.removeChild(divEMail);
    var scr=document.getElementById("scrEMail");
    scr.parentNode.removeChild(scr);
}

var inputElement;

function apriAllegaFile(){
    try {
        inputElement=document.getElementById("fileElem");
        inputElement.addEventListener ("change", handleFiles, false);

        inputElement.click();
    } catch (error) {
        
    }
}

var allegatiAggiuntivi={};

function handleFiles (evt) {
    var tgt = evt.target || window.event.srcElement,
    files = tgt.files;

    const fileList = this.files;

    for (i=0;i<files.length;i++){
        url=URL.createObjectURL(files[i]);
        allegatiAggiuntivi[url]=fileList[i];
        var ul=document.getElementById("elencoAllegati");
        ul.innerHTML+=elementiAllegati.replace(/{URL}/g,url).replace(/{NOMEFILE}/g,files[i].name).replace(/ hide/g,'');
    }
}

function rimuoviAllegato(nomeFile,url){
    var li=document.getElementById("emAt."+nomeFile);
    li.parentNode.removeChild(li);
    delete allegatiAggiuntivi[url];
}

var parametriInvioMail;

function inviaMail(){
    var nomeMittente="";
    var mailMittente="";
    var nomeReply="";
    var mailReply="";
    var parametriMail="";
    var perTutti=0;

    var dominioMitt=recuperaValueElemento("txtEMailMittente");
    var dominioUser=recuperaValueElemento("txtServer");
    var noServer=false;

    if (recuperaValueElemento("txtServer")!=''){
        parametriMail={};

        if (dominioMitt!='' && dominioUser!=''){
            nomeReply=recuperaValueElemento("txtNomeMittente");
            mailReply=recuperaValueElemento("txtEMailMittente");

            if (recuperaValueElemento("txtUserName").indexOf("@")>0){
                mailMittente=recuperaValueElemento("txtUserName");
            } else {
                mailMittente="";
            }
        } else {
            mailMittente=recuperaValueElemento("txtEMailMittente");
        }

        nomeMittente=recuperaValueElemento("txtNomeMittente");

        parametriMail.nomeMittente=recuperaValueElemento("txtNomeMittente");
        parametriMail.mailMittente=recuperaValueElemento("txtEMailMittente");
        parametriMail.smtpServer=recuperaValueElemento("txtServer");
        parametriMail.smtpUser=recuperaValueElemento("txtUserName");
        parametriMail.smtpPassword=recuperaValueElemento("txtPassword");

        if (parametriMail.smtpUser!=''){
            parametriMail.smtpAuth="true";    
        }

        parametriMail.smtpPort=recuperaValueElemento("txtPorta");
        parametriMail.smtpSecure="";
        parametriMail.oAuth2="";

        if (recuperaCheckedElemento("chkTLS")==true){
            parametriMail.smtpSecure="tls";
        } else if (recuperaCheckedElemento("chkSSL")==true){
            parametriMail.smtpSecure="ssl";
        } 

        if (recuperaCheckedElemento("chkOAuth")==true){
            parametriMail.oAuth2="1";
        }

        if (xSuperUser==1){
            if (recuperaCheckedElemento("chkPerTutti")==true){
                perTutti=1;
            }
        }
    } else {
        nomeMittente=recuperaValueElemento("txtNomeMittente");
        nomeReply=recuperaValueElemento("txtNomeMittente");
        mailReply=recuperaValueElemento("txtEMailMittente");
    }

    var destinatario=recuperaValueElemento("txtDestinatario");
    var cc=recuperaValueElemento("txtCC");
    var ccn=recuperaValueElemento("txtCCn");
    var oggetto=recuperaValueElemento("txtOggetto");
    var messaggio=recuperaValueElemento("txtTesto");

    if (destinatario=="" && cc=="" && ccn==""){
        attivaAlert(2,"Destinatario non Valido!");
        document.getElementById("txtDestinatario").setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
        return;
    }

    if (oggetto==""){
        attivaAlert(2,"Oggetto non Valido!");
        document.getElementById("txtOggetto").setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
        return;
    }

    if (messaggio==""){
        attivaAlert(2,"Testo Messaggio non Valido!");
        document.getElementById("txtTesto").setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
        return;
    }

    var ul=document.getElementById("elencoAllegati");
    var li=ul.getElementsByTagName("li");
    var r=new RegExp(xUrlBase,"g");
    var allegati=[li[0].getAttribute("URL").replace(r,'')];

    for (x in allegatiAggiuntivi){
        allegati.push('pdf/'+xIdConfigurazione+'/'+xIdDispositivo+'/'+allegatiAggiuntivi[x].name);
    }

    var parametri={"tipoRisposta":"eMail","chiamante":"eMailPDF","nomeMittente":nomeMittente,"mailMittente":mailMittente,"nomeReply":nomeReply,
        "mailReply":mailReply, "mailDestinatario":destinatario, "mailCc":cc, "mailCcn":ccn,"oggetto":oggetto,"messaggio":messaggio, "perTutti":perTutti}; 

    if (parametriMail!=''){
        parametri.parametriMail=parametriMail;
    }

    if (allegati!=''){
        parametri.arrayAllegati=allegati;
    }

    elencoInCaricamento=1;

    if (allegati.length>1){
        parametriInvioMail=parametri;
        FileUpload(allegatiAggiuntivi);
    }  else {
        inviaRichiestaCentralino("eMail",parametri,elaboraRispostaEMail);
    }
}

function elaboraRispostaEMail(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (data==true || data=="true"){
        attivaAlert(4,"e-Mail Inviata Correttamente","OkMail");
        for(x in allegatiAggiuntivi) {
            URL.revokeObjectURL(allegatiAggiuntivi[x]);
        }
        chiudiEMail();
    } else {
        attivaAlert(2,data);
    }
}

function FileUpload(allegatiAggiuntivi) {
    var r=0;
    var formData = new FormData();
    for(x in allegatiAggiuntivi) {
        r++;
        formData.append(xIdDispositivo+'§'+xTkCom+'§'+xUserCom.replace(/\./g,"__")+"§"+xIdConfigurazione+"§"+r, allegatiAggiuntivi[x]);	
    }

    var parametri={"chiamante":"FileUpload"};

    inviaRichiestaCentralinoUploadFile(formData,parametri,elaboraFileUpload);
}

function elaboraFileUpload(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    if (data=="ok"){
        inviaRichiestaCentralino("eMail",parametriInvioMail,elaboraRispostaEMail);
    }
}

function apriEMRubrica(idDest){
    var div=document.getElementById("modEMailRubrica");
    if (div!=undefined){
        div.setAttribute("elementoDest",idDest);
        div.style.display="block";
        return;
    } 

    var divC=document.getElementById("modEMail");

    div=document.createElement("div");
    
    div.id = "modEMailRubrica" 
    div.setAttribute("name","modEMailRubrica"); 
    div.setAttribute("class","modalEMailContainer clrUnset");
    div.setAttribute("elementoDest",idDest);
    div.innerHTML = modalEMailRubrica;

    divC.appendChild(div);

    var rect=divC.children[0].getBoundingClientRect();

    div.children[0].style.height=rect.height+"px";

    div.style.display="block";

    valorizzaCheckedElemento("chkEMCliCor",true);

    caricaRubrica()
}

function caricaRubrica(ricarica=true){
    if (query["rubricaEMail"]['MAXFETCH']){
        maxFetch=query["rubricaEMail"]['MAXFETCH'];
    }

    if (ricarica){
        maxFetch=0;
        query["rubricaEMail"]['OFFSET']=0;
    }

    if (query["rubricaEMail"]['OFFSET']>maxFetch && maxFetch!=0) {
        return '';
    }
    
    var idCliente=0;

    if (recuperaCheckedElemento("chkEMCliCor")){
        idCliente=document.getElementById("modEMail").getAttribute("idCliente");
    }

    var ricerca=recuperaValueElemento("txtRicercaEM");

    var parametri={"tipoRisposta":"popolaelencoEMRubrica","tipoQuery":"querySpecifica","nomeTabella":"rubricaEMail", "idCliente":idCliente, "ricarica":ricarica,
        "offSet":query["rubricaEMail"]['OFFSET'],"fetch":query["rubricaEMail"]['FETCH'],"chiamante":"emRubica","ricerca":ricerca
    };

    elencoInCaricamento=1;

    inviaRichiestaCentralino("query",parametri,elaboraCaricaRubrica);
}
function elaboraCaricaRubrica(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    elencoInCaricamento=0;
    query["rubricaEMail"]['OFFSET']+=query["rubricaEMail"]['FETCH'];

    popolaElencoDaJson(data,"elencoEMRubrica",0,"rubricaEMail",parametri["ricarica"],0);
}

function elencoEMRubricaScroll(ec) {
    var scrollPos = ec.scrollTop;
    var maxScroll = ec.scrollHeight - ec.clientHeight;

    if (maxScroll-scrollPos<(maxScroll/100) && elencoInCaricamento==0) {
        caricaRubrica(false);
    }
}

function txtRicercaEMRChange() {
    if (timer1) {
        clearTimeout(timer1);
    }
    timer1=setTimeout(function() { 
        caricaRubrica();
    }, 1000);
}

function selezioneEMRubrica(li){
    var div=document.getElementById("modEMailRubrica");
    var eDest=div.getAttribute("elementoDest");
    var eMail=li.getAttribute("eMail");

    valorizzaValueElemento(eDest,eMail);

    div.style.display="none";
}

function recuperaRefreshToken(){
    var smtpUserName=recuperaValueElemento("txtUserName");
    if (smtpUserName==''){
        attivaAlert(2,"User Name di Autenticazione Mancante!","errore");
        return;
    }

    var autenticazione="&userName="+xUserCom+"&smtpUserName="+smtpUserName+"&comToken="+xTkCom+"&idDispositivo="+xIdDispositivo;
    var url=xUrlBase+"backend/php/get_oauth_token.php?provider=Google"+autenticazione;

    window.open(url,"_blank");
}