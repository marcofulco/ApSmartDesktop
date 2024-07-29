const WebSocket = require('ws');
const fs = require('fs');
const wss = new WebSocket.Server({ port: 18788 });
const EventEmitter = require('events');
const PosIgenico = require('./clsPosIgenico.js');
const clsBase = require('./clsBase.js');

// const serverApSmart = () => {
console.log('Server ApSmart in esecuzione');
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(msgJson) {
        console.log('received: %s', msgJson);
        const lcsBase = new clsBase();
        let data;
        let parametriCassa;
        let datiOperazioni;
        try {
            data = JSON.parse(msgJson);
        } catch (e) {
            ws.send(false);
            lcsBase.logTxt("Errore, messaggio non in formato JSON");
            ws.close();
            return;
        }
        parametriCassa = data.parametriCassa;
        datiOperazioni = data.datiOperazioni;
        if (!parametriCassa) {
            lcsBase.logTxt("Errore, parametri cassa non definiti");
            return;
        }
        if (!parametriCassa.tipoCassa) {
            lcsBase.logTxt("Errore, tipo cassa non definito");
            return;
        }
        
        switch (parametriCassa.tipoCassa) {
            case "PosIgenico":
                console.log(parametriCassa, datiOperazioni);
                let pos = new PosIgenico(parametriCassa, datiOperazioni,(res)=>{
                    ws.send(res);
                });
                break;
            default:
                ws.send(false);
                lcsBase.logTxt("Tipo cassa non supportato");
                lcsBase.logTxt('Messaggio ricevuto: ' + msgJson);
                break;
        }
    });

    //   ws.send('ok');
});

// }
