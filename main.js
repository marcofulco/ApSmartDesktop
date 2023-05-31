const {app, BrowserWindow,ipcMain} = require('electron');
const path = require('path');
const { exec } = require('child_process');
const { autoUpdater } = require('electron-updater');
let win;  // define win at the module level
const createWindow = () => {
    win = new BrowserWindow({
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
    
}

app.whenReady().then(()=>{
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
    setInterval(() => {
        autoUpdater.checkForUpdates()
    }, 60000)

    autoUpdater.on('update-available', () => {
        win.webContents.send('update_available');
    });
    autoUpdater.on('update-downloaded', () => {
        win.webContents.send('update_downloaded');
    });
      
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

  ipcMain.on('download_update', () => {
    autoUpdater.downloadUpdate();
  });
  
  ipcMain.on('restart_app', () => {
    console.log("restart_app ricevuto");
    autoUpdater.quitAndInstall();
    
  });