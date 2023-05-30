query['gestioneAccount.html']=new Array;
query['gestioneAccount.html']['oggetti']=new Array;
query['gestioneAccount.html']['oggetti']['txtUserName']="userName";
query['gestioneAccount.html']['oggetti']['txtNome']="nome";
query['gestioneAccount.html']['oggetti']['txtCognome']="cognome";
query['gestioneAccount.html']['oggetti']['txteMail']="eMail";
query['gestioneAccount.html']['oggetti']['txtimgCaricata']="img";



var parametriNC={"obbligatori":"txtNome;txteMail;", "alternativi":"", "alternativi1":"", "nascosti":";"};

var skUtente=sessionStorage.getItem("skUtente");

window.addEventListener("load", function(event) {
    setTimeout( function() {

        recuperaParametri();
        
        avviaCarDati('datiAccount');
        
    }, 50);
});

function recuperaParametri(){
    var parametri={"tipoRisposta":"parametri","chiamante":"parametri","nomePagina":nomePagina, "userName":""}; 

    elencoInCaricamento=1;

    inviaRichiestaCentralino("parametri",parametri,elaboraParametri);
}

function elaboraParametri(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }

    for (x in data){
        if (!isNaN(Number(data[x]["valore"]))){
            parametriNC[data[x]["parametro"]]=Number(data[x]["valore"]);
        } else {
            parametriNC[data[x]["parametro"]]=data[x]["valore"];
        }  
    }

    if (parametriNC.nascosti!=''){
        m=parametriNC.nascosti.split(";");
        for (x in m){
            try {
                document.getElementById(m[x]).classList.add("hide");
            } catch (error) {
                
            }
        }
    }
}

function avviaCarDati(selectID){
    var parametri;

    switch (selectID){
        case "cmbGruppo":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"gruppiUtenti", "select":selectID, "db":"login"};
        break;
        case "cmbServer":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"configurazioniBase", "select":selectID, "db":"login"};
        break;
        case "datiAccount":
            parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"datiAccount", "select":selectID, "db":"login"};
        break;
    }   

    parametri.md5=localStorage.getItem(selectID+".md5");

    inviaRichiestaCentralino("query",parametri);
}

var risposte=0;

function elaboraRisposta(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    risposte+=1;

    if (risp.error!=''){
        return "";
    }

    if (Array.isArray(data)){
        if(data[0]==0){
            if (risposte==6 && idModifica>0){
                carDatiAnag();
            }

            return "";
        }
    }
    
    data=verificaMd5(parametri.select,parametri,risp,data);


    if(parametri.select=='datiAccount'){
        popolaFormModificaDati(data[0],'gestioneAccount.html');
        var img=document.getElementById('immaggineCaricata')
        if(data[0].img!=''){
            img.src=xUrlPHP+'img/User/'+data[0].img;
        }
        caricamentoForm(0)
    }
}

function carDatiAnag(){
    jSonCli=JSON.parse(skUtente);
    popolaFormModificaDati(jSonCli ,"nuovoUtente.html");
}

function esci(){
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href='mainPage.html';
    }else{
        window.open('mainPage.html','_self');
    }
}
var callbackCaricamentoImmagini;
function Salva(){
    var v;
    var errori=false;
    var campi="";
    var e;
    var campiAl;
    var r;

    for (x in parametriNC){
        if (x=="obbligatori") {
            v=parametriNC.obbligatori.split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    errori=true;
                    e=document.getElementById(v[i]);
                    e.setAttribute("style","border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;");
                    campi+=e.getAttribute("placeholder")+'<br>';
                }
            }
        } else if (x.indexOf("alternativi")>=0) {
            r=0;
            campiAl=[""];

            v=parametriNC[x].split(";")
            for (i=0;i<v.length-1;i++){
                if (recuperaValueElemento(v[i])==""){
                    r+=1;
                    campiAl[r]=v[i];
                } else {
                    r=0;
                    break;
                }
            }

            if (r>0){
                for (i=1;i<=r;i++){
                    errori=true;
                    e=document.getElementById(campiAl[i]);
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

    if (recuperaValueElemento("txteMail")!=""){
        if (!validazioneEmail("txteMail")){
            return;
        }
    }

    var tipoSalva="update";
    var jSon={}
    for (x in query['gestioneAccount.html']['oggetti']){
        if (x!="elencoServer"){
            jSon[query['gestioneAccount.html']['oggetti'][x]]=recuperaValueElemento(x);
        }
    }
    delete jSon["userName"]
    jSon.imgOld=recuperaValueElemento('txtimgCaricata');
    var parametri={"tipoRisposta":tipoSalva,"tipoSalva":"gestioneUtente", "dati":jSon, "db":"login"};
    if(!isEmpty(immaginiCaricate)){
        for(var [k,n] of Object.entries(immaginiCaricate)){
            jSon.img=n.name;
            jSon.imgNew=n.name;
            
        }
        
        var parametri={"tipoRisposta":tipoSalva,"tipoSalva":"gestioneUtente", "dati":jSon, "db":"login"};
        // parametriTmp=parametri;
        caricaImmagini(()=>{
            inviaRichiestaCentralino(tipoSalva,parametri,elaboraRispostaSalvaUtente);
        },true);
    }else{
        inviaRichiestaCentralino(tipoSalva,parametri,elaboraRispostaSalvaUtente);
    }
    
}
var parametriTmp;

function inviaRichiestaCentralinoTmp(){
    inviaRichiestaCentralino("update",parametriTmp,elaboraRispostaSalvaUtente);
}
function elaboraRispostaSalvaUtente(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante il salvataggio delle modiche dell'account, contattare l'assistenza","fineSalva");
        return "";
    }
    sessionStorage.setItem("img",data);
    esci();
}

function resetErrore(e){
    e.setAttribute("style","");
}
 
function valorizzaAltriCampiLocalita(){
    s=document.getElementById("cmbLocalita");

    var jLoc=JSON.parse(localStorage.getItem("cmbLocalita.jSon"));

    if (jLoc!=undefined){
        for (x in jLoc){
            if (jLoc[x].id==s.value){
                valorizzaValueElemento("txtCAP",jLoc[x].cap);
                valorizzaValueElemento("txtProv",jLoc[x].pr);
                valorizzaValueElemento("cmbRegione",jLoc[x].regione);
                valorizzaValueElemento("txtIstat",jLoc[x].istat);
                return;
            }
        }
    }
}