import { getAvailableTimeSlots } from '../utils';
	import type { DayOfWeek } from '../utils';


export default function ReservationScript() {
    if (typeof window === "undefined") return;
      
        console.log("Script chargé via client:load");
	  // Récupération des éléments
	  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
	  console.log(today)
	  document.getElementById('dateReservation')!.setAttribute('min', today);


	  const dateInput = document.getElementById('dateReservation');
	  const creneauxContainer = document.getElementById('creneauxContainer');
	  const closedMessage = document.getElementById('closedMessage') as HTMLElement;
	  const creneauMidiSelect = document.getElementById('creneauMidi') as HTMLSelectElement;
      const creneauSoirSelect = document.getElementById('creneauSoir') as HTMLSelectElement;
	
	   // Vérification que les éléments existent
	   if (!creneauxContainer || !creneauMidiSelect || !creneauSoirSelect || !dateInput) {
        console.error('Un ou plusieurs éléments du formulaire sont manquants');
        return;
    	}
	
	  dateInput.addEventListener('change', (e) => {
		// Vérification du type de l'event target
		const selectedDate = new Date(e.target.value);
		const days: DayOfWeek[] = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
		const dayOfWeek: DayOfWeek = days[selectedDate.getDay()];
		console.log("Day of the week",dayOfWeek)
	
		// Appel à votre fonction pour obtenir les créneaux
		const availableSlots = getAvailableTimeSlots(dayOfWeek);
		console.log("available slot retriev from utils",availableSlots)

		 // Réinitialiser les sélecteurs
		 creneauMidiSelect.innerHTML = '';
        creneauSoirSelect.innerHTML = '';


		 // Remplir les créneaux midi si disponibles
		// Afficher ou cacher le container des créneaux
		if ((availableSlots.midi && availableSlots.midi.length > 0) && (availableSlots.soir && availableSlots.soir.length > 0)) 
		{
			availableSlots.soir.forEach(slot => {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                creneauSoirSelect.appendChild(option);
            });
			availableSlots.midi.forEach(slot => {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                creneauMidiSelect.appendChild(option);
            });
			creneauxContainer.style.display = 'flex';
			document.getElementById('closedMessage')!.style.display = 'none';
        } 
		else 
		{
            creneauxContainer.style.display = 'none';
		  document.getElementById('closedMessage')!.style.display = 'block';
        }



	  });
	  creneauMidiSelect.addEventListener('change', () => {
        if (creneauMidiSelect.value) {
            creneauSoirSelect.disabled = true;  // Désactiver le soir
            creneauSoirSelect.value=''
        } else {
            creneauSoirSelect.disabled = false; // Réactiver le soir
        }
      });

    creneauSoirSelect.addEventListener('change', () => {
        if (creneauSoirSelect.value) {
            creneauMidiSelect.disabled = true; // Désactiver le midi
            creneauMidiSelect.value=''
        } else {
            creneauMidiSelect.disabled = false; // Réactiver le midi
        }
    });


	

    console.log("Le script est bien chargé !");


    const form = document.getElementById("reservationForm") as HTMLFormElement ;



    form.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Test simplifié : vérification de chaque champ avant de l'utiliser
            const name = (document.getElementById("name") as HTMLInputElement).value;
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const phone = (document.getElementById("phone") as HTMLInputElement).value;
            const date = (document.getElementById("dateReservation") as HTMLInputElement).value;
			const creneauMidi = (document.getElementById("creneauMidi") as HTMLSelectElement).value;
			const creneauSoir = (document.getElementById("creneauSoir") as HTMLSelectElement).value;
            const nombre_personne = (document.getElementById("nombre_personne") as HTMLInputElement).value;
            const message = (document.getElementById("message") as HTMLTextAreaElement).value;


			  // Vérification si un créneau a été sélectionné (midi ou soir)
			let dateTime = null;
    		if (creneauMidi!='') {
        		dateTime = `${date}T${creneauMidi}:00`; // Combinaison de la date et du créneau midi
   			} 
			else if (creneauSoir!='') 
			{
        	dateTime = `${date}T${creneauSoir}:00`; // Combinaison de la date et du créneau soir
    		}
            const data = {
                name: name,
                email: email,
                phone: phone,
                date_time: dateTime,
                nombre_personne: nombre_personne,
                message: message
            };

            console.log("Données envoyées :", data);
			    // Validation des champs obligatoires
			if (!name || !email || !phone || !dateTime || !nombre_personne || !message) 
			{
        		alert("❌ Veuillez remplir tous les champs.");
        		return;
    		}

            // Envoi de la requête
            try {
                const response = await fetch("https://carlina-rest-api.onrender.com/api/reservations/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                console.log("Réponse serveur :", response);

                if (response.ok) {
                    form.style.display = "none";
                    // Afficher le message de confirmation
                    const confirmationMessage = (document.getElementById("confirmationMessage") as HTMLInputElement);
                    confirmationMessage.style.display = "block";
                    confirmationMessage.classList.remove("opacity-0");
                    confirmationMessage.classList.add("opacity-100");
                } else {
                    alert("❌ Erreur lors de l'envoi !");
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
    });

}