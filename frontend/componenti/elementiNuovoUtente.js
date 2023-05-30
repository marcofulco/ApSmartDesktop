var elementiNuovoServer=`<li id="li.{ID}" name="li.{ID}" class="w100-15p clrSfumatoScuro elementiGriglia marg5Bottom padTop5 padSx10">
	<div class="elementiGriglia w100">
		<div class="row w100-120p padTop5 normale">{dConfigurazione}</div>
        <div class="row w120p">
            <div class="row w10p hidden">div</div>
            <img class="row w40p" src="img/bianche/edit.svg" onclick="apriModificaServer('{ID}')">
            <div class="row w5p hidden">div</div>
            <img class="row w40p" src="img/bianche/delete.svg" onclick="eliminaServer('{ID}');">
        </div>
	</div>
</li>`;

var liXAddR=`<li id="liAddR" name="liAddR" class="w100-10p clrSfumatoScuro elementiGriglia marg5Bottom"></li>`;

var elementiServerAdd=`<div id="divAddR" class="elementiGriglia marg10Top w100">
        <input id="txtIDServer" type="number" class="w100-10p hide" placeholder="ID">
        <input id="txtDesServer" type="text" class="w100-10p hide" placeholder="ID">
        <div id="divServer" name="divServer" class="has-float-label w100">
			<span name="cmbValServer" class="selectDefault" id="0">Seleziona Configurazione</span>
			<label for="cmbServer" >Configurazione</label>
			<select id="cmbServer" name="cmbServer" class="selectBox" onchange="changeSelect(this)">
				<option value="0">Seleziona Configurazione</option>
			</select>
		</div>
		<div class="has-float-label col6 ">
			<input id="txtAzienda" type="number" class="w100-10p" placeholder="ID Azienda" onkeypress="resetErrore(this)">
			<label for="txtAzienda" >ID Azienda</label>
		</div>
		<div class="has-float-label row w100 ">
			<input id="txtDeposito" type="text" class="w100-10p" placeholder="ID Depositi" onkeypress="resetErrore(this)">
			<label for="txtDeposito" >ID Deposito</label>
		</div>
		<div class="has-float-label row w100 ">
			<input id="txtAgente" type="number" class="w100-10p" placeholder="ID Agente" onkeypress="resetErrore(this)">
			<label for="txtAgente" >ID Agente</label>
		</div>
		<div class="has-float-label row w100">
			<input id="txtCliente" type="number" class="w100-10p" placeholder="ID Cliente" onkeypress="resetErrore(this)">
			<label for="txtCliente" >ID Cliente</label>
		</div>
        <div class="has-float-label row w100">
			<input id="txtVettore" type="number" class="w100-10p" placeholder="ID Vettore" onkeypress="resetErrore(this)">
			<label for="txtVettore" >ID Vettore</label>
		</div>
		<div class="has-float-label row w100">
			<input id="txtListinoTipo" type="text" class="w100-10p" placeholder="Tipo Listino" onkeypress="resetErrore(this)">
			<label for="txtListinoTipo" >Tipo Listino</label>
		</div>
		<div class="has-float-label row w100">
			<input id="txtListino" type="text" class="w100-10p" placeholder="Listino" onkeypress="resetErrore(this)">
			<label for="txtListino" >Listino</label>
		</div>
        <div class="has-float-label row w100">
			<input id="txtDescrizioneS" type="text" class="w100-10p" placeholder="Descrizione Associazione Server" onkeypress="resetErrore(this)">
			<label for="txtDescrizioneS" >Descrizione Associazione Server</label>
		</div>
		<div class="pulsantiera">
			<a id="cmdSalvaR" href="#" class="w50" title="Salva" onclick="SalvaServer()"><img src="img/bianche/save.svg"/></a>
			<a id="cmdAnnullaR" href="#" class="w50" title="Annulla" onclick="AnnullaAddR()"><img src="img/bianche/annulla.svg"/></a>
		</div>
	</div>`;

var parametriRNC={"obbligatori":"cmbServer;txtAzienda;txtDeposito;txtAgente;txtCliente;txtListinoTipo;txtListino"};
var jSonConfig;
var idNew=0;

function aggiungiLiR(){
    if (document.getElementById("divAddR")==undefined){
        var ul=document.getElementById("elencoServer");
        ul.innerHTML+=liXAddR;

        var li=document.getElementById("liAddR");
        li.innerHTML=elementiServerAdd;

        jSonConfig=localStorage.getItem("cmbServer.jSon");
        if (jSonConfig!=undefined){
            jSonConfig=JSON.parse(jSonConfig);
            popolaSelectDaJSON(jSonConfig,"cmbServer");
        }

        ul.scrollTop=ul.scrollHeight;
        document.getElementById("cmbServer").focus();
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

function SalvaServer(id=0){
    var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;
    var idOrig=id;

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

    if (skUtente!=undefined){
        var jSon=JSON.parse(skUtente);
    } else {
        var jSon={};

        jSon.tipoSalva="salva";

        for (x in query['nuovoUtente.html']['oggetti']){
            if (x!="elencoServer"){
                jSon[query['nuovoUtente.html']['oggetti'][x]]=recuperaValueElemento(x);
            }
        }

        jSon.server=[];
    }
    
    var appo={};

    if (id==0){
        idNew-=1;
        id=idNew;
    }

    for (x in query['nuovoUtente.html:elencoServerM']['oggetti']){
        appo[query['nuovoUtente.html:elencoServerM']['oggetti'][x]]=recuperaValueElemento(x);
    }

    if (id<0){
        appo.ID=String(id);
    }

    x=-1;
    i=-1;

    if (jSon.server.length>0){
        for (i in jSon.server){
            if (jSon.server[i].ID==id){
                x=i;
                break;
            }
        }
    }

    if (x==-1){
        x=Number(i)+1;
    } else {
        appo.modificato=1;
    }

    jSon.server[x]=appo;
    skUtente=JSON.stringify(jSon);

    sessionStorage.setItem("skUtente",skUtente);

    AnnullaAddR(idOrig);    
    popolaElencoDaJson(jSon.server,"elencoServer",0,nomePagina+":elencoServer",true);
}

function eliminaServer(id){
    attivaAlert(5,"Sei sicuro di voler eliminare questa configurazione dall'utente corrente?","rispEliminaServer_"+id);
}

function rispEliminaServer(risp,id){
    if (risp=="Si"){
        avviaEliminaServer(id);
    } else {
        chiudiModalAlert("rispEliminaServer");
    }
}

function avviaEliminaServer(id){
    var jSon=JSON.parse(skUtente);
    for (i in jSon.server){
        if (jSon.server[i].ID==id){
            jSon.server[i].eliminato=1;
            skUtente=JSON.stringify(jSon);

            sessionStorage.setItem("skUtente",skUtente);
            popolaElencoDaJson(jSon.server,"elencoServer",0,nomePagina+":elencoServer",true);
            break;
        }
    }
}

var liOrig;

function apriModificaServer(id){
    if (document.getElementById("divAddR")==undefined){
        var jSonModal=JSON.parse(skUtente).server;

        for (x in jSonModal){
            if (jSonModal[x].ID==id){
                var li=document.getElementById("li."+id);
                liOrig=li.innerHTML;
                li.innerHTML=elementiServerAdd;

                document.getElementById("cmdSalvaR").setAttribute("onclick","SalvaServer('"+id+"')");
                document.getElementById("cmdAnnullaR").setAttribute("onclick","AnnullaAddR('"+id+"')");

                jSonConfig=localStorage.getItem("cmbServer.jSon");
                if (jSonConfig!=undefined){
                    jSonConfig=JSON.parse(jSonConfig);
                    popolaSelectDaJSON(jSonConfig,"cmbServer");
                }
                
                popolaFormModificaDati(jSonModal[x],"nuovoUtente.html:elencoServerM");
            }
        }
    } else {
        attivaAlert(0,"Concludere la modifica in Corso!","apriModificaRubrica");
    }
}

function changeSelectPaginaCorrente(s){
    if (s.id=="cmbServer"){
        var idS=recuperaValueElemento("cmbServer");
        if (jSonConfig!=undefined){
            for (x in jSonConfig){
                if (jSonConfig[x]["id"]==idS){
                    valorizzaValueElemento("txtAzienda",jSonConfig[x]["azienda"]);
                    valorizzaValueElemento("txtDeposito",jSonConfig[x]["deposito"]);
                    valorizzaValueElemento("txtListinoTipo",jSonConfig[x]["listinoTipo"]);
                    valorizzaValueElemento("txtListino",jSonConfig[x]["listino"]);
                    valorizzaValueElemento("txtDesServer",jSonConfig[x]["descrizione"]);

                    if (recuperaValueElemento("txtAgente")==""){
                        valorizzaValueElemento("txtAgente",0);
                    }

                    if (recuperaValueElemento("txtCliente")==""){
                        valorizzaValueElemento("txtCliente",0);
                    }

                    if (recuperaValueElemento("txtVettore")==""){
                        valorizzaValueElemento("txtVettore",0);
                    }

                    return;
                }
            }
        }
    }
}