const { app, BrowserWindow, ipcMain, dialog ,Tray, Menu} = require('electron');
const path = require('path');
const { exec } = require('child_process');
const { autoUpdater } = require('electron-updater');

let win;  // define win at the module level
let tray = null;
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.on('second-instance', () => {
        verificaFinestraAperta();  // Verifica e ripristina la finestra se necessario
    });
    // Informa l'utente che un'altra istanza è già in esecuzione e poi tenta di ripristinare/focalizzare quella istanza.
    dialog.showErrorBox('Attenzione', 'Applicazione già in esecuzione!');
    app.quit();
} else {
    app.on('second-instance', () => {
        verificaFinestraAperta();  // Verifica e ripristina la finestra se necessario
    });

    // Crea la finestra dell'applicazione quando Electron ha finito l'inizializzazione
    app.on('ready', () => {
        const {srvApSmart} = require('./serverApSmart.js');
        createWindow();
        
        // srvApSmart.serverApSmart();
        autoUpdater.checkForUpdatesAndNotify();
        setInterval(() => {
            autoUpdater.checkForUpdates()
        }, 600000)

        autoUpdater.on('update-available', () => {
            win.webContents.send('update_available');
        });
        autoUpdater.on('update-downloaded', () => {
            win.webContents.send('update_downloaded');
        });
        tray = new Tray('icon/iconaAp.ico');
        const contextMenu = Menu.buildFromTemplate([
          { label: 'Apri', click: () => { verificaFinestraAperta(); } },
          { label: 'Esci', click: () => { app.quit(); } }
        ]);
      
        tray.setToolTip('Azienda Pratica Smart');
        tray.setContextMenu(contextMenu);
        tray.on('click', () => {
            tray.popUpContextMenu(); // Questo forza il menu a comparire al clic
          });
          
          tray.on('right-click', () => {
            tray.popUpContextMenu(); // Questo forza il menu a comparire al clic destro
          });
    });
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            // app.quit(); // Commenta questa linea per non chiudere l'app
        }
    });
    app.on('activate', verificaFinestraAperta);
}
function verificaFinestraAperta(){
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }else{
        if (win.isMinimized()) win.restore();
        win.focus();
    }

}
const createWindow = () => {
    win = new BrowserWindow({
        width: 1600,
        height: 800,
        fullscreen: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadFile('index.html')
    win.maximize();
}


ipcMain.on('apriTastiera', () => {
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