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
    // execFile(executablePath, [], (err, data) => {
    exec(`cscript ${executablePath}`, (err, data) => {
        console.log(err)
        console.log(data.toString())
        fileManager.readFileSync(listPath)
            .then((files) => mainWindow.sendFiles(excelView, 
                files.toString().split('\r\n')))
            .catch((error) => console.log(error))
    })
})

ipcMain.on('WRITE_STAGED_FILES', (_e, files) => {
    const stagePath = path.join(rootDir, 'staged.txt')
    fileManager.writeStagedFiles(stagePath, files)
        .then(() => mainWindow.sendOK())
        .catch((error) => console.log(error))
})

ipcMain.on('SEND_FILE', (_e, view, file) => {
    if ('files' in fileCached)
        fileCached['files'][view] = file
    else {
        fileCached['files'] = [[],[],[],[]]
        fileCached['files'][view] = file
    }
})

ipcMain.on('SEND_SETTINGS', (_e, typeChecked) => {
    fileCached['typeChecked'] = typeChecked
})

ipcMain.on("REQUEST_DATA", (_e) => {
    mainWindow.loadData(fileCached)
})

const rootDir = path.join(__dirname, '../../')
const cacheFilePath = path.join(rootDir, 'data.json')
let mainWindow = null;
let fileManager = null;
let executablePath = path.join(rootDir, 'hello.vbs')

let fileCached = { files: [[],[],[],[]], typeChecked: [false, false, false]}

app.on("ready", () => {
    mainWindow = createMainWindow();
    // BrowserWindow.addDevToolsExtension(path.join("C:/Users/Dongbin/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0"))
    // BrowserWindow.addDevToolsExtension(path.join("C:/Users/Dongbin/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0"))
    setAppMenu({ openDirectory, saveFile, saveAsNewFile });
    fileManager = createFileManager();
    fileManager.readFileSync(cacheFilePath)
        .then((file) => {
            try {
                fileCached = JSON.parse(file)
            } catch (error) {
                console.log(error)
            }
        })
        .catch(error => console.log(error))
    // installExtension(REDUX_DEVTOOLS)
    // .then((name) => console.log(`Added Extension:  ${name}`))
    // .catch((err) => console.log('An error occurred: ', err));
});

app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        fileManager.saveData(cacheFilePath, 
            JSON.stringify(fileCached, null, '\t'))
        app.quit();
    }
});

app.on("active", (_e, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        mainWindow = createMainWindow();
    }
});