query["nuovotipologieArticoli.html"] = new Array();
query["nuovotipologieArticoli.html"]["oggetti"] = new Array();
query["nuovotipologieArticoli.html"]["oggetti"]["txtID"] = "ID";
query["nuovotipologieArticoli.html"]["oggetti"]["txtDescrizione"] = "DESCRIZIONE";
query["nuovotipologieArticoli.html"]["oggetti"]["txtACodice"] = "ACODICE";
query["nuovotipologieArticoli.html"]["oggetti"]["chkNonFatturare"] = "NONFATTURARE";
query["nuovotipologieArticoli.html"]["oggetti"]["txtCodiceStampa"] = "CODICESTAMPA";
query["nuovotipologieArticoli.html"]["oggetti"]["txtScontoFidelity"] = "SCONTO_FIDELITY";
// query["nuovotipologieArticoli.html"]["oggetti"]["txtProvvigione"] = {campo:"PROVVIGIONE", decimaliMax:0, decimaliMin:0};
query["nuovotipologieArticoli.html"]["oggetti"]["txtProvvigione"] = "PROVVIGIONE";

var parametriNC = {
  obbligatori:
    "txtDescrizione;",
  alternativi: "",
  alternativi1: "",
  nascosti: "",
};
var idImmagine='';
var skUtente=sessionStorage.getItem("skVarie.tipologieArticoli");

window.addEventListener("load", function (event) {
  setTimeout(function () {
    var div = document.getElementById("divTitolo");

    if (skUtente!=undefined) {
      div.innerHTML = "MODIFICA ";
    } else {
      div.innerHTML = "NUOVO ";
    }

    div.innerHTML += "TIPOLOGIA ARTICOLI";

    recuperaParametri();
   
  }, 50);
});

function recuperaParametri() {
  var parametri = {
    tipoRisposta: "parametri",
    chiamante: "parametri",
    nomePagina: nomePagina,
    userName: "",
  };

  elencoInCaricamento = 1;

  inviaRichiestaCentralino("parametri", parametri, elaboraParametri);
}

function elaboraParametri(res) {
  var risp = JSON.parse(res);
  var parametri = risp.parametri;
  var data = risp.risposta;

  if (risp.error != "") {
    return "";
  }

  for (x in data) {
    if (!isNaN(Number(data[x]["valore"]))) {
      parametriNC[data[x]["parametro"]] = Number(data[x]["valore"]);
    } else {
      parametriNC[data[x]["parametro"]] = data[x]["valore"];
    }
  }

  if (parametriNC.nascosti != "") {
    m = parametriNC.nascosti.split(";");
    for (x in m) {
      try {
        document.getElementById(m[x]).classList.add("hide");
      } catch (error) {}
    }
  }

  if (xIdCliente > 0) {
    document.getElementById("divFido").classList.add("hide");
  }

  carDatiAnag();
}


function carDatiAnag() {
  jSonCli = window.sessionStorage.getItem("skVarie.tipologieArticoli");

  if (jSonCli != undefined) {
    jSonCli = JSON.parse(jSonCli);
    popolaFormModificaDati(jSonCli[0], "nuovotipologieArticoli.html");
    // apriImmaginiMultiple('TIPOLOGIA_ARTICOLI','',jSonCli[0].IDIMMAGINE);
    // chiudiPDFViewer();
    if(jSonCli[0].IMMAGINE!=''){
        var img=document.getElementById('immaggineCaricata');
        
        var link=urlImmagineArticolo(jSonCli[0].IMMAGINE,"","rect","230");
        console.log(link);
        img.src=link;
        idImmagine=jSonCli[0].IDIMMAGINE;
    }
        
  } else {
    idModifica = 0;
  }
}

function esci() {
    if(typeof modElectron!='undefined' && modElectron==true){
        location.href="listeVarie.html?tabella=tipologieArticoli";
    }else{
        window.open("listeVarie.html?tabella=tipologieArticoli", "_self");
    }
  
}

function Salva() {
  var v;
  var errori = false;
  var campi = "";
  var e;
  var campiAl;
  var r;

  for (x in parametriNC) {
    if (x == "obbligatori") {
      v = parametriNC.obbligatori.split(";");
      for (i = 0; i < v.length - 1; i++) {
        if (recuperaValueElemento(v[i]) == "") {
          errori = true;
          e = document.getElementById(v[i]);
          e.setAttribute(
            "style",
            "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;"
          );
          campi += e.getAttribute("placeholder") + "<br>";
        }
      }
    } else if (x.indexOf("alternativi") >= 0) {
      r = 0;
      campiAl = [""];

      v = parametriNC[x].split(";");
      for (i = 0; i < v.length - 1; i++) {
        if (recuperaValueElemento(v[i]) == "") {
          r += 1;
          campiAl[r] = v[i];
        } else {
          r = 0;
          break;
        }
      }

      if (r > 0) {
        for (i = 1; i <= r; i++) {
          errori = true;
          e = document.getElementById(campiAl[i]);
          e.setAttribute(
            "style",
            "border-width: 2px; border-color: red; -webkit-appearance: none; border-style: solid;"
          );
          campi += e.getAttribute("placeholder") + "<br>";
        }
      }
    }
  }

  if (errori) {
    attivaAlert(
      2,
      "Non sono stati valorizzati i seguenti Campi Obbligatori:<br>" + campi,
      "erroriCampi"
    );
    return;
  }

  var jSon = {};

  for (x in query["nuovotipologieArticoli.html"]["oggetti"]) {
    jSon[query["nuovotipologieArticoli.html"]["oggetti"][x]] = recuperaValueElemento(x);
  }

  tipo = "salva";
  if (skUtente!=undefined) {
    tipo = "update";
  }
  
      
  if(!isEmpty(immaginiCaricate)){
      if(idImmagine!='' && idImmagine>0){
            console.log(idImmagine)  
            const parametri={"tipoRisposta":"elimina", "tipoElimina":"immagini", "dati":idImmagine};
            inviaRichiestaCentralino("elimina", parametri, ()=>{
                caricaImmagini((res)=>{
                    var parametri = { tipoRisposta: tipo, tipoSalva: "tipologieArticoli", dati: jSon };
                      for(var[k,v] of Object.entries(immaginiCaricate)){
                          parametri.logo=v.name;
                      }
                    
                    inviaRichiestaCentralino(tipo, parametri, elaboraRispostaSalvaCarrello);        
                  })
            });
        
      }else{
    
      caricaImmagini((res)=>{
        var parametri = { tipoRisposta: tipo, tipoSalva: "tipologieArticoli", dati: jSon };
          for(var[k,v] of Object.entries(immaginiCaricate)){
              parametri.logo=v.name;
          }
        
        inviaRichiestaCentralino(tipo, parametri, elaboraRispostaSalvaCarrello);        
      })
    }
  }else{
    var parametri = { tipoRisposta: tipo, tipoSalva: "tipologieArticoli", dati: jSon };
    inviaRichiestaCentralino(tipo, parametri, elaboraRispostaSalvaCarrello);
  }

  
}

function elaboraRispostaSalvaCarrello(res) {
  var risp = JSON.parse(res);
  var parametri = risp.parametri;
  var data = risp.risposta;

  if (risp.error != "") {
    return "";
  }

  if (data[0] == 0) {
    attivaAlert(0, "Errore durante il salvataggio della Tipologia Articoli", "fineSalva");
    return "";
  }

  esci();
}

function resetErrore(e) {
  e.setAttribute("style", "");
}

// function valorizzaAltriCampiLocalita() {
//   s = document.getElementById("cmbLocalita");

//   var jLoc = JSON.parse(localStorage.getItem("cmbLocalita.jSon"));

//   if (jLoc != undefined) {
//     for (x in jLoc) {
//       if (jLoc[x].id == s.value) {
//         valorizzaValueElemento("txtCAP", jLoc[x].cap);
//         valorizzaValueElemento("txtProv", jLoc[x].pr);
//         valorizzaValueElemento("cmbRegione", jLoc[x].regione);
//         valorizzaValueElemento("txtIstat", jLoc[x].istat);
//         return;
//       }
//     }
//   }
// }
