/* ==========================================================================
   INFOSES — Service worker
   --------------------------------------------------------------------------
   IMPORTANT : après CHAQUE modification d'un fichier de l'application,
   changez le numéro de VERSION ci-dessous (v3, v4, …) puis republiez.
   Sans ça, les téléphones qui ont déjà l'app garderont l'ancienne version
   en mémoire.
   ========================================================================== */

const VERSION = 'infoses-v2';

/* Fichiers mis en cache dès l'installation : l'app démarre hors-ligne
   même si l'élève n'a jamais ouvert ces pages.
   Ajoutez ici chaque nouveau quiz déposé dans outils/. */
const COQUILLE = [
  './',
  './index.html',
  './calendrier.html',
  './dates.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './outils/cap-orientation.html'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // addAll échoue en bloc si un seul fichier manque : on ajoute un par un.
    await Promise.all(COQUILLE.map(url =>
      cache.add(url).catch(() => console.warn('[SW] introuvable, ignoré :', url))
    ));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const noms = await caches.keys();
    await Promise.all(noms.filter(n => n !== VERSION).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const memeOrigine = url.origin === self.location.origin;
  const police = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);

  if (!memeOrigine && !police) return;

  /* Polices : cache d'abord, elles ne changent pas. */
  if (police) {
    e.respondWith((async () => {
      const cache = await caches.open(VERSION + '-polices');
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const rep = await fetch(req);
        if (rep.ok || rep.type === 'opaque') cache.put(req, rep.clone());
        return rep;
      } catch { return new Response('', {status: 504}); }
    })());
    return;
  }

  /* Pages et scripts de l'app : on sert la copie en cache immédiatement
     et on rafraîchit en arrière-plan pour la prochaine ouverture. */
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req, {ignoreSearch: true});

    const reseau = fetch(req).then(rep => {
      if (rep && rep.ok) cache.put(req, rep.clone());
      return rep;
    }).catch(() => null);

    if (hit) return hit;

    const rep = await reseau;
    if (rep) return rep;

    // Hors-ligne et jamais visité : on renvoie l'accueil pour une navigation.
    if (req.mode === 'navigate') {
      const accueil = await cache.match('./index.html');
      if (accueil) return accueil;
    }
    return new Response('Contenu indisponible hors connexion.', {
      status: 503,
      headers: {'Content-Type': 'text/plain; charset=utf-8'}
    });
  })());
});
