import { app, Menu, BrowserWindow } from "electron";

function setAppMenu(options) {
    const template = [
        {
            label: "File",
            submenu: [
                {
                    label: "Open", accelerator: "CmdOrCtrl+O", click: () =>
                        options.openDirectory()
                },
                {
                    label: "Save", accelerator: "CmdOrCtrl+S", click: () =>
                        options.saveFile()
                },
                { label: "Save As...", click: () => options.saveAsNewFile() }
            ]
        }
    ];
    if (process.platform == "darwin")
    {
        template.unshift(
            {
                label: "Converter",
                submenu: [
                    {
                        label: "Quit", accelerator: "CmdOrCtrl+Q", click: () =>
                            app.quit()
                    }
                ]
            }
        );
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

export default setAppMenu;