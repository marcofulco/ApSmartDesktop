const EventEmitter = require('events');
const fs = require('fs');

class clsBase extends EventEmitter {
    logTxt(msg) {
        const filePath = './logError.txt';
        const data = new Date();
        msg = `${data.toISOString()} - ${msg}\n`;
        try {
            fs.appendFileSync(filePath, msg, 'utf8');
        } catch (err) {
            console.error('Si è verificato un errore durante la scrittura del file:', err);
        }
    }
}

module.exports = clsBase;
