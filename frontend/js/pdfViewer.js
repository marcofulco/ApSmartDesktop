// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/pdfjs/pdf.worker.min.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    canvas,
    ctx;
var scale=0;
var scale2=0;

var zoom=100;
var NrFile=0;
var maxFile=0;
var rs;

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num, zoom=100,parametri='') {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    // if (xScale==0){
        scale=2*vw/1193;
        if (scale<2){
          scale=2;
        }
    // } else {
    //   scale=xScale;
    // }

    pageRendering = true;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport({scale: scale});
        canvas.height =viewport.height;
        canvas.width = viewport.width;

        // if (xScale==0) {
          canvas.style.width = zoom+"%";
        // } else {
        //   canvas.style.width = null;
        // }
        
        // Render PDF page into canvas context
        var renderContext = {
        canvasContext: ctx,
        viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(function() {
          pageRendering = false;
          if (pageNumPending !== null) {
              // New page rendering is pending
              renderPage(pageNumPending,zoom,parametri);
              pageNumPending = null;
          } else {
            if (parametri.firme!=undefined){
              if (parametri.firme.destinatario!=undefined || parametri.firme.vettore!=undefined){
                var p=document.getElementById("pdfContainer");
                p.scrollTop = p.scrollHeight;
              }
            }
          }
        });
    });

    // Update page counters
  document.getElementById('page_num').textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num, zoom);
  }
}

/**
 * Displays previous page.
 */
function pdfOnPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  zoom=100;
  queueRenderPage(pageNum);
}

function onPrevFile() {
  if (NrFile <= 0) {
    return;
  }
  NrFile--;
  pageNum=1;
  zoom=100;
  openPdf(rs,NrFile);
}

/**
 * Displays next page.
 */
function pdfOnNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  zoom=100;
  queueRenderPage(pageNum);
}

function onNextFile() {
  if (NrFile+1 >= maxFile) {
    return;
  }
  pageNum=1;
  NrFile++;
  zoom=100;
  openPdf(rs,NrFile);
}

function pdfZoom(segno,passo=10) {
  if (segno=="in"){
    zoom+=passo;
  } else {
    zoom-=passo;
  }

  if (zoom<20){
    zoom=20;
  } else if(zoom>200){
    zoom=200;
  }

  queueRenderPage(pageNum);
}

/**
 * Asynchronously downloads PDF.
 */
function openPdf(data, r=0, allegati=false,nomePDFSpecifico='',parametri=''){
    firmaDestinatario=new Array();
    firmaVettore=new Array();

    if (nomePDFSpecifico!=''){
      maxFile=1;

      var url=nomePDFSpecifico; 
      var ext=nomePDFSpecifico.toLowerCase().split(".");

      document.getElementById("pdfViewer").setAttribute("fileCorrente",nomePDFSpecifico);
    } else {
      rs=data;

      if (rs.length<r) {
        return ""
      }

      maxFile=rs.length;

      var url=urlImmagineArticolo(rs[r]["img"],"","","",true,allegati,true); 
      var ext=rs[r]["img"].toLowerCase().split(".");
      var imgPath=rs[r]["img"];

      if (imgPath.indexOf('/')>0){
          imgPath=imgPath.split("/");
          imgPath=imgPath[imgPath.length-1];
      }

      var nomeFile=xUrlBase+'pdf/'+xIdConfigurazione+'/'+imgPath;
      nomeFile=nomeFile.replace('.PDF','.pdf');

      if (allegati){
        nomeFile=nomeFile.toLowerCase();
      }

      document.getElementById("pdfViewer").setAttribute("fileCorrente",nomeFile);
    }
    
    ext=ext[ext.length-1];
    NrFile=r;

    document.getElementById('file_count').textContent = maxFile;
    document.getElementById('file_num').textContent = (r+1);

    canvas = document.getElementById('pdfBox');
    img = document.getElementById('imgBox');

    divCanvas= document.getElementById('divPdfContainer');
    divImg= document.getElementById('divImgContainer');

    switch (ext){
        case "pdf":
            scale=0;
            scale2=0;
            pageNum=1;

            ctx = canvas.getContext('2d');

            divCanvas.style.display="block";
            divImg.style.display="none";

            // canvas.addEventListener('gestureend', function(e) {
            //     if (e.scale < 1.0) {
            //       pdfZoom("out");
            //     } else if (e.scale > 1.0) {
            //       pdfZoom("in");
            //     }
            // }, false);
            //panleft panright tap press 

            attivaTouchZoom(canvas);

            attivaAlert(3,"","pdf","","pdfContainer");

            pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
                pdfDoc = pdfDoc_;
                document.getElementById('page_count').textContent = pdfDoc.numPages;
                
                // Initial/first page rendering
                renderPage(pageNum,100,parametri);
                chiudiModalAlert("pdf");
                });
            
            break;
        case "jpg":
        case "jpeg":
        case "png":
            divCanvas.style.display="none";
            divImg.style.display="block";

            img.setAttribute("src",url);

            attivaTouchZoom(img);
            break;
        default:

    }
}

function pdfDownloadFile(){
  var url=document.getElementById("pdfViewer").getAttribute("fileCorrente");

  window.open(url,"_blank");
}

function pdfWhatsAppFile(){
  var url=document.getElementById("pdfViewer").getAttribute("fileCorrente");
  var cel=document.getElementById("pdfViewer").getAttribute("celWhatsapp");

  if (cel==undefined || cel==null){
    cel=prompt("Indicare un numero WhatsApp a cui inviare il file","");
  }

  if (cel==""){
    cel=prompt("Indicare un numero WhatsApp a cui inviare il file","");
  }

  if (cel=="" || cel==null) {
    return;
  }

  cel=cel.replace(/\+39/g,'');

  var Testo="Di seguito il link per scaricare il documento. "+url;

  if (gRe!=''){
    var waLink='https://wa.me/39'+cel+'?text='+Testo.replace(/ /g, "%20");
  } else {
    var waLink='whatsapp://send/?phone=39'+cel+'&text='+Testo.replace(/ /g, "%20")+'&source=&data=';
  }
  
  window.open(waLink,"_blank");
}

function pdfInviaEMail(){
  var script=document.createElement("script");
  script.id="scrEMail";
  script.setAttribute("src","componenti/modalEMail.js");
  document.body.appendChild(script);

  var pdfViewer="";
  var idCliente="0";
  var eMailCli="";
  var url="";
  var oggetto="";
  var testo="";

  try {
      pdfViewer=document.getElementById("pdfViewer");
      idCliente=pdfViewer.getAttribute("idCliente");

      if (xIdCliente>0 && typeof parametriSO !== 'undefined'){
        if (parametriSO.modificheFerrara==1){
          eMailCli=parametriSO.mailAziendale;  
        } else {
          eMailCli=pdfViewer.getAttribute("eMailCli");  
        }
      } else {
        eMailCli=pdfViewer.getAttribute("eMailCli");  
      }

      url=pdfViewer.getAttribute("fileCorrente");  
      oggetto=pdfViewer.getAttribute("desDoc");  
      testo=pdfViewer.getAttribute("testoMail");  

      if (eMailCli!=undefined){
        eMailCli=eMailCli.replace(/;/g,',');
      }
  } catch (error) {
      
  }
  
  script.onload = function() {
      divEMail=document.createElement("div");
      
      divEMail.id = "modEMail" 
      divEMail.setAttribute("name","modEMail"); 
      divEMail.setAttribute("class","modalEMailContainer");
      divEMail.setAttribute("idCliente",idCliente);

      divEMail.innerHTML = modalEMail;

      document.body.appendChild(divEMail);
      
      valorizzaValueElemento("txtDestinatario",eMailCli);
      valorizzaValueElemento("txtOggetto",oggetto);
      
      if (typeof xParametri !== 'undefined') {
        if (typeof xParametri.CCNPredefinito !== 'undefined') {
          if(xParametri!=undefined && xParametri.CCNPredefinito!=undefined){
            valorizzaValueElemento("txtCCn",xParametri.CCNPredefinito);
          }
        }
      }

      if (testo!="" && testo!=null){
        valorizzaValueElemento("txtTesto",testo);
      } else {
        valorizzaValueElemento("txtTesto","In allegato Ns. Documento");
      }

      if (url!=''){
        var nomeFile=url.split("/");
        nomeFile=nomeFile[nomeFile.length-1];

        var ul=document.getElementById("elencoAllegati");
        ul.innerHTML=elementiAllegati.replace(/{URL}/g,url).replace(/{NOMEFILE}/g,nomeFile);
      }

      caricaParametriEMail();
      divEMail.style.display="block"; 
  };
}

function pdfFirma(input){
  if(input.classList.contains('pulsanteVeBaAttivo')){
      input.classList.remove('pulsanteVeBaAttivo');
      $("#divSignature").remove();
      $('#jsignatureScript').remove();
  } else {
      firmaDestinatario=new Array();
      firmaVettore=new Array();
      
      input.classList.add('pulsanteVeBaAttivo');
      var jScript=document.createElement("script");
      jScript.setAttribute("src","js/jquery-3.5.1.min.js");
      document.getElementsByTagName('head')[0].appendChild(jScript);
      jScript.onload=function (){
          var script=document.createElement("script");
          script.setAttribute("src","js/jSignature/jSignature.min.js");
          script.id="jsignatureScript";
          document.body.appendChild(script);
          script.onload=function(){
            var div=elementiPdfFirma;
            $('body').append(div);
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            $("#signature").jSignature({'decor-color':'black','color':'blue','height':'330px','width':vw+'px'});
              
            var cmdFirma=document.getElementById("cmdFirma");
            var tipoStampa=cmdFirma.getAttribute("tipoStampa");
            document.getElementById('btnInvioFirma').setAttribute("onclick","inviaFirma('"+tipoStampa+"')");
        }
      }
    }
}

var firmaDestinatario=new Array();
var firmaVettore=new Array();

function slcFirma(input){
  if(input.value=='destinatario'){
    firmaVettore=$("#signature").jSignature("getData","base30");
    $('#signature').jSignature('reset')
    $("#signature").jSignature("setData","data:" + firmaDestinatario.join(","));
  }else if(input.value=="vettore"){
    firmaDestinatario=$("#signature").jSignature("getData","base30");
    $('#signature').jSignature('reset')
    $("#signature").jSignature("setData","data:" + firmaVettore.join(","));
  }
}

function inviaFirma(tipoStampa=""){  
  if (firmaDestinatario.length==0 && recuperaValueElemento("cmbTipoFirma")=="destinatario"){
    firmaDestinatario=$("#signature").jSignature("getData","base30");
  }

  if (firmaVettore.length==0 && recuperaValueElemento("cmbTipoFirma")=="vettore"){
    firmaVettore=$("#signature").jSignature("getData","base30");
  }

  if (firmaDestinatario.length>0){
    if (firmaDestinatario[1]==''){
      if (firmaVettore.length>0){
        firmaDestinatario=new Array();
      } else {
        attivaAlert(xTipoAllert.CRITICO,"Non è stata apposta nessuna firma per il Destinatario!","inviaFirma");
        chiudiPDFFirma();
        return;
      }
    }
  }

  if (firmaVettore.length>0){
    if (firmaVettore[1]==''){
      attivaAlert(xTipoAllert.CRITICO,"Non è stata apposta nessuna firma per il vettore!","inviaFirma");
      chiudiPDFFirma();
      return;
    }
  }

        chiudiPDFViewer();
        
            if(tipoStampa!='' && tipoStampa=="report"){
                console.log(parametriReportOld)
                stampaReport(parametriReportOld);
            }else{
                stampa();
            }    
}

function chiudiPDFFirma(){
  var cmd=document.getElementById("cmdFirma");
  pdfFirma(cmd);
}

var elaboraEliminaPDFPersonalizzato;

function pdfElimina(aID=0, callBack=''){
    var id;
    
    elaboraEliminaPDFPersonalizzato="";

    if (callBack!=''){
      elaboraEliminaPDFPersonalizzato=callBack;
    }

    if (aID>0){
      id=aID;
    } else {
      id=rs[NrFile]["ID"];
    }
    
    if (id>0){
        attivaAlert(5,"<div><div>Sei sicuro di voler eliminare questa Immagine dall'archivio?</div><div><u></u></div></div>","rispEliminaPDF_"+id);        
    }
}

function rispEliminaPDF(risp, id) {
    if (risp=="Si") {
        avviarispEliminaPDF(id);
    } else {
        chiudiModalAlert("risprispEliminaPDF."+id);
    }
}

function avviarispEliminaPDF(id) {
    const parametri={"tipoRisposta":"elimina", "tipoElimina":"immagini", "dati":id};
    inviaRichiestaCentralino("elimina", parametri, elaboraEliminaPDF);
}

function elaboraEliminaPDF(res){
    var risp=JSON.parse(res);
    var parametri=risp.parametri;
    var data=risp.risposta;

    if (risp.error!=''){
        return "";
    }
    
    if(data[0]==0){
        attivaAlert(0,"Errore durante l'eliminazione del record'","fineElimina");
        return "";
    }

    if (elaboraEliminaPDFPersonalizzato!=''){
      elaboraEliminaPDFPersonalizzato();
      chiudiPDFViewer();
      return;
    }

    rs.splice(NrFile,1);
    
    if (NrFile==maxFile || (NrFile>0 && maxFile>1)){        
        maxFile--;
        onPrevFile();
    } else if(NrFile==0 && maxFile>1) {
        NrFile--;
        maxFile--;
        onNextFile();
    } else if(maxFile-1==0){
        try {
          var p=document.getElementById("pdfViewer");
          p.setAttribute("ricaricaPagina","avviaCarDettagliDocumenti()");
        } catch (error) {
          
        }
        
        chiudiPDFViewer();
    }
}