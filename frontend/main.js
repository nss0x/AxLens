const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

async function captureAndSendScreenshot(webContents) {
  try {
    console.log('Attempting to fetch from backend...');
    const response = await fetch('http://127.0.0.1:8000/api/v1/analyze-screen', {
      method: 'POST'
    });
    console.log('Backend response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }
    const data = await response.json();
    if (data.status === 'success') {
      webContents.send('screenshot-captured', data.path);
    } else {
      console.error('Error from backend:', data.message);
    }
  } catch (error) {
    console.error('Failed to call backend:', error);
    console.error('Error details:', error.message);
  }
}

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
    captureAndSendScreenshot(event.sender);
  });
}

app.whenReady().then(() => {
  createWindow();

  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('Control+Space+M', () => {
    console.log('Control+Space+M is pressed');
    // Get the focused window and send the capture-screen event
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      console.log('Focused window detected. Triggering screenshot.');
      captureAndSendScreenshot(focusedWindow.webContents);
    } else {
      console.log('No focused window found.');
    }
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