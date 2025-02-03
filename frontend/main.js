const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('index.html');

  win.webContents.openDevTools();

  ipcMain.on('capture-screen', async (event) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/analyze-screen', {
        method: 'POST'
      });
      const data = await response.json();
      if (data.status === 'success') {
        event.reply('screenshot-captured', data.path);
      } else {
        console.error('Error from backend:', data.message);
      }
    } catch (error) {
      console.error('Failed to call backend:', error);
    }
  });
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