import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import electronSquirrelStartup from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (electronSquirrelStartup) {
  app.quit();
}

// Get environment variables
const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3000;

let mainWindow;
let serverProcess;
let backendServer;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, '../public/guidesoft-favicon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false, // Allow insecure content
    },
  });

  // Remove menu bar
  mainWindow.setMenuBarVisibility(false);

  // Load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL(`http://localhost:${port}`);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // For production, serve the built app with embedded backend
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Start the Vite development server
const startViteServer = () => {
  return new Promise((resolve, reject) => {
    serverProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      shell: true
    });

    serverProcess.on('error', (error) => {
      console.error('Failed to start Vite server:', error);
      reject(error);
    });

    // Give the server some time to start
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

// Start the backend server for production
const startBackendServer = async () => {
  // In production, we'll start the backend server as a separate process
  console.log('Starting backend server...');
  // This would be implemented based on your specific needs
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  if (isDev) {
    try {
      await startViteServer();
    } catch (error) {
      console.error('Error starting development server:', error);
      dialog.showErrorBox('Error', 'Failed to start development server');
      app.quit();
      return;
    }
  } else {
    // In production, start the backend server
    try {
      await startBackendServer();
    } catch (error) {
      console.error('Error starting backend server:', error);
      // Don't quit the app, just show a warning
      dialog.showMessageBox({
        type: 'warning',
        title: 'Warning',
        message: 'Failed to start backend server. Some features may not work properly.',
        buttons: ['OK']
      });
    }
  }
  
  createWindow();
  
  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  
  // Kill the server process if it's running
  if (serverProcess) {
    serverProcess.kill();
  }
});

// IPC handlers
ipcMain.handle('get-app-info', () => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
    platform: process.platform,
    arch: process.arch
  };
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.