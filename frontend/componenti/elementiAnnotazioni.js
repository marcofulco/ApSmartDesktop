var modalAnnotazioniAdd=`<div class="pulsantiera posLeftA5p posBottomA10p">
<a id="cmdAddA" name="cmdAddA" href="#" class="w100-10p" title="Aggiungi" onclick="aggiungiLiA();"><img src="img/bianche/add.svg"/></a>
</div>`;

var elementiAnnotazioni=`<li id="li.{ID}" name="{ID}" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom">
	<div class="elementiGriglia w100">
		<div class="row fasciaIntestazione marg10Top w100-10p">
			<h3 class="row w100-80p testoTroncato h30p">{DATA}</h3>
			<div class="row w75p marg5Top">
				<div class="row w7p hidden">div</div>
				<img class="row w30p" src="img/bianche/edit.svg" onclick="apriModificaAnnotazioni('{ID}')">
				<div class="row w5p hidden">div</div>
				<img class="row w30p" src="img/bianche/delete.svg" onclick="eliminaAnnotazione('{ID}');">
			</div>
		</div>
		<div class="row w100">
			<div id="divAnnotazione" class="row w100-10p normale">{DESINIT}</div>
		</div>
	</div>
</li>`;

var liXAddA=`<li id="liAddA" name="liAddA" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom"></li>`;
var elementiAnnotazioniAdd=`<div id="divAddA" class="elementiGriglia marg10Top w100">
    <div class="row datePikerContainer">
        <div id="divDataA" name="divDataA" class="has-float-label datePiker">
            <input id="txtDataA" name="txtDataA" type="date" placeholder="Data" onclick="resetErrore(this)">
            <label for="txtDataA" >Data</label>
        </div>
    </div>
    <div class="has-float-label row w100">
        <textarea id="txtDesInitA" type="text" placeholder="Annotazione" class="testoNormale h150p" onkeypress="resetErrore(this)"></textarea>
        <label for="txtDesInitA">Annotazione</label>
    </div>
    <div class="pulsantiera">
        <a id="cmdSalvaA" href="#" class="w50" title="Salva" onclick="SalvaAnnotazioni()"><img src="img/bianche/save.svg"/></a>
        <a id="cmdAnnullaA" href="#" class="w50" title="Annulla" onclick="AnnullaAddA()"><img src="img/bianche/annulla.svg"/></a>
    </div>
</div>`;

query['nuovaAnnotazione.html']=new Array;
query['nuovaAnnotazione.html']['modelloRiga']=elementiAnnotazioniAdd;
query['nuovaAnnotazione.html']['oggetti']=new Array;
query['nuovaAnnotazione.html']['oggetti']['txtDataA']="Scadenza";
query['nuovaAnnotazione.html']['oggetti']['txtDesInitA']="DESINIT";

var parametriANC={"obbligatori":"txtDataA;txtDesInitA;"};

function aggiungiLiA(){
    if (document.getElementById("divAddA")==undefined){
        var ul=document.getElementById("elencoDettagli");
        ul.innerHTML+=liXAddA;

        var li=document.getElementById("liAddA");
        li.innerHTML=elementiAnnotazioniAdd;

        ul.scrollTop=ul.scrollHeight;
        document.getElementById("txtDataA").focus();
    }
}

function AnnullaAddA(id=0){
    if (id==0){
        var e=document.getElementById("liAddA");
        e.parentNode.removeChild(e);
    } else {
        var e=document.getElementById("li."+id);
        e.innerHTML=liOrigD;
    }
}

function SalvaAnnotazioni(id=0){
	var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;

    for (x in parametriANC){
        if (x=="obbligatori") {
            v=parametriANC.obbligatori.split(";")
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

    var jSon={};

    for (x in query['nuovaAnnotazione.html']['oggetti']){
        if (x.indexOf("cmb")>=0){
            var cmb=recuperaHTMLElemento(x,true);
            if (cmb.indexOf("Seleziona")<0){
                jSon[query['nuovaAnnotazione.html']['oggetti'][x]]=cmb;
            }
        } else {
            jSon[query['nuovaAnnotazione.html']['oggetti'][x]]=recuperaValueElemento(x);
        }
    }

    jSon.IDRIF=idCliente;

    var tipo="salva";

    if (id>0){
        jSon.id=id;
        tipo="update";
    }

    var parametri={"tipoRisposta":tipo,"tipoSalva":"annotazioni", "dati":jSon};
    inviaRichiestaCentralino(tipo,parametri,elaboraRispostaSalvaAnnotazione);
}

function elaboraRispostaSalvaAnnotazione(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante il salvataggio dell'Annotazione!","fineSalva");
        return "";
    }

    chiudiModalBox();
    apriAnnotazioni();
}

function eliminaAnnotazione(id){
    attivaAlert(5,"Sei sicuro di voler eliminare questa Annotazione?","rispEliminaAnnotazione_"+id);
}

function rispEliminaAnnotazione(risp,id){
    if (risp=="Si"){
        avviaEliminaAnnotazione(id);
    } else {
        chiudiModalAlert("rispEliminaAnnotazione."+id);
    }
}

function avviaEliminaAnnotazione(id){
    var parametri={"tipoRisposta":"elimina","tipoElimina":"annotazioni", "dati":id};
    inviaRichiestaCentralino("elimina",parametri,elaboraEliminaAnnotazione);
}

function elaboraEliminaAnnotazione(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante l'eliminazione dell'Annotazione'","fineElimina");
        return "";
    }

    chiudiModalBox();
    apriAnnotazioni();   
}

var liOrigA;

function apriModificaAnnotazioni(id){
    if (document.getElementById("divAddA")==undefined){
        for (x in jSonModal){
            if (jSonModal[x].ID==id){
                var li=document.getElementById("li."+id);
                liOrigD=li.innerHTML;
                li.innerHTML=elementiAnnotazioniAdd;

                document.getElementById("cmdSalvaA").setAttribute("onclick","SalvaAnnotazioni('"+id+"')");
                document.getElementById("cmdAnnullaA").setAttribute("onclick","AnnullaAddA('"+id+"')");

                popolaFormModificaDati(jSonModal[x],"nuovaAnnotazione.html");
                document.getElementById("txtDataA").focus();
            }
        }
    } else {
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaAnnotazioni");
    }
}