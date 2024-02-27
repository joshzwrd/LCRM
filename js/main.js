document.addEventListener('DOMContentLoaded', function() {
    const contactsList = document.getElementById('contactsList');

    // Supposer que vous avez un élément avec l'ID 'contactsList' dans votre HTML
    firebase.firestore().collection('contacts').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const contact = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = `Nom: ${contact.nom}, Email: ${contact.email}`;
            contactsList.appendChild(listItem);
        });
    });
});

function addContact(nom, email) {
    firebase.firestore().collection('contacts').add({
        nom: nom,
        email: email
    }).then(() => {
        console.log("Contact ajouté avec succès !");
    }).catch((error) => {
        console.error("Erreur d'ajout de contact : ", error);
    });
}


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;

    addContact(nom, email);
});
