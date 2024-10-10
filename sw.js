const SERVER_1_URL = 'https://server1.example.com';
const SERVER_2_URL = 'https://server2.example.com';
const DEFAULT_URL = 'https://default.example.com';

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    let targetUrl = url.href;
    if (url.pathname.startsWith('/api1/')) {
        targetUrl = SERVER_1_URL + url.pathname;
    } else if (url.pathname.startsWith('/api2/')) {
        targetUrl = SERVER_2_URL + url.pathname;
    } else if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
        targetUrl = url.href;
    } else {
        targetUrl = url.href;
    }

    console.log(`Intercepted request to ${url.href}, redirecting to ${targetUrl}`);

    event.respondWith(
        fetch(targetUrl, {
            method: event.request.method,
            headers: event.request.headers,
            body: event.request.body,
            mode: 'cors',
            credentials: 'same-origin'
        })
    );
});