var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './dist/Excellerator-win32-ia32',
    outputDirectory: './dist/installer-win32-ia32',
    exe: 'Excellerator.exe',
    setupExe: 'ExcelleratorSetup.exe'
});

resultPromise.then(function () {
    console.log("It worked!");
}, function (e) {
    console.log('No dice: ' + e.message);
});