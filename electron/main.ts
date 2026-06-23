import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);
const allowCommands = process.env.AGENT_FORCE_ALLOW_COMMANDS === 'true';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1540,
    height: 960,
    minWidth: 1120,
    minHeight: 760,
    title: 'Agent FORCE Dashboard',
    backgroundColor: '#030611',
    webPreferences: {
      preload: path.join(__dirname, 'electron/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

function isSafeUrl(target: string) {
  try {
    const parsed = new URL(target);
    return ['https:', 'http:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

ipcMain.handle('agent-force:open-external', async (_event, target: string) => {
  if (!isSafeUrl(target)) {
    return { ok: false, error: 'Only http, https, and mailto links are allowed.' };
  }

  await shell.openExternal(target);
  return { ok: true };
});

ipcMain.handle('agent-force:reveal-path', async (_event, target: string) => {
  if (!target || target.trim().length < 2) {
    return { ok: false, error: 'No local path configured for this project.' };
  }

  const result = shell.showItemInFolder(target);
  return result ? { ok: true } : { ok: false, error: 'Unable to reveal that path.' };
});

ipcMain.handle('agent-force:run-command', async (_event, command: string) => {
  if (!allowCommands) {
    return {
      ok: false,
      error: 'Command launching is disabled. Set AGENT_FORCE_ALLOW_COMMANDS=true to enable it.'
    };
  }

  if (!command || command.length > 500) {
    return { ok: false, error: 'Command is empty or too long.' };
  }

  return new Promise((resolve) => {
    exec(command, { timeout: 120000 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ ok: false, error: stderr || error.message });
        return;
      }

      resolve({ ok: true, output: stdout || stderr || 'Command completed.' });
    });
  });
});

ipcMain.handle('agent-force:get-platform', async () => process.platform);

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
