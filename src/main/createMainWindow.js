import { BrowserWindow } from "electron";
const path = require('path');
const url = require('url');
class MainWindow {
    constructor() {
        this.window = new BrowserWindow({ width: 1080, height: 768});
        this.window.loadURL(url.format({
            pathname: path.join(__dirname, '../../index.html'),
            protocol: 'file',
            slashes: true
        }));
        this.window.on("close", () => {
            this.window = null;
        });
    }

    sendFiles(view, files) {
        this.window.webContents.send("SEND_FILES", view, files)
    }
    sendOK() {
        console.log('sending OK')
        this.window.webContents.send("SEND_OK")
    }
    sendDir(directoryPath) {
        this.window.webContents.send("SEND_DIR", directoryPath)

        return new Promise((resolve) => {
            return resolve(directoryPath)
        })
    }
    loadData(data) {
        this.window.webContents.send("LOAD_DATA", data)
    }
}

function createMainWindow() {
    return new MainWindow();
}

export default createMainWindow;