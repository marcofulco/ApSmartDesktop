function apriTastiraModElectron(){
    if(window !== window.parent==true){
        window.top.electronAPI.apriTastiera();
    }else{
        window.electronAPI.apriTastiera();
    }
    
}
ipcRenderer.on('update_available', () => {
    attivaAlert(2,'Attenzione , un nuovo aggiornamento è disponibile');
  })
  ipcRenderer.on('update_downloaded', () => {
    // message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?'
    // restartButton.style.display = 'block'
    attivaAlert(2,'Aggiornamento scaricato, verrà installato al riavvio');
  })
function restartApp() {
    window.electronAPI.restartApp()
  }