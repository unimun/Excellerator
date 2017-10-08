import fs from 'fs'
import path from 'path'

class FileManager {
    readDirectory(directoryPath) {
        const extnames = ['.xls', '.xlsx', '.txt']
        return new Promise((resolve) => {
            try {
                let files = fs.readdirSync(directoryPath, 'utf8')
                files = files.map(file => directoryPath + file)
                files = files.filter(file => {
                    return extnames.indexOf(path.extname(file)) !== -1
                })
                resolve(files)
            } catch (error) {
                console.log(directoryPath)
                console.log(error)
            }
        })
    }
    readFileSync(path) {
        return new Promise((resolve) => {
            try {
                const files = fs.readFileSync(path, 'utf8')
                resolve(files)
            } catch (error) {
                console.log(error)
            }
        })
    }
    writeStagedFiles(path, files) {
        return new Promise((resolve) => {
            try {
                fs.writeFileSync(path, files.join('\r\n'), 'utf-8')
                resolve()
            } catch (error) {
                console.log(error)
            }
        })
    }

    saveData(path, files) {
        return new Promise((resolve) => {
            try {
                fs.writeFileSync(path, files, 'utf-8')
                resolve()
            } catch (error) {
                console.log(error)
            }
        })
    }
}

function createFileManager() {
    return new FileManager();
}

export default createFileManager;