// ************** RECUPERATION DES DONNEES DE CONNEXION **************
let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let errorMessage = document.getElementById("errorMessage");

//console.log("Elements du DOM sélectionnés (loginForm, email, mdp)=", loginForm, emailInput, passwordInput); // Vérif

// ************** FONCTION CONNEXION *****************
function genererLogin(email, password) {
    // Simulation connexion user ok
    console.log("valeurs envoyées (email, password) Function=", email, password); // Vérif
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

    //.then (response => {
    .then((response) => response.json())    
              
        //console.log("userId récupéré =", userId, data.userId);
        //console.log("token récupéré =", token, data.token);
        //console.log("userId récupéré =", userId);
        //console.log("token récupéré =", token);
        //return response.json()
    //})    
    
    .then (data => {
        if (!data.ok) {
            errorMessage.textContent = "Erreur d'accès au site (erreur " + data.status + "), contactez votre administrateur.";
        }
        console.log("Succés :", data);
        window.localStorage.setItem("userId", data.userId); // stockage du userId récupéré
        window.localStorage.setItem("token", data.token); // stockage du token récupéré
    
        window.location.replace("index.html#tportfolio"); // redirection vers la page d'accueil à la balise des projets
    })

    .catch(error => {
        errorMessage.textContent = "Erreur d'accès au site (catch), contactez votre administrateur.";
        console.error("Il y a eu une erreur avec votre fetch :", error, " - ", error.status, error.statusText);
    })
    //*/
    /*
    // simulation requête ok (suite)
    window.localStorage.setItem("userId", "1"); // stockage du userId forcé
    window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"); // stockage du token forcé
    window.location.replace("index.html#portfolio"); // redirection vers la page d'accueil à la balise des projets
    */
};


// ************** LANCEMENT CONNEXION *****************

// Ecoute appuie bouton "Se connecter"
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // empêche le comportement pas défaut de rechargement de la page

    // récupération des valeurs du formulaire
    let email = emailInput.value;
    let password = passwordInput.value;
    console.log("valeurs envoyées (email, password) Event=", email, password); // Vérif

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
