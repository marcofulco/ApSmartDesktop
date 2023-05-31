function apriTastiraModElectron(){
    if(window !== window.parent==true){
        window.top.electronAPI.apriTastiera();
    }else{
        window.electronAPI.apriTastiera();
    }
    
}
window.electronAPI.onUpdateAvailable(() => {
    // show notification to the user that an update is available
    attivaAlert(xTipoAllert.INFORMAZIONE,"Aggiornamento disponibile <br> Download aggiornamento in corso" );
  });
  
  window.electronAPI.onUpdateDownloaded(() => {
    // show notification to the user that the update has been downloaded
    attivaAlert(xTipoAllert.INFORMAZIONE,"Aggiornamento scaricato , per installare l'aggiornamento , premere sul pulsante riavvia!");
    // var btn=document.getElementById("btnRiavvia");
    // if(btn!=null){
    //     btn.classList.remove("hide");
    // }
    var x =document.getElementById('divTestaSuperiore')
    if(x!=null){
        if(document.getElementById("btnRiavvia")==null){
            x.innerHTML+=`
        <div id="btnRiavvia" class="row margPerc20Sx">
                    <img class="immagine-attenzione h90 " src="img/bianche/update.svg" onclick="riavviaApp()">
                </div>
        `;
        }
    }else{
        attivaAlert(xTipoAllert.DOMANDASINO,"Attenzione, è disponibile un aggiornamento in attesa di installazione, vuoi installarlo?","rispRiavvioApp_");
    }
  });

function riavviaApp(){
    window.electronAPI.restartApp();
}
function downloadUpdate(){
    window.electronAPI.downloadUpdate();
}
function rispRiavvioApp(risp){
    if(risp.toUpperCase()=="SI"){
        riavviaApp();
    }
}