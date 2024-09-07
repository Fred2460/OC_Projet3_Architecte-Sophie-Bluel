// ******************* REINITIALISATION DU LOCAL STORAGE ********************
localStorage.clear();

// initialisation des variables
let loginForm = document.getElementById("loginForm");
let errorMessage = document.getElementById("errorMessage");

// Ecoute appuie bouton "Se connecter"
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // empêche le comportement pas défaut de rechargement de la page
    // récupération des valeurs du formulaire
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    genererLogin(email, password);

});


// ************** FONCTION CONNEXION *****************
async function genererLogin(email, password) {
    try {
        // interrogation API login
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            //mode: "cors",
            headers: {
                //"accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
            // "sophie.bluel@test.tld" "S0phie"
        })

        if (!response.ok) {
            if (response.status === 401) {
                errorMessage.textContent = "Erreur de mot de passe";
            } else if (response.status === 404) {
                errorMessage.textContent = "Utilisateur inconnu";
            } else {
                errorMessage.textContent = "Erreur";
            }
            document.addEventListener('keydown', function(event) { // Attendre une touche clavier
                errorMessage.textContent = "";
            });
            document.addEventListener('click', function(event) { // Attendre un clic de souris
                // Un clic est détecté, affiche le texte
                errorMessage.textContent = "";
            });
        } else {
            const data = await response.json();
            window.localStorage.setItem("userId", data.userId); // stockage du userId récupéré
            window.localStorage.setItem("token", data.token); // stockage du token récupéré
            console.log("userId =", data.userId); // Vérif
            console.log("token =", data.token); // Vérif
            window.location.replace("index.html#tportfolio"); // redirection vers la page d'accueil à la balise des projets
        }

    } catch(error) {
        errorMessage.textContent = "Erreur d'accès au site, contactez votre administrateur.";
        window.localStorage.removeItem("userId"); // réinitialisation du userId stocké
        window.localStorage.removeItem("token"); // réinitialisation du token stocké
        alert(error);
    }

};

