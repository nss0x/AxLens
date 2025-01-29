const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');

  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('Control+Space+M', () => {
    console.log('Control+Space+M is pressed');
    // We will add functionality here later
  });

  if (!ret) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('Control+Space+M'));
});

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('Control+Space+M');

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});