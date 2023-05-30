// function onScanSuccess(decodedText, decodedResult) {
//     console.log(`Code scanned = ${decodedText}`,decodedResult);
//     alert(`Code scanned =`+decodedText+" - "+decodedResult.result.format.formatName);
// }
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

var w=0;

if (vw>vh){
    w=vh/2;
} else {
    w=vw/2;
}

// var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: w, rememberLastUsedCamera:true});
// html5QrcodeScanner.render(onScanSuccess);

const html5QrCode = new Html5Qrcode("qr-reader");

const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    /* handle success */
    alert(`Code scanned =`+decodedText+" - "+decodedResult.result.format.formatName);
};
const config = { fps: 10, qrbox: vw };

// If you want to prefer front camera
// html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback);

// If you want to prefer back camera
html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

// Select front camera or fail with `OverconstrainedError`.
// html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);

// Select back camera or fail with `OverconstrainedError`.
// html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);