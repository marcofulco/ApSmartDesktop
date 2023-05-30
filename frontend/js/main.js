if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
        console.log('Service worker registration failed, error:', error);
    });
}

// Listen for install event, set callback
self.addEventListener('install', function(event) {
    // Perform some task
    console.log("Service Worker installato");
});

self.addEventListener('activate', function(event) {
    // Perform some task
    console.log("service Worker Attivo");
});