const {app, BrowserWindow,ipcMain} = require('electron')
const path = require('path');
const { exec } = require('child_process');
const { autoUpdater } = require('electron-updater')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1600,
        height: 800,
        fullscreen: true,
        autoHideMenuBar:true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadFile('index.html')
    autoUpdater.checkForUpdatesAndNotify()
}

app.whenReady().then(()=>{
    createWindow();
    setInterval(() => {
        autoUpdater.checkForUpdates()
      }, 60000)
})
ipcMain.on('apriTastiera',()=>{
    //aprire tastiera windows con nodejs
    exec('osk.exe', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing osk.exe: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    
})
// Invia 'update_downloaded' all'interfaccia utente quando un aggiornamento è stato scaricato
autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update_downloaded')
  })
  
  // Installa l'aggiornamento e riavvia l'app quando l'interfaccia utente lo richiede
  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall()
  })