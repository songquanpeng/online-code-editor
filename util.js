function getHostIP() {
    const interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let networkInterface = interfaces[devName];
        for (let i = 0; i < networkInterface.length; i++) {
            let info = networkInterface[i];
            if (info.family === 'IPv4' && info.address !== '127.0.0.1' && !info.internal) {
                return info.address;
            }
        }
    }
}

function processFilename(filename){
    return filename.replace(/(\.\.)|(\\)|(\/)/g, '');
}

module.exports = {
    getHostIP,
    processFilename
};