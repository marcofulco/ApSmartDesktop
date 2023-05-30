const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  apriTastiera: () => {
    ipcRenderer.send('apriTastiera');
  },
  restartApp: () => {
    ipcRenderer.send('restart_app')
  }
});

