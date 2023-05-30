var modalRubricaAdd=`<div class="pulsantiera posLeftA5p posBottomA10p">
<a id="cmdAddR" name="cmdAddR" href="#" class="w100-10p" title="Aggiungi" onclick="aggiungiLiR();"><img src="img/bianche/add.svg"/></a>
</div>`;

var wa="";

if (gRe==undefined || gRe==""){
    wa="whatsapp://send/?phone=";
} else {
    wa="https://wa.me/";
}

var elementiRubrica=`<li id="li.{ID}" name="{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom">
	<div class="elementiGriglia w100">
		<div class="row fasciaIntestazione marg10Top w100">
			<h3 class="row w100-80p testoTroncato h30p">{NOMINATIVO}</h3>
			<div class="row w75p marg5Top">
				<div class="row w7p hidden">div</div>
				<img class="row w30p" src="img/bianche/edit.svg" onclick="apriModificaRubrica('{ID}')">
				<div class="row w5p hidden">div</div>
				<img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaRubrica('{ID}');">
			</div>
		</div>
		<div class="row w100">
			<div class="row w100p h40p normale padSx5">Telefono</div>
			<a id="aTelefono1{ID}" href="tel:{TELEFONO}" class="{HIDETEL}"><img class="row w40p h30p" src="img/bianche/phone.svg" alt=""></a>
			<a id="wTelefono1{ID}" href="${wa}39{TELEFONO}" target="_blank" class="{HIDETEL}"><img class="row w40p h30p" src="img/bianche/whatsapp.svg" alt=""></a>
			<div id="divTelefono1{ID}" class="row w100-290p normale">{TELEFONO}</div>
		</div>
		<div class="row w100">
			<div class="row w100p h40p normale padSx5">Cellulare</div>
			<a id="aCel{ID}" href="tel:{CELLULARE}" class="{HIDECEL}"><img class="row w40p h30p" src="img/bianche/phone.svg" alt=""></a>
			<a id="wCel{ID}" href="${wa}39{CELLULARE}" target="_blank" class="{HIDECEL}"><img class="row w40p h30p" src="img/bianche/whatsapp.svg" alt=""></a>
			<div id="divCel" class="row w100-290p normale">{CELLULARE}</div>
		</div>
		<div class="row w100">
			<div class="row w100p h40p normale padSx5">e-Mail</div>
			<a id="aeMail{ID}" href="mailto:{EMAIL}" class="{HIDEMAIL}"><img class="row w40p h30p" src="img/bianche/mail.svg" alt=""></a>
			<div id="diveMail{ID}" class="row w100-145p normale" style="overflow-x:auto;">{EMAIL}</div>
		</div>
        <div id="divAttivaB2BR.{ID}" class="row col2 {hideAttivaB2B}">
            <div class="row w120p h40p normale padSx5 marg10Top">Attiva B2B</div>
            <div class="row w40p h40p normale marg-5Top padSx5">
                <img id="cmdRubrica" src="img/grafiche/attivaB2B.svg" title="Attiva B2B" alt="" class="h50p" onclick="attivaB2B(\'diveMail{ID}\')">
            </div>
        </div> 
		<div class="row w100">
			<div class="row w100p h40p normale padSx5">PEC</div>
			<a id="aPECR{ID}" href="mailto:{PECR}" class="{HIDEPECR}"><img class="row w40p h30p" src="img/bianche/mail.svg" alt=""></a>
			<div id="divPECR" class="row w100-145p normale">{PECR}</div>
		</div>
		<div class="row w100">
			<div class="row w100p h40p normale padSx5">Fax</div>
			<a id="aFax{ID}" href="tel:{FAX}" class="{HIDEFAX}"><img class="row w40p h30p" src="img/bianche/phone.svg" alt=""></a>
			<a id="wFax{ID}" href="${wa}39{FAX}" target="_blank" class="{HIDEFAX}"><img class="row w40p h30p" src="img/bianche/whatsapp.svg" alt=""></a>
			<div id="divFax" class="row w100-290p normale">{FAX}</div>
		</div>
		<div class="row w100">
			<div class="row w100p h40p normale padSx5">Reparto</div>
			<div id="divReparto" class="row w100-290p normale">{REPARTO}</div>
		</div>
	</div>
</li>`;

var liXAddR=`<li id="liAddR" name="liAddR" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom"></li>`;
var elementiRubricaAdd=`<div id="divAddR" class="elementiGriglia marg10Top w100">
		<div class="has-float-label col6 ">
			<input id="txtNominativoR" type="text" class="w100-10p" placeholder="Nominativo" onkeypress="resetErrore(this)">
			<label for="txtNominativoR" >Nominativo</label>
		</div>
		<div class="has-float-label row w100 ">
			<input id="txtTelR" type="text" class="w100-10p" placeholder="Telefono 1" onkeypress="resetErrore(this)">
			<label for="txtTelR" >Telefono 1</label>
		</div>
		<div class="has-float-label row w100 ">
			<input id="txtCellulareR" type="text" class="w100-10p" placeholder="Cellulare" onkeypress="resetErrore(this)">
			<label for="txtCellulareR" >Cellulare</label>
		</div>
		<div class="has-float-label row w100">
			<input id="txteMailR" type="text" class="w100-10p" placeholder="eMail" onkeypress="resetErrore(this)">
			<label for="txteMailR" >eMail</label>
		</div>
		<div class="has-float-label row w100">
			<input id="txtPECR" type="text" class="w100-10p" placeholder="PEC" onkeypress="resetErrore(this)">
			<label for="txtPECR" >PEC</label>
		</div>
		<div class="has-float-label row w100">
			<input id="txtFaxR" type="text" class="w100-10p" placeholder="Fax" onkeypress="resetErrore(this)">
			<label for="txtFaxR" >Fax</label>
		</div>
		<div id="divReparto" name="divReparto" class="has-float-label w100">
			<span name="cmbValReparto" class="selectDefault" id="0">Seleziona Reparto</span>
			<label for="cmbReparto" >Reparto</label>
			<select id="cmbReparto" name="cmbReparto" class="selectBox" onchange="changeSelect(this)">
				<option value="0">Seleziona Reparto</option>
				<option value="1">Assistenza</option>
				<option value="2">Contrassegni</option>
				<option value="3">Rappresentante</option>
				<option value="4">Titolare</option>
				<option value="5">Ufficio Acquisti</option>
				<option value="6">Amministrazione</option>
			</select>
		</div>
		<div class="pulsantiera">
			<a id="cmdSalvaR" href="#" class="w50" title="Salva" onclick="SalvaRubrica()"><img src="img/bianche/save.svg"/></a>
			<a id="cmdAnnullaR" href="#" class="w50" title="Annulla" onclick="AnnullaAddR()"><img src="img/bianche/annulla.svg"/></a>
		</div>
	</div>`;

query['nuovoCliente.html']=new Array;
query['nuovoCliente.html']['modelloRiga']=elementiRubricaAdd;
query['nuovoCliente.html']['oggetti']=new Array;
query['nuovoCliente.html']['oggetti']['txtNominativoR']="NOMINATIVO";
query['nuovoCliente.html']['oggetti']['txtTelR']="TELEFONO";
query['nuovoCliente.html']['oggetti']['txtFaxR']="FAX";
query['nuovoCliente.html']['oggetti']['txtCellulareR']="CELLULARE";
query['nuovoCliente.html']['oggetti']['txteMailR']="EMAIL";
query['nuovoCliente.html']['oggetti']['txtPECR']="PECR";
query['nuovoCliente.html']['oggetti']['cmbReparto']="REPARTO:Text";
query['nuovoCliente.html']['oggetti']['cmbValReparto']="REPARTO";

var parametriRNC={"obbligatori":"txtNominativoR;"};

function aggiungiLiR(){
    if (document.getElementById("divAddR")==undefined){
        var ul=document.getElementById("elencoDettagli");
        ul.innerHTML+=liXAddR;

        var li=document.getElementById("liAddR");
        li.innerHTML=elementiRubricaAdd;

        ul.scrollTop=ul.scrollHeight;
        document.getElementById("txtNominativoR").focus();
    }
}

function AnnullaAddR(id=0){
    var e=document.getElementById("liAddR");

    if (id==0){
        var e=document.getElementById("liAddR");
        e.parentNode.removeChild(e);
    } else {
        var e=document.getElementById("li."+id);
        e.innerHTML=liOrig;
    }
}

function SalvaRubrica(id=0){
    var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;

    for (x in parametriRNC){
        if (x=="obbligatori") {
            v=parametriRNC.obbligatori.split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    errori=true;
                    e=document.getElementById(v[i]);
                    e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi+=e.getAttribute("placeholder")+'<br>';
                }
            }
        }
    }

    if (errori){
        attivaAlert(2,"Non sono stati valorizzati i seguenti Campi Obbligatori:<br>"+campi,"erroriCampi");
        return;
    }

    if (recuperaValueElemento("txteMailR")!=""){
        if (!validazioneEmail("txteMailR")){
            return;
        }
    }

    var jSon={};

    for (x in query['nuovoCliente.html']['oggetti']){
        if (x.indexOf("cmb")>=0){
            var cmb=recuperaHTMLElemento(x,true);
            if (cmb.indexOf("Seleziona")<0){
                jSon[query['nuovoCliente.html']['oggetti'][x]]=cmb;
            }
        } else {
            jSon[query['nuovoCliente.html']['oggetti'][x]]=recuperaValueElemento(x);
        }
    }

    jSon.IDCLI=idCliente;

    var tipo="salva";

    if (id>0){
        jSon.id=id;
        tipo="update";
    }

    var parametri={"tipoRisposta":tipo,"tipoSalva":"rubrica", "dati":jSon};
    inviaRichiestaCentralino(tipo,parametri,elaboraRispostaSalvaRubrica);
}

function elaboraRispostaSalvaRubrica(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante il salvataggio del nominativo in Rubrica","fineSalva");
        return "";
    }

    chiudiModalBox();
    apriRubrica();
}

function eliminaRubrica(id){
    attivaAlert(5,"Sei sicuro di voler eliminare questo nominativo dalla Rubrica?","rispEliminaRubrica_"+id);
}

function rispEliminaRubrica(risp,id){
    if (risp=="Si"){
        avviaEliminaRubrica(id);
    } else {
        chiudiModalAlert("rispEliminaRubrica");
    }
}

function avviaEliminaRubrica(id){
    var parametri={"tipoRisposta":"elimina","tipoElimina":"rubrica", "dati":id};
    inviaRichiestaCentralino("elimina",parametri,elaboraEliminaRubrica);
}

function elaboraEliminaRubrica(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante l'eliminazione del nominativo dalla Rubrica","fineElimina");
        return "";
    }

    chiudiModalBox();
    apriRubrica();   
}

var liOrig;

function apriModificaRubrica(id){
    if (document.getElementById("divAddR")==undefined){
        for (x in jSonModal){
            if (jSonModal[x].ID==id){
                var li=document.getElementById("li."+id);
                liOrig=li.innerHTML;
                li.innerHTML=elementiRubricaAdd;

                document.getElementById("cmdSalvaR").setAttribute("onclick","SalvaRubrica('"+id+"')");
                document.getElementById("cmdAnnullaR").setAttribute("onclick","AnnullaAddR('"+id+"')");

                popolaFormModificaDati(jSonModal[x],"nuovoCliente.html");
                document.getElementById("txtNominativoR").focus();
            }
        }
    } else {
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaRubrica");
    }
}