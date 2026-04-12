/**
 * endDateISO : dernier jour « inclus » de l’événement (YYYY-MM-DD, fuseau local du visiteur).
 * Passé automatiquement quand la date du jour est strictement postérieure (voir Events.jsx).
 * Option futur : fusion avec une API — définir VITE_EVENTS_JSON_URL (JSON tableau même forme).
 */
export const LUMOS_EVENT_ROWS = [
  { id: 1, type: 'lumos', title: 'OIABM 5', date: 'Juillet 2026', endDateISO: '2026-07-31', description: '5e édition du festival Once in a Blue Moon' },
  { id: 2, type: 'lumos', title: 'FRESHMAN TRIUMPH 4TH', date: 'Avril ou Mai 2026', endDateISO: '2026-05-31', description: '4e édition de la compétition freestyle' },
  { id: 3, type: 'lumos', title: 'LANCEMENT OIABM:GEMINI (DELUXE)', date: '8 Novembre 2025', endDateISO: '2025-11-08', description: 'Lancement du projet GEMINI - EP 10 morceaux' },
  { id: 4, type: 'lumos', title: 'OIABM 4', date: '5 Juillet 2025', endDateISO: '2025-07-05', description: '4e édition du festival' },
  { id: 5, type: 'lumos', title: 'FRESHMAN TRIUMPH 3RD', date: '2 Mai 2025', endDateISO: '2025-05-02', description: '3e édition de la compétition' },
  { id: 6, type: 'lumos', title: 'OIABM 3', date: '6 Juillet 2024', endDateISO: '2024-07-06', description: '3e édition du festival' },
  { id: 7, type: 'lumos', title: 'FRESHMAN TRIUMPH 2ND', date: '18 Mai 2024', endDateISO: '2024-05-18', description: '2e édition de la compétition' },
  { id: 8, type: 'lumos', title: 'OIABM 2 - ÉDITION PERFECT BLUE', date: '15 Juillet 2023', endDateISO: '2023-07-15', description: '2e édition du festival' },
  { id: 9, type: 'lumos', title: 'FRESHMAN TRIUMPH', date: '20 Mai 2023', endDateISO: '2023-05-20', description: 'Première édition de la compétition' },
  { id: 10, type: 'lumos', title: 'OIABM 1', date: '16 Juillet 2022', endDateISO: '2022-07-16', description: 'Lancement du festival Once in a Blue Moon' },
  { id: 11, type: 'collab', title: 'NOVASTREET', date: '4 Avril 2026', endDateISO: '2026-04-04', description: 'Tournoi de soccer de rue' },
  { id: 12, type: 'collab', title: 'LANCEMENT (À CONFIRMER)', date: 'Avril 2026', endDateISO: '2026-04-30', description: 'Détails à venir' },
  { id: 13, type: 'collab', title: 'CONCERT (À CONFIRMER)', date: 'Mai 2026', endDateISO: '2026-05-31', description: 'Concert en collaboration' },
  { id: 14, type: 'collab', title: 'LANCEMENT (À CONFIRMER)', date: 'Mars 2026', endDateISO: '2026-03-31', description: 'Détails à venir' },
  { id: 15, type: 'collab', title: 'LANCEMENT (À CONFIRMER)', date: 'Février 2026', endDateISO: '2026-02-28', description: 'Détails à venir' },
  { id: 16, type: 'collab', title: 'LANCEMENT NAWFAL', date: '9 Janvier 2026', endDateISO: '2026-01-09', description: 'Lancement album Nawfal' },
  { id: 17, type: 'collab', title: "SOIRÉE D'ÉCOUTE NAWFAL", date: '4 Décembre 2025', endDateISO: '2025-12-04', description: "Session d'écoute exclusive" },
  { id: 18, type: 'collab', title: 'LANCEMENT "BLUES BELDI"', date: '9 Janvier 2026', endDateISO: '2026-01-09', description: 'Lancement album Blues Beldi' },
  { id: 19, type: 'collab', title: 'SESSION D\'ÉCOUTE "BLUES BELDI"', date: '4 Décembre 2025', endDateISO: '2025-12-04', description: "Session d'écoute exclusive" },
  { id: 20, type: 'collab', title: 'LANCEMENT "LE SENS DES CARTES"', date: '13 Septembre 2025', endDateISO: '2025-09-13', description: 'Lancement projet Le Sens des Cartes' },
  { id: 21, type: 'collab', title: 'NGOUNDIEU & FRIENDS', date: '5 Septembre 2025', endDateISO: '2025-09-05', description: 'Spectacle Ngoundieu' },
  { id: 22, type: 'collab', title: 'PÔLE HIP-HOP & FRIENDS', date: '18 Janvier 2025', endDateISO: '2025-01-18', description: 'Événement hip-hop collaboratif' },
  { id: 23, type: 'collab', title: 'APPART 808', date: '6 Septembre 2024', endDateISO: '2024-09-06', description: 'Événement Collectif APPART' },
  { id: 24, type: 'collab', title: 'INFINITE KRE8TION', date: '2 Mars 2024', endDateISO: '2024-03-02', description: 'Événement créatif collaboratif' },
  { id: 25, type: 'collab', title: 'SOUTH SIDE FLAVORS', date: '16 Septembre 2023', endDateISO: '2023-09-16', description: 'Célébration Rive-Sud' },
  { id: 26, type: 'collab', title: 'THE C.O.L.T SHOW', date: '29 Octobre 2022', endDateISO: '2022-10-29', description: 'Premier événement collaboratif' },
]
