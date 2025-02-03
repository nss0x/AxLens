const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendCaptureScreen: () => ipcRenderer.send('capture-screen'),
    onScreenshotCaptured: (callback) => ipcRenderer.on('screenshot-captured', (event, path) => callback(path))
});