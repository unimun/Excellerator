import { app } from "electron";
import createMainWindow from "./createMainWindow";
import setAppMenu from "./setAppMenu";
import createFileManager from "./createFileManager";
import showOpenDirectoryDialog from "./showOpenDirectoryDialog"
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer'
import path from "path"

import { ipcMain } from 'electron'
import { execFile } from 'child_process'
import { exec } from 'child_process'

function openDirectory() {
    const fileView = 2
    showOpenDirectoryDialog()
        .then((directoryPath) => mainWindow.sendDir(directoryPath))
        .then((directoryPath) => fileManager.readDirectory(directoryPath))
        .then((files) => mainWindow.sendFiles(fileView, files))
        .catch((error) => {
            console.log(error);
        });
}

function saveFile() {
    console.log("saveFile");
}

function saveAsNewFile() {
    console.log("saveAsNewFile");
}

ipcMain.on('OPEN_DIR', (_e, directoryPath) => {
    const fileView = 2
    fileManager.readDirectory(directoryPath)
        .then((files) => mainWindow.sendFiles(fileView, files))
        .catch((error) => console.log(error))
})

ipcMain.on('EXCEL_LIST', (_e) => {
    const excelView = 1
    const listPath = path.join(rootDir, 'list.txt')
    execFile(executablePath, ["--incognito"], (err, data) => {
        console.log(err)
        console.log(data.toString())
        fileManager.readList(listPath)
            .then((files) => mainWindow.sendFiles(excelView, files))
            .catch((error) => console.log(error))
    })
})

ipcMain.on('WRITE_STAGED_FILES', (_e, files) => {
    const stagePath = path.join(rootDir, 'staged.txt')
    fileManager.writeStagedFiles(stagePath, files)
        .then(() => mainWindow.sendOK())
        .catch((error) => console.log(error))
})

const rootDir = path.join(__dirname, '../../')
let mainWindow = null;
let fileManager = null;
let executablePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"


app.on("ready", () => {
    mainWindow = createMainWindow();
    // BrowserWindow.addDevToolsExtension(path.join("C:/Users/Dongbin/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0"))
    // BrowserWindow.addDevToolsExtension(path.join("C:/Users/Dongbin/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0"))
    setAppMenu({ openDirectory, saveFile, saveAsNewFile });
    fileManager = createFileManager();
    // installExtension(REDUX_DEVTOOLS)
    // .then((name) => console.log(`Added Extension:  ${name}`))
    // .catch((err) => console.log('An error occurred: ', err));
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});

app.on("active", (_e, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        mainWindow = createMainWindow();
    }
});