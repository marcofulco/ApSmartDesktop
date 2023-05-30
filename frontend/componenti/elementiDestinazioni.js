var globalClickButton=false;
var globalModificaInCorso=false;
var hideMod="";

if (nomePagina!="schedaCliente.html" || xIdCliente>0){
	hideMod='hide';
}

var wa="";

if (gRe==undefined || gRe==""){
    wa="whatsapp://send/?phone=";
} else {
    wa="https://wa.me/";
}

var modalDestinazioniAdd=`<div class="pulsantiera posLeftA5p posBottomA10p">
<a id="cmdAddD" name="cmdAddD" href="#" class="w100-10p" title="Aggiungi" onclick="aggiungiLiD();"><img src="img/bianche/add.svg"/></a>
</div>`;

var elementiDestinazioni=`<li id="li.{ID}" name="{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom" onClick="selezionaDestinazione(\`{ID}\`,\`{RAGIONE_SOCIALE}\`,\`{INDIRIZZO}\`,\`{LOCALITAPULITA}\`,\`{CAP}\`,\`{PROV}\`,\`{TEL}\`,\`{FAX}\`,\`{PAGAMENTOD}\`,\`{AGENTED}\`,\`{VETTORED}\`,\`{DEPOSITOD}\`,\`{DESPAGAMENTO}\`,\`{LISTINODEST}\`,\`{RAGGRUPPAMENTOD}\`)">
	<div class="elementiGriglia w100">
		<div class="row fasciaIntestazione marg10Top w100-10p">
			<h3 class="row w100-80p testoTroncato h30p">{RAGIONE_SOCIALE}{DESPREDEFINITA}</h3>
			<div class="row w75p marg5Top ${hideMod}">
				<div class="row w7p hidden">div</div>
				<img class="row w30p" src="img/bianche/edit.svg" onclick="apriModificaDestinazione('{ID}')">
				<div class="row w5p hidden">div</div>
				<img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaDestinazione('{ID}');">
			</div>
		</div>
		<div class="row w100">
			<div class="row w100p h40p normale padSx5">Indirizzo</div>
			<a id="aMap" href="http://maps.apple.com/?address={MAP}" class="{HIDEMAP}" target="_blank" onclick="globalClickButton=true"><img class="row w40p h30p" src="img/bianche/place.svg" alt=""></a>
			<div id="divIndirizzo{ID}" class="row w100-145p normale">{INDIRIZZO}</div>
		</div>
		<div class="row w100" onclick="mostraNascondiElemento('divDatiAggDestinazione.{ID}','hide',document.getElementById('cmdDatiAggDes.{ID}'))">
			<div class="row w100p h40p normale padSx5">Località</div>
			<div id="divLocalita{ID}" class="row w100-135p normale">{LOCALITA} {NAZIONED}</div>
            <img id="cmdDatiAggDes.{ID}" class="row w30p pulsantiNoSfondo" src="img/bianche/down.svg" alt="">
		</div>
		<div id="divCAP{ID}" class="row w100-105p normale hide">{CAP}</div>
		<div id="divProv{ID}" class="row w100-105p normale hide">{PROV}</div>
        <div id="divNazione{ID}" class="row w100-105p normale hide">{NAZIONED}</div>
        <div id="divDatiAggDestinazione.{ID}" class="row w100 hide">
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Telefono</div>
                <a id="aTelefono1{ID}" href="tel:{TEL}" class="{HIDETEL}" onclick="globalClickButton=true"><img class="row w40p h30p" src="img/bianche/phone.svg" alt=""></a>
                <a id="wTelefono1{ID}" href="${wa}39{TEL}" target="_blank" class="{HIDETEL}" onclick="globalClickButton=true"><img class="row w40p h30p" src="img/bianche/whatsapp.svg" alt=""></a>
                <div id="divTelefono1{ID}" class="row w100-290p normale">{TEL}</div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Fax</div>
                <a id="aFax{ID}" href="tel:{FAX}" class="{HIDEFAX}" onclick="globalClickButton=true"><img class="row w40p h30p" src="img/bianche/phone.svg" alt=""></a>
                <a id="wFax{ID}" href="${wa}39{FAX}" target="_blank" class="{HIDEFAX}" onclick="globalClickButton=true"><img class="row w40p h30p" src="img/bianche/whatsapp.svg" alt=""></a>
                <div id="divFax{ID}" class="row w100-290p normale">{FAX}</div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5 marg5Bottom">e-Mail</div>
                <div class="row h40p normale w100-120p">
                    <a id="aAttivaB2bD{ID}" class="{hideAttivaB2B}"><img id="cmdAttivaB2BD.{ID}" src="img/grafiche/attivaB2B.svg" title="Attiva B2B" alt="" class="row h40p" onclick="globalClickButton=true; attivaB2B('diveMail{ID}',{ID});"></a>
                    <a id="aeMail{ID}" href="mailto:{EMAILD}" class="" onclick="globalClickButton=true"><img class="row w40p h30p {HIDEEMAIL}" src="img/bianche/mail.svg" alt=""></a>
                    <div id="diveMail{ID}" class="row w100-195p normale" style="overflow-x: auto;">{EMAILD}</div>
                </div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Contatto</div>
                <div id="divContatto{ID}" class="row w100-105p normale">{CONTATTOD}</div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Pagam.to</div>
                <div id="divPagamento{ID}" class="row w100-105p normale">{DESPAGAMENTO}</div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Listino</div>
                <div id="divListinoD{ID}" class="row w100-105p normale">{DESLISTINO}</div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Agente</div>
                <div id="divAgente{ID}" class="row w100-145p normale">{DESAGENTE}</div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Vettore</div>
                <div id="divVettore{ID}" class="row w100-145p normale">{DESVETTORE}</div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Deposito</div>
                <div id="divDeposito{ID}" class="row w100-145p normale">{DESDEPOSITO}</div>
            </div>
            <div class="row w100">
                <div class="row w100p h40p normale padSx5">Famiglia</div>
                <div id="divRaggruppamentoD{ID}" class="row w100-145p normale">{DESRAGGRUPPAMENTOD}</div>
            </div>
            <div class="row col4">
                <div class="row w100p h40p normale padSx5">SDI</div>
                <div id="divSDI{ID}" class="row w100-105p normale">{SDI_DEST}</div>
            </div>
            <div class="row col4">
                <div class="row w100p h40p normale padSx5">PEC</div>
                <div id="divPEC{ID}" class="row w100-105p normale">{PECD}</div>
            </div>
            <div id="divNoteD{ID}" class="row w100">
                <div class="row w100p h40p normale padSx5">Note</div>
                <div id="divNote{ID}" class="row w100-105p normale">{NOTED}</div>
            </div>
        </div>
	</div>
</li>`;

var liXAddD=`<li id="liAddD" name="liAddD" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom"></li>`;
var elementiDestinazioniAdd=`<div id="divAddD" class="elementiGriglia marg10Top w100">
    <div class="has-float-label w100 ">
        <input id="txtRagioneSocialeD" type="text" class="w100-10p" placeholder="Descrizione" onkeypress="resetErrore(this)">
        <label for="txtRagioneSocialeD" >Descrizione</label>
    </div>
    <div class="has-float-label w100">
        <input id="txtIndirizzoD" type="text" class="w100-10p" placeholder="Indirizzo" maxlength="100">
        <label for="txtIndirizzoD" >Indirizzo</label>
    </div>
    <div class="row w100">
        <div class="has-float-label row w50">
            <input id="txtLocalitaD" type="text" class="w100-10p" placeholder="Località" maxlength="100">
            <label for="txtLocalitaD" >Località</label>
        </div>
        <div class="has-float-label row w30">
            <input id="txtCAPD" type="text" class="w100-10p" placeholder="CAP" maxlength="5">
            <label for="txtCAPD" >CAP</label>
        </div>
        <div class="has-float-label row w20">
            <input id="txtProvD" type="text" class="w100-20p" placeholder="Prov." maxlength="2">
            <label for="txtProvD" >Prov.</label>
        </div>
        <div id="divNazione" name="divNazione" class="row has-float-label col6">
            <span class="selectDefault" id="0">Seleziona Nazione</span>
            <label for="cmbNazione" >Nazione</label>
            <select id="cmbNazione" name="cmbNazione" class="selectBox" onchange="changeSelect(this)" placeholder="Nazione">
                <option value="0">Seleziona Nazione</option>
            </select>
        </div>
    </div>
    <div class="has-float-label row w100 ">
        <input id="txtTelD" type="text" class="w100-10p" placeholder="Telefono" onkeypress="resetErrore(this)">
        <label for="txtTelD" >Telefono 1</label>
    </div>
    <div class="has-float-label row w100">
        <input id="txtFaxD" type="text" class="w100-10p" placeholder="Fax" onkeypress="resetErrore(this)">
        <label for="txtFaxD" >Fax</label>
    </div>
    <div class="has-float-label row w100 ">
        <input id="txteMail" type="text" class="w100-10p" placeholder="eMail" onkeypress="resetErrore(this)">
        <label for="txteMail" >eMail</label>
    </div>
    <div class="has-float-label row w100 ">
        <input id="txtContatto" type="text" class="w100-10p" placeholder="Contatto" onkeypress="resetErrore(this)">
        <label for="txtContatto" >Contatto</label>
    </div>
    <div class="row w100">
        <div id="divListino" name="divListino" class="has-float-label col6">
            <span class="selectDefault" id="0">Seleziona Listino</span>
            <label for="cmbListino" >Listino</label>
            <select id="cmbListino" name="cmbListino" class="selectBox" onchange="changeSelect(this)">
                <option value="0">Seleziona Listino</option>
            </select>
        </div>
        <div id="divPagamento" name="divPagamento" class="has-float-label col6">
            <span class="selectDefault" id="0">Seleziona Pagamento</span>
            <label for="cmbPagamento" >Pagamento</label>
            <select id="cmbPagamento" name="cmbPagamento" class="selectBox" onchange="changeSelect(this)">
                <option value="0">Seleziona Pagamento</option>
            </select>
        </div>
        <div id="divAgenteD" name="divAgente" class="row has-float-label col6">
            <span class="selectDefault" id="0">Seleziona Agente</span>
            <label for="cmbAgente" >Agente</label>
            <select id="cmbAgente" name="cmbAgente" class="selectBox" onchange="changeSelect(this)">
                <option value="0">Seleziona Agente</option>
            </select>
        </div>
        <div id="divVettore" name="divVettore" class="has-float-label col6">
            <span class="selectDefault" id="0">Seleziona Vettore</span>
            <label for="cmbVettore" >Vettore</label>
            <select id="cmbVettore" name="cmbVettore" class="selectBox" onchange="changeSelect(this)">
                <option value="0">Seleziona Vettore</option>
            </select>
        </div>
        <div id="divDeposito" name="divDeposito" class="has-float-label col6">
            <span class="selectDefault" id="0">Seleziona Deposito</span>
            <label for="cmbDeposito" >Deposito</label>
            <select id="cmbDeposito" name="cmbDeposito" class="selectBox" onchange="changeSelect(this)">
                <option value="0">Seleziona Deposito</option>
            </select>
        </div>
        <div id="divRaggruppamentoD" name="divRaggruppamentoD" class="has-float-label col6">
            <span class="selectDefault" id="0">Seleziona Raggruppamento</span>
            <label for="cmbRaggruppamentoD" >Raggruppamento</label>
            <select id="cmbRaggruppamentoD" name="cmbRaggruppamentoD" class="selectBox" onchange="changeSelect(this)">
                <option value="0">Seleziona Raggruppamento</option>
            </select>
        </div>
        <div class="has-float-label row col4 ">
            <input id="txtPECD" type="text" class="w100-10p" placeholder="PEC" onkeypress="resetErrore(this)">
            <label for="txtPECD" >PEC</label>
        </div>

        <div class="has-float-label row col2 ">
            <input id="txtSDID" type="text" class="w100-15p" placeholder="Codice SDI" maxlength="7" onkeypress="resetErrore(this)">
            <label for="txtSDID" >Codice SDI</label>
        </div>
        <div class="has-float-label row w100">
            <textarea id="txtNoteD" type="text" placeholder="Note" class="testoNormale h80p" onkeypress="resetErrore(this)"></textarea>
            <label for="txtNoteD" >Note</label>
        </div>
    </div>
    <div class="pulsantiera">
        <a id="cmdSalvaD" href="#" class="w50" title="Salva" onclick="SalvaDestinazione()"><img src="img/bianche/save.svg"/></a>
        <a id="cmdAnnullaD" href="#" class="w50" title="Annulla" onclick="AnnullaAddD()"><img src="img/bianche/annulla.svg"/></a>
    </div>
</div>`;

query['nuovaDestinazione.html']=new Array;
query['nuovaDestinazione.html']['modelloRiga']=elementiDestinazioniAdd;
query['nuovaDestinazione.html']['oggetti']=new Array;
query['nuovaDestinazione.html']['oggetti']['txtRagioneSocialeD']="RAGIONE_SOCIALE";
query['nuovaDestinazione.html']['oggetti']['txtIndirizzoD']="INDIRIZZO";
query['nuovaDestinazione.html']['oggetti']['txtCAPD']="CAP";
query['nuovaDestinazione.html']['oggetti']['txtLocalitaD']="LOCALITA";
query['nuovaDestinazione.html']['oggetti']['txtProvD']="PROV";
query['nuovaDestinazione.html']['oggetti']['txtTelD']="TEL";
query['nuovaDestinazione.html']['oggetti']['txtFaxD']="FAX";
query['nuovaDestinazione.html']['oggetti']['txteMail']="EMAILD";
query['nuovaDestinazione.html']['oggetti']['txtContatto']="CONTATTOD";
query['nuovaDestinazione.html']['oggetti']['txtNoteD']="NOTED";
query['nuovaDestinazione.html']['oggetti']['txtSDID']="SDI_DEST";
query['nuovaDestinazione.html']['oggetti']['txtPECD']="PECD";
query['nuovaDestinazione.html']['oggetti']['cmbNazione']="NAZIONED";
query['nuovaDestinazione.html']['oggetti']['cmbPagamento']="PAGAMENTOD";
query['nuovaDestinazione.html']['oggetti']['cmbAgente']="AGENTED";
query['nuovaDestinazione.html']['oggetti']['cmbVettore']="VETTORED";
query['nuovaDestinazione.html']['oggetti']['cmbDeposito']="IDDEPOSITOD";
query['nuovaDestinazione.html']['oggetti']['cmbRaggruppamentoD']="RAGGRUPPAMENTOD";
query['nuovaDestinazione.html']['oggetti']['cmbListino']="LISTINODEST";

var parametriDNC={"obbligatori":"txtRagioneSocialeD;"};

function aggiungiLiD(){
    if (document.getElementById("divAddD")==undefined){
		globalModificaInCorso=true;
        var ul=document.getElementById("elencoDettagli");
        ul.innerHTML+=liXAddD;

        var li=document.getElementById("liAddD");
        li.innerHTML=elementiDestinazioniAdd;

        ul.scrollTop=ul.scrollHeight;
        document.getElementById("txtRagioneSocialeD").focus();

        popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbAgente.jSon")),"cmbAgente");
        popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbVettore.jSon")),"cmbVettore");
        popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbDeposito.jSon")),"cmbDeposito");
        popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbNazione.jSon")),"cmbNazione");
        popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbPagamento.jSon")),"cmbPagamento");
        popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbListino.jSon")),"cmbListino");
        popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbFamigliaCliFor.jSon")),"cmbRaggruppamentoD");
    }
}

function AnnullaAddD(id=0){
	globalClickButton=true;
	globalModificaInCorso=false;

    if (id==0){
        var e=document.getElementById("liAddD");
        e.parentNode.removeChild(e);
    } else {
        var e=document.getElementById("li."+id);
        e.innerHTML=liOrigD;
    }
}

function SalvaDestinazione(id=0){
	globalClickButton=true;

    var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;

    for (x in parametriDNC){
        if (x=="obbligatori") {
            v=parametriDNC.obbligatori.split(";")

            for (i=0;i<v.length-1;i++){
                if (v[i]=="cmbNazione"){
                    if (recuperaValueElemento(v[i])=="0" || recuperaValueElemento(v[i])==""){
                        errori=true;
                        e=document.getElementById(v[i]);
                        e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                        campi+=e.getAttribute("placeholder")+'<br>';
                    }
                } else {
                    if (recuperaValueElemento(v[i])==""){
                        errori=true;
                        e=document.getElementById(v[i]);
                        e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                        campi+=e.getAttribute("placeholder")+'<br>';
                    }
                }
            }
        }
    }

    if (errori){
        attivaAlert(2,"Non sono stati valorizzati i seguenti Campi Obbligatori:<br>"+campi,"erroriCampi");
        return;
    }

    var jSon={};

    for (x in query['nuovaDestinazione.html']['oggetti']){
        // if (x.indexOf("cmb")>=0){
        //     var cmb=recuperaHTMLElemento(x,true);
        //     if (cmb.indexOf("Seleziona")<0){
        //         jSon[query['nuovaDestinazione.html']['oggetti'][x]]=cmb;
        //     }
        // } else {
            jSon[query['nuovaDestinazione.html']['oggetti'][x]]=recuperaValueElemento(x);
        // }
    }

    jSon.ID_ANAG=idCliente;

    var tipo="salva";

    if (id>0){
        jSon.id=id;
        tipo="update";
    }

	globalModificaInCorso=false;

    var parametri={"tipoRisposta":tipo,"tipoSalva":"destinazioni", "dati":jSon};
    inviaRichiestaCentralino(tipo,parametri,elaboraRispostaSalvaDestinazione);
}

function elaboraRispostaSalvaDestinazione(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante il salvataggio della destinazione Diversa!","fineSalva");
        return "";
    }

    chiudiModalBox();
    apriDestinazioni();
}

function eliminaDestinazione(id){
	globalClickButton=true;
    attivaAlert(5,"Sei sicuro di voler eliminare questa Destinazione?","rispEliminaDestinazione_"+id);
}

function rispEliminaDestinazione(risp,id){
    if (risp=="Si"){
        avviaEliminaDestinazione(id);
    } else {
        chiudiModalAlert("rispEliminaDestinazione."+id);
    }
}

function avviaEliminaDestinazione(id){
    var parametri={"tipoRisposta":"elimina","tipoElimina":"destinazioni", "dati":id};
    inviaRichiestaCentralino("elimina",parametri,elaboraEliminaDestinazione);
}

function elaboraEliminaDestinazione(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante l'eliminazione della Destinazione","fineElimina");
        return "";
    }

    chiudiModalBox();
    apriDestinazioni();   
}

var liOrigD;

function apriModificaDestinazione(id){
	globalModificaInCorso=true;

    // try {
        
    // } catch (error) {
        
    // }

    if (document.getElementById("divAddD")==undefined){
        for (x in jSonModal){
            if (jSonModal[x].ID==id){
                var li=document.getElementById("li."+id);
                liOrigD=li.innerHTML;
                li.innerHTML=elementiDestinazioniAdd;

                document.getElementById("cmdSalvaD").setAttribute("onclick","SalvaDestinazione('"+id+"')");
                document.getElementById("cmdAnnullaD").setAttribute("onclick","AnnullaAddD('"+id+"')");

                popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbAgente.jSon")),"cmbAgente");
                popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbVettore.jSon")),"cmbVettore");
                popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbDeposito.jSon")),"cmbDeposito");
                popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbNazione.jSon")),"cmbNazione");
                popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbPagamento.jSon")),"cmbPagamento");
                popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbListino.jSon")),"cmbListino");
                popolaSelectDaJSON(JSON.parse(localStorage.getItem("cmbFamigliaCliFor.jSon")),"cmbRaggruppamentoD");

                popolaFormModificaDati(jSonModal[x],"nuovaDestinazione.html");
                document.getElementById("txtRagioneSocialeD").focus();
            }
        }
    } else {
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaDestinazione");
    }
}