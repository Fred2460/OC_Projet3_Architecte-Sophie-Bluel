// ************** RECUPERATION DES DONNEES DE CONNEXION **************
let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let errorMessage = document.getElementById("errorMessage");

console.log("Elements du DOM sélectionnés (loginForm, email, mdp)=", loginForm, emailInput, passwordInput); // Vérif

// ************** FONCTION CONNEXION *****************

function genererLogin(email,password) {

    fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            "contentType": "application/json"
            //"Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Headers": "*"
        },
        body: {
            "email": email,
            "password": password
            //    "email": "sophie.bluel@test.tld",
            //    "password": "S0phie"
        },
        mode: "cors"
    })

    .then (response => {
        console.log("Réponse du serveur");
        if (response.ok) {
            return response.json()
            .then (data => {
                console.log("Succés :", data);
                window.localStorage.setItem("usersId", data.userId); // stockage du userId récupéré
                window.localStorage.setItem("token", data.token); // stockage du token récupéré

                window.location.replace("index.html#tportfolio"); // redirection vers la page d'accueil à la balise des projets
            });
        } else if (response.status === 401) {
            console.log("Erreur 401: accès non autorisé");
            errorMessage.textContent = "Erreur d'email ou de mot de passe";
            // throw new Error("Réponse du réseau NOK");
        } else if (response.status === 404) {
            console.log("Erreur 404: utilisateur non trouvé");
            errorMessage.textContent = "Erreur d'email ou de mot de passe";
        }
    })
    
    .catch(error => {
        console.error("Il y a eu une erreur avec votre fetch :", error);
        errorMessage.textContent = "Erreur d'accès au site, contactez votre administrateur.";
    });
};

// ************** LANCEMENT CONNEXION *****************

// Ecoute appuie bouton "Se connecter"
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // empêche le comportement pas défaut

    // récupération des valeurs du formulaire
    let email = emailInput.value;
    let password = passwordInput.value;
    console.log("valeurs envoyées (email, password)=", email, password); // Vérif

    let response = genererLogin(email, password);
    console.log("Réponse du serveur=", response); // Vérif
});

/*
console.log("Réponse du serveur=", response); // Vérif
const useridLogin = response.userId;
const usertokenLogin = response.token;
console.log("useridLogin=", useridLogin); // Vérif
console.log("usertokenLogin=", usertokenLogin); // Vérif
*/

    //users = await reponse.json();
    // Transformation des projets en JSON
    //const valeurUsers = JSON.stringify(users);
    //console.log("users=", users); // Vérif
    //console.log("valeurUsers=", valeurUsers); // Vérif
    //const useridLogin = valeurUsers.userId;
    //const usertokenLogin = valeurUsers.token;
    
    // Stockage des informations dans le localStorage
    //window.localStorage.setItem("users", valeurUsers);
//} else {
//    users = JSON.parse(users);
//};
