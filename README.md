# Application INFOSES

Une application installable sur Android et iOS, construite autour des outils déjà
en ligne sur Infoses. Elle fonctionne sans connexion une fois installée.

---

## Contenu du dossier

```
infoses-app/
├── index.html          Accueil : compte à rebours + liste des outils
├── calendrier.html     Calendrier des inscriptions dans le supérieur
├── dates.js            LES DATES — le seul fichier à mettre à jour chaque année
├── manifest.json       Nom, icône, couleurs de l'application
├── sw.js               Mise en cache pour le fonctionnement hors connexion
├── icons/              Icônes aux formats Android, iOS et navigateur
└── outils/             Vos fichiers HTML (test d'orientation, quiz…)
```

---

## Mise en ligne, étape par étape

L'hébergement doit être en HTTPS et permettre de déposer un fichier à la racine :
Wix ne le permet pas, GitHub Pages si, et gratuitement.

1. Créez un compte sur **github.com** si vous n'en avez pas.
2. Cliquez sur **New repository**. Nommez-le `infoses-app`, laissez-le **Public**,
   puis **Create repository**.
3. Sur la page du dépôt vide, cliquez sur **uploading an existing file**.
4. Faites glisser **le contenu** du dossier `infoses-app` (pas le dossier lui-même :
   `index.html` doit se retrouver à la racine du dépôt). Cliquez sur **Commit changes**.
5. Allez dans **Settings → Pages**. Sous *Source*, choisissez **Deploy from a branch**,
   branche `main`, dossier `/ (root)`. Cliquez sur **Save**.
6. Attendez deux à trois minutes. L'adresse s'affiche en haut de la page :
   `https://VOTRE-IDENTIFIANT.github.io/infoses-app/`

Ajoutez ensuite cette adresse sur Infoses, sous un bouton du type
« Installer l'application ».

---

## Comment les élèves l'installent

**Android (Chrome)** — un bandeau « Installer » apparaît en bas de l'accueil.
Sinon : menu ⋮ → *Ajouter à l'écran d'accueil*.

**iPhone (Safari obligatoire)** — bouton Partager en bas de l'écran →
*Sur l'écran d'accueil*. L'application affiche cette consigne d'elle-même
aux visiteurs sur iPhone.

Dans les deux cas l'icône s'installe, l'application s'ouvre en plein écran sans
barre d'adresse, et les outils restent accessibles hors connexion.

---

## Les trois gestes d'entretien

### Ajouter un quiz

1. Déposez le fichier HTML dans `outils/`.
2. Dans `index.html`, à l'intérieur de `<ul class="liste dense" id="quiz">`,
   ajoutez :

```html
<li><a class="outil" href="./outils/quiz-croissance.html">
  <div class="outil-nom">Sources et défis de la croissance</div>
  <span class="chevron"></span>
</a></li>
```

3. Dans `sw.js`, ajoutez `'./outils/quiz-croissance.html',` à la liste `COQUILLE`
   pour qu'il soit disponible hors connexion.
4. Changez le numéro de `VERSION` (voir ci-dessous).

### Mettre à jour les dates

Ouvrez `dates.js` et corrigez les dates. Dès que le calendrier officiel est
publié, passez `previsionnel: true` à `false` : la mention « dates
prévisionnelles » disparaît alors de l'accueil et de la page calendrier.

### Publier une modification

**À faire à chaque fois, sans exception :** dans `sw.js`, changez la ligne

```js
const VERSION = 'infoses-v1';
```

en `'infoses-v2'`, puis `v3`, etc. Sans ce changement, les téléphones qui ont
déjà installé l'application continueront d'afficher l'ancienne version, qu'ils
ont gardée en mémoire.

---

## Ce que fait le compte à rebours

L'accueil calcule tout seul le nombre de jours avant la prochaine échéance :

- si une étape n'a pas commencé, il compte jusqu'à son ouverture ;
- si une étape est en cours, il compte jusqu'à sa clôture et l'annonce
  (« Clôture — Formulation des vœux ») ;
- quand la session est finie, il invite à mettre `dates.js` à jour.

Aucune intervention n'est nécessaire en cours d'année.

---

## Plus tard : les magasins d'applications

Le même dossier peut être emballé en application native avec **Capacitor**, sans
rien réécrire. Deux points à connaître avant de s'y engager :

- **Android** : 25 $ une fois pour le compte Google Play.
- **iOS** : un Mac est obligatoire, et le compte développeur Apple coûte 99 $ par
  an. Apple refuse fréquemment les applications qui ne sont qu'un site web
  emballé (règle 4.2). Les établissements d'enseignement et associations à but
  non lucratif éligibles peuvent être exonérés des frais annuels : cela vaut la
  peine de vérifier via votre lycée.

La version installable depuis le navigateur couvre déjà l'essentiel des usages,
sans frais ni délai de validation.
