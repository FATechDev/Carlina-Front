// Format the date to a string
function formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    return new Date(date).toLocaleDateString(undefined, options);
  }


  type DayOfWeek = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

  const horairesOuverture = {
    lundi: { matin: ['12:00', '14:30'], soir: ['19:00', '22:30'] },
    mardi: { matin: ['12:00', '14:30'], soir: ['19:00', '22:30'] },
    mercredi: null,
    jeudi: { matin: ['12:00', '14:30'], soir: ['19:00', '22:30'] },
    vendredi: { matin: ['12:00', '14:30'], soir: ['19:00', '22:30'] },
    samedi: { matin: ['12:00', '14:30'], soir: ['19:00', '22:30'] },
    dimanche: null
  };
  
  function getAvailableTimeSlots(dayOfWeek: DayOfWeek): { midi: string[] | null, soir: string[] | null } {
    const horairesJour = horairesOuverture[dayOfWeek];
    if (!horairesJour) return { midi: null, soir: null };  // Si pas de horaires pour ce jour-là

    // Fonction pour générer les créneaux
    const genererCreneaux = (debut: string, fin: string): string[] => {
        const availableSlots: string[] = [];
        let startTime = new Date(`1970-01-01T${debut}:00Z`);
        let endTime = new Date(`1970-01-01T${fin}:00Z`);
        
        while (startTime < endTime) {
            // Formater l'heure en HH:MM
            const slot = startTime.toISOString().slice(11, 16);
            availableSlots.push(slot);
            
            // Ajouter 15 minutes
            startTime.setMinutes(startTime.getMinutes() + 15);
        }
        return availableSlots;
    };

    let availableSlotMidi: string[] | null = null;
    let availableSlotSoir: string[] | null = null;

    // Générer les créneaux pour le matin
    if (horairesJour.matin) {
        availableSlotMidi = genererCreneaux(horairesJour.matin[0], horairesJour.matin[1]);
    }

    // Générer les créneaux pour le soir
    if (horairesJour.soir) {
        availableSlotSoir = genererCreneaux(horairesJour.soir[0], horairesJour.soir[1]);
    }

    // Retourner les créneaux pour midi et soir
    return { midi: availableSlotMidi, soir: availableSlotSoir };
}


  export {formatDate,getAvailableTimeSlots};
  export type {DayOfWeek}