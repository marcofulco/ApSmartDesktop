const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  apriTastiera: () => {
    ipcRenderer.send('apriTastiera');
  },
  downloadUpdate: () => {
    ipcRenderer.send('download_update');
  },
  restartApp: () => {
    ipcRenderer.send('restart_app');
    console.log("restart_app inviato");
  },
  onUpdateAvailable: (callback) => {
    ipcRenderer.on('update_available', callback);
  },
  onUpdateDownloaded: (callback) => {
    ipcRenderer.on('update_downloaded', callback);
  },
});

