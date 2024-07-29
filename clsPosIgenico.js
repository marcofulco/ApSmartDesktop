const clsBase = require('./clsBase.js');
const { Socket } = require('net');

class PosIgenico extends clsBase {
    constructor(datiPos, operazione, callback = '') {
        super();
        this.socket = new Socket();
        this.ackExpected = "0x06037A";
        this.error = '';
        this.alert = '';
        this.response = {};
        this.operazione = operazione;
        this.datiPos = datiPos;
        this.callback = callback;
        this.logMessage='';
        this.contRisposta = 0;
        this.idPos = this.operazione.idPos;
        if (this.idPos == '' || this.idPos == undefined) {
            this.error = "Impossibile connettersi al POS: ID POS non definito";
            this.generaRisposta();
            return;
        }
        this.ip = this.datiPos.ip;
        if (this.ip == '' || this.ip == undefined) {
            this.error = "Impossibile connettersi al POS: IP non definito";
            this.generaRisposta();
            return;
        }
        this.importo = this.operazione.importo;
        if (this.importo == '' || this.importo == undefined) {
            this.error = "Impossibile connettersi al POS: Importo non definito";
            this.generaRisposta();
            return;
        }

        this.creaSocket();
    }
    creaSocket() {
        // return new Promise((resolve, reject) => {
        this.socket.connect(9100, this.ip, () => {
            this.socket.setTimeout(30000); // 30 second timeout

            // this.socket.on('open', () => {
            this.elaboraRichiesta();
            // });


        });

        this.socket.on('error', (err) => {
            this.error = "Impossibile connettersi al POS: " + err.message;
            this.generaRisposta();
            // reject(false);
        });
        // });
    }
    chiudiSocket() {
        let ackToSend = this.hexToStr("0x06") + this.hexToStr("0x03") + this.hexToStr("0x7A");
        this.socket.write(ackToSend, 'utf-8', (err) => {
            this.socket.end();
            this.socket.destroy();
            this.generaRisposta();
            // if (err) {
            //     this.error = "Errore durante l'invio della risposta di chiusura al POS.";
            //     this.generaRisposta();
            //     return;
            // }
        });
        
    }
    sendStatusRequest() {
        // return this.creaSocket()
        //     .then(() => {
        const msgContent = "0t".padStart(10, "0");
        const message = this.hexToStr("0x02") + msgContent + "\x03\x3A";
        this.socket.write(message, 'utf-8', (err) => {
            if (err) {
                this.error = "Errore durante l'invio della richiesta di stato al POS.";
                throw new Error(this.error);
            }

            this.socket.once('data', (data) => {
                this.idPos = data.toString().slice(1, 10);
                this.chiudiSocket();
                // this.emit('status', this.idPos);
            });
        });

    }
    elaboraRichiesta() {
        // return this.creaSocket()
        //     .then(() => {
        const formattedAmount = (this.importo * 100).toFixed(0).padStart(6, '0');
        const message = `${this.idPos}P000000010000000${formattedAmount}                                                                                                    Servizio vendita      xPrimo00000000`;
        this.logTxt(message);
        this.logMessage= message;
        const fullMessage = String.fromCharCode(0x02) + message + String.fromCharCode(0x03);
        const checksum = this.generateControlValue(fullMessage);
        this.socket.write(fullMessage + checksum, 'utf-8', (err) => {
            // this.logTxt('Messaggio inviato: ' + fullMessage+ checksum);
            if (err) {
                this.error = "Errore durante l'invio dell'importo al POS.";
                this.generaRisposta();
                return;
            }

        });
        this.rispostaServer();

    }
    rispostaServer() {
        // if(this.contRisposta >=3){
        //     this.error = "Impossibile connettersi al POS";
        //     this.generaRisposta();
        //     return;
        // }
        this.socket.on('data', (data) => {
            this.contRisposta++;
            var data = data.toString();
            
            if (data.indexOf('E01') != -1) {
                this.logTxt(data);
                // throw new Error("Pagamento non effettuato");
                this.error = "Pagamento non effettuato";
                this.chiudiSocket();
                return;
            }
            // if (data.indexOf(this.hexToDec("0x15")) != -1) {
            //     this.logTxt(data);
            //     this.error = "Errore comando errato";
            //     this.chiudiSocket();
            //     return;
            // }
            if (data.indexOf('E00') != -1) {
                this.result = 'ok';
                this.alert = '';
                this.error = '';
                this.chiudiSocket();
                // this.generaRisposta();
                return;
            }
            this.logTxt(data);
        });
    }
    generaRisposta() {
        // this.chiudiSocket();
        this.resposta = {
            error: this.error,
            alert: this.alert,
            result: this.result
        };
        if (this.error != '') {
            this.logTxt(this.error);
            this.logTxt(this.logMessage);
        }
        if (this.callback != '') {
            this.callback(JSON.stringify(this.resposta));
        }

        // return JSON.stringify(this.resposta);
    }
    generateControlValue(message) {
        let xorResult = 0;
        for (let i = 0; i < message.length; i++) {
            const byte = message.charCodeAt(i);
            xorResult ^= byte;
        }
        const checksum = 127 - xorResult;
        return String.fromCharCode(checksum);
    }

    hexToStr(hex) {
        let string = '';
        for (let i = 0; i < hex.length - 1; i += 2) {
            string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return string;
    }
    hexToDec(hexString) {
        return parseInt(hexString, 16);
    }
    generaRispostaDiChiusura(){
        //$ackToSend = $this->hexToStr("0x06") . $this->hexToStr("0x03") . $this->hexToStr("0x7A");
        //$bytesWritten = socket_write($this->socket, $ackToSend, strlen($ackToSend));
        let ackToSend = this.hexToStr("0x06") + this.hexToStr("0x03") + this.hexToStr("0x7A");
        this.socket.write(ackToSend, 'utf-8', (err) => {
            if (err) {
                this.error = "Errore durante l'invio della risposta di chiusura al POS.";
                this.generaRisposta();
                return;
            }
        });
    }

}
module.exports = PosIgenico;