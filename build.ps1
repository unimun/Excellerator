# delete older files
Remove-Item -Force -Recurse dist

$Env:PATH = ".\node_modules\.bin;" + $Env:PATH

# windows exe pacakaging
electron-packager .\src_dist Excellerator --platform=win32 --arch ia32 --out dist --prune
# asar packaging
asar pack .\dist\Excellerator-win32-ia32\resources\app\ .\dist\Excellerator-win32-ia32\resources\app.asar
# delete source dir
Remove-Item -Force -Recurse .\dist\Excellerator-win32-ia32\resources\app
# create installer
node installer.js