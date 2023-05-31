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
    attivaAlert(xTipoAllert.INFORMAZIONE,"Aggiornamento scaricato , per installare l'aggiornamento , premere sul pulsante update in alto!");
    var btn=document.getElementById("btnRiavvia");
    if(btn!=null){
        btn.classList.remove("hide");
    }
  });

function riavviaApp(){
    window.electronAPI.restartApp();
}
function downloadUpdate(){
    window.electronAPI.downloadUpdate();
}