var slideShow = "css/slideShow.css?ver=1.1";
var cssSlideShow = document.createElement("link");
var slideCss='slideMd';
var slideShowHtml='';
function compilaSlideShow(idDivContainerSlideShow='slideShowContainer'){
    parametri={"tipoRisposta":"select","tipoQuery":"querySpecifica","nomeTabella":"listaLinkRapidiListaArticoli","slideShow":"true"};
    inviaRichiestaCentralino("query",parametri,(res)=>{
        var risp=JSON.parse(res);
        var data=risp.risposta;
        var divSlide='';
        var spanSlide='';
        if(data[0]==0){
            return;
        }
        if(data.length>1){
            var abilitaScomparsa='fade';
        }else{
            var abilitaScomparsa='';
        }
        for(var x in data){
            if(data[x].linkEsterno==''){
                var href=`<a href="ListaArticoli.html?linkRapido=${data[x].id}">`;
                
            }else{
                var href=`<a href="${data[x].linkEsterno}" target="_blank">` ;
            }
            
            divSlide+=` <div class="mySlides ${abilitaScomparsa} overlay">
            ${href}<img src="${xUrlBase+'\\pdf\\'+xIdConfigurazione+'\\slideShow\\'+data[x].imgCarosello}" style="width:100%"></a>
          </div>`
          spanSlide+=`<span class="dot" onclick="currentSlide(${x})"></span>`;
        }


        slideShowHtml=`
        <!-- Slideshow container -->
    <div class="slideshow-container marg10Top ${slideCss}">
    
    ${divSlide}
    
      <!-- Next and previous buttons -->
      <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
      <a class="next" onclick="plusSlides(1)">&#10095;</a>
    </div>
    <br>
    
    <!-- The dots/circles -->
    <div style="text-align:center">
    ${spanSlide}
    </div>
    `
    document.getElementById(idDivContainerSlideShow).innerHTML=slideShowHtml;
    if(intervalId!=''){
        clearInterval(intervalId);
        
    }

    showSlides();
    intervalId=setInterval(showSlides, 8000); 
    
    })

}

cssSlideShow.setAttribute("href", slideShow);
cssSlideShow.setAttribute("rel", "stylesheet")
cssSlideShow.setAttribute("type", "text/css");



var showSlides
var intervalId='';
var slideIndex = 0;
var slideAvviata=false;
// Next/previous controls
function plusSlides(n) {
    clearInterval(intervalId);
    // slideIndex += n
    showSlides(n);
    intervalId=setInterval(showSlides, 8000); 
    
}

// Thumbnail image controls
function currentSlide(n) {
    clearInterval(intervalId);
    slideIndex = n-2;
    showSlides();
    intervalId=setInterval(showSlides, 8000); 
}


function showSlides(n=0) {
    
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
    if(n==0){
        // slideIndex++;
    }else{
        slideIndex+=n;
    }
    
    
  if (slideIndex > (slides.length-1)) {
      slideIndex = 0
    }
  if(slideIndex <0){
    slideIndex=(slides.length-1);    
  }
    
    slides[slideIndex].style.display = "block";
    if(n==0){
        slideIndex++;
    }
    
}
