// const CACHE_NAME  = 'my-app-cache-v1';
// // Alias for index.html

// // A list of local resources we always want to be cached.
// const urlsToCache   = [
//     './',
//     './index.html',
//     './home.html',
//     './mainPage.html',
//     './statoOrdini.html',
//     './schedaCliente.html',
//     './nuovoCliente.html',
//     './movimentiPeriodici.html',
//     './login.html',
//     './ListaClienti.html',
//     './ListaArticoli.html',
//     './estrattoConto.html',
//     './venditaBanco.html',
//     './ricercaArticoli.html',
    
//     './css/style.css',
//     './css/clrAziendaPratica.css',

//     './componenti/elementiAnnotazioni.js',
//     './componenti/elementiCarrello.js',
//     './componenti/elementiComboScomparsa.js',
//     './componenti/elementiDestinazioni.js',
//     './componenti/elementiDetagliDocumenti.js',
//     './componenti/elementiElencoServer.js',
//     './componenti/elementiMainPage.js',
//     './componenti/elementiVenditaAlBanco.js',
//     './componenti/elementiRubrica.js',
    
//     'config/config.js',
    
    
    
//     './js/script.js',
//     './js/carrello.js',
//     './js/dettaglioGiacenze.js',
//     './js/documento.js',
//     './js/chart.min.js',
//     './js/chartjs-plugin-datalabels.min.js',
//     './js/chartjs-plugin-zoom.min.js',
//     './js/estrattoConto.js',
//     './js/foglioDiCarico.js',
//     './js/gestioneAccount.js',
//     './js/graficiAnagrafiche.js',
//     './js/hammer.min.js',
//     './js/hammer.min.js.map',
//     './js/incassa.js',
//     './js/incassiPierodici.js',
//     './js/informativaPrivacy.js',
//     './js/jquery-3.5.1.min.js',
//     './js/listaArticoli.js',
//     './js/listaClienti.js',
//     './js/listaConfigurazioni.js',
//     './js/listaPagamenti.js',
//     './js/listaUtenti.js',
//     './js/listeAssistenze.js',
//     './js/listeMagazzino.js',
//     './js/listeVarie.js',
//     './js/login.js',
//     './js/main.js',
//     './js/mainPage.js',
//     './js/menu.js',
//     './js/movimentiPeriodici.js',
//     './js/multiDocumento.js',
//     './js/noSleep.js',
//     './js/nuovaConfigurazione.js',
//     './js/nuovoAspettoBeni.js',
//     './js/nuovoAssortimentoArticoli.js',
//     './js/nuovobanche.js',
//     './js/nuovoCausaliTrasporto.js',
//     './js/nuovoCliente.js',
//     './js/nuovocodiciIva.js',
//     './js/nuovocontratti.js',
//     './js/nuovocontrattiB2B.js',
//     './js/nuovoDepositi.js',
//     './js/nuovofamiglieArticoli.js',
//     './js/nuovofamiglieCliFor.js',
//     './js/nuovoNoteAggiuntive.js',
//     './js/nuovopagamenti.js',
//     './js/nuovotipologieArticoli.js',
//     './js/nuovotipologieArticoli2.js',
//     './js/nuovoUtente.js',
//     './js/nuovozone.js',
//     './js/offline.js',
//     './js/passwordDimenticata.js',
//     './js/pdf.js',
//     './js/pdfViewer.js',
//     './js/produzione.js',
//     './js/registrazioneUtente.js',
//     './js/resoMerce.js',
//     './js/ricercaArticoli.js',
//     './js/richiesteResi.js',
//     './js/scadenziario.js',
//     './js/schedaCliente.js',
//     './js/situazioneArticoli.js',
//     './js/slideShow.js',
//     './js/statoOrdini.js',
//     './js/venditaBanco.js',
// ];


// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open(CACHE_NAME)
//         .then((cache) => {
//           console.log('Cache aperta');
//           return cache.addAll(urlsToCache);
//         })
//     );
//   });
  
//   self.addEventListener('fetch', (event) => {
//     if (event.request.method === 'GET') {
//         event.respondWith(
//           caches.match(event.request)
//             .then((response) => {
//               if (response) {
//                 return response;
//               }
//               return fetch(event.request);
//             })
//         );
//       }
//   });
  
//   self.addEventListener('activate', (event) => {
//     const cacheWhitelist = [CACHE_NAME];
  
//     event.waitUntil(
//       caches.keys().then((cacheNames) => {
//         return Promise.all(
//           cacheNames.map((cacheName) => {
//             if (cacheWhitelist.indexOf(cacheName) === -1) {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });

  
  'use strict';
  var config = {
    version: 'versione4::',
    precachingItems: [
        './index.html',
        './home.html',
        './mainPage.html',
        './statoOrdini.html',
        './schedaCliente.html',
        './nuovoCliente.html',
        './movimentiPeriodici.html',
        './login.html',
        './ListaClienti.html',
        './ListaArticoli.html',
        './estrattoConto.html',
        './venditaBanco.html',
        './ricercaArticoli.html',
        
        './css/style.css',
        './css/clrAziendaPratica.css',

        './componenti/elementiAnnotazioni.js',
        './componenti/elementiCarrello.js',
        './componenti/elementiComboScomparsa.js',
        './componenti/elementiDestinazioni.js',
        './componenti/elementiDettagliDocumenti.js',
        './componenti/elementiElencoServer.js',
        './componenti/elementiMainPage.js',
        './componenti/elementiVenditaAlBanco.js',
        './componenti/elementiRubrica.js',
        
        './config/config.js',
        
        
        
        './js/script.js',
        './js/carrello.js',
        './js/dettaglioGiacenze.js',
        './js/documento.js',
        './js/chart.min.js',
        './js/chartjs-plugin-datalabels.min.js',
        './js/chartjs-plugin-zoom.min.js',
        './js/estrattoConto.js',
        './js/foglioDiCarico.js',
        './js/gestioneAccount.js',
        './js/graficiAnagrafiche.js',
        './js/hammer.min.js',
        './js/hammer.min.js.map',
        './js/incassa.js',
        './js/incassiPeriodici.js',
        './js/informativaPrivacy.js',
        './js/jquery-3.5.1.min.js',
        './js/listaArticoli.js',
        './js/listaClienti.js',
        './js/listaConfigurazioni.js',
        './js/listaPagamenti.js',
        './js/listaUtenti.js',
        './js/listeAssistenze.js',
        './js/listeMagazzino.js',
        './js/listeVarie.js',
        './js/login.js',
        './js/main.js',
        './js/mainPage.js',
        './js/menu.js',
        './js/movimentiPeriodici.js',
        './js/multiDocumento.js',
        './js/noSleep.js',
        './js/nuovaConfigurazione.js',
        './js/nuovoAspettoBeni.js',
        './js/nuovoAssortimentoArticoli.js',
        './js/nuovobanche.js',
        './js/nuovoCausaliTrasporto.js',
        './js/nuovoCliente.js',
        './js/nuovocodiciIva.js',
        './js/nuovocontratti.js',
        './js/nuovocontrattiB2B.js',
        './js/nuovoDepositi.js',
        './js/nuovofamiglieArticoli.js',
        './js/nuovofamiglieCliFor.js',
        './js/nuovoNoteAggiuntive.js',
        './js/nuovopagamenti.js',
        './js/nuovotipologieArticoli.js',
        './js/nuovotipologieArticoli2.js',
        './js/nuovoUtente.js',
        './js/nuovozone.js',
        './js/offline.js',
        './js/passwordDimenticata.js',
        './js/pdf.js',
        './js/pdfViewer.js',
        './js/produzione.js',
        './js/registrazioneUtente.js',
        './js/resoMerce.js',
        './js/ricercaArticoli.js',
        './js/richiesteResi.js',
        './js/scadenziario.js',
        './js/schedaCliente.js',
        './js/situazioneArticoli.js',
        './js/slideShow.js',
        './js/statoOrdini.js',
        './js/venditaBanco.js',
    ],
    blacklistCacheItems: [
      '/service-worker.js'
    ],
   offlineImage: '<svg role="img" aria-labelledby="offline-title"'
   + ' viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">'
   + '<title id="offline-title">Offline</title>'
   + '<g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/>'
   + '<text fill="#9B9B9B" font-family="Times New Roman,Times,serif" font-size="72" font-weight="bold">'
   + '<tspan x="93" y="172">offline</tspan></text></g></svg>',
   offlinePage: '/offline.html'
  };
  function cacheName (key, opts) {
    return `${opts.version}${key}`;
  }
  function addToCache (cacheKey, request, response) {
    if (response.ok) {
      var copy = response.clone();    
      caches.open(cacheKey).then( cache => { cache.put(request, copy); });
    }
    return response;
  }
  function fetchFromCache(event) {
    return caches.match(event.request).then(response => {
      if (!response) {
        throw Error(`${event.request.url} not found in cache`);
      }
      return response;
    });
  }
  function offlineResponse (resourceType, opts) {
    if (resourceType === 'image')
      return new Response(opts.offlineImage, { headers: { 'Content-Type': 'image/svg+xml' } });
    if (resourceType === 'content')
      return caches.match(opts.offlinePage);
    return undefined;
  }
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open( cacheName('static', config) ).then(cache => cache.addAll(config.precachingItems))
      .then( () => self.skipWaiting() ) 
    );
  });
  self.addEventListener('activate', event => {
    function clearCacheIfDifferent(event, opts) {
      return caches.keys().then(cacheKeys => {
          var oldCacheKeys = cacheKeys.filter(key => key.indexOf(opts.version) !== 0);
          var deletePromises = oldCacheKeys.map(oldKey => caches.delete(oldKey));
          return Promise.all(deletePromises);
        });
    }
    event.waitUntil(
      clearCacheIfDifferent(event, config).then( () => self.clients.claim() )
    );
  });
  self.addEventListener('fetch', event => {
    var request       = event.request;
    var acceptHeader  = request.headers.get('Accept');
    var url           = new URL(request.url);
    var resourceType  = 'static';
    var cacheKey;
    if( request.method !== 'GET' ) {
        return;
    }
    if( url.origin !== self.location.origin ) {
        return;
    }
    if( config.blacklistCacheItems.length > 0 && config.blacklistCacheItems.indexOf(url.pathname) >= 0 ) {
        return;
    }
    if (acceptHeader.indexOf('text/html') !== -1) {
      resourceType = 'content';
    }
    else if (acceptHeader.indexOf('image') !== -1) {
      resourceType = 'image';
    }
    cacheKey = cacheName(resourceType, config);
    // Network First Strategy 
    if (resourceType === 'content') {
      event.respondWith(
        fetch(request)
      .then(response => addToCache(cacheKey, request, response))
      .catch(() => fetchFromCache(event))
      .catch(() => offlineResponse(resourceType, config))
      );
    }
    // Cache First Strategy
    else {
      event.respondWith(
        fetchFromCache(event)
      .catch(() => fetch(request))
      .then(response => addToCache(cacheKey, request, response))
      .catch(() => offlineResponse(resourceType, config))
      );
    }
    
    if (navigator.onLine==false) {
        
        // document.getElementById('chkOffLine').checked=true
        // attivaDisattivaModalitaOffLine(document.getElementById('chkOffLine'),false,()=>{
        //     console.log('dentro callback');    
        // })
    }
  }); 