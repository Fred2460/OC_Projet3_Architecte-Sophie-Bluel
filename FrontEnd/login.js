// ******************* REINITIALISATION DU LOCAL STORAGE ********************
localStorage.clear();

// ************** RECUPERATION DES DONNEES DE CONNEXION **************
let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let errorMessage = document.getElementById("errorMessage");

// ************** FONCTION CONNEXION *****************
function genererLogin(email, password) {
    // Simulation connexion user ok
    //console.log("valeurs envoyées (email, password) Function=", email, password); // Vérif
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "accept": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        // "sophie.bluel@test.tld" "S0phie"
    })

    .then((response) => {
        return response.json();
    })

    .then (data => {
        if (data.token) {
            window.localStorage.setItem("userId", data.userId); // stockage du userId récupéré
            window.localStorage.setItem("token", data.token); // stockage du token récupéré
            console.log("userId =", data.userId); // Vérif
            console.log("token =", data.token); // Vérif
            window.location.replace("index.html#tportfolio"); // redirection vers la page d'accueil à la balise des projets
        } else {
            errorMessage.textContent = "Erreur d'identifiant ou mot de passe.";    
            //window.localStorage.removeItem("userId"); // réinitialisation du userId stocké}
            //window.localStorage.removeItem("token"); // réinitialisation du token stocké
        }
    })

    .catch(error => {
        errorMessage.textContent = "Erreur d'accès au site (catch), contactez votre administrateur.";
        window.localStorage.removeItem("userId"); // réinitialisation du userId stocké
        window.localStorage.removeItem("token"); // réinitialisation du token stocké
    })
    
};


// ************** LANCEMENT CONNEXION *****************

// Ecoute appuie bouton "Se connecter"
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // empêche le comportement pas défaut de rechargement de la page

    // récupération des valeurs du formulaire
    let email = emailInput.value;
    let password = passwordInput.value;
    genererLogin(email, password);

});
