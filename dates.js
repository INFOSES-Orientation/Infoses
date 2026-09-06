/* ==========================================================================
   INFOSES — Calendrier des inscriptions dans le supérieur
   --------------------------------------------------------------------------
   C'EST LE SEUL FICHIER À METTRE À JOUR CHAQUE ANNÉE.
   Le compte à rebours de l'accueil et la page Calendrier lisent tous les deux
   ce fichier.

   Le calendrier officiel Parcoursup est publié par le ministère à l'automne.
   Tant qu'il ne l'est pas, laissez "previsionnel: true" : l'application
   affiche alors la mention « dates prévisionnelles » aux élèves.
   Source officielle : https://www.parcoursup.gouv.fr

   Format d'une étape :
     debut  : "AAAA-MM-JJ"  (jour d'ouverture)
     fin    : "AAAA-MM-JJ"  (jour de clôture ; identique à debut si un seul jour)
     titre  : le nom court affiché en gros
     detail : une phrase, ce que l'élève doit faire concrètement
     cle    : true si c'est une échéance à ne pas rater (s'affiche en rouge)
   ========================================================================== */

const CALENDRIER = {
  session: "2027",
  previsionnel: true,

  etapes: [
    {
      debut: "2026-12-16",
      fin: "2026-12-16",
      titre: "Ouverture du site d'information",
      detail: "La carte des formations est consultable. Rien à saisir : on explore, on lit les attendus, les taux d'accès et les débouchés.",
      cle: false
    },
    {
      debut: "2027-01-20",
      fin: "2027-01-20",
      titre: "Ouverture des inscriptions",
      detail: "Création du dossier candidat avec l'INE, une adresse mail valide et les bulletins. La saisie des vœux commence.",
      cle: false
    },
    {
      debut: "2027-01-20",
      fin: "2027-03-11",
      titre: "Formulation des vœux",
      detail: "Jusqu'à 10 vœux, sans les classer, plus des sous-vœux. Aucun vœu ne peut être ajouté après la clôture.",
      cle: true
    },
    {
      debut: "2027-04-01",
      fin: "2027-04-01",
      titre: "Confirmation des vœux",
      detail: "Dernier jour pour compléter le dossier, rédiger chaque projet de formation motivé et confirmer. Un vœu non confirmé est perdu.",
      cle: true
    },
    {
      debut: "2027-06-02",
      fin: "2027-06-02",
      titre: "Premières réponses",
      detail: "Début de la phase d'admission. Il faut répondre à chaque proposition dans le délai indiqué, sinon elle est annulée.",
      cle: true
    },
    {
      debut: "2027-06-11",
      fin: "2027-06-11",
      titre: "Ouverture de la phase complémentaire",
      detail: "De nouveaux vœux sont possibles dans les formations où il reste des places.",
      cle: false
    },
    {
      debut: "2027-07-08",
      fin: "2027-07-08",
      titre: "Fin de la phase principale",
      detail: "Les listes d'attente de la phase principale sont closes.",
      cle: false
    },
    {
      debut: "2027-09-09",
      fin: "2027-09-09",
      titre: "Clôture de la phase complémentaire",
      detail: "Fin de la procédure. Au-delà, l'inscription passe par les établissements directement.",
      cle: false
    }
  ]
};
