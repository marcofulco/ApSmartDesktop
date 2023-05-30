window.addEventListener("load", function(event) {
    setTimeout( function() {
        valorizzaValueElemento('txtAnno', oggiISO().substring(0,4));
        this.document.getElementById("txtRicerca").focus();
    }, 500);
});

function esci(){
    if (xTarget == "_blank") {
        window.close();
    } else {
        open("mainPage.html", xTarget);
    }
}

function resetErrore(e){
    e.setAttribute("style","");
}

function stampaFoglioProduzione(){
    var numero=recuperaValueElemento('txtRicerca');
    var anno=recuperaValueElemento('txtAnno');

    var parametri={};
    parametri.numero=numero;
    parametri.anno=anno;

    var obj={
        'filtri':parametri,
        "tipoReport":"AssistenzaConsegnaPowerMedia"
    }
    
    stampaReport(obj)
    chiudiModalCustom();
}