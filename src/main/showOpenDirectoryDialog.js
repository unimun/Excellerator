import { dialog } from "electron";

function showOpenDirectoryDialog() {
    return new Promise((resolve, reject) => {
        const path = dialog.showOpenDialog(
            {
                title: "open",
                properties: [ "openDirectory" ]
            }
        )

        if (path && path.length > 0) {
            resolve(path[0]);
        } else {
            reject();
        }
    });
}

export default showOpenDirectoryDialog;