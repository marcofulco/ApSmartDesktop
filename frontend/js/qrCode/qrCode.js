var idInputBoxBarCode;
var fnCallBack;

var lastResultCode;
var controlli = 0;

function apriModalFotocamera(idCampo, callBack) {
    idInputBoxBarCode = idCampo;
    fnCallBack = callBack;
    console.log('dentro quaggua')
    var AppQuagga = {
        init: function () {
            var self = this;

            Quagga.init(this.state, function (err) {
                if (err) {
                    return self.handleError(err);
                }

                Quagga.start();

                Quagga.onProcessed(function (result) {
                    var drawingCtx = Quagga.canvas.ctx.overlay,
                        drawingCanvas = Quagga.canvas.dom.overlay;

                    if (result) {
                        if (result.boxes) {
                            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                            result.boxes.filter(function (box) {
                                return box !== result.box;
                            }).forEach(function (box) {
                                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                            });
                        }

                        if (result.box) {
                            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                        }

                        if (result.codeResult && result.codeResult.code) {
                            Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                        }
                    }
                });

                setTimeout(function () {
                    var track = Quagga.CameraAccess.getActiveTrack();
                    var capabilities = {};
                    try {
                        if (typeof track.getCapabilities === 'function') {
                            capabilities = track.getCapabilities();
                            //console.log(capabilities);
                            if (capabilities.zoom != undefined) {
                                track.applyConstraints({ advanced: [{ zoom: 2.5 }] });
                            }
                        }
                    } catch (e) {

                    }
                }, 500);
            });
        },
        handleError: function (err) {
            attivaAlert(2, err, "lettoreBarCode");
            chiudiLettoreBarCode();

        },
        state: {
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment"
                },
                target: document.querySelector('#interactive.viewport')
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
            frequency: 15,
            decoder: {
                readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"],
                multiple: false
            },
            locate: true
        },
        lastResult: null
    }

    AppQuagga.init();

    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;

        if (code != null) {
            if (lastResultCode == code) {
                controlli++;
            } else {
                lastResultCode = code;
                controlli = 0;
            }

        }

        valorizzaHTMLElemento("segnalazioneLettoreBarCode", code);

        if (controlli == 3) {
            try {
                var x = code

                valorizzaValueElemento(idInputBoxBarCode, x);
                avviaRicercaLettoreBarcode(idInputBoxBarCode);
            } catch (e) {
                alert(e);
            }

            Quagga.stop();
            chiudiLettoreBarCode();
        }
    });
};

function chiudiLettoreBarCode(callback = '') {
    try {
        if (Quagga) {
            Quagga.stop();
        }
    } catch (error) {

    }
    try {
        mediaStream.getTracks()[0].stop();
    } catch (error) {
    }
    lettoreBarCode.parentNode.removeChild(lettoreBarCode);
    lettoreBarCode = null;
    if (callback != '') {
        eval(callback)
    }
}
var mediaStream;
var scanIsActive = false;
function apriModalFotocameraQrCode(idCampo, callBack) {
    idInputBoxBarCode = idCampo;
    fnCallBack = callBack;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var btn=document.getElementById('cambiaFotocamera');

    show('cambiaFotocamera');
    var div = document.getElementById('interactive');
    div.style.position = 'relative'; // Assicurati che il div sia posizionato in modo relativo
    var videoTag = document.createElement('video');
    videoTag.setAttribute('id', 'video');
    videoTag.setAttribute('class', 'row');
    if (vw < vh) {
        videoTag.style.width = '100%';
        videoTag.style.height = 'auto';
    } else {
        videoTag.style.height = '80%';
        videoTag.style.width = 'auto';
    }
    div.appendChild(videoTag);
    var video = document.getElementById('video');
    var canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'row');
    canvas.style.position = 'absolute'; // Posiziona il canvas sopra il video
    canvas.style.top = 0;
    canvas.style.left = 0;
    var mirinoSize = 150;
    div.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    scanIsActive = true;
    if (localStorage.getItem('idFotocameraPredefinita') != null) {
        var objFotocamera = {
            deviceId: localStorage.getItem('idFotocameraPredefinita')
        }
    } else {
        var objFotocamera = {
            facingMode: 'environment'
        }
    }
    navigator.mediaDevices.getUserMedia({ video: objFotocamera })
        .then(function (stream) {
            mediaStream = stream;
            video.srcObject = stream;
            video.setAttribute('playsinline', true);
            video.play();
            setTimeout(() => leggiQRCode(ctx), 1000);
            // leggiQRCode();

        })
        .catch(function (errore) {
            console.log(errore);
        });
    let codeTimer = null;
    let lastCode = null;

    function leggiQRCode(ctx) {
        if (!scanIsActive) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            var mirinoX = (canvas.width - mirinoSize) / 2;
            var mirinoY = (canvas.height - mirinoSize) / 2;

            var imageData = ctx.getImageData(mirinoX, mirinoY, mirinoSize, mirinoSize);
            var code = jsQR(imageData.data, mirinoSize, mirinoSize);

            if (code && code.data.trim() !== '') {
            //     if (lastCode === code.data) {
                    // Il codice non è cambiato, controlla se sono passati 2 secondi
                    // if (codeTimer && (Date.now() - codeTimer >= 500)) {
                        // Sono passati 2 secondi, considera il codice valido
                        valorizzaValueElemento(idInputBoxBarCode, code.data);
                        scanIsActive = false;
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = 'green';
                        ctx.beginPath();
                        ctx.closePath();
                        ctx.stroke();
                        setTimeout(() => requestAnimationFrame(() => leggiQRCode(ctx)), 1000);
                    // }
            //     } else {
            //         // Il codice è cambiato, resetta il timer
            //         lastCode = code.data;
            //         codeTimer = Date.now();
            //     }
            // } else {
            //     // Non c'è codice, resetta tutto
            //     lastCode = null;
            //     codeTimer = null;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'green';  // Colore del mirino
            ctx.lineWidth = 5;  // Spessore delle linee del mirino
            ctx.strokeRect(mirinoX, mirinoY, mirinoSize, mirinoSize);
            requestAnimationFrame(() => leggiQRCode(ctx));
        } else {
            requestAnimationFrame(() => leggiQRCode(ctx));
        }
    }



    function riprendiScansione() {
        scanIsActive = true;
        // document.getElementById('resumeScan').style.display = 'none';
        leggiQRCode(ctx);
        valorizzaValueElemento(idInputBoxBarCode, '');
    }
    function sbloccaPulsanti() {

    }
    document.getElementById('resumeScan').addEventListener('click', riprendiScansione);
}
var elementoTestaElencoDettaglioGiacenza = `
<div class="row w100 h30p marg1Top clrScuro centraVerticalmente testoNormale">
    <span class="closeCustom rowDx cursoreBtn" onclick="chiudiModalCustom()">×</span>
</div>
`;
var elementoRigaDettaglioGiacenza = `
<div class="row w100 h50p clrSfumatoScuro centraVerticalmente marg5Top testoNormale cursoreBtn" onclick="selezionaIdFotocamera('{IDFOTOCAMERA}')">
    <div class="w100-180p row" style="padding-left:5px">{DESCRIZIONE}</div>
</div>
`;

query['listaFotocamere'] = new Array;
// query['listaFotocamere']['modalC-head']=elementoTestaElencoDettaglioGiacenza;
// query['listaFotocamere']['modalC-body']=elementoTestaElencoDettaglioGiacenza;
query['listaFotocamere']['modelloRiga'] = elementoRigaDettaglioGiacenza
query['listaFotocamere']['oggetti'] = new Array;
query['listaFotocamere']['oggetti']['{IDFOTOCAMERA}'] = 'idFotocamera';
query['listaFotocamere']['oggetti']['{DESCRIZIONE}'] = 'descrizione'


function apriModalSceltaFotocamera() {
    var listaFotocamera = new Array();
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            var videoDevices = devices.filter(function (device) {
                return device.kind === 'videoinput';
            });
            videoDevices.forEach(function (device) {
                var obj = {
                    'idFotocamera': device.deviceId,
                    'descrizione': device.label || 'Fotocamera ' + (cameraSelect.length + 1),
                }
                listaFotocamera.push(obj);
            });

            apriModalCustom('listaFotocamere', listaFotocamera, 'Lista fotocamere', '', 1, true)
            // Avvia il flusso video utilizzando la fotocamera selezionata
            //   cameraSelect.addEventListener('change', startVideoStream);
            //   startVideoStream();
        });
}
function selezionaIdFotocamera(idFotocamera) {
    localStorage.setItem('idFotocameraPredefinita', idFotocamera);
    chiudiModalCustom();
    chiudiLettoreBarCode();

    // tipo='barcode';
    // if(typeof parametriArticoli === 'object'){
    //     if(parametriArticoli.tipoLettoreBarCode != undefined ){
    //         tipo=parametriArticoli.tipoLettoreBarCode;
    //     }
    // }
    apriLettoreBarCode(idInputBoxBarCode, fnCallBack, 'qrCode');
}